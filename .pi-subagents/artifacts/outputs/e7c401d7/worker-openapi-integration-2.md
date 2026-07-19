# OpenAPI contract integration handoff

status: completed
summary: Generated the live OpenAPI types and integrated the confirmed auth contract without adding functional auth UI, persistence, forms, or backend changes.
files_changed:

- frontend/scripts/generate-api-types.mjs: Load Node-side Vite environment files so plain `npm run api:types` uses the user-created local schema configuration.
- frontend/src/types/api.generated.ts: Generated from the live OpenAPI schema; not hand-edited.
- frontend/src/lib/api/endpoints.ts: Added `Auth/login` and `Auth/register` relative endpoint values.
- frontend/src/lib/auth/auth-transport.ts: Added an optional non-persistent Bearer token provider adapter.
- frontend/src/lib/api/http-client.ts: Inject optional authorization headers and normalize generic `mensaje` error bodies alongside existing Problem Details resilience.
- frontend/src/lib/api/http-client.test.ts: Added bearer-header and generic `mensaje` coverage.
- frontend/src/mocks/handlers/index.ts: Added typed, exact POST auth handlers with 200-only safe fake responses.
- frontend/src/mocks/handlers/handlers.test.ts: Added typed handler integration coverage.
- frontend/README.md: Documented generation, confirmed routes, error-contract boundary, and non-persistent Bearer behavior.
- docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md: Recorded completed contract work, proxy smoke evidence, and unavailable OpenSpec CLI.
tdd_evidence:
- RED: not active — strict TDD was not activated.
- GREEN: not active — validation is reported separately.
- TRIANGULATE/REFACTOR: Focused tests cover absent/present caller authorization, generic `mensaje`, both exact auth routes, and typed response shapes.
validation:
- `cd frontend && npm run api:types`: passed; generated types from `http://localhost:5185/swagger/v1/swagger.json`.
- `cd frontend && npm run test:run -- src/lib/api/http-client.test.ts src/mocks/handlers/handlers.test.ts`: passed; 2 files, 18 tests.
- `cd frontend && npm run api:types && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build`: passed; full test suite 6 files, 29 tests; production build passed.
- Vite smoke: passed; `/` and `/dev/ui` returned 200 on `127.0.0.1:8085`; credential-free `POST {}` to `/api/Auth/login` returned 400 through the proxy. The spawned Vite processes were stopped and port 8085 no longer listened.
- `command -v openspec || true`: passed with no path; no supported OpenSpec CLI is installed.
- `git status --short && git diff --cached --name-only`: passed; no staged files.
risks:
- The generated schema globally applies Bearer security to login/register and documents only 200 responses. The observed empty credential-free proxy POST returned 400, which remains undocumented and is not represented as a contract handler.
- `openapi-typescript` emits a Node deprecation warning because the existing generator invokes `npx` with `shell: true`; generation still succeeds.
review_focus:
- Verify generated `api.generated.ts` was produced from the live schema and was not manually changed.
- Verify endpoint values remain relative, exact `Auth/login` and `Auth/register`, while MSW routes retain exact `/api/Auth/...` paths.
- Verify no token persistence, auth forms/pages, or invented non-200 mock responses were added.
skill_resolution: paths-injected

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "The change is limited to frontend source/docs and truthful OpenSpec task state. It generates live contract types, adds only confirmed auth routes, optional in-memory Bearer plumbing, generic error resilience, 200-only typed MSW handlers, and focused tests; no functional auth UI, backend, database, or .env file changed."
    }
  ],
  "changedFiles": [
    "frontend/scripts/generate-api-types.mjs",
    "frontend/src/types/api.generated.ts",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/lib/auth/auth-transport.ts",
    "frontend/src/lib/api/http-client.ts",
    "frontend/src/lib/api/http-client.test.ts",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/src/mocks/handlers/handlers.test.ts",
    "frontend/README.md",
    "docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/lib/api/http-client.test.ts",
    "frontend/src/mocks/handlers/handlers.test.ts"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run api:types",
      "result": "passed",
      "summary": "Generated api.generated.ts from the local Swagger schema."
    },
    {
      "command": "cd frontend && npm run test:run -- src/lib/api/http-client.test.ts src/mocks/handlers/handlers.test.ts",
      "result": "passed",
      "summary": "2 files and 18 focused tests passed."
    },
    {
      "command": "cd frontend && npm run api:types && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build",
      "result": "passed",
      "summary": "Generation, formatting, lint, typecheck, 29 tests, and production build passed."
    },
    {
      "command": "Vite smoke on 127.0.0.1:8085 with credential-free POST {} to /api/Auth/login",
      "result": "passed",
      "summary": "/ and /dev/ui returned 200; proxied auth path returned observable 400 without credentials."
    },
    {
      "command": "command -v openspec || true",
      "result": "passed",
      "summary": "No supported OpenSpec CLI was installed."
    }
  ],
  "validationOutput": [
    "Full frontend validation passed: 6 test files, 29 tests, and Vite production build.",
    "The Vite proxy preserved /api/Auth/login and reached the backend without credentials.",
    "No staged files were present."
  ],
  "residualRisks": [
    "Auth error statuses and schemas are not documented by the live OpenAPI contract; generic mensaje and Problem Details handling is resilience only.",
    "The schema applies global Bearer security to auth operations, which backend owners should confirm."
  ],
  "noStagedFiles": true,
  "diffSummary": "Added generated OpenAPI contract integration, bounded Bearer transport plumbing, typed 200-only auth mocks and tests, plus accurate frontend/OpenSpec documentation.",
  "reviewFindings": [
    "no blockers",
    "advisory: existing generator uses shell:true with npx and emits a Node deprecation warning."
  ],
  "manualNotes": "Engram discovery saved to project upds-judge-front. OpenSpec CLI validation was attempted but no openspec executable is installed."
}
```
