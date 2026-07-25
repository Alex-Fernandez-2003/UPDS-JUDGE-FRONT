import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getConcursosAdminResumen, listConcursos } from './service'
import type { ListConcursosParams } from './types'

export const concursosKeys = {
  all: ['concursos'] as const,
  adminList: (params: ListConcursosParams) =>
    [
      'concursos',
      'admin-list',
      params.filtro,
      params.modalidad,
      params.busqueda,
      params.pagina,
      params.tamanoPagina,
    ] as const,
  adminSummary: () => ['concursos', 'admin-summary'] as const,
}

export function useConcursosList(params: ListConcursosParams) {
  return useQuery({
    queryKey: concursosKeys.adminList(params),
    queryFn: () => listConcursos(params),
    placeholderData: (previous) => previous,
  })
}

export function useConcursosAdminResumen() {
  return useQuery({
    queryKey: concursosKeys.adminSummary(),
    queryFn: getConcursosAdminResumen,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
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
