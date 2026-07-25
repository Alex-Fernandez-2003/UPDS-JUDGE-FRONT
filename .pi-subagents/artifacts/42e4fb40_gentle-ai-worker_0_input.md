# Task for gentle-ai-worker

Implement full latest continuation NOW, no refusing: exact active change artifacts docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/{proposal.md,design.md,spec.md,tasks.md}; histories named in user prompt. Explicit scope/write permissions frontend/src/**, tests/mocks/routes/layouts, listed histories, only active tasks. UJ13 absence is explicit authorization to implement in features/problems using actual backend C:/dev/UPDSjudge dashboard contract. Complete ALL six task categories from latest prompt: alignment, real global pagination, visual tables, responsive specific table, remove stats in Submissions, Problems route/tab/page. Run full required validation incl build/dev alternate port. Do not seek clarification. Return exact report.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\42e4fb40\final-uj13-pagination.md
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