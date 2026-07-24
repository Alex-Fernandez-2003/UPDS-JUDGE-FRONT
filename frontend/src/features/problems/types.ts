export interface DashboardProblem {
  idProblema: number
  inciso: string
  titulo: string
  tiempo: string
  memoria: string
  intentos: number
  estado: string
  resuelto: boolean
}

export interface ContestDashboard {
  codigo: string
  nombre: string
  estadoTiempo: string
  cantidadParticipantes: number
  fechaFin: string
  minutosCongelamiento: number
  segundosRestantes: number | null
  urlSetProblemas: string
  problemasResueltos: number
  totalProblemas: number
  intentosTotales: number
  problemas: DashboardProblem[]
}
