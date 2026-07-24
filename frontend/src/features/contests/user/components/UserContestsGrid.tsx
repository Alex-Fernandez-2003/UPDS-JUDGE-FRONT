import { Badge, Button, Card, ProgressBar } from '@/components/common'
import {
  formatFechaHora,
  modalidadLabel,
  estadoTiempoLabel,
  estadoTiempoTone,
} from '@/features/contests/admin/format'
import type { ConcursoListItem } from '@/features/contests/types'
import { ContestCard } from './ContestCard'


const formatTimeRemaining = (seconds: number) => {
  const horas = Math.floor(seconds / 3600)
  const minutos = Math.floor((seconds % 3600) / 60)
  const segundos = seconds % 60
  return [horas, minutos, segundos]
    .map((value) => String(value).padStart(2, '0'))
    .join(':')
}

export function UserContestsGrid({
  rows,
  loading,
}: {
  rows: ConcursoListItem[]
  loading?: boolean
}) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="animate-pulse bg-slate-100 p-6" />
        ))}
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--text-secondary)]">
        No hay concursos para los filtros seleccionados.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {rows.map((contest) => (
        <ContestCard key={contest.idConcurso} contest={contest} />
        // <Card key={contest.idConcurso} className="space-y-4 p-6">
        //   <div className="flex items-start justify-between gap-4">
        //     <Badge tone={estadoTiempoTone[contest.estadoTiempo]}>
        //       {estadoTiempoLabel[contest.estadoTiempo]}
        //     </Badge>
        //     <span className="text-xs font-semibold uppercase text-[var(--text-secondary)]">
        //       {modalidadLabel[contest.modalidad]}
        //     </span>
        //   </div>

        //   <div className="space-y-2">
        //     <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        //       {contest.nombre}
        //     </h2>
        //     <p className="text-sm text-[var(--text-secondary)]">
        //       {contest.descripcion}
        //     </p>
        //   </div>

        //   <div className="rounded-lg bg-[var(--surface-muted)] p-3 text-sm text-[var(--text-secondary)]">
        //     {contest.estadoTiempo === 'Activo' ? (
        //       <div className="space-y-1">
        //         <p className="font-semibold text-[var(--text-primary)]">
        //           Tiempo restante
        //         </p>
        //         <p>
        //           {contest.segundosRestantes != null
        //             ? formatTimeRemaining(contest.segundosRestantes)
        //             : 'Calculando...'}
        //         </p>
        //       </div>
        //     ) : contest.estadoTiempo === 'Proximo' ? (
        //       <div className="space-y-1">
        //         <p className="font-semibold text-[var(--text-primary)]">
        //           Inicio
        //         </p>
        //         <p>{formatFechaHora(contest.fechaInicio)}</p>
        //       </div>
        //     ) : (
        //       <div className="space-y-1">
        //         <p className="font-semibold text-[var(--text-primary)]">
        //           Finalizado
        //         </p>
        //         {contest.miPuesto != null ? (
        //           <p>Tu puesto: {contest.miPuesto}</p>
        //         ) : (
        //           <p>Revisa la tabla de resultados al finalizar.</p>
        //         )}
        //       </div>
        //     )}

        //     <ProgressBar
        //       value={
        //         contest.segundosRestantes != null
        //           ? ((contest.duracionMinutos * 60 -
        //               contest.segundosRestantes) /
        //               (contest.duracionMinutos * 60)) *
        //             100
        //           : 0
        //       }
        //     />
        //   </div>

        //   <div className="grid grid-cols-2 gap-4 text-sm text-[var(--text-secondary)]">
        //     <div className="space-y-1">
        //       <p className="font-semibold text-[var(--text-primary)]">
        //         Problemas
        //       </p>
        //       <p>{contest.cantidadProblemas}</p>
        //     </div>
        //     <div className="space-y-1">
        //       <p className="font-semibold text-[var(--text-primary)]">
        //         Participantes
        //       </p>
        //       <p>{contest.cantidadParticipantes}</p>
        //     </div>
        //   </div>

        //   <div className="flex flex-wrap items-center gap-3">
        //     <Button
        //       variant={contest.yaInscrito ? 'primary' : 'outline'}
        //       className="flex-1"
        //     >
        //       {contest.yaInscrito ? 'Continuar concurso' : 'Ver detalles'}
        //     </Button>
        //     <span className="text-xs text-[var(--text-secondary)]">
        //       {contest.codigo}
        //     </span>
        //   </div>
        // </Card>
      ))}
    </div>
  )
}
