import { describe, expect, it } from 'vitest'
import {
  BALLOON_COLOR_OPTIONS,
  balloonColorApiValue,
  balloonColorHex,
  balloonColorLabel,
  isBalloonColor,
  validateBalloonColors,
} from './balloon-colors'

describe('balloon colors domain', () => {
  it('has exactly thirteen unique contract colors', () => {
    expect(BALLOON_COLOR_OPTIONS).toHaveLength(13)
    expect(
      new Set(BALLOON_COLOR_OPTIONS.map((color) => color.apiValue)).size,
    ).toBe(13)
  })

  it('normalizes label and hex inputs without accepting unknown values', () => {
    expect(balloonColorApiValue(' #e6194b ')).toBe('#E6194B')
    expect(balloonColorApiValue('#e6194b')).toBe('#E6194B')
    expect(balloonColorLabel('#E6194B')).toBe('Rojo')
    expect(balloonColorHex('#E6194B')).toBe('#E6194B')
    expect(isBalloonColor('violeta')).toBe(false)
    expect(balloonColorLabel('violeta')).toBe('Color desconocido')
  })

  it('reports missing, duplicate, invalid and impossible configurations', () => {
    expect(
      validateBalloonColors([
        { inciso: 'A', colorGlobo: '#E6194B' },
        { inciso: 'B', colorGlobo: '#e6194b' },
      ]),
    ).toMatchObject({ 0: expect.any(String), 1: expect.any(String) })
    expect(
      validateBalloonColors([{ inciso: 'A', colorGlobo: '' }]),
    ).toMatchObject({ 0: expect.any(String) })
    expect(
      validateBalloonColors(
        Array.from({ length: 14 }, (_, index) => ({
          inciso: String(index),
          colorGlobo: '#E6194B',
        })),
      ),
    ).toMatchObject({ 13: expect.any(String) })
  })
})
