import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, BookOpen, Send, Trophy } from 'lucide-react'
import { Alert } from '@/components/common'
import { UserLayout } from '@/layouts/UserLayout'
import { routes } from '@/routes/constants'
import { SubmitForm } from '../components/submitForm'
import { SubmissionsTable } from '../components/submissionsTable'
import { submissionsService } from '../Types/submissionsService'
import type { SubmissionItem } from '../Types/submissionTypes'
import type { CrearEnvioDto } from '../Types/sumbitTypes'

const PAGE_SIZE = 5

export default function SubmissionsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([])
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [problemFilter, setProblemFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cantidadProblemas = 5
  const contestProblems = useMemo(
    () =>
      Array.from({ length: cantidadProblemas }, (_, index) => {
        const inciso = String.fromCharCode(65 + index)
        return { inciso, titulo: `Problema ${inciso}` }
      }),
    [],
  )

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
    } catch {
      setError('No se pudieron cargar los envíos.')
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
    } catch {
      setError('Ocurrió un error al enviar la solución. Por favor reintenta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <UserLayout>
      <div className="w-full min-w-0 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  I Olimpiada de Programación UPDS
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  ACTIVO
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  Código Concurso:{' '}
                  <strong className="text-slate-800">{contestCode}</strong>
                </span>
                <span className="text-slate-300">•</span>
                <span>Duración: 4 horas</span>
              </div>
            </div>
            <nav
              aria-label="Navegación del concurso"
              className="flex gap-5 overflow-x-auto border-b border-slate-100 pt-1 text-sm font-semibold"
            >
              <Link
                className="flex shrink-0 items-center gap-2 pb-3 text-slate-500 transition-colors hover:text-slate-900"
                to={routes.studentContestProblems(contestCode || '')}
              >
                <BookOpen className="h-4 w-4" />
                Problemas
              </Link>
              <span className="flex shrink-0 items-center gap-2 border-b-2 border-slate-900 pb-3 font-bold text-slate-900">
                <Send className="h-4 w-4" />
                Mis envíos
              </span>
              <span className="flex shrink-0 items-center gap-2 pb-3 text-slate-500">
                <Trophy className="h-4 w-4" />
                Clasificación
              </span>
            </nav>
          </div>
        </div>
        {error && <Alert tone="danger">{error}</Alert>}
        <div className="grid w-full min-w-0 gap-6 xl:grid-cols-[minmax(20rem,0.7fr)_minmax(0,1.3fr)] xl:items-start">
          <div className="">
            <SubmitForm
              contestCode={contestCode || ''}
              problems={contestProblems}
              onSubmit={handleSubmitSolution}
              isSubmitting={isSubmitting}
            />
          </div>
          <div className="min-w-0">
            <SubmissionsTable
              submissions={submissions}
              total={totalSubmissions}
              currentPage={currentPage}
              totalPages={totalPages}
              selectedProblem={problemFilter}
              problemCount={cantidadProblemas}
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
    </UserLayout>
  )
}
