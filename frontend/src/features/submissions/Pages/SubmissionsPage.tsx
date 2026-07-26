import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { SubmitForm } from '../components/submitForm'
import { SubmissionsTable } from '../components/submissionsTable'
import { submissionsService } from '../Types/submissionsService'
import type { SubmissionItem } from '../Types/submissionTypes'
import type { CrearEnvioDto } from '../Types/sumbitTypes'

const PAGE_SIZE = 5

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleSubmitSolution = async (payload: CrearEnvioDto) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await submissionsService.createSubmission(payload)
      setProblemFilter('')
      setCurrentPage(1)
      await fetchSubmissions()
    } catch {
      setError('Ocurrió un error al enviar la solución. Por favor reintenta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const problems = useMemo(
    () =>
      dashboard?.problemas.map(({ inciso, titulo }) => ({ inciso, titulo })) ??
      [],
    [dashboard],
  )

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
            endsAt: dashboard.fechaFin,
          }}
          activeSection="submissions"
          navigationItems={navigationItems}
        />
      )}
      {error && <Alert tone="danger">{error}</Alert>}
      <div className="grid w-full min-w-0 gap-6 xl:grid-cols-[minmax(20rem,0.7fr)_minmax(0,1.3fr)] xl:items-start">
        <SubmitForm
          contestCode={contestCode}
          problems={problems}
          onSubmit={handleSubmitSolution}
          isSubmitting={isSubmitting}
        />
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
          />
        </div>
      </div>
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
