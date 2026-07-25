
import { useState, useEffect, useCallback, useMemo } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom' 
import { Calendar, BookOpen, Send, Trophy } from 'lucide-react'

import { UserLayout } from '@/layouts/UserLayout'
import { Alert } from '@/components/common'

import { SubmitForm } from '../components/submitForm'
import { SubmissionsTable } from '../components/submissionsTable'
import { SubmissionsStats } from '../components/submissionsStats'

import { submissionsService } from '../Types/submissionsService'

import type { SubmissionItem } from '../Types/submissionTypes'
import type { CrearEnvioDto } from '../Types/sumbitTypes'

export default function SubmissionsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()

  // ============================================
  // Estado de la tabla y paginación
  // ============================================
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([])
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // ============================================
  // Filtros y UI
  // ============================================
  const [problemFilter, setProblemFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ============================================
  // Lista unificada de problemas
  // ============================================
  const cantidadProblemas = 5

  const contestProblems = useMemo(() => {
    return Array.from({ length: cantidadProblemas }, (_, i) => {
      const letter = String.fromCharCode(65 + i)
      return {
        inciso: letter,
        titulo: `Problema ${letter}`,
      }
    })
  }, [cantidadProblemas])

  // ============================================
  // Cargar envíos desde la API
  // ============================================
  const fetchSubmissions = useCallback(async () => {
    if (!contestCode) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await submissionsService.getMySubmissions(
        contestCode,
        {
          pagina: currentPage,
          tamanoPagina: 5,
          inciso: problemFilter || undefined,
        }
      )

      setSubmissions(response.datos)
      setTotalSubmissions(response.total)

      const pages = Math.max(
        1,
        Math.ceil(response.total / response.tamanoPagina)
      )

      setTotalPages(pages)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los envíos.')
    } finally {
      setIsLoading(false)
    }
  }, [contestCode, currentPage, problemFilter])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  // ============================================
  // Handler de envío de solución
  // ============================================
  const handleSubmitSolution = async (payload: CrearEnvioDto) => {
    setIsSubmitting(true)
    setError(null)
    try {
      await submissionsService.createSubmission(payload)
      await fetchSubmissions()
      
      setProblemFilter('') 
      setCurrentPage(1)
    } catch (err) {
      console.error(err)
      setError('Ocurrió un error al enviar la solución. Por favor reintenta.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ============================================
  // Eventos de Paginación y Filtro
  // ============================================
  const handleFilterChange = (inciso: string) => {
    setProblemFilter(inciso)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // ============================================
  // Estadísticas calculadas
  // ============================================
  const acceptedCount = submissions.filter(
    (s) => s.veredicto === 'Accepted'
  ).length

  const incorrectCount = submissions.filter((s) =>
    [
      'Wrong Answer',
      'Time Limit Exceeded',
      'Runtime Error',
      'Memory Limit Exceeded',
      'Compilation Error',
    ].includes(s.veredicto)
  ).length

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Banner Superior integrado al flujo normal */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                    Código Concurso: <strong className="text-slate-800">{contestCode}</strong>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>Duración: 4 horas</span>
                </div>
              </div>
            </div>

            {/* Pestañas de Navegación del Concurso */}
            <div className="flex border-b border-slate-100 gap-8 text-sm font-semibold pt-1">
              <button className="flex items-center gap-2 pb-3 text-slate-500 transition-colors hover:text-slate-900">
                <BookOpen className="h-4 w-4" />
                Problemas
              </button>

              <button className="flex items-center gap-2 border-b-2 border-slate-900 pb-3 font-bold text-slate-900">
                <Send className="h-4 w-4" />
                Mis envíos
              </button>

              <button className="flex items-center gap-2 pb-3 text-slate-500 transition-colors hover:text-slate-900">
                <Trophy className="h-4 w-4" />
                Clasificación
              </button>
            </div>
          </div>
        </div>

        {/* Mensajes de Error */}
        {error && <Alert tone="danger">{error}</Alert>}

        {/* Grid Principal Adaptado al Ancho del UserLayout */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Columna Izquierda: Formulario (5 columnas) */}
          <div className="lg:col-span-5">
            <SubmitForm
              contestCode={contestCode || ''}
              problems={contestProblems}
              onSubmit={handleSubmitSolution}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Columna Derecha: Tabla + Stats (7 columnas) */}
          <div className="space-y-6 lg:col-span-7">
            <SubmissionsTable
              submissions={submissions}
              total={totalSubmissions}
              currentPage={currentPage}
              totalPages={totalPages}
              selectedProblem={problemFilter}
              problemCount={cantidadProblemas}
              loading={isLoading}
              onProblemChange={handleFilterChange}
              onPageChange={handlePageChange}
              onRefresh={fetchSubmissions}
            />

            <SubmissionsStats
              accepted={acceptedCount}
              incorrect={incorrectCount}
              total={totalSubmissions}
            />
          </div>
        </div>
      </div>
    </UserLayout>
  )
}