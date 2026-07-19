status: completed
summary: Inserted the two requested beginner-friendly frontend tutorials before the PR checklist. They distinguish the real `StatCard` contract from non-implemented didactic examples and document the generated login POST path without implying an active login feature.
files_changed:

- frontend/docs/guia-arquitectura-y-desarrollo.md: Added the component ownership/StatCard/SectionHeader tutorial and the future-only `/api/Auth/login` transport, MSW, mutation, error, testing, and checklist tutorial.
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: Documentation claims, required headings, method names, props, and non-implemented labels were checked with targeted grep.
validation:
- cd frontend && npx prettier --write docs/guia-arquitectura-y-desarrollo.md && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build: passed; Prettier, oxlint, TypeScript, 29 Vitest tests, and Vite production build passed.
- git diff --check && git diff --name-only && git diff --cached --name-only && grep -nE "^## Tutorial práctico: cómo (agregar un componente|consumir un endpoint)$|^## Checklist para un PR de frontend$|StatCard|HttpClient\\.post|endpoints\\.auth\\.login|Ejemplo didáctico" frontend/docs/guia-arquitectura-y-desarrollo.md: passed; no whitespace errors, only the permitted documentation file is tracked as changed, and no staged files were reported.
risks:
- none
review_focus:
- frontend/docs/guia-arquitectura-y-desarrollo.md: Confirm conceptual SectionHeader and login samples remain visibly non-implemented and do not imply session persistence, authentication, or a real token.
skill_resolution: paths-injected

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Only frontend/docs/guia-arquitectura-y-desarrollo.md is a tracked changed file; it contains both required headings immediately before the existing frontend PR checklist and no source, README, task, OpenSpec, or backend changes."
    }
  ],
  "changedFiles": [
    "frontend/docs/guia-arquitectura-y-desarrollo.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "cd frontend && npx prettier --write docs/guia-arquitectura-y-desarrollo.md",
      "result": "passed",
      "summary": "Prettier formatted the permitted documentation file."
    },
    {
      "command": "cd frontend && npm run format:check",
      "result": "passed",
      "summary": "All matched files use Prettier code style."
    },
    {
      "command": "cd frontend && npm run lint",
      "result": "passed",
      "summary": "oxlint completed successfully."
    },
    {
      "command": "cd frontend && npm run typecheck",
      "result": "passed",
      "summary": "tsc -b completed successfully."
    },
    {
      "command": "cd frontend && npm run test:run",
      "result": "passed",
      "summary": "6 test files and 29 tests passed."
    },
    {
      "command": "cd frontend && npm run build",
      "result": "passed",
      "summary": "TypeScript and Vite production build completed successfully."
    },
    {
      "command": "git diff --check && git diff --name-only && git diff --cached --name-only && grep -nE \"^## Tutorial práctico: cómo (agregar un componente|consumir un endpoint)$|^## Checklist para un PR de frontend$|StatCard|HttpClient\\.post|endpoints\\.auth\\.login|Ejemplo didáctico\" frontend/docs/guia-arquitectura-y-desarrollo.md",
      "result": "passed",
      "summary": "Validated headings, documented names and labels, whitespace, changed-file scope, and absence of staged files."
    }
  ],
  "validationOutput": [
    "The required headings are at lines 313 and 396, before the PR checklist at line 514.",
    "The document uses the exact non-implemented label for SectionHeader and future login service, hook, and component samples.",
    "No api:types or OpenSpec CLI command was run."
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "Added two detailed Spanish tutorials covering component ownership and the documented future login endpoint path, while preserving the current feature boundaries.",
  "reviewFindings": [
    "no blockers"
  ],
  "manualNotes": "Material discovery was saved to Engram project upds-judge-front."
}
```
