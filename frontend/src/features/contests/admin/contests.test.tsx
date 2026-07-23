import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { PropsWithChildren } from 'react'
import { act } from 'react'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { handlers } from '@/mocks/handlers'
import { ContestsAdminScreen } from './ContestsAdminScreen'
import { ContestsFiltersBar } from './components/ContestsFiltersBar'
import { ContestsTable } from './components/ContestsTable'
import { formatDuracion, formatFechaHora } from './format'
import { useDebouncedValue } from './hooks'
import { listConcursos } from './service'
import type { ConcursoListItem } from './types'

const server = setupServer(...handlers)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const sampleItem: ConcursoListItem = {
  idConcurso: 5,
  nombre: 'Concurso de Prueba 2',
  descripcion: 'Concurso de prueba',
  codigo: 'div4-002',
  estadoTiempo: 'Proximo',
  modalidad: 'Publico',
  fechaInicio: '2026-08-16T13:10:51.413Z',
  fechaFin: '2026-08-16T16:10:51.413Z',
  fechaCongelamiento: '2026-08-16T15:40:51.413Z',
  duracionMinutos: 180,
  minutosCongelamiento: 30,
  cantidadProblemas: 2,
  cantidadParticipantes: 0,
  yaInscrito: false,
  segundosRestantes: null,
  miPuesto: null,
  miProblemasResueltos: null,
}

const createWrapper = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}

describe('format helpers', () => {
  it('formats whole hours, whole minutes and mixed durations', () => {
    expect(formatDuracion(180)).toBe('3 h')
    expect(formatDuracion(45)).toBe('45 min')
    expect(formatDuracion(150)).toBe('2 h 30 min')
  })

  it('formats an ISO date into a localized date and time', () => {
    expect(formatFechaHora('2026-08-16T13:10:51.413Z')).toEqual(
      expect.stringContaining('2026'),
    )
  })
})

describe('listConcursos service', () => {
  it('uses mis-creados and preserves the contractual list parameters', async () => {
    let capturedUrl = ''
    server.use(
      http.get('/api/Concursos/mis-creados', ({ request }) => {
        capturedUrl = request.url
        return HttpResponse.json({
          total: 1,
          pagina: 1,
          tamanoPagina: 2,
          concursos: [sampleItem],
        })
      }),
    )

    await listConcursos({
      filtro: 'proximos',
      busqueda: 'div4',
      modalidad: 'Publico',
      tamanoPagina: 2,
      pagina: 1,
    })

    const url = new URL(capturedUrl)
    expect(url.pathname).toBe('/api/Concursos/mis-creados')
    expect(Object.fromEntries(url.searchParams)).toEqual({
      filtro: 'proximos',
      busqueda: 'div4',
      modalidad: 'Publico',
      tamanoPagina: '2',
      pagina: '1',
    })
  })
})

describe('ContestsFiltersBar', () => {
  it('reports search and estado changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <ContestsFiltersBar
        value={{ busqueda: '', filtro: 'todos' }}
        onChange={onChange}
        onClear={vi.fn()}
      />,
    )

    await user.type(
      screen.getByRole('searchbox', { name: 'Buscar concursos por código' }),
      'd',
    )
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ busqueda: 'd' }),
    )

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Filtrar por estado' }),
      'activos',
    )
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ filtro: 'activos' }),
    )
  })
})

describe('ContestsTable', () => {
  it('renders only fields present in ConcursoListItemDto, with status and modalidad badges', () => {
    render(<ContestsTable rows={[sampleItem]} />)

    expect(screen.getByText('Concurso de Prueba 2')).toBeInTheDocument()
    expect(screen.getByText('div4-002')).toBeInTheDocument()
    expect(screen.getByText('Próximo')).toBeInTheDocument()
    expect(screen.getByText('Público')).toBeInTheDocument()
    expect(screen.getByText('No inscrito')).toBeInTheDocument()
  })

  it('shows the shared empty state when there are no rows', () => {
    render(<ContestsTable rows={[]} />)

    expect(
      screen.getByText('No hay concursos para los filtros seleccionados.'),
    ).toBeInTheDocument()
  })
})

describe('useDebouncedValue', () => {
  it('only updates after the delay elapses', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 300),
      { initialProps: { value: 'a' } },
    )
    expect(result.current).toBe('a')

    rerender({ value: 'ab' })
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('ab')
    vi.useRealTimers()
  })
})

describe('ContestsAdminScreen', () => {
  it('loads the table from the confirmed contract', async () => {
    server.use(
      http.get('/api/Concursos/mis-creados', () =>
        HttpResponse.json({
          total: 1,
          pagina: 1,
          tamanoPagina: 10,
          concursos: [
            {
              ...sampleItem,
              nombre: 'Concurso interno de Programación 2026',
              codigo: 'div4-003',
            },
          ],
        }),
      ),
    )

    render(<ContestsAdminScreen />, { wrapper: createWrapper() })

    expect(
      await screen.findByText('Concurso interno de Programación 2026'),
    ).toBeInTheDocument()
    expect(screen.getAllByText('div4-003')).toHaveLength(2)
  })

  it('shows a general error with a retry action when the request fails', async () => {
    server.use(
      http.get('/api/Concursos/mis-creados', () =>
        HttpResponse.json(
          { title: 'No se pudo listar los concursos.' },
          { status: 500 },
        ),
      ),
    )

    render(<ContestsAdminScreen />, { wrapper: createWrapper() })

    expect(
      await screen.findByText('No se pudo listar los concursos.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Reintentar' }),
    ).toBeInTheDocument()
  })
})
