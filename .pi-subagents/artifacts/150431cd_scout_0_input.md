# Task for scout

Read-only documentation reconnaissance for user-authorized closure of existing change `sprint-1-frontend-core-api-ui-foundation`. Before a writer creates a detailed Spanish architecture/development guide, inspect ALL required source-of-truth artifacts: proposal/design/tasks/spec, entire frontend tree excluding node_modules/dist/coverage, package.json, vite config, all tsconfigs, lint config(s), .env.example, editorconfig/prettier, README, scripts, env, api client/error/endpoints, auth transport, query config, router, MSW, BrandMark, layouts, DevUi, every shared component module and existing tests. Produce a fact-only handbook outline with exact paths, actual component props/variants/states, scripts, real commands, environment variables, folder tree, test names, routes, and documentation constraints. Identify which current tasks.md wording must change to reflect: technical foundation complete; manual captures pending/non-blocking; OpenSpec CLI is no-applicable by project decision; no Swagger defects/back-end observations in docs. Do not edit. ## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
If discoveries matter, save to Engram project `upds-judge-front` before returning.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\150431cd\frontend-guide-scout.md
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