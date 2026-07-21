# Task for gentle-ai-worker

Implement ONLY existing change `uj08-uj09-create-contest-zip-import-frontend` as sole writer. Contract revalidated live and compatible; approved complementary contract in user prompt/change artifacts supplies success/error/indexed multipart details absent from OpenAPI. Respect all strict exclusions: no listing/dashboard/sidebar/topbar edits/auth/login/session/guards/JWT persistence/logout/refresh/roles/ZIP inspection/other contest features; no backend/database/root README/frontend docs/manual/other change artifacts. Allowed writes only `frontend/**` necessary to feature plus truthful `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md`. No OpenSpec CLI/commit/push/archive.

Live OpenAPI fact: POST `/api/Concursos/crear`, multipart/form-data, inherited HTTP Bearer JWT; inline create schema fields exactly nombre, descripcion, fechaInicio date-time, duracionMinutos int32, contrasena, urlSetProblemas, minutosCongelamiento int32, codigo, listaProblemas array of CrearProblemaDto, archivoZip binary; problem fields inciso string, titulo nullable string, tiempo float, memoria int32. Do not regenerate types unless you detect actual generated file mismatch (scout says it matches). The approved supplement permits FormData indexed keys `listaProblemas[index].inciso/titulo/tiempo/memoria`, ISO `new Date(values.fechaInicio).toISOString()`, response `{codigo,mensaje}`, and exact 400/401 `mensaje` bodies specified by user.

Implement endpoint registry `contests.create: 'Concursos/crear'`; typed internal form state/Zod/RHF/useFieldArray; isolated FormData mapper; service->shared HttpClient; mutation; ContestProblemList and CreateContestSummary; responsive one-page CreateContestPage; replace only `/admin/contests/new` placeholder using route constant, compose existing AdminLayout as router-owned shell without modifying its own sidebar/topbar. Do not duplicate layouts. Derive public/private modal only from trimmed password; no password summary. ZIP FileDropzone accepts zip/selection/removal, no JSZip/content inspection; expected folder helper dynamically lists letters. Use existing components. Feature must not know host/JWT/header or direct fetch.

Minimum AuthTransport composition: preserve neutral default and existing single shared client point, but expose an approved injection/configuration point allowing a future token provider to supply Bearer to that shared client; no fake production provider, storage, auth feature/provider or change in behavior absent configuration. Do not create a client per feature.

Add MSW contest handler reading `request.formData`, checking user-required fields, 200 exact approved body and controlled 400/401 exact approved messages; no real token/password/ZIP parsing. Add comprehensive tests schema/problems/mapper/service/mutation/page/routing/MSW as requested. For contract-only response types absent OpenAPI, local response type may exactly represent approved complement but do not hand-edit api.generated.

Run from frontend: format:check, lint, typecheck, test:run, build; start Vite, verify /admin/contests/new and /dev/ui exact 8085 then stop own Vite. Run no api:types unless needed. With MSW validate success/400/401. With MSW off safely smoke POST proxy without JWT for 401 if possible; no real creation. Update tasks only real state. Use visual reference only for restrained two-column hierarchy, not wizard/extra controls.

## Skills to load before work
- C:\Users\af156\.copilot\skills\work-unit-commits\SKILL.md
If material discoveries arise, save them to Engram project `upds-judge-front` before returning.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\aba42a92\contest-feature-implementation.md
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