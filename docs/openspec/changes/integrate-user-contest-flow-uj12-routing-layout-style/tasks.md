# Tasks

**Fase 1 — Baseline**

## Task 1: Registrar el estado inicial

- Objective:
  Proteger trabajo preexistente de los distintos integrantes.
- Files or areas likely involved:
  Working tree completo.
- Execution notes:
  Registrar cambios en contests, problems, submissions, routes, layouts y docs. No restaurar archivos.
- Verification method:
  Estado inicial de Git y lista de cambios preexistentes.
- Dependencies:
  None.

## Task 2: Ejecutar los checks de baseline

- Objective:
  Identificar fallos preexistentes antes de integrar.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  Ejecutar format, lint, typecheck, tests y build sin corregir todavía.
- Verification method:
  Resultados iniciales documentados.
- Dependencies:
  Task 1.

**Fase 2 — Documentación e inventario**

## Task 3: Leer la documentación de UJ-11

- Objective:
  Confirmar rutas, archivos, contratos y pendientes de la lista.
- Files or areas likely involved:
  Documento obligatorio de UJ-11.
- Execution notes:
  Registrar especialmente callbacks desconectados y query keys.
- Verification method:
  Resumen contractual e inventario de archivos.
- Dependencies:
  Task 1.

## Task 4: Leer la documentación de UJ-13

- Objective:
  Confirmar problemas, PDF, endpoint y archivos declarados.
- Files or areas likely involved:
  Documento obligatorio de UJ-13.
- Execution notes:
  Contrastar cada archivo con el workspace.
- Verification method:
  Lista de coincidencias y discrepancias.
- Dependencies:
  Task 1.

## Task 5: Leer la documentación de UJ-14 y UJ-15

- Objective:
  Confirmar formulario, evaluación, tabla y mecanismo de actualización.
- Files or areas likely involved:
  Documento obligatorio de UJ-14/UJ-15.
- Execution notes:
  No asumir tiempo real persistente sin código.
- Verification method:
  Mapa de componentes y flujo.
- Dependencies:
  Task 1.

## Task 6: Inventariar el código integrado

- Objective:
  Crear las matrices por HU y responsabilidad.
- Files or areas likely involved:
  Contests, problems, submissions, auth, layouts, routes, API, mocks y tests.
- Execution notes:
  Clasificar reutilización, modificación, conexión, bloqueo o fuera de alcance.
- Verification method:
  Matrices completas con rutas reales.
- Dependencies:
  Tasks 3 through 5.

## Task 7: Resolver la discrepancia de UJ-13

- Objective:
  Localizar la implementación descrita o confirmar que todavía no fue integrada.
- Files or areas likely involved:
  Workspace, ramas de integración y feature problems.
- Execution notes:
  No recrear UJ-13 sin coordinar.
- Verification method:
  Archivos reales localizados o bloqueo formal.
- Dependencies:
  Tasks 4 and 6.

**Fase 3 — Política de acceso**

## Task 8: Normalizar estados y modalidades

- Objective:
  Separar valores backend de etiquetas UI.
- Files or areas likely involved:
  Constantes, tipos o mappers de contests user.
- Execution notes:
  Incluir fallback seguro.
- Verification method:
  Tests de mappings.
- Dependencies:
  Task 6.

## Task 9: Implementar la política de acciones

- Objective:
  Derivar la acción de lista desde estado, modalidad e inscripción.
- Files or areas likely involved:
  Contests user.
- Execution notes:
  Mantener la función pura y sin navegación.
- Verification method:
  Matriz de ocho casos en tests.
- Dependencies:
  Task 8.

## Task 10: Implementar la política de modos

- Objective:
  Derivar participation, read-only o blocked.
- Files or areas likely involved:
  Contests user o composición del detalle.
- Execution notes:
  Incluir razón de bloqueo.
- Verification method:
  Tests de modos y estados desconocidos.
- Dependencies:
  Tasks 8 and 9.

**Fase 4 — Routing**

## Task 11: Definir la ruta canónica del detalle

- Objective:
  Elegir una ruta basada en los componentes y parámetros reales.
