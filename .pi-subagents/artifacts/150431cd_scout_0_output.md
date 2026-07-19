# Code Context

## Files Retrieved

1. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/proposal.md` (lines 1-337) — scope, non-goals, technical contracts, documentation boundary.
2. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/design.md` (lines 1-403) — intended boundaries and data flows.
3. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/spec.md` (lines 1-574) — normative foundation requirements and documentation requirements.
4. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` (lines 1-559) — task status language that requires closure updates.
5. `frontend/package.json` (lines 1-46) — exact npm scripts and installed versions.
6. `frontend/vite.config.ts` (lines 1-29); `frontend/tsconfig*.json` (all lines); `frontend/.oxlintrc.json` (lines 1-21) — build, aliases, test, and direct-fetch enforcement.
7. `frontend/.env.example` (lines 1-8); `frontend/src/config/env.ts` (lines 1-43); `frontend/src/config/env.test.ts` (lines 1-28) — environment contract.
8. `frontend/scripts/generate-api-types.mjs` (lines 1-17); `frontend/src/types/api.generated.ts` (lines 1-485) — generated-type process and generated schema output.
9. `frontend/src/lib/api/{api-error,endpoints,http-client,problem-details,index}.ts` (all lines) and `http-client.test.ts` (lines 1-207) — HTTP/error/endpoint public interfaces and test names.
10. `frontend/src/lib/auth/{auth-session,auth-transport,index}.ts` (all lines); `frontend/src/lib/query/{query-client,QueryProvider,index}.ts` (all lines) — neutral auth and remote-state foundation.
11. `frontend/src/mocks/**` (all files, lines 1-36) — MSW worker, handlers, fixtures/builders, and tests.
12. `frontend/src/routes/{constants,router}.tsx` and `router.test.tsx` (all lines) — real routes, development gate, and tests.
13. `frontend/src/components/{common,forms,navigation,tables}/index.tsx` (all lines) and `components.test.tsx` (lines 1-105) — every shared component’s actual props/states.
14. `frontend/src/layouts/{AuthLayout,AdminLayout}/index.tsx` and `layouts.test.tsx` (all lines); `frontend/src/dev/ui/DevUi.tsx` (lines 1-99) — layout contracts and development catalog.
15. `frontend/src/{main,App}.tsx` (all lines), `styles/{globals,tokens}.css` (all lines), `App.css` and `index.css` (all lines) — bootstrap, providers, actual active styles, and stale scaffold CSS.
16. `frontend/README.md` (lines 1-57); root `README.md` (lines 1-125); `frontend/.editorconfig`, `.prettierrc`, `.prettierignore`, `.gitignore` (all lines) — documentation and formatting constraints.

## Fact-only handbook outline for the writer

### 1. Purpose, scope, and reader quick path

- State that this is a React 19/Vite 8/TypeScript 6 frontend foundation, not a functional login, registration, contest, or ZIP-import implementation (`frontend/README.md:1-4`).
- Preserve the root-README boundary: the requested guide belongs in `frontend/`; do not revise root `README.md` (spec documentation requirements; `proposal.md` non-goals).
- Document only frontend facts. **Do not include Swagger/backend defects, observed unexpected backend responses, or backend observations.** This is an explicit closure constraint, even though the present frontend README contains contract-specific narrative.

### 2. Setup and commands (run from `frontend/`)

```bash
npm install
cp .env.example .env.local
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run format
npm run format:check
npm run test
npm run test:run
npm run api:types
```

- Actual scripts: `dev=vite`; `build=tsc -b && vite build`; `preview=vite preview`; `lint=oxlint`; format scripts use Prettier; test scripts use Vitest; API types script is Node (`frontend/package.json:5-16`).
- Dev and preview use `8085` with `strictPort: true`; `/api` proxies to `API_PROXY_TARGET` and defaults to `http://localhost:5185` (`frontend/vite.config.ts:7-25`).
- API types need `OPENAPI_SCHEMA_URL`; the script fails with a clear message when absent (`frontend/scripts/generate-api-types.mjs:4-16`). Do not make backend-contract claims in the new guide.

