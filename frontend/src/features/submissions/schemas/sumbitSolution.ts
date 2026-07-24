// sumbitSolution.ts

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
  confirmedHonesty: boolean
}

// Mapeo de idLenguaje a extensiones permitidas (1: C++, 2: Python, 3: C#)
const EXTENSIONS_BY_LANGUAGE_ID: Record<number, string[]> = {
  1: ['.cpp', '.cc', '.cxx', '.c'],
  2: ['.py'],
  3: ['.cs'],
}

export function validateSubmitSolution(
  input: SubmitFormValidationInput,
): ValidationResult {
  const errors: Record<string, string> = {}

  // 1. Validar selección de problema (inciso)
  if (!input.incisoProblema || !input.incisoProblema.trim()) {
    errors.incisoProblema = 'Debes seleccionar un problema.'
  }

  // 2. Validar selección de lenguaje
  if (!input.idLenguaje) {
    errors.idLenguaje = 'Debes seleccionar un lenguaje de programación.'
  }

  // 3. Validar honestidad académica
  if (!input.confirmedHonesty) {
    errors.honesty = 'Debes confirmar la honestidad académica.'
  }

  // 4. Validar según el modo seleccionado (subir archivo o pegar código)
  if (input.mode === 'upload') {
    if (!input.file || !(input.file instanceof File)) {
      errors.file = 'Debes seleccionar un archivo fuente.'
    } else {
      // Validar extensión del archivo según el idLenguaje
      const fileName = input.file.name.toLowerCase()
      const allowed = EXTENSIONS_BY_LANGUAGE_ID[input.idLenguaje] || []

      const isValidExtension = allowed.some((ext) => fileName.endsWith(ext))

      if (!isValidExtension) {
        errors.file = `El archivo no corresponde al lenguaje seleccionado (${allowed.join(', ')}).`
      }
    }
  } else {
    if (!input.sourceCode || !input.sourceCode.trim()) {
      errors.sourceCode = 'Debes ingresar el código fuente de tu solución.'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}