import { useEffect, useRef } from 'react'
import { Button } from '@/components/common'
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration'
import { balloonColorHex, balloonColorLabel } from '@/domain/balloon-colors'
import type { ConcursoListItem } from './types'

type Props = {
  contest: ConcursoListItem
  onClose: () => void
  returnFocus: () => void
}

export function BalloonColorsModal({ contest, onClose, returnFocus }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const problems = [...(contest.problemas ?? [])].sort((a, b) =>
    a.inciso.localeCompare(b.inciso),
  )
  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])
  const close = () => {
    onClose()
    returnFocus()
  }
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4"
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="balloon-colors-title"
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="balloon-colors-title" className="text-lg font-semibold">
              Colores de globos
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {contest.nombre} · {contest.codigo}
            </p>
          </div>
          <Button ref={closeRef} variant="outline" size="sm" onClick={close}>
            Cerrar
          </Button>
        </div>
        {problems.length === 0 ? (
          <p className="mt-5 text-sm text-[var(--text-secondary)]">
            No hay colores de globos disponibles para este concurso.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {problems.map((problem) => (
              <li
                key={problem.inciso}
                className="flex items-center gap-3 rounded border border-[var(--border)] p-3"
              >
                <GlobeIllustration
                  size={34}
                  color={balloonColorHex(problem.colorGlobo)}
                  decorative
                />
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: balloonColorHex(problem.colorGlobo),
                  }}
                />
                <div>
                  <p className="font-semibold">
                    {problem.inciso} · {problem.titulo}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {balloonColorLabel(problem.colorGlobo)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
