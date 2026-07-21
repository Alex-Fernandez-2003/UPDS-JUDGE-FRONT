# Final practical validation

## Findings

- **High — protected-scope deviation:** `frontend/src/lib/api/http-client.ts:22-29,151-155` modifies shared HTTP infrastructure. The approved scope declares HttpClient/AuthTransport as existing dependencies/consumer-only and protects global HTTP infrastructure. This needs explicit approval or removal.
- **No additional scope violations found** in the changed contest feature, endpoint, MSW, or routing files. Approved `{codigo,mensaje}`, 400/401 messages, and indexed `listaProblemas[n]` keys were treated as authorized.
- Task status: `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md` records Tasks 1–25 implemented; Tasks 26 manual evidence and 27 authenticated integration remain pending.
- Dev server: owned Vite server returned 200 for both required paths. Its npm parent exited but left Vite listener PID 3028; that owned listener was then terminated. Final check found no LISTENING socket on 8085.
- Automated MSW coverage passed: 41/41 tests. No persistent MSW configuration/source/environment edits were made.
- No staged files observed.