import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  getConcursosAdminResumen,
  getEditableContest,
  listConcursos,
  updateContest,
} from './service'
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
  editable: (contestCode: string) =>
    ['concursos', 'editable', contestCode] as const,
}

export function useConcursosList(params: ListConcursosParams) {
  return useQuery({
    queryKey: concursosKeys.adminList(params),
    queryFn: () => listConcursos(params),
    placeholderData: (previous) => previous,
  })
}

export function useEditableContest(contestCode: string | undefined) {
  return useQuery({
    queryKey: concursosKeys.editable(contestCode ?? ''),
    queryFn: () => getEditableContest(contestCode!),
    enabled: Boolean(contestCode?.trim()),
  })
}

export function useUpdateContestMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateContest,
    onSuccess: (_data, variables) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: concursosKeys.all }),
        queryClient.invalidateQueries({
          queryKey: concursosKeys.editable(variables.contestCode),
        }),
      ]),
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
