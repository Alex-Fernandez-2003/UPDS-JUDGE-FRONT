# Task for gentle-ai-worker

Create the requested detailed Spanish team manual for existing Sprint-1 frontend foundation, strictly without functional/source changes. You are sole writer. ALLOWED files ONLY:
1) `frontend/docs/guia-arquitectura-y-desarrollo.md` (new),
2) `frontend/README.md` (add only a visible `## Manual para el equipo` link to `./docs/guia-arquitectura-y-desarrollo.md`; preserve other content),
3) `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` (truthful final status only).
Never write any other path. Do not modify env files, source, backend/database/root README/docs academic/informe/capturas/images. Do not run/search/install an openspec CLI. No commits/push/archive.

The scout artifact `C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\150431cd\frontend-guide-scout.md` is the exhaustive fact-only source mapping. Read it first, then write a Spanish guide with the exact required title and every mandatory topic/section from the user's request. It must be detailed but cognitively organized, beginner-oriented, factually tied to actual source, and use only real names/props/variants/routes/scripts/components. Include real project tree, stack responsibilities, environment, boot flow, HTTP/auth/OpenAPI/Query/MSW/style/UI tables/layouts/router/catalog/forms/feature/component/table/testing/conventions/prohibitions/PR checklist/troubleshooting/current status. Include short generic structural examples only; no feature implementation. Exclude all backend/Swagger defect observations, suggestions, inconsistencies, non-documented response commentary, or backend-owner instructions. State only OpenAPI is source of truth and endpoints/DTO/statuses must not be invented.

Tasks.md must make technical foundation completed; manual captures Task 47 pending but explicitly non-blocking; Task 48 CLI validation is `No aplica por decisión del proyecto` with manual four-artifact review accepted. Do not add backend or Swagger tasks. Do not falsely claim captures exist. Do not describe historical foreign working-tree changes as blockers. Keep UJ-5/UJ-6/UJ-8/UJ-9 unimplemented.

Validate links/paths in the new guide and run ONLY from frontend: npm run format:check, npm run lint, npm run typecheck, npm run test:run, npm run build. Do not run api:types. Report exact changed paths and validation.

## Skills to load before work
- C:\Users\af156\.copilot\skills\cognitive-doc-design\SKILL.md
If material discoveries arise, save them to Engram project `upds-judge-front` before return.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\41f68477\frontend-guide-writer.md
This path is authoritative for this run.
Ignore any other output filename or output path mentioned elsewhere, including output destinations in the base agent prompt, system prompt, or task instructions.

## Acceptance Contract
Acceptance level: attested
Completion is not accepted from prose alone. End with a structured acceptance report.

Criteria:
- criterion-1: Return concrete findings with file paths and severity when applicable

Required evidence: review-findings, residual-risks

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