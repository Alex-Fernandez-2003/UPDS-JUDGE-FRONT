import { useQuery } from '@tanstack/react-query'
import { historyService } from '@/features/history/Types/historyService'
import type { HistoryParams } from '@/features/history/Types/historyTypes'

export const historyKeys = {
  all: ['user-history'] as const,
  list: (params: HistoryParams) =>
    [
      'user-history',
      params.concursoCodigo,
      params.resultado,
      params.pagina,
      params.tamanoPagina,
    ] as const,
}

export const useUserHistory = (params: HistoryParams) =>
  useQuery({
    queryKey: historyKeys.list(params),
    queryFn: () => historyService.getMisEnvios(params),
    placeholderData: (previous) => previous,
  })
