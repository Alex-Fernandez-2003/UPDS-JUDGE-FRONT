# Tasks

## Fase 0 — Baseline y límites

- [x] Detectar la raíz real, la rama `develop` y el estado inicial de Git.
- [x] Registrar el change documental como contenido no rastreado preexistente.
- [x] Registrar guardas de `frontend/`, `docs/informe-final.tex`, `docs/capturas/` y `docs/images/`.
- [x] Confirmar la escritura exclusiva en `README.md` y documentos textuales permitidos bajo `docs/`, con `README.md` como única excepción fuera de `docs/`.
- [x] Leer completamente `proposal.md`, `design.md`, `spec.md` y `tasks.md` antes de modificar otros documentos.
- [x] Corregir la contradicción menor del briefing: backend y juez quedan fuera de auditoría y se asumen correctos.

## Fase 1 — Inventario documental

- [x] Inventariar los 175 archivos existentes bajo `docs/` en el baseline.
- [x] Clasificar documentos de estado actual, planificación histórica, historias, changes activos, changes archivados, retrospectivas, diagramas, evidencias y excluidos.
- [x] Inventariar 62 capturas, 12 imágenes y 9 fuentes PlantUML sin modificar binarios.
- [x] Confirmar 13 historias, 13 changes activos y 3 changes archivados.

## Fase 2 — Inventario funcional del frontend

- [x] Inspeccionar los 190 archivos bajo `frontend/src/` en modo de solo lectura.
- [x] Inventariar autenticación, sesión, guards, roles, layouts y navegación.
- [x] Inventariar concursos, inscripción, problemas, envíos, ranking, edición y administración de roles.
- [x] Inventariar servicios, hooks, query keys, mappers, tipos generados, mocks y fixtures.
- [x] Inventariar 34 archivos de test y su cobertura observable.

## Fase 3 — Matriz de reconciliación

- [x] Construir la matriz frontend-documentación por área funcional.
- [x] Clasificar contradicciones, referencias históricas, rutas antiguas, enlaces rotos y estados desactualizados.
- [x] Seleccionar correcciones mínimas respaldadas por router, layouts, features, servicios, tipos y tests.

## Fase 4 — Historias y changes

- [x] Revisar individualmente las 13 historias de usuario.
- [x] Corregir estados, rutas, nombres de archivos y referencias de UJ-05, UJ-06, UJ-07, UJ-08/UJ-09, UJ-11, UJ-13, UJ-14/UJ-15 y UJ-20.
- [x] Verificar los 13 changes activos sin cerrar ni archivar ninguno.
- [x] Verificar los 3 changes archivados preservando su contexto histórico.
- [x] Reconciliar ranking, ruta administrativa, mappers de estados y hotfixes posteriores sin reabrir changes.

## Fase 5 — Retrospectivas y backlog

- [x] Revisar las retrospectivas de Sprint 1, Sprint 2 y Sprint 3.
- [x] Añadir notas posteriores a Sprint 1 y Sprint 2 sin reescribir sus resultados históricos.
- [x] Mantener versiones estables de lenguajes como `PROPUESTO — NO IMPLEMENTADO — PENDIENTE DE PRIORIZACIÓN`.
- [x] Mantener actualización de datos personales como `PROPUESTO — NO IMPLEMENTADO — PENDIENTE DE PRIORIZACIÓN`.
- [x] Revisar backlog y planificación sin crear changes funcionales nuevos.

## Fase 6 — Rutas, contratos y tests

- [x] Inventariar builders, parámetros, redirects, wildcard, layouts y guards del router actual.
- [x] Contrastar rutas de usuario, rutas administrativas y navegación contextual.
- [x] Documentar contratos consumidos por services y hooks como asumidos correctos.
- [x] Contextualizar cifras históricas de tests y registrar el resultado actual de la auditoría.

## Fase 7 — Enlaces, capturas, imágenes y PlantUML

- [x] Revisar enlaces Markdown locales, anchors y referencias a archivos frontend.
- [x] Verificar por existencia, casing y extensión las referencias a capturas e imágenes.
- [x] Revisar las 9 fuentes PlantUML.
- [x] Corregir `docs/puml/modelo-contexto.puml` por la ausencia objetiva de un cliente SignalR actual.
- [x] Confirmar que el PNG asociado no fue regenerado por estar fuera del alcance.
- [x] Preservar rutas absolutas únicamente en proposals archivados como contexto histórico.

## Fase 8 — Correcciones documentales

- [x] Aplicar correcciones mínimas a documentos de estado actual y planificación histórica.
- [x] Aplicar notas posteriores a documentos históricos cuando correspondía.
- [x] Registrar individualmente cada archivo modificado y su fuente de respaldo.
- [x] Verificar la guardia de escritura después de los grupos documentales.

## Fase 9 — Informe de auditoría

- [x] Crear `docs/auditorias/auditoria-documentacion-frontend-estado-actual.md`.
- [x] Completar inventario funcional, inventario documental y matriz frontend-documentación.
- [x] Registrar contradicciones, correcciones, hallazgos preservados, exclusiones y estado final.
- [x] Enumerar cada archivo creado o modificado sin comodines.

## Fase 10 — Validaciones

- [x] Ejecutar `npm audit` y `npm audit --audit-level=high` sin modificar dependencias.
- [x] Ejecutar `npm run lint`, `npm run typecheck`, `npm run test:run` y `npm run build` y registrar sus resultados.
- [x] Verificar enlaces locales y referencias de archivos mediante scripts de solo lectura.
- [x] Ejecutar las búsquedas documentales obligatorias y analizar cada coincidencia.
- [x] Confirmar que `frontend/`, `docs/informe-final.tex`, `docs/capturas/` y `docs/images/` no recibieron cambios de esta auditoría.
- [x] Ejecutar `git diff --check`, revisar `git diff --name-status`, `git diff --stat` y `git status --short`.

## Fase 10A — README principal

- [x] Auditar `README.md` de la raíz.
- [x] Contrastar sus funcionalidades con el frontend.
- [x] Verificar tecnologías y scripts.
- [x] Corregir instrucciones obsoletas.
- [x] Verificar enlaces locales.
- [x] Diferenciar funcionalidades actuales de propuestas futuras.
- [x] Registrar `README.md` en el informe de auditoría.
- [x] Repetir la guardia final y las validaciones seguras después de incorporar `README.md`.

## Fase 11 — Revisión manual

- [x] Preparar el informe, la matriz y la lista exacta de archivos para revisión.
- [ ] Revisión y aprobación manual del responsable del proyecto.
