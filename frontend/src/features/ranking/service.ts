import { endpoints, httpClient } from '@/lib/api'
import { normalizeContestRanking } from './mapper'

export const getContestRanking = async (contestCode: string) => {
  const payload = await httpClient.get<unknown>(
    endpoints.contests.ranking(contestCode),
  )
  return normalizeContestRanking(payload)
}
