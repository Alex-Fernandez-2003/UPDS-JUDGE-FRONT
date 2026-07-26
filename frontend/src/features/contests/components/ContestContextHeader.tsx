import { Clock, Code2, FileCode2 } from 'lucide-react'
import { NavLink } from 'react-router'
import { Badge, Card } from '@/components/common'
import { estadoTiempoTone } from '@/features/contests/admin/format'
import type { EstadoTiempoConcurso } from '@/features/contests/admin/types'

export type ContestContextSection = 'problems' | 'submissions'

export type ContestContextNavigationItem = {
  id: ContestContextSection
  label: string
  to: string
}

type ContestContextHeaderProps = {
  contest: {
    code: string
    name: string
    status: string
    startsAt?: string | null
    endsAt?: string | null
  }
  activeSection: ContestContextSection
  navigationItems: ContestContextNavigationItem[]
}

const statusLabels: Record<EstadoTiempoConcurso, string> = {
  Proximo: 'PRÓXIMO',
  Activo: 'EN CURSO',
  Finalizado: 'FINALIZADO',
}

const isContestStatus = (value: string): value is EstadoTiempoConcurso =>
  value in statusLabels

const toValidDate = (value?: string | null) => {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export const formatContestDuration = (
  startsAt?: string | null,
  endsAt?: string | null,
) => {
  const start = toValidDate(startsAt)
  const end = toValidDate(endsAt)
  if (!start || !end || end <= start) return '—'

  const totalMinutes = Math.round((end.getTime() - start.getTime()) / 60_000)
  const days = Math.floor(totalMinutes / 1_440)
  const hours = Math.floor((totalMinutes % 1_440) / 60)
  const minutes = totalMinutes % 60
  const parts = [
    days > 0 ? `${days} d` : '',
    hours > 0 ? `${hours} h` : '',
    minutes > 0 ? `${minutes} min` : '',
  ].filter(Boolean)

  return parts.length ? parts.join(' ') : '0 min'
}

const navIcons = {
  problems: Code2,
  submissions: FileCode2,
}

export function ContestContextHeader({
  contest,
  activeSection,
  navigationItems,
}: ContestContextHeaderProps) {
  const status = isContestStatus(contest.status)
    ? {
        label: statusLabels[contest.status],
        tone: estadoTiempoTone[contest.status],
      }
    : { label: contest.status || '—', tone: 'neutral' as const }

  return (
    <Card className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={status.tone}>{status.label}</Badge>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              {contest.code}
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {contest.name}
          </h1>
        </div>
        <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Clock className="size-4" aria-hidden="true" />
          Duración: {formatContestDuration(contest.startsAt, contest.endsAt)}
        </p>
      </div>
      <nav
        aria-label="Navegación del concurso"
        className="flex gap-2 overflow-x-auto border-b border-[var(--border)]"
      >
        {navigationItems.map((item) => {
          const Icon = navIcons[item.id]
          const active = item.id === activeSection
          return (
            <NavLink
              key={item.id}
              to={item.to}
              aria-current={active ? 'page' : undefined}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${
                active
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </Card>
  )
}
