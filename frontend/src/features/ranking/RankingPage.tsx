import { Fragment, useEffect, useState } from 'react'
import rankingBalloonsLegend from '@/assets/ranking/ranking-balloons-legend.png'
import rankingMedal1 from '@/assets/ranking/ranking-medal-1.png'
import rankingMedal2 from '@/assets/ranking/ranking-medal-2.png'
import rankingMedal3 from '@/assets/ranking/ranking-medal-3.png'
import { Alert, Card, Spinner } from '@/components/common'
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration'
import {
  balloonColorHex,
  balloonColorLabel,
  isBalloonColor,
} from '@/domain/balloon-colors'
import {
  ContestContextHeader,
  formatContestDuration,
  type ContestContextNavigationItem,
} from '@/features/contests/components/ContestContextHeader'
import { formatContestTimeRange } from '@/features/contests/time'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Send,
} from 'lucide-react'
import Users from '@/assets/group-svg.svg?react'
import Trophy from '@/assets/trophy-svg.svg?react'
import { useParams } from 'react-router'
import { UserLayout } from '@/layouts/UserLayout'
import { deriveIdentity } from '@/lib/auth/identity'
import { routes } from '@/routes/constants'
import { useContestRanking } from './hooks'
import { clampPage, PAGE_SIZE, pageRows } from './utils'
import type { RankingDetail } from './types'

const rankingMedals: Partial<Record<number, string>> = {
  1: rankingMedal1,
  2: rankingMedal2,
  3: rankingMedal3,
}

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
      <span
        aria-label="No intentado"
        className="text-2xl font-bold text-[var(--text-secondary)]"
      >
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
            data-testid={`ranking-cell-globe-${detail.inciso}`}
          />
        ) : (
          <span className="text-[var(--text-secondary)]">Aceptado</span>
        )}
        <small>{detail.tiempoMinutos ?? 0} min</small>
        <small className="font-bold">-{detail.intentos}</small>
      </span>
    )
  }

  return (
    <span
      className="text-2xl font-bold text-red-700"
      aria-label={`No resuelto, ${failure(detail.intentos)}`}
    >
      -{detail.intentos}
    </span>
  )
}

