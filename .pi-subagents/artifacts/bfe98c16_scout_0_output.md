# Code Context

## Files Retrieved

1. `README.md` (lines 1-119) — root README currently contains stale claims that `frontend/` is absent, although it is present.
2. `docs/01-contexto-y-diagnostico.md` (lines 3-73) — authoritative project card, current academic status, documented team roster, problem/process/stakeholders.
3. `docs/02-mvp-y-propuesta-valor.md` (lines 26-60, 62-119) — MVP scope and exclusions.
4. `docs/03-product-backlog.md` (lines 11-39, 41-365) — five epics, 15 backlog IDs, priorities, points, acceptance criteria and traceability.
5. `docs/04-dor-y-refinamiento.md` (lines 5-166) — DoR, cross-cutting rules, proposed ZIP format, API proposal, DoD, security/risk gaps.
6. `docs/05-modelado-uml.md` (lines 9-111) — actors, architecture responsibilities and UML-to-backlog mapping.
7. `docs/06-arquitectura-datos.md` (lines 5-155) and `database/script-inicial.sql` (lines 1-105) — proposed PostgreSQL/Identity data architecture and actual SQL domain schema.
8. `docs/07-plan-ready-to-sprint.md` (lines 7-109) — repo separation, sprint mapping, conditional readiness, risk mitigations; contains stale statement that frontend is absent.
9. `docs/08-sprint-0-fabrica-software.md` (lines 7-38, 220-338, 342-411) — Sprint 0 plan, Git/process conventions, team suggested operational roles, documented evidence references; several evidence claims/links are false.
10. `docs/informe-final.tex` (lines 1-218) — report metadata: title, project type, listed members, July 2026; also stale frontend-absent narrative.
11. `docs/README.md` (lines 1-22) — documentation index.
12. `docs/openspec/changes/sprint-0-initialize/{proposal,tasks}.md` — Sprint 0 scope and task state: technical initialization complete; manual captures pending.
13. `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/{proposal,tasks}.md` (tasks lines 656-669) — current frontend foundation closure statement: technical foundation complete, captures pending, UJ-5/6/8/9 unimplemented.
14. `docs/openspec/config.yaml` — OpenSpec configuration. No `archive/` directory exists under `docs/openspec/`.
15. `frontend/package.json` (lines 1-44), `frontend/.env.example` (lines 1-9), `frontend/vite.config.ts` (lines 1-29) — actual frontend stack, scripts, public examples, port/proxy configuration.
16. `frontend/README.md` (lines 1-101) and `frontend/docs/guia-arquitectura-y-desarrollo.md` (lines 1-350) — team-facing frontend foundation guide, scope and contribution rules.
17. `frontend/src/config/env.ts` (lines 1-40), `frontend/src/lib/api/http-client.ts` (lines 1-126), `frontend/src/routes/{constants,router}.tsx` (lines 1-36) — enforced environment, HTTP boundary, reserved routes and development catalog.
18. `frontend/src/types/api.generated.ts` (lines 1-160) — generated backend contract evidence; only confirmed generated paths should be described as contract-derived.
19. `.git` state / `git log` — local branch is `develop` tracking `origin/develop`; remotes point to `Alex-Fernandez-2003/UPDS-JUDGE-FRONT`; branches include `main` and `develop`.

## Key Code

### README facts safe to state

**Description and objective (documented proposal, not all implemented):** UPDS JUDGE is an academic project for a web platform that manages competitive-programming contests and automatic evaluation. It centralizes contest configuration, participants, problem sets, source submissions, verdicts, rankings and history. Source: `docs/01-contexto-y-diagnostico.md:25-40`; MVP intent: `docs/02-mvp-y-propuesta-valor.md:26-60`.

**MVP exclusions:** it is not a complete LMS, collaborative browser IDE, plagiarism detector, or general university-management system; it must not expose test cases or Judge0 secrets and upsolving must not affect official rankings (`docs/02-mvp-y-propuesta-valor.md:30-45`).

**Documented team roster (names only):** Wilson Yucra Rengifo; Cristhian Joel Amador Gallardo; Arnold Daniel Torrez Zarate; Daniel Javier Aramayo Mancilla; Enny Anaí Lopez Saldaña Beymar; Beymar Angelo Vasquez Acha; Alex Saul Fernandez Valdez (`docs/01-contexto-y-diagnostico.md:15-23`). Do not silently use root README’s variants “Angelo Vasquez Acha” / “Enny Anaí Lopez Saldaña Beymar”; the sources conflict.

**Operational roles are explicitly “suggested,” not confirmed ownership:** Alex Saúl Fernández Valdez: squad coordination, technical/document support, and PR reviewer; Wilson Yucra: backend; Enny Anaí Lopez Saldaña Beymar and Beymar Angelo Vasquez Acha: tester/assets roles. Cite with qualification from `docs/08-sprint-0-fabrica-software.md:258-268`. The tester row contains a malformed trailing ``main`` and inconsistent naming, so do not present roles as unquestionable fact.

### Backlog and current state

