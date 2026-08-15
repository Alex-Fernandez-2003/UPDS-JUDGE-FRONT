import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const { getContestDashboardMock, getMySubmissionsMock, createSubmissionMock } =
  vi.hoisted(() => ({
    getContestDashboardMock: vi.fn(),
    getMySubmissionsMock: vi.fn(),
    createSubmissionMock: vi.fn(),
  }))

vi.mock('@/features/problems/service', () => ({
  getContestDashboard: getContestDashboardMock,
}))
vi.mock('../Types/submissionsService', () => ({
  submissionsService: {
    getMySubmissions: getMySubmissionsMock,
    createSubmission: createSubmissionMock,
  },
}))

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

import { ContestSubmissionsContent } from './SubmissionsPage'

const dashboard = {
  codigo: 'upds-div4-010',
  nombre: 'Coders Team UPDS Marathon',
  estadoTiempo: 'Finalizado',
  fechaFin: '2036-01-01T10:00:00Z',
  totalProblemas: 2,
  problemas: [
    { inciso: 'A', titulo: 'Cadena Alternante' },
    { inciso: 'B', titulo: 'Matriz dispersa' },
  ],
}

const metadataResponse = {
  codigo: 'upds-div4-010',
  nombre: 'Coders Team UPDS Marathon',
  estadoTiempo: 'Finalizado',
  fechaInicio: '2036-01-01T08:00:00Z',
  fechaFin: '2036-01-01T10:00:00Z',
  duracionMinutos: 120,
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={['/student/contests/upds-div4-010/submissions']}
      >
        <ContestSubmissionsContent
          contestCode="upds-div4-010"
          navigationItems={[
            {
              id: 'submissions',
              label: 'Mis envíos',
              to: '/student/contests/upds-div4-010/submissions',
            },
          ]}
        />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

const runningSubmission = {
  idEnvio: 42,
  concursoCodigo: 'upds-div4-010',
  problemaTitulo: 'Cadena Alternante',
  inciso: 'A',
  lenguaje: 'C++ 17',
  veredicto: 'En Cola',
  consumoTiempo: 0,
  consumoMemoria: 0,
  fechaEnvio: '2026-08-16T13:10:51.413Z',
}

const acceptedSubmission = {
  ...runningSubmission,
  veredicto: 'Accepted',
  consumoTiempo: 16,
  consumoMemoria: 3240,
}

const emptySubmissions = { datos: [], total: 0, pagina: 1, tamanoPagina: 5 }
const runningSubmissions = {
  datos: [runningSubmission],
  total: 1,
  pagina: 1,
  tamanoPagina: 5,
}
const acceptedSubmissions = {
  datos: [acceptedSubmission],
  total: 1,
  pagina: 1,
  tamanoPagina: 5,
}

describe('ContestSubmissionsContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getContestDashboardMock.mockResolvedValue(dashboard)
    getMySubmissionsMock.mockResolvedValue(emptySubmissions)
    createSubmissionMock.mockResolvedValue(undefined)
    server.use(
      http.get('/api/Concursos/:contestCode/ranking', () =>
        HttpResponse.json(metadataResponse),
      ),
    )
  })

  it('shows only the history card and exposes one modal trigger after refresh', async () => {
    renderPage()

    expect(
      await screen.findByRole('heading', { name: dashboard.nombre }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'FECHA' }),
    ).toBeInTheDocument()
    expect(screen.queryByTestId('submit-form')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', { name: 'Código fuente' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Seleccionar archivo fuente'),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()

    const refresh = screen.getByRole('button', { name: 'Actualizar' })
    const submit = screen.getByRole('button', { name: 'Enviar solución' })
    expect(
      refresh.compareDocumentPosition(submit) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      screen.getAllByRole('button', { name: 'Enviar solución' }),
    ).toHaveLength(1)
  })

  it('opens one modal and, after one POST, refreshes exactly once with filter and page preserved', async () => {
    const user = userEvent.setup()
    getMySubmissionsMock.mockResolvedValue({
      datos: [],
      total: 6,
      pagina: 1,
      tamanoPagina: 5,
    })
    renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await user.selectOptions(screen.getByRole('combobox'), 'A')
    await waitFor(() =>
      expect(getMySubmissionsMock).toHaveBeenLastCalledWith(
        'upds-div4-010',
        expect.objectContaining({ pagina: 1, inciso: 'A' }),
      ),
    )
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await waitFor(() =>
      expect(getMySubmissionsMock).toHaveBeenLastCalledWith(
        'upds-div4-010',
        expect.objectContaining({ pagina: 2, inciso: 'A' }),
      ),
    )
    const historyCallsBeforeSubmit = getMySubmissionsMock.mock.calls.length

    await user.click(screen.getByRole('button', { name: 'Enviar solución' }))
    const dialog = screen.getByRole('dialog', { name: 'Enviar solución' })
    expect(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
    ).toHaveValue('A')
    fireEvent.change(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
      { target: { value: 'int main() { return 0; }' } },
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Enviar solución' }),
    )

    await waitFor(() => expect(createSubmissionMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(getMySubmissionsMock).toHaveBeenCalledTimes(
      historyCallsBeforeSubmit + 1,
    )
    expect(getMySubmissionsMock).toHaveBeenLastCalledWith('upds-div4-010', {
      pagina: 2,
      tamanoPagina: 5,
      inciso: 'A',
    })
  })

  it('keeps the modal and work open when the existing POST rejects', async () => {
    const user = userEvent.setup()
    createSubmissionMock.mockRejectedValue(
      new Error('Submission rejected by backend.'),
    )
    renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await user.click(screen.getByRole('button', { name: 'Enviar solución' }))
    const dialog = screen.getByRole('dialog', { name: 'Enviar solución' })
    await user.selectOptions(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
      'B',
    )
    fireEvent.change(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
      { target: { value: 'preserve me' } },
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Enviar solución' }),
    )

    expect(
      await within(dialog).findByText('Submission rejected by backend.'),
    ).toBeInTheDocument()
    expect(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
    ).toHaveValue('preserve me')
    expect(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
    ).toHaveValue('B')
    expect(getMySubmissionsMock).toHaveBeenCalledTimes(1)
  })

  it('preserves the history error state', async () => {
    getMySubmissionsMock.mockRejectedValue(new Error('History unavailable.'))
    renderPage()
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'History unavailable.',
    )
  })

  it('preserves caller-provided navigation for user/admin contextual wrappers', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[
            '/admin/user-access/contests/upds-div4-010/submissions',
          ]}
        >
          <ContestSubmissionsContent
            contestCode="upds-div4-010"
            navigationItems={[
              {
                id: 'submissions',
                label: 'Mis envíos',
                to: '/admin/user-access/contests/upds-div4-010/submissions',
              },
            ]}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    )
    expect(
      await screen.findByRole('link', { name: 'Mis envíos' }),
    ).toHaveAttribute(
      'href',
      '/admin/user-access/contests/upds-div4-010/submissions',
    )
  })
})

