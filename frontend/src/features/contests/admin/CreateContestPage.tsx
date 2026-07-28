import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Alert, Button, Card } from '@/components/common'
import { FormField, Input, PasswordInput, Textarea } from '@/components/forms'
import { Breadcrumbs } from '@/components/navigation'
import { ApiError } from '@/lib/api'
import { routes } from '@/routes/constants'
import { ContestProblemList } from './ContestProblemList'
import { ContestZipField } from './ContestZipField'
import { CreateContestSummary } from './CreateContestSummary'
import {
  CONTEST_CODE_HINT,
  getContestZipError,
  newContestProblem,
} from './constants'
import { createContestSchema } from './schema'
import type { CreateContestFormValues } from './types'
import { problemLetter } from './types'
import { useCreateContestMutation } from './use-create-contest'

const defaults: CreateContestFormValues = {
  nombre: '',
  descripcion: '',
  fechaInicio: '',
  duracionMinutos: 60,
  contrasena: '',
  urlSetProblemas: '',
  minutosCongelamiento: 0,
  codigo: '',
  listaProblemas: [newContestProblem()],
  archivoZip: undefined,
}

export function CreateContestPage() {
  const navigate = useNavigate()
  const mutation = useCreateContestMutation()
  const form = useForm<CreateContestFormValues>({
    defaultValues: defaults,
    // The UI contract is string-only; the schema additionally tolerates legacy absent values.
    resolver: zodResolver(
      createContestSchema,
    ) as Resolver<CreateContestFormValues>,
  })
  const values = form.watch()
  const { errors } = form.formState

  useEffect(() => {
    if (mutation.isSuccess) form.reset(defaults)
  }, [form, mutation.isSuccess])

  const errorMessage =
    mutation.error instanceof ApiError && mutation.error.status === 401
      ? 'Tu sesión no es válida o ha expirado.'
      : mutation.error instanceof Error
        ? mutation.error.message
        : undefined

  const onSubmit = (values: CreateContestFormValues) => {
    const zipError = getContestZipError(values.archivoZip)
    if (zipError) {
      form.setError('archivoZip', { type: 'validate', message: zipError })
      return
    }
    mutation.mutate(values)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Administración' },
          { label: 'Concursos', to: routes.contests },
          { label: 'Nuevo concurso' },
        ]}
      />
      <header>
        <h1 className="text-2xl font-bold">Crear concurso</h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Configurá los datos, problemas y archivo ZIP del concurso en una sola
          solicitud.
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
      {errorMessage && <Alert tone="danger">{errorMessage}</Alert>}

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
                hint={CONTEST_CODE_HINT}
                error={errors.codigo?.message}
              >
                <Input
                  placeholder="regional-2026"
                  autoCapitalize="none"
                  spellCheck={false}
                  disabled={mutation.isPending}
                  {...form.register('codigo')}
                />
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
                <FormField label="Contraseña (opcional)">
                  <PasswordInput
                    autoComplete="new-password"
                    disabled={mutation.isPending}
                    {...form.register('contrasena')}
                  />
                </FormField>
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
                  Adjuntá el archivo ZIP con los casos del concurso.
                </p>
              </div>
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
            .map((_, index) => problemLetter(index))
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
            Crear concurso
          </Button>
        </div>
      </form>
    </div>
  )
}
