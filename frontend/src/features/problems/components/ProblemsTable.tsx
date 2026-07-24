// features/problems/components/ProblemsTable.tsx
import { Check } from 'lucide-react'
import { Badge } from '@/components/common'
import type { DashboardProblem } from '../types'

type Tone = 'success' | 'danger' | 'neutral' | 'warning'

const estadoConfig: Record<
  DashboardProblem['estado'],
  { tone: Tone; label: string }
> = {
  Aceptado: { tone: 'success', label: 'Aceptado' },
  'Respuesta incorrecta': { tone: 'danger', label: 'Respuesta incorrecta' },
  'Sin intentar': { tone: 'neutral', label: 'Sin intentar' },
  TLE: { tone: 'warning', label: 'TLE' },
}

interface ProblemsTableProps {
  problems: DashboardProblem[]
  emptyText?: string
}

export function ProblemsTable({
  problems,
  emptyText = 'No hay problemas para mostrar.',
}: ProblemsTableProps) {
  if (problems.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-[var(--text-secondary)]">
        {emptyText}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] font-bold uppercase tracking-wide text-[var(--text-secondary)]">
            <th className="px-6 py-3 font-bold">Tag</th>
            <th className="px-6 py-3 font-bold">Problema</th>
            <th className="px-6 py-3 font-bold text-right">Memoria</th>
            <th className="px-6 py-3 font-bold text-right">Tiempo</th>
            <th className="px-6 py-3 font-bold text-right">Intentos</th>
            <th className="px-6 py-3 font-bold text-right">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {problems.map((problem) => {
            const { tone, label } = estadoConfig[problem.estado]
            return (
              <tr key={problem.inciso}>
                <td className="px-6 py-4 font-bold text-[var(--text-secondary)]">
                  {problem.inciso}
                </td>
                <td className="px-6 py-4 font-bold">{problem.titulo}</td>
                <td className="px-6 py-4 text-right font-mono text-[var(--text-secondary)]">
                  {problem.memoria}
                </td>
                <td className="px-6 py-4 text-right font-mono text-[var(--text-secondary)]">
                  {problem.tiempo}
                </td>
                <td className="px-6 py-4 text-right">{problem.intentos}</td>
                <td className="px-6 py-4 text-right">
                  <Badge tone={tone} className="inline-flex items-center gap-1">
                    {tone === 'success' && <Check className="size-3" />}
                    {label}
                  </Badge>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
