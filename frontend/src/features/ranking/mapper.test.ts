import { describe, expect, it } from 'vitest'
import { normalizeContestRanking, RankingContractError } from './mapper'

const valid = {
  codigo: 'demo',
  nombre: 'Demo',
  congelado: false,
  estadoTiempo: 'Finalizado',
  fechaInicio: '2026-01-01T00:00:00Z',
  fechaFin: '2026-01-01T02:00:00Z',
  totalInscritos: 0,
  totalEnvios: 0,
  problemas: [],
  participantes: [],
}

describe('ranking contract normalization', () => {
  it('accepts a legitimate empty ranking', () =>
    expect(normalizeContestRanking(valid).problemas).toEqual([]))
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
