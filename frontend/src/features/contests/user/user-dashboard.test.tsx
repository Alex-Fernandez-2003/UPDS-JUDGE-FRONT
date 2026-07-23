import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { PropsWithChildren } from 'react'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { handlers } from '@/mocks/handlers'
import { RecentSubmissionsSection } from './RecentSubmissionsSection'
import {
  formatExecutionTime,
  formatMemoryUsage,
  formatPaginationMetadata,
  mapSubmissionVerdict,
} from './mapper'
import { listUserSubmissions } from './service'

const server = setupServer(...handlers)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider
    client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
  >
    {children}
  </QueryClientProvider>
)

describe('submission formatters and mapper', () => {
  it('preserves confirmed ms and MB units, zeroes, and missing values', () => {
    expect(formatExecutionTime(48)).toBe('48 ms')
    expect(formatExecutionTime(2000)).toBe('2000 ms')
    expect(formatExecutionTime(0)).toBe('0 ms')
    expect(formatExecutionTime(null)).toBe('—')
    expect(formatExecutionTime(Number.NaN)).toBe('—')
    expect(formatMemoryUsage(8.1)).toBe('8.1 MB')
    expect(formatMemoryUsage(1024)).toBe('1024 MB')
    expect(formatMemoryUsage(0)).toBe('0 MB')
    expect(formatMemoryUsage(undefined)).toBe('—')
    expect(formatMemoryUsage(Infinity)).toBe('—')
  })

  it('maps known verdicts, pending backend status, and a neutral fallback', () => {
    expect(mapSubmissionVerdict('Accepted')).toEqual({
      label: 'ACEPTADO',
      tone: 'success',
    })
    expect(mapSubmissionVerdict('Wrong Answer')).toEqual({
      label: 'RESPUESTA INCORRECTA',
      tone: 'danger',
    })
    expect(mapSubmissionVerdict('Time Limit Exceeded')).toEqual({
      label: 'TIEMPO LÍMITE EXCEDIDO',
      tone: 'warning',
    })
    expect(mapSubmissionVerdict('Memory Limit Exceeded')).toEqual({
      label: 'MEMORIA LÍMITE EXCEDIDA',
      tone: 'warning',
    })
    expect(mapSubmissionVerdict('Compilation Error')).toEqual({
      label: 'ERROR DE COMPILACIÓN',
      tone: 'danger',
    })
    expect(mapSubmissionVerdict('Runtime Error')).toEqual({
      label: 'ERROR DE EJECUCIÓN',
      tone: 'danger',
    })
    expect(mapSubmissionVerdict('Pendiente')).toEqual({
      label: 'EVALUANDO',
      tone: 'info',
    })
    expect(mapSubmissionVerdict('Other')).toEqual({
      label: 'Other',
      tone: 'neutral',
    })
  })

  it('calculates pagination metadata from received data', () => {
    expect(
      formatPaginationMetadata({
        total: 12,
        pagina: 1,
        tamanoPagina: 5,
        received: 5,
      }),
    ).toBe('Mostrando 1-5 de 12 envíos')
    expect(
      formatPaginationMetadata({
        total: 12,
        pagina: 3,
        tamanoPagina: 5,
        received: 2,
      }),
    ).toBe('Mostrando 11-12 de 12 envíos')
    expect(
      formatPaginationMetadata({
        total: 0,
        pagina: 1,
        tamanoPagina: 5,
        received: 0,
      }),
    ).toBe('0 envíos')
  })
})

describe('recent submissions', () => {
  it('uses all supported query parameters', async () => {
    let url = ''
    server.use(
      http.get('/api/Envios/mis-envios', ({ request }) => {
        url = request.url
        return HttpResponse.json({
          total: 0,
          pagina: 2,
          tamanoPagina: 10,
          datos: [],
        })
      }),
    )
    await listUserSubmissions({
      resultado: 'AC',
      concursoCodigo: 'div4',
      inciso: 'A',
      pagina: 2,
      tamanoPagina: 10,
    })
    expect(Object.fromEntries(new URL(url).searchParams)).toEqual({
      resultado: 'AC',
      concursoCodigo: 'div4',
      inciso: 'A',
      pagina: '2',
      tamanoPagina: '10',
    })
  })

  it('refreshes only recent submissions without reloading and prevents duplicate clicks', async () => {
    let requests = 0
    let resolveRequest: (() => void) | undefined
    const pending = new Promise<void>((resolve) => {
      resolveRequest = resolve
    })
    server.use(
      http.get('/api/Envios/mis-envios', async () => {
        requests += 1
        if (requests > 1) await pending
        return HttpResponse.json({
          total: 1,
          pagina: 1,
          tamanoPagina: 5,
          datos: [],
        })
      }),
    )
    const user = userEvent.setup()
    render(<RecentSubmissionsSection />, { wrapper })
    await screen.findByRole('button', { name: 'Actualizar envíos recientes' })
    await user.click(
      screen.getByRole('button', { name: 'Actualizar envíos recientes' }),
    )
    await user.click(
      screen.getByRole('button', { name: 'Actualizar envíos recientes' }),
    )
    expect(requests).toBe(2)
    resolveRequest?.()
  })
})
