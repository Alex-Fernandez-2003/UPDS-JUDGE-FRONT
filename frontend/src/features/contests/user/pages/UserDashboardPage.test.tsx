import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('./UserContestsPage', () => ({
  default: () => <section data-testid="contests">Concursos</section>,
}))
vi.mock('../RecentSubmissionsSection', () => ({
  RecentSubmissionsSection: () => (
    <section data-testid="submissions">Envíos recientes</section>
  ),
}))
vi.mock('../UserContestStatsSection', () => ({
  UserContestStatsSection: () => (
    <section data-testid="stats">Tu actividad</section>
  ),
}))

import UserDashboardPage from './UserDashboardPage'

describe('UserDashboardPage', () => {
  it('welcomes the normalized user name and renders dashboard sections in responsive DOM order', () => {
    render(<UserDashboardPage name=" Ada " />)

    expect(
      screen.getByRole('heading', { name: 'Bienvenido de nuevo, Ada' }),
    ).toBeInTheDocument()

    const contests = screen.getByTestId('contests')
    const stats = screen.getByTestId('stats')
    const submissions = screen.getByTestId('submissions')
    expect(contests.compareDocumentPosition(stats)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(submissions.compareDocumentPosition(stats)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
    expect(
      screen.getByRole('complementary', { name: 'Estadísticas del usuario' }),
    ).toContainElement(stats)
  })

  it('uses the fallback welcome when the name is absent', () => {
    render(<UserDashboardPage />)

    expect(
      screen.getByRole('heading', { name: 'Bienvenido de nuevo' }),
    ).toBeInTheDocument()
  })

  it('does not access session or JWT reference material in the page', () => {
    expect(UserDashboardPage.toString()).not.toMatch(/sessionStorage|jwt/i)
  })
})
