# Proposal

## Problem Statement

El change `audit-reconcile-frontend-documentation-current-state` realizará una auditoría exclusivamente documental del estado actual del frontend de UPDS JUDGE.

El repositorio frontend disponible será la única fuente ejecutable para comprobar el estado actual. Para esta auditoría, el backend y el juez se asumen correctos y quedan expresamente fuera de inspección. Por ello, la auditoría debe comparar la documentación existente únicamente contra evidencia observable en:

1. Código actual bajo `frontend/src/`.
2. Configuración real del router.
3. Layouts y navegación.
4. Features y componentes.
5. Servicios HTTP.
6. Hooks, queries, mutations y mappers.
7. Tipos OpenAPI generados existentes.
8. Tests automatizados.
9. Mocks y fixtures.
10. Configuración del frontend.
11. Changes OpenSpec archivados.
12. Changes OpenSpec activos.
13. Historias de usuario.
14. Retrospectivas.
15. Backlog y planificación.

El problema actual es que la documentación puede contener:

- estados funcionales desactualizados;
- rutas anteriores;
- nombres de archivos que ya no existen;
- componentes movidos;
- referencias a changes con estado incorrecto;
- enlaces rotos;
- cifras de tests presentadas sin contexto histórico;
- funcionalidades propuestas descritas como implementadas;
- comportamientos contractuales consumidos por el frontend descritos sin distinguirlos de la implementación interna asumida;
- referencias a capturas o imágenes inexistentes;
- diagramas PlantUML incompatibles con la arquitectura frontend actual;
- rutas locales absolutas;
- contradicciones entre historias, changes, retrospectivas y código.

La auditoría debe reconciliar los documentos textuales permitidos bajo `docs/` y el `README.md` de la raíz, clasificado como documento principal de entrada y de estado actual. `README.md` es la única excepción de escritura fuera de `docs/`. El código frontend debe inspeccionarse en modo lectura y no puede modificarse.

Los únicos destinos permitidos son `README.md`, `docs/**/*.md`, `docs/**/*.txt`, `docs/**/*.rst`, `docs/**/*.adoc` y `docs/**/*.puml`, con las exclusiones absolutas siguientes:

- `frontend/**`;
- `docs/informe-final.tex`;
- `docs/capturas/**`;
- `docs/images/**`.

Los archivos `docs/puml/*.puml` pueden modificarse únicamente cuando una contradicción objetiva con el frontend haya sido demostrada. Las imágenes PNG asociadas no deben regenerarse.

La retrospectiva del Sprint 3 debe preservar explícitamente estas propuestas como no implementadas:

- versiones estables de lenguajes;
- actualización de datos personales mediante perfil o configuración.

El estado final esperado es:

`Auditoría documental del frontend completada y reconciliada. Change activo pendiente de revisión manual.`

## Goals

- Crear exactamente los cuatro artefactos OpenSpec del change en `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/`.
- Registrar el estado inicial de Git antes de cualquier corrección documental.
- Identificar cambios y archivos no rastreados preexistentes.
- Inspeccionar todo el frontend en modo lectura.
- Inventariar todo el árbol `docs/`.
- Auditar y reconciliar completamente el `README.md` raíz contra el frontend actual.
- Clasificar cada documento según su naturaleza y función.
- Construir un inventario funcional respaldado por código, rutas y tests.
- Construir una matriz frontend-documentación.
- Contrastar todas las historias con el estado comprobable del frontend.
- Contrastar changes activos y archivados sin borrar su contexto histórico.
- Revisar retrospectivas y distinguir resultados de propuestas futuras.
- Revisar rutas documentadas contra el router actual.
- Revisar contratos consumidos por el frontend.
- Revisar tests, mocks, fixtures y comandos reales.
- Revisar enlaces Markdown, anchors y paths de archivos.
- Revisar referencias a capturas, imágenes y PlantUML.
- Detectar rutas locales absolutas y sustituirlas cuando corresponda.
- Describir los contratos consumidos como asumidos correctos para esta auditoría, sin auditar su implementación interna.
- Aplicar únicamente correcciones textuales respaldadas.
- Crear `docs/auditorias/auditoria-documentacion-frontend-estado-actual.md`, o adaptar el nombre a una convención existente equivalente.
- Registrar individualmente cada documento modificado.
- Mantener intactos los archivos excluidos.
- Mantener el change activo para revisión manual.
- No crear nuevas evidencias manuales.
- No crear automáticamente changes funcionales adicionales.
- No modificar dependencias, código o archivos generados.

## Non-Goals

