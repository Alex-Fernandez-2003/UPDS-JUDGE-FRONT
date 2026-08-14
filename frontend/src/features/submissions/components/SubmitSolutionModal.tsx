import { Code2, FileCode2, Send, Trash2, Upload, X } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { Alert, Button } from '@/components/common'
import { Select } from '@/components/forms'
import type { CrearEnvioDto } from '../Types/sumbitTypes'
import {
  LANGUAGE_CONFIGS,
  MAX_SOURCE_FILE_SIZE_BYTES,
  getLanguageConfig,
} from '../languageConfig'
import {
  validateSourceFile,
  validateSubmitSolution,
} from '../schemas/sumbitSolution'
import type { ProblemOption } from './submissionsFilter'
import { CodeEditor } from './submtCodeEditor'

type SubmissionMode = 'paste' | 'upload'

type Props = {
  contest: { code: string; name: string }
  problems: ProblemOption[]
  initialProblem?: string
  onSubmit: (payload: CrearEnvioDto) => Promise<void>
  onClose: () => void
}

const focusableSelector = [
  'button:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function readFileAsText(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result ?? ''))
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    reader.readAsText(file)
  })
}

export function SubmitSolutionModal({
  contest,
  problems,
  initialProblem = '',
  onSubmit,
  onClose,
}: Props) {
  const validInitialProblem = problems.some(
    ({ inciso }) => inciso === initialProblem,
  )
    ? initialProblem
    : ''
  const initialLanguage = LANGUAGE_CONFIGS[0]
  const [mode, setMode] = useState<SubmissionMode>('paste')
  const [problem, setProblem] = useState(validInitialProblem)
  const [languageId, setLanguageId] = useState(initialLanguage.id)
  const [sourceCode, setSourceCode] = useState(initialLanguage.template)
  const [selectedFile, setSelectedFile] = useState<File>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [requestError, setRequestError] = useState('')
  const [pending, setPending] = useState(false)
  const [dragging, setDragging] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const pendingRef = useRef(false)
  const onCloseRef = useRef(onClose)
  const titleId = useId()
  const descriptionId = useId()
  const pastePanelId = useId()
  const uploadPanelId = useId()

  onCloseRef.current = onClose
  const language = getLanguageConfig(languageId) ?? initialLanguage

  const close = () => {
    if (!pendingRef.current) onCloseRef.current()
  }

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!pendingRef.current) {
          event.preventDefault()
          onCloseRef.current()
        }
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])

  const activateTab = (nextMode: SubmissionMode) => {
    setMode(nextMode)
    setRequestError('')
  }

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = mode === 'paste' ? 0 : 1
    let nextIndex: number | undefined
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex + 1) % 2
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % 2
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = 1
    if (nextIndex === undefined) return
    event.preventDefault()
    const nextMode: SubmissionMode = nextIndex === 0 ? 'paste' : 'upload'
    activateTab(nextMode)
    dialogRef.current
      ?.querySelector<HTMLButtonElement>(`[data-mode="${nextMode}"]`)
      ?.focus()
  }

  const handleLanguageChange = (nextLanguageId: number) => {
    setLanguageId(nextLanguageId)
    if (selectedFile) {
      const fileError = validateSourceFile(selectedFile, nextLanguageId)
      setErrors((current) => ({
        ...current,
        file: fileError ?? '',
        idLenguaje: '',
      }))
    } else {
      setErrors((current) => ({ ...current, idLenguaje: '' }))
    }
  }

  const openFilePicker = () => {
    if (!fileInputRef.current) return
    fileInputRef.current.value = ''
    fileInputRef.current.click()
  }

  const chooseFile = (file?: File) => {
    if (!file) return
    setSelectedFile(file)
    setErrors((current) => ({
      ...current,
      file: validateSourceFile(file, languageId) ?? '',
    }))
    setRequestError('')
  }

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDragging(false)
    chooseFile(event.dataTransfer.files[0])
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (pendingRef.current) return

    const validation = validateSubmitSolution({
      incisoProblema: problem,
      idLenguaje: languageId,
      mode,
      file: selectedFile,
      sourceCode,
    })
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors({})
    setRequestError('')
    pendingRef.current = true
    setPending(true)
    try {
      const codigoFuente =
        mode === 'upload' && selectedFile
          ? await readFileAsText(selectedFile)
          : sourceCode
      await onSubmit({
        codigoConcurso: contest.code,
        incisoProblema: problem,
        idLenguaje: languageId,
        codigoFuente,
      })
      pendingRef.current = false
      setPending(false)
      onCloseRef.current()
    } catch (error) {
      pendingRef.current = false
      setPending(false)
      setRequestError(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al enviar la solución. Por favor reintenta.',
      )
    }
  }

  return createPortal(
    <div
      data-testid="submit-modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-[2px]"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-busy={pending}
        className={`flex max-h-[calc(100vh-2rem)] w-[90vw] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-[max-width] duration-300 ${
          mode === 'paste' ? 'max-w-5xl' : 'max-w-2xl'
        }`}
      >
        <header className="flex shrink-0 items-center justify-between gap-4 bg-[#171827] px-5 py-4 text-white sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10">
              <Code2 className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2 id={titleId} className="text-lg font-bold">
                Enviar solución
              </h2>
              <p id={descriptionId} className="truncate text-sm text-slate-300">
                Concurso: {contest.code} · {contest.name}
              </p>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Cerrar modal"
            disabled={pending}
            onClick={close}
            className="rounded-xl bg-white/10 p-2.5 transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-blue-400 disabled:opacity-50"
          >
            <X className="size-5" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="min-h-0 space-y-4 overflow-y-auto p-5 sm:p-7"
        >
          {requestError && <Alert tone="danger">{requestError}</Alert>}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor={`${titleId}-problem`}
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Problema
              </label>
              <Select
                id={`${titleId}-problem`}
                aria-label="Problema"
                value={problem}
                disabled={pending}
                aria-describedby={
                  errors.incisoProblema ? `${titleId}-problem-error` : undefined
                }
                error={Boolean(errors.incisoProblema)}
                onChange={(event) => {
                  setProblem(event.target.value)
                  setErrors((current) => ({ ...current, incisoProblema: '' }))
                }}
              >
                <option value="">Selecciona un problema</option>
                {problems.map(({ inciso, titulo }) => (
                  <option key={inciso} value={inciso}>
                    {inciso} — {titulo}
                  </option>
                ))}
              </Select>
              {errors.incisoProblema && (
                <p
                  id={`${titleId}-problem-error`}
                  role="alert"
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.incisoProblema}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${titleId}-language`}
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Lenguaje
              </label>
              <Select
                id={`${titleId}-language`}
                aria-label="Lenguaje"
                value={languageId}
                disabled={pending}
                aria-describedby={
                  errors.idLenguaje ? `${titleId}-language-error` : undefined
                }
                error={Boolean(errors.idLenguaje)}
                onChange={(event) =>
                  handleLanguageChange(Number(event.target.value))
                }
              >
                {LANGUAGE_CONFIGS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </Select>
              {errors.idLenguaje && (
                <p
                  id={`${titleId}-language-error`}
                  role="alert"
                  className="mt-1 text-xs text-red-600"
                >
                  {errors.idLenguaje}
                </p>
              )}
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Método de envío"
            className="grid grid-cols-2 rounded-xl bg-slate-100 p-1"
          >
            <button
              type="button"
              role="tab"
              data-mode="paste"
              aria-selected={mode === 'paste'}
              aria-controls={pastePanelId}
              tabIndex={mode === 'paste' ? 0 : -1}
              disabled={pending}
              onClick={() => activateTab('paste')}
              onKeyDown={handleTabKeyDown}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-blue-500 ${
                mode === 'paste'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Code2 className="mr-2 inline size-4" aria-hidden="true" />
              Pegar código
            </button>
            <button
              type="button"
              role="tab"
              data-mode="upload"
              aria-selected={mode === 'upload'}
              aria-controls={uploadPanelId}
              tabIndex={mode === 'upload' ? 0 : -1}
              disabled={pending}
              onClick={() => activateTab('upload')}
              onKeyDown={handleTabKeyDown}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-blue-500 ${
                mode === 'upload'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600'
              }`}
            >
              <Upload className="mr-2 inline size-4" aria-hidden="true" />
              Subir archivo
            </button>
          </div>

          {mode === 'paste' ? (
            <div id={pastePanelId} role="tabpanel" className="space-y-2">
              <CodeEditor
                value={sourceCode}
                language={language}
                onChange={(value) => {
                  setSourceCode(value)
                  setErrors((current) => ({ ...current, sourceCode: '' }))
                }}
                errorId={
                  errors.sourceCode ? `${titleId}-source-error` : undefined
                }
              />
              {errors.sourceCode && (
                <p
                  id={`${titleId}-source-error`}
                  role="alert"
                  className="text-xs text-red-600"
                >
                  {errors.sourceCode}
                </p>
              )}
              <p className="text-xs text-slate-500">
                ↔ Deslizá horizontalmente para ver líneas largas; el editor usa
                scroll vertical.
              </p>
            </div>
          ) : (
            <div id={uploadPanelId} role="tabpanel" className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                aria-label="Seleccionar archivo fuente"
                accept={language.allowedExtensions.join(',')}
                disabled={pending}
                onChange={(event) => chooseFile(event.target.files?.[0])}
              />
              <button
                type="button"
                disabled={pending}
                data-dragging={String(dragging)}
                aria-describedby={
                  errors.file ? `${titleId}-file-error` : `${titleId}-file-hint`
                }
                onClick={openFilePicker}
                onDragEnter={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={(event) => {
                  event.preventDefault()
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  )
                    setDragging(false)
                }}
                onDrop={handleDrop}
                className={`w-full rounded-2xl border-2 border-dashed px-5 py-8 text-center transition focus-visible:outline-2 focus-visible:outline-blue-500 ${
                  dragging
                    ? 'border-blue-500 bg-blue-50'
                    : errors.file
                      ? 'border-red-300 bg-red-50/40'
                      : 'border-slate-200 hover:border-blue-400 hover:bg-blue-50/40'
                }`}
              >
                <span className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <Upload className="size-5" aria-hidden="true" />
                </span>
                <span className="block font-semibold text-slate-900">
                  Arrastra tu archivo aquí o selecciona uno
                </span>
                <span
                  id={`${titleId}-file-hint`}
                  className="mt-1 block text-sm text-slate-500"
                >
                  Máximo 2 MiB. Extensiones permitidas
                </span>
                <span className="mt-3 flex flex-wrap justify-center gap-2">
                  {language.allowedExtensions.map((extension) => (
                    <span
                      key={extension}
                      className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600"
                    >
                      {extension}
                    </span>
                  ))}
                </span>
              </button>

              {selectedFile && (
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 ${errors.file ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'}`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <FileCode2
                      className="size-5 shrink-0 text-slate-600"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-800">
                        {selectedFile.name}
                      </span>
                      <span
                        role="status"
                        className={`block text-xs font-semibold ${errors.file ? 'text-red-700' : 'text-emerald-700'}`}
                      >
                        {errors.file ? 'Archivo inválido' : 'Archivo listo'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={pending}
                      onClick={openFilePicker}
                    >
                      Reemplazar archivo
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={pending}
                      aria-label="Eliminar archivo"
                      onClick={() => {
                        setSelectedFile(undefined)
                        if (fileInputRef.current)
                          fileInputRef.current.value = ''
                        setErrors((current) => ({ ...current, file: '' }))
                      }}
                      leftIcon={<Trash2 className="size-4" />}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              )}
              {errors.file && (
                <p
                  id={`${titleId}-file-error`}
                  role="alert"
                  className="text-xs text-red-600"
                >
                  {errors.file}
                </p>
              )}
              <p className="text-xs text-slate-500">
                El problema seleccionado debe coincidir con el lenguaje y el
                código enviado.
              </p>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            loading={pending}
            disabled={pending}
            aria-busy={pending}
            leftIcon={
              !pending && <Send className="size-4" aria-hidden="true" />
            }
            className="min-h-11"
          >
            {pending ? 'Enviando solución...' : 'Enviar solución'}
          </Button>
          <span className="sr-only">
            Límite de archivo: {MAX_SOURCE_FILE_SIZE_BYTES} bytes
          </span>
        </form>
      </section>
    </div>,
    document.body,
  )
}
