// =========================
// Filtros que acepta el endpoint
// GET /api/Envios/mis-envios
// =========================

export type ResultadoFiltro =
  | 'AC'
  | 'WA'
  | 'TLE'
  | 'MLE'
  | 'CE'
  | 'RE'

export interface GetMySubmissionsParams {
  resultado?: ResultadoFiltro
  concursoCodigo?: string
  inciso?: string
  pagina?: number
  tamanoPagina?: number
}

// =========================
// Veredictos que devuelve el backend
// =========================

export type Verdict =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compilation Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'

// =========================
// Un envío individual
// =========================

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

// =========================
// Respuesta completa del endpoint
// =========================

export interface GetMySubmissionsResponse {
  total: number
  pagina: number
  tamanoPagina: number
  datos: SubmissionItem[]
}
// =========================
// Payload para enviar una solución
// =========================

export interface CreateSubmissionPayload {
  concursoCodigo: string
  problemaId: number | null
  lenguajeId: number | null
  archivo?: File | null
  codigoFuente?: string
}