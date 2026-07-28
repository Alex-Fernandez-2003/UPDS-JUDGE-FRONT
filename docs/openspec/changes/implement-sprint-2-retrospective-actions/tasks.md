# Tasks

**Fase 0 — Baseline y descubrimiento**

## Task 1: Registrar el baseline de Git

- Objective:
  Proteger trabajo preexistente y delimitar el change.
- Files or areas likely involved:
  Repositorio frontend completo.
- Execution notes:
  Registrar branch, archivos modificados y changes abiertos. No restaurar ni archivar nada.
- Verification method:
  Salida revisada de estado, diff name-status y diff stat.
- Dependencies:
  None.

## Task 2: Localizar y leer las retrospectivas

- Objective:
  Confirmar los acuerdos reales de Sprint 2 y el formato histórico.
- Files or areas likely involved:
  `docs/retrospectivas/`.
- Execution notes:
  Leer completamente Sprint 2 y usar Sprint 1 solo como referencia.
- Verification method:
  Matriz acuerdo → evidencia → bloque del change.
- Dependencies:
  Task 1.

## Task 3: Ejecutar los checks funcionales iniciales

- Objective:
  Establecer el estado previo de lint, tipos, tests y build.
- Files or areas likely involved:
  `frontend/`.
- Execution notes:
  Ejecutar scripts reales sin corregir todavía.
- Verification method:
  Baseline documentado de cada comando.
- Dependencies:
  Task 1.

## Task 4: Reproducir el audit inicial

- Objective:
  Confirmar número, severidad y rutas de las vulnerabilidades actuales.
- Files or areas likely involved:
  `frontend/package.json` y `frontend/package-lock.json`.
- Execution notes:
  Ejecutar npm install, npm audit y audit con nivel high.
- Verification method:
  Reporte inicial preservado como evidencia textual.
- Dependencies:
  Task 1.

## Task 5: Inventariar el árbol de dependencias afectado

- Objective:
  Identificar dependencias directas, transitivas y versiones resueltas.
- Files or areas likely involved:
  Manifest, lockfile y árbol npm.
- Execution notes:
  Ejecutar npm ls para las dos cadenas y npm outdated.
- Verification method:
  Tabla package → versión → padre → advisory.
- Dependencies:
  Task 4.

## Task 6: Inventariar layouts, sidebar y guards

- Objective:
  Localizar AdminLayout, UserLayout, grupos del sidebar y permisos.
- Files or areas likely involved:
  Layouts, routes, auth y navegación.
- Execution notes:
  No asumir el nombre de roles.
- Verification method:
  Mapa rol → sidebar → guard → layout.
- Dependencies:
  Task 1.

## Task 7: Inventariar concursos, problemas y envíos

- Objective:
  Localizar contenido funcional, wrappers, queries y route params.
- Files or areas likely involved:
  Features contests, problems y submissions.
- Execution notes:
  Registrar qué componente incorpora actualmente cada layout.
- Verification method:
  Matriz responsabilidad → archivo → consumidores → acoplamiento.
- Dependencies:
  Task 1.

## Task 8: Verificar contratos backend

- Objective:
  Confirmar inscripción finalizada, DTOs, statuses y errores.
- Files or areas likely involved:
  Repositorio backend de referencia.
- Execution notes:
  Inspección de solo lectura; no modificar backend.
- Verification method:
  Tabla endpoint → request → response → errores → comportamiento finalizado.
- Dependencies:
  Task 1.

## Task 9: Inventariar datos del contexto del concurso

- Objective:
  Confirmar fuente de nombre, código, estado, fechas y duración.
- Files or areas likely involved:
  Queries, DTOs, services, Problems y Submissions.
- Execution notes:
  Detectar requests duplicados y datos hardcodeados.
- Verification method:
  Matriz campo → contrato → consumidor.
- Dependencies:
  Tasks 7 and 8.

## Task 10: Localizar el script OpenAPI

- Objective:
  Confirmar comando, entrada, salida e imports generados.
- Files or areas likely involved:
  package.json, scripts y tipos generados.
- Execution notes:
  Ejecutarlo como baseline cuando el entorno lo permita.
- Verification method:
  Resultado y diff inicial de generación.
- Dependencies:
  Task 5.

**Fase 1 — Contenido reutilizable de concursos**

## Task 11: Definir los boundaries de contenido y wrappers

- Objective:
  Separar funcionalidad, routing y layout.
