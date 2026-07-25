export type ContestProblem = {
  inciso: string
  titulo: string
  tiempo: number
  memoria: number
  intentos: number
  estado: string
  resuelto: boolean
}

export type ContestDashboard = {
  codigo: string
  nombre: string
  estadoTiempo: string
  cantidadParticipantes: number
  fechaFin: string
  minutosCongelamiento: number
  segundosRestantes: number | null
  urlSetProblemas: string | null
  problemasResueltos: number
  totalProblemas: number
  intentosTotales: number
  problemas: ContestProblem[]
}
