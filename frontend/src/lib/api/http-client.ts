import { env } from '@/config/env'
import {
  neutralAuthTransport,
  type AuthTransport,
} from '@/lib/auth/auth-transport'
import { ApiError } from './api-error'
import { isProblemDetails, toApiError } from './problem-details'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type RequestOptions = Omit<RequestInit, 'body' | 'method'> & {
  body?: BodyInit | object | null
  timeoutMs?: number
}

const joinUrl = (path: string) =>
  `${env.apiBaseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
const requestIdFrom = (response: Response) =>
  response.headers.get('x-request-id') ??
  response.headers.get('x-correlation-id') ??
  undefined

export class HttpClient {
  private authTransport: AuthTransport

  constructor(authTransport: AuthTransport = neutralAuthTransport) {
    this.authTransport = authTransport
  }

  setAuthTransport(authTransport: AuthTransport) {
    this.authTransport = authTransport
  }

  async request<T>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {},
  ): Promise<T | undefined> {
    const controller = new AbortController()
    const timeout = window.setTimeout(
      () => controller.abort('timeout'),
      options.timeoutMs ?? env.requestTimeoutMs,
    )
    const { body, headers, signal, timeoutMs: _timeoutMs, ...init } = options
    void _timeoutMs
    const abort = () => controller.abort('external')
    signal?.addEventListener('abort', abort, { once: true })
    const isFormData = body instanceof FormData
    const requestHeaders = new Headers(headers)
    const requestBody: BodyInit | null | undefined =
      body &&
      typeof body === 'object' &&
      !isFormData &&
      !(body instanceof Blob) &&
      !(body instanceof URLSearchParams)
        ? JSON.stringify(body)
        : (body as BodyInit | null | undefined)
    if (requestBody && !isFormData && !requestHeaders.has('content-type'))
      requestHeaders.set('content-type', 'application/json')
    if (!requestHeaders.has('accept'))
      requestHeaders.set('accept', 'application/json')
    if (!requestHeaders.has('authorization')) {
      const authorization = this.authTransport.getAuthorizationHeader?.()
      if (authorization) requestHeaders.set('authorization', authorization)
    }
    try {
      const response = await fetch(joinUrl(path), {
        ...init,
        method,
        body: requestBody,
        headers: requestHeaders,
        signal: controller.signal,
      })
      if (response.status === 204) return undefined
      const text = await response.text()
      const payload: unknown = text
        ? (() => {
            try {
              return JSON.parse(text)
            } catch {
              return text
            }
          })()
        : undefined
      if (!response.ok) {
        const requestId = requestIdFrom(response)
        if (isProblemDetails(payload))
          throw toApiError(payload, response.status, requestId)
        throw new ApiError({
          status: response.status,
          message:
            typeof payload === 'object' &&
            payload !== null &&
            'mensaje' in payload &&
            typeof payload.mensaje === 'string' &&
            payload.mensaje
              ? payload.mensaje
              : typeof payload === 'string' && payload
                ? payload
                : `Request failed with status ${response.status}.`,
          requestId,
        })
      }
      return payload as T
    } catch (error) {
      if (error instanceof ApiError) throw error
      if (controller.signal.aborted)
        throw new ApiError({
          message:
            controller.signal.reason === 'timeout'
              ? 'The request timed out.'
              : 'The request was cancelled.',
          kind: controller.signal.reason === 'timeout' ? 'timeout' : 'aborted',
        })
      throw new ApiError({
        message: 'A network error occurred.',
        kind: 'network',
      })
    } finally {
      window.clearTimeout(timeout)
      signal?.removeEventListener('abort', abort)
    }
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>('GET', path, options)
  }
  post<T>(
    path: string,
    body?: RequestOptions['body'],
    options?: RequestOptions,
  ) {
    return this.request<T>('POST', path, { ...options, body })
  }
  put<T>(
    path: string,
    body?: RequestOptions['body'],
    options?: RequestOptions,
  ) {
    return this.request<T>('PUT', path, { ...options, body })
  }
  patch<T>(
    path: string,
    body?: RequestOptions['body'],
    options?: RequestOptions,
  ) {
    return this.request<T>('PATCH', path, { ...options, body })
  }
  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>('DELETE', path, options)
  }
}

export const httpClient = new HttpClient()

/** Configures the single shared client when an application auth integration is available. */
export const configureHttpClientAuthTransport = (
  authTransport: AuthTransport,
) => httpClient.setAuthTransport(authTransport)
