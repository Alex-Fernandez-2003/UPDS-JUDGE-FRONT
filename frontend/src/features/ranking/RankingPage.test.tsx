import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { AdminLayout } from '@/layouts/AdminLayout'
import type { ContestRanking } from './types'

const { useContestRankingMock } = vi.hoisted(() => ({
  useContestRankingMock: vi.fn(),
}))
vi.mock('./hooks', () => ({ useContestRanking: useContestRankingMock }))
import RankingPage from './RankingPage'

const ranking: ContestRanking = {
  codigo: 'demo',
  nombre: 'Demo',
  congelado: false,
  estadoTiempo: 'Finalizado',
  fechaInicio: '2026-01-01T00:00:00Z',
  fechaFin: '2026-01-01T02:00:00Z',
  duracionMinutos: 120,
  minutosCongelamiento: 30,
  totalInscritos: 1,
  totalEnvios: 0,
  problemas: [],
  participantes: [
    {
      idUsuario: 2,
      puesto: 1,
      nombreUsuario: 'Ada',
      problemasResueltos: 0,
      tiempoTotal: 0,
      cantidadIntentos: 0,
      detalle: [],
    },
  ],
  problemaMasResuelto: null,
}

const renderAdminRanking = () =>
  render(
    <MemoryRouter initialEntries={['/admin/user-access/contests/demo/ranking']}>
      <Routes>
        <Route
          path="/admin/user-access/contests/:contestCode/ranking"
          element={
            <AdminLayout>
              <RankingPage admin />
            </AdminLayout>
          }
        />
      </Routes>
    </MemoryRouter>,
  )

describe('administrative contextual ranking', () => {
  it('uses the administrative shell and contextual active Ranking navigation', () => {
    sessionStorage.setItem(
      'token',
      'header.eyJyb2xlIjoiQWRtaW5pc3RyYWRvckNvbmN1cnNvcyJ9.signature',
    )
    useContestRankingMock.mockReturnValue({
      data: ranking,
      isLoading: false,
      error: null,
    })
    renderAdminRanking()
    expect(
      screen.getByRole('navigation', { name: 'Navegación administrativa' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('navigation', { name: 'Navegación de usuario' }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ranking' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Problemas' })).not.toHaveAttribute(
      'aria-current',
    )
    expect(
      screen.getByRole('link', { name: 'Mis envíos' }),
    ).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Ranking' })).toHaveAttribute(
      'href',
      '/admin/user-access/contests/demo/ranking',
    )
    sessionStorage.removeItem('token')
  })

  it('highlights only the authenticated participant after a rerender', () => {
    sessionStorage.setItem(
      'token',
      'header.eyJpZFVzdWFyaW8iOiIyIiwicm9sZSI6IlVzdWFyaW8ifQ.signature',
    )
    useContestRankingMock.mockReturnValue({
      data: ranking,
      isLoading: false,
      error: null,
    })
    const view = renderAdminRanking()
    expect(screen.getByRole('row', { name: 'Tu posición: Ada' })).toHaveClass(
      'bg-[var(--surface-muted)]',
    )
    view.rerender(
      <MemoryRouter
        initialEntries={['/admin/user-access/contests/demo/ranking']}
      >
        <Routes>
          <Route
            path="/admin/user-access/contests/:contestCode/ranking"
            element={
              <AdminLayout>
                <RankingPage admin />
              </AdminLayout>
            }
          />
        </Routes>
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('row', { name: 'Tu posición: Ada' }),
    ).toBeInTheDocument()
    sessionStorage.removeItem('token')
  })

  it('shows the controlled contract error rather than a router crash', () => {
    useContestRankingMock.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(
        'La versión del servidor no es compatible con esta pantalla de ranking.',
      ),
    })
    renderAdminRanking()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'versión del servidor no es compatible',
    )
    expect(
      screen.queryByText('Unexpected Application Error'),
    ).not.toBeInTheDocument()
  })
})
