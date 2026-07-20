# Task for worker

Create ONLY `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`; all other repo files forbidden. You have exact user-authorized story data—do not ask or read extra: UJ-08 text `Como Administrador de Concursos, quiero crear un concurso con nombre, descripción, fecha de inicio, duración, enlace al PDF y minutos de congelamiento, para publicar una competencia configurada.` Priority Alta, normalized academic estimate 3 points. UJ-09 text `Como Administrador de Concursos, quiero subir un archivo ZIP con la estructura de carpetas A, B, C… para que los casos de prueba se carguen automáticamente.` Priority Crítica, estimate 8 points.

Use the current code facts in the parent's prompt/scout output: actual source names are CreateContestPage, ContestProblemList, CreateContestSummary, schema.ts, mapper.ts, service.ts, use-create-contest.ts, types.ts; endpoint relative Concursos/crear; route /admin/contests/new; handlers `frontend/src/mocks/handlers/index.ts`; tests schema/mapper/service/mutation/page/router/handlers; 11/41 validated suite. Write comprehensive Spanish documentation fulfilling all user-required headings/content. Do NOT use OpenSpec CLI/tests/formats. Clearly distinguish functional isolated implementation versus pending authenticated end-to-end/token-provider/sidebar/listing/refinement/captures; no Swagger problems/secrets/non-existent captures/false test coverage. Suggested capture paths must be plain code text, not links. No document is being updated; destination does not exist. Return changed target only.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\cdf860a1\uj08-uj09-history-final-writer.md
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