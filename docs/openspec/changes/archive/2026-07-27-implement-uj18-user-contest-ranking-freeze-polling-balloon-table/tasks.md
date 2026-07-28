# Tasks

**Fase 0 — Baseline y contratos**

## Task 1: Registrar el baseline de Git

- Objective:
  Identificar branch, working tree y cambios preexistentes.
- Files or areas likely involved:
  Repositorio completo.
- Execution notes:
  Ejecutar branch, status, diff name-status, diff stat y diff check. No restaurar archivos.
- Verification method:
  Resultados fechados y clasificados.
- Dependencies:
  None.

## Task 2: Ejecutar el baseline técnico

- Objective:
  Registrar audit, lint, typecheck, tests y build previos.
- Files or areas likely involved:
  `frontend/`.
- Execution notes:
  No ejecutar install, update ni audit fix.
- Verification method:
  Número de tests, fallos, warnings y resultados documentados.
- Dependencies:
  Task 1.

## Task 3: Localizar documentación UJ-18

- Objective:
  Confirmar si existe documentación previa.
- Files or areas likely involved:
  `docs/historias/`, `docs/openspec/` y retrospectivas.
- Execution notes:
  Buscar UJ-18, ranking, penalización y congelamiento.
- Verification method:
  Matriz de documentos vigentes.
- Dependencies:
  Task 1.

## Task 4: Revisar UJ-19 y colores

- Objective:
  Confirmar mapper, catálogo, GlobeIllustration y minutosCongelamiento.
- Files or areas likely involved:
  Documentación y change UJ-19.
- Execution notes:
  No duplicar decisiones.
- Verification method:
  Contratos compartidos identificados.
- Dependencies:
  Task 3.

## Task 5: Extraer y revisar las referencias visuales

- Objective:
  Confirmar composición, globos, tabla y responsive.
- Files or areas likely involved:
  `Contest Standings Table.png` y `balloons-reference.jpeg`.
- Execution notes:
  Registrar elementos utilizables y excluidos.
- Verification method:
  Checklist visual contrastado con el alcance.
- Dependencies:
  Task 1.

## Task 6: Inspeccionar la feature ranking

- Objective:
  Determinar si existe código parcial o una carpeta vacía.
- Files or areas likely involved:
  `frontend/src/features/ranking/`.
- Execution notes:
  Inventariar archivos, exports, tests y consumers.
- Verification method:
  Árbol real y estado por archivo.
- Dependencies:
  Task 1.

## Task 7: Inspeccionar ContestContextHeader

- Objective:
  Confirmar API de navegación, active section y route descriptors.
- Files or areas likely involved:
  Header, Problems y Submissions.
- Execution notes:
  Registrar rutas de usuario y administración.
- Verification method:
  Matriz sección → builder → wrapper.
- Dependencies:
  Task 1.

## Task 8: Inspeccionar GlobeIllustration y el mapper

- Objective:
  Confirmar props, hexadecimal, fallback y accesibilidad.
- Files or areas likely involved:
  `GlobeIllustration.tsx` y `balloon-colors.ts`.
- Execution notes:
  No modificar durante inspección.
- Verification method:
  Contrato de reutilización documentado.
- Dependencies:
  Task 4.

## Task 9: Inspeccionar componentes base y paginación

- Objective:
  Localizar Table, Card, Alert, Skeleton y el footer de envíos recientes.
- Files or areas likely involved:
  Componentes compartidos y `RecentSubmissionsTable`.
- Execution notes:
  Reutilizar estilo, no lógica incompatible.
- Verification method:
  Matriz de componentes disponibles.
- Dependencies:
  Task 1.

## Task 10: Confirmar el endpoint backend

- Objective:
  Identificar controller, ruta, autorización y errores.
- Files or areas likely involved:
  Backend de referencia.
- Execution notes:
  Inspección de solo lectura.
- Verification method:
  Contrato endpoint completo.
- Dependencies:
  Task 3.

## Task 11: Confirmar DTOs y algoritmo

- Objective:
  Verificar campos, estados, orden, empates y congelamiento.
