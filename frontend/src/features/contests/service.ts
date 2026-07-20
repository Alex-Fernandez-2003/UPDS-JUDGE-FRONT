import { endpoints, httpClient } from '@/lib/api'
import { createContestFormData } from './mapper'
import type { CreateContestFormValues, CreateContestResponse } from './types'

export const createContest = (values: CreateContestFormValues) =>
  httpClient.post<CreateContestResponse>(
    endpoints.contests.create,
    createContestFormData(values),
  )
