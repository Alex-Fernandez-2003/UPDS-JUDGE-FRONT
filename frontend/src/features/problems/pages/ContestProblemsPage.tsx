import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  Info,
  FileCode2,
  Trophy,
  Code2,
  Check,
  RotateCcw,
  X,
  AlertCircle,
} from 'lucide-react'
import type { ComponentType } from 'react'
import type { ContestDashboard } from '../types'
import { ProblemsTable } from '../components/ProblemsTable'
import {
  Badge,
  Button,
  Card,
  Surface,
  Divider,
  Avatar,
  Alert,
  Spinner,
  EmptyState,
  IconButton,
} from '@/components/common'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getContestDashboard } from '../service'

type TabKey = 'problemas' | 'envios' | 'ranking'
type DownloadState = 'idle' | 'downloading' | 'completed'

type TabDef = {
  key: TabKey
  label: string
  icon: ComponentType<{ className?: string }>
  count?: number
}

function formatFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-BO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatHora(iso: string) {
  return new Date(iso).toLocaleTimeString('es-BO', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ContestProblemsPage() {
  const { codigo } = useParams<{ codigo: string }>()

  const [dashboard, setDashboard] = useState<ContestDashboard | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const problems = dashboard?.problemas ?? []

  const [activeTab, setActiveTab] = useState<TabKey>('problemas')
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [downloadPdfState, setDownloadPdfState] =
    useState<DownloadState>('idle')

  useEffect(() => {
    if (!codigo) {
      setIsLoading(false)
      setLoadError('No se especificó el código del concurso.')
      return
    }

    async function loadDashboard() {
      setIsLoading(true)
      setLoadError(null)
      try {
        const data = await getContestDashboard(codigo!)
        setDashboard(data)
      } catch (error) {
        console.error(error)
        setLoadError(
          error instanceof Error
            ? error.message
            : 'No se pudo cargar el concurso.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [codigo])

  const solvedCount = dashboard?.problemasResueltos ?? 0
  const totalAttempts = dashboard?.intentosTotales ?? 0

  const tabs: TabDef[] = [
    {
      key: 'problemas',
      label: 'Problemas',
      icon: Code2,
      count: problems.length,
    },
    { key: 'envios', label: 'Mis envíos', icon: FileCode2 },
    { key: 'ranking', label: 'Ranking', icon: Trophy },
  ]

  const handleDownloadPdf = () => {
    if (downloadPdfState === 'downloading') return
    setDownloadPdfState('downloading')

    setTimeout(() => {
      setDownloadPdfState('completed')
      const element = document.createElement('a')
      const file = new Blob(
        [
          `CONCURSO UPDS JUDGE - SET DE PROBLEMAS\n\n${problems.map((p) => `[${p.inciso}] ${p.titulo} - Memoria: ${p.memoria}, Tiempo: ${p.tiempo}`).join('\n')}`,
        ],
        { type: 'text/plain' },
      )
      element.href = URL.createObjectURL(file)
      element.download = 'Set_de_Problemas_UPDS.txt'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      setTimeout(() => setDownloadPdfState('idle'), 3000)
    }, 1200)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-[var(--text-secondary)] text-sm font-medium">
        <Spinner /> Cargando concurso...
      </div>
    )
  }

  if (loadError || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Alert tone="danger">
          {loadError ?? 'No se encontró el concurso.'}
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--surface-muted)] flex flex-col pb-16">
      {/* MAIN CONTAINER */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex-1 flex flex-col gap-6">
        {/* CONTEST TITLE & INFO */}
        <Card id="contest-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <Badge tone="success">
                  {dashboard.estadoTiempo.toUpperCase()}
                </Badge>
                <span className="text-xs text-[var(--text-secondary)]">
                  Concurso Oficial • UPDS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {dashboard.nombre}
              </h2>
            </div>

            <Button
              id="ver-reglas-btn"
              variant="secondary"
              onClick={() => setIsRulesModalOpen(true)}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Ver reglas del concurso
            </Button>
          </div>

          <Divider className="my-6" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
              <div>
                <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wide">
                  Fecha fin
                </div>
                <div className="text-sm font-bold">
                  {formatFecha(dashboard.fechaFin)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[var(--text-secondary)]" />
              <div>
                <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wide">
                  Hora fin
                </div>
                <div className="text-sm font-bold">
                  {formatHora(dashboard.fechaFin)} (BOT)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-[var(--text-secondary)]" />
              <div>
                <div className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wide">
                  Participantes actuales
                </div>
                <div className="text-sm font-bold">
                  {dashboard.cantidadParticipantes} Competidores
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* QUICK METRICS */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          id="quick-metrics"
        >
          <Card className="flex items-center gap-4">
            <Check className="w-5 h-5 text-[var(--primary)] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Problemas resueltos
              </div>
              <div className="text-2xl font-black mt-0.5">
                {solvedCount}{' '}
                <span className="text-[var(--text-secondary)] font-medium text-lg">
                  / {problems.length}
                </span>
              </div>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <RotateCcw className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
            <div>
              <div className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide">
                Intentos totales
              </div>
              <div className="text-2xl font-black mt-0.5">{totalAttempts}</div>
            </div>
          </Card>
        </div>

        {/* FROZEN SCOREBOARD BANNER */}
        <Alert
          tone="info"
          className="flex items-start gap-3"
          id="frozen-scoreboard-banner"
        >
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-extrabold text-sm">Marcador Congelado</h4>
            <p className="text-xs mt-0.5 leading-relaxed">
              El marcador público ha sido congelado para mantener la emoción en
              los momentos finales del concurso. Tus envíos seguirán
              procesándose normalmente.
            </p>
          </div>
        </Alert>

        {/* NAVIGATION TABS */}
        <div
          className="flex items-center gap-2 border-b border-[var(--border)]"
          id="tabs-navigation"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-bold border-b-2 flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <Badge tone="neutral">{tab.count}</Badge>
              )}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'problemas' && (
          <Surface
            className="border border-[var(--border)] overflow-hidden"
            id="problems-panel"
          >
            <div className="px-6 py-5 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar name="A-G" />
                <div>
                  <h3 className="font-black text-base">Set de Problemas</h3>
                  <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                    Ejercicios del concurso oficial UPDS
                  </p>
                </div>
              </div>

              <Button
                loading={downloadPdfState === 'downloading'}
                onClick={handleDownloadPdf}
              >
                Descargar PDF
              </Button>
            </div>

            <ProblemsTable
              problems={problems}
              emptyText="Este concurso todavía no tiene problemas."
            />
          </Surface>
        )}

        {activeTab === 'envios' && (
          <EmptyState
            title="Historial de Envíos"
            description="Aquí podrás revisar todos tus envíos, código fuente y tiempo de ejecución evaluado por el juez automático."
          />
        )}

        {activeTab === 'ranking' && (
          <EmptyState
            title="Tabla de Posiciones"
            description="El marcador está actualmente congelado. La tabla final se revelará al concluir el concurso."
          />
        )}
      </main>

      {/* RULES MODAL */}
      {isRulesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setIsRulesModalOpen(false)}
        >
          <Card
            className="max-w-md w-full overflow-hidden p-0"
            id="rules-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <Avatar name="RC" />
                <div>
                  <h2 className="text-lg font-bold">Reglas del Concurso</h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    UPDS Judge
                  </p>
                </div>
              </div>

              <IconButton
                label="Cerrar"
                onClick={() => setIsRulesModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </IconButton>
            </div>

            <div className="p-6">
              <Alert
                tone="danger"
                className="flex flex-col items-center gap-2 text-center"
              >
                <AlertCircle className="w-6 h-6" />
                <Badge tone="danger">Penalización Fija</Badge>
                <h5 className="font-extrabold text-lg">
                  20 Minutos por Respuesta Incorrecta
                </h5>
                <p className="text-xs font-medium leading-relaxed">
                  Por cada respuesta incorrecta o envío fallido se aplicará una
                  penalización acumulativa de 20 minutos en el tiempo total de
                  resolución del problema.
                </p>
              </Alert>
            </div>

            <div className="p-4 border-t border-[var(--border)] flex justify-end bg-[var(--surface-muted)]">
              <Button
                variant="primary"
                onClick={() => setIsRulesModalOpen(false)}
              >
                Entendido
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
