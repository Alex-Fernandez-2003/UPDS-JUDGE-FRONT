# Sprint 1 integration implementation

Implemented the approved minimal auth, routing, admin-contests, and TypeScript integration.

## Delivered

- Configured the single shared HTTP client at bootstrap with an `AuthTransport` that reads `sessionStorage['token']` for every request and safely omits authorization without browser storage.
- Kept the contractual login token field, stored only its string value, and redirected successful login to `/admin/dashboard`.
- Protected `/admin/dashboard`, `/admin/contests`, and `/admin/contests/new`; retained `/dashboard` as a redirect to the canonical dashboard.
- Added the dashboard `Crear concurso` navigation and preserved the existing admin layout composition.
- Moved `AdminContestsPage` to `features/contests/pages/`, routed the real screen, removed the old page directory, and consolidated listing to `GET /api/Concursos` through one service function.
- Removed unsupported admin-only summary requests and modality/date filters. The retained list query uses only `filtro`, `busqueda`, `pagina`, and `tamanoPagina`.
- Added the real mock login token field, repaired affected existing tests/contracts without adding tests, and preserved the 65-test count.
- Resolved TS5101 with the TypeScript-directed `ignoreDeprecations: "6.0"` option while retaining the required alias `baseUrl`.
- Updated the change task status with executed evidence and remaining manual validation.

## Validation

- Baseline: 65 tests; 60 passed and 5 failed.
- Final: 13 files and 65 tests passed.
- `lint`, `typecheck`, and `build` passed.
- Scoped Prettier check for all modified files passed.
- Global `format:check` still reports only 13 pre-existing, untouched files; they are listed in `tasks.md`.
- Vite started on `127.0.0.1:8085` and returned HTTP 200 for `/`.