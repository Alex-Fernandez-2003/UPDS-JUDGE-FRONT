import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ContestDashboard } from '@/features/problems/types'
import { routes } from './constants'

const { rankingMock, dashboardMock } = vi.hoisted(() => ({
  rankingMock: vi.fn(),
  dashboardMock: vi.fn(),
}))
vi.mock('@/features/ranking/service', () => ({
  getContestRanking: rankingMock,
}))
vi.mock('@/features/problems/service', () => ({
  getContestDashboard: dashboardMock,
}))
import { createAppRouter } from './router'

const ranking = {
  codigo: 'uj18-ranking-finalizado-demo',
  nombre: 'Concurso Finalizado Demo UJ-18',
  congelado: false,
  estadoTiempo: 'Finalizado',
  fechaInicio: '2026-07-27T20:29:01Z',
  fechaFin: '2026-07-27T22:29:01Z',
  duracionMinutos: 120,
  minutosCongelamiento: 30,
  totalInscritos: 3,
  totalEnvios: 11,
  problemaMasResuelto: {
    inciso: 'A',
    colorGlobo: '#E6194B',
    cantidadAceptaciones: 3,
  },
  problemas: [
    { inciso: 'A', colorGlobo: '#E6194B' },
    { inciso: 'B', colorGlobo: '#4363D8' },
    { inciso: 'C', colorGlobo: '#FFE119' },
  ],
  participantes: ['Ana Ranking', 'Bruno Ranking', 'Carla Ranking'].map(
    (nombreUsuario, index) => ({
      idUsuario: 17 + index,
      puesto: index + 1,
      nombreUsuario,
      problemasResueltos: 2 - Number(index === 2),
      tiempoTotal: [125, 160, 70][index],
      cantidadIntentos: 3,
      detalle: [
        {
          inciso: 'A',
          colorGlobo: '#E6194B',
          estado: 'Aceptado',
          intentos: 1,
          tiempoMinutos: 25,
        },
        {
          inciso: 'B',
          colorGlobo: '#4363D8',
          estado: index === 2 ? 'No resuelto' : 'Aceptado',
          intentos: 1,
          tiempoMinutos: index === 2 ? null : 80,
        },
        {
          inciso: 'C',
          colorGlobo: '#FFE119',
          estado: 'No intentado',
          intentos: 0,
          tiempoMinutos: null,
        },
      ],
    }),
  ),
}

const dashboard: ContestDashboard = {
  codigo: ranking.codigo,
  nombre: ranking.nombre,
  estadoTiempo: 'Finalizado',
  cantidadParticipantes: 3,
  fechaFin: ranking.fechaFin,
  minutosCongelamiento: 30,
  segundosRestantes: null,
  urlSetProblemas: null,
  problemasResueltos: 2,
  totalProblemas: 3,
  intentosTotales: 3,
  problemas: [],
}

const adminToken = `x.${btoa(JSON.stringify({ role: ['Usuario', 'AdministradorConcursos'], nombre: 'Ana Ranking' }))}.x`

beforeEach(() => {
  sessionStorage.setItem('token', adminToken)
  rankingMock.mockResolvedValue(ranking)
  dashboardMock.mockResolvedValue(dashboard)
})

describe('ranking routes', () => {
  it('builds the encoded administrative ranking route', () => {
    expect(routes.adminUserContestRanking('uj18 ranking/demo')).toBe(
      '/admin/user-access/contests/uj18%20ranking%2Fdemo/ranking',
    )
  })

  it('navigates from the real administrative problem route and renders ranking data', async () => {
    const router = createAppRouter(false)
    await router.navigate(routes.adminUserContestProblems(ranking.codigo))
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )
    const nav = await screen.findByRole('navigation', {
      name: 'Navegación del concurso',
    })
    fireEvent.click(within(nav).getByRole('link', { name: 'Ranking' }))

    expect(await screen.findByText('Ana Ranking')).toBeInTheDocument()
    expect(router.state.location.pathname).toBe(
      routes.adminUserContestRanking(ranking.codigo),
    )
    expect(
      screen.getByRole('navigation', { name: 'Navegación administrativa' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('navigation', { name: 'Navegación de usuario' }),
    ).not.toBeInTheDocument()
    expect(
      within(
        screen.getByRole('navigation', { name: 'Navegación del concurso' }),
      ).getByRole('link', { name: 'Ranking' }),
    ).toHaveAttribute('aria-current', 'page')
    expect(rankingMock).toHaveBeenCalledWith(ranking.codigo)
    expect(
      screen.queryByRole('heading', { name: '404' }),
    ).not.toBeInTheDocument()
  })

  it('renders all current ranking rows and dynamic data in the normal user route', async () => {
    const router = createAppRouter(false)
    await router.navigate(routes.studentContestRanking(ranking.codigo))
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )
    expect(await screen.findByText('Ana Ranking')).toBeInTheDocument()
    for (const name of ['Ana Ranking', 'Bruno Ranking', 'Carla Ranking'])
      expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByText('125 min')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(screen.getByText('A · 3')).toBeInTheDocument()
    expect(screen.getByText('Página 1 de 1')).toBeInTheDocument()
    expect(screen.getAllByLabelText(/Aceptado en/).length).toBeGreaterThan(0)
  })
})
