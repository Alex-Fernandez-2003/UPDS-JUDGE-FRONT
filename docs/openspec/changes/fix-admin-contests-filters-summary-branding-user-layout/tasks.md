# Tasks

## Task 1: [Fase 1] Registrar el estado inicial

- Objective:
  Confirmar el baseline del frontend y proteger cambios preexistentes.
- Files or areas likely involved:
  Working tree, frontend y documentación.
- Execution notes:
  No modificar ni restaurar trabajo ajeno.
- Verification method:
  Registro inicial de Git y archivos preexistentes.
- Dependencies:
  None.

## Task 2: [Fase 1] Inspeccionar los contratos backend

- Objective:
  Confirmar controlador, autorización, parámetros y DTOs administrativos.
- Files or areas likely involved:
  `Controllers/ConcursosController.cs` y `DTOs/ConcursoDto.cs` del backend.
- Execution notes:
  No modificar backend. Comparar el código público verificado con el entorno usado por Pi.
- Verification method:
  Tabla contractual de `mis-creados`, `mis-resumen`, filtros y respuestas.
- Dependencies:
  Task 1.

## Task 3: [Fase 1] Inspeccionar la administración frontend

- Objective:
  Mapear filtros, queries, servicios, tipos, SummaryCards, pantalla, paginación y botón Actualizar.
- Files or areas likely involved:
  Feature contests y endpoints.
- Execution notes:
  Identificar el contrato combinado anterior y los valores incorrectos.
- Verification method:
  Diagrama del flujo actual y lista de defectos localizados.
- Dependencies:
  Tasks 1 and 2.

## Task 4: [Fase 1] Inspeccionar branding y favicon

- Objective:
  Localizar logos reales, wrappers existentes, branding provisional y referencia de favicon.
- Files or areas likely involved:
  Assets, layouts, auth pages, index.html, Forbidden y NotFound.
- Execution notes:
  No eliminar archivos durante esta inspección.
- Verification method:
  Inventario de cada representación de marca y sus imports.
- Dependencies:
  Task 1.

## Task 5: [Fase 1] Inspeccionar assets reutilizables

- Objective:
  Clasificar el contenido de `src/assets/components/` y localizar el globo.
- Files or areas likely involved:
  Assets y componentes consumidores.
- Execution notes:
  Clasificar gráfico, componente, provisional o sin uso.
- Verification method:
  Tabla de clasificación, uso y acción propuesta.
- Dependencies:
  Task 1.

## Task 6: [Fase 1] Inspeccionar User Layout y routing

- Objective:
  Identificar la ruta real del rol Usuario, layout, navegación, UserMenu y logout.
- Files or areas likely involved:
  Router, guards, auth, layouts y páginas de usuario.
- Execution notes:
  No asumir `/contests`.
- Verification method:
  Flujo real desde login hasta la página del usuario.
- Dependencies:
  Task 1.

## Task 7: [Fase 1] Inspeccionar tests, MSW y documentación

- Objective:
  Localizar pruebas existentes, handlers y la sección documental a ampliar.
