import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ADMIN_CONTEST_FILTERS } from './constants'
import { ContestsSummaryCards } from './components/ContestsSummaryCards'
import { concursosKeys } from './hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
)

describe('administrative contests contract', () => {
  it('keeps labels separate from the plural backend filter values', () => {
    expect(ADMIN_CONTEST_FILTERS).toEqual([
      { label: 'Todos', value: 'todos' },
      { label: 'Activos', value: 'activos' },
      { label: 'Pendientes', value: 'proximos' },
      { label: 'Finalizados', value: 'finalizados' },
    ])
  })

  it('uses an independent stable query key for the summary', () => {
    expect(concursosKeys.adminSummary()).toEqual(['concursos', 'admin-summary'])
    expect(
      concursosKeys.adminList({
        filtro: 'activos',
        pagina: 2,
        tamanoPagina: 10,
      }),
    ).not.toEqual(concursosKeys.adminSummary())
  })

  it('renders Pendientes from proximos without deriving values from a list', () => {
    render(
      <ContestsSummaryCards
        resumen={{ activos: 2, proximos: 4, finalizados: 1 }}
      />,
      { wrapper },
    )

    expect(screen.getByText('Pendientes')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
