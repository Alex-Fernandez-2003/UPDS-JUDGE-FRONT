export type RoleItem = {
  idRol: number
  nombre: string
}

export type UserRoleItem = {
  idUsuario: number
  nombre: string
  correo: string
  estado: 'Activo' | 'Inactivo'
  roles: string[]
}

export type RolesResponse = RoleItem[]

export type UsersRolesResponse = {
  total: number
  pagina: number
  tamanoPagina: number
  usuarios: UserRoleItem[]
}

export type ListUsersRolesParams = {
  query?: string
  rol?: string
  pagina?: number
  tamanoPagina?: number
}

export type AssignRoleRequest = {
  correo: string
  idRol: number
}

export type RemoveRoleRequest = {
  correo: string
  idRol: number
}

export type RoleFilter = 'todos' | string

export type AdminRolesFiltersValue = {
  busqueda: string
  rol: RoleFilter
}