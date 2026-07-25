status: interaction_required
summary: No repository changes were made. The task requires reading four artifacts/histories fully, but their paths are not supplied; writable edit surfaces are also described semantically rather than as exact paths.
files_changed:

- C:\dev\UPDS-JUDGE-FRONT\.pi-subagents\artifacts\outputs\6b6c21fc\integrate-user-flow-final.md: wrote required handoff
 tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
validation:
- not run: exact authorized validation commands were not provided
risks:
- Cannot safely inspect or modify the requested feature without the four artifact/history paths and exact allowed edit surfaces.
review_focus:
- Provide required context and precise writable paths before implementation.
skill_resolution: none
interaction_required:
  question: What are the exact paths to the four required artifacts/histories, the exact writable frontend/docs/history paths, and the authorized validation commands?
  reason: These required inputs are absent; proceeding would violate the scoped implementation contract.
  options: Supply the paths and commands; or explicitly authorize scoped discovery and define its boundaries.
  unblock_response: Four full artifact/history paths, exact allowed edit surfaces, and validation commands.