export type ResultadoFiltro = 'AC' | 'WA' | 'TLE' | 'MLE' | 'CE' | 'RE'

// Filtros OPCIONALES en la URL (?resultado=...&inciso=...&pagina=...)
export interface GetMySubmissionsFilters {
  resultado?: ResultadoFiltro
  inciso?: string
  pagina?: number
  tamanoPagina?: number
}

export type Verdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compilation Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'

export interface SubmissionItem {
  idEnvio: number
  concursoCodigo: string
  problemaTitulo: string
  inciso: string
  lenguaje: string
  veredicto: Verdict
  consumoTiempo: number
  consumoMemoria: number
  fechaEnvio: string
}

export interface GetMySubmissionsResponse {
  total: number
  pagina: number
  tamanoPagina: number
  datos: SubmissionItem[]
}
export type ProgrammingLanguage = 'cpp' | 'py' | 'cs'

export interface CreateSubmissionPayload {
  contestCode: string
  problemCode: string
  language: ProgrammingLanguage

  // Uno de los dos debe existir
  file?: File
  sourceCode?: string
}

export interface CreateSubmissionResponse {
  idEnvio: number
  mensaje: string
  estado: 'En Cola' | 'Procesando' | 'Evaluando'
}
export interface GetSubmissionsResponse {
  total: number
  pagina: number
  tamanoPagina: number
  datos: SubmissionItem[]
}