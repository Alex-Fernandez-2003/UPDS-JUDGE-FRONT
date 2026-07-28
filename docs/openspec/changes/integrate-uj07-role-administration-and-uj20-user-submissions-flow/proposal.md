# Proposal

Fuente de alcance proporcionada por el usuario: :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}

## Problem Statement

El change `integrate-uj07-role-administration-and-uj20-user-submissions-flow` debe revisar, corregir e integrar al flujo principal de UPDS JUDGE dos implementaciones existentes, completas o parciales:

- UJ-07: administración de asignación y revocación de roles.
- UJ-20: historial global de envíos del usuario con filtros por concurso y resultado.

La estrategia obligatoria es de mínima intervención:

1. Reutilizar las implementaciones existentes.
2. Conectar rutas y navegación.
3. Integrar permisos, contratos y caché.
4. Resolver únicamente conflictos demostrables.
5. Agregar solo los elementos indispensables.

El frontend y el backend de referencia se encuentran en rutas locales que no están disponibles en esta sesión:

- `C:\dev\UPDS-JUDGE-FRONT`
- `C:\dev\UPDSjudge`

Tampoco se proporcionaron los contenidos de los dos documentos obligatorios:

- `docs/historias/UJ-07proceso-implementacion-admin-roles.md`
- `docs/historias/UJ-20-Como-usuario,-quiero-ver-todos-mis-envíos-con-filtros-por-concurso-y-resultado-obtenido.md`

Por tanto, no están confirmados todavía:

- los archivos enumerados en `## Archivos involucrados` de UJ-07;
- los archivos enumerados en `# Archivos principales` de UJ-20;
- sus rutas y casing actuales;
- las rutas frontend;
- los nombres internos de roles;
- los endpoints;
- los DTOs;
- las query keys;
- la paginación;
- el estado actual de integración;
- los resultados del baseline.

Esos elementos deben obtenerse durante la fase `explore` antes de modificar código. Este briefing define el procedimiento, los límites, las decisiones esperadas y los criterios verificables, pero no declara que la implementación esté lista para `apply`.

### Problema de integración de UJ-07

La implementación de administración de roles debe quedar conectada al flujo administrativo principal:

- navegación administrativa;
- ruta protegida;
- `AdminLayout`;
- listado real de usuarios;
- visualización de roles actuales;
- asignación y revocación persistidas en backend;
- actualización de caché;
- estados loading, empty, error, pending y success.

La visibilidad del enlace no debe ser la única protección. La ruta directa también debe validar el permiso efectivo real.

Las etiquetas visibles `Admin Concursos` y `Admin Roles` no deben utilizarse como identificadores contractuales sin confirmar previamente los valores usados por backend, JWT, DTOs y guards.

### Problema de integración de UJ-20

La implementación de historial global debe quedar conectada a la navegación principal del usuario y renderizarse bajo `UserLayout`.

Debe representar todos los envíos contractuales del usuario autenticado y distinguirse de:

- envíos recientes del dashboard;
- envíos de un concurso específico;
- historial global de todos los envíos.

La consulta debe integrar realmente:

- filtro por concurso;
- filtro por resultado;
- combinación de filtros;
- limpieza;
- reinicio de página;
- paginación server-side cuando el contrato sea paginado;
- loading;
- empty;
- error;
- refresh;
- metadata.

No debe reutilizarse un endpoint limitado a una cantidad pequeña ni una tabla con un contrato distinto solo por similitud visual.

## Goals

