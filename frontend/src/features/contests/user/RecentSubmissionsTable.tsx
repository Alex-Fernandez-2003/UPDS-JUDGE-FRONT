import { Link } from 'react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/common'
import { DataTable } from '@/components/tables'
import { routes } from '@/routes/constants'
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
              'overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]',
            table: 'w-full text-sm border-collapse',
            thead: 'border-b border-[var(--border)] bg-[var(--surface-muted)]',
            headerCell:
              'px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--brand)]',
            row: 'border-b border-[var(--border)] transition-colors hover:bg-[var(--background)]/50 last:border-b-0',
            cell: 'px-5 py-4 align-middle text-center text-[var(--text-primary)]',
            loadingCell: 'px-5 py-6',
            emptyCell: 'px-6 py-12 text-center text-[var(--text-secondary)]',
            skeleton: 'h-8 w-full rounded-xl bg-[var(--surface-muted)]',
          }}
          columns={[
            {
              key: 'contestCode',
              header: 'CONCURSO',
              render: (row) => (
                <Link
                  to={routes.studentContestProblems(row.contestCode)}
                  className="inline-flex items-center gap-1 font-bold text-[var(--primary)] underline-offset-4 hover:underline hover:text-[var(--brand)] transition-colors"
                  title={`Ir al concurso ${row.contestCode}`}
                >
                  {row.contestCode}
                </Link>
              ),
            },
            {
              key: 'problemLabel',
              header: 'PROBLEMA',
              render: (row) => (
                <span className="inline-flex max-w-full items-center justify-center px-4 py-2 text-center text-xs font-bold text-[var(--text-primary)]">
                  {row.problemLabel}
                </span>
              ),
            },
            {
              key: 'language',
              header: 'LENGUAJE',
              render: (row) => (
                <span className="inline-flex max-w-full items-center justify-center rounded-full bg-[var(--surface-muted)] px-4 py-2 text-center text-xs font-bold text-[var(--text-secondary)]">
                  {row.language}
                </span>
              ),
            },
            {
              key: 'verdictLabel',
              header: 'VEREDICTO',
              render: (row) => (
                <Badge
                  tone={row.verdictTone}
                  className="justify-center font-bold"
                >
                  {row.verdictLabel}
                </Badge>
              ),
            },
            {
              key: 'timeLabel',
              header: 'TIEMPO',
              render: (row) => (
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  {row.timeLabel}
                </span>
              ),
            },
            {
              key: 'memoryLabel',
              header: 'MEMORIA',
              render: (row) => (
                <span className="font-mono text-xs text-[var(--text-secondary)]">
                  {row.memoryLabel}
                </span>
              ),
            },
            {
              key: 'submittedAtLabel',
              header: 'FECHA',
              render: (row) => (
                <span className="text-xs text-[var(--text-secondary)]">
                  {row.submittedAtLabel}
                </span>
              ),
            },
          ]}
        />
      </div>
      {page && totalPages && range && (
        <footer className="flex flex-col gap-3 px-4 py-4 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>{range}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Página anterior"
              disabled={page === 1}
              onClick={onPreviousPage}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="font-medium text-[var(--text-primary)]">
              Página {page} de {totalPages}
            </span>
            <button
              type="button"
              aria-label="Página siguiente"
              disabled={page === totalPages}
              onClick={onNextPage}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </footer>
      )}
    </>
  )
}
