# Task for gentle-ai-worker

Implement the entire user request's existing change ONLY: uj11-partial-user-dashboard-stats-submissions-integration. Read four artifacts fully exact path docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/{proposal.md,design.md,spec.md,tasks.md}; inspect reference image C:/Users/af156/OneDrive/Escritorio/image.png. Writable frontend/src for user contests only plus required endpoint/msw/router/dashboard integration/tests; docs/historias/UJ-11-lista-concursos-filtrados.md new/update; active change tasks only. Must preserve admin etc. Baseline first, inspect local backend if present otherwise report unavailable. Follow all detailed prompt requirements (stats/recent submissions only, no contest list). User authorizes all needed feature files. Run validations all incl alternative dev port. No clarification/commit/push. Return detailed exact completion evidence.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\697184c8\uj11-partial.md
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