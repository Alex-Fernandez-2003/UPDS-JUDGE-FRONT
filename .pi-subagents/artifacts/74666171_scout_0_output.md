# Code Context

## Files Retrieved

1. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/proposal.md` (entire file; contract portions under **Goals**, **Assumptions**, **Success Criteria**) — states the proposed `POST Concursos/crear` multipart flow and requires an authoritative returned `codigo` and `mensaje`.
2. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md` (entire file; **Contract Verification**, **FormData**, **Success**, **Error** requirements) — requires exact multipart/indexed names, typed success `{codigo,mensaje}`, and documented 400/401 behavior.
3. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/design.md` (lines 42-103 equivalent sections, **Contracts Changed** and **Data Flow**) — repeats the reported contract but correctly labels it as OpenAPI-subject-to-verification.
4. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md` (Tasks 4-5, 9-11, 20, 27) — makes OpenAPI confirmation a dependency before mapper/service/MSW work.
5. `frontend/src/types/api.generated.ts` (lines 93-144, 447-454) — the current generated file already represents the live creation request, but only a no-content 200 response.
6. `frontend/scripts/generate-api-types.mjs` (lines 1-16) — `npm run api:types` takes `OPENAPI_SCHEMA_URL` and overwrites `src/types/api.generated.ts`; manual edits are prohibited.
7. `frontend/src/lib/api/http-client.ts` (lines 22-149) — shared POST transport recognizes `FormData` (line 43), leaves its content type unset (lines 53-54), injects an authorization header only from its `AuthTransport` (lines 57-60), and normalizes failures to `ApiError` (lines 80-113).
8. `frontend/src/lib/api/endpoints.ts` (lines 1-7) — central relative endpoint registry; no contest entry exists.
9. `frontend/src/lib/auth/auth-transport.ts` (lines 1-16) — only mechanism for a Bearer header; the exported singleton `httpClient` currently uses neutral transport.
10. `frontend/src/lib/query/QueryProvider.tsx` (lines 1-7) and `frontend/src/lib/query/query-client.ts` (lines 1-17) — one app-level QueryClient provider; a feature must consume it with `useMutation`, not make another client.
11. `frontend/src/routes/constants.ts` (lines 1-7) — reserves `routes.contests` and `routes.newContest`.
12. `frontend/src/routes/router.tsx` (lines 1-40) — `routes.newContest` is a standalone placeholder at line 25. The router currently composes neither `AdminLayout` nor `AuthLayout`; changing it to render content *inside* `AdminLayout` is required to meet the change spec and must preserve `/dev/ui` conditional lazy route (lines 7-37).
13. `frontend/src/layouts/AdminLayout/index.tsx` (lines 1-47) — owns the existing sidebar/topbar/main shell; the contest page should only be its `children`, but its navigation must not be changed.
14. `frontend/src/components/forms/index.tsx` (lines 13-260) — reusable `Input`, `Textarea`, `PasswordInput`, `FormField`, and `FileDropzone`. `FileDropzone` checks exact extension strings case-sensitively (lines 198-210), keeps its own selected file (lines 195-219), and supports removal through `onChange(undefined)` (lines 244-255).
15. `frontend/src/components/common/index.tsx` (lines 13-296) — reusable Button (its `loading` disables it), Card, Badge, Alert, Divider, and Spinner.
16. `frontend/src/components/navigation/index.tsx` (lines 1-96) — reusable `Breadcrumbs`; do not use the unrelated `Stepper` because the change forbids a wizard.
17. `frontend/src/mocks/handlers/index.ts` (lines 1-23) and `frontend/src/mocks/handlers/handlers.test.ts` (lines 1-36) — MSW convention: handlers use the `/api/...` browser-facing URL and generated response types. No contest handler exists.
18. `frontend/src/dev/ui/DevUi.tsx` (lines 1-100) — development-only catalog that demonstrates all relevant shared atoms and both layouts; must remain working.
19. `frontend/src/lib/api/http-client.test.ts` (lines 14-207), `frontend/src/routes/router.test.tsx` (lines 1-32), and `frontend/src/components/components.test.tsx` (lines 1-99) — existing Vitest/MSW/RTL test patterns.
20. Live `http://localhost:5185/swagger/v1/swagger.json` (`paths./api/Concursos/crear.post`, `components.schemas.CrearProblemaDto`, root `security`, `components.securitySchemes.Bearer`) — sole contract truth inspected successfully (HTTP 200). `http://localhost:5185/swagger` responds 301, not a JSON contract.

## Key Code

### Live OpenAPI: confirmed request and security

`POST /api/Concursos/crear` is present. The Vite proxy maps browser `/api` requests to `http://localhost:5185` (`frontend/vite.config.ts`, lines 14-23), so the central endpoint value must be the relative `Concursos/crear`, matching existing `Auth/login` convention.

The operation has only `multipart/form-data`. Every property is optional in the OpenAPI schema (there is no `required` array):

```text
nombre: string
descripcion: string
fechaInicio: string (date-time)
duracionMinutos: integer (int32)
contrasena: string
urlSetProblemas: string
minutosCongelamiento: integer (int32)
codigo: string
listaProblemas: CrearProblemaDto[]
archivoZip: string (binary)
```

`CrearProblemaDto` is:

```text
inciso: string
titulo: string | null
tiempo: number (float)
memoria: integer (int32)
```

Security is global `[{"Bearer": []}]`; `components.securitySchemes.Bearer` is HTTP bearer with `bearerFormat: JWT`. The operation has no override, therefore it inherits global Bearer security.

### Critical contract discrepancy — STOP

**BLOCKER (critical): live OpenAPI documents only `200: { description: "OK" }`, with no response content, and documents no 400, 401, or any other error response.** The generated representation is consequently `content?: never` at `frontend/src/types/api.generated.ts:129-136`.

