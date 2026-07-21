import { endpoints, httpClient } from '@/lib/api'

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './authTypes'

export const authService = {
  login(payload: LoginRequest) {
    return httpClient.post<LoginResponse>(endpoints.auth.login, payload)
  },

  register(payload: RegisterRequest) {
    return httpClient.post<RegisterResponse>(endpoints.auth.register, payload)
  },
}
