import { Pencil, Palette } from 'lucide-react'
import { useRef, useState } from 'react'
import { Badge, IconButton } from '@/components/common'
import { DataTable, type TableColumn } from '@/components/tables'
import { BalloonColorsModal } from '../BalloonColorsModal'
import {
  estadoTiempoLabel,
  estadoTiempoTone,
  formatDuracion,
  formatFechaHora,
  modalidadLabel,
} from '../format'
import type { ConcursoListItem } from '../types'

export function ContestsAdminTable({
  rows,
  loading,
  error,
  onEdit,
}: {
  rows: ConcursoListItem[]
  loading?: boolean
  error?: string
  onEdit: (contestCode: string) => void
}) {
  const [selected, setSelected] = useState<ConcursoListItem>()
  const trigger = useRef<HTMLButtonElement>(null)
  const columns: TableColumn<ConcursoListItem>[] = [
    {
      key: 'nombre',
      header: 'Concurso',
      render: (row) => (
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {row.nombre}
          </p>
          <p className="text-xs text-[var(--text-secondary)]">{row.codigo}</p>
        </div>
      ),
    },
    {
      key: 'estadoTiempo',
      header: 'Estado',
      render: (row) => (
        <Badge tone={estadoTiempoTone[row.estadoTiempo]}>
          {estadoTiempoLabel[row.estadoTiempo]}
        </Badge>
      ),
    },
    {
      key: 'fechaInicio',
      header: 'Inicio',
      render: (row) => formatFechaHora(row.fechaInicio),
    },
    {
      key: 'duracionMinutos',
      header: 'Duración',
      render: (row) => formatDuracion(row.duracionMinutos),
    },
    { key: 'cantidadProblemas', header: 'Problemas' },
    { key: 'cantidadParticipantes', header: 'Participantes' },
    {
      key: 'modalidad',
      header: 'Visibilidad',
      render: (row) => <Badge>{modalidadLabel[row.modalidad]}</Badge>,
    },
    {
      key: 'codigo',
      header: 'Código Concurso',
      render: (row) => (
        <span className="font-mono text-sm text-[var(--text-secondary)]">
          {row.codigo}
        </span>
      ),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (row) => (
        <div className="flex gap-1">
          <IconButton
            label={`Editar concurso ${row.codigo}`}
            title="Editar concurso"
            disabled={row.estadoTiempo !== 'Proximo'}
            className="border border-[var(--border)] text-[var(--text-secondary)] transition-colors enabled:hover:bg-[var(--surface-muted)] enabled:hover:text-[var(--primary)] disabled:hover:bg-transparent"
            onClick={() => onEdit(row.codigo)}
          >
            <Pencil className="size-4" aria-hidden="true" />
          </IconButton>
          <IconButton
            ref={trigger}
            label={`Ver colores de globos de ${row.codigo}`}
            title="Ver colores de globos"
            className="border border-[var(--border)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--primary)]"
            onClick={() => setSelected(row)}
          >
            <Palette className="size-4" aria-hidden="true" />
          </IconButton>
        </div>
      ),
    },
  ]
  return (
    <>
      {selected && (
        <BalloonColorsModal
          contest={selected}
          onClose={() => setSelected(undefined)}
          returnFocus={() => trigger.current?.focus()}
        />
      )}
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        emptyText="No hay concursos para los filtros seleccionados."
      />
    </>
  )
}
