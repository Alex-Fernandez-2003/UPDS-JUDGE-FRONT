# Proposal

## Problem Statement

El change `reconcile-final-report-with-current-project-state` consolidará el estado final documentado de UPDS JUDGE en el informe académico principal:

- fuente editable: `docs/informe-final.tex`;
- resultado compilado: `docs/informe-final.pdf`.

Este change es exclusivamente documental. No implementará funcionalidades, no modificará código frontend y no realizará una nueva auditoría del backend o del motor de evaluación.

La necesidad surge porque el informe final debe reconciliar en un único documento académico:

- los requerimientos iniciales;
- el alcance realmente implementado;
- las desviaciones;
- las funcionalidades parciales;
- los hotfixes posteriores;
- las decisiones de arquitectura;
- la ejecución de los sprints;
- la planificación;
- los riesgos;
- las pruebas;
- las limitaciones;
- el trabajo futuro.

La consolidación debe partir de la auditoría documental previamente cerrada:

`audit-reconcile-frontend-documentation-current-state`

No debe repetirse desde cero esa auditoría. Su informe, el README reconciliado, las historias actualizadas, los changes archivados, las retrospectivas y los diagramas aprobados deben constituir las fuentes prioritarias para describir el estado actual.

El documento inicial `Actividad2.pdf` confirma los tres actores del sistema, los requerimientos funcionales RF-01 a RF-27 y los requerimientos no funcionales RNF-01 a RNF-19. También establece inicialmente los lenguajes C++, C# y Python, con archivos `.cpp`, `.cs` y `.py`. :contentReference[oaicite:0]{index=0}

Las reglas académicas, las restricciones de escritura, la estructura de fases, las imágenes obligatorias y las aclaraciones sobre RF-02 y RF-22 se encuentran consolidadas en la solicitud de este change. :contentReference[oaicite:1]{index=1}

### Reconciliación crítica de requerimientos

El informe debe declarar inequívocamente:

- `RF-02 — Gestión de perfiles`: `NO IMPLEMENTADO`.
- `RF-22 — Participación del usuario`: `IMPLEMENTADO PARCIALMENTE`, porque la edición de información personal no fue implementada.

RF-22 debe desglosarse preferentemente por subcapacidades para que las funciones entregadas no queden ocultas por la capacidad pendiente.

La edición de datos personales debe aparecer únicamente como:

- trabajo futuro;
- propuesta de mejora;
- pendiente de priorización;
- funcionalidad no incluida en el producto entregado.

La ampliación de versiones o cantidad de lenguajes también debe aparecer como propuesta futura de la retrospectiva del Sprint 3, no como funcionalidad implementada.

### Estructura académica

El informe debe adaptar, sin crear contenido vacío o inventado, una estructura académica de seis fases:

1. Fundamentos y alcance.
2. Especificación funcional.
3. Diseño de la solución.
4. Gestión ágil.
5. Planificación y control.
6. Implementación, validación y cierre.

Dentro de esas fases se integrarán los elementos de una especificación SRS:

- propósito;
- alcance;
- definiciones;
- perspectiva del producto;
- clases de usuario;
- restricciones;
- supuestos;
- requisitos funcionales;
- requisitos no funcionales;
- interfaces;
- modelos;
- trazabilidad.

No se creará un segundo documento SRS separado.

### Figuras obligatorias

El informe debe incluir, sin modificar los archivos originales:

1. `docs/images/Captura de pantalla 2026-07-28 204707.png`
   - Gantt general por Sprint.
2. `docs/images/Captura de pantalla 2026-07-28 204726.png`
   - distribución temporal de historias.
3. `docs/images/RaciMatriz.png`
   - matriz RACI.
4. `docs/images/listado de riesgos de .png`
   - registro priorizado de riesgos.
5. `docs/images/Tabla de prioridad.png`
   - matriz de probabilidad e impacto.

Cada imagen debe tener caption, label único, referencia textual y una presentación legible. Los nombres, incluidos espacios, deben preservarse exactamente.

### Resultado esperado

El change se considerará documentalmente completo cuando:

- `docs/informe-final.tex` represente de forma coherente el estado final;
- se genere `docs/informe-final.pdf`;
- `README.md` documente instalación, configuración, build, preview, despliegue y fallback SPA del frontend;
- el informe incorpore la entrevista, los tres actores y una tabla canónica de recursos digitales con enlaces autorizados;
- el PDF haya sido inspeccionado visualmente página por página;
- no existan referencias o citas indefinidas;
- no exista contenido visible fuera de página;
- las cinco imágenes obligatorias sean legibles;
- los hipervínculos agregados sean sintácticamente válidos y, cuando la red lo permita, accesibles;
- solo se hayan modificado los archivos permitidos;
- el change permanezca activo pendiente de revisión manual.

