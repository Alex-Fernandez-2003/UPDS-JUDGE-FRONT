import { describe, expect, it } from 'vitest'
import { createContestFormData } from './mapper'
import type { CreateContestFormValues } from './types'

const values: CreateContestFormValues = {
  nombre: ' Contest ',
  descripcion: ' Description ',
  fechaInicio: '2026-07-19T12:00',
  duracionMinutos: 120,
  contrasena: '',
  urlSetProblemas: ' https://example.test/problems ',
  minutosCongelamiento: 30,
  codigo: ' C-1 ',
  listaProblemas: [
    { titulo: ' First ', tiempo: 1.5, memoria: 256 },
    { titulo: ' Second ', tiempo: 2, memoria: 512 },
  ],
  archivoZip: new File(['zip'], 'cases.zip', { type: 'application/zip' }),
}

describe('createContestFormData', () => {
  it('maps the exact multipart fields, ISO date, ZIP, and indexed problems', () => {
    const formData = createContestFormData(values)

    expect(formData.get('nombre')).toBe('Contest')
    expect(formData.get('descripcion')).toBe('Description')
    expect(formData.get('fechaInicio')).toBe(
      new Date(values.fechaInicio).toISOString(),
    )
    expect(formData.get('duracionMinutos')).toBe('120')
    expect(formData.get('contrasena')).toBe('')
    expect(formData.get('urlSetProblemas')).toBe(
      'https://example.test/problems',
    )
    expect(formData.get('minutosCongelamiento')).toBe('30')
    expect(formData.get('codigo')).toBe('C-1')
    expect(formData.get('listaProblemas[0].inciso')).toBe('A')
    expect(formData.get('listaProblemas[0].titulo')).toBe('First')
    expect(formData.get('listaProblemas[1].inciso')).toBe('B')
    expect(formData.get('listaProblemas[1].memoria')).toBe('512')
    expect(formData.get('archivoZip')).toBeInstanceOf(File)
  })
})
