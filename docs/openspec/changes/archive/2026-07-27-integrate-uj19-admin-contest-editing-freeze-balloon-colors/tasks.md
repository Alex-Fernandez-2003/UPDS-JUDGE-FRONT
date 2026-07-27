# Tasks

**Fase 0 — Baseline**

## Task 1: Registrar el baseline de Git

- Objective:
  Identificar branch, working tree y cambios preexistentes.
- Files or areas likely involved:
  Repositorio completo.
- Execution notes:
  Ejecutar branch, status, diff name-status, diff stat y diff check. No restaurar archivos.
- Verification method:
  Registro fechado de cada salida.
- Dependencies:
  None.

## Task 2: Localizar y leer UJ-19

- Objective:
  Identificar el documento vigente y sus decisiones.
- Files or areas likely involved:
  `docs/historias/`.
- Execution notes:
  Buscar UJ-19, ranking, congelamiento y minutosCongelamiento.
- Verification method:
  Ruta real, estado y resumen documentados.
- Dependencies:
  Task 1.

## Task 3: Revisar documentación relacionada

- Objective:
  Confirmar decisiones previas de creación, listado, problemas, ranking y permisos.
- Files or areas likely involved:
  Documentación de historias y changes relacionados.
- Execution notes:
  Preservar información histórica.
- Verification method:
  Matriz documento → contrato → archivo relacionado.
- Dependencies:
  Task 2.

## Task 4: Ejecutar checks iniciales

- Objective:
  Registrar lint, typecheck, tests y build previos.
- Files or areas likely involved:
  `frontend/`.
- Execution notes:
  No ejecutar install, update ni audit fix.
- Verification method:
  Resultado, cantidad de tests, warnings y errores preexistentes.
- Dependencies:
  Task 1.

## Task 5: Inventariar el listado administrativo

- Objective:
  Localizar página, tabla/cards, acciones, filtros, paginación y DTO.
- Files or areas likely involved:
  `frontend/src/features/contests/`.
- Execution notes:
  Confirmar campos de estado, creador, problemas y colores.
- Verification method:
  Matriz campo → origen → consumidor.
- Dependencies:
  Tasks 1 and 3.

## Task 6: Inventariar la creación de concursos

- Objective:
  Identificar formulario, secciones, schemas, ZIP y problemas.
- Files or areas likely involved:
  Feature contests.
- Execution notes:
  Registrar boundaries y dependencias.
- Verification method:
  Árbol create → formulario → servicio → tests.
- Dependencies:
  Tasks 1 and 3.

## Task 7: Confirmar contratos backend

- Objective:
  Verificar controller, endpoints, DTOs, permisos y errores.
- Files or areas likely involved:
  Backend de referencia.
- Execution notes:
  Inspección de solo lectura.
- Verification method:
  Tabla GET/PUT completa.
- Dependencies:
  Task 2.

## Task 8: Confirmar OpenAPI y tipos generados

- Objective:
  Comparar backend, esquema y `api.generated.ts`.
- Files or areas likely involved:
  OpenAPI y tipos frontend.
- Execution notes:
  No regenerar todavía.
- Verification method:
  Matriz de coincidencias y diferencias.
- Dependencies:
  Task 7.

## Task 9: Confirmar representación de colores

- Objective:
  Determinar apiValue, label y hexadecimal.
- Files or areas likely involved:
  `ColoresGlobos`, DTOs y código frontend.
- Execution notes:
  No implementar mapper antes de esta decisión.
- Verification method:
  Tabla contractual de trece valores.
- Dependencies:
  Tasks 7 and 8.

## Task 10: Confirmar datos disponibles para el modal

- Objective:
  Determinar si el listado incluye problemas y colores.
- Files or areas likely involved:
  Servicio, tipos y respuesta del listado.
- Execution notes:
  No usar GET editar como fallback general.
- Verification method:
  Decisión explícita sobre fuente del modal.
- Dependencies:
  Tasks 5 and 7.

## Task 11: Inspeccionar GlobeIllustration y ranking

- Objective:
  Confirmar API visual y futura frontera de consumo.
- Files or areas likely involved:
  `GlobeIllustration.tsx` y `features/ranking/`.
- Execution notes:
  No modificar ranking.
- Verification method:
  Props, imports y requisitos documentados.
- Dependencies:
  Task 1.

## Task 12: Confirmar privacidad y contraseña

