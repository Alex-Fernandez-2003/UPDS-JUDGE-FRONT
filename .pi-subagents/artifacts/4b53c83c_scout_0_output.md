# Code Context

## Files Retrieved

1. `frontend/scripts/generate-api-types.mjs` (lines 1-13) — type-generation entry point; it reads `process.env.OPENAPI_SCHEMA_URL` and invokes `openapi-typescript`.
2. `frontend/.env.example` (lines 1-9) — public `/api` base and Node-only proxy/schema variables; schema value is still blank.
3. `frontend/vite.config.ts` (lines 1-32) — Vite loads `API_PROXY_TARGET` only in Node and proxies `/api` without a rewrite.
4. `frontend/src/config/env.ts` (lines 1-36) — React only accepts a relative `VITE_API_BASE_URL`, currently `/api`.
5. `frontend/src/lib/api/endpoints.ts` (lines 1-2) — confirmed route registry is still empty.
6. `frontend/src/lib/api/http-client.ts` (lines 1-129) — central relative-path transport; its URL join removes/adds one slash.
7. `frontend/src/lib/api/problem-details.ts` (lines 1-43) and `frontend/src/lib/api/api-error.ts` (lines 1-25) — generic Problem Details normalization, not grounded in a documented backend error response.
8. `frontend/src/lib/auth/auth-transport.ts` (lines 1-5) and `frontend/src/lib/auth/auth-session.ts` (lines 1-5) — neutral authentication abstractions; the transport is not consumed by `HttpClient`.
9. `frontend/src/mocks/handlers/index.ts` (lines 1-3) and `frontend/src/mocks/browser.ts` (lines 1-3) — MSW is wired but deliberately has no handlers.
10. `frontend/src/lib/api/http-client.test.ts` (lines 1-163) and `frontend/src/config/env.test.ts` (lines 1-27) — generic-only coverage; no contract routes, generated types, or bearer behavior are covered.
11. `frontend/README.md` (lines 1-58) — still says the local backend/schema was unavailable and gives a placeholder schema command.
12. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` (Task 4 at lines 52-61; Tasks 15/18/19/21/25/45 at lines 158-264 and 423-432) — pending contract-dependent work now has a confirmed OpenAPI source.

## Live endpoint evidence

Only the requested live endpoints were fetched:

| URL | Observed result |
| --- | --- |
| `http://localhost:5185/` | `404 Not Found`, empty body, Kestrel. This is not an API base document/root route. |
| `http://localhost:5185/swagger` | `301 Location: swagger/index.html`, then Swagger UI `200 OK`. |
| `http://localhost:5185/swagger/v1/swagger.json` | `200 OK`, `application/json;charset=utf-8`; OpenAPI `3.0.1`, title `Mini Juez API`, version `v1`. |

The schema contains **no `servers` array**. It is therefore a path-only contract served by the backend origin; use the observed backend origin for local generation/proxy rather than deriving an unlisted server URL.

## OpenAPI contract (sole truth)

### Security

- Top-level `security`: `[{ "Bearer": [] }]`.
- `components.securitySchemes.Bearer`:
  - `type: http`
  - `scheme: bearer`
  - `bearerFormat: JWT`
  - `description: "Ingrese el token JWT"`
- No operation-level `security` override is declared on either auth operation. Per this document, the global Bearer requirement also applies to them; do not infer an anonymous exception merely because these are login/register routes.
- The document does **not** state token persistence, cookie behavior, `credentials`, authorization-header spelling beyond the standard HTTP bearer scheme, or any login token request. Do not add those assumptions.

### Login

- **Method/path:** `POST /api/Auth/login` (case-sensitive contract spelling).
- **Request body:** requiredness is not declared; each of the following media types references `#/components/schemas/LoginRequest`: `application/json`, `text/json`, `application/*+json`.
- **`LoginRequest`:** object, `additionalProperties: false`; `correo?: string | null`, `contrasena?: string | null`. No properties are listed in `required`.
- **Only documented response status:** `200 OK`.
- **200 media types:** `text/plain`, `application/json`, `text/json`, all `#/components/schemas/LoginResponse`.
- **`LoginResponse`:** object, `additionalProperties: false`; `token?: string | null`; `expiraEn?: string` (`date-time`). No `required` list.

### Register

- **Method/path:** `POST /api/Auth/register` (case-sensitive contract spelling).
- **Request body:** no required flag; `application/json`, `text/json`, and `application/*+json` each reference `#/components/schemas/RegisterRequest`.
- **`RegisterRequest`:** object, `additionalProperties: false`; `nombre?: string | null`, `correo?: string | null`, `contrasena?: string | null`. No properties are listed in `required`.
- **Only documented response status:** `200 OK`.
- **200 media types:** `text/plain`, `application/json`, `text/json`, all `#/components/schemas/RegisterResponse`.
- **`RegisterResponse`:** object, `additionalProperties: false`; **`mensaje?: string | null`** and `correo?: string | null`. No `required` list.

### Errors

- Neither `/api/Auth/login` nor `/api/Auth/register` declares any 4xx/5xx response, response headers, Problem Details schema, validation schema, or error examples.
- Thus the exact documented error-status set for both operations is **empty**; the only declared status is `200`.
- The only documented property named `mensaje` is `RegisterResponse.mensaje` on a successful `200`; it is **not** documented as an error property.
- `frontend/src/lib/api/problem-details.ts` supports generic `title`, `detail`, `status`, `errors`, `code`, `requestId`, and `traceId`, but these are a resilience adapter, not properties verified by this OpenAPI document. Do not represent them as backend-contract facts or fabricate tests/handlers for specific error statuses.

