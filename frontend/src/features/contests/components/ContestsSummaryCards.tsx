import { StatCard } from '@/components/navigation'
import type { ConcursosAdminResumen } from '../types'

export function ContestsSummaryCards({
  resumen,
  isLoading = false,
}: {
  resumen?: ConcursosAdminResumen
  isLoading?: boolean
}) {
  const cards = [
    {
      key: 'activos',
      label: 'Activos',
      value: resumen?.activos ?? 0,
      tone: 'success' as const,
    },
    {
      key: 'proximos',
      label: 'Próximos',
      value: resumen?.proximos ?? 0,
      tone: 'neutral' as const,
    },
    {
      key: 'finalizados',
      label: 'Finalizados',
      value: resumen?.finalizados ?? 0,
      tone: 'neutral' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto justify-center w-full">
      {cards.map((card) => (
        <StatCard
          key={card.key}
          label={card.label}
          value={isLoading ? '—' : card.value}
          tone={card.tone}
        />
      ))}
    </div>
  )
}
