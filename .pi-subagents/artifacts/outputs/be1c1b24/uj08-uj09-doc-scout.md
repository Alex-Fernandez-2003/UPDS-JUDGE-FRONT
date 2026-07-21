# Code Context

## Files Retrieved

1. `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md` (not found) — destination was checked before mapping; it does not exist.
2. `docs/03-product-backlog.md` (lines 28-30, 88-122) — source wording, acceptance criteria, priority and estimates for UJ-08/UJ-09; distinguish the product story from the implemented frontend scope.
3. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/proposal.md` (lines 3-58, 283-315) — rationale for one atomic page/request and explicit exclusions.
4. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md` (lines 1-323, 410-561) — approved UI, validation, multipart, feedback and MSW behavior.
5. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/design.md` (lines 1-432) — component boundaries and intended data flow.
6. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md` (lines 3-9, 63-74, 258-387, 402-414) — actual status: tasks 1-4, 6-25 complete; generated-type, manual/external and handoff items remain pending.
7. `frontend/src/features/contests/types.ts` (lines 1-22), `schema.ts` (lines 1-55), `mapper.ts` (lines 1-22) — exported feature types, client constraints and multipart mapping.
8. `frontend/src/features/contests/service.ts` (lines 1-10), `use-create-contest.ts` (lines 1-5) — exported `createContest` service and `useCreateContestMutation` hook.
9. `frontend/src/features/contests/ContestProblemList.tsx` (lines 1-150), `CreateContestSummary.tsx` (lines 1-72), `CreateContestPage.tsx` (lines 1-250) — actual form composition, derived display, actions and feedback.
10. `frontend/src/lib/api/endpoints.ts` (lines 1-10), `http-client.ts` (lines 15-117, 153-158), `frontend/src/lib/auth/auth-transport.ts` (lines 1-16) — relative endpoint, FormData/header behavior, normalized errors and optional Bearer abstraction.
11. `frontend/src/routes/constants.ts` (lines 1-7), `router.tsx` (lines 1-45) — named routes and page composition inside `AdminLayout`.
12. `frontend/src/mocks/handlers/index.ts` (lines 16-42), `handlers.test.ts` (lines 37-66) — MSW endpoint and controlled test-only success/400/401 branches.
13. `frontend/src/features/contests/schema.test.ts` (lines 18-50), `mapper.test.ts` (lines 21-42), `service.test.ts` (lines 19-35), `use-create-contest.test.tsx` (lines 40-59), `CreateContestPage.test.tsx` (lines 17-50), `frontend/src/routes/router.test.tsx` (lines 18-48) — scoped test evidence.
14. `.pi-subagents/artifacts/outputs/a74da89b/contest-final-verify.md` — prior independent validation: format/lint/typecheck/build passed; `test:run` passed 11 files/41 tests, but raises response/auth concerns.
15. `.pi-subagents/artifacts/outputs/782babe3/contest-practical-final-verify.md` — prior practical verification: 41/41 tests passed; captures and authenticated backend integration remained pending.

## Key Code

### Exact implementation and data flow

`CreateContestPage` is exported from `frontend/src/features/contests/CreateContestPage.tsx:37-250`. It uses React Hook Form with `zodResolver(createContestSchema)`, watches values for the summary, and submits through `useCreateContestMutation` (lines 37-58). The router maps `routes.newContest` (`/admin/contests/new`) to `<AdminLayout><CreateContestPage /></AdminLayout>` in `frontend/src/routes/router.tsx:22-31`; cancel and the post-success action navigate to `routes.contests` (`/admin/contests`, `constants.ts:1-7`). No contest listing is implemented: that route remains a placeholder (`router.tsx:20`).

Composition is one screen: breadcrumbs/title; cards for **Información general**, **Programación y acceso**, URL/problems, and **Recursos**; then responsive grid/aside summary and final Cancelar/Crear concurso actions (`CreateContestPage.tsx:61-250`). The grid is one column by default and changes to a main column plus 20rem aside at `lg` (`:95`); the summary is sticky at `md` (`CreateContestSummary.tsx:15-17`).

