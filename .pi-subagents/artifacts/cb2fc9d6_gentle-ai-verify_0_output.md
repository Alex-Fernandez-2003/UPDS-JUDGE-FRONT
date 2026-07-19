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