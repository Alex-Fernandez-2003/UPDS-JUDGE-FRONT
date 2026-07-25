# Spec

## Requirements

### Change Identity Requirements

- El change MUST llamarse `integrate-user-contest-flow-uj12-routing-layout-table-style`.
- El change MUST residir en `docs/openspec/changes/integrate-user-contest-flow-uj12-routing-layout-table-style/`.
- El change MUST permanecer como una única unidad.
- El change MUST implementar UJ-12.
- El change MUST integrar UJ-11, UJ-13, UJ-14 y UJ-15.
- El change MUST NOT reconstruir funcionalidades existentes sin inspeccionarlas.

### Discovery Requirements

- Pi MUST leer completamente los tres documentos obligatorios.
- Pi MUST buscar documentación complementaria de las mismas historias.
- Pi MUST inspeccionar archivos, imports, servicios, hooks, tipos, rutas, mocks y tests.
- Pi MUST registrar una matriz por historia.
- Pi MUST registrar una matriz por responsabilidad y archivo.
- Una implementación documentada pero ausente MUST tratarse como bloqueo de integración.
- Los nombres finales MUST provenir del workspace.

### Login and Home Routing Requirements

- Un usuario con rol `Usuario` MUST resolver el área principal de usuario.
- Un usuario sin rol administrativo MUST NOT ser dirigido a `/admin/dashboard`.
- La redirección MUST conservar la prioridad de roles existente.
- El change MUST NOT modificar token, decoder, AuthTransport o logout.
- La ruta principal SHOULD conservar `/student/concursos` cuando el workspace confirme su uso canónico.
- La ruta histórica `/student` MAY redirigir con replace.
- La página principal MUST evitar una superficie temporal o vacía.
- La página principal MUST conservar dashboard, estadísticas, envíos y lista existentes.

### Contest Detail Routing Requirements

- Debe existir una única ruta canónica de detalle.
- La ruta MUST usar el parámetro requerido por los servicios reales.
- Cuando el código sea el identificador contractual, la ruta MUST utilizar el código.
- El detalle MUST obtener el parámetro desde el router.
- El detalle MUST NOT depender exclusivamente de `location.state`.
- La recarga directa MUST volver a cargar el concurso correcto.
- Un parámetro inválido MUST producir feedback controlado.
- Un concurso inexistente MUST producir not found o error equivalente.
- La ruta MUST componerse con `ProtectedRoute` y `RoleRoute` existentes.
- El change MUST NOT duplicar guards.

### Contest State Mapping Requirements

- La UI MUST separar etiquetas de valores contractuales.
- `Proximo` MUST presentarse como `Próximo`.
- El valor contractual equivalente a concurso en curso MUST confirmarse antes de mapearse a `En curso`.
- `Finalizado` MUST presentarse como `Finalizado`.
- La política MUST NOT basarse en textos visibles.
- El mapping MUST centralizarse.
- Estados desconocidos MUST producir una acción segura bloqueada o neutral.

### User Action Policy Requirements

- Debe existir una política central equivalente a `getContestUserAction`.
- La política MUST recibir estado, modalidad e inscripción.
- La política MUST ser pura y testeable.
- Próximo público no inscrito MUST producir `JOIN_PUBLIC`.
- Próximo privado no inscrito MUST producir `JOIN_PRIVATE`.
- Próximo inscrito MUST producir `ENROLLED_UPCOMING`.
- En curso inscrito MUST producir `VIEW_ACTIVE`.
- En curso no inscrito MUST producir `REGISTRATION_CLOSED`.
- Finalizado inscrito MUST producir `VIEW_FINISHED`.
- Finalizado público no inscrito MUST producir `VIEW_FINISHED`.
- Finalizado privado no inscrito MUST producir `PRIVATE_FINISHED_REQUIRES_BACKEND`.
- El JSX MUST NOT duplicar la matriz mediante condiciones dispersas.

### Upcoming Contest Requirements

- Un próximo no inscrito MUST poder iniciar inscripción.
- Un próximo público MUST abrir confirmación sin contraseña.
- Un próximo privado MUST abrir un formulario de contraseña.
- Un próximo inscrito MUST mostrar `Inscrito` o equivalente.
- Un próximo inscrito MUST NOT mostrar inscripción como acción pendiente.
- El envío de soluciones MUST permanecer deshabilitado antes del inicio.
- PDF e incisos MUST respetar el acceso real confirmado por backend.
- El acceso previo al detalle MUST quedar condicionado al contrato inspeccionado.

