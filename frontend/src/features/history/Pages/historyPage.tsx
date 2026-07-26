import { useCallback, useEffect, useState } from 'react'
import { Alert } from '@/components/common'
import { RecentSubmissionsTable } from '../../contests/user/RecentSubmissionsTable'
import type { RecentSubmissionRow } from '../../contests/user/types'
import { historyService } from '../Types/historyService'
import type { HistoryItem } from '../Types/historyTypes'

// Función helper para mapear los veredictos a los tonos de color de Badge
function getVerdictTone(veredicto: string): 'success' | 'danger' | 'warning' | 'neutral' {
  const v = veredicto.toUpperCase()
  if (v.includes('ACCEPTED') || v === 'AC') return 'success'
  if (v.includes('WRONG') || v.includes('ERROR') || v === 'WA') return 'danger'
  if (v.includes('TIME') || v.includes('MEMORY') || v === 'TLE' || v === 'MLE') return 'warning'
  return 'neutral'
}

export default function UserHistoryPage() {
  const [submissions, setSubmissions] = useState<HistoryItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    setError(undefined)
    try {
      const response = await historyService.getMisEnvios({
        pagina: currentPage,
        tamanoPagina: pageSize,
      })
      setSubmissions(response.datos)
      setTotal(response.total)
    } catch (err) {
      console.error('Error al cargar historial:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al obtener el historial de envíos.',
      )
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const totalPages = Math.ceil(total / pageSize) || 1

  const fromIndex = total === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const toIndex = Math.min(currentPage * pageSize, total)
  const range = `Mostrando ${fromIndex}-${toIndex} de ${total} envíos`

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  // Transformación sin el campo idEnvio
  const tableRows: RecentSubmissionRow[] = submissions.map((item) => ({
    contestCode: item.concursoCodigo,
    problemLabel: `${item.inciso ? `${item.inciso} - ` : ''}${item.problemaTitulo}`,
    language: item.lenguaje,
    verdictLabel: item.veredicto,
    verdictTone: getVerdictTone(item.veredicto),
    timeLabel: `${item.consumoTiempo} ms`,
    memoryLabel:
      item.consumoMemoria >= 1024
        ? `${(item.consumoMemoria / 1024).toFixed(2)} MB`
        : `${item.consumoMemoria} KB`,
    submittedAtLabel: new Date(item.fechaEnvio).toLocaleString(),
  }))

  return (
    <div className="w-full min-w-0 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Cabecera */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
              Historial de Mis Envíos
            </h1>
            <p className="text-sm font-medium text-[var(--text-secondary)] sm:text-base">
              Registro global de todas las soluciones enviadas en los concursos activos.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-3 shadow-[var(--shadow-sm)]">
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Total de envíos:
            </span>
            <span className="text-2xl font-black text-[var(--brand)]">
              {total}
            </span>
          </div>
        </div>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}

      {/* Tabla con Paginación Activa */}
      <div className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
        <RecentSubmissionsTable
          rows={tableRows}
          loading={loading}
          error={error}
          page={currentPage}
          totalPages={totalPages}
          range={range}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  )
}