- Files or areas likely involved:
  Páginas de concursos, problemas y envíos.
- Execution notes:
  No mover código todavía; definir props y ownership.
- Verification method:
  Diagrama y matriz de dependencias aprobados.
- Dependencies:
  Tasks 6, 7 and 9.

## Task 12: Extraer el contenido reutilizable de concursos

- Objective:
  Permitir que listado y filtros se rendericen bajo distintos layouts.
- Files or areas likely involved:
  Contests user y wrappers existentes.
- Execution notes:
  Preservar queries, filtros, loading, empty y error.
- Verification method:
  Tests del contenido sin layout y de la página user existente.
- Dependencies:
  Task 11.

## Task 13: Preservar el wrapper de usuario

- Objective:
  Mantener el flujo actual bajo UserLayout.
- Files or areas likely involved:
  Página y rutas del usuario.
- Execution notes:
  No cambiar rutas o comportamiento salvo imports necesarios.
- Verification method:
  Regresión del flujo de usuario.
- Dependencies:
  Task 12.

## Task 14: Preparar wrappers administrativos mínimos

- Objective:
  Configurar el contenido reutilizable bajo AdminLayout.
- Files or areas likely involved:
  Pages o route elements administrativos.
- Execution notes:
  No duplicar contenido funcional.
- Verification method:
  Render aislado sin UserLayout.
- Dependencies:
  Tasks 11 and 12.

## Task 15: Verificar límites y ciclos

- Objective:
  Confirmar que contests, problems y submissions no generan ciclos.
- Files or areas likely involved:
  Barrels y APIs públicas de las features.
- Execution notes:
  Preferir contratos pequeños y imports directos cuando corresponda.
- Verification method:
  Typecheck y grafo de imports.
- Dependencies:
  Tasks 12 through 14.

**Fase 2 — Acceso administrativo**

## Task 16: Agregar el grupo Acceso de Usuario

- Objective:
  Incorporar el grupo exacto en la configuración del sidebar.
- Files or areas likely involved:
  Sidebar y catálogo declarativo.
- Execution notes:
  Respetar búsqueda, orden y responsive existentes.
- Verification method:
  Test de etiqueta y visibilidad.
- Dependencies:
  Tasks 6 and 14.

## Task 17: Agregar la opción Concursos

- Objective:
  Exponer la ruta administrativa autorizada.
- Files or areas likely involved:
  Configuración del sidebar y route builder.
- Execution notes:
  No incluir Ranking.
- Verification method:
  Test de opción, destino y estado activo.
- Dependencies:
  Task 16.

## Task 18: Definir las rutas administrativas funcionales

- Objective:
  Conectar listado, problemas y mis envíos bajo AdminLayout.
- Files or areas likely involved:
  Router, route builders y wrappers.
- Execution notes:
  Seguir las convenciones existentes; soportar refresh.
- Verification method:
  Tests de resolución directa de las tres rutas.
- Dependencies:
  Tasks 14 and 17.

## Task 19: Aplicar guards y permisos

- Objective:
  Proteger visibilidad y acceso directo.
- Files or areas likely involved:
  Router, guards y helpers de rol.
- Execution notes:
  Reutilizar guards; no duplicar autenticación.
- Verification method:
  Tests con administrador autorizado y usuario no autorizado.
- Dependencies:
  Tasks 6 and 18.

## Task 20: Mantener AdminLayout durante el flujo

- Objective:
  Evitar cambio a UserLayout y doble sidebar.
- Files or areas likely involved:
  Route tree y wrappers.
- Execution notes:
  Inspeccionar árbol DOM y composición.
- Verification method:
  Tests de layout y validación visual.
- Dependencies:
  Tasks 18 and 19.

## Task 21: Validar navegación y refresh administrativo

- Objective:
  Confirmar navegación completa y URLs recargables.
- Files or areas likely involved:
  Router y route builders.
- Execution notes:
  Probar deep links sin location.state.
- Verification method:
  Tests de navegación y recarga manual.
- Dependencies:
  Task 20.

## Task 22: Validar responsive del sidebar y contenido

- Objective:
  Mantener drawer, foco y scroll en móvil.
- Files or areas likely involved:
  AdminLayout, sidebar y wrappers.
- Execution notes:
  No rediseñar el sidebar.
- Verification method:
  Checklist desktop, tablet y móvil.
- Dependencies:
  Task 21.

