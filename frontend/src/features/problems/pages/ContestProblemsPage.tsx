import { useEffect, useState } from 'react'
import { BookOpen, Send } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Alert, Card, Spinner } from '@/components/common'
import { UserLayout } from '@/layouts/UserLayout'
import { routes } from '@/routes/constants'
import { ProblemsTable } from '../components/ProblemsTable'
import { getContestDashboard } from '../service'
import type { ContestDashboard } from '../types'

export default function ContestProblemsPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  const [dashboard, setDashboard] = useState<ContestDashboard | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!contestCode) {
      setError('El código del concurso es obligatorio.')
      return
    }
    let active = true
    setDashboard(null)
    setError(null)
    void getContestDashboard(contestCode)
      .then((result) => {
        if (active) setDashboard(result ?? null)
      })
      .catch(() => {
        if (active) setError('No se pudo cargar el dashboard del concurso.')
      })
    return () => {
      active = false
    }
  }, [contestCode])

  return (
    <UserLayout>
      <main className="w-full min-w-0 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {error && <Alert tone="danger">{error}</Alert>}
        {!error && !dashboard && <Spinner label="Cargando concurso" />}
        {dashboard && (
          <>
            <Card className="space-y-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {dashboard.codigo}
                  </p>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {dashboard.nombre}
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    {dashboard.problemasResueltos} de {dashboard.totalProblemas}{' '}
                    problemas resueltos · {dashboard.intentosTotales} intentos
                  </p>
                </div>
              </div>
              <nav
                aria-label="Navegación del concurso"
                className="flex gap-5 border-b border-slate-200 text-sm font-semibold"
              >
                <span className="flex items-center gap-2 border-b-2 border-slate-900 pb-3 text-slate-900">
                  <BookOpen className="size-4" /> Problemas
                </span>
                <Link
                  className="flex items-center gap-2 pb-3 text-slate-500 hover:text-slate-900"
                  to={routes.studentContestSubmissions(dashboard.codigo)}
                >
                  <Send className="size-4" /> Mis envíos
                </Link>
              </nav>
            </Card>
            <ProblemsTable
              problems={dashboard.problemas}
              pdfUrl={dashboard.urlSetProblemas}
            />
          </>
        )}
      </main>
    </UserLayout>
  )
}
