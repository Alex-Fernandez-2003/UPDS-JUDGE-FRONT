import { endpoints, httpClient } from '@/lib/api'

export interface ContestMetadata {
  codigo: string
  nombre: string
  estadoTiempo: string
  fechaInicio: string
  fechaFin: string
  duracionMinutos: number
}

export const getContestMetadata = async (contestCode: string): Promise<ContestMetadata> => {
  const payload = await httpClient.get<unknown>(
    endpoints.contests.ranking(contestCode),
  )
  // The ranking endpoint returns the full ranking data which includes the metadata we need
  // We extract just the fields needed for the header
  const data = payload as {
    codigo: string
    nombre: string
    estadoTiempo: string
    fechaInicio: string
    fechaFin: string
    duracionMinutos: number
  }
  return {
    codigo: data.codigo,
    nombre: data.nombre,
    estadoTiempo: data.estadoTiempo,
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    duracionMinutos: data.duracionMinutos,
  }
}