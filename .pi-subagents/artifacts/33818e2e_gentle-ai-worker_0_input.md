# Task for gentle-ai-worker

Continue from your partial implementation. The user explicitly supplied approved exact bodies; use these literals and do not invent alternatives:
- MSW 200: `{ "codigo": "contest-demo", "mensaje": "Concurso, problemas y casos de prueba creados exitosamente." }`
- MSW 400: `{ "mensaje": "El nombre del concurso es obligatorio." }`
- MSW 401: `{ "mensaje": "Token inválido" }`
Other approved possible 400 messages exist, but use only the exact bodies above for controlled scenarios. Complete MSW handler/tests and all missing requested tests/validation/task update. Keep same strict scope and no protected files. Re-read partial changed files before editing. Run format:check, lint, typecheck, test:run, build, Vite 8085 /admin/contests/new and /dev/ui then stop own process. Run no OpenSpec CLI. Report exact results.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\33818e2e\contest-feature-completion.md
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