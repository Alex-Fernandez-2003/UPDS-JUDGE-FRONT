# SDD apply — blocked before edits

**Status:** blocked

## Executive summary

No implementation files were changed. The approved change artifacts were read from `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`, and the supplied native status was non-actionable because it searched `openspec/` rather than the user-authorized `docs/openspec/` location. The user’s fallback authority establishes the active change, but the task artifact forecasts 2,500–5,000 changed lines and a **High** 400-line review-budget risk without a resolved delivery path.

The SDD workload gate requires an explicit `auto-chain`/chosen chain mode or an explicit `size:exception`/`exception-ok` before code edits. I requested that decision through the required supervisor channel; its broker failed to connect.

## Artifacts inspected

- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/proposal.md`
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/spec.md`
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/design.md`
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md`
- `frontend/package.json`
- `frontend/vite.config.ts`

## Required decision

Provide one of:

- `auto-chain` (and the assigned work-unit slice / PR boundary),
- a chosen chained or stacked PR mode, or
- explicit `size:exception` / `exception-ok` accepting the estimated 2,500–5,000 line implementation.

## Risks

- Backend `http://localhost:5185` and OpenAPI contract remain unavailable; contractual endpoints, generated types, API handlers, and authentication details must stay pending.
- No task checkboxes were altered because implementation did not start.
- No `docs/openspec/config.yaml` was created because the workload gate blocks all edits first.

## Skill resolution

`paths-injected`: read `cognitive-doc-design` and `work-unit-commits`.

## Status consumed

The supplied native status had `changeName: null`, `applyState: blocked`, and `No active SDD changes found`; this conflicts with the user-authorized fallback location `docs/openspec/changes/...`, where all four artifacts exist. The workload block is independently established by the inspected tasks artifact.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "not-satisfied",
      "evidence": "Implementation did not start because the required high-workload delivery decision was not supplied."
    }
  ],
  "changedFiles": [],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "Inspected the four authorized change artifacts and frontend package/configuration.",
    "Supervisor decision request could not be delivered: broker failed to start within timeout."
  ],
  "residualRisks": [
    "Explicit delivery path is required before editing a forecast 2,500–5,000 LoC change.",
    "Backend/OpenAPI contract is unavailable."
  ],
  "noStagedFiles": true,
  "diffSummary": "No implementation diff created.",
  "reviewFindings": [
    "blocker: Review Workload Forecast is High without auto-chain, an approved chain mode, or size exception."
  ],
  "manualNotes": "No persisted OpenSpec task update was made because the user limited documentation writes to truthful task states and no task was completed."
}
```