// ─── Running flow tests ───────────────────────────────────────────────────────
// Uses vi.useFakeTimers to fake ONLY setInterval/clearInterval. All other
// timers (setTimeout, queueMicrotask, MessageChannel, Date) remain real so
// that userEvent, React's scheduler, waitFor, and Promise continuations all
// work normally. We trigger poll ticks with vi.advanceTimersByTime(5000).
// ─────────────────────────────────────────────────────────────────────────────

describe('Running flow and polling', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getContestDashboardMock.mockResolvedValue(dashboard)
    getMySubmissionsMock.mockResolvedValue(emptySubmissions)
    createSubmissionMock.mockResolvedValue(undefined)
    server.use(
      http.get('/api/Concursos/:contestCode/ranking', () =>
        HttpResponse.json(metadataResponse),
      ),
    )

    vi.useFakeTimers({
      toFake: ['setInterval', 'clearInterval'],
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function waitForPollEffect() {
    // Wait for any pending setInterval to be registered, then advance to fire it.
    await new Promise((resolve) => setTimeout(resolve, 0))
    vi.advanceTimersByTime(5000)
    await new Promise((resolve) => setTimeout(resolve, 0))
  }

  async function submitSolution(user: ReturnType<typeof userEvent.setup>) {
    await user.click(screen.getByRole('button', { name: 'Enviar solución' }))
    const dialog = screen.getByRole('dialog', { name: 'Enviar solución' })
    await user.selectOptions(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
      'A',
    )
    fireEvent.change(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
      { target: { value: 'int main() { return 0; }' } },
    )
    await user.click(
      within(dialog).getByRole('button', { name: /^Enviar solución$/ }),
    )
  }

  // Test 1: POST succeeds → GET returns empty → polling starts → later GET
  //          returns running row → EN PROGRESO visible
  it('starts polling after POST even when GET has not returned a running row yet', async () => {
    const user = userEvent.setup()
    const { unmount } = renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await submitSolution(user)

    // Wait for POST to resolve and modal to close
    await waitFor(() => expect(createSubmissionMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )

    // Polling should have started (fake setInterval registered)
    expect(vi.getTimerCount()).toBeGreaterThan(0)
    // No running row visible yet (GET returned empty after POST)
    expect(screen.queryByText('EN PROGRESO')).not.toBeInTheDocument()

    // Now make GET return a running submission
    getMySubmissionsMock.mockResolvedValue(runningSubmissions)

    // Trigger poll tick
    await waitForPollEffect()

    // After poll, running submission should be visible
    await waitFor(() =>
      expect(screen.getByText('EN PROGRESO')).toBeInTheDocument(),
    )

    unmount()
  })

  // Test 2: Reconciliation — poll returns Accepted after Running, no duplicate rows
  it('reconciles by idEnvio replacing Running with final verdict without duplicates', async () => {
    const user = userEvent.setup()
    const { unmount } = renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await submitSolution(user)

    await waitFor(() => expect(createSubmissionMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(vi.getTimerCount()).toBeGreaterThan(0)

    // First poll returns Running (En Cola)
    getMySubmissionsMock.mockResolvedValueOnce(runningSubmissions)
    await waitForPollEffect()
    await waitFor(() =>
      expect(screen.getByText('EN PROGRESO')).toBeInTheDocument(),
    )

    // Second poll returns Accepted → replaces Running, no duplicate
    getMySubmissionsMock.mockResolvedValue(acceptedSubmissions)
    await waitForPollEffect()
    await waitFor(() =>
      expect(screen.getByText('ACCEPTED')).toBeInTheDocument(),
    )
    expect(screen.queryByText('EN PROGRESO')).not.toBeInTheDocument()
    expect(screen.getAllByText('ACCEPTED')).toHaveLength(1)

    unmount()
  })

  // Test 3: Long evaluation — multiple polls through different running states
  it('polls through multiple running states until a final verdict appears', async () => {
    const user = userEvent.setup()
    const { unmount } = renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await submitSolution(user)

    await waitFor(() => expect(createSubmissionMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(vi.getTimerCount()).toBeGreaterThan(0)

    const processingSubmission = {
      ...runningSubmission,
      veredicto: 'Procesando' as const,
    }
    const evaluatingSubmission = {
      ...runningSubmission,
      veredicto: 'Evaluando' as const,
    }

    // Poll 1: En Cola (still running)
    getMySubmissionsMock.mockResolvedValueOnce(runningSubmissions)
    await waitForPollEffect()
    await waitFor(() =>
      expect(screen.getByText('EN PROGRESO')).toBeInTheDocument(),
    )

    // Poll 2: Procesando (still running)
    getMySubmissionsMock.mockResolvedValueOnce({
      datos: [processingSubmission],
      total: 1,
      pagina: 1,
      tamanoPagina: 5,
    })
    await waitForPollEffect()
    expect(screen.getByText('EN PROGRESO')).toBeInTheDocument()

    // Poll 3: Evaluando (still running)
    getMySubmissionsMock.mockResolvedValueOnce({
      datos: [evaluatingSubmission],
      total: 1,
      pagina: 1,
      tamanoPagina: 5,
    })
    await waitForPollEffect()
    expect(screen.getByText('EN PROGRESO')).toBeInTheDocument()

    // Poll 4: Accepted (final)
    getMySubmissionsMock.mockResolvedValue(acceptedSubmissions)
    await waitForPollEffect()
    await waitFor(() =>
      expect(screen.getByText('ACCEPTED')).toBeInTheDocument(),
    )
    expect(screen.queryByText('EN PROGRESO')).not.toBeInTheDocument()

    unmount()
  })

  // Test 4: POST error → modal stays open, no polling started
  it('shows error and keeps the modal open when POST rejects, without starting polling', async () => {
    const user = userEvent.setup()
    createSubmissionMock.mockRejectedValue(new Error('Judge0 unavailable.'))
    const { unmount } = renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await submitSolution(user)

    // POST rejected → error shown, modal stays open
    await waitFor(() =>
      expect(screen.getByText('Judge0 unavailable.')).toBeInTheDocument(),
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // No polling timers should have been started (pollingActive was never set to true)
    expect(vi.getTimerCount()).toBe(0)
    // Only the initial GET from mount, no extra calls from handleSubmitSolution
    expect(getMySubmissionsMock).toHaveBeenCalledTimes(1)

    unmount()
  })

  // Test 5: Unmount stops polling
  it('stops polling when the component is unmounted', async () => {
    const user = userEvent.setup()
    const { unmount } = renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await submitSolution(user)

    await waitFor(() => expect(createSubmissionMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(vi.getTimerCount()).toBeGreaterThan(0)

    // Unmount should clear all pending timers
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
