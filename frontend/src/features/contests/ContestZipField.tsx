import { Archive, CheckCircle2, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button, IconButton } from '@/components/common'
import { FormError } from '@/components/forms'
import { cn } from '@/lib/utils/cn'
import { getContestZipError } from './constants'

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.ceil(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(bytes % (1024 * 1024) ? 1 : 0)} MB`
}

type Props = {
  value?: File
  error?: string
  disabled?: boolean
  onChange: (file?: File) => void
  onError: (message: string) => void
  onClearError: () => void
}

export function ContestZipField({
  value,
  error,
  disabled,
  onChange,
  onError,
  onClearError,
}: Props) {
  const input = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const errorId = 'contest-zip-error'

  const clearNativeInput = () => {
    if (input.current) input.current.value = ''
  }

  const select = (candidate?: File) => {
    const message = getContestZipError(candidate)
    if (!candidate || message) {
      onChange(undefined)
      clearNativeInput()
      if (message) onError(message)
      return
    }

    onChange(candidate)
    onClearError()
  }

  const openFilePicker = () => input.current?.click()
  const onDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    setDragging(false)
    if (!disabled) select(event.dataTransfer.files[0])
  }

  const zoneClasses = cn(
    'w-full rounded-lg border border-dashed p-6 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]',
    disabled
      ? 'cursor-not-allowed border-[var(--border)] bg-[var(--disabled)] opacity-60'
      : 'cursor-pointer border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--surface-muted)] active:scale-[0.99]',
    dragging && 'border-[var(--primary)] bg-[var(--surface-muted)]',
  )

  return (
    <div onDragOver={(event) => event.preventDefault()} onDrop={onDrop}>
      <input
        ref={input}
        type="file"
        accept=".zip"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => select(event.target.files?.[0])}
      />
      {value ? (
        <div
          className={cn(
            'rounded-lg border border-[var(--border)] p-4',
            !disabled && 'transition hover:border-[var(--primary)]',
          )}
          onDragEnter={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
        >
          <div className="flex min-w-0 items-start gap-3">
            <Archive
              className="mt-0.5 size-5 shrink-0 text-[var(--primary)]"
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate font-medium" title={value.name}>
                {value.name}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {formatFileSize(value.size)}
              </p>
              <p className="mt-2 flex items-center gap-1 text-sm font-medium text-green-700">
                <CheckCircle2 className="size-4" aria-hidden="true" /> Archivo
                válido
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={openFilePicker}
            >
              Cambiar archivo
            </Button>
            <IconButton
              type="button"
              label="Eliminar archivo ZIP"
              disabled={disabled}
              className="border border-[var(--border)] enabled:hover:bg-[var(--surface-muted)] enabled:active:scale-95"
              onClick={() => {
                onChange(undefined)
                clearNativeInput()
                onClearError()
              }}
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          className={zoneClasses}
          aria-describedby={error ? errorId : undefined}
          onClick={openFilePicker}
          onDragEnter={() => setDragging(true)}
          onDragLeave={() => setDragging(false)}
        >
          <Upload
            className="mx-auto size-6 text-[var(--primary)]"
            aria-hidden="true"
          />
          <span className="mt-2 block font-medium">
            Arrastrá un archivo ZIP o seleccioná uno
          </span>
          <span className="mt-1 block text-sm text-[var(--text-secondary)]">
            Formato permitido: .zip · Tamaño máximo: 100 MB
          </span>
          <span className="mt-3 inline-flex rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm font-semibold">
            Seleccionar archivo ZIP
          </span>
        </button>
      )}
      {error && <FormError id={errorId}>{error}</FormError>}
    </div>
  )
}
