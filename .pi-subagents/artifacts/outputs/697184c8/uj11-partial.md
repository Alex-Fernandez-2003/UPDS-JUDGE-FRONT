# UJ-11 partial user dashboard integration — implementation handoff

## Implemented scope

- Added the user-only contest dashboard feature under `frontend/src/features/contests/user/`.
- Integrated independent stats (`GET /api/ParticipanteConcursos/stats-contest`) and recent submissions (`GET /api/Envios/mis-envios`).
- Dashboard requests `pagina=1&tamanoPagina=5`; the service/hook retains `resultado`, `concursoCodigo`, `inciso`, page, and page-size support for a future history screen.
- Added central DTO-to-row mapping, date formatting, confirmed `ms`/`MB` unit formatters, verdict translation and tones, pagination metadata, refresh behavior, and MSW fixtures/tests.
- Added only user dashboard composition; no contest list, contest filtering UI, history route, interactive pagination, admin behavior, or backend code was changed.

## Backend contract reinspection

Local backend was available at `../UPDSjudge` and inspected read-only:

- `EnviosController.ListarMisEnvios` projects `idEnvio`, `concursoCodigo`, `problemaTitulo`, `inciso`, `lenguaje`, `veredicto`, `consumoTiempo`, `consumoMemoria`, and `fechaEnvio`.
- It does **not** project a file field, so no Archivo column was implemented.
- `Envio.tiempo` is non-nullable `float`; `Envio.memoria` is non-nullable `int`.
- `Crear` initializes backend verdict `Pendiente`, so it is deliberately represented as `EVALUANDO` with an info tone.

## Validation evidence

- Focused feature tests: 5/5 passed.
- Full frontend tests: 16 files / 77 tests passed.
- Typecheck, format check, lint, and production build passed.
- Lint has two pre-existing warnings in `src/routes/router.tsx` and `src/components/navigation/AdminSidebar.tsx`.
- Vite successfully started on alternate port `http://127.0.0.1:8086/`; the timeout wrapper ended the validation process with expected exit code 124 after startup.
- `git diff --check` passed and `git diff --cached --name-only` was empty.

## Remaining manual validation

Authenticated live-backend, visual responsive, and keyboard checks require a running authenticated environment and were not simulated with credentials. The implementation is covered by MSW and source-contract inspection.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "User-only stats and recent-submissions dashboard integration was added without a contest list, contest filters, history route, admin implementation, or backend changes. Git staged-file list is empty."
    }
  ],
  "changedFiles": [
    "frontend/src/features/contests/user/types.ts",
    "frontend/src/features/contests/user/mapper.ts",
    "frontend/src/features/contests/user/service.ts",
    "frontend/src/features/contests/user/hooks.ts",
    "frontend/src/features/contests/user/UserContestStatsSection.tsx",
    "frontend/src/features/contests/user/RecentSubmissionsTable.tsx",
    "frontend/src/features/contests/user/RecentSubmissionsSection.tsx",
    "frontend/src/features/contests/user/user-dashboard.test.tsx",
    "frontend/src/features/auth/Pages/UserLandingPage.tsx",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/src/routes/router.test.tsx",
    "docs/historias/UJ-11-lista-concursos-filtrados.md",
    "docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/user/user-dashboard.test.tsx",
    "frontend/src/routes/router.test.tsx"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run test:run -- src/features/contests/user/user-dashboard.test.tsx",
      "result": "passed",
      "summary": "5 focused tests passed"
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "passed",
      "summary": "Prettier check passed"
    },
    {
      "command": "cd frontend && npm run typecheck && npm run lint",
      "result": "passed",
      "summary": "Typecheck passed; lint passed with two existing warnings"
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "16 test files and 77 tests passed"
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "Production build passed; existing bundle-size warning remains"
    },
    {
      "command": "cd frontend && timeout 10s npm run dev -- --port 8086 --host 127.0.0.1",
      "result": "passed",
      "summary": "Vite was ready at http://127.0.0.1:8086 before expected timeout exit 124"
    },
    {
      "command": "git diff --check && git status --short && git diff --cached --name-only",
      "result": "passed",
      "summary": "No whitespace errors and no staged files"
    }
  ],
  "validationOutput": [
    "Focused feature tests: 5/5 passed.",
    "Full suite: 16 files / 77 tests passed.",
    "Alternative port startup succeeded on 8086.",
    "No staged files."
  ],
  "residualRisks": [
    "Authenticated live-backend validation and manual responsive/keyboard checks remain pending.",
    "Existing lint warnings and existing Vite bundle-size warning remain outside this change."
  ],
  "noStagedFiles": true,
  "diffSummary": "Adds a bounded user dashboard stats/recent-submissions integration with contracts, mapping, MSW, tests, and UJ-11 documentation; omits contest-list scope.",
  "reviewFindings": [
    "no blockers",
    "Verify the backend remains aligned with the inspected projection: no file field and Pendiente verdict are assumed intentionally."
  ],
  "manualNotes": "The reference image's Archivo column and decorative filter action were intentionally omitted because the current backend contract provides no file field and no functional filter UI was implemented."
}
```
