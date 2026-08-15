import { useQuery } from '@tanstack/react-query'
import { getContestMetadata, type ContestMetadata } from './metadata-service'

export const contestMetadataKeys = {
  detail: (contestCode: string) => ['contest', 'metadata', contestCode] as const,
}

export function useContestMetadata(contestCode?: string) {
  return useQuery<ContestMetadata>({
    queryKey: contestMetadataKeys.detail(contestCode ?? ''),
    queryFn: () => getContestMetadata(contestCode!),
    enabled: Boolean(contestCode),
    staleTime: 5 * 60 * 1000,
  })
}