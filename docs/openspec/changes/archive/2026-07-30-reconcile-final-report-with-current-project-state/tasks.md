# Tasks

**Fase 0 — Baseline**

## Task 1: Registrar el estado inicial de Git

- Objective:
  Identificar branch, modificaciones y archivos no rastreados preexistentes.
- Files or areas likely involved:
  Repositorio completo, en modo lectura.
- Execution notes:
  Registrar status, diff name-status, diff stat y diff check. No restaurar ni limpiar archivos.
- Verification method:
  Baseline fechado que diferencia cambios preexistentes de cambios del informe.
- Dependencies:
  None.

## Task 2: Definir la whitelist de escritura

- Objective:
  Limitar las modificaciones a los archivos autorizados.
- Files or areas likely involved:
  `docs/informe-final.tex`, `docs/informe-final.pdf` y artefactos de este change.
- Execution notes:
  Tratar todas las demás rutas como solo lectura.
- Verification method:
  Lista permitida y lista excluida revisadas antes de editar.
- Dependencies:
  Task 1.

## Task 3: Localizar herramientas LaTeX disponibles

- Objective:
  Identificar motores y utilidades de compilación/renderizado.
- Files or areas likely involved:
  Entorno local, sin modificar el repositorio.
- Execution notes:
  No seleccionar motor hasta revisar el preámbulo.
- Verification method:
  Inventario de comandos disponibles.
- Dependencies:
  Task 1.

**Fase 1 — Inspección del informe actual**

## Task 4: Leer completamente el informe actual

- Objective:
  Comprender su estructura, contenido válido y limitaciones.
- Files or areas likely involved:
  `docs/informe-final.tex`.
- Execution notes:
  Revisar desde preámbulo hasta anexos.
- Verification method:
  Inventario completo de secciones y comandos.
- Dependencies:
  Tasks 1 and 2.

## Task 5: Inventariar el preámbulo y motor requerido

- Objective:
  Determinar clase, paquetes, fuentes, bibliografía y motor compatible.
- Files or areas likely involved:
  Preámbulo de `docs/informe-final.tex`.
- Execution notes:
  Identificar incompatibilidades potenciales con landscape y nombres con espacios.
- Verification method:
  Decisión documentada de motor y estrategia de compilación.
- Dependencies:
  Tasks 3 and 4.

## Task 6: Inventariar metadatos académicos

- Objective:
  Preservar portada y datos institucionales válidos.
- Files or areas likely involved:
  Portada y comandos personalizados.
- Execution notes:
  No sustituir información con datos de otras fuentes sin confirmación.
- Verification method:
  Tabla campo → valor actual → fuente → acción.
- Dependencies:
  Task 4.

## Task 7: Clasificar contenido existente

- Objective:
  Distinguir contenido válido, incompleto, duplicado, placeholder y obsoleto.
- Files or areas likely involved:
  Cuerpo y anexos del informe.
- Execution notes:
  Registrar qué se preserva, mueve, fusiona o reemplaza.
- Verification method:
  Matriz por sección.
- Dependencies:
  Task 4.

## Task 8: Compilar el baseline del informe

- Objective:
  Registrar el estado actual antes de corregirlo.
- Files or areas likely involved:
  `docs/informe-final.tex` y directorio temporal.
- Execution notes:
  Usar el motor determinado; no sobrescribir aún el PDF final cuando pueda preservarse como baseline.
- Verification method:
  Log inicial, página total y defectos registrados.
- Dependencies:
  Tasks 5 through 7.

**Fase 2 — Inventario de fuentes**

## Task 9: Revisar la auditoría documental aprobada

- Objective:
  Obtener el estado final reconciliado del proyecto.
- Files or areas likely involved:
  `docs/auditorias/`.
- Execution notes:
  Identificar el informe correspondiente al frontend actual.
- Verification method:
  Matriz capacidad → estado → evidencia.
- Dependencies:
  Task 1.

## Task 10: Revisar README e historias reconciliadas

- Objective:
  Confirmar módulos, flujos, rutas y limitaciones.
- Files or areas likely involved:
  `README.md` y `docs/historias/`.
- Execution notes:
  Inspección de solo lectura.
- Verification method:
  Inventario de historias y estados relevantes.
- Dependencies:
  Task 9.

## Task 11: Revisar changes activos, archivados y hotfixes

- Objective:
  Identificar implementación original y correcciones posteriores.
- Files or areas likely involved:
  `docs/openspec/changes/` y directorio de archive real.
- Execution notes:
  No modificar ni reabrir otros changes.
- Verification method:
  Matriz historia → change → hotfix → estado.
- Dependencies:
  Tasks 9 and 10.

## Task 12: Revisar retrospectivas

