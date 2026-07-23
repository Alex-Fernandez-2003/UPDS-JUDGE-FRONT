# Sprint 1 retrospective boundaries implementation

Implemented the scoped shared-component contract updates, moved the administrative contests feature to `features/contests/admin`, updated router imports, and moved/reworked the App Shell document into the Sprint 1 Starfish retrospective.

## Validation summary

- `typecheck`, tests (15 files / 72 tests), lint (warnings only), build, and `git diff --check` passed.
- `format:check` remains blocked by the pre-existing `frontend/pnpm-lock.yaml` formatting issue; it was already failing at baseline and was not edited.
- `dev` could not start because port 8085 was already in use.
- No staged files were present.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Implementation and focused regression checks pass, but required format:check remains blocked by the pre-existing pnpm-lock.yaml formatting issue and dev cannot bind its configured port 8085."
    }
  ],
  "changedFiles": [
    "frontend/src/components/common/index.tsx",
    "frontend/src/components/components.test.tsx",
    "frontend/src/components/forms/index.tsx",
    "frontend/src/components/illustrations/GlobeIllustration.tsx",
    "frontend/src/components/navigation/AdminSidebar.tsx",
    "frontend/src/components/navigation/UserMenu.tsx",
    "frontend/src/components/navigation/index.tsx",
    "frontend/src/components/tables/index.tsx",
    "frontend/src/features/contests/admin/** (moved from frontend/src/features/contests)",
    "frontend/src/routes/router.tsx",
    "docs/retrospectivas/retrospectiva-sprint-1.md (moved from docs/historias/app-shell-sidebar-layouts-routing-por-roles.md)"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/components/components.test.tsx"
  ],
  "commandsRun": [
    {
      "command": "cd frontend && npm run format:check",
      "result": "failed",
      "summary": "Only pnpm-lock.yaml failed formatting; it was present before implementation and remained untouched."
    },
    {
      "command": "cd frontend && npm run lint",
      "result": "passed",
      "summary": "Completed with two pre-existing Fast Refresh warnings."
    },
    {
      "command": "cd frontend && npm run typecheck",
      "result": "passed",
      "summary": "TypeScript build completed."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "15 test files and 72 tests passed."
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "Production build completed; Vite reported a non-blocking large-chunk warning."
    },
    {
      "command": "cd frontend && npm run dev -- --host 127.0.0.1",
      "result": "failed",
      "summary": "Vite could not start because port 8085 was already in use."
    },
    {
      "command": "git diff --check",
      "result": "passed",
      "summary": "No whitespace errors."
    }
  ],
  "validationOutput": [
    "Shared-component className contract tests pass.",
    "Administrative contests imports resolve from features/contests/admin.",
    "No staged files: git diff --cached --name-only produced no paths."
  ],
  "residualRisks": [
    "frontend/pnpm-lock.yaml prevents repository-wide format:check and was not in the allowed edit surface.",
    "Dev-server startup was not verified because an existing process occupies port 8085.",
    "Historical references to the moved document remain in prior OpenSpec artifacts, which are outside the allowed edit surface.",
    "frontend/src/features/contests/.gitkeep remains because deletion is disallowed by the runtime safety contract."
  ],
  "noStagedFiles": true,
  "diffSummary": "Added root className merging and native-prop support to applicable public visual components; moved exclusive contest administration code under admin; updated routing; replaced the historical App Shell document with a Starfish Sprint 1 retrospective.",
  "reviewFindings": [
    "no blockers in typecheck, tests, build, or diff check",
    "review the remaining contests root .gitkeep and historical OpenSpec references if scope is expanded"
  ],
  "manualNotes": "The requested full validation cannot be declared clean because format:check and dev are blocked by pre-existing/environment conditions."
}
```
