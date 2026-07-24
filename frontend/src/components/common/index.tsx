import { cva, type VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  PropsWithChildren,
} from 'react'
import { AppLogo } from '@/components/branding/AppLogo'
import { cn } from '@/lib/utils/cn'

const buttonStyles = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] enabled:hover:brightness-95 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--primary)] text-white',
        secondary: 'bg-[var(--surface-muted)] text-[var(--text-primary)]',
        outline: 'border border-[var(--border)] bg-white',
        ghost: 'bg-transparent',
        danger: 'bg-[var(--danger)] text-white',
      },
      size: {
        sm: 'min-h-8 px-3 text-xs',
        md: 'min-h-10',
        lg: 'min-h-12 px-5 text-base',
      },
      fullWidth: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)
type ActionProps = VariantProps<typeof buttonStyles>
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ActionProps & {
    loading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
  }
export function Button({
  className,
  variant,
  size,
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
export function IconButton({
  label,
  children,
  className,
  type = 'button',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        buttonStyles({ variant: 'ghost', size: 'sm' }),
        'px-2',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
export function LinkButton({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & ActionProps) {
  return (
    <a
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
}
export function BrandMark({
  alt = 'UPDS Judge',
  size = 'md',
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  size?: 'sm' | 'md' | 'lg'
}) {
  return <AppLogo alt={alt} size={size} {...props} />
}
export function Surface({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg bg-[var(--surface)] shadow-[var(--shadow-sm)]',
        className,
      )}
      {...props}
    />
  )
}
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Surface
      className={cn('border border-[var(--border)] p-5', className)}
      {...props}
    />
  )
}
export function Divider({
  className,
  ...props
}: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn('border-0 border-t border-[var(--border)]', className)}
      {...props}
    />
  )
}
export function Avatar({
  name,
  src,
  className,
}: {
  name: string
  src?: string
  className?: string
}) {
  return src ? (
    <img
      src={src}
      alt={name}
      className={cn('size-9 rounded-full object-cover', className)}
    />
  ) : (
    <span
      aria-label={name}
      className={cn(
        'inline-grid size-9 place-items-center rounded-full bg-[var(--primary)] text-sm font-bold text-white',
        className,
      )}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)}
    </span>
  )
}
const tones = {
  neutral: 'bg-slate-100 text-slate-700',
  info: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
}
export function Badge({
  tone = 'neutral',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-xs font-semibold',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
export function StatusDot({
  tone = 'neutral',
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof tones }) {
  return (
    <span
      aria-label={`${tone} status`}
      className={cn('inline-block size-2 rounded-full', tones[tone], className)}
      {...props}
    />
  )
}
export function Alert({
  tone = 'info',
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { tone?: keyof typeof tones }) {
  return (
    <div
      role="alert"
      className={cn('rounded-md p-3 text-sm', tones[tone], className)}
      {...props}
    />
  )
}
export function Spinner({
  label = 'Loading',
  className,
  ...props
}: React.ComponentProps<typeof LoaderCircle> & { label?: string }) {
  return (
    <LoaderCircle
      role="status"
      aria-label={label}
      className={cn('size-5 animate-spin', className)}
      {...props}
    />
  )
}
export function ProgressBar({
  value,
  label = 'Progress',
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  value: number
  label?: string
}) {
  const safeValue = Math.min(100, Math.max(0, value))
  return (
    <div
      aria-label={label}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeValue}
      className={cn(
        'h-2 overflow-hidden rounded-full bg-[var(--surface-muted)]',
        className,
      )}
      {...props}
    >
      <div
        className="h-full bg-[var(--primary)]"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-label="Loading content"
      className={cn(
        'animate-pulse rounded bg-[var(--surface-muted)]',
        className,
      )}
    />
  )
}
export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    title: string
    description?: string
    action?: React.ReactNode
  }
>) {
  
  return (
    <div
      className={cn(
        'rounded-lg border border-dashed border-[var(--border)] p-8 text-center',
        className,
      )}
      {...props}
    >
      <h2 className="font-semibold">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
