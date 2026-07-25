status: partial
summary: Resumed the existing user-contest-flow implementation and hardened the centralized access policy so an unrecognized modality is blocked rather than treated as public. Added focused service coverage for the centralized UJ-12 enrollment request. Existing working-tree implementation supplies the join modal, mutation, routes, layout adjustment, MSW handler, and historical documentation.
files_changed:

- frontend/src/features/contests/user/access-policy.ts: block unknown contest modalities safely.
- frontend/src/features/contests/user/access-policy.test.ts: cover unknown-modality fallback.
- frontend/src/features/contests/user/service.test.ts: verify enrollment uses HttpClient and centralized endpoint.
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: focused policy and enrollment-service tests passed (11 tests).
validation:
- cd frontend && npm run test:run -- src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts: passed (2 files, 11 tests).
- cd frontend && npx prettier --check src/features/contests/user/access-policy.ts src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts: initially failed for access-policy.ts; corrected with the authorized scoped Prettier write.
- cd frontend && npx prettier --write src/features/contests/user/access-policy.ts src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts: passed.
- cd frontend && npm run lint: passed with 3 existing Fast Refresh warnings.
- cd frontend && npm run typecheck: passed.
- cd frontend && npm run test:run: passed (19 files, 95 tests).
- cd frontend && npm run format:check: failed on 72 pre-existing files outside this scoped continuation; scoped changed files pass Prettier.
- cd frontend && npm run build: passed; Vite emitted an existing >500 kB chunk-size warning.
- git diff --check: passed.
- git diff --cached --name-only: passed; no output (no staged files).
risks:
- The required unified UJ-13/detail composition cannot be safely implemented: frontend/src/features/problems contains only .gitkeep, while the documented detail/dashboard endpoint and components are absent.
- Direct submissions route currently lacks a verified contest-detail query; it cannot centrally enforce participation/read-only/blocked modes without inventing an API contract.
- Full repository format check remains red due to 72 unrelated pre-existing formatting violations.
- Manual authenticated backend, responsive, keyboard, and real-error validation remain pending.
review_focus:
- frontend/src/features/contests/user/access-policy.ts: confirm unknown server-provided modalities remain fail-closed.
- frontend/src/features/contests/user/service.test.ts: confirm enrollment stays on the shared HttpClient and endpoint registry.
- Existing UJ-12 integration files: review mutation invalidation, modal password lifecycle, and canonical submissions route.
skill_resolution: none

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "UJ-12 routing/enrollment continuation is implemented and validated, but the requested UJ-13 unified detail composition cannot be completed without the absent features/problems implementation and its verified backend detail contract. No scope widening or fabricated replacement was made."
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
    "frontend/src/features/contests/user/service.test.ts",
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
    "docs/historias/UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/user/access-policy.test.ts",
    "frontend/src/features/contests/user/service.test.ts"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run test:run -- src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts",
      "result": "passed",
      "summary": "2 files, 11 tests passed"
    },
    {
      "command": "cd frontend && npx prettier --check src/features/contests/user/access-policy.ts src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts",
      "result": "failed",
      "summary": "Detected formatting in access-policy.ts before authorized scoped formatting"
    },
    {
      "command": "cd frontend && npx prettier --write src/features/contests/user/access-policy.ts src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts",
      "result": "passed",
      "summary": "Scoped files formatted"
    },
    {
      "command": "cd frontend && npm run lint",
      "result": "passed",
      "summary": "Passed with 3 existing Fast Refresh warnings"
    },
    {
      "command": "cd frontend && npm run typecheck",
      "result": "passed",
      "summary": "TypeScript build checks passed"
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "19 files, 95 tests passed"
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "failed",
      "summary": "72 unrelated pre-existing files fail repository-wide Prettier check; scoped files pass"
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "Production build passed; Vite reported a chunk-size warning"
    },
    {
      "command": "git diff --check",
      "result": "passed",
      "summary": "No whitespace errors"
    },
    {
      "command": "git diff --cached --name-only",
      "result": "passed",
      "summary": "No staged files"
    }
  ],
  "validationOutput": [
    "Focused and full frontend tests passed.",
    "Lint, typecheck, build, and diff check passed.",
    "Repository-wide formatting remains blocked by unrelated pre-existing files."
  ],
  "residualRisks": [
    "features/problems is absent except for .gitkeep, so UJ-13 composition cannot be implemented without recreating a missing feature.",
    "The documented contest dashboard/detail endpoint is not verified in code; direct submissions access cannot safely derive read-only or blocked mode.",
    "Manual authenticated backend, responsive, and keyboard validation are pending.",
    "Repository-wide Prettier check has 72 unrelated failures."
  ],
  "noStagedFiles": true,
  "diffSummary": "Existing continuation connects UJ-12 enrollment, centralized policy, route/layout updates, mocks, and documentation; this pass adds a fail-closed modality guard and enrollment service test.",
  "reviewFindings": [
    "blocker: frontend/src/features/problems contains no UJ-13 implementation beyond .gitkeep.",
    "blocker: no verified contest-detail query exists to enforce modes on direct submissions-route access.",
    "no staged files."
  ],
  "manualNotes": "No backend or database files were changed. The output reflects the existing dirty working tree plus this scoped continuation."
}
```
