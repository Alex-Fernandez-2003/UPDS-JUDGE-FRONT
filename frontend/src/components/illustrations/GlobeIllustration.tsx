import type { ImgHTMLAttributes } from 'react'
import balloon from '@/assets/balloon.svg'
import { cn } from '@/lib/utils/cn'

type GlobeIllustrationProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'alt' | 'width'
> & {
  decorative?: boolean
  label?: string
  size?: number | string
}

export function GlobeIllustration({
  className,
  decorative = true,
  label = 'Globo de programación competitiva',
  size = 104,
  ...props
}: GlobeIllustrationProps) {
  return (
    <img
      src={balloon}
      alt={decorative ? '' : label}
      aria-hidden={decorative || undefined}
      width={size}
      className={cn('h-auto', className)}
      {...props}
    />
  )
}
