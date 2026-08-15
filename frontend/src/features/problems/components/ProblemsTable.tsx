import { ExternalLink } from 'lucide-react'
import { Badge, Card, LinkButton } from '@/components/common'
import { DataTable } from '@/components/tables'
import { problemStatusPresentation } from '../problem-status'
import type { ContestProblem } from '../types'
export function ProblemsTable({
  problems,
  pdfUrl,
}: {
  problems: ContestProblem[]
  pdfUrl?: string | null
}) {
  return (
    <Card className="w-full overflow-hidden border-slate-200/80 p-0">
      <div className="flex flex-col gap-3 border-b border-slate-200/80 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex size-9 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <span
                data-testid="problems-header-icon"
                className="text-blue-700"
                aria-hidden="true"
              >
                👤
              </span>
            </span>
            Set de Problemas
          </h2>
          <p className="text-sm text-slate-600">
            Consultá los incisos disponibles y su progreso.
          </p>
        </div>
        {pdfUrl && (
          <LinkButton
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<ExternalLink className="size-4" />}
          >
            Ver PDF
          </LinkButton>
        )}
      </div>
      <div
        className="w-full overflow-x-auto"
        role="region"
        tabIndex={0}
        aria-label="Lista de problemas del concurso"
      >
        <DataTable
          rows={problems}
          emptyText="Este concurso todavía no tiene problemas disponibles."
          classNames={{
            container: 'w-full rounded-none border-0',
            table:
              'w-full min-w-[760px] table-fixed border-separate border-spacing-0 text-left text-sm',
            thead: 'border-b border-slate-200/80 bg-slate-50/80',
            headerCell:
              'border-slate-200/80 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500',
            row: 'border-b border-slate-100/80 transition-colors hover:bg-slate-50/60 last:border-b-0',
            cell: 'border-slate-100/80 px-5 py-4 align-middle text-slate-700',
            emptyCell: 'px-6 py-12 text-center',
          }}
          columns={[
            {
              key: 'inciso',
              header: 'TAG',
              render: (p) => (
                <span
                  data-testid="problem-tag-chip"
                  className="inline-flex rounded-md bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-700"
                >
                  {p.inciso || '—'}
                </span>
              ),
            },
            {
              key: 'titulo',
              header: 'PROBLEMA',
              render: (p) => (
                <span className="font-bold text-slate-900">
                  {p.titulo || '—'}
                </span>
              ),
            },
            {
              key: 'memoria',
              header: 'MEMORIA',
              render: (p) => p.memoria ?? '—',
            },
            { key: 'tiempo', header: 'TIEMPO', render: (p) => p.tiempo ?? '—' },
            {
              key: 'intentos',
              header: 'INTENTOS',
              render: (p) => p.intentos ?? '—',
            },
            {
              key: 'estado',
              header: 'ESTADO',
              render: (p) => {
                const status = problemStatusPresentation(p.estado)
                return (
                  <Badge tone={status.tone} className="font-bold">
                    {status.label}
                  </Badge>
                )
              },
            },
          ]}
        />
      </div>
    </Card>
  )
}
