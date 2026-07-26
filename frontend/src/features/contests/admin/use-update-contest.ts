import { useMutation } from '@tanstack/react-query'
import { updateContest } from './service'
import type { CreateContestFormValues } from './types'

export const useUpdateContestMutation = (codigo: string) =>
  useMutation({
    mutationFn: (values: Omit<CreateContestFormValues, 'codigo'>) =>
      updateContest(codigo, values),
  })
