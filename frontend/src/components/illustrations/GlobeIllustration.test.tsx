import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GlobeIllustration } from './GlobeIllustration'

describe('GlobeIllustration', () => {
  it('uses the received color and updates reactively', () => {
    const { rerender } = render(
      <GlobeIllustration decorative={false} label="Azul" color="#4363D8" />,
    )
    const globe = screen.getByRole('img', { name: 'Azul' })
    expect(globe.querySelector('ellipse')).toHaveAttribute('fill', '#4363D8')
    rerender(
      <GlobeIllustration decorative={false} label="Amarillo" color="#FFE119" />,
    )
    expect(globe.querySelector('ellipse')).toHaveAttribute('fill', '#FFE119')
  })

  it('keeps individual colors for simultaneous instances and a default', () => {
    const { container } = render(
      <>
        <GlobeIllustration color="#4363D8" />
        <GlobeIllustration color="#FFE119" />
        <GlobeIllustration />
      </>,
    )
    const globes = container.querySelectorAll('svg')
    expect(globes[0].querySelector('ellipse')).toHaveAttribute(
      'fill',
      '#4363D8',
    )
    expect(globes[1].querySelector('ellipse')).toHaveAttribute(
      'fill',
      '#FFE119',
    )
    expect(globes[2].querySelector('ellipse')).toHaveAttribute(
      'fill',
      '#E6194B',
    )
  })
})
