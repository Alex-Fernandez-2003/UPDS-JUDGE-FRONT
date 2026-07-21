# UPDS Judge frontend — read-only integration audit

**Audit mode:** read-only. No source, configuration, OpenSpec, generated type, dependency, or test file was edited. The only write is this required audit artifact. Evidence is from the checkout at `271037a` and a live read of `http://localhost:5185/swagger/v1/swagger.json`.

## 1. Executive result

The checkout contains implemented auth, contest-creation, and an attempted contest-administration feature, but it is **not integration-ready**. Compilation is blocked by TypeScript configuration; the suite has 5 failures; administration code is internally incomplete and unreachable; and the shared HTTP client is never configured to use the login session Bearer token. The live OpenAPI is available and disproves several documented assumptions/claims.

## 2. Git state

- Branch: `develop...origin/develop`; HEAD `271037a Implementa HU08: administración de concursos`.
- Initial working tree had two pre-existing untracked harness files only: `.pi-subagents/artifacts/6650a909_context-builder_0_input.md` and `..._transcript.jsonl`.
- `git diff --check` reported no tracked diff whitespace errors. No staged files.
- This audit artifact is intentionally untracked and not a product change.

## 3. Repository and feature inventory (implementation fact)

- React/Vite/TypeScript app: `frontend/`; scripts/dependencies in `frontend/package.json`.
- Auth UI/service: `src/features/auth/{Components,Pages,authService.ts,authTypes.ts}`.
- Shared API/auth: `src/lib/api/{http-client.ts,endpoints.ts,auth.ts}`, `src/lib/auth/{auth-session.ts,auth-transport.ts}`.
- Contest creation: `src/features/contests/{CreateContestPage.tsx,schema.ts,mapper.ts,service.ts,use-create-contest.ts,ContestProblemList.tsx,ContestZipField.tsx,CreateContestSummary.tsx}`.
- Administration/list attempt: `ContestsAdminScreen.tsx`, `hooks.ts`, `components/Contests*`, `format.ts`; it references symbols absent from the current `service.ts` and `types.ts`.
- MSW: `src/mocks/handlers/index.ts`; test coverage includes auth handler, creation form/mapper/schema/service/mutation, router, and the failing contest-admin suite.

## 4. Route matrix (implementation fact)

| URL | Router element | Guard | Operational status |
|---|---|---|---|
| `/` | redirects to `/login` | no | implemented |
| `/login` | `LoginPage` | no | implemented |
| `/register` | `RegisterPage` | no | implemented |
| `/dashboard` | `ProtectedRoute` → `DashboardPage` | token presence only | implemented |
| `/admin/contests` | `Placeholder` | **no** | administration page is unreachable |
| `/admin/contests/new` | `AdminLayout` → `CreateContestPage` | **no** | creation form is publicly routable |
| `/dev/ui` | lazy `DevUi` in development | n/a | development-only |
| `*` | 404 | n/a | implemented |

Evidence: `src/routes/router.tsx:27-54`, `constants.ts:1-8`, `pages/AdminContestsPage.tsx:5-15` (the latter is never imported by the router).

## 5. Actual auth/session flow (implementation fact)

1. `LoginForm` validates email/password, then `authService.login({ correo, contrasena })` (`LoginForm.tsx:58-99`).
2. It posts JSON to `Auth/login` via the shared client (`authService.ts:11-19`, `endpoints.ts:2-5`).
3. `LoginPage` writes `res.token` directly to `sessionStorage['token']`, then navigates `/dashboard` (`LoginPage.tsx:9-14`). Logout deletes that key (`DashboardPage.tsx:7-11`).
4. `ProtectedRoute` grants access if that storage key is non-empty; it does not decode/validate expiry/roles (`ProtectedRoute.tsx:9-17`).
5. `auth-session.ts` only declares types; it has no implementation/persistence integration. `lib/api/auth.ts` checks a token response but is unused.

## 6. Actual Authorization-header flow (implementation fact)

