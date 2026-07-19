# Task for sdd-apply

Implement the existing approved OpenSpec change `sprint-1-frontend-core-api-ui-foundation` in the active worktree as the sole writer. The user has now explicitly authorized creating the minimal `docs/openspec/config.yaml` required by SDD. Session status fallback: the native sdd-status agent timed out twice; OpenSpec config was absent, so use this explicit authorization plus the existing four change artifacts as authority. Apply scope roots ONLY: `frontend/**`, `docs/openspec/config.yaml`, and truthful status updates to `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md`. Do not create/rewrite proposal/spec/design or any other docs. Do not touch backend, database, root README, academic docs, final report. No commits, pushes, PRs, archives, or invented endpoints/DTOs.

Contract facts confirmed by read-only scout: backend `http://localhost:5185` is unreachable; no OpenAPI URL, auth scheme, endpoints, DTOs, or error contracts were observable. Therefore implement all non-contractual foundation, but keep `endpoints.ts` empty/explicitly contract-pending; do not create `api.generated.ts` or fake types; write a real `api:types` script that clearly fails if `OPENAPI_SCHEMA_URL` is missing; create only MSW infrastructure + generic safe builders and zero API handlers; keep auth transport neutral. No direct fetch outside the shared HTTP client (and approved generation script if it truly uses fetch); use existing Oxlint only if it can enforce the restriction, otherwise add compatible ESLint without removing Oxlint and make `npm run lint` enforce the rule.

Implement ports/proxy/alias/env, Tailwind through official current Vite integration, query provider, HTTP client/problem-details tests, neutral auth, styles/tokens, all specified base components/forms/navigation/table primitives/layouts/router/dev-only `/dev/ui`, tests, README, and truthful task states. Use React starter asset only via BrandMark fallback, Lucide functional icons. Preserve inspected starter assets only where needed. Ensure `.env` and `.env.local` ignored. Use npm and only approved dependencies (plus Tailwind official Vite integration needed for Vite 8 compatibility); do not update React/Vite/TypeScript unnecessarily. Follow strict TDD for behavioral units after test setup: RED/GREEN/TRIANGULATE/REFACTOR, and report evidence.

Before finishing run: `npm install`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, `npm run build` from frontend. Start dev server, confirm exactly port 8085 and `/dev/ui`, then stop it. Report exact changed files, commands/results, contract blocks, task statuses, and risks. Do not claim validations that fail. Also save significant discoveries/decisions to Engram for project `upds-judge-front` before returning.

## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\a93ae566\sdd-apply-foundation.md
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