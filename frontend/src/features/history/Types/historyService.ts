import { httpClient } from '@/lib/api/http-client' 
import type { HistoryParams, HistoryResponse } from '../Types/historyTypes'

export const historyService = {
  getMisEnvios: async (params?: HistoryParams): Promise<HistoryResponse> => {
    const queryParams = new URLSearchParams()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value))
        }
      })
    }

    const queryString = queryParams.toString()
    const path = queryString ? `envios/mis-envios?${queryString}` : 'api/envios/mis-envios'

    const response = await httpClient.get<HistoryResponse>(path)

    if (!response) {
      throw new Error('No se recibieron datos del servidor')
    }

    return response
  },
}