- Files or areas likely involved:
  Router, constantes y documentación.
- Execution notes:
  Priorizar código si los servicios lo usan; registrar rutas legacy.
- Verification method:
  Decisión documentada sin rutas duplicadas.
- Dependencies:
  Tasks 6, 7 and 10.

## Task 12: Conectar la lista al detalle

- Objective:
  Navegar solo para acciones permitidas.
- Files or areas likely involved:
  ContestCard, grid, page y router.
- Execution notes:
  No usar el texto del botón como policy.
- Verification method:
  Tests de navegación por matriz.
- Dependencies:
  Tasks 9 and 11.

## Task 13: Hacer recargable el detalle

- Objective:
  Reconstruir estado desde route param y queries.
- Files or areas likely involved:
  Página de detalle y servicios.
- Execution notes:
  Eliminar dependencia obligatoria de location.state.
- Verification method:
  Test de reload y acceso directo.
- Dependencies:
  Task 11.

## Task 14: Componer guards existentes

- Objective:
  Proteger home y detalle sin duplicar autorización.
- Files or areas likely involved:
  Router, ProtectedRoute y RoleRoute.
- Execution notes:
  Mantener login, forbidden y logout.
- Verification method:
  Tests sin token, rol incorrecto y Usuario.
- Dependencies:
  Tasks 11 and 13.

**Fase 5 — UJ-12 contrato**

## Task 15: Registrar el endpoint de inscripción

- Objective:
  Centralizar `ParticipanteConcursos/unirse`.
- Files or areas likely involved:
  Endpoints compartidos.
- Execution notes:
  Usar path relativo.
- Verification method:
  Test o inspección del registro.
- Dependencies:
  Task 6.

## Task 16: Definir tipos de inscripción

- Objective:
  Representar request y response reales.
- Files or areas likely involved:
  Tipos de contests user.
- Execution notes:
  No usar any.
- Verification method:
  Typecheck y comparación con backend.
- Dependencies:
  Task 15.

## Task 17: Crear o adaptar el servicio de inscripción

- Objective:
  Ejecutar POST mediante HttpClient.
- Files or areas likely involved:
  Servicio de contests user.
- Execution notes:
  No leer sesión ni registrar contraseña.
- Verification method:
  Tests de payload, respuesta y ApiError.
- Dependencies:
  Tasks 15 and 16.

## Task 18: Crear la mutación de inscripción

- Objective:
  Exponer pending, success y error.
- Files or areas likely involved:
  Hooks de contests user.
- Execution notes:
  Mutation key sin contraseña y sin doble submit.
- Verification method:
  Tests de estados.
- Dependencies:
  Task 17.

## Task 19: Implementar invalidación exacta

- Objective:
  Actualizar `yaInscrito` conservando filtros.
- Files or areas likely involved:
  Hook y query keys de UJ-11.
- Execution notes:
  No invalidar toda la caché.
- Verification method:
  Tests de keys y estado conservado.
- Dependencies:
  Tasks 3 and 18.

## Task 20: Actualizar MSW para inscripción

- Objective:
  Simular respuestas reales de UJ-12.
- Files or areas likely involved:
  Handlers y fixtures.
- Execution notes:
  Cubrir público, privado, errores y token falso.
- Verification method:
  Tests de handlers.
- Dependencies:
  Tasks 16 and 17.

**Fase 6 — UJ-12 UI**

## Task 21: Crear o adaptar JoinContestModal

- Objective:
  Compartir estructura entre público y privado.
- Files or areas likely involved:
  Components de contests user.
- Execution notes:
  Reutilizar Dialog, Button, PasswordInput, FormField y Alert.
- Verification method:
  Tests de ambos modos.
- Dependencies:
  Tasks 18 and 20.

## Task 22: Implementar confirmación pública

- Objective:
  Inscribir sin campo de contraseña.
- Files or areas likely involved:
  Modal y card.
- Execution notes:
  Enviar null u omisión según contrato.
- Verification method:
  Test de UI y payload.
- Dependencies:
  Task 21.

## Task 23: Implementar contraseña privada

- Objective:
  Validar y enviar contraseña efímera.
- Files or areas likely involved:
  Modal privado.
