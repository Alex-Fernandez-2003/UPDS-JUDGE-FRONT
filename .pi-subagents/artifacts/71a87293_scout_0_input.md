# Task for scout

Read-only fact mapping for expanding ONLY `frontend/docs/guia-arquitectura-y-desarrollo.md` with two Spanish beginner tutorials. Inspect mandatory actual sources: all frontend component modules (common/forms/navigation/tables), DevUi, api/auth/query/MSW/routes/types/env/Vite/package config, existing guide, generated OpenAPI path types, and all tests. Extract exact signatures, props, variants, exports/import paths, route/config behavior, test setup patterns, and Markdown insertion point before `## Checklist para un PR de frontend`. Build a precise content outline for: (1) StatCard case study and conceptual SectionHeader; (2) educational POST login contract path from OpenAPI types through future feature service/mutation/component to HttpClient/proxy/MSW. Mark conceptual samples as not currently implemented. No edits, no OpenSpec CLI, no api:type regeneration. ## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
Save discoveries to Engram project `upds-judge-front` before returning.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\71a87293\tutorials-scout.md
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