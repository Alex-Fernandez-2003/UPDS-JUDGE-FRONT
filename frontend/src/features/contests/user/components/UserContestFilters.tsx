import { Button } from '@/components/common'
import { SearchInput, Select } from '@/components/forms'
import { ADMIN_CONTEST_FILTERS } from '../../admin/constants'
import type { FiltroEstadoConcurso, ModalidadConcurso } from '../../admin/types'
export type UserContestFiltersValue = {
  busqueda: string
  filtro: FiltroEstadoConcurso
  modalidad?: ModalidadConcurso | ''
}
export function UserContestFilters({
  value,
  onChange,
  onClear,
}: {
  value: UserContestFiltersValue
  onChange: (next: UserContestFiltersValue) => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        data-testid="contest-filters-search-row"
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="min-w-0 flex-1">
          <SearchInput
            className="w-full"
            aria-label="Buscar concursos por código"
            placeholder="Buscar concurso..."
            value={value.busqueda}
            onChange={(e) => onChange({ ...value, busqueda: e.target.value })}
          />
        </div>
        <Button type="button" variant="secondary" onClick={onClear}>
          Limpiar
        </Button>
      </div>
      <div
        data-testid="contest-filters-selects-row"
        className="grid gap-3 md:grid-cols-2"
      >
        <Select
          aria-label="Filtrar por estado"
          value={value.filtro}
          onChange={(e) =>
            onChange({
              ...value,
              filtro: e.target.value as FiltroEstadoConcurso,
            })
          }
        >
          {ADMIN_CONTEST_FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </Select>
        <Select
          aria-label="Filtrar por modalidad"
          value={value.modalidad ?? ''}
          onChange={(e) =>
            onChange({
              ...value,
              modalidad: e.target.value as ModalidadConcurso | '',
            })
          }
        >
          <option value="">Todas las modalidades</option>
          <option value="Publico">Público</option>
          <option value="Privado">Privado</option>
        </Select>
      </div>
    </div>
  )
}