- Objective:
  Determinar cómo mantener, cambiar o eliminar privacidad.
- Files or areas likely involved:
  DTO PUT, controller y formulario actual.
- Execution notes:
  Tratarlo como bloqueo de seguridad.
- Verification method:
  Tabla intención → payload → efecto backend.
- Dependencies:
  Task 7.

## Task 13: Confirmar FormData y UTC

- Objective:
  Determinar serialización multipart y conversión de fecha.
- Files or areas likely involved:
  Binder backend, OpenAPI, serializer create y helpers de fecha.
- Execution notes:
  No asumir formato de listaProblemas.
- Verification method:
  Contrato de serialización documentado.
- Dependencies:
  Tasks 6 through 8.

**Fase 1 — Dominio de colores**

## Task 14: Definir la ubicación del dominio de colores

- Objective:
  Elegir una ubicación reutilizable sin acoplar ranking a edit.
- Files or areas likely involved:
  Estructura compartida, domain, constants o lib existente.
- Execution notes:
  Seguir convenciones reales.
- Verification method:
  Decisión de ownership y grafo de imports.
- Dependencies:
  Tasks 9 and 11.

## Task 15: Definir la fuente de verdad tipada

- Objective:
  Representar los trece valores contractuales.
- Files or areas likely involved:
  Módulo de dominio de colores.
- Execution notes:
  Derivar el tipo sin any.
- Verification method:
  Typecheck y catálogo sin duplicados.
- Dependencies:
  Tasks 9 and 14.

## Task 16: Implementar el mapper de colores

- Objective:
  Resolver label, hexadecimal y apiValue.
- Files or areas likely involved:
  Módulo de dominio.
- Execution notes:
  Incluir normalización y fallback.
- Verification method:
  Tests de los trece valores y desconocidos.
- Dependencies:
  Task 15.

## Task 17: Crear opciones del selector

- Objective:
  Exponer opciones tipadas y estables.
- Files or areas likely involved:
  Dominio de colores.
- Execution notes:
  No duplicar label/hex en componentes.
- Verification method:
  Test de trece opciones únicas.
- Dependencies:
  Task 16.

## Task 18: Implementar validación de unicidad

- Objective:
  Detectar ausentes, inválidos y duplicados.
- Files or areas likely involved:
  Schema o validator de contests.
- Execution notes:
  Identificar incisos en conflicto.
- Verification method:
  Tests de validación.
- Dependencies:
  Tasks 16 and 17.

## Task 19: Implementar validación de capacidad

- Objective:
  Bloquear concursos con más de trece problemas.
- Files or areas likely involved:
  Validator y mensajes.
- Execution notes:
  No inventar colores.
- Verification method:
  Tests con trece y catorce problemas.
- Dependencies:
  Task 18.

**Fase 2 — Routing y acciones**

## Task 20: Definir el route builder de edición

- Objective:
  Crear o adaptar una ruta administrativa coherente.
- Files or areas likely involved:
  Route builders reales.
- Execution notes:
  Usar código parametrizado y encoding correcto.
- Verification method:
  Tests del builder.
- Dependencies:
  Tasks 5 and 7.

## Task 21: Registrar la ruta de edición

- Objective:
  Conectar la página bajo AdminLayout.
- Files or areas likely involved:
  Router.
- Execution notes:
  Componer guards existentes.
- Verification method:
  Tests de acceso directo y refresh.
- Dependencies:
  Task 20.

## Task 22: Definir disponibilidad de la acción Editar

- Objective:
  Elegir oculto, disabled o delegación backend según datos reales.
- Files or areas likely involved:
  Listado y policy de acciones.
- Execution notes:
  No inventar propietario.
- Verification method:
  Decisión documentada y tests por estado.
- Dependencies:
  Tasks 5, 7 and 10.

## Task 23: Agregar la acción de edición

- Objective:
  Navegar al concurso seleccionado con accesibilidad.
- Files or areas likely involved:
  Tabla/cards y acciones.
- Execution notes:
  Reutilizar iconos y estilos.
- Verification method:
  Test de botón, label, focus y navegación.
- Dependencies:
  Tasks 20 through 22.

## Task 24: Agregar la acción de colores

- Objective:
  Abrir el modal read-only.
- Files or areas likely involved:
  Tabla/cards y estado del modal.
- Execution notes:
  No ejecutar requests todavía.
