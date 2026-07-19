import { afterEach, describe, expect, it, vi } from 'vitest'
import { createBearerAuthTransport } from '@/lib/auth/auth-transport'
import { ApiError } from './api-error'
import { HttpClient } from './http-client'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

const response = (body: BodyInit | null, status = 200, headers?: HeadersInit) =>
  new Response(body, { status, headers })

describe('HttpClient', () => {
  it('serializes JSON and returns JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response('{"ok":true}'))
    vi.stubGlobal('fetch', fetchMock)

    await expect(
      new HttpClient().post('example', { name: 'test' }),
    ).resolves.toEqual({ ok: true })

    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      body: '{"name":"test"}',
      method: 'POST',
    })
  })

  it('adds an optional non-persistent Bearer authorization header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response(null, 204))
    vi.stubGlobal('fetch', fetchMock)

    await new HttpClient(createBearerAuthTransport(() => 'test-token')).get(
      'example',
    )

    expect(
      new Headers(fetchMock.mock.calls[0][1].headers).get('authorization'),
    ).toBe('Bearer test-token')
  })

  it('preserves an explicit authorization header', async () => {
    const fetchMock = vi.fn().mockResolvedValue(response(null, 204))
    vi.stubGlobal('fetch', fetchMock)

    await new HttpClient(createBearerAuthTransport(() => 'test-token')).get(
      'example',
      { headers: { authorization: 'Custom test-header' } },
    )

    expect(
      new Headers(fetchMock.mock.calls[0][1].headers).get('authorization'),
    ).toBe('Custom test-header')
  })

  it('preserves FormData and handles no content', async () => {
    const form = new FormData()
    form.append('file', new Blob(['x']), 'x.txt')
    const fetchMock = vi.fn().mockResolvedValue(response(null, 204))
    vi.stubGlobal('fetch', fetchMock)

    await expect(new HttpClient().post('upload', form)).resolves.toBeUndefined()
    expect(fetchMock.mock.calls[0][1].body).toBe(form)
  })

  it.each([
    ['get', 'GET'],
    ['post', 'POST'],
    ['put', 'PUT'],
    ['patch', 'PATCH'],
    ['delete', 'DELETE'],
  ] as const)('uses %s requests', async (operation, method) => {
    const fetchMock = vi.fn().mockResolvedValue(response(null, 204))
    vi.stubGlobal('fetch', fetchMock)
    const client = new HttpClient()

    if (operation === 'get' || operation === 'delete')
      await client[operation]('example')
    else await client[operation]('example', { ok: true })

    expect(fetchMock.mock.calls[0][1].method).toBe(method)
  })

  it('returns non-JSON successful responses as text', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response('plain text')))

    await expect(new HttpClient().get('health')).resolves.toBe('plain text')
  })

  it('normalizes Problem Details with request IDs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        response(
          JSON.stringify({
            title: 'Request failed',
            detail: 'The requested operation failed.',
            status: 409,
            code: 'conflict',
          }),
          409,
          { 'x-request-id': 'request-123' },
        ),
      ),
    )

    await expect(new HttpClient().get('example')).rejects.toMatchObject({
      status: 409,
      message: 'The requested operation failed.',
      code: 'conflict',
      requestId: 'request-123',
    })
  })

  it('normalizes validation Problem Details', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        response(
          JSON.stringify({
            title: 'Validation failed',
            status: 400,
            errors: { name: ['Required'] },
          }),
          400,
        ),
      ),
    )

    await expect(new HttpClient().get('example')).rejects.toMatchObject({
      status: 400,
      fieldErrors: { name: ['Required'] },
    })
  })

  it('uses a generic mensaje error body when Problem Details is unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          response(JSON.stringify({ mensaje: 'Unavailable' }), 503),
        ),
    )

    await expect(new HttpClient().get('example')).rejects.toMatchObject({
      status: 503,
      message: 'Unavailable',
    })
  })

  it('reports network failures', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')))

    await expect(new HttpClient().get('example')).rejects.toMatchObject({
      kind: 'network',
      message: 'A network error occurred.',
    } satisfies Partial<ApiError>)
  })

  it('reports timeout cancellation', async () => {
    vi.useFakeTimers()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener('abort', () =>
              reject(new Error('aborted')),
            )
          }),
      ),
    )
    const request = new HttpClient().get('example', { timeoutMs: 1 })
    const expectation = expect(request).rejects.toMatchObject({
      kind: 'timeout',
    })

    await vi.advanceTimersByTimeAsync(1)

    await expectation
  })

  it('reports caller cancellation', async () => {
    const controller = new AbortController()
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url: string, init: RequestInit) =>
          new Promise((_resolve, reject) => {
            init.signal?.addEventListener('abort', () =>
              reject(new Error('aborted')),
            )
          }),
      ),
    )
    const request = new HttpClient().get('example', {
      signal: controller.signal,
    })
    const expectation = expect(request).rejects.toMatchObject({
      kind: 'aborted',
    })
    controller.abort()

    await expectation
  })
})
