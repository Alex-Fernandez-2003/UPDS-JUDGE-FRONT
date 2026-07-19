# Code Context

## Files Retrieved

1. `frontend/docs/guia-arquitectura-y-desarrollo.md` (lines 121-166, 167-260, 261-312) — existing transport/OpenAPI/MSW/router/component/feature/test guidance; insert both tutorials immediately before line 313, `## Checklist para un PR de frontend`.
2. `frontend/src/components/navigation/index.tsx` (lines 1-96) — actual `StatCard`, `Breadcrumbs`, `Stepper`, and `Pagination` exports and signatures.
3. `frontend/src/components/common/index.tsx` (lines 1-296) — shared visual/action primitives, notably `Card`, `Button`, `Alert`, and exported style variants.
4. `frontend/src/components/forms/index.tsx` (lines 1-261) — `FormField`, `Input`, and `PasswordInput` contracts appropriate to a conceptual login form.
5. `frontend/src/components/tables/index.tsx` (lines 1-73) — complete `DataTable<T>` export, included to map every component module.
6. `frontend/src/dev/ui/DevUi.tsx` (lines 1-100) and `frontend/src/mocks/fixtures/ui.ts` (lines 1-5) — current real `StatCard` consumer: `uiFixture.statistic` plus `tone="info"`; the catalog is development-only.
7. `frontend/src/types/api.generated.ts` (lines 1-49, 440-463) — generated POST `/api/Auth/login` contract and `LoginRequest`/`LoginResponse` types.
8. `frontend/src/lib/api/http-client.ts` (lines 1-149), `frontend/src/lib/api/endpoints.ts` (lines 1-7), `frontend/src/lib/api/api-error.ts` (lines 1-24), and `frontend/src/lib/api/problem-details.ts` (lines 1-43) — exact client path, request behavior, endpoint constant, and normalized error behavior.
9. `frontend/src/lib/auth/auth-session.ts` (lines 1-5) and `frontend/src/lib/auth/auth-transport.ts` (lines 1-16) — session is only a neutral type; optional Bearer transport is non-persistent.
10. `frontend/src/lib/query/QueryProvider.tsx` (lines 1-7) and `frontend/src/lib/query/query-client.ts` (lines 1-17) — app-level provider and query defaults; no mutation abstraction exists yet.
11. `frontend/src/config/env.ts` (lines 1-36), `frontend/vite.config.ts` (lines 1-33), `frontend/package.json` (lines 1-42), and `frontend/scripts/generate-api-types.mjs` (lines 1-15) — public environment validation, `/api` proxy, test configuration/scripts, and deliberate OpenAPI-generation gate.
12. `frontend/src/main.tsx` (lines 1-18), `frontend/src/routes/constants.ts` (lines 1-7), and `frontend/src/routes/router.tsx` (lines 1-42) — MSW boot condition, reserved login route, and development-only lazy `/dev/ui` route.
13. `frontend/src/mocks/browser.ts` (lines 1-4), `frontend/src/mocks/handlers/index.ts` (lines 1-23), and `frontend/src/mocks/handlers/handlers.test.ts` (lines 1-40) — browser worker and confirmed MSW login handler/test pattern.
14. `frontend/src/test/setup.ts` (line 1), `frontend/src/config/env.test.ts` (lines 1-28), `frontend/src/lib/api/http-client.test.ts` (lines 1-177), `frontend/src/components/components.test.tsx` (lines 1-95), `frontend/src/layouts/layouts.test.tsx` (lines 1-43), and `frontend/src/routes/router.test.tsx` (lines 1-35) — all current frontend test files and setup patterns.

## Key Code

### Tutorial 1: actual `StatCard` case study; conceptual `SectionHeader`

`StatCard` is already implemented and named-exported from `@/components/navigation`:

```tsx
export function StatCard({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string | number
  tone?: 'neutral' | 'info' | 'success'
})
```

It renders a `div`, label paragraph, and value paragraph. Only `success` changes its border to `border-green-300`; `neutral` and `info` currently share `border-[var(--border)]` (`frontend/src/components/navigation/index.tsx:68-94`). Its live catalog use is exactly:

```tsx
<StatCard {...uiFixture.statistic} tone="info" />
// uiFixture.statistic = { label: 'Open items', value: '12' }
```

