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