# UPDS Judge frontend foundation

This Vite application provides the shared frontend foundation for later approved features. It intentionally contains no functional login, registration, contest, or ZIP-import flow.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Development and preview use **<http://localhost:8085>** with strict port handling. The development catalog is available at `/dev/ui`; it is not registered in production.

## Environment

| Variable                  | Consumer         | Purpose                                                            |
| ------------------------- | ---------------- | ------------------------------------------------------------------ |
| `VITE_APP_NAME`           | React            | Public application name                                            |
| `VITE_API_BASE_URL`       | React            | Relative API base path (`/api` locally)                            |
| `VITE_REQUEST_TIMEOUT_MS` | React            | Positive HTTP timeout in milliseconds                              |
| `VITE_ENABLE_MOCKS`       | React            | Enables MSW only in development; defaults to `false`               |
| `API_PROXY_TARGET`        | Vite only        | Development proxy target; local example is `http://localhost:5185` |
| `OPENAPI_SCHEMA_URL`      | Node script only | Confirmed schema URL used for type generation                      |

Do not place secrets in `VITE_*` variables. `.env` and `.env.local` are ignored.

## Architecture

- `src/config/env.ts` validates every public environment variable.
- `src/lib/api/` is the only application transport boundary. Components, pages, hooks, and future services must not call `fetch` directly.
- `src/lib/query/` provides TanStack Query defaults for remote state.
- `src/lib/auth/` provides an optional, non-persistent HTTP Bearer/JWT header adapter. It does not implement login, registration, storage, cookies, or credentials.
- `src/mocks/` contains opt-in MSW infrastructure, fixtures, builders, and 200-only handlers for the confirmed auth routes.
- `src/components/`, `src/layouts/`, and `src/styles/` contain semantic, reusable UI foundations.

Use `@/` for imports across top-level areas. Functional icons use Lucide; `BrandMark` encapsulates the React asset only as a replaceable technical placeholder.

## OpenAPI contract block

`npm run api:types` loads `OPENAPI_SCHEMA_URL` from the local Node environment (including `.env.local`) and generates `src/types/api.generated.ts`. The local schema is `http://localhost:5185/swagger/v1/swagger.json`.

```bash
npm run api:types
```

The generated file is the source of truth for contract DTOs. The confirmed auth routes are `POST /api/Auth/login` and `POST /api/Auth/register`; the endpoint registry stores them relative to `/api` as `Auth/login` and `Auth/register` to avoid a duplicate prefix. Both declare only a 200 response in the current schema. Error normalization supports generic Problem Details and a generic `mensaje` body as transport resilience, not as documented auth error statuses.

The OpenAPI document declares a global HTTP Bearer/JWT scheme. Supply a token only through the optional in-memory provider when a future approved flow needs it; this foundation does not persist or acquire tokens.

## Commands

| Command                           | Purpose                                     |
| --------------------------------- | ------------------------------------------- |
| `npm run dev`                     | Start strict development server on 8085     |
| `npm run build`                   | Typecheck and build production assets       |
| `npm run preview`                 | Preview build on strict port 8085           |
| `npm run lint`                    | Run direct-fetch policy and code checks     |
| `npm run typecheck`               | Run TypeScript project checks               |
| `npm run format` / `format:check` | Apply or verify Prettier formatting         |
| `npm run test` / `test:run`       | Run Vitest and React Testing Library        |
| `npm run api:types`               | Generate types from a confirmed OpenAPI URL |

## Contribution rules

Keep feature data flow as component → feature hook → feature service → shared HTTP client. Keep fixtures outside components, preserve semantic tokens instead of scattered colors, and add real backend routes only from OpenAPI. `/dev/ui` is a development catalog, not a product screen.