Exports and form shape (`types.ts:1-22`):

- `ContestProblemForm`: `titulo`, `tiempo`, `memoria`.
- `CreateContestFormValues`: `nombre`, `descripcion`, `fechaInicio`, `duracionMinutos`, `contrasena`, `urlSetProblemas`, `minutosCongelamiento`, `codigo`, `listaProblemas`, optional `archivoZip`.
- `CreateContestResponse`: `codigo`, `mensaje`.
- `problemLetter(index)`: derives A onward from the current index.

### Actual client validation

`createContestSchema` (`schema.ts:3-55`) trims and requires name, description and code; requires a nonempty `fechaInicio`; duration is integer > 0; freezing is integer >= 0 and may not exceed duration; URL is trimmed, required and syntactically valid. Each problem requires trimmed title, positive time (not constrained to integer), and positive integer memory. The array requires 1–26 problems. ZIP is required and filename extension is case-insensitive `.zip`; there is no size or archive-content inspection. Password is only `z.string()`; an empty/whitespace password produces the derived public modality.

`ContestProblemList` uses `useFieldArray` (`ContestProblemList.tsx:26-31`), adds defaults `{ titulo: '', tiempo: 1, memoria: 256 }` (`:15`), disables add at 26 (`:45-51`) and disables removal at one item (`:75-81`). It derives headings and accessible removal labels from current index, therefore reindexes after removal. Inputs label time in seconds (`:91-115`) and memory in MB (`:118-141`).

### Request, transport, auth and feedback

`createContestFormData` (`mapper.ts:3-22`) builds `FormData` outside the page. It trims strings, serializes numbers, converts `fechaInicio` with `new Date(...).toISOString()`, appends empty password as `contrasena`, attaches `archivoZip` when present, and uses exactly:

```text
nombre, descripcion, fechaInicio, duracionMinutos, contrasena,
urlSetProblemas, minutosCongelamiento, codigo, archivoZip
listaProblemas[n].inciso, listaProblemas[n].titulo,
listaProblemas[n].tiempo, listaProblemas[n].memoria
```

`createContest` (`service.ts:1-10`) posts that payload through shared `httpClient` to `endpoints.contests.create`; the central path is relative `Concursos/crear` (`endpoints.ts:7-9`). `HttpClient` recognizes FormData and deliberately does **not** set `content-type` for it (`http-client.ts:47-60`), allowing browser multipart boundaries. It calls `AuthTransport.getAuthorizationHeader()` only when an authorization header is absent (`:61-64`), then normalizes non-OK responses to `ApiError` (`:84-117`). `createBearerAuthTransport` returns `Bearer <token>` from a caller-provided function; neither this feature nor the page reads token/storage (`auth-transport.ts:1-16`). `useCreateContestMutation` is the minimal exported TanStack mutation wrapper (`use-create-contest.ts:1-5`).

During pending mutation, fields, ZIP selector, problem actions, Cancelar and submit are disabled; submit also receives `loading` (`CreateContestPage.tsx:104-244`). Success shows `mensaje`, returned `codigo`, and `Ver concursos` without auto-navigation (`:77-90`); success resets defaults (`:47-49`). A 401 becomes `Tu sesión no es válida o ha expirado.`; another `Error` message is rendered in a danger `Alert` (`:51-56,92`). The summary shows modality, safe values, derived problem letters and ZIP filename but does not render password (`CreateContestSummary.tsx:10-69`).

### MSW and tests

MSW handles `POST /api/Concursos/crear`, reads FormData, requires nonblank `nombre`, makes `codigo === 'unauthorized'` a controlled 401 test branch, and otherwise returns controlled success (`handlers/index.ts:23-41`). It does not inspect ZIP contents. Handler tests cover multipart success plus exact controlled 400/401 messages (`handlers.test.ts:37-66`).

