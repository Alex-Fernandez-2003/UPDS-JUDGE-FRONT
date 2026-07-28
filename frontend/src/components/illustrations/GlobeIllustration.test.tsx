import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GlobeIllustration } from './GlobeIllustration'

describe('GlobeIllustration', () => {
  it('uses the received color reactively through the SVG variables', () => {
    const { rerender } = render(
      <GlobeIllustration decorative={false} label="Azul" color="#4363D8" />,
    )
    const globe = screen.getByRole('img', { name: 'Azul' })
    expect(globe).toHaveStyle('--color1: #4363D8')
    rerender(
      <GlobeIllustration decorative={false} label="Amarillo" color="#FFE119" />,
    )
    expect(screen.getByRole('img', { name: 'Amarillo' })).toHaveStyle(
      '--color1: #FFE119',
    )
  })

  it('uses light by default, supports dark, and isolates SVG definition IDs', () => {
    const { container } = render(
      <>
        <GlobeIllustration color="#4363D8" />
        <GlobeIllustration theme="dark" color="#FFE119" />
      </>,
    )
    const globes = container.querySelectorAll('svg')
    expect(globes[0]).toHaveStyle('--color1: #4363D8')
    expect(globes[0].querySelector('[id*="balloon-body-light"]')).toBeTruthy()
    expect(globes[1]).toHaveStyle('--color1: #FFE119')
    expect(globes[1].querySelector('[id*="balloon-body-dark"]')).toBeTruthy()
    expect(globes[0].querySelector('[id*="balloon-body-light"]')?.id).not.toBe(
      globes[1].querySelector('[id*="balloon-body-dark"]')?.id,
    )
  })
})
