import { useState, useEffect, useCallback } from 'react'

import { Alert } from '@/components/common'
import { StatCard } from '@/components/navigation'

import { SubmissionsTable } from '../components/submissionsTable'
import { submissionsService } from '../Types/submissionsService'

import type { SubmissionItem } from '../Types/submissionTypes'

// =====================================================
// Página: Mis envíos
// Responsabilidad:
// - Obtener envíos desde la API
// - Manejar loading y errores
// - Controlar filtros y paginación
// - Pasar datos a los componentes visuales
// =====================================================

export default function SubmissionsPage() {
  // ===================================================
  // Estado de datos
  // ===================================================

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([])

  const [totalSubmissions, setTotalSubmissions] = useState(0)

  // ===================================================
  // Estado de paginación
  // ===================================================

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // ===================================================
  // Estado de filtros
  // ===================================================

  const [problemFilter, setProblemFilter] = useState('')

  // ===================================================
  // Estado de UI
  // ===================================================

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ===================================================
  // Problemas disponibles para el filtro
  // En el futuro esto puede venir desde la API
  // ===================================================

  const availableProblems = Array.from(
    new Map(
      submissions.map((submission) => [
        submission.inciso,
        {
          inciso: submission.inciso,
          titulo: submission.problemaTitulo,
        },
      ])
    ).values()
  ).sort((a, b) => a.inciso.localeCompare(b.inciso))

  // ===================================================
  // Obtener envíos desde el backend
  // ===================================================

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await submissionsService.getMySubmissions({
        pagina: currentPage,
        tamanoPagina: 7,
        inciso: problemFilter || undefined,
      })

      // Guardar envíos
      setSubmissions(response.datos)

      // Guardar total
      setTotalSubmissions(response.total)

      // Calcular páginas
      const pages = Math.max(
        1,
        Math.ceil(response.total / response.tamanoPagina),
      )

      setTotalPages(pages)
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los envíos.')
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, problemFilter])

  // ===================================================
  // Ejecutar la carga cuando cambie la página o filtro
  // ===================================================

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  // ===================================================
  // Manejadores de eventos
  // ===================================================

  const handleFilterChange = (inciso: string) => {
    setProblemFilter(inciso)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // ===================================================
  // Estadísticas rápidas
  // ===================================================

  const acceptedCount = submissions.filter(
    (s) => s.veredicto === 'Accepted',
  ).length

  const incorrectCount = submissions.filter(
    (s) => s.veredicto === 'Wrong Answer' || s.veredicto === 'Time Limit Exceeded' || s.veredicto === 'Runtime Error' || s.veredicto === 'Memory Limit Exceeded', 
  ).length

  // ===================================================
  // Render
  // ===================================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ========================================
            Encabezado
        ======================================== */}
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Mis envíos
          </h1>

          <p className="mt-1 text-slate-600">
            Historial de soluciones enviadas al juez virtual.
          </p>
        </div>

        {/* ========================================
            Error
        ======================================== */}
        {error && (
          <Alert tone="danger">
            {error}
          </Alert>
        )}

        {/* ========================================
            Estadísticas
        ======================================== */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="ACEPTADAS"
            value={acceptedCount}
            tone="success"
          />

          <StatCard
            label="INCORRECTAS"
            value={incorrectCount}
          />

          <StatCard
            label="TOTAL ENVÍOS"
            value={totalSubmissions}
            tone="info"
          />
        </div>

        {/* ========================================
            Tabla de envíos
        ======================================== */}
        <SubmissionsTable
          submissions={submissions}
          total={totalSubmissions}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedProblem={problemFilter}
          availableProblems={availableProblems}
          loading={isLoading}
          onProblemChange={handleFilterChange}
          onPageChange={handlePageChange}
          onRefresh={fetchSubmissions}
        />
      </div>
    </div>
  )
}