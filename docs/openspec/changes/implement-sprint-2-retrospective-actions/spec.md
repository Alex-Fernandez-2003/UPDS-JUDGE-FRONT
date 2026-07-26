# Spec

## Requirements

### Capability: admin-user-access

- El sidebar administrativo MUST incluir un grupo denominado `Acceso de Usuario`.
- El grupo MUST incluir inicialmente una opción denominada `Concursos`.
- La opción MUST mostrarse únicamente a roles o permisos confirmados durante baseline.
- La visibilidad MUST reutilizar el catálogo o helper de roles existente.
- La visibilidad MUST NOT sustituir la protección de las rutas.
- Las rutas administrativas de concursos MUST renderizarse bajo AdminLayout.
- Las rutas administrativas MUST NOT montar UserLayout.
- Las rutas administrativas MUST conservar el sidebar durante:
  - listado;
  - problemas;
  - mis envíos.
- El contenido funcional MUST reutilizarse entre wrappers user y admin.
- El sistema MUST NOT mantener dos implementaciones funcionales completas.
- Las rutas MUST ser directas y recargables.
- Las rutas MUST obtener sus parámetros desde el router.
- Las rutas MUST NOT depender de `location.state`.
- Los enlaces MUST construirse mediante builders o descriptores confirmados.
- Un usuario sin permiso administrativo MUST NOT acceder por URL directa.
- El flujo de usuario existente MUST continuar utilizando UserLayout.
- El administrador MUST permanecer en el namespace administrativo durante todo el flujo.
- Ranking MUST NOT mostrarse.

### Capability: private-finished-contest-enrollment

- La policy de acceso MUST contemplar privado, finalizado y no inscrito.
- Ese caso MUST producir una acción de inscripción privada.
- La UI MUST abrir el modal de contraseña existente o adaptado.
- La UI MUST enviar la solicitud al endpoint backend real.
- El endpoint MUST confirmarse durante baseline.
- El request y response MUST reflejar los DTO reales.
- El frontend MUST NOT simular un éxito cuando backend rechace la inscripción.
- Una contraseña correcta MUST producir inscripción y acceso.
- Una contraseña incorrecta MUST mantener el modal abierto.
- Una contraseña incorrecta MUST NOT conceder acceso.
- Un usuario ya inscrito MUST acceder sin volver a ingresar contraseña.
- El éxito MUST invalidar o actualizar únicamente las queries relacionadas.
- El éxito MUST actualizar el estado de inscripción antes de navegar.
- La navegación MUST utilizar la ruta contextual correcta.
- El acceso directo a Problems o Mis envíos MUST comprobar el estado real.
- El acceso directo sin inscripción MUST conducir al flujo de contraseña o a un estado controlado.
- La contraseña MUST permanecer en memoria efímera.
- La contraseña MUST NOT guardarse en storage.
- La contraseña MUST NOT formar parte de query keys.
- La contraseña MUST NOT aparecer en logs, URLs o mensajes.
- La contraseña MUST limpiarse después del éxito o cancelación.
- El campo MUST conservar semántica password.
- Si el backend contradice esta regla, el bloque MUST quedar como dependencia explícita y MUST NOT falsificarse en frontend.

### Capability: frontend-dependency-security

- La implementación MUST ejecutar un audit inicial.
- La implementación MUST guardar el resultado inicial como evidencia textual.
- La implementación MUST inspeccionar `package.json` y `package-lock.json`.
- La implementación MUST ejecutar:
  - `npm audit`;
  - `npm ls brace-expansion minimatch @redocly/openapi-core openapi-typescript`;
  - `npm ls react-router react-router-dom`;
  - `npm outdated`.
- La estrategia MUST identificar dependencias directas y transitivas.
- La estrategia MUST determinar versiones declaradas y resueltas.
- La estrategia MUST comprobar las APIs utilizadas antes de cambiar versiones mayores.
- La implementación MUST evaluar primero una actualización compatible.
- La implementación SHOULD evaluar después una actualización coordinada del paquete padre.
- Una migración mayor MAY utilizarse cuando sea necesaria y esté cubierta por tests.
- Un override MAY utilizarse únicamente con compatibilidad demostrada.
- Un downgrade MAY utilizarse únicamente si elimina la vulnerabilidad y conserva soporte.
- La implementación MUST NOT utilizar `npm audit fix --force` como solución automática.
- La implementación MUST NOT ocultar el advisory sin corregir la dependencia vulnerable.
- El router MUST conservar:
  - rutas;
  - guards;
  - navegación;
  - Link;
  - NavLink;
  - useParams;
  - refresh;
  - layouts.
