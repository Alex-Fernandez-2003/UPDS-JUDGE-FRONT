import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import type { ContestRanking } from './types'

const { useContestRankingMock } = vi.hoisted(() => ({
  useContestRankingMock: vi.fn(),
}))
vi.mock('./hooks', () => ({ useContestRanking: useContestRankingMock }))
import RankingPage from './RankingPage'

const problems = [
  { inciso: 'A', colorGlobo: 'Rojo' },
  { inciso: 'B', colorGlobo: 'Azul' },
  { inciso: 'C', colorGlobo: 'Verde' },
  { inciso: 'D', colorGlobo: 'Amarillo' },
  { inciso: 'E', colorGlobo: 'Naranja' },
  { inciso: 'F', colorGlobo: 'Morado' },
]

const ranking: ContestRanking = {
  codigo: 'demo',
  nombre: 'Ranking Demo',
  congelado: false,
  estadoTiempo: 'Activo',
  fechaInicio: '2036-01-01T08:00:00Z',
  fechaFin: '2036-01-01T10:00:00Z',
  duracionMinutos: 120,
  minutosCongelamiento: 0,
  totalInscritos: 7,
  totalEnvios: 9,
  problemaMasResuelto: {
    inciso: 'A',
    colorGlobo: 'Rojo',
    cantidadAceptaciones: 3,
  },
  problemas: problems,
  participantes: [
    {
      idUsuario: 1,
      puesto: 1,
      nombreUsuario: 'Ada',
      problemasResueltos: 1,
      tiempoTotal: 20,
      cantidadIntentos: 2,
      detalle: [
        {
          inciso: 'A',
          colorGlobo: 'Rojo',
          estado: 'Aceptado',
          tiempoMinutos: 20,
          intentos: 1,
        },
      ],
    },
  ],
}

const renderPage = (data = ranking) => {
  useContestRankingMock.mockReturnValue({ data, isLoading: false, error: null })
  return render(
    <MemoryRouter initialEntries={['/student/contests/demo/ranking']}>
      <Routes>
        <Route
          path="/student/contests/:contestCode/ranking"
          element={<RankingPage />}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('RankingPage visual composition', () => {
  it('uses the shared active header and one responsive horizontal table scroller for all dynamic problems', () => {
    renderPage()

    expect(screen.getByTestId('ranking-trophy-image')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Ranking Demo' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Fecha de inicio:/)).toHaveTextContent(/2036/)
    expect(screen.getByText('Duración: 2 h')).toBeInTheDocument()
    expect(screen.getByText(/Tiempo restante:/)).toBeInTheDocument()
    expect(screen.getByText(/Finaliza:/)).toHaveTextContent(/2036/)

    const tableTitle = screen.getByRole('heading', {
      name: 'Clasificación del concurso',
    })
    expect(tableTitle).toHaveClass('text-2xl', 'sm:text-3xl')
    expect(screen.getByTestId('ranking-table-title-icon')).toHaveClass('size-8')

    const stickyHeaders = [
      screen.getByRole('columnheader', { name: 'Posición' }),
      screen.getByRole('columnheader', { name: 'Participante' }),
      screen.getByRole('columnheader', { name: 'Resueltos y penalización' }),
    ]
    for (const header of stickyHeaders) {
      expect(header).toHaveClass('sticky', 'max-sm:static')
    }

    for (const problem of problems) {
      expect(
        screen.getByRole('columnheader', { name: problem.inciso }),
      ).toBeInTheDocument()
      expect(
        screen.getByTestId(`ranking-problem-globe-${problem.inciso}`),
      ).toHaveAttribute('data-balloon-color', problem.colorGlobo)
    }

    expect(
      screen.getByRole('region', {
        name: 'Tabla de clasificación del concurso',
      }),
    ).toHaveClass('overflow-x-auto')
    expect(screen.getByRole('table')).toHaveClass('min-w-[980px]')
  })

  it('keeps lateral top-card structure, circular icons, and exactly five ordered reference cards', () => {
    renderPage()

    const summaryCards = screen.getAllByTestId('ranking-summary-card')
    expect(summaryCards).toHaveLength(4)
    for (const card of summaryCards) {
      expect(card).toHaveClass('flex', 'items-center')
    }
    const summaryIcons = screen.getAllByTestId('ranking-summary-icon')
    expect(summaryIcons).toHaveLength(4)
    for (const icon of summaryIcons) {
      expect(icon).toHaveClass('rounded-full')
    }

    const durationCard = screen.getByRole('article', { name: 'Duración' })
    expect(within(durationCard).getByText('Duración')).toBeInTheDocument()
    expect(within(durationCard).getByText('2 h')).toBeInTheDocument()
    const durationRange = within(durationCard).getByTestId(
      'ranking-duration-range',
    )
    expect(durationRange).toHaveTextContent(/^\d{2}:\d{2}.* – \d{2}:\d{2}.*$/)
    expect(durationRange).not.toHaveTextContent(/2036|enero|ene/i)

    const cards = screen.getAllByRole('article', {
      name: /^(Problema resuelto|Intentos fallidos|No intentado|Sistema de penalización|Participantes)$/,
    })
    expect(cards.map((card) => card.getAttribute('aria-label'))).toEqual([
      'Problema resuelto',
      'Intentos fallidos',
      'No intentado',
      'Sistema de penalización',
      'Participantes',
    ])
    expect(
      screen.getByRole('article', { name: 'Intentos fallidos' }),
    ).toHaveTextContent('-1 -2 -3 ... = Intentos fallidos')
    expect(
      screen.getByRole('article', { name: 'No intentado' }),
    ).toHaveTextContent('— = No intentado')
    expect(screen.queryByText('Leyenda de celdas')).not.toBeInTheDocument()
    expect(
      screen.getAllByText('Mostrando 1–1 de 1 participantes'),
    ).toHaveLength(1)
  })

  it('uses safe duration card fallbacks for invalid contractual timing data', () => {
    renderPage({
      ...ranking,
      duracionMinutos: Number.NaN,
      fechaInicio: 'invalid',
      fechaFin: 'invalid',
    })

    const durationCard = screen.getByRole('article', { name: 'Duración' })
    expect(within(durationCard).getAllByText('No disponible')).toHaveLength(2)
  })
})
