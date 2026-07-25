# Proposal

## Problem Statement

El change `integrate-user-contest-flow-uj12-routing-layout-table-style` debe integrar contribuciones existentes de UJ-11, UJ-13, UJ-14 y UJ-15, implementar UJ-12 y conectar el recorrido completo del usuario sin reconstruir las funcionalidades aportadas por otros integrantes.

La inspección documental y del branch público `develop` identifica el siguiente estado inicial:

- UJ-11 documenta `UserDashboardPage` y `UserContestsPage` bajo `features/contests/user/`.
- La ruta principal documentada para el rol `Usuario` es `/student/concursos`.
- La lista ya muestra concursos, filtros, paginación y acciones visuales, pero los callbacks de inscripción y acceso al detalle permanecen desconectados.
- El router contiene una ruta de envíos basada en `contestCode`, pero todavía no compone el flujo completo de detalle.
- La documentación de UJ-13 describe `ContestProblemsPage`, `ProblemsTable` y un servicio de dashboard del concurso.
- La estructura pública inspeccionada no contiene esos archivos bajo `features/problems`, por lo que existe una discrepancia bloqueante entre documentación y código integrado.
- UJ-14 y UJ-15 documentan y exponen componentes bajo `features/submissions`, incluidos formulario, editor, dropzone, tabla, filtros, estadísticas y badges.
- La implementación de envíos se encuentra separada de la lista de concursos y del detalle documentado por UJ-13.
- UJ-12 todavía no tiene una integración frontend confirmada.
- El backend expone `POST /api/ParticipanteConcursos/unirse` para inscripción previa al inicio.
- Ese endpoint no sirve para validar acceso de consulta a un concurso privado finalizado sin inscripción, porque rechaza solicitudes realizadas desde la fecha de inicio.
- `UserLayout` aplica una restricción de ancho global que impide que cada página controle su propia composición.
- La tabla histórica del dashboard y la tabla de envíos del concurso tienen responsabilidades distintas, pero deben alinearse visualmente.
- La referencia visual entregada orienta el ancho, jerarquía, composición del dashboard y estilo de tabla; no autoriza agregar ranking global, puntos, próximos entrenamientos ni funcionalidades no incluidas en los contratos existentes.

El flujo objetivo es:

- Login con rol `Usuario`.
- Dashboard y lista de concursos.
- Acción derivada de estado, modalidad e inscripción.
- Confirmación pública o contraseña privada cuando corresponda.
- Inscripción mediante backend.
- Navegación a un detalle recargable.
- Problemas e incisos.
- Acceso seguro al PDF.
- Selección de lenguaje y solución.
- Evaluación y veredicto.
- Tabla de envíos del concurso.
- Consulta de concursos finalizados en modo de solo lectura.

El caso de concurso privado finalizado sin inscripción permanece pendiente por falta de una operación backend segura para validar acceso de consulta.

### Matriz de acceso objetivo

| Estado temporal | Inscrito | Modalidad  | Resultado frontend                                                             |
| --------------- | -------: | ---------- | ------------------------------------------------------------------------------ |
| Próximo         |       No | Público    | Mostrar inscripción pública                                                    |
| Próximo         |       No | Privado    | Mostrar inscripción con contraseña                                             |
| Próximo         |       Sí | Cualquiera | Mostrar estado inscrito; acceso anticipado solo si el contrato real lo permite |
| En curso        |       Sí | Cualquiera | Permitir detalle en modo participación                                         |
| En curso        |       No | Público    | Bloquear acceso e indicar inscripciones cerradas                               |
| En curso        |       No | Privado    | Bloquear acceso e indicar inscripciones cerradas                               |
| Finalizado      |       Sí | Cualquiera | Permitir detalle en modo consulta                                              |
| Finalizado      |       No | Público    | Permitir detalle en modo consulta                                              |
| Finalizado      |       No | Privado    | Bloquear y registrar dependencia backend                                       |

## Goals