- Verification method:
  Test de apertura y datos seleccionados.
- Dependencies:
  Task 10.

## Task 25: Completar pruebas de permisos y routing

- Objective:
  Verificar autorizado, no autorizado, inexistente, iniciado y finalizado.
- Files or areas likely involved:
  Tests del router y listado.
- Execution notes:
  Mantener backend como autoridad.
- Verification method:
  Matriz de casos en verde.
- Dependencies:
  Tasks 21 through 24.

**Fase 3 — Formulario compartido**

## Task 26: Definir el contrato create/edit

- Objective:
  Separar comportamiento común y específico.
- Files or areas likely involved:
  Formulario y páginas create/edit.
- Execution notes:
  No modificar visuales todavía.
- Verification method:
  Props, modelo y ownership documentados.
- Dependencies:
  Task 6.

## Task 27: Extraer secciones reutilizables mínimas

- Objective:
  Evitar duplicar metadata y problemas.
- Files or areas likely involved:
  Componentes del formulario.
- Execution notes:
  Preservar JSX, clases y tests.
- Verification method:
  Create continúa pasando sus pruebas.
- Dependencies:
  Task 26.

## Task 28: Crear el wrapper de edición

- Objective:
  Resolver params, query, estados y mutation.
- Files or areas likely involved:
  Página edit.
- Execution notes:
  No incluir lógica de FormData en JSX.
- Verification method:
  Test de loading, error y precarga.
- Dependencies:
  Tasks 21 and 27.

## Task 29: Crear el mapper DTO a formulario

- Objective:
  Precargar valores contractuales de forma segura.
- Files or areas likely involved:
  Mapper de contests.
- Execution notes:
  No incluir contraseña; convertir fecha una vez.
- Verification method:
  Tests de todos los campos.
- Dependencies:
  Tasks 7, 9 and 13.

## Task 30: Configurar código e identificadores read-only

- Objective:
  Evitar cambios estructurales.
- Files or areas likely involved:
  Formulario edit.
- Execution notes:
  Mantener inciso y cantidad de casos estables.
- Verification method:
  Tests de ausencia de edición.
- Dependencies:
  Tasks 28 and 29.

## Task 31: Integrar minutos de congelamiento

- Objective:
  Permitir configurar UJ-19.
- Files or areas likely involved:
  Formulario, schema y mapper.
- Execution notes:
  Determinar si también aplica a create.
- Verification method:
  Tests de límites y revalidación.
- Dependencies:
  Tasks 7, 27 and 29.

## Task 32: Integrar la intención de privacidad

- Objective:
  Evitar convertir privados en públicos accidentalmente.
- Files or areas likely involved:
  Formulario edit y mapper.
- Execution notes:
  Detener la implementación insegura si el contrato no distingue intenciones.
- Verification method:
  Tests contractuales de mantener, cambiar y hacer público.
- Dependencies:
  Task 12.

## Task 33: Exigir ZIP en edit

- Objective:
  Reflejar el contrato multipart.
- Files or areas likely involved:
  Campo ZIP y schema.
- Execution notes:
  Mostrar explicación; validar extensión y 100 MB.
- Verification method:
  Tests de ausente, tipo y tamaño.
- Dependencies:
  Tasks 7 and 27.

## Task 34: Bloquear cambios estructurales de problemas

- Objective:
  Mantener lista, incisos y casos.
- Files or areas likely involved:
  Sección de problemas edit.
- Execution notes:
  Eliminar u ocultar add/remove solo en edit.
- Verification method:
  Tests de colección fija.
- Dependencies:
  Tasks 27 through 30.

**Fase 4 — Colores**

## Task 35: Integrar el selector de colores

- Objective:
  Permitir cambiar el color de cada problema.
- Files or areas likely involved:
  Sección de problemas.
- Execution notes:
  Consumir las opciones del dominio.
- Verification method:
  Tests de selección y apiValue.
- Dependencies:
  Tasks 17, 18 and 34.

## Task 36: Integrar GlobeIllustration en edit

- Objective:
  Mostrar el color actual de forma visual.
- Files or areas likely involved:
  Sección de problemas y GlobeIllustration.
- Execution notes:
  Extender GlobeIllustration solo si es imprescindible y de forma compatible.
- Verification method:
  Tests visuales, accesibilidad y consumidores existentes.
