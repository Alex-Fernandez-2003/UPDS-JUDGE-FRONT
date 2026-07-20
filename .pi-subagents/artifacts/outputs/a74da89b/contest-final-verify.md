# Independent audit — blocked

## Findings
- **BLOCKER** — Invented success response. `frontend/src/types/api.generated.ts:128-136` declares `POST /api/Concursos/crear` `200` with `content?: never`; implementation invents `{ codigo, mensaje }` in `frontend/src/features/contests/types.ts:42-45`, consumes it in `CreateContestPage.tsx:125-128`, and MSW returns it in `src/mocks/handlers/index.ts:34-37`. This fails the no-invented-responses contract.
- **HIGH** — No runtime Bearer composition. The shared instance is created with `neutralAuthTransport` in `frontend/src/lib/api/http-client.ts:153`; `configureHttpClientAuthTransport` is exported at `:156-158` but has no application call site. The create request therefore has no configured Bearer transport.
- **Clean otherwise** — Multipart mapper uses indexed keys, `toISOString()`, and no manual multipart header (`mapper.ts:3-21`; `http-client.ts:48-56`). RHF/Zod/useFieldArray, ZIP handling, summary/error behavior, shared client service, AdminLayout route composition, and excluded-feature scan are compliant.
- **Scope** — Only expected frontend feature/API/router/MSW files and its OpenSpec change are modified outside `.pi-subagents`; no staged files.

## Commands run
- `cd frontend && npm run format:check` — passed.
- `cd frontend && npm run lint` — passed.
- `cd frontend && npm run typecheck` — passed.
- `cd frontend && npm run test:run` — passed: 11 files, 41 tests.
- `cd frontend && npm run build` — passed.
- 8085 inspection found PID 25004: `node ... C:\dev\UPDS-JUDGE-FRONT\frontend\node_modules\...\vite.js --host 127.0.0.1`; appears repository-owned and was not killed.