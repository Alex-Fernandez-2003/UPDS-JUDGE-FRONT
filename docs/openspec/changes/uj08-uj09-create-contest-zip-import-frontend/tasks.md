# Tasks

## Current implementation status

- Completed: Tasks 1-4 and 6-24. The frontend creation flow, scoped tests, route integration, and MSW controlled responses are implemented.
- Completed: Task 25 for format, lint, typecheck, tests, and production build. The requested development-server command was attempted, but port 8085 was already occupied by a pre-existing process; both required routes returned HTTP 200 from that server.
- Pending: Task 5 remains pending because generated API types are intentionally out of scope for this change.
- Pending manual/external evidence: Tasks 26-29 require visual captures, a controlled browser flow, and/or an authenticated backend contract check. No captures were created.
- Pending handoff: Task 30 remains pending until final protected-scope review and handoff are complete.

## Task 1: Inspeccionar el change y el estado del repositorio

- Objective:
  Confirmar el ID, la ruta OpenSpec, el estado de Git y la estructura actual del frontend.
- Files or areas likely involved:
  `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/`, raíz del repositorio y `frontend/`.
- Execution notes:
  No ejecutar apply desde la validación documental. Registrar cambios preexistentes y proteger trabajo ajeno.
- Verification method:
  Checklist del ID, ruta, cuatro artefactos y baseline de Git.
- Dependencies:
  None.

## Task 2: Inspeccionar la ruta reservada y la feature de concursos

- Objective:
  Localizar el placeholder de `/admin/contests/new` y las convenciones reales de features, páginas y tests.
- Files or areas likely involved:
  Router, constantes de rutas y `frontend/src/features/contests/`.
- Execution notes:
  No modificar otras rutas, listado, AdminLayout, sidebar o topbar.
- Verification method:
  Documentar el archivo de ruta, placeholder actual y estructura que deberá extenderse.
- Dependencies:
  Task 1.

## Task 3: Revisar componentes y fundación compartida

- Objective:
  Confirmar las APIs disponibles de componentes, HttpClient, ApiError, QueryClient, MSW y AuthTransport.
- Files or areas likely involved:
  Componentes common/forms, `src/lib/api/`, `src/lib/auth/`, `src/lib/query/` y `src/mocks/`.
- Execution notes:
  Identificar limitaciones reales antes de modificar componentes compartidos.
- Verification method:
  Matriz de componentes y contratos reutilizables con cualquier gap documentado.
- Dependencies:
  Task 1.

## Task 4: Confirmar el contrato en OpenAPI

- Objective:
  Verificar endpoint, método, multipart, DTO, respuesta, errores y Bearer.
- Files or areas likely involved:
  OpenAPI del backend y tipos generados.
- Execution notes:
  No asumir que el DTO proporcionado coincide exactamente. No modificar backend.
- Verification method:
  Registro del endpoint confirmado y comparación campo por campo.
- Dependencies:
  Tasks 1 and 3.

## Task 5: Regenerar tipos API cuando corresponda

- Objective:
  Sincronizar los tipos generados con el OpenAPI vigente.
- Files or areas likely involved:
  Script `api:types` y `src/types/api.generated.ts`.
- Execution notes:
  No editar el archivo generado manualmente. Si OpenAPI no está disponible, mantener esta tarea pendiente.
- Verification method:
  Ejecución exitosa del generador y revisión del diff.
- Dependencies:
  Task 4.

## Task 6: Registrar el endpoint de creación

- Objective:
  Añadir únicamente la ruta confirmada a la fuente central de endpoints.
- Files or areas likely involved:
  `src/lib/api/endpoints.ts`.
- Execution notes:
  Utilizar una ruta relativa. No agregar GET de concursos ni host.
- Verification method:
  Test o revisión que confirme `Concursos/crear` y ausencia de endpoints fuera de alcance.
- Dependencies:
  Task 4.

## Task 7: Definir los tipos del formulario

- Objective:
  Representar el estado de UI sin duplicar el DTO externo.
