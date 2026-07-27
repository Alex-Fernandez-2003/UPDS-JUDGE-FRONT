import { useEffect, useState } from 'react'
import { Calendar, Check, Clock, RotateCcw, Users } from 'lucide-react'
import { useParams } from 'react-router'
import { Alert, Card, Divider, Spinner } from '@/components/common'
import {
  ContestContextHeader,
  type ContestContextNavigationItem,
} from '@/features/contests/components/ContestContextHeader'
import { UserLayout } from '@/layouts/UserLayout'
import { routes } from '@/routes/constants'
import { ProblemsTable } from '../components/ProblemsTable'
import { getContestDashboard } from '../service'
import type { ContestDashboard } from '../types'

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

  const infoItems = [
    {
      label: 'Fecha fin',
      value: formatContestDate(dashboard.fechaFin),
      icon: Calendar,
    },
    {
      label: 'Hora fin',
      value: formatContestTime(dashboard.fechaFin),
      icon: Clock,
    },
    {
      label: 'Participantes actuales',
      value: String(dashboard.cantidadParticipantes),
      icon: Users,
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
      <Card id="contest-header">
        <Divider className="mb-6" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {infoItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon
                className="size-4 text-[var(--text-secondary)]"
                aria-hidden="true"
              />
              <div>
                <div className="text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">
                  {label}
                </div>
                <div className="text-sm font-bold">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" id="quick-metrics">
        <Card className="flex items-center gap-4">
          <Check
            className="size-5 shrink-0 text-[var(--primary)]"
            aria-hidden="true"
          />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              Problemas resueltos
            </div>
            <div className="mt-0.5 text-2xl font-black">
              {dashboard.problemasResueltos}{' '}
              <span className="text-lg font-medium text-[var(--text-secondary)]">
                / {dashboard.totalProblemas}
              </span>
            </div>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <RotateCcw
            className="size-5 shrink-0 text-[var(--text-secondary)]"
            aria-hidden="true"
          />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              Intentos totales
            </div>
            <div className="mt-0.5 text-2xl font-black">
              {dashboard.intentosTotales}
            </div>
          </div>
        </Card>
      </div>
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
