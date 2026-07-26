

import { useState, useMemo } from 'react'
import { Alert, Button, Card } from '@/components/common'
import { Breadcrumbs, Pagination } from '@/components/navigation'

import { AdminRolesFiltersBar } from '../../administration/components/AdminRolesFiltersBar'
import { AdminRolesAssignCard } from '../../administration/components/AdminRolesAssignCard'
import { AdminRolesTable } from '../../administration/components/AdminRolesTable'

import {
  useAssignRole,
  useDebouncedValue,
  useRemoveRole,
  useRoles,
  useUsersRoles,
} from '../../administration/hooks'

import type {
  AdminRolesFiltersValue,
  ListUsersRolesParams,
} from '../../administration/types'
import { PAGE_SIZE, initialFilters } from '../../administration/constans'

export default function AdminRolesPage() {
  // ==========================
  // Estados
  // ==========================
  const [filters, setFilters] = useState<AdminRolesFiltersValue>(initialFilters)
  const [page, setPage] = useState(1)

  const [correo, setCorreo] = useState('')
  const [selectedRoleId, setSelectedRoleId] = useState<number | ''>('')
  const [message, setMessage] = useState('')
  const [messageTone, setMessageTone] = useState<'success' | 'danger'>(
    'success',
  )
//comentando
  const debouncedBusqueda = useDebouncedValue(filters.busqueda)

  // ==========================
  // Parámetros de búsqueda API
  // ==========================
  const queryParams: ListUsersRolesParams = useMemo(
    () => ({
      query: debouncedBusqueda || undefined,
      pagina: page,
      tamanoPagina: PAGE_SIZE,
    }),
    [debouncedBusqueda, page],
  )

  // ==========================
  // Queries & Mutations
  // ==========================
  const rolesQuery = useRoles()
  const usersQuery = useUsersRoles(queryParams)
  const assignRoleMutation = useAssignRole()
  const removeRoleMutation = useRemoveRole()

  // ==========================
  // Datos derivados
  // ==========================
  const filteredUsers = useMemo(() => {
    const users = usersQuery.data?.usuarios ?? []

    if (filters.rol === 'todos') {
      return users
    }

    return users.filter((user) => user.roles.includes(filters.rol))
  }, [usersQuery.data, filters.rol])

  const totalPages = usersQuery.data
    ? Math.max(
        1,
        Math.ceil(usersQuery.data.total / usersQuery.data.tamanoPagina),
      )
    : 1

  // ==========================
  // Callbacks
  // ==========================
  const updateFilters = (next: AdminRolesFiltersValue) => {
    setFilters(next)
    setPage(1)
  }

  const handleAssignRole = async () => {
    if (!correo.trim() || selectedRoleId === '') return

    try {
      const response = await assignRoleMutation.mutateAsync({
        correo: correo.trim(),
        idRol: Number(selectedRoleId),
      })

      setMessage(response.mensaje)
      setMessageTone('success')

      setCorreo('')
      setSelectedRoleId('')

      usersQuery.refetch()
    } catch (error: any) {
      setMessage(
        error?.response?.data?.mensaje ?? 'No fue posible asignar el rol.',
      )
      setMessageTone('danger')
    }
  }

  const handleRemoveRole = async (correo: string, idRol: number) => {
    try {
      const response = await removeRoleMutation.mutateAsync({
        correo,
        idRol,
      })

      setMessage(response.mensaje)
      setMessageTone('success')

      usersQuery.refetch()
    } catch (error: any) {
      setMessage(
        error?.response?.data?.mensaje ?? 'No fue posible quitar el rol.',
      )
      setMessageTone('danger')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs
            items={[{ label: 'Inicio' }, { label: 'Administración de Roles' }]}
          />
          <h1 className="text-3xl font-bold">Administración de Roles</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Administra los roles de los usuarios registrados en la plataforma.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => usersQuery.refetch()}
          disabled={usersQuery.isFetching}
        >
          Actualizar listado
        </Button>
      </div>

      <Card>
        <AdminRolesAssignCard
          correo={correo}
          selectedRoleId={selectedRoleId}
          roles={rolesQuery.data ?? []}
          loading={assignRoleMutation.isPending}
          onCorreoChange={setCorreo}
          onRoleChange={setSelectedRoleId}
          onAssign={handleAssignRole}
        />

        {message && (
          <Alert tone={messageTone} className="mt-4">
            {message}
          </Alert>
        )}
      </Card>

      <Card>
        <div className="space-y-4">
          <AdminRolesFiltersBar
            value={filters}
            roles={rolesQuery.data ?? []}
            onChange={updateFilters}
            onClear={() => updateFilters(initialFilters)}
          />

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
            <span>
              ROL: {filters.rol === 'todos' ? 'Todos los roles' : filters.rol}
            </span>

            <span>
              {usersQuery.data
                ? `Mostrando ${filteredUsers.length} de ${usersQuery.data.total} usuarios`
                : 'Cargando usuarios...'}
            </span>
          </div>

          <AdminRolesTable
            rows={filteredUsers}
            roles={rolesQuery.data ?? []}
            loading={usersQuery.isLoading || usersQuery.isFetching}
            error={
              usersQuery.error
                ? 'No fue posible cargar los usuarios.'
                : undefined
            }
            onRemoveRole={handleRemoveRole}
          />

          <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-sm text-[var(--text-secondary)]">
              {usersQuery.data
                ? `${usersQuery.data.total} usuario(s) encontrados`
                : ' '}
            </p>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
