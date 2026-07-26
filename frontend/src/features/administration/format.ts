export const roleTone: Record<
  string,
  'danger' | 'warning' | 'info' | 'success' | 'neutral'
> = {
  Administrador: 'danger',
  Juez: 'warning',
  Organizador: 'info',
  Participante: 'success',
}

export const userStateTone = {
  Activo: 'success',
  Inactivo: 'neutral',
} as const
//comentando