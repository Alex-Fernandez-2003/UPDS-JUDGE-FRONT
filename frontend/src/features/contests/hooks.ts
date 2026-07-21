import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { listConcursos } from './service'
import type { ListConcursosParams } from './types'

export const concursosKeys = {
  all: ['concursos'] as const,
  list: (params: ListConcursosParams) => ['concursos', 'list', params] as const,
}

export function useConcursosList(params: ListConcursosParams) {
  return useQuery({
    queryKey: concursosKeys.list(params),
    queryFn: () => listConcursos(params),
    placeholderData: (previous) => previous,
  })
}

export function useDebouncedValue<T>(value: T, delayMs = 350) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}
