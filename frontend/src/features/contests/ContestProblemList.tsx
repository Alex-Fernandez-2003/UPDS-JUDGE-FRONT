import { Plus, Trash2 } from 'lucide-react'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'
import { Button, Card, IconButton } from '@/components/common'
import { FormError, Input, Label } from '@/components/forms'
import { problemLetter, type CreateContestFormValues } from './types'

type Props = {
  control: Control<CreateContestFormValues>
  register: UseFormRegister<CreateContestFormValues>
  errors: FieldErrors<CreateContestFormValues>
  disabled?: boolean
}

const newProblem = () => ({ titulo: '', tiempo: 1, memoria: 256 })

export function ContestProblemList({
  control,
  register,
  errors,
  disabled,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listaProblemas',
  })

  return (
    <section aria-labelledby="problems-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="problems-heading" className="text-lg font-semibold">
            Problemas
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Definí los límites de cada problema. Los incisos se asignan
            automáticamente.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<Plus className="size-4" aria-hidden="true" />}
          disabled={disabled || fields.length >= 26}
          onClick={() => append(newProblem())}
        >
          Agregar problema
        </Button>
      </div>
      {errors.listaProblemas?.message && (
        <FormError>{errors.listaProblemas.message}</FormError>
      )}
      <div className="space-y-3">
        {fields.map((field, index) => {
          const problemErrors = errors.listaProblemas?.[index]
          const letter = problemLetter(index)
          return (
            <Card key={field.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Problema {letter}</h3>
                <IconButton
                  type="button"
                  label={`Eliminar problema ${letter}`}
                  disabled={disabled || fields.length === 1}
                  onClick={() => remove(index)}
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </IconButton>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                  <Label htmlFor={`problem-${index}-title`}>Título</Label>
                  <Input
                    id={`problem-${index}-title`}
                    error={Boolean(problemErrors?.titulo)}
                    aria-describedby={
                      problemErrors?.titulo
                        ? `problem-${index}-title-error`
                        : undefined
                    }
                    disabled={disabled}
                    {...register(`listaProblemas.${index}.titulo`)}
                  />
                  {problemErrors?.titulo && (
                    <FormError id={`problem-${index}-title-error`}>
                      {problemErrors.titulo.message}
                    </FormError>
                  )}
                </div>
                <div>
                  <Label htmlFor={`problem-${index}-time`}>
                    Tiempo límite (segundos)
                  </Label>
                  <Input
                    id={`problem-${index}-time`}
                    type="number"
                    min="0.01"
                    step="any"
                    error={Boolean(problemErrors?.tiempo)}
                    aria-describedby={
                      problemErrors?.tiempo
                        ? `problem-${index}-time-error`
                        : undefined
                    }
                    disabled={disabled}
                    {...register(`listaProblemas.${index}.tiempo`, {
                      valueAsNumber: true,
                    })}
                  />
                  {problemErrors?.tiempo && (
                    <FormError id={`problem-${index}-time-error`}>
                      {problemErrors.tiempo.message}
                    </FormError>
                  )}
                </div>
                <div>
                  <Label htmlFor={`problem-${index}-memory`}>
                    Memoria límite (MB)
                  </Label>
                  <Input
                    id={`problem-${index}-memory`}
                    type="number"
                    min="1"
                    step="1"
                    error={Boolean(problemErrors?.memoria)}
                    aria-describedby={
                      problemErrors?.memoria
                        ? `problem-${index}-memory-error`
                        : undefined
                    }
                    disabled={disabled}
                    {...register(`listaProblemas.${index}.memoria`, {
                      valueAsNumber: true,
                    })}
                  />
                  {problemErrors?.memoria && (
                    <FormError id={`problem-${index}-memory-error`}>
                      {problemErrors.memoria.message}
                    </FormError>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
