export type AuthSession = {
  state: 'unknown' | 'anonymous' | 'authenticated'
  subject?: string
}
export const anonymousSession: AuthSession = { state: 'anonymous' }
