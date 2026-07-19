# Task for worker

You are the single implementation writer replacing an unusable sdd-apply agent (it requests unavailable `glob`). Apply ONLY existing approved OpenSpec change `sprint-1-frontend-core-api-ui-foundation`. User approved explicit `size:exception`; no chain/PR/commit/push. User also explicitly authorized minimal `docs/openspec/config.yaml`. Authority docs have been read at `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/{proposal,design,tasks,spec}.md`.

ALLOWED edits only: `frontend/**`, `docs/openspec/config.yaml`, and real status updates to this change's `tasks.md`. Never modify proposal/spec/design or other docs. Do NOT touch backend, database, root README, academic docs, final report, commit/push/archive. Preserve existing work after inspection.

Backend `http://localhost:5185` is unreachable. OpenAPI/auth/endpoints/DTOs are unconfirmed. Implement the noncontractual foundation: current Vite Tailwind integration, 8085 strict dev/preview, Node-only proxy target with fallback, @ alias, env validation, npm scripts and approved dependencies, formatter/lint direct-fetch restriction, generic fetch-only HTTP client/error+Problem Details, neutral auth, TanStack Query, MSW infrastructure with zero contract handlers, fixtures/builders, semantic styles/tokens, all named shared UI primitives/forms/navigation/table primitives, Auth/Admin layouts, development-only router/catalog, tests, and frontend README. Do not invent endpoints, types, handlers or auth scheme. `endpoints.ts` must contain no routes. API types script must fail clearly while `OPENAPI_SCHEMA_URL` absent; do not create fake generated DTOs.

Use React asset exclusively as BrandMark placeholder fallback and Lucide functional icons. Ensure `.env`/`.env.local` ignored. Use only approved packages plus officially-required Tailwind Vite integration. No React/Vite/TS upgrade unless unavoidable. Follow TDD evidence after test setup. Run npm install, format check, lint, typecheck, test:run, build; dev server check at exact 8085 and /dev/ui then stop. Update task states only truthfully (tasks currently prose, no checkboxes; minimally add an execution-status section if needed). Include exact validation outcomes, modified files, remaining contract blocks. Save important discoveries to Engram project `upds-judge-front`.

## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\e0bfb14c\worker-sprint1-foundation.md
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