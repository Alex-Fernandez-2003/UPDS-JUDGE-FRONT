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
  problemCount: number // Cantidad de problemas configurados en el concurso
  loading?: boolean
  onProblemChange: (inciso: string) => void
  onPageChange: (page: number) => void
  onRefresh: () => void
}

const columns = [
  {
    key: 'fechaEnvio',
    header: 'FECHA',
    headerClassName:
      'w-[150px] text-center text-xs font-bold uppercase text-slate-500',
    cellClassName: 'px-4 py-4 text-center text-slate-600 whitespace-nowrap',
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
      'min-w-[250px] text-center text-xs font-bold uppercase text-slate-500',
    cellClassName: 'px-4 py-4 text-center',
    render: (row: SubmissionItem) => (
      <div className="flex flex-col items-center justify-center space-y-0.5">
        <p className="font-bold text-slate-900">
          {row.inciso} - {row.problemaTitulo}
        </p>
        <p className="text-xs font-medium text-slate-400">
          {row.concursoCodigo}
        </p>
      </div>
    ),
  },
  {
    key: 'lenguaje',
    header: 'LENGUAJE',
    headerClassName:
      'w-[140px] text-center text-xs font-bold uppercase text-slate-500',
    cellClassName: 'px-4 py-4 text-center',
    render: (row: SubmissionItem) => (
      <div className="flex justify-center">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
          {row.lenguaje}
        </span>
      </div>
    ),
  },
  {
    key: 'veredicto',
    header: 'VEREDICTO',
    headerClassName:
      'w-[200px] text-center text-xs font-bold uppercase text-slate-500',
    cellClassName: 'px-4 py-4 text-center',
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
      'w-[120px] text-center text-xs font-bold uppercase text-slate-500',
    cellClassName:
      'px-4 py-4 text-center font-bold text-slate-700 whitespace-nowrap',
    render: (row: SubmissionItem) => `${row.consumoTiempo} ms`,
  },
  {
    key: 'consumoMemoria',
    header: 'MEMORIA',
    headerClassName:
      'w-[120px] text-center text-xs font-bold uppercase text-slate-500',
    cellClassName:
      'px-4 py-4 text-center font-bold text-slate-700 whitespace-nowrap',
    render: (row: SubmissionItem) => `${row.consumoMemoria} KB`,
  },
]

export function SubmissionsTable({
  submissions,
  total,
  currentPage,
  totalPages,
  selectedProblem,
  problemCount,
  loading = false,
  onProblemChange,
  onPageChange,
  onRefresh,
}: Props) {
  // Generamos simplemente: [{ inciso: 'A', titulo: 'Problema A' }, { inciso: 'B', titulo: 'Problema B' }, ...]
  const generatedProblems = Array.from({ length: problemCount }, (_, i) => {
    const letter = String.fromCharCode(65 + i)
    return {
      inciso: letter,
      titulo: `Problema ${letter}`,
    }
  })

  return (
    <Card className="min-w-0 space-y-4 overflow-hidden">
      {/* Header de la Tabla */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Mis envíos
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Historial de soluciones enviadas al juez virtual
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <SubmissionsFilter
            value={selectedProblem}
            onChange={onProblemChange}
            problems={generatedProblems}
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

      <DataTable
        columns={columns}
        rows={submissions}
        loading={loading}
        emptyText="No tienes envíos registrados."
        classNames={{
          container:
            'overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white shadow-xs',
          table: 'w-full min-w-[900px] text-left text-sm',
          thead: 'bg-slate-50/80 border-b border-slate-200',
          headerCell:
            'px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500',
          tbody: 'bg-white',
          row: 'border-b border-slate-100/70 transition-colors duration-150 hover:bg-slate-50/60 last:border-b-0',
          cell: 'px-5 py-4 text-sm text-slate-700 align-middle',
          loadingCell: 'px-5 py-6',
          emptyCell: 'px-6 py-12 text-center',
          skeleton: 'h-8 w-full rounded-xl bg-slate-100',
        }}
      />

      <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--text-secondary)]">
          Mostrando{' '}
          <span className="font-medium text-[var(--text-primary)]">
            {submissions.length}
          </span>{' '}
          de{' '}
          <span className="font-medium text-[var(--text-primary)]">
            {total}
          </span>{' '}
          envíos
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
