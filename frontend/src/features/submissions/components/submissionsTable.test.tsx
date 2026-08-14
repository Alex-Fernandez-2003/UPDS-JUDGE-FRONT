import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { SubmissionItem } from '../Types/submissionTypes'
import { SubmissionsTable } from './submissionsTable'

const submission: SubmissionItem = {
  idEnvio: 7,
  concursoCodigo: 'demo',
  problemaTitulo: 'Cadena Alternante',
  inciso: 'A',
  lenguaje: 'C++ 17',
  veredicto: 'Accepted',
  consumoTiempo: 16,
  consumoMemoria: 3240,
  fechaEnvio: '2030-01-02T03:04:00Z',
}

const props = {
  submissions: [submission],
  total: 6,
  currentPage: 1,
  totalPages: 2,
  selectedProblem: '',
  problemCount: 2,
  onProblemChange: vi.fn(),
  onPageChange: vi.fn(),
  onRefresh: vi.fn(),
  onSubmitSolution: vi.fn(),
}

describe('SubmissionsTable', () => {
  it('preserves columns, verdict, measurements, filtering, refreshing, and pagination', async () => {
    const user = userEvent.setup()
    render(<SubmissionsTable {...props} />)

    for (const heading of [
      'FECHA',
      'PROBLEMA',
      'LENGUAJE',
      'VEREDICTO',
      'TIEMPO',
      'MEMORIA',
    ])
      expect(
        screen.getByRole('columnheader', { name: heading }),
      ).toBeInTheDocument()
    expect(screen.getByText('A - Cadena Alternante')).toBeInTheDocument()
    expect(screen.getByText('ACCEPTED')).toBeInTheDocument()
    expect(screen.getByText('16 ms')).toBeInTheDocument()
    expect(screen.getByText('3240 KB')).toBeInTheDocument()

    await user.selectOptions(screen.getByRole('combobox'), 'A')
    expect(props.onProblemChange).toHaveBeenCalledWith('A')
    await user.click(screen.getByRole('button', { name: 'Actualizar' }))
    expect(props.onRefresh).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(props.onPageChange).toHaveBeenCalledWith(2)
  })

  it('keeps toolbar order and empty/loading regressions', () => {
    const { rerender } = render(
      <SubmissionsTable {...props} submissions={[]} total={0} />,
    )
    const filter = screen.getByRole('combobox')
    const refresh = screen.getByRole('button', { name: 'Actualizar' })
    const submit = screen.getByRole('button', { name: 'Enviar solución' })
    expect(
      filter.compareDocumentPosition(refresh) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      refresh.compareDocumentPosition(submit) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      screen.getByText('No tienes envíos registrados.'),
    ).toBeInTheDocument()

    rerender(<SubmissionsTable {...props} submissions={[]} loading />)
    expect(screen.getByRole('button', { name: 'Actualizar' })).toBeDisabled()
  })
})
