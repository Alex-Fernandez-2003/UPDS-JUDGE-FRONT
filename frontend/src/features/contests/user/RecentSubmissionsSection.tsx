import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Alert, Button, Card } from '@/components/common'
import { useUserSubmissions } from './hooks'
import { formatPaginationMetadata, mapSubmissionRow } from './mapper'
import { RecentSubmissionsTable } from './RecentSubmissionsTable'
const pageSize = 5
export function RecentSubmissionsSection() {
  const [page, setPage] = useState(1)
  const { data, error, isLoading, isFetching, refetch } = useUserSubmissions({
    pagina: page,
    tamanoPagina: pageSize,
  })
  const totalPages = Math.max(
    1,
    Math.ceil((data?.total ?? 0) / (data?.tamanoPagina ?? pageSize)),
  )
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])
  const rows = data?.datos.map(mapSubmissionRow) ?? []
  return (
    <Card className="mt-6 overflow-hidden p-0">
      <section aria-labelledby="recent-submissions-title">
        <div className="flex flex-col gap-4 border-b border-[var(--border)] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="recent-submissions-title" className="text-xl font-bold">
              Envíos recientes
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Historial de tus participaciones recientes en concursos.
            </p>
          </div>
          <Button
            variant="outline"
            leftIcon={<RefreshCw className="size-4" aria-hidden="true" />}
            loading={isFetching && !isLoading}
            disabled={isFetching}
            onClick={() => {
              if (!isFetching) void refetch()
            }}
            aria-label="Actualizar envíos recientes"
          >
            Actualizar
          </Button>
        </div>
        {error ? (
          <div className="p-5">
            <Alert tone="danger">
              No se pudieron cargar los envíos recientes.
            </Alert>
          </div>
        ) : (
          data && (
            <RecentSubmissionsTable
              rows={rows}
              loading={isLoading}
              page={page}
              totalPages={totalPages}
              range={formatPaginationMetadata({
                total: data.total,
                pagina: data.pagina,
                tamanoPagina: data.tamanoPagina,
                received: data.datos.length,
              })}
              onPreviousPage={() => setPage(page - 1)}
              onNextPage={() => setPage(page + 1)}
            />
          )
        )}
      </section>
    </Card>
  )
}
