import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import {
  ContestContextHeader,
  formatContestDuration,
} from './ContestContextHeader'

describe('ContestContextHeader', () => {
  it('formats real durations and safe fallbacks', () => {
    expect(
      formatContestDuration('2026-01-01T00:00:00Z', '2026-01-03T02:15:00Z'),
    ).toBe('2 d 2 h 15 min')
    expect(
      formatContestDuration('2026-01-01T00:00:00Z', '2026-01-01T00:45:00Z'),
    ).toBe('45 min')
    expect(formatContestDuration('invalid', '2026-01-01T00:45:00Z')).toBe('—')
    expect(
      formatContestDuration('2026-01-02T00:00:00Z', '2026-01-01T00:00:00Z'),
    ).toBe('—')
  })

  it('renders contextual navigation without ranking', () => {
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

    expect(
      screen.getByRole('heading', { name: 'Concurso real' }),
    ).toBeInTheDocument()
    expect(screen.getByText('demo')).toBeInTheDocument()
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
