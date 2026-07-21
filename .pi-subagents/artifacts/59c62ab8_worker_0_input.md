# Task for worker

Implement ONLY incremental rules for existing fix change. Re-read current feature/change diff first. Allowed edits: frontend/src/features/contests/**; only if genuinely shared defect, frontend/src/components/common/** plus its tests/dev UI; docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/{design,spec,tasks}.md. No other files. Add central contest code constants/categories/pattern/error/hint/normalizer; schema validates normalized lower-case code formats, mapper sends normalized code; UI hint/placeholder autocapitalize none spellcheck false; tests. Change MAX_CONTEST_PROBLEMS from 26 to 12 central consumer; bulk messaging. Audit button styles: if global Button/IconButton lacks pointer/hover/disabled pointer correct shared safely and tests/dev UI; otherwise local. Deletion danger hover/red accessible, all controls correct type/button/no accidental submit. Update docs incrementally. Run full frontend validation+dev then stop. No CLI/commit/push.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\59c62ab8\contest-code-interaction-fix.md
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