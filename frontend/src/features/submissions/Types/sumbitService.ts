import { httpClient } from '@/lib/api/http-client'
import { endpoints } from '@/lib/api/endpoints'

import type {
  CrearEnvioDto,
  CrearEnvioResponse,
} from '../Types/sumbitTypes'

async function createSubmission(
  dto: CrearEnvioDto,
): Promise<CrearEnvioResponse> {
  const response = await httpClient.post<CrearEnvioResponse>(
    endpoints.submissions.create,
    dto,
  )

  if (!response) {
    throw new Error('El servidor no devolvió información.')
  }

  return response
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result as string)

    reader.onerror = () =>
      reject(new Error('No se pudo leer el archivo.'))

    reader.readAsText(file)
  })
}

export const submissionsService = {
  createSubmission,
  readFileAsText,
}