- No implementar funcionalidades nuevas.
- No corregir defectos funcionales.
- No modificar archivos bajo `frontend/`.
- No acceder al repositorio backend.
- No ejecutar `dotnet`.
- No revisar controllers, DTOs, migraciones o base de datos backend.
- No afirmar detalles internos del juez.
- No modificar contratos backend.
- No editar manualmente tipos OpenAPI.
- No ejecutar `npm run api:types`.
- No ejecutar `npm install`.
- No ejecutar `npm update`.
- No ejecutar `npm audit fix`.
- No ejecutar `npm audit fix --force`.
- No ejecutar formateadores globales sobre el repositorio.
- No modificar, compilar, mover ni reconciliar `docs/informe-final.tex`.
- No modificar archivos bajo `docs/capturas/`.
- No crear capturas nuevas.
- No modificar archivos bajo `docs/images/`.
- No regenerar imágenes PNG.
- No actualizar PlantUML por motivos estéticos.
- No reescribir masivamente changes archivados.
- No reescribir retrospectivas como documentos de estado actual.
- No borrar incidencias o decisiones históricas válidas.
- No presentar propuestas del Sprint 3 como implementadas.
- No crear changes para lenguajes, perfil o informe final.
- No hacer commit.
- No hacer push.
- No archivar este change ni otros changes.

## Affected Areas

### Artefactos del change

- `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/proposal.md`
- `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/spec.md`
- `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/design.md`
- `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/tasks.md`

### Áreas de inspección en modo lectura

- `frontend/src/features/`
- `frontend/src/routes/`
- `frontend/src/layouts/`
- `frontend/src/components/`
- `frontend/src/domain/`
- `frontend/src/lib/`
- `frontend/src/auth/`
- `frontend/src/types/`
- `frontend/src/mocks/`
- `frontend/src/test/`
- archivos `*.test.*` y `*.spec.*`
- `frontend/package.json`
- `frontend/vite.config.*`
- `frontend/tsconfig*.json`
- `frontend/eslint.config.*`

Las rutas deben adaptarse a la estructura real. Su ausencia no debe considerarse un error por sí misma.

### Documentación auditable

- `README.md`, única excepción permitida fuera de `docs/`;
- `docs/historias/`
- `docs/openspec/`
- `docs/openspec/changes/`
- directorio real de changes archivados
- `docs/retrospectivas/`
- `docs/puml/`
- `docs/auditorias/`
- `docs/backlog/`
- `docs/sprints/`
- `docs/arquitectura/`
- `docs/guias/`
- otros documentos textuales bajo `docs/`

### Documentación excluida de modificación

- `docs/informe-final.tex`
- `docs/capturas/**`
- `docs/images/**`

### Nuevo informe esperado

- `docs/auditorias/auditoria-documentacion-frontend-estado-actual.md`, salvo que exista una convención documental equivalente que deba reutilizarse.

## Assumptions

- El repositorio `UPDS-JUDGE-FRONT` estará disponible para Pi durante la ejecución posterior.
- Existe un directorio `frontend/` o una estructura equivalente identificable.
- El código actual del frontend es la principal fuente de verdad operativa.
- Existen documentos textuales bajo `docs/`.
- Puede existir documentación histórica que deba preservarse aunque ya no represente el estado actual.
- Puede existir un directorio de changes archivados con nombre diferente al indicado.
- Puede existir una carpeta o convención previa para informes de auditoría.
- No se asume que todas las rutas listadas por el usuario existan.
- No se asume que todas las funcionalidades mencionadas estén implementadas.
- No se asume que todos los scripts de validación existan en `package.json`.
- No se asume que `npm audit`, lint, typecheck, tests o build pasen.
- El backend y el juez se asumen correctos y no se inspeccionan.
- Los tipos OpenAPI y servicios se usan solo para describir los contratos consumidos por el frontend, no la lógica interna.

## Risks

### Risk 1: Modificar código frontend accidentalmente

- Probability: Medium.
- Impact: Critical.
- Mitigation: Aplicar una guardia de escritura basada en rutas y comprobar el diff después de cada grupo documental.

### Risk 2: Modificar archivos excluidos

- Probability: Low.
- Impact: Critical.
- Mitigation: Excluir explícitamente `docs/informe-final.tex`, `docs/capturas/**` y `docs/images/**` de cualquier operación de escritura.

### Risk 3: Sobrescribir cambios preexistentes

- Probability: Medium.
- Impact: High.
- Mitigation: Registrar `git status`, archivos modificados y no rastreados antes de comenzar; no restaurar ni limpiar el working tree.

### Risk 4: Tratar documentación histórica como estado actual

- Probability: High.
- Impact: High.
- Mitigation: Clasificar documentos antes de reconciliarlos y preservar el contexto temporal.

### Risk 5: Reescribir changes archivados de forma retrospectiva

- Probability: Medium.
- Impact: High.
- Mitigation: Preferir notas posteriores o referencias a hotfixes en vez de alterar la intención original.

### Risk 6: Auditar indebidamente backend o juez

- Probability: High.
- Impact: High.
- Mitigation: Asumir correctos sus contratos e infraestructura y limitar toda conclusión al consumo observable desde el frontend.

### Risk 7: Presentar propuestas del Sprint 3 como entregadas

- Probability: Medium.
- Impact: High.
- Mitigation: Verificar todas sus menciones y conservar explícitamente `PROPUESTO, NO IMPLEMENTADO`.

