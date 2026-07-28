import { LogOut, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Avatar, IconButton } from '@/components/common'
import type { Identity } from '@/lib/auth/identity'
import { roleDescription } from '@/lib/auth/identity'
import { clearSession } from '@/lib/auth/session'
import { cn } from '@/lib/utils/cn'

export function UserMenu({
  identity,
  className,
}: {
  identity?: Identity
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const name = identity?.name || identity?.email || 'Usuario'

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  const logout = () => {
    clearSession()
    setOpen(false)
    navigate('/login', { replace: true })
  }

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Abrir menú de usuario"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex cursor-pointer items-center gap-2 rounded-md p-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
      >
        <Avatar name={name} />
        <span className="hidden max-w-40 truncate text-sm font-semibold sm:block">
          {name}
        </span>
        <Menu className="size-4" aria-hidden="true" />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Menú de usuario"
          className="absolute right-0 z-30 mt-2 w-64 rounded-md border border-[var(--border)] bg-white p-3 shadow-[var(--shadow-md)]"
        >
          <div className="mb-3 border-b border-[var(--border)] pb-3">
            <p className="truncate font-semibold">{name}</p>
            {identity?.email && (
              <p className="truncate text-sm text-[var(--text-secondary)]">
                {identity.email}
              </p>
            )}
            <p className="text-sm text-[var(--text-secondary)]">
              {roleDescription(identity)}
            </p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={logout}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-semibold text-[var(--danger)] hover:bg-[var(--surface-muted)] focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
          >
            <LogOut className="size-4" aria-hidden="true" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export function MobileNavigationButton({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) {
  return (
    <IconButton
      label={
        open
          ? 'Cerrar navegación administrativa'
          : 'Abrir navegación administrativa'
      }
      onClick={onClick}
    >
      {open ? <X className="size-5" /> : <Menu className="size-5" />}
    </IconButton>
  )
}
