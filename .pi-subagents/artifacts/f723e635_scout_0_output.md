# Code Context

## Files Retrieved

1. `frontend/package.json` (lines 1-25) — current scripts and exact declared dependency baseline.
2. `frontend/vite.config.ts` (lines 1-7) — Vite has only the React plugin; no port, proxy, environment loading, or alias.
3. `frontend/tsconfig.json` (lines 1-7), `frontend/tsconfig.app.json` (lines 1-26), `frontend/tsconfig.node.json` (lines 1-23) — project references and strict compiler baseline; no `@/` path mapping.
4. `frontend/.oxlintrc.json` (lines 1-8) — Oxlint is the only observed lint configuration.
5. `frontend/.gitignore` (lines 1-24) and `.gitignore` (lines 1-2) — frontend excludes dependencies/build output and `*.local`, but not `.env`; root ignores only `.atl/`.
6. `frontend/src/main.tsx` (lines 1-10), `frontend/src/App.tsx` (lines 1-122), `frontend/src/index.css` (lines 1-111), `frontend/src/App.css` (lines 1-137) — untouched Vite starter entry, screen, and styles.
7. `frontend/README.md` (lines 1-32) — stock Vite/Oxlint template documentation only.
8. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/{proposal,spec,design,tasks}.md` — untracked but complete four-artifact OpenSpec change; its scope and blockers match this reconnaissance.

## Initial State

- Repository: `C:/dev/UPDS-JUDGE-FRONT`, branch `develop`, HEAD `0b0f5e5 docs: fix in sprint plan`; remote `origin` is configured for GitHub.
- Initial working tree was already dirty exclusively with untracked `.pi-subagents/`, `.pi/`, and `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`. There were no tracked-file unstaged or staged diffs.
- Protected tracked areas baseline: `database/` has 1 file, root `README.md` has 1 file, and `docs/` has 37 tracked files. The Sprint 1 change directory is pre-existing untracked work and must not be discarded.
- Runtime: Node `v24.16.0`; npm `11.13.0`. `frontend/node_modules` is present. Installed top-level resolved versions are React/React DOM `19.2.7`, Vite `8.1.5`, TypeScript `6.0.3`, Oxlint `1.74.0`, and the declared type/plugin packages.

## Reusable Foundation

- The Vite React bootstrap is usable: `main.tsx` mounts `App` in `StrictMode` (`frontend/src/main.tsx:1-10`). Replace the starter composition rather than creating another frontend project.
- Existing intentional extension points are empty, tracked directories: `src/components/{common,forms,navigation,tables}`, `src/features/{administration,auth,contests,problems,ranking,submissions}`, `src/{hooks,layouts,pages,routes,styles,types}`, and `src/lib/{api,auth,realtime}`.
- TypeScript already uses bundler resolution, DOM libs, React JSX, `noEmit`, unused-symbol checks, and project references (`frontend/tsconfig.app.json:4-25`; `frontend/tsconfig.node.json:3-22`). Extend these configurations rather than replacing them.
- The React asset at `frontend/src/assets/react.svg` is available for the specified temporary BrandMark fallback. Existing `App.tsx` is starter-only and has no product/API behavior.

## Dependency and Configuration Gaps

### Blocker — backend/OpenAPI unavailable

A safe probe was made only to the user-provided observed root URL `http://localhost:5185/`. It timed out at connect after ~2 seconds (curl exit 28); listener inspection showed no `:5185` process. No routes, Swagger UI, OpenAPI document, DTOs, response codes, security schemes, or authentication mechanism were observed. No speculative Swagger/OpenAPI URL was requested.

Therefore contractual work remains blocked: generated API types, API endpoint constants, authentication transport choice, credential behavior, and contract-based MSW handlers. The OpenSpec artifacts correctly prohibit inventing them.

### High — foundation requirements not yet configured

- `frontend/vite.config.ts:5-7` lacks required dev/preview port `8085`, `strictPort`, `/api` proxy, `API_PROXY_TARGET` loading, and `@/` alias.
- `frontend/tsconfig.app.json:2-25` lacks `baseUrl`/`paths` for `@/`; test configuration does not exist.
- `frontend/package.json:6-23` has only `dev`, `build`, `lint`, and `preview`. Missing required implementations/scripts: `typecheck`, `format`, `format:check`, `test`, `test:run`, and `api:types`.
- Only React and React DOM are runtime dependencies (`frontend/package.json:12-15`). None of the approved foundation packages are present: React Router, TanStack Query, React Hook Form, Zod (+ adapter), MSW, Lucide, Tailwind, CVA/clsx/tailwind-merge.
- Dev tooling lacks Vitest, React Testing Library, DOM test environment/matchers/user-event, Prettier, EditorConfig, Tailwind integration, and an OpenAPI type-only generator.

### Medium — lint, environment, documentation, and styling gaps

- The observed linter is Oxlint, not ESLint: `frontend/package.json:9` runs `oxlint`; `frontend/.oxlintrc.json:1-8` covers only hooks and component exports. There is no observed `fetch` restriction/allowlist, alias resolver configuration, or ESLint config. Resolve the spec's “ESLint” wording before implementation: either introduce ESLint explicitly or meet the policy with the existing Oxlint tool and update the contract deliberately.
- No `.env.example`, `src/config/env.ts`, import-meta environment typing extension, or local environment file exists. `.env` is **not ignored**: `frontend/.gitignore:10-13` ignores `*.local` but not `.env`; this conflicts with the change requirement that `.env` remain unversioned. `.env.example` would be tracked under current rules.
- `frontend/README.md:1-32` is template-only. It lacks project setup, port 8085, proxy target 5185, variables, mocks, OpenAPI generation, architecture, `/dev/ui`, scripts, and contribution guidance.
- Current CSS is starter-specific: global variables are non-semantic template tokens with light/dark Vite styling (`frontend/src/index.css:1-110`), while `App.css` styles the Vite starter. No Tailwind, design-token files, shared UI, layouts, router, Query provider, HTTP client, auth abstraction, mocks, or tests exist.

## Architecture

Current flow is only `index.html -> src/main.tsx -> App.tsx -> starter CSS/assets`. No router, providers, feature service, API client, runtime configuration, or backend connection exists. The tracked empty folders are the intended boundaries to populate without destructive restructuring. The untracked OpenSpec change explicitly makes Vite the Node-only consumer of `API_PROXY_TARGET`, React environment access go through `src/config/env.ts`, and contract discovery a prerequisite for endpoint/auth implementation.

## Start Here

Open `frontend/vite.config.ts` first. It is the smallest, highest-leverage configuration gap: it must establish the mandatory port/strict-port behavior, Node-only proxy target handling, `/api` proxy, and likely the Vite half of the alias. Do not create endpoint, auth, or generated-type code until a real OpenAPI document is observable.

## Review Findings

- blocker: external `http://localhost:5185/` timed out; no OpenAPI/auth evidence exists, so contract-dependent code must remain pending.
- high: `frontend/vite.config.ts:5-7` lacks all required port/proxy/alias configuration.
- high: `frontend/package.json:6-23` lacks foundation dependencies and most required scripts/test tooling.
- medium: `frontend/.gitignore:10-13` does not ignore `.env`, contrary to the proposed environment contract.
- medium: `frontend/.oxlintrc.json:1-8` is Oxlint-only and does not enforce the required direct-`fetch` policy; the spec’s ESLint requirement needs an explicit implementation decision.