- Execution notes:
  Limpiar en cancel y success; no persistir.
- Verification method:
  Tests de vacío, payload y limpieza.
- Dependencies:
  Task 21.

## Task 24: Implementar estados y errores del modal

- Objective:
  Cubrir pending, success y errores backend.
- Files or areas likely involved:
  Modal, hook y Alert.
- Execution notes:
  No cerrar en error; evitar doble submit.
- Verification method:
  Tests de cada respuesta obligatoria.
- Dependencies:
  Tasks 22 and 23.

## Task 25: Completar accesibilidad del modal

- Objective:
  Gestionar foco, Escape, Enter, labels y anuncios.
- Files or areas likely involved:
  Modal y componentes base.
- Execution notes:
  No cerrar accidentalmente durante pending.
- Verification method:
  Tests de teclado y focus.
- Dependencies:
  Task 24.

**Fase 7 — Integración del detalle**

## Task 26: Crear o adaptar la página de composición

- Objective:
  Reunir UJ-13, UJ-14 y UJ-15 sin duplicarlas.
- Files or areas likely involved:
  Página de detalle real.
- Execution notes:
  Usar exports públicos de features.
- Verification method:
  Test de composición.
- Dependencies:
  Tasks 7, 10 and 13.

## Task 27: Integrar UJ-13

- Objective:
  Renderizar incisos y PDF según el modo.
- Files or areas likely involved:
  Problems y página de detalle.
- Execution notes:
  No cambiar contrato o URL.
- Verification method:
  Tests de incisos, PDF disponible y ausente.
- Dependencies:
  Tasks 7 and 26.

## Task 28: Integrar UJ-14

- Objective:
  Habilitar el formulario solo en participation.
- Files or areas likely involved:
  SubmitForm y detalle.
- Execution notes:
  Conservar lenguajes, DTO y validaciones.
- Verification method:
  Tests participation, read-only y blocked.
- Dependencies:
  Task 26.

## Task 29: Integrar UJ-15

- Objective:
  Conservar actualización del veredicto y tabla.
- Files or areas likely involved:
  Submissions y detalle.
- Execution notes:
  Identificar el mecanismo real y evitar duplicados.
- Verification method:
  Test de nuevo envío, actualización y cleanup.
- Dependencies:
  Tasks 5, 26 and 28.

## Task 30: Implementar el bloqueo privado finalizado

- Objective:
  Mostrar feedback sin validación insegura.
- Files or areas likely involved:
  Policy y detalle.
- Execution notes:
  No llamar unirse ni mostrar modal funcional.
- Verification method:
  Test de ausencia de request y mensaje.
- Dependencies:
  Tasks 9, 10 and 26.

**Fase 8 — Fix UserLayout**

## Task 31: Localizar la restricción de ancho

- Objective:
  Identificar clases responsables sin modificar comportamiento.
- Files or areas likely involved:
  UserLayout y tests.
- Execution notes:
  Revisar container, max-width, padding y overflow.
- Verification method:
  Lista de clases y consumers afectados.
- Dependencies:
  Task 6.

## Task 32: Aplicar el ancho completo

- Objective:
  Permitir que cada página controle su layout.
- Files or areas likely involved:
  UserLayout.
- Execution notes:
  Mantener header, navegación, menú y logout.
- Verification method:
  Test estructural y revisión visual.
- Dependencies:
  Task 31.

## Task 33: Validar responsive del layout

- Objective:
  Evitar overflow y recortes.
- Files or areas likely involved:
  UserLayout y páginas user.
- Execution notes:
  Revisar min-width, dropdowns y scroll.
- Verification method:
  Checklist desktop, tablet y móvil.
- Dependencies:
  Task 32.

**Fase 9 — Fix de tabla**

## Task 34: Comparar las dos tablas

- Objective:
  Identificar diferencias de shell, header, rows, badges y estados.
- Files or areas likely involved:
  RecentSubmissionsTable y SubmissionsTable.
- Execution notes:
  No comparar contratos como si fueran iguales.
- Verification method:
  Matriz visual de diferencias.
- Dependencies:
  Task 6.

