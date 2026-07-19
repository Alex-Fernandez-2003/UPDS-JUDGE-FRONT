# Sprint 1 closure verification

## Result

**Closure: pending / not attested.** The frontend technical command suite passed, but closure is blocked by out-of-scope working-tree changes and unavailable OpenSpec CLI validation. Manual capture evidence is also explicitly pending in the change tasks.

## Concrete findings

- **blocker — scope violation:** `docs/07-plan-ready-to-sprint.md` remains modified (`git status --short`: `M`). It was not altered or reverted during this verification. The change spec prohibits modifying existing academic documents under `docs/`.
- **blocker — scope violation:** root `package-lock.json` exists and is untracked (`?? package-lock.json`, 95 bytes). The valid project lockfile is `frontend/package-lock.json`, which exists (140,040 bytes) and is modified as part of frontend dependency work. The root lockfile is outside the stated frontend/OpenSpec scope.
- **blocker — pending external validation:** `openspec` CLI was not found (`command -v openspec` produced `not found`); no artifacts were altered.
- **pending evidence:** `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` records Task 47 manual captures as pending.
- **warning:** `npm run api:types` passed but emitted Node deprecation warning `DEP0190` from `scripts/generate-api-types.mjs` using `execFileSync(..., { shell: true })` on Windows. This did not fail the command.

## Confirmed implementation evidence

- OpenAPI generation: `frontend/package.json` defines `api:types`; `frontend/scripts/generate-api-types.mjs` generates `src/types/api.generated.ts` from `OPENAPI_SCHEMA_URL`; generation completed against `http://localhost:5185/swagger/v1/swagger.json`. `frontend/src/types/api.generated.ts` declares it is auto-generated.
- Exact endpoint registry: `frontend/src/lib/api/endpoints.ts` contains only relative confirmed auth routes `Auth/login` and `Auth/register`; they resolve through the `/api` base URL in `frontend/src/lib/api/http-client.ts` and match generated paths `/api/Auth/login` and `/api/Auth/register`.
- Auth transport: `frontend/src/lib/auth/auth-transport.ts` creates an optional in-memory callback-backed `Bearer <token>` header; source scan found no `localStorage`, `sessionStorage`, `indexedDB`, or cookie persistence in `frontend/src`.
- MSW: `frontend/src/mocks/handlers/index.ts` registers only exact `POST /api/Auth/login` and `POST /api/Auth/register` handlers, both typed from generated schemas and returning status 200 only. `frontend/src/mocks/handlers/handlers.test.ts` exercises both exact routes.
- Vite: `frontend/vite.config.ts` configures development and preview port 8085 with `strictPort: true`, and a Node/Vite-only `/api` proxy whose target is `API_PROXY_TARGET` or `http://localhost:5185`.

## Commands run and observed result

1. `git status --short ... command -v openspec` — found foreign modifications/untracked files; docs plan remains modified; root lockfile exists untracked; frontend lockfile exists; OpenSpec CLI absent.
2. `cd frontend && npm run api:types && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build` — passed all commands. Vitest: 6 files / 29 tests passed. Vite build completed in 545 ms.

## Remaining foreign files

- Modified outside intended scope: `docs/07-plan-ready-to-sprint.md`.
- Untracked outside intended change/frontend scope: root `package-lock.json`, `.pi/`, `.pi-subagents/` (automation artifacts and prior outputs).
- Untracked change artifacts: `docs/openspec/config.yaml` and `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/{proposal.md,spec.md,design.md,tasks.md}`.
- Frontend modified/untracked files are the implementation under review, including `frontend/package-lock.json`.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete blockers, warnings, verified behavior, commands, and supporting paths are listed above."
    }
  ],
  "changedFiles": [
    "docs/07-plan-ready-to-sprint.md",
    "package-lock.json",
    "frontend/package-lock.json",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/lib/auth/auth-transport.ts",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/vite.config.ts"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/lib/api/http-client.test.ts",
    "frontend/src/mocks/handlers/handlers.test.ts"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run api:types",
      "result": "passed",
      "summary": "Generated src/types/api.generated.ts from http://localhost:5185/swagger/v1/swagger.json; emitted DEP0190 warning."
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "passed",
      "summary": "All matched files use Prettier code style."
    },
    {
      "command": "cd frontend && npm run lint",
      "result": "passed",
      "summary": "oxlint exited successfully."
    },
    {
      "command": "cd frontend && npm run typecheck",
      "result": "passed",
      "summary": "tsc -b exited successfully."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "6 test files and 29 tests passed."
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "tsc -b and vite build completed successfully."
    },
    {
      "command": "command -v openspec",
      "result": "not-run",
      "summary": "CLI lookup completed; openspec was not found, so no OpenSpec validation command could run."
    }
  ],
  "validationOutput": [
    "Frontend generation, formatting, lint, typecheck, tests, and build passed.",
    "OpenSpec CLI unavailable.",
    "docs/07-plan-ready-to-sprint.md remains modified.",
    "Root package-lock.json exists and is untracked; frontend/package-lock.json is the valid frontend lockfile."
  ],
  "residualRisks": [
    "Closure cannot be attested until foreign docs/07-plan-ready-to-sprint.md and root package-lock.json scope violations are resolved by their owner.",
    "OpenSpec CLI validation remains unverified because the CLI is unavailable.",
    "Manual capture evidence (Task 47) remains pending.",
    "DEP0190 warning remains in OpenAPI generation on Windows."
  ],
  "noStagedFiles": true,
  "diffSummary": "Frontend foundation and OpenSpec change are present; unrelated modified academic document and untracked root lockfile prevent clean scope closure.",
  "reviewFindings": [
    "blocker: docs/07-plan-ready-to-sprint.md - remains modified outside the permitted change scope.",
    "blocker: package-lock.json - untracked root lockfile is outside frontend scope; frontend/package-lock.json is the valid lockfile.",
    "blocker: openspec CLI unavailable - required artifact validation is not executable in this runtime.",
    "warning: frontend/scripts/generate-api-types.mjs - successful generation emits Node DEP0190 due to shell:true on Windows."
  ],
  "manualNotes": "No source or artifact files were edited except this required verification output."
}
```
