import { Badge } from '@/components/common'
import { DataTable } from '@/components/tables'
import type { RecentSubmissionRow } from './types'

type Props = {
  rows: RecentSubmissionRow[]
  loading?: boolean
  error?: string
}

export function RecentSubmissionsTable({ rows, loading, error }: Props) {
  return (
    <DataTable
      rows={rows}
      loading={loading}
      error={error}
      emptyText="Todavía no tenés envíos recientes."
      className="mt-4"
      columns={[
        { key: 'id', header: 'ID' },
        { key: 'contestCode', header: 'CONCURSO' },
        { key: 'problemLabel', header: 'PROBLEMA' },
        { key: 'language', header: 'LENGUAJE' },
        {
          key: 'verdictLabel',
          header: 'VEREDICTO',
          render: (row) => (
            <Badge tone={row.verdictTone}>{row.verdictLabel}</Badge>
          ),
        },
        { key: 'timeLabel', header: 'TIEMPO' },
        { key: 'memoryLabel', header: 'MEMORIA' },
        { key: 'submittedAtLabel', header: 'FECHA' },
      ]}
    />
  )
}