export default function RankingPage({ admin = false }: { admin?: boolean }) {
  const Layout = admin ? Fragment : UserLayout
  const { contestCode } = useParams<{ contestCode: string }>()
  const query = useContestRanking(contestCode)
  const currentUserId = Number(
    deriveIdentity(sessionStorage.getItem('token'))?.userId,
  )
  const hasCurrentUserId =
    Number.isSafeInteger(currentUserId) && currentUserId > 0
  const [page, setPage] = useState(1)
  const data = query.data
  const participantCount = data?.participantes.length ?? 0

  useEffect(() => {
    if (data) setPage((current) => clampPage(current, participantCount))
  }, [data, participantCount])

  const nav: ContestContextNavigationItem[] = [
    {
      id: 'problems',
      label: 'Problemas',
      to: admin
        ? routes.adminUserContestProblems(contestCode ?? '')
        : routes.studentContestProblems(contestCode ?? ''),
    },
    {
      id: 'submissions',
      label: 'Mis envíos',
      to: admin
        ? routes.adminUserContestSubmissions(contestCode ?? '')
        : routes.studentContestSubmissions(contestCode ?? ''),
    },
    {
      id: 'ranking',
      label: 'Ranking',
      to: admin
        ? routes.adminUserContestRanking(contestCode ?? '')
        : routes.studentContestRanking(contestCode ?? ''),
    },
  ]

  if (!contestCode)
    return (
      <Layout>
        <Alert tone="danger">El código del concurso es obligatorio.</Alert>
      </Layout>
    )
  if (query.isLoading && !data)
    return (
      <Layout>
        <Spinner label="Cargando ranking" />
      </Layout>
    )
  const requestError = query.error as { status?: number; message?: string }
  if (!data)
    return (
      <Layout>
        <Alert tone="danger">
          {requestError?.status === 400
            ? 'El concurso todavía no ha iniciado.'
            : requestError?.status === 403
              ? 'No tenés acceso al ranking.'
              : requestError?.status === 404
                ? 'No se encontró el concurso.'
                : (requestError?.message ?? 'No se pudo cargar el ranking.')}
        </Alert>
      </Layout>
    )

  const rows = pageRows(data.participantes, page)
  const totalPages = Math.max(
    1,
    Math.ceil(data.participantes.length / PAGE_SIZE),
  )
  const start = data.participantes.length ? (page - 1) * PAGE_SIZE + 1 : 0
  const end = Math.min(page * PAGE_SIZE, data.participantes.length)
  const duration = formatContestDuration(
    data.fechaInicio,
    data.fechaFin,
    data.duracionMinutos,
  )
  const timeRange = formatContestTimeRange(data.fechaInicio, data.fechaFin)
  const stickyHeader = 'sticky max-sm:static bg-white'
  const stickyBase = 'sticky max-sm:static bg-white group-hover:bg-slate-50/60'
  const stickyCurrent =
    'sticky max-sm:static bg-[var(--surface-muted)] group-hover:bg-slate-200/70'

  return (
    <Layout>
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
          durationMinutes={data.duracionMinutos}
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
          <article
            data-testid="ranking-summary-card"
            className="flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50/60 p-4"
          >
            <span
              data-testid="ranking-summary-icon"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700"
            >
              <Users className="size-8" aria-hidden="true" />
            </span>
            <div>
              <b>Participantes</b>
              <p className="text-2xl font-black">No disponible</p>
              <p className="text-sm text-[var(--text-secondary)]">
                {data.totalInscritos} inscritos
              </p>
            </div>
          </article>
          <article
            data-testid="ranking-summary-card"
            className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4"
          >
            <span
              data-testid="ranking-summary-icon"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
            >
              <Trophy className="size-5" aria-hidden="true" />
            </span>
            <div>
              <b>Problema más resuelto</b>
              <p className="text-2xl font-black">
                {data.problemaMasResuelto?.inciso ?? '—'}
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                {data.problemaMasResuelto
                  ? `${data.problemaMasResuelto.cantidadAceptaciones} aceptaciones`
                  : 'Sin aceptaciones'}
              </p>
            </div>
          </article>
          <article
            data-testid="ranking-summary-card"
            className="flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/60 p-4"
          >
            <span
              data-testid="ranking-summary-icon"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700"
            >
              <Send className="size-5" aria-hidden="true" />
            </span>
            <div>
              <b>Total de envíos</b>
              <p className="text-2xl font-black">{data.totalEnvios}</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Aceptados globales no disponibles
              </p>
            </div>
          </article>
          <article
            aria-label="Duración"
            data-testid="ranking-summary-card"
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
          >
            <span
              data-testid="ranking-summary-icon"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700"
            >
              <Clock className="size-5" aria-hidden="true" />
            </span>
            <div>
              <b>Duración</b>
              <p className="text-2xl font-black">{duration}</p>
              <p
                data-testid="ranking-duration-range"
                className="text-sm text-[var(--text-secondary)]"
              >
                {timeRange}
              </p>
            </div>
          </article>
        </section>

        <Card className="overflow-hidden p-0">
          <div className="flex items-center gap-3 px-5 py-4 text-left">
            <Trophy
              data-testid="ranking-table-title-icon"
              className="size-8 text-slate-900"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-black sm:text-3xl">
              Clasificación del concurso
            </h2>
          </div>
          <div
            className="w-full overflow-x-auto"
            role="region"
            tabIndex={0}
            aria-label="Tabla de clasificación del concurso"
          >
            <table className="w-full min-w-[980px] table-fixed text-center">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`${stickyHeader} left-0 z-30 w-20 min-w-20 px-3 py-4`}
                  >
                    Posición
                  </th>
                  <th
                    scope="col"
                    className={`${stickyHeader} left-20 z-30 w-52 min-w-52 px-3 py-4 text-left`}
                  >
                    Participante
                  </th>
                  <th
                    scope="col"
                    aria-label="Resueltos y penalización"
                    className={`${stickyHeader} left-72 z-30 w-32 min-w-32 border-r border-slate-200 px-3 py-4`}
                  >
                    Resueltos / Penalización
                  </th>
                  {data.problemas.map((problem) => (
                    <th
                      scope="col"
                      key={problem.inciso}
                      title={balloonColorLabel(problem.colorGlobo)}
                      className="w-28 min-w-28 px-3 py-3"
                    >
                      <span className="inline-flex flex-col items-center gap-1">
                        <span>{problem.inciso}</span>
                        {isBalloonColor(problem.colorGlobo) && (
                          <span
                            data-testid={`ranking-problem-globe-${problem.inciso}`}
                            data-balloon-color={problem.colorGlobo}
                          >
                            <GlobeIllustration
                              decorative
                              color={balloonColorHex(problem.colorGlobo)}
                              size={16}
                            />
                          </span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isCurrent =
                    hasCurrentUserId && row.idUsuario === currentUserId
                  const sticky = isCurrent ? stickyCurrent : stickyBase
                  return (
                    <tr
                      key={`${row.puesto}-${row.nombreUsuario}`}
                      aria-label={
                        isCurrent
                          ? `Tu posición: ${row.nombreUsuario}`
                          : undefined
                      }
                      className={
                        isCurrent
                          ? 'group border-t border-[var(--border)] bg-[var(--surface-muted)] hover:bg-slate-200/70'
                          : 'group border-t border-[var(--border)] hover:bg-slate-50/60'
                      }
                    >
                      <td
                        aria-label={`Puesto ${row.puesto}`}
                        className={`${sticky} left-0 z-20 w-20 px-3 py-4 font-bold`}
                      >
                        {rankingMedals[row.puesto] ? (
                          <img
                            src={rankingMedals[row.puesto]}
                            alt=""
                            data-testid={`ranking-medal-${row.puesto}`}
                            className="mx-auto h-12 w-9 object-contain"
                          />
                        ) : (
                          row.puesto
                        )}
                      </td>
                      <td
                        className={`${sticky} left-20 z-20 w-52 px-3 py-4 text-left`}
                      >
                        {row.nombreUsuario}
                      </td>
                      <td
                        className={`${sticky} left-72 z-20 w-32 border-r border-slate-200 px-3 py-4`}
                      >
                        <span className="flex flex-col items-center">
                          <strong>{row.problemasResueltos}</strong>
                          <small className="text-[var(--text-secondary)]">
                            {row.tiempoTotal} min
                          </small>
                        </span>
                      </td>
                      {data.problemas.map((problem) => (
                        <td key={problem.inciso} className="w-28 px-3 py-4">
                          <ProblemCell
                            color={problem.colorGlobo}
                            detail={row.detalle.find(
                              (detail) => detail.inciso === problem.inciso,
                            )}
                          />
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {!data.participantes.length && (
            <p className="p-6 text-center text-[var(--text-secondary)]">
              Todavía no hay participantes en el ranking.
            </p>
          )}
          <footer className="flex items-center justify-end p-4">
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
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
                onClick={() => setPage((current) => current + 1)}
              >
                <ChevronRight />
              </button>
            </div>
          </footer>
        </Card>

        <section
          className="flex flex-wrap gap-3"
          aria-label="Referencias del ranking"
        >
          <article
            aria-label="Problema resuelto"
            className="flex min-w-48 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm"
          >
            <img
              src={rankingBalloonsLegend}
              alt=""
              data-testid="ranking-balloons-legend"
              className="h-8 w-14 object-contain"
            />{' '}
            = Problema resuelto
          </article>
          <article
            aria-label="Intentos fallidos"
            className="flex min-w-48 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm"
          >
            <strong className="text-red-700">-1 -2 -3 ...</strong>{' '}
            <span>= Intentos fallidos</span>
          </article>
          <article
            aria-label="No intentado"
            className="flex min-w-40 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-sm"
          >
            <strong className="text-[var(--text-secondary)]">—</strong>{' '}
            <span>= No intentado</span>
          </article>
          <article
            aria-label="Sistema de penalización"
            className="min-w-64 flex-[2] rounded-xl border border-slate-200 bg-white p-3 text-sm"
          >
            <strong>Sistema de penalización</strong>
            <p>
              Problemas resueltos primero; después, menor penalización: minutos
              hasta aceptar más 20 minutos por fallo previo.
            </p>
          </article>
          <article
            aria-label="Participantes"
            className="flex min-w-52 flex-1 items-center rounded-xl border border-slate-200 bg-white p-3 text-sm"
          >
            {data.participantes.length
              ? `Mostrando ${start}–${end} de ${data.participantes.length} participantes`
              : 'Sin participantes'}
          </article>
        </section>
      </main>
    </Layout>
  )
}
