import { useEffect, useMemo, useState } from 'react'
import { Globe, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Alert, Badge, Button, Card, ProgressBar } from '@/components/common'
import {
  estadoTiempoLabel,
  estadoTiempoTone,
  formatFechaHora,
  modalidadLabel,
} from '@/features/contests/admin/format'
import type { ConcursoListItem } from '@/features/contests/types'
import { routes } from '@/routes/constants'
import { getContestUserAction } from '../access-policy'
import { useJoinContest } from '../hooks'
import { JoinContestModal } from './JoinContestModal'

interface ContestCardProps {
  contest: ConcursoListItem
}

const formatTimeRemaining = (seconds: number) =>
  [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')

export function ContestCard({ contest }: ContestCardProps) {
  const navigate = useNavigate()
  const [remaining, setRemaining] = useState(contest.segundosRestantes ?? 0)
  const [joinOpen, setJoinOpen] = useState(false)
  const join = useJoinContest()
  const action = getContestUserAction(contest)

  useEffect(
    () => setRemaining(contest.segundosRestantes ?? 0),
    [contest.segundosRestantes],
  )
  useEffect(() => {
    if (contest.estadoTiempo !== 'Activo') return
    const interval = window.setInterval(
      () => setRemaining((current) => Math.max(0, current - 1)),
      1000,
    )
    return () => window.clearInterval(interval)
  }, [contest.estadoTiempo])

  const progress = useMemo(() => {
    if (contest.estadoTiempo !== 'Activo' || contest.duracionMinutos <= 0)
      return contest.estadoTiempo === 'Finalizado' ? 100 : 0
    return Math.min(
      100,
      ((contest.duracionMinutos * 60 - remaining) /
        (contest.duracionMinutos * 60)) *
        100,
    )
  }, [contest.duracionMinutos, contest.estadoTiempo, remaining])

  const onAction = () => {
    if (action === 'JOIN_PUBLIC' || action === 'JOIN_PRIVATE') setJoinOpen(true)
    if (action === 'VIEW_ACTIVE' || action === 'VIEW_FINISHED')
      navigate(routes.studentContestSubmissions(contest.codigo))
  }

  const buttonLabel = {
    JOIN_PUBLIC: 'Inscribirse',
    JOIN_PRIVATE: 'Inscribirse',
    VIEW_ACTIVE: 'Acceder',
    VIEW_FINISHED: 'Ver detalles',
    ENROLLED_UPCOMING: 'Inscrito',
    REGISTRATION_CLOSED: 'Inscripciones cerradas',
    PRIVATE_FINISHED_REQUIRES_BACKEND: 'Acceso restringido',
    UNKNOWN_BLOCKED: 'No disponible',
  }[action]
  const disabled = ![
    'JOIN_PUBLIC',
    'JOIN_PRIVATE',
    'VIEW_ACTIVE',
    'VIEW_FINISHED',
  ].includes(action)

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <Badge tone={estadoTiempoTone[contest.estadoTiempo]}>
          {estadoTiempoLabel[contest.estadoTiempo]}
        </Badge>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
          {contest.modalidad === 'Publico' ? (
            <Globe className="size-4" />
          ) : (
            <Lock className="size-4" />
          )}
          {modalidadLabel[contest.modalidad]}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          {contest.nombre}
        </h2>
        <p className="text-sm text-[var(--text-secondary)]">
          {contest.descripcion}
        </p>
      </div>
      <div className="mt-4 rounded-lg bg-[var(--surface-muted)] p-3 text-sm text-[var(--text-secondary)]">
        {contest.estadoTiempo === 'Activo' ? (
          <>
            <p className="font-semibold text-[var(--text-primary)]">
              Tiempo restante
            </p>
            <p>{formatTimeRemaining(remaining)}</p>
            <ProgressBar
              className="mt-3"
              value={progress}
              label="Tiempo transcurrido"
            />
          </>
        ) : contest.estadoTiempo === 'Proximo' ? (
          <>
            <p className="font-semibold text-[var(--text-primary)]">Inicio</p>
            <p>{formatFechaHora(contest.fechaInicio)}</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-[var(--text-primary)]">
              Finalizado
            </p>
            <p>
              {contest.miPuesto != null
                ? `Tu puesto: ${contest.miPuesto}`
                : 'Revisa los resultados del concurso.'}
            </p>
          </>
        )}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-[var(--text-secondary)]">
        <p>
          Problemas{' '}
          <strong className="block text-[var(--text-primary)]">
            {contest.cantidadProblemas}
          </strong>
        </p>
        <p>
          Participantes{' '}
          <strong className="block text-[var(--text-primary)]">
            {contest.cantidadParticipantes}
          </strong>
        </p>
      </div>
      {action === 'PRIVATE_FINISHED_REQUIRES_BACKEND' && (
        <Alert className="mt-4" tone="warning">
          La consulta de concursos privados finalizados requiere validación del
          backend.
        </Alert>
      )}
      <div className="mt-auto flex items-center gap-3 pt-5">
        <Button
          className="flex-1"
          variant={contest.yaInscrito ? 'primary' : 'outline'}
          onClick={onAction}
          disabled={disabled}
        >
          {buttonLabel}
        </Button>
        <span className="text-xs text-[var(--text-secondary)]">
          {contest.codigo}
        </span>
      </div>
      {joinOpen && (
        <JoinContestModal
          contest={contest}
          privateContest={action === 'JOIN_PRIVATE'}
          pending={join.isPending}
          error={join.error instanceof Error ? join.error.message : undefined}
          onCancel={() => setJoinOpen(false)}
          onConfirm={async (contrasena) => {
            await join.mutateAsync({ codigo: contest.codigo, contrasena })
            setJoinOpen(false)
          }}
        />
      )}
    </Card>
  )
}