- Crear un único change `integrate-user-contest-flow-uj12-routing-layout-table-style`.
- Mantener sus artefactos en `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/`.
- Leer y contrastar completamente la documentación existente de UJ-11, UJ-13 y UJ-14/UJ-15.
- Inventariar archivos, rutas, servicios, contratos, hooks y componentes reales antes de modificar.
- Reutilizar `UserDashboardPage`, `UserContestsPage`, `ContestCard` y componentes reales equivalentes.
- Mantener `/student/concursos` como ruta principal si el workspace confirma que continúa siendo la ruta canónica.
- Conectar las acciones visuales de UJ-11 a una política central de acceso.
- Implementar UJ-12 para concursos públicos y privados próximos.
- Centralizar `ParticipanteConcursos/unirse`.
- Crear o adaptar tipos de request y response sin `any`.
- Crear o adaptar un servicio basado en HttpClient.
- Crear una mutación de TanStack Query con invalidación exacta.
- Crear un único modal de inscripción con modo público y privado.
- No persistir ni registrar la contraseña.
- Conservar filtros, búsqueda, modalidad y página después de la inscripción.
- Actualizar `yaInscrito` sin recargar la página.
- Determinar y conectar una ruta canónica de detalle basada en el parámetro real usado por las features.
- Priorizar `codigo` cuando los servicios existentes dependan de él.
- Hacer que la ruta de detalle sea recargable sin depender de `location.state`.
- Componer UJ-13, UJ-14 y UJ-15 en una página de detalle existente.
- Evitar duplicar problemas, PDF, formulario, editor, uploader, evaluación o tablas.
- Centralizar los modos `participation`, `read-only` y `blocked`.
- Deshabilitar u ocultar el envío de soluciones en modo de consulta.
- Mantener el mecanismo existente de actualización de veredictos.
- Evitar polling o conexiones duplicadas.
- Mantener separadas la tabla histórica del dashboard y la tabla del concurso.
- Aplicar únicamente un ajuste visual a `UserLayout`.
- Permitir que cada página decida su `max-width`, padding y distribución.
- Alinear visualmente ambas tablas usando primitivas compartidas.
- No modificar contratos, endpoints, columnas o comportamiento de la tabla histórica.
- Crear o ampliar la documentación de UJ-12.
- Actualizar UJ-11, UJ-13 y UJ-14/UJ-15 con las rutas y composición finales.
- Registrar el bloqueo backend de concursos privados finalizados.
- Exigir pruebas de política, routing, inscripción, composición, layout y regresión.
- Validar manualmente el flujo con backend real.

## Non-Goals

