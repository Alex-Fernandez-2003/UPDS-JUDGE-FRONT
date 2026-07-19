# Sprint 1 verification findings

## Blockers

- **BLOCKER — validation unverified:** All five requested npm validations were run from repository root and failed because `package.json` is located in `frontend/`. No passing validation evidence is available.
  - Commands/results: see acceptance report.
  - Expected project root: `frontend/`.

- **BLOCKER — required test coverage is absent:** `frontend/src/components/components.test.tsx` covers Button, Alert, BrandMark, Input, PasswordInput, Stepper, and StatCard only. Required tests are missing for Badge, FileDropzone, AuthLayout, AdminLayout, table states, router/404, `/dev/ui` production exclusion, MSW activation, HTTP timeout/cancellation/network/non-JSON/methods, and most component accessibility behavior.
  - Paths: `frontend/src/components/components.test.tsx`, `frontend/src/lib/api/http-client.test.ts`.

## Warnings

- **WARNING — public-env access is not fully centralized:** `import.meta.env.DEV` is read directly by React bootstrap/routing code, rather than through `src/config/env.ts`.
  - Paths: `frontend/src/main.tsx:7`, `frontend/src/routes/router.tsx:5`.
  - `VITE_*` values themselves are centralized in `frontend/src/config/env.ts`.

- **WARNING — environment example could not be content-inspected:** the read tool blocked access to `frontend/.env.example` as sensitive. Its presence is visible in the working tree, but required variable/privacy contents were not independently verified.

## Confirmed by source inspection

- Vite uses port `8085` with `strictPort: true` for server and preview; `/api` proxy target comes from Node/Vite-only `API_PROXY_TARGET`, defaulting to `http://localhost:5185`.
  - `frontend/vite.config.ts`
- Direct `fetch` appears only in the shared HTTP client; lint allowlist permits that client and generation scripts.
  - `frontend/src/lib/api/http-client.ts:48`
  - `frontend/.oxlintrc.json`
- HTTP client has GET/POST/PUT/PATCH/DELETE helpers, JSON/FormData handling, 204 handling, abort timeout and normalized API errors.
  - `frontend/src/lib/api/http-client.ts`
- No invented endpoints, DTOs, handlers, or authentication scheme found:
  - Empty endpoint registry: `frontend/src/lib/api/endpoints.ts`
  - Empty MSW handlers: `frontend/src/mocks/handlers/index.ts`
  - Neutral auth abstraction: `frontend/src/lib/auth/auth-transport.ts`
  - OpenAPI generation fails clearly without schema URL: `frontend/scripts/generate-api-types.mjs`
- `/dev/ui` is conditionally registered only when Vite `DEV` is true.
  - `frontend/src/routes/router.tsx`
- All requested base component names are present:
  - Common: `frontend/src/components/common/index.tsx`
  - Forms: `frontend/src/components/forms/index.tsx`
  - Navigation: `frontend/src/components/navigation/index.tsx`
  - Table: `frontend/src/components/tables/index.tsx`
  - Layouts: `frontend/src/layouts/AuthLayout/index.tsx`, `frontend/src/layouts/AdminLayout/index.tsx`
- Git status shows implementation changes confined to `frontend/`, the new OpenSpec change under `docs/openspec/`, and harness artifacts; no backend, `database/`, root `README.md`, or academic-document changes were listed.