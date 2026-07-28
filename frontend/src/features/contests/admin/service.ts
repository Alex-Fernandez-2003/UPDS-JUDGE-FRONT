import { endpoints, httpClient } from '@/lib/api'
import { createContestFormData, updateContestFormData } from './mapper'
import type {
  ConcursosAdminResumen,
  CreateContestFormValues,
  CreateContestResponse,
  EditableContestDto,
  EditContestFormValues,
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

  return httpClient.get<ListConcursosResponse>(
    `${endpoints.contests.adminList}?${query.toString()}`,
  )
}

export const getConcursosAdminResumen = () =>
  httpClient.get<ConcursosAdminResumen>(endpoints.contests.adminSummary)

export const getEditableContest = (contestCode: string) =>
  httpClient.get<EditableContestDto>(endpoints.contests.edit(contestCode))

export const updateContest = ({
  contestCode,
  values,
}: {
  contestCode: string
  values: EditContestFormValues
}) =>
  httpClient.put<CreateContestResponse>(
    endpoints.contests.update(contestCode),
    updateContestFormData(values),
  )
