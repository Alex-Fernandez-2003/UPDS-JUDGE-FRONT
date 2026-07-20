import { normalizeContestCode, normalizeContestPassword } from './constants'
import { problemLetter, type CreateContestFormValues } from './types'

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
