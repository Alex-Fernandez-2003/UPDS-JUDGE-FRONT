import { useEffect, useMemo, useState } from 'react'
import { Badge, Button, Card, ProgressBar } from '@/components/common'
import { PasswordInput } from '@/components/forms'
import {
  estadoTiempoLabel,
  estadoTiempoTone,
  formatFechaHora,
  modalidadLabel,
} from '@/features/contests/admin/format'
import type { ConcursoListItem } from '@/features/contests/types'

interface ContestCardProps {
  contest: ConcursoListItem
}

import { Globe, Lock, Circle } from 'lucide-react'

const formatTimeRemaining = (seconds: number) => {
  const horas = Math.floor(seconds / 3600)
  const minutos = Math.floor((seconds % 3600) / 60)
  const segundos = seconds % 60

  return [horas, minutos, segundos]
    .map((v) => String(v).padStart(2, '0'))
    .join(':')
}

export function ContestCard({ contest }: ContestCardProps) {
  const [remaining, setRemaining] = useState(contest.segundosRestantes ?? 0)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    setRemaining(contest.segundosRestantes ?? 0)
  }, [contest.segundosRestantes])

  useEffect(() => {
    setShowPasswordInput(false)
    setPassword('')
  }, [contest.idConcurso, contest.estadoTiempo, contest.modalidad])

  useEffect(() => {
    if (contest.estadoTiempo !== 'Activo') return

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [contest.estadoTiempo])

  const progress = useMemo(() => {
    if (contest.estadoTiempo !== 'Activo' || contest.duracionMinutos <= 0) {
      return contest.estadoTiempo === 'Finalizado' ? 100 : 0
    }

    const total = contest.duracionMinutos * 60

    return Math.min(100, Math.max(0, ((total - remaining) / total) * 100))
  }, [contest.estadoTiempo, contest.duracionMinutos, remaining])

  const puedeInscribirse =
    !contest.yaInscrito && contest.estadoTiempo === 'Proximo'

  return (
    //<Card className="flex h-full flex-col p-6">    className="space-y-4 p-6"
    <Card className="flex h-full flex-col p-6">
      <div className="flex h-full flex-col gap-4">
        {/* <div className="flex items-center justify-between">
          <Badge tone={estadoTiempoTone[contest.estadoTiempo]}>
            {estadoTiempoLabel[contest.estadoTiempo]}
          </Badge>

          <span className="text-xs font-semibold uppercase text-[var(--text-secondary)]">
            {modalidadLabel[contest.modalidad]}
          </span>
        </div> */}
        <div className="flex items-center justify-between">
          {/* Estado del concurso */}
          <div
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold uppercase
      ${
        contest.estadoTiempo === 'Activo'
          ? 'bg-[var(--background)] text-[var(--active-card)]'
          : contest.estadoTiempo === 'Proximo'
            ? 'bg-[var(--background)] text-[var(--soon-card)]'
            : 'bg-[var(--background)] text-[var(--finished-card)]'
      }`}
          >
            {contest.estadoTiempo === 'Activo' && (
              // <Circle className="h-2.5 w-2.5 fill-current" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
              </span>
            )}

            {estadoTiempoLabel[contest.estadoTiempo]}
          </div>

          {/* Modalidad */}
          <div
            className={`inline-flex items-center gap-1 text-sm font-medium
      ${
        contest.modalidad === 'Publico'
          ? 'text-[var(--public-card)] '
          : 'text-[var(--private-card)]'
      }`}
          >
            {contest.modalidad === 'Publico' ? (
              <Globe className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}

            {modalidadLabel[contest.modalidad]}
          </div>
        </div>

        {/* <div className="flex items-start justify-between gap-4">
          {/* <div className="flex items-center justify-between"> 
          <Badge tone={estadoTiempoTone[contest.estadoTiempo]}>
            {estadoTiempoLabel[contest.estadoTiempo]}
          </Badge>

          <div className="flex flex-col items-end gap-2">
            <span className="text-xs font-semibold uppercase text-[var(--text-secondary)]">
              {modalidadLabel[contest.modalidad]}
            </span>

             {!contest.yaInscrito && contest.estadoTiempo !== 'Finalizado' ? (
            contest.modalidad === 'Publico' ? (
              <Button size="sm">Inscribirse</Button>
            ) : showPasswordInput ? (
              <div className="flex w-52 flex-col gap-2">
                <PasswordInput
                  value={password}
                  placeholder="Contraseña del concurso"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button size="sm">Acceder</Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => setShowPasswordInput(true)}>
                Inscribirse
              </Button>
            )
          ) : null} 
            {!contest.yaInscrito &&
              contest.estadoTiempo !== 'Finalizado' &&
              (contest.modalidad === 'Publico' ? (
                <Button
                  size="sm"
                  onClick={() => {
                    // TODO:
                    // llamar al endpoint de inscripción pública
                  }}
                >
                  Inscribirse
                </Button>
              ) : showPasswordInput ? (
                <div className="flex w-56 flex-col gap-2">
                  <PasswordInput
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <Button
                    size="sm"
                    onClick={() => {
                      // TODO:
                      // llamar al endpoint enviando:
                      // contest.idConcurso
                      // password
                    }}
                  >
                    Acceder
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={() => setShowPasswordInput(true)}>
                  Inscribirse
                </Button>
              ))}
          </div>
        </div> */}

        {/* <div className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {contest.nombre}
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            {contest.descripcion}
          </p>
        </div> */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {contest.nombre}
            </h2>

            <p className="text-sm text-[var(--text-secondary)]">
              {contest.descripcion}
            </p>
          </div>

          {/* {!contest.yaInscrito &&
            contest.estadoTiempo !== 'Finalizado' &&
            (contest.modalidad === 'Publico' ? (
              <Button
                className="w-full"
                onClick={() => {
                  // TODO:
                  // inscripción pública
                }}
              >
                Inscribirse
              </Button>
            ) : showPasswordInput ? (
              <div className="space-y-2">
                <PasswordInput
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  className="w-full"
                  onClick={() => {
                    // TODO:
                    // inscripción privada
                  }}
                >
                  Acceder
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => setShowPasswordInput(true)}
              >
                Inscribirse
              </Button>
            ))} */}

          {puedeInscribirse &&
            (contest.modalidad === 'Publico' ? (
              <Button
                className="w-full"
                onClick={() => {
                  // inscripción pública
                }}
              >
                Inscribirse
              </Button>
            ) : showPasswordInput ? (
              <div className="space-y-2">
                <PasswordInput
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  className="w-full"
                  onClick={() => {
                    // inscripción privada
                  }}
                >
                  Acceder
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => setShowPasswordInput(true)}
              >
                Inscribirse
              </Button>
            ))}
        </div>

        <div className="rounded-lg bg-[var(--surface-muted)] p-3 text-sm text-[var(--text-secondary)]">
          {contest.estadoTiempo === 'Activo' ? (
            <div className="space-y-1">
              <p className="font-semibold text-[var(--text-primary)]">
                Tiempo restante
              </p>

              <p>{formatTimeRemaining(remaining)}</p>
            </div>
          ) : contest.estadoTiempo === 'Proximo' ? (
            <div className="space-y-1">
              <p className="font-semibold text-[var(--text-primary)]">Inicio</p>

              <p>{formatFechaHora(contest.fechaInicio)}</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-semibold text-[var(--text-primary)]">
                Finalizado
              </p>

              {contest.miPuesto != null ? (
                <p>Tu puesto: {contest.miPuesto}</p>
              ) : (
                <p>Revisa la tabla de resultados al finalizar.</p>
              )}
            </div>
          )}

          {/* <ProgressBar
          className="mt-3"
          value={progress}
          label="Tiempo transcurrido"
        /> */}
          {/* {contest.estadoTiempo === 'Activo' && (
            <ProgressBar
              className="mt-3"
              value={progress}
              label="Tiempo transcurrido"
            />
          )} */}

          {contest.estadoTiempo === 'Activo' && (
            <ProgressBar
              className="mt-3"
              value={progress}
              label="Tiempo transcurrido"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-secondary)]">
          <div className="space-y-1">
            <p className="font-semibold text-[var(--text-primary)]">
              Problemas
            </p>

            <p>{contest.cantidadProblemas}</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-[var(--text-primary)]">
              Participantes
            </p>

            <p>{contest.cantidadParticipantes}</p>
          </div>
        </div>

        {/* <div className="flex flex-wrap items-center gap-3"> */}
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <Button
            variant={contest.yaInscrito ? 'primary' : 'outline'}
            className="flex-1"
          >
            {contest.yaInscrito ? 'Ver detalles' : 'Ver detalles'}
          </Button>

          <span className="text-xs text-[var(--text-secondary)]">
            {contest.codigo}
          </span>
        </div>
      </div>
    </Card>
  )
}
