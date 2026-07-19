## Final validation findings

- **Blocker:** `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/{design,proposal,spec}.md` are untracked changes outside the permitted `tasks.md`.
- **Blocker:** Port `8085` was already serving HTTP 200 before the dev-server validation could establish that this run’s Vite process bound it. Existing Node PID `555` predates validation and remains running; it was not stopped to avoid terminating an unrelated process.
- **Unexpected mutation:** the initial format command mistakenly ran at repository root and npm reported a cache log at `C:\Users\af156\AppData\Local\npm-cache\_logs\2026-07-19T00_04_43_021Z-debug-0.log`. No cleanup performed.