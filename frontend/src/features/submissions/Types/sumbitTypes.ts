// submitTypes.ts

/**
 * DTO que coincide exactamente con CrearEnvioDto del backend.
 */
export interface CrearEnvioDto {
  codigoConcurso: string
  incisoProblema: string // "A", "B", "C"...
  idLenguaje: number
  codigoFuente: string
  contrasena?: string
}

/**
 * Respuesta del endpoint POST /envios
 * Puedes ampliarla cuando definas el modelo definitivo.
 */
export interface CrearEnvioResponse {
  idEnvio?: number
  veredicto?: string
  mensaje?: string
  tiempoEjecucion?: number
  memoriaUsada?: number
  [key: string]: unknown
}