### 3. Environment

| Variable | Consumer | Example/default | Validated behavior |
|---|---|---|---|
| `VITE_APP_NAME` | React | `UPDS Judge` | required non-empty string |
| `VITE_API_BASE_URL` | React | `/api` | required and must start `/` |
| `VITE_REQUEST_TIMEOUT_MS` | React | `10000` | finite positive number |
| `VITE_ENABLE_MOCKS` | React | `false` | only literal `true`/`false`; default false |
| `API_PROXY_TARGET` | Vite only | `http://localhost:5185` | loaded with `loadEnv(..., '')` |
| `OPENAPI_SCHEMA_URL` | Node generator only | set in example | required only for `api:types` |

- `.env` and `.env.local` are ignored; do not place secrets in frontend `VITE_*` variables (`frontend/.gitignore:25-27`, `frontend/.env.example:1-8`).
- All React env reads pass through `parsePublicEnv`; `isDevelopment` is the single exported `import.meta.env.DEV` read (`frontend/src/config/env.ts:1-43`).

### 4. Folder tree and responsibility map

```text
frontend/
├── scripts/generate-api-types.mjs
├── src/
│   ├── config/              # typed public env
│   ├── lib/api/             # ApiError, endpoints, HttpClient, Problem Details
│   ├── lib/auth/            # AuthSession and optional bearer-header adapter
│   ├── lib/query/           # QueryClient factory/provider
│   ├── mocks/               # MSW browser worker, handlers, safe UI data
│   ├── components/common/   # actions, branding, surfaces, feedback
│   ├── components/forms/    # controls and FileDropzone
│   ├── components/navigation/ # breadcrumbs, steps, pages, stats
│   ├── components/tables/   # DataTable
│   ├── layouts/             # AuthLayout/AdminLayout
│   ├── routes/              # constants and browser router
│   ├── dev/ui/              # development-only catalog
│   ├── styles/              # globals and semantic CSS tokens
│   ├── types/api.generated.ts # generated; do not hand-edit
│   └── features/, hooks/, pages/, assets/, realtime/, styles/ # reserved/empty where .gitkeep exists
├── public/{favicon.svg,icons.svg}
└── package.json
```

- `main.tsx` conditionally starts MSW before rendering, then mounts `App`; `App` composes `QueryProvider` and `RouterProvider` (`frontend/src/main.tsx:1-17`, `frontend/src/App.tsx:1-10`).
- `@/` resolves to `src/` in Vite and `@/*` resolves to `src/*` in TS (`vite.config.ts:10-12`, `tsconfig.app.json:8-10`).

### 5. API, errors, auth, query, and mocks

- Only `HttpClient` calls `fetch`; oxlint prohibits direct fetch except `src/lib/api/http-client.ts` and `scripts/**/*.mjs` (`frontend/.oxlintrc.json:4-20`).
- `HttpClient` public methods: `request`, `get`, `post`, `put`, `patch`, `delete`; accepts JSON/object, `FormData`, `AbortSignal`, `RequestInit` options, optional `timeoutMs`; returns parsed JSON/text or `undefined` on 204 (`http-client.ts:9-149`).
- `ApiError`: optional `status`, `code`, `fieldErrors`, `requestId`; `kind` is `http | network | timeout | aborted` (`api-error.ts:1-24`). Problem Details recognizes `title`, `detail`, or `status`; validation entries must be `string[]` (`problem-details.ts:1-43`).
- Endpoint registry currently exports only `auth.login='Auth/login'` and `auth.register='Auth/register'`, relative to configured `/api` (`endpoints.ts:1-7`).
- Auth is non-persistent: `AuthSession.state` is `unknown | anonymous | authenticated`; bearer adapter receives `() => string | undefined`, while default transport is empty (`auth-session.ts:1-5`, `auth-transport.ts:1-16`).
- Query defaults: retry fewer than two times except HTTP status below 500; `staleTime=30000`, `gcTime=300000` (`query-client.ts:1-17`).
- MSW activates only if both development and `env.enableMocks`; worker bypasses unhandled requests (`main.tsx:6-17`). Fixtures are `uiFixture` and `buildUiFixture`; handlers are two POST `/api/Auth/*` handlers (`mocks/**/*.ts`). Do not describe backend observations in the new document.

