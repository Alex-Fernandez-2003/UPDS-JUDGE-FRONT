export type FieldErrors = Record<string, string[]>
export class ApiError extends Error {
  readonly status?: number
  readonly code?: string
  readonly fieldErrors?: FieldErrors
  readonly requestId?: string
  readonly kind: 'http' | 'network' | 'timeout' | 'aborted'
  constructor(options: {
    message: string
    status?: number
    code?: string
    fieldErrors?: FieldErrors
    requestId?: string
    kind?: ApiError['kind']
  }) {
    super(options.message)
    this.name = 'ApiError'
    this.status = options.status
    this.code = options.code
    this.fieldErrors = options.fieldErrors
    this.requestId = options.requestId
    this.kind = options.kind ?? 'http'
  }
}
