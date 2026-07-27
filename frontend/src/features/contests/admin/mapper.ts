import { normalizeContestCode, normalizeContestPassword } from './constants'
import { balloonColorApiValue } from '@/domain/balloon-colors'
import type {
  CreateContestFormValues,
  EditableContestDto,
  EditContestFormValues,
} from './types'
import { problemLetter } from './types'

const localDateTime = (utc: string) => {
  const date = new Date(utc)
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

export const editableContestToFormValues = (
  contest: EditableContestDto,
): EditContestFormValues => ({
  ...contest,
  fechaInicio: localDateTime(contest.fechaInicio),
  contrasena: '',
  archivoZip: undefined,
  listaProblemas: contest.listaProblemas.map((problem) => ({
    ...problem,
    inciso: problem.inciso.toUpperCase(),
    colorGlobo: balloonColorApiValue(problem.colorGlobo) ?? problem.colorGlobo,
  })),
})

export const updateContestFormData = (values: EditContestFormValues) => {
  const formData = new FormData()
  formData.append('nombre', values.nombre.trim())
  formData.append('descripcion', values.descripcion.trim())
  formData.append('fechaInicio', new Date(values.fechaInicio).toISOString())
  formData.append('duracionMinutos', String(values.duracionMinutos))
  formData.append('contrasena', normalizeContestPassword(values.contrasena))
  formData.append('urlSetProblemas', values.urlSetProblemas.trim())
  formData.append('minutosCongelamiento', String(values.minutosCongelamiento))
  values.listaProblemas.forEach((problem, index) => {
    const key = `listaProblemas[${index}]`
    formData.append(`${key}.inciso`, problem.inciso)
    formData.append(`${key}.titulo`, problem.titulo.trim())
    formData.append(`${key}.tiempo`, String(problem.tiempo))
    formData.append(`${key}.memoria`, String(problem.memoria))
    // The UJ-19 backend persists the canonical hexadecimal API value.
    formData.append(
      `${key}.colorGlobo`,
      balloonColorApiValue(problem.colorGlobo) ?? problem.colorGlobo,
    )
  })
  if (values.archivoZip) formData.append('archivoZip', values.archivoZip)
  return formData
}

export const createContestFormData = (values: CreateContestFormValues) => {
  const formData = new FormData()
  formData.append('nombre', values.nombre.trim())
  formData.append('descripcion', values.descripcion.trim())
  formData.append('fechaInicio', new Date(values.fechaInicio).toISOString())
  formData.append('duracionMinutos', String(values.duracionMinutos))
  formData.append('contrasena', normalizeContestPassword(values.contrasena))
  formData.append('urlSetProblemas', values.urlSetProblemas.trim())
  formData.append('minutosCongelamiento', String(values.minutosCongelamiento))
  formData.append('codigo', normalizeContestCode(values.codigo))
  values.listaProblemas.forEach((problem, index) => {
    const key = `listaProblemas[${index}]`
    formData.append(`${key}.inciso`, problemLetter(index))
    formData.append(`${key}.titulo`, problem.titulo.trim())
    formData.append(`${key}.tiempo`, String(problem.tiempo))
    formData.append(`${key}.memoria`, String(problem.memoria))
  })
  if (values.archivoZip) formData.append('archivoZip', values.archivoZip)
  return formData
}