## Architecture and minimal next changes

1. **Generate contract types first.** Run from `frontend/` with the confirmed source: `OPENAPI_SCHEMA_URL=http://localhost:5185/swagger/v1/swagger.json npm run api:types`. This should create `src/types/api.generated.ts` from the actual document; do not hand-author equivalent DTOs. `openapi-typescript` is already installed (`frontend/package.json`).
   - **Risk (medium):** `generate-api-types.mjs` reads only inherited `process.env` (lines 1-3); Node does not automatically read `.env.local`. Setting `OPENAPI_SCHEMA_URL` in `.env.local` alone will not make `npm run api:types` work unless the script is changed to load Vite env or the variable is exported/inline supplied. The existing README's inline-variable pattern works.
   - Update `.env.example:9` and the stale unavailability statement/placeholder command in `frontend/README.md` after generation to record the confirmed URL. If the intended UX is that plain `npm run api:types` reads `.env.local`, minimally change the script to use a Node-side env loader; otherwise preserve the current explicit inline/exported-variable requirement and document it accurately.

2. **Register only relative routes in `endpoints.ts`.** With `VITE_API_BASE_URL=/api` and `HttpClient.joinUrl()` (lines 11-12), endpoint values must omit the prefix: e.g. `Auth/login` and `Auth/register`, not `/api/Auth/login`. Supplying `/api/Auth/login` yields `/api/api/Auth/login`. Preserve the exact `Auth` capitalization.

3. **Proxy needs no route rewrite.** `vite.config.ts:18` proxies `/api` directly to `http://localhost:5185`; Vite preserves the matched path absent a `rewrite`. Browser `/api/Auth/login` consequently reaches `http://localhost:5185/api/Auth/login`, exactly matching OpenAPI. Do not set target to `http://localhost:5185/api` and do not add a rewrite, as either can duplicate/strip the required base prefix.

4. **Keep auth foundation bounded.** The confirmed scheme resolves the mechanism to HTTP Bearer/JWT, so a future transport adapter can encapsulate an optional `Authorization: Bearer <token>` provider. It must not introduce persistence, localStorage, cookies/`credentials`, or functional login/register flows: all are absent from the OpenAPI contract and functional auth is out of this change's scope. `AuthTransport` is currently unused by `HttpClient`, so its adoption requires an explicit, narrowly tested integration decision.

5. **MSW/test changes only after generated types and endpoint registry.** Add handlers using the exact `POST /api/Auth/login` and `POST /api/Auth/register` routes and generated request/response shapes, with only documented 200 payloads. Do not invent 400/401/409 responses or Problem Details fixtures. Add focused tests for route/base joining, generated shape usage, and handler 200 behavior; retain existing generic error-normalization tests as transport resilience tests.

## Review Findings

- **high — `frontend/README.md:35-43`, `frontend/.env.example:7-9`:** documentation/configuration still claim the schema URL is unconfirmed/blank although the live source is confirmed as `http://localhost:5185/swagger/v1/swagger.json`. This blocks reproducible generation unless corrected or explicitly supplied inline.
- **high — `frontend/src/lib/api/endpoints.ts:1-2`, `frontend/src/mocks/handlers/index.ts:1-3`:** contract-dependent registry and handlers are intentionally empty. They must be populated only from generated OpenAPI types and exact relative paths; no history implementation should be added.
- **medium — `frontend/scripts/generate-api-types.mjs:2`:** script does not load Vite `.env*`; a value in `.env.local` is invisible to it. Use an exported/inline env variable or add deliberate Node-side env loading.
- **medium — `frontend/src/lib/auth/auth-transport.ts:1-5` and `frontend/src/lib/api/http-client.ts:48-54`:** Bearer is confirmed, but transport configuration is inert. Any integration must preserve the no-persistence/no-functional-auth boundary and must not assert undocumented error behavior.
- **medium — OpenAPI document:** global Bearer security applies to auth operations because they lack operation overrides; this is unusual. Treat it literally for contract work, but flag it to backend owners before attempting a real login smoke flow.
- **low — `frontend/src/lib/api/problem-details.ts:5-42`:** generic ASP.NET Problem Details mapping is not contradicted, but no backend error response is documented. Keep it generic and do not label its fields as documented API properties.

## Start Here

Open `frontend/scripts/generate-api-types.mjs` first, then generate `src/types/api.generated.ts` with the confirmed live URL. The generated document is the narrow dependency that should drive `endpoints.ts`, typed MSW handlers, and all contract tests without hand-created DTOs.

## Residual Risks

- The live schema declares only 200 responses and no error schemas/statuses, so frontend error UI and mocks cannot be contract-accurate beyond generic transport handling.
- The global Bearer security on login/register may reflect a backend Swagger annotation issue; no exception is documented.
- No `servers` value is declared; local proxy behavior is validated only by exact path alignment, not by a server URL embedded in OpenAPI.
- This was read-only reconnaissance. No type generation, proxy smoke request through Vite, or auth operation request was executed.
- Engram tools were not available in this runtime, so the requested material-discovery save to project `upds-judge-front` could not be performed.