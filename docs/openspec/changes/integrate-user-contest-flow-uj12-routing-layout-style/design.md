# Design

## Components Touched

### Routing y sesión

- Router principal.
- Constantes de rutas.
- Redirect posterior al login.
- ProtectedRoute existente.
- RoleRoute existente.
- Página forbidden o not found, únicamente para integración.

### Contests user

- UserDashboardPage.
- UserContestsPage.
- ContestCard.
- UserContestsGrid.
- Hooks y servicios del usuario.
- Tipos del listado.
- Nueva política de acciones.
- Mutación de inscripción.
- Modal de inscripción.

### Contest detail

- Página de detalle existente o página de composición.
- Feature problems.
- Feature submissions.
- Query del dashboard o detalle del concurso.
- Política de modos.

### Layout y tablas

- UserLayout.
- RecentSubmissionsTable.
- SubmissionsTable del concurso.
- Primitivas compartidas.

### Mocks, tests y documentación

- Handler de inscripción.
- Tests de routing y features.
- Cuatro documentos de historias.
- Evidencias pendientes.

## Boundaries Respected

- Auth continúa gestionando sesión e identidad.
- Router compone guards, pero no duplica reglas de negocio.
- La política de acceso permanece en contests user.
- El backend continúa siendo autoridad de acceso.
- El modal conoce datos de inscripción, no detalles de HttpClient.
- El hook conoce mutation y caché.
- El servicio conoce endpoint y DTO.
- UJ-13 conserva ownership de problemas y PDF.
- UJ-14/UJ-15 conservan ownership de solución y evaluación.
- La página de detalle solo compone.
- La tabla del dashboard no importa lógica de submissions.
- La tabla de concurso no consume historial general.
- UserLayout no conoce reglas de concursos.
- Componentes compartidos no reciben políticas de rol.

## Contracts Changed

No se modifica ningún contrato externo.

### Join Contest Request

Contrato frontend equivalente:

- `codigo: string`.
- `contrasena?: string | null`.

### Join Contest Response

- `mensaje: string`.
- `codConcurso: string`.

### Contest User Action

Salida interna equivalente a:

- JOIN_PUBLIC.
- JOIN_PRIVATE.
- VIEW_ACTIVE.
- VIEW_FINISHED.
- ENROLLED_UPCOMING.
- REGISTRATION_CLOSED.
- PRIVATE_FINISHED_REQUIRES_BACKEND.
- UNKNOWN_BLOCKED cuando sea necesario.

### Contest Detail Mode

Salida interna:

- participation.
- read-only.
- blocked.

Debe incluir una razón legible o código de motivo cuando el modo no sea participation.

### Route Contract

La ruta canónica debe:

- pertenecer al área del usuario;
- usar el código o identificador real;
- soportar reload;
- no depender de route state.

La ruta exacta es una decisión bloqueada hasta reconciliar UJ-13 y UJ-14/UJ-15.

## Estado Actual Inspeccionado

### Matriz por historia

| HU    | Página o componente documentado                  | Ruta actual observada o documentada               | Endpoint documentado                            | Estado                                                   | Acción                               |
| ----- | ------------------------------------------------ | ------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------- | ------------------------------------ |
| UJ-11 | UserDashboardPage, UserContestsPage, ContestCard | `/student/concursos`                              | `GET /api/Concursos`                            | Integrada; acciones desconectadas                        | Reutilizar y conectar                |
| UJ-12 | No se confirmó implementación frontend           | Sin ruta propia                                   | `POST /api/ParticipanteConcursos/unirse`        | Pendiente                                                | Implementar modal, mutación y policy |
| UJ-13 | ContestProblemsPage, ProblemsTable               | Ruta de detalle no confirmada en router integrado | Dashboard del concurso documentado              | Documentada, código no localizado en árbol inspeccionado | Localizar contribución y componer    |
| UJ-14 | SubmissionsPage, SubmitForm, editor y dropzone   | `/student/contest/:contestCode/submissions`       | `POST /api/envios` documentado                  | Implementada de forma separada                           | Componer y aplicar modos             |
| UJ-15 | SubmissionsTable, VerdictBadge, filtros y stats  | Misma ruta de submissions                         | Contratos de historial/evaluación por verificar | Implementada de forma separada                           | Reutilizar y verificar mecanismo     |