- Dependencies:
  Tasks 11 and 35.

## Task 37: Mostrar conflictos de color

- Objective:
  Asociar errores a problemas duplicados o inválidos.
- Files or areas likely involved:
  Formulario y validator.
- Execution notes:
  No depender solo del color.
- Verification method:
  Tests de mensajes e incisos.
- Dependencies:
  Tasks 18, 19 and 35.

## Task 38: Bloquear más de trece problemas

- Objective:
  Evitar una solicitud imposible.
- Files or areas likely involved:
  Edit page y validator.
- Execution notes:
  Registrar la dependencia contractual.
- Verification method:
  Test con catorce problemas y submit bloqueado.
- Dependencies:
  Tasks 19 and 28.

## Task 39: Completar pruebas del dominio de colores

- Objective:
  Cubrir mapper, selector, GlobeIllustration y validación.
- Files or areas likely involved:
  Tests unitarios y de formulario.
- Execution notes:
  Incluir casing y fallback.
- Verification method:
  Suite de colores en verde.
- Dependencies:
  Tasks 35 through 38.

**Fase 5 — Mutation**

## Task 40: Crear o adaptar el servicio GET editable

- Objective:
  Consumir el contrato de precarga real.
- Files or areas likely involved:
  Endpoints, service y types.
- Execution notes:
  Preservar ApiError y AuthTransport.
- Verification method:
  Tests de ruta, respuesta y errores.
- Dependencies:
  Tasks 7, 8 and 21.

## Task 41: Crear el serializer FormData

- Objective:
  Construir el PUT multipart desde una frontera única.
- Files or areas likely involved:
  Service o mapper de request.
- Execution notes:
  Seguir binder real para problemas y privacidad.
- Verification method:
  Tests de todos los campos.
- Dependencies:
  Tasks 13, 29, 31 through 35.

## Task 42: Crear o adaptar la mutation PUT

- Objective:
  Actualizar el concurso real.
- Files or areas likely involved:
  Service, hook y mutation key.
- Execution notes:
  Evitar doble submit y preservar errores.
- Verification method:
  Tests de success, 400, 401, 403 y 404.
- Dependencies:
  Tasks 40 and 41.

## Task 43: Implementar invalidación exacta

- Objective:
  Actualizar listado, detalle y colores.
- Files or areas likely involved:
  Query keys y mutation.
- Execution notes:
  No invalidar toda la aplicación.
- Verification method:
  Tests de caché sin reload.
- Dependencies:
  Task 42.

## Task 44: Definir la navegación posterior

- Objective:
  Alinear el éxito con el patrón actual.
- Files or areas likely involved:
  Edit page y router.
- Execution notes:
  Elegir listado o permanencia según baseline.
- Verification method:
  Test del comportamiento decidido.
- Dependencies:
  Tasks 6 and 42.

## Task 45: Completar estados de actualización

- Objective:
  Mostrar pending, success y error de forma segura.
- Files or areas likely involved:
  Edit page, Button y Alert.
- Execution notes:
  No mostrar detalles internos.
- Verification method:
  Tests de estados y doble submit.
- Dependencies:
  Tasks 42 through 44.

**Fase 6 — Modal**

## Task 46: Definir el contrato del modal

- Objective:
  Establecer props read-only y fuente de datos.
- Files or areas likely involved:
  Modal de contests.
- Execution notes:
  Incluir nombre, código y problemas.
- Verification method:
  Tipo revisado contra el listado.
- Dependencies:
  Task 10.

## Task 47: Implementar el modal con datos cacheados

- Objective:
  Mostrar colores sin request adicional cuando sea posible.
- Files or areas likely involved:
  Modal y listado.
- Execution notes:
  Ordenar por inciso y usar mapper.
- Verification method:
  Test de cero requests adicionales.
- Dependencies:
  Tasks 16, 24 and 46.

## Task 48: Integrar GlobeIllustration en el modal

- Objective:
  Renderizar cada color de forma consistente.
- Files or areas likely involved:
  Modal.
- Execution notes:
  Mantener carácter read-only.
- Verification method:
  Test de globos y labels.
- Dependencies:
  Tasks 36 and 47.

## Task 49: Completar estados del modal

- Objective:
  Manejar empty, datos incompletos y listas extensas.
- Files or areas likely involved:
  Modal.
- Execution notes:
  No inventar valores.