- Objective:
  Consolidar resultados, dificultades y propuestas futuras.
- Files or areas likely involved:
  `docs/retrospectivas/`.
- Execution notes:
  Verificar especialmente las propuestas de perfil y lenguajes del Sprint 3.
- Verification method:
  Tabla sprint → entregado → limitaciones → trabajo futuro.
- Dependencies:
  Task 9.

## Task 13: Inventariar diagramas aprobados

- Objective:
  Identificar diagramas disponibles para arquitectura y modelado.
- Files or areas likely involved:
  `docs/puml/` y `docs/images/`, en modo lectura.
- Execution notes:
  No modificar o regenerar.
- Verification method:
  Matriz diagrama → tema → archivo PNG → sección propuesta.
- Dependencies:
  Task 1.

## Task 14: Verificar las cinco imágenes obligatorias

- Objective:
  Confirmar nombres exactos, dimensiones y legibilidad de origen.
- Files or areas likely involved:
  Cinco archivos indicados en `docs/images/`.
- Execution notes:
  No modificar metadatos o contenido.
- Verification method:
  Existencia y propiedades básicas registradas.
- Dependencies:
  Task 13.

## Task 15: Inspeccionar el frontend estrictamente necesario

- Objective:
  Comprobar afirmaciones del informe que no estén claras en la documentación.
- Files or areas likely involved:
  Rutas, features, layouts, componentes, tipos y lib.
- Execution notes:
  Solo lectura; no repetir la auditoría completa.
- Verification method:
  Lista acotada de comprobaciones y resultados.
- Dependencies:
  Tasks 9 through 12.

**Fase 3 — Estructura académica**

## Task 16: Diseñar el esquema final

- Objective:
  Adaptar las seis fases académicas y el enfoque SRS.
- Files or areas likely involved:
  Plan de estructura de `docs/informe-final.tex`.
- Execution notes:
  Evitar secciones vacías y duplicaciones.
- Verification method:
  Índice propuesto con fuente de contenido por sección.
- Dependencies:
  Tasks 7 and 9 through 15.

## Task 17: Mapear contenido existente al nuevo esquema

- Objective:
  Preservar material válido durante la reorganización.
- Files or areas likely involved:
  Secciones actuales del informe.
- Execution notes:
  Registrar movimientos y fusiones antes de editar.
- Verification method:
  Matriz sección actual → sección objetivo → acción.
- Dependencies:
  Task 16.

## Task 18: Definir la distribución cuerpo-anexos

- Objective:
  Evitar repetir matrices y tablas completas.
- Files or areas likely involved:
  Esquema del informe.
- Execution notes:
  Asignar una ubicación canónica a cada tabla.
- Verification method:
  Lista de elementos del cuerpo y anexos sin duplicados completos.
- Dependencies:
  Task 16.

## Task 19: Integrar la revisión histórica

- Objective:
  Crear una tabla de versiones sin fechas inventadas.
- Files or areas likely involved:
  Material preliminar.
- Execution notes:
  Usar fecha actual solo para la versión final cuando corresponda.
- Verification method:
  Filas mínimas presentes y sustentadas.
- Dependencies:
  Tasks 4 and 16.

## Task 20: Integrar índices preliminares

- Objective:
  Preparar índice general, de figuras y de tablas.
- Files or areas likely involved:
  Preámbulo y material preliminar.
- Execution notes:
  Respetar la plantilla existente.
- Verification method:
  Comandos de índices presentes y compatibles.
- Dependencies:
  Tasks 5 and 16.

**Fase 4 — Requerimientos y trazabilidad**

## Task 21: Incorporar los actores iniciales

- Objective:
  Documentar Administrador de Roles, Administrador de Concursos y Usuario.
- Files or areas likely involved:
  Toma de requerimientos y clases de usuario.
- Execution notes:
  Reconciliar responsabilidades finales sin alterar la intención original.
- Verification method:
  Tres actores presentes con terminología consistente.
- Dependencies:
  Tasks 9 through 12 and 16.

## Task 22: Incorporar RF-01 a RF-27

- Objective:
  Registrar todos los requerimientos funcionales iniciales.
- Files or areas likely involved:
  Sección de requerimientos y matriz.
- Execution notes:
  Mantener identificadores exactos.
- Verification method:
  Lista automatizable de 27 identificadores sin omisiones ni duplicados.
- Dependencies:
  Tasks 16 and 21.

## Task 23: Incorporar RNF-01 a RNF-19

- Objective:
  Registrar los requerimientos no funcionales iniciales.
- Files or areas likely involved:
  Sección de requerimientos y matriz.
- Execution notes:
  Distinguir evidencia de cumplimiento y objetivo arquitectónico.