- Files or areas likely involved:
  DTOs, servicios y modelos backend.
- Execution notes:
  No limitarse al fragmento proporcionado.
- Verification method:
  Tabla campo → semántica → nulabilidad.
- Dependencies:
  Task 10.

## Task 12: Identificar brechas contractuales

- Objective:
  Resolver problemas superiores, inscritos, envíos, cards y fechas.
- Files or areas likely involved:
  Backend, OpenAPI y frontend.
- Execution notes:
  Diferenciar campo existente de extensión propuesta.
- Verification method:
  Matriz requisito → fuente → brecha → decisión.
- Dependencies:
  Tasks 10 and 11.

## Task 13: Confirmar OpenAPI

- Objective:
  Comparar controller, esquema y tipos generados.
- Files or areas likely involved:
  Swagger/OpenAPI y `api.generated.ts`.
- Execution notes:
  No editar el archivo generado.
- Verification method:
  Diferencias contractuales registradas.
- Dependencies:
  Tasks 10 through 12.

**Fase 1 — Contratos y OpenAPI**

## Task 14: Resolver participantes sin envíos

- Objective:
  Definir si todos los inscritos aparecen.
- Files or areas likely involved:
  DTO y cálculo backend.
- Execution notes:
  No inventar la regla.
- Verification method:
  Decisión documentada y caso contractual.
- Dependencies:
  Tasks 11 and 12.

## Task 15: Resolver la lista superior de problemas

- Objective:
  Permitir columnas cuando el ranking esté vacío.
- Files or areas likely involved:
  Response ranking o endpoint reutilizable.
- Execution notes:
  Preferir una fuente contractual única.
- Verification method:
  Ranking vacío conserva problemas.
- Dependencies:
  Task 12.

## Task 16: Resolver total de inscritos

- Objective:
  Definir la fuente de la card Inscritos.
- Files or areas likely involved:
  Response ranking o contrato de participantes.
- Execution notes:
  No usar filas cuando se omitan inscritos.
- Verification method:
  Test con inscrito sin envíos.
- Dependencies:
  Task 14.

## Task 17: Resolver total de envíos

- Objective:
  Obtener un total compatible con congelamiento.
- Files or areas likely involved:
  Response ranking y cálculo backend.
- Execution notes:
  No sumar intentos.
- Verification method:
  Test con accepted, fallos y envíos posteriores.
- Dependencies:
  Task 12.

## Task 18: Resolver problema más resuelto

- Objective:
  Definir fuente, empate y snapshot.
- Files or areas likely involved:
  Response ranking o adapter.
- Execution notes:
  Preferir backend cuando el contrato lo soporte.
- Verification method:
  Tests de empate y ranking vacío.
- Dependencies:
  Tasks 12 and 15.

## Task 19: Resolver fechas y hora de referencia

- Objective:
  Obtener datos fiables para countdown.
- Files or areas likely involved:
  Ranking response, dashboard o detalle.
- Execution notes:
  Documentar desfase cuando no exista hora de servidor.
- Verification method:
  Contrato temporal aprobado.
- Dependencies:
  Task 12.

## Task 20: Definir la extensión mínima del response

- Objective:
  Añadir únicamente campos imprescindibles.
- Files or areas likely involved:
  Backend y OpenAPI cuando corresponda.
- Execution notes:
  Aplicar el mismo corte de congelamiento.
- Verification method:
  DTO final cubre columnas, cards y countdown.
- Dependencies:
  Tasks 14 through 19.

## Task 21: Regenerar tipos OpenAPI

- Objective:
  Sincronizar el frontend cuando cambie el contrato.
- Files or areas likely involved:
  Tipos generados.
- Execution notes:
  Ejecutar el script real y revisar el diff.
- Verification method:
  `api:types`, typecheck y diff esperado.
- Dependencies:
  Tasks 13 and 20.

## Task 22: Definir adapters frontend

- Objective:
  Adaptar DTOs a presentación sin recalcular.
- Files or areas likely involved:
  Feature ranking.
- Execution notes:
  Preservar orden y puestos.
