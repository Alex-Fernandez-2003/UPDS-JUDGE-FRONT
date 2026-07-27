# Tasks

## Estado de implementación — 2026-07-26

- [x] Tasks 1-10: baseline, historias, inventario de archivos, rutas, contratos
  backend, queries y mocks inspeccionados. El conflicto preexistente de
  `router.tsx` entre UJ-07 y UJ-20 fue resuelto conservando ambos imports.
- [x] Tasks 11-21: UJ-07 integrada desde la feature movida
  `features/administration`: ruta `/admin/roles`, `AdminLayout`, guard
  `AdministradorRoles`, sidebar, endpoints centralizados y mutations con
  invalidación exacta.
- [x] Tasks 22-32: UJ-20 integrada en `/student/history` bajo `UserLayout`, con
  navegación principal, endpoint global autenticado, filtros `concursoCodigo` y
  `resultado`, query key parametrizada, limpieza, reinicio de página y
  paginación server-side de 20 filas.
- [x] Task 33: UJ-20 permanece fuera de `Acceso de Usuario`; no hay evidencia
  contractual para exponer el historial global bajo administración.
- [x] Tasks 34-39: pruebas de navegación UJ-07, operaciones centralizadas y
  serialización/query key UJ-20 agregadas; las tablas reciente, contextual y
  global conservan endpoints y responsabilidades separadas.
- [x] Tasks 41-46: historias y esta evidencia actualizadas; lint, typecheck,
  109 tests, build, dev y auditoría del diff ejecutados.

## Matriz de trazabilidad resumida

| Historia | Archivo documentado | Estado inicial | Acción aplicada | Estado final |
| --- | --- | --- | --- | --- |
| UJ-07 | `features/roles/*` | Movido a `features/administration` | Reutilizado e integrado | Integrado |
| UJ-07 | `routes/router.tsx` | Conflicto sin resolver | Ruta y guard conectados | Integrado |
| UJ-07 | `lib/api/endpoints.ts` | Faltaba catálogo Roles | Endpoints contractuales | Integrado |
| UJ-20 | `features/history/*` | Parcial, sin filtros | Query, filtros y paginación conectados | Integrado |
| UJ-20 | `features/contest/user/RecentSubmissionsTable.tsx` | Casing/ruta desactualizada | Reutilizado desde `features/contests/user` | Integrado |
| UJ-20 | `components/tables/DataTable.tsx` | Ruta desactualizada | Reutilizado desde barrel existente | Integrado |
| UJ-20 | `lib/api/httpClient.ts` | Nombre desactualizado | Reutilizado `lib/api/http-client.ts` | Integrado |

## Evidencias pendientes

- Validación visual manual autenticada de UJ-07 y UJ-20 en escritorio, tablet y
  móvil. No bloquea las validaciones técnicas.
