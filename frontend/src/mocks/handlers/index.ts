import { http, HttpResponse, type RequestHandler } from 'msw'
import type { components } from '@/types/api.generated'

type LoginResponse = components['schemas']['LoginResponse']
type RegisterResponse = components['schemas']['RegisterResponse']

const loginResponse = {
  token: 'mock-session-token',
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
  http.post('/api/Concursos/crear', async ({ request }) => {
    const formData = await request.formData()
    const nombre = formData.get('nombre')
    const codigo = formData.get('codigo')
    if (typeof nombre !== 'string' || !nombre.trim())
      return HttpResponse.json(
        { mensaje: 'El nombre del concurso es obligatorio.' },
        { status: 400 },
      )
    if (codigo === 'unauthorized')
      return HttpResponse.json({ mensaje: 'Token inválido' }, { status: 401 })
    return HttpResponse.json(
      {
        codigo: 'contest-demo',
        mensaje: 'Concurso, problemas y casos de prueba creados exitosamente.',
      },
      { status: 200 },
    )
  }),
]
