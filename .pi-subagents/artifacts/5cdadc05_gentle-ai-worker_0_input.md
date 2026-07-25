# Task for gentle-ai-worker

Implement full user-requested existing change sprint-1-retrospective-shared-components-contests-boundaries. First complete read: docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/{proposal.md,design.md,spec.md,tasks.md}. User prompt is complete spec and authorization. Writable: frontend/src/**, docs/retrospectivas/** new/move, move docs/historias/app-shell-sidebar-layouts-routing-por-roles.md to formal retrospective, only active change tasks. Do not other docs/change/backend. Read baselines/inventories then scope implementation: optional className public visual shared components native props/ref, structural admin contests move (no behavior), tests, doc movement Starfish SMART. User explicitly authorizes required file moves/deletions. Run baseline/final authorized git status etc and frontend format/lint/typecheck/test/build/dev plus scoped prettier. Do not ask clarification; report exact status honest.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\5cdadc05\sprint1-retro-boundaries.md
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