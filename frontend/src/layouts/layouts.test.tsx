import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AdminLayout } from './AdminLayout'
import { UserLayout } from './UserLayout'
import { AuthLayout } from './AuthLayout'

describe('foundation layouts', () => {
  it('renders AuthLayout title, description, branding, illustration, and content slots', () => {
    render(
      <AuthLayout
        title="Welcome"
        description="Use your account to continue."
        branding={<span>Custom brand</span>}
        illustration={<span>Illustration slot</span>}
      >
        <button type="button">Continue</button>
      </AuthLayout>,
    )
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument()
    expect(screen.getAllByText('Custom brand')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
  })

  it('keeps user navigation next to the logo with accessible larger links', () => {
    sessionStorage.setItem(
      'token',
      'header.eyJuYW1lIjoiQWRhIiwicm9sZSI6IlVzdWFyaW8ifQ.signature',
    )
    render(
      <MemoryRouter initialEntries={['/student/concursos']}>
        <UserLayout>
          <h1>User content</h1>
        </UserLayout>
      </MemoryRouter>,
    )
    const navigation = screen.getByRole('navigation', {
      name: 'Navegación de usuario',
    })
    expect(
      screen.getByAltText('UPDS Judge').parentElement?.parentElement,
    ).toContainElement(navigation)
    const contests = screen.getByRole('link', { name: 'Concursos' })
    expect(contests).toHaveClass('min-h-10', 'px-4', 'focus-visible:outline-2')
    expect(contests).toHaveAttribute('aria-current', 'page')
    expect(contests).toHaveClass('transition-colors')
    sessionStorage.removeItem('token')
  })

  it('renders the administrative shell and accessible module search', () => {
    sessionStorage.setItem(
      'token',
      'header.eyJuYW1lIjoiQWRhIiwicm9sZSI6IkFkbWluaXN0cmFkb3JDb25jdXJzb3MifQ.signature',
    )
    render(
      <MemoryRouter>
        <AdminLayout>
          <h1>Dashboard content</h1>
        </AdminLayout>
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('navigation', { name: 'Navegación administrativa' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Buscar módulos')).toBeInTheDocument()
    expect(screen.getByText('Crear concurso')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Abrir menú de usuario' }),
    ).toBeInTheDocument()
    sessionStorage.removeItem('token')
  })
})