- Verification method:
  Lista de 19 identificadores sin omisiones ni duplicados.
- Dependencies:
  Task 16.

## Task 24: Construir la matriz de trazabilidad

- Objective:
  Relacionar cada requisito con estado, evidencia, historias y changes.
- Files or areas likely involved:
  Sección de cumplimiento o anexo canónico.
- Execution notes:
  Utilizar únicamente estados permitidos.
- Verification method:
  46 filas principales con observaciones sustentadas.
- Dependencies:
  Tasks 9 through 12, 22 and 23.

## Task 25: Aplicar el tratamiento de RF-02

- Objective:
  Registrar la gestión de perfiles como no implementada.
- Files or areas likely involved:
  Matriz, desviaciones, resultados, limitaciones y trabajo futuro.
- Execution notes:
  Verificar todas las menciones de perfil.
- Verification method:
  RF-02 nunca aparece como entregado.
- Dependencies:
  Tasks 12 and 24.

## Task 26: Aplicar el tratamiento de RF-22

- Objective:
  Registrar participación del usuario como parcial.
- Files or areas likely involved:
  Matriz y resultados.
- Execution notes:
  Preferir desglose por subcapacidades.
- Verification method:
  La edición de perfil aparece explícitamente no implementada.
- Dependencies:
  Tasks 24 and 25.

## Task 27: Documentar el alcance de lenguajes

- Objective:
  Separar catálogo inicial, estado final y propuesta futura.
- Files or areas likely involved:
  Requerimientos, implementación y trabajo futuro.
- Execution notes:
  No afirmar ampliaciones no entregadas.
- Verification method:
  C++, C# y Python quedan contextualizados; propuesta futura separada.
- Dependencies:
  Tasks 12, 22 and 24.

## Task 28: Redactar desviaciones y limitaciones

- Objective:
  Explicar diferencias entre requerimientos iniciales y producto final.
- Files or areas likely involved:
  Requerimientos, calidad y resultados.
- Execution notes:
  Mantener tono neutral y técnico.
- Verification method:
  RF-02, RF-22 y otras desviaciones sustentadas están presentes.
- Dependencies:
  Tasks 24 through 27.

**Fase 5 — Diseño y arquitectura**

## Task 29: Consolidar la arquitectura general

- Objective:
  Describir componentes y comunicación del sistema.
- Files or areas likely involved:
  Fase III del informe.
- Execution notes:
  Usar diagramas aprobados y documentación reconciliada.
- Verification method:
  Arquitectura coherente con fuentes.
- Dependencies:
  Tasks 9 through 15 and 16.

## Task 30: Consolidar la arquitectura frontend

- Objective:
  Describir módulos, routing, layouts, componentes y consumo HTTP.
- Files or areas likely involved:
  Sección de arquitectura frontend.
- Execution notes:
  Verificar afirmaciones críticas en modo lectura.
- Verification method:
  Descripción consistente con el repositorio.
- Dependencies:
  Task 15.

## Task 31: Documentar backend y motor de evaluación

- Objective:
  Explicar responsabilidades asumidas como correctas.
- Files or areas likely involved:
  Arquitectura backend y motor.
- Execution notes:
  No realizar auditoría nueva ni inventar detalles internos.
- Verification method:
  Cada afirmación tiene una fuente documental o diagrama.
- Dependencies:
  Tasks 9 through 13.

## Task 32: Integrar seguridad y roles

- Objective:
  Describir autenticación, autorización y separación de roles.
- Files or areas likely involved:
  Arquitectura y módulos implementados.
- Execution notes:
  Mantener terminología consistente con historias y frontend.
- Verification method:
  Actores, roles, layouts y guards no se contradicen.
- Dependencies:
  Tasks 10, 15, 21 and 29.

## Task 33: Integrar diagramas aprobados

- Objective:
  Incluir únicamente diagramas relevantes ya existentes.
- Files or areas likely involved:
  Fase III y anexos.
- Execution notes:
  No modificar `.puml` ni PNG.
- Verification method:
  Cada diagrama incluido tiene caption, label y referencia.
- Dependencies:
  Tasks 13 and 29 through 32.

**Fase 6 — Scrum y retrospectivas**

## Task 34: Documentar metodología y organización

- Objective:
  Consolidar Scrum, equipo y roles.
- Files or areas likely involved:
  Fase IV.
- Execution notes:
  No inventar responsabilidades o integrantes.
- Verification method:
  Narrativa respaldada por documentación.
- Dependencies:
  Tasks 9 through 12 and 16.

## Task 35: Integrar la matriz RACI

- Objective:
  Incorporar `RaciMatriz.png` de forma legible.
