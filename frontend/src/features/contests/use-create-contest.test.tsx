import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { CreateContestFormValues } from './types'

const { createContest } = vi.hoisted(() => ({ createContest: vi.fn() }))
vi.mock('./service', () => ({ createContest }))

import { useCreateContestMutation } from './use-create-contest'

const values: CreateContestFormValues = {
  nombre: 'Contest',
  descripcion: 'Description',
  fechaInicio: '2026-07-19T12:00',
  duracionMinutos: 60,
  contrasena: '',
  urlSetProblemas: 'https://example.test/problems',
  minutosCongelamiento: 0,
  codigo: 'C-1',
  listaProblemas: [{ titulo: 'Problem', tiempo: 1, memoria: 256 }],
  archivoZip: new File(['zip'], 'cases.zip'),
}

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      })
    }
  >
    {children}
  </QueryClientProvider>
)

describe('useCreateContestMutation', () => {
  it('delegates once to the creation service and exposes success and reset', async () => {
    createContest.mockResolvedValue({
      codigo: 'contest-demo',
      mensaje: 'Created',
    })
    const { result } = renderHook(() => useCreateContestMutation(), { wrapper })

    await act(async () => result.current.mutateAsync(values))

    expect(createContest).toHaveBeenCalledTimes(1)
    await waitFor(() =>
      expect(result.current.data).toEqual({
        codigo: 'contest-demo',
        mensaje: 'Created',
      }),
    )
    act(() => result.current.reset())
    await waitFor(() => expect(result.current.data).toBeUndefined())
  })
})
