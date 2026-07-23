import { RotateCw } from 'lucide-react'
import { Button, Card } from '@/components/common'
import { DataTable } from '@/components/tables'
import { Pagination } from '@/components/navigation'

import type { SubmissionItem } from '../Types/submissionTypes'
import { SubmissionsFilter } from './submissionsFilter'
import { VerdictBadge } from './verdictBadge'

interface Props {
  submissions: SubmissionItem[]
  total: number
  currentPage: number
  totalPages: number
  selectedProblem: string
  availableProblems: { inciso: string; titulo: string }[]
  loading?: boolean
  onProblemChange: (inciso: string) => void
  onPageChange: (page: number) => void
  onRefresh: () => void
}

export function SubmissionsTable({
  submissions,
  total,
  currentPage,
  totalPages,
  selectedProblem,
  availableProblems,
  loading = false,
  onProblemChange,
  onPageChange,
  onRefresh,
}: Props) {
  const columns = [
  {
    key: 'fechaEnvio',
    header: 'FECHA',
    headerClassName:
    'w-[150px] border-b border-slate-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500',
    cellClassName:
    'px-4 py-4 align-middle whitespace-nowrap text-center text-slate-600',
    render: (row: SubmissionItem) =>
      new Date(row.fechaEnvio).toLocaleString('es-BO', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
  },
  {
    key: 'problema',
    header: 'PROBLEMA',
    headerClassName:
      'min-w-[280px] border-b border-slate-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500',

    cellClassName: 'px-4 py-4 align-middle text-center',

    render: (row: SubmissionItem) => (
      <div className="flex flex-col items-center justify-center space-y-1">
        <p className="font-semibold text-slate-900">
          {row.inciso} - {row.problemaTitulo}
        </p>

        <p className="text-xs font-medium text-slate-500">
          {row.concursoCodigo}
        </p>
      </div>
    ),
  },
  {
    key: 'lenguaje',
    header: 'LENGUAJE',
      headerClassName:
      'w-[140px] border-b border-slate-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500',

    cellClassName: 'px-4 py-4 align-middle text-center',

    render: (row: SubmissionItem) => (
      <div className="flex justify-center">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {row.lenguaje}
        </span>
      </div>
    ),
  },
  {
    key: 'veredicto',
    header: 'VEREDICTO',
    headerClassName:
      'w-[220px] border-b border-slate-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500',
    cellClassName: 'px-4 py-4 align-middle text-center',
    render: (row: SubmissionItem) => (
      <div className="flex justify-center">
        <VerdictBadge verdict={row.veredicto} />
      </div>
    ),
  },
  {
    key: 'consumoTiempo',
    header: 'TIEMPO',
    headerClassName:
    'w-[120px] border-b border-slate-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500',
    cellClassName:
    'px-4 py-4 align-middle whitespace-nowrap text-center font-semibold text-slate-700',
    render: (row: SubmissionItem) => `${row.consumoTiempo} ms`,
  },
  {
    key: 'consumoMemoria',
    header: 'MEMORIA',
    headerClassName:
    'w-[120px] border-b border-slate-200 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500',
    cellClassName:
    'px-4 py-4 align-middle whitespace-nowrap text-center font-semibold text-slate-700',
    render: (row: SubmissionItem) => `${row.consumoMemoria} KB`,
  },
]

  return (
    <Card className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Mis envíos
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Historial de soluciones enviadas al juez virtual
          </p>
        </div>

        <div className="flex items-center gap-2">
          <SubmissionsFilter
            value={selectedProblem}
            onChange={onProblemChange}
            problems={availableProblems}
          />

          <Button
            variant="secondary"
            size="sm"
            loading={loading}
            leftIcon={<RotateCw className="size-4" />}
            onClick={onRefresh}
          >
            Actualizar
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <DataTable
      columns={columns}
      rows={submissions}
      loading={loading}
      emptyText="No tienes envíos registrados."
      classNames={{
        container:
          'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',

        table: 'min-w-full border-collapse text-sm',

        thead: 'bg-slate-50/80',

        tbody: 'divide-y divide-slate-100',

        row: 'transition-colors duration-150 hover:bg-slate-50/70',

        loadingCell: 'px-4 py-6',

        emptyCell: 'px-6 py-12',

        skeleton: 'h-8 w-full rounded-xl',
      }}
    />

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Mostrando <span className="font-medium text-[var(--text-primary)]">{submissions.length}</span> de <span className="font-medium text-[var(--text-primary)]">{total}</span> envíos
        </p>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </Card>
  )
}