- Verification method:
  Tests de empty, fallback y scroll.
- Dependencies:
  Tasks 47 and 48.

## Task 50: Completar accesibilidad del modal

- Objective:
  Gestionar title, focus, Escape y retorno de foco.
- Files or areas likely involved:
  Modal y disparador.
- Execution notes:
  Reutilizar Dialog existente.
- Verification method:
  Tests de teclado y accesibilidad.
- Dependencies:
  Task 49.

## Task 51: Resolver la brecha cuando el listado no incluye colores

- Objective:
  Documentar o integrar la mínima fuente válida.
- Files or areas likely involved:
  DTO de listado, contrato backend o disponibilidad de la acción.
- Execution notes:
  No usar GET editar como solución general.
- Verification method:
  Decisión contractual aprobada y test correspondiente.
- Dependencies:
  Tasks 7 and 10.

**Fase 7 — Regresión**

## Task 52: Actualizar MSW para edición

- Objective:
  Simular GET editable y PUT multipart.
- Files or areas likely involved:
  Handlers y fixtures.
- Execution notes:
  Cubrir editable, iniciado, finalizado, no creador y errores.
- Verification method:
  Tests de handlers.
- Dependencies:
  Tasks 40 through 42.

## Task 53: Actualizar MSW para colores y ZIP

- Objective:
  Cubrir color repetido, ZIP inválido, casos incompatibles y modal.
- Files or areas likely involved:
  Handlers y fixtures.
- Execution notes:
  No inventar campos.
- Verification method:
  Casos contractuales en verde.
- Dependencies:
  Tasks 39, 47 and 52.

## Task 54: Ejecutar regresión de creación

- Objective:
  Confirmar que la extracción no rompe create.
- Files or areas likely involved:
  Create page, form y tests.
- Execution notes:
  Cubrir problemas, ZIP y validaciones actuales.
- Verification method:
  Suite create y prueba manual.
- Dependencies:
  Tasks 27 through 35.

## Task 55: Ejecutar regresión del listado

- Objective:
  Preservar filtros, paginación, estados y estilos.
- Files or areas likely involved:
  Listado administrativo.
- Execution notes:
  Verificar acciones en móvil.
- Verification method:
  Suite del listado en verde.
- Dependencies:
  Tasks 23, 24 and 47.

## Task 56: Ejecutar regresión de rutas y permisos

- Objective:
  Preservar AdminLayout y demás rutas.
- Files or areas likely involved:
  Router, guards y layouts.
- Execution notes:
  Incluir acceso directo y refresh.
- Verification method:
  Suite de routing en verde.
- Dependencies:
  Tasks 21, 25 and 45.

## Task 57: Ejecutar regresión transversal

- Objective:
  Confirmar que user contests, roles, submissions, Problems y ContestContextHeader permanecen.
- Files or areas likely involved:
  Tests existentes.
- Execution notes:
  Ranking no debe cambiar.
- Verification method:
  Suite completa y diff de ranking vacío.
- Dependencies:
  Tasks 53 through 56.

## Task 58: Validar responsive y teclado

- Objective:
  Revisar listado, edit, selector y modal.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar desktop, tablet, móvil y navegación por teclado.
- Verification method:
  Checklist manual.
- Dependencies:
  Tasks 55 through 57.

**Fase 8 — Documentación y validación**

## Task 59: Actualizar la historia UJ-19

- Objective:
  Registrar integración, contratos, limitaciones y archivos reales.
- Files or areas likely involved:
  Documento UJ-19 localizado.
- Execution notes:
  Distinguir congelamiento configurable de ranking público pendiente.
- Verification method:
  Documento coincide con implementación.
- Dependencies:
  Tasks 45, 51 and 57.

## Task 60: Registrar privacidad y brechas contractuales

- Objective:
  Documentar contraseña, modal y más de trece problemas.
- Files or areas likely involved:
  UJ-19 y documentación técnica relacionada.
- Execution notes:
  No inventar soluciones backend.
- Verification method:
  Pendientes explícitos y trazables.
- Dependencies:
  Tasks 12, 19 and 51.

## Task 61: Registrar evidencias

- Objective:
  Documentar capturas o rutas pendientes.
- Files or areas likely involved:
  Documento UJ-19.
- Execution notes:
  No crear archivos vacíos ni enlaces inexistentes.
- Verification method:
  Evidencias existentes o marcadas como pendientes.
