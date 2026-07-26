export type JoinContestRequest = {
  codigo: string
  contrasena: string | null
}

export type JoinContestResponse = {
  mensaje: string
  codConcurso: string
}

export type UserContestStats = {
  concursosParticipados: number
  problemasResueltos: number
  problemasPendientes: number
  precisionPorcentaje: number
}

export type UserSubmissionDto = {
  idEnvio: number
  concursoCodigo: string
  problemaTitulo: string
  inciso: string
  lenguaje: string
  veredicto: string
  consumoTiempo: number
  consumoMemoria: number
  fechaEnvio: string
}

export type UserSubmissionsParams = {
  resultado?: string
  concursoCodigo?: string
  inciso?: string
  pagina: number
  tamanoPagina: number
}

export type UserSubmissionsResponse = {
  total: number
  pagina: number
  tamanoPagina: number
  datos: UserSubmissionDto[]
}

export type VerdictTone = 'success' | 'danger' | 'warning' | 'info' | 'neutral'

export type RecentSubmissionRow = {
  id?: number
  contestCode: string
  problemLabel: string
  language: string
  verdictLabel: string
  verdictTone: VerdictTone
  timeLabel: string
  memoryLabel: string
  submittedAtLabel: string
}