- La generación OpenAPI MUST continuar produciendo tipos válidos.
- El script OpenAPI real MUST ejecutarse cuando exista.
- `package.json` y `package-lock.json` MUST actualizarse juntos cuando corresponda.
- El change MUST NOT crear otro lockfile.
- El audit final MUST no reportar vulnerabilidades altas corregibles.
- Cada hallazgo MUST clasificarse como:
  - corregido;
  - no aplicable;
  - bloqueo externo;
  - riesgo aceptado excepcionalmente.
- El objetivo principal MUST ser corregir los seis hallazgos reportados.

### Capability: reusable-contest-context-header

- Debe existir un Header reutilizable de contexto del concurso.
- El nombre final MUST seguir las convenciones reales.
- El componente MUST ubicarse fuera de submissions y problems cuando ambas features lo consuman.
- El componente MUST ser independiente de UserLayout y AdminLayout.
- El componente MUST mostrar nombre real.
- El componente MUST mostrar código real.
- El componente MUST mostrar estado real.
- El componente MUST mostrar duración real o `—`.
- Los datos MUST provenir de un contrato real.
- El componente MUST NOT hardcodear identidad o estado.
- La duración MAY derivarse únicamente de campos de fecha contractuales.
- El cálculo MUST manejar:
  - minutos;
  - horas;
  - días;
  - fechas inválidas;
  - ausencia de datos.
- El estado MUST reutilizar el mapper existente cuando sea compatible.
- Las comparaciones de estado MUST NOT dispersarse.
- El Header MUST mostrar `Problemas`.
- El Header MUST mostrar `Mis envíos`.
- El Header MUST NOT mostrar Ranking.
- La API de navegación SHOULD aceptar descriptores extensibles.
- La sección activa MUST derivarse de la ruta o de una prop contractual.
- El Header MUST NOT simular navegación con estado local.
- Los enlaces MUST permanecer dentro del contexto user o admin recibido.
- El Header MUST utilizarse en SubmissionsPage.
- El Header MUST utilizarse en ContestProblemsPage.
- SubmissionsPage MUST eliminar su bloque estático.
- ContestProblemsPage MUST eliminar la navegación duplicada.
- Las métricas específicas de Problems MUST permanecer.
- `Ver PDF` MUST permanecer en ProblemsTable.
- El componente MUST evitar requests adicionales cuando el wrapper ya dispone de los datos.

### Non-Functional Requirements

- El change MUST evitar dependencias circulares.
- El change MUST conservar APIs públicas existentes cuando sea posible.
- El change MUST mantener componentes presentacionales desacoplados de layouts.
- El change MUST conservar accesibilidad de navegación.
- Los enlaces activos MUST usar `aria-current` cuando corresponda.
- Los cambios de ruta MUST conservar focus-visible.
- El modal MUST tener título, descripción y gestión de foco.
- La solución MUST ser responsive.
- La implementación MUST preservar las páginas existentes de usuario.
- El change MUST documentar cualquier desviación del alcance confirmado.

## Behavior Scenarios

### Scenario 1: Grupo del sidebar

Given un administrador autorizado  
When se renderiza el sidebar administrativo  
Then MUST mostrarse el grupo `Acceso de Usuario`

### Scenario 2: Opción Concursos

Given el grupo Acceso de Usuario visible  
When se inspeccionan sus opciones  
Then MUST mostrarse `Concursos` y MUST no mostrarse Ranking

### Scenario 3: Administrador abre concursos

Given un administrador autorizado  
When activa Concursos  
Then MUST abrirse el contenido funcional de concursos dentro de AdminLayout

### Scenario 4: Sidebar persistente

Given un administrador dentro del listado funcional  
When navega a Problemas y después a Mis envíos  
Then el sidebar administrativo MUST permanecer visible

### Scenario 5: Sin UserLayout administrativo