- Verification method:
  Tests de mapping.
- Dependencies:
  Tasks 11 and 21.

**Fase 2 — Routing y Header**

## Task 23: Definir el route builder de ranking

- Objective:
  Crear una ruta contextual coherente.
- Files or areas likely involved:
  Route builders.
- Execution notes:
  Usar `contestCode` y encoding correcto.
- Verification method:
  Tests del builder.
- Dependencies:
  Task 7.

## Task 24: Registrar la ruta de usuario

- Objective:
  Montar ranking bajo UserLayout.
- Files or areas likely involved:
  Router y page export.
- Execution notes:
  Componer guards existentes.
- Verification method:
  Tests de ruta directa y refresh.
- Dependencies:
  Tasks 10 and 23.

## Task 25: Extender la API activa del Header

- Objective:
  Añadir el valor ranking sin romper secciones existentes.
- Files or areas likely involved:
  `ContestContextHeader.tsx` y tipos.
- Execution notes:
  No usar estado local.
- Verification method:
  Typecheck y tests de active section.
- Dependencies:
  Task 7.

## Task 26: Añadir el descriptor Ranking

- Objective:
  Mostrar la navegación contextual.
- Files or areas likely involved:
  Wrappers y Header.
- Execution notes:
  Mantener Problemas y Mis envíos.
- Verification method:
  Tests de labels, orden y destinos.
- Dependencies:
  Tasks 23 through 25.

## Task 27: Confirmar el contexto administrativo

- Objective:
  Decidir si Ranking se expone bajo Acceso de Usuario.
- Files or areas likely involved:
  Rutas admin, roles y documentación.
- Execution notes:
  Decisión predeterminada: fuera de alcance sin evidencia.
- Verification method:
  Decisión documentada.
- Dependencies:
  Tasks 7, 10 and 24.

## Task 28: Completar pruebas de routing

- Objective:
  Cubrir auth, público, privado, próximo, finalizado y errores.
- Files or areas likely involved:
  Tests de router y Header.
- Execution notes:
  Incluir acceso directo y refresh.
- Verification method:
  Matriz de routing en verde.
- Dependencies:
  Tasks 24 through 27.

**Fase 3 — Query y polling**

## Task 29: Registrar el endpoint frontend

- Objective:
  Centralizar la ruta contractual.
- Files or areas likely involved:
  Endpoints compartidos.
- Execution notes:
  No hardcodear en componentes.
- Verification method:
  Service test.
- Dependencies:
  Tasks 10 and 13.

## Task 30: Crear o adaptar el servicio de ranking

- Objective:
  Consumir el DTO autenticado.
- Files or areas likely involved:
  Feature ranking y HttpClient.
- Execution notes:
  Preservar errores contractuales.
- Verification method:
  Tests de 200, 400, 401, 403 y 404.
- Dependencies:
  Tasks 22 and 29.

## Task 31: Definir la query key

- Objective:
  Mantener una caché estable por concurso.
- Files or areas likely involved:
  Query factory o hook.
- Execution notes:
  No incluir tiempo actual.
- Verification method:
  Tests de igualdad y cambio de código.
- Dependencies:
  Task 30.

## Task 32: Crear el hook de ranking

- Objective:
  Exponer loading, fetching, error y datos.
- Files or areas likely involved:
  Feature ranking.
- Execution notes:
  Una query para toda la página.
- Verification method:
  Hook tests.
- Dependencies:
  Task 31.

## Task 33: Configurar polling de diez segundos

- Objective:
  Refetch periódico exacto.
- Files or areas likely involved:
  Hook/query.
- Execution notes:
  Preferir `refetchInterval`.
- Verification method:
  Fake timers en 0, 10 y 20 segundos.
- Dependencies:
  Task 32.

## Task 34: Definir la condición de parada

- Objective:
  Detener polling después del resultado final y ante errores definitivos.
- Files or areas likely involved:
  Hook/query.
- Execution notes:
  Continuar durante congelamiento.
- Verification method:
  Tests activo, congelado, finalizado y errores.
