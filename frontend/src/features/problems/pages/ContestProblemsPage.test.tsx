import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ContestDashboard } from '../types'

const { getContestDashboardMock } = vi.hoisted(() => ({
  getContestDashboardMock: vi.fn(),
}))

vi.mock('../service', () => ({
  getContestDashboard: getContestDashboardMock,
}))

import ContestProblemsPage from './ContestProblemsPage'

const dashboard: ContestDashboard = {
  codigo: 'div4-2026',
  nombre: 'Concurso de Programación',
  estadoTiempo: 'Activo',
  cantidadParticipantes: 12,
  fechaFin: '2026-08-16T16:10:51.413Z',
  minutosCongelamiento: 0,
  segundosRestantes: 900,
  urlSetProblemas: 'https://example.test/set.pdf',
  problemasResueltos: 2,
  totalProblemas: 4,
  intentosTotales: 7,
  problemas: [
    {
      inciso: 'A',
      titulo: 'Sumas',
      tiempo: 1,
      memoria: 256,
      intentos: 2,
      estado: 'Accepted',
      resuelto: true,
    },
  ],
}

const renderPage = (contestCode = dashboard.codigo) =>
  render(
    <MemoryRouter
      initialEntries={[`/student/contests/${contestCode}/problems`]}
    >
      <Routes>
        <Route
          path="/student/contests/:contestCode/problems"
          element={<ContestProblemsPage />}
        />
      </Routes>
    </MemoryRouter>,
  )

describe('ContestProblemsPage', () => {
  beforeEach(() => {
    getContestDashboardMock.mockResolvedValue(dashboard)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the integrated contest composition using dashboard data', async () => {
    renderPage()

    expect(
      await screen.findByRole('heading', { name: dashboard.nombre }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Navegación de usuario' }),
    ).toBeInTheDocument()
    expect(screen.getByText('EN CURSO')).toBeInTheDocument()
    expect(screen.getAllByText(dashboard.codigo)).not.toHaveLength(0)
    expect(screen.getByText('16 de agosto de 2026')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getAllByText('2')).not.toHaveLength(0)
    expect(screen.getByText('/ 4')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Set de Problemas' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Sumas')).toBeInTheDocument()

    const problemsLink = screen.getByRole('link', { name: 'Problemas' })
    expect(problemsLink).toHaveAttribute(
      'href',
      '/student/contests/div4-2026/problems',
    )
    expect(problemsLink).toHaveAttribute('aria-current', 'page')
    expect(
      within(
        screen.getByRole('navigation', { name: 'Navegación del concurso' }),
      ).getByRole('link', { name: 'Mis envíos' }),
    ).toHaveAttribute('href', '/student/contests/div4-2026/submissions')
    expect(screen.getByRole('link', { name: 'Ver PDF' })).toHaveAttribute(
      'href',
      dashboard.urlSetProblemas,
    )
    expect(screen.getAllByRole('link', { name: 'Ver PDF' })).toHaveLength(1)

    expect(screen.getByRole('link', { name: 'Ranking' })).toHaveAttribute(
      'href',
      '/student/contests/div4-2026/ranking',
    )
    expect(screen.queryByText('Marcador Congelado')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Ver reglas del concurso'),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('20 Minutos por Respuesta Incorrecta'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Tabla de Posiciones')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Concurso Oficial • UPDS'),
    ).not.toBeInTheDocument()
  })

  it('keeps loading and service errors inside the user layout', async () => {
    let resolveDashboard: (value: ContestDashboard) => void = () => undefined
    getContestDashboardMock.mockReturnValueOnce(
      new Promise<ContestDashboard>((resolve) => {
        resolveDashboard = resolve
      }),
    )

    const loadingView = renderPage()
    expect(
      screen.getByRole('status', { name: 'Cargando concurso' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Navegación de usuario' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: dashboard.nombre }),
    ).not.toBeInTheDocument()
    resolveDashboard(dashboard)
    loadingView.unmount()

    getContestDashboardMock.mockRejectedValueOnce(new Error('Acceso denegado'))
    renderPage()

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Acceso denegado',
    )
    expect(
      screen.getByRole('navigation', { name: 'Navegación de usuario' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: dashboard.nombre }),
    ).not.toBeInTheDocument()
  })

  it('renders a safe placeholder for an invalid dashboard date', async () => {
    getContestDashboardMock.mockResolvedValueOnce({
      ...dashboard,
      fechaFin: 'invalid-date',
    })

    renderPage()

    expect((await screen.findAllByText('—')).length).toBeGreaterThanOrEqual(2)
  })
})
