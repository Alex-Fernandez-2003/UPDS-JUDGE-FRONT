import { Badge, Card, Divider } from '@/components/common'
import { problemLetter, type CreateContestFormValues } from './types'

type Props = {
  values: Partial<CreateContestFormValues>
}

const empty = 'Sin definir'

export function CreateContestSummary({ values }: Props) {
  const problems = values.listaProblemas ?? []
  const modality = values.contrasena?.trim() ? 'Privado' : 'Público'

  return (
    <Card
      className="space-y-4 md:sticky md:top-5"
      aria-labelledby="summary-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="summary-heading" className="text-lg font-semibold">
          Resumen
        </h2>
        <Badge tone={modality === 'Público' ? 'info' : 'warning'}>
          {modality}
        </Badge>
      </div>
      <Divider />
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-[var(--text-secondary)]">Nombre</dt>
          <dd className="font-medium">{values.nombre?.trim() || empty}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-secondary)]">Código</dt>
          <dd className="font-medium">{values.codigo?.trim() || empty}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-secondary)]">Inicio</dt>
          <dd>{values.fechaInicio || empty}</dd>
        </div>
        <div>
          <dt className="text-[var(--text-secondary)]">Duración</dt>
          <dd>
            {values.duracionMinutos
              ? `${values.duracionMinutos} minutos`
              : empty}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--text-secondary)]">Congelamiento</dt>
          <dd>
            {typeof values.minutosCongelamiento === 'number'
              ? `${values.minutosCongelamiento} minutos`
              : empty}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--text-secondary)]">Problemas</dt>
          <dd>
            {problems.length} {problems.length === 1 ? 'problema' : 'problemas'}
            {problems.length > 0 &&
              ` (${problems.map((_, index) => problemLetter(index)).join(', ')})`}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--text-secondary)]">Archivo ZIP</dt>
          <dd className="break-all">{values.archivoZip?.name || empty}</dd>
        </div>
      </dl>
    </Card>
  )
}
