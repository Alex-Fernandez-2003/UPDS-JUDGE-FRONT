import type { CreateSubmissionPayload } from '../Types/submissionTypes'

export interface ValidationResult {
  isValid: boolean
  errors: Partial<Record<keyof CreateSubmissionPayload | 'codigoFuente', string>>
}

export function validateSubmitSolution(
  payload: CreateSubmissionPayload,
): ValidationResult {
  const errors: ValidationResult['errors'] = {}

  // Concurso
  if (!payload.concursoCodigo?.trim()) {
    errors.concursoCodigo = 'El código del concurso es obligatorio.'
  }

  // Problema
  if (!payload.problemaId) {
    errors.problemaId = 'Debes seleccionar un problema.'
  }

  // Lenguaje
  if (!payload.lenguajeId) {
    errors.lenguajeId = 'Debes seleccionar un lenguaje de programación.'
  }

  // Debe existir archivo o código fuente
  const hasFile = !!payload.archivo && payload.archivo.size > 0
  const hasCode = !!payload.codigoFuente?.trim()

  if (!hasFile && !hasCode) {
    errors.codigoFuente =
      'Debes adjuntar un archivo o pegar el código fuente.'
  }

  // Validación opcional del archivo
  if (payload.archivo) {
    const maxSizeMb = 2
    const maxBytes = maxSizeMb * 1024 * 1024

    if (payload.archivo.size > maxBytes) {
      errors.archivo = `El archivo no puede superar ${maxSizeMb} MB.`
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}