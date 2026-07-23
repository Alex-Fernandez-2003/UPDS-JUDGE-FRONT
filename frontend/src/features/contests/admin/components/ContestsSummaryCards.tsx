import { Alert } from '@/components/common'
import { StatCard } from '@/components/navigation'
import type { ConcursosAdminResumen } from '../types'

export function ContestsSummaryCards({
  resumen,
  error,
  isLoading = false,
  isRefreshing = false,
}: {
  resumen?: ConcursosAdminResumen
  error?: string
  isLoading?: boolean
  isRefreshing?: boolean
}) {
  if (error && !resumen) return <Alert tone="danger">{error}</Alert>

  const cards = [
    {
      key: 'activos',
      label: 'Activos',
      value: resumen?.activos,
      tone: 'success' as const,
    },
    {
      key: 'proximos',
      label: 'Pendientes',
      value: resumen?.proximos,
      tone: 'neutral' as const,
    },
    {
      key: 'finalizados',
      label: 'Finalizados',
      value: resumen?.finalizados,
      tone: 'neutral' as const,
    },
  ]

  return (
    <section aria-label="Resumen de concursos" className="space-y-2">
      {error && <Alert tone="danger">{error}</Alert>}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={isLoading && !resumen ? '—' : (card.value ?? '—')}
            tone={card.tone}
          />
        ))}
      </div>
      {isRefreshing && resumen && (
        <p role="status" className="text-sm text-[var(--text-secondary)]">
          Actualizando resumen…
        </p>
      )}
    </section>
  )
}
