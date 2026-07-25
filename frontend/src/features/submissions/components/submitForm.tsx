import { useState } from 'react'
import { Code2, Upload, Send } from 'lucide-react'

import type { CrearEnvioDto } from '../Types/sumbitTypes'
import { validateSubmitSolution } from '../schemas/sumbitSolution'
import { submissionsService } from '../Types/sumbitService' 
import { SubmissionsFilter, type ProblemOption } from './submissionsFilter'

import {
  FormField,
  Select,
  FileDropzone,
} from '@/components/forms'

import { Button, Card, Divider } from '@/components/common'
import { CodeEditor } from './submtCodeEditor'

interface SubmitFormProps {
  contestCode: string
  onSubmit: (payload: CrearEnvioDto) => Promise<void>
  isSubmitting?: boolean
  problems?: ProblemOption[]
}

const DEFAULT_PROBLEMS: ProblemOption[] = [
  { inciso: 'A', titulo: 'Matriz dispersa' },
  { inciso: 'B', titulo: 'Secuencia creciente' },
  { inciso: 'C', titulo: 'Caminos mínimos' },
]

const LANGUAGE_OPTIONS = [
  { value: 1, label: 'C++ 17', key: 'cpp' },
  { value: 2, label: 'Python 3', key: 'py' },
  { value: 3, label: 'C#', key: 'cs' },
] as const

const CODE_TEMPLATES: Record<number, string> = {
  1: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    return 0;\n}`,
  2: `def solve():\n    pass\n\nif __name__ == "__main__":\n    solve()`,
  3: `using System;\n\nclass Program {\n    static void Main() {\n    }\n}`,
}

export function SubmitForm({
  contestCode,
  onSubmit,
  isSubmitting = false,
  problems = DEFAULT_PROBLEMS,
}: SubmitFormProps) {
  const [incisoProblema, setIncisoProblema] = useState('')
  const [idLenguaje, setIdLenguaje] = useState<number>(1)
  const [mode, setMode] = useState<'upload' | 'paste'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [codeByLanguage, setCodeByLanguage] =
    useState<Record<number, string>>(CODE_TEMPLATES)

  const currentCode = codeByLanguage[idLenguaje] || ''

  const handleLanguageChange = (newId: number) => {
    setIdLenguaje(newId)
    if (!codeByLanguage[newId]) {
      setCodeByLanguage(prev => ({ ...prev, [newId]: CODE_TEMPLATES[newId] || '' }))
    }
  }

  const updateCode = (value: string) => {
    setCodeByLanguage((prev) => ({ ...prev, [idLenguaje]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 1. Validar con el Schema
    const validation = validateSubmitSolution({
      incisoProblema,
      idLenguaje,
      mode,
      file: selectedFile,
      sourceCode: currentCode,
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setErrors({}) // Limpiamos errores previos

    try {
      let codigoFuenteFinal = ''
      
      // 2. Extraer código como texto puro (String)
      if (mode === 'upload' && selectedFile) {
        codigoFuenteFinal = await submissionsService.readFileAsText(selectedFile)
      } else {
        codigoFuenteFinal = currentCode
      }

      // 3. Armar el DTO para el backend
      const payload: CrearEnvioDto = {
        codigoConcurso: contestCode,
        incisoProblema,
        idLenguaje,
        codigoFuente: codigoFuenteFinal,
      }

      // 4. Enviar a la API
      await onSubmit(payload)
      
      // 5. Limpiar archivo tras éxito
      if (mode === 'upload') {
        setSelectedFile(undefined)
      }
      
    } catch (error) {
      console.error(error)
      setErrors({ form: 'Error al procesar el archivo o contactar al servidor.' })
    }
  }

  const currentLanguageConfig = LANGUAGE_OPTIONS.find((x) => x.value === idLenguaje)
  const prismLanguage = currentLanguageConfig?.key === 'cpp' ? 'cpp' : 
                        currentLanguageConfig?.key === 'py' ? 'python' : 'csharp'

  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Enviar solución</h2>
            <p className="text-sm text-slate-300">Concurso: {contestCode}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {errors.form && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-600">
            {errors.form}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {/* Selector de Problema reutilizando SubmissionsFilter */}
          <FormField label="Problema" error={errors.incisoProblema}>
            <SubmissionsFilter
              value={incisoProblema}
              onChange={(val) => setIncisoProblema(val)}
              problems={problems}
              placeholder="Selecciona un problema"
              showIcon={false}
            />
          </FormField>

          <FormField label="Lenguaje" error={errors.idLenguaje}>
            <Select
              value={idLenguaje}
              onChange={(e) => handleLanguageChange(Number(e.target.value))}
            >
              {LANGUAGE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </Select>
          </FormField>
        </div>

        <Divider />

        {/* Tabs de Modo */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`rounded-2xl border px-4 py-3 font-medium transition ${
              mode === 'upload'
                ? 'border-slate-800 bg-slate-900 text-white'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Upload className="mr-2 inline h-4 w-4" />
            Subir archivo
          </button>

          <button
            type="button"
            onClick={() => setMode('paste')}
            className={`rounded-2xl border px-4 py-3 font-medium transition ${
              mode === 'paste'
                ? 'border-slate-800 bg-slate-900 text-white'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Code2 className="mr-2 inline h-4 w-4" />
            Pegar código
          </button>
        </div>

        {/* Área de entrada de código */}
        {mode === 'upload' ? (
          <div className="space-y-2">
            <FormField label="Archivo fuente" error={errors.file}>
              <FileDropzone
                accept=".cpp,.py,.cs"
                maxSizeBytes={2 * 1024 * 1024}
                onChange={(file) => setSelectedFile(file)} 
              />
            </FormField>
            {selectedFile && (
              <p className="text-sm text-slate-600 italic px-1">
                Archivo seleccionado: <span className="font-semibold">{selectedFile.name}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-800">Código fuente</label>
              <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600">
                {currentLanguageConfig?.label}
              </span>
            </div>

            <CodeEditor
              value={currentCode}
              language={prismLanguage}
              onChange={updateCode}
            />
            {errors.sourceCode && (
              <p className="text-xs text-red-600">{errors.sourceCode}</p>
            )}
          </div>
        )}

        <Divider />

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          loading={isSubmitting}
          leftIcon={!isSubmitting && <Send className="h-4 w-4" />}
        >
          {isSubmitting ? 'Evaluando...' : 'Enviar solución'}
        </Button>
      </form>
    </Card>
  )
}