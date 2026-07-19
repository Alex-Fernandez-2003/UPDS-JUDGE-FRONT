# Task for gentle-ai-worker

Implement ONLY the pending contract-driven tasks of existing change `sprint-1-frontend-core-api-ui-foundation`, as sole writer. User explicitly confirms backend+schema and JWT Bearer; do not expand scope. Allowed writes: `frontend/**` and truthful `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` only. Do not edit other docs/config/change artifacts, backend, database, root README, academic docs, final report. No commits/pushes/archive. Do not make functional login/register/contest pages or forms.

Live OpenAPI evidence, already inspected:
- `http://localhost:5185/swagger/v1/swagger.json` OpenAPI 3.0.1, no servers array.
- global security scheme `Bearer`: HTTP bearer, `bearerFormat: JWT`.
- exact operations: POST `/api/Auth/login`, request `LoginRequest` {correo?, contrasena?}, 200 `LoginResponse` {token?, expiraEn?}; POST `/api/Auth/register`, request `RegisterRequest` {nombre?, correo?, contrasena?}, 200 `RegisterResponse` {mensaje?, correo?}. Only 200 documented; do not invent non-200 mocks.
- User says actual backend errors may have `mensaje`; support it generically in error normalization alongside current generic Problem Details, without claiming it is OpenAPI-declared or adding invented status assertions.
- With configured base `/api`, endpoint registry values MUST be exact relative `Auth/login` and `Auth/register`, preserving capitalization, to avoid `/api/api` duplication. Vite proxy requires no rewrite.

Implement:
1. Configure the confirmed schema URL in `.env.example`; make the existing generator reliably load `OPENAPI_SCHEMA_URL` via the intended Node/Vite env mechanism so plain `npm run api:types` works using a local ignored `.env.local`. Create that local `.env.local` with only the confirmed schema URL if required for this validation; it must remain ignored/untracked. Do not edit generated output manually. Run generator to create `src/types/api.generated.ts` and verify its generated header.
2. Add endpoint registry only for those two routes.
3. Wire a Bearer `AuthTransport`/token provider into shared HTTP client so it conditionally adds `Authorization: Bearer <token>` when provider supplies one. No localStorage, cookie credentials, persistence, login service, or UI.
4. Normalize generic body `mensaje` as safe error message when present, retaining existing Problem Details resilience behavior.
5. Add typed MSW handlers only for exact confirmed auth operations, use generated types, 200 responses only, no real passwords/tokens in fixtures, no components consuming them.
6. Add focused tests for generated-contract usage/endpoints, bearer header behavior, `mensaje`, and handlers. Update README local schema instructions without expanding scope.
7. Run OpenSpec validation if a project command/tool exists; otherwise report its absence. Update only truthful task status.
8. Run `npm run api:types`, format:check, lint, typecheck, test:run, build. Start dev on exact 8085; verify `/`, `/dev/ui`, and proxy smoke test through frontend `/api` to a confirmed safe auth operation/path without submitting credentials or interpreting a non-200 auth response as failure. Stop only your own server.

Report evidence/commands and remaining blocks. ## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md
Save material discoveries to Engram project `upds-judge-front` before returning.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\4f25ffb2\worker-openapi-integration.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: reviewed
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Implement the requested change without widening scope
- criterion-2: Return evidence sufficient for an independent acceptance review

Required evidence: changed-files, tests-added, commands-run, validation-output, residual-risks, no-staged-files

Review gate: required by reviewer.

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
    },
    {
      "id": "criterion-2",
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