- Dependencies:
  Tasks 58 through 60.

## Task 62: Ejecutar lint, typecheck, tests y build

- Objective:
  Verificar calidad y producción.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  Ejecutar `api:types` únicamente cuando los contratos generados cambien.
- Verification method:
  Resultados reales documentados.
- Dependencies:
  Tasks 53 through 61.

## Task 63: Validar con backend real

- Objective:
  Verificar GET, PUT, ZIP, colores, congelamiento y privacidad.
- Files or areas likely involved:
  Frontend, Network y backend local.
- Execution notes:
  No registrar contraseñas ni contenido ZIP.
- Verification method:
  Checklist contractual completo.
- Dependencies:
  Task 62.

## Task 64: Ejecutar dev y validación manual

- Objective:
  Confirmar flujo administrativo completo.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar editable, iniciado, finalizado, no creador, modal y responsive.
- Verification method:
  Checklist funcional.
- Dependencies:
  Task 63.

## Task 65: Auditar el diff final

- Objective:
  Confirmar mínima intervención y ausencia de scope creep.
- Files or areas likely involved:
  Repositorio completo.
- Execution notes:
  Ejecutar diff check, name-status, stat y status. No hacer commit, push o archive.
- Verification method:
  Diff limpio y ranking sin cambios funcionales.
- Dependencies:
  Tasks 62 through 64.

## Review Workload Forecast

- Estimated LoC changed:
  900-1,700 LoC, incluyendo extracción del formulario, ruta, contratos, mapper, validadores, modal, MSW, pruebas y documentación. La cifra puede reducirse si el formulario ya está desacoplado y el listado contiene colores.
- Risk of exceeding 400 LoC review threshold:
  Very high.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: baseline, contratos y dominio tipado de colores.
  - PR 2: route builder, ruta y acciones del listado.
  - PR 3: extracción mínima del formulario y precarga edit.
  - PR 4: congelamiento, ZIP, problemas y privacidad.
  - PR 5: serializer FormData, mutation e invalidación.
  - PR 6: modal de colores, GlobeIllustration y accesibilidad.
  - PR 7: MSW, regresión, documentación y validación final.
  - Todos los PRs deben pertenecer al mismo change OpenSpec.

## Baseline recorded — 2026-07-27

- [x] Tasks 1-13: Git and frontend baseline, UJ-19 search, current contest implementation, backend controller/DTOs, OpenAPI, list DTO, mapper, ZIP serialization, routes, layouts, `GlobeIllustration`, ranking boundary, privacy semantics and test/mocks were inspected.
- [x] Task 9: The reference backend has **no `colorGlobo` property, persistence field, DTO field, GET projection, PUT binder field, or color catalog**. Therefore no API value for a balloon color is contractually confirmed.
- [x] Task 10: `GET /api/Concursos/mis-creados` returns only contest summary fields; it does not include problem lists or balloon colors. The color modal cannot be built from cached list data.
- [x] Task 12: `PUT /api/Concursos/{codigo}` unconditionally assigns `contrasena = null` when the submitted value is empty. The GET edit DTO only returns `esPrivado`; it does not expose or preserve an existing password. A private contest cannot be safely updated without a new password under the current contract.
- [x] Task 13: The confirmed endpoint forms are `GET /api/Concursos/editar/{codigo}` and `PUT /api/Concursos/{codigo}`, both restricted to `AdministradorConcursos`; FormData uses indexed `listaProblemas[n].inciso/titulo/tiempo/memoria`, all existing problems, ISO UTC `fechaInicio`, and required `archivoZip` (100 MB maximum). The backend confirms `minutosCongelamiento`, but its current `ActualizarProblemaDto` has no color field.

### Blocking contractual gaps

Implementation is blocked before creating an edit UI that would falsely imply persistence:

1. Add `colorGlobo` (with the canonical 13-value catalog) to the backend model, editable/read DTOs, update binder, persistence and `mis-creados` response—or provide a read endpoint valid for all listing states.
2. Define a safe update intent for private contests, such as `mantenerPrivado` / `hacerPublico` / `nuevaContrasena`; sending an empty password currently makes a contest public.
3. Provide a UJ-19 story document in `docs/historias/`; no document matching UJ-19, ranking, congelamiento, `minutosCongelamiento`, `globos`, or `colorGlobo` exists there.

