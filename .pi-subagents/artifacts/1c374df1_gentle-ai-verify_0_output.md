Findings for `frontend/docs/guia-arquitectura-y-desarrollo.md`:

- **FAIL (major)**: tutorial imports nonexistent generated type aliases at lines 426 and 444. `src/types/api.generated.ts` exports `components`, not named `LoginRequest`/`LoginResponse`. The documented aliases must be derived from `components['schemas']`.
- **PASS**: both tutorial headings precede PR checklist (lines 313, 396; checklist line 514).
- **PASS**: StatCard props, default/tone behavior, DevUi fixture/use, and label-test claim match source.
- **PASS**: SectionHeader and future login service/mutation/component are explicitly non-implemented.
- **PASS**: login route, endpoint, URL joining, HttpClient behavior, Bearer transport, and MSW handler claims match source, except alias imports above.
- **PASS**: no Swagger defects, backend recommendations, or functional-login claims found.
- **BLOCKER**: repository status contains untracked `.pi-subagents/artifacts/**`, so “only this file changed” cannot be attested globally. Tracked diff is only the tutorial (+201 lines).
- Initial root-level `npm run format:check` failed ENOENT and created an npm cache log outside the repository; rerun from `frontend/` passed.