import type { EstadoTiempoConcurso, ModalidadConcurso, EstadoTiempoAdmin } from './types'

const dateTimeFormatter = new Intl.DateTimeFormat('es-BO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatFechaHora = (iso: string) =>
  dateTimeFormatter.format(new Date(iso))

export const formatDuracion = (minutos: number) => {
  const horas = Math.floor(minutos / 60)
  const restoMinutos = minutos % 60
  if (horas === 0) return `${restoMinutos} min`
  if (restoMinutos === 0) return `${horas} h`
  return `${horas} h ${restoMinutos} min`
}

type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export const estadoTiempoTone: Record<EstadoTiempoConcurso, BadgeTone> = {
  Activo: 'success',
  Proximo: 'info',
  Finalizado: 'neutral',
}

export const estadoTiempoLabel: Record<EstadoTiempoConcurso, string> = {
  Activo: 'Activo',
  Proximo: 'Próximo',
  Finalizado: 'Finalizado',
}

export const estadoTiempoAdminTone: Record<EstadoTiempoAdmin, BadgeTone> = {
  Activo: 'success',
  Proximo: 'info',
  Finalizado: 'neutral',
}

export const estadoTiempoAdminLabel: Record<EstadoTiempoAdmin, string> = {
  Activo: 'Activo',
  Proximo: 'Próximo',
  Finalizado: 'Finalizado',
}

export const modalidadLabel: Record<ModalidadConcurso, string> = {
  Publico: 'Público',
  Privado: 'Privado',
}
