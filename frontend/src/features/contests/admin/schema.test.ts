import { describe, expect, it } from 'vitest'
import {
  CONTEST_CODE_ERROR,
  MAX_CONTEST_PROBLEMS,
  MAX_CONTEST_ZIP_SIZE_BYTES,
} from './constants'
import { createContestSchema } from './schema'
import { problemLetter } from './types'

const fileWithSize = (name: string, size: number) => {
  const file = new File(['zip'], name, { type: 'application/zip' })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

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

  it('normalizes uppercase contest codes before validating the lower-case format', () => {
    const result = createContestSchema.safeParse({
      ...validValues(),
      codigo: ' Regional-2026 ',
    })

    expect(result.success).toBe(true)
    if (result.success) expect(result.data.codigo).toBe('regional-2026')
  })

  it('rejects contest codes with invalid lower-case formats', () => {
    for (const codigo of ['regional_2026', 'regional--2026', '-regional']) {
      const result = createContestSchema.safeParse({ ...validValues(), codigo })

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues.map((issue) => issue.message)).toContain(
          CONTEST_CODE_ERROR,
        )
      }
    }
  })

  it('normalizes absent, null, and whitespace-only passwords to empty strings', () => {
    for (const password of [undefined, null, '   ']) {
      const result = createContestSchema.safeParse({
        ...validValues(),
        contrasena: password,
      })

      expect(result.success).toBe(true)
      if (result.success) expect(result.data.contrasena).toBe('')
    }
  })

  it('preserves a trimmed password as a string', () => {
    const result = createContestSchema.parse({
      ...validValues(),
      contrasena: ' secret ',
    })

    expect(result.contrasena).toBe('secret')
  })

  it('accepts ZIP files up to exactly 100 MiB and rejects one byte over', () => {
    expect(
      createContestSchema.safeParse({
        ...validValues(),
        archivoZip: fileWithSize('exact.zip', MAX_CONTEST_ZIP_SIZE_BYTES),
      }).success,
    ).toBe(true)
    const overLimit = createContestSchema.safeParse({
      ...validValues(),
      archivoZip: fileWithSize('large.zip', MAX_CONTEST_ZIP_SIZE_BYTES + 1),
    })

    expect(overLimit.success).toBe(false)
    if (!overLimit.success) {
      expect(overLimit.error.issues.map((issue) => issue.message)).toContain(
        'El ZIP no puede superar 100 MB.',
      )
    }
  })

  it('rejects blank required fields, invalid problem values, and a non-ZIP file', () => {
    const invalid = validValues()
    invalid.nombre = ' '
    invalid.duracionMinutos = 0
    invalid.listaProblemas[0].memoria = 1.5
    invalid.archivoZip = new File(['text'], 'cases.txt')

    expect(createContestSchema.safeParse(invalid).success).toBe(false)
  })

  it('rejects freezing longer than the contest and more than the central limit', () => {
    const invalid = validValues()
    invalid.minutosCongelamiento = 121
    invalid.listaProblemas = Array.from(
      { length: MAX_CONTEST_PROBLEMS + 1 },
      () => ({
        titulo: 'Problem',
        tiempo: 1,
        memoria: 256,
      }),
    )

    expect(createContestSchema.safeParse(invalid).success).toBe(false)
  })
})

describe('problem letters', () => {
  it('derives consecutive letters from the current array index', () => {
    expect([0, 1, 25].map(problemLetter)).toEqual(['A', 'B', 'Z'])
  })
})
