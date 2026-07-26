import { Button } from '@/components/common'
import { SearchInput, Select } from '@/components/forms'
import type {
  AdminRolesFiltersValue,
  RoleItem,
} from '../../administration/types'
//comentando
export function AdminRolesFiltersBar({
  value,
  roles,
  onChange,
  onClear,
}: {
  value: AdminRolesFiltersValue
  roles: RoleItem[]
  onChange: (value: AdminRolesFiltersValue) => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput
        className="min-w-2xs flex-1"
        placeholder="Buscar usuario..."
        value={value.busqueda}
        onChange={(e) =>
          onChange({
            ...value,
            busqueda: e.target.value,
          })
        }
      />

      <Select
        className="min-w-[180px]"
        value={value.rol}
        onChange={(e) =>
          onChange({
            ...value,
            rol: e.target.value,
          })
        }
      >
        <option value="todos">Todos los roles</option>

        {roles.map((role) => (
          <option key={role.idRol} value={role.nombre}>
            {role.nombre}
          </option>
        ))}
      </Select>

      <Button variant="secondary" onClick={onClear}>
        Limpiar
      </Button>
    </div>
  )
}