**Fase 3 — Concurso privado finalizado**

## Task 23: Actualizar la matriz de acceso

- Objective:
  Reemplazar bloqueo definitivo por inscripción privada finalizada.
- Files or areas likely involved:
  Policy y mappers de concursos.
- Execution notes:
  Mantener reglas públicas y activas existentes.
- Verification method:
  Tests unitarios de toda la matriz.
- Dependencies:
  Tasks 7 and 8.

## Task 24: Adaptar el disparador del modal

- Objective:
  Abrir el flujo privado para finalizados no inscritos.
- Files or areas likely involved:
  Cards, tabla o detalle y modal.
- Execution notes:
  Reutilizar el modal; no crear una copia.
- Verification method:
  Test del escenario finalizado.
- Dependencies:
  Task 23.

## Task 25: Confirmar la mutación backend

- Objective:
  Usar el endpoint y payload reales.
- Files or areas likely involved:
  Service, types, endpoints y mutation.
- Execution notes:
  Detener este bloque si backend contradice la regla.
- Verification method:
  Tests de servicio y contrato real.
- Dependencies:
  Task 8.

## Task 26: Actualizar invalidación y estado local

- Objective:
  Reflejar inscripción sin recargar la página.
- Files or areas likely involved:
  Query keys, mutation y caches.
- Execution notes:
  Invalidar lista y detalle exactos; no toda la aplicación.
- Verification method:
  Tests de caché y preservación de filtros.
- Dependencies:
  Task 25.

## Task 27: Navegar al detalle después del éxito

- Objective:
  Completar el flujo en el route context actual.
- Files or areas likely involved:
  Wrappers, modal y route builders.
- Execution notes:
  Usar builder user o admin inyectado.
- Verification method:
  Tests de ambos contextos.
- Dependencies:
  Tasks 18 and 26.

## Task 28: Manejar contraseña incorrecta y errores

- Objective:
  Mantener acceso bloqueado y modal utilizable.
- Files or areas likely involved:
  Modal, ApiError y FormField.
- Execution notes:
  No exponer contraseña o payload.
- Verification method:
  Tests de error contractual.
- Dependencies:
  Tasks 24 and 25.

## Task 29: Auditar seguridad de la contraseña

- Objective:
  Confirmar que la contraseña es efímera.
- Files or areas likely involved:
  Modal, mutation, logs y query cache.
- Execution notes:
  Revisar storage, URL, console y devtools.
- Verification method:
  Checklist de seguridad.
- Dependencies:
  Tasks 24 through 28.

## Task 30: Proteger accesos directos

- Objective:
  Aplicar el estado real al abrir Problems o Mis envíos directamente.
- Files or areas likely involved:
  Loaders, queries, route elements o contenido.
- Execution notes:
  No confiar en estado de navegación previo.
- Verification method:
  Tests de deep link inscrito y no inscrito.
- Dependencies:
  Tasks 23, 27 and 28.

**Fase 4 — Header compartido**

## Task 31: Definir el contrato del Header

- Objective:
  Acordar datos, navegación y estado activo.
- Files or areas likely involved:
  Types del dominio contests.
- Execution notes:
  Usar campos reales y descriptores de ruta.
- Verification method:
  Tipo revisado contra ambas páginas.
- Dependencies:
  Tasks 9, 11 and 18.

## Task 32: Elegir la ubicación compartida

- Objective:
  Evitar ownership incorrecto y ciclos.
- Files or areas likely involved:
  Contests shared o ubicación equivalente.
- Execution notes:
  No ubicarlo dentro de submissions.
- Verification method:
  Grafo de imports sin ciclos.
- Dependencies:
  Tasks 15 and 31.

## Task 33: Implementar el mapper de estado

- Objective:
  Centralizar presentación del estado real.
- Files or areas likely involved:
  Mapper existente o utilidad compartida.
- Execution notes:
  Reutilizar implementación existente cuando sea compatible.
- Verification method:
  Tests de próximo, en curso, finalizado y desconocido.
- Dependencies:
  Tasks 9 and 31.

## Task 34: Implementar el formatter de duración

- Objective:
  Mostrar duración desde datos contractuales.
- Files or areas likely involved:
  Utilidad compartida del Header.
- Execution notes:
  Manejar minutos, horas, días, ausencia y fechas inválidas.
- Verification method:
  Tests unitarios.
