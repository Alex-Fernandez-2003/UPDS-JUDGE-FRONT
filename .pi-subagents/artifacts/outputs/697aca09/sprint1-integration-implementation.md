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

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "The implementation stays in the allowed frontend auth/router/pages/contests/api/bootstrap/tsconfig/MSW/test areas. It wires dynamic sessionStorage Bearer transport before React mounts, uses the canonical protected routes, moves and routes AdminContestsPage, consolidates the documented contest listing operation, resolves TS5101, and retains 65 tests."
    }
  ],
  "changedFiles": [
    "docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/tasks.md",
    "frontend/tsconfig.app.json",
    "frontend/src/main.tsx",
    "frontend/src/lib/auth/auth-transport.ts",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/routes/constants.ts",
    "frontend/src/routes/ProtectedRoute.tsx",
    "frontend/src/routes/router.tsx",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/features/auth/Components/LoginForm.tsx",
    "frontend/src/features/auth/Pages/LoginPage.tsx",
    "frontend/src/features/auth/Pages/DashboardPage.tsx",
    "frontend/src/features/contests/pages/AdminContestsPage.tsx",
    "frontend/src/pages/AdminContestsPage.tsx (deleted)",
    "frontend/src/pages/.gitkeep (deleted)",
    "frontend/src/features/contests/types.ts",
    "frontend/src/features/contests/service.ts",
    "frontend/src/features/contests/hooks.ts",
    "frontend/src/features/contests/ContestsAdminScreen.tsx",
    "frontend/src/features/contests/components/ContestsAdminTable.tsx",
    "frontend/src/features/contests/components/ContestsFiltersBar.tsx",
    "frontend/src/features/contests/contests.test.tsx",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/src/mocks/handlers/handlers.test.ts"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/contests.test.tsx",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/mocks/handlers/handlers.test.ts"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run typecheck (baseline)",
      "result": "failed",
      "summary": "Recorded TS5101 for deprecated baseUrl before the minimal configuration fix."
    },
    {
      "command": "cd frontend && npm run test:run (baseline)",
      "result": "failed",
      "summary": "Recorded 5 failed and 60 passed tests out of 65."
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "failed",
      "summary": "Only 13 known pre-existing untouched files require formatting; modified files pass the scoped check."
    },
    {
      "command": "cd frontend && npm run lint && npm run typecheck && npm run test:run && npm run build",
      "result": "passed",
      "summary": "Oxlint and TypeScript passed; Vitest reported 13 files and 65 tests passed; Vite production build completed."
    },
    {
      "command": "cd frontend && npx prettier --check <all modified frontend files>",
      "result": "passed",
      "summary": "All modified frontend files conform to Prettier."
    },
    {
      "command": "cd frontend && npm run dev -- --host 127.0.0.1; curl http://127.0.0.1:8085/; stop process",
      "result": "passed",
      "summary": "Vite became ready on port 8085 and / returned HTTP 200."
    },
    {
      "command": "git diff --check; git diff --cached --name-only; git status --short",
      "result": "passed",
      "summary": "No diff whitespace errors and no staged files."
    }
  ],
  "validationOutput": [
    "Final Vitest result: 13 passed test files, 65 passed tests.",
    "TypeScript TS5101 is absent; typecheck and Vite build pass.",
    "The Vite development server returned HTTP 200 for the root path.",
    "The global formatting failure is limited to 13 pre-existing untouched files documented in tasks.md."
  ],
  "residualRisks": [
    "Manual browser verification of login, reload, live Bearer request, and successful authenticated create was not performed; no mutating backend request was sent.",
    "The available OpenAPI description does not publish a GET /api/Concursos response schema, so the existing frontend list DTO remains dependent on backend behavior already represented by the existing tests.",
    "Global format:check remains blocked by 13 pre-existing untouched files."
  ],
  "noStagedFiles": true,
  "diffSummary": "Configured dynamic sessionStorage authentication during bootstrap; made admin routing canonical and protected; moved and integrated the contest admin page with one real listing service; repaired existing contracts/tests; and applied the targeted TS5101 compatibility option.",
  "reviewFindings": [
    "no blockers found in the scoped implementation after lint, typecheck, test, build, development-server, scoped-format, and diff checks.",
    "advisory: the global format check has pre-existing failures only, listed in the OpenSpec task status.",
    "advisory: live authenticated backend behavior and the undocumented list response remain for manual verification."
  ],
  "manualNotes": "No dependencies, backend, database, READMEs, other OpenSpec changes, commits, or pushes were modified. The expected report artifact was written separately under .pi-subagents."
}
```
