# Task for gentle-ai-worker

Create ONLY `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`; no other path or command that writes. The file does not exist. Write detailed, clear Spanish evidence based exclusively on code/change/task facts in scout artifact `C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\be1c1b24\uj08-uj09-doc-scout.md` plus user-required headings/content. Begin exact title. Cover all requested headings: state/change/motive/full user stories with priorities/points; scope; fulfilled criteria checklists (accurate to code); screen/layout/form sections; multipart/backend contract; flow; dynamic problems; ZIP frontend vs contract-responsibility backend without asserting unverified end-to-end behavior; success/errors/AuthTransport/MSW; real file inventory; tests and recorded validated results; suggested evidence as plain paths only, explicitly nonexistent/non-blocking; security/pending/out-of-scope/conclusion.

Critical accuracy rules: distinguish functional isolated frontend implementation from authenticated end-to-end pending; do not say application actually configures AuthTransport/Bearer or a real backend creation succeeded. State approved contract requires Bearer but token-provider integration is pending. Do not mention Swagger defects, generated-type discrepancy, OpenSpec CLI, secret/token values, unrelated projects, or manual captures as existing. Do not link any suggested nonexistent captures. Do not overstate test coverage: say 41 tests/11 files from validated suite and list real test groups, avoiding claim that every checklist item has individual page tests. Mention exact existing source files only.

Do not touch source/features/change tasks/README/backend/database/captures/images/other histories. Do not run tests or OpenSpec CLI. After writing, only use read-only `git diff -- <target>` and `git status --short` if desired. Report exact changed path.

---
**Output:**
Write your findings to exactly this path: C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\7dc22f72\uj08-uj09-history-writer.md
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