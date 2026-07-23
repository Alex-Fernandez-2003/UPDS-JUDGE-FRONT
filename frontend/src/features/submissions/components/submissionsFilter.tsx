import { Filter } from 'lucide-react'
import { Select } from '@/components/forms'

interface Props {
  value: string
  onChange: (value: string) => void
  problems: { inciso: string; titulo: string }[]
}

export function SubmissionsFilter({
  value,
  onChange,
  problems,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Filter className="size-4 text-[var(--text-secondary)]" />

      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Todos los problemas</option>

        {problems.map((problem) => (
          <option key={problem.inciso} value={problem.inciso}>
            {problem.inciso} - {problem.titulo}
          </option>
        ))}
      </Select>
    </div>
  )
}