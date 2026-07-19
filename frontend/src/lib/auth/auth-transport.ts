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

export const neutralAuthTransport: AuthTransport = {}