Use this as the executable starting example. Existing test coverage only verifies the label renders (`components.test.tsx:72-94`), so the documentation must not claim individual tone styling or numeric formatting has dedicated tests.

`SectionHeader` does **not** exist in any component module. Mark its code explicitly **“Muestra conceptual; no está implementada ni exportada actualmente”**. A pedagogical conceptual API may use `title: string`, `description?: string`, and optional `action?: React.ReactNode`, but must not say it is importable from `@/components/...`. Explain that an approved implementation would belong in an agreed shared area, should compose existing primitives such as `Card`/`Button` only where appropriate, and needs behavior/accessibility tests.

Other exact reusable APIs useful for contextual callouts:

- `Button` from `@/components/common`: variants `primary | secondary | outline | ghost | danger`; sizes `sm | md | lg`; `fullWidth`, `loading`, `leftIcon`, `rightIcon`, plus native button props. `loading` disables the element.
- `Card` accepts `HTMLAttributes<HTMLDivElement>` and composes `Surface`; `Alert` accepts native div props plus tone `neutral | info | success | warning | danger` and has `role="alert"`.
- `FormField` takes `label`, optional `hint`, optional `error`, and one React element child; it injects `id`, `aria-describedby`, and boolean `error`. `Input` takes native input props plus `error?: boolean`. `PasswordInput` takes native input props and provides its own show/hide control.
- Navigation module exports only `Breadcrumbs`, `Stepper`, `Pagination`, and `StatCard`; there is no barrel file elsewhere to conceal a `SectionHeader`.

### Tutorial 2: educational login POST, based on the actual contract

The generated, read-only contract says the path is `POST /api/Auth/login`, with optional `requestBody` content types `application/json`, `text/json`, and `application/*+json`, all `LoginRequest`; response `200` supports the same three representations of `LoginResponse` (`api.generated.ts:7-49`). The schemas are:

```ts
type LoginRequest = { correo?: string | null; contrasena?: string | null }
type LoginResponse = { token?: string | null; expiraEn?: string }
```

The source-level relative endpoint is already `endpoints.auth.login === 'Auth/login'` (`@/lib/api` re-exports it). `HttpClient` derives its final URL as `env.apiBaseUrl` without a trailing slash plus `/` plus a path without a leading slash. With the configured `/api`, that becomes `/api/Auth/login`.

The tutorial should teach this future-only pipeline, with every service/hook/component sample visibly marked **“Muestra educativa conceptual; no implementada actualmente”**:

```text
components['schemas']['LoginRequest'/'LoginResponse']
  -> future feature auth service: httpClient.post<LoginResponse>(endpoints.auth.login, payload)
  -> future useMutation hook (TanStack Query)
  -> future login component using FormField + Input + PasswordInput + Button
  -> HttpClient POST /api/Auth/login
  -> Vite proxy /api -> API_PROXY_TARGET, or MSW handler in opted-in development
```

No auth feature service, hook, mutation, form, or real login page exists. The `/login` router entry is a placeholder (`createAppRouter` renders title `Login` and a reserved-change message). Do not present conceptual sample imports as paths that already resolve. The only actual relevant imports are `@/lib/api`, `@/components/common`, `@/components/forms`, `@/lib/query`, and generated types from `@/types/api.generated`.

Important transport details to teach accurately:

- `HttpClient.post<T>(path, body?, options?)` delegates to `request<T>('POST', path, { ...options, body })`; result is `Promise<T | undefined>`.
- Plain object payloads are JSON-stringified. The client defaults `accept: application/json` and adds `content-type: application/json` unless body is `FormData` or a content type is supplied.
- It honors `AbortSignal` and `timeoutMs`; default timeout is `env.requestTimeoutMs`. It returns `undefined` for HTTP 204, JSON when parseable, otherwise text.
- Failures are `ApiError` with `kind: 'http' | 'network' | 'timeout' | 'aborted'`, with optional `status`, `code`, `fieldErrors`, and `requestId`. Problem Details `errors` only retain fields whose values are `string[]`.
- The default client uses `neutralAuthTransport`: no header/persistence. `createBearerAuthTransport(() => string | undefined)` can add `Bearer <token>`, but the tutorial must state this foundation intentionally implements neither session persistence nor credential acquisition.
- `QueryProvider` already wraps the app. Future `useMutation` comes from installed `@tanstack/react-query`; it is not currently wrapped by a project-specific helper. Existing query defaults only configure queries: retries while `count < 2` except HTTP `<500`, `staleTime: 30000`, `gcTime: 300000`.