- Dependencies:
  Tasks 9 and 31.

## Task 35: Implementar el Header reutilizable

- Objective:
  Renderizar identidad, estado, duración y navegación.
- Files or areas likely involved:
  Componente compartido.
- Execution notes:
  No ejecutar requests ni conocer layouts.
- Verification method:
  Tests de datos, active item y accesibilidad.
- Dependencies:
  Tasks 32 through 34.

## Task 36: Integrar el Header en SubmissionsPage

- Objective:
  Sustituir el bloque estático por datos reales.
- Files or areas likely involved:
  `SubmissionsPage.tsx`.
- Execution notes:
  Conservar formulario, tabla, paginación y responsive.
- Verification method:
  Tests de página y comparación funcional.
- Dependencies:
  Tasks 9 and 35.

## Task 37: Integrar el Header en ContestProblemsPage

- Objective:
  Compartir el mismo contexto visual.
- Files or areas likely involved:
  `ContestProblemsPage.tsx`.
- Execution notes:
  Marcar Problemas y conservar métricas.
- Verification method:
  Tests de página y métricas.
- Dependencies:
  Tasks 9 and 35.

## Task 38: Eliminar navegación duplicada

- Objective:
  Mantener Problemas/Mis envíos únicamente en el Header.
- Files or areas likely involved:
  ContestProblemsPage y componentes inmediatos.
- Execution notes:
  No eliminar título, subtítulo, icono, métricas o PDF.
- Verification method:
  Test de una sola navegación contextual.
- Dependencies:
  Task 37.

## Task 39: Preservar PDF y métricas

- Objective:
  Evitar regresiones funcionales durante la extracción.
- Files or areas likely involved:
  ProblemsTable y ContestProblemsPage.
- Execution notes:
  `Ver PDF` permanece en ProblemsTable.
- Verification method:
  Tests de las cinco métricas y botón PDF.
- Dependencies:
  Tasks 37 and 38.

## Task 40: Validar Header en contexto administrativo

- Objective:
  Confirmar que sus enlaces mantienen AdminLayout.
- Files or areas likely involved:
  Wrappers admin y descriptores.
- Execution notes:
  No agregar condicionales de rol dentro del Header.
- Verification method:
  Tests de destinos administrativos.
- Dependencies:
  Tasks 18, 27 and 35.

## Task 41: Verificar requests duplicados

- Objective:
  Evitar queries redundantes en Problems y Submissions.
- Files or areas likely involved:
  Wrappers, query keys y páginas.
- Execution notes:
  Preferir datos ya cargados o caché compartida.
- Verification method:
  Inspección de Network y tests de invocación.
- Dependencies:
  Tasks 36, 37 and 40.

**Fase 5 — Seguridad de dependencias**

## Task 42: Definir la estrategia de remediación

- Objective:
  Seleccionar versiones objetivo basadas en el árbol real.
- Files or areas likely involved:
  Package manifest, lockfile y documentación técnica.
- Execution notes:
  Comparar update compatible, padre, migración, override y downgrade.
- Verification method:
  Decisión por advisory con evidencia.
- Dependencies:
  Tasks 5 and 10.

## Task 43: Remediar la cadena de OpenAPI

- Objective:
  Eliminar la vulnerabilidad transitiva sin romper generación.
- Files or areas likely involved:
  openapi-typescript, dependencias y lockfile.
- Execution notes:
  No aceptar que npm install sea la única validación.
- Verification method:
  npm ls, audit, script OpenAPI, typecheck y build.
- Dependencies:
  Task 42.

## Task 44: Remediar la cadena de React Router

- Objective:
  Resolver el advisory preservando routing.
- Files or areas likely involved:
  React Router, router y tests.
- Execution notes:
  Aplicar migración controlada solo cuando sea necesaria.
- Verification method:
  npm ls y suite del router.
- Dependencies:
  Task 42.

## Task 45: Revisar package.json y lockfile

- Objective:
  Mantener dependencias y resolución coherentes.
- Files or areas likely involved:
  `frontend/package.json` y `frontend/package-lock.json`.
- Execution notes:
  Evitar cambios masivos y gestores alternativos.
- Verification method:
  Diff explicado y árbol reproducible.
- Dependencies:
  Tasks 43 and 44.

## Task 46: Ejecutar la generación OpenAPI

- Objective:
  Verificar el contrato generado después de la remediación.
- Files or areas likely involved:
  Script real y tipos generados.
