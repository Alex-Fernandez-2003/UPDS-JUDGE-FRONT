status: partial
summary: Resumed the existing user-contest-flow implementation and hardened the centralized access policy so an unrecognized modality is blocked rather than treated as public. Added focused service coverage for the centralized UJ-12 enrollment request. Existing working-tree implementation supplies the join modal, mutation, routes, layout adjustment, MSW handler, and historical documentation.
files_changed:

- frontend/src/features/contests/user/access-policy.ts: block unknown contest modalities safely.
- frontend/src/features/contests/user/access-policy.test.ts: cover unknown-modality fallback.
- frontend/src/features/contests/user/service.test.ts: verify enrollment uses HttpClient and centralized endpoint.
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: focused policy and enrollment-service tests passed (11 tests).
validation:
- cd frontend && npm run test:run -- src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts: passed (2 files, 11 tests).
- cd frontend && npx prettier --check src/features/contests/user/access-policy.ts src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts: initially failed for access-policy.ts; corrected with the authorized scoped Prettier write.
- cd frontend && npx prettier --write src/features/contests/user/access-policy.ts src/features/contests/user/access-policy.test.ts src/features/contests/user/service.test.ts: passed.
- cd frontend && npm run lint: passed with 3 existing Fast Refresh warnings.
- cd frontend && npm run typecheck: passed.
- cd frontend && npm run test:run: passed (19 files, 95 tests).
- cd frontend && npm run format:check: failed on 72 pre-existing files outside this scoped continuation; scoped changed files pass Prettier.
- cd frontend && npm run build: passed; Vite emitted an existing >500 kB chunk-size warning.
- git diff --check: passed.
- git diff --cached --name-only: passed; no output (no staged files).
risks:
- The required unified UJ-13/detail composition cannot be safely implemented: frontend/src/features/problems contains only .gitkeep, while the documented detail/dashboard endpoint and components are absent.
- Direct submissions route currently lacks a verified contest-detail query; it cannot centrally enforce participation/read-only/blocked modes without inventing an API contract.
- Full repository format check remains red due to 72 unrelated pre-existing formatting violations.
- Manual authenticated backend, responsive, keyboard, and real-error validation remain pending.
review_focus:
- frontend/src/features/contests/user/access-policy.ts: confirm unknown server-provided modalities remain fail-closed.
- frontend/src/features/contests/user/service.test.ts: confirm enrollment stays on the shared HttpClient and endpoint registry.
- Existing UJ-12 integration files: review mutation invalidation, modal password lifecycle, and canonical submissions route.
skill_resolution: none