import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Alert, Spinner } from '@/components/common'
import {
  ContestContextHeader,
  type ContestContextNavigationItem,
} from '@/features/contests/components/ContestContextHeader'
import { UserLayout } from '@/layouts/UserLayout'
import { getContestDashboard } from '@/features/problems/service'
import type { ContestDashboard } from '@/features/problems/types'
import { routes } from '@/routes/constants'
import { SubmitSolutionModal } from '../components/SubmitSolutionModal'
import { SubmissionsTable } from '../components/submissionsTable'
import { submissionsService } from '../Types/submissionsService'
import type { SubmissionItem, RunningStatus } from '../Types/submissionTypes'
import type { CrearEnvioDto } from '../Types/sumbitTypes'
import { useContestMetadata } from '@/features/contests/metadata-hooks'

const PAGE_SIZE = 5

const RUNTIME_STATUSES: ReadonlySet<string> = new Set<RunningStatus>([
  'En Cola',
  'Procesando',
  'Evaluando',
])

const POLL_INTERVAL_MS = 5_000
const POLL_GRACE_POLLS = 3
const POLL_MAX_POLLS = 12

export function ContestSubmissionsContent({
  contestCode,
  navigationItems,
}: {
  contestCode?: string
  navigationItems: ContestContextNavigationItem[]
}) {
  const [dashboard, setDashboard] = useState<ContestDashboard | null>(null)
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([])
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [problemFilter, setProblemFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pollingActive, setPollingActive] = useState(false)
  const pollCountRef = useRef(0)
  const metadataQuery = useContestMetadata(contestCode)
  const [pendingSubmissionId, setPendingSubmissionId] = useState<number | null>(
    null,
  )

  useEffect(() => {
    if (!contestCode) return
    let active = true
    void getContestDashboard(contestCode)
      .then((result) => active && setDashboard(result ?? null))
      .catch((requestError: unknown) => {
        if (active)
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se pudo cargar el concurso.',
          )
      })
    return () => {
      active = false
    }
  }, [contestCode])

  const fetchSubmissions = useCallback(async () => {
    if (!contestCode) return
    setIsLoading(true)
    setError(null)
    try {
      const response = await submissionsService.getMySubmissions(contestCode, {
        pagina: currentPage,
        tamanoPagina: PAGE_SIZE,
        inciso: problemFilter || undefined,
      })
      setSubmissions(response.datos)
      setTotalSubmissions(response.total)
      setTotalPages(
        Math.max(1, Math.ceil(response.total / response.tamanoPagina)),
      )
    } catch (requestError: unknown) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'No se pudieron cargar los envíos.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [contestCode, currentPage, problemFilter])

  useEffect(() => {
    void fetchSubmissions()
  }, [fetchSubmissions])

  // Poll history after a POST so the UI shows EN PROGRESO and
  // transitions to a final verdict without requiring manual refresh.
  // Polling starts even if the first GET after POST hasn't returned
  // the running row yet, and continues until a running submission is
  // resolved or the max poll count is reached.
  // The POLL_GRACE_POLLS restriction only applies to the initial load,
  // not to submissions that were posted via handleSubmitSolution.
  useEffect(() => {
    const hasRunning = submissions.some((item) =>
      RUNTIME_STATUSES.has(item.veredicto),
    )

    // NEW: Check if there's a pending submission (posted but not yet reconciled)
    const pendingUnresolved =
      pendingSubmissionId != null &&
      !submissions.some((item) => item.idEnvio === pendingSubmissionId)

    const shouldStop =
      !pollingActive ||
      (hasRunning || pendingUnresolved
        ? false
        : !hasRunning && pollCountRef.current >= POLL_GRACE_POLLS) ||
      pollCountRef.current >= POLL_MAX_POLLS

    if (shouldStop) {
      setPollingActive(false)
      return
    }

    const interval = window.setInterval(() => {
      pollCountRef.current++
      void fetchSubmissions()
    }, POLL_INTERVAL_MS)
    return () => window.clearInterval(interval)
  }, [submissions, pollingActive, fetchSubmissions, pendingSubmissionId])

  const handleSubmitSolution = async (payload: CrearEnvioDto) => {
    const created = await submissionsService.createSubmission(payload)
    if (created?.idEnvio !== undefined) {
      setPendingSubmissionId(created.idEnvio)
    }
    pollCountRef.current = 0
    setPollingActive(true)
    await fetchSubmissions()
  }

  const problems = useMemo(
    () =>
      dashboard?.problemas.map(({ inciso, titulo }) => ({ inciso, titulo })) ??
      [],
    [dashboard],
  )

  // Build pending row data when a submission was posted but not yet reconciled
  const pendingRow: SubmissionItem | null =
    pendingSubmissionId != null &&
    !submissions.some((item) => item.idEnvio === pendingSubmissionId)
      ? {
          idEnvio: pendingSubmissionId,
          concursoCodigo: '',
          problemaTitulo: '',
          inciso: '',
          lenguaje: '',
          veredicto: 'En Cola' as const,
          consumoTiempo: 0,
          consumoMemoria: 0,
          fechaEnvio: new Date().toISOString(),
        }
      : null

  if (!contestCode)
    return <Alert tone="danger">El código del concurso es obligatorio.</Alert>
  if (!dashboard && !error) return <Spinner label="Cargando concurso" />

  return (
    <div className="w-full min-w-0 space-y-6">
      {dashboard && (
        <ContestContextHeader
          contest={{
            code: dashboard.codigo,
            name: dashboard.nombre,
            status: dashboard.estadoTiempo,
            startsAt: metadataQuery.data?.fechaInicio ?? null,
            endsAt: dashboard.fechaFin,
          }}
          activeSection="submissions"
          navigationItems={navigationItems}
          durationMinutes={metadataQuery.data?.duracionMinutos ?? null}
        />
      )}
      {error && <Alert tone="danger">{error}</Alert>}
      <div className="min-w-0">
        <SubmissionsTable
          submissions={submissions}
          total={totalSubmissions}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedProblem={problemFilter}
          problemCount={dashboard?.totalProblemas ?? 0}
          loading={isLoading}
          onProblemChange={(inciso) => {
            setProblemFilter(inciso)
            setCurrentPage(1)
          }}
          onPageChange={setCurrentPage}
          onRefresh={fetchSubmissions}
          onSubmitSolution={() => setIsSubmitModalOpen(true)}
        />
      </div>
      {pendingRow && (
        <SubmissionsTable
          submissions={[...submissions, pendingRow]}
          total={totalSubmissions + 1}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedProblem={problemFilter}
          problemCount={dashboard?.totalProblemas ?? 0}
          loading={isLoading}
          onProblemChange={(inciso) => {
            setProblemFilter(inciso)
            setCurrentPage(1)
          }}
          onPageChange={setCurrentPage}
          onRefresh={fetchSubmissions}
          onSubmitSolution={() => setIsSubmitModalOpen(true)}
        />
      )}
      {isSubmitModalOpen && dashboard && (
        <SubmitSolutionModal
          contest={{ code: dashboard.codigo, name: dashboard.nombre }}
          problems={problems}
          initialProblem={problemFilter}
          onSubmit={handleSubmitSolution}
          onClose={() => setIsSubmitModalOpen(false)}
        />
      )}
    </div>
  )
}

export default function SubmissionsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  const navigationItems: ContestContextNavigationItem[] = [
    {
      id: 'problems',
      label: 'Problemas',
      to: routes.studentContestProblems(contestCode ?? ''),
    },
    {
      id: 'submissions',
      label: 'Mis envíos',
      to: routes.studentContestSubmissions(contestCode ?? ''),
    },
    {
      id: 'ranking',
      label: 'Ranking',
      to: routes.studentContestRanking(contestCode ?? ''),
    },
  ]
  return (
    <UserLayout>
      <main className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <ContestSubmissionsContent
          contestCode={contestCode}
          navigationItems={navigationItems}
        />
      </main>
    </UserLayout>
  )
}
