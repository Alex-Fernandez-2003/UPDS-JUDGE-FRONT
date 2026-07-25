# User Flow Second Audit

## 1. Scope and method
Read-only inspection completed. CodeGraph was unavailable; filesystem reads/searches were used. No source, documentation, backend, or configuration file was modified.

## 2. Requested OpenSpec artifact
**Blocker:** `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-style/` is absent in the current workspace. Therefore its proposal, design, spec, and tasks cannot be audited.

Search evidence: the exact slug appears only in historical `.pi-subagents` artifacts, not as a current OpenSpec change directory.

## 3. Available documentation
Relevant current documentation is `docs/historias/UJ-11-lista-concursos-filtrados.md`; it documents the UJ-11 dashboard/list implementation, not the requested UJ-12 change.

Historical artifact `.pi-subagents/artifacts/outputs/65ca931f/integrate-user-flow.md` records that a similarly named change existed previously and had unresolved UJ-13/detail-flow dependencies. It is historical evidence, not a current authoritative OpenSpec artifact.

## 4. Existing user routing and layout
- Canonical user route: `/student/concursos`.
- Legacy `/student` redirects to `/student/concursos`.
- User route is protected by `ProtectedRoute` and `RoleRoute` requiring `Usuario`.
- `UserLayout` provides branding, user navigation, identity, and logout.
- Contest-submissions route exists as `/student/contest/:contestCode/submissions`.

Evidence: `frontend/src/routes/router.tsx`, `frontend/src/routes/constants.ts`, `frontend/src/layouts/UserLayout/index.tsx`.

## 5. Current dashboard composition
`UserDashboardPage` composes:
- `UserWelcome`
- `UserContestsPage`
- `RecentSubmissionsSection`
- `UserContestStatsSection`

Desktop uses a primary-content/aside grid; mobile collapses by DOM order. Evidence: `frontend/src/features/contests/user/pages/UserDashboardPage.tsx`.

## 6. Backend contest-detail contract
Backend exposes:

```http
GET /api/Concursos/dashboard/{codigo}
Authorization: Bearer <Usuario token>
```

Returned fields include:
- `codigo`, `nombre`, `estadoTiempo`, `cantidadParticipantes`
- `fechaFin`, `minutosCongelamiento`, `segundosRestantes`
- `urlSetProblemas`, `problemasResueltos`, `totalProblemas`, `intentosTotales`
- `problemas[]`: `inciso`, `titulo`, `tiempo`, `memoria`, `intentos`, `estado`, `resuelto`

Access policy:
- nonexistent/inactive contest: `404`;
- upcoming contest: denied;
- private contest: allowed only for enrolled user or creator;
- public active/finished contest: allowed.

Evidence: `C:/dev/UPDSjudge/Controllers/ConcursosController.cs:~790-910`.

## 7. Backend submissions contract
Backend exposes:

```http
GET /api/Envios/mis-envios?resultado&concursoCodigo&inciso&pagina&tamanoPagina
Authorization: Bearer <Usuario token>
```

Response:

```ts
{
  total: number
  pagina: number
  tamanoPagina: number
  datos: Array<{
    idEnvio: number
    concursoCodigo: string
    problemaTitulo: string
    inciso: string
    lenguaje: string
    veredicto: string
    consumoTiempo: float
    consumoMemoria: int
    fechaEnvio: DateTime
  }>
}
```

Constraints:
- `pagina < 1` becomes `1`;
- page size outside `1..50` becomes `20`;
- only submissions from contests with `estado == "Activo"` are listed;
- no filename/file field is projected;
- `Pendiente` is created by `POST /api/Envios`.

Evidence: `C:/dev/UPDSjudge/Controllers/EnviosController.cs`, `C:/dev/UPDSjudge/Models/Envio.cs`.

## 8. Existing UJ-11 recent-submissions implementation
The UJ-11 dashboard path is contract-aligned in these areas:
- requests `pagina=1` and `tamanoPagina=5`;
- preserves prior query data via TanStack Query `placeholderData`;
- refreshes only the submissions query with `refetch`;
- prevents duplicate refresh while fetching;
- has centralized metric, verdict, date, row, and pagination mappers;
- omits `Archivo`, consistent with the backend projection;
- maps backend `Pendiente` to `EVALUANDO`.

Evidence: `frontend/src/features/contests/user/{types,service,hooks,mapper,RecentSubmissionsSection,RecentSubmissionsTable}.ts*`.

