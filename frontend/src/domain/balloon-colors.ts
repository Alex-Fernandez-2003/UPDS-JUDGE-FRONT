export const BALLOON_COLOR_OPTIONS = [
  { apiValue: '#E6194B', label: 'Rojo', hex: '#E6194B' },
  { apiValue: '#3CB44B', label: 'Verde', hex: '#3CB44B' },
  { apiValue: '#4363D8', label: 'Azul', hex: '#4363D8' },
  { apiValue: '#FFE119', label: 'Amarillo', hex: '#FFE119' },
  { apiValue: '#F58231', label: 'Naranja', hex: '#F58231' },
  { apiValue: '#911EB4', label: 'Morado', hex: '#911EB4' },
  { apiValue: '#F032E6', label: 'Magenta', hex: '#F032E6' },
  { apiValue: '#42D4F4', label: 'Celeste', hex: '#42D4F4' },
  { apiValue: '#FABED4', label: 'Rosa', hex: '#FABED4' },
  { apiValue: '#469990', label: 'Turquesa', hex: '#469990' },
  { apiValue: '#DCBEFF', label: 'Lavanda', hex: '#DCBEFF' },
  { apiValue: '#9A6324', label: 'Marrón', hex: '#9A6324' },
  { apiValue: '#000000', label: 'Negro', hex: '#000000' },
] as const

export type BalloonColor = (typeof BALLOON_COLOR_OPTIONS)[number]['apiValue']
export type BalloonColorOption = (typeof BALLOON_COLOR_OPTIONS)[number]

const normalized = (value: string | null | undefined) =>
  value?.trim().toLocaleLowerCase()

export const getBalloonColor = (value: string | null | undefined) =>
  BALLOON_COLOR_OPTIONS.find(
    (option) =>
      normalized(option.apiValue) === normalized(value) ||
      normalized(option.label) === normalized(value) ||
      option.hex.toLowerCase() === normalized(value),
  )

export const isBalloonColor = (
  value: string | null | undefined,
): value is BalloonColor => Boolean(getBalloonColor(value))

export const balloonColorLabel = (value: string | null | undefined) =>
  getBalloonColor(value)?.label ?? 'Color desconocido'

export const balloonColorHex = (value: string | null | undefined) =>
  getBalloonColor(value)?.hex ?? '#6B7280'

export const balloonColorApiValue = (value: string | null | undefined) =>
  getBalloonColor(value)?.apiValue

export type BalloonColorValidationProblem = {
  inciso: string
  colorGlobo?: string
}

export const validateBalloonColors = (
  problems: BalloonColorValidationProblem[],
) => {
  const errors: Record<number, string> = {}
  if (problems.length > BALLOON_COLOR_OPTIONS.length) {
    errors[0] =
      'El concurso tiene más problemas que colores de globo únicos disponibles.'
  }
  const seen = new Map<string, number>()
  problems.forEach((problem, index) => {
    const color = balloonColorApiValue(problem.colorGlobo)
    if (!color) {
      errors[index] = 'Seleccioná un color de globo válido.'
      return
    }
    const earlier = seen.get(color)
    if (earlier !== undefined) {
      errors[index] =
        `El color ${balloonColorLabel(color)} ya está asignado al problema ${problems[earlier].inciso}.`
      errors[earlier] =
        `El color ${balloonColorLabel(color)} está repetido con el problema ${problem.inciso}.`
      return
    }
    seen.set(color, index)
  })
  return errors
}