- `HttpClient` defaults to `neutralAuthTransport`; it adds `Authorization` only if explicitly configured (`http-client.ts:24-31,61-66,156-159`).
- A correct adapter exists: `createBearerAuthTransport(() => token)` returns `Bearer <token>` (`auth-transport.ts:7-15`).
- No caller invokes `configureHttpClientAuthTransport` or binds it to `sessionStorage`; grep found no such caller. Thus login storage and request authorization are disconnected.

## 7. Roles and authorization findings

- **P0 — Missing effective auth propagation:** authenticated contest requests use the neutral client, so no Bearer header is actually sent. `src/lib/api/http-client.ts:24-31,61-66`; `src/features/auth/Pages/LoginPage.tsx:9-14`.
- **P1 — Route protection gap:** both `/admin/contests` and `/admin/contests/new` lack `ProtectedRoute`; a UI route is not role-gated. `router.tsx:32-40`.
- **P1 — Roles absent:** no response/model/session parsing or route/action role check exists. The live OpenAPI `LoginResponse` has only `token` and `expiraEn`; no roles claim is documented. Claims inside JWT and backend enforcement are **No verificable** from this frontend audit.

## 8. Live OpenAPI contract (external factual evidence)

Read successfully from `http://localhost:5185/swagger/v1/swagger.json` (HTTP 200).

- Title/version: `Mini Juez API` / `v1`.
- Global security is `[{"Bearer":[]}]`; scheme is HTTP bearer JWT. Individual operations expose no override.
- `POST /api/Auth/login`: JSON (`application/json`, `text/json`, `application/*+json`); `LoginRequest { correo?: string|null, contrasena?: string|null }`; 200 `LoginResponse { token?: string|null, expiraEn?: date-time }`.
- `POST /api/Auth/register`: JSON; `RegisterRequest { nombre?, correo?, contrasena? }`; 200 `RegisterResponse { mensaje?, correo? }`.
- `POST /api/Concursos/crear`: multipart with the expected simple fields, `listaProblemas?: CrearProblemaDto[]`, and binary `archivoZip`; 200 has **no documented response body**.
- `GET /api/Concursos`: only documented query keys are `filtro`, `busqueda`, `pagina`, `tamanoPagina`; 200 has **no documented response body**. There is no `modalidad` or `fecha` query parameter.

## 9. Endpoint integration table

| Endpoint | Frontend request | Live contract | Audit status |
|---|---|---|---|
| `POST /api/Auth/login` | JSON `correo/contrasena` | same input; token optional | request aligned; response handling assumes required token |
| `POST /api/Auth/register` | JSON `nombre/correo/contrasena` | same input; response includes optional `correo` | local type omits `correo`; docs use unrelated English names |
| `POST /api/Concursos/crear` | multipart from mapper | multipart fields confirmed | request broadly aligned; frontend invents `CreateContestResponse {codigo,mensaje}` while OpenAPI says 200 no body |
| `GET /api/Concursos` | attempted in dead/incomplete admin code | query names above, no response schema | not executable/contractually incomplete |

## 10. Contest creation contract and UI facts

- Mapper submits trimmed strings, ISO conversion via `new Date(...).toISOString()`, indexed `listaProblemas[n].*`, and file as `archivoZip` (`mapper.ts:4-23`). Browser controls multipart boundary because the shared client detects `FormData` (`http-client.ts:47-60`).
- Schema requires ZIP, ZIP suffix, 100 MiB client limit, 1–12 problems, and code pattern/normalization (`schema.ts:20-77`, `constants.ts:3-39`).
- This is useful client validation, but **P2 contract risk:** the documented UJ08/UJ09 OpenSpec spec explicitly said not to impose a restrictive code pattern or an invented ZIP size cap; live OpenAPI does not describe either. `constants.ts:4,11-15`; `schema.ts:55-57,73-76`.
- **P1 response mismatch:** success UI dereferences `mensaje` and `codigo` (`CreateContestPage.tsx:87-101`) but live OpenAPI declares no 200 content; a real 200 empty body yields `undefined` in `HttpClient` and no success alert.

## 11. Administration/list integration facts

