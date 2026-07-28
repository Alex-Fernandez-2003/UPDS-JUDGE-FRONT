import type {
  EstadoTiempoConcurso,
  ModalidadConcurso,
} from '@/features/contests/types'

export type ContestUserAction =
  | 'JOIN_PUBLIC'
  | 'JOIN_PRIVATE'
  | 'VIEW_ACTIVE'
  | 'VIEW_FINISHED'
  | 'ENROLLED_UPCOMING'
  | 'REGISTRATION_CLOSED'
  | 'PRIVATE_FINISHED_REQUIRES_PASSWORD'
  | 'UNKNOWN_BLOCKED'

export type ContestDetailMode = 'participation' | 'read-only' | 'blocked'

type AccessInput = {
  estadoTiempo: EstadoTiempoConcurso | string
  modalidad: ModalidadConcurso | string
  yaInscrito?: boolean
}

const normalized = (value: string) => value.trim().toLocaleLowerCase()

export const getContestUserAction = ({
  estadoTiempo,
  modalidad,
  yaInscrito = false,
}: AccessInput): ContestUserAction => {
  const state = normalized(estadoTiempo)
  const normalizedModality = normalized(modalidad)
  const isPrivate = normalizedModality === 'privado'
  const isPublic =
    normalizedModality === 'publico' || normalizedModality === 'público'

  if (!isPrivate && !isPublic) return 'UNKNOWN_BLOCKED'

  if (state === 'proximo' || state === 'próximo') {
    if (yaInscrito) return 'ENROLLED_UPCOMING'
    return isPrivate ? 'JOIN_PRIVATE' : 'JOIN_PUBLIC'
  }
  if (state === 'activo' || state === 'en curso')
    return yaInscrito ? 'VIEW_ACTIVE' : 'REGISTRATION_CLOSED'
  if (state === 'finalizado') {
    if (yaInscrito || !isPrivate) return 'VIEW_FINISHED'
    return 'PRIVATE_FINISHED_REQUIRES_PASSWORD'
  }
  return 'UNKNOWN_BLOCKED'
}

export const getContestDetailMode = (input: AccessInput) => {
  const action = getContestUserAction(input)
  if (action === 'VIEW_ACTIVE')
    return { mode: 'participation' as const, reason: undefined }
  if (action === 'VIEW_FINISHED')
    return {
      mode: 'read-only' as const,
      reason: 'El concurso finalizó; solo podés consultar su contenido.',
    }
  if (action === 'PRIVATE_FINISHED_REQUIRES_PASSWORD')
    return {
      mode: 'blocked' as const,
      reason:
        'Ingresá la contraseña para inscribirte antes de consultar este concurso privado finalizado.',
    }
  return {
    mode: 'blocked' as const,
    reason: 'No tenés acceso al detalle de este concurso.',
  }
}
