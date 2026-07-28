


import { endpoints, httpClient } from '@/lib/api'
import { mapRolesResponse, mapUsersRolesResponse } from './mapper'
import type {
  AssignRoleRequest,
  ListUsersRolesParams,
  RemoveRoleRequest,
  RolesResponse,
  UsersRolesResponse,
} from './types'

export const listRoles = async () => {
  const data = await httpClient.get<RolesResponse>(endpoints.roles.list)
  return mapRolesResponse(data)
}

export const listUsersRoles = async (params: ListUsersRolesParams) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      query.set(key, String(value))
    }
  }
//comentando
  const queryString = query.toString()
  const endpoint = queryString
    ? `${endpoints.roles.users}?${queryString}`
    : endpoints.roles.users

  const data = await httpClient.get<UsersRolesResponse>(endpoint)
  return mapUsersRolesResponse(data)
}

export const assignRole = (body: AssignRoleRequest) =>
  httpClient.post<{ mensaje: string }>(endpoints.roles.assign, body)

export const removeRole = (body: RemoveRoleRequest) =>
  httpClient.post<{ mensaje: string }>(endpoints.roles.remove, body)