import { useEffect, useRef, useState } from 'react'
import { Alert, Button } from '@/components/common'

type JoinContestModalProps = {
  contest: { codigo: string; nombre: string }
  privateContest: boolean
  pending: boolean
  error?: string
  onConfirm: (password: string | null) => Promise<void>
  onCancel: () => void
}

export function JoinContestModal({
  contest,
  privateContest,
  pending,
  error,
  onConfirm,
  onCancel,
}: JoinContestModalProps) {
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !pending) onCancel()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onCancel, pending])

  const close = () => {
    if (pending) return
    setPassword('')
    setValidationError('')
    onCancel()
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (privateContest && !password) {
      setValidationError('Ingresá la contraseña del concurso.')
      return
    }
    setValidationError('')
    try {
      await onConfirm(privateContest ? password : null)
      setPassword('')
    } catch {
      // The mutation error is rendered through the modal's error prop.
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="presentation"
    >
      <section
        aria-modal="true"
        aria-labelledby="join-contest-title"
        role="dialog"
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
      >
        <h2 id="join-contest-title" className="text-lg font-bold">
          Inscribirse al concurso
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Confirmá tu inscripción a {contest.nombre} ({contest.codigo}).
        </p>
        <form className="mt-5 space-y-4" onSubmit={submit} aria-busy={pending}>
          {privateContest && (
            <label
              className="block text-sm font-semibold"
              htmlFor="contest-password"
            >
              Contraseña del concurso
              <input
                id="contest-password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-1 w-full rounded-md border border-[var(--border)] px-3 py-2"
                aria-describedby={
                  validationError || error ? 'join-password-error' : undefined
                }
              />
            </label>
          )}
          {(validationError || error) && (
            <Alert id="join-password-error" tone="danger">
              {validationError || error}
            </Alert>
          )}
          <div className="flex justify-end gap-3">
            <Button
              ref={cancelRef}
              type="button"
              variant="outline"
              onClick={close}
              disabled={pending}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={pending}>
              Confirmar inscripción
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
