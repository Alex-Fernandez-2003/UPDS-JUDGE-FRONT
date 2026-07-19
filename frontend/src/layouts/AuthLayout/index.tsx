import type { PropsWithChildren, ReactNode } from 'react'
import { BrandMark } from '@/components/common'
export function AuthLayout({
  title,
  description,
  branding,
  illustration,
  children,
}: PropsWithChildren<{
  title: string
  description?: string
  branding?: ReactNode
  illustration?: ReactNode
}>) {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="hidden bg-[var(--brand)] p-10 text-white md:block">
        {branding ?? <BrandMark />}
        {illustration}
      </section>
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden">{branding ?? <BrandMark />}</div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="mt-2 text-[var(--text-secondary)]">{description}</p>
          )}
          <div className="mt-6">{children}</div>
        </div>
      </section>
    </main>
  )
}
