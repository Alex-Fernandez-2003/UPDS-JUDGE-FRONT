export type PublicEnv = {
  appName: string
  apiBaseUrl: string
  requestTimeoutMs: number
  enableMocks: boolean
}

export const isDevelopment: boolean = import.meta.env.DEV
type RawEnv = Record<string, string | boolean | undefined>
const required = (raw: RawEnv, key: string): string => {
  const value = raw[key]
  if (typeof value !== 'string' || !value.trim())
    throw new Error(`Missing required environment variable: ${key}`)
  return value
}
export const parsePublicEnv = (raw: RawEnv): PublicEnv => {
  const appName = required(raw, 'VITE_APP_NAME')
  const apiBaseUrl = required(raw, 'VITE_API_BASE_URL')
  if (!apiBaseUrl.startsWith('/'))
    throw new Error(
      'VITE_API_BASE_URL must be a relative path starting with /.',
    )
  const requestTimeoutMs = Number(required(raw, 'VITE_REQUEST_TIMEOUT_MS'))
  if (!Number.isFinite(requestTimeoutMs) || requestTimeoutMs <= 0)
    throw new Error('VITE_REQUEST_TIMEOUT_MS must be a positive number.')
  const mocks = raw.VITE_ENABLE_MOCKS ?? 'false'
  if (mocks !== 'true' && mocks !== 'false')
    throw new Error('VITE_ENABLE_MOCKS must be true or false.')
  return {
    appName,
    apiBaseUrl,
    requestTimeoutMs,
    enableMocks: mocks === 'true',
  }
}
export const env = parsePublicEnv(import.meta.env)
