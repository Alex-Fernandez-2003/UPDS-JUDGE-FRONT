import { QueryClient } from '@tanstack/react-query'
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: (count, error) =>
          !(
            error instanceof Error &&
            'status' in error &&
            typeof error.status === 'number' &&
            error.status < 500
          ) && count < 2,
        staleTime: 30000,
        gcTime: 300000,
      },
    },
  })
