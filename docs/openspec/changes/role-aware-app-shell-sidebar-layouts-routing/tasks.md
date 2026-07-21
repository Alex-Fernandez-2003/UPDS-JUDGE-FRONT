# Tasks

## Task 1: [Fase 1] Inspeccionar el workspace y registrar el baseline

- Objective:
  Confirmar la estructura real, cambios preexistentes y rutas disponibles.
- Files or areas likely involved:
  Git, `frontend/src/` y documentación actual.
- Execution notes:
  No modificar código. Registrar diferencias respecto del contexto proporcionado.
- Verification method:
  Inventario versionado de archivos, rutas y cambios preexistentes.
- Dependencies:
  None.

## Task 2: [Fase 1] Inventariar layouts y componentes de shell

- Objective:
  Localizar AdminLayout, layout estudiantil, Sidebar, headers, menús, avatar y componentes de overlay.
- Files or areas likely involved:
  `src/layouts/`, `src/components/`, `src/assets/`.
- Execution notes:
  No asumir nombres. Identificar responsabilidades y comportamiento responsive.
- Verification method:
  Mapa de componentes reutilizables y gaps.
- Dependencies:
  Task 1.

## Task 3: [Fase 1] Inventariar autenticación, sesión y routing

- Objective:
  Localizar almacenamiento, decoder existente, login, logout, ProtectedRoute, router y guards.
- Files or areas likely involved:
  `src/features/auth/`, `src/lib/auth/`, `src/lib/api/`, `src/routes/`.
- Execution notes:
  Confirmar cómo se guarda y lee el token.
- Verification method:
  Diagrama del flujo actual de sesión y navegación.
- Dependencies:
  Task 1.

## Task 4: [Fase 1] Inventariar rutas y páginas reales

- Objective:
  Confirmar módulos administrativos y estudiantiles que pueden mostrarse.
- Files or areas likely involved:
  Router, pages y features.
- Execution notes:
  Identificar rutas de concursos, envíos, usuarios y roles, forbidden y not found.
- Verification method:
  Tabla de ruta, página, layout y estado funcional.
- Dependencies:
  Tasks 2 and 3.

## Task 5: [Fase 1] Inspeccionar el JWT real de forma segura

- Objective:
  Determinar claims y formas de roles sin documentar tokens.
- Files or areas likely involved:
  Contrato de login, OpenAPI, código backend de generación accesible o token de desarrollo anonimizado.
- Execution notes:
  Registrar solo claves y tipos. No copiar valores sensibles.
- Verification method:
  Tabla de claim, clave, tipo y significado.
- Dependencies:
  Task 3.

## Task 6: [Fase 1] Inventariar tests y mocks

- Objective:
  Localizar pruebas y tokens falsos existentes para auth, routing y layouts.
- Files or areas likely involved:
  Tests, fixtures y handlers MSW.
- Execution notes:
  Identificar infraestructura para teclado, router y responsive.
- Verification method:
  Matriz de cobertura existente y pruebas a extender.
- Dependencies:
  Tasks 2, 3 and 4.

## Task 7: [Fase 2] Crear el decoder JWT central

- Objective:
  Decodificar payload Base64URL y devolver un resultado controlado.
- Files or areas likely involved:
  `src/lib/auth/` o ubicación equivalente.
- Execution notes:
  Usar APIs nativas y no validar firma.
- Verification method:
  Pruebas de token válido, malformado y payload inválido.
- Dependencies:
  Task 5.

## Task 8: [Fase 2] Definir identidad mínima y normalización de roles

- Objective:
  Mapear claims reales a identidad y roles `string[]`.
- Files or areas likely involved:
  Tipos y helpers de auth.
- Execution notes:
  Soportar únicamente formas confirmadas y eliminar duplicados.
- Verification method:
  Pruebas de string, array, claim ausente y clave real de .NET.
- Dependencies:
  Task 7.

## Task 9: [Fase 2] Centralizar catálogo y helpers de permisos

- Objective:
  Evitar comparaciones de strings dispersas.
- Files or areas likely involved:
  Constantes y helpers de auth.
- Execution notes:
  Incluir solo roles reales y helpers explícitos.
- Verification method:
  Pruebas unitarias de cada clasificación.
- Dependencies:
  Task 8.

## Task 10: [Fase 2] Crear la política de ruta inicial

- Objective:
  Elegir destino según roles con prioridad administrativa.