### Active Contest Requirements

- Un concurso en curso e inscrito MUST permitir detalle en modo participation.
- Participation MUST permitir problemas, PDF, selección, solución, evaluación y envíos.
- Un concurso en curso no inscrito MUST mostrar inscripciones cerradas.
- La UI MUST NOT abrir el modal de inscripción para ese caso.
- La UI SHOULD evitar una petición que conoce como inválida.
- Un usuario no inscrito MUST NOT acceder funcionalmente al uploader.

### Finished Contest Requirements

- Un finalizado inscrito MUST permitir modo read-only.
- Un finalizado público no inscrito MUST permitir modo read-only.
- Read-only MUST permitir contenido de consulta respaldado por backend.
- Read-only MUST NOT permitir una solución nueva.
- El formulario MUST ocultarse o deshabilitarse con explicación.
- La estrategia MUST ser consistente en toda la página.
- La tabla de envíos MAY continuar visible cuando el backend la soporte.

### Private Finished Contest Requirements

- Un finalizado privado no inscrito MUST quedar bloqueado.
- La UI MUST NOT comparar contraseñas localmente.
- La UI MUST NOT llamar `unirse` para validar consulta.
- La UI MUST NOT inventar un token temporal.
- La UI MUST NOT permitir acceso directo.
- La UI MUST mostrar una explicación controlada.
- La documentación MUST registrar la dependencia backend.
- Este bloqueo MUST NOT impedir cerrar el resto del change.

### Detail Mode Requirements

- Debe existir una política central de modo.
- Los modos MUST ser equivalentes a:
  - participation;
  - read-only;
  - blocked.
- Participation MUST corresponder a un usuario inscrito en concurso en curso.
- Read-only MUST cubrir finalizados permitidos.
- Blocked MUST cubrir activos no inscritos y privados finalizados no inscritos.
- El modo MUST derivarse una vez desde datos confiables.
- Formulario, problemas, PDF y tabla MUST consumir el modo sin recalcular reglas incompatibles.
- El router MUST NOT ser la única capa que decide acceso.

### UJ-12 Endpoint Requirements

- El endpoint MUST centralizarse como `ParticipanteConcursos/unirse`.
- El request MUST usar POST.
- El request MUST utilizar HttpClient.
- AuthTransport MUST incorporar Bearer.
- El path MUST NOT hardcodearse en modal, card, hook o test.
- El frontend MUST NOT usar URL absoluta.
- El frontend MUST NOT leer sessionStorage para construir el request.

### UJ-12 Type Requirements

- Debe existir un tipo de request con `codigo`.
- El request MAY incluir `contrasena`.
- Debe existir un tipo de response con `mensaje` y `codConcurso`.
- Los tipos MUST reflejar el contrato real.
- Los tipos MUST NOT usar `any`.
- Errores MUST NOT convertirse en responses exitosas.

### UJ-12 Service Requirements

- El servicio MUST normalizar el código como exige el contrato.
- El servicio MUST enviar JSON.
- El servicio MUST preservar ApiError.
- El servicio MUST NOT usar fetch directo.
- El servicio MUST NOT leer o registrar la contraseña.
- El servicio MUST NOT construir Bearer manualmente.

### UJ-12 Mutation Requirements

- La inscripción MUST utilizar una mutación de TanStack Query.
- La mutación MUST exponer pending, success y error.
- La mutación MUST evitar doble submit.
- La mutation key MUST ser específica.
- El éxito MUST actualizar o invalidar solo queries relacionadas.
- La invalidación MUST conservar la key parametrizada de la lista.
- El éxito MUST reflejar `yaInscrito`.
- El éxito MUST NOT invalidar toda la aplicación.
- El éxito MUST NOT ejecutar reload.
- Una respuesta `Ya estás inscrito` MUST tratarse como estado inscrito.
- Una respuesta de reinscripción MUST tratarse como estado inscrito.

### Public Join Modal Requirements

- Un próximo público no inscrito MUST abrir el modal compartido.
- El modal MUST mostrar nombre y código.
- La fecha MAY mostrarse cuando esté disponible.
- El modal MUST mostrar Cancelar.
- El modal MUST mostrar Confirmar inscripción.
- El modal MUST NOT mostrar PasswordInput.
- El payload MUST enviar contraseña null u omitirla según el contrato confirmado.

### Private Join Modal Requirements

