import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { historyKeys } from './Types/historyHooks'
import { historyService } from './Types/historyService'

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('user submissions history', () => {
  it('serializes the contractual contest, result, and pagination filters', async () => {
    let requestUrl = ''
    server.use(
      http.get('/api/Envios/mis-envios', ({ request }) => {
        requestUrl = request.url
        return HttpResponse.json({
          total: 0,
          pagina: 2,
          tamanoPagina: 20,
          datos: [],
        })
      }),
    )

    await historyService.getMisEnvios({
      concursoCodigo: 'div4',
      resultado: 'AC',
      pagina: 2,
      tamanoPagina: 20,
    })

    expect(Object.fromEntries(new URL(requestUrl).searchParams)).toEqual({
      concursoCodigo: 'div4',
      resultado: 'AC',
      pagina: '2',
      tamanoPagina: '20',
    })
    expect(
      historyKeys.list({
        concursoCodigo: 'div4',
        resultado: 'AC',
        pagina: 2,
        tamanoPagina: 20,
      }),
    ).toEqual(['user-history', 'div4', 'AC', 2, 20])
  })
})