- Files or areas likely involved:
  Helper de routing o auth.
- Execution notes:
  Usar rutas confirmadas y definir fallback sin loops.
- Verification method:
  Pruebas para admin, usuario, múltiples roles, desconocido e inválido.
- Dependencies:
  Tasks 4 and 9.

## Task 11: [Fase 3] Integrar redirect post-login

- Objective:
  Guardar token, derivar identidad y navegar con replace.
- Files or areas likely involved:
  Login existente y router.
- Execution notes:
  No duplicar normalización en login.
- Verification method:
  Pruebas de login por cada categoría de roles.
- Dependencies:
  Task 10.

## Task 12: [Fase 3] Redirigir usuarios autenticados fuera de login

- Objective:
  Evitar que una sesión utilizable vuelva a mostrar el formulario.
- Files or areas likely involved:
  Ruta o página de login.
- Execution notes:
  Detectar token inválido y evitar ciclos.
- Verification method:
  Pruebas de token válido, inválido y rol desconocido.
- Dependencies:
  Tasks 7, 10 and 11.

## Task 13: [Fase 3] Crear o extender el guard de roles

- Objective:
  Aplicar autorización visual mínima sin duplicar ProtectedRoute.
- Files or areas likely involved:
  Guards y router.
- Execution notes:
  Separar ausencia de token de ausencia de permiso.
- Verification method:
  Pruebas de permitido, denegado y sin sesión.
- Dependencies:
  Tasks 9 and 10.

## Task 14: [Fase 3] Aplicar guards a rutas administrativas

- Objective:
  Proteger dashboard y concursos con los roles confirmados.
- Files or areas likely involved:
  Router central.
- Execution notes:
  No cambiar contenido de páginas.
- Verification method:
  Pruebas de acceso directo con roles permitidos y no permitidos.
- Dependencies:
  Task 13.

## Task 15: [Fase 3] Aplicar guards a rutas estudiantiles

- Objective:
  Proteger rutas reales del estudiante.
- Files or areas likely involved:
  Router central.
- Execution notes:
  Permitir múltiples roles cuando el contrato lo admita.
- Verification method:
  Pruebas de usuario, administrador con Usuario y rol incompatible.
- Dependencies:
  Tasks 4 and 13.

## Task 16: [Fase 3] Resolver acceso denegado

- Objective:
  Reutilizar o crear un fallback mínimo para sesiones sin permiso.
- Files or areas likely involved:
  Página Forbidden/Unauthorized o router.
- Execution notes:
  No mezclar 401 y 403 y evitar nuevas páginas duplicadas.
- Verification method:
  Navegación terminal sin loops.
- Dependencies:
  Tasks 4, 13 and 15.

## Task 17: [Fase 4] Crear o consolidar el avatar compartido

- Objective:
  Mostrar asset local o fallback reemplazable.
- Files or areas likely involved:
  Assets y componente Avatar.
- Execution notes:
  No importar archivos inexistentes ni usar URLs externas.
- Verification method:
  Pruebas de asset disponible, fallback y texto accesible.
- Dependencies:
  Task 2.

## Task 18: [Fase 4] Crear o consolidar UserMenu

- Objective:
  Compartir menú, información mínima y logout entre layouts.
- Files or areas likely involved:
  Componentes compartidos y auth helpers.
- Execution notes:
  Reutilizar Dropdown/Popover existente; no agregar opciones ficticias.
- Verification method:
  Pruebas de apertura, teclado, Escape y logout.
- Dependencies:
  Tasks 2, 8 and 17.

## Task 19: [Fase 4] Centralizar logout

- Objective:
  Eliminar token, cerrar overlays y navegar a login con replace.
- Files or areas likely involved:
  UserMenu y helper de sesión existente.
- Execution notes:
  No crear endpoint ni recargar obligatoriamente.
- Verification method:
  Pruebas de storage, navegación y request posterior sin Bearer.
- Dependencies:
  Task 18.

## Task 20: [Fase 4] Definir configuraciones declarativas de navegación

- Objective:
  Representar módulos reales, roles, iconos y keywords.
- Files or areas likely involved:
  Configuración de navegación admin y estudiante.
- Execution notes:
  No incluir rutas inexistentes ni Clasificación global.
- Verification method:
  Revisión contra la tabla de rutas confirmadas.
- Dependencies:
  Tasks 4 and 9.

## Task 21: [Fase 5] Integrar el Sidebar administrativo global

