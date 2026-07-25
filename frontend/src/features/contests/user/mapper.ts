import type {
  RecentSubmissionRow,
  UserSubmissionDto,
  VerdictTone,
} from './types'

const unavailable = '—'

export const formatExecutionTime = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value)
    ? `${value} ms`
    : unavailable

export const formatMemoryUsage = (value: number | null | undefined) =>
  typeof value === 'number' && Number.isFinite(value)
    ? `${value} KB`
    : unavailable

export const formatSubmissionDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? unavailable
    : new Intl.DateTimeFormat('es-BO', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date)
}

export const mapSubmissionVerdict = (
  verdict: string,
): { label: string; tone: VerdictTone } => {
  const values: Record<string, { label: string; tone: VerdictTone }> = {
    Accepted: { label: 'ACCEPTED', tone: 'success' },
    'Wrong Answer': { label: 'WRONG ANSWER', tone: 'danger' },
    'Time Limit Exceeded': { label: 'TIME LIMIT EXCEEDED', tone: 'warning' },
    'Memory Limit Exceeded': {
      label: 'MEMORY LIMIT EXCEEDED',
      tone: 'warning',
    },
    'Compilation Error': { label: 'COMPILATION ERROR', tone: 'danger' },
    'Runtime Error': { label: 'RUNTIME ERROR', tone: 'danger' },
  }
  return values[verdict] ?? { label: verdict || unavailable, tone: 'neutral' }
}

export const mapSubmissionRow = (
  submission: UserSubmissionDto,
): RecentSubmissionRow => {
  const verdict = mapSubmissionVerdict(submission.veredicto)
  return {
    id: submission.idEnvio,
    contestCode: submission.concursoCodigo,
    problemLabel: [submission.inciso, submission.problemaTitulo]
      .filter(Boolean)
      .join(' · '),
    language: submission.lenguaje,
    verdictLabel: verdict.label,
    verdictTone: verdict.tone,
    timeLabel: formatExecutionTime(submission.consumoTiempo),
    memoryLabel: formatMemoryUsage(submission.consumoMemoria),
    submittedAtLabel: formatSubmissionDate(submission.fechaEnvio),
  }
}

export const formatPaginationMetadata = ({
  total,
  pagina,
  tamanoPagina,
  received,
}: {
  total: number
  pagina: number
  tamanoPagina: number
  received: number
}) => {
  if (total <= 0 || received <= 0) return '0 envíos'
  const start = (pagina - 1) * tamanoPagina + 1
  const end = Math.min(total, start + received - 1)
  return `Mostrando ${start}-${end} de ${total} envíos`
}