- Files or areas likely involved:
  Sección Matriz RACI.
- Execution notes:
  No reinterpretar abreviaturas no definidas.
- Verification method:
  Figura visible, citada y con fuente.
- Dependencies:
  Tasks 14 and 34.

## Task 36: Consolidar backlogs y goals

- Objective:
  Describir Product Backlog, Product Goal, Sprint Backlogs y Sprint Goals.
- Files or areas likely involved:
  Fase IV.
- Execution notes:
  Incluir solo información existente.
- Verification method:
  Cada artefacto descrito tiene fuente.
- Dependencies:
  Tasks 9 through 12 and 34.

## Task 37: Consolidar Sprint 0 a Sprint 3

- Objective:
  Resumir ejecución, entregables y evolución.
- Files or areas likely involved:
  Ejecución de sprints.
- Execution notes:
  Distinguir implementación original y hotfixes.
- Verification method:
  Cuatro sprints cubiertos sin atribuciones incorrectas.
- Dependencies:
  Tasks 11, 12 and 36.

## Task 38: Consolidar reviews y retrospectivas

- Objective:
  Documentar validaciones, aprendizajes y acciones.
- Files or areas likely involved:
  Ejecución de sprints.
- Execution notes:
  Preservar contexto histórico.
- Verification method:
  Resultados y propuestas se encuentran separados.
- Dependencies:
  Tasks 12 and 37.

## Task 39: Registrar acciones futuras del Sprint 3

- Objective:
  Mantener perfil y lenguajes como no implementados.
- Files or areas likely involved:
  Retrospectivas, resultados y trabajo futuro.
- Execution notes:
  No presentarlos como backlog ejecutado.
- Verification method:
  Ambas propuestas aparecen exclusivamente como trabajo futuro.
- Dependencies:
  Tasks 25, 27 and 38.

**Fase 7 — Cronograma y riesgos**

## Task 40: Integrar el Gantt general por Sprint

- Objective:
  Incorporar la primera imagen de planificación.
- Files or areas likely involved:
  Planificación temporal.
- Execution notes:
  Usar nombre exacto y una escala legible.
- Verification method:
  Figura referenciada, con caption y label.
- Dependencies:
  Task 14.

## Task 41: Integrar el Gantt de historias

- Objective:
  Incorporar la segunda imagen de planificación.
- Files or areas likely involved:
  Planificación temporal.
- Execution notes:
  Revisar si requiere landscape.
- Verification method:
  Historias y barras temporales legibles.
- Dependencies:
  Task 14.

## Task 42: Redactar hitos y entregables

- Objective:
  Interpretar la planificación sin inventar fechas.
- Files or areas likely involved:
  Planificación temporal.
- Execution notes:
  Utilizar imágenes y documentación de sprints.
- Verification method:
  Texto cita ambas figuras y coincide con ellas.
- Dependencies:
  Tasks 37, 40 and 41.

## Task 43: Integrar el listado priorizado de riesgos

- Objective:
  Incorporar `listado de riesgos de .png`.
- Files or areas likely involved:
  Gestión de riesgos.
- Execution notes:
  Preservar el espacio del nombre y revisar legibilidad.
- Verification method:
  Figura presente, citada y sin missing file.
- Dependencies:
  Task 14.

## Task 44: Integrar la matriz de prioridad

- Objective:
  Incorporar `Tabla de prioridad.png`.
- Files or areas likely involved:
  Gestión de riesgos.
- Execution notes:
  Revisar orientación horizontal.
- Verification method:
  Figura presente, citada y legible.
- Dependencies:
  Task 14.

## Task 45: Redactar metodología y mitigaciones de riesgos

- Objective:
  Explicar probabilidad, impacto, prioridad, contingencia y riesgo residual.
- Files or areas likely involved:
  Gestión de riesgos.
- Execution notes:
  No inventar valores no documentados.
- Verification method:
  Texto respalda y referencia ambas imágenes.
- Dependencies:
  Tasks 43 and 44.

**Fase 8 — Implementación y validación**

## Task 46: Consolidar tecnologías y módulos

- Objective:
  Describir el stack y los módulos finales.
- Files or areas likely involved:
  Implementación final.
- Execution notes:
  No inventar versiones.
- Verification method:
  Cada tecnología está respaldada y contextualizada.
- Dependencies:
  Tasks 9 through 15 and 29 through 32.

## Task 47: Consolidar autenticación y administración

- Objective:
  Describir sesión, roles, guards y módulos administrativos.
- Files or areas likely involved:
  Implementación final.
- Execution notes:
  Mantener consistencia con actores y arquitectura.
- Verification method:
  Descripción coherente con historias reconciliadas.
- Dependencies:
  Tasks 21, 32 and 46.

