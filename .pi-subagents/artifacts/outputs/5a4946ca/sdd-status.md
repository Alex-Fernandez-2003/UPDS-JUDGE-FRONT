# SDD Status: `sprint-1-frontend-core-api-ui-foundation`

**Generated:** Read-only exploration of the change artifacts and workspace state  
**Engine Authority:** Authoritative (OpenSpec store present on disk)  
**Artifact Store:** `openspec`

---

## Change Selection

- **Change name provided explicit:** `sprint-1-frontend-core-api-ui-foundation`
- **Resolved as exact match:** Confirmed change exists at `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`
- **Workspace root:** `C:\dev\UPDS-JUDGE-FRONT` (git repo, Sprint 0 scaffold committed)

---

## Structured Status

| Field | Value |
|-------|-------|
| **schemaName** | `spec-driven` |
| **changeName** | `sprint-1-frontend-core-api-ui-foundation` |
| **artifactStore** | `openspec` |
| **planningHome.root** | `C:\dev\UPDS-JUDGE-FRONT` |
| **planningHome.changesDir** | `docs/openspec/changes` |
| **changeRoot** | `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/` |

### Artifact Paths & Context Files

| Artifact | Path(s) | Status |
|----------|---------|--------|
| proposal | `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/proposal.md` | `done` |
| specs | `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/spec.md` | `done` |
| design | `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/design.md` | `done` |
| tasks | `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md` | `done` |
| applyProgress | *(not present)* | `missing` |
| verifyReport | *(not present)* | `missing` |
| syncReport | *(not present)* | `missing` |

### Task Progress

| Metric | Count |
|--------|-------|
| **Total tasks** | 49 |
| **Complete** | 0 |
| **Remaining** | 49 |
| **Deferred parent actions** | 0 |
| **Task artifact errors** | 0 |

All 49 tasks are legacy implementation-owned (no `sdd-owner` markers present). None use markdown checkboxes `[ ]` — tasks are defined in structured section/bullet format. All are unchecked by default.

### Unchecked Implementation Tasks (49)

| # | Task Title | Dependencies |
|---|-----------|-------------|
| 1 | Inspeccionar el change y las convenciones OpenSpec | None |
| 2 | Inspeccionar la fundación creada en Sprint 0 | Task 1 |
| 3 | Revisar dependencias, scripts y configuraciones existentes | Task 2 |
| 4 | Inspeccionar backend local, Swagger y autenticación | Task 1 |
| 5 | Registrar estado inicial con Git | Tasks 2, 3 |
| 6 | Instalar dependencias aprobadas de tooling y runtime | Tasks 3, 5 |
| 7 | Configurar puertos y proxy de Vite | Task 6 |
| 8 | Configurar el alias de importación | Task 6 |
| 9 | Configurar Prettier y EditorConfig | Task 6 |
| 10 | Configurar Tailwind CSS | Tasks 6, 7 |
| 11 | Configurar Vitest y React Testing Library | Tasks 6, 8 |
| 12 | Completar scripts npm de la fundación | Tasks 7, 8, 9, 11 |
| 13 | Crear el contrato de entorno tipado | Tasks 11, 12 |
| 14 | Diseñar el modelo interno de errores API | Tasks 11, 13 |
| 15 | Implementar el adapter de Problem Details | Tasks 4, 14 |
| 16 | Crear el cliente HTTP compartido | Tasks 13, 14, 15 |
| 17 | Restringir el uso directo de fetch | Task 16 |
| 18 | Crear la fuente central de endpoints | Task 4 |
| 19 | Configurar generación de tipos OpenAPI | Tasks 4, 12 |
| 20 | Manejar indisponibilidad de OpenAPI | Task 19 |
| 21 | Crear abstracciones de autenticación | Tasks 4, 16 |
| 22 | Configurar QueryClient y provider | Tasks 6, 11 |
| 23 | Crear la infraestructura base de MSW | Tasks 13, 22 |
| 24 | Crear fixtures y builders seguros | Task 23 |
| 25 | Crear handlers únicamente para contratos confirmados | Tasks 18, 19, 24 |
| 26 | Crear tokens visuales semánticos | Task 10 |
| 27 | Crear utilidades de variantes y clases | Tasks 6, 26 |
| 28 | Crear BrandMark y primitivas de presentación | Tasks 26, 27 |
| 29 | Crear átomos de acciones | Tasks 27, 28 |
| 30 | Crear átomos de formulario | Tasks 27, 29 |
| 31 | Crear átomos de estado y feedback | Tasks 26, 27 |
| 32 | Crear FormField y moléculas de entrada | Tasks 30, 31 |
| 33 | Crear moléculas de navegación y resumen | Tasks 29, 31 |
| 34 | Crear FileDropzone y EmptyState | Tasks 29, 30, 31 |
| 35 | Crear primitivas de tabla administrativa | Tasks 29, 31, 33 |
| 36 | Crear AuthLayout | Tasks 28, 29, 30 |
| 37 | Crear AdminLayout | Tasks 28, 29, 31, 33 |
| 38 | Configurar React Router y constantes de rutas | Tasks 22, 36, 37 |
| 39 | Crear el catálogo interno /dev/ui | Tasks 24, 26, 28-38 |
| 40 | Completar pruebas de entorno y API | Tasks 13-17 |
| 41 | Completar pruebas de componentes | Tasks 28-35 |
| 42 | Completar pruebas de layouts, rutas y mocks | Tasks 23, 25, 36-39 |
| 43 | Documentar la fundación para el equipo | Tasks 12, 13, 16, 19, 22, 23, 38, 39 |
| 44 | Ejecutar validaciones técnicas | Tasks 40-43 |
| 45 | Verificar proxy y contrato (backend disponible) | Tasks 4, 7, 16, 18, 44 |
| 46 | Auditar exclusiones y áreas protegidas | Tasks 44, 45 |
| 47 | Revisar evidencias manuales | Tasks 39, 44, 45 |
| 48 | Validar OpenSpec y actualizar estados reales | Tasks 46, 47 |
| 49 | Cerrar sin commit ni push | Task 48 |