- Files or areas likely involved:
  Tipos específicos dentro de la feature de concursos.
- Execution notes:
  Incluir campos del formulario, problemas dinámicos y archivo ZIP. Mantener separación respecto de tipos generados.
- Verification method:
  Typecheck y revisión del uso exclusivo en formulario, schema y mapper.
- Dependencies:
  Tasks 2 and 4.

## Task 8: Crear el schema de validación

- Objective:
  Implementar las reglas de UJ-08 y validaciones superficiales de UJ-09.
- Files or areas likely involved:
  Schema Zod y tests.
- Execution notes:
  Validar campos obligatorios, números, congelamiento, URL, problemas y extensión ZIP. No inspeccionar contenido.
- Verification method:
  Tests 1-14 y casos límite definidos en la spec.
- Dependencies:
  Task 7.

## Task 9: Crear la normalización de fecha

- Objective:
  Convertir `datetime-local` al formato confirmado por el backend.
- Files or areas likely involved:
  Mapper o utilidad específica de la feature y tests.
- Execution notes:
  No inventar una zona horaria. Mantener la conversión fuera de la página.
- Verification method:
  Tests con fechas conocidas y comparación con el contrato.
- Dependencies:
  Tasks 4 and 7.

## Task 10: Crear el mapper a FormData

- Objective:
  Transformar valores válidos del formulario en el request multipart contractual.
- Files or areas likely involved:
  Mapper de la feature y tests.
- Execution notes:
  Agregar campos simples, colección indexada y ZIP. No configurar headers.
- Verification method:
  Tests 24-32, incluidos índices, contraseña vacía y archivo.
- Dependencies:
  Tasks 7, 8 and 9.

## Task 11: Crear el servicio de creación

- Objective:
  Ejecutar POST mediante el HttpClient y AuthTransport existentes.
- Files or areas likely involved:
  Servicio API de concursos.
- Execution notes:
  Consumir endpoint y mapper. No usar `fetch`, Axios, host o token directo.
- Verification method:
  Tests del método, URL relativa, payload, respuesta y ApiError.
- Dependencies:
  Tasks 3, 6 and 10.

## Task 12: Crear la mutación de TanStack Query

- Objective:
  Encapsular el servicio mediante `useMutation`.
- Files or areas likely involved:
  Hook de creación y tests.
- Execution notes:
  Exponer estados estándar. No crear QueryClient ni invalidar el listado.
- Verification method:
  Tests de pending, success, error, reset y una única llamada.
- Dependencies:
  Task 11.

## Task 13: Crear la lista dinámica de problemas

- Objective:
  Implementar la edición de problemas mediante `useFieldArray`.
- Files or areas likely involved:
  Componente específico de concursos y formulario de página.
- Execution notes:
  Generar incisos por índice, permitir agregar/eliminar y limitar a 26. No implementar reordenamiento.
- Verification method:
  Tests 15-20 y accesibilidad de acciones.
- Dependencies:
  Tasks 7 and 8.

## Task 14: Integrar el archivo ZIP

- Objective:
  Reutilizar FileDropzone para seleccionar el paquete requerido.
- Files or areas likely involved:
  Sección de recursos del formulario.
- Execution notes:
  Aceptar `.zip`, mostrar nombre y errores, y mantener la validación profunda en backend.
- Verification method:
  Tests de archivo obligatorio, extensión, eliminación y ayuda por incisos.
- Dependencies:
  Tasks 8 and 13.

## Task 15: Crear el resumen del concurso

- Objective:
  Mostrar una vista segura y reactiva de los valores introducidos.
- Files or areas likely involved:
  Componente `CreateContestSummary` o equivalente.
- Execution notes:
  Mostrar datos aprobados, modalidad derivada e incisos. No mostrar contraseña o JWT.
- Verification method:
  Tests 20-23 y revisión de datos sensibles.
- Dependencies:
  Tasks 7, 13 and 14.

## Task 16: Crear la página de una sola pantalla

- Objective:
  Componer encabezado, secciones, resumen y acciones en `CreateContestPage`.
