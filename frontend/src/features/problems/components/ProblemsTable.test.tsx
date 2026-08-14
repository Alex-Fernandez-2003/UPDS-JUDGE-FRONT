import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { ProblemsTable } from './ProblemsTable'

const problems = [
  {
    inciso: 'A',
    titulo: 'Sum',
    tiempo: 1,
    memoria: 256,
    intentos: 1,
    estado: 'Accepted',
    resuelto: true,
  },
  {
    inciso: 'B',
    titulo: 'Sort',
    tiempo: 2,
    memoria: 256,
    intentos: 3,
    estado: 'Wrong Answer',
    resuelto: false,
  },
  {
    inciso: 'C',
    titulo: 'Graph',
    tiempo: 1,
    memoria: 256,
    intentos: 0,
    estado: 'Sin intentar',
    resuelto: false,
  },
]

describe('ProblemsTable', () => {
  it('renders the real dashboard status contract through verdict-style badges', () => {
    render(
      <MemoryRouter>
        <ProblemsTable problems={problems} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('columnheader', { name: 'ESTADO' }),
    ).toBeInTheDocument()
    const headerIcon = screen.getByTestId('problems-header-icon')
    expect(headerIcon).toHaveClass('text-blue-700')
    expect(headerIcon.tagName).toBe('SPAN')
    expect(headerIcon).toHaveAttribute('aria-hidden', 'true')
    expect(headerIcon.closest('span')?.querySelector('p')).toBeNull()
    expect(screen.getByText('ACCEPTED')).toHaveClass('bg-green-100')
    expect(screen.getByText('ACCEPTED')).toHaveClass('rounded-full')
    expect(screen.getByText('UNSOLVED')).toHaveClass('bg-red-100')
    expect(screen.getByText('NOT ATTEMPTED')).toHaveClass('bg-slate-100')
    expect(screen.queryByText('UNKNOWN')).not.toBeInTheDocument()
    const tagChips = screen.getAllByTestId('problem-tag-chip')
    expect(tagChips).toHaveLength(3)
    expect(tagChips[0]).toHaveTextContent('A')
    expect(tagChips[0]).toHaveClass(
      'rounded-md',
      'bg-indigo-50',
      'px-2',
      'py-1',
      'text-indigo-700',
    )
    expect(screen.getAllByText('1')).not.toHaveLength(0)
    expect(screen.getAllByText('3')).not.toHaveLength(0)
    expect(screen.getAllByText('0')).not.toHaveLength(0)

    expect(screen.getByRole('table')).toHaveClass('border-separate')
    for (const row of screen.getAllByRole('row').slice(1)) {
      for (const cell of within(row).getAllByRole('cell')) {
        expect(cell).toHaveClass('font-bold')
      }
    }
  })
})