### Proxy, MSW, route, environment facts

- `parsePublicEnv` requires nonempty `VITE_APP_NAME`; relative slash-prefixed `VITE_API_BASE_URL`; positive finite `VITE_REQUEST_TIMEOUT_MS`; and literal `true`/`false` mocks. `isDevelopment` is `import.meta.env.DEV`.
- Vite reads unprefixed `API_PROXY_TARGET` via `loadEnv`; defaults to `http://localhost:5185`; `server.proxy['/api']` forwards with `changeOrigin: true`. Dev/preview use port `8085`, `strictPort: true`.
- Browser MSW starts **before React renders** only when `isDevelopment && env.enableMocks`; it bypasses unhandled requests.
- Actual MSW handler: `http.post('/api/Auth/login', () => HttpResponse.json({ expiraEn: '2030-01-01T00:00:00Z' }, { status: 200 }))`. This satisfies `LoginResponse` but intentionally omits optional `token`; do not promise a token in the tutorial’s mocked happy-path result.
- Node MSW test server uses `setupServer(...handlers)`, `beforeAll(server.listen({ onUnhandledRequest: 'error' }))`, `afterEach(resetHandlers)`, and `afterAll(close)`. It calls `new HttpClient().post<LoginResponse>(endpoints.auth.login)` and expects exactly `{ expiraEn: '2030-01-01T00:00:00Z' }`.
- Test runtime is Vitest + jsdom with globals and `src/test/setup.ts`; setup imports `@testing-library/jest-dom/vitest`. Component tests use `render`, `screen`, `userEvent.setup()`, `fireEvent`, and Vitest `vi`. HTTP tests use `vi.stubGlobal('fetch', ...)`, restore globals/timers after each test, and test JSON, auth headers, FormData/204, every method, text, Problem Details, network, timeout, and caller abort.

## Architecture

The intended beginner explanation should distinguish three levels: (1) existing reusable visual primitive (`StatCard`), (2) a **conceptual** composition (`SectionHeader`), and (3) a **future approved** product flow (login). `DevUi` is an actual visual catalog using local fixture data; it does no HTTP and cannot demonstrate product login.

For login, generated OpenAPI types are contractual source of truth, while `endpoints.auth.login` removes a duplicated string at the service boundary. The future service calls the singleton `httpClient`; it is the only production `fetch` location, enforced by `.oxlintrc.json` (only `http-client.ts` and `scripts/**/*.mjs` are exempt). Relative `/api` requests are either intercepted by MSW when explicitly enabled in development or forwarded through Vite’s `/api` proxy. The browser app does not receive `API_PROXY_TARGET`.

## Precise insertion outline

Insert after the final paragraph of **“Formularios y features: patrón de incorporación”** (line 259) and before **“## Pruebas”** (line 261) if the tutorials should sit with feature architecture; the requested hard boundary is in all cases before line 313, `## Checklist para un PR de frontend`.

1. `## Tutorial para principiantes: de StatCard a una composición reutilizable`
   - Lead: `StatCard` is real; `SectionHeader` is conceptual and not implemented.
   - Quick path: import `StatCard` from `@/components/navigation`; render label/value/tone; inspect at `/dev/ui` in development.
   - “Contrato real” table: props, default `neutral`, allowed tones, existing catalog fixture, and what visual behavior is actually different.
   - Small executable snippet using `StatCard`; use only its confirmed import.
   - “Pensar antes de extraer”: recurring title/description/action need, ownership, accessibility, tests.
   - “Muestra conceptual — no implementar/copiar como import existente”: `SectionHeader` interface/snippet, explicitly labeled as future design discussion rather than repository API.
   - Reader checklist: verify actual export, do not invent `StatCard` props, do not claim `SectionHeader` exists.

