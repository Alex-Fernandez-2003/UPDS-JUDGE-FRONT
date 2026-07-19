status: completed
summary: Centralized development-mode access in typed config and closed the verified Sprint 1 coverage gaps for HTTP behavior, components, layouts, routing, and default mock configuration.
files_changed:

- frontend/src/config/env.ts: Added typed `isDevelopment` as the sole direct `import.meta.env.DEV` access.
- frontend/src/main.tsx: Uses `isDevelopment` to gate MSW startup.
- frontend/src/routes/router.tsx: Uses `isDevelopment` and exports a testable router factory.
- frontend/src/lib/api/http-client.test.ts: Covers all methods, timeout, cancellation, network, text, Problem Details, and validation errors.
- frontend/src/components/components.test.tsx: Adds Badge, FileDropzone, and table rendered-state coverage.
- frontend/src/layouts/layouts.test.tsx: Adds AuthLayout and AdminLayout coverage.
- frontend/src/routes/router.test.tsx: Adds 404 and development/production `/dev/ui` behavior coverage.
- docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md: Records truthful remediation status and validation evidence.
tdd_evidence:
- RED: not active — strict TDD was not activated.
- GREEN: not active — validation is reported separately.
- TRIANGULATE/REFACTOR: Full suite passed after attaching rejection expectations before timer/abort progression, eliminating the initial Vitest unhandled-rejection failure.
validation:
- `npm run test:run` (repository root): failed — no root package.json exists; rerun from required `frontend/` directory.
- `cd frontend && npm run test:run`: passed — 5 files, 24 tests.
- `cd frontend && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build`: passed — format, lint, types, 5 test files/24 tests, and production build all succeeded.
- `git diff --check -- frontend docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md`: passed — no whitespace errors.
- `grep import.meta.env.DEV frontend/src`: passed — only `frontend/src/config/env.ts` contains a direct read.
risks:
- Medium: the worktree had broad pre-existing tracked and untracked Sprint 1 changes; this task preserved them and did not independently validate unavailable backend/OpenAPI-dependent contracts.
- Low: production builds retain a lazy DevUi chunk because Vite discovers the dynamic import, but the production router test proves `/dev/ui` is not registered or reachable.
review_focus:
- frontend/src/routes/router.tsx: verify route factory keeps production `/dev/ui` unavailable while retaining the existing browser-router export.
- frontend/src/lib/api/http-client.test.ts: verify timeout and caller-abort assertions cover distinct error kinds.
- frontend/src/components/components.test.tsx and frontend/src/layouts/layouts.test.tsx: verify behavioral and accessibility assertions remain meaningful.
skill_resolution: paths-injected