- Dependencies:
  Tasks 11, 19 and 33.

## Task 35: Mantener datos durante background refetch

- Objective:
  Evitar parpadeo y pérdida de tabla.
- Files or areas likely involved:
  Configuración de query y page.
- Execution notes:
  Usar el patrón soportado por la versión instalada.
- Verification method:
  Test de filas visibles durante fetching.
- Dependencies:
  Task 32.

## Task 36: Completar pruebas del polling

- Objective:
  Cubrir desmontaje, duplicados y reconexión.
- Files or areas likely involved:
  Tests del hook.
- Execution notes:
  Limpiar fake timers.
- Verification method:
  Suite de polling en verde.
- Dependencies:
  Tasks 33 through 35.

**Fase 4 — Congelamiento y countdown**

## Task 37: Crear el aviso congelado

- Objective:
  Comunicar el snapshot público.
- Files or areas likely involved:
  Componentes de ranking.
- Execution notes:
  Depender de `congelado`.
- Verification method:
  Tests visible/oculto y accesibilidad.
- Dependencies:
  Task 22.

## Task 38: Verificar consistencia del snapshot

- Objective:
  Impedir filtraciones mediante cards.
- Files or areas likely involved:
  Adapter y response.
- Execution notes:
  No mezclar endpoints en vivo.
- Verification method:
  Tests con datos posteriores al corte.
- Dependencies:
  Tasks 17, 18 and 20.

## Task 39: Crear helpers de tiempo

- Objective:
  Calcular fecha final, restante, clamp y formato.
- Files or areas likely involved:
  Utils de ranking.
- Execution notes:
  Manejar UTC y más de veinticuatro horas.
- Verification method:
  Unit tests.
- Dependencies:
  Task 19.

## Task 40: Crear el countdown

- Objective:
  Actualizar visualmente cada segundo.
- Files or areas likely involved:
  Hook o componente de ranking.
- Execution notes:
  No hacer HTTP; limpiar timer.
- Verification method:
  Fake timers y Network.
- Dependencies:
  Task 39.

## Task 41: Crear las cards de resumen

- Objective:
  Mostrar las cuatro métricas contractuales.
- Files or areas likely involved:
  Componentes de ranking.
- Execution notes:
  No crear Última actualización.
- Verification method:
  Tests de datos, fallback y congelamiento.
- Dependencies:
  Tasks 16 through 20, 38 and 40.

## Task 42: Completar pruebas de congelamiento

- Objective:
  Cubrir cero, antes, inicio, ventana y final.
- Files or areas likely involved:
  Page, notice, cards y hook.
- Execution notes:
  Incluir polling y resultado final.
- Verification method:
  Suite de congelamiento en verde.
- Dependencies:
  Tasks 34, 37, 38 and 41.

**Fase 5 — Tabla**

## Task 43: Definir el view model de la tabla

- Objective:
  Representar columnas y filas sin alterar ranking.
- Files or areas likely involved:
  Tipos/adapters de ranking.
- Execution notes:
  Preservar puesto y orden.
- Verification method:
  Mapper tests.
- Dependencies:
  Tasks 15 and 22.

## Task 44: Crear la estructura semántica

- Objective:
  Renderizar columnas fijas con primitivas existentes.
- Files or areas likely involved:
  Ranking table.
- Execution notes:
  Incluir caption y scopes.
- Verification method:
  Tests de semántica.
- Dependencies:
  Tasks 9 and 43.

## Task 45: Crear columnas dinámicas

- Objective:
  Renderizar un encabezado por problema.
- Files or areas likely involved:
  Ranking table.
- Execution notes:
  Ordenar por inciso contractual.
- Verification method:
  Tests con cero, uno y múltiples problemas.
- Dependencies:
  Tasks 15, 43 and 44.

## Task 46: Renderizar posición y participante

- Objective:
  Mostrar puesto y nombre contractual.
- Files or areas likely involved:
  Ranking table.
- Execution notes:
  No usar índice ni exponer ID.
- Verification method:
  Test de puestos compartidos.
- Dependencies:
  Task 44.

