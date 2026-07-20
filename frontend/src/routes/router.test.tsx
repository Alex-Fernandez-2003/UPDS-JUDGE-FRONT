import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { createAppRouter } from './router'

describe('application routes', () => {
  it('renders the 404 page for unknown routes', async () => {
    const router = createAppRouter(false)
    await router.navigate('/missing')
    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', { name: '404' }),
    ).toBeInTheDocument()
  })

  it('renders the contest creation page inside the existing admin layout', async () => {
    const router = createAppRouter(false)
    await router.navigate('/admin/contests/new')
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Crear concurso' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Nuevo concurso')).toBeInTheDocument()
  })

  it('registers /dev/ui only in development', async () => {
    const developmentRouter = createAppRouter(true)
    await developmentRouter.navigate('/dev/ui')
    render(<RouterProvider router={developmentRouter} />)
    expect(
      await screen.findByRole('heading', { name: 'Foundation catalog' }),
    ).toBeInTheDocument()

    const productionRouter = createAppRouter(false)
    await productionRouter.navigate('/dev/ui')
    render(<RouterProvider router={productionRouter} />)
    expect(await screen.findAllByRole('heading', { name: '404' })).toHaveLength(
      1,
    )
  })
})