Given una ruta administrativa de acceso de usuario  
When se renderiza la página  
Then UserLayout MUST no estar presente

### Scenario 6: Sin doble sidebar

Given una ruta funcional bajo AdminLayout  
When se inspecciona el árbol visual  
Then MUST existir una sola navegación lateral administrativa

### Scenario 7: Refresh administrativo

Given una URL administrativa válida de Problemas o Mis envíos  
When el navegador se recarga  
Then MUST conservarse AdminLayout y cargarse el contenido correcto

### Scenario 8: Usuario sin permiso

Given un usuario normal sin permiso administrativo  
When intenta abrir la URL administrativa directamente  
Then MUST recibir acceso denegado o la respuesta del guard existente

### Scenario 9: Flujo user preservado

Given un usuario normal  
When navega por concursos, problemas y envíos  
Then MUST continuar utilizando UserLayout

### Scenario 10: Privado finalizado no inscrito

Given un concurso privado finalizado y un usuario no inscrito  
When intenta abrirlo  
Then MUST mostrarse el flujo de contraseña en vez de un bloqueo definitivo

### Scenario 11: Contraseña correcta

Given el modal abierto con una contraseña válida  
When backend confirma la inscripción  
Then MUST actualizarse la caché y navegarse al detalle finalizado

### Scenario 12: Contraseña incorrecta

Given el modal abierto con una contraseña incorrecta  
When backend rechaza la solicitud  
Then MUST mantenerse el modal, mostrarse el error contractual y negarse el acceso

### Scenario 13: Usuario ya inscrito

Given un concurso privado finalizado y un usuario ya inscrito  
When abre el concurso  
Then MUST acceder directamente sin solicitar contraseña

### Scenario 14: Acceso directo sin inscripción

Given una URL directa de Problemas o Mis envíos de un privado finalizado  
When el backend confirma que el usuario no está inscrito  
Then MUST solicitarse inscripción o mostrarse un estado controlado sin exponer contenido

### Scenario 15: Caché actualizada

Given una inscripción finalizada exitosa  
When se completa la mutación  
Then las queries de lista y detalle afectadas MUST reflejar `yaInscrito`

### Scenario 16: Error backend contradictorio

Given que backend rechaza toda inscripción finalizada  
When se ejecuta el escenario confirmado funcionalmente  
Then el frontend MUST no simular éxito y el bloqueo MUST documentarse

### Scenario 17: Contraseña no persistida

Given que el usuario envió una contraseña  
When el modal se cierra  
Then la contraseña MUST no existir en storage, query cache, URL o logs

### Scenario 18: Audit inicial

Given el lockfile original  
When se ejecuta npm audit  
Then el resultado inicial MUST registrarse antes de modificar dependencias

### Scenario 19: Árbol vulnerable

Given los advisories reportados  
When se inspecciona el árbol npm  
Then MUST identificarse el paquete padre que introduce cada dependencia vulnerable

### Scenario 20: Sin force automático

Given una propuesta de npm audit fix con breaking changes  
When se define la remediación  
Then MUST no utilizarse `--force` sin análisis y aprobación explícita

### Scenario 21: Router preservado

Given una actualización de React Router  
When se ejecutan las pruebas del router  
Then rutas, guards, enlaces, parámetros y refresh MUST continuar funcionando

### Scenario 22: OpenAPI preservado

Given una actualización de openapi-typescript o su árbol  
When se ejecuta el script real  
Then los tipos MUST generarse y el frontend MUST compilar

### Scenario 23: Audit final

Given la remediación aplicada  
When se ejecuta `npm audit --audit-level=high`  
Then MUST no reportarse vulnerabilidades altas corregibles dentro del proyecto

### Scenario 24: Lockfile reproducible

Given package.json y package-lock actualizados  
When se realiza una instalación limpia con npm  
Then MUST resolverse el mismo árbol esperado sin otro gestor

### Scenario 25: Header en Mis envíos

Given SubmissionsPage con datos del concurso  
When se renderiza  
Then el Header MUST mostrar nombre, código, estado y duración reales y marcar Mis envíos

### Scenario 26: Header en Problemas

Given ContestProblemsPage con datos del concurso  
When se renderiza  
Then el mismo Header MUST marcar Problemas

