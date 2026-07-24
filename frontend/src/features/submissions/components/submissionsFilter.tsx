  import { Filter } from 'lucide-react'
  import { Select } from '@/components/forms'

  export interface ProblemOption {
    inciso: string
    titulo?: string
  }

  interface Props {
    value: string
    onChange: (value: string) => void
    problems: ProblemOption[]
    placeholder?: string
    showIcon?: boolean
  }

  export function SubmissionsFilter({
    value,
    onChange,
    problems,
    placeholder = 'Todos los problemas',
    showIcon = true,
  }: Props) {
    return (
      <div className="flex items-center gap-2">
        {showIcon && <Filter className="size-4 text-[var(--text-secondary)]" />}

        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">{placeholder}</option>

          {problems.map((problem) => (
            <option key={problem.inciso} value={problem.inciso}>
              {problem.inciso} {problem.titulo ? `— ${problem.titulo}` : ''}
            </option>
          ))}
        </Select>
      </div>
    )
  }