- Objective:
  Renderizar opciones filtradas dentro de AdminLayout.
- Files or areas likely involved:
  AdminLayout, Sidebar y configuración admin.
- Execution notes:
  Preservar outlets y páginas actuales.
- Verification method:
  Pruebas por rol y validación manual en páginas administrativas.
- Dependencies:
  Tasks 20 and 13.

## Task 22: [Fase 5] Implementar búsqueda y active state del Sidebar

- Objective:
  Filtrar opciones visibles y destacar la ruta actual.
- Files or areas likely involved:
  Sidebar.
- Execution notes:
  Filtrar por label y keywords; usar aria-current.
- Verification method:
  Pruebas de búsqueda, sin resultados y rutas hijas.
- Dependencies:
  Task 21.

## Task 23: [Fase 5] Completar responsive del Sidebar

- Objective:
  Reutilizar o extender el drawer móvil.
- Files or areas likely involved:
  AdminLayout, Sidebar y componentes de overlay.
- Execution notes:
  Incluir trigger accesible, Escape, overlay y retorno de foco cuando sea viable.
- Verification method:
  Pruebas de comportamiento y verificación manual móvil.
- Dependencies:
  Tasks 2 and 21.

## Task 24: [Fase 5] Actualizar el header administrativo

- Objective:
  Mostrar marca, Panel Administrativo, identidad, rol, avatar y menú.
- Files or areas likely involved:
  AdminLayout y header existente.
- Execution notes:
  Derivar datos de identidad y evitar strings hardcodeados.
- Verification method:
  Pruebas de nombre, descripción, menú y logout.
- Dependencies:
  Tasks 8, 18 and 21.

## Task 25: [Fase 6] Integrar el layout estudiantil global

- Objective:
  Aplicar un header común a páginas estudiantiles reales.
- Files or areas likely involved:
  Layout de estudiante y router.
- Execution notes:
  No crear un header por página.
- Verification method:
  Render de todas las rutas estudiantiles confirmadas.
- Dependencies:
  Tasks 4, 18 and 20.

## Task 26: [Fase 6] Configurar navegación estudiantil

- Objective:
  Mostrar solo Concursos, Mis envíos u otras rutas reales aprobadas.
- Files or areas likely involved:
  Configuración y header estudiantil.
- Execution notes:
  Excluir Clasificación global.
- Verification method:
  Pruebas de opciones visibles, active state y ruta inexistente ausente.
- Dependencies:
  Task 25.

## Task 27: [Fase 6] Completar responsive y menú estudiantil

- Objective:
  Mantener navegación y sesión utilizables en pantallas pequeñas.
- Files or areas likely involved:
  Layout estudiantil y UserMenu.
- Execution notes:
  Reutilizar el patrón móvil existente y no duplicar logout.
- Verification method:
  Pruebas accesibles y revisión manual móvil.
- Dependencies:
  Tasks 19, 25 and 26.

## Task 28: [Fase 7] Crear la documentación transversal

- Objective:
  Documentar claims, roles, matrices, flujo, seguridad y pendientes.
