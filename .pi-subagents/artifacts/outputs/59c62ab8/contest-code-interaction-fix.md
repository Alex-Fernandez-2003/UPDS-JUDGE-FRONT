Implemented the incremental contest-code and interaction rules for the existing create-contest fix.

Changed files:

- `frontend/src/features/contests/constants.ts`
- `frontend/src/features/contests/schema.ts`
- `frontend/src/features/contests/mapper.ts`
- `frontend/src/features/contests/CreateContestPage.tsx`
- `frontend/src/features/contests/ContestProblemList.tsx`
- `frontend/src/features/contests/ContestZipField.tsx`
- `frontend/src/features/contests/CreateContestPage.test.tsx`
- `frontend/src/features/contests/schema.test.ts`
- `frontend/src/features/contests/mapper.test.ts`
- `frontend/src/components/common/index.tsx`
- `frontend/src/components/components.test.tsx`
- `frontend/src/dev/ui/DevUi.tsx`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/design.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/spec.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/tasks.md`

Validation:

- `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build` passed from `frontend/`.
- `npm run dev -- --host 127.0.0.1` started Vite at `http://127.0.0.1:8085/`; an HTTP 200 was confirmed, then the development process was stopped.
- No staged files were present.

Open risks/questions:

- Contest-code syntax is now a normalized lower-case alphanumeric slug with single hyphen separators, as documented. Backend acceptance of this stricter frontend format remains an integration concern.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Contest-only code validation, a central 12-problem cap, local destructive-action treatment, and the confirmed shared Button/IconButton defect repair were implemented within the permitted paths."
    }
  ],
  "changedFiles": [
    "frontend/src/features/contests/constants.ts",
    "frontend/src/features/contests/schema.ts",
    "frontend/src/features/contests/mapper.ts",
    "frontend/src/features/contests/CreateContestPage.tsx",
    "frontend/src/features/contests/ContestProblemList.tsx",
    "frontend/src/features/contests/ContestZipField.tsx",
    "frontend/src/features/contests/CreateContestPage.test.tsx",
    "frontend/src/features/contests/schema.test.ts",
    "frontend/src/features/contests/mapper.test.ts",
    "frontend/src/components/common/index.tsx",
    "frontend/src/components/components.test.tsx",
    "frontend/src/dev/ui/DevUi.tsx",
    "docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/design.md",
    "docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/spec.md",
    "docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/CreateContestPage.test.tsx",
    "frontend/src/features/contests/schema.test.ts",
    "frontend/src/features/contests/mapper.test.ts",
    "frontend/src/components/components.test.tsx"
  ],
  "commandsRun": [
    {
      "command": "npm run test:run",
      "result": "failed",
      "summary": "Initially invoked from the repository root, which has no package.json; rerun from frontend/ passed."
    },
    {
      "command": "cd frontend && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build",
      "result": "passed",
      "summary": "Formatting, lint, TypeScript, 55 Vitest tests, and production build passed."
    },
    {
      "command": "cd frontend && npm run dev -- --host 127.0.0.1",
      "result": "passed",
      "summary": "Vite started successfully at http://127.0.0.1:8085/ and returned HTTP 200; it was then stopped."
    }
  ],
  "validationOutput": [
    "12 test files and 55 tests passed.",
    "Vite production build completed successfully.",
    "Development server startup and HTTP 200 were verified."
  ],
  "residualRisks": [
    "Backend compatibility with the new lower-case slug validation remains to be verified in an authenticated integration environment."
  ],
  "noStagedFiles": true,
  "diffSummary": "Centralized normalized contest-code grammar and UI guidance, reduced the central contest problem maximum to 12, strengthened button defaults and states, added destructive-action styling, and updated focused coverage and OpenSpec artifacts.",
  "reviewFindings": [
    "no blockers"
  ],
  "manualNotes": "The dev command was intentionally terminated after confirming startup and HTTP 200; no commit or push was performed."
}
```
