import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AdminLayout } from './AdminLayout'
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
    expect(
      screen.getByText('Use your account to continue.'),
    ).toBeInTheDocument()
    expect(screen.getAllByText('Custom brand')).toHaveLength(2)
    expect(screen.getByText('Illustration slot')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
  })

  it('renders AdminLayout navigation, topbar controls, user, and content', () => {
    render(
      <AdminLayout user="Ada Lovelace">
        <h1>Dashboard content</h1>
      </AdminLayout>,
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Contests')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Notifications' }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Ada Lovelace')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Dashboard content' }),
    ).toBeInTheDocument()
  })
})
