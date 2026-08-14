import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  ContestContextHeader,
  formatContestDuration,
} from './ContestContextHeader'

describe('ContestContextHeader', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('formats real durations and safe fallbacks', () => {
    expect(
      formatContestDuration('2026-01-01T00:00:00Z', '2026-01-03T02:15:00Z'),
    ).toBe('2 d 2 h 15 min')
    expect(
      formatContestDuration('2026-01-01T00:00:00Z', '2026-01-01T00:45:00Z'),
    ).toBe('45 min')
    expect(formatContestDuration('invalid', '2026-01-01T00:45:00Z')).toBe(
      'No disponible',
    )
    expect(
      formatContestDuration('2026-01-02T00:00:00Z', '2026-01-01T00:00:00Z'),
    ).toBe('No disponible')
    expect(formatContestDuration(undefined, undefined, 0)).toBe('No disponible')
    expect(formatContestDuration(undefined, undefined, -15)).toBe(
      'No disponible',
    )
    expect(formatContestDuration(undefined, undefined, Number.NaN)).toBe(
      'No disponible',
    )
  })

  it('uses the canonical trophy and derives all active temporal presentation from contest data', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T09:00:00Z'))

    render(
      <MemoryRouter>
        <ContestContextHeader
          contest={{
            code: 'demo',
            name: 'Concurso Demo',
            status: 'Activo',
            startsAt: '2026-01-01T08:00:00Z',
            endsAt: '2026-01-01T10:00:00Z',
          }}
          activeSection="ranking"
          navigationItems={[]}
          durationMinutes={90}
        />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('ranking-trophy-image')).toHaveAttribute(
      'src',
      expect.stringContaining('ranking-trophy.png'),
    )
    expect(
      screen.getByRole('heading', { name: 'Concurso Demo' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Fecha de inicio:/)).toHaveTextContent(/2026/)
    expect(screen.getByText('Duración: 1 h 30 min')).toBeInTheDocument()
    expect(screen.getByText('Tiempo restante: 01:00:00')).toBeInTheDocument()
    expect(screen.getByText(/Finaliza:/)).toHaveTextContent(/2026/)
    expect(
      screen.queryByTestId('contest-trophy-fallback'),
    ).not.toBeInTheDocument()
  })

  it('labels a valid end date when no start exists and exposes safe missing fallbacks', () => {
    const view = render(
      <MemoryRouter>
        <ContestContextHeader
          contest={{
            code: 'problems',
            name: 'Problemas',
            status: 'Finalizado',
            endsAt: '2026-01-01T10:00:00Z',
          }}
          activeSection="problems"
          navigationItems={[]}
        />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Fecha de finalización:/)).toHaveTextContent(/2026/)
    expect(screen.getByText('Duración: No disponible')).toBeInTheDocument()
    expect(screen.queryByText(/Tiempo restante:/)).not.toBeInTheDocument()
    expect(screen.getByText(/Finaliza:/)).toHaveTextContent(/2026/)

    view.rerender(
      <MemoryRouter>
        <ContestContextHeader
          contest={{
            code: 'invalid',
            name: 'Sin fechas',
            status: 'Próximo',
            startsAt: 'invalid',
            endsAt: null,
          }}
          activeSection="problems"
          navigationItems={[]}
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Fecha: No disponible')).toBeInTheDocument()
    expect(screen.getByText('Duración: No disponible')).toBeInTheDocument()
    expect(screen.getByText('Finaliza: No disponible')).toBeInTheDocument()
  })

  it('renders contextual navigation without inventing sections', () => {
    render(
      <MemoryRouter initialEntries={['/student/contests/demo/problems']}>
        <ContestContextHeader
          contest={{
            code: 'demo',
            name: 'Concurso real',
            status: 'Activo',
            startsAt: '2026-01-01T00:00:00Z',
            endsAt: '2026-01-01T02:00:00Z',
          }}
          activeSection="problems"
          navigationItems={[
            {
              id: 'problems',
              label: 'Problemas',
              to: '/student/contests/demo/problems',
            },
            {
              id: 'submissions',
              label: 'Mis envíos',
              to: '/student/contests/demo/submissions',
            },
          ]}
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('EN CURSO')).toBeInTheDocument()
    expect(screen.getByText('Duración: 2 h')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Problemas' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Mis envíos' })).toHaveAttribute(
      'href',
      '/student/contests/demo/submissions',
    )
    expect(screen.queryByText('Ranking')).not.toBeInTheDocument()
  })
})
