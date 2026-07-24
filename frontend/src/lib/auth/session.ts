import { deriveIdentity, isAdministrator, isUser } from './identity'

export const tokenStorageKey = 'token'
export const forbiddenRoute = '/forbidden'

export function getInitialRoute(token?: string | null): string {
  const identity = deriveIdentity(token)
  if (!identity) return '/login'
  if (isAdministrator(identity)) return '/admin/dashboard'
  if (isUser(identity)) return '/student'
  return forbiddenRoute
}

export function clearSession() {
  sessionStorage.removeItem(tokenStorageKey)
}
