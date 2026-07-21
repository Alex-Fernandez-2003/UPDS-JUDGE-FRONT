import { endpoints, httpClient } from '@/lib/api'
import { createContestFormData } from './mapper'
import type {
  CreateContestFormValues,
  CreateContestResponse,
  ListConcursosParams,
  ListConcursosResponse,
} from './types'

export const createContest = (values: CreateContestFormValues) =>
  httpClient.post<CreateContestResponse>(
    endpoints.contests.create,
    createContestFormData(values),
  )

export const listConcursos = (params: ListConcursosParams) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') query.set(key, String(value))
  }

  const path = query.size
    ? `${endpoints.contests.list}?${query.toString()}`
    : endpoints.contests.list

  return httpClient.get<ListConcursosResponse>(path)
}
