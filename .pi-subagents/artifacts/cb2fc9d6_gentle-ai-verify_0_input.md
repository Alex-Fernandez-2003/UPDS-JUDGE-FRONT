# Task for gentle-ai-verify

Read-only closure verification for existing change `sprint-1-frontend-core-api-ui-foundation`. First inspect current git state: do NOT alter/revert `docs/07-plan-ready-to-sprint.md`; explicitly report whether it remains modified. Confirm whether root `package-lock.json` exists/untracked versus valid `frontend/package-lock.json`. Then inspect only the change/frontend diff and confirm OpenAPI generation, generated types, exact endpoint registry, in-memory Bearer transport/no persistence, MSW exact 200-only handlers, and Vite proxy configuration remain correct. From `frontend/`, run exactly: npm run api:types, format:check, lint, typecheck, test:run, build. Check whether `openspec` CLI exists but do not alter artifacts. Do not edit any file. Return exact results, remaining foreign files, scope violations, and actual task closure/pending status.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\cb2fc9d6\sprint1-closure-verify.md
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