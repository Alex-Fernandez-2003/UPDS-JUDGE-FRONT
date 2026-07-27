# Spec

## Requirements

### Capability: admin-role-management-routing

- La implementación MUST leer `## Archivos involucrados` de UJ-07 antes de modificar código.
- Cada archivo documentado MUST verificarse por ruta y casing.
- La pantalla UJ-07 MUST integrarse en el flujo administrativo existente.
- La ruta MUST renderizarse bajo `AdminLayout`.
- La ruta MUST conservar el sidebar administrativo.
- La ruta MUST soportar acceso directo.
- La ruta MUST soportar refresh.
- La ruta MUST utilizar guards existentes.
- La visibilidad del enlace MUST usar permisos efectivos reales.
- Ocultar el enlace MUST NOT ser la única protección.
- Un usuario no autorizado MUST NOT acceder mediante URL directa.
- La implementación MUST NOT montar `UserLayout`.
- La implementación MUST NOT depender de datos simulados en producción.
- La implementación MUST NOT ejecutar reload para reflejar mutations.
- Los nombres de rutas MUST confirmarse durante baseline.

### Capability: admin-role-assignment-management

- La pantalla MUST cargar una lista real de usuarios.
- La pantalla MUST mostrar los roles actuales de cada usuario.
- Las etiquetas `Admin Concursos` y `Admin Roles` MUST separarse de los identificadores contractuales.
- Los identificadores MUST confirmarse en frontend y backend.
- La asignación MUST utilizar el endpoint real.
- El request MUST utilizar HttpClient o el transporte compartido existente.
- El request MUST NOT construir manualmente el token.
- La mutation MUST exponer pending, success y error.
- La mutation MUST evitar doble submit.
- Una asignación exitosa MUST actualizar la caché relacionada.
- Una asignación exitosa MUST persistir después de refresh.
- Asignar Admin Concursos MUST estar soportado cuando el contrato lo permita.
- Asignar Admin Roles MUST estar soportado cuando el contrato lo permita.
- Asignar un rol ya existente MUST seguir el comportamiento real del backend.
- El frontend MUST NOT simular idempotencia.
- Los errores backend MUST mostrarse de forma accesible.
- La UI MUST conservar los estilos existentes.

### Capability: admin-role-revocation-management

- La revocación MUST utilizar el endpoint real.
- La mutation MUST evitar doble submit.
- Una revocación exitosa MUST actualizar la caché.
- Una revocación exitosa MUST persistir después de refresh.
- Revocar Admin Concursos MUST estar soportado cuando el contrato lo permita.
- Revocar Admin Roles MUST estar soportado cuando el contrato lo permita.
- Revocar un rol inexistente MUST seguir el comportamiento backend.
- Permisos insuficientes MUST producir un error controlado.
- Conflictos contractuales MUST mostrarse sin falsear éxito.
- Self-revocation MUST implementarse únicamente si el contrato la permite.
- La protección del último Administrador de Roles MUST implementarse únicamente si backend la define.
- Roles inmutables MUST respetarse cuando existan.
- El frontend MUST NOT inventar restricciones locales incompatibles.

### Capability: user-submissions-routing

- La implementación MUST leer `# Archivos principales` de UJ-20 antes de modificar código.
- Cada archivo documentado MUST verificarse por ruta y casing.
- La página global de envíos MUST integrarse en la navegación principal del usuario.
- La ubicación del enlace MUST confirmarse en la navegación real.
- La ruta MUST renderizarse bajo `UserLayout`.
- La ruta MUST soportar acceso directo.
- La ruta MUST soportar refresh.
- La ruta MUST conservar autenticación.
- La ruta MUST NOT depender de `location.state`.
- La ruta MUST consultar únicamente envíos del usuario autenticado.
- La ruta MUST NOT sustituir la tabla de envíos recientes.
- La ruta MUST NOT sustituir la tabla de un concurso.
- La exposición dentro de `Acceso de Usuario` administrativo MUST evaluarse durante baseline.
- Esa exposición MUST NOT implementarse por defecto sin evidencia.

### Capability: user-global-submissions-history