## Task 35: Definir la estrategia de reutilización

- Objective:
  Elegir primitivas o constantes visuales compartibles.
- Files or areas likely involved:
  Componentes base y ambas tablas.
- Execution notes:
  Evitar dependencias circulares.
- Verification method:
  Decisión de diseño documentada.
- Dependencies:
  Task 34.

## Task 36: Alinear RecentSubmissionsTable

- Objective:
  Aplicar el sistema visual sin cambiar lógica.
- Files or areas likely involved:
  Tabla histórica.
- Execution notes:
  Preservar columnas, datos, mapper, refresh y estados.
- Verification method:
  Tests de comportamiento y revisión visual.
- Dependencies:
  Task 35.

## Task 37: Validar estados y responsive de tablas

- Objective:
  Confirmar loading, empty, error y scroll.
- Files or areas likely involved:
  Ambas tablas.
- Execution notes:
  No exigir clases idénticas.
- Verification method:
  Tests semánticos y checklist móvil.
- Dependencies:
  Task 36.

**Fase 10 — Pruebas y mocks**

## Task 38: Completar pruebas de policy y routing

- Objective:
  Cubrir matriz, redirects, guards y reload.
- Files or areas likely involved:
  Tests de contests user y router.
- Execution notes:
  Incluir privado finalizado.
- Verification method:
  Casos obligatorios en verde.
- Dependencies:
  Tasks 9 through 14 and 30.

## Task 39: Completar pruebas de UJ-12

- Objective:
  Cubrir modal, payloads, errores, invalidación y seguridad.
- Files or areas likely involved:
  Tests de modal, hook y service.
- Execution notes:
  Verificar ausencia de reload y persistencia.
- Verification method:
  Suite UJ-12 en verde.
- Dependencies:
  Tasks 19 through 25.

## Task 40: Completar pruebas del detalle integrado

- Objective:
  Cubrir composición y modos sin duplicar suites internas.
- Files or areas likely involved:
  Tests de detalle.
- Execution notes:
  Usar mocks de cada feature.
- Verification method:
  Participation, read-only y blocked en verde.
- Dependencies:
  Tasks 27 through 30.

## Task 41: Completar pruebas de layout y tablas

- Objective:
  Verificar fixes visuales sin assertions frágiles.
- Files or areas likely involved:
  Tests de layouts y tablas.
- Execution notes:
  Combinar estructura y validación manual.
- Verification method:
  Suite relevante en verde.
- Dependencies:
  Tasks 33 and 37.

## Task 42: Ejecutar regresión administrativa

- Objective:
  Confirmar rutas, listado y creación administrativos.
- Files or areas likely involved:
  Router y tests admin.
- Execution notes:
  No corregir mediante cambios funcionales ajenos.
- Verification method:
  Suite administrativa en verde.
- Dependencies:
  Tasks 38 through 41.

**Fase 11 — Documentación**

## Task 43: Crear o actualizar UJ-12

- Objective:
  Documentar inscripción pública y privada.
- Files or areas likely involved:
  `docs/historias/`.
- Execution notes:
  Buscar documento equivalente antes de crear.
- Verification method:
  Un único documento de UJ-12.
- Dependencies:
  Tasks 24, 25 and 30.

## Task 44: Actualizar UJ-11

- Objective:
  Registrar acciones, ruta y acceso al detalle.
- Files or areas likely involved:
  Documento obligatorio de UJ-11.
- Execution notes:
  Preservar historia y pendientes válidos.
- Verification method:
  Flujo final y archivos reales documentados.
- Dependencies:
  Tasks 12, 19 and 26.

## Task 45: Actualizar UJ-13

- Objective:
  Registrar ruta, composición y modos.
- Files or areas likely involved:
  Documento obligatorio de UJ-13.
- Execution notes:
  Corregir discrepancias solo con evidencia.
- Verification method:
  Documento coincide con código integrado.
- Dependencies:
  Tasks 7 and 27.

## Task 46: Actualizar UJ-14 y UJ-15

- Objective:
  Registrar ruta, permisos y mecanismo real.
- Files or areas likely involved:
  Documento obligatorio de UJ-14/UJ-15.
