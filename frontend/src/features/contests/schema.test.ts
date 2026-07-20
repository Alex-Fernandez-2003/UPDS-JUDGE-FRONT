import { describe, expect, it } from 'vitest'
import { createContestSchema } from './schema'
import { problemLetter } from './types'

const validValues = () => ({
  nombre: 'Contest',
  descripcion: 'Description',
  fechaInicio: '2026-07-19T12:00',
  duracionMinutos: 120,
  contrasena: '',
  urlSetProblemas: 'https://example.test/problems',
  minutosCongelamiento: 30,
  codigo: 'C-1',
  listaProblemas: [{ titulo: 'A problem', tiempo: 1.5, memoria: 256 }],
  archivoZip: new File(['zip'], 'cases.ZIP', { type: 'application/zip' }),
})

describe('create contest schema', () => {
  it('accepts the required form values and a case-insensitive ZIP extension', () => {
    expect(createContestSchema.safeParse(validValues()).success).toBe(true)
  })

  it('rejects blank required fields, invalid problem values, and a non-ZIP file', () => {
    const invalid = validValues()
    invalid.nombre = ' '
    invalid.duracionMinutos = 0
    invalid.listaProblemas[0].memoria = 1.5
    invalid.archivoZip = new File(['text'], 'cases.txt')

    expect(createContestSchema.safeParse(invalid).success).toBe(false)
  })

  it('rejects freezing longer than the contest and more than 26 problems', () => {
    const invalid = validValues()
    invalid.minutosCongelamiento = 121
    invalid.listaProblemas = Array.from({ length: 27 }, () => ({
      titulo: 'Problem',
      tiempo: 1,
      memoria: 256,
    }))

    expect(createContestSchema.safeParse(invalid).success).toBe(false)
  })
})

describe('problem letters', () => {
  it('derives consecutive letters from the current array index', () => {
    expect([0, 1, 25].map(problemLetter)).toEqual(['A', 'B', 'Z'])
  })
})
