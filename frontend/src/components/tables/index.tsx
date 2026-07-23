import type { ReactNode } from 'react'
import { Alert, EmptyState, Skeleton } from '@/components/common'

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
  classNames?: DataTableClassNames
}

const defaultClassNames: Required<DataTableClassNames> = {
  container:
    'overflow-x-auto rounded-lg border border-[var(--border)]',
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
  classNames,
}: DataTableProps<T>) {
  if (error) {
    return <Alert tone="danger">{error}</Alert>
  }

  const columnCount =
    columns.length + Number(Boolean(rowActions))

  return (
    <div
      className={
        classNames?.container ??
        defaultClassNames.container
      }
    >
      <table
        className={
          classNames?.table ??
          defaultClassNames.table
        }
      >
        <thead
          className={
            classNames?.thead ??
            defaultClassNames.thead
          }
        >
          <tr
            className={
              classNames?.headerRow ??
              defaultClassNames.headerRow
            }
          >
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={
                  column.headerClassName ??
                  classNames?.headerCell ??
                  defaultClassNames.headerCell
                }
              >
                {column.header}
              </th>
            ))}

            {rowActions && (
              <th
                className={
                  classNames?.actionsHeaderCell ??
                  defaultClassNames.actionsHeaderCell
                }
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody
          className={
            classNames?.tbody ??
            defaultClassNames.tbody
          }
        >
          {loading ? (
            <tr
              className={
                classNames?.row ??
                defaultClassNames.row
              }
            >
              <td
                colSpan={columnCount}
                className={
                  classNames?.loadingCell ??
                  defaultClassNames.loadingCell
                }
              >
                <Skeleton
                  className={
                    classNames?.skeleton ??
                    defaultClassNames.skeleton
                  }
                />
              </td>
            </tr>
          ) : rows.length ? (
            rows.map((row, index) => (
              <tr
                key={index}
                className={
                  classNames?.row ??
                  defaultClassNames.row
                }
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={
                      column.cellClassName ??
                      classNames?.cell ??
                      defaultClassNames.cell
                    }
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
                    className={
                      classNames?.actionsCell ??
                      defaultClassNames.actionsCell
                    }
                  >
                    {rowActions(row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr
              className={
                classNames?.row ??
                defaultClassNames.row
              }
            >
              <td
                colSpan={columnCount}
                className={
                  classNames?.emptyCell ??
                  defaultClassNames.emptyCell
                }
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