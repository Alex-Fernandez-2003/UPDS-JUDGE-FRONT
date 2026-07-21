import { CalendarDays } from 'lucide-react'
import { SearchInput, Select, Input } from '@/components/forms'
import type { FiltroEstadoConcurso, ModalidadConcurso } from '../types'
import { Button } from '@/components/common'

export type ContestsFiltersValue = {
  busqueda: string
  filtro: FiltroEstadoConcurso
  modalidad: ModalidadConcurso | ''
  fecha?: string
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
    <div className="flex flex-row items-center gap-4">
      <SearchInput
        className="min-w-2xs flex-1"
        aria-label="Buscar concursos"
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
        <option value="todos">Todos los estados</option>
        <option value="Activo">Activos</option>
        <option value="Programado">Programado</option>
        <option value="Borrador">Borrador</option>
      </Select>

      <Select
        className="min-w-[150px]"
        aria-label="Filtrar por modalidad"
        value={value.modalidad}
        onChange={(event) =>
          onChange({
            ...value,
            modalidad: event.target.value as '' | ModalidadConcurso,
          })
        }
      >
        <option value="">Visibilidad</option>
        <option value="Publico">Público</option>
        <option value="Privado">Privado</option>
        <option value="Oculto">Oculto</option>
      </Select>

      <div className="relative min-w-[150px]">
        <CalendarDays className="pointer-events-none absolute left-3 top-3 size-4 text-[var(--text-secondary)]" />
        <Input
          className="pl-10"
          type="date"
          aria-label="Filtrar por fecha"
          value={value.fecha ?? ''}
          onChange={(event) =>
            onChange({ ...value, fecha: event.target.value || undefined })
          }
        />
      </div>

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