- Un próximo privado no inscrito MUST abrir el modo privado.
- El modal MUST mostrar nombre y código.
- El modal MUST mostrar PasswordInput.
- La contraseña MUST ser obligatoria.
- La contraseña MUST permanecer oculta inicialmente.
- Mostrar u ocultar MAY reutilizar la capacidad existente.
- La contraseña MUST limpiarse al cerrar.
- La contraseña MUST limpiarse después del éxito.
- La contraseña MUST NOT persistirse.
- La contraseña MUST NOT formar parte de query keys.
- La contraseña MUST NOT aparecer en URL, logs o documentación.
- Enter MUST poder enviar el formulario.

### Join Modal State Requirements

- Idle MUST permitir completar o confirmar.
- Pending MUST mantener el modal abierto.
- Pending MUST deshabilitar confirmación.
- Pending MUST mostrar feedback de actividad.
- Success MUST actualizar la lista.
- Success MUST cerrar de forma controlada.
- Success MUST mostrar feedback.
- Error MUST mantener el modal abierto.
- Error MUST mostrar el mensaje backend normalizado.
- Error MUST asociarse al campo cuando corresponda.
- Cancelar MUST cerrar y limpiar datos.
- Escape SHOULD cerrar cuando no exista pending.
- El modal MUST NOT cerrarse accidentalmente durante pending.

### Backend Error Requirements

- Código obligatorio MUST mostrarse como error.
- Concurso inexistente MUST mostrarse como error.
- Concurso propio MUST mostrarse como error.
- Inscripciones cerradas MUST mostrarse como error.
- Contraseña requerida MUST asociarse al flujo privado.
- Contraseña incorrecta MUST asociarse al campo.
- Token inválido MUST delegarse a la política global.
- El modal MUST NOT duplicar manejo global de autenticación.

### Post-Join Requirements

- El éxito MUST cambiar el estado visual a inscrito.
- El éxito MUST conservar filtro de estado.
- El éxito MUST conservar modalidad.
- El éxito MUST conservar búsqueda.
- El éxito SHOULD conservar página y scroll.
- El modal MUST cerrarse.
- El change MUST NOT navegar automáticamente a un próximo salvo requisito real confirmado.

### UJ-13 Requirements

- La implementación real MUST localizarse antes de componerla.
- La página MUST reutilizar el listado de incisos existente.
- Los incisos MUST provenir del contrato real.
- El orden MUST respetar la respuesta o la regla existente.
- La URL del PDF MUST provenir del backend.
- La URL MUST NOT construirse artificialmente.
- Un PDF disponible MUST abrirse con `noopener noreferrer`.
- Un PDF ausente MUST producir botón deshabilitado o estado controlado.
- UJ-13 MUST poder operar en participation y read-only cuando el backend lo permita.
- UJ-13 MUST NOT exponer contenido previo al inicio sin autorización.

### UJ-14 Requirements

- El selector de problema existente MUST reutilizarse.
- El selector de lenguaje existente MUST reutilizarse.
- La lista de lenguajes MUST conservarse.
- El modo de archivo o editor MUST conservarse.
- La validación existente MUST conservarse.
- El FormData o DTO MUST conservar sus nombres reales.
- El formulario MUST habilitarse solo en participation.
- En read-only, el formulario MUST ocultarse o deshabilitarse con explicación.
- En blocked, el formulario MUST no renderizar acceso funcional.
- El frontend MUST NOT confiar solo en disabled como seguridad.

### UJ-15 Requirements

- El mecanismo de actualización existente MUST conservarse.
- Pi MUST identificar si usa respuesta HTTP, polling, SignalR o WebSocket.
- El change MUST NOT crear un segundo mecanismo.
- Un rerender MUST NOT abrir conexiones duplicadas.
- El lifecycle MUST limpiar listeners, timers o conexiones.
- Un envío exitoso MUST actualizar la tabla del concurso.
- El veredicto MUST utilizar el componente existente.
- Read-only MUST permitir consultar resultados existentes cuando corresponda.
- Read-only MUST NOT iniciar evaluaciones.

### Submission Table Boundary Requirements

- La tabla del dashboard MUST representar historial general.
- La tabla del detalle MUST representar envíos del contexto del concurso.
- Las tablas MUST conservar endpoints y contratos independientes.
- Las tablas MUST NOT intercambiar hooks o query keys.
- La tabla histórica MUST conservar:
  - columnas;
  - unidades;
  - veredictos;
  - refresh;
  - cantidad de filas;
  - estados.
