import { useMemo, useState } from 'react'
import { Alert, Button } from '@/components/common'
import { Input, Select } from '@/components/forms'
import { RecentSubmissionsTable } from '@/features/contests/user/RecentSubmissionsTable'
import { mapSubmissionRow } from '@/features/contests/user/mapper'
import { useUserHistory } from '../Types/historyHooks'

const pageSize = 20
const resultOptions = [
  { value: '', label: 'Todos los resultados' },
  { value: 'AC', label: 'Accepted' },
  { value: 'WA', label: 'Wrong Answer' },
  { value: 'TLE', label: 'Time Limit Exceeded' },
  { value: 'MLE', label: 'Memory Limit Exceeded' },
  { value: 'CE', label: 'Compilation Error' },
  { value: 'RE', label: 'Runtime Error' },
]

export default function UserHistoryPage() {
  const [contestCode, setContestCode] = useState('')
  const [result, setResult] = useState('')
  const [page, setPage] = useState(1)
  const params = useMemo(
    () => ({
      concursoCodigo: contestCode.trim() || undefined,
      resultado: result || undefined,
      pagina: page,
      tamanoPagina: pageSize,
    }),
    [contestCode, page, result],
  )
  const history = useUserHistory(params)
  const response = history.data
  const totalPages = response
    ? Math.max(1, Math.ceil(response.total / response.tamanoPagina))
    : 1
  const range = response
    ? response.total === 0
      ? '0 envíos'
      : `Mostrando ${(response.pagina - 1) * response.tamanoPagina + 1}-${Math.min(response.pagina * response.tamanoPagina, response.total)} de ${response.total} envíos`
    : undefined

  const updateContest = (value: string) => {
    setContestCode(value)
    setPage(1)
  }
  const updateResult = (value: string) => {
    setResult(value)
    setPage(1)
  }
  const clearFilters = () => {
    setContestCode('')
    setResult('')
    setPage(1)
  }

  return (
    <div className="w-full min-w-0 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
              Historial de Mis Envíos
            </h1>
            <p className="text-sm font-medium text-[var(--text-secondary)] sm:text-base">
              Registro global de todas las soluciones enviadas en los concursos
              activos.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-5 py-3 shadow-[var(--shadow-sm)]">
            <span className="text-sm font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Total de envíos:
            </span>
            <span className="text-2xl font-black text-[var(--brand)]">
              {response?.total ?? 0}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
        <label className="min-w-52 flex-1 text-sm font-semibold">
          Concurso
          <Input
            value={contestCode}
            placeholder="Código del concurso"
            onChange={(event) => updateContest(event.target.value)}
          />
        </label>
        <label className="min-w-52 flex-1 text-sm font-semibold">
          Resultado obtenido
          <Select
            value={result}
            onChange={(event) => updateResult(event.target.value)}
          >
            {resultOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </label>
        <Button
          variant="secondary"
          onClick={clearFilters}
          disabled={!contestCode && !result}
        >
          Limpiar
        </Button>
        <Button
          variant="ghost"
          onClick={() => history.refetch()}
          disabled={history.isFetching}
        >
          Actualizar
        </Button>
      </div>

      {history.error && (
        <Alert tone="danger">
          {history.error instanceof Error
            ? history.error.message
            : 'No fue posible cargar el historial de envíos.'}
        </Alert>
      )}
      <div className="w-full min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)]">
        <RecentSubmissionsTable
          rows={(response?.datos ?? []).map(mapSubmissionRow)}
          loading={history.isLoading || history.isFetching}
          error={undefined}
          page={page}
          totalPages={totalPages}
          range={range}
          onPreviousPage={() => setPage((current) => Math.max(1, current - 1))}
          onNextPage={() =>
            setPage((current) => Math.min(totalPages, current + 1))
          }
        />
      </div>
    </div>
  )
}
