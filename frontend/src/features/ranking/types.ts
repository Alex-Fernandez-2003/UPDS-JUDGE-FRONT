export type RankingProblem = { inciso: string; colorGlobo: string }
export type RankingDetail = {
  inciso: string
  colorGlobo: string
  estado: string
  intentos: number
  tiempoMinutos: number | null
}
export type RankingParticipant = {
  puesto: number
  nombreUsuario: string
  problemasResueltos: number
  tiempoTotal: number
  cantidadIntentos: number
  detalle: RankingDetail[]
}
export type ContestRanking = {
  codigo: string
  nombre: string
  congelado: boolean
  estadoTiempo: string
  fechaInicio: string
  fechaFin: string
  totalInscritos: number
  totalEnvios: number
  problemas: RankingProblem[]
  problemaMasResuelto?: {
    inciso: string
    colorGlobo: string
    cantidadAceptaciones: number
  } | null
  participantes: RankingParticipant[]
}