### Ampliación documental aprobada

La ampliación incorpora `guia.md` como fuente aprobada de solo lectura para despliegue, configuración, servicios y enlaces oficiales. También incorpora la síntesis autorizada de la entrevista y el enlace de audio proporcionado por el responsable, sin afirmar que el audio fue descargado, analizado o transcrito.

Los actores funcionales se documentarán como Administrador de Roles —docente o líder de club—, Administrador de Concursos —docente u organizador— y Usuario —estudiante o participante—. Estas categorías no sustituyen roles Scrum ni responsabilidades RACI.

La whitelist se amplía para permitir `README.md`. El README permanecerá centrado en el frontend y enlazará las guías externas del backend y del entorno Docker, pero no incluirá el audio de la entrevista.

## Goals

- Leer completamente el informe actual antes de modificarlo.
- Preservar portada, metadatos, autores, docente, universidad, asignatura y contenido válido.
- Determinar la clase documental, preámbulo, paquetes y motor LaTeX requeridos.
- Identificar secciones incompletas, placeholders y referencias rotas.
- Utilizar la auditoría documental reconciliada como fuente prioritaria.
- Leer completamente `guia.md` y usarla sin modificarla ni copiarla íntegramente.
- Incorporar la entrevista como técnica y evidencia autorizada de levantamiento.
- Documentar formalmente los tres actores y sus responsabilidades sin confundirlos con roles Scrum o RACI.
- Incorporar enlaces verificables de frontend, backend, entrevista, Docker, guías y evidencias aprobadas.
- Actualizar `README.md` con el flujo real de configuración, ejecución, build, preview y despliegue del frontend.
- Incorporar la estructura académica de referencia sin crear secciones vacías.
- Integrar el enfoque SRS dentro del informe final.
- Documentar RF-01 a RF-27.
- Documentar RNF-01 a RNF-19.
- Crear una matriz de trazabilidad de requerimientos iniciales.
- Distinguir requerimientos implementados, limitados, parciales y no implementados.
- Marcar RF-02 como `NO IMPLEMENTADO`.
- Marcar RF-22 como `IMPLEMENTADO PARCIALMENTE` o desglosarlo por subcapacidades.
- Registrar edición de datos personales como trabajo futuro.
- Registrar ampliación de lenguajes estables como trabajo futuro.
- Incorporar una tabla de revisión histórica.
- Consolidar arquitectura, módulos, roles, seguridad y comunicación entre componentes.
- Documentar el backend y el juez usando únicamente fuentes reconciliadas y diagramas aprobados.
- Incorporar Scrum, roles, backlogs, goals, reviews y retrospectivas.
- Incorporar ambos cronogramas Gantt.
- Incorporar la matriz RACI.
- Incorporar el registro y la matriz de riesgos.
- Documentar implementación, pruebas, hotfixes, limitaciones y resultados.
- Evitar duplicar tablas completas entre cuerpo y anexos.
- Generar índices general, de figuras y de tablas.
- Conservar la bibliografía existente cuando sea válida.
- Compilar mediante el motor LaTeX real.
- Utilizar un directorio temporal para archivos auxiliares.
- Generar únicamente `docs/informe-final.pdf` como salida persistente.
- Renderizar e inspeccionar todas las páginas.
- Corregir defectos visuales antes de finalizar.
- Mantener el change activo hasta aprobación manual.

## Non-Goals

- No implementar funcionalidades.
- No modificar archivos bajo `frontend/`.
- No modificar backend.
- No modificar el juez.
- No ejecutar `dotnet`.
- No buscar otro repositorio.
- No repetir la auditoría documental anterior.
- No modificar `README.md` fuera de la documentación verificada del frontend y sus servicios relacionados.
- No incluir el enlace de la entrevista en `README.md`.
- No modificar `guia.md`.
- No copiar credenciales, secretos ni ejemplos sensibles de `guia.md`.
- No modificar auditorías anteriores.
- No modificar historias.
- No modificar retrospectivas.
- No modificar changes activos o archivados distintos de este change.
- No modificar `docs/puml/`.
- No regenerar diagramas.
- No modificar `docs/images/`.
- No modificar `docs/capturas/`.
- No crear capturas o evidencias manuales nuevas.
- No renombrar, mover, comprimir o reemplazar imágenes.
- No crear un documento SRS independiente.
- No inventar secciones para completar un índice.
- No inventar fechas históricas.
- No inventar integrantes, responsabilidades o abreviaturas RACI.
- No inventar versiones tecnológicas o URLs bibliográficas.
- No presentar RF-02 como implementado.
- No presentar RF-22 como completamente implementado sin observación.
- No presentar la ampliación de lenguajes como entregada.
- No presentar la edición de datos personales como entregada.
- No incluir lenguaje sobre Pi, GPT, prompts o sesiones.
- No dejar archivos auxiliares LaTeX bajo `docs/`.
- No hacer commit.
- No hacer push.
- No archivar automáticamente el change.

