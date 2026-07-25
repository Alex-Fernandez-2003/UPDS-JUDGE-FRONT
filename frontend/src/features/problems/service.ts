import { endpoints } from '@/lib/api/endpoints'
import { httpClient } from '@/lib/api/http-client'
import type { ContestDashboard } from './types'

export const getContestDashboard = (contestCode: string) =>
  httpClient.get<ContestDashboard>(
    endpoints.contests.dashboard(contestCode.trim()),
  )
