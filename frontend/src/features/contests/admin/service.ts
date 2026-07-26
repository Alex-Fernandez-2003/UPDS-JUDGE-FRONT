import { endpoints, httpClient } from '@/lib/api'
import { createContestFormData, updateContestFormData } from './mapper'
import type {
  ConcursosAdminResumen,
  CreateContestFormValues,
  CreateContestResponse,
  ListConcursosParams,
  ListConcursosResponse,
} from './types'

export interface ProblemaParaEditar {
  inciso: string
  titulo: string
  tiempo: number
  memoria: number
  cantidadCasosPrueba: number
}

export interface ConcursoParaEditar {
  codigo: string
  nombre: string
  descripcion: string
  fechaInicio: string
  duracionMinutos: number
  esPrivado: boolean
  urlSetProblemas: string
  minutosCongelamiento: number
  listaProblemas: ProblemaParaEditar[]
}

export const createContest = (values: CreateContestFormValues) =>
  httpClient.post<CreateContestResponse>(
    endpoints.contests.create,
    createContestFormData(values),
  )

export const getContestForEdit = (codigo: string) =>
  httpClient.get<ConcursoParaEditar>(endpoints.contests.getForEdit(codigo))

export const updateContest = (
  codigo: string,
  values: Omit<CreateContestFormValues, 'codigo'>,
) =>
  httpClient.put<CreateContestResponse>(
    endpoints.contests.update(codigo),
    updateContestFormData(values),
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
