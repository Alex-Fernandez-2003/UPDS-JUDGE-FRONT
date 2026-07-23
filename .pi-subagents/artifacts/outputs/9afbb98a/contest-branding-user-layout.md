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

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Core requested frontend behavior is implemented and all tests/typecheck/build pass, but legacy React files remain under src/assets/components because destructive removal/move was not permitted by this execution contract."
    }
  ],
  "changedFiles": [
    "docs/historias/app-shell-sidebar-layouts-routing-por-roles.md",
    "frontend/src/components/branding/AppLogo.tsx",
    "frontend/src/components/common/index.tsx",
    "frontend/src/components/illustrations/GlobeIllustration.tsx",
    "frontend/src/features/auth/Pages/UserLandingPage.tsx",
    "frontend/src/features/contests/ContestsAdminScreen.tsx",
    "frontend/src/features/contests/admin-contracts.test.tsx",
    "frontend/src/features/contests/components/ContestsFiltersBar.tsx",
    "frontend/src/features/contests/components/ContestsSummaryCards.tsx",
    "frontend/src/features/contests/constants.ts",
    "frontend/src/features/contests/contests.test.tsx",
    "frontend/src/features/contests/hooks.ts",
    "frontend/src/features/contests/service.ts",
    "frontend/src/features/contests/types.ts",
    "frontend/src/layouts/UserLayout/index.tsx",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/lib/api/http-client.ts",
    "frontend/src/lib/auth/identity.test.ts",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/src/routes/router.test.tsx",
    "frontend/src/routes/router.tsx"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/admin-contracts.test.tsx",
    "frontend/src/features/contests/contests.test.tsx",
    "frontend/src/lib/auth/identity.test.ts",
    "frontend/src/routes/router.test.tsx"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run typecheck",
      "result": "passed",
      "summary": "TypeScript project build passed after the focused transport typing repair."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "15 files and 71 tests passed."
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "Production build passed; Vite reported only a chunk-size warning."
    },
    {
      "command": "cd frontend && npm run lint",
      "result": "passed",
      "summary": "Lint completed with two existing Fast Refresh warnings."
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "failed",
      "summary": "Pre-existing pnpm-lock.yaml and legacy assets/components files are not formatted."
    }
  ],
  "validationOutput": [
    "Focused suite: 17 tests passed.",
    "Full suite: 71 tests passed.",
    "Typecheck and build passed."
  ],
  "residualRisks": [
    "Legacy React component files remain under frontend/src/assets/components.",
    "Repository-wide format check still fails on pre-existing files outside the implementation."
  ],
  "noStagedFiles": true,
  "diffSummary": "Added independent contest summary/listing contracts and queries, real reusable branding, a presentation-only globe, and the existing Usuario layout shell with tests and documentation.",
  "reviewFindings": [
    "no blockers in tested behavior",
    "follow-up: remove or relocate legacy React files in src/assets/components under an approved deletion/move workflow"
  ],
  "manualNotes": "The working tree contained pre-existing modifications and untracked assets/OpenSpec artifacts; they were preserved. No memory entry was saved because the parent did not provide a validated project name."
}
```
