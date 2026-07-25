import { useEffect, useState } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import { AdminSidebar } from '@/components/navigation/AdminSidebar'
import {
  MobileNavigationButton,
  UserMenu,
} from '@/components/navigation/UserMenu'
import { deriveIdentity } from '@/lib/auth/identity'

export function AdminLayout({
  children,
  sidebar,
}: PropsWithChildren<{ sidebar?: ReactNode }>) {
  const identity = deriveIdentity(sessionStorage.getItem('token'))
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  const closeMobileNavigation = () => {
    setMobileOpen(false)
  }

  const navigation = sidebar ?? (
    <AdminSidebar identity={identity} onNavigate={closeMobileNavigation} />
  )

  return (
    <div className="min-h-screen bg-[var(--background)] md:grid md:grid-cols-[16rem_1fr]">
      <aside className="hidden bg-[var(--brand)] text-white md:block">
        {navigation}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Cerrar navegación administrativa"
            className="absolute inset-0 bg-black/40"
            onClick={closeMobileNavigation}
          />
          <aside className="relative h-full w-72 bg-[var(--brand)] text-white shadow-lg">
            {navigation}
          </aside>
        </div>
      )}
      <div className="min-w-0">
        <header className="flex min-h-16 items-center justify-between gap-3 bg-white px-5 shadow-[var(--shadow-sm)]">
          <div className="flex items-center gap-2">
            <span className="md:hidden">
              <MobileNavigationButton
                open={mobileOpen}
                onClick={() => setMobileOpen(true)}
              />
            </span>
            <p className="font-semibold">Panel Administrativo</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                {identity?.name || identity?.email || 'Usuario'}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Administrador
              </p>
            </div>
            <UserMenu identity={identity} />
          </div>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  )
}
