import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ContestDashboard } from '@/features/problems/types'
import type { ContestRanking } from '@/features/ranking/types'
import { routes } from './constants'

const { dashboardMock, rankingMock, submissionsMock, createSubmissionMock } =
  vi.hoisted(() => ({
    dashboardMock: vi.fn(),
    rankingMock: vi.fn(),
    submissionsMock: vi.fn(),
    createSubmissionMock: vi.fn(),
  }))

vi.mock('@/features/problems/service', () => ({
  getContestDashboard: dashboardMock,
}))
vi.mock('@/features/ranking/service', () => ({
  getContestRanking: rankingMock,
}))
vi.mock('@/features/submissions/Types/submissionsService', () => ({
  submissionsService: {
    getMySubmissions: submissionsMock,
    createSubmission: createSubmissionMock,
  },
}))

import { createAppRouter } from './router'

const contestCode = 'route-parity'
const dashboard: ContestDashboard = {
  codigo: contestCode,
  nombre: 'Route Parity Contest',
  estadoTiempo: 'Finalizado',
  cantidadParticipantes: 1,
  fechaFin: '2036-01-01T10:00:00Z',
  minutosCongelamiento: 0,
  segundosRestantes: null,
  urlSetProblemas: null,
  problemasResueltos: 1,
  totalProblemas: 1,
  intentosTotales: 1,
  problemas: [
    {
      inciso: 'A',
      titulo: 'Parity Problem',
      tiempo: 1,
      memoria: 256,
      intentos: 1,
      estado: 'Accepted',
      resuelto: true,
    },
  ],
}

const ranking: ContestRanking = {
  codigo: contestCode,
  nombre: dashboard.nombre,
  congelado: false,
  estadoTiempo: 'Finalizado',
  fechaInicio: '2036-01-01T08:00:00Z',
  fechaFin: dashboard.fechaFin,
  duracionMinutos: 120,
  minutosCongelamiento: 0,
  totalInscritos: 1,
  totalEnvios: 1,
  problemaMasResuelto: {
    inciso: 'A',
    colorGlobo: 'Rojo',
    cantidadAceptaciones: 1,
  },
  problemas: [{ inciso: 'A', colorGlobo: 'Rojo' }],
  participantes: [
    {
      idUsuario: 7,
      puesto: 1,
      nombreUsuario: 'Parity User',
      problemasResueltos: 1,
      tiempoTotal: 20,
      cantidadIntentos: 1,
      detalle: [
        {
          inciso: 'A',
          colorGlobo: 'Rojo',
          estado: 'Aceptado',
          intentos: 1,
          tiempoMinutos: 20,
        },
      ],
    },
  ],
}

const tokenFor = (role: 'Usuario' | 'AdministradorConcursos') =>
  `x.${btoa(JSON.stringify({ role: [role], name: 'Parity User', idUsuario: '7' }))}.x`

const sections = [
  {
    id: 'problems',
    marker: () => screen.getByRole('heading', { name: 'Set de Problemas' }),
  },
  {
    id: 'submissions',
    marker: () => screen.getByRole('columnheader', { name: 'FECHA' }),
  },
  {
    id: 'ranking',
    marker: () =>
      screen.getByRole('heading', { name: 'Clasificación del concurso' }),
  },
] as const

const routeFor = {
  user: {
    problems: routes.studentContestProblems,
    submissions: routes.studentContestSubmissions,
    ranking: routes.studentContestRanking,
  },
  admin: {
    problems: routes.adminUserContestProblems,
    submissions: routes.adminUserContestSubmissions,
    ranking: routes.adminUserContestRanking,
  },
}

beforeEach(() => {
  vi.clearAllMocks()
  dashboardMock.mockResolvedValue(dashboard)
  rankingMock.mockResolvedValue(ranking)
  submissionsMock.mockResolvedValue({
    datos: [],
    total: 0,
    pagina: 1,
    tamanoPagina: 5,
  })
  createSubmissionMock.mockResolvedValue(undefined)
})

describe.each([
  { mode: 'user' as const, role: 'Usuario' as const },
  { mode: 'admin' as const, role: 'AdministradorConcursos' as const },
])('$mode contest route parity', ({ mode, role }) => {
  it.each(sections)(
    'renders the real $id route with the shared contest context and role shell',
    async ({ id, marker }) => {
      sessionStorage.setItem('token', tokenFor(role))
      const expectedRoutes = routeFor[mode]
      const router = createAppRouter(false)
      await router.navigate(expectedRoutes[id](contestCode))

      const view = render(
        <QueryClientProvider client={new QueryClient()}>
          <RouterProvider router={router} />
        </QueryClientProvider>,
      )

      expect(
        await screen.findByRole('heading', { name: dashboard.nombre }),
      ).toBeInTheDocument()
      expect(marker()).toBeInTheDocument()

      const contestNav = screen.getByRole('navigation', {
        name: 'Navegación del concurso',
      })
      expect(
        within(contestNav).getByRole('link', { name: 'Problemas' }),
      ).toHaveAttribute('href', expectedRoutes.problems(contestCode))
      expect(
        within(contestNav).getByRole('link', { name: 'Mis envíos' }),
      ).toHaveAttribute('href', expectedRoutes.submissions(contestCode))
      expect(
        within(contestNav).getByRole('link', { name: 'Ranking' }),
      ).toHaveAttribute('href', expectedRoutes.ranking(contestCode))

      if (mode === 'user') {
        expect(
          screen.getByRole('navigation', { name: 'Navegación de usuario' }),
        ).toBeInTheDocument()
        expect(
          screen.queryByRole('navigation', {
            name: 'Navegación administrativa',
          }),
        ).not.toBeInTheDocument()
      } else {
        expect(
          screen.getByRole('navigation', {
            name: 'Navegación administrativa',
          }),
        ).toBeInTheDocument()
        expect(screen.getAllByText('Panel Administrativo')).not.toHaveLength(0)
        expect(
          screen.queryByRole('navigation', { name: 'Navegación de usuario' }),
        ).not.toBeInTheDocument()
      }

      expect(router.state.location.pathname).toBe(
        expectedRoutes[id](contestCode),
      )
      expect(
        within(contestNav).getByRole('link', {
          name:
            id === 'submissions'
              ? 'Mis envíos'
              : id === 'problems'
                ? 'Problemas'
                : 'Ranking',
        }),
      ).toHaveAttribute('aria-current', 'page')

      view.unmount()
      router.dispose()
    },
  )
})
