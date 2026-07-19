# Task for gentle-ai-worker

Surgical documentation fix only. Modify ONLY `frontend/docs/guia-arquitectura-y-desarrollo.md`. The independent verifier found the tutorial lines 426/444 incorrectly import nonexistent named `LoginRequest`/`LoginResponse` aliases. Inspect actual `frontend/src/types/api.generated.ts` and correct code samples to derive aliases from its real exported `components` object, e.g. `type LoginRequest = components['schemas']['LoginRequest']` and same for LoginResponse, with a real type-only import. Do not alter any other content/file. Then run only from frontend: `npx prettier --write docs/guia-arquitectura-y-desarrollo.md` and `npm run format:check`. No API generation, OpenSpec CLI, source changes, commit, or push. Report exact diff and result.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\3180a69d\tutorials-alias-fix.md
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