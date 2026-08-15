import type { PropsWithChildren } from 'react'
import { Send, House } from 'lucide-react'
import Trophy from '@/assets/trophy-svg.svg?react'
import { NavLink, useLocation } from 'react-router'
import logoHorizontal from '@/assets/logo-horizontal.svg'
import { UserMenu } from '@/components/navigation/UserMenu'
import { deriveIdentity } from '@/lib/auth/identity'
import { cn } from '@/lib/utils/cn'
import { routes } from '@/routes/constants'

const userNavigation = [
  {
    label: 'Inicio',
    path: routes.studentHome,
    icon: House,
    iconTestId: 'nav-icon-home',
  },
  {
    label: 'Concursos',
    path: routes.studentListCompetitions,
    icon: Trophy,
    iconTestId: 'nav-icon-contests',
  },
  {
    label: 'Mis envíos',
    path: routes.userHistory,
    icon: Send,
    iconTestId: 'nav-icon-submissions',
  },
]

export function UserLayout({ children }: PropsWithChildren) {
  const identity = deriveIdentity(sessionStorage.getItem('token'))
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-white">
        <div
          data-testid="user-navbar-container"
          className="flex min-h-20 w-full items-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-7"
        >
          <div
            data-testid="user-navbar-branding"
            className="flex shrink-0 items-center"
          >
            <img
              src={logoHorizontal}
              alt="UPDS Judge"
              className="h-auto w-36 object-contain sm:w-44 lg:w-48"
            />
          </div>
          <nav
            aria-label="Navegación de usuario"
            className="min-w-0 overflow-x-auto"
          >
            <ul className="flex items-center gap-2 whitespace-nowrap">
              {userNavigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={cn(
                        'inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]',
                        location.pathname === item.path
                          ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                      )}
                    >
                      <Icon
                        className="size-4 shrink-0"
                        data-testid={item.iconTestId}
                        aria-hidden="true"
                      />
                      {item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div
            data-testid="user-navbar-account"
            className="ml-auto flex shrink-0 items-center"
          >
            <UserMenu identity={identity} />
          </div>
        </div>
      </header>
      <main className="w-full min-w-0 flex-1 p-5">{children}</main>
    </div>
  )
}