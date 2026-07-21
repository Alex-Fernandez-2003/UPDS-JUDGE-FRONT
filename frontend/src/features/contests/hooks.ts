import { useQueries, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { listConcursos, listConcursosAdmin } from './service'
import type { ListConcursosParams, ListConcursosAdminParams } from './types'

export const concursosKeys = {
  all: ['concursos'] as const,
  list: (params: ListConcursosParams) => ['concursos', 'list', params] as const,
  admin: {
    all: ['concursos', 'admin'] as const,
    list: (params: ListConcursosAdminParams) =>
      ['concursos', 'admin', 'list', params] as const,
  },
}

export function useConcursosList(params: ListConcursosParams) {
  return useQuery({
    queryKey: concursosKeys.list(params),
    queryFn: () => listConcursos(params),
    placeholderData: (previous) => previous,
  })
}

/**
 * Hook para obtener la lista de concursos creados por el administrador.
 * Incluye resumen y paginación.
 */
export function useConcursosAdminList(params: ListConcursosAdminParams) {
  return useQuery({
    queryKey: concursosKeys.admin.list(params),
    queryFn: () => listConcursosAdmin(params),
    placeholderData: (previous) => previous,
  })
}

/**
 * Las tarjetas de resumen (Activos / Próximos / Finalizados / Total) no
 * tienen un endpoint de estadísticas propio. Se calculan pidiendo `total`
 * al mismo endpoint documentado, filtrando por cada `estadoTiempo` con
 * `tamanoPagina: 1`, en vez de inventar un endpoint nuevo o sumar solo la
 * página visible de la tabla.
 */
const summaryFilters = [
  { key: 'activos', label: 'Activos', filtro: 'Activo' },
  { key: 'proximos', label: 'Próximos', filtro: 'Proximo' },
  { key: 'finalizados', label: 'Finalizados', filtro: 'finalizados' },
] as const

export function useConcursosSummary() {
  const results = useQueries({
    queries: summaryFilters.map((entry) => ({
      queryKey: concursosKeys.list({
        filtro: entry.filtro,
        pagina: 1,
        tamanoPagina: 1,
      }),
      queryFn: () =>
        listConcursos({ filtro: entry.filtro, pagina: 1, tamanoPagina: 1 }),
    })),
  })

  return summaryFilters.map((entry, index) => ({
    key: entry.key,
    label: entry.label,
    value: results[index]?.data?.total,
    isLoading: results[index]?.isLoading ?? false,
    isError: results[index]?.isError ?? false,
  }))
}

/** Evita disparar una solicitud por cada tecla en el buscador. */
export function useDebouncedValue<T>(value: T, delayMs = 350) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}