- Five epics: E01 identity/access, E02 contest configuration, E03 participation, E04 submission/evaluation, E05 ranking/history (`docs/03-product-backlog.md:13-19`).
- Exactly 15 supplied stories: `UJ-05`, `UJ-06`, `UJ-07`, `UJ-08`, `UJ-09`, `UJ-10`, `UJ-11`, `UJ-12`, `UJ-13`, `UJ-14`, `UJ-15`, `UJ-16`, `UJ-18`, `UJ-19`, `UJ-20`; no `UJ-17` must be invented (`docs/03-product-backlog.md:23-39`).
- Planning mapping uses IDs without leading zero: Sprint 1 = UJ-5, 6, 8, 9; Sprint 2 = UJ-10..15; Sprint 3 = UJ-18, 19, 7, 16, 20 (`docs/07-plan-ready-to-sprint.md:62-78`). Normalize in README as UJ-05/UJ-06/UJ-08/UJ-09 while noting it is the same plan.
- Sprint 0 initialization is technically completed except manual captures (`docs/openspec/changes/sprint-0-initialize/tasks.md`, Task 15 pending; Tasks 1-14, 16-17 completed).
- Sprint 1 **foundation** is completed: tooling, API client/errors, generated OpenAPI types, query, MSW infrastructure, UI primitives/layouts, `/dev/ui`, docs and validations. It explicitly did **not** implement UJ-05, UJ-06, UJ-08 or UJ-09 (`docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md:656-669`). Therefore describe current code as “foundation complete; product stories remain pending,” not “Sprint 1 complete.”
- No archived OpenSpec changes are present; only two active change folders exist. Do not infer archival/completion lifecycle beyond each task file’s text.

### Architecture, technology, run instructions

- Repository separation is documented: this frontend repo and a separate backend repo at `https://github.com/wilsonyucra413-sys/UPDSjudge`; backend responsibilities are ASP.NET Core MVC/Web API, Identity, EF Core, Judge0, SignalR and migrations (`docs/08-sprint-0-fabrica-software.md:11-20`). The backend URL is internally inconsistent with old root README/informe claims that it is pending; use the documented URL but label integration/runtime backend as unverified locally.
- Actual frontend: React 19, Vite 8, TypeScript 6, React Router, TanStack Query, Tailwind 4, MSW, React Hook Form, Zod, Vitest/RTL, Oxlint, Prettier and Lucide (`frontend/package.json:1-44`, guide lines 59-76).
- Actual commands, run inside `frontend/`: `npm install`; copy `.env.example` to `.env.local`; `npm run dev`. Scripts available: dev/build/preview/lint/typecheck/format/format:check/test/test:run/api:types (`frontend/package.json:5-16`, `frontend/README.md:69-82`). Development and preview are strict on `http://localhost:8085` (`frontend/vite.config.ts:15-19`).
- Public env example: `VITE_APP_NAME`, relative `VITE_API_BASE_URL=/api`, positive `VITE_REQUEST_TIMEOUT_MS`, boolean `VITE_ENABLE_MOCKS`; Vite-only `API_PROXY_TARGET=http://localhost:5185`; Node-only `OPENAPI_SCHEMA_URL=http://localhost:5185/swagger/v1/swagger.json` (`frontend/.env.example:1-9`). Never include secrets in `VITE_*` (`frontend/README.md:33-43`).
- The Vite proxy is configurable and defaults to port 5185; this is configuration, not proof a backend runs (`frontend/vite.config.ts:7-20`).
- Components/pages must not call `fetch` directly; `HttpClient` is the actual transport boundary (`frontend/src/lib/api/http-client.ts:1-126`; frontend guide lines 113-124). Current routes `/login`, `/register`, `/admin/contests`, `/admin/contests/new` are expressly placeholders/reserved, while `/dev/ui` only registers in development (`frontend/src/routes/router.tsx:7-36`).
- `api.generated.ts` has generated endpoints including `POST /api/Auth/login`, `/api/Auth/register`, and `/api/Concursos/crear`; case and route shapes differ from proposed docs API table. Treat generated contract as current frontend contract evidence, but do not claim product UI implementation (`frontend/src/types/api.generated.ts:1-160`).

### Data shape and security/testing

- PostgreSQL schema actually versioned is a domain bootstrap, not full Identity migrations: enum states and tables `concursos`, `participantes_concursos`, `problemas`, `casos_prueba`, `lenguajes`, `envios`, `resultados_casos`, `auditoria_roles`; seed language mapping C++/Python/C# (Judge0 IDs 54/71/51) (`database/script-inicial.sql:1-105`). Identity tables/migrations belong to ASP.NET Core backend and are not in this repo.
- Security requirements/proposals: no plaintext passwords; backend validates roles; test inputs/expected outputs private; frontend never receives Judge0/database credentials; upsolving excluded from official rank (`docs/04-dor-y-refinamiento.md:41-52`). ZIP design is still pending final validation (`docs/04-dor-y-refinamiento.md:54-85`).
- DoR and DoD can be linked to `docs/04-dor-y-refinamiento.md`, rather than copied in full. DoR is lines 5-39; DoD lines 148-158.
- Current frontend guide says the foundation test suite covers environment, HTTP, MSW, components, layouts and routes (`frontend/docs/guia-arquitectura-y-desarrollo.md` lines 286-303); OpenSpec closure records prior passing `format:check`, `lint`, `typecheck`, `test:run`, and `build` (`tasks.md:660-663`). This scout did not execute tests.