### Risk 8: Corregir documentos basándose solo en mocks

- Probability: Medium.
- Impact: High.
- Mitigation: Priorizar código de producción, servicios, tipos y router antes de mocks.

### Risk 9: Considerar los tipos OpenAPI como prueba de lógica interna

- Probability: Medium.
- Impact: Medium.
- Mitigation: Limitar sus conclusiones a contratos expuestos al frontend.

### Risk 10: Romper enlaces históricos válidos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Resolver cada enlace contra el árbol actual y distinguir referencias históricas de referencias operativas.

### Risk 11: Crear evidencias artificiales

- Probability: Low.
- Impact: High.
- Mitigation: Prohibir capturas nuevas y registrar referencias faltantes como hallazgos.

### Risk 12: Regenerar PNG al modificar PlantUML

- Probability: Low.
- Impact: High.
- Mitigation: Separar explícitamente fuente `.puml` modificable de salida `.png` excluida.

### Risk 13: Actualizar PlantUML solo por estilo

- Probability: Medium.
- Impact: Medium.
- Mitigation: Exigir una contradicción objetiva y una fuente frontend concreta.

### Risk 14: Presentar cifras históricas de tests como actuales

- Probability: High.
- Impact: Medium.
- Mitigation: Añadir fecha, change o contexto a toda cifra de tests.

### Risk 15: Cambiar documentos innecesariamente

- Probability: High.
- Impact: Medium.
- Mitigation: Requerir un hallazgo y una evidencia por cada archivo modificado.

### Risk 16: Omitir documentos por extensión o ubicación no prevista

- Probability: Medium.
- Impact: Medium.
- Mitigation: Inventariar el árbol completo mediante Git y filesystem antes de clasificar.

### Risk 17: Confundir ruta frontend con endpoint backend

- Probability: Medium.
- Impact: High.
- Mitigation: Mantener matrices separadas para rutas de interfaz y servicios HTTP.

### Risk 18: Ejecutar comandos que modifiquen el repositorio

- Probability: Low.
- Impact: High.
- Mitigation: Verificar scripts y evitar instalación, generación, fixes y formateo global.

### Risk 19: El informe de auditoría omite modificaciones concretas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Enumerar cada documento modificado sin comodines.

### Risk 20: Archivar antes de revisión manual

- Probability: Low.
- Impact: High.
- Mitigation: Terminar expresamente con el change activo y una tarea pendiente de aprobación.

## Rollback Strategy

Este change es documental. El rollback debe aplicarse únicamente a los documentos modificados por la auditoría.

- Conservar el baseline inicial para diferenciar cambios preexistentes.
- Revertir solamente las correcciones documentales realizadas por este change.
- No restaurar ni alterar archivos preexistentes fuera del alcance.
- No revertir documentos que hubieran sido modificados simultáneamente por otro responsable sin coordinación.
- Revertir un `.puml` junto con su nota de auditoría cuando la corrección se determine incorrecta.
- No modificar ni regenerar la imagen PNG correspondiente durante rollback.
- Eliminar el informe de auditoría únicamente si se revierte todo el change.
- Validar después del rollback:
  - no hay cambios bajo `frontend/`;
  - `docs/informe-final.tex` permanece intacto;
  - `docs/capturas/` permanece intacto;
  - `docs/images/` permanece intacto;
  - no se eliminaron cambios preexistentes;
  - el change continúa sin archivarse.

## Success Criteria

- El frontend completo fue inspeccionado en modo lectura.
- Todo `docs/` fue inventariado.
- `README.md` fue auditado como documento principal de entrada y de estado actual, y reconciliado con el frontend.
- Cada documento recibió una clasificación.
- Se creó un inventario funcional respaldado por frontend.
- Se creó una matriz frontend-documentación.
- Las rutas documentadas fueron contrastadas con el router.
- Los archivos frontend referenciados fueron verificados.
- Los servicios y contratos documentados fueron contrastados con el frontend disponible.
- Las historias recibieron estados explícitos y justificables.
- Los changes activos y archivados fueron clasificados correctamente.
- Las retrospectivas conservaron su contexto histórico.
- Las propuestas del Sprint 3 permanecieron como no implementadas.
- Las cifras históricas de tests conservaron contexto temporal.
- Los enlaces y referencias fueron revisados.
- No se crearon capturas ni evidencias.
- `docs/informe-final.tex` no cambió.
- `docs/capturas/` no cambió.
- `docs/images/` no cambió.
- Solo se modificaron `.puml` con contradicción demostrada.
- No se regeneraron PNG.
- Los contratos backend consumidos se documentaron como asumidos correctos, sin auditar backend ni juez.
- Se creó el informe de auditoría.
- El informe enumera individualmente cada archivo modificado.
- El diff final contiene únicamente `README.md` y documentos textuales permitidos bajo `docs/`, respetando todas las exclusiones.
- No se modificó código.
- No se modificaron dependencias.
- No se ejecutó generación OpenAPI.
- El change quedó activo.
- La revisión manual quedó pendiente.