- No reconstruir UJ-11, UJ-13, UJ-14 o UJ-15.
- No dividir el trabajo en varios changes OpenSpec.
- No modificar backend.
- No modificar base de datos.
- No implementar un endpoint para validar concursos privados finalizados.
- No validar contraseñas en el navegador.
- No comparar una contraseña con datos expuestos al frontend.
- No permitir inscripción después del inicio.
- No implementar cancelación de inscripción.
- No administrar participantes.
- No implementar recuperación de contraseña.
- No cambiar JWT, roles, AuthTransport o almacenamiento de sesión.
- No modificar la prioridad de roles.
- No reemplazar guards existentes.
- No implementar nuevos lenguajes.
- No cambiar la evaluación del juez.
- No sustituir el mecanismo de tiempo real.
- No crear polling paralelo.
- No implementar ranking global.
- No implementar clasificación global.
- No crear una nueva tabla histórica general.
- No rediseñar funcionalmente UserLayout.
- No rediseñar el header.
- No cambiar textos o navegación del layout salvo rutas necesarias para integración.
- No reemplazar una tabla por la otra.
- No mezclar endpoints de historial general y envíos de concurso.
- No instalar una librería de modal.
- No instalar una nueva librería UI.
- No implementar tema oscuro.
- No utilizar OpenSpec CLI.
- No hacer commit, push o archive.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/proposal.md`
- `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/spec.md`
- `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/design.md`
- `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/tasks.md`

### UJ-11 y concursos del usuario

Áreas documentadas o probables:

- `features/contests/user/pages/UserDashboardPage.tsx`
- `features/contests/user/pages/UserContestsPage.tsx`
- `features/contests/user/components/ContestCard.tsx`
- `features/contests/user/components/UserContestsGrid.tsx`
- `features/contests/user/hooks.ts`
- `features/contests/user/service.ts`
- `features/contests/user/types.ts`
- `features/contests/user/index.ts`

Los nombres finales deben validarse en el workspace.

### UJ-12

Áreas probables:

- política de acciones del usuario;
- tipos de inscripción;
- endpoint centralizado;
- servicio de concursos del usuario;
- hook de mutación;
- modal de inscripción;
- integración con card o fila;
- handlers MSW;
- pruebas.

### UJ-13

Áreas documentadas que requieren reconciliación con el workspace:

- página de problemas del concurso;
- tabla de incisos;
- servicio del dashboard del concurso;
- tipos del detalle;
- acceso al PDF.

### UJ-14 y UJ-15

Áreas documentadas:

- página de envíos;
- formulario de solución;
- editor;
- dropzone;
- selector de problema y lenguaje;
- tabla de envíos;
- filtro;
- estadísticas;
- badge de veredicto;
- servicios y tipos.

### Routing y autorización

- `routes/router.tsx`
- constantes de rutas;
- `ProtectedRoute`;
- `RoleRoute`;
- redirección posterior al login;
- manejo de forbidden y not found.

### Layout y tablas

- `layouts/UserLayout/` o ubicación real.
- `features/contests/user/RecentSubmissionsTable.tsx`.
- `features/submissions/components/submissionsTable.tsx`.
- primitivas compartidas de tabla.

### Documentación

- `docs/historias/UJ-11-lista-concursos-filtrados.md`
- documento nuevo o existente de UJ-12;
- `docs/historias/UJ-13-Lista de incisos y acceso al PDF del set de problemas.md`
- `docs/historias/UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md`

## Assumptions

- El workspace de Pi contiene contribuciones que pueden estar por delante del branch público inspeccionado.
- La ruta `/student/concursos` sigue siendo la ruta principal del rol `Usuario`.
- Las cards de UJ-11 exponen el código, modalidad, estado temporal y `yaInscrito`.
- El servicio de listado puede invalidarse sin borrar filtros locales.
- Existe un Modal o Dialog reutilizable, o una primitiva compartida equivalente.
- Existe `PasswordInput`.
- El endpoint `ParticipanteConcursos/unirse` mantiene el contrato descrito.
- El backend continúa cerrando inscripción cuando la fecha actual alcanza `fechaInicio`.
- El detalle puede cargarse mediante código del concurso.
- La implementación real de UJ-13 todavía debe localizarse o integrarse desde la contribución correspondiente.
- La implementación de UJ-14/UJ-15 debe inspeccionarse para confirmar su mecanismo real de actualización.
- No se confirma que UJ-15 use SignalR, WebSocket o polling; la documentación inspeccionada describe actualización después de la respuesta HTTP.
- No se confirma el endpoint real de detalle utilizado por UJ-13.
- No se confirma si el acceso previo al detalle de un inscrito próximo está soportado.
- No se confirma qué datos de un concurso finalizado público expone actualmente el backend.
- No se confirma si existe un documento previo de UJ-12.

## Risks

### Risk 1: Documentación y código de UJ-13 no coinciden

- Probability: High.
- Impact: High, porque no puede componerse una implementación que no está presente en el workspace integrado.
- Mitigation: Localizar la contribución real, comparar archivos y contratos, y resolver el merge antes de implementar routing.

### Risk 2: Dos rutas de detalle compiten

- Probability: High.
- Impact: High.
- Mitigation: Definir una ruta canónica y mantener redirects temporales únicamente cuando sean necesarios.

### Risk 3: Dependencia accidental de `location.state`

- Probability: Medium.
- Impact: High para recarga directa.
- Mitigation: Obtener el código desde params y cargar el detalle mediante una query propia.

### Risk 4: Política de acceso dispersa

- Probability: High.
- Impact: High.
- Mitigation: Centralizar acciones y modos en funciones puras cubiertas por una matriz de tests.

### Risk 5: Seguridad basada solo en frontend

- Probability: Medium.
- Impact: High.
- Mitigation: Tratar la política frontend como UX y mantener backend como autoridad.

### Risk 6: Inscripción después del inicio

- Probability: Medium.
- Impact: Medium.
- Mitigation: No mostrar el modal para concursos iniciados y manejar igualmente el error backend.

### Risk 7: Contraseña persistida o expuesta

- Probability: Low a Medium.
- Impact: High.
- Mitigation: Mantenerla solo en estado efímero del modal, limpiar al cerrar y excluirla de query keys, logs y storage.

### Risk 8: Invalidación excesiva

- Probability: Medium.
- Impact: Medium.
- Mitigation: Invalidar solo las queries de lista o detalle afectadas.

### Risk 9: Concurso privado finalizado sin validación segura

- Probability: Confirmed.
- Impact: High para ese caso.
- Mitigation: Bloquear de forma controlada y registrar dependencia backend no bloqueante.

### Risk 10: Formulario habilitado en modo finalizado

- Probability: Medium.
- Impact: High.
- Mitigation: Derivar un modo único del detalle y aplicarlo al contenedor del formulario.

### Risk 11: Conexiones de evaluación duplicadas

- Probability: Medium.
- Impact: High.
- Mitigation: Reutilizar el mecanismo existente y verificar lifecycle y cleanup.

### Risk 12: UserLayout rompe páginas existentes

- Probability: Medium.
- Impact: Medium.
- Mitigation: Limitar el cambio a clases de ancho y overflow; validar todos los consumers.

### Risk 13: Copia de estilos de tablas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Reutilizar primitivas y extraer solo constantes visuales pequeñas cuando exista compatibilidad.

### Risk 14: Dependencias circulares entre contests, problems y submissions

- Probability: Medium.
- Impact: High.
- Mitigation: Componer en una página de nivel superior y usar APIs públicas acotadas.

### Risk 15: Regresión administrativa

- Probability: Medium.
- Impact: High.
- Mitigation: No modificar contratos administrativos y ejecutar regresión específica.

## Rollback Strategy

- Restaurar las rutas anteriores y mantener temporalmente los callbacks de UJ-11 sin navegación antes que dejar rutas rotas.
- Retirar la composición integrada del detalle conservando las páginas individuales existentes.
- Retirar UJ-12 y volver a mostrar acciones no funcionales solo como último recurso temporal, sin afectar sesión.
- Restaurar las clases anteriores de UserLayout si el ancho completo causa regresiones.
- Restaurar los estilos previos de RecentSubmissionsTable sin alterar su lógica.
- Restaurar imports y exports de cada feature.
- Mantener los documentos históricos y revertir solo las secciones añadidas.
- No revertir contribuciones ajenas detectadas en el baseline.
- Verificar después del rollback:
  - login;
  - dashboard;
  - lista;
  - logout;
  - rutas administrativas;
  - creación de concursos;
  - envíos existentes;
  - tests;
  - typecheck;
  - build.

## Success Criteria

- El login con rol Usuario resuelve el área principal real.
- La lista de UJ-11 permanece visible y funcional.
- Las acciones de cada concurso se derivan de una política central.
- La inscripción pública envía `contrasena: null`.
- La inscripción privada exige contraseña.
- La contraseña no se persiste.
- La mutación evita doble submit.
- Los errores backend se muestran de forma accesible.
- Una inscripción exitosa actualiza `yaInscrito` sin reload.
- Los filtros y página se conservan.
- Existe una ruta canónica de detalle basada en el parámetro real.
- La recarga directa del detalle funciona.
- UJ-13, UJ-14 y UJ-15 se componen sin duplicar implementaciones.
- Participation permite envío.
- Read-only impide envío nuevo.
- Blocked muestra feedback controlado.
- El concurso privado finalizado no inscrito queda bloqueado y documentado.
- UserLayout deja que cada página gestione su ancho.
- Header, navegación, menú y logout no cambian funcionalmente.
- Las dos tablas conservan responsabilidades y contratos distintos.
- RecentSubmissionsTable conserva columnas, datos, refresh y estados.
- Ambas tablas comparten las convenciones visuales principales.
- Se crea o actualiza un único documento de UJ-12.
- UJ-11, UJ-13 y UJ-14/UJ-15 documentan las rutas y composición reales.
- Las evidencias inexistentes permanecen pendientes.
- Format, lint, typecheck, tests, build y diff check pasan.
- El flujo se valida manualmente con backend real.
- No se modifica backend ni base de datos.
- No se realiza commit ni push.
