import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { CreateContestPage } from './CreateContestPage'

const renderPage = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter>
        <CreateContestPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )

describe('CreateContestPage', () => {
  it('renders the single-screen form, safe summary, and derived public modality', () => {
    renderPage()

    expect(
      screen.getByRole('heading', { name: 'Crear concurso' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Resumen' })).toBeInTheDocument()
    expect(screen.getByText('Público')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Crear concurso' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancelar' })).toBeInTheDocument()
  })

  it('adds and reindexes problems through accessible controls', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: 'Agregar problema' }))
    expect(
      screen.getByRole('heading', { name: 'Problema B' }),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Eliminar problema A' }),
    )
    expect(
      screen.getByRole('heading', { name: 'Problema A' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Problema B' }),
    ).not.toBeInTheDocument()
  })
})
