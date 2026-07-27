import { endpoints, httpClient } from '@/lib/api'
import type { ContestRanking } from './types'
export const getContestRanking = (contestCode: string) =>
  httpClient.get<ContestRanking>(endpoints.contests.ranking(contestCode))
