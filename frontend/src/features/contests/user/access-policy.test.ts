import { describe, expect, it } from 'vitest'
import { getContestDetailMode, getContestUserAction } from './access-policy'

const contest = (
  estadoTiempo: string,
  modalidad: string,
  yaInscrito: boolean,
) => ({ estadoTiempo, modalidad, yaInscrito })

describe('contest user access policy', () => {
  it.each([
    ['Proximo', 'Publico', false, 'JOIN_PUBLIC'],
    ['Proximo', 'Privado', false, 'JOIN_PRIVATE'],
    ['Proximo', 'Publico', true, 'ENROLLED_UPCOMING'],
    ['Activo', 'Publico', true, 'VIEW_ACTIVE'],
    ['Activo', 'Privado', false, 'REGISTRATION_CLOSED'],
    ['Finalizado', 'Privado', true, 'VIEW_FINISHED'],
    ['Finalizado', 'Publico', false, 'VIEW_FINISHED'],
    ['Finalizado', 'Privado', false, 'PRIVATE_FINISHED_REQUIRES_PASSWORD'],
  ])(
    'maps %s / %s / enrolled=%s',
    (estadoTiempo, modalidad, yaInscrito, expected) => {
      expect(
        getContestUserAction(contest(estadoTiempo, modalidad, yaInscrito)),
      ).toBe(expected)
    },
  )

  it('normalizes casing and blocks unknown values safely', () => {
    expect(getContestUserAction(contest(' próximo ', 'pÚblico', false))).toBe(
      'JOIN_PUBLIC',
    )
    expect(getContestUserAction(contest('desconocido', 'Publico', false))).toBe(
      'UNKNOWN_BLOCKED',
    )
    expect(getContestUserAction(contest('Proximo', 'unknown', false))).toBe(
      'UNKNOWN_BLOCKED',
    )
  })

  it('derives one safe mode for participation, read-only and blocked access', () => {
    expect(getContestDetailMode(contest('Activo', 'Publico', true)).mode).toBe(
      'participation',
    )
    expect(
      getContestDetailMode(contest('Finalizado', 'Publico', false)).mode,
    ).toBe('read-only')
    expect(
      getContestDetailMode(contest('Finalizado', 'Privado', false)),
    ).toEqual({
      mode: 'blocked',
      reason:
        'Ingresá la contraseña para inscribirte antes de consultar este concurso privado finalizado.',
    })
  })
})