- Solo la presentación visual MAY alinearse.

### UserLayout Visual Fix Requirements

- El cambio MUST ser exclusivamente visual.
- El main MUST permitir ancho completo.
- El main SHOULD utilizar una composición equivalente a `w-full`, `min-w-0` y `flex-1`.
- UserLayout MUST NOT imponer un max-width global.
- UserLayout MUST NOT imponer `container` global.
- UserLayout MUST NOT duplicar padding de las páginas.
- Cada página MUST poder controlar su propio ancho.
- Header, navegación, identidad, menú y logout MUST permanecer.
- Routing y autorización MUST no cambiar por este fix.
- No MUST aparecer doble scroll horizontal.
- Menús desplegables MUST no quedar recortados.

### Table Visual Fix Requirements

- RecentSubmissionsTable MUST conservar su lógica.
- La tabla MUST reutilizar las primitivas base disponibles.
- Debe alinearse con la tabla del concurso en:
  - shell;
  - borde;
  - radio;
  - fondo;
  - encabezado;
  - tipografía;
  - espaciado;
  - filas;
  - separadores;
  - badges;
  - hover;
  - estados;
  - scroll.
- Las tablas MUST NOT requerir clases idénticas.
- El change SHOULD extraer solo estilos pequeños realmente compartidos.
- El change MUST NOT crear ciclos entre features.
- El change MUST NOT mover lógica de negocio a componentes compartidos.

### Accessibility Requirements

- El modal MUST tener título y descripción.
- El modal MUST controlar foco.
- El foco MUST retornar al disparador.
- Cancelar y Escape MUST funcionar cuando sea seguro.
- PasswordInput MUST tener label.
- Errores MUST asociarse al campo.
- El formulario MUST utilizar `aria-busy` durante pending.
- Errores MUST anunciarse.
- Acciones MUST tener nombres claros.
- El detalle MUST establecer título de página.
- Cambios de ruta SHOULD mover el foco al contenido principal.
- El PDF MUST tener nombre accesible.
- Estados bloqueados MUST explicarse mediante texto.
- Las tablas MUST conservar semántica.
- Focus-visible MUST conservarse.

### Documentation Requirements

- Pi MUST buscar primero un documento existente de UJ-12.
- Si no existe, MUST crear `docs/historias/UJ-12-inscripcion-concurso-privado.md`.
- UJ-12 MUST documentar flujo público y privado.
- UJ-12 MUST documentar endpoint, payloads, errores, seguridad y pruebas.
- UJ-12 MUST registrar el bloqueo de privado finalizado.
- UJ-11 MUST registrar ruta final, acciones y detalle.
- UJ-13 MUST registrar ruta y composición.
- UJ-14/UJ-15 MUST registrar ruta, modos y mecanismo real.
- Los fixes visuales MUST documentarse como transversales.
- Evidencias inexistentes MUST quedar pendientes sin enlaces.

## Behavior Scenarios

### Scenario 1: Login de Usuario

Given una sesión válida con rol Usuario  
When finaliza el login  
Then el usuario MUST navegar al área principal de usuario y MUST no navegar al dashboard administrativo

### Scenario 2: Dashboard integrado

Given un usuario autenticado  
When abre la ruta principal  
Then MUST ver el dashboard y la lista de concursos existentes

### Scenario 3: Próximo público no inscrito

Given un concurso Próximo, Público y no inscrito  
When se deriva su acción  
Then la acción MUST ser JOIN_PUBLIC

### Scenario 4: Próximo privado no inscrito

Given un concurso Próximo, Privado y no inscrito  
When se deriva su acción  
Then la acción MUST ser JOIN_PRIVATE

### Scenario 5: Próximo inscrito

Given un concurso Próximo y ya inscrito  
When se renderiza su card  
Then MUST mostrar estado inscrito y MUST no solicitar otra inscripción

### Scenario 6: Activo inscrito

Given un concurso En curso y un usuario inscrito  
When activa la acción  
Then MUST navegar al detalle en modo participation

### Scenario 7: Activo no inscrito

Given un concurso En curso y un usuario no inscrito  
When se renderiza su acción  
Then MUST mostrar inscripciones cerradas y MUST no abrir el modal

### Scenario 8: Finalizado inscrito

Given un concurso Finalizado y un usuario inscrito  
When abre el detalle  
Then MUST utilizar modo read-only

