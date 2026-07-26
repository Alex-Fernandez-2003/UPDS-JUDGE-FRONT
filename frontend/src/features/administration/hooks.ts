

import { useEffect, useState } from 'react'
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  assignRole,
  listRoles,
  listUsersRoles,
  removeRole,
} from './service'

import type { ListUsersRolesParams } from './types'

// ==========================
// Custom Hook: Debounce
// ==========================
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
//comentando
// ==========================
// Query Keys
// ==========================
export const adminRolesKeys = {
  all: ['admin-roles'] as const,

  roles: () => ['admin-roles', 'roles'] as const,

  users: (params: ListUsersRolesParams) =>
    [
      'admin-roles',
      'users',
      params.query,
      params.pagina,
      params.tamanoPagina,
    ] as const,
}

// ==========================
// Queries & Mutations
// ==========================
export function useRoles() {
  return useQuery({
    queryKey: adminRolesKeys.roles(),
    queryFn: listRoles,
    staleTime: 5 * 60 * 1000,
  })
}

export function useUsersRoles(params: ListUsersRolesParams) {
  return useQuery({
    queryKey: adminRolesKeys.users(params),
    queryFn: () => listUsersRoles(params),
    placeholderData: (previous) => previous,
  })
}

export function useAssignRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: assignRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminRolesKeys.all,
      })
    },
  })
}

export function useRemoveRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminRolesKeys.all,
      })
    },
  })
}