- `ContestsAdminScreen` intends filtering, pagination and summaries, but `hooks.ts` imports `listConcursos`, `listConcursosAdmin`, and type names that do not exist in current `service.ts`/`types.ts` (`hooks.ts:1-4`; `service.ts:1-9`; `types.ts:1-25`). This is the direct reason administration is non-compilable.
- `/admin/contests` instead renders a placeholder (`router.tsx:32`), while `AdminContestsPage.tsx` wraps the screen but is not routed.
- The selected date is retained in UI state but omitted from `queryParams` (`ContestsAdminScreen.tsx:15-44`). The UI also sends `modalidad`, which is not a live OpenAPI query parameter.
- Filter values conflict: UI offers `Programado/Borrador`; screen type cast accepts `Activo/Proximo/Finalizado`; summary hook uses lowercase `finalizados` (`ContestsFiltersBar.tsx:45-49`, `ContestsAdminScreen.tsx:35-42`, `hooks.ts:43-47`).

## 12. Mocks vs backend (must not be confused)

- MSW is off by default and only starts in development with `VITE_ENABLE_MOCKS=true` (`main.tsx:7-18`, `.env.local`).
- Auth MSW login returns only `{ expiraEn }`, not a token (`mocks/handlers/index.ts:7-19`); therefore it cannot demonstrate a successful real login/session.
- Contest-create MSW invents a body `{ codigo, mensaje }` and a synthetic 401 keyed on code `unauthorized` (`handlers/index.ts:23-41`). It neither enforces Bearer nor validates ZIP contents. It is visual/test scaffolding, not backend proof.

## 13. Types and generated-contract status

- `src/types/api.generated.ts` is generated and contains the live paths, but create/list operations have no typed response content (`api.generated.ts:93-182`); feature-local `CreateContestResponse` is not contract-derived.
- Auth feature types manually model token as required and omit `RegisterResponse.correo` (`authTypes.ts:7-25`) although generated schema marks all relevant fields optional/null.
- No `ListConcursos*`, `Concurso*`, `ModalidadConcurso`, or admin summary types exist in `types.ts`, despite imports/callers.
- `npm run api:types` was deliberately **not run**: it writes generated files and this audit is read-only. The endpoint was read directly instead.

## 14. Test inventory and quality

- Passing areas before the failing admin suite: environment, common components, layouts, router, HTTP client, MSW auth/create handler, contest schema/mapper/service/mutation/page/ZIP field.
- Current suite result: **13 files, 65 tests; 12 files/60 tests pass, 1 file/5 tests fail**.
- The five failing tests are all in `src/features/contests/contests.test.tsx`: two missing service exports, stale search accessible-name expectation, and two admin screen integration/error expectations.
- There are no dedicated auth form/service/session/role tests, no authorization-header integration test, and no real authenticated backend E2E test.

## 15. Validation commands run

| Command | Result | Evidence |
|---|---|---|
| `git status --short --branch`, `git diff --check` | passed | only pre-existing harness artifacts untracked; no staged/tracked diff |
| safe source/doc/OpenSpec grep and reads | passed | findings above; all four artifacts were located for each of the 4 OpenSpec changes |
| `curl http://localhost:5185/swagger/v1/swagger.json` | passed | HTTP 200 and contract parsed above |
| `npm run format:check` | failed | 26 files reported non-Prettier formatting |
| `npm run lint` | passed | `oxlint` exit 0 |
| `npm run typecheck` | failed | TS5101: `baseUrl` deprecated; `tsconfig.app.json:8` needs an explicit supported migration decision |
| `npm run test:run` | failed | 5 failures / 65 tests |
| `npm run build` | failed | stops at same TS5101 typecheck error |
| brief `npm run dev` start/stop | partially passed | Vite announced ready on `localhost:8085`; process was stopped, but local curl returned 000, so HTTP serving is **No verificable** in this execution environment |

## 16. Documentation and OpenSpec audit

