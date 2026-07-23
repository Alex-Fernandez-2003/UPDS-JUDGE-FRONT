// import { useState } from 'react'
// import Editor from 'react-simple-code-editor'
// import Prism from 'prismjs'
// import { Send } from 'lucide-react'

// import type { CreateSubmissionPayload } from '../Types/submissionTypes'
// import { validateSubmitSolution } from '../schemas/submit-solution.schema'

// import {
//   FormField,
//   Select,
//   Checkbox,
//   FileDropzone,
// } from '@/components/forms'

// import {
//   Button,
//   Card,
//   Divider,
// } from '../../../components/common/index'
// import 'prismjs/components/index.js'
// import 'prismjs/themes/prism-tomorrow.css'

// interface SubmitFormProps {
//   contestCode: string
//   onSubmit: (payload: CreateSubmissionPayload) => Promise<void>
//   isSubmitting?: boolean
// }

// /* =========================
//    PROBLEMAS
// ========================= */
// const PROBLEM_OPTIONS = [
//   { value: 'A', label: 'A — Matriz dispersa' },
//   { value: 'B', label: 'B — Secuencia creciente' },
//   { value: 'C', label: 'C — Caminos mínimos' },
//   { value: 'D', label: 'D — Árboles binarios' },
//   { value: 'E', label: 'E — Grafos conexos' },
// ]

// /* =========================
//    LENGUAJES DEL BACKEND
// ========================= */
// const LANGUAGE_OPTIONS = [
//   {
//     value: 'cpp',
//     label: 'C++ (GCC 9.2.0)',
//     judge0Id: 54,
//   },
//   {
//     value: 'py',
//     label: 'Python (3.8.1)',
//     judge0Id: 71,
//   },
//   {
//     value: 'cs',
//     label: 'C# (Mono 6.6.0.161)',
//     judge0Id: 51,
//   },
// ] as const

// /* =========================
//    PLANTILLAS AUTOMÁTICAS
// ========================= */
// const CODE_TEMPLATES: Record<string, string> = {
//   cpp: `#include <bits/stdc++.h>
// using namespace std;

// int main() {
//     cout << "Hola Mundo";
//     return 0;
// }`,

//   py: `def main():
//     print("Hola Mundo")

// if __name__ == "__main__":
//     main()`,

//   cs: `using System;

// class Program
// {
//     static void Main()
//     {
//         Console.WriteLine("Hola Mundo");
//     }
// }`,
// }

// export function SubmitForm({
//   contestCode,
//   onSubmit,
//   isSubmitting = false,
// }: SubmitFormProps) {
//   /* =========================
//      ESTADOS
//   ========================= */

//   const [problemCode, setProblemCode] = useState('')

//   // Lenguaje por defecto
//   const [language, setLanguage] = useState<'cpp' | 'py' | 'cs'>('cpp')

//   const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload')

//   // Guardar código por lenguaje
//   const [codeByLanguage, setCodeByLanguage] = useState({
//     cpp: CODE_TEMPLATES.cpp,
//     py: CODE_TEMPLATES.py,
//     cs: CODE_TEMPLATES.cs,
//   })

//   const [selectedFile, setSelectedFile] = useState<File>()
//   const [confirmedHonesty, setConfirmedHonesty] = useState(false)
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   /* =========================
//      CÓDIGO ACTUAL
//   ========================= */

//   // ESTA ES LA VARIABLE QUE SE ENVÍA AL BACKEND
//   const sourceCode = codeByLanguage[language]

//   const updateCode = (value: string) => {
//     setCodeByLanguage((prev) => ({
//       ...prev,
//       [language]: value,
//     }))
//   }

//   /* =========================
//      ENVÍO AL BACKEND
//   ========================= */

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validación checkbox
//     if (!confirmedHonesty) {
//       setErrors((prev) => ({
//         ...prev,
//         honesty: 'Debes confirmar la honestidad académica.',
//       }))
//       return
//     }

//     // AQUÍ SE TOMA EL TEXTO DEL EDITOR
//     const codeToSend =
//       activeTab === 'paste' ? sourceCode : undefined

//     const payload: CreateSubmissionPayload = {
//       contestCode,
//       problemCode,
//       language, // cpp | py | cs
//       file:
//         activeTab === 'upload'
//           ? selectedFile
//           : undefined,
//       sourceCode: codeToSend,
//     }

//     const validation = validateSubmitSolution(payload)

//     if (!validation.isValid) {
//       setErrors(validation.errors)
//       return
//     }

//     setErrors({})

//     await onSubmit(payload)
//   }

//   /* =========================
//      JSX
//   ========================= */

