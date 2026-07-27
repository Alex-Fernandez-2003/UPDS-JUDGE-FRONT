import type { SVGAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type GlobeIllustrationProps = Omit<SVGAttributes<SVGSVGElement>, 'color'> & {
  decorative?: boolean
  label?: string
  size?: number | string
  /** Hexadecimal balloon color. Defaults to the brand-red legacy illustration. */
  color?: string
}

export function GlobeIllustration({
  className,
  decorative = true,
  label = 'Globo de programación competitiva',
  size = 104,
  color = '#E6194B',
  ...props
}: GlobeIllustrationProps) {
  return (
    <svg
      role="img"
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      width={size}
      viewBox="0 0 80 100"
      className={cn('h-auto', className)}
      {...props}
    >
      <ellipse cx="40" cy="42" rx="28" ry="35" fill={color} />
      <path d="M32 72 40 84l8-12" fill={color} />
      <path d="M40 84v10" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="7" ry="11" fill="white" opacity=".32" />
    </svg>
  )
}
