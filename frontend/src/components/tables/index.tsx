import type { ReactNode } from 'react'
import { Alert, EmptyState, Skeleton } from '@/components/common'
import { cn } from '@/lib/utils/cn'

export type TableColumn<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => ReactNode

  /**
   * Estilos específicos para esta columna.
   * Tienen prioridad sobre los estilos generales.
   */
  headerClassName?: string
  cellClassName?: string
}

export type DataTableClassNames = {
  container?: string
  table?: string
  thead?: string
  headerRow?: string
  headerCell?: string
  actionsHeaderCell?: string
  tbody?: string
  row?: string
  cell?: string
  actionsCell?: string
  loadingCell?: string
  emptyCell?: string
  skeleton?: string
}

export type DataTableProps<T extends object> = {
  columns: TableColumn<T>[]
  rows: T[]
  loading?: boolean
  error?: string
  rowActions?: (row: T) => ReactNode
  emptyText?: string

  /**
   * Permite reemplazar los estilos predeterminados
   * de partes específicas de la tabla.
   */
  className?: string
  classNames?: DataTableClassNames
}

const defaultClassNames: Required<DataTableClassNames> = {
  container: 'overflow-x-auto rounded-lg border border-[var(--border)]',
  table: 'min-w-full text-left text-sm',
  thead: '',
  headerRow: '',
  headerCell: 'border-b p-3',
  actionsHeaderCell: 'border-b p-3',
  tbody: '',
  row: '',
  cell: 'border-b p-3',
  actionsCell: 'border-b p-3',
  loadingCell: 'p-3',
  emptyCell: '',
  skeleton: 'h-6',
}

export function DataTable<T extends object>({
  columns,
  rows,
  loading,
  error,
  rowActions,
  emptyText = 'No data available.',
  className,
  classNames,
}: DataTableProps<T>) {
  if (error) {
    return <Alert tone="danger">{error}</Alert>
  }

  const columnCount = columns.length + Number(Boolean(rowActions))

  return (
    <div
      className={cn(
        defaultClassNames.container,
        className,
        classNames?.container,
      )}
    >
      <table className={cn(defaultClassNames.table, classNames?.table)}>
        <thead className={cn(defaultClassNames.thead, classNames?.thead)}>
          <tr
            className={cn(defaultClassNames.headerRow, classNames?.headerRow)}
          >
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn(
                  defaultClassNames.headerCell,
                  classNames?.headerCell,
                  column.headerClassName,
                )}
              >
                {column.header}
              </th>
            ))}

            {rowActions && (
              <th
                className={cn(
                  defaultClassNames.actionsHeaderCell,
                  classNames?.actionsHeaderCell,
                )}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className={cn(defaultClassNames.tbody, classNames?.tbody)}>
          {loading ? (
            <tr className={cn(defaultClassNames.row, classNames?.row)}>
              <td
                colSpan={columnCount}
                className={cn(
                  defaultClassNames.loadingCell,
                  classNames?.loadingCell,
                )}
              >
                <Skeleton
                  className={cn(
                    defaultClassNames.skeleton,
                    classNames?.skeleton,
                  )}
                />
              </td>
            </tr>
          ) : rows.length ? (
            rows.map((row, index) => (
              <tr
                key={index}
                className={cn(defaultClassNames.row, classNames?.row)}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={cn(
                      defaultClassNames.cell,
                      classNames?.cell,
                      column.cellClassName,
                    )}
                  >
                    {column.render
                      ? column.render(row)
                      : String(
                        row[column.key as keyof T] ??
                        '',
                      )}
                  </td>
                ))}

                {rowActions && (
                  <td
                    className={cn(
                      defaultClassNames.actionsCell,
                      classNames?.actionsCell,
                    )}
                  >
                    {rowActions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr className={cn(defaultClassNames.row, classNames?.row)}>
              <td
                colSpan={columnCount}
                className={cn(
                  defaultClassNames.emptyCell,
                  classNames?.emptyCell,
                )}
              >
                <EmptyState title={emptyText} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}