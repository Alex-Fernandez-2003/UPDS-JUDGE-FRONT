import { useMemo, useState } from 'react'
import { Alert, Button, Card, LinkButton } from '@/components/common'
import { Pagination } from '@/components/navigation'
import { ApiError } from '@/lib/api'
import { routes } from '@/routes/constants'
import {
  ContestsFiltersBar,
  type ContestsFiltersValue,
} from './components/ContestsFiltersBar'
import { ContestsAdminTable } from './components/ContestsAdminTable'
import { useConcursosList, useDebouncedValue } from './hooks'
import type { ListConcursosParams } from './types'

const PAGE_SIZE = 10

const initialFilters: ContestsFiltersValue = {
  busqueda: '',
  filtro: 'todos',
}

const errorMessage = (error: unknown) =>
  error instanceof ApiError
    ? error.message
    : 'No se pudieron cargar los concursos. Intentá de nuevo.'

export function ContestsAdminScreen() {
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)
  const debouncedBusqueda = useDebouncedValue(filters.busqueda)

  const queryParams: ListConcursosParams = useMemo(
    () => ({
      filtro: filters.filtro === 'todos' ? undefined : filters.filtro,
      busqueda: debouncedBusqueda || undefined,
      pagina: page,
      tamanoPagina: PAGE_SIZE,
    }),
    [filters.filtro, debouncedBusqueda, page],
  )

  const { data, isLoading, isFetching, error, refetch } =
    useConcursosList(queryParams)

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.tamanoPagina))
    : 1

  const updateFilters = (next: ContestsFiltersValue) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Administración de concursos</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Crea y gestiona tus concursos.
          </p>
        </div>
        <LinkButton href={routes.newContest} variant="primary">
          Nuevo concurso
        </LinkButton>
      </div>

      <Card>
        <div className="space-y-4">
          <ContestsFiltersBar
            value={filters}
            onChange={updateFilters}
            onClear={() => updateFilters(initialFilters)}
          />

          {error ? (
            <Alert tone="danger">
              {errorMessage(error)}{' '}
              <button
                type="button"
                className="font-semibold underline"
                onClick={() => refetch()}
              >
                Reintentar
              </button>
            </Alert>
          ) : (
            <>
              <ContestsAdminTable
                rows={data?.concursos ?? []}
                loading={isLoading || isFetching}
              />

              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--text-secondary)]">
                  {data ? `${data.total} concurso(s) encontrados` : ' '}
                </p>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="ghost" onClick={() => refetch()} disabled={isFetching}>
          Actualizar listado
        </Button>
      </div>
    </div>
  )
}