## Task 48: Consolidar concursos, problemas y envíos

- Objective:
  Describir el flujo funcional principal.
- Files or areas likely involved:
  Implementación final.
- Execution notes:
  Diferenciar capacidades de usuario y administración.
- Verification method:
  Flujos vinculados a RF e historias.
- Dependencies:
  Tasks 10, 11, 24 and 46.

## Task 49: Consolidar ranking e integración

- Objective:
  Describir ranking, congelamiento y navegación contextual según fuentes.
- Files or areas likely involved:
  Implementación final.
- Execution notes:
  No recalcular ni inventar reglas no documentadas.
- Verification method:
  Contenido sustentado por historias y changes.
- Dependencies:
  Tasks 10 through 12 and 46.

## Task 50: Consolidar estrategia de pruebas

- Objective:
  Describir pruebas automatizadas y validaciones documentadas.
- Files or areas likely involved:
  Calidad y validación.
- Execution notes:
  Contextualizar cantidades históricas.
- Verification method:
  Cada cifra incluye contexto; no se presenta como permanente.
- Dependencies:
  Tasks 9 through 12.

## Task 51: Consolidar incidencias y hotfixes

- Objective:
  Explicar cómo evolucionó el producto.
- Files or areas likely involved:
  Calidad y validación.
- Execution notes:
  No atribuir fixes al change original incorrecto.
- Verification method:
  Relación clara entre incidencia, hotfix y resultado.
- Dependencies:
  Tasks 11, 12 and 50.

## Task 52: Completar limitaciones y trazabilidad final

- Objective:
  Relacionar calidad, desviaciones y estado de requisitos.
- Files or areas likely involved:
  Calidad y resultados.
- Execution notes:
  Incluir RF-02, RF-22 y propuestas futuras.
- Verification method:
  Limitaciones coinciden con matriz.
- Dependencies:
  Tasks 24 through 28 and 50 through 51.

**Fase 9 — Conclusiones y anexos**

## Task 53: Redactar resultados

- Objective:
  Resumir objetivos alcanzados, parciales y no implementados.
- Files or areas likely involved:
  Capítulo de resultados.
- Execution notes:
  No ocultar desviaciones.
- Verification method:
  Resultados son consistentes con la matriz.
- Dependencies:
  Tasks 24 through 28 and 46 through 52.

## Task 54: Redactar trabajo futuro

- Objective:
  Consolidar propuestas futuras verificadas.
- Files or areas likely involved:
  Resultados y recomendaciones.
- Execution notes:
  Incluir perfil y ampliación de lenguajes.
- Verification method:
  Ninguna propuesta figura como implementación.
- Dependencies:
  Tasks 39 and 53.

## Task 55: Redactar conclusiones y recomendaciones

- Objective:
  Cerrar el informe con una evaluación sustentada.
- Files or areas likely involved:
  Conclusiones.
- Execution notes:
  Distinguir resultados de interpretación.
- Verification method:
  Conclusiones no contradicen limitaciones.
- Dependencies:
  Tasks 53 and 54.

## Task 56: Organizar anexos

- Objective:
  Incorporar material complementario sin duplicar tablas completas.
- Files or areas likely involved:
  Anexos.
- Execution notes:
  Usar referencias cruzadas hacia contenido canónico.
- Verification method:
  Cada anexo tiene propósito y no repite innecesariamente el cuerpo.
- Dependencies:
  Tasks 18, 33, 42, 45 and 55.

## Task 57: Revisar glosario y referencias

- Objective:
  Mantener términos, siglas y bibliografía consistentes.
- Files or areas likely involved:
  Glosario, referencias y bibliografía.
- Execution notes:
  Preservar el mecanismo existente.
- Verification method:
  Siglas definidas, citas resueltas y referencias pertinentes.
- Dependencies:
  Tasks 5, 21, 29 and 56.

**Fase 10 — Integración de figuras**

## Task 58: Normalizar captions, labels y fuentes

- Objective:
  Garantizar trazabilidad de todas las figuras.
- Files or areas likely involved:
  Figuras del informe.
- Execution notes:
  Utilizar labels únicos.
- Verification method:
  Cada figura tiene caption, label, fuente y referencia textual.
- Dependencies:
  Tasks 33, 35, 40, 41, 43 and 44.

## Task 59: Resolver rutas con espacios

- Objective:
  Compilar correctamente nombres de imagen complejos.
- Files or areas likely involved:
  Referencias gráficas en el `.tex`.
- Execution notes:
  Usar `\detokenize{}` o mecanismo compatible.
- Verification method:
  Cero errores `missing file`.
- Dependencies:
  Tasks 5, 14 and 58.