2. `## Tutorial para principiantes: recorrer un POST de login sin implementar login`
   - Lead callout: describes a contract path; it does not authorize adding login because route and feature remain reserved.
   - Step 1 “Contrato generado”: quote `/api/Auth/login`, 200, `LoginRequest`, `LoginResponse`, optional/null fields, and generated-file prohibition.
   - Step 2 “Endpoint y service conceptual”: contrast actual `endpoints.auth.login` and `HttpClient.post<T>` with a clearly conceptual feature-service snippet.
   - Step 3 “Mutation and UI conceptual”: future `useMutation` and a form composed from actual `FormField`, `Input`, `PasswordInput`, `Button`, `Alert`; explain UI receives events/state and does not call `fetch`.
   - Step 4 “What the transport does”: URL join, JSON headers, timeout/abort, `ApiError`, no persistence/Bearer by default.
   - Step 5 “Where request goes”: `/api` -> Vite target in normal dev; MSW only under both gate conditions; list exact current mock 200 response and bypass behavior.
   - Step 6 “How a future approved feature would test”: follow HTTP stubbing pattern for transport, MSW server lifecycle for contract handler, and RTL behavior/accessibility for form/mutation states. State that no login feature tests exist today.
   - “No hacer todavía” checklist: no direct fetch, no manual generated-type edit/regeneration in this documentation change, no credentials/cookies/session persistence, no replacing reserved route.

## Risks and review findings

- **blocker (scope):** The guide explicitly says this foundation does not implement login and `/login` is reserved. Tutorial snippets must be fenced as conceptual/non-implemented, not documentation that implies an active login flow.
- **high (contract accuracy):** `LoginRequest` fields are optional and nullable; `LoginResponse.token` is optional/null. Do not make them required in prose/types or assume MSW returns a token.
- **medium (MSW realism):** Current login handler does not inspect request payload and always returns 200. Describe it as a confirmed route/response-shape mock, not validation/authentication behavior.
- **medium (StatCard accuracy):** `tone="info"` does not have a distinct border class; only `success` differs. Avoid a generic claim that every tone produces a different style.
- **low (environment):** Direct reading of `.env.example` was blocked as a sensitive path. Its values are independently evidenced by Vite test env and the existing guide; no secrets were needed or exposed.
- **low (memory):** Engram save tools were not available in this runtime, so no discovery could be saved despite the requested project name.

## Start Here

Open `frontend/docs/guia-arquitectura-y-desarrollo.md` at lines 249-313 first. It already establishes the feature-boundary language and gives the exact Markdown anchor. Then use `frontend/src/components/navigation/index.tsx:68-94` for the first tutorial and `frontend/src/types/api.generated.ts:7-49` plus `frontend/src/lib/api/http-client.ts:30-149` for the second.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete source mapping, exact paths/line ranges, signatures, imports, behavior, insertion anchor, outline, and severity-tagged review findings are provided."
    }
  ],
  "changedFiles": [
    ".pi-subagents/artifacts/outputs/71a87293/tutorials-scout.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "cd frontend && nl -ba ... (source line-range inspection)",
      "result": "passed",
      "summary": "Confirmed line ranges, generated login contract, and Markdown anchor; no tests or generators were run."
    }
  ],
  "validationOutput": [
    "Read-only mapping completed; no frontend source/documentation files were edited.",
    "No OpenSpec CLI or api:type generation was run."
  ],
  "residualRisks": [
    "Conceptual tutorial samples could be mistaken for existing exports unless every sample is visibly labeled non-implemented.",
    "The existing mock's optional token omission must remain accurately documented."
  ],
  "noStagedFiles": true,
  "diffSummary": "Only the required scouting artifact was written; repository frontend files remain untouched.",
  "reviewFindings": [
    "blocker: frontend/docs/guia-arquitectura-y-desarrollo.md:249-259 and frontend/src/routes/router.tsx:10-29 - login remains a reserved future feature; tutorials must not imply implementation.",
    "high: frontend/src/types/api.generated.ts:455-462 - login request/response properties are optional (and request properties nullable).",
    "medium: frontend/src/mocks/handlers/index.ts:9-13 - MSW login mock always returns 200 and no token."
  ],
  "manualNotes": "Engram tools were unavailable in this runtime; requested project save could not be performed."
}
```
