import { httpClient } from '@/lib/api/http-client' // Ajusta a la ruta de tu cliente
import type { 
  GetMySubmissionsResponse, 
  GetMySubmissionsFilters 
} from './submissionTypes'
import type { CrearEnvioDto } from './sumbitTypes' // Ajusta la ruta a tu archivo de tipos

export const submissionsService = {
  getMySubmissions: async (
    concursoCodigo: string,
    filters: GetMySubmissionsFilters = {}
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
      `/envios/mis-envios?${queryParams.toString()}`
    )

    return response
  },

  /**
   * Crea un nuevo envío de solución
   */
  createSubmission: async (payload: CrearEnvioDto): Promise<void> => {
    // Si tu API retorna el objeto creado, puedes cambiar `Promise<void>` por el tipo de respuesta adecuado
    await httpClient.post('/envios', payload)
  },
}