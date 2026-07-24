import { endpoints, httpClient } from '@/lib/api'
import type {
  UserContestStats,
  UserSubmissionsParams,
  UserSubmissionsResponse,
} from './types'

export const getUserContestStats = () =>
  httpClient.get<UserContestStats>(endpoints.contests.userStats)

export const listUserSubmissions = (params: UserSubmissionsParams) => {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }
  return httpClient.get<UserSubmissionsResponse>(
    `${endpoints.contests.userSubmissions}?${query.toString()}`,
  )
}
