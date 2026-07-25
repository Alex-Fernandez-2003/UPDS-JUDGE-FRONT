import { Card } from '@/components/common'
import type { ConcursoListItem } from '@/features/contests/types'
import { ContestCard } from './ContestCard'

export function UserContestsGrid({
  rows,
  loading,
}: {
  rows: ConcursoListItem[]
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse bg-slate-100 p-6" />
        ))}
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--text-secondary)]">
        No hay concursos para los filtros seleccionados.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((contest) => (
        <ContestCard key={contest.idConcurso} contest={contest} />
      ))}
    </div>
  )
}