- Execution notes:
  Documentar bloqueos de backend o esquema.
- Verification method:
  Script exitoso, diff esperado y typecheck.
- Dependencies:
  Tasks 43 and 45.

## Task 47: Ejecutar la regresión completa del router

- Objective:
  Confirmar compatibilidad después de actualizar dependencias.
- Files or areas likely involved:
  Router, guards, layouts y páginas.
- Execution notes:
  Cubrir rutas directas y ambos contextos.
- Verification method:
  Suite de routing y checklist manual.
- Dependencies:
  Tasks 44 and 45.

## Task 48: Ejecutar el audit final

- Objective:
  Confirmar la remediación de severidad alta.
- Files or areas likely involved:
  Árbol npm final.
- Execution notes:
  Clasificar cualquier hallazgo restante.
- Verification method:
  `npm audit --audit-level=high` y npm ls finales.
- Dependencies:
  Tasks 43 through 47.

**Fase 6 — Documentación y validación**

## Task 49: Actualizar las historias afectadas

- Objective:
  Registrar rutas administrativas, privado finalizado y Header.
- Files or areas likely involved:
  UJ-11, UJ-12, UJ-13 y UJ-14/UJ-15.
- Execution notes:
  Preservar información histórica válida.
- Verification method:
  Documentos coinciden con archivos y contratos reales.
- Dependencies:
  Tasks 30, 40 and 41.

## Task 50: Registrar implementación de acciones Sprint 2

- Objective:
  Vincular resultados con la retrospectiva sin reescribirla.
- Files or areas likely involved:
  Retrospectiva Sprint 2 o documento de implementación según convención.
- Execution notes:
  Añadir referencias solo si la convención lo permite.
- Verification method:
  Retrospectiva conserva su contexto histórico.
- Dependencies:
  Tasks 2, 48 and 49.

## Task 51: Registrar evidencias manuales

- Objective:
  Dejar rutas o referencias verificables sin crear archivos vacíos.
- Files or areas likely involved:
  Documentación afectada.
- Execution notes:
  Incluir sidebar, rutas admin, inscripción, Header, audit y responsive.
- Verification method:
  Evidencias existentes o marcadas explícitamente como pendientes.
- Dependencies:
  Tasks 48 through 50.

## Task 52: Ejecutar instalación y validación de seguridad

- Objective:
  Verificar el árbol final desde frontend.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  Ejecutar npm install, audits, npm ls y OpenAPI.
- Verification method:
  Comandos requeridos terminan con resultados documentados.
- Dependencies:
  Tasks 45 through 48.

## Task 53: Ejecutar lint, typecheck, tests y build

- Objective:
  Validar calidad y producción.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No ocultar fallos con skips, casts o snapshots vacíos.
- Verification method:
  Todos los checks pasan.
- Dependencies:
  Tasks 41, 47 and 52.

## Task 54: Validar dev y flujo funcional

- Objective:
  Verificar aplicación en ejecución.
- Files or areas likely involved:
  Frontend y backend local.
- Execution notes:
  Probar usuario, administrador, público, privado y finalizado.
- Verification method:
  Checklist manual funcional y Network.
- Dependencies:
  Task 53.

## Task 55: Validar responsive, teclado y seguridad

- Objective:
  Confirmar usabilidad y protección de contraseña.
- Files or areas likely involved:
  Sidebar, modal, Header y páginas.
- Execution notes:
  Probar desktop, tablet, móvil, foco, Escape y storage.
- Verification method:
  Checklist manual completo.
- Dependencies:
  Task 54.

## Task 56: Ejecutar auditoría final del diff

- Objective:
  Confirmar alcance, formato y ausencia de cambios no relacionados.
- Files or areas likely involved:
  Repositorio completo.
- Execution notes:
  Ejecutar diff check, name-status y stat. No hacer commit, push o archive.
- Verification method:
  Diff limpio y trazable.
- Dependencies:
  Tasks 51 through 55.

## Review Workload Forecast

- Estimated LoC changed:
  1,200-2,200 LoC, incluyendo separación de contenido, rutas administrativas, policy, Header, migración de dependencias, pruebas, lockfile y documentación.
