# Task for gentle-ai-worker

Implement user-requested existing change ONLY. Read full artifacts exact: docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/{proposal.md,design.md,spec.md,tasks.md}. Scope authorized frontend/src/**, frontend/index.html, frontend package config only if specs mandate; docs/historias/app-shell-sidebar-layouts-routing-por-roles.md only; that change tasks.md only. No others. Inspect current repo/backend reference existing local source/docs if available; do not network if not. Capture baseline commands root git + frontend format/lint/typecheck/tests/build. Implement entirety based on four artifacts: contract filters/listing vs independent summary query, cards/reload policy/MSW/tests, real logo reusable branding, inspect assets components/globe refactor min, visible existing user layout with UserMenu. User explicit authorization for required creations/moves/deletions. Validation commands authorized: format check/lint/typecheck/tests/build/dev scoped prettier touched. Do not ask scope questions; report honest constraints/full detail and save memory.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\9afbb98a\contest-branding-user-layout.md
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