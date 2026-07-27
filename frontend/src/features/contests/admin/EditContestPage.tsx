import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { Alert, Button, Card, Spinner } from '@/components/common'
import {
  FormError,
  FormField,
  Input,
  PasswordInput,
  Textarea,
} from '@/components/forms'
import { GlobeIllustration } from '@/components/illustrations/GlobeIllustration'
import { Breadcrumbs } from '@/components/navigation'
import {
  BALLOON_COLOR_OPTIONS,
  balloonColorHex,
  balloonColorLabel,
  validateBalloonColors,
} from '@/domain/balloon-colors'
import { ApiError } from '@/lib/api'
import { routes } from '@/routes/constants'
import { ContestZipField } from './ContestZipField'
import { getContestZipError } from './constants'
import { useEditableContest, useUpdateContestMutation } from './hooks'
import { editableContestToFormValues } from './mapper'
import { editContestSchema } from './schema'
import type { EditContestFormValues } from './types'

export function EditContestPage() {
  const { contestCode } = useParams<{ contestCode: string }>()
  const navigate = useNavigate()
  const editable = useEditableContest(contestCode)
  const mutation = useUpdateContestMutation()
  const form = useForm<EditContestFormValues>({
    resolver: zodResolver(editContestSchema) as Resolver<EditContestFormValues>,
  })
  const { errors } = form.formState
  const problems = form.watch('listaProblemas') ?? []

  useEffect(() => {
    if (editable.data && !form.formState.isDirty) {
      form.reset(editableContestToFormValues(editable.data))
    }
  }, [editable.data, form])

  if (!contestCode)
    return <Alert tone="danger">El código del concurso es obligatorio.</Alert>
  if (editable.isLoading)
    return <Spinner label="Cargando concurso para editar" />
  if (editable.error) {
    const message =
      editable.error instanceof Error
        ? editable.error.message
        : 'No se pudo cargar el concurso.'
    return <Alert tone="danger">{message}</Alert>
  }

  const submit = (values: EditContestFormValues) => {
    const zipError = getContestZipError(values.archivoZip)
    if (zipError) {
      form.setError('archivoZip', { message: zipError })
      return
    }
    const colorErrors = validateBalloonColors(values.listaProblemas)
    if (Object.keys(colorErrors).length) {
      Object.entries(colorErrors).forEach(([index, message]) =>
        form.setError(`listaProblemas.${Number(index)}.colorGlobo`, {
          message,
        }),
      )
      return
    }
    mutation.mutate(
      { contestCode, values },
      { onSuccess: () => navigate(routes.contests) },
    )
  }

  const message =
    mutation.error instanceof ApiError || mutation.error instanceof Error
      ? mutation.error.message
      : undefined

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Administración' },
          { label: 'Concursos', to: routes.contests },
          { label: 'Actualizar concurso' },
        ]}
      />
      <header>
        <h1 className="text-2xl font-bold">Actualizar concurso</h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Actualizá la configuración antes del inicio. El ZIP completo es
          obligatorio.
        </p>
      </header>
      {message && <Alert tone="danger">{message}</Alert>}
      <form
        onSubmit={form.handleSubmit(submit)}
        noValidate
        className="space-y-6"
      >
        <Card className="grid gap-4 md:grid-cols-2">
          <FormField label="Código">
            <Input readOnly {...form.register('codigo')} />
          </FormField>
          <FormField label="Nombre" error={errors.nombre?.message}>
            <Input disabled={mutation.isPending} {...form.register('nombre')} />
          </FormField>
          <FormField
            label="Descripción"
            error={errors.descripcion?.message}
            className="md:col-span-2"
          >
            <Textarea
              disabled={mutation.isPending}
              {...form.register('descripcion')}
            />
          </FormField>
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
              disabled={mutation.isPending}
              {...form.register('duracionMinutos', { valueAsNumber: true })}
            />
          </FormField>
          <FormField
            label="Minutos de congelamiento"
            hint="Minutos antes del final en los que el ranking dejará de actualizarse públicamente."
            error={errors.minutosCongelamiento?.message}
          >
            <Input
              type="number"
              min="0"
              disabled={mutation.isPending}
              {...form.register('minutosCongelamiento', {
                valueAsNumber: true,
              })}
            />
          </FormField>
          <FormField
            label="URL del set de problemas"
            error={errors.urlSetProblemas?.message}
          >
            <Input
              type="url"
              disabled={mutation.isPending}
              {...form.register('urlSetProblemas')}
            />
          </FormField>
          <FormField
            label="Nueva contraseña"
            hint="Dejala vacía solo si querés hacer público el concurso."
          >
            <PasswordInput
              autoComplete="new-password"
              disabled={mutation.isPending}
              {...form.register('contrasena')}
            />
          </FormField>
        </Card>
        <Card className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Problemas y globos</h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Los incisos y la cantidad de casos se preservan. Cada color debe
              ser único.
            </p>
          </div>
          {errors.listaProblemas?.message && (
            <FormError>{errors.listaProblemas.message}</FormError>
          )}
          {problems.map((problem, index) => (
            <div
              key={problem.inciso}
              className="grid gap-3 rounded-lg border border-[var(--border)] p-4 md:grid-cols-[auto_1fr_10rem_10rem]"
            >
              <div className="flex items-center gap-2">
                <GlobeIllustration
                  size={36}
                  color={balloonColorHex(problem.colorGlobo)}
                  decorative
                />
                <span
                  aria-hidden="true"
                  className="size-3 rounded-full"
                  style={{
                    backgroundColor: balloonColorHex(problem.colorGlobo),
                  }}
                />
                <strong>{problem.inciso}</strong>
              </div>
              <FormField
                label={`Título del problema ${problem.inciso}`}
                error={errors.listaProblemas?.[index]?.titulo?.message}
              >
                <Input
                  disabled={mutation.isPending}
                  {...form.register(`listaProblemas.${index}.titulo`)}
                />
              </FormField>
              <FormField
                label="Tiempo"
                error={errors.listaProblemas?.[index]?.tiempo?.message}
              >
                <Input
                  type="number"
                  min="0.01"
                  step="any"
                  disabled={mutation.isPending}
                  {...form.register(`listaProblemas.${index}.tiempo`, {
                    valueAsNumber: true,
                  })}
                />
              </FormField>
              <FormField
                label="Memoria"
                error={errors.listaProblemas?.[index]?.memoria?.message}
              >
                <Input
                  type="number"
                  min="1"
                  disabled={mutation.isPending}
                  {...form.register(`listaProblemas.${index}.memoria`, {
                    valueAsNumber: true,
                  })}
                />
              </FormField>
              <FormField
                label="Color de globo"
                error={errors.listaProblemas?.[index]?.colorGlobo?.message}
              >
                <select
                  className="min-h-10 w-full rounded-md border border-[var(--border)] bg-white px-3"
                  disabled={mutation.isPending}
                  {...form.register(`listaProblemas.${index}.colorGlobo`)}
                >
                  {BALLOON_COLOR_OPTIONS.map((option) => (
                    <option key={option.apiValue} value={option.apiValue}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormField>
              <p className="self-end text-sm text-[var(--text-secondary)]">
                {balloonColorLabel(problem.colorGlobo)} ·{' '}
                {problem.cantidadCasosPrueba} casos
              </p>
            </div>
          ))}
        </Card>
        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Recursos</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Adjuntá un ZIP completo con todos los incisos y la misma cantidad de
            casos. Máximo 100 MB.
          </p>
          <ContestZipField
            value={form.watch('archivoZip')}
            error={errors.archivoZip?.message}
            disabled={mutation.isPending}
            onChange={(file) =>
              form.setValue('archivoZip', file, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            onError={(message) => form.setError('archivoZip', { message })}
            onClearError={() => form.clearErrors('archivoZip')}
          />
        </Card>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => navigate(routes.contests)}
          >
            Cancelar
          </Button>
          <Button type="submit" loading={mutation.isPending}>
            Actualizar concurso
          </Button>
        </div>
      </form>
    </div>
  )
}
