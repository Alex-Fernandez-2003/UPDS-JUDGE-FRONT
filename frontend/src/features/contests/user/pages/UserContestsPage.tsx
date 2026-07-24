import { useMemo, useState } from 'react'
import { Button, Card, LinkButton } from '@/components/common'
import { Breadcrumbs, Pagination } from '@/components/navigation'
import { ContestsFiltersBar } from '../../admin/components/ContestsFiltersBar'
import { UserContestsGrid } from '@/features/contests/user/components/UserContestsGrid'
import {
  useDebouncedValue,
  usePublicConcursosList,
} from '@/features/contests/hooks'
import type { ListConcursosParams } from '@/features/contests/types'
import { routes } from '@/routes/constants'

const PAGE_SIZE = 10

const initialFilters = {
  busqueda: '',
  filtro: 'todos' as const,
  modalidad: '',
}

export default function UserContestsPage() {
  const [filters, setFilters] = useState(initialFilters)
  const [page, setPage] = useState(1)
  const debouncedBusqueda = useDebouncedValue(filters.busqueda)

  const queryParams: ListConcursosParams = useMemo(
    () => ({
      filtro: filters.filtro === 'todos' ? undefined : filters.filtro,
      modalidad: filters.modalidad || undefined,
      busqueda: debouncedBusqueda || undefined,
      pagina: page,
      tamanoPagina: PAGE_SIZE,
    }),
    [filters.filtro, filters.modalidad, debouncedBusqueda, page],
  )

  const { data, isLoading, isFetching, error, refetch } =
    usePublicConcursosList(queryParams)

  const totalPages = data
    ? Math.max(1, Math.ceil(data.total / data.tamanoPagina))
    : 1

  const updateFilters = (next: typeof initialFilters) => {
    setFilters(next)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Breadcrumbs items={[{ label: 'Inicio' }, { label: 'Concursos' }]} />
          <h1 className="text-3xl font-bold">Concursos</h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Participa en competencias y pon a prueba tus habilidades.
          </p>
        </div>
        <LinkButton href={routes.studentHome} variant="outline">
          Mis registros
        </LinkButton>
      </div>

      <Card>
        <div className="space-y-4">
          <ContestsFiltersBar
            value={filters}
            showModalidad
            onChange={updateFilters}
            onClear={() => updateFilters(initialFilters)}
          />
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
            <span>
              ESTADO:{' '}
              {filters.filtro === 'todos'
                ? 'Todos los estados'
                : filters.filtro}
            </span>
            <span>
              MODALIDAD: {filters.modalidad || 'Todas las modalidades'}
            </span>
            <span>
              {data
                ? `Mostrando ${data.concursos.length} de ${data.total} concursos`
                : 'Cargando concursos...'}
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <UserContestsGrid
          rows={data?.concursos ?? []}
          loading={isLoading || isFetching}
        />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-sm text-[var(--text-secondary)]">
            {data ? `${data.total} concurso(s) encontrados` : ' '}
          </p>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
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
