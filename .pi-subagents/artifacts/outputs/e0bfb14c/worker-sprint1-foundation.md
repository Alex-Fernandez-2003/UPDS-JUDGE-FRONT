# Sprint 1 frontend foundation implementation

Implemented the approved non-contractual foundation only. No backend, database, root README, academic document, commit, push, endpoint, DTO, API handler, or authentication mechanism was added.

## Changed areas

- `frontend/`: Vite/Tailwind/tooling, environment validation, API/client/error foundation, neutral auth, Query provider, MSW scaffolding without handlers, fixtures/builders, semantic styles, shared components/forms/navigation/table, layouts, routes, `/dev/ui`, tests, README, and approved dependencies.
- `docs/openspec/config.yaml`: authorized minimal configuration.
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md`: truthful execution and contract-block status.

## Contract blocks

`http://localhost:5185` was unavailable. Therefore no OpenAPI URL, endpoint, generated DTO, auth scheme, or MSW contract handler was inferred. `npm run api:types` correctly exits 1 with a clear `OPENAPI_SCHEMA_URL is required` message. The frontend uses only the generic relative `/api` transport foundation.

## Validation

- `npm install --legacy-peer-deps`: passed. Legacy peer resolution is required because the existing TypeScript 6 scaffold conflicts with `openapi-typescript`'s TypeScript 5 peer range; no React/Vite/TypeScript upgrade was made.
- `npm run format:check`: passed.
- `npm run lint`: passed with two existing-style Fast Refresh warnings in `src/routes/router.tsx`; no lint errors.
- `npm run typecheck`: passed.
- `npm run test:run`: passed, 3 files / 8 tests.
- `npm run build`: passed.
- `npm run dev -- --host 127.0.0.1`: passed; `/` and `/dev/ui` returned HTTP 200 on exact port 8085, then the server was stopped.
- `git diff --check`: passed.
- `git diff --cached --quiet`: passed; no staged files.

Engram save was not performed because no Engram tool was available in this worker runtime.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "All implementation edits are confined to frontend/** plus the authorized docs/openspec/config.yaml and truthful tasks.md status update; no backend/API contract, endpoint, DTO, handler, auth scheme, commit, or push was added."
    }
  ],
  "changedFiles": [
    "frontend/.editorconfig",
    "frontend/.env.example",
    "frontend/.gitignore",
    "frontend/.oxlintrc.json",
    "frontend/.prettierignore",
    "frontend/.prettierrc",
    "frontend/README.md",
    "frontend/package.json",
    "frontend/package-lock.json",
    "frontend/vite.config.ts",
    "frontend/tsconfig.app.json",
    "frontend/src/App.tsx",
    "frontend/src/main.tsx",
    "frontend/src/config/env.ts",
    "frontend/src/lib/api/*",
    "frontend/src/lib/auth/*",
    "frontend/src/lib/query/*",
    "frontend/src/lib/utils/cn.ts",
    "frontend/src/mocks/*",
    "frontend/src/components/*",
    "frontend/src/layouts/*",
    "frontend/src/routes/*",
    "frontend/src/dev/ui/DevUi.tsx",
    "frontend/src/styles/*",
    "frontend/src/test/setup.ts",
    "frontend/scripts/generate-api-types.mjs",
    "docs/openspec/config.yaml",
    "docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/config/env.test.ts",
    "frontend/src/lib/api/http-client.test.ts",
    "frontend/src/components/components.test.tsx"
  ],
  "commandsRun": [
    { "command": "npm install --legacy-peer-deps", "result": "passed", "summary": "Installed approved dependencies; legacy peer resolution was needed for existing TypeScript 6 and openapi-typescript's TS5 peer range." },
    { "command": "npm run format:check", "result": "passed", "summary": "All matched files formatted." },
    { "command": "npm run lint", "result": "passed", "summary": "Passed with two non-failing Fast Refresh warnings in router.tsx." },
    { "command": "npm run typecheck", "result": "passed", "summary": "TypeScript project check passed." },
    { "command": "npm run test:run", "result": "passed", "summary": "3 test files and 8 tests passed." },
    { "command": "npm run build", "result": "passed", "summary": "Vite production build passed." },
    { "command": "npm run dev -- --host 127.0.0.1", "result": "passed", "summary": "Exact port 8085 served / and /dev/ui with HTTP 200; process stopped." },
    { "command": "npm run api:types", "result": "failed", "summary": "Expected failure: OPENAPI_SCHEMA_URL is absent and no fake generated DTOs were created." },
    { "command": "git diff --check && git diff --cached --quiet", "result": "passed", "summary": "No whitespace errors and no staged files." }
  ],
  "validationOutput": [
    "format check, lint, typecheck, test, and build passed",
    "dev server responded at http://127.0.0.1:8085/ and /dev/ui",
    "OpenAPI generation intentionally blocks until a confirmed schema URL is supplied"
  ],
  "residualRisks": [
    "Backend port 5185 and OpenAPI schema were unreachable; endpoints, DTOs, auth transport adaptation, contract handlers, and proxy smoke test remain pending.",
    "npm installation requires --legacy-peer-deps until the existing TypeScript 6/openapi-typescript peer-range mismatch is resolved.",
    "Engram persistence was unavailable in this worker runtime."
  ],
  "noStagedFiles": true,
  "diffSummary": "Implemented the approved frontend tooling, generic API and UI foundation with tests and documentation; contract-specific work remains blocked without OpenAPI.",
  "reviewFindings": [
    "no blockers; two non-failing Fast Refresh warnings remain in frontend/src/routes/router.tsx"
  ],
  "manualNotes": "No captures were created. The change is intentionally oversized under the approved size:exception."
}
```
