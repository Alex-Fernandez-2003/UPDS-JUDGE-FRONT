import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AdminSidebar } from './AdminSidebar'

const admin = { roles: ['AdministradorConcursos'] }
const user = { roles: ['Usuario'] }
const rolesAdmin = { roles: ['AdministradorRoles'] }
//comentando
describe('AdminSidebar', () => {
  it('shows the user-access contests group only to administrators', () => {
    const { rerender } = render(
      <MemoryRouter>
        <AdminSidebar identity={admin} />
      </MemoryRouter>,
    )
    const userAccess = screen.getByRole('region', { name: 'Acceso de Usuario' })
    expect(userAccess).toBeInTheDocument()
    const contestsLink = userAccess.querySelector(
      'a[href="/admin/user-access/contests"]',
    )
    const submissionsLink = userAccess.querySelector(
      'a[href="/admin/user-access/submissions"]',
    )
    expect(contestsLink).toHaveTextContent('Concursos')
    expect(submissionsLink).toHaveTextContent('Mis Envíos')

    rerender(
      <MemoryRouter>
        <AdminSidebar identity={user} />
      </MemoryRouter>,
    )
    expect(
      screen.queryByRole('region', { name: 'Acceso de Usuario' }),
    ).not.toBeInTheDocument()
  })

  it('shows role administration only to AdministradorRoles', () => {
    const { rerender } = render(
      <MemoryRouter>
        <AdminSidebar identity={rolesAdmin} />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('link', { name: 'Administración de Roles' }),
    ).toHaveAttribute('href', '/admin/roles')

    rerender(
      <MemoryRouter>
        <AdminSidebar identity={admin} />
      </MemoryRouter>,
    )
    expect(
      screen.queryByRole('link', { name: 'Administración de Roles' }),
    ).not.toBeInTheDocument()
  })
})
