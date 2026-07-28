export const roleClaimKeys = [
  'role',
  'roles',
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
] as const
//comentando
export const roles = {
  contestsAdmin: 'AdministradorConcursos',
  rolesAdmin: 'AdministradorRoles',
  user: 'Usuario',
} as const

export type JwtPayload = Record<string, unknown>
export type Identity = {
  userId?: string
  name?: string
  email?: string
  roles: string[]
}

const readString = (payload: JwtPayload, keys: string[]) => {
  for (const key of keys) {
    const value = payload[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return undefined
}

export function decodeJwtPayload(
  token?: string | null,
): JwtPayload | undefined {
  if (!token || token.split('.').length !== 3) return undefined

  try {
    const encodedPayload = token.split('.')[1]
    const base64 = encodedPayload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const json = decodeURIComponent(
      Array.from(atob(padded))
        .map(
          (character) =>
            `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`,
        )
        .join(''),
    )
    const payload: unknown = JSON.parse(json)
    return payload && typeof payload === 'object' && !Array.isArray(payload)
      ? (payload as JwtPayload)
      : undefined
  } catch {
    return undefined
  }
}

export function normalizeRoles(payload?: JwtPayload): string[] {
  if (!payload) return []
  const values = roleClaimKeys.flatMap((key) => {
    const value = payload[key]
    return typeof value === 'string'
      ? [value]
      : Array.isArray(value)
        ? value
        : []
  })
  return [
    ...new Set(
      values
        .filter((value): value is string => typeof value === 'string')
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  ]
}

export function deriveIdentity(token?: string | null): Identity | undefined {
  const payload = decodeJwtPayload(token)
  if (!payload) return undefined
  return {
    userId: readString(payload, ['idUsuario', 'sub', 'nameid', 'id']),
    name: readString(payload, ['name', 'unique_name', 'given_name']),
    email: readString(payload, ['email', 'emailaddress']),
    roles: normalizeRoles(payload),
  }
}

export const hasRole = (identity: Identity | undefined, role: string) =>
  Boolean(identity?.roles.includes(role))
export const isContestsAdmin = (identity?: Identity) =>
  hasRole(identity, roles.contestsAdmin)
export const isRolesAdmin = (identity?: Identity) =>
  hasRole(identity, roles.rolesAdmin)
export const isAdministrator = (identity?: Identity) =>
  isContestsAdmin(identity) || isRolesAdmin(identity)
export const isUser = (identity?: Identity) => hasRole(identity, roles.user)

export function roleDescription(identity?: Identity): string {
  if (isContestsAdmin(identity)) return 'Administrador de concursos'
  if (isRolesAdmin(identity)) return 'Administrador de roles'
  if (isUser(identity)) return 'Estudiante'
  return 'Sin rol asignado'
}
