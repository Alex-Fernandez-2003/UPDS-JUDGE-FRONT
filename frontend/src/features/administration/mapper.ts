

import type {
  RoleItem,
  RolesResponse,
  UsersRolesResponse,
} from './types'

export function mapRolesResponse(data: RolesResponse): RoleItem[] {
  return data
}

export function mapUsersRolesResponse(
  data: UsersRolesResponse,
): UsersRolesResponse {
  return {
    ...data,
    usuarios: data.usuarios.map((user) => ({
      ...user,
      roles: [...user.roles].sort(),
    })),
  }
}