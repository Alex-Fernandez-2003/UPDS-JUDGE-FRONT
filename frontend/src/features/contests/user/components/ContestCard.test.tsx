import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter, useLocation } from 'react-router'
import type { PropsWithChildren } from 'react'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import type { ConcursoListItem } from '@/features/contests/types'
import { ContestCard } from './ContestCard'

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const privateFinishedContest: ConcursoListItem = {
  idConcurso: 42,
  codigo: 'private-final',
  nombre: 'Privado finalizado',
  descripcion: 'Concurso privado finalizado.',
  estadoTiempo: 'Finalizado',
  modalidad: 'Privado',
  fechaInicio: '2026-01-01T10:00:00Z',
  fechaFin: '2026-01-01T12:00:00Z',
  fechaCongelamiento: '2026-01-01T11:30:00Z',
  duracionMinutos: 120,
  minutosCongelamiento: 30,
  cantidadProblemas: 3,
  cantidadParticipantes: 10,
  yaInscrito: false,
  segundosRestantes: null,
  miPuesto: null,
  miProblemasResueltos: null,
}

function CurrentPath() {
  return <output data-testid="current-path">{useLocation().pathname}</output>
}

function renderCard({
  contest = privateFinishedContest,
  problemsPath = (code: string) => `/student/contests/${code}/problems`,
}: {
  contest?: ConcursoListItem
  problemsPath?: (code: string) => string
} = {}) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  const invalidateQueries = vi.spyOn(queryClient, 'invalidateQueries')
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/contests']}>
        {children}
        <CurrentPath />
      </MemoryRouter>
    </QueryClientProvider>
  )

  return {
    ...render(<ContestCard contest={contest} problemsPath={problemsPath} />, {
      wrapper,
    }),
    invalidateQueries,
  }
}

describe('ContestCard private finished enrollment', () => {
  it('opens the password modal and enrolls before navigating in the user context', async () => {
    let requestBody: unknown
    server.use(
      http.post('/api/ParticipanteConcursos/unirse', async ({ request }) => {
        requestBody = await request.json()
        return HttpResponse.json({
          mensaje: 'Inscripción registrada.',
          codConcurso: privateFinishedContest.codigo,
        })
      }),
    )
    const user = userEvent.setup()
    const { invalidateQueries } = renderCard()

    const action = screen.getByRole('button', { name: 'Inscribirse' })
    expect(action).toBeEnabled()
    await user.click(action)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const password = screen.getByLabelText('Contraseña del concurso')
    expect(password).toHaveAttribute('type', 'password')
    await user.type(password, 'correct-secret')
    await user.click(
      screen.getByRole('button', { name: 'Confirmar inscripción' }),
    )

    await waitFor(() =>
      expect(screen.getByTestId('current-path')).toHaveTextContent(
        '/student/contests/private-final/problems',
      ),
    )
    expect(requestBody).toEqual({
      codigo: 'private-final',
      contrasena: 'correct-secret',
    })
    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['concursos', 'public-list'],
    })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('keeps the modal usable after an incorrect password and clears it when cancelled', async () => {
    server.use(
      http.post('/api/ParticipanteConcursos/unirse', () =>
        HttpResponse.json(
          { mensaje: 'Contraseña incorrecta.' },
          { status: 400 },
        ),
      ),
    )
    const user = userEvent.setup()
    renderCard()

    await user.click(screen.getByRole('button', { name: 'Inscribirse' }))
    const password = screen.getByLabelText('Contraseña del concurso')
    await user.type(password, 'incorrect-secret')
    await user.click(
      screen.getByRole('button', { name: 'Confirmar inscripción' }),
    )

    expect(
      await screen.findByText('Contraseña incorrecta.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña del concurso')).toHaveValue(
      'incorrect-secret',
    )
    expect(screen.getByTestId('current-path')).toHaveTextContent('/contests')

    await user.click(screen.getByRole('button', { name: 'Cancelar' }))
    await user.click(screen.getByRole('button', { name: 'Inscribirse' }))
    expect(screen.getByLabelText('Contraseña del concurso')).toHaveValue('')
  })

  it('uses the administrative problem route after a successful enrollment', async () => {
    server.use(
      http.post('/api/ParticipanteConcursos/unirse', () =>
        HttpResponse.json({
          mensaje: 'Inscripción registrada.',
          codConcurso: privateFinishedContest.codigo,
        }),
      ),
    )
    const user = userEvent.setup()
    renderCard({
      problemsPath: (code) => `/admin/user-access/contests/${code}/problems`,
    })

    await user.click(screen.getByRole('button', { name: 'Inscribirse' }))
    await user.type(screen.getByLabelText('Contraseña del concurso'), 'secret')
    await user.click(
      screen.getByRole('button', { name: 'Confirmar inscripción' }),
    )

    await waitFor(() =>
      expect(screen.getByTestId('current-path')).toHaveTextContent(
        '/admin/user-access/contests/private-final/problems',
      ),
    )
  })

  it('navigates an already enrolled private finished user directly without enrolling again', async () => {
    const join = vi.fn()
    server.use(http.post('/api/ParticipanteConcursos/unirse', join))
    const user = userEvent.setup()
    renderCard({ contest: { ...privateFinishedContest, yaInscrito: true } })

    await user.click(screen.getByRole('button', { name: 'Ver detalles' }))

    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/student/contests/private-final/submissions',
    )
    expect(join).not.toHaveBeenCalled()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
