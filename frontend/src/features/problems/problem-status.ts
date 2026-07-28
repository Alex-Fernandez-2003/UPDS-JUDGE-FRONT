type ProblemStatusPresentation = {
  label: 'ACCEPTED' | 'UNSOLVED' | 'NOT ATTEMPTED' | 'UNKNOWN'
  tone: 'success' | 'danger' | 'neutral'
  ariaLabel: string
}

const normalize = (value?: string | null) =>
  value
    ?.trim()
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ') ?? ''

const unsolvedVerdicts = new Set([
  'wrong answer',
  'compilation error',
  'runtime error',
  'time limit exceeded',
  'memory limit exceeded',
])

export const problemStatusPresentation = (
  value?: string | null,
): ProblemStatusPresentation => {
  const status = normalize(value)
  if (status === 'accepted')
    return { label: 'ACCEPTED', tone: 'success', ariaLabel: 'Accepted problem' }
  if (status === 'sin intentar')
    return {
      label: 'NOT ATTEMPTED',
      tone: 'neutral',
      ariaLabel: 'Problem not attempted',
    }
  if (unsolvedVerdicts.has(status))
    return { label: 'UNSOLVED', tone: 'danger', ariaLabel: 'Problem unsolved' }
  return {
    label: 'UNKNOWN',
    tone: 'neutral',
    ariaLabel: 'Unknown problem status',
  }
}
