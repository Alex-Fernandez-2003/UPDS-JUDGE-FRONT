import { describe, expect, it, vi } from 'vitest'
import { endpoints, httpClient } from '@/lib/api'
import { joinContest } from './service'

describe('joinContest', () => {
  it('uses the shared client and centralized endpoint for public enrollment', async () => {
    const request = { codigo: 'contest-demo', contrasena: null }
    const response = {
      mensaje: 'Inscripción registrada.',
      codConcurso: 'contest-demo',
    }
    const post = vi.spyOn(httpClient, 'post').mockResolvedValue(response)

    await expect(joinContest(request)).resolves.toEqual(response)
    expect(post).toHaveBeenCalledWith(endpoints.contests.join, request)

    post.mockRestore()
  })
})
