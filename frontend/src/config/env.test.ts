import { describe, expect, it } from 'vitest'
import { parsePublicEnv } from './env'
const valid = {
  VITE_APP_NAME: 'UPDS Judge',
  VITE_API_BASE_URL: '/api',
  VITE_REQUEST_TIMEOUT_MS: '1000',
}
describe('parsePublicEnv', () => {
  it('returns typed valid values and disables mocks by default', () =>
    expect(parsePublicEnv(valid)).toEqual({
      appName: 'UPDS Judge',
      apiBaseUrl: '/api',
      requestTimeoutMs: 1000,
      enableMocks: false,
    }))
  it('identifies invalid values', () => {
    expect(() => parsePublicEnv({ ...valid, VITE_APP_NAME: '' })).toThrow(
      'VITE_APP_NAME',
    )
    expect(() =>
      parsePublicEnv({ ...valid, VITE_REQUEST_TIMEOUT_MS: 'zero' }),
    ).toThrow('VITE_REQUEST_TIMEOUT_MS')
    expect(() =>
      parsePublicEnv({ ...valid, VITE_ENABLE_MOCKS: 'yes' }),
    ).toThrow('VITE_ENABLE_MOCKS')
  })
})