## Task 47: Renderizar resueltos y penalización

- Objective:
  Mostrar valores backend sin recalcular.
- Files or areas likely involved:
  Ranking table.
- Execution notes:
  Añadir unidad comprensible.
- Verification method:
  Tests con valores conocidos.
- Dependencies:
  Task 44.

## Task 48: Crear la celda aceptada

- Objective:
  Mostrar globo, color, tiempo y fallos previos.
- Files or areas likely involved:
  Ranking problem cell.
- Execution notes:
  Reutilizar mapper y GlobeIllustration.
- Verification method:
  Tests con cero y varios fallos.
- Dependencies:
  Tasks 8, 43 and 45.

## Task 49: Crear la celda no resuelta

- Objective:
  Mostrar fallos sin globo.
- Files or areas likely involved:
  Ranking problem cell.
- Execution notes:
  No depender solo de rojo.
- Verification method:
  Tests de texto y estilo semántico.
- Dependencies:
  Task 43.

## Task 50: Crear la celda no intentada

- Objective:
  Mostrar un estado neutral.
- Files or areas likely involved:
  Ranking problem cell.
- Execution notes:
  No mostrar cero intentos como fallo.
- Verification method:
  Test de estado neutral.
- Dependencies:
  Task 43.

## Task 51: Manejar colores y estados desconocidos

- Objective:
  Evitar crashes ante datos legacy.
- Files or areas likely involved:
  Adapter y celdas.
- Execution notes:
  Usar fallback neutral.
- Verification method:
  Tests de valor desconocido.
- Dependencies:
  Tasks 8 and 48 through 50.

## Task 52: Completar responsive de tabla

- Objective:
  Soportar muchas columnas mediante scroll horizontal.
- Files or areas likely involved:
  Shell de la tabla.
- Execution notes:
  Mantener encabezados legibles.
- Verification method:
  Checklist desktop, tablet y móvil.
- Dependencies:
  Tasks 44 through 51.

## Task 53: Completar pruebas de tabla

- Objective:
  Cubrir orden, empates, celdas, globos y accesibilidad.
- Files or areas likely involved:
  Tests de ranking table.
- Execution notes:
  No basar toda la prueba en clases CSS.
- Verification method:
  Suite de tabla en verde.
- Dependencies:
  Tasks 44 through 52.

**Fase 6 — Paginación**

## Task 54: Definir page size y helpers

- Objective:
  Implementar páginas fijas de cinco.
- Files or areas likely involved:
  Utils o hook local.
- Execution notes:
  Calcular total, rango y slice.
- Verification method:
  Tests con 0, 1, 5, 6, 10 y 11.
- Dependencies:
  Task 43.

## Task 55: Crear el footer de paginación

- Objective:
  Reutilizar convenciones visuales existentes.
- Files or areas likely involved:
  Ranking table y referencia RecentSubmissionsTable.
- Execution notes:
  No copiar lógica contractual de envíos.
- Verification method:
  Test de labels, disabled y rango.
- Dependencies:
  Tasks 9 and 54.

## Task 56: Preservar página durante polling

- Objective:
  Evitar reinicios innecesarios.
- Files or areas likely involved:
  Ranking page.
- Execution notes:
  Hacer clamp solo cuando cambie el total de páginas.
- Verification method:
  Tests de aumento y reducción.
- Dependencies:
  Tasks 35, 54 and 55.

## Task 57: Completar pruebas de paginación

- Objective:
  Cubrir navegación y puestos compartidos.
- Files or areas likely involved:
  Tests de ranking page/table.
- Execution notes:
  Incluir última página parcial.
- Verification method:
  Suite de paginación en verde.
- Dependencies:
  Tasks 54 through 56.

**Fase 7 — Cards informativas**

## Task 58: Crear la leyenda de celdas

- Objective:
  Explicar aceptado, no resuelto y no intentado.
- Files or areas likely involved:
  Componentes de ranking.
- Execution notes:
  Reutilizar estilos de celdas.
- Verification method:
  Test de tres estados y ausencia de congelamiento.
