import { ApiError, type FieldErrors } from './api-error'
type ProblemDetails = Record<string, unknown>
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')
export const isProblemDetails = (value: unknown): value is ProblemDetails =>
  typeof value === 'object' &&
  value !== null &&
  ('title' in value || 'detail' in value || 'status' in value)
export const toApiError = (
  problem: ProblemDetails,
  fallbackStatus: number,
  requestId?: string,
): ApiError => {
  const rawErrors = problem.errors
  const fieldErrors: FieldErrors | undefined =
    typeof rawErrors === 'object' && rawErrors !== null
      ? Object.fromEntries(
          Object.entries(rawErrors).filter(
            (entry): entry is [string, string[]] => isStringArray(entry[1]),
          ),
        )
      : undefined
  const message =
    typeof problem.detail === 'string'
      ? problem.detail
      : typeof problem.title === 'string'
        ? problem.title
        : 'The request could not be completed.'
  return new ApiError({
    message,
    status:
      typeof problem.status === 'number' ? problem.status : fallbackStatus,
    code: typeof problem.code === 'string' ? problem.code : undefined,
    fieldErrors,
    requestId:
      requestId ??
      (typeof problem.requestId === 'string'
        ? problem.requestId
        : typeof problem.traceId === 'string'
          ? problem.traceId
          : undefined),
  })
}
