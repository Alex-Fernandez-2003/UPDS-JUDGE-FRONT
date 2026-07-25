import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { HTMLAttributes } from 'react'
import { IconButton } from '@/components/common'
import { cn } from '@/lib/utils/cn'
export function Breadcrumbs({
  items,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  items: { label: string; to?: string }[]
}) {
  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex gap-2 text-sm">
        {items.map((item, index) => (
          <li key={item.label}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
            {index < items.length - 1 && ' /'}
          </li>
        ))}
      </ol>
    </nav>
  )
}
export function Stepper({
  steps,
  activeIndex,
  className,
  ...props
}: HTMLAttributes<HTMLOListElement> & {
  steps: string[]
  activeIndex: number
}) {
  return (
    <ol className={cn('flex flex-wrap gap-3', className)} {...props}>
      {steps.map((step, index) => (
        <li
          key={step}
          aria-current={index === activeIndex ? 'step' : undefined}
          className={
            index === activeIndex
              ? 'font-semibold text-[var(--primary)]'
              : 'text-[var(--text-secondary)]'
          }
        >
          {index + 1}. {step}
        </li>
      ))}
    </ol>
  )
}
export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  ...props
}: HTMLAttributes<HTMLElement> & {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const safePage = Math.max(1, Math.min(page, totalPages || 1))
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      <IconButton
        label="Previous page"
        disabled={safePage <= 1}
        onClick={() => onPageChange(safePage - 1)}
      >
        <ChevronLeft className="size-4" />
      </IconButton>
      <span>
        Page {safePage} of {Math.max(1, totalPages)}
      </span>
      <IconButton
        label="Next page"
        disabled={safePage >= totalPages}
        onClick={() => onPageChange(safePage + 1)}
      >
        <ChevronRight className="size-4" />
      </IconButton>
    </nav>
  )
}
export function StatCard({
  label,
  value,
  tone = 'neutral',
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  label: string
  value: string | number
  tone?: 'neutral' | 'info' | 'success'
}) {
  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        tone === 'success' ? 'border-green-300' : 'border-[var(--border)]',
        className,
      )}
      {...props}
    >
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  )
}