- Files or areas likely involved:
  Tests, mocks y `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- Execution notes:
  Confirmar convenciones antes de crear casos.
- Verification method:
  Matriz de cobertura y estructura del documento existente.
- Dependencies:
  Tasks 3, 4, 5 and 6.

## Task 8: [Fase 2] Centralizar los endpoints administrativos

- Objective:
  Registrar las rutas de listado y resumen en una sola fuente.
- Files or areas likely involved:
  `src/lib/api/endpoints.ts`.
- Execution notes:
  Usar rutas relativas y eliminar aliases inexistentes.
- Verification method:
  Tests o inspección de ambos valores y ausencia de paths duplicados.
- Dependencies:
  Tasks 2 and 3.

## Task 9: [Fase 2] Separar los tipos administrativos

- Objective:
  Representar filtro, item, listado paginado y resumen como contratos distintos.
- Files or areas likely involved:
  Types de contests o tipos OpenAPI compatibles.
- Execution notes:
  No usar any ni casts inseguros.
- Verification method:
  Typecheck y comparación campo por campo con DTOs.
- Dependencies:
  Tasks 2 and 3.

## Task 10: [Fase 2] Crear el catálogo de filtros

- Objective:
  Separar etiqueta visible y valor contractual.
- Files or areas likely involved:
  Constantes y tipos de contests.
- Execution notes:
  Incluir únicamente todos, activos, proximos y finalizados.
- Verification method:
  Pruebas de mapping para las cuatro opciones.
- Dependencies:
  Task 9.

## Task 11: [Fase 2] Corregir el servicio de listado

- Objective:
  Solicitar `mis-creados` con los parámetros contractuales.
- Files or areas likely involved:
  Servicio de concursos.
- Execution notes:
  Conservar modalidad, búsqueda, página y tamaño.
- Verification method:
  Tests del request y respuesta paginada.
- Dependencies:
  Tasks 8, 9 and 10.

## Task 12: [Fase 2] Separar las query keys

- Objective:
  Mantener una key parametrizada para listado y otra estable para resumen.
- Files or areas likely involved:
  Query keys y hooks.
- Execution notes:
  Evitar objetos inestables y dependencias accidentales.
- Verification method:
  Tests de identidad y cambios de key.
- Dependencies:
  Tasks 9 and 11.

## Task 13: [Fase 3] Crear o adaptar el servicio de resumen

- Objective:
  Consumir `mis-resumen` sin parámetros de listado.
- Files or areas likely involved:
  Servicio de concursos.
- Execution notes:
  Retornar exclusivamente activos, proximos y finalizados.
- Verification method:
  Test de endpoint, ausencia de query params y respuesta.
- Dependencies:
  Tasks 8 and 9.

## Task 14: [Fase 3] Crear o adaptar el hook de resumen

- Objective:
  Administrar la query independiente y su política de actualización.
- Files or areas likely involved:
  Hooks y query keys.
- Execution notes:
  Mantener fetch inicial y evitar foco, reconexión y filtros.
- Verification method:
  Tests de montaje y ausencia de refetch por cambios de listado.
- Dependencies:
  Tasks 12 and 13.

## Task 15: [Fase 3] Restaurar ContestsSummaryCards

- Objective:
  Reintegrar el componente existente antes de filtros y tabla.
- Files or areas likely involved:
  ContestsAdminScreen y ContestsSummaryCards.
- Execution notes:
  No duplicar su markup dentro de la pantalla.
- Verification method:
  Test de orden y render.
- Dependencies:
  Task 14.

## Task 16: [Fase 3] Adaptar las tarjetas al resumen separado

- Objective:
  Mostrar activos, próximos como Pendientes y finalizados.
- Files or areas likely involved:
  ContestsSummaryCards.
- Execution notes:
  No usar total o concursos visibles.
- Verification method:
  Tests de los tres conteos y total existente, si corresponde.
- Dependencies:
  Task 15.

## Task 17: [Fase 3] Desacoplar estados de listado y resumen

- Objective:
  Mantener loading, error, success y refreshing independientes.
- Files or areas likely involved:
  ContestsAdminScreen, tabla, SummaryCards y alerts.
- Execution notes:
  No presentar cero como fallback de error.
- Verification method:
  Tests de fallo parcial en ambas direcciones.
- Dependencies:
  Tasks 14, 15 and 16.

## Task 18: [Fase 3] Coordinar el botón Actualizar

- Objective:
  Refrescar listado actual y resumen sin resetear filtros.
- Files or areas likely involved:
  ContestsAdminScreen y hooks.
- Execution notes:
  Reutilizar el botón existente y evitar doble activación.
- Verification method:
  Tests de dos requests, estado conservado y loading accesible.
- Dependencies:
  Tasks 12, 14 and 17.

## Task 19: [Fase 4] Crear o adaptar AppLogo

- Objective:
  Centralizar `logo.svg` y la variante futura `logo-dark.svg`.
- Files or areas likely involved:
  Componente compartido y assets.
- Execution notes:
  No implementar tema. Mantener proporción y alt.
- Verification method:
  Tests de variantes, className y accesibilidad.
- Dependencies:
  Task 4.

## Task 20: [Fase 4] Reemplazar branding provisional

- Objective:
  Usar AppLogo en las superficies que representan UPDS Judge.
- Files or areas likely involved:
  AuthLayout, login, register, AdminLayout, UserLayout, Sidebar, headers y páginas de estado.
- Execution notes:
  No reemplazar iconos funcionales.
- Verification method:
  Búsqueda sin branding provisional visible y pruebas de render.
- Dependencies:
  Task 19.

## Task 21: [Fase 4] Verificar favicon y limpiar imports obsoletos

- Objective:
  Confirmar la referencia real y retirar assets provisionales sin uso.
- Files or areas likely involved:
  `index.html`, public y assets.
- Execution notes:
  Eliminar solo después de confirmar cero imports.
- Verification method:
  Typecheck, build y búsqueda de referencias.
- Dependencies:
  Tasks 4 and 20.

## Task 22: [Fase 5] Clasificar `assets/components`

- Objective:
  Aplicar el criterio documentado a cada archivo.
- Files or areas likely involved:
  `src/assets/components/`.
- Execution notes:
  No mover gráficos puros ni borrar archivos con consumidores.
- Verification method:
  Diff alineado con la clasificación de Task 5.
- Dependencies:
  Task 5.

## Task 23: [Fase 5] Consolidar el componente del globo

- Objective:
  Mantener una única ilustración reutilizable.
- Files or areas likely involved:
  Carpeta de ilustraciones o componentes compartidos.
- Execution notes:
  Aceptar className, tamaño y semántica; no añadir negocio.
- Verification method:
  Tests de props, decoración y accesibilidad.
- Dependencies:
  Task 22.

## Task 24: [Fase 5] Actualizar imports y eliminar duplicados confirmados

- Objective:
  Completar la reorganización acotada de assets.
- Files or areas likely involved:
  Consumidores, exports y archivos duplicados.
- Execution notes:
  Respetar barrels existentes; no crear uno nuevo sin convención.
- Verification method:
  Typecheck, tests y búsqueda sin imports antiguos.
- Dependencies:
  Tasks 22 and 23.

## Task 25: [Fase 6] Exponer el User Layout en la ruta existente

- Objective:
  Envolver la página actual del rol Usuario con su shell.
- Files or areas likely involved:
  Router, guards, UserLayout y página existente.
- Execution notes:
  No cambiar prioridad administrativa ni crear páginas nuevas.
- Verification method:
  Test de routing con token de Usuario.
- Dependencies:
  Task 6.

## Task 26: [Fase 6] Integrar branding e identidad en User Layout

- Objective:
  Mostrar AppLogo, identidad, avatar y contenido.
- Files or areas likely involved:
  UserLayout y componentes compartidos.
- Execution notes:
  Reutilizar helpers de identidad existentes.
- Verification method:
  Tests de logo, nombre, rol y outlet.
- Dependencies:
  Tasks 19 and 25.

## Task 27: [Fase 6] Corregir la navegación del usuario

- Objective:
  Mostrar únicamente rutas existentes y su estado activo.
- Files or areas likely involved:
  Configuración de navegación y UserLayout.
- Execution notes:
  Excluir Clasificación global y enlaces a NotFound.
- Verification method:
  Tests de opciones, rutas y aria-current.
- Dependencies:
  Tasks 6 and 25.

## Task 28: [Fase 6] Reutilizar UserMenu y logout

- Objective:
  Hacer visibles menú y cierre de sesión dentro de UserLayout.
- Files or areas likely involved:
  UserLayout, UserMenu y helper de logout.
- Execution notes:
  No duplicar el componente ni la lógica de AdminLayout.
- Verification method:
  Tests de apertura, eliminación del token y navegación con replace.
- Dependencies:
  Tasks 25 and 26.

## Task 29: [Fase 7] Actualizar handlers MSW de concursos

- Objective:
  Representar los dos contratos backend separados.
- Files or areas likely involved:
  Handlers y fixtures de contests.
- Execution notes:
  Aceptar únicamente filtros contractuales y no ocultar aliases inválidos.
- Verification method:
  Tests de `mis-creados`, `mis-resumen` y filtros plurales.
- Dependencies:
  Tasks 11 and 13.

## Task 30: [Fase 7] Completar pruebas de filtros y listado

- Objective:
  Cubrir mappings, endpoint, parámetros, tabla y paginación.
- Files or areas likely involved:
  Tests de constants, service, hooks y pantalla.
- Execution notes:
  Priorizar comportamiento y requests observables.
- Verification method:
  Todos los casos de filtro y listado en verde.
- Dependencies:
  Tasks 10, 11, 12 and 29.

## Task 31: [Fase 7] Completar pruebas de resumen

- Objective:
  Cubrir endpoint, carga inicial, independencia, refresh y errores.
- Files or areas likely involved:
  Tests del hook, SummaryCards y pantalla.
- Execution notes:
  Verificar ausencia de refetch por filtros.
- Verification method:
  Todos los casos de resumen en verde.
- Dependencies:
  Tasks 14 through 18 and 29.

## Task 32: [Fase 7] Completar pruebas de branding y assets

- Objective:
  Verificar AppLogo, logos provisionales, favicon y globo.
- Files or areas likely involved:
  Tests de componentes e integración.
- Execution notes:
  No basar toda la validación en clases CSS.
- Verification method:
  Variantes, alt, imports y semántica en verde.
- Dependencies:
  Tasks 19 through 24.

## Task 33: [Fase 7] Completar pruebas de User Layout

- Objective:
  Verificar ruta, marca, navegación, menú y logout.
- Files or areas likely involved:
  Tests de router y layout.
- Execution notes:
  Incluir ausencia de Clasificación global.
- Verification method:
  Flujo de Usuario y logout en verde.
- Dependencies:
  Tasks 25 through 28.

## Task 34: [Fase 7] Ejecutar regresión transversal

- Objective:
  Confirmar que AdminLayout, Sidebar, roles, creación y routing permanecen operativos.
- Files or areas likely involved:
  Suite existente.
- Execution notes:
  No ampliar funcionalidades durante correcciones.
- Verification method:
  Suite completa sin fallos.
- Dependencies:
  Tasks 30, 31, 32 and 33.

## Task 35: [Fase 8] Ampliar la documentación existente

- Objective:
  Registrar los fixes dentro del documento transversal.
- Files or areas likely involved:
  `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- Execution notes:
  Añadir una sección; no reescribir ni crear otro archivo.
