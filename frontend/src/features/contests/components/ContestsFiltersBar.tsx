import { Button } from '@/components/common'
import { SearchInput, Select } from '@/components/forms'
import { ADMIN_CONTEST_FILTERS } from '../constants'
import type { FiltroEstadoConcurso } from '../types'

export type ContestsFiltersValue = {
  busqueda: string
  filtro: FiltroEstadoConcurso
}

export function ContestsFiltersBar({
  value,
  onChange,
  onClear,
}: {
  value: ContestsFiltersValue
  onChange: (next: ContestsFiltersValue) => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput
        className="min-w-2xs flex-1"
        aria-label="Buscar concursos por código"
        placeholder="Buscar concurso..."
        value={value.busqueda}
        onChange={(event) =>
          onChange({ ...value, busqueda: event.target.value })
        }
      />

      <Select
        className="flex min-w-[150px]"
        aria-label="Filtrar por estado"
        value={value.filtro}
        onChange={(event) =>
          onChange({
            ...value,
            filtro: event.target.value as FiltroEstadoConcurso,
          })
        }
      >
        {ADMIN_CONTEST_FILTERS.map((filter) => (
          <option key={filter.value} value={filter.value}>
            {filter.label}
          </option>
        ))}
      </Select>

      <Button
        type="button"
        variant="secondary"
        className="min-w-15"
        onClick={onClear}
      >
        Limpiar
      </Button>
    </div>
  )
}
