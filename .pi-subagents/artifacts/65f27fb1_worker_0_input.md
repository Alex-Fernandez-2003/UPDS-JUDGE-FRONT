# Task for worker

You are sole writer completing an existing partial implementation for change `uj08-uj09-create-contest-zip-import-frontend`. Re-read current diff and files first. Exact allowed edits: `frontend/src/features/contests/**`; `frontend/src/lib/api/endpoints.ts`; `frontend/src/lib/api/http-client.ts`; `frontend/src/routes/router.tsx`; `frontend/src/mocks/handlers/**`; `frontend/src/mocks/fixtures/**` only if needed; contest-specific `*.test.ts`/`*.test.tsx` under feature or routes/mocks; and `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md`. Do not edit ANY other files. Do not modify generated types. No source/root docs/backend/database/auth feature/layout/sidebar/topbar/README/manual. No OpenSpec CLI/api:types/commit/push/archive.

Existing partial code already added endpoint, shared HttpClient config hook, contest feature types/schema/mapper/service/mutation/list/summary/page, and router. Complete or fix it (do not rewrite outside required scope) according to exact approved supplemental contract:
- POST central route `Concursos/crear`, multipart fields nombre, descripcion, fechaInicio ISO (`new Date(...).toISOString()`), duracionMinutos, contrasena (empty string when blank), urlSetProblemas, minutosCongelamiento, codigo, archivoZip; indexed problem keys `listaProblemas[i].inciso/titulo/tiempo/memoria`.
- Current OpenAPI remains compatible: POST /api/Concursos/crear multipart global Bearer; use internal types for approved `{codigo,mensaje}` complement only.
- MSW exact controlled bodies: 200 `{ "codigo": "contest-demo", "mensaje": "Concurso, problemas y casos de prueba creados exitosamente." }`; 400 `{ "mensaje": "El nombre del concurso es obligatorio." }`; 401 `{ "mensaje": "Token inválido" }`.
- Build all requested tests (schema, dynamic letters, mapper, service, mutation, page, routing, handler). Do not use fetch/Axios/host/token storage. Page must only be AdminLayout child via router, current layout untouched; exact route constant; no auth UI/session/guard.
- Shared client AuthTransport change must maintain neutral default and allow future token-provider composition at one existing shared point; feature never accesses a token.
- Update only tasks actual completion/status, captures manual pending; no CLI mention.
- Run exact commands from frontend: npm run format:check; npm run lint; npm run typecheck; npm run test:run; npm run build; start `npm run dev -- --host 127.0.0.1`, verify `/admin/contests/new` and `/dev/ui` on exact 8085, stop your own server. You may run no other npm script. Report files+results.

## Skills to load before work
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md
Save discoveries to Engram `upds-judge-front` if tool available.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\65f27fb1\contest-feature-finalization.md
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