- La página MUST consumir el endpoint global real de envíos.
- El endpoint MUST confirmarse en backend.
- La página MUST mostrar la respuesta paginada contractual.
- La página MUST conservar la tabla existente cuando sea compatible.
- La tabla MUST conservar estilos, columnas y responsive válidos.
- La página MUST mostrar loading.
- La página MUST mostrar empty.
- La página MUST mostrar error.
- La página MUST permitir refresh cuando la implementación existente lo soporte.
- El frontend MUST NOT usar un endpoint limitado a envíos recientes.
- El frontend MUST NOT usar un endpoint de concurso específico.
- El frontend MUST NOT implementar paginación local mediante `slice` cuando exista paginación backend.
- El page size MUST provenir del contrato o implementación actual.
- La metadata MUST provenir de la respuesta real.
- Una página fuera de rango MUST seguir la política backend o retornar a una página válida de forma controlada.

### Capability: user-submissions-filtering

- Los filtros requeridos MUST ser:
  - concurso;
  - resultado obtenido.
- La UI MUST conservar la implementación existente cuando sea válida.
- El identificador del concurso MUST confirmarse contractualmente.
- Los valores de resultado MUST confirmarse contractualmente.
- La opción Todos MUST representarse según el patrón real.
- Los filtros MUST serializarse en el request.
- Los filtros MUST formar parte de la query key.
- La combinación de filtros MUST enviarse en un único request coherente.
- Cambiar cualquier filtro MUST reiniciar la página a la inicial.
- Limpiar filtros MUST retirar ambos filtros contractuales.
- Limpiar filtros MUST volver a la página inicial.
- Los filtros MUST preservarse durante cambios de página.
- Los filtros MUST preservarse durante refresh.
- Los filtros MUST NOT aplicarse únicamente al array ya cargado.
- La implementación MUST NOT agregar filtros ajenos a UJ-20.

### Capability: submission-verdict-preservation

- La implementación MUST localizar el mapper vigente de veredictos.
- El mapper MUST reutilizarse cuando los valores contractuales coincidan.
- El change MUST NOT crear un segundo mapper incompatible sin justificación.
- Los badges y tonos existentes MUST preservarse.
- Los valores conocidos MAY incluir:
  - Accepted;
  - Wrong Answer;
  - Time Limit Exceeded;
  - Memory Limit Exceeded;
  - Compilation Error;
  - Runtime Error.
- Esos valores MUST confirmarse contra el contrato real.
- Un valor desconocido MUST utilizar el fallback existente o uno seguro.

### Capability: integration-preservation

- El change MUST usar mínima intervención.
- Componentes válidos MUST reutilizarse.
- JSX, estilos, variables e iconos SHOULD conservarse.
- Una eliminación MUST justificarse por un problema técnico demostrable.
- UJ-07 y UJ-20 MUST permanecer desacopladas funcionalmente.
- Solo MAY compartirse infraestructura transversal existente.
- `AdminLayout` MUST preservarse para UJ-07.
- `UserLayout` MUST preservarse para UJ-20.
- `Acceso de Usuario`, concursos, Problems, envíos del concurso y `ContestContextHeader` MUST no presentar regresiones.
- La generación OpenAPI MUST conservarse cuando resulte afectada.
- El change MUST NOT modificar dependencias npm.
- El change MUST NOT introducir imports circulares.
- Los tests existentes MUST actualizarse solo cuando sus expectativas estén obsoletas y se documente la razón.

## Behavior Scenarios

### Scenario 1: Administrador autorizado abre roles

Given un usuario con el permiso contractual de administración de roles  
When activa la opción administrativa correspondiente  
Then la pantalla MUST abrirse dentro de AdminLayout

### Scenario 2: Enlace oculto sin permiso

Given un usuario sin permiso de administración de roles  
When se renderiza la navegación administrativa  
Then el acceso UJ-07 MUST no mostrarse

### Scenario 3: URL directa sin permiso

Given un usuario sin permiso de administración de roles  
When intenta abrir directamente la ruta UJ-07  
Then el guard MUST denegar el acceso

### Scenario 4: Refresh de UJ-07

