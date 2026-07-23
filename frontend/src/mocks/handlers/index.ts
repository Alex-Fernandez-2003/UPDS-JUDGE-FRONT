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
  http.get('/api/Concursos/mis-creados', ({ request }) => {
    let filtro: string | null
    try {
      filtro = new URL(request.url).searchParams.get('filtro')
    } catch {
      return HttpResponse.json(
        { mensaje: 'Solicitud inválida.' },
        { status: 400 },
      )
    }
    if (
      !['todos', 'activos', 'proximos', 'finalizados'].includes(filtro ?? '')
    ) {
      return HttpResponse.json({ mensaje: 'Filtro inválido.' }, { status: 400 })
    }
    return HttpResponse.json({
      total: 0,
      pagina: 1,
      tamanoPagina: 10,
      concursos: [],
    })
  }),
  http.get('/api/Concursos/mis-resumen', () =>
    HttpResponse.json({ activos: 0, proximos: 0, finalizados: 0 }),
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