## Affected Areas

### Archivos modificables

- `README.md`
- `docs/informe-final.tex`
- `docs/informe-final.pdf`
- `docs/openspec/changes/reconcile-final-report-with-current-project-state/proposal.md`
- `docs/openspec/changes/reconcile-final-report-with-current-project-state/spec.md`
- `docs/openspec/changes/reconcile-final-report-with-current-project-state/design.md`
- `docs/openspec/changes/reconcile-final-report-with-current-project-state/tasks.md`

### Fuentes internas de solo lectura

- `guia.md`
- `docs/auditorias/`
- `docs/historias/`
- `docs/openspec/changes/`
- directorio real de changes archivados
- `docs/retrospectivas/`
- `docs/puml/`
- `docs/images/`
- `docs/capturas/`
- `frontend/package.json`
- `frontend/src/routes/`
- `frontend/src/features/`
- `frontend/src/layouts/`
- `frontend/src/components/`
- `frontend/src/types/`
- `frontend/src/lib/`

### Fuentes externas ya incorporadas al briefing

- estructura del índice académico;
- estructura de referencia SRS;
- RF-01 a RF-27;
- RNF-01 a RNF-19;
- actores iniciales;
- restricciones sobre RF-02;
- restricciones sobre RF-22;
- reglas de integración de imágenes.

## Assumptions

- La auditoría `audit-reconcile-frontend-documentation-current-state` fue completada y cerrada.
- El informe de auditoría documental existe dentro de `docs/auditorias/`.
- Las historias y retrospectivas disponibles ya fueron reconciliadas.
- Los diagramas presentes se consideran aprobados.
- El backend y el juez se consideran correctos para efectos del informe.
- `docs/informe-final.tex` ya contiene metadatos y contenido que debe preservarse cuando sea válido.
- Las cinco imágenes obligatorias existen con los nombres exactos indicados.
- El motor LaTeX debe determinarse inspeccionando el preámbulo.
- Puede ser necesario compilar varias veces para resolver índices y referencias.
- Puede ser necesario utilizar páginas horizontales para imágenes anchas.
- No se asume que exista bibliografía BibTeX.
- No se asume que todas las fases o secciones propuestas tengan material suficiente.
- No se asume que todos los RF y RNF estén completamente cumplidos.
- No se asume una cantidad actual fija de tests.
- No se asume una fecha para revisiones históricas que no estén documentadas.

## Risks

### Risk 1: Reemplazar contenido válido del informe

- Probability: Medium.
- Impact: High.
- Mitigation: Inventariar el contenido actual antes de reorganizar y registrar qué se preserva, mueve, combina o sustituye.

### Risk 2: Presentar RF-02 como implementado

- Probability: Medium.
- Impact: Critical.
- Mitigation: Tratar RF-02 como regla documental invariante y verificar todas sus menciones.

### Risk 3: Presentar RF-22 como cumplimiento total

- Probability: High.
- Impact: High.
- Mitigation: Desglosar sus subcapacidades o marcarlo explícitamente como parcial.

### Risk 4: Presentar propuestas del Sprint 3 como entregadas

- Probability: Medium.
- Impact: High.
- Mitigation: Separar resultados, limitaciones y trabajo futuro en secciones distintas.

### Risk 5: Inventar evidencia backend

- Probability: Medium.
- Impact: High.
- Mitigation: Utilizar únicamente documentación reconciliada, contratos frontend y diagramas aprobados.

### Risk 6: Duplicar tablas entre cuerpo y anexos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Definir una ubicación canónica y usar referencias cruzadas.

### Risk 7: Omitir requerimientos iniciales

- Probability: Medium.
- Impact: High.
- Mitigation: Mantener una lista de control de RF-01 a RF-27 y RNF-01 a RNF-19.

