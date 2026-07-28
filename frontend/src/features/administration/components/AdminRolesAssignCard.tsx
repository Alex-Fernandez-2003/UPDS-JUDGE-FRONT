

import { Button, Card } from '@/components/common'
import { Input, Select } from '@/components/forms'
import type { RoleItem } from '../../administration/types'

interface Props {
  correo: string
  selectedRoleId: number | ''
  roles: RoleItem[]
  loading?: boolean
  onCorreoChange: (correo: string) => void
  onRoleChange: (idRol: number | '') => void
  onAssign: () => void
}
//comentando
export function AdminRolesAssignCard({
  correo,
  selectedRoleId,
  roles,
  loading,
  onCorreoChange,
  onRoleChange,
  onAssign,
}: Props) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Asignar rol</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Asigna un nuevo rol a un usuario mediante su correo electrónico.
          </p>
        </div>

        <Input
          placeholder="Correo del usuario"
          value={correo}
          onChange={(e) => onCorreoChange(e.target.value)}
        />

        <Select
          value={selectedRoleId}
          onChange={(e) =>
            onRoleChange(e.target.value ? Number(e.target.value) : '')
          }
        >
          <option value="">Seleccione un rol</option>
          {roles.map((role) => (
            <option key={role.idRol} value={role.idRol}>
              {role.nombre}
            </option>
          ))}
        </Select>

        <Button
          disabled={!correo.trim() || selectedRoleId === '' || loading}
          onClick={onAssign}
        >
          {loading ? 'Asignando...' : 'Asignar rol'}
        </Button>
      </div>
    </Card>
  )
}
