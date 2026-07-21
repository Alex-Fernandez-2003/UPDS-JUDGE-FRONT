Implemented the requested expansion of `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`.

Changed files: `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`.
Validation: read the updated target after writing; no shell commands, tests, or OpenSpec CLI were run as instructed.
Open risks/questions: authenticated end-to-end integration, navigation/listing, visual refinement, and verified captures remain pending.
Recommended next step: review the target document with the pending integration work.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Only the requested history document was updated. It starts with the exact title and contains every required top-level section, state line, multipart contract, safety boundary, pending integration, test-evidence, and capture-warning content."
    }
  ],
  "changedFiles": [
    "docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "npm run format:check; npm run lint; npm run typecheck; npm run test:run; npm run build",
      "result": "passed",
      "summary": "Previously recorded implementation evidence: format, lint, typecheck, test suite, and build passed; test:run recorded 11 files and 41 tests. Not rerun for this documentation-only update."
    },
    {
      "command": "Tests/OpenSpec CLI for this documentation update",
      "result": "not-run",
      "summary": "Explicitly prohibited by the task."
    }
  ],
  "validationOutput": [
    "Read back docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md after writing.",
    "Confirmed the exact required title and all required top-level headings are present.",
    "The document records 11 files and 41 tests as prior evidence without claiming they are exclusively UJ-08/UJ-09 coverage."
  ],
  "residualRisks": [
    "Authenticated end-to-end multipart and token-provider verification remain pending.",
    "Sidebar access, contest listing/post-create integration, visual refinement, and verified captures remain pending.",
    "No page-level claim is made that every error or interaction behavior is directly tested."
  ],
  "noStagedFiles": true,
  "diffSummary": "Expanded the requested UJ-08/UJ-09 history with the prescribed structure and factual implementation boundaries; no source implementation or tests were changed.",
  "reviewFindings": [
    "no blockers: documentation scope is limited to the requested target."
  ],
  "manualNotes": "Suggested capture paths are plain code text and explicitly identified as non-existent. The document excludes Swagger defects, secrets, and unproven backend internals."
}
```
