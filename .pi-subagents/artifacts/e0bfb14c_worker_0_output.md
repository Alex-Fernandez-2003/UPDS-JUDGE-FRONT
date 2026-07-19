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