import { Badge } from '@/components/common'
import { DataTable, type TableColumn } from '@/components/tables'
import {
  estadoTiempoAdminLabel,
  estadoTiempoAdminTone,
  formatDuracion,
  formatFechaHora,
  modalidadLabel,
} from '../format'
import type { ConcursoAdminItem } from '../types'

const columns: TableColumn<ConcursoAdminItem>[] = [
  {
    key: 'nombre',
    header: 'Concurso',
    render: (row) => (
      <div>
        <p className="font-semibold text-[var(--text-primary)]">{row.nombre}</p>
        <p className="text-xs text-[var(--text-secondary)]">{row.codigo}</p>
      </div>
    ),
  },
  {
    key: 'estadoTiempo',
    header: 'Estado',
    render: (row) => (
      <Badge tone={estadoTiempoAdminTone[row.estadoTiempo]}>
        {estadoTiempoAdminLabel[row.estadoTiempo]}
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
]

export function ContestsAdminTable({
  rows,
  loading,
  error,
}: {
  rows: ConcursoAdminItem[]
  loading?: boolean
  error?: string
}) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      loading={loading}
      error={error}
      emptyText="No hay concursos para los filtros seleccionados."
    />
  )
}
