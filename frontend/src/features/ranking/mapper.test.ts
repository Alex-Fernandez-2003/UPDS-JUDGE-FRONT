import { describe, expect, it } from 'vitest'
import { normalizeContestRanking, RankingContractError } from './mapper'

const valid = {
  codigo: 'demo',
  nombre: 'Demo',
  congelado: false,
  estadoTiempo: 'Finalizado',
  fechaInicio: '2026-01-01T00:00:00Z',
  fechaFin: '2026-01-01T02:00:00Z',
  duracionMinutos: 120,
  minutosCongelamiento: 30,
  totalInscritos: 0,
  totalEnvios: 0,
  problemas: [],
  participantes: [],
}

describe('ranking contract normalization', () => {
  it('accepts a legitimate empty ranking', () =>
    expect(normalizeContestRanking(valid).problemas).toEqual([]))
  it('preserves a complete current ranking response', () => {
    const ranking = normalizeContestRanking({
      ...valid,
      problemas: [{ inciso: 'A', colorGlobo: '#ff0000' }],
      problemaMasResuelto: {
        inciso: 'A',
        colorGlobo: '#ff0000',
        cantidadAceptaciones: 2,
      },
      participantes: [
        {
          idUsuario: 17,
          puesto: 1,
          nombreUsuario: 'Ana Ranking',
          problemasResueltos: 1,
          tiempoTotal: 15,
          cantidadIntentos: 2,
          detalle: [
            {
              inciso: 'A',
              colorGlobo: '#ff0000',
              estado: 'Aceptado',
              intentos: 2,
              tiempoMinutos: 15,
            },
          ],
        },
      ],
    })
    expect(ranking).toMatchObject({
      problemas: [{ inciso: 'A' }],
      duracionMinutos: 120,
      minutosCongelamiento: 30,
      participantes: [
        {
          idUsuario: 17,
          puesto: 1,
          nombreUsuario: 'Ana Ranking',
          detalle: [{ intentos: 2 }],
        },
      ],
      problemaMasResuelto: { cantidadAceptaciones: 2 },
    })
  })

  it('rejects an old response without problems', () => {
    const { problemas: _problems, ...oldPayload } = valid
    expect(() => normalizeContestRanking(oldPayload)).toThrow(
      RankingContractError,
    )
  })
  it('rejects a response without participants', () => {
    const { participantes: _participants, ...oldPayload } = valid
    expect(() => normalizeContestRanking(oldPayload)).toThrow(
      RankingContractError,
    )
  })
})
