# Task for gentle-ai-verify

Read-only final verification of the current pending-contract implementation for `sprint-1-frontend-core-api-ui-foundation`. Do not edit. Confirm from live `http://localhost:5185/swagger/v1/swagger.json` that generated `frontend/src/types/api.generated.ts`, exact endpoints, JWT Bearer transport behavior, typed MSW 200-only handlers, and error resilience match the contract/no-invention limits. Run from `frontend/`: api:types, format:check, lint, typecheck, test:run, build. Verify generated file header, no token persistence/localStorage, no functional auth pages/forms, and only allowed modified roots. Start own Vite server if port free; otherwise identify any existing process and do not kill unrelated work. Smoke proxy safely without credentials. Attempt OpenSpec command if available. Return evidence, results, remaining blocks, and exact status. ## Skills to load before work
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md
Save material discoveries to Engram `upds-judge-front` before return.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\9ffb23c5\openapi-final-verify.md
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