- Dependencies:
  Tasks 48 through 50.

## Task 59: Crear la explicación de penalización

- Objective:
  Documentar el algoritmo sin recalcularlo.
- Files or areas likely involved:
  Componentes de ranking.
- Execution notes:
  No incluir enlace a reglas.
- Verification method:
  Test de contenido obligatorio.
- Dependencies:
  Task 47.

## Task 60: Verificar exactamente dos cards

- Objective:
  Excluir Información del problema.
- Files or areas likely involved:
  Ranking page.
- Execution notes:
  Mantener composición responsive.
- Verification method:
  Test de cantidad y títulos.
- Dependencies:
  Tasks 58 and 59.

**Fase 8 — Estados y regresión**

## Task 61: Implementar loading inicial

- Objective:
  Mostrar skeletons sin datos ficticios.
- Files or areas likely involved:
  Ranking page.
- Execution notes:
  Preservar Header cuando ya exista contexto.
- Verification method:
  Test de loading.
- Dependencies:
  Tasks 32, 41 and 44.

## Task 62: Implementar empty states

- Objective:
  Diferenciar ranking vacío, sin envíos y sin problemas cuando sea posible.
- Files or areas likely involved:
  Ranking page/table.
- Execution notes:
  Usar contratos confirmados.
- Verification method:
  Tests de respuestas vacías.
- Dependencies:
  Tasks 15 and 61.

## Task 63: Implementar errores contractuales

- Objective:
  Mostrar próximo, forbidden, not found e inesperado.
- Files or areas likely involved:
  Ranking page y error mapper.
- Execution notes:
  Reutilizar componentes existentes.
- Verification method:
  Tests de 400, 401, 403, 404 y 500.
- Dependencies:
  Tasks 28 and 30.

## Task 64: Actualizar MSW

- Objective:
  Simular activo, congelado, finalizado, vacío, empates y errores.
- Files or areas likely involved:
  Handlers y fixtures.
- Execution notes:
  Respetar el DTO final.
- Verification method:
  Tests de handlers.
- Dependencies:
  Tasks 20 through 22.

## Task 65: Ejecutar regresión del Header

- Objective:
  Preservar Problemas, Mis envíos y contextos existentes.
- Files or areas likely involved:
  Header, routes y wrappers.
- Execution notes:
  Incluir rutas administrativas si existen.
- Verification method:
  Suite de Header y routing.
- Dependencies:
  Tasks 25 through 28.

## Task 66: Ejecutar regresión transversal

- Objective:
  Preservar UJ-19, concursos, Problems, Submissions y layouts.
- Files or areas likely involved:
  Tests existentes.
- Execution notes:
  No modificar dependencias.
- Verification method:
  Suite completa.
- Dependencies:
  Tasks 53, 57, 60, 63 and 65.

## Task 67: Validar accesibilidad y responsive

- Objective:
  Verificar tabla, globos, notice, timer, cards y paginación.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar teclado y lectores semánticos cuando la infraestructura lo permita.
- Verification method:
  Checklist manual.
- Dependencies:
  Tasks 52, 60 and 66.

**Fase 9 — Documentación y evidencias**

## Task 68: Crear o actualizar la documentación UJ-18

- Objective:
  Registrar historia, flujo, contratos y estado final.
- Files or areas likely involved:
  `docs/historias/UJ-18-...md`.
- Execution notes:
  Buscar primero un documento existente.
- Verification method:
  Secciones obligatorias completas.
- Dependencies:
  Tasks 20, 42, 53, 57 and 60.

## Task 69: Documentar brechas contractuales

- Objective:
  Registrar participantes, problemas, cards y fechas.
- Files or areas likely involved:
  UJ-18 y documentación técnica.
- Execution notes:
  Diferenciar implementado de pendiente.
- Verification method:
  Cada extensión backend queda trazable.
- Dependencies:
  Tasks 14 through 20.

## Task 70: Registrar evidencias manuales pendientes

- Objective:
  Preparar las ocho evidencias solicitadas.
- Files or areas likely involved:
  Documento UJ-18.
