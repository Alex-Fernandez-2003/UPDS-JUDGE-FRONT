import { useEffect, useState } from 'react'
import { Alert, Card, Spinner } from '@/components/common'
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration'
import {
  balloonColorHex,
  balloonColorLabel,
  isBalloonColor,
} from '@/domain/balloon-colors'
import {
  ContestContextHeader,
  type ContestContextNavigationItem,
} from '@/features/contests/components/ContestContextHeader'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams } from 'react-router'
import { UserLayout } from '@/layouts/UserLayout'
import { routes } from '@/routes/constants'
import { useContestRanking } from './hooks'
import { clampPage, formatRemaining, PAGE_SIZE, pageRows } from './utils'
import type { RankingDetail } from './types'
const failure = (n: number) => `${n} ${n === 1 ? 'fallo' : 'fallos'}`
function ProblemCell({
  detail,
  color,
}: {
  detail?: RankingDetail
  color: string
}) {
  if (!detail || detail.estado === 'No intentado')
    return (
      <span aria-label="No intentado" className="text-[var(--text-secondary)]">
        —
      </span>
    )
  if (detail.estado === 'Aceptado') {
    const known = isBalloonColor(color)
    return (
      <span
        className="inline-flex flex-col items-center gap-1"
        aria-label={`Aceptado en ${detail.tiempoMinutos ?? 0} minutos, ${failure(detail.intentos)}`}
      >
        {known ? (
          <GlobeIllustration
            decorative
            color={balloonColorHex(color)}
            size={24}
          />
        ) : (
          <span className="text-[var(--text-secondary)]">Aceptado</span>
        )}
        <small>
          {detail.tiempoMinutos ?? 0} min · {failure(detail.intentos)}
        </small>
      </span>
    )
  }
  return (
    <span
      className="font-semibold text-red-700"
      aria-label={`No resuelto, ${failure(detail.intentos)}`}
    >
      No resuelto
      <br />
      <small>{failure(detail.intentos)}</small>
    </span>
  )
}
function Countdown({ endsAt }: { endsAt: string }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [endsAt])
  const value = formatRemaining(endsAt, now)
  return (
    <span
      aria-label={
        value === '00:00:00'
          ? 'Concurso finalizado'
          : `Tiempo restante ${value}`
      }
    >
      {value === '00:00:00' ? 'Finalizado' : value}
    </span>
  )
}
export default function RankingPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  const query = useContestRanking(contestCode)
  const [page, setPage] = useState(1)
  const data = query.data
  const participantCount = data?.participantes.length ?? 0
  useEffect(() => {
    if (data) setPage((p) => clampPage(p, participantCount))
  }, [data, participantCount])
  const nav: ContestContextNavigationItem[] = [
    {
      id: 'problems',
      label: 'Problemas',
      to: routes.studentContestProblems(contestCode ?? ''),
    },
    {
      id: 'submissions',
      label: 'Mis envíos',
      to: routes.studentContestSubmissions(contestCode ?? ''),
    },
    {
      id: 'ranking',
      label: 'Ranking',
      to: routes.studentContestRanking(contestCode ?? ''),
    },
  ]
  if (!contestCode)
    return (
      <UserLayout>
        <Alert tone="danger">El código del concurso es obligatorio.</Alert>
      </UserLayout>
    )
  if (query.isLoading && !data)
    return (
      <UserLayout>
        <Spinner label="Cargando ranking" />
      </UserLayout>
    )
  const requestError = query.error as { status?: number; message?: string }
  const error = requestError?.status
  if (!data)
    return (
      <UserLayout>
        <Alert tone="danger">
          {error === 400
            ? 'El concurso todavía no ha iniciado.'
            : error === 403
              ? 'No tenés acceso al ranking.'
              : error === 404
                ? 'No se encontró el concurso.'
                : (requestError?.message ?? 'No se pudo cargar el ranking.')}
        </Alert>
      </UserLayout>
    )
  const rows = pageRows(data.participantes, page),
    totalPages = Math.max(1, Math.ceil(data.participantes.length / PAGE_SIZE))
  const start = data.participantes.length ? (page - 1) * PAGE_SIZE + 1 : 0,
    end = Math.min(page * PAGE_SIZE, data.participantes.length)
  return (
    <UserLayout>
      <main className="w-full min-w-0 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ContestContextHeader
          contest={{
            code: data.codigo,
            name: data.nombre,
            status: data.estadoTiempo,
            startsAt: data.fechaInicio,
            endsAt: data.fechaFin,
          }}
          activeSection="ranking"
          navigationItems={nav}
        />
        {data.congelado && (
          <Alert tone="warning" role="status">
            La clasificación pública está congelada. Los envíos posteriores al
            corte no se mostrarán hasta que finalice el concurso.
          </Alert>
        )}
        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Resumen del ranking"
        >
          <Card>
            <b>Inscritos</b>
            <p className="text-2xl font-black">{data.totalInscritos}</p>
          </Card>
          <Card>
            <b>Problema más resuelto</b>
            <p className="text-2xl font-black">
              {data.problemaMasResuelto
                ? `${data.problemaMasResuelto.inciso} · ${data.problemaMasResuelto.cantidadAceptaciones}`
                : '—'}
            </p>
          </Card>
          <Card>
            <b>Total de envíos</b>
            <p className="text-2xl font-black">{data.totalEnvios}</p>
          </Card>
          <Card>
            <b>Tiempo restante</b>
            <p className="font-mono text-2xl font-black">
              <Countdown endsAt={data.fechaFin} />
            </p>
          </Card>
        </section>
        <Card className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-center">
            <caption className="p-3 text-left font-bold">
              Clasificación del concurso
            </caption>
            <thead>
              <tr>
                <th scope="col">Posición</th>
                <th scope="col">Participante</th>
                <th scope="col">Resueltos</th>
                <th scope="col">Penalización</th>
                {data.problemas.map((p) => (
                  <th
                    scope="col"
                    key={p.inciso}
                    title={balloonColorLabel(p.colorGlobo)}
                  >
                    {p.inciso}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={`${row.puesto}-${row.nombreUsuario}`}
                  className="border-t border-[var(--border)]"
                >
                  <td>{row.puesto}</td>
                  <td>{row.nombreUsuario}</td>
                  <td>{row.problemasResueltos}</td>
                  <td>{row.tiempoTotal} min</td>
                  {data.problemas.map((problem) => (
                    <td key={problem.inciso}>
                      <ProblemCell
                        color={problem.colorGlobo}
                        detail={row.detalle.find(
                          (d) => d.inciso === problem.inciso,
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {!data.participantes.length && (
            <p className="p-6 text-center text-[var(--text-secondary)]">
              Todavía no hay participantes en el ranking.
            </p>
          )}
          <footer className="flex items-center justify-between p-4">
            <span>
              {data.participantes.length
                ? `Mostrando ${start}–${end} de ${data.participantes.length} participantes`
                : 'Sin participantes'}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft />
              </button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                type="button"
                aria-label="Página siguiente"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight />
              </button>
            </div>
          </footer>
        </Card>
        <section className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h2>Leyenda de celdas</h2>
            <p>
              Aceptado: globo, tiempo y fallos previos. No resuelto: fallos sin
              globo. No intentado: —.
            </p>
          </Card>
          <Card>
            <h2>Sistema de penalización</h2>
            <p>
              La clasificación prioriza problemas resueltos y luego menor
              penalización. La penalización suma minutos hasta la primera
              aceptación más 20 minutos por cada fallo previo. Un problema no
              resuelto no suma tiempo; el frontend presenta el cálculo backend.
            </p>
          </Card>
        </section>
      </main>
    </UserLayout>
  )
}
