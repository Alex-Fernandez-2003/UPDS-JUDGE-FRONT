import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listPublicConcursos } from './user/service'
import type { ListConcursosParams, ListConcursosResponse } from './types'

export const concursosKeys = {
  publicList: (params: ListConcursosParams) =>
    [
      'concursos',
      'public-list',
      params.filtro,
      params.modalidad,
      params.busqueda,
      params.pagina,
      params.tamanoPagina,
    ] as const,
}

export function useDebouncedValue<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delayMs)

    return () => window.clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}

export function usePublicConcursosList(params: ListConcursosParams) {
  return useQuery<ListConcursosResponse>({
    queryKey: concursosKeys.publicList(params),
    queryFn: () => listPublicConcursos(params),
    placeholderData: (previous) => previous,
  })
}
