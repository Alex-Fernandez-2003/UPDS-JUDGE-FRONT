# Task for scout

Read-only discovery for implementing existing change `uj08-uj09-create-contest-zip-import-frontend`. Inspect all required frontend sources (package/vite/api/auth/query/types/components/layouts/routes/mocks/features/dev-ui/tests) and live backend URLs `http://localhost:5185/swagger` plus `/swagger/v1/swagger.json`. OpenAPI is sole truth. Return exact evidence on POST contest-creation path/method/multipart schema/request field names/indexed collection/response/errors/security, generated type diff need, existing patterns and reserved router composition. If contract differs critically from change field requirements, stop with exact discrepancy and do not recommend invented mapping. Do not edit, no OpenSpec CLI. ## Skills to load before work
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md
Save material discoveries to Engram project `upds-judge-front` before returning.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\74666171\contest-contract-scout.md
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