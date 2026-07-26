

import { DataTable, type TableColumn } from '@/components/tables'
import { AdminRoleBadge } from './AdminRoleBadge'
import type { UserRoleItem, RoleItem } from '../../administration/types'

interface AdminRolesTableProps {
  rows: UserRoleItem[]
  roles: RoleItem[]
  loading?: boolean
  error?: string
  onRemoveRole: (correo: string, idRol: number) => void
}

export function AdminRolesTable({
  rows,
  roles,
  loading,
  error,
  onRemoveRole,
}: AdminRolesTableProps) {
  const columns: TableColumn<UserRoleItem>[] = [
    {
      key: 'nombre',
      header: 'Usuario',
      render: (row) => (
        <div>
          <div className="font-medium text-[var(--text-primary)]">
            {row.nombre}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">
            {row.correo}
          </div>
        </div>
      ),
    },
    {
      key: 'estado',
      header: 'Estado',
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
            row.estado === 'Activo'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.estado}
        </span>
      ),
    },
    {
      key: 'roles',
      header: 'Roles Asignados',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.roles.map((roleName) => {
            const roleObj = roles.find((r) => r.nombre === roleName)

            return (
              <AdminRoleBadge
                key={roleName}
                role={roleName}
                onRemove={
                  roleObj
                    ? () => onRemoveRole(row.correo, roleObj.idRol)
                    : undefined
                }
              />
            )
          })}
        </div>
      ),
    },
  ]

  return (
    <DataTable
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
      emptyText="No se encontraron usuarios."
    />
  )
}
