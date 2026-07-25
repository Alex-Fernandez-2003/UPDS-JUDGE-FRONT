import { endpoints, httpClient } from '@/lib/api'
import type {
  ListConcursosParams,
  ListConcursosResponse,
} from '@/features/contests/types'
import type {
  JoinContestRequest,
  JoinContestResponse,
  UserContestStats,
  UserSubmissionsParams,
  UserSubmissionsResponse,
} from './types'

export const getUserContestStats = () =>
  httpClient.get<UserContestStats>(endpoints.contests.userStats)

export const joinContest = (request: JoinContestRequest) =>
  httpClient.post<JoinContestResponse>(endpoints.contests.join, request)

export const listUserSubmissions = (params: UserSubmissionsParams) => {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }
  return httpClient.get<UserSubmissionsResponse>(
    `${endpoints.contests.userSubmissions}?${query.toString()}`,
  )
}

export const listPublicConcursos = (params: ListConcursosParams) => {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }
  return httpClient.get<ListConcursosResponse>(
    `${endpoints.contests.userListCompetition}?${query.toString()}`,
  )
}
