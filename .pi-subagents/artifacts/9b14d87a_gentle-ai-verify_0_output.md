# Auditoría final — README raíz

## Resultado

**Sin blockers de contenido.** `README.md` cumple el alcance solicitado y sus afirmaciones fueron contrastadas con documentación e implementación actual.

### Hallazgos

- **warning — verificación Git actual no ejecutada:** no se autorizó ningún comando Git exacto para confirmar el estado actual del árbol de trabajo. El artefacto del autor (`.pi-subagents/artifacts/outputs/34647811/root-readme-writer.md`) registra que solo modificó `README.md`, preservando cambios preexistentes en `docs/`, pero esto no sustituye una comprobación Git en tiempo real.
- **warning — documentación preexistente inconsistente:** `docs/08-sprint-0-fabrica-software.md:344-357,399-411` referencia capturas inexistentes (`issues-sprint-0.png`, `react-vite-sprint-0.png`, `dod-dor-readme.png`, incluida una variante errónea `.png.png`). El README no las enlaza.
- **warning — documentos históricos desactualizados:** algunos documentos académicos aún describen el frontend como ausente. El README correctamente privilegia el estado actual de `frontend/` y delimita la fundación técnica frente a historias pendientes.

## Evidencia de revisión

- Título, TOC y secciones en español presentes en `README.md:1-277`.
- Plantel coincide exactamente con `docs/01-contexto-y-diagnostico.md:15-23`.
- Backlog conserva las 15 historias canónicas y no inventa `UJ-17`; contrastado con `docs/03-product-backlog.md:13-39`.
- Estado distingue fundación Sprint 1 completa de UJ-05/06/08/09 pendientes; confirmado en `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md:656-669`.
- Puertos, proxy y comandos coinciden con `frontend/vite.config.ts` y `frontend/package.json`.
- Rutas declaradas como reservadas coinciden con `frontend/src/routes/constants.ts` y `frontend/src/routes/router.tsx`.
- Límite de transporte y prohibición de `fetch` directo coinciden con `frontend/src/lib/api/http-client.ts` y `frontend/docs/guia-arquitectura-y-desarrollo.md:113-124`.
- OpenAPI se presenta como fuente de verdad sin inventar endpoints; `frontend/src/types/api.generated.ts:1-4` confirma tipos generados.
- No se detectó “Home Fit”, secretos, miembros inventados, rutas funcionales inventadas, backend afirmado como local ni Swagger defectuoso.
- Los 21 enlaces Markdown locales a archivos del README resuelven a objetivos existentes; los enlaces del TOC corresponden a encabezados presentes.

## Riesgos residuales

- Integración y disponibilidad del backend, Judge0, SignalR, CI y despliegue siguen sin ser verificables desde este checkout, y el README lo comunica explícitamente.
- La atribución de “solo README editado” está respaldada por evidencia histórica del autor, no por inspección Git actual.