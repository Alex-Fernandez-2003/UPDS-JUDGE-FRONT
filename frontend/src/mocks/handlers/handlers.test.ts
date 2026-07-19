import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'
import { endpoints } from '@/lib/api/endpoints'
import { HttpClient } from '@/lib/api/http-client'
import type { components } from '@/types/api.generated'
import { handlers } from './index'

type LoginResponse = components['schemas']['LoginResponse']
type RegisterResponse = components['schemas']['RegisterResponse']

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('auth contract handlers', () => {
  it('returns the generated login response shape for the exact confirmed route', async () => {
    const login = await new HttpClient().post<LoginResponse>(
      endpoints.auth.login,
    )

    expect(login).toEqual({ expiraEn: '2030-01-01T00:00:00Z' })
  })

  it('returns the generated register response shape for the exact confirmed route', async () => {
    const registration = await new HttpClient().post<RegisterResponse>(
      endpoints.auth.register,
    )

    expect(registration).toEqual({
      mensaje: 'Registration simulated.',
      correo: 'demo.user@example.test',
    })
  })
})
