import { Bell } from 'lucide-react'
import type { PropsWithChildren, ReactNode } from 'react'
import { Avatar, BrandMark, IconButton } from '@/components/common'
const navigation = [
  'Overview',
  'Contests',
  'Problem bank',
  'Users and roles',
  'Languages',
  'Audit',
  'Settings',
]
export function AdminLayout({
  children,
  user = 'Sample administrator',
  sidebar,
}: PropsWithChildren<{ user?: string; sidebar?: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[var(--background)] md:grid md:grid-cols-[16rem_1fr]">
      <aside className="bg-[var(--brand)] p-5 text-white">
        {sidebar ?? (
          <>
            <BrandMark />
            <nav className="mt-8">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </aside>
      <div>
        <header className="flex h-16 items-center justify-end gap-3 bg-white px-5 shadow-[var(--shadow-sm)]">
          <IconButton label="Notifications">
            <Bell className="size-4" />
          </IconButton>
          <Avatar name={user} />
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  )
}
