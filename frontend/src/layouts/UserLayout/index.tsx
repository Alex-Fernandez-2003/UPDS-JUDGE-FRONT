import type { PropsWithChildren } from 'react'
import { Files, House, Trophy } from 'lucide-react'
import { NavLink, useLocation } from 'react-router'
import { AppLogo } from '@/components/branding/AppLogo'
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
    icon: Files,
    iconTestId: 'nav-icon-submissions',
  },
]

export function UserLayout({ children }: PropsWithChildren) {
  const identity = deriveIdentity(sessionStorage.getItem('token'))
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center gap-4 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <AppLogo alt="UPDS Judge" variant="default" />
            <nav
              aria-label="Navegación de usuario"
              className="min-w-0 overflow-x-auto"
            >
              <ul className="flex items-center gap-2 whitespace-nowrap">
                {userNavigation.map((item) => {
                  const active = location.pathname === item.path
                  const Icon = item.icon
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[var(--focus)]',
                          active
                            ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                        )}
                      >
                        <Icon
                          className="size-4"
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
          </div>
          <div className="ml-auto flex min-w-0 items-center gap-3">
            <UserMenu identity={identity} />
          </div>
        </div>
      </header>
      <main className="w-full min-w-0 flex-1 p-5">{children}</main>
    </div>
  )
}
