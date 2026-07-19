# Task for scout

Read-only comprehensive repository documentation/code mapping for rewriting ONLY root `README.md` for UPDS JUDGE. Inspect current README; all existing docs/ (01-08 if present), OpenSpec changes and their tasks/status/archives, captures/images/diagrams paths, informe-final.tex metadata, database shape, frontend package/config/env/README/team guide/src, and Git branch/process evidence where relevant. Build an evidence-backed Spanish README fact sheet: confirmed project description, exact team names/roles only if documented, goal/scope, backlog IDs/status/sprint mapping, current Sprint 0/1 foundation state and remaining stories, architecture/repository separation/technology/ports/scripts/env, real docs and image/capture links that exist, DoR/DoD/work agreements/branch/commit conventions, security/testing/next steps. Explicitly flag ambiguities and prohibit invented claims. Verify every potential relative link target. Do not edit. Do not invoke OpenSpec CLI. ## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
Save material discoveries to Engram project `upds-judge-front` before returning.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\bfe98c16\root-readme-scout.md
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