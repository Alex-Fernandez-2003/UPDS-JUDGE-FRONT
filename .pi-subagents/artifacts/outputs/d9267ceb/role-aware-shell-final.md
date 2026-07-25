status: partial
summary: Implemented the role-aware administrative shell, central JWT identity helpers, role guards, login redirects, sidebar search/navigation, shared logout menu, tests, and required transversal documentation. Student layout/routing remains intentionally deferred because no student route exists in the inspected router; no route was invented.
files_changed:

- frontend/src/lib/auth/identity.ts: JWT decoding, identity derivation, role normalization/catalog/helpers.
- frontend/src/lib/auth/session.ts: initial-route policy and local session clearing.
- frontend/src/lib/auth/index.ts: exports new auth helpers.
- frontend/src/routes/RoleRoute.tsx: visual role guard.
- frontend/src/routes/router.tsx: applies role guards and forbidden fallback.
- frontend/src/features/auth/Pages/LoginPage.tsx: redirect uses the central route policy with replace.
- frontend/src/components/navigation/AdminSidebar.tsx: declarative, filtered searchable admin navigation.
- frontend/src/components/navigation/UserMenu.tsx: shared accessible logout menu.
- frontend/src/layouts/AdminLayout/index.tsx: responsive admin shell and derived user identity.
- frontend/src/lib/auth/identity.test.ts: JWT and route-policy tests.
- frontend/src/routes/router.test.tsx: role-aware route fixture.
- frontend/src/layouts/layouts.test.tsx: shell assertions.
- docs/historias/app-shell-sidebar-layouts-routing-por-roles.md: required scope, matrices, security and pending-evidence document.
- docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/tasks.md: resume status.
tdd_evidence:
- RED: not active — strict TDD was not activated.
- GREEN: not active — validation is reported separately.
- TRIANGULATE/REFACTOR: focused JWT, router, and layout tests pass (8 tests).
validation:
- cd frontend && npx vitest run src/lib/auth/identity.test.ts src/routes/router.test.tsx src/layouts/layouts.test.tsx: passed (3 files, 8 tests).
- cd frontend && npm run typecheck: passed.
- cd frontend && npm run lint && npm run typecheck && npm run build: passed with two existing-style Fast Refresh warnings and Vite chunk-size warning.
- cd frontend && npm run format:check: failed only on pre-existing frontend/pnpm-lock.yaml and frontend/src/lib/api/endpoints.ts, both outside the permitted edit surface for this task.
- cd frontend && npm run test:run: failed due to four existing contest/MSW handler mismatches; the role-aware router assertion was corrected and focused tests pass.
- git diff --check: passed.
risks:
- Student layout and regular-user destination cannot be implemented without a real student route in the current router.
- Role names and claims are implementation candidates from the OpenSpec input, not verified against backend contracts because backend inspection is outside authorized scope.
- Mobile focus return and click-outside menu behavior need manual validation.
review_focus:
- frontend/src/lib/auth/identity.ts and session.ts: validate claim keys and regular-user fallback against the real auth contract.
- frontend/src/routes/router.tsx: verify role requirements and forbidden UX.
- frontend/src/layouts/AdminLayout/index.tsx and navigation components: validate responsive interaction manually.
skill_resolution: none

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Administrative role-aware shell is implemented within authorized scope, but the requested student shell cannot be completed because the inspected router has no confirmed student route; full tests and repository-wide format check also remain blocked by unrelated baseline failures."
    }
  ],
  "changedFiles": [
    "frontend/src/lib/auth/identity.ts",
    "frontend/src/lib/auth/session.ts",
    "frontend/src/lib/auth/index.ts",
    "frontend/src/routes/RoleRoute.tsx",
    "frontend/src/routes/router.tsx",
    "frontend/src/features/auth/Pages/LoginPage.tsx",
    "frontend/src/components/navigation/AdminSidebar.tsx",
    "frontend/src/components/navigation/UserMenu.tsx",
    "frontend/src/layouts/AdminLayout/index.tsx",
    "frontend/src/lib/auth/identity.test.ts",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/layouts/layouts.test.tsx",
    "docs/historias/app-shell-sidebar-layouts-routing-por-roles.md",
    "docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/lib/auth/identity.test.ts",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/layouts/layouts.test.tsx"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npx vitest run src/lib/auth/identity.test.ts src/routes/router.test.tsx src/layouts/layouts.test.tsx",
      "result": "passed",
      "summary": "3 files and 8 focused tests passed."
    },
    {
      "command": "cd frontend && npm run lint && npm run typecheck && npm run build",
      "result": "passed",
      "summary": "Completed with non-blocking Fast Refresh and chunk-size warnings."
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "failed",
      "summary": "Only pre-existing pnpm-lock.yaml and src/lib/api/endpoints.ts formatting issues."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "failed",
      "summary": "Four unrelated contest/MSW handler failures; focused role-aware tests pass."
    },
    {
      "command": "git diff --check",
      "result": "passed",
      "summary": "No whitespace errors."
    }
  ],
  "validationOutput": [
    "Typecheck and production build passed.",
    "Focused role-aware tests passed.",
    "No staged files were reported by git diff --cached --name-only."
  ],
  "residualRisks": [
    "No confirmed student route exists, so student shell and regular-user destination are deferred.",
    "Claims and role values require backend-contract confirmation.",
    "Full suite and format check have unrelated baseline failures."
  ],
  "noStagedFiles": true,
  "diffSummary": "Adds central auth identity/routing helpers and a role-aware responsive administrative shell without modifying backend, database, or business pages.",
  "reviewFindings": [
    "no blockers in focused implementation; confirm claims and student routes before accepting the full OpenSpec scope.",
    "lint reports Fast Refresh warnings for exported navigation configuration and in-file Forbidden component."
  ],
  "manualNotes": "The task's required student shell is not safely implementable because no real student route exists in the inspected frontend router."
}
```
