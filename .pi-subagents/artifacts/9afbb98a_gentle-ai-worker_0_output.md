status: partial
summary: Implemented separated administrative contest list/summary contracts, plural filter catalogue, coordinated refresh, AppLogo, reusable GlobeIllustration, and the existing Usuario route shell. Validation passes except repository-wide formatting, which has pre-existing unformatted files outside this implementation; asset-component removal was not performed because deletion is prohibited by the execution safety contract.
files_changed:

- frontend/src/features/contests/{types,constants,service,hooks,ContestsAdminScreen}.ts(x): independent typed list and summary contracts, query keys, endpoint calls, filter values, and refresh coordination.
- frontend/src/features/contests/components/{ContestsFiltersBar,ContestsSummaryCards}.tsx: contractual select values and independent summary states.
- frontend/src/lib/api/endpoints.ts: centralized administrative list and summary endpoints.
- frontend/src/mocks/handlers/index.ts: MSW handlers for both contracts.
- frontend/src/components/branding/AppLogo.tsx: real-logo component with future dark variant.
- frontend/src/components/illustrations/GlobeIllustration.tsx: reusable accessible presentation-only illustration.
- frontend/src/components/common/index.tsx: BrandMark delegates to real branding.
- frontend/src/layouts/UserLayout/index.tsx and routing/user landing files: Usuario shell, identity, real navigation, UserMenu, and content.
- frontend/src/features/contests/admin-contracts.test.tsx and existing tests: contract, summary, router, and user-route coverage.
- docs/historias/app-shell-sidebar-layouts-routing-por-roles.md: appended posterior-fix record and pending evidence note.
tdd_evidence:
- RED: not active — strict TDD was not activated.
- GREEN: not active — validation is reported separately.
- TRIANGULATE/REFACTOR: focused and full tests cover list parameters, filter mapping, independent query keys, summary rendering, and Usuario routing.
validation:
- cd frontend && npm run test:run -- src/features/contests/contests.test.tsx src/features/contests/admin-contracts.test.tsx src/routes/router.test.tsx src/layouts/layouts.test.tsx: passed (17 tests).
- cd frontend && npm run lint: passed with two pre-existing Fast Refresh warnings.
- cd frontend && npm run typecheck: passed.
- cd frontend && npm run test:run: passed (15 files, 71 tests).
- cd frontend && npm run build: passed (Vite chunk-size warning only).
- cd frontend && npm run format:check: failed because pnpm-lock.yaml and pre-existing files under src/assets/components are not Prettier-formatted.
risks:
- src/assets/components still contains legacy React components and Demo.tsx. A destructive removal/move was not performed under the child execution safety contract; GlobeIllustration is the new reusable implementation but the asset-organization requirement is not fully closed.
- frontend/public/favicon.svg was already modified before this task and was preserved.
- No backend directory was available locally for direct controller/DTO comparison.
review_focus:
- Verify ContestsAdminScreen refresh semantics and summary/list independent failure presentation.
- Verify AppLogo surfaces and UserLayout navigation/menu behavior manually in a browser.
- Decide the approved removal/move treatment for legacy src/assets/components React files.
skill_resolution: none