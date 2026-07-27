import { LayoutDashboard, PlusCircle, Trophy, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { BrandMark } from '@/components/common'
import type { Identity } from '@/lib/auth/identity'
import {
  isAdministrator,
  isContestsAdmin,
  isRolesAdmin,
} from '@/lib/auth/identity'
import { cn } from '@/lib/utils/cn'
import { routes } from '@/routes/constants'

type NavigationItem = {
  label: string
  path: string
  icon: typeof Trophy
  visible: (identity?: Identity) => boolean
  keywords: string[]
}
//comentando
export const adminNavigation: NavigationItem[] = [
  {
    label: 'Resumen',
    path: routes.dashboard,
    icon: LayoutDashboard,
    visible: isAdministrator,
    keywords: ['inicio', 'panel'],
  },
  {
    label: 'Concursos',
    path: routes.contests,
    icon: Trophy,
    visible: isContestsAdmin,
    keywords: ['competencias'],
  },
  {
    label: 'Crear concurso',
    path: routes.newContest,
    icon: PlusCircle,
    visible: isContestsAdmin,
    keywords: ['nuevo'],
  },
  {
    label: 'Administración de Roles',
    path: routes.adminRoleList,
    icon: UserRound,
    visible: isRolesAdmin,
    keywords: ['roles', 'usuarios', 'permisos'],
  },
]

export const adminUserAccessNavigation: NavigationItem[] = [
  {
    label: 'Concursos',
    path: routes.adminUserContests,
    icon: UserRound,
    visible: isAdministrator,
    keywords: ['usuario', 'competencias'],
  },
]

export function AdminSidebar({
  identity,
  onNavigate,
  className,
}: {
  identity?: Identity
  onNavigate?: () => void
  className?: string
}) {
  const [query, setQuery] = useState('')
  const location = useLocation()
  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const matches = (item: NavigationItem) =>
      item.visible(identity) &&
      (!normalizedQuery ||
        [item.label, ...item.keywords].some((term) =>
          term.toLocaleLowerCase().includes(normalizedQuery),
        ))
    return {
      administration: adminNavigation.filter(matches),
      userAccess: adminUserAccessNavigation.filter(matches),
    }
  }, [identity, query])

  return (
    <div className={cn('flex h-full flex-col p-5', className)}>
      <BrandMark alt="UPDS Judge" />
      <p className="mt-3 font-semibold">Panel Administrativo</p>
      <label
        className="mt-8 text-sm font-semibold"
        htmlFor="admin-module-search"
      >
        Buscar módulos
      </label>
      <input
        id="admin-module-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar módulo..."
        className="mt-2 w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm placeholder:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      />
      <nav className="mt-5" aria-label="Navegación administrativa">
        {visibleItems.administration.length ||
        visibleItems.userAccess.length ? (
          <div className="space-y-5">
            <ul className="space-y-1">
              {visibleItems.administration.map((item) => {
                const Icon = item.icon
                const active = location.pathname === item.path
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                        active && 'bg-white/20 underline',
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />{' '}
                      {item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
            {visibleItems.userAccess.length > 0 && (
              <section aria-label="Acceso de Usuario">
                <p className="px-3 text-xs font-bold uppercase tracking-wide text-white/70">
                  Acceso de Usuario
                </p>
                <ul className="mt-2 space-y-1">
                  {visibleItems.userAccess.map((item) => {
                    const Icon = item.icon
                    const active = location.pathname === item.path
                    return (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={onNavigate}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                            active && 'bg-white/20 underline',
                          )}
                        >
                          <Icon className="size-4" aria-hidden="true" />{' '}
                          {item.label}
                        </NavLink>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )}
          </div>
        ) : (
          <p role="status" className="text-sm text-white/80">
            No se encontraron módulos.
          </p>
        )}
      </nav>
    </div>
  )
}
