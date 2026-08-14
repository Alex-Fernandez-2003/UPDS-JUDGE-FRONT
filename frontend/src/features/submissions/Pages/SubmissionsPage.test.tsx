import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { getContestDashboardMock, getMySubmissionsMock, createSubmissionMock } =
  vi.hoisted(() => ({
    getContestDashboardMock: vi.fn(),
    getMySubmissionsMock: vi.fn(),
    createSubmissionMock: vi.fn(),
  }))

vi.mock('@/features/problems/service', () => ({
  getContestDashboard: getContestDashboardMock,
}))
vi.mock('../Types/submissionsService', () => ({
  submissionsService: {
    getMySubmissions: getMySubmissionsMock,
    createSubmission: createSubmissionMock,
  },
}))

import { ContestSubmissionsContent } from './SubmissionsPage'

const dashboard = {
  codigo: 'upds-div4-010',
  nombre: 'Coders Team UPDS Marathon',
  estadoTiempo: 'Finalizado',
  fechaFin: '2036-01-01T10:00:00Z',
  totalProblemas: 2,
  problemas: [
    { inciso: 'A', titulo: 'Cadena Alternante' },
    { inciso: 'B', titulo: 'Matriz dispersa' },
  ],
}

const renderPage = () =>
  render(
    <MemoryRouter
      initialEntries={['/student/contests/upds-div4-010/submissions']}
    >
      <ContestSubmissionsContent
        contestCode="upds-div4-010"
        navigationItems={[
          {
            id: 'submissions',
            label: 'Mis envíos',
            to: '/student/contests/upds-div4-010/submissions',
          },
        ]}
      />
    </MemoryRouter>,
  )

describe('ContestSubmissionsContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getContestDashboardMock.mockResolvedValue(dashboard)
    getMySubmissionsMock.mockResolvedValue({
      datos: [],
      total: 0,
      pagina: 1,
      tamanoPagina: 5,
    })
    createSubmissionMock.mockResolvedValue(undefined)
  })

  it('shows only the history card and exposes one modal trigger after refresh', async () => {
    renderPage()

    expect(
      await screen.findByRole('heading', { name: dashboard.nombre }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'FECHA' }),
    ).toBeInTheDocument()
    expect(screen.queryByTestId('submit-form')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', { name: 'Código fuente' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Seleccionar archivo fuente'),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('tab')).not.toBeInTheDocument()

    const refresh = screen.getByRole('button', { name: 'Actualizar' })
    const submit = screen.getByRole('button', { name: 'Enviar solución' })
    expect(
      refresh.compareDocumentPosition(submit) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(
      screen.getAllByRole('button', { name: 'Enviar solución' }),
    ).toHaveLength(1)
  })

  it('opens one modal and, after one POST, refreshes exactly once with filter and page preserved', async () => {
    const user = userEvent.setup()
    getMySubmissionsMock.mockResolvedValue({
      datos: [],
      total: 6,
      pagina: 1,
      tamanoPagina: 5,
    })
    renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await waitFor(() => expect(getMySubmissionsMock).toHaveBeenCalledTimes(1))

    await user.selectOptions(screen.getByRole('combobox'), 'A')
    await waitFor(() =>
      expect(getMySubmissionsMock).toHaveBeenLastCalledWith(
        'upds-div4-010',
        expect.objectContaining({ pagina: 1, inciso: 'A' }),
      ),
    )
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    await waitFor(() =>
      expect(getMySubmissionsMock).toHaveBeenLastCalledWith(
        'upds-div4-010',
        expect.objectContaining({ pagina: 2, inciso: 'A' }),
      ),
    )
    const historyCallsBeforeSubmit = getMySubmissionsMock.mock.calls.length

    await user.click(screen.getByRole('button', { name: 'Enviar solución' }))
    const dialog = screen.getByRole('dialog', { name: 'Enviar solución' })
    expect(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
    ).toHaveValue('A')
    fireEvent.change(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
      { target: { value: 'int main() { return 0; }' } },
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Enviar solución' }),
    )

    await waitFor(() => expect(createSubmissionMock).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    )
    expect(getMySubmissionsMock).toHaveBeenCalledTimes(
      historyCallsBeforeSubmit + 1,
    )
    expect(getMySubmissionsMock).toHaveBeenLastCalledWith('upds-div4-010', {
      pagina: 2,
      tamanoPagina: 5,
      inciso: 'A',
    })
  })

  it('keeps the modal and work open when the existing POST rejects', async () => {
    const user = userEvent.setup()
    createSubmissionMock.mockRejectedValue(
      new Error('Submission rejected by backend.'),
    )
    renderPage()
    await screen.findByRole('heading', { name: dashboard.nombre })
    await user.click(screen.getByRole('button', { name: 'Enviar solución' }))
    const dialog = screen.getByRole('dialog', { name: 'Enviar solución' })
    await user.selectOptions(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
      'B',
    )
    fireEvent.change(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
      { target: { value: 'preserve me' } },
    )
    await user.click(
      within(dialog).getByRole('button', { name: 'Enviar solución' }),
    )

    expect(
      await within(dialog).findByText('Submission rejected by backend.'),
    ).toBeInTheDocument()
    expect(
      within(dialog).getByRole('textbox', { name: 'Código fuente' }),
    ).toHaveValue('preserve me')
    expect(
      within(dialog).getByRole('combobox', { name: 'Problema' }),
    ).toHaveValue('B')
    expect(getMySubmissionsMock).toHaveBeenCalledTimes(1)
  })

  it('preserves the history error state', async () => {
    getMySubmissionsMock.mockRejectedValue(new Error('History unavailable.'))
    renderPage()
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'History unavailable.',
    )
  })

  it('preserves caller-provided navigation for user/admin contextual wrappers', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/admin/user-access/contests/upds-div4-010/submissions',
        ]}
      >
        <ContestSubmissionsContent
          contestCode="upds-div4-010"
          navigationItems={[
            {
              id: 'submissions',
              label: 'Mis envíos',
              to: '/admin/user-access/contests/upds-div4-010/submissions',
            },
          ]}
        />
      </MemoryRouter>,
    )
    expect(
      await screen.findByRole('link', { name: 'Mis envíos' }),
    ).toHaveAttribute(
      'href',
      '/admin/user-access/contests/upds-div4-010/submissions',
    )
  })
})