## Task 60: Ajustar tamaño y orientación

- Objective:
  Mantener figuras legibles y sin cortes.
- Files or areas likely involved:
  Entornos de figura y landscape.
- Execution notes:
  Priorizar RACI, riesgos y prioridad.
- Verification method:
  Primera compilación visual sin figuras ilegibles.
- Dependencies:
  Tasks 58 and 59.

## Task 61: Verificar integridad de assets

- Objective:
  Confirmar que las imágenes originales no cambiaron.
- Files or areas likely involved:
  `docs/images/`, en modo lectura.
- Execution notes:
  Comparar contra baseline.
- Verification method:
  Cero modificaciones en assets.
- Dependencies:
  Tasks 1 and 60.

**Fase 11 — Compilación**

## Task 62: Preparar el directorio temporal

- Objective:
  Evitar auxiliares dentro de `docs/`.
- Files or areas likely involved:
  Directorio temporal fuera del repositorio o ignorado.
- Execution notes:
  Incluir todos los artefactos auxiliares.
- Verification method:
  `docs/` no contiene nuevos auxiliares.
- Dependencies:
  Tasks 5 and 61.

## Task 63: Ejecutar la compilación inicial completa

- Objective:
  Generar índices, referencias y PDF.
- Files or areas likely involved:
  `docs/informe-final.tex` y temporal.
- Execution notes:
  Ejecutar las pasadas requeridas por el motor.
- Verification method:
  PDF generado y log preservado temporalmente.
- Dependencies:
  Tasks 20, 57 and 62.

## Task 64: Revisar warnings y errores

- Objective:
  Eliminar referencias, citas, archivos y labels problemáticos.
- Files or areas likely involved:
  Log y `.tex`.
- Execution notes:
  Clasificar underfull y font warnings por impacto.
- Verification method:
  Cero errores bloqueantes y cero referencias indefinidas.
- Dependencies:
  Task 63.

## Task 65: Generar el PDF final

- Objective:
  Copiar únicamente el resultado compilado a `docs/informe-final.pdf`.
- Files or areas likely involved:
  Temporal y PDF final.
- Execution notes:
  Confirmar correspondencia con el `.tex`.
- Verification method:
  Timestamp o checksum coherente y PDF abrible.
- Dependencies:
  Task 64.

## Task 66: Registrar el número de páginas

- Objective:
  Documentar el tamaño final del informe.
- Files or areas likely involved:
  PDF final y registro del change.
- Execution notes:
  No considerar el conteo definitivo hasta completar revisión visual.
- Verification method:
  Conteo registrado.
- Dependencies:
  Task 65.

**Fase 12 — Revisión visual**

## Task 67: Renderizar todas las páginas

- Objective:
  Crear vistas temporales para inspección.
- Files or areas likely involved:
  `docs/informe-final.pdf` y temporal.
- Execution notes:
  No guardar los renders dentro del repositorio.
- Verification method:
  Una imagen temporal por página.
- Dependencies:
  Task 65.

## Task 68: Inspeccionar material preliminar e índices

- Objective:
  Validar portada, revisión histórica, resumen e índices.
- Files or areas likely involved:
  Primeras páginas renderizadas.
- Execution notes:
  Revisar enlaces, numeración y caracteres.
- Verification method:
  Checklist por página.
- Dependencies:
  Task 67.

## Task 69: Inspeccionar el cuerpo completo

- Objective:
  Detectar cortes, desbordes, vacíos y superposiciones.
- Files or areas likely involved:
  Todas las páginas del cuerpo.
- Execution notes:
  Revisar cada página individualmente.
- Verification method:
  Registro página → defecto → acción.
- Dependencies:
  Task 67.

## Task 70: Inspeccionar las cinco imágenes obligatorias

- Objective:
  Confirmar legibilidad, captions, fuentes y orientación.
- Files or areas likely involved:
  Páginas que contienen Gantt, RACI y riesgos.
- Execution notes:
  Revisar especialmente landscape y escalado.
- Verification method:
  Cinco figuras aprobadas visualmente.
- Dependencies:
  Tasks 67 and 69.

## Task 71: Inspeccionar anexos y bibliografía

- Objective:
  Validar continuidad, referencias y formato final.
- Files or areas likely involved:
  Páginas finales.
- Execution notes:
  Confirmar ausencia de duplicaciones innecesarias.
- Verification method:
  Checklist de anexos y referencias.
- Dependencies:
  Task 67.

## Task 72: Corregir defectos visuales y recompilar

- Objective:
  Resolver todos los problemas visibles.
- Files or areas likely involved:
  `.tex`, temporal y PDF final.
- Execution notes:
  Repetir compilación y renderizado hasta estabilizar.
