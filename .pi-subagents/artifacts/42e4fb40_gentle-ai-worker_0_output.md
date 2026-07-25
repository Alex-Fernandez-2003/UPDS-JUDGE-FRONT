status: partial
summary: Implemented the UJ-13 problems route, dashboard-backed problems page and tab navigation; standardized table presentation/responsive overflow; switched contest submissions to server-driven 10-row pagination and removed submission statistics.
files_changed:

- frontend/src/features/problems/types.ts: dashboard contract types.
- frontend/src/features/problems/service.ts: shared-client dashboard request.
- frontend/src/features/problems/components/ProblemsTable.tsx: responsive problems table.
- frontend/src/features/problems/pages/ContestProblemsPage.tsx: protected route content, PDF action, and tabs.
- frontend/src/routes/constants.ts: problems route builder.
- frontend/src/routes/router.tsx: guarded problems route.
- frontend/src/features/submissions/Pages/SubmissionsPage.tsx: real page size, responsive layout, problems tab, no stats.
- frontend/src/features/submissions/components/submissionsTable.tsx: mobile table overflow/layout.
- frontend/src/features/contests/user/RecentSubmissionsTable.tsx: table visual alignment.
- frontend/src/components/common/index.tsx: icon support for LinkButton.
- frontend/src/lib/api/endpoints.ts: centralized dashboard endpoint.
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: full pre-existing test suite passed after changes.
validation:
- cd frontend && npm run lint: passed with 3 existing Fast Refresh warnings.
- cd frontend && npm run test:run: passed (19 files, 95 tests).
- cd frontend && npm run typecheck: passed.
- cd frontend && npm run build: passed; existing chunk-size warning only.
- cd frontend && timeout 10s npm run dev -- --port 4175: Vite started successfully at <http://localhost:4175>; timeout stopped it intentionally.
- git diff --check: passed.
- git diff --cached --name-only: passed with no output (no staged files).
risks:
- No tests were added for the newly created UJ-13 page or service.
- The submissions form still uses its pre-existing generated problem options rather than the dashboard problem list.
- Manual authenticated backend/browser validation was not performed.
review_focus:
- frontend/src/features/problems/pages/ContestProblemsPage.tsx: verify real backend dashboard data and PDF access under an authenticated user.
- frontend/src/features/submissions/Pages/SubmissionsPage.tsx: verify pagination/filter behavior against real Envios metadata.
- frontend/src/routes/router.tsx: verify problem-route guard behavior.
skill_resolution: none