import { Badge } from '@/components/common'
import { DataTable, type TableColumn } from '@/components/tables'
import {
  estadoTiempoLabel,
  estadoTiempoTone,
  formatDuracion,
  formatFechaHora,
  modalidadLabel,
} from '../format'
import type { ConcursoListItem } from '../types'

const columns: TableColumn<ConcursoListItem>[] = [
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
      <Badge tone={estadoTiempoTone[row.estadoTiempo]}>
        {estadoTiempoLabel[row.estadoTiempo]}
      </Badge>
    ),
  },
  {
    key: 'modalidad',
    header: 'Visibilidad',
    render: (row) => <Badge>{modalidadLabel[row.modalidad]}</Badge>,
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
    key: 'yaInscrito',
    header: 'Inscripción',
    render: (row) =>
      row.yaInscrito ? (
        <Badge tone="success">Inscrito</Badge>
      ) : (
        <Badge>No inscrito</Badge>
      ),
  },
]

export function ContestsTable({
  rows,
  loading,
  error,
}: {
  rows: ConcursoListItem[]
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
