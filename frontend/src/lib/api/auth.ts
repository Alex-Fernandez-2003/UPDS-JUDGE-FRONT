import { endpoints, httpClient } from '@/lib/api'
import type { components } from '@/types/api.generated'

type LoginRequest = components['schemas']['LoginRequest']
type LoginResponse = components['schemas']['LoginResponse']

export async function login(values: LoginRequest) {
  const response = await httpClient.post<LoginResponse>(endpoints.auth.login, values)
  if (!response?.token) {
    throw new Error('No se recibió token de autenticación.')
  }
  return response
}
