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
  http.post('/api/ParticipanteConcursos/unirse', async ({ request }) => {
    const payload: unknown = await request.json()
    if (
      typeof payload !== 'object' ||
      payload === null ||
      !('codigo' in payload) ||
      typeof payload.codigo !== 'string'
    )
      return HttpResponse.json(
        { mensaje: 'Código obligatorio.' },
        { status: 400 },
      )
    return HttpResponse.json({
      mensaje: 'Inscripción registrada.',
      codConcurso: payload.codigo,
    })
  }),
  http.get('/api/ParticipanteConcursos/stats-contest', () =>
    HttpResponse.json({
      concursosParticipados: 2,
      problemasResueltos: 4,
      problemasPendientes: 1,
      precisionPorcentaje: 75,
    }),
  ),
  http.get('/api/Envios/mis-envios', ({ request }) => {
    let url: URL
    try {
      url = new URL(request.url)
    } catch {
      return HttpResponse.json(
        { mensaje: 'Solicitud inválida.' },
        { status: 400 },
      )
    }
    if (
      url.searchParams.get('pagina') !== '1' ||
      url.searchParams.get('tamanoPagina') !== '5'
    )
      return HttpResponse.json(
        { mensaje: 'Paginación inválida.' },
        { status: 400 },
      )
    return HttpResponse.json({
      total: 1,
      pagina: 1,
      tamanoPagina: 5,
      datos: [
        {
          idEnvio: 7,
          concursoCodigo: 'div4-001',
          problemaTitulo: 'Problema de ejemplo',
          inciso: 'A',
          lenguaje: 'Python 3.12',
          veredicto: 'Accepted',
          consumoTiempo: 48,
          consumoMemoria: 8.1,
          fechaEnvio: '2026-08-16T13:10:51.413Z',
        },
      ],
    })
  }),
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
