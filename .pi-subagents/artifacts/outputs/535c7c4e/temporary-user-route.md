status: interaction_required
summary: No repository changes made. The delegated task does not provide the exact allowed edit surfaces or authorized validation commands required to safely implement it.
files_changed: []
tdd_evidence:

- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
validation: []
risks:
- Exact allowed edit surfaces and validation commands are missing; editing would require guessing scope.
review_focus: []
skill_resolution: none
interaction_required:
  question: Please provide the exact allowed edit surfaces and authorized validation commands for this implementation.
  reason: The implementation contract requires these details before repository work; they were not included in the task.
  options:
  - Provide scoped paths and commands.
  unblock_response: A list of editable paths/globs and exact non-destructive validation commands.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Implementation was not started because required scope and validation authorization were not provided."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [],
  "residualRisks": [
    "Exact allowed edit surfaces and validation commands are missing."
  ],
  "noStagedFiles": false,
  "diffSummary": "No repository implementation changes.",
  "reviewFindings": [
    "blocker: implementation scope authorization is incomplete"
  ],
  "manualNotes": ""
}
```