- Verification method:
  Checklist de filtros, endpoints, resumen, branding, globo, User Layout y logout.
- Dependencies:
  Tasks 18, 24 and 28.

## Task 36: [Fase 8] Registrar evidencias como pendientes

- Objective:
  Documentar rutas sugeridas sin crear enlaces o archivos falsos.
- Files or areas likely involved:
  Documento transversal.
- Execution notes:
  Mantener estado pendiente hasta que las capturas existan.
- Verification method:
  Ninguna evidencia se declara completada.
- Dependencies:
  Task 35.

## Task 37: [Fase 9] Ejecutar format, lint y typecheck

- Objective:
  Verificar formato y consistencia estática.
- Files or areas likely involved:
  Frontend y documento modificado.
- Execution notes:
  No usar fixes globales que amplíen el diff.
- Verification method:
  Comandos existentes finalizan correctamente.
- Dependencies:
  Tasks 34 and 36.

## Task 38: [Fase 9] Ejecutar tests y build

- Objective:
  Verificar comportamiento y producción.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No actualizar snapshots para ocultar cambios.
- Verification method:
  Test suite y build exitosos.
- Dependencies:
  Task 37.

## Task 39: [Fase 9] Validar contratos con backend real

- Objective:
  Confirmar requests, filtros y respuestas administrativas.
