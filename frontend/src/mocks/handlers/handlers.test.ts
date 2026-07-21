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

  it('reads multipart contest data and returns the controlled success contract', async () => {
    const formData = new FormData()
    formData.append('nombre', 'Contest')
    formData.append('codigo', 'C-1')
    const contest = await new HttpClient().post<{
      codigo: string
      mensaje: string
    }>(endpoints.contests.create, formData)

    expect(contest).toEqual({
      codigo: 'contest-demo',
      mensaje: 'Concurso, problemas y casos de prueba creados exitosamente.',
    })
  })

  it('returns the exact controlled 400 and 401 messages', async () => {
    await expect(
      new HttpClient().post(endpoints.contests.create, new FormData()),
    ).rejects.toMatchObject({
      status: 400,
      message: 'El nombre del concurso es obligatorio.',
    })

    const unauthorized = new FormData()
    unauthorized.append('nombre', 'Contest')
    unauthorized.append('codigo', 'unauthorized')
    await expect(
      new HttpClient().post(endpoints.contests.create, unauthorized),
    ).rejects.toMatchObject({ status: 401, message: 'Token inválido' })
  })
})
