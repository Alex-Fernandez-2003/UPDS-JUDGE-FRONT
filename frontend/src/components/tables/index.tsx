import type { ReactNode } from 'react'
import { Alert, EmptyState, Skeleton } from '@/components/common'
export type TableColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode
}
export function DataTable<T extends object>({
  columns,
  rows,
  loading,
  error,
  rowActions,
  emptyText = 'No data available.',
}: {
  columns: TableColumn<T>[]
  rows: T[]
  loading?: boolean
  error?: string
  rowActions?: (row: T) => ReactNode
  emptyText?: string
}) {
  if (error) return <Alert tone="danger">{error}</Alert>
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="border-b p-3">
                {column.header}
              </th>
            ))}
            {rowActions && <th className="border-b p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + Number(Boolean(rowActions))}
                className="p-3"
              >
                <Skeleton className="h-6" />
              </td>
            </tr>
          ) : rows.length ? (
            rows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={String(column.key)} className="border-b p-3">
                    {column.render
                      ? column.render(row)
                      : String(row[column.key as keyof T] ?? '')}
                  </td>
                ))}
                {rowActions && (
                  <td className="border-b p-3">{rowActions(row)}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + Number(Boolean(rowActions))}>
                <EmptyState title={emptyText} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
