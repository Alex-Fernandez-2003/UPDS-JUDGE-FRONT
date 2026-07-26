import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/common'
import { Breadcrumbs } from '@/components/navigation'
import { routes } from '@/routes/constants'
import { ContestsAdminTable } from '../components/ContestsAdminTable'
import {
  ContestsFiltersBar,
  type ContestsFiltersValue,
} from '../components/ContestsFiltersBar'
import { ContestsSummaryCards } from '../components/ContestsSummaryCards'
import { getConcursosAdminResumen, listConcursos } from '../service'
import type { ListConcursosParams } from '../types'

const DEFAULT_FILTERS: ContestsFiltersValue = {
  busqueda: '',
  filtro: 'todos',
  modalidad: '',
}

const PAGE_SIZE = 10

export default function AdminContestsPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<ContestsFiltersValue>(DEFAULT_FILTERS)
  const [pagina, setPagina] = useState(1)

  const params: ListConcursosParams = {
    filtro: filters.filtro,
    modalidad: filters.modalidad || undefined,
    busqueda: filters.busqueda || undefined,
    pagina,
    tamanoPagina: PAGE_SIZE,
  }

  const listQuery = useQuery({
    queryKey: ['admin-concursos', params],
    queryFn: () => listConcursos(params),
  })

  const resumenQuery = useQuery({
    queryKey: ['admin-concursos-resumen'],
    queryFn: getConcursosAdminResumen,
  })

  const handleFiltersChange = (next: ContestsFiltersValue) => {
    setFilters(next)
    setPagina(1)
  }

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS)
    setPagina(1)
  }

  const total = listQuery.data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Breadcrumbs
        items={[{ label: 'Administración' }, { label: 'Concursos' }]}
      />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Administración de concursos</h1>
          <p className="mt-1 text-[var(--text-secondary)]">
            Creá y gestioná tus concursos.
          </p>
        </div>
        <Button onClick={() => navigate(routes.newContest)}>
          Nuevo concurso
        </Button>
      </header>

      <ContestsSummaryCards
        resumen={resumenQuery.data}
        error={
          resumenQuery.error instanceof Error
            ? resumenQuery.error.message
            : undefined
        }
        isLoading={resumenQuery.isLoading}
        isRefreshing={resumenQuery.isFetching && !resumenQuery.isLoading}
      />

      <ContestsFiltersBar
        value={filters}
        onChange={handleFiltersChange}
        onClear={handleClearFilters}
      />

      <ContestsAdminTable
        rows={listQuery.data?.concursos ?? []}
        loading={listQuery.isLoading}
        error={
          listQuery.error instanceof Error ? listQuery.error.message : undefined
        }
        onEdit={(row) => navigate(routes.editContest(row.codigo))}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-[var(--text-secondary)]">
          {total} concurso(s) encontrados
        </span>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pagina <= 1}
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
          >
            Anterior
          </Button>
          <span className="text-sm text-[var(--text-secondary)]">
            Página {pagina} de {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pagina >= totalPages}
            onClick={() => setPagina((p) => Math.min(totalPages, p + 1))}
          >
            Siguiente
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => listQuery.refetch()}
          >
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  )
}
