import { Eye, EyeOff, Search, X } from 'lucide-react'
import React, {
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { IconButton } from '@/components/common'
import { cn } from '@/lib/utils/cn'

const fieldStyles =
  'w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--focus)] focus:ring-2 focus:ring-[var(--focus)]/20 disabled:bg-[var(--disabled)]'
export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        'mb-1 block text-sm font-medium text-[var(--text-primary)]',
        className,
      )}
      {...props}
    />
  )
}
export function FormHint({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('mt-1 text-xs text-[var(--text-secondary)]', className)}
      {...props}
    />
  )
}
export function FormError({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      role="alert"
      className={cn('mt-1 text-xs text-[var(--danger)]', className)}
      {...props}
    />
  )
}
export function Input({
  className,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(fieldStyles, error && 'border-[var(--danger)]', className)}
      aria-invalid={error || undefined}
      {...props}
    />
  )
}
export function Textarea({
  className,
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      className={cn(fieldStyles, error && 'border-[var(--danger)]', className)}
      aria-invalid={error || undefined}
      {...props}
    />
  )
}
export function Select({
  className,
  error,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      className={cn(fieldStyles, error && 'border-[var(--danger)]', className)}
      aria-invalid={error || undefined}
      {...props}
    />
  )
}
export function Checkbox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn('size-4 accent-[var(--primary)] cursor-pointer', className)}
      {...props}
    />
  )
}
export function Radio({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="radio"
      className={cn('size-4 accent-[var(--primary)]', className)}
      {...props}
    />
  )
}
export function PasswordInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={visible ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      <IconButton
        type="button"
        label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-1 top-1"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </IconButton>
    </div>
  )
}
export function FormField({
  label,
  hint,
  error,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  label: string
  hint?: string
  error?: string
  children: React.ReactElement<{ id?: string; 'aria-describedby'?: string }>
}) {
  const id = useId()
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') ||
    undefined
  return (
    <div className={className} {...props}>
      <Label htmlFor={id}>{label}</Label>
      {React.cloneElement(children, {
        id,
        'aria-describedby': describedBy,
        ...(typeof children.type === 'string'
          ? { 'aria-invalid': Boolean(error) || undefined }
          : { error: Boolean(error) }),
      } as never)}
      {hint && <FormHint id={`${id}-hint`}>{hint}</FormHint>}
      {error && <FormError id={`${id}-error`}>{error}</FormError>}
    </div>
  )
}
export function SearchInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="absolute left-3 top-2.5 size-4 text-[var(--text-secondary)]"
      />
      <Input type="search" className={cn('pl-9', className)} {...props} />
    </div>
  )
}
export function PasswordStrength({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const score =
    value.length >= 12 ? 100 : value.length >= 8 ? 66 : value.length ? 33 : 0
  return (
    <div aria-label="Password strength" className={className} {...props}>
      <div className="h-1.5 rounded bg-[var(--surface-muted)]">
        <div
          className="h-full rounded bg-[var(--primary)]"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
export function FileDropzone({
  accept,
  maxSizeBytes,
  disabled,
  onChange,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  accept?: string
  maxSizeBytes?: number
  disabled?: boolean
  onChange?: (file?: File) => void
}) {
  const input = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<string>()
  const choose = (candidate?: File) => {
    if (!candidate) return
    const extension = candidate.name.includes('.')
      ? `.${candidate.name.split('.').pop()}`
      : ''
    if (
      accept &&
      !accept
        .split(',')
        .map((item) => item.trim())
        .includes(extension)
    ) {
      setError('File type is not accepted.')
      return
    }
    if (maxSizeBytes && candidate.size > maxSizeBytes) {
      setError('File exceeds the maximum size.')
      return
    }
    setError(undefined)
    setFile(candidate)
    onChange?.(candidate)
  }
  return (
    <div className={className} {...props}>
      <input
        ref={input}
        type="file"
        className="sr-only"
        accept={accept}
        disabled={disabled}
        onChange={(event) => choose(event.target.files?.[0])}
      />
      <button
        type="button"
        disabled={disabled}
        className="w-full rounded-lg border border-dashed border-[var(--border)] p-6 text-sm"
        onClick={() => input.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          choose(event.dataTransfer.files[0])
        }}
      >
        Drop a file here or select one
      </button>
      {file && (
        <div className="mt-2 flex items-center justify-between text-sm">
          <span>{file.name}</span>
          <IconButton
            label="Remove file"
            onClick={() => {
              setFile(undefined)
              onChange?.(undefined)
            }}
          >
            <X className="size-4" />
          </IconButton>
        </div>
      )}
      {error && <FormError>{error}</FormError>}
    </div>
  )
}