### 6. Routes and development catalog

- Constants: `/login`, `/register`, `/admin/contests`, `/admin/contests/new`, `/dev/ui` (`routes/constants.ts:1-7`).
- The four product routes are placeholders saying they are reserved for later approved changes. Unknown routes render `404`; `/dev/ui` is lazy-loaded and registered only when `isDevelopment` is true (`routes/router.tsx:7-42`).
- `/dev/ui` demonstrates actual tokens/actions, feedback/fields, six-step Stepper, `.zip` FileDropzone with 1,000,000-byte max, StatCard, EmptyState, DataTable, and both layout previews; it uses `uiFixture` and no HTTP (`dev/ui/DevUi.tsx:1-99`).

### 7. Shared UI API reference

- **Actions:** `Button` props are native button props plus variants `primary|secondary|outline|ghost|danger`, sizes `sm|md|lg`, `fullWidth`, `loading`, `leftIcon`, `rightIcon`; loading disables and replaces the left icon with Lucide `LoaderCircle`. `IconButton` requires `label`; `LinkButton` is anchor props plus action variants (`components/common/index.tsx:10-92`).
- **Brand/surfaces:** `BrandMark({src?, alt?, size?: sm|md|lg})`, default React SVG placeholder; `Surface`, `Card`, `Divider` accept native element props; `Avatar({name,src?,className?})` generates up to two initials without `src` (`common/index.tsx:93-161`).
- **Feedback:** `Badge`, `StatusDot`, and `Alert` use tone `neutral|info|success|warning|danger`; `Alert` has `role=alert`. `Spinner({label?})`, `ProgressBar({value,label?})` clamps 0–100, `Skeleton({className?})`, `EmptyState({title,description?,action?})` (`common/index.tsx:162-251`).
- **Forms:** `Label`, `FormHint`, `FormError`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`; Input/Textarea/Select add `error?: boolean`, setting `aria-invalid`. `PasswordInput` toggles text/password with accessible Lucide controls. `FormField({label,hint?,error?,children})` assigns id/description/error to one child. `SearchInput` wraps search input. `PasswordStrength({value})` scores 0/33/66/100 at length 0/1-7/8-11/12+. `FileDropzone({accept?,maxSizeBytes?,disabled?,onChange?})` has click/drop selection, extension-only accept check, maximum-size check, removal, and accessible error; it does not upload (`forms/index.tsx:1-204`).
- **Navigation:** `Breadcrumbs({items:{label,to?}[]})`; `Stepper({steps:string[],activeIndex:number})`; `Pagination({page,totalPages,onPageChange})` clamps page; `StatCard({label,value,tone?:neutral|info|success})` (`navigation/index.tsx:1-89`).
- **Table:** `DataTable<T>({columns,rows,loading?,error?,rowActions?,emptyText?})`, where columns have `key`, `header`, optional `render`; represents error alert, skeleton loading, rows, empty state, optional Actions column, and horizontal overflow (`tables/index.tsx:1-68`).
- **Layouts:** `AuthLayout({title,description?,branding?,illustration?,children})`; desktop has decorative branding panel, mobile shows branding in content. `AdminLayout({user='Sample administrator',sidebar?,children})`; default English navigation is Overview, Contests, Problem bank, Users and roles, Languages, Audit, Settings; header has Notifications and Avatar (`layouts/*/index.tsx`).

### 8. Tests actually present

- `parsePublicEnv`: typed valid values/default-disabled mocks; invalid app name, timeout, and mock flag (`config/env.test.ts`).
- `HttpClient`: JSON, optional/preserved authorization, FormData/204, all five verbs, text success, Problem Details/request IDs, validation errors, generic `mensaje`, network failure, timeout, caller cancellation (`lib/api/http-client.test.ts`).
- `auth contract handlers`: generated login and register response shapes (`mocks/handlers/handlers.test.ts`).
- `foundation components`: loading action/alert/BrandMark; Badge tone; FormField plus password visibility; FileDropzone select/remove/type rejection; Stepper, StatCard, rendered table (`components/components.test.tsx`).
- `foundation layouts`: AuthLayout slots; AdminLayout nav/topbar/user/content (`layouts/layouts.test.tsx`).
- `application routes`: unknown 404 and development-only `/dev/ui` registration (`routes/router.test.tsx`).

### 9. Styling and formatting constraints

- Active global entry is `src/styles/globals.css`, importing Tailwind v4 and `tokens.css`; semantic tokens cover brand, primary, background/surfaces, text, border, five status/focus values, spacing 1–4, radii, shadows, and z layers (`styles/globals.css:1-19`, `styles/tokens.css:1-31`).
- Prettier: single quotes, no semicolons, trailing commas. EditorConfig: UTF-8, LF, final newline, 2-space indentation; trailing whitespace remains allowed in Markdown (`.prettierrc`, `.editorconfig`).
- `src/App.css` and `src/index.css` are unused legacy scaffold CSS: `main.tsx` imports `styles/globals.css`, not either file. Do not present them as part of the active design system.

## Documentation constraints and closure wording

### Required task-status corrections

Update the **Execution status** section of `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` rather than claiming remaining technical work:

1. Replace `Task 47 remains pending: no manual capture evidence was created or found.` with: **`Task 47 — Manual captures: pending but non-blocking. No capture, placeholder, or empty evidence file was created; this does not prevent technical closure of the foundation.`**
2. Replace `Task 48 requires an OpenSpec tool validation if one is available.` and the later `No supported openspec CLI ... so Task 48 remains pending external tool validation.` with: **`Task 48 — OpenSpec CLI validation is not applicable by project decision. Structural consistency is attested from the four change artifacts; no CLI installation or external validation is required for closure.`**
3. Retitle/replace the current execution-status content so its opening statement is: **`Technical foundation complete.`** Keep the implemented areas and passed validation facts, but do not frame manual captures or CLI availability as technical blockers.
4. Do not insert Swagger defect notes, backend-observation notes, or the observed non-200 proxy result into the detailed Spanish guide. These do not belong in frontend architecture/development documentation under the requested closure decision.

### Residual documentation risks

- **medium — `README.md:7-25` (root):** it says the frontend is absent and no local scripts are available, while this checkout contains `frontend/`. The new guide must not repeat that stale assertion; root README is protected by change scope.
- **low — `frontend/README.md:29-38`:** it contains contract-specific routes/status wording and a resilience explanation. The new guide is constrained to omit backend observations/defects; retain frontend process facts only.
- **low — `frontend/src/App.css` and `frontend/src/index.css`:** unused Vite scaffold styles can confuse readers; document active styles as `src/styles/globals.css` and tokens only.

## Architecture

Vite reads Node-only proxy configuration. React validates public configuration once in `config/env.ts`. `main.tsx` optionally starts MSW before mounting the strict-mode app. `App` provides TanStack Query and the browser router. UI components do not fetch; future feature code is intended to flow component → feature hook → feature service → `HttpClient`. The client joins relative paths to `/api`, applies timeout/cancellation/auth-header abstraction, parses response text/JSON, and emits `ApiError`. The router uses placeholders for reserved product routes and conditionally loads `/dev/ui`; the catalog consumes shared UI and local fixtures only.

## Start Here

Open `frontend/README.md` first: it is the existing in-scope reader guide and supplies the current command/environment framing. Then verify every statement against `frontend/package.json`, `frontend/vite.config.ts`, and the source sections above before writing Spanish prose.