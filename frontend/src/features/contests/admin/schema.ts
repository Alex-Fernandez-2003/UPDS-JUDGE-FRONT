import { z } from 'zod'
import {
  CONTEST_CODE_ERROR,
  CONTEST_CODE_PATTERN,
  MAX_CONTEST_PROBLEMS,
  MAX_CONTEST_ZIP_SIZE_BYTES,
  normalizeContestCode,
  normalizeContestPassword,
} from './constants'

const requiredText = (label: string) =>
  z.string().trim().min(1, `${label} es obligatorio.`)

const positiveInteger = (label: string) =>
  z
    .number({ error: `${label} es obligatorio.` })
    .int(`${label} debe ser un número entero.`)
    .positive(`${label} debe ser mayor que cero.`)

export const createContestSchema = z
  .object({
    nombre: requiredText('El nombre'),
    descripcion: requiredText('La descripción'),
    fechaInicio: requiredText('La fecha de inicio'),
    duracionMinutos: positiveInteger('La duración'),
    contrasena: z.preprocess(normalizeContestPassword, z.string()),
    urlSetProblemas: z
      .string()
      .trim()
      .min(1, 'La URL del set de problemas es obligatoria.')
      .url('La URL del set de problemas no es válida.'),
    minutosCongelamiento: z
      .number({ error: 'Los minutos de congelamiento son obligatorios.' })
      .int('Los minutos de congelamiento deben ser un número entero.')
      .min(0, 'Los minutos de congelamiento no pueden ser negativos.'),
    codigo: z
      .preprocess(normalizeContestCode, z.string())
      .refine((code) => code.length > 0, 'El código es obligatorio.')
      .refine((code) => CONTEST_CODE_PATTERN.test(code), CONTEST_CODE_ERROR),
    listaProblemas: z
      .array(
        z.object({
          titulo: requiredText('El título del problema'),
          tiempo: z
            .number({ error: 'El tiempo límite es obligatorio.' })
            .positive('El tiempo límite debe ser mayor que cero.'),
          memoria: positiveInteger('La memoria límite'),
        }),
      )
      .min(1, 'Debe incluir al menos un problema.')
      .max(
        MAX_CONTEST_PROBLEMS,
        `Puede incluir como máximo ${MAX_CONTEST_PROBLEMS} problemas.`,
      ),
    archivoZip: z
      .instanceof(File)
      .optional()
      .refine((file) => Boolean(file), 'El archivo ZIP es obligatorio.')
      .refine(
        (file) => !file || file.name.toLowerCase().endsWith('.zip'),
        'El archivo debe tener extensión .zip.',
      )
      .refine(
        (file) => !file || file.size <= MAX_CONTEST_ZIP_SIZE_BYTES,
        'El ZIP no puede superar 100 MB.',
      ),
  })
  .superRefine((values, context) => {
    if (values.minutosCongelamiento > values.duracionMinutos) {
      context.addIssue({
        code: 'custom',
        path: ['minutosCongelamiento'],
        message:
          'Los minutos de congelamiento no pueden superar la duración del concurso.',
      })
    }
  })
