import { ClipboardList } from 'lucide-react'
import { Badge, Card, Divider } from '@/components/common'
import { problemLetter, type CreateContestFormValues } from './types'

type Props = {
  values: Partial<CreateContestFormValues>
}

const empty = 'Sin definir'

export function CreateContestSummary({ values }: Props) {
  const problems = values.listaProblemas ?? []
  const modality = values.contrasena?.trim() ? 'Privado' : 'Público'
  const rows = [
    ['Nombre', values.nombre?.trim() || empty],
    ['Código', values.codigo?.trim() || empty],
    ['Inicio', values.fechaInicio || empty],
    [
      'Duración',
      values.duracionMinutos ? `${values.duracionMinutos} minutos` : empty,
    ],
    [
      'Congelamiento',
      typeof values.minutosCongelamiento === 'number'
        ? `${values.minutosCongelamiento} minutos`
        : empty,
    ],
    [
      'Problemas',
      `${problems.length} ${problems.length === 1 ? 'problema' : 'problemas'}`,
    ],
    [
      'Incisos',
      problems.length
        ? problems.map((_, index) => problemLetter(index)).join(', ')
        : empty,
    ],
    ['Archivo ZIP', values.archivoZip?.name || 'No seleccionado'],
  ]

  return (
    <Card
      className="overflow-hidden p-0 md:sticky md:top-5"
      aria-labelledby="summary-heading"
    >
      <div className="flex items-center gap-3 bg-[var(--primary)] px-5 py-4 text-white">
        <ClipboardList className="size-5" aria-hidden="true" />
        <h2 id="summary-heading" className="text-lg font-semibold">
          Resumen del concurso
        </h2>
      </div>
      <dl className="px-5">
        <div className="flex items-center justify-between gap-3 py-3 text-sm">
          <dt className="text-[var(--text-secondary)]">Modalidad</dt>
          <dd>
            <Badge tone={modality === 'Público' ? 'info' : 'warning'}>
              {modality}
            </Badge>
          </dd>
        </div>
        <Divider />
        {rows.map(([label, value], index) => (
          <div key={label}>
            <div className="py-3 text-sm">
              <dt className="text-[var(--text-secondary)]">{label}</dt>
              <dd className="mt-1 break-all font-medium text-[var(--text-primary)]">
                {value}
              </dd>
            </div>
            {index < rows.length - 1 && <Divider />}
          </div>
        ))}
      </dl>
    </Card>
  )
}
