import type { PropsWithChildren } from 'react'
import { NavLink, useLocation } from 'react-router'
import { AppLogo } from '@/components/branding/AppLogo'
import { UserMenu } from '@/components/navigation/UserMenu'
import { deriveIdentity } from '@/lib/auth/identity'
import { cn } from '@/lib/utils/cn'
import { routes } from '@/routes/constants'

const userNavigation = [
  { label: 'Inicio', path: routes.studentHome },
  { label: 'Concursos', path: routes.studentListCompetitions },
  { label: 'Mis envíos', path: routes.userHistory },
]

export function UserLayout({ children }: PropsWithChildren) {
  const identity = deriveIdentity(sessionStorage.getItem('token'))
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <AppLogo alt="UPDS Judge" variant="default" />
          <nav
            aria-label="Navegación de usuario"
            className="min-w-0 overflow-x-auto"
          >
            <ul className="flex items-center gap-2 whitespace-nowrap">
              {userNavigation.map((item) => {
                const active = location.pathname === item.path
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[var(--focus)]',
                        active
                          ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                      )}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="flex min-w-0 items-center gap-3">
            <div className="hidden min-w-0 text-right sm:block">
              <p className="truncate text-sm font-semibold">
                {identity?.name || identity?.email || 'Usuario'}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">Usuario</p>
            </div>
            <UserMenu identity={identity} />
          </div>
        </div>
      </header>
      <main className="w-full min-w-0 flex-1 p-5">{children}</main>
    </div>
  )
}
