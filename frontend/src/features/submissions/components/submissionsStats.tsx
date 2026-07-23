import { StatCard } from '@/components/navigation/index'

interface SubmissionsStatsProps {
  accepted: number
  incorrect: number
  total: number
}

export function SubmissionsStats({
  accepted,
  incorrect,
  total,
}: SubmissionsStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        label="ACEPTADAS"
        value={accepted}
        tone="success"
      />

      <StatCard
        label="INCORRECTAS"
        value={incorrect}
      />

      <StatCard
        label="TOTAL ENVÍOS"
        value={total}
        tone="info"
      />
    </div>
  )
}