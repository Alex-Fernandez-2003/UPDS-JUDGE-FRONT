import { useQuery } from '@tanstack/react-query'
import { getContestRanking } from './service'
import type { ContestRanking } from './types'

export const rankingKeys = {
  contest: (code: string) => ['contest-ranking', code] as const,
}

export function useContestRanking(contestCode?: string) {
  return useQuery<ContestRanking>({
    queryKey: rankingKeys.contest(contestCode ?? ''),
    queryFn: () => getContestRanking(contestCode!) as Promise<ContestRanking>,
    enabled: Boolean(contestCode),
    placeholderData: (previous) => previous,
    refetchInterval: (query) =>
      query.state.data?.estadoTiempo === 'Finalizado' &&
      !query.state.data.congelado
        ? false
        : 10_000,
    retry: (count, error) => {
      const status = (error as { status?: number }).status
      return ![401, 403, 404].includes(status ?? 0) && count < 2
    },
  })
}
