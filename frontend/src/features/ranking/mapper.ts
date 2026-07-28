import type {
  ContestRanking,
  RankingParticipant,
  RankingProblem,
} from './types'

export class RankingContractError extends Error {
  constructor() {
    super(
      'La versión del servidor no es compatible con esta pantalla de ranking. Actualiza el backend e inténtalo nuevamente.',
    )
    this.name = 'RankingContractError'
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null
const text = (value: unknown) => (typeof value === 'string' ? value : null)
const number = (value: unknown) => (typeof value === 'number' ? value : null)

const problem = (value: unknown): RankingProblem | null =>
  isRecord(value) && text(value.inciso) && text(value.colorGlobo)
    ? { inciso: text(value.inciso)!, colorGlobo: text(value.colorGlobo)! }
    : null

const mostSolvedProblem = (
  value: unknown,
): ContestRanking['problemaMasResuelto'] | undefined => {
  if (value === null || value === undefined) return null
  if (!isRecord(value)) return undefined
  const inciso = text(value.inciso)
  const colorGlobo = text(value.colorGlobo)
  const cantidadAceptaciones = number(value.cantidadAceptaciones)
  return inciso && colorGlobo && cantidadAceptaciones !== null
    ? { inciso, colorGlobo, cantidadAceptaciones }
    : undefined
}

const participant = (value: unknown): RankingParticipant | null => {
  if (!isRecord(value) || !Array.isArray(value.detalle)) return null
  const idUsuario = number(value.idUsuario)
  const puesto = number(value.puesto)
  const nombreUsuario = text(value.nombreUsuario)
  const problemasResueltos = number(value.problemasResueltos)
  const tiempoTotal = number(value.tiempoTotal)
  const cantidadIntentos = number(value.cantidadIntentos)
  if (
    [idUsuario, puesto, problemasResueltos, tiempoTotal, cantidadIntentos].some(
      (item) => item === null,
    ) ||
    !nombreUsuario
  )
    return null
  const detalle = value.detalle.map((item) => {
    if (
      !isRecord(item) ||
      !text(item.inciso) ||
      !text(item.colorGlobo) ||
      !text(item.estado) ||
      number(item.intentos) === null
    )
      return null
    return {
      inciso: text(item.inciso)!,
      colorGlobo: text(item.colorGlobo)!,
      estado: text(item.estado)!,
      intentos: number(item.intentos)!,
      tiempoMinutos: number(item.tiempoMinutos),
    }
  })
  if (detalle.some((item) => item === null)) return null
  return {
    idUsuario: idUsuario!,
    puesto: puesto!,
    nombreUsuario,
    problemasResueltos: problemasResueltos!,
    tiempoTotal: tiempoTotal!,
    cantidadIntentos: cantidadIntentos!,
    detalle,
  }
}

export const normalizeContestRanking = (payload: unknown): ContestRanking => {
  if (
    !isRecord(payload) ||
    !Array.isArray(payload.problemas) ||
    !Array.isArray(payload.participantes)
  )
    throw new RankingContractError()
  const problems = payload.problemas.map(problem)
  const participants = payload.participantes.map(participant)
  const codigo = text(payload.codigo),
    nombre = text(payload.nombre),
    duracionMinutos = number(payload.duracionMinutos),
    minutosCongelamiento = number(payload.minutosCongelamiento),
    problemaMasResuelto = mostSolvedProblem(payload.problemaMasResuelto),
    estadoTiempo = text(payload.estadoTiempo),
    fechaInicio = text(payload.fechaInicio),
    fechaFin = text(payload.fechaFin)
  if (
    !codigo ||
    !nombre ||
    !estadoTiempo ||
    !fechaInicio ||
    !fechaFin ||
    typeof payload.congelado !== 'boolean' ||
    duracionMinutos === null ||
    minutosCongelamiento === null ||
    number(payload.totalInscritos) === null ||
    number(payload.totalEnvios) === null ||
    problems.some((item) => item === null) ||
    participants.some((item) => item === null) ||
    problemaMasResuelto === undefined
  )
    throw new RankingContractError()
  return {
    codigo,
    nombre,
    congelado: payload.congelado,
    estadoTiempo,
    fechaInicio,
    fechaFin,
    duracionMinutos,
    minutosCongelamiento,
    totalInscritos: number(payload.totalInscritos)!,
    totalEnvios: number(payload.totalEnvios)!,
    problemas: problems,
    participantes: participants,
    problemaMasResuelto,
  }
}
