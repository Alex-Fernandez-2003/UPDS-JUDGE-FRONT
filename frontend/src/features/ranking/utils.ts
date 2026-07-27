export const PAGE_SIZE = 5
export const clampPage = (page: number, total: number) =>
  Math.min(Math.max(1, page), Math.max(1, Math.ceil(total / PAGE_SIZE)))
export const pageRows = <T>(rows: T[], page: number) =>
  rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
export const formatRemaining = (endsAt?: string | null, now = Date.now()) => {
  const ms = endsAt ? Math.max(0, new Date(endsAt).getTime() - now) : 0
  if (!Number.isFinite(ms)) return '—'
  const seconds = Math.floor(ms / 1000)
  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}
