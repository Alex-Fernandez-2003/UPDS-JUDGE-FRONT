import { useMutation } from '@tanstack/react-query'
import { createContest } from './service'

export const useCreateContestMutation = () =>
  useMutation({ mutationFn: createContest })