## 9. Confirmed hardcodes
The separate contest-submissions flow contains unsupported hardcodes:
- contest title: `I Olimpiada de Programación UPDS`;
- contest duration: `4 horas`;
- exactly five generated contest problems;
- generated problem labels `A` through `E`;
- `SubmitForm` fallback problems `Matriz dispersa`, `Secuencia creciente`, `Caminos mínimos`;
- language IDs/options `1/2/3`.

Evidence: `frontend/src/features/submissions/Pages/SubmissionsPage.tsx`, `components/submitForm.tsx`, `components/submissionsTable.tsx`.

These must be replaced by the `/api/Concursos/dashboard/{codigo}` contract before treating the route as a real UJ-12/contest-detail flow.

## 10. Contract defects in the existing submissions feature
1. **POST payload mismatch — blocker.**  
   Frontend sends `codigoConcurso`, `incisoProblema`, `idLenguaje`, `codigoFuente`; backend requires `codigo`, `inciso`, `extension`, `codigoFuente`, optional `contrasena`.  
   Evidence: `frontend/src/features/submissions/Types/sumbitTypes.ts`; `C:/dev/UPDSjudge/DTOs/EnvioDto.cs`.

2. **Endpoint mismatch risk — blocker.**  
   Frontend creates via `/envios`, while backend’s controller route is `/api/Envios`. The shared client adds `/api`, but the backend action is configured as `POST /api/Envios`; casing is likely tolerated by ASP.NET routing but must not be assumed as the only issue because the payload is incompatible.  
   Evidence: `frontend/src/lib/api/endpoints.ts`, `frontend/src/features/submissions/Types/sumbitService.ts`, backend controller.

3. **Memory unit contradiction — high.**  
   `SubmissionsTable` renders `${consumoMemoria} KB`, while UJ-11’s implemented mapper and documentation use `MB`. The backend model declares `int memoria` but does not state units in source; a live authenticated validation is required to establish the UJ-12 display unit.  
   Evidence: `frontend/src/features/submissions/components/submissionsTable.tsx`, `frontend/src/features/contests/user/mapper.ts`, `docs/historias/UJ-11-lista-concursos-filtrados.md`.

4. **Duplicated submissions transports/types — high.**  
   `features/submissions/Types/submissionsService.ts` and `sumbitService.ts` define distinct paths and contracts for the same domain. This risks divergent behavior and makes a UJ-12 integration unsafe without consolidation.

## 11. Test coverage
UJ-11 recent-submission tests cover:
- units, zero/null/non-finite values;
- verdict mappings;
- metadata calculation;
- required table columns and absence of `Archivo`;
- query parameters;
- duplicate-refresh prevention.

Evidence: `frontend/src/features/contests/user/user-dashboard.test.tsx`.

No observed tests cover:
- `/api/Concursos/dashboard/{codigo}`;
- real contest-detail access states;
- UJ-12 route composition;
- POST payload compatibility;
- removal of hardcoded contest/problem data;
- the existing submission page’s KB/MB behavior.

## 12. Runtime and integration configuration
- Frontend serves/proxies `/api` through Vite.
- Default proxy target is `http://localhost:5185`.
- Frontend API base URL is relative (`/api`).
- Backend CORS allows only `http://localhost:8085`.

Evidence: `frontend/vite.config.ts`, `frontend/src/config/env.ts`, `C:/dev/UPDSjudge/Program.cs`.

No live authenticated request was made; no token was inspected or exposed.

## 13. Classification
| Finding | Classification |
|---|---|
| Requested OpenSpec change missing | Blocker |
| No current proposal/design/spec/tasks to audit | Blocker |
| UJ-12 detail route/frontend client absent | Blocker |
| Submission creation DTO mismatch | Blocker |
| Fabricated contest/problem metadata | Blocker for real user flow |
| Duplicate submission services/types | High |
| KB vs MB inconsistency | High |
| Live authenticated backend validation absent | Required validation |
| Responsive/keyboard validation absent | Required manual validation |

## 14. Recommendation
Do not implement against the absent OpenSpec directory. First restore or provide the authoritative `integrate-user-contest-flow-uj12-routing-layout-style` artifacts. Then define the UJ-12 frontend around `GET /api/Concursos/dashboard/{codigo}`, replace all contest/problem hardcodes, reconcile the submission-create DTO with backend, consolidate duplicate submission services/types, and validate units against an authenticated response at port 5185.