import { describe, expect, it } from 'vitest'
import { problemStatusPresentation } from './problem-status'

describe('problemStatusPresentation', () => {
  it.each([
    ['Accepted', 'ACCEPTED', 'success'],
    [' accepted ', 'ACCEPTED', 'success'],
    ['Sin intentar', 'NOT ATTEMPTED', 'neutral'],
    [' SIN_INTENTAR ', 'NOT ATTEMPTED', 'neutral'],
    ['Wrong Answer', 'UNSOLVED', 'danger'],
    ['Compilation Error', 'UNSOLVED', 'danger'],
    ['Runtime Error', 'UNSOLVED', 'danger'],
    ['Time Limit Exceeded', 'UNSOLVED', 'danger'],
    ['Memory Limit Exceeded', 'UNSOLVED', 'danger'],
  ])('maps contractual value %s', (value, label, tone) => {
    expect(problemStatusPresentation(value)).toMatchObject({ label, tone })
  })

  it.each([undefined, null, '', 'Future Verdict'])(
    'falls back for %s',
    (value) => {
      expect(problemStatusPresentation(value)).toMatchObject({
        label: 'UNKNOWN',
        tone: 'neutral',
      })
    },
  )
})
