# Contest feature finalization

Implemented the scoped UJ-08/UJ-09 contest ZIP-import frontend completion.

- Added Zod form validation, indexed multipart mapping, React Hook Form dynamic problem editor, responsive one-page creation UI, safe summary, mutation feedback, and cancellation navigation.
- Kept the request on the shared `HttpClient`, centralized `Concursos/crear` endpoint, neutral default `AuthTransport`, and one shared future auth-transport configuration point. The feature never reads or receives a token.
- Registered the existing route constant as an `AdminLayout` child without changing the layout.
- Added MSW success/400/401 controlled bodies and contest-focused schema, letters, mapper, service, mutation, page, route, and handler coverage.
- Updated only actual task status; visual/authenticated-backend evidence remains pending.

The exact development command was attempted, but an existing process already owned `127.0.0.1:8085` (PID 25004). I did not terminate another process. Both required routes returned HTTP 200 from that pre-existing server, so an owned-server smoke run and stop could not be completed.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "The completed implementation is confined to the approved contest feature, API endpoint/client, router, MSW handlers, contest/routing tests, and the permitted OpenSpec tasks file. No generated types, backend, auth feature, layout, sidebar, topbar, or protected documentation was changed."
    }
  ],
  "changedFiles": [
    "frontend/src/features/contests/ContestProblemList.tsx",
    "frontend/src/features/contests/CreateContestPage.tsx",
    "frontend/src/features/contests/CreateContestSummary.tsx",
    "frontend/src/features/contests/mapper.ts",
    "frontend/src/features/contests/schema.ts",
    "frontend/src/features/contests/service.ts",
    "frontend/src/features/contests/types.ts",
    "frontend/src/features/contests/use-create-contest.ts",
    "frontend/src/features/contests/CreateContestPage.test.tsx",
    "frontend/src/features/contests/mapper.test.ts",
    "frontend/src/features/contests/schema.test.ts",
    "frontend/src/features/contests/service.test.ts",
    "frontend/src/features/contests/use-create-contest.test.tsx",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/lib/api/http-client.ts",
    "frontend/src/routes/router.tsx",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/src/mocks/handlers/handlers.test.ts",
    "docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/schema.test.ts",
    "frontend/src/features/contests/mapper.test.ts",
    "frontend/src/features/contests/service.test.ts",
    "frontend/src/features/contests/use-create-contest.test.tsx",
    "frontend/src/features/contests/CreateContestPage.test.tsx",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/mocks/handlers/handlers.test.ts"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run format:check",
      "result": "passed",
      "summary": "Prettier reported all matched files correctly formatted."
    },
    {
      "command": "cd frontend && npm run lint",
      "result": "passed",
      "summary": "oxlint completed without findings."
    },
    {
      "command": "cd frontend && npm run typecheck",
      "result": "passed",
      "summary": "tsc -b completed successfully."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "Vitest passed 11 files and 41 tests."
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "Production TypeScript and Vite build completed successfully."
    },
    {
      "command": "cd frontend && npm run dev -- --host 127.0.0.1",
      "result": "failed",
      "summary": "Vite could not start because pre-existing PID 25004 already occupied 127.0.0.1:8085."
    },
    {
      "command": "curl.exe http://127.0.0.1:8085/admin/contests/new and /dev/ui",
      "result": "passed",
      "summary": "Both routes returned HTTP 200 from the pre-existing 8085 server."
    }
  ],
  "validationOutput": [
    "git diff --check passed.",
    "The final test suite passed with 41 tests.",
    "The production build transformed 2117 modules successfully.",
    "No staged files were reported by git diff --cached --name-only."
  ],
  "residualRisks": [
    "An owned development-server smoke test and stop could not run because 8085 was already occupied; the existing process was intentionally left untouched.",
    "Authenticated live-backend multipart verification and visual capture evidence remain manual/external pending tasks."
  ],
  "noStagedFiles": true,
  "diffSummary": "Completes the scoped contest creation UI, validation, multipart submission, mutation feedback, routing, MSW scenarios, and focused tests without widening into protected areas.",
  "reviewFindings": [
    "no blockers: format, lint, typecheck, test, and production build all pass.",
    "manual follow-up: validate the real authenticated backend flow and collect requested visual evidence when an owned port-8085 dev server is available."
  ],
  "manualNotes": "No OpenSpec CLI, generated API type changes, commit, or push was performed."
}
```
