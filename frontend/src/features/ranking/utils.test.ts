import { describe, expect, it } from 'vitest'
import { clampPage, formatRemaining, PAGE_SIZE, pageRows } from './utils'

describe('ranking pagination', () => {
  const rows = Array.from({ length: 11 }, (_, index) => index + 1)

  it('keeps page size stable and clamps invalid pages', () => {
    expect(PAGE_SIZE).toBe(5)
    expect(pageRows(rows, 1)).toEqual([1, 2, 3, 4, 5])
    expect(pageRows(rows, 3)).toEqual([11])
    expect(clampPage(0, rows.length)).toBe(1)
    expect(clampPage(9, rows.length)).toBe(3)
  })
})

describe('ranking countdown', () => {
  it('formats UTC elapsed time and clamps completed contests', () => {
    expect(
      formatRemaining(
        '2026-01-02T02:03:04Z',
        Date.parse('2026-01-01T00:00:00Z'),
      ),
    ).toBe('26:03:04')
    expect(
      formatRemaining(
        '2026-01-01T00:00:00Z',
        Date.parse('2026-01-01T00:00:01Z'),
      ),
    ).toBe('00:00:00')
    expect(formatRemaining('invalid')).toBe('—')
  })
})
