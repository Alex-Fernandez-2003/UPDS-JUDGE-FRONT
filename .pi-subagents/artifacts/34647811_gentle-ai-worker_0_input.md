# Task for gentle-ai-worker

Rewrite ONLY root `README.md` into a complete Spanish UPDS JUDGE project README. This is documentation-only. Do not modify any other path, including the already modified docs files; do not run OpenSpec CLI, no code/dependencies/migrations/commit/push/archive. Read the evidence mapping first: `C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\bfe98c16\root-readme-scout.md`.

Use the user's requested README structure and all specified sections: exact `# UPDS JUDGE`, manageable TOC, description, confirmed team names (use docs/01 roster precisely), objective, include/out-of-scope, real state table distinguishing foundation vs stories, documented Sprint 0 and Sprint 1 (UJ-05/UJ-06/UJ-08/UJ-09 pending), concise 15-row product backlog with canonical IDs/priority/sprint/status, architecture, repos, technology split, ports, actual frontend execution/scripts/env, real simplified repository tree, frontend architecture, verified documentation links, Git workflow/branch convention/commit convention, DoR/DoD based on existing docs and real frontend commands, work agreements, dev standards/security/tests/component catalog/evidence/next steps. Add visual links only to existing valid files; no broken capture links. Mention OpenSpec only as manual technical change artifacts; never reference an executable/CLI.

Use implementation/status facts over stale docs: frontend foundation technically complete, but no functional login/register/session/guards/contests/ZIP/Judge0/SignalR/CI/deployment. Backend is separate; documented URL `https://github.com/wilsonyucra413-sys/UPDSjudge` may be stated, but not operation/integration claims. Do not enumerate endpoints or Swagger defects. Clearly say Swagger/OpenAPI is contract source of truth. No secrets/tokens/credentials. Do not use Home Fit AI content.

For DoR/DoD process, accurately present documented project guidance and frontend validation commands. Branch table must not invent unconfirmed branch types: use documented feature/fix/docs/chore only; use confirmed commit types feat/fix/docs/chore/refactor/test. No roles unless only names; do not assert suggested roles. Include external docs and actual capture links only after verifying them. Do not include `.pi`/`.pi-subagents` in README tree.

Preserve valid current information only where consistent. After writing run `npx prettier --write README.md` (that exact file only), check markdown relative links target real repo files, run `git diff -- README.md`, `git diff --check`, and `git status --short`; report exact outcomes and changed paths. ## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
Save material discoveries to Engram project `upds-judge-front` before return.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\34647811\root-readme-writer.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: reviewed
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope
- criterion-2: Return evidence sufficient for an independent acceptance review

Required evidence: changed-files, tests-added, commands-run, validation-output, residual-risks, no-staged-files

Review gate: required by reviewer.

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
    },
    {
      "id": "criterion-2",
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