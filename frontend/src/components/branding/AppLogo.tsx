import type { ImgHTMLAttributes } from 'react'
import logoDark from '@/assets/logo-dark.svg'
import logo from '@/assets/logo.svg'
import { cn } from '@/lib/utils/cn'

type AppLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  variant?: 'default' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function AppLogo({
  alt = 'UPDS Judge',
  className,
  size = 'md',
  variant = 'dark',
  ...props
}: AppLogoProps) {
  const sizes = { sm: 'h-20 w-auto', md: 'h-40 w-auto', lg: 'h-80 w-auto' }

  return (
    <img
      src={variant === 'dark' ? logoDark : logo}
      alt={alt}
      className={cn(sizes[size], className)}
      {...props}
    />
  )
}
