import { useEffect, useState } from 'react'
import { Calendar, Clock, Code2, Send } from 'lucide-react'
import { NavLink } from 'react-router'

import Trophy from '@/assets/trophy-svg.svg?react'
import rankingTrophy from '@/assets/ranking/ranking-trophy.png'

import { Badge, Card } from '@/components/common'
import { estadoTiempoTone } from '@/features/contests/admin/format'
import type { EstadoTiempoConcurso } from '@/features/contests/admin/types'

import {
  formatContestDuration,
  formatRemaining,
  toValidContestDate,
} from '../time'

export { formatContestDuration } from '../time'

export type ContestContextSection = 'problems' | 'submissions' | 'ranking'

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
  /** Contractual duration supplied in minutes when start time is unavailable. */
  durationMinutes?: number | null
}

const statusLabels: Record<EstadoTiempoConcurso, string> = {
  Proximo: 'PRÓXIMO',
  Activo: 'EN CURSO',
  Finalizado: 'FINALIZADO',
}

const contestDateFormatter = new Intl.DateTimeFormat('es-BO', {
  dateStyle: 'medium',
})

const contestEndFormatter = new Intl.DateTimeFormat('es-BO', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const isContestStatus = (value: string): value is EstadoTiempoConcurso =>
  value in statusLabels

const navIcons = {
  problems: Code2,
  submissions: Send,
  ranking: Trophy,
}

function ContestCountdown({ endsAt }: { endsAt: Date }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now())
    }, 1_000)

    return () => {
      window.clearInterval(id)
    }
  }, [endsAt])

  const remaining = formatRemaining(endsAt, now)

  return (
    <p className="flex items-center gap-2">
      <Clock className="size-4" aria-hidden="true" />
      Tiempo restante: {remaining === '00:00:00' ? 'Finalizado' : remaining}
    </p>
  )
}

export function ContestContextHeader({
  contest,
  activeSection,
  navigationItems,
  durationMinutes,
}: ContestContextHeaderProps) {
  const status = isContestStatus(contest.status)
    ? {
      label: statusLabels[contest.status],
      tone: estadoTiempoTone[contest.status],
    }
    : {
      label: contest.status || '—',
      tone: 'neutral' as const,
    }

  const start = toValidContestDate(contest.startsAt)
  const end = toValidContestDate(contest.endsAt)

  const dateLabel = start
    ? 'Fecha de inicio'
    : end
      ? 'Fecha de finalización'
      : 'Fecha'

  const dateValue = start
    ? contestDateFormatter.format(start)
    : end
      ? contestDateFormatter.format(end)
      : 'No disponible'

  const durationValue = formatContestDuration(
    contest.startsAt,
    contest.endsAt,
    durationMinutes,
  )

  const showCountdown = contest.status === 'Activo' && end !== null

  return (
    <Card className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="shrink-0 text-[var(--primary)]">
            <img
              src={rankingTrophy}
              alt=""
              data-testid="ranking-trophy-image"
              className="h-24 w-20 object-contain sm:h-28 sm:w-24"
            />
          </div>

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

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-2">
                <Calendar className="size-4" aria-hidden="true" />
                {dateLabel}: {dateValue}
              </span>

              <span className="flex items-center gap-2">
                <Clock className="size-4" aria-hidden="true" />
                Duración: {durationValue}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-1 text-sm text-[var(--text-secondary)]">
          {showCountdown && <ContestCountdown endsAt={end} />}

          <p>
            Finaliza: {end ? contestEndFormatter.format(end) : 'No disponible'}
          </p>
        </div>
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
              className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3 text-sm font-bold focus-visible:outline-2 focus-visible:outline-[var(--focus)] ${active
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              <Icon
                className="size-4 shrink-0"
                aria-hidden="true"
              />

              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </Card>
  )
}