- Files or areas likely involved:
  Network, AuthTransport y backend de desarrollo.
- Execution notes:
  No registrar JWT reales.
- Verification method:
  Requests a `mis-creados` y `mis-resumen` con parámetros correctos.
- Dependencies:
  Task 38.

## Task 40: [Fase 9] Validar responsive y teclado

- Objective:
  Revisar administración, branding, User Layout y menús.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar desktop, móvil, foco y logout.
- Verification method:
  Checklist manual de viewports y teclado.
- Dependencies:
  Tasks 38 and 39.

## Task 41: [Fase 9] Auditar alcance y cerrar sin commit

- Objective:
  Confirmar que el diff contiene únicamente los fixes aprobados.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Verificar backend, database, routing por roles, creación y documentación. No usar OpenSpec CLI, commit o push.
- Verification method:
  Checklist de exclusiones y estado final de Git.
- Dependencies:
  Tasks 39 and 40.

## Review Workload Forecast

- Estimated LoC changed:
  500-900 LoC, incluyendo separación de queries, restauración del resumen, branding compartido, organización acotada de assets, User Layout, mocks, pruebas y documentación.
- Risk of exceeding 400 LoC review threshold:
  High.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: contratos, filtros, endpoints, tipos y separación de queries.
  - PR 2: SummaryCards, refresh manual, estados independientes y MSW.
  - PR 3: AppLogo, reemplazo de branding, favicon y assets reutilizables.
  - PR 4: exposición del User Layout, UserMenu y logout.
  - PR 5: pruebas integrales, documentación y validación final.