- Files or areas likely involved:
  Página de la feature y componentes específicos.
- Execution notes:
  Reutilizar componentes existentes. No crear wizard, sidebar, topbar o layout alternativo.
- Verification method:
  Tests de render, secciones, acciones y ausencia de elementos fuera de alcance.
- Dependencies:
  Tasks 12, 13, 14 and 15.

## Task 17: Integrar estados de envío, éxito y error

- Objective:
  Conectar el formulario con la mutación y presentar feedback seguro.
- Files or areas likely involved:
  CreateContestPage y componentes Alert/Button.
- Execution notes:
  Impedir doble envío, mostrar código backend y traducir 401 sin logout global.
- Verification method:
  Tests 33-38 y verificación de que no se muestra JSON crudo.
- Dependencies:
  Tasks 12 and 16.

## Task 18: Completar responsive y accesibilidad

- Objective:
  Asegurar una composición usable en escritorio, móvil y teclado.
- Files or areas likely involved:
  Página y componentes específicos.
- Execution notes:
  Dos columnas en desktop, una en móvil, foco visible y asociaciones ARIA.
- Verification method:
  Tests accesibles y revisión manual en varios viewports.
- Dependencies:
  Tasks 16 and 17.

## Task 19: Reemplazar el placeholder de routing

- Objective:
  Registrar CreateContestPage en `/admin/contests/new`.
- Files or areas likely involved:
  Router y constantes existentes.
- Execution notes:
  No agregar guards, redirects, listado o navegación global.
- Verification method:
  Tests 39, 44, 45 y 46.
- Dependencies:
  Tasks 2 and 16.

## Task 20: Crear o ajustar el handler MSW

- Objective:
  Permitir pruebas seguras de éxito, error 400 y 401.
- Files or areas likely involved:
  Handlers y fixtures de concursos.
- Execution notes:
  Crear el handler solo con contrato confirmado. Leer FormData sin descomprimir ZIP.
- Verification method:
  Tests del handler y de compatibilidad de respuesta.
- Dependencies:
  Tasks 4, 10 and 11.

## Task 21: Completar pruebas de schema y FormData

- Objective:
  Cubrir todas las reglas de validación y construcción multipart.
- Files or areas likely involved:
  Tests del schema, fecha y mapper.
- Execution notes:
  Incluir casos normales y límites. No depender del backend.
- Verification method:
  Casos 1-14 y 24-32 en verde.
- Dependencies:
  Tasks 8, 9 and 10.

## Task 22: Completar pruebas de servicio y mutación

- Objective:
  Verificar acceso API desacoplado y estados de TanStack Query.
- Files or areas likely involved:
  Tests del servicio y hook.
- Execution notes:
  Simular HttpClient/AuthTransport sin exponer token.
- Verification method:
  Método, endpoint, FormData, ApiError, pending, success, error y reset en verde.
- Dependencies:
  Tasks 11 and 12.

## Task 23: Completar pruebas de componentes y página

- Objective:
  Verificar problemas, modalidad, resumen, ZIP, feedback y accesibilidad.
- Files or areas likely involved:
  Tests de componentes específicos y CreateContestPage.
- Execution notes:
  Priorizar comportamiento sobre snapshots.
- Verification method:
  Casos 15-23 y 33-43 en verde.
- Dependencies:
  Tasks 13 through 18.

## Task 24: Completar pruebas de routing y MSW

- Objective:
  Verificar integración de ruta, preservación de rutas y escenarios simulados.
- Files or areas likely involved:
  Tests de router y handlers.
- Execution notes:
  Confirmar que `/dev/ui` continúa operativo.
- Verification method:
  Casos 44-46 y escenarios MSW en verde.
- Dependencies:
  Tasks 19 and 20.

## Task 25: Ejecutar validaciones técnicas

- Objective:
  Verificar generación de tipos, formato, lint, tipos, pruebas, build y ejecución local.
- Files or areas likely involved:
  Todo `frontend/`.
