import { useQuery } from '@tanstack/react-query'
import { getUserContestStats, listUserSubmissions } from './service'
import type { UserSubmissionsParams } from './types'

export const userContestKeys = {
  all: ['user-contests'] as const,
  stats: () => ['user-contests', 'stats'] as const,
  submissions: (params: UserSubmissionsParams) =>
    [
      'user-contests',
      'submissions',
      params.resultado,
      params.concursoCodigo,
      params.inciso,
      params.pagina,
      params.tamanoPagina,
    ] as const,
}

export const useUserContestStats = () =>
  useQuery({ queryKey: userContestKeys.stats(), queryFn: getUserContestStats })

export const useUserSubmissions = (params: UserSubmissionsParams) =>
  useQuery({
    queryKey: userContestKeys.submissions(params),
    queryFn: () => listUserSubmissions(params),
    placeholderData: (previous) => previous,
  })
