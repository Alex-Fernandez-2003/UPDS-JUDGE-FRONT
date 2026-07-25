status: partial
summary: Implemented the UJ-12 enrollment flow and contest-list access policy, connected permitted cards to the canonical submissions route, added policy tests and an MSW join handler, and removed UserLayout's global main-width constraint. The requested UJ-13/detail composition and read-only/blocked submission rendering remain unavailable because `frontend/src/features/problems` and a verified detail contract are absent.
files_changed:

- frontend/src/features/contests/user/access-policy.ts: central access action and detail-mode derivation
- frontend/src/features/contests/user/access-policy.test.ts: covers eight access cases, normalization, and modes
- frontend/src/features/contests/user/components/JoinContestModal.tsx: accessible public/private enrollment modal
- frontend/src/features/contests/user/components/ContestCard.tsx: policy-driven enrollment/access actions
- frontend/src/features/contests/user/hooks.ts: TanStack mutation with narrow contest-list invalidation
- frontend/src/features/contests/user/service.ts: centralized join service
- frontend/src/features/contests/user/types.ts: join DTOs
- frontend/src/lib/api/endpoints.ts: join endpoint constant
- frontend/src/mocks/handlers/index.ts: join endpoint mock
- frontend/src/routes/constants.ts and frontend/src/routes/router.tsx: canonical submissions route
- frontend/src/layouts/UserLayout/index.tsx: full-width main container
- docs/historias/UJ-12-inscripcion-concurso-privado.md: new UJ-12 documentation
- docs/historias/UJ-11-lista-concursos-filtrados.md, docs/historias/UJ-13-Lista de incisos y acceso al PDF del set de problemas.md, docs/historias/UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md: integration state and blockers
- docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/tasks.md: implementation status

tdd_evidence:

- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: focused policy test passed with public/private, enrolled, active, finished, normalized, and unknown-state coverage
validation:
- cd frontend && npm run test:run -- src/features/contests/user/access-policy.test.ts: passed (1 file, 10 tests)
- cd frontend && npm run typecheck: passed
- cd frontend && npm run lint: passed with 3 existing Fast Refresh warnings
- cd frontend && npm run test:run: passed (18 files, 94 tests)
- cd frontend && npm run format:check: failed because 72 pre-existing files outside the scoped edits are not formatted
- git diff --check: passed after the scoped documentation formatter run
risks:
- UJ-13 feature files and its verified dashboard/detail endpoint are absent; no safe composition or PDF integration was created.
- SubmissionsPage still has no verified contest-detail data, so read-only and blocked rendering are not applied there.
- The scoped Prettier repair of the UJ-13 Markdown trailing whitespace rewrote that document's formatting broadly (474-line diff); review or normalize it before merge.
- Build/dev were not run because they generate output outside the exact writable surfaces.
review_focus:
- frontend/src/features/contests/user/access-policy.ts and ContestCard.tsx: confirm all action/mode semantics against backend state values
- frontend/src/features/contests/user/components/JoinContestModal.tsx: verify focus-return and backend error semantics manually
- frontend/src/routes/router.tsx: verify canonical route expectations and whether a parameter-preserving legacy redirect is required
- docs/historias/UJ-13-Lista de incisos y acceso al PDF del set de problemas.md: inspect broad formatting diff
skill_resolution: none

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "UJ-12 and policy/routing/layout work are implemented, but the requested UJ-13 composition and detail read-only/blocked behavior cannot be completed without the absent feature and verified detail contract."
    }
  ],
  "changedFiles": [
    "frontend/src/components/common/index.tsx",
    "frontend/src/features/contests/user/access-policy.ts",
    "frontend/src/features/contests/user/access-policy.test.ts",
    "frontend/src/features/contests/user/components/ContestCard.tsx",
    "frontend/src/features/contests/user/components/JoinContestModal.tsx",
    "frontend/src/features/contests/user/components/UserContestsGrid.tsx",
    "frontend/src/features/contests/user/hooks.ts",
    "frontend/src/features/contests/user/pages/UserContestsPage.tsx",
    "frontend/src/features/contests/user/service.ts",
    "frontend/src/features/contests/user/types.ts",
    "frontend/src/features/submissions/Pages/SubmissionsPage.tsx",
    "frontend/src/layouts/UserLayout/index.tsx",
    "frontend/src/lib/api/endpoints.ts",
    "frontend/src/mocks/handlers/index.ts",
    "frontend/src/routes/constants.ts",
    "frontend/src/routes/router.tsx",
    "docs/historias/UJ-11-lista-concursos-filtrados.md",
    "docs/historias/UJ-12-inscripcion-concurso-privado.md",
    "docs/historias/UJ-13-Lista de incisos y acceso al PDF del set de problemas.md",
    "docs/historias/UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md",
    "docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/user/access-policy.test.ts",
    "frontend/src/mocks/handlers/index.ts"
  ],
  "commandsRun": [
    {"command":"cd frontend && npm run test:run -- src/features/contests/user/access-policy.test.ts","result":"passed","summary":"10 focused policy tests passed"},
    {"command":"cd frontend && npm run typecheck","result":"passed","summary":"TypeScript build check passed"},
    {"command":"cd frontend && npm run lint","result":"passed","summary":"Passed with 3 existing Fast Refresh warnings"},
    {"command":"cd frontend && npm run test:run","result":"passed","summary":"18 files and 94 tests passed"},
    {"command":"cd frontend && npm run format:check","result":"failed","summary":"72 out-of-scope pre-existing formatting warnings"},
    {"command":"git diff --check","result":"passed","summary":"No whitespace errors"}
  ],
  "validationOutput": [
    "Focused policy tests: 10 passed.",
    "Full suite: 94 passed.",
    "Typecheck passed.",
    "No staged files reported by git diff --cached --name-only."
  ],
  "residualRisks": [
    "UJ-13 source implementation and detail endpoint are absent.",
    "Read-only and blocked detail composition remains incomplete.",
    "UJ-13 documentation has a broad formatting-only diff from scoped Prettier repair."
  ],
  "noStagedFiles": true,
  "diffSummary": "Adds policy-driven UJ-12 enrollment, focused tests/mocks, canonical submissions routing, and layout/documentation updates; UJ-13 doc formatting is broader than intended.",
  "reviewFindings": [
    "blocker: UJ-13 implementation is absent from frontend/src/features/problems, preventing safe detail composition.",
    "review: inspect broad UJ-13 Markdown formatting diff before merge."
  ],
  "manualNotes": "Build and dev were not run because they generate output outside the exact writable surfaces."
}
```
