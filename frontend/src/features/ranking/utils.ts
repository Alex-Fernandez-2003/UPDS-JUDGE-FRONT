export { formatRemaining } from '@/features/contests/time'

export const PAGE_SIZE = 5
export const clampPage = (page: number, total: number) =>
  Math.min(Math.max(1, page), Math.max(1, Math.ceil(total / PAGE_SIZE)))
export const pageRows = <T>(rows: T[], page: number) =>
  rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
