status: interaction_required
summary: Stopped before repository work because the delegation omits the exact paths for the four required OpenSpec artifacts, allowed edit surfaces, and authorized validation commands.
files_changed:

- none
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
validation:
- none — repository inspection and validation were not authorized without scope details
risks:
- Cannot establish source-of-truth requirements or safely constrain edits without the four exact artifact paths and allowed surfaces.
review_focus:
- Provide the four OpenSpec artifact paths, edit surfaces, relevant skill paths, and exact authorized validation commands.
skill_resolution: none
interaction_required:
  question: Please provide the exact paths of the four OpenSpec artifacts, the exact allowed edit surfaces, any matching injected skill paths, and the exact authorized validation commands.
  reason: These required scope inputs were not included, and implementation would otherwise require guessing.
  options: Continue by supplying the requested task metadata; alternatively authorize a bounded discovery surface explicitly.
  unblock_response: Exact artifact paths, permitted paths to edit, skill paths (or confirmation none), and commands approved for baseline/final validation.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Implementation was not started because required source-of-truth artifact paths and edit scope were not supplied."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "No repository commands were run; task scope inputs were incomplete."
  ],
  "residualRisks": [
    "Required OpenSpec artifact paths, allowed edit surfaces, and validation commands are unknown."
  ],
  "noStagedFiles": false,
  "diffSummary": "No repository changes were made.",
  "reviewFindings": [
    "blocker: required task metadata was absent, so requirements and permitted scope cannot be established safely."
  ],
  "manualNotes": "Provide the missing metadata to resume."
}
```
