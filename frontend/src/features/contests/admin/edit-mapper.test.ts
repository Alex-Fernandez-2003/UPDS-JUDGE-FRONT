import { describe, expect, it } from 'vitest'
import { editableContestToFormValues, updateContestFormData } from './mapper'
import type { EditableContestDto } from './types'

const contest: EditableContestDto = {
  codigo: 'upds-001',
  nombre: 'Contest',
  descripcion: 'Description',
  fechaInicio: '2030-01-02T03:04:00.000Z',
  duracionMinutos: 120,
  esPrivado: true,
  urlSetProblemas: 'https://example.test/problems',
  minutosCongelamiento: 30,
  listaProblemas: [
    {
      inciso: 'a',
      titulo: 'First',
      tiempo: 1,
      memoria: 256,
      colorGlobo: '#e6194b',
      cantidadCasosPrueba: 2,
    },
  ],
}

describe('edit contest mapper', () => {
  it('hydrates safe editable values without exposing a password', () => {
    const values = editableContestToFormValues(contest)
    expect(values.codigo).toBe('upds-001')
    expect(values.contrasena).toBe('')
    expect(values.listaProblemas[0]).toMatchObject({
      inciso: 'A',
      colorGlobo: '#E6194B',
      cantidadCasosPrueba: 2,
    })
  })

  it('serializes the full update multipart contract including color and ZIP', () => {
    const values = editableContestToFormValues(contest)
    values.archivoZip = new File(['zip'], 'cases.zip')
    values.contrasena = 'new-secret'
    const formData = updateContestFormData(values)
    expect(formData.get('minutosCongelamiento')).toBe('30')
    expect(formData.get('contrasena')).toBe('new-secret')
    expect(formData.get('listaProblemas[0].inciso')).toBe('A')
    expect(formData.get('listaProblemas[0].colorGlobo')).toBe('#E6194B')
    expect(formData.get('archivoZip')).toBeInstanceOf(File)
  })
})