- Risk of exceeding 400 LoC review threshold:
  Very high.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: baseline, boundaries y contenido funcional reutilizable.
  - PR 2: sidebar, rutas administrativas, guards y wrappers.
  - PR 3: privado finalizado, mutación, caché y pruebas.
  - PR 4: Header compartido e integración en Problems/Submissions.
  - PR 5: remediación OpenAPI y validación de generación.
  - PR 6: remediación React Router y regresión de rutas.
  - PR 7: documentación, evidencias y validación final.
  - Todos los PRs deben pertenecer al mismo change OpenSpec.

## Estado de implementación — 2026-07-25

- [x] Tasks 1-10: baseline, retrospectiva, inventario frontend/backend y generación OpenAPI ejecutados.
- [x] Tasks 16-21: grupo Acceso de Usuario, rutas administrativas y wrappers reutilizables implementados.
- [x] Tasks 23-29: policy, modal reutilizado, mutación, invalidación de lista y navegación para privado finalizado implementados contra el contrato vigente. Task 30 conserva la protección de acceso directo mediante el dashboard backend.
- [x] Tasks 31-41: Header reutilizable, formatter, navegación contextual e integración en Problems/Submissions implementados.
- [x] Tasks 42-48: remediación auditada. Overrides controlados de `@redocly/openapi-core` resuelven `js-yaml@4.3.0` y `minimatch@10.2.5`/`brace-expansion@5.0.8`; React Router se migró a `react-router@8.3.0` sin `react-router-dom`.
- [x] Task 46: `npm run api:types` ejecutado contra `http://localhost:5185/swagger/v1/swagger.json`.
- [x] Tasks 49-51: historias afectadas y evidencia de implementación actualizadas.
- [x] Tasks 52-56: `npm ci`, audit completo/producción, OpenAPI, lint, typecheck, tests, build, dev y auditoría de diff ejecutados.

## Corrección focalizada de regresiones — 2026-07-25

- [x] Se adaptó `user-dashboard.test.tsx` a la tabla global real: las columnas visibles son `CONCURSO`, `PROBLEMA`, `LENGUAJE`, `VEREDICTO`, `TIEMPO`, `MEMORIA` y `FECHA`; `idEnvio` sigue interno y el test verifica explícitamente la ausencia del encabezado `ID`.
- [x] Se corrigió la expectativa de `Memory Limit Exceeded` al tono visual actual `warning`, incluyendo la comprobación del badge ámbar y de la etiqueta contractual `MEMORY LIMIT EXCEEDED`.
- [x] Se actualizó la documentación de UJ-11 y UJ-12 para reflejar la tabla sin ID visible y la inscripción privada finalizada mediante contraseña.
- [x] Policy de privado finalizado, botón habilitado, modal reutilizado, mutación, invalidación de lista y navegación a Problemas se validaron para contextos de usuario y administración.
- [x] Se ejecutaron tests focalizados, suite frontend, lint, typecheck, build, dev y auditoría de diff en esta corrección.

## Remediación de dependencias — 2026-07-25

- [x] Baseline: Node `v24.16.0`, npm `11.13.0`, 105 tests y seis vulnerabilidades altas; OpenAPI generó el hash `c65c27bdd23ef19625668b54ee3c007ac1fa77ad203b4c1448a70796f96b3a1b`.
- [x] `npm audit fix --dry-run` y `npm audit fix` sin force no cambiaron el árbol vulnerable.
- [x] Redocly: `openapi-typescript@7.13.0` y `@redocly/openapi-core@1.34.17` se mantienen; overrides anidados fijan `js-yaml@4.3.0` y `minimatch@10.2.5`, que resuelve `brace-expansion@5.0.8`. `npm run api:types` mantiene el mismo hash generado.
- [x] Router: el proyecto usa Data Mode con `createBrowserRouter` y `RouterProvider`, sin RSC. La prueba con `react-router-dom@7.11.0` mantuvo dos vulnerabilidades altas; se seleccionó `react-router@8.3.0`, compatible con Node 24 y React 19.2.7. Imports generales migraron a `react-router` y `RouterProvider` a `react-router/dom`.
- [x] Reproducibilidad: tras eliminar solo `node_modules`, `npm ci`, audit completo, audit high y audit producción reportan cero vulnerabilidades. Lint, typecheck, 105 tests, build y dev pasaron; `format:check` conserva deuda previa en 59 archivos ajenos y los imports tocados pasan Prettier.
- [x] Se remediaron las seis vulnerabilidades npm altas sin `npm audit fix --force`: audit completo, producción y high finalizan sin vulnerabilidades.