- Execution notes:
  No crear imágenes ni marcar checkboxes.
- Verification method:
  Rutas sugeridas presentes como texto.
- Dependencies:
  Tasks 67 and 68.

## Task 71: Ejecutar validaciones frontend

- Objective:
  Confirmar audit, OpenAPI, lint, tipos, tests, build y dev.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No afirmar éxito antes de ejecutar.
- Verification method:
  Resultados reales documentados.
- Dependencies:
  Tasks 64 through 70.

## Task 72: Ejecutar validaciones backend cuando aplique

- Objective:
  Verificar cualquier extensión contractual.
- Files or areas likely involved:
  Backend.
- Execution notes:
  Ejecutar build y tests solo si existe cambio backend.
- Verification method:
  Resultados documentados.
- Dependencies:
  Tasks 20 and 71.

## Task 73: Validar con datos reales

- Objective:
  Comprobar activo, congelado, finalizado, globos, polling y paginación.
- Files or areas likely involved:
  Frontend, backend y Network.
- Execution notes:
  No registrar JWT o datos sensibles.
- Verification method:
  Checklist funcional completo.
- Dependencies:
  Tasks 71 and 72.

## Task 74: Auditar el diff final

- Objective:
  Confirmar alcance y ausencia de regresiones.
- Files or areas likely involved:
  Repositorio completo.
- Execution notes:
  Ejecutar diff check, name-status, stat y status. No hacer commit, push o archive.
- Verification method:
  Diff limpio y limitado a UJ-18.
- Dependencies:
  Tasks 70 through 73.

## Review Workload Forecast

- Estimated LoC changed:
  900-1,700 LoC en frontend, mocks, pruebas y documentación. Una extensión backend y OpenAPI puede añadir 150-400 LoC adicionales.
- Risk of exceeding 400 LoC review threshold:
  Very high.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: baseline, contrato backend, gaps y OpenAPI.
  - PR 2: routing, ContestContextHeader y skeleton de la feature.
  - PR 3: servicio, query, polling y estados de error.
  - PR 4: congelamiento, countdown y cards.
  - PR 5: tabla dinámica, celdas y globos.
  - PR 6: paginación y cards informativas.
  - PR 7: MSW, regresión, documentación y validación final.
  - Todos los PRs deben pertenecer al mismo change OpenSpec.

## Implementation status — 2026-07-27

- [x] Baseline, OpenSpec source documents, existing header, routing, color mapper, ranking controller and visual-reference availability were inspected.
- [x] Ranking backend contract was extended with active enrolled participants, top-level problems, snapshot metrics, timing metadata and deterministic most-solved problem.
- [x] User ranking route, contextual navigation, single-query polling, frozen notice, countdown, summary cards, semantic table, balloon cells, local five-row pagination and lower information cards were implemented.
- [x] Unit coverage was added for pagination and countdown helpers.
- [x] UJ-18 documentation and evidence references were added and reviewed with the responsible project owner.
- [x] OpenAPI regeneration completed.
- [x] Browser-authenticated/manual validation was confirmed by the responsible project owner.

## Final closure — 2026-07-27

- [x] Ranking normal and administrative contextual routes, layouts and active Header state were verified by focused integration tests.
- [x] Ranking polling, frozen snapshot, countdown, cards, table, balloons, pagination and controlled incompatible-payload error are covered by the ranking implementation and regression suite.
- [x] `ProblemsTable` maps the real dashboard contract: `Accepted`, `Sin intentar` and the five failed submission verdicts; it has an integration rendering test with representative A/B/C data.
- [x] `UserLayout` navigation is grouped with branding and has focused structural coverage for active, focus-visible and enlarged links.
- [x] Frontend audit, API generation, lint, typecheck, complete tests and production build were executed. Global formatting debt is pre-existing and focal files were formatted.
- [x] Backend build and `dotnet test` were executed; the solution contains no backend test project/cases.
- [x] Documentation, evidence references, final diff audit and OpenSpec manual structural validation were completed.
- [x] Change is ready for archival under the repository manual OpenSpec convention.
