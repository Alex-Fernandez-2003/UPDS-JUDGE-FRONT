import { useEffect, useState } from 'react'
import {
  Calendar,
  Check,
  Clock,
  Code2,
  FileCode2,
  RotateCcw,
  Users,
} from 'lucide-react'
import { NavLink, useParams } from 'react-router-dom'
import { Alert, Badge, Card, Divider, Spinner } from '@/components/common'
import { estadoTiempoTone } from '@/features/contests/admin/format'
import type { EstadoTiempoConcurso } from '@/features/contests/admin/types'
import { UserLayout } from '@/layouts/UserLayout'
import { routes } from '@/routes/constants'
import { ProblemsTable } from '../components/ProblemsTable'
import { getContestDashboard } from '../service'
import type { ContestDashboard } from '../types'

const contestStatusLabels: Record<EstadoTiempoConcurso, string> = {
  Proximo: 'PRÓXIMO',
  Activo: 'EN CURSO',
  Finalizado: 'FINALIZADO',
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

const parseContestDate = (iso: string) => {
  const date = new Date(iso)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatContestDate = (iso: string) => {
  const date = parseContestDate(iso)
  return date ? contestDateFormatter.format(date) : '—'
}

const formatContestTime = (iso: string) => {
  const date = parseContestDate(iso)
  return date ? contestTimeFormatter.format(date) : '—'
}

const getContestStatusPresentation = (estadoTiempo: string) => {
  if (estadoTiempo in contestStatusLabels) {
    const status = estadoTiempo as EstadoTiempoConcurso
    return {
      label: contestStatusLabels[status],
      tone: estadoTiempoTone[status],
    }
  }

  return { label: estadoTiempo, tone: 'neutral' as const }
}

export default function ContestProblemsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  const [dashboard, setDashboard] = useState<ContestDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (!contestCode) {
      setDashboard(null)
      setLoadError('El código del concurso es obligatorio.')
      setIsLoading(false)
      return
    }

    let active = true
    setDashboard(null)
    setLoadError(null)
    setIsLoading(true)

    void getContestDashboard(contestCode)
      .then((result) => {
        if (active) setDashboard(result ?? null)
      })
      .catch((error: unknown) => {
        if (!active) return
        setLoadError(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar el dashboard del concurso.',
        )
      })
      .finally(() => {
        if (active) setIsLoading(false)
      })

    return () => {
      active = false
    }
  }, [contestCode])

  return (
    <UserLayout>
      <main className="w-full min-w-0 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex min-h-40 items-center justify-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
            <Spinner label="Cargando concurso" />
            Cargando concurso...
          </div>
        )}

        {!isLoading && (loadError || !dashboard) && (
          <Alert tone="danger">
            {loadError ?? 'No se encontró el concurso.'}
          </Alert>
        )}

        {!isLoading && dashboard && (
          <ContestDashboardContent dashboard={dashboard} />
        )}
      </main>
    </UserLayout>
  )
}

function ContestDashboardContent({
  dashboard,
}: {
  dashboard: ContestDashboard
}) {
  const status = getContestStatusPresentation(dashboard.estadoTiempo)
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
    <>
      <Card id="contest-header">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2.5">
              <Badge tone={status.tone}>{status.label}</Badge>
              <span className="text-xs text-[var(--text-secondary)]">
                {dashboard.codigo}
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              {dashboard.nombre}
            </h1>
          </div>
        </div>

        <Divider className="my-6" />

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

      <div id="quick-metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <nav
        aria-label="Navegación del concurso"
        className="flex items-center gap-2 overflow-x-auto border-b border-[var(--border)]"
      >
        <NavLink
          to={routes.studentContestProblems(dashboard.codigo)}
          className="flex shrink-0 items-center gap-2 border-b-2 border-[var(--primary)] px-5 py-3 text-sm font-bold text-[var(--primary)]"
          aria-current="page"
        >
          <Code2 className="size-4" aria-hidden="true" />
          <span>Problemas</span>
          <Badge tone="neutral">{dashboard.totalProblemas}</Badge>
        </NavLink>
        <NavLink
          to={routes.studentContestSubmissions(dashboard.codigo)}
          className="flex shrink-0 items-center gap-2 border-b-2 border-transparent px-5 py-3 text-sm font-bold text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
        >
          <FileCode2 className="size-4" aria-hidden="true" />
          <span>Mis envíos</span>
        </NavLink>
      </nav>

      <section id="problems-panel" className="w-full min-w-0">
        <ProblemsTable
          problems={dashboard.problemas}
          pdfUrl={dashboard.urlSetProblemas}
        />
      </section>
    </>
  )
}
