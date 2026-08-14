import {
  MAX_SOURCE_FILE_SIZE_BYTES,
  getLanguageConfig,
} from '../languageConfig'

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface SubmitFormValidationInput {
  incisoProblema: string
  idLenguaje: number
  mode: 'upload' | 'paste'
  file?: File
  sourceCode?: string
}

export function validateSourceFile(file: File, languageId: number) {
  const language = getLanguageConfig(languageId)
  if (!language) return 'Debes seleccionar un lenguaje de programación.'

  const fileName = file.name.toLowerCase()
  if (
    !language.allowedExtensions.some((extension) =>
      fileName.endsWith(extension),
    )
  )
    return `El archivo no corresponde al lenguaje seleccionado (${language.allowedExtensions.join(', ')}).`

  if (file.size > MAX_SOURCE_FILE_SIZE_BYTES)
    return 'El archivo supera el límite de 2 MiB.'

  return undefined
}

export function validateSubmitSolution(
  input: SubmitFormValidationInput,
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!input.incisoProblema.trim())
    errors.incisoProblema = 'Debes seleccionar un problema.'

  if (!getLanguageConfig(input.idLenguaje))
    errors.idLenguaje = 'Debes seleccionar un lenguaje de programación.'

  if (input.mode === 'upload') {
    if (!input.file || !(input.file instanceof File))
      errors.file = 'Debes seleccionar un archivo fuente.'
    else {
      const fileError = validateSourceFile(input.file, input.idLenguaje)
      if (fileError) errors.file = fileError
    }
  } else if (!input.sourceCode?.trim()) {
    errors.sourceCode = 'Debes ingresar el código fuente de tu solución.'
  }

  return { isValid: Object.keys(errors).length === 0, errors }
}