### Matriz inicial de archivos

| Responsabilidad     | Archivo documentado o observado                 | Feature       | Consumidores    | Acción                             |
| ------------------- | ----------------------------------------------- | ------------- | --------------- | ---------------------------------- |
| Dashboard principal | `UserDashboardPage.tsx`                         | contests/user | Router          | Modificar para integración mínima  |
| Lista y filtros     | `UserContestsPage.tsx`                          | contests/user | Dashboard       | Reutilizar sin cambios funcionales |
| Acción de card      | `ContestCard.tsx`                               | contests/user | Grid            | Conectar mediante policy           |
| Incisos             | `ContestProblemsPage.tsx` / `ProblemsTable.tsx` | problems      | Detalle         | Localizar antes de integrar        |
| Solución            | `submitForm.tsx`                                | submissions   | SubmissionsPage | Reutilizar                         |
| Editor              | `submtCodeEditor.tsx` o nombre real             | submissions   | SubmitForm      | Reutilizar                         |
| Tabla del concurso  | `submissionsTable.tsx`                          | submissions   | SubmissionsPage | Reutilizar y alinear estilo        |
| Tabla histórica     | `RecentSubmissionsTable.tsx`                    | contests/user | Dashboard       | Fix visual aislado                 |
| Layout              | `UserLayout`                                    | layouts       | Rutas user      | Fix visual aislado                 |
| Router              | `router.tsx`                                    | routes        | Aplicación      | Conectar detalle y redirects       |

La matriz final debe reemplazar candidatos por rutas exactas del workspace.

## Data Flow

### Flujo integrado

- Login.
- Resolución de rol.
- `/student/concursos` o ruta canónica existente.
- UserDashboardPage.
- UserContestsPage.
- ContestCard.
- Política de acción.
- Modal o navegación.
- Mutación de inscripción cuando corresponda.
- Refetch exacto de lista.
- Detalle por código.
- Query del detalle.
- Modo del detalle.
- UJ-13.
- UJ-14.
- UJ-15.

### UJ-12 pública

- Card obtiene JOIN_PUBLIC.
- Usuario abre JoinContestModal.
- Modal presenta confirmación.
- Submit invoca hook.
- Hook invoca servicio.
- Servicio usa HttpClient.
- Backend responde.
- Hook actualiza lista.
- Card cambia a inscrito.

### UJ-12 privada

- Card obtiene JOIN_PRIVATE.
- Modal presenta PasswordInput.
- Contraseña permanece en estado local.
- Validación evita vacío.
- Hook recibe la contraseña solo al enviar.
- La mutation key no contiene contraseña.
- Backend responde.
- Estado local se limpia.

### Detalle

- Router obtiene `contestCode` o parámetro real.
- Query solicita datos frescos.
- Respuesta determina:
  - estado;
  - modalidad;
  - inscripción;
  - contenido disponible.
- Policy deriva modo.
- Página compone secciones.

### Participation

- UJ-13 visible.
- SubmitForm habilitado.
- Envío reutiliza contrato existente.
- Mecanismo UJ-15 actualiza veredicto.
- Tabla de concurso se refresca.

### Read-only

- UJ-13 visible cuando backend lo permite.
- SubmitForm oculto o bloqueado.
- Tabla existente visible cuando corresponda.
- No se crean nuevas evaluaciones.

### Blocked

- Página muestra motivo.
- No monta componentes que puedan enviar.
- Puede mostrar información pública mínima según contrato.
- Privado finalizado no inscrito muestra dependencia backend.

## Router

La implementación debe:

- conservar `/student/concursos` como home cuando siga vigente;
- definir una ruta canónica de detalle;
- evaluar si `/student/contest/:contestCode/submissions`:
  - se convierte en ruta hija;
  - redirige al detalle;
  - permanece como compatibilidad;
- envolver el detalle con UserLayout;
- componer ProtectedRoute y RoleRoute;
- mantener rutas administrativas sin cambios.

## Parámetros de Ruta

