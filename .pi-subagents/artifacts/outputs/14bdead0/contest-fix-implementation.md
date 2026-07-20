# Contest fix implementation

Implemented `fix-create-contest-password-zip-and-form-ux` within the contest feature only.

- Added feature-local constants/default factories and a controlled `ContestZipField`.
- Normalized tolerated missing/null/whitespace passwords to `''`; multipart always appends the normalized string.
- Enforced inclusive 100 MiB ZIP validation in schema, selector, and submit defense.
- Added ZIP selection/replacement/removal/input-reset/drop/keyboard behavior and local interaction styles.
- Replaced single-problem text action with accessible Plus `IconButton`; added atomic validated inline bulk add.
- Redesigned the safe summary and added reactive ZIP warning.
- Updated feature tests and OpenSpec task status. No shared components, API, routing, auth, backend, layout, listing, or original OpenSpec change were modified.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Production edits are restricted to frontend/src/features/contests/**, with the requested OpenSpec tasks status updated. git diff --check passed; git diff --cached --name-only was empty."
    }
  ],
  "changedFiles": [
    "frontend/src/features/contests/constants.ts",
    "frontend/src/features/contests/ContestZipField.tsx",
    "frontend/src/features/contests/ContestProblemList.tsx",
    "frontend/src/features/contests/CreateContestPage.tsx",
    "frontend/src/features/contests/CreateContestSummary.tsx",
    "frontend/src/features/contests/schema.ts",
    "frontend/src/features/contests/mapper.ts",
    "frontend/src/features/contests/ContestZipField.test.tsx",
    "frontend/src/features/contests/CreateContestPage.test.tsx",
    "frontend/src/features/contests/schema.test.ts",
    "frontend/src/features/contests/mapper.test.ts",
    "docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/tasks.md"
  ],
  "testsAddedOrUpdated": [
    "frontend/src/features/contests/ContestZipField.test.tsx",
    "frontend/src/features/contests/CreateContestPage.test.tsx",
    "frontend/src/features/contests/schema.test.ts",
    "frontend/src/features/contests/mapper.test.ts"
  ],
  "commandsRun": [
    {
      "command": "npm run test:run -- src/features/contests",
      "result": "passed",
      "summary": "6 feature test files, 18 tests passed."
    },
    {
      "command": "npm run format:check",
      "result": "passed",
      "summary": "Prettier check passed."
    },
    {
      "command": "npm run lint",
      "result": "passed",
      "summary": "Oxlint passed without warnings."
    },
    {
      "command": "npm run typecheck",
      "result": "passed",
      "summary": "tsc -b passed."
    },
    {
      "command": "npm run test:run",
      "result": "passed",
      "summary": "12 test files and 50 tests passed."
    },
    {
      "command": "npm run build",
      "result": "passed",
      "summary": "tsc -b and Vite production build passed."
    },
    {
      "command": "./node_modules/.bin/vite --host 127.0.0.1 with curl checks",
      "result": "passed",
      "summary": "/admin/contests/new and /dev/ui each returned HTTP 200; the server was stopped afterward."
    },
    {
      "command": "git diff --check; git diff --cached --name-only",
      "result": "passed",
      "summary": "No whitespace errors and no staged files."
    }
  ],
  "validationOutput": [
    "All requested frontend checks passed.",
    "The 100 MiB boundary, ZIP selector states, password normalization/multipart behavior, summary, warning, and bulk controls are covered by feature tests.",
    "No shared component changes were required; /dev/ui route remained available."
  ],
  "residualRisks": [
    "Live backend/auth integration was unavailable, so backend handling of multipart contrasena='' remains unverified; frontend sends exactly ''.",
    "The supplied visual reference image was unavailable; implementation follows only the explicit OpenSpec visual hierarchy."
  ],
  "noStagedFiles": true,
  "diffSummary": "Feature-local contest form UX fix: controlled ZIP field and validation, password normalization, atomic problem bulk add, safe summary/warning, and regression tests.",
  "reviewFindings": [
    "no blockers"
  ],
  "manualNotes": "Existing untracked .pi-subagents artifacts and the pre-existing untracked OpenSpec change directory remain in the working tree. No commit or push was performed."
}
```
