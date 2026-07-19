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

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Fixed medium-severity direct environment access in frontend/src/main.tsx and frontend/src/routes/router.tsx by centralizing it in frontend/src/config/env.ts; added concrete behavior tests in the listed test files."
    }
  ],
  "changedFiles": [
    "frontend/src/config/env.ts",
    "frontend/src/main.tsx",
    "frontend/src/routes/router.tsx",
    "frontend/src/lib/api/http-client.test.ts",
    "frontend/src/components/components.test.tsx",
    "frontend/src/layouts/layouts.test.tsx",
    "frontend/src/routes/router.test.tsx",
    "docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/lib/api/http-client.test.ts",
    "frontend/src/components/components.test.tsx",
    "frontend/src/layouts/layouts.test.tsx",
    "frontend/src/routes/router.test.tsx"
  ],
  "commandsRun": [
    {
      "command": "npm run test:run",
      "result": "failed",
      "summary": "Run from repository root; package.json is absent there."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "5 test files and 24 tests passed."
    },
    {
      "command": "cd frontend && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build",
      "result": "passed",
      "summary": "Formatting, linting, type checking, tests, and production build passed."
    },
    {
      "command": "git diff --check -- frontend docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md",
      "result": "passed",
      "summary": "No whitespace errors."
    }
  ],
  "validationOutput": [
    "Vitest: 5 passed files, 24 passed tests.",
    "Vite production build completed successfully in 453ms.",
    "Direct import.meta.env.DEV search found only frontend/src/config/env.ts."
  ],
  "residualRisks": [
    "Medium: broad pre-existing worktree changes were preserved and are outside this task's review scope.",
    "Low: OpenAPI/backend-dependent contracts remain unvalidated because no verified external contract was available."
  ],
  "noStagedFiles": true,
  "diffSummary": "Centralized DEV access and added missing Sprint 1 behavior coverage without adding API endpoints or contract data.",
  "reviewFindings": [
    "fixed-medium: frontend/src/main.tsx and frontend/src/routes/router.tsx had direct import.meta.env.DEV reads outside config; both now consume typed isDevelopment.",
    "fixed-medium: frontend/src/lib/api/http-client.test.ts lacked timeout, cancellation, network, non-JSON, all-method, and complete Problem Details coverage.",
    "no blockers found in the scoped remediation after full frontend validation."
  ],
  "manualNotes": "The first test command was intentionally rerun from frontend/ after the repository root correctly reported no package.json. No files were staged, committed, or pushed."
}
```