- Priorizar `codigo` cuando el listado y servicios usen el código.
- Normalizar solo en la capa de servicio cuando el contrato lo requiera.
- Mantener el valor original para presentación.
- No usar ID y código simultáneamente sin necesidad.
- No aceptar datos residuales de otro concurso.

## Recarga Directa

La página debe reconstruir todo su estado desde:

- route param;
- sesión existente;
- queries remotas.

No debe necesitar:

- callback previo;
- card seleccionada en memoria;
- `location.state`;
- datos guardados en storage.

## Matriz de Acceso

| Condición                      | Acción de lista                   | Modo de detalle                | Envío |
| ------------------------------ | --------------------------------- | ------------------------------ | ----- |
| Próximo público no inscrito    | JOIN_PUBLIC                       | Bloqueado o preview confirmado | No    |
| Próximo privado no inscrito    | JOIN_PRIVATE                      | Bloqueado o preview confirmado | No    |
| Próximo inscrito               | ENROLLED_UPCOMING                 | Según contrato real            | No    |
| Activo inscrito                | VIEW_ACTIVE                       | participation                  | Sí    |
| Activo no inscrito             | REGISTRATION_CLOSED               | blocked                        | No    |
| Finalizado inscrito            | VIEW_FINISHED                     | read-only                      | No    |
| Finalizado público no inscrito | VIEW_FINISHED                     | read-only                      | No    |
| Finalizado privado no inscrito | PRIVATE_FINISHED_REQUIRES_BACKEND | blocked                        | No    |

## Política Central de Acciones

La policy debe:

- recibir un modelo mínimo;
- normalizar estado y modalidad;
- no conocer componentes;
- no navegar;
- no ejecutar requests;
- devolver acción y razón;
- tener cobertura completa.

## Modos del Detalle

### participation

- concurso iniciado;
- inscripción válida;
- problemas y PDF;
- formulario;
- evaluación;
- envíos.

### read-only

- concurso finalizado permitido;
- contenido de consulta;
- formulario ausente o bloqueado;
- explicación visible.

### blocked

- acceso no permitido;
- motivo;
- sin uploader;
- sin mutaciones;
- opción de volver a la lista.

## UJ-12

### Endpoint

- `ParticipanteConcursos/unirse`.
- POST.
- Bearer mediante AuthTransport.

### Mutation

- input contiene código y contraseña efímera;
- mutation key sin contraseña;
- no optimistic success antes de respuesta;
- éxito actualiza estado;
- error preserva modal.

### Invalidación

Orden preferido:

1. Actualizar el concurso específico en la caché cuando el shape sea estable.
2. Invalidar la key exacta del listado actual.
3. Invalidar el detalle solo cuando exista una query activa relacionada.

No invalidar estadísticas, envíos históricos ni administración.

### Modal

Un componente con dos modos:

- public-confirmation;
- private-password.

Props mínimas conceptuales:

- concurso;
- mode;
- open;
- pending;
- error;
- onConfirm;
- onCancel.

### Contraseña

- Estado efímero.
- No storage.
- No URL.
- No logs.
- No cache.
- Limpieza en cancel y success.
- No trim automático hasta confirmar que espacios no son válidos.

### Errores

Los mensajes del backend deben normalizarse mediante ApiError sin reemplazarlos por success.

## UJ-13

La composición debe confirmar:

- implementación real disponible;
- endpoint real;
- tipos;
- query key;
- URL del PDF;
- orden de problemas;
- estados de carga, vacío y error.

No debe implementarse una segunda tabla de problemas.

## UJ-14

La composición debe reutilizar:

- selector de problema;
- selector de lenguaje;
- modo archivo/editor;
- validaciones;
- transformación de archivo a texto;
- DTO existente;
- servicio existente.

La página de detalle aporta el modo; SubmitForm adapta su disponibilidad.

## UJ-15

Debe inspeccionarse el comportamiento real:

- respuesta síncrona;
- refetch;
- polling;
- SignalR;
- WebSocket.

La documentación observada describe actualización del historial después de la respuesta HTTP, pero no demuestra una conexión de tiempo real persistente. El diseño final debe reflejar el código real y no afirmar SignalR sin evidencia.

## UserLayout Full Width

Cambio visual mínimo:

