import { describe, expect, it, vi } from 'vitest'
import { endpoints, httpClient } from '@/lib/api'
import { createContest } from './service'
import type { CreateContestFormValues } from './types'

const values: CreateContestFormValues = {
  nombre: 'Contest',
  descripcion: 'Description',
  fechaInicio: '2026-07-19T12:00',
  duracionMinutos: 60,
  contrasena: '',
  urlSetProblemas: 'https://example.test/problems',
  minutosCongelamiento: 0,
  codigo: 'C-1',
  listaProblemas: [{ titulo: 'Problem', tiempo: 1, memoria: 256 }],
  archivoZip: new File(['zip'], 'cases.zip'),
}

describe('createContest', () => {
  it('uses the shared client, centralized relative endpoint, and FormData', async () => {
    const post = vi
      .spyOn(httpClient, 'post')
      .mockResolvedValue({ codigo: 'contest-demo', mensaje: 'Created' })

    await expect(createContest(values)).resolves.toEqual({
      codigo: 'contest-demo',
      mensaje: 'Created',
    })

    expect(post).toHaveBeenCalledWith(
      endpoints.contests.create,
      expect.any(FormData),
    )
    post.mockRestore()
  })
})