- Required docs read: `docs/historias/administracion-concursos-estructurado.md`, `UJ-05-register-crear-cuenta-acceso-plataforma.md`, `UJ-06-login-autenticacion-token-roles.md`, and `UJ08-UJ09-crear-concurso-importar-zip.md`.
- Relevant OpenSpec changes located/read: `sprint-0-initialize`, `sprint-1-frontend-core-api-ui-foundation`, `uj08-uj09-create-contest-zip-import-frontend`, `fix-create-contest-password-zip-and-form-ux` (proposal/design/spec/tasks each).
- Documentation is not a reliable current-state source: root `README.md:42-61` and frontend guide still claim auth/contests are placeholders/pending, while code implements them. Conversely UJ docs claim authenticated E2E/roles or admin integration more strongly than the code supports. Treat code and live OpenAPI as authority for current implementation/contract.
- No OpenSpec CLI was run, per instruction.

## 17. Casing, collisions, and conflicts

- No case-insensitive duplicate tracked paths were found.
- API casing is intentionally `Auth/login`, `Auth/register`, `Concursos/crear`; it matches live paths and MSW.
- Semantic collisions are significant: `Público` UI vs `Publico` data, `Próximo` UI vs `Proximo` data, `Programado/Borrador` controls vs `Activo/Proximo/Finalizado` cast/type intent, and `finalizados` summary parameter. See section 11.
- Code convention collision: much auth code uses semicolons/double quotes and violates configured Prettier; contest foundation mostly follows project convention.

## 18. Prioritized findings

- **P0:** shared client never receives Bearer token; authenticated APIs remain unauthenticated. `http-client.ts:24-31,61-66`; `LoginPage.tsx:9-14`.
- **P0:** compile gate fails at `tsconfig.app.json:8` (TS5101); build cannot occur.
- **P1:** admin feature cannot typecheck (missing imports/types) and is unreachable because route is a placeholder. `hooks.ts:1-4`, `router.tsx:32`, `types.ts:1-25`.
- **P1:** admin/new route has no auth or role guard. `router.tsx:34-40`.
- **P1:** create success response is invented and incompatible with live OpenAPI's empty 200 response. `types.ts:20-23`, `CreateContestPage.tsx:87-101`, `api.generated.ts:93-143`.
- **P1:** tests fail (5) and do not cover actual auth/session/header behavior.
- **P2:** request/query/filter semantics use undocumented fields and inconsistent states; date filter has no effect. `ContestsAdminScreen.tsx:35-42`; live OpenAPI section 8.
- **P2:** validation adds undocumented code restrictions and ZIP size limit. `constants.ts:3-15`, `schema.ts:55-57,73-76`.
- **P2:** docs contradict the checkout and live contract, creating delivery/review risk.
- **P3:** Prettier check fails in 26 files; stale `pnpm` lock/workspace files coexist with npm workflow.

## 19. Constrained next-change proposal (do not implement in this audit)

Make the next approved change a **small integration-repair change**, not a new product feature:

1. Resolve the TypeScript 6 config migration and restore `format:check`, typecheck, tests, and build green.
2. Decide the authoritative auth lifecycle from live OpenAPI/backend: tokenize, expiry handling, Bearer configuration for the shared singleton, then route/role policy. Confirm whether global Swagger security is intentional for login/register.
3. Align create response handling with a confirmed backend response (or an empty 200), regenerate API types only after confirmation, and test header + successful request against MSW/real controlled backend.
4. Either remove/defer incomplete administration code or complete it only after OpenAPI supplies its response DTO and filter semantics; wire its route and protection together. Do not invent list response/summary/query fields.
5. Update README/UJ docs/OpenSpec task status only after code/contract evidence agrees.

## 20. Residual risks / evidence limits

- Browser-rendered route behavior and Vite HTTP availability are **No verificable**: Vite reported ready but curl in this runtime could not connect before stop.
- Real authenticated API behavior, JWT claims/roles, authorization enforcement, CORS/proxy behavior, create response payload, ZIP backend validation, and GET list response format are **No verificable** beyond the live OpenAPI description. No mutating requests were sent.
- Backend may intentionally return undocumented payloads; that remains a backend/OpenAPI alignment issue, not proof from the frontend.