- Crear exactamente los cuatro artefactos OpenSpec del mismo change.
- Mantenerlos en `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/`.
- Leer completamente los documentos de UJ-07 y UJ-20 antes del código.
- Extraer los archivos desde las secciones documentales exactas.
- Comprobar existencia, ruta, casing, uso y estado actual de cada archivo.
- Construir la matriz obligatoria de trazabilidad.
- Registrar baseline de Git y validaciones sin modificar dependencias.
- Distinguir errores preexistentes de regresiones introducidas por el change.
- Integrar UJ-07 en la navegación y routing administrativos.
- Mantener la pantalla UJ-07 bajo `AdminLayout`.
- Aplicar guards y permisos efectivos.
- Confirmar nombres internos de roles contra frontend y backend.
- Persistir asignaciones y revocaciones mediante endpoints reales.
- Actualizar la caché tras mutations sin recargar el navegador.
- Evitar doble submit.
- Mantener estilos, componentes y tests válidos de la implementación original.
- Integrar UJ-20 en la navegación principal del usuario.
- Mantener la pantalla UJ-20 bajo `UserLayout`.
- Confirmar el endpoint global de envíos.
- Confirmar filtros contractuales y paginación.
- Sincronizar filtros y query keys.
- Reiniciar página al cambiar filtros.
- Mantener separadas las tres tablas de envíos.
- Reutilizar el mapper de veredictos existente cuando sea compatible.
- Preservar autenticación, layouts, sidebar, flujo de concursos, Problems, Mis envíos del concurso y `ContestContextHeader`.
- Preservar generación OpenAPI y remediaciones de dependencias ya realizadas.
- Actualizar la documentación distinguiendo implementación original e integración.
- Registrar pruebas y evidencias sin atribuir todo el trabajo al change de integración.

## Non-Goals

