import { useEffect, useState } from 'react'
import { RotateCcw, type LucideIcon } from 'lucide-react'
import { useParams } from 'react-router'
import { Alert, Card, Spinner } from '@/components/common'
import {
  ContestContextHeader,
  type ContestContextNavigationItem,
} from '@/features/contests/components/ContestContextHeader'
import { UserLayout } from '@/layouts/UserLayout'
import { routes } from '@/routes/constants'
import { ProblemsTable } from '../components/ProblemsTable'
import { getContestDashboard } from '../service'
import type { ContestDashboard } from '../types'

type SummaryCard = {
  label: string
  value: string
  icon: string | LucideIcon
  valueClassName: string
  iconClassName: string
}

const contestDateFormatter = new Intl.DateTimeFormat('es-BO', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const contestTimeFormatter = new Intl.DateTimeFormat('es-BO', {
  hour: '2-digit',
  minute: '2-digit',
})

const formatContestDate = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : contestDateFormatter.format(date)
}

const formatContestTime = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? '—' : contestTimeFormatter.format(date)
}

export function ContestProblemsContent({
  contestCode,
  navigationItems,
}: {
  contestCode?: string
  navigationItems: ContestContextNavigationItem[]
}) {
  const [dashboard, setDashboard] = useState<ContestDashboard | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!contestCode) {
      setError('El código del concurso es obligatorio.')
      return
    }
    let active = true
    setDashboard(null)
    setError(null)
    void getContestDashboard(contestCode)
      .then((result) => active && setDashboard(result ?? null))
      .catch((requestError: unknown) => {
        if (active)
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar el dashboard del concurso.',
          )
      })
    return () => {
      active = false
    }
  }, [contestCode])

  if (error) return <Alert tone="danger">{error}</Alert>
  if (!dashboard) return <Spinner label="Cargando concurso" />

  const summaryCards: SummaryCard[] = [
    {
      label: 'Fecha fin',
      value: formatContestDate(dashboard.fechaFin),
      icon: '🗓️',
      valueClassName: 'text-base',
      iconClassName: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Hora fin',
      value: formatContestTime(dashboard.fechaFin),
      icon: '⏰',
      valueClassName: 'text-2xl',
      iconClassName: 'bg-violet-50 text-violet-700',
    },
    {
      label: 'Participantes actuales',
      value: String(dashboard.cantidadParticipantes),
      icon: '👥',
      valueClassName: 'text-2xl',
      iconClassName: 'bg-amber-50 text-amber-700',
    },
    {
      label: 'Problemas resueltos',
      value: `${dashboard.problemasResueltos} / ${dashboard.totalProblemas}`,
      icon: '✅',
      valueClassName: 'text-2xl',
      iconClassName: 'bg-emerald-50 text-emerald-700',
    },
    {
      label: 'Intentos totales',
      value: String(dashboard.intentosTotales),
      icon: RotateCcw,
      valueClassName: 'text-2xl',
      iconClassName: 'bg-rose-50 text-rose-700',
    },
  ]

  return (
    <div className="w-full min-w-0 space-y-6">
      <ContestContextHeader
        contest={{
          code: dashboard.codigo,
          name: dashboard.nombre,
          status: dashboard.estadoTiempo,
          endsAt: dashboard.fechaFin,
        }}
        activeSection="problems"
        navigationItems={navigationItems}
      />
      <section
        id="contest-header"
        data-testid="problems-summary-grid"
        className="grid grid-cols-1 gap-3 bg-transparent sm:grid-cols-2 lg:grid-cols-5"
      >
        {summaryCards.map(
          ({ label, value, icon: Icon, valueClassName, iconClassName }) => (
            <Card
              key={label}
              data-testid="problems-summary-surface"
              className="p-0"
            >
              <article
                data-testid="problems-summary-card"
                aria-label={label}
                className="flex min-w-0 items-center gap-3 p-3"
              >
                <span
                  data-testid="problems-summary-icon"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
                >
                  {typeof Icon === 'string' ? (
                    <span className="text-xl" aria-hidden="true">
                      {Icon}
                    </span>
                  ) : (
                    <Icon className="size-4" aria-hidden="true" />
                  )}
                </span>

                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                    {label}
                  </div>

                  <div
                    className={`mt-0.5 truncate font-black ${valueClassName}`}
                  >
                    {value}
                  </div>
                </div>
              </article>
            </Card>
          ),
        )}
      </section>
      <section id="problems-panel" className="w-full min-w-0">
        <ProblemsTable
          problems={dashboard.problemas}
          pdfUrl={dashboard.urlSetProblemas}
        />
      </section>
    </div>
  )
}

export default function ContestProblemsPage() {
  const { contestCode: code } = useParams<{ contestCode: string }>()
  const navigationItems: ContestContextNavigationItem[] = [
    {
      id: 'problems',
      label: 'Problemas',
      to: routes.studentContestProblems(code ?? ''),
    },
    {
      id: 'submissions',
      label: 'Mis envíos',
      to: routes.studentContestSubmissions(code ?? ''),
    },
    {
      id: 'ranking',
      label: 'Ranking',
      to: routes.studentContestRanking(code ?? ''),
    },
  ]

  return (
    <UserLayout>
      <main className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <ContestProblemsContent
          contestCode={code}
          navigationItems={navigationItems}
        />
      </main>
    </UserLayout>
  )
}
