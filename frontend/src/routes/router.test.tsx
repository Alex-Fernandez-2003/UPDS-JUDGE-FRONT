import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { RouterProvider } from 'react-router/dom'
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
    sessionStorage.setItem(
      'token',
      'header.eyJyb2xlIjoiQWRtaW5pc3RyYWRvckNvbmN1cnNvcyJ9.signature',
    )
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
    expect(screen.getAllByText('Panel Administrativo')).toHaveLength(2)
    expect(screen.getByText('Nuevo concurso')).toBeInTheDocument()
    sessionStorage.removeItem('token')
  })

  it('renders the user dashboard at the canonical protected student route', async () => {
    sessionStorage.setItem(
      'token',
      'header.eyJuYW1lIjoiQWRhIiwicm9sZSI6IlVzdWFyaW8ifQ.signature',
    )
    const router = createAppRouter(false)
    await router.navigate('/student/concursos')
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Bienvenido de nuevo, Ada' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('navigation', { name: 'Navegación de usuario' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Abrir menú de usuario' }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Ranking global')).not.toBeInTheDocument()
    expect(screen.queryByText('Puntos totales')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Siguiente entrenamiento'),
    ).not.toBeInTheDocument()
    expect(screen.queryByText('Clasificación global')).not.toBeInTheDocument()
    sessionStorage.removeItem('token')
  })

  it('redirects unauthenticated canonical student requests to login', async () => {
    const router = createAppRouter(false)
    await router.navigate('/student/concursos')
    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', { name: 'Iniciar sesión' }),
    ).toBeInTheDocument()
  })

  it('redirects an authenticated Usuario from login to the dashboard', async () => {
    sessionStorage.setItem(
      'token',
      'header.eyJuYW1lIjoiQWRhIiwicm9sZSI6IlVzdWFyaW8ifQ.signature',
    )
    const router = createAppRouter(false)
    await router.navigate('/login')
    render(
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: 'Bienvenido de nuevo, Ada' }),
    ).toBeInTheDocument()
    sessionStorage.removeItem('token')
  })

  it('does not render the user area for an administrator without Usuario', async () => {
    sessionStorage.setItem(
      'token',
      'header.eyJuYW1lIjoiQWRhIiwicm9sZSI6IkFkbWluaXN0cmFkb3JDb25jdXJzb3MifQ.signature',
    )
    const router = createAppRouter(false)
    await router.navigate('/student/concursos')
    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', { name: 'Acceso denegado' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /Bienvenido de nuevo/ }),
    ).not.toBeInTheDocument()
    sessionStorage.removeItem('token')
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
