import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { deriveIdentity } from '@/lib/auth/identity'
import { forbiddenRoute } from '@/lib/auth/session'
import { routes } from './constants'

type Props = { children: ReactNode; allowedRoles: readonly string[] }

export function RoleRoute({ children, allowedRoles }: Props) {
  const token = sessionStorage.getItem('token')
  if (!token) return <Navigate to={routes.login} replace />

  const identity = deriveIdentity(token)
  if (
    !identity ||
    !identity.roles.some((role) => allowedRoles.includes(role))
  ) {
    return <Navigate to={forbiddenRoute} replace />
  }

  return <>{children}</>
}