- No implementar Ranking.
- No modificar juez o veredictos.
- No crear nuevos filtros para UJ-20.
- No crear nuevas funciones administrativas ajenas a roles.
- No rediseñar las pantallas.
- No reemplazar componentes únicamente por preferencia.
- No cambiar el modelo global de roles.
- No cambiar autenticación, JWT o sesión.
- No modificar inscripción o contraseñas de concursos.
- No remediar dependencias npm.
- No migrar React Router.
- No refactorizar masivamente tablas.
- No reemplazar componentes compartidos.
- No combinar funcionalmente UJ-07 y UJ-20.
- No exponer UJ-20 en `Acceso de Usuario` administrativo sin evidencia documental o arquitectónica.
- No implementar paginación local con `slice` cuando exista paginación backend.
- No inventar endpoints, DTOs, roles, permisos, filtros o page size.
- No implementar reglas de self-revocation o último administrador sin contrato.
- No modificar backend salvo que la documentación confirme trabajo backend existente que el frontend deba consumir.
- No ejecutar `npm install`, `npm update` o `npm audit fix` durante el briefing.
- No implementar código.
- No realizar commit, push o archive.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/proposal.md`
- `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/spec.md`
- `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/design.md`
- `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/tasks.md`

### Documentación obligatoria

- `docs/historias/UJ-07proceso-implementacion-admin-roles.md`
- `docs/historias/UJ-20-Como-usuario,-quiero-ver-todos-mis-envíos-con-filtros-por-concurso-y-resultado-obtenido.md`

### UJ-07

Áreas probables, sujetas a inventario real:

- feature de usuarios o roles;
- página administrativa;
- tabla de usuarios;
- modal o formulario de roles;
- servicios;
- hooks;
- mutations;
- query keys;
- DTOs;
- endpoints centralizados;
- navegación administrativa;
- `AdminLayout`;
- guards;
- permisos;
- mocks;
- tests.

### UJ-20

Áreas probables, sujetas a inventario real:

- feature de submissions;
- página global de envíos;
- tabla;
- filtros;
- selects;
- servicios;
- hooks;
- query keys;
- tipos;
- paginación;
- navegación de usuario;
- `UserLayout`;
- mocks;
- tests.

### Regresión transversal

- autenticación;
- layouts;
- sidebar administrativo;
- `Acceso de Usuario`;
- concursos;
- Problems;
- envíos de concurso;
- `ContestContextHeader`;
- route builders;
- componentes base;
- OpenAPI generado;
- tests existentes.

## Assumptions

- Las implementaciones de UJ-07 y UJ-20 existen total o parcialmente en el workspace local.
- Los documentos obligatorios contienen listas concretas de archivos.
- Existe una arquitectura de HttpClient y AuthTransport que debe reutilizarse.
- Existe una infraestructura de TanStack Query o equivalente para queries y mutations.
- Existe un sistema de routing y guards que debe conservarse.
- Existe un `AdminLayout` y un `UserLayout`.
- Existe una navegación administrativa configurable.
- Existe una navegación principal del usuario.
- El backend local contiene los contratos que deben consumirse.
- Las remediaciones de dependencias y generación OpenAPI previas ya forman parte del baseline.
- La disponibilidad de UJ-20 dentro de `Acceso de Usuario` administrativo no está confirmada.
- Las reglas de autoedición, último administrador, roles inmutables e idempotencia no están confirmadas.
- Los valores contractuales del filtro de resultado no están confirmados.
- El identificador contractual del concurso en UJ-20 no está confirmado.
- El page size no está confirmado.

## Dependencies

- Lectura completa de los dos documentos de historias.
- Acceso al workspace frontend local.
- Acceso de solo lectura al backend local.
- Confirmación de roles, permisos y endpoints.
- Confirmación de la infraestructura de rutas.
- Confirmación del estado actual de tests y mocks.
- Coordinación con los integrantes cuando existan archivos divergentes o trabajo paralelo.

## Risks

### Risk 1: Sobrescribir trabajo de los integrantes

- Probability: Medium.
- Impact: High.
- Mitigation: Registrar baseline, autoría documental y diff antes de modificar.
- Verification: Cada cambio debe vincularse a un problema concreto de integración.

### Risk 2: Rehacer componentes sin necesidad

- Probability: Medium.
- Impact: High.
- Mitigation: Reutilizar primero y exigir justificación para sustituciones.
- Verification: Matriz de trazabilidad con acción y justificación por archivo.

### Risk 3: Romper estilos existentes

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mantener JSX, clases, variables e iconos salvo incompatibilidad demostrada.
- Verification: Comparación visual y pruebas de regresión responsive.

### Risk 4: Crear rutas no conectadas

- Probability: Medium.
- Impact: High.
- Mitigation: Actualizar router y navegación en la misma unidad revisable.
- Verification: Navegación desde UI y acceso directo por URL.

### Risk 5: Mostrar sidebar sin guard real

- Probability: Medium.
- Impact: Critical.
- Mitigation: Componer visibilidad y protección de ruta.
- Verification: Usuario no autorizado no ve enlace ni abre URL directa.

### Risk 6: Tener guard correcto sin enlace

- Probability: Medium.
- Impact: Medium.
- Mitigation: Incluir navegación como criterio de integración.
- Verification: Administrador autorizado accede desde el flujo principal.

### Risk 7: Usar identificadores de roles incorrectos

- Probability: High.
- Impact: Critical.
- Mitigation: Separar labels de valores contractuales y confirmar backend/JWT.
- Verification: Tests con roles reales y requests inspeccionados.

### Risk 8: Mutation solo local

- Probability: Medium.
- Impact: High.
- Mitigation: Servicio real mediante HttpClient y refetch posterior.
- Verification: Refresh del navegador conserva el cambio.

### Risk 9: Caché desactualizada

- Probability: High.
- Impact: High.
- Mitigation: Invalidar o actualizar las query keys exactas.
- Verification: Lista y detalle reflejan el nuevo rol sin reload.

### Risk 10: Revocación crítica incompatible

- Probability: Medium.
- Impact: Critical.
- Mitigation: No implementar reglas de self-management o último admin sin contrato.
- Verification: Casos contractuales y respuestas backend reales.

### Risk 11: UJ-20 usa endpoint incorrecto

- Probability: Medium.
- Impact: High.
- Mitigation: Confirmar endpoint global y no reutilizar endpoints resumidos.
- Verification: Network y tests de servicio.

### Risk 12: Filtros solo locales

- Probability: Medium.
- Impact: High.
- Mitigation: Serializar filtros en el request y query key.
- Verification: MSW o backend reciben ambos parámetros.

### Risk 13: Paginación incompatible con filtros

- Probability: Medium.
- Impact: High.
- Mitigation: Reiniciar a página inicial y conservar filtros en cada key.
- Verification: Tests de combinación, cambio de página y última página.

### Risk 14: Mezclar tablas de envíos

- Probability: High.
- Impact: High.
- Mitigation: Documentar alcance, ruta, endpoint, filtros y paginación de cada tabla.
- Verification: Cada página usa su propio contrato.

### Risk 15: Duplicar mapper de veredictos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Reutilizar el mapper vigente cuando los contratos coincidan.
- Verification: Una única fuente para valores compartidos o divergencias documentadas.

### Risk 16: Romper layouts

- Probability: Medium.
- Impact: High.
- Mitigation: Mantener UJ-07 bajo AdminLayout y UJ-20 bajo UserLayout.
- Verification: Tests de composición y validación visual.

### Risk 17: Imports circulares

- Probability: Medium.
- Impact: High.
- Mitigation: APIs públicas acotadas y ownership por feature.
- Verification: Typecheck, build y análisis de imports.

### Risk 18: Tests desactualizados

- Probability: High.
- Impact: Medium.
- Mitigation: Comparar documentación, implementación y comportamiento actual.
- Verification: Actualizar únicamente expectativas obsoletas justificadas.

## Rollback Strategy

- Retirar la entrada de navegación UJ-07 y su ruta integrada sin eliminar la implementación original.
- Restaurar imports previos de UJ-07 cuando una conexión introduzca regresiones.
- Revertir mutations o invalidaciones de forma conjunta con sus tests.
- Retirar la ruta y navegación UJ-20 conservando la página original aislada.
- Restaurar filtros o paginación anteriores sin reemplazar la implementación completa.
- No borrar archivos originales durante rollback hasta confirmar que eran duplicados.
- Restaurar documentación únicamente en las secciones añadidas por integración.
- No revertir cambios preexistentes del baseline.
- Validar rollback con:
  - login;
  - AdminLayout;
  - UserLayout;
  - rutas administrativas;
  - Acceso de Usuario;
  - concursos;
  - Problems;
  - envíos del concurso;
  - historial existente;
  - lint;
  - typecheck;
  - tests;
  - build.

## Success Criteria

### UJ-07

- Existe una ruta administrativa real.
- Existe una entrada de navegación para usuarios autorizados.
- `AdminLayout` permanece.
- El listado usa datos backend.
- Se muestran roles actuales.
- Se asigna y revoca cada rol contractual respaldado.
- Las mutations persisten tras refresh.
- La caché se actualiza.
- No hay doble submit.
- Loading, empty, error y success funcionan.
- Usuarios no autorizados no acceden.
- Los estilos originales se preservan.

### UJ-20

- Existe una ruta directa dentro de `UserLayout`.
- La navegación principal expone Mis envíos.
- Se muestran todos los envíos contractuales.
- El filtro por concurso funciona.
- El filtro por resultado funciona.
- La combinación funciona.
- Limpiar filtros funciona.
- Cambiar filtros reinicia página.
- La paginación contractual funciona.
- Refresh conserva filtros y consulta correcta.
- Solo aparecen envíos del usuario autenticado.
- Loading, empty y error funcionan.
- Responsive funciona.
- Los estilos originales se preservan.

### General

- La matriz de trazabilidad contiene todos los archivos documentados.
- Cada modificación está justificada.
- No se eliminaron componentes válidos.
- No existen rutas duplicadas.
- No existen layouts anidados incorrectamente.
- Las tablas de envíos mantienen responsabilidades separadas.
- No se introdujeron filtros o funciones ajenos.
- Lint, typecheck, tests y build pasan.
- Dev inicia.
- La documentación distingue implementación original e integración.
- Las evidencias quedan registradas o pendientes.