Given un administrador autorizado en la ruta UJ-07  
When recarga el navegador  
Then AdminLayout, sidebar y página MUST reconstruirse correctamente

### Scenario 5: Lista de usuarios

Given el endpoint de usuarios responde correctamente  
When carga la página  
Then MUST mostrarse la lista real con sus roles actuales

### Scenario 6: Lista vacía

Given el endpoint responde sin usuarios gestionables  
When carga la página  
Then MUST mostrarse el estado vacío existente o equivalente

### Scenario 7: Error de lista

Given el endpoint de usuarios falla  
When carga la página  
Then MUST mostrarse un error controlado sin datos simulados

### Scenario 8: Loading de lista

Given la query de usuarios está pendiente  
When se renderiza la página  
Then MUST mostrarse el estado loading existente

### Scenario 9: Asignar Admin Concursos

Given un usuario seleccionable sin el rol contractual equivalente a Admin Concursos  
When el administrador confirma la asignación  
Then MUST ejecutarse la mutation real y reflejarse el rol después del éxito

### Scenario 10: Asignar Admin Roles

Given un usuario seleccionable sin el rol contractual equivalente a Admin Roles  
When el administrador confirma la asignación  
Then MUST ejecutarse la mutation real y reflejarse el rol después del éxito

### Scenario 11: Revocar Admin Concursos

Given un usuario con Admin Concursos  
When el administrador confirma la revocación  
Then MUST persistirse la revocación y actualizarse la lista

### Scenario 12: Revocar Admin Roles

Given un usuario con Admin Roles  
When el administrador confirma la revocación  
Then MUST persistirse la revocación y actualizarse la lista

### Scenario 13: Mutation fallida

Given una asignación o revocación rechazada por backend  
When termina la mutation  
Then la UI MUST mostrar el error y MUST no falsear el nuevo estado

### Scenario 14: Doble submit UJ-07

Given una mutation de roles pendiente  
When se intenta confirmar nuevamente  
Then MUST evitarse una segunda solicitud concurrente

### Scenario 15: Caché de roles

Given una mutation exitosa  
When termina la invalidación exacta  
Then la lista MUST mostrar el estado persistido sin reload

### Scenario 16: Refresh confirma persistencia

Given una mutation exitosa  
When se recarga la ruta  
Then el rol actualizado MUST continuar visible

### Scenario 17: Regla contractual no definida

Given que self-revocation o último administrador no están definidos  
When se implementa UJ-07  
Then MUST no inventarse una restricción frontend

### Scenario 18: Usuario abre Mis envíos

Given un usuario autenticado  
When activa la navegación de Mis envíos  
Then MUST abrirse la página global bajo UserLayout

### Scenario 19: Acceso directo UJ-20

Given una URL válida de UJ-20  
When se abre directamente o se recarga  
Then MUST cargarse UserLayout y la consulta global

### Scenario 20: Carga inicial UJ-20

Given la página global abierta sin filtros  
When se ejecuta la query  
Then MUST solicitarse la página inicial con los parámetros contractuales

### Scenario 21: Filtro por concurso

Given un concurso seleccionado  
When cambia el filtro  
Then MUST enviarse su identificador contractual y reiniciarse la página

### Scenario 22: Filtro por resultado

Given un resultado seleccionado  
When cambia el filtro  
Then MUST enviarse su valor contractual y reiniciarse la página

### Scenario 23: Combinación de filtros

Given concurso y resultado seleccionados  
When se ejecuta la query  
Then ambos MUST formar parte del request y la query key

### Scenario 24: Limpiar filtros

Given filtros activos  
When el usuario selecciona limpiar  
Then ambos filtros MUST retirarse y la página MUST volver al inicio

### Scenario 25: Cambio de página

Given una respuesta con más de una página  
When el usuario cambia de página  
Then MUST consultarse el backend conservando ambos filtros

### Scenario 26: Última página parcial

Given una última página con menos filas que el page size  
When se renderiza  
Then MUST mostrarse únicamente la cantidad recibida y la metadata real

### Scenario 27: Página fuera de rango

Given filtros que reducen el total por debajo de la página actual  
When se aplica el filtro  
Then la página MUST reiniciarse o corregirse según la política definida

