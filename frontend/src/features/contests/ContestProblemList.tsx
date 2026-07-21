import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from 'react-hook-form'
import { Button, Card, IconButton } from '@/components/common'
import { FormError, Input, Label } from '@/components/forms'
import { MAX_CONTEST_PROBLEMS, newContestProblem } from './constants'
import { problemLetter, type CreateContestFormValues } from './types'

type Props = {
  control: Control<CreateContestFormValues>
  register: UseFormRegister<CreateContestFormValues>
  errors: FieldErrors<CreateContestFormValues>
  disabled?: boolean
}

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
  const [bulkOpen, setBulkOpen] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [bulkError, setBulkError] = useState<string>()
  const availableSlots = Math.max(0, MAX_CONTEST_PROBLEMS - fields.length)

  const closeBulk = () => {
    setBulkOpen(false)
    setQuantity('')
    setBulkError(undefined)
  }

  const addSeveral = () => {
    if (!/^\d+$/.test(quantity)) {
      setBulkError('Ingresá un número entero.')
      return
    }
    const count = Number(quantity)
    if (!Number.isSafeInteger(count) || count < 1) {
      setBulkError('La cantidad debe ser al menos 1.')
      return
    }
    if (count > availableSlots) {
      setBulkError(`Solo podés agregar hasta ${availableSlots} problemas.`)
      return
    }

    append(Array.from({ length: count }, newContestProblem))
    closeBulk()
  }

  return (
    <section aria-labelledby="problems-heading" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="problems-heading" className="text-lg font-semibold">
            Problemas
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Definí los límites de cada problema. Podés tener hasta{' '}
            {MAX_CONTEST_PROBLEMS} problemas; los incisos se asignan
            automáticamente.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <IconButton
            type="button"
            label="Agregar un problema"
            disabled={disabled || availableSlots === 0}
            className="border border-[var(--border)] enabled:hover:bg-[var(--surface-muted)] enabled:active:scale-95"
            onClick={() => append(newContestProblem())}
          >
            <Plus className="size-4" aria-hidden="true" />
          </IconButton>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || availableSlots === 0}
            className="enabled:hover:bg-[var(--surface-muted)] enabled:active:scale-[0.98]"
            onClick={() => {
              setBulkOpen(true)
              setBulkError(undefined)
            }}
          >
            Agregar varios
          </Button>
        </div>
      </div>
      {bulkOpen && (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-48 flex-1">
              <Label htmlFor="bulk-problem-quantity">Cantidad adicional</Label>
              <Input
                id="bulk-problem-quantity"
                inputMode="numeric"
                value={quantity}
                disabled={disabled || availableSlots === 0}
                aria-describedby={bulkError ? 'bulk-problem-error' : undefined}
                error={Boolean(bulkError)}
                onChange={(event) => {
                  setQuantity(event.target.value)
                  setBulkError(undefined)
                }}
              />
            </div>
            <p className="pb-2 text-sm text-[var(--text-secondary)]">
              Podés agregar hasta {availableSlots} problema
              {availableSlots === 1 ? '' : 's'}.
            </p>
            <Button
              type="button"
              size="sm"
              disabled={disabled || availableSlots === 0}
              onClick={addSeveral}
            >
              Agregar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={closeBulk}
            >
              Cancelar
            </Button>
          </div>
          {bulkError && (
            <FormError id="bulk-problem-error">{bulkError}</FormError>
          )}
        </div>
      )}
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
                  className="border border-[var(--danger)] text-[var(--danger)] enabled:hover:bg-red-50"
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
