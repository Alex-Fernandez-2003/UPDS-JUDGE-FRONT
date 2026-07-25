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