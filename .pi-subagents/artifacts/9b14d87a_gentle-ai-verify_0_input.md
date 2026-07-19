# Task for gentle-ai-verify

Read-only final audit of root README rewrite. Do not edit/run OpenSpec. Verify README meets required Spanish sections/title/TOC/project/team exact documented roster/objective/scope/status/Sprint0-1/backlog/architecture/repos/technologies/ports/frontend commands/env/tree/frontend architecture/docs links/Git branches+commits/DoR+DoD/agreements/standards/security/tests/catalog/evidence/next steps. Cross-check against current repository/docs/package/frontend implementation. Validate all local markdown links target existing files and ensure no Home Fit, secrets, invented endpoint/routes/members/functional claims/backend-in-repo or Swagger defects. Confirm only README was edited by this task versus pre-existing docs changes. Report precise blockers/warnings and read-only check results.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\9b14d87a\root-readme-final-verify.md
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