### Apply State

| Determination | Value |
|---------------|-------|
| **applyState** | `ready` |
| **Rationale** | Specs, design, and tasks exist. All 49 tasks are unchecked (none complete). Action context is safe (repo-local, edit roots available). |

### Dependencies

| Phase | Status | Condition |
|-------|--------|-----------|
| **apply** | `ready` | specs ✓, design ✓, tasks ✓, ≥1 unchecked task ✓, safe context ✓ |
| **verify** | `blocked` | No apply-progress file; no implementation applied yet; not verifying |
| **sync** | `blocked` | No verify-report exists |
| **archive** | `blocked` | Unchecked tasks remain (49); no verify-report or sync-report |

### Action Context

```json
{
  "mode": "repo-local",
  "workspaceRoot": "C:\dev\UPDS-JUDGE-FRONT",
  "allowedEditRoots": [
    "C:\dev\UPDS-JUDGE-FRONT\frontend",
    "C:\dev\UPDS-JUDGE-FRONT\docs\openspec\changes\sprint-1-frontend-core-api-ui-foundation"
  ],
  "warnings": [
    "Forecast estimates 2,500–5,000 LoC total, exceeding the 400 LoC per-component review budget for most layers — consider chained internal PRs as recommended by the review workload forecast.",
    "apply-progress.md does not exist: progress tracking not initialized.",
    "Backend OpenAPI schema URL not yet confirmed (Task 4 / Risk 1); tasks 4, 15, 18, 19, 20, 21, 25, 45 are affected."
  ]
}
```

**Allowed Edit Roots Detail:**
Per the design and proposal, edits are confined to:

1. **`frontend/`** — all code, config, components, tests, documentation
2. **`docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`** — change artifacts only (already populated)

Protected areas (per spec Non-Goals): `backend/`, `database/`, root `README.md`, academic docs in `docs/`, any files outside `frontend/` and `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`.

### Next Recommended

```
sdd-apply --change sprint-1-frontend-core-api-ui-foundation
```

The change is fully planned and ready for implementation. 49 unchecked tasks remain. The parent should initiate the apply phase.

---

## Review Findings

1. **info: tasks.md** — No markdown checkboxes `[ ]` are used. The 49 tasks are defined in structured section format without completion tracking. Apply will need to add checkbox tracking or rely on an external progress mechanism (apply-progress.md). This is a structural observation, not a blocker.
2. **warning: review-budget** — The forecast estimates 2,500–5,000 LoC (excluding lockfile/generated types), exceeding the 400 LoC per-component threshold. The tasks.md itself recommends chained PRs. The parent should plan for chanded/segmented review.
3. **info: blocking-dependencies** — Task 4 (OpenAPI discovery) gates tasks 15, 18, 19, 20, 21, 25, and 45. The design documents this as a known Risk 1 with mitigation: progress on non-contractual work while contractual tasks remain pending.
4. **info: sprint-0 foundation** — Existing scaffold includes Vite 8, React 19, TypeScript 6, oxlint, and empty `.gitkeep` dir
