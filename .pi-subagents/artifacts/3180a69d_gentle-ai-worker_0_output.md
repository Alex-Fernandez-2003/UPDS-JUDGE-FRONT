status: completed
summary: Corrected the two login tutorial snippets to import the generated `components` type and derive `LoginRequest`/`LoginResponse` aliases from `components['schemas']`; no source or API-generated files were changed.
files_changed:

- frontend/docs/guia-arquitectura-y-desarrollo.md: Replaced nonexistent named generated-type imports in the service and hook examples with type-only `components` imports and schema aliases.
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: Verified formatting with Prettier and repository format check.
validation:
- cd frontend && npx prettier --write docs/guia-arquitectura-y-desarrollo.md && npm run format:check: passed — Prettier reported the document unchanged; format check reported all matched files use Prettier code style.
- git diff --check: passed — no whitespace errors.
- git diff --cached --name-only: passed — no staged files.
risks:
- The target documentation file and unrelated `.pi-subagents` artifacts were already dirty before this task. The target file's full Git diff includes those pre-existing tutorial additions; this task's surgical delta is limited to the two generated-type import blocks.
review_focus:
- frontend/docs/guia-arquitectura-y-desarrollo.md: Confirm both examples use `import type { components }` and aliases indexed from `components['schemas']`.
skill_resolution: none

Exact task delta:

- Service sample: `import type { LoginRequest, LoginResponse }` became `import type { components }`, followed by aliases for `LoginRequest` and `LoginResponse`.
- Hook sample: `import type { LoginRequest }` became `import type { components }`, followed by a `LoginRequest` schema alias.