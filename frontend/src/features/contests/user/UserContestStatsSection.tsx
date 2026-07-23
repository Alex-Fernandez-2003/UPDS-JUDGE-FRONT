import { Alert, Card, Skeleton } from '@/components/common'
import { useUserContestStats } from './hooks'

const statLabels = [
  ['concursosParticipados', 'Concursos participados'],
  ['problemasResueltos', 'Problemas resueltos'],
  ['problemasPendientes', 'Problemas pendientes'],
  ['precisionPorcentaje', 'Precisión'],
] as const

export function UserContestStatsSection() {
  const { data, error, isLoading } = useUserContestStats()
  if (error)
    return <Alert tone="danger">No se pudieron cargar tus estadísticas.</Alert>

  return (
    <section aria-labelledby="user-stats-title">
      <h2 id="user-stats-title" className="text-xl font-bold">
        Tu actividad
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statLabels.map(([key, label]) => (
          <Card key={key} className="p-4">
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
            {isLoading ? (
              <Skeleton className="mt-2 h-8 w-16" />
            ) : (
              <p className="mt-2 text-2xl font-bold">
                {data?.[key] ?? 0}
                {key === 'precisionPorcentaje' ? '%' : ''}
              </p>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
