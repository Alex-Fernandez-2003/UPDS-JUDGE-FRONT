import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { Alert, Badge, Button, Card } from '@/components/common'
import { FormField, Input, PasswordInput, Textarea } from '@/components/forms'
import { Breadcrumbs } from '@/components/navigation'
import { ApiError } from '@/lib/api'
import { routes } from '@/routes/constants'
import { ContestProblemList } from './ContestProblemList'
import { ContestZipField } from './ContestZipField'
import { CreateContestSummary } from './CreateContestSummary'
import { CONTEST_CODE_HINT, getContestZipError } from './constants'
import { createContestSchema } from './schema'
import type { CreateContestFormValues } from './types'
import { problemLetter } from './types'
import { getContestForEdit, type ConcursoParaEditar } from './service'
import { useUpdateContestMutation } from './use-update-contest'

// El input datetime-local necesita "YYYY-MM-DDTHH:mm" en hora local,
// sin segundos ni offset de zona horaria.
function toDatetimeLocalValue(iso: string) {
  const date = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function mapToFormValues(
  concurso: ConcursoParaEditar,
): Omit<CreateContestFormValues, 'archivoZip'> {
  return {
    nombre: concurso.nombre,
    descripcion: concurso.descripcion,
    fechaInicio: toDatetimeLocalValue(concurso.fechaInicio),
    duracionMinutos: concurso.duracionMinutos,
    // El backend nunca devuelve la contraseña real (correcto, por seguridad).
    // Queda vacía a propósito; ver aviso en el campo de contraseña.
    contrasena: '',
    urlSetProblemas: concurso.urlSetProblemas,
    minutosCongelamiento: concurso.minutosCongelamiento,
    codigo: concurso.codigo,
    listaProblemas: concurso.listaProblemas.map((p) => ({
      titulo: p.titulo,
      tiempo: p.tiempo,
      memoria: p.memoria,
    })),
  }
}

export function EditContestPage() {
  const navigate = useNavigate()
  const { codigo } = useParams<{ codigo: string }>()

  const detailQuery = useQuery({
    queryKey: ['contest-for-edit', codigo],
    queryFn: () => getContestForEdit(codigo!),
    enabled: Boolean(codigo),
  })

  const mutation = useUpdateContestMutation(codigo ?? '')

  const form = useForm<CreateContestFormValues>({
    // The UI contract is string-only; the schema additionally tolerates legacy absent values.
    resolver: zodResolver(
      createContestSchema,
    ) as Resolver<CreateContestFormValues>,
  })
  const values = form.watch()
  const { errors } = form.formState

  useEffect(() => {
    if (detailQuery.data) {
      form.reset({
        ...mapToFormValues(detailQuery.data),
        archivoZip: undefined,
      })
    }
  }, [detailQuery.data, form])

  const loadErrorMessage =
    detailQuery.error instanceof ApiError && detailQuery.error.status === 401
      ? 'Tu sesión no es válida o ha expirado.'
      : detailQuery.error instanceof ApiError &&
          detailQuery.error.status === 404
        ? 'El concurso no existe o fue eliminado.'
        : detailQuery.error instanceof Error
          ? detailQuery.error.message
          : undefined

  const saveErrorMessage =
    mutation.error instanceof ApiError && mutation.error.status === 401
      ? 'Tu sesión no es válida o ha expirado.'
      : mutation.error instanceof Error
        ? mutation.error.message
        : undefined

  const onSubmit = (formValues: CreateContestFormValues) => {
    // El ZIP es obligatorio al actualizar (el backend lo exige siempre,
    // a diferencia de la creación).
    const zipError = getContestZipError(formValues.archivoZip)
    if (zipError) {
      form.setError('archivoZip', { type: 'validate', message: zipError })
      return
    }
    const { codigo: _codigo, ...payload } = formValues
    mutation.mutate(payload)
  }

  if (!codigo) {
    return (
      <div className="mx-auto max-w-7xl">
        <Alert tone="danger">No se especificó el código del concurso.</Alert>
      </div>
    )
  }

  if (detailQuery.isLoading) {
    return (
      <div className="mx-auto max-w-7xl">
        <p className="text-[var(--text-secondary)]">Cargando concurso...</p>
      </div>
    )
  }

  if (loadErrorMessage) {
    return (
      <div className="mx-auto max-w-7xl">
        <Alert tone="danger">{loadErrorMessage}</Alert>
      </div>
    )
  }

  const concurso = detailQuery.data

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Administración' },
          { label: 'Concursos', to: routes.contests },
          { label: 'Editar concurso' },
        ]}
      />
      <header>
        <h1 className="text-2xl font-bold">Editar concurso</h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Actualizá los datos del concurso. Solo se pueden editar concursos que
          todavía no han iniciado.
        </p>
      </header>

      {mutation.isSuccess && mutation.data && (
        <Alert tone="success">
          <p>{mutation.data.mensaje}</p>
          <p className="mt-1 font-semibold">Código: {mutation.data.codigo}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => navigate(routes.contests)}
          >
            Ver concursos
          </Button>
        </Alert>
      )}
      {saveErrorMessage && <Alert tone="danger">{saveErrorMessage}</Alert>}

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <Card className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Información general</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Identificá el concurso para sus participantes.
                </p>
              </div>
              <FormField label="Nombre" error={errors.nombre?.message}>
                <Input
                  disabled={mutation.isPending}
                  {...form.register('nombre')}
                />
              </FormField>
              <FormField
                label="Descripción"
                error={errors.descripcion?.message}
              >
                <Textarea
                  disabled={mutation.isPending}
                  {...form.register('descripcion')}
                />
              </FormField>
              <FormField
                label="Código"
                hint={`${CONTEST_CODE_HINT} Este valor no se puede modificar.`}
              >
                <Input value={codigo} disabled readOnly />
              </FormField>
            </Card>

            <Card className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Programación y acceso</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Una contraseña vacía crea un concurso público.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Fecha de inicio"
                  error={errors.fechaInicio?.message}
                >
                  <Input
                    type="datetime-local"
                    disabled={mutation.isPending}
                    {...form.register('fechaInicio')}
                  />
                </FormField>
                <FormField
                  label="Duración (minutos)"
                  error={errors.duracionMinutos?.message}
                >
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    disabled={mutation.isPending}
                    {...form.register('duracionMinutos', {
                      valueAsNumber: true,
                    })}
                  />
                </FormField>
                <FormField
                  label="Minutos de congelamiento"
                  error={errors.minutosCongelamiento?.message}
                >
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    disabled={mutation.isPending}
                    {...form.register('minutosCongelamiento', {
                      valueAsNumber: true,
                    })}
                  />
                </FormField>
                <FormField label="Contraseña">
                  <PasswordInput
                    autoComplete="new-password"
                    disabled={mutation.isPending}
                    {...form.register('contrasena')}
                  />
                </FormField>
                <p className="col-span-full -mt-2 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  {concurso?.esPrivado ? (
                    <Badge tone="warning">Concurso privado</Badge>
                  ) : (
                    <Badge>Concurso público</Badge>
                  )}
                  <span>
                    Por seguridad no mostramos la contraseña actual. Dejá este
                    campo vacío para <strong>mantenerlo público</strong>, o
                    escribí una contraseña nueva para volverlo o mantenerlo
                    privado.
                  </span>
                </p>
              </div>
            </Card>

            <Card className="space-y-4">
              <FormField
                label="URL del set de problemas"
                error={errors.urlSetProblemas?.message}
              >
                <Input
                  type="url"
                  placeholder="https://ejemplo.com/problemas"
                  disabled={mutation.isPending}
                  {...form.register('urlSetProblemas')}
                />
              </FormField>
              <ContestProblemList
                control={form.control}
                register={form.register}
                errors={errors}
                disabled={mutation.isPending}
              />
            </Card>

            <Card className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">Recursos</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Subí el ZIP actualizado. No se pueden agregar ni quitar
                  problemas, ni cambiar la cantidad de casos de prueba de cada
                  uno — solo su contenido.
                </p>
              </div>
              {concurso && (
                <ul className="grid gap-1 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                  {concurso.listaProblemas.map((p) => (
                    <li key={p.inciso}>
                      <span className="font-mono font-semibold text-[var(--text-primary)]">
                        {p.inciso}
                      </span>{' '}
                      — {p.cantidadCasosPrueba} caso(s) de prueba
                    </li>
                  ))}
                </ul>
              )}
              <ContestZipField
                value={values.archivoZip}
                error={errors.archivoZip?.message}
                disabled={mutation.isPending}
                onChange={(file) => {
                  form.setValue('archivoZip', file, {
                    shouldDirty: true,
                    shouldValidate: Boolean(file),
                  })
                }}
                onError={(message) => {
                  form.setValue('archivoZip', undefined, { shouldDirty: true })
                  form.setError('archivoZip', { type: 'validate', message })
                }}
                onClearError={() => form.clearErrors('archivoZip')}
              />
            </Card>
          </div>
          <aside>
            <CreateContestSummary values={values} />
          </aside>
        </div>
        <Alert tone="info" className="mt-6">
          El ZIP debe contener las carpetas de los problemas:{' '}
          {values.listaProblemas
            ?.map((_, index) => problemLetter(index))
            .join(', ')}
          . Tamaño máximo: 100 MB.
        </Alert>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => navigate(routes.contests)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  )
}