Scoped source tests contain 12 explicit test cases: schema/types 4, mapper 1, service 1, mutation 1, page 2, router 3. Earlier verifier evidence records **11 test files / 41 tests** total for `npm run test:run`; do not claim that all 41 are UJ-08/UJ-09 tests. Package scripts are `format:check`, `lint`, `typecheck`, `test:run`, `build`, and `api:types` in `frontend/package.json`.

## Proposed Spanish document outline

Use only observed behavior; do not state undocumented backend internals, Swagger discrepancies, token values, or unverified manual behavior.

```md
# UJ-08 y UJ-09 — Crear concurso e importar paquete ZIP

## Historia de usuario
- UJ-08: reproduce the concise backlog statement and goal.
- UJ-09: reproduce the concise backlog statement and goal.
- Aclaración de alcance: frontend implements one form and one multipart request; it does not list contests, authenticate users, inspect ZIP contents, create drafts, or implement publication states.

## Acceso y pantalla
- Ruta `/admin/contests/new`, breadcrumb, title and explanatory text.
- One-page responsive layout: form plus summary at desktop, normal flow at smaller sizes.
- Buttons: `Cancelar` returns to `/admin/contests`; `Crear concurso` sends the form.

## Datos del concurso y reglas de validación
- General: Nombre, Descripción and Código required and whitespace-trimmed.
- Scheduling/access: required local start date/time; integer duration > 0; integer freeze >= 0 and <= duration; optional password.
- URL and problems: required valid URL; 1–26 problems, letters A–Z automatically derived/recalculated; required trimmed title; time > 0 seconds; positive integer memory in MB.
- Do not state a code pattern, ZIP size limit, or that time must be integer.

## Paquete ZIP
- Required selection through the ZIP selector; `.zip` extension accepted case-insensitively.
- UI identifies expected folders from current letters.
- Explicit boundary: the frontend does not decompress, inspect folders, validate `.in/.out` pairs, or enforce a size cap.

## Resumen, envío y resultados
- Summary shows safe current fields, public/private derived by whether password is nonempty, derived letters/count and ZIP filename; it never shows password or token.
- Submit disables controls/avoids duplicate activation while pending.
- On successful application response, UI displays returned message and code and offers `Ver concursos`, without automatic redirect.
- Field validation stays near the input; general request errors use alert; 401 has the session-expired/invalid text. Do not enumerate or promise backend error payloads beyond this UI handling.

## Integración técnica
- `POST` to central relative route `Concursos/crear` through the shared HTTP client.
- `multipart/form-data` is browser-generated from FormData; do not document a manually configured content type.
- Enumerate the simple multipart keys and indexed `listaProblemas[n]` keys above.
- Bearer is supplied only by configured transport abstraction; do not document storage, token lifecycle, or authentication UI.

## Pruebas y evidencia disponible
- Describe scoped automated coverage (schema, mapper, service, mutation, page interactions, routing and MSW success/controlled errors).
- State prior recorded command evidence: format/lint/typecheck/test:run/build passed; `test:run` 11 files/41 tests.
- Clearly label manual visual and authenticated backend integration as pending; no screenshots were created.

## Limitaciones y próximos pasos
- pending generated-type task; pending visual/browser evidence; pending authenticated end-to-end multipart/Bearer verification; no listing or post-create integration in scope.
```

## Evidence paths and images

Existing image paths relevant to this topic are `docs/images/formato-ZIP.png` and `docs/images/secuencia-importacion-zip.png`; neither was opened or validated as an accurate screenshot of the current frontend. The current contest change has **no** feature screenshots. `docs/capturas/` exists but contains only unrelated project/process captures (backlog, DoR/DoD, repository, Jira, UML/project setup). Therefore the target document should contain **no image link** unless a writer explicitly verifies relevance; do not use non-existent suggested paths such as `docs/capturas/uj08-*.png` or `docs/capturas/uj09-*.png`.

## Review Findings