- remover o desplazar `container`;
- remover `max-w-*` global;
- mantener header;
- main flexible;
- `min-w-0` donde existan hijos flex;
- no imponer padding duplicado;
- permitir scroll local de tablas.

Las páginas existentes pueden mantener contenedores internos.

## Consistencia de Tablas

Prioridad:

1. Primitivas Table compartidas.
2. Clases o variantes ya existentes.
3. Constantes visuales pequeñas.
4. Componentes separados con estilo equivalente.

Elementos a alinear:

- shell;
- header;
- row;
- cell;
- badge;
- hover;
- loading;
- empty;
- error;
- scroll.

No compartir:

- DTO;
- service;
- query key;
- mapper de negocio;
- paginación;
- filtros.

## Required Tests Per Layer

### Policy

- ocho combinaciones obligatorias;
- estados desconocidos;
- casing;
- modalidad desconocida.

### Service and Mutation

- endpoint;
- payload público;
- payload privado;
- ApiError;
- sin token manual;
- sin contraseña en keys;
- invalidación exacta.

### Modal

- modos;
- validación;
- pending;
- success;
- error;
- cancel;
- Escape;
- focus;
- limpieza.

### Routing

- login Usuario;
- home;
- detalle;
- reload;
- parámetro inválido;
- forbidden;
- logout;
- rutas administrativas.

### Detail Composition

- header;
- UJ-13;
- UJ-14;
- UJ-15;
- participation;
- read-only;
- blocked;
- error parcial;
- cleanup.

### Layout

- estructura sin max-width global;
- navegación presente;
- contenido con ancho local;
- responsive manual.

### Tables

- semántica;
- visuales principales;
- estados;
- datos sin cambios;
- scroll.

### Documentation

- documentos únicos;
- estados reales;
- bloqueo backend;
- evidencias pendientes.

## Tradeoffs Accepted

- El caso privado finalizado permanece bloqueado.
- La política frontend mejora UX, pero no sustituye autorización backend.
- La ruta canónica no se fija hasta localizar UJ-13 real.
- La composición puede mantener rutas legacy mediante redirect.
- Read-only puede ocultar el formulario en vez de deshabilitarlo.
- Las tablas mantienen componentes separados.
- El fix de UserLayout permite que cada página asuma responsabilidad de ancho.
- No se promete SignalR hasta verificar el mecanismo real.
- La integración prioriza reutilización sobre uniformidad interna perfecta.

## Implementation Constraints

- No implementar antes de completar inventario.
- No crear duplicados.
- No hardcodear endpoint.
- No persistir contraseña.
- No llamar unirse para privado finalizado.
- No depender solo de route state.
- No modificar backend.
- No modificar contratos UJ-13/UJ-14/UJ-15.
- No crear polling paralelo.
- No cambiar lógica de tabla histórica.
- No rediseñar UserLayout.
- No crear ciclos entre features.
- No instalar dependencias.
- No usar OpenSpec CLI.
- No hacer commit ni push.

## Open Design Questions

### Blocking: Implementación real de UJ-13

- La documentación identifica componentes que no aparecen en el árbol público inspeccionado.
- Debe localizarse el código integrado o la rama de origen antes de aplicar.

### Blocking: Endpoint real del detalle

- Debe confirmarse la ruta backend usada para cargar datos, problemas, PDF e inscripción.

### Blocking: Ruta canónica

- Debe decidirse si se conserva la ruta de submissions como legacy o si ya existe otra ruta aportada por UJ-13.

### Blocking: Acceso próximo inscrito

- Debe confirmarse si backend permite preview de problemas o PDF antes de `fechaInicio`.

### Blocking: Consulta finalizada pública

- Debe confirmarse qué endpoint expone contenido finalizado a un usuario no inscrito.

### Blocking: Mecanismo UJ-15

- Debe verificarse si la implementación es refetch posterior, polling o una conexión persistente.

### Research required: Modal compartido

- Debe confirmarse la primitiva disponible y su manejo de focus.

### Research required: Query keys UJ-11

- Debe identificarse la key exacta para invalidar sin perder filtros.

### Research required: UserLayout

- Deben localizarse las clases específicas responsables del límite de ancho.

### Human coordination required: Privado finalizado

- Backend debe definir una operación de validación de consulta separada de la inscripción.
