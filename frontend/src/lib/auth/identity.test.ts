import { describe, expect, it } from 'vitest'
import { deriveIdentity, normalizeRoles, roles } from './identity'
import { forbiddenRoute, getInitialRoute } from './session'

const token = (payload: object) =>
  `header.${btoa(JSON.stringify(payload)).replace(/=/g, '')}.signature`

describe('JWT identity helpers', () => {
  it('derives a minimal identity and normalizes the .NET role claim', () => {
    const identity = deriveIdentity(
      token({
        name: 'Ada',
        email: 'ada@example.test',
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': [
          roles.contestsAdmin,
          roles.contestsAdmin,
        ],
      }),
    )
    expect(identity).toMatchObject({
      name: 'Ada',
      email: 'ada@example.test',
      roles: [roles.contestsAdmin],
    })
  })

  it('returns safe values for malformed tokens and absent claims', () => {
    expect(deriveIdentity('not-a-jwt')).toBeUndefined()
    expect(normalizeRoles({ name: 'Ada' })).toEqual([])
  })

  it('prioritizes administration and routes Usuario to the existing student layout', () => {
    expect(
      getInitialRoute(token({ role: [roles.user, roles.rolesAdmin] })),
    ).toBe('/admin/dashboard')
    expect(getInitialRoute(token({ role: roles.user }))).toBe(
      '/student/concursos',
    )
    expect(getInitialRoute(token({ role: 'Unknown' }))).toBe(forbiddenRoute)
  })
})
