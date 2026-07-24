import { httpClient } from '@/lib/api/http-client'
import { endpoints } from '@/lib/api/endpoints'
import type { ContestDashboard } from './types'

export async function getContestDashboard(
  codigo: string,
): Promise<ContestDashboard> {
  return (await httpClient.get<ContestDashboard>(
    endpoints.contests.dashboard(codigo),
  )) as ContestDashboard
}
