# Task for scout

Read-only revalidation before continuing existing `uj08-uj09-create-contest-zip-import-frontend` under the user's newly approved complementary contract. Fetch fresh live OpenAPI at http://localhost:5185/swagger/v1/swagger.json and confirm endpoint exists, POST, multipart, Bearer, fields/types of CrearConcursoDto/CrearProblemaDto. Compare only incompatibilities against the now-approved DTO/field names; do NOT treat absent 200/error/indexed serialization examples as blockers because change artifacts+user approval are supplemental authority. Also inspect `C:\Users\af156\OneDrive\Escritorio\UPDS\DESARROLLO DE SIST II\PROYECTO\Crear Concurso - Paso 1.png` if readable, reporting only restrained layout guidance and no code edits. Do not edit or run OpenSpec CLI.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\7f5fe12b\contest-contract-revalidation.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: attested
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Return concrete findings with file paths and severity when applicable

Required evidence: review-findings, residual-risks

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