# Task for gentle-ai-worker

Resume. Exact artifacts: docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/{proposal.md,design.md,spec.md,tasks.md}; read fully. Authorized edit surfaces: frontend/src/**, frontend relevant config only if artifacts require, frontend tests/mocks, docs/historias/app-shell-sidebar-layouts-routing-por-roles.md (create), only that change tasks.md; do NOT other docs/backend/database/readmes/other changes. Authorized commands: from root git branch/status/log; from frontend npm run format:check, lint,typecheck,test:run,build,dev; scoped prettier only changed paths; git diff checks/rg audit. Previous user prompt is full spec: execute it all; do not request clarification. Explicit user approval for writes/deletion/moves necessary within permitted scope.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\d9267ceb\role-aware-shell-final.md
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