- Execution notes:
  No afirmar envíos en finalizados.
- Verification method:
  Contratos y modos documentados.
- Dependencies:
  Tasks 28 and 29.

## Task 47: Documentar fixes y bloqueo backend

- Objective:
  Registrar UserLayout, tablas y privado finalizado.
- Files or areas likely involved:
  Documentos afectados.
- Execution notes:
  No crear historias ficticias ni ruta backend definitiva.
- Verification method:
  Problema, cambio, límites y pendiente presentes.
- Dependencies:
  Tasks 30, 33 and 37.

## Task 48: Registrar evidencias pendientes

- Objective:
  Mantener trazabilidad sin archivos falsos.
- Files or areas likely involved:
  Documentos de historias.
- Execution notes:
  Registrar rutas como texto hasta que existan.
- Verification method:
  Ningún enlace roto añadido.
- Dependencies:
  Tasks 43 through 47.

**Fase 12 — Validación**

## Task 49: Ejecutar format, lint y typecheck

- Objective:
  Verificar estilo y contratos.
- Files or areas likely involved:
  Frontend y documentación.
- Execution notes:
  No ampliar el diff con formato ajeno.
- Verification method:
  Checks exitosos.
- Dependencies:
  Tasks 42 and 48.

## Task 50: Ejecutar tests y build

- Objective:
  Verificar comportamiento y producción.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No usar skips, casts inseguros o snapshots vacíos.
- Verification method:
  Test suite y build exitosos.
- Dependencies:
  Task 49.

## Task 51: Validar el flujo con backend real

- Objective:
  Verificar lista, inscripción, detalle, solución y veredicto.
- Files or areas likely involved:
  Aplicación, Network y backend.
- Execution notes:
  No registrar JWT o contraseñas.
- Verification method:
  Checklist funcional completo.
- Dependencies:
  Task 50.

## Task 52: Validar responsive y teclado

- Objective:
  Revisar dashboard, modal, detalle, layout y tablas.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar desktop, tablet, móvil, focus y Escape.
- Verification method:
  Checklist manual.
- Dependencies:
  Task 51.

## Task 53: Ejecutar diff check y auditoría de alcance

- Objective:
  Confirmar ausencia de backend, duplicados y scope creep.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Ejecutar `git diff --check`; no usar OpenSpec CLI, commit o push.
- Verification method:
  Diff limpio y exclusiones verificadas.
- Dependencies:
  Tasks 50 through 52.

## Estado de implementación actual

- Implementados: política de acciones y de modos (Tasks 8–10), endpoint/tipos/servicio/mutación de inscripción (Tasks 15–19), modal de inscripción inicial (Tasks 21–25), conexión de cards y ruta canónica de envíos (Tasks 11–14), ajuste visual de ancho de `UserLayout` (Task 32) y pruebas unitarias de política.
- Pendientes bloqueados: composición UJ-13 (Tasks 26–27) por ausencia de `features/problems` en el workspace; el detalle unificado y sus modos requieren confirmar el endpoint real.
- Pendientes: pruebas de servicio/modal/routing, revisión de tablas y validación manual con backend real.

## Review Workload Forecast

- Estimated LoC changed:
  1,000-1,800 LoC, incluyendo routing, policy, UJ-12, composición, tests, mocks, fixes visuales y documentación. La estimación depende de cuánto código de UJ-13 falte integrar.
- Risk of exceeding 400 LoC review threshold:
  Very high.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: inventario, policy y routing base.
  - PR 2: contrato, servicio, mutación y MSW de UJ-12.
  - PR 3: modal público/privado y pruebas.
  - PR 4: composición UJ-13/UJ-14/UJ-15 y modos.
  - PR 5: fix visual de UserLayout y tablas.
  - PR 6: documentación, regresión y validación final.
  - Los PRs representan una estrategia de revisión; todos pertenecen al mismo change OpenSpec.

- Final closure: verified the flexible `RecentSubmissionsTable` shell with a focused test; lint, typecheck, full tests, build, development server, and diff whitespace checks were executed. Backend-only private-finished access and reliable UJ-15 real-time remain outside this change.
