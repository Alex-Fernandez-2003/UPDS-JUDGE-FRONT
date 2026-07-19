import { http, HttpResponse, type RequestHandler } from 'msw'
import type { components } from '@/types/api.generated'

type LoginResponse = components['schemas']['LoginResponse']
type RegisterResponse = components['schemas']['RegisterResponse']

const loginResponse = {
  expiraEn: '2030-01-01T00:00:00Z',
} satisfies LoginResponse

const registerResponse = {
  mensaje: 'Registration simulated.',
  correo: 'demo.user@example.test',
} satisfies RegisterResponse

export const handlers: RequestHandler[] = [
  http.post('/api/Auth/login', () =>
    HttpResponse.json(loginResponse, { status: 200 }),
  ),
  http.post('/api/Auth/register', () =>
    HttpResponse.json(registerResponse, { status: 200 }),
  ),
]
