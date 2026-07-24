import { useState, useEffect, useCallback, useMemo } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import {
  Calendar,
  Clock,
  BookOpen,
  Send,
  Trophy,
} from 'lucide-react'

import { AppLogo } from '@/components/branding/AppLogo'
import { UserMenu } from '@/components/navigation/UserMenu'
import { deriveIdentity } from '@/lib/auth/identity'
import { routes } from '@/routes/constants'
import { cn } from '@/lib/utils/cn'
import { Alert } from '@/components/common'

import { SubmitForm } from '../components/submitForm'
import { SubmissionsTable } from '../components/submissionsTable'
import { SubmissionsStats } from '../components/submissionsStats'

import { submissionsService } from '../Types/submissionsService'

import type { SubmissionItem } from '../Types/submissionTypes'
import type { CrearEnvioDto } from '../Types/sumbitTypes'

const userNavigation = [{ label: 'Inicio', path: routes.studentHome }]

export default function SubmissionsPage() {
  const identity = deriveIdentity(sessionStorage.getItem('token'))
  const location = useLocation()

  // Extraemos el parámetro dinámico `:contestCode` desde la URL
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
  // CORRECCIÓN: Lista unificada de problemas
  // ============================================
  // Cantidad de problemas configurados para el concurso (por defecto 5 o configurable)
  // En el futuro, esto idealmente vendría de tu backend (ej: api.getContest(contestCode))
  const cantidadProblemas = 5

  // Generamos el arreglo [A, B, C, D, E] basado en la cantidad de problemas
  // Usamos useMemo para que no se recalcule en cada renderizado
  const contestProblems = useMemo(() => {
    return Array.from({ length: cantidadProblemas }, (_, i) => {
      const letter = String.fromCharCode(65 + i)
      return {
        inciso: letter,
        titulo: `Problema ${letter}`, // Puedes omitirlo o actualizarlo si el backend te da los títulos reales
      }
    })
  }, [cantidadProblemas])


  // ============================================
  // Cargar envíos desde la API
  // ============================================
  const fetchSubmissions = useCallback(async () => {
    // Si la URL no trae contestCode, evitamos realizar la petición
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
      // Recargar la lista de envíos para mostrar el nuevo envío
      await fetchSubmissions()
      
      // Opcional: mostrar una alerta de éxito o limpiar filtro para ver el envío
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
  // Estadísticas calculadas (sobre los datos cargados)
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
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between">
      <div>
        {/* Header Ancho Completo */}
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white px-6 lg:px-12">
          <div className="mx-auto flex min-h-16 w-full max-w-[1700px] items-center justify-between gap-4">
            <AppLogo alt="UPDS Judge" variant="default" />

            <nav
              aria-label="Navegación de usuario"
              className="min-w-0 overflow-x-auto"
            >
              <ul className="flex items-center gap-2 whitespace-nowrap">
                {userNavigation.map((item) => {
                  const active = location.pathname === item.path
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[var(--focus)]',
                          active
                            ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex min-w-0 items-center gap-3">
              <div className="hidden min-w-0 text-right sm:block">
                <p className="truncate text-sm font-semibold">
                  {identity?.name || identity?.email || 'Usuario'}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">Usuario</p>
              </div>
              <UserMenu identity={identity} />
            </div>
          </div>
        </header>

        {/* Hero Banner del Concurso */}
        <div className="border-b border-slate-200 bg-white px-6 py-8 lg:px-12">
          <div className="mx-auto max-w-[1700px] space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl lg:text-4xl">
                    I Olimpiada de Programación UPDS
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-700">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                    ACTIVO
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 md:text-sm">
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
            <div className="flex border-b border-slate-200 gap-10 text-sm font-semibold pt-2">
              <button className="flex items-center gap-2 pb-4 text-slate-500 transition-colors hover:text-slate-900">
                <BookOpen className="h-4 w-4" />
                Problemas
              </button>

              <button className="flex items-center gap-2 border-b-2 border-blue-600 pb-4 font-bold text-blue-600">
                <Send className="h-4 w-4" />
                Mis envíos
              </button>

              <button className="flex items-center gap-2 pb-4 text-slate-500 transition-colors hover:text-slate-900">
                <Trophy className="h-4 w-4" />
                Clasificación
              </button>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <main className="px-6 py-10 lg:px-12">
          <div className="mx-auto max-w-[1700px] space-y-10">
            {error && <Alert tone="danger">{error}</Alert>}

            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              {/* Columna Izquierda: Formulario + Progreso */}
              <div className="space-y-8 lg:col-span-5 xl:col-span-4">
                
                {/* CORRECCIÓN: Le pasamos los problemas al SubmitForm */}
                <SubmitForm
                  contestCode={contestCode || ''}
                  problems={contestProblems} 
                  onSubmit={handleSubmitSolution}
                  isSubmitting={isSubmitting}
                />
                
              </div>

              {/* Columna Derecha: Tabla + Stats */}
              <div className="space-y-8 lg:col-span-7 xl:col-span-8">
                
                {/* CORRECCIÓN: Le pasamos los mismos problemas a la Tabla para el Filtro */}
                <SubmissionsTable
                  submissions={submissions}
                  total={totalSubmissions}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  selectedProblem={problemFilter}
                  availableProblems={contestProblems} 
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
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-xs text-slate-500 lg:px-12">
        <div className="mx-auto flex max-w-[1700px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-700">UPDS Judge Engine v2.4.0</span>
            <span>•</span>
            <a href="#doc" className="hover:underline">Documentación</a>
            <span>•</span>
            <a href="#terminos" className="hover:underline">Términos</a>
          </div>

          <div>
            Soporte Técnico:{' '}
            <a href="mailto:soporte@upds.edu.bo" className="font-semibold text-blue-600 hover:underline">
              soporte@upds.edu.bo
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}