import { useId } from 'react'
import type { SVGAttributes } from 'react'
import lightBalloon from '@/assets/balloon.svg?raw'
import darkBalloon from '@/assets/dark-balloon.svg?raw'
import { cn } from '@/lib/utils/cn'

type GlobeTheme = 'light' | 'dark'
type GlobeIllustrationProps = Omit<SVGAttributes<SVGSVGElement>, 'color'> & {
  decorative?: boolean
  label?: string
  size?: number | string
  /** Hexadecimal balloon color. Defaults to the brand-red legacy illustration. */
  color?: string
  /** Surface theme used by the balloon asset. Defaults to light. */
  theme?: GlobeTheme
}

const innerSvg = (source: string, idPrefix: string) =>
  source
    .replace(/^\s*<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(
      /id="(balloon-[\w-]+)"/g,
      (_match, id: string) => `id="${idPrefix}-${id}"`,
    )
    .replace(
      /url\(#(balloon-[\w-]+)\)/g,
      (_match, id: string) => `url(#${idPrefix}-${id})`,
    )

export function GlobeIllustration({
  className,
  decorative = true,
  label = 'Globo de programación competitiva',
  size = 104,
  color = '#E6194B',
  theme = 'light',
  ...props
}: GlobeIllustrationProps) {
  const instanceId = useId().replace(/:/g, '')
  const source = theme === 'dark' ? darkBalloon : lightBalloon
  const content = innerSvg(source, `globe-${instanceId}`)

  return (
    <svg
      role="img"
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
      width={size}
      viewBox="0 0 64 104"
      className={cn('h-auto', className)}
      style={
        {
          '--balloon-color': color,
          '--balloon-shade': color,
          '--color1': color,
          '--color2': color,
          ...props.style,
        } as SVGAttributes<SVGSVGElement>['style']
      }
      {...props}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
