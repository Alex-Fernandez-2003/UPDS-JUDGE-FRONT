import { RefreshCw } from 'lucide-react'
import { Alert, Button, Card } from '@/components/common'
import { useUserSubmissions } from './hooks'
import { formatPaginationMetadata, mapSubmissionRow } from './mapper'
import { RecentSubmissionsTable } from './RecentSubmissionsTable'

const recentParams = { pagina: 1, tamanoPagina: 5 }

export function RecentSubmissionsSection() {
  const { data, error, isLoading, isFetching, refetch } =
    useUserSubmissions(recentParams)
  const rows = data?.datos.map(mapSubmissionRow) ?? []
  const refresh = () => {
    if (!isFetching) void refetch()
  }

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
            onClick={refresh}
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
          <>
            <RecentSubmissionsTable rows={rows} loading={isLoading} />
            {data && (
              <p className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                {formatPaginationMetadata({
                  total: data.total,
                  pagina: data.pagina,
                  tamanoPagina: data.tamanoPagina,
                  received: data.datos.length,
                })}
              </p>
            )}
          </>
        )}
      </section>
    </Card>
  )
}
