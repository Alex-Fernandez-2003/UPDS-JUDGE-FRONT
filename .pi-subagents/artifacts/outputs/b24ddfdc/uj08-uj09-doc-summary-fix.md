Implemented the surgical documentation correction: the summary no longer claims to render the problem-set link and now lists only the factual fields rendered by `CreateContestSummary`.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Only docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md was edited; the summary wording now lists modality, name, code, start date/time, duration, freezing minutes, problem count/letters, and ZIP name, with no problem-set link, password, or authentication data."
    }
  ],
  "changedFiles": [
    "docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "None (per task instruction: no other commands)",
      "result": "not-run",
      "summary": "No commands or tests were run."
    }
  ],
  "validationOutput": [
    "Targeted documentation edit completed; the replacement removes the unsupported assertion that the summary reflects the problem-set link."
  ],
  "residualRisks": [
    "No runtime validation was run because this was a documentation-only change and the task prohibited other commands."
  ],
  "noStagedFiles": true,
  "diffSummary": "Replaced the summary-field description to remove the problem-set link and enumerate only fields rendered by CreateContestSummary.",
  "reviewFindings": [
    "no blockers"
  ],
  "manualNotes": "No commands were run and no files were staged by this task."
}
```
