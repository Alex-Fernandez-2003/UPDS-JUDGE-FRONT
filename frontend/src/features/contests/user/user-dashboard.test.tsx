import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { PropsWithChildren } from 'react'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { handlers } from '@/mocks/handlers'
import { RecentSubmissionsSection } from './RecentSubmissionsSection'
import { RecentSubmissionsTable } from './RecentSubmissionsTable'
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
  it('preserves confirmed ms and KB units, zeroes, and missing values', () => {
    expect(formatExecutionTime(48)).toBe('48 ms')
    expect(formatExecutionTime(2000)).toBe('2000 ms')
    expect(formatExecutionTime(0)).toBe('0 ms')
    expect(formatExecutionTime(null)).toBe('—')
    expect(formatExecutionTime(Number.NaN)).toBe('—')
    expect(formatMemoryUsage(8.1)).toBe('8.1 KB')
    expect(formatMemoryUsage(1024)).toBe('1024 KB')
    expect(formatMemoryUsage(0)).toBe('0 KB')
    expect(formatMemoryUsage(undefined)).toBe('—')
    expect(formatMemoryUsage(Infinity)).toBe('—')
  })

  it('maps known verdicts, pending backend status, and a neutral fallback', () => {
    expect(mapSubmissionVerdict('Accepted')).toEqual({
      label: 'ACCEPTED',
      tone: 'success',
    })
    expect(mapSubmissionVerdict('Wrong Answer')).toEqual({
      label: 'WRONG ANSWER',
      tone: 'danger',
    })
    expect(mapSubmissionVerdict('Time Limit Exceeded')).toEqual({
      label: 'TIME LIMIT EXCEEDED',
      tone: 'warning',
    })
    expect(mapSubmissionVerdict('Memory Limit Exceeded')).toEqual({
      label: 'MEMORY LIMIT EXCEEDED',
      tone: 'warning',
    })
    expect(mapSubmissionVerdict('Compilation Error')).toEqual({
      label: 'COMPILATION ERROR',
      tone: 'danger',
    })
    expect(mapSubmissionVerdict('Runtime Error')).toEqual({
      label: 'RUNTIME ERROR',
      tone: 'danger',
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
  it('uses the definitive visual columns without exposing the internal submission ID', () => {
    render(
      <RecentSubmissionsTable
        rows={[
          {
            id: 42,
            contestCode: 'DIV4-2026',
            problemLabel: 'A · Sumas',
            language: 'TypeScript',
            verdictLabel: 'MEMORY LIMIT EXCEEDED',
            verdictTone: 'warning',
            timeLabel: '48 ms',
            memoryLabel: '1024 KB',
            submittedAtLabel: '25/7/2026, 12:00',
          },
        ]}
      />,
    )

    const expectedHeaders = [
      'CONCURSO',
      'PROBLEMA',
      'LENGUAJE',
      'VEREDICTO',
      'TIEMPO',
      'MEMORIA',
      'FECHA',
    ]
    const table = screen.getByRole('table')
    const headers = screen.getAllByRole('columnheader')
    const row = screen.getAllByRole('row')[1]
    const cells = within(row).getAllByRole('cell')
    const verdict = screen.getByText('MEMORY LIMIT EXCEEDED')

    expect(table).toBeInTheDocument()
    expect(headers.map((header) => header.textContent)).toEqual(expectedHeaders)
    expect(
      screen.queryByRole('columnheader', { name: /^ID$/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('columnheader', { name: 'Archivo' }),
    ).not.toBeInTheDocument()
    expect(cells).toHaveLength(headers.length)
    expect(cells.map((cell) => cell.textContent)).toEqual([
      'DIV4-2026',
      'A · Sumas',
      'TypeScript',
      'MEMORY LIMIT EXCEEDED',
      '48 ms',
      '1024 KB',
      '25/7/2026, 12:00',
    ])
    expect(within(row).queryByText(/^42$/)).not.toBeInTheDocument()
    expect(verdict).toHaveClass('bg-amber-100', 'text-amber-800')
  })

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