- Execution notes:
  Ejecutar los scripts previstos desde `frontend/`. No modificar reglas para ocultar fallos.
- Verification method:
  Resultados exitosos de `api:types`, `format:check`, `lint`, `typecheck`, `test:run`, `build` y `dev`, salvo bloqueo OpenAPI documentado.
- Dependencies:
  Tasks 21, 22, 23 and 24.

## Task 26: Verificar la página con MSW

- Objective:
  Validar el flujo completo sin JWT real ni backend.
- Files or areas likely involved:
  `/admin/contests/new`, MSW y UI.
- Execution notes:
  Probar éxito, 400, 401, problemas dinámicos, ZIP y responsive.
- Verification method:
  Checklist manual con resultados observables.
- Dependencies:
  Tasks 20 and 25.

## Task 27: Verificar integración contractual con backend

- Objective:
  Confirmar la solicitud multipart y el Bearer contra el endpoint real.
- Files or areas likely involved:
  Servicio frontend, proxy, AuthTransport y backend como dependencia externa.
- Execution notes:
  Ejecutar solo cuando OpenAPI, backend y sesión válida estén disponibles. Utilizar datos de desarrollo controlados.
- Verification method:
  Respuesta del backend, código retornado y ausencia de errores de model binding.
- Dependencies:
  Tasks 4, 11 and 25.

## Task 28: Auditar áreas protegidas y alcance

- Objective:
  Confirmar que el diff contiene únicamente UJ-08 y UJ-09 frontend.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Buscar modificaciones en layout, sidebar, topbar, auth, listado, backend, base de datos y documentación protegida.
- Verification method:
  Checklist de exclusiones y comparación con el baseline.
- Dependencies:
  Tasks 25, 26 and 27.

## Task 29: Mantener pendientes las evidencias manuales

- Objective:
  Reflejar de forma veraz el estado de las capturas sugeridas.
- Files or areas likely involved:
  `docs/capturas/` y estados de tareas OpenSpec.
- Execution notes:
  No crear imágenes, placeholders o archivos vacíos.
- Verification method:
  Marcar cada evidencia solo si el archivo existe físicamente.
- Dependencies:
  Tasks 26 and 28.

## Task 30: Actualizar tareas y cerrar sin commit

- Objective:
  Sincronizar tasks.md con lo realmente ejecutado y preparar el handoff.
- Files or areas likely involved:
  Artefactos OpenSpec y working tree.
- Execution notes:
  Mantener pendientes bloqueos de OpenAPI, backend, auth o capturas. No hacer commit ni push.
- Verification method:
  `git status` final, estados respaldados por evidencia y reporte de bloqueos.
- Dependencies:
  Tasks 28 and 29.

## Review Workload Forecast

- Estimated LoC changed:
  900-1,600 LoC, incluyendo página, componentes específicos, schema, mapper, servicio, hook, MSW y pruebas. La regeneración de tipos OpenAPI puede aumentar el conteo bruto.
- Risk of exceeding 400 LoC review threshold:
  High.
- Recommendation:
  Chained PRs manteniendo un único change OpenSpec.
- Suggested split if chained:
  - PR 1: contrato, tipos, endpoint, schema, mapper, servicio y mutación.
  - PR 2: problemas dinámicos, ZIP, resumen y página.
  - PR 3: routing, MSW, estados, responsive y accesibilidad.
  - PR 4: pruebas, validación contractual y cierre.
  - Ningún PR debe introducir listado, autenticación, sidebar, topbar o borradores.

## Execution status

- Tasks 1-25 are implemented and frontend validation passed, except for explicitly external or manual portions.
- The contract was revalidated against OpenAPI and the user-approved complementary change specification for response, error, and indexed keys.
- Task 26 is covered by automated MSW tests; visual/manual evidence and refinement against the reference remain pending.
- Task 27 remains pending authenticated end-to-end integration with the auth/session/token provider.
- Task 28 scope audit is complete. Task 29 records the pending, non-blocking manual evidence.
- Task 30 records that no commit or push was performed.