### Scenario 27: Duración real

Given fechas contractuales válidas  
When se calcula la duración  
Then MUST mostrarse una representación coherente en días, horas o minutos

### Scenario 28: Duración no calculable

Given fechas ausentes o inválidas  
When se renderiza el Header  
Then la duración MUST mostrarse como `—`

### Scenario 29: Estado real

Given un estado real del concurso  
When se mapea para presentación  
Then MUST mostrarse la etiqueta correspondiente sin hardcode local por página

### Scenario 30: Rutas de usuario

Given el Header bajo UserLayout  
When el usuario activa Problemas o Mis envíos  
Then MUST navegar dentro del namespace de usuario

### Scenario 31: Rutas administrativas

Given el Header bajo AdminLayout  
When el administrador activa Problemas o Mis envíos  
Then MUST navegar dentro del namespace administrativo

### Scenario 32: Sin navegación duplicada

Given ContestProblemsPage integrada  
When se inspecciona el contenido anterior a ProblemsTable  
Then la navegación Problemas/Mis envíos MUST existir únicamente en el Header

### Scenario 33: Métricas preservadas

Given ContestProblemsPage después de la integración  
When se renderiza  
Then Fecha fin, Hora fin, Participantes actuales, Problemas resueltos e Intentos totales MUST permanecer

### Scenario 34: PDF preservado

Given ProblemsTable después de la integración  
When se renderiza  
Then `Ver PDF` MUST permanecer dentro de ProblemsTable

### Scenario 35: Ranking preparado pero oculto

Given la API extensible del Header  
When se renderizan los elementos actuales  
Then Ranking MUST no aparecer

## Edge Cases

- El administrador posee más de un rol.
- El rol administrativo no incluye capacidades de Usuario.
- El sidebar se filtra por permisos y por búsqueda.
- Una ruta administrativa se abre en una pestaña nueva.
- El código del concurso contiene caracteres que requieren encoding.
- El contexto cambia durante una inscripción.
- Backend devuelve inscripción exitosa pero el refetch falla.
- La mutación termina después de cerrar el modal.
- La contraseña contiene espacios válidos.
- El DTO del concurso no incluye nombre o fechas.
- Las fechas utilizan zonas horarias distintas.
- La duración es cero o negativa.
- Problems y Submissions ejecutan la misma query con keys diferentes.
- El Header recibe un item de navegación sin URL.
- El script OpenAPI no existe.
- El script OpenAPI depende de un backend local no disponible.
- El advisory resulta no aplicable a la modalidad de router utilizada.
- Una versión segura exige un runtime de Node distinto.
- El lockfile fue generado con otra versión de npm.
- El audit final reporta un hallazgo sin versión corregida.

## Acceptance Criteria

- El administrador autorizado MUST ver Acceso de Usuario y Concursos.
- AdminLayout y sidebar MUST persistir durante todo el flujo.
- UserLayout MUST no renderizarse dentro del contexto administrativo.
- Las rutas administrativas MUST soportar refresh directo.
- Un usuario sin permiso MUST no acceder.
- El contenido funcional MUST reutilizarse sin copias completas.
- El privado finalizado MUST admitir contraseña e inscripción cuando backend lo soporte.
- Una contraseña incorrecta MUST no conceder acceso.
- La contraseña MUST no persistirse.
- Las invalidaciones MUST ser acotadas.
- El Header MUST utilizar datos reales.
- El Header MUST utilizarse en las dos páginas obligatorias.
- La navegación duplicada MUST eliminarse.
- Las métricas y PDF MUST permanecer.
- Ranking MUST no mostrarse.
- Las vulnerabilidades altas corregibles MUST quedar remediadas.
- El router MUST pasar sus pruebas.
- La generación OpenAPI MUST funcionar cuando exista.
- El lockfile MUST ser coherente.
- Lint, typecheck, tests y build MUST pasar.
- La documentación MUST actualizarse sin reescribir retrospectivas.

## Out of Scope

- Ranking.
- Nuevas capacidades funcionales de concursos.
- Nuevos roles o autenticación.
- Cambios backend no confirmados.
- Migración de gestor de paquetes.
- Rediseño completo de layouts.
- Cambios en problemas, envíos, veredictos o juez.
