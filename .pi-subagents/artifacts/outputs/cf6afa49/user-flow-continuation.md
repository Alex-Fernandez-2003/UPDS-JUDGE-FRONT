status: blocked
summary: No repository changes made. The delegated task references four exact artifacts, listed histories, and prior context that are absent from the supplied conversation. The required scoped implementation cannot be performed without guessing.
files_changed:

- none
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
validation:
- not run: exact authorized validation commands were not supplied
risks:
- Missing artifact/history paths, allowed edit surfaces, and validation commands prevent safe scoped work.
- Supervisor contact could not be established: broker failed to start within timeout.
review_focus:
- Provide the referenced artifact and history paths before implementation.
skill_resolution: none

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Implementation was not started because required prior-context artifact and history paths were unavailable."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "No validation was run; exact authorized commands were not supplied."],
  "residualRisks": [
    "Required source artifacts, histories, allowed edit surfaces, and validation commands are missing from supplied context.",
    "Supervisor broker unavailable when clarification was requested."],
  "noStagedFiles": false,
  "diffSummary": "No repository diff created.",
  "reviewFindings": [
    "blocker: required task context was not provided."],
  "manualNotes": "Provide the four artifact paths, listed history paths, allowed edit surface, and authorized validation commands."
}
```