- Verification method:
  Cero defectos visuales bloqueantes.
- Dependencies:
  Tasks 68 through 71.

## Task 73: Confirmar el número final de páginas

- Objective:
  Registrar el conteo después de todas las correcciones.
- Files or areas likely involved:
  PDF final.
- Execution notes:
  Sustituir el conteo provisional.
- Verification method:
  Conteo final documentado.
- Dependencies:
  Task 72.

**Fase 13 — Validación documental**

## Task 74: Validar cobertura de requerimientos

- Objective:
  Confirmar RF y RNF sin omisiones.
- Files or areas likely involved:
  `.tex` y matriz.
- Execution notes:
  Buscar identificadores programáticamente cuando sea posible.
- Verification method:
  27 RF y 19 RNF presentes.
- Dependencies:
  Task 72.

## Task 75: Validar RF-02 y RF-22

- Objective:
  Evitar afirmaciones incorrectas de cumplimiento.
- Files or areas likely involved:
  Todo el informe.
- Execution notes:
  Buscar perfil, datos personales, RF-02 y RF-22.
- Verification method:
  Estados y narrativa coherentes en todas las secciones.
- Dependencies:
  Task 74.

## Task 76: Validar propuestas futuras

- Objective:
  Confirmar que perfil y lenguajes no aparecen como entregados.
- Files or areas likely involved:
  Sprints, resultados, conclusiones y trabajo futuro.
- Execution notes:
  Revisar cada mención.
- Verification method:
  Ambas propuestas clasificadas únicamente como futuras.
- Dependencies:
  Task 75.

## Task 77: Validar referencias cruzadas

- Objective:
  Confirmar índices, figures, tables, sections y bibliografía.
- Files or areas likely involved:
  `.tex`, PDF y log.
- Execution notes:
  Revisar labels duplicados y referencias sin uso.
- Verification method:
  Cero referencias o citas indefinidas.
- Dependencies:
  Task 72.

## Task 78: Validar la guardia de escritura

- Objective:
  Confirmar el alcance exclusivamente permitido.
- Files or areas likely involved:
  Diff final.
- Execution notes:
  Revisar status, diff name-only, diff stat y diff check.
- Verification method:
  Solo `README.md`, `.tex`, `.pdf` y artefactos del change introducidos.
- Dependencies:
  Tasks 1 and 72.

## Task 79: Validar ausencia de auxiliares

- Objective:
  Confirmar limpieza del repositorio.
- Files or areas likely involved:
  `docs/`.
- Execution notes:
  Buscar extensiones auxiliares.
- Verification method:
  Solo el PDF final permanece.
- Dependencies:
  Tasks 62 through 78.

## Task 80: Completar el checklist de aceptación

- Objective:
  Revisar todos los criterios del spec.
- Files or areas likely involved:
  Artefactos del change, `.tex`, PDF y diff.
- Execution notes:
  No marcar criterios no comprobados.
- Verification method:
  Evidencia asociada a cada criterio.
- Dependencies:
  Tasks 73 through 79.

**Fase 14 — Revisión manual**

## Task 81: Preparar el paquete de revisión

- Objective:
  Facilitar la evaluación académica y técnica.
- Files or areas likely involved:
  `docs/informe-final.tex`, `docs/informe-final.pdf` y diff del change.
- Execution notes:
  Incluir resumen de estructura, páginas, limitaciones y decisiones.
- Verification method:
  Paquete disponible sin crear evidencias nuevas.
- Dependencies:
  Task 80.

## Task 82: Solicitar revisión y aprobación manual

- Objective:
  Mantener el change activo hasta la aceptación del responsable.
- Files or areas likely involved:
  Estado del change.
- Execution notes:
  No archivar, hacer commit ni push.
- Verification method:
  La tarea permanece pendiente hasta aprobación expresa.
- Dependencies:
  Task 81.

## Review Workload Forecast

- Estimated LoC changed:
  1,500-3,500 líneas en `docs/informe-final.tex`, dependiendo del contenido ya válido, más la actualización binaria de `docs/informe-final.pdf`. El frontend debe registrar 0 LoC modificadas.
- Risk of exceeding 400 LoC review threshold:
  Very high.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: inventario, estructura académica y material preliminar.
  - PR 2: requerimientos, RF/RNF y matriz de trazabilidad.
  - PR 3: arquitectura, modelado e implementación.
  - PR 4: Scrum, cronogramas, RACI y riesgos.
  - PR 5: calidad, resultados, conclusiones y anexos.
  - PR 6: figuras, compilación, correcciones visuales y PDF final.
  - Todos los PRs deben pertenecer al mismo change.
  - El último PR debe permanecer pendiente de aprobación manual antes de cualquier archive.

