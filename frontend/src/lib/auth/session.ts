import {
  deriveIdentity,
  isAdministrator,
  isRolesAdmin,
  isUser,
} from './identity'
import { routes } from '@/routes/constants'

export const tokenStorageKey = 'token'
export const forbiddenRoute = '/forbidden'

export function getInitialRoute(token?: string | null): string {
  const identity = deriveIdentity(token)
  if (!identity) return routes.login
  if (isRolesAdmin(identity)) return routes.adminRoleList
  if (isAdministrator(identity)) return routes.dashboard
  if (isUser(identity)) return routes.studentListCompetitions
  return forbiddenRoute
}

export function clearSession() {
  sessionStorage.removeItem(tokenStorageKey)
}
