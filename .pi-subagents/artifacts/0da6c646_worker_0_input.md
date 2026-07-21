# Task for worker

Update ONLY `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`. The current document is incomplete; preserve correct content but reorganize/expand it to include every required heading and factual content explicitly demanded by the user. No other files/commands/tests/OpenSpec CLI. Must start exact title, then include these exact top-level sections: Estado; Change asociado; Motivo; Historias de usuario; Alcance implementado; Criterios cumplidos — UJ-08; Criterios cumplidos — UJ-09; Diseño de la pantalla; Secciones del formulario; Contrato backend; Formulario multipart; Flujo frontend; Registro dinámico de problemas; Tratamiento del paquete ZIP; Respuesta exitosa; Manejo de errores; Estado de la integración de autenticación; Simulación con MSW; Archivos principales; Pruebas realizadas; Evidencia sugerida; Confirmaciones de seguridad; Integraciones pendientes; Fuera de alcance; Conclusión.

Use exact required state lines: frontend implementation functional complete; authenticated end-to-end pending; final visual refinement pending; manual captures pending/non-blocking. Include change reason atomic multipart, full user stories/priorities/estimates supplied earlier, all code facts/multipart names/response sample/known safe messages, safety caveats and pending auth/list/sidebar/refinement/captures. List real file paths from scout, actual commands/results (11/41), and suggested capture paths as plain code only with nonexistence warning. Do not document Swagger defects, secrets or unproven backend internals. Do not claim all individual page/error behaviors are directly tested. After write, only read target back and report target path.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\0da6c646\uj08-uj09-history-expand.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: checked
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope

Required evidence: changed-files, tests-added, commands-run, residual-risks, no-staged-files

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
`criteriaSatisfied[].status` must be exactly one of: satisfied, not-satisfied, not-applicable.
`commandsRun[].result` must be exactly one of: passed, failed, not-run.
`manualNotes` and `notes` are optional strings; an empty string means no note and does not satisfy `manual-notes` evidence.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```