//   return (
//     <Card className="space-y-5">
//       {/* Header */}
//       <div>
//         <h2 className="text-lg font-semibold">
//           Enviar solución
//         </h2>
//       </div>

//       <Divider />

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//       >
//         {/* Problema */}
//         <FormField
//           label="Problema"
//           error={errors.problemCode}
//         >
//           <Select
//             value={problemCode}
//             onChange={(e) =>
//               setProblemCode(e.target.value)
//             }
//           >
//             <option value="">
//               Selecciona un problema
//             </option>

//             {PROBLEM_OPTIONS.map((problem) => (
//               <option
//                 key={problem.value}
//                 value={problem.value}
//               >
//                 {problem.label}
//               </option>
//             ))}
//           </Select>
//         </FormField>

//         {/* Lenguaje */}
//         <FormField
//           label="Lenguaje"
//           error={errors.language}
//         >
//           <Select
//             value={language}
//             onChange={(e) =>
//               setLanguage(
//                 e.target.value as 'cpp' | 'py' | 'cs',
//               )
//             }
//           >
//             {LANGUAGE_OPTIONS.map((lang) => (
//               <option
//                 key={lang.value}
//                 value={lang.value}
//               >
//                 {lang.label}
//               </option>
//             ))}
//           </Select>
//         </FormField>

//         {/* Tabs */}
//         <div className="grid grid-cols-2 gap-2">
//           <Button
//             type="button"
//             variant={
//               activeTab === 'upload'
//                 ? 'primary'
//                 : 'secondary'
//             }
//             onClick={() => setActiveTab('upload')}
//           >
//             Subir archivo
//           </Button>

//           <Button
//             type="button"
//             variant={
//               activeTab === 'paste'
//                 ? 'primary'
//                 : 'secondary'
//             }
//             onClick={() => setActiveTab('paste')}
//           >
//             Pegar código
//           </Button>
//         </div>

//         {/* Contenido */}
//         {activeTab === 'upload' ? (
//           <FormField
//             label="Archivo fuente"
//             error={errors.sourceCode}
//           >
//             <FileDropzone
//               accept=".cpp,.c,.py,.cs,.txt"
//               maxSizeBytes={2 * 1024 * 1024}
//               onChange={setSelectedFile}
//             />
//           </FormField>
//         ) : (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-medium text-[var(--text-primary)]">
//                 Código fuente
//               </label>

//               <span className="text-xs text-[var(--text-secondary)]">
//                 {
//                   LANGUAGE_OPTIONS.find(
//                     (l) => l.value === language,
//                   )?.label
//                 }
//               </span>
//             </div>

//             {/* Editor Prism */}
//             <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[#1E1E1E]">
//               <Editor
//                 value={sourceCode}
//                 onValueChange={updateCode}
//                 highlight={(code) => {
//                     const prismLanguage =
//                     language === 'cpp'
//                     ? 'cpp'
//                     : language === 'py'
//                     ? 'python'
//                     : 'csharp'
//                   return Prism.highlight(
//                     code,
//                     Prism.languages[prismLanguage] ?? Prism.languages.plain,
//                     prismLanguage,
//                   )
//                 }}
//                 padding={16}
//                 textareaId="code-editor"
//                 textareaClassName="outline-none"
//                 preClassName="!m-0"
//                 style={{
//                   fontFamily:
//                     'JetBrains Mono, Fira Code, monospace',
//                   fontSize: 14,
//                   minHeight: '420px',
//                   backgroundColor: '#1E1E1E',
//                   color: '#D4D4D4',
//                 }}
//               />
//             </div>

//             {errors.sourceCode && (
//               <p className="text-sm text-[var(--danger)]">
//                 {errors.sourceCode}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Honestidad */}
//         <div className="flex items-start gap-3">
//           <Checkbox
//             id="honesty-checkbox"
//             checked={confirmedHonesty}
//             onChange={(e) =>
//               setConfirmedHonesty(e.target.checked)
//             }
//           />

//           <label
//             htmlFor="honesty-checkbox"
//             className="text-sm text-[var(--text-secondary)]"
//           >
//             Confirmo que esta solución fue
//             desarrollada íntegramente por mí y
//             cumple las normas de honestidad
//             académica.
//           </label>
//         </div>

//         {errors.honesty && (
//           <p className="text-sm text-[var(--danger)]">
//             {errors.honesty}
//           </p>
//         )}

//         {/* Botón */}
//         <Button
//           type="submit"
//           fullWidth
//           loading={isSubmitting}
//           leftIcon={<Send className="size-4" />}
//         >
//           Enviar solución
//         </Button>
//       </form>
//     </Card>
//   )
// }