This critically conflicts with the change artifacts, which require a success payload containing authoritative `codigo` and `mensaje`, a typed service response, and defined 400/401 UI/MSW scenarios. OpenAPI neither supplies a success DTO nor error schemas/statuses. Do **not** invent a response DTO, map a 200 body to `{codigo,mensaje}`, or claim concrete 400/401 response shapes. Contract-dependent implementation stops here until the backend OpenAPI is corrected or an authoritative backend contract replaces it.

### Indexed collection status — unresolved by the sole truth

OpenAPI declares a normal array `listaProblemas: CrearProblemaDto[]` and `encoding.listaProblemas.style: form`; it **does not** declare the ASP.NET multipart model-binding key syntax. Specifically, it contains no proof for `listaProblemas[n].inciso`, `.titulo`, `.tiempo`, or `.memoria`, and gives no `explode`/serialization example resolving it. The proposed indexed key mapping is therefore unverified and must not be implemented as fact. A backend contract update or authoritative request example/integration evidence is required.

### Generated type diff need

**No generated-type diff is currently indicated by the live schema:** `frontend/src/types/api.generated.ts:93-144` already matches the observed live operation (same path, multipart fields, array, binary file, and contentless 200). This is a read-only comparison; the generator was not run. Regenerate only after the OpenAPI contract changes, using the existing script with `OPENAPI_SCHEMA_URL=http://localhost:5185/swagger/v1/swagger.json`; never edit the generated file manually.

### Reusable frontend patterns / constraints

- `HttpClient.post(path, formData)` is suitable for multipart: it preserves `FormData` and does **not** set multipart `Content-Type`, allowing the browser boundary (`http-client.ts:43-54`).
- Auth integration is incomplete for a production feature: `HttpClient` supports constructor injection of `AuthTransport`, but exported `httpClient` is built with `neutralAuthTransport` (`http-client.ts:149`; `auth-transport.ts:16`). The feature cannot obtain a working Bearer from `httpClient` alone without an already-approved composition point. Do not read storage or tokens in the page.
- The router’s contest route is explicitly reserved but currently renders a standalone `Placeholder`; it does not use `AdminLayout` (`router.tsx:21-25`). The minimal future router composition is the reserved `routes.newContest` entry plus `AdminLayout` wrapping page content; do not alter `AdminLayout` navigation/topbar/sidebar.
- MSW uses the proxied `/api/...` address, reads generated types, and the app boots mocks only when development and `VITE_ENABLE_MOCKS` are true (`main.tsx:6-16`). No MSW success/error body can be authored contract-faithfully while the OpenAPI response remains undocumented.
- `FileDropzone` accepts `.zip` but its extension comparison is case-sensitive; the spec’s `.ZIP` edge case is not satisfied by the existing implementation. This is a non-contract UI limitation to assess only after the blocker is resolved.

## Architecture

`App` wraps `RouterProvider` in the sole `QueryProvider` (`frontend/src/App.tsx:1-10`). Vite proxies relative `/api` to the backend. A future feature would normally flow page → `useMutation` → contest service → FormData mapper → `HttpClient` → `AuthTransport`. The existing architecture cleanly supports FormData/error normalization, but has no authenticated default transport wiring and no route layout composition. The frontend source has no existing contest feature implementation beyond the empty `features/contests/.gitkeep` directory and reserved route.

## Start Here

Open the live OpenAPI operation at `http://localhost:5185/swagger/v1/swagger.json#/paths/~1api~1Concursos~1crear/post` first. Its contentless response and unspecified error contract block mapper/service/MSW/page success/error work. After it is corrected, open `frontend/src/types/api.generated.ts` and regenerate it via `frontend/scripts/generate-api-types.mjs` before changing feature code.

## Review Findings

1. **blocker / critical — live OpenAPI `paths./api/Concursos/crear.post.responses`:** documents only a no-content 200. It contradicts required returned `codigo`/`mensaje`; no response mapping may be invented.
2. **blocker / critical — live OpenAPI `paths./api/Concursos/crear.post.responses`:** no 400/401 (or error schema) is documented, so required error/MWS response structures cannot be implemented contract-faithfully.
3. **blocker / critical — live OpenAPI `paths./api/Concursos/crear.post.requestBody.content.multipart/form-data`:** array property `listaProblemas` has no authoritative indexed multipart key serialization. The proposed `listaProblemas[n].*` mapping remains unproven.
4. **high — `frontend/src/lib/api/http-client.ts:149`:** the exported shared client has neutral auth, while the change requires Bearer via `AuthTransport`. A valid approved transport composition point must be identified before a live authenticated request can work.
5. **medium — `frontend/src/routes/router.tsx:21-25`:** reserved contest route is standalone placeholder, not composed with `AdminLayout`; routing work must preserve the existing development-only `/dev/ui` branch.
6. **medium — `frontend/src/components/forms/index.tsx:198-210`:** `.ZIP` uppercase acceptance described in the change’s edge cases conflicts with `FileDropzone`’s exact case-sensitive extension check.

## Residual Risks

- The backend may accept indexed ASP.NET model-binding names in reality, but OpenAPI is the stipulated sole truth and does not prove them.
- Date-time format is only `date-time`; no local-time/offset serialization requirement is described, so a frontend date conversion cannot be selected authoritatively.
- OpenAPI marks all multipart request fields optional; any client-side mandatory constraints remain product rules, not server-contract requirements.
- The route and client architecture need authenticated composition decisions after contract correction; neither should be improvised inside the page.
- No Engram tool was available in this runtime, so material discoveries could not be saved to project `upds-judge-front`.