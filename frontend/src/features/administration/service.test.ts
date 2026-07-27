import { describe, expect, it, vi } from 'vitest'
import { endpoints, httpClient } from '@/lib/api'
import { assignRole, removeRole } from './service'

describe('administration role service', () => {
  it.each([
    ['assign', assignRole, endpoints.roles.assign],
    ['remove', removeRole, endpoints.roles.remove],
  ] as const)(
    'uses the centralized endpoint to %s a role',
    async (_, operation, endpoint) => {
      const post = vi
        .spyOn(httpClient, 'post')
        .mockResolvedValue({ mensaje: 'Rol actualizado.' })

      await operation({ correo: 'user@example.test', idRol: 2 })

      expect(post).toHaveBeenCalledWith(endpoint, {
        correo: 'user@example.test',
        idRol: 2,
      })
      post.mockRestore()
    },
  )
})
