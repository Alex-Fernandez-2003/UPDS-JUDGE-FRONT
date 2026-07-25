import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/common'
import { DataTable } from '@/components/tables'
import type { RecentSubmissionRow } from './types'

type Props = {
  rows: RecentSubmissionRow[]
  loading?: boolean
  error?: string
  page?: number
  totalPages?: number
  range?: string
  onPreviousPage?: () => void
  onNextPage?: () => void
}

export function RecentSubmissionsTable({
  rows,
  loading,
  error,
  page,
  totalPages,
  range,
  onPreviousPage,
  onNextPage,
}: Props) {
  return (
    <>
      <div className="px-4 pt-4 sm:px-6">
        <DataTable
          rows={rows}
          loading={loading}
          error={error}
          emptyText="Todavía no tenés envíos recientes."
          classNames={{
            container:
              'overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs',
            table: 'min-w-[900px] text-sm',
            thead: 'border-b border-slate-200 bg-slate-50/80',
            headerCell:
              'px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-slate-500',
            row: 'border-b border-slate-100/70 transition-colors hover:bg-slate-50/60 last:border-b-0',
            cell: 'px-5 py-4 align-middle text-center text-slate-700',
            loadingCell: 'px-5 py-6',
            emptyCell: 'px-6 py-12 text-center',
            skeleton: 'h-8 w-full rounded-xl bg-slate-100',
          }}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'contestCode', header: 'CONCURSO' },
            {
              key: 'problemLabel', header: 'PROBLEMA', render: (row) => (
                <span className="inline-flex max-w-full items-center justify-center px-4 py-2 text-center text-xs font-bold">
                  {row.problemLabel}
                </span>
              ),
            },
            {
              key: 'language',
              header: 'LENGUAJE',
              render: (row) => (
                <span className="inline-flex max-w-full items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-center text-xs font-bold text-slate-700">
                  {row.language}
                </span>
              ),
            },
            {
              key: 'verdictLabel',
              header: 'VEREDICTO',
              render: (row) => (
                <Badge tone={row.verdictTone} className="justify-center font-bold">
                  {row.verdictLabel}
                </Badge>
              ),
            },
            { key: 'timeLabel', header: 'TIEMPO' },
            { key: 'memoryLabel', header: 'MEMORIA' },
            { key: 'submittedAtLabel', header: 'FECHA' },
          ]}
        />
      </div>
      {page && totalPages && range && (
        <footer className="flex flex-col gap-3 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>{range}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Página anterior"
              disabled={page === 1}
              onClick={onPreviousPage}
              className="inline-flex size-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              aria-label="Página siguiente"
              disabled={page === totalPages}
              onClick={onNextPage}
              className="cursor-pointer inline-flex size-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </footer>
      )}
    </>
  )
}
