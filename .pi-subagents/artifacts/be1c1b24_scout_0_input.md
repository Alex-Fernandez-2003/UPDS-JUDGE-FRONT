# Task for scout

Read-only evidence mapping to create ONLY `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`. First inspect whether it exists. Read all four associated change artifacts, real contest feature sources/tests, API endpoints/client/auth, router, MSW handlers/tests, and actual task status. Extract exact filenames, exported names, code behavior, form/schema constraints, multipart keys, UI composition, response/error behavior, test count/commands evidence and pending integrations. Build a precise Spanish document outline covering every user-required heading without exposing Swagger defects, secrets or non-existing behavior. Verify which suggested evidence paths exist and do not use nonexistent image links. Do not edit or run OpenSpec CLI/tests.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\be1c1b24\uj08-uj09-doc-scout.md
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