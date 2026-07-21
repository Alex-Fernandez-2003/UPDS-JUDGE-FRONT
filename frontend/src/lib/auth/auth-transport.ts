export type BearerTokenProvider = () => string | undefined

export type AuthTransport = {
  getAuthorizationHeader?: () => string | undefined
}

export const createBearerAuthTransport = (
  getToken: BearerTokenProvider,
): AuthTransport => ({
  getAuthorizationHeader: () => {
    const token = getToken()
    return token ? `Bearer ${token}` : undefined
  },
})

const getSessionStorageToken = () => {
  try {
    return typeof window === 'undefined'
      ? undefined
      : window.sessionStorage?.getItem('token') || undefined
  } catch {
    return undefined
  }
}

export const createSessionStorageAuthTransport = () =>
  createBearerAuthTransport(getSessionStorageToken)

export const neutralAuthTransport: AuthTransport = {}