- Files or areas likely involved:
  `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- Execution notes:
  Utilizar rutas y claims reales. No incluir tokens o enlaces rotos.
- Verification method:
  Checklist de todas las secciones requeridas.
- Dependencies:
  Tasks 5, 10, 14, 15, 20, 24 and 27.

## Task 29: [Fase 7] Registrar evidencias y avatar pendientes

- Objective:
  Mantener trazabilidad sin crear archivos ficticios.
- Files or areas likely involved:
  Documento transversal.
- Execution notes:
  Marcar cada captura y PNG como pendiente manual.
- Verification method:
  Ninguna evidencia aparece como completada sin archivo real.
- Dependencies:
  Task 28.

## Task 30: [Fase 8] Completar pruebas de JWT e identidad

- Objective:
  Verificar decoder, claims, normalización y fallos seguros.
- Files or areas likely involved:
  Tests de auth.
- Execution notes:
  Usar tokens falsos controlados.
- Verification method:
  Casos válidos, inválidos, string, array y ausentes en verde.
- Dependencies:
  Tasks 7, 8 and 9.

## Task 31: [Fase 8] Completar pruebas de redirects y guards

- Objective:
  Verificar prioridades y permisos de rutas.
- Files or areas likely involved:
  Tests de login y router.
- Execution notes:
  Incluir múltiples roles y ausencia de loops.
- Verification method:
  Tests de admin, estudiante, desconocido, sin sesión y sin rol.
- Dependencies:
  Tasks 11 through 16.

## Task 32: [Fase 8] Completar pruebas del Sidebar

- Objective:
  Verificar permisos, búsqueda, active state y módulos reales.
- Files or areas likely involved:
  Tests del Sidebar.
- Execution notes:
  No depender únicamente de clases CSS.
- Verification method:
  Opciones y atributos accesibles verificados.
- Dependencies:
  Tasks 21 through 23.

## Task 33: [Fase 8] Completar pruebas de layouts y logout

- Objective:
  Verificar identidad, navegación, menús y cierre de sesión.
- Files or areas likely involved:
  Tests de AdminLayout, StudentLayout y UserMenu.
- Execution notes:
  Cubrir ausencia de Clasificación global y fallback de avatar.
- Verification method:
  Tests de ambos layouts y eliminación de token.
- Dependencies:
  Tasks 17 through 27.

## Task 34: [Fase 9] Ejecutar validaciones automatizadas

- Objective:
  Confirmar formato, lint, tipos, tests y build.
- Files or areas likely involved:
  Frontend completo y documento nuevo.
- Execution notes:
  Ejecutar los scripts existentes sin OpenSpec CLI.
- Verification method:
  format, lint, typecheck, tests y build exitosos.
- Dependencies:
  Tasks 28 through 33.

## Task 35: [Fase 9] Validar manualmente escritorio y móvil

- Objective:
  Auditar shells, navegación, redirects y responsive.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar cada rol real y múltiples roles.
- Verification method:
  Checklist por viewport, rol y ruta.
- Dependencies:
  Task 34.

## Task 36: [Fase 9] Validar teclado y accesibilidad

- Objective:
  Confirmar foco, menús, drawer, búsqueda y active state.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Usar teclado sin depender del mouse.
- Verification method:
  Checklist de Tab, Enter, Space, Escape y retorno de foco.
- Dependencies:
  Task 35.

## Task 37: [Fase 9] Auditar seguridad y alcance

- Objective:
  Confirmar que no se exponen tokens ni se agregan módulos o cambios fuera de alcance.
- Files or areas likely involved:
  Git diff, logs, mocks y documentación.
- Execution notes:
  Revisar backend, database, rutas y datos de prueba.
- Verification method:
  Checklist de seguridad y exclusiones.
- Dependencies:
  Tasks 34, 35 and 36.

## Task 38: [Fase 9] Actualizar tareas y cerrar sin commit

- Objective:
  Reflejar únicamente el trabajo verificado y preparar el handoff.
- Files or areas likely involved:
  `tasks.md` y working tree.
- Execution notes:
  Mantener pendientes capturas y avatar. No usar OpenSpec CLI, commit o push.
- Verification method:
  Estados respaldados por evidencia y Git final revisado.
- Dependencies:
  Tasks 29 and 37.

## Review Workload Forecast

- Estimated LoC changed:
  700-1,300 LoC, incluyendo helpers de identidad, guards, configuraciones de navegación, shells, componentes compartidos, pruebas y documentación.
- Risk of exceeding 400 LoC review threshold:
  High.
- Recommendation:
  Chained PRs manteniendo un único change OpenSpec.
- Suggested split if chained:
  - PR 1: decoder JWT, identidad, roles, política de ruta y guards.
  - PR 2: UserMenu, avatar, configuración declarativa y logout.
  - PR 3: AdminLayout, Sidebar, header y responsive.
  - PR 4: StudentLayout, navegación y responsive.
  - PR 5: documentación, pruebas integrales y validación final.

## Resume status

- Completed: central JWT decoding and role normalization; initial-route selection; role guard and forbidden fallback; role-filtered administrative navigation; local sidebar search; active semantics; responsive admin drawer; shared user menu and local logout; focused identity and router/layout test updates; transversal documentation.
- Deferred: student shell and routes because the inspected router contains no student route; real production claim verification because backend/contract files are outside the authorized edit and inspection scope; manual viewport, keyboard, screenshot, and final-avatar evidence.
- Validation: focused test run exposed one corrected router assertion and pre-existing contest/MSW handler failures. Full validation remains pending after resolving that unrelated test baseline.

- **Temporary Usuario route:** added protected `/student` landing for `Usuario`; it intentionally renders only the logout control. The centralized initial-route policy now sends Usuario-only sessions there.