### Git/process

- Actual checkout: `develop...origin/develop`; local and remote `main`/`develop`; root Git remote is this frontend repository. Recent history uses `docs:` and `feat:` prefixes, consistent with the suggested convention.
- Proposed workflow: branch from `develop`, one task/story branch, PR to `develop`, another member reviews, merge only after DoD, then integrate `develop` to stable `main` at sprint end (`docs/08-sprint-0-fabrica-software.md:270-283`). Branch prefixes: feature/fix/docs/chore; commits `tipo: descripción breve`; types feat/fix/docs/chore/refactor/test (`lines 285-325`). This is documented process guidance, not an enforced server policy.

## Architecture

`frontend/` is now a real, self-contained React/Vite client within the repository root. It validates browser-safe configuration, proxies relative `/api` during development, centralizes HTTP in `src/lib/api`, generates DTO types from a backend OpenAPI URL, supplies a neutral in-memory auth transport and Query/MSW infrastructure, then provides reusable UI/layout/routing foundation for later stories. It does not deliver actual login/registration/contest/ZIP flows.

`docs/` holds the academic product/design corpus plus PlantUML sources, rendered diagrams and captures. `database/script-inicial.sql` is only the PostgreSQL domain reference. The backend is a separately documented repository; its service availability, migration state, Judge0/SignalR deployment and end-to-end integration cannot be proven from this checkout.

## Link inventory and verified targets

Safe existing relative links for a root README:

- Documentation index and docs 01–08: `docs/README.md`, `docs/01-contexto-y-diagnostico.md` through `docs/08-sprint-0-fabrica-software.md` — all exist.
- Report source/PDF: `docs/informe-final.tex`, `docs/informe-final.pdf` — exist.
- SQL: `database/script-inicial.sql` — exists.
- Frontend guide: `frontend/README.md`, `frontend/docs/guia-arquitectura-y-desarrollo.md` — exist.
- OpenSpec artifacts: `docs/openspec/changes/sprint-0-initialize/{proposal,design,spec,tasks}.md` and `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/{proposal,design,spec,tasks}.md` — exist.
- Diagrams: all files listed in `docs/images/` and sources listed in `docs/puml/` exist (10 PNG diagrams; 7 PUML sources).
- Existing captures: `docs/capturas/backlog-historias-usuario.jpg`, `estructura-repositorio.png`, `modelo-datos-original.png`, `ramas.png`, `tablero-jira.png` — exist.

Do **not** link these missing files: `docs/capturas/issues-sprint-0.png`, `docs/capturas/react-vite-sprint-0.png`, `docs/capturas/dod-dor-readme.png`. `docs/08-sprint-0-fabrica-software.md:399` also has a malformed `issues-sprint-0.png.png` target. The evidence table wrongly marks all three unavailable captures as available (`lines 344-357`).

Root README’s own current markdown targets under `docs/` exist. It should remove its false present-tense assertions that `frontend/` and its scripts/config are absent.

## Findings / ambiguities — do not invent

1. **High — stale root README:** `README.md` states `frontend/` and `frontend/package.json` do not exist, contradicting the actual files. Rewrite must replace this entire state description, not preserve it.
2. **High — stale academic docs/informe:** docs 07/08 and `informe-final.tex` repeatedly state frontend is absent. A root README must privilege current filesystem and current Sprint-1 OpenSpec status; do not repeat those claims.
3. **High — non-existent capture links:** document 08 claims three unavailable captures as existing and contains a `.png.png` typo. Exclude them from the root README.
4. **Medium — roster spelling conflict:** root README says “Angelo Vasquez Acha,” while docs 01 says “Beymar Angelo Vasquez Acha”; names also differ in the suggested-role table. Use exact docs-01 roster or omit team list until normalized.
5. **Medium — backend URL conflict:** old root README/informe call backend URL pending, whereas docs 01/07/08 provide a URL. State the provided URL as documented, but do not claim it is operational or integrated.
6. **Medium — API contract drift:** proposed docs API use lowercase plural REST paths, but generated OpenAPI types expose case-sensitive/controller-shaped paths. README should say OpenAPI is source of truth and avoid enumerating speculative routes.
7. **Medium — Sprint terminology:** Sprint-1 foundation technical work is closed, while Sprint-1 product stories UJ-05/06/08/09 remain unimplemented. Avoid a blanket “Sprint 1 completed.”
8. **Medium — code lacks feature implementation:** reserved routes intentionally render placeholders; claiming functional login, registration, contest management or ZIP import would be false.
9. **Low — plan typo:** docs 07 calls IDs `UJ-5` etc.; canonical backlog uses `UJ-05` etc. Preserve leading-zero canonical IDs.

## Start Here

Open `README.md` first to replace its obsolete repository-state section. Then use `frontend/README.md` as the current operational source, and `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md:656-669` as the authoritative current foundation/product-story status boundary.