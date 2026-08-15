import { httpClient } from '@/lib/api/http-client'
import type {
  GetMySubmissionsResponse,
  GetMySubmissionsFilters,
  CreateSubmissionResponse,
} from './submissionTypes'
import type { CrearEnvioDto } from './sumbitTypes'

export const submissionsService = {
  getMySubmissions: async (
    concursoCodigo: string,
    filters: GetMySubmissionsFilters = {},
  ): Promise<GetMySubmissionsResponse> => {
    const queryParams = new URLSearchParams()

    if (concursoCodigo) {
      queryParams.append('concursoCodigo', concursoCodigo)
    }
    if (filters.resultado) {
      queryParams.append('resultado', filters.resultado)
    }
    if (filters.inciso) {
      queryParams.append('inciso', filters.inciso)
    }
    if (filters.pagina) {
      queryParams.append('pagina', filters.pagina.toString())
    }
    if (filters.tamanoPagina) {
      queryParams.append('tamanoPagina', filters.tamanoPagina.toString())
    }

    const response = await httpClient.get<GetMySubmissionsResponse>(
      `/envios/mis-envios?${queryParams.toString()}`,
    )

    return response
  },

  /**
   * Crea un nuevo envío de solución
   * Timeout moderado (30s) como protección contra cola del juez;
   * el POST retorna inmediatamente con 200 OK (cuerpo vacío según contrato OpenAPI).
   */
  createSubmission: async (
    payload: CrearEnvioDto,
  ): Promise<CreateSubmissionResponse | undefined> => {
    const response = await httpClient.post<CreateSubmissionResponse>(
      '/envios',
      payload,
      { timeoutMs: 30000 },
    )
    return response ?? undefined
  },
}
