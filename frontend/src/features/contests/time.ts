const unavailable = 'No disponible'

const contestTimeFormatter = new Intl.DateTimeFormat('es-BO', {
  hour: '2-digit',
  minute: '2-digit',
})

export const toValidContestDate = (value?: string | Date | null) => {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const formatDurationMinutes = (totalMinutes: number) => {
  const roundedMinutes = Math.round(totalMinutes)
  if (roundedMinutes <= 0) return unavailable

  const days = Math.floor(roundedMinutes / 1_440)
  const hours = Math.floor((roundedMinutes % 1_440) / 60)
  const minutes = roundedMinutes % 60
  return [
    days > 0 ? `${days} d` : '',
    hours > 0 ? `${hours} h` : '',
    minutes > 0 ? `${minutes} min` : '',
  ]
    .filter(Boolean)
    .join(' ')
}

export const formatContestDuration = (
  startsAt?: string | null,
  endsAt?: string | null,
  durationMinutes?: number | null,
) => {
  if (durationMinutes != null) {
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0)
      return unavailable
    return formatDurationMinutes(durationMinutes)
  }

  const start = toValidContestDate(startsAt)
  const end = toValidContestDate(endsAt)
  if (!start || !end || end <= start) return unavailable

  return formatDurationMinutes((end.getTime() - start.getTime()) / 60_000)
}

export const formatRemaining = (
  endsAt?: string | Date | null,
  now = Date.now(),
) => {
  const endTime = toValidContestDate(endsAt)?.getTime()
  const milliseconds = endTime == null ? 0 : Math.max(0, endTime - now)
  if (!Number.isFinite(milliseconds) || (endsAt && endTime == null)) return '—'

  const seconds = Math.floor(milliseconds / 1_000)
  return [
    Math.floor(seconds / 3_600),
    Math.floor((seconds % 3_600) / 60),
    seconds % 60,
  ]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

export const formatContestTimeRange = (
  startsAt?: string | null,
  endsAt?: string | null,
) => {
  const start = toValidContestDate(startsAt)
  const end = toValidContestDate(endsAt)
  if (!start || !end || end <= start) return unavailable

  return `${contestTimeFormatter.format(start)} – ${contestTimeFormatter.format(end)}`
}