- **HIGH — `frontend/src/lib/auth/auth-transport.ts:7-14`, `frontend/src/lib/api/http-client.ts:153-158`:** a Bearer-capable abstraction/configuration export exists, but no application call site configures the shared client. The document must say Bearer is abstraction-supported/pending external session integration, not that this screen demonstrably sends an authenticated request.
- **HIGH — `frontend/src/types/api.generated.ts:93-136` vs. `frontend/src/features/contests/types.ts:15-18`, `CreateContestPage.tsx:77-90`:** generated contract evidence does not type a 200 body while the feature/UI and MSW assume `codigo`/`mensaje`. Do not expose this contract defect in the user-facing history; retain it as a release/integration risk and avoid claiming backend confirmation.
- **MEDIUM — `CreateContestPage.test.tsx:17-50`:** page tests only cover initial safe render and add/remove reindexing. They do not cover actual submit pending/success/400/401/cancel behavior despite those being implemented.
- **MEDIUM — `schema.test.ts:18-50`:** three broad schema tests do not independently evidence all stated constraints (e.g., description/code/date/URL/ZIP-required/freezing-negative/time positivity).
- **MEDIUM — `tasks.md:7-9` and `:402-414`:** manual MSW/browser, authenticated backend integration and final handoff are pending; no captures exist.
- **LOW — working tree baseline:** source changes are already present and unstaged in contest/API/router/MSW areas; this scouting task made no source edit and must not be represented as implementation ownership.

## Start Here

Open `frontend/src/features/contests/CreateContestPage.tsx` first: it is the single composition point for user-visible headings, controls, layout, pending state, results and navigation. Then use `schema.ts` and `mapper.ts` to keep the history’s validation and multipart descriptions exact.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Concrete read-only findings cite exact frontend, OpenSpec, test, routing, API/auth, MSW, task-status and image paths; severities and residual risks are recorded."
    }
  ],
  "changedFiles": [
    ".pi-subagents/artifacts/outputs/be1c1b24/uj08-uj09-doc-scout.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [
    {
      "command": "target existence/status/path inspection and read-only grep/find/nl mapping",
      "result": "passed",
      "summary": "Confirmed destination missing; mapped artifacts, implementation, tests, image inventory and current working-tree status without running tests or OpenSpec CLI."
    },
    {
      "command": "OpenSpec CLI/tests",
      "result": "not-run",
      "summary": "Explicitly prohibited by the task."
    }
  ],
  "validationOutput": [
    "Target history document does not exist.",
    "Prior verifier artifacts record format/lint/typecheck/build passed and test:run passed 11 files/41 tests; this scout did not rerun them.",
    "No verified contest screenshot exists; no image link is recommended."
  ],
  "residualRisks": [
    "Authenticated end-to-end integration remains pending because no application call site configures shared-client AuthTransport.",
    "Generated API evidence does not type the success body consumed by the feature; keep the user-facing history factual and do not present it as confirmed backend behavior.",
    "Manual visual/browser evidence and captures remain pending.",
    "Some implemented feedback and validation behavior has limited direct page/schema test coverage."
  ],
  "noStagedFiles": true,
  "diffSummary": "Read-only evidence mapping; only the required scout artifact was created.",
  "reviewFindings": [
    "high: frontend/src/lib/auth/auth-transport.ts:7-14 and frontend/src/lib/api/http-client.ts:153-158 - Bearer abstraction is not configured by an application call site.",
    "high: frontend/src/types/api.generated.ts:93-136 versus frontend/src/features/contests/types.ts:15-18 - feature success body lacks matching generated response evidence.",
    "medium: frontend/src/features/contests/CreateContestPage.test.tsx:17-50 - submit feedback/cancel paths are not directly tested.",
    "medium: docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md:7-9 - manual and authenticated integration evidence is pending."
  ],
  "manualNotes": "Do not add image links to the requested history until a relevant current-feature image is verified. The proposed outline intentionally avoids Swagger/contract defects, secrets and unimplemented behavior."
}
```
