import type { ContestProblemForm } from './types'

export const MAX_CONTEST_ZIP_SIZE_BYTES = 100 * 1024 * 1024
export const MAX_CONTEST_PROBLEMS = 12

export const CONTEST_CODE_CHARACTER_CATEGORIES = {
  lowercaseLetters: 'a-z',
  digits: '0-9',
  separator: '-',
} as const
export const CONTEST_CODE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const CONTEST_CODE_ERROR =
  'El código debe usar letras minúsculas, números y guiones simples.'
export const CONTEST_CODE_HINT =
  'Usá letras minúsculas, números y guiones simples (ej.: regional-2026).'

export const newContestProblem = (): ContestProblemForm => ({
  titulo: '',
  tiempo: 1,
  memoria: 256,
})

export const normalizeContestPassword = (
  value: string | null | undefined,
): string => (typeof value === 'string' ? value.trim() : '')

export const normalizeContestCode = (
  value: string | null | undefined,
): string => (typeof value === 'string' ? value.trim().toLowerCase() : '')

export const getContestZipError = (file?: File) => {
  if (!file) return undefined
  if (!file.name.toLowerCase().endsWith('.zip')) {
    return 'El archivo debe tener extensión .zip.'
  }
  if (file.size > MAX_CONTEST_ZIP_SIZE_BYTES) {
    return 'El ZIP no puede superar 100 MB.'
  }
  return undefined
}