### Scenario 9: Finalizado público no inscrito

Given un concurso Finalizado, Público y no inscrito  
When abre el detalle  
Then MUST utilizar modo read-only

### Scenario 10: Finalizado privado no inscrito

Given un concurso Finalizado, Privado y no inscrito  
When intenta acceder  
Then MUST mostrar el bloqueo backend y MUST no llamar unirse

### Scenario 11: Confirmación pública

Given un concurso público próximo  
When el usuario pulsa Inscribirse  
Then MUST abrir un modal sin PasswordInput

### Scenario 12: Payload público

Given el modal público confirmado  
When se envía la mutación  
Then MUST enviar el código y una contraseña nula u omitida según el contrato

### Scenario 13: Modal privado

Given un concurso privado próximo  
When el usuario pulsa Inscribirse  
Then MUST abrir un modal con PasswordInput obligatorio

### Scenario 14: Contraseña vacía

Given el modal privado abierto y contraseña vacía  
When el usuario intenta enviar  
Then MUST mostrarse validación y MUST no enviarse la mutación

### Scenario 15: Contraseña incorrecta

Given una contraseña incorrecta  
When backend rechaza la inscripción  
Then el modal MUST permanecer abierto y el error MUST asociarse al campo

### Scenario 16: Inscripción exitosa

Given una inscripción válida  
When backend responde exitosamente  
Then MUST cerrarse el modal, actualizarse yaInscrito y conservarse los filtros

### Scenario 17: Ya inscrito

Given backend responde que el usuario ya estaba inscrito  
When se procesa la respuesta  
Then la UI MUST tratar el concurso como inscrito

### Scenario 18: Reinscripción

Given backend responde que la participación fue reactivada  
When se procesa la respuesta  
Then la UI MUST tratar el concurso como inscrito

### Scenario 19: Inscripción cerrada

Given el concurso comenzó antes de enviar  
When backend rechaza la mutación  
Then MUST mostrarse el mensaje y MUST no navegar al detalle

### Scenario 20: Doble submit

Given una inscripción pending  
When el usuario vuelve a confirmar  
Then MUST evitarse un segundo request

### Scenario 21: Contraseña efímera

Given el modal privado se cierra  
When vuelve a abrirse  
Then el campo MUST estar vacío

### Scenario 22: Sin reload

Given una inscripción exitosa  
When se actualiza la lista  
Then MUST no ejecutarse `window.location.reload()`

### Scenario 23: Invalidación exacta

Given una inscripción exitosa  
When se actualiza la caché  
Then MUST afectarse solo las queries de concursos relacionadas

### Scenario 24: Detalle recargable

Given una URL válida de detalle  
When el navegador se recarga  
Then MUST obtenerse el concurso desde el parámetro de ruta y backend

### Scenario 25: Parámetro inválido

Given un código de concurso inválido  
When se carga el detalle  
Then MUST mostrarse un error controlado

### Scenario 26: Incisos

Given un detalle permitido con problemas  
When carga UJ-13  
Then MUST mostrarse la lista real de incisos

### Scenario 27: PDF disponible

Given una URL de PDF válida  
When el usuario activa Ver PDF  
Then MUST abrirse una pestaña segura con `noopener noreferrer`

### Scenario 28: PDF ausente

Given un concurso sin URL de PDF  
When se renderiza UJ-13  
Then MUST mostrarse la acción deshabilitada o un estado controlado

### Scenario 29: Participation

Given un usuario inscrito en un concurso en curso  
When se renderiza el detalle  
Then MUST habilitarse selección, lenguaje y envío

### Scenario 30: Read-only

Given un concurso finalizado accesible  
When se renderiza el detalle  
Then MUST mostrarse contenido de consulta y MUST impedir nuevos envíos

### Scenario 31: Blocked

Given un usuario sin acceso permitido  
When se renderiza el detalle  
Then MUST mostrarse feedback bloqueado y MUST no renderizar uploader funcional

### Scenario 32: Envío de solución

Given modo participation y datos válidos  
When se envía una solución  
Then MUST reutilizarse el servicio y contrato existentes

### Scenario 33: Veredicto

Given un envío aceptado por backend  
When finaliza el mecanismo existente  
Then MUST actualizarse el veredicto y la tabla del concurso

### Scenario 34: Sin conexión duplicada

Given el detalle se rerenderiza  
When el mecanismo de tiempo real continúa activo  
Then MUST no abrirse una segunda conexión o polling