### Scenario 28: Empty UJ-20

Given la respuesta global contiene cero envíos  
When termina la query  
Then MUST mostrarse el empty state de UJ-20

### Scenario 29: Error UJ-20

Given el endpoint global falla  
When termina la query  
Then MUST mostrarse un error acotado y la navegación MUST permanecer

### Scenario 30: Loading UJ-20

Given la query global está pendiente  
When se renderiza  
Then MUST mostrarse loading sin filas ficticias

### Scenario 31: Solo envíos propios

Given un usuario autenticado  
When se consulta UJ-20  
Then el frontend MUST utilizar el endpoint autenticado y MUST no aceptar un userId arbitrario desde la UI

### Scenario 32: Tres tablas diferenciadas

Given el proyecto contiene tabla reciente, tabla por concurso y tabla global  
When se integran rutas y servicios  
Then cada tabla MUST conservar su endpoint, alcance, filtros y paginación

### Scenario 33: Mapper de veredictos

Given un resultado contractual conocido  
When se renderiza una fila UJ-20  
Then MUST utilizarse el mapper visual vigente compatible

### Scenario 34: Responsive UJ-20

Given un viewport móvil  
When se renderizan filtros, tabla y paginación  
Then MUST mantenerse la navegación y un mecanismo accesible de scroll o adaptación

### Scenario 35: Acceso administrativo a UJ-20 no confirmado

Given que no existe evidencia de UJ-20 bajo Acceso de Usuario  
When se implementa este change  
Then MUST mantenerse fuera del contexto administrativo

## Edge Cases

- Un archivo documentado fue movido.
- Un archivo existe con casing diferente.
- La historia documenta un archivo eliminado.
- Existen dos implementaciones parciales de la misma página.
- Un rol visible no coincide con el valor backend.
- El JWT expresa roles como array o string.
- El usuario autenticado aparece en la lista de administración.
- Backend permite o prohíbe autoedición.
- Backend impide revocar al último administrador.
- Asignar un rol existente es idempotente.
- Revocar un rol ausente es idempotente.
- Una mutation termina después de abandonar la página.
- La invalidación usa una key incompleta.
- El endpoint de UJ-20 devuelve valores de resultado no contemplados.
- El filtro de concursos utiliza código, ID u otra clave.
- El filtro Todos se serializa como ausencia o valor específico.
- La página actual deja de existir después de filtrar.
- El total cambia durante refresh.
- El endpoint global comparte DTO con el resumen reciente, pero no page size.
- Los tests usan mocks más permisivos que backend.
- La tabla global omite una columna que otras tablas muestran.
- Existe navegación administrativa para UJ-20 creada por un change previo.

## Acceptance Criteria

- La matriz de trazabilidad MUST completarse con los archivos reales.
- UJ-07 MUST estar conectada a ruta, sidebar y guard.
- UJ-07 MUST permanecer bajo AdminLayout.
- Asignar y revocar ambos roles contractuales MUST persistir.
- Usuario no autorizado MUST no acceder.
- La caché MUST actualizarse sin reload.
- UJ-20 MUST estar conectada a ruta y navegación.
- UJ-20 MUST permanecer bajo UserLayout.
- Filtro de concurso MUST funcionar contra backend.
- Filtro de resultado MUST funcionar contra backend.
- La combinación MUST funcionar.
- Limpiar MUST funcionar.
- La paginación MUST ser contractual.
- Solo MUST mostrarse información del usuario autenticado.
- Las tres tablas MUST conservar responsabilidades distintas.
- Estilos y componentes existentes MUST preservarse.
- No MUST agregarse funcionalidad ajena.
- Lint, typecheck, tests y build MUST pasar.
- La documentación MUST diferenciar trabajo original e integración.

## Out of Scope

- Ranking.
- Cambios de autenticación o roles globales.
- Nuevas capacidades administrativas.
- Nuevos filtros UJ-20.
- Cambios de juez o veredictos.
- Cambios de inscripción.
- Migración de router.
- Dependencias npm.
- Refactor masivo de tablas.
- Backend no contractual.
