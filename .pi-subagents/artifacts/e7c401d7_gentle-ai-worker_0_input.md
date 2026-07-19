# Task for gentle-ai-worker

Resume the contract integration for existing change `sprint-1-frontend-core-api-ui-foundation`. The user manually configured `.env.example` and ignored `.env.local` with `OPENAPI_SCHEMA_URL=http://localhost:5185/swagger/v1/swagger.json`; do NOT edit any `.env*` file. Be sole writer for source/docs. Allowed edits only `frontend/**` excluding .env files, and truthful `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md`. No backend/database/root README/academic docs/final report; no commits/push/archive; no functional auth/contest pages/forms.

Use actual OpenAPI: HTTP bearer/JWT global scheme; exact POST `/api/Auth/login` and `/api/Auth/register`; generated schema models. Endpoint relative values must be `Auth/login`, `Auth/register`, no duplicate `/api`. Implement generator env loading if needed for plain `npm run api:types` using user-created local env, run it, never hand-edit generated types. Wire optional non-persistent Bearer token provider through shared client into Authorization header. Support generic backend `mensaje` error body alongside generic Problem Details (do not claim documented error statuses). Add exact 200-only typed MSW handlers for auth routes, safe fake data only, no real passwords/tokens. Add focused tests and update README/task state accurately. Use OpenAPI types in endpoints/handlers where applicable. Run api:types, format check, lint, typecheck, test run, build. Test Vite proxy safely through the exact path without credentials; run dev port 8085 and test /,/dev/ui, stop only own process. Attempt supported OpenSpec validation or report no tool. ## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md
Save material discovery to Engram `upds-judge-front` before return.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\e7c401d7\worker-openapi-integration-2.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: checked
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope

Required evidence: changed-files, tests-added, commands-run, residual-risks, no-staged-files

Finish with a fenced JSON block tagged `acceptance-report` in this shape:
Use empty arrays when no items apply; array fields contain strings unless object entries are shown.
`criteriaSatisfied[].status` must be exactly one of: satisfied, not-satisfied, not-applicable.
`commandsRun[].result` must be exactly one of: passed, failed, not-run.
`manualNotes` and `notes` are optional strings; an empty string means no note and does not satisfy `manual-notes` evidence.
```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "specific proof"
    }
  ],
  "changedFiles": [
    "src/file.ts"
  ],
  "testsAddedOrUpdated": [
    "test/file.test.ts"
  ],
  "commandsRun": [
    {
      "command": "command",
      "result": "passed",
      "summary": "short result"
    }
  ],
  "validationOutput": [
    "validation output or concise summary"
  ],
  "residualRisks": [
    "none"
  ],
  "noStagedFiles": true,
  "diffSummary": "short description of the diff",
  "reviewFindings": [
    "blocker: file.ts:12 - issue found, or no blockers"
  ],
  "manualNotes": "anything else the parent should know"
}
```