### Scenario 35: UserLayout full width

Given una página dentro de UserLayout  
When se renderiza  
Then el main MUST utilizar el ancho disponible sin max-width global

### Scenario 36: Ancho decidido por página

Given una página con su propio contenedor  
When se renderiza dentro de UserLayout  
Then su max-width local MUST respetarse

### Scenario 37: Tabla histórica consistente

Given RecentSubmissionsTable  
When se aplica el fix visual  
Then MUST conservar datos y comportamiento y SHOULD compartir las convenciones visuales de SubmissionsTable

### Scenario 38: Tabla histórica sin contrato cambiado

Given el fix visual completado  
When se inspeccionan requests y columnas  
Then endpoint, query key, mapper, unidades y columnas MUST permanecer iguales

### Scenario 39: Responsive

Given un viewport móvil  
When se recorren dashboard, modal y detalle  
Then MUST no existir overflow global y las tablas MUST gestionar su propio scroll

### Scenario 40: Logout preservado

Given el usuario dentro del flujo integrado  
When selecciona Cerrar sesión  
Then MUST conservarse el flujo de logout existente

### Scenario 41: Documentación UJ-12

Given el change implementado  
When se actualiza documentación  
Then MUST existir un único documento de UJ-12 con el bloqueo backend explícito

### Scenario 42: Regresión administrativa

Given el routing integrado  
When un administrador abre sus rutas  
Then administración y creación de concursos MUST conservarse

## Edge Cases

- El estado temporal llega con casing o acento inesperado.
- La modalidad llega vacía o con valor desconocido.
- `yaInscrito` falta en una respuesta antigua.
- El concurso cambia de Próximo a En curso mientras el modal está abierto.
- El concurso es eliminado antes de confirmar.
- El usuario creador también posee rol Usuario.
- Backend devuelve `401` para contraseña incorrecta y para sesión inválida.
- El modal se cierra durante una petición lenta.
- La invalidación devuelve el usuario a una página vacía.
- El código de ruta contiene mayúsculas o espacios.
- El detalle se abre desde un bookmark.
- El contrato UJ-13 documentado no existe en el workspace.
- UJ-14 recibe un problema que no pertenece al concurso.
- El mecanismo de evaluación deja un envío pendiente.
- La conexión de tiempo real no implementa cleanup.
- Un finalizado no expone PDF o problemas.
- El modo read-only debe ocultar elementos internos que no aceptan disabled.
- UserLayout usa overflow que recorta menús.
- Ambas tablas usan badges con catálogos incompatibles.
- Los imports entre features generan un ciclo.
- El documento UJ-12 ya existe con otro nombre.
- Los tests globales presentan fallos preexistentes.

## Acceptance Criteria

- La política central MUST cubrir los ocho casos de acceso.
- UJ-12 MUST funcionar para público y privado próximos.
- La contraseña MUST no persistirse.
- Las respuestas backend MUST mostrarse correctamente.
- La lista MUST actualizarse sin reload.
- Filtros y página MUST conservarse.
- La ruta de detalle MUST ser recargable.
- El detalle MUST componer implementaciones existentes.
- Participation, read-only y blocked MUST estar centralizados.
- Un finalizado MUST no permitir nuevos envíos.
- Un privado finalizado no inscrito MUST permanecer bloqueado.
- UJ-13 MUST conservar incisos y PDF.
- UJ-14 MUST conservar lenguaje, editor, archivo y validaciones.
- UJ-15 MUST conservar su mecanismo real sin duplicarlo.
- UserLayout MUST aplicar solo un cambio visual.
- RecentSubmissionsTable MUST conservar toda su lógica.
- Ambas tablas MUST pertenecer al mismo sistema visual.
- Routing y logout MUST no presentar regresiones.
- La administración MUST continuar funcionando.
- Los cuatro documentos de historias MUST reflejar el estado real.
- Las evidencias MUST estar presentes o marcadas como pendientes.
- Los checks técnicos MUST pasar antes de declarar el change terminado.
- No MUST modificarse backend o database.
- No MUST realizarse commit ni push.

## Out of Scope

- Endpoint backend para privado finalizado.
- Inscripción fuera de plazo.
- Cancelación de inscripción.
- Nuevos lenguajes o reglas del juez.
- Sustitución del tiempo real.
- Ranking o clasificación global.
- Rediseño de layouts.
- Tema oscuro.
- JWT, roles y refresh token.
