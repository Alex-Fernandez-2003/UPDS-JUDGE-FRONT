# Task for gentle-ai-worker

Modify ONLY `frontend/docs/guia-arquitectura-y-desarrollo.md`. No other paths, no source changes, no README/tasks/OpenSpec/backend/etc. Insert exactly before `## Checklist para un PR de frontend` the two exact required headings: `## Tutorial práctico: cómo agregar un componente` and `## Tutorial práctico: cómo consumir un endpoint`. Use the scout factual mapping at `C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\71a87293\tutorials-scout.md`, read it first.

Write detailed, beginner-friendly Spanish meeting EVERY specified tutorial subtopic from the user request: ownership table; real StatCard case study (true props and actual DevUi fixture/test claims); explicit non-implemented didactic SectionHeader structure/code/use/test/dev-ui/checklist; complete educational POST `/api/Auth/login` path with exact generated types, relative endpoint reason, future-only conceptual service/mutation/component, actual HttpClient semantics/ApiError/Bearer/MSW/query/error/FormData/sequence/tests/query-vs-mutation/errors/checklists. Clearly label every non-existing future service/hook/page/component code sample as `Ejemplo didáctico: no representa un archivo implementado actualmente.` Do not claim a working frontend login, persistence, auth feature or real token/mock behavior absent from code. Do not discuss Swagger/backend defects or recommendations. Do not invent methods/props/importable modules/endpoints. Code samples must use actual alias/style/HttpClient signatures where applicable, no any, no new libs.

Then run exactly from frontend: `npx prettier --write docs/guia-arquitectura-y-desarrollo.md`, npm run format:check, lint, typecheck, test:run, build. Do not run api:types or OpenSpec CLI. Validate insertion/method/prop names/link/document claims before finish. Report only the permitted file changed and results.

## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
Save material discovery to Engram project `upds-judge-front` before return.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\434abf72\tutorials-writer.md
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