## Estado de ejecución — 29/07/2026

- [x] Baseline Git registrado en la rama `develop`; las cinco imágenes obligatorias y la carpeta del change ya eran archivos no rastreados preexistentes.
- [x] Whitelist inicial aplicada: informe LaTeX, PDF final y artefactos de este change; la ampliación posterior autoriza también `README.md`.
- [x] Briefing OpenSpec e informe LaTeX anterior leídos completamente; metadatos e integrantes preservados.
- [x] Auditoría documental, README, historias, changes, retrospectivas, diagramas, rutas, layouts, features y contratos frontend consultados en modo de solo lectura.
- [x] Estructura académica de seis fases y enfoque SRS integrados.
- [x] RF-01 a RF-27 y RNF-01 a RNF-19 incorporados en una matriz canónica de 46 filas.
- [x] RF-02 clasificado como `NO IMPLEMENTADO` y RF-22 como `IMPLEMENTADO PARCIALMENTE`.
- [x] Versiones estables de lenguajes y actualización de datos personales registradas como propuestas no implementadas.
- [x] Cinco imágenes obligatorias incorporadas una sola vez, en páginas horizontales, con caption, label, fuente y referencia textual.
- [x] Diagramas aprobados incorporados sin regenerar PlantUML ni modificar imágenes.
- [x] Compilación ejecutada con `latexmk -xelatex` en un directorio temporal; índices y referencias estabilizados automáticamente.
- [x] Log final validado sin errores LaTeX, referencias o citas indefinidas, labels duplicados, imágenes faltantes, overfull boxes, caracteres faltantes ni warnings de fuente.
- [x] PDF final validado: 43 páginas, texto extraíble, 12 fuentes embebidas y 22 entradas de imagen/máscara registradas.
- [x] Las 43 páginas fueron renderizadas a PNG a 175 DPI e inspeccionadas visualmente; no se observaron cortes, superposiciones, tablas fuera de margen, figuras deformadas o referencias visibles sin resolver.
- [x] Integridad de las cinco imágenes confirmada contra tamaño y SHA-256 del baseline; no fueron modificadas.
- [x] `ProyectoFinal_Ing_de_Soft.pdf` consultado únicamente como referencia visual y estructural de la primera página; no se copiaron sus datos personales, fecha, título, contenido, colores ni elementos gráficos específicos.
- [x] Carátula institucional de una página incorporada con datos aprobados de UPDS JUDGE y el logotipo vigente del producto reutilizado desde una captura existente; no se inventaron facultad, asignatura, docente ni ciudad ausentes de las fuentes aprobadas.
- [x] Carátula renderizada a 200 DPI e inspeccionada visualmente: jerarquía, márgenes, centrado, legibilidad, recorte proporcional del logotipo y ausencia de número de página confirmados.
- [x] Matriz interna de cobertura completada para las 19 categorías obligatorias: README, auditoría, retrospectivas, historias, changes activos y archivados, hotfixes UJ-18, diagramas, imágenes, rutas, features, layouts, servicios, contratos, package, RF/RNF, planificación, RACI y riesgos.
- [x] `docs/informe-final.pdf` generado desde la fuente final y guardado sin auxiliares LaTeX en el repositorio.
- [x] Guardias de escritura y validación Git inicial ejecutadas; no se modificaron frontend, capturas, PlantUML ni otros documentos o changes.
- [x] El change permanece activo; no se realizó commit, push ni archive.

## Ampliación obligatoria — guía, entrevista, enlaces y README

- [x] Leer completamente `guia.md`.
- [x] Extraer enlaces oficiales del proyecto.
- [x] Documentar los tres actores y sus responsabilidades.
- [x] Incorporar la entrevista como técnica y evidencia.
- [x] Incorporar el enlace del audio únicamente en el informe.
- [x] Identificar el repositorio frontend.
- [x] Identificar el repositorio backend.
- [x] Identificar el recurso o imagen Docker.
- [x] Identificar las guías de instalación externas.
- [x] Crear la tabla de recursos digitales.
- [x] Actualizar `README.md`.
- [x] Documentar instalación local del frontend.
- [x] Documentar build de producción.
- [x] Documentar despliegue del frontend.
- [x] Documentar fallback SPA.
- [x] Documentar variables de entorno sin secretos.
- [x] Verificar enlaces del README.
- [x] Verificar hipervínculos del informe compilado.
- [x] Ejecutar la autoauditoría textual y la guardia Git final; `guia.md`, frontend, imágenes, capturas, PlantUML y documentos históricos permanecen sin cambios atribuibles a la ampliación.
- [ ] Revisión y aprobación manual del informe final por el responsable del
  proyecto.
