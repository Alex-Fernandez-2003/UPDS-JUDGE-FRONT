import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AdminSidebar } from './AdminSidebar'

const admin = { roles: ['AdministradorConcursos'] }
const rolesAdmin = { roles: ['AdministradorRoles'] }
const user = { roles: ['Usuario'] }

describe('AdminSidebar', () => {
  it('shows the roles administration entry for roles admins', () => {
    render(
      <MemoryRouter>
        <AdminSidebar identity={rolesAdmin} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: /asignar roles/i }),
    ).toHaveAttribute('href', '/admin/roles')
  })

  it('shows the user-access contests group only to administrators', () => {
    const { rerender } = render(
      <MemoryRouter>
        <AdminSidebar identity={admin} />
      </MemoryRouter>,
    )
    const userAccess = screen.getByRole('region', { name: 'Acceso de Usuario' })
    expect(userAccess).toBeInTheDocument()
    expect(userAccess.querySelector('a')).toHaveTextContent('Concursos')
    expect(userAccess.querySelector('a')).toHaveAttribute(
      'href',
      '/admin/user-access/contests',
    )

    rerender(
      <MemoryRouter>
        <AdminSidebar identity={user} />
      </MemoryRouter>,
    )
    expect(
      screen.queryByRole('region', { name: 'Acceso de Usuario' }),
    ).not.toBeInTheDocument()
  })
})