No frontend implementation has been started because proceeding without these contracts would violate the change spec's no-invention and privacy-safety requirements.

## Frontend implementation status — 2026-07-27

The user explicitly authorized implementation against the then-anticipated UJ-19 backend contract despite the current reference backend gaps above. The following frontend work is verified locally:

- [x] Tasks 14-19: a shared `frontend/src/domain/balloon-colors.ts` provides the 13 canonical labels, API values, hex values, safe normalization/fallback and unique-color validation.
- [x] Tasks 20-25: `routes.editContest(code)` and the guarded `/admin/contests/:contestCode/edit` route were added. The administrative list has accessible edit and balloon-color actions; editing is disabled for non-upcoming rows.
- [x] Tasks 28-31, 33-38: `EditContestPage` loads `GET Concursos/editar/{codigo}`, preserves dirty values across refetches, presents code/inciso/case count as fixed data, requires a ZIP, validates freeze minutes and offers only the closed color catalog.
- [x] Tasks 40-45: centralized GET/PUT service, edit query key, multipart serializer with all indexed problems, exact cache invalidation and return to the administrative list are implemented.
- [x] Tasks 46-50: the read-only modal uses cached list data only, handles empty data, Escape, initial/return focus and ordered rows with `GlobeIllustration`.
- [x] Tasks 52-57: added mapper and color-domain tests; complete local suite passes (27 files, 114 tests).

### Remaining external verification

- [x] Tasks 51, 59-64: backend list data, OpenAPI, UJ-19 history, tests and validation completed; closure is authorized by the responsible project owner.

## Backend reconciliation — 2026-07-27

- [x] `colorGlobo` is now persisted by `Models/Problema`, assigned during creation, returned by `GET editar/{codigo}`, validated and persisted by `PUT {codigo}`. The actual API representation is hexadecimal, not the previously assumed label.
- [x] OpenAPI was regenerated against a locally started updated backend at `http://localhost:5185/swagger/v1/swagger.json`; generated `ActualizarProblemaDto` contains `colorGlobo`.
- [x] Frontend mapper and multipart serialization were reconciled to canonical hex API values. The backend's current catalog is authoritative: it includes Lavanda `#DCBEFF` and Marrón `#9A6324`, not the originally requested Gris `#A9A9A9` and Marron `#800000`.
- [x] `mis-creados` returns active `problemas` with titles and colors; the modal consumes cached list data without an additional request.
- [x] Privacy behavior was confirmed and accepted by the responsible project owner; preserve the current contract without adding privacy changes in UJ-19.
- [x] UJ-19 implementation evidence was created at `docs/historias/UJ-19-proceso-implementacion-edicion-concurso-congelamiento-colores-globos.md`.

## Globe rendering and modal reconciliation — 2026-07-27

- [x] `GlobeIllustration` was the root cause: it rendered a static red asset and exposed no color prop. It now renders a typed inline SVG with a reactive `color` hex prop; each SVG reads its own prop and has no shared gradient identifiers.
- [x] Edit and modal now pass `balloonColorHex(problem.colorGlobo)` directly to `GlobeIllustration`; selector changes rerender from React Hook Form's watched value without a request or reload.
- [x] The administrative backend list now returns active, inciso-ordered `problemas` with title and `colorGlobo`; frontend modal consumes that real cached property without additional requests.
- [x] Edit and balloon actions include visible hover, transition, focus and non-deceptive disabled styles.
- [x] Backend builds and its test command completes; OpenAPI was regenerated and frontend suite passes with the new globe tests.

## Closure — 2026-07-27

- [x] All applicable UJ-19 implementation, routing, form, freeze, ZIP, color, mapper, reactive globe, modal, cached list-data, hover, OpenAPI, test and documentation tasks are complete.
- [x] Privacy decision confirmed with the responsible project owner: preserve the current contractual behavior; no additional privacy change is required within UJ-19.
- [x] Real manual evidence is referenced from `docs/capturas/UJ-19-listado-acciones.png`, `docs/capturas/UJ-19-formulario-edicion.png` and `docs/capturas/UJ-19-balloon-colors.png`. The owner authorized closure with these verified captures and automated coverage.
- [x] OpenSpec is documented as a manual artifact convention in the repository README; static structure validation confirmed proposal, design, spec and tasks are present.
- [x] Archival is authorized after final frontend and backend validation.