### Risk 8: Interpretar incorrectamente la matriz RACI

- Probability: Medium.
- Impact: High.
- Mitigation: Incluir la imagen sin inventar identidades para abreviaturas no documentadas.

### Risk 9: Imágenes ilegibles

- Probability: High.
- Impact: High.
- Mitigation: Ajustar tamaño, orientación y páginas horizontales después de revisar el PDF renderizado.

### Risk 10: Rutas con espacios rompen la compilación

- Probability: Medium.
- Impact: High.
- Mitigation: Utilizar `\detokenize{}` o una solución equivalente compatible con el preámbulo.

### Risk 11: Modificar una imagen accidentalmente

- Probability: Low.
- Impact: Critical.
- Mitigation: Tratar `docs/images/` como fuente de solo lectura y revisar el diff final.

### Risk 12: Archivos auxiliares dentro de docs

- Probability: Medium.
- Impact: Medium.
- Mitigation: Compilar en un directorio temporal y copiar únicamente el PDF final.

### Risk 13: Referencias o citas indefinidas

- Probability: High.
- Impact: High.
- Mitigation: Compilar las veces necesarias y revisar el log completo.

### Risk 14: Contenido fuera de página

- Probability: High.
- Impact: High.
- Mitigation: Revisar warnings `overfull` y renderizar todas las páginas.

### Risk 15: Páginas vacías o layouts horizontales incorrectos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Revisar secuencia de saltos, floats y entornos landscape.

### Risk 16: Bibliografía incompatible

- Probability: Medium.
- Impact: Medium.
- Mitigation: Conservar el mecanismo actual y no migrarlo sin necesidad.

### Risk 17: Metadatos académicos incorrectos

- Probability: Low.
- Impact: High.
- Mitigation: Preservar los metadatos existentes y no reemplazarlos con información externa sin confirmación.

### Risk 18: Reportar tests históricos como actuales

- Probability: Medium.
- Impact: Medium.
- Mitigation: Añadir contexto temporal y utilizar resultados actuales solo cuando estén disponibles documentalmente.

### Risk 19: Exceso de extensión sin jerarquía

- Probability: High.
- Impact: Medium.
- Mitigation: Consolidar contenido, evitar repeticiones y trasladar detalle secundario a anexos.

### Risk 20: Modificar fuentes fuera del alcance

- Probability: Low.
- Impact: Critical.
- Mitigation: Aplicar una whitelist de archivos y verificar `git diff --name-only` después de cada fase.

## Rollback Strategy

- Conservar una copia o referencia Git del `docs/informe-final.tex` anterior.
- Revertir conjuntamente el `.tex` y el `.pdf` generado cuando el informe final no supere la revisión.
- No revertir ni modificar fuentes documentales de solo lectura.
- No modificar imágenes durante rollback.
- Limpiar únicamente archivos temporales creados por la compilación.
- No eliminar cambios preexistentes.
- Confirmar después del rollback:
  - `frontend/` sin cambios atribuibles al change;
  - `docs/images/` sin cambios;
  - `docs/capturas/` sin cambios;
  - `docs/puml/` sin cambios;
  - otros documentos sin cambios;
  - change aún activo.

## Success Criteria

- El informe actual fue leído completamente.
- El contenido válido fue preservado.
- La estructura académica fue integrada.
- El enfoque SRS fue incorporado.
- RF-01 a RF-27 fueron documentados.
- RNF-01 a RNF-19 fueron documentados.
- La matriz de trazabilidad fue incluida.
- RF-02 figura como `NO IMPLEMENTADO`.
- RF-22 figura como `IMPLEMENTADO PARCIALMENTE` o está desglosado.
- La edición de datos personales figura como trabajo futuro.
- La ampliación de lenguajes figura como trabajo futuro.
- Las cinco imágenes obligatorias aparecen en el informe.
- Todas las figuras tienen caption, label y referencia.
- El Gantt por Sprint es legible.
- El Gantt por historias es legible.
- La matriz RACI es legible.
- El registro de riesgos es legible.
- La matriz de prioridad es legible.
- Existe índice general.
- Existe índice de figuras.
- Existe índice de tablas.
- Existe revisión histórica.
- `docs/informe-final.pdf` fue generado.
- No existen referencias indefinidas.
- No existen citas indefinidas.
- No existen imágenes faltantes.
- No existe contenido visible fuera de página.
- Todas las páginas fueron inspeccionadas.
- Solo se modificaron los archivos permitidos.
- El change permanece activo.
- La revisión manual permanece pendiente.
