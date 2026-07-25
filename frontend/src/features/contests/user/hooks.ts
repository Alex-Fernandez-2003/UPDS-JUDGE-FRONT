import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getUserContestStats,
  joinContest,
  listUserSubmissions,
} from './service'
import type { JoinContestRequest, UserSubmissionsParams } from './types'

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

export const useJoinContest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['user-contests', 'join'],
    mutationFn: (request: JoinContestRequest) => joinContest(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['concursos', 'public-list'] }),
  })
}

export const useUserSubmissions = (params: UserSubmissionsParams) =>
  useQuery({
    queryKey: userContestKeys.submissions(params),
    queryFn: () => listUserSubmissions(params),
    placeholderData: (previous) => previous,
  })
