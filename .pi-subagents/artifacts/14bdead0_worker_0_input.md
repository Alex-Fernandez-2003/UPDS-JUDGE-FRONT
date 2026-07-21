# Task for worker

Implement ONLY existing change `fix-create-contest-password-zip-and-form-ux`, using scout `C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\c2d5ae9f\contest-fix-scout.md`. Single writer. Allowed: `frontend/src/features/contests/**`, feature tests, and `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/tasks.md`; no shared component/router/auth/api/docs elsewhere unless a test proves absolutely required. Use feature-local controlled ContestZipField/wrapper, feature constants/default factory as recommended. Keep current correct password wire behavior but strengthen undefined normalization/schema/mapper tests. Implement exact MAX 100 MiB, selected ZIP UX/change/remove/native input reset, IconButton Plus, bulk inline flow atomic/validation, summary header/warning/local interaction styling and comprehensive requested tests. Do not touch shared components/dev UI, OpenSpec CLI, backend/auth/layout/listing. Reference image unavailable—only explicit spec visual hierarchy. Update tasks true status. Run frontend format/lint/typecheck/test/build/dev verify routes stop server. Report exact outcomes.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\14bdead0\contest-fix-implementation.md
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