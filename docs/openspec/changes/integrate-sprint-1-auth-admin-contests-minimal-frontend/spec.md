# Spec

## Requirements

### Change Identity Requirements

- El change MUST llamarse exactamente `integrate-sprint-1-auth-admin-contests-minimal-frontend`.
- El change MUST residir en `docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/`.
- El change MUST integrar únicamente el alcance mínimo de Sprint 1 descrito.
- El change MUST NOT convertirse en un refactor general de autenticación, routing o concursos.
- El change MUST NOT modificar otros changes OpenSpec.
- El change MUST NOT utilizar OpenSpec CLI.

### Session Storage Requirements

- El token MUST almacenarse bajo la clave `token`.
- El valor almacenado MUST ser únicamente el token.
- El frontend MUST utilizar `sessionStorage.setItem('token', token)` o su equivalente exacto.
- El frontend MUST NOT almacenar un objeto JSON para la sesión.
- El frontend MUST NOT guardar una copia adicional obligatoria del token en memoria.
- El frontend MUST NOT guardar el token en variables de entorno.
- El frontend MUST NOT guardar tokens reales en mocks, código o documentación.
- La sesión MUST persistir durante una recarga de la pestaña mientras `sessionStorage` conserve el valor.
- Cerrar o limpiar la sesión del navegador MAY eliminar la sesión conforme al comportamiento de `sessionStorage`.

### AuthTransport Requirements

- El cliente HTTP compartido MUST continuar siendo el único cliente de aplicación.
- El change MUST reutilizar `AuthTransport`.
- El change MUST reutilizar `configureHttpClientAuthTransport(...)`.
- El transporte MUST consultar el token dinámicamente en cada request.
- Con token presente, el transporte MUST producir `Bearer <token>`.
- Sin token, el transporte MUST omitir el header de autorización.
- El transporte MUST NOT producir `Bearer null`.
- El transporte MUST NOT producir `Bearer undefined`.
- El transporte MUST NOT lanzar un error cuando `sessionStorage` no esté disponible.
- El transporte MUST ser compatible con navegador, Vitest y MSW.
- El transporte MUST configurarse una única vez.
- La configuración MUST ejecutarse antes de requests protegidos.
- El change MUST NOT crear un segundo cliente HTTP.
- El change MUST NOT introducir Axios.
- El change MUST NOT utilizar `fetch` fuera de `frontend/src/lib/api/http-client.ts`.

### Login Requirements

- `/login` MUST continuar renderizando el formulario existente.
- El login MUST utilizar el servicio existente.
- El login MUST utilizar el campo real del token confirmado por el contrato.
- El login MUST NOT aceptar simultáneamente formatos inventados de token.
- Después de un login exitoso, el token MUST guardarse en `sessionStorage['token']`.
- Después de guardar el token, el router MUST navegar a `/admin/dashboard`.
- El login MUST NOT navegar canónicamente a `/dashboard`.
- El login MUST NOT decodificar el JWT.
- El login MUST NOT decidir navegación por roles.
- El login MUST NOT crear un AuthProvider.

### Registration Requirements

- `/register` MUST continuar siendo pública.
- El registro MUST continuar utilizando la implementación existente.
- El registro exitoso MUST permitir continuar hacia `/login`.
- El registro MUST NOT iniciar sesión automáticamente.
- El registro MUST NOT requerir un token.
- El change MUST NOT ampliar las validaciones funcionales del registro.
- Solo se MAY modificar registro para resolver incompatibilidades de imports, tipos, tests o build directamente relacionadas.

### ProtectedRoute Requirements

- El change MUST reutilizar el `ProtectedRoute` existente.
- El change MUST NOT crear un segundo guard.
- El guard MUST comprobar únicamente la existencia actual del token.
- Con token, el guard MUST renderizar la ruta protegida.
- Sin token, el guard MUST redirigir a `/login`.
- El guard MUST consultar un valor actualizado después de una recarga.
- El guard MUST NOT validar roles.
- El guard MUST NOT validar claims.
- El guard MUST NOT verificar criptográficamente el JWT.
- El guard MUST NOT consultar `/me`.
- El guard MUST NOT implementar refresh.
- El guard MUST NOT agregar loading global.

### Routing Requirements

- El router MUST incluir `/login`.
- El router MUST incluir `/register`.
- El router MUST incluir `/admin/dashboard`.
- El router MUST incluir `/admin/contests`.
- El router MUST incluir `/admin/contests/new`.
- El router MUST preservar `/dev/ui`.
- El router MUST preservar la ruta comodín `*`.
- `/login` y `/register` MUST ser públicas.
- `/admin/dashboard`, `/admin/contests` y `/admin/contests/new` MUST utilizar `ProtectedRoute`.
- `/dashboard` MAY conservarse únicamente como redirect.
- El redirect de `/dashboard` MUST apuntar a `/admin/dashboard`.
- `/dashboard` MUST NOT seguir siendo el destino canónico del login.
- El routing MUST utilizar React Router.
- El routing MUST NOT utilizar `window.location.href`.

### Dashboard Requirements

- `/admin/dashboard` MUST renderizar el dashboard administrativo existente.
- El dashboard MUST utilizar `AdminLayout` según la composición existente.
- El dashboard MUST mostrar una acción visible `Crear concurso`.
- La acción MUST navegar a `/admin/contests/new`.
- La acción MUST utilizar React Router.
- Si el botón ya existe, el change MUST corregir únicamente su destino o integración.
- Si no existe, el change MAY agregar un único Button compartido.
- El change MUST NOT agregar nuevas estadísticas.
- El change MUST NOT agregar nuevas tarjetas.
- El dashboard MUST NOT implementar roles.

### Administration Page Requirements

- `/admin/contests` MUST dejar de renderizar el placeholder.
- `/admin/contests` MUST renderizar la implementación administrativa existente.
- La pantalla MUST compilar y renderizar.
- La pantalla MUST utilizar servicios respaldados por operaciones reales.
- La pantalla MUST permitir navegación hacia `/admin/contests/new`.
- La pantalla MUST NOT inventar endpoints.
- La pantalla MUST NOT inventar estados.
- La pantalla MUST NOT ampliar filtros.
- Imports inexistentes MUST eliminarse o reemplazarse por imports reales.
- Funciones duplicadas para una misma operación MUST consolidarse en una sola.
- El código MUST NOT utilizar `any` para ocultar incompatibilidades.
- El código MUST NOT comentar bloques completos para compilar.
- Si un bloque visual depende de datos inexistentes, el bloque MAY simplificarse o retirarse.
- La pantalla MUST NOT rediseñarse.

### AdminContestsPage Movement Requirements

- La página administrativa MUST residir dentro de `frontend/src/features/contests/pages/`.
- El nombre final MUST respetar el nombre funcional y casing predominante del proyecto.
- Todos los imports MUST actualizarse.
- El router MUST importar desde la nueva ubicación.
- El archivo anterior en `frontend/src/pages/` MUST eliminarse después de verificar consumidores.
- El change MUST NOT dejar copia, wrapper o reexport innecesario.
- El movimiento MUST preservar el comportamiento existente.

### Contests Organization Requirements

- La reorganización MUST limitarse a la feature de concursos y a `AdminContestsPage`.
- Solo MUST crearse una carpeta cuando contenga archivos reales.
- El change MUST NOT crear carpetas vacías.
- El change MUST NOT crear barrels innecesarios.
- El change MUST NOT dividir archivos pequeños sin beneficio.
- El change MUST NOT reorganizar auth por estética.
- El change MUST mantener imports mediante el alias existente.
- La feature MUST utilizar un único casing por categoría.
- No MUST coexistir `Pages` y `pages`.
- No MUST coexistir `Components` y `components`.
- La reorganización SHOULD limitarse a páginas, componentes, hooks, servicios, schemas, mappers, types y constants que ya existan.
- El change MUST NOT mover archivos de otras features.

### Contest Creation Requirements

- `/admin/contests/new` MUST continuar renderizando la implementación validada.
- El diseño de creación MUST permanecer sin cambios.
- Las validaciones MUST permanecer sin cambios.
- El comportamiento de contraseña pública MUST permanecer sin cambios.
- El límite y selector ZIP MUST permanecer sin cambios.
- Los problemas dinámicos y resumen MUST permanecer sin cambios.
- El mapper multipart MUST permanecer funcionalmente sin cambios.
- La respuesta `{ codigo, mensaje }` MUST conservarse.
- El request MUST continuar utilizando POST.
- El request MUST continuar utilizando `/api/Concursos/crear`.
- El request MUST continuar utilizando `multipart/form-data`.
- El Bearer MUST agregarse automáticamente mediante AuthTransport.
- CreateContestPage MUST NOT recibir el token.
- El hook MUST NOT recibir el token.
- El servicio MUST NOT recibir el token.
- El mapper MUST NOT recibir el token.
- El change MAY modificar imports por reorganización.
- El change MAY corregir únicamente errores de tipos, build o tests relacionados con la integración.

### Logout Requirements

- Si existe una acción de logout, MUST eliminar `sessionStorage['token']`.
- Después de eliminar el token, el AuthTransport MUST dejar de agregar Bearer.
- El change MUST NOT crear una nueva acción visible de logout si no existe.
- El change MUST NOT crear un endpoint de logout.
- El change MUST NOT implementar logout avanzado.

### Endpoint Requirements

- Las rutas API MUST continuar centralizadas.
- La fuente central MUST representar las operaciones reales de:
  - login;
  - registro;
  - listado de concursos disponible;
  - creación de concurso.
- Los componentes MUST NOT contener endpoints.
- Las rutas MUST NOT ser absolutas.
- Las rutas MUST NOT contener `localhost`.
- Las rutas MUST NOT duplicar `/api`.
- El change MUST NOT inventar un endpoint administrativo.
- Una operación MUST tener una única función de servicio efectiva.

### TypeScript Requirements

- Pi MUST inspeccionar el mensaje completo de `TS5101`.
- La corrección MUST aplicarse en `tsconfig.app.json` o en el área directamente indicada.
- La corrección MUST ser compatible con la versión instalada de TypeScript.
- El cambio MUST limitarse a la opción causante.
- El change MUST NOT actualizar TypeScript.
- El change MUST NOT bajar TypeScript.
- El change MUST NOT cambiar Vite.
- El change MUST NOT reemplazar la configuración completa.
- El change MUST NOT silenciar errores generales.
- La modificación exacta MUST documentarse en el reporte de apply o verificación.
- Después de la corrección, `npm run typecheck` MUST pasar.
- Después de la corrección, `npm run build` MUST pasar.

### Test Requirements

- El change MUST utilizar la suite existente.
- El change MUST NOT crear archivos de test.
- El change MUST NOT agregar casos de test.
- El change MUST NOT aumentar deliberadamente la cantidad total.
- El change MUST NOT borrar tests.
- El change MUST NOT reducir la cantidad total.
- El change MUST NOT usar `.skip`.
- El change MUST NOT usar `.only`.
- El change MUST NOT comentar assertions.
- El change MUST NOT debilitar assertions para ocultar defectos.
- El change MUST NOT utilizar `--updateSnapshot`.
- Pi MUST registrar el conteo inicial real.
- Pi MUST identificar individualmente los tests fallidos.
- Pi MUST corregir producción antes de modificar tests.
- Un test MAY modificarse cuando represente un import, ruta, mock o contrato anterior confirmado.
- El conteo final MUST ser igual al conteo inicial.
- El resultado final MUST tener cero tests fallidos.
- Si el conteo inicial es 65, el resultado MUST ser 65 pasados y 0 fallidos.

### MSW Requirements

- Solo se MAY ajustar handlers existentes.
- El handler de login MUST devolver el campo real del token.
- El handler MUST utilizar un token falso claramente reconocible.
- El handler MUST NOT utilizar credenciales reales.
- El change MUST NOT agregar escenarios MSW nuevos.
- El handler de creación MUST conservar su comportamiento actual salvo incompatibilidad directa.
- El change MUST NOT agregar una nueva prueba específica de Bearer.
- MSW MUST NOT simular roles completos.

### Formatting Requirements

- El change MUST limitar el formato a archivos modificados o movidos.
- El change MUST NOT reformatear masivamente los archivos preexistentes detectados.
- Archivos con imports modificados MAY formatearse.
- `npm run format:check` MUST ejecutarse.
- Los archivos tocados MUST cumplir formato.
- Si el comando global falla solo por deuda preexistente, Pi MUST enumerar los archivos no tocados responsables.
- La deuda preexistente MUST NOT utilizarse para ampliar el diff.
- El change MUST NOT ejecutar `--fix` global.

### Protected Area Requirements

- El change MUST NOT modificar `backend/`.
- El change MUST NOT modificar `database/`.
- El change MUST NOT modificar `README.md`.
- El change MUST NOT modificar `frontend/README.md`.
- El change MUST NOT modificar documentos académicos.
- El change MUST NOT modificar otros changes.
- El change MUST NOT agregar dependencias.
- El change MUST NOT realizar commit.
- El change MUST NOT realizar push.

## Behavior Scenarios

### Scenario 1: Registro público

Given que no existe token en sessionStorage  
When el usuario abre `/register`  
Then la página MUST renderizarse sin redirigir a login ni requerir autorización

### Scenario 2: Registro exitoso

Given datos de registro válidos  
When el backend confirma el registro  
Then el usuario MUST poder continuar hacia `/login` y MUST NOT iniciar sesión automáticamente

### Scenario 3: Login exitoso

Given credenciales válidas y una respuesta con el campo contractual del token  
When el login finaliza  
Then el token MUST guardarse exactamente en `sessionStorage['token']` y el router MUST navegar a `/admin/dashboard`

### Scenario 4: Token disponible para el siguiente request

Given que el login acaba de guardar el token  
When una feature emite el siguiente request protegido  
Then AuthTransport MUST leer el token actualizado y agregar `Authorization: Bearer <token>`

### Scenario 5: Request sin sesión

Given que `sessionStorage['token']` no existe  
When el cliente HTTP crea un request  
Then AuthTransport MUST omitir Authorization

### Scenario 6: Recarga con sesión

Given que existe un token guardado  
When el usuario recarga `/admin/dashboard`  
Then ProtectedRoute MUST permitir la ruta y los requests protegidos MUST continuar usando Bearer

### Scenario 7: Entorno sin sessionStorage

Given que el código se ejecuta en un entorno de test sin almacenamiento disponible  
When AuthTransport consulta autorización  
Then MUST retornar un estado neutral sin romper la suite

### Scenario 8: Logout existente

Given que existe una acción de logout y hay un token almacenado  
When la acción elimina `sessionStorage['token']`  
Then los requests posteriores MUST omitir Bearer

### Scenario 9: Dashboard sin sesión

Given que no existe token  
When el usuario abre `/admin/dashboard`  
Then ProtectedRoute MUST redirigir a `/login`

### Scenario 10: Administración sin sesión

Given que no existe token  
When el usuario abre `/admin/contests`  
Then ProtectedRoute MUST redirigir a `/login`

### Scenario 11: Creación sin sesión

Given que no existe token  
When el usuario abre `/admin/contests/new`  
Then ProtectedRoute MUST redirigir a `/login`

### Scenario 12: Dashboard canónico

Given una sesión disponible  
When el usuario abre `/admin/dashboard`  
Then MUST renderizarse el dashboard administrativo existente dentro de la composición vigente

### Scenario 13: Compatibilidad con dashboard anterior

Given que un enlace antiguo navega a `/dashboard`  
When el router resuelve la ruta  
Then MUST redirigir a `/admin/dashboard`

### Scenario 14: Acción Crear concurso

Given que el usuario está en el dashboard  
When activa `Crear concurso`  
Then React Router MUST navegar a `/admin/contests/new` sin utilizar `window.location.href`

### Scenario 15: Administración real de concursos

Given que el usuario tiene una sesión  
When abre `/admin/contests`  
Then MUST renderizarse la implementación existente y no el placeholder

### Scenario 16: Navegación desde administración

Given que la pantalla administrativa se renderiza  
When el usuario activa la acción de crear concurso  
Then MUST navegar a `/admin/contests/new`

### Scenario 17: Página movida

Given que `AdminContestsPage` fue trasladada a la feature  
When se ejecuta una búsqueda de imports  
Then todos MUST apuntar a la nueva ubicación y no MUST quedar una copia en `src/pages/`

### Scenario 18: Servicio administrativo válido

Given imports duplicados o inexistentes de listado  
When se integra la pantalla  
Then MUST conservarse una única operación respaldada por el endpoint real

### Scenario 19: Contrato administrativo insuficiente

Given que una sección visual requiere datos no expuestos  
When Pi integra la pantalla  
Then MAY simplificar o retirar únicamente esa sección y MUST NOT inventar datos

### Scenario 20: Creación autenticada

Given una sesión con token y un formulario válido  
When se envía `POST /api/Concursos/crear`  
Then el request MUST incluir `Authorization: Bearer <token>` sin pasar el token por página, hook, servicio o mapper

### Scenario 21: Creación visualmente intacta

Given la integración del transporte y la reorganización de imports  
When se abre `/admin/contests/new`  
Then su diseño, validaciones, ZIP, problemas, resumen y respuesta MUST permanecer sin cambios funcionales

### Scenario 22: Corrección TS5101

Given el mensaje completo de TS5101  
When se aplica el ajuste mínimo a la opción causante  
Then typecheck y build MUST continuar evaluando el resto de errores sin una supresión general

### Scenario 23: Suite inicial

Given el workspace antes de cambios  
When se ejecuta la suite  
Then Pi MUST registrar el número total y los tests fallidos

### Scenario 24: Suite final

Given la integración completada  
When se ejecuta `npm run test:run`  
Then el total MUST ser igual al inicial y todos los tests MUST pasar

### Scenario 25: Test con ruta anterior

Given un test existente que espera `/dashboard` como destino de login  
When `/admin/dashboard` se convierte en ruta canónica  
Then el test MAY actualizarse para reflejar el contrato nuevo sin reducir sus assertions

### Scenario 26: Handler de login obsoleto

Given un handler existente que devuelve un nombre de token incompatible  
When se confirma el contrato real  
Then el handler MAY ajustarse para que los tests existentes reproduzcan ese contrato

### Scenario 27: Formato preexistente

Given que format:check detecta archivos no tocados  
When los archivos modificados cumplen formato  
Then Pi MUST reportar los archivos preexistentes restantes y MUST NOT reformatearlos masivamente

### Scenario 28: Dev server

Given lint, typecheck, tests y build exitosos  
When se ejecuta `npm run dev`  
Then la aplicación MUST iniciar y permitir validar manualmente el flujo Sprint 1

## Edge Cases

- `sessionStorage.getItem('token')` devuelve una cadena vacía.
- El token contiene espacios accidentales al inicio o final.
- El login recibe una respuesta exitosa sin el campo contractual del token.
- El handler MSW y el servicio real utilizan nombres de propiedad distintos.
- El bootstrap se ejecuta dos veces bajo StrictMode o hot reload.
- El transporte se configura después de montar React.
- Un test importa el transporte antes de que exista `window`.
- El token se elimina entre la construcción y el envío de un request.
- La aplicación se abre directamente en una ruta protegida.
- `/dashboard` está registrado como página y redirect simultáneamente.
- ProtectedRoute conserva una copia antigua del token.
- El dashboard ya contiene un enlace que usa `window.location.href`.
- `AdminLayout` ya se aplica desde una ruta padre y la página intenta duplicarlo.
- `AdminContestsPage` tiene consumidores fuera del router.
- Existen simultáneamente `AdminContestPage` y `AdminContestsPage`.
- Existen carpetas `Pages` y `pages`.
- `listConcursos` y `listConcursosAdmin` llaman a rutas diferentes.
- El listado real devuelve menos campos que la UI.
- La pantalla administrativa depende de datos mock fuera de MSW.
- Mover archivos cambia imports relativos en tests.
- `TS5101` proviene de una opción diferente a la esperada.
- Resolver TS5101 revela errores TypeScript adicionales.
- El conteo real de tests no es 65.
- Un test fallido es intermitente y no está relacionado con integración.
- `format:check` falla por archivos movidos además de deuda preexistente.
- La ruta `/dev/ui` depende del árbol de rutas modificado.
- El backend devuelve 401 por token expirado aunque ProtectedRoute permita la página.
- Un usuario autenticado carece de rol para crear concursos.
- No existe una acción visible de logout.

## Acceptance Criteria

- El token MUST permanecer como string en `sessionStorage['token']`.
- AuthTransport MUST leerlo dinámicamente.
- Con token, el request MUST contener Bearer.
- Sin token, el request MUST omitir Authorization.
- El transporte MUST configurarse una única vez durante bootstrap.
- Los tests MUST poder ejecutar el transporte sin errores de entorno.
- Login MUST navegar a `/admin/dashboard`.
- Registro MUST continuar público.
- Registro MUST no iniciar sesión automáticamente.
- `/admin/dashboard` MUST estar protegido.
- `/admin/contests` MUST estar protegido.
- `/admin/contests/new` MUST estar protegido.
- Sin token, cada ruta protegida MUST redirigir a `/login`.
- `/dashboard` MUST redirigir a `/admin/dashboard`.
- El dashboard MUST mostrar `Crear concurso`.
- La acción MUST navegar mediante React Router.
- `/admin/contests` MUST renderizar la pantalla real.
- AdminContestsPage MUST quedar dentro de `features/contests/pages/`.
- No MUST quedar una copia innecesaria en `src/pages/`.
- Los imports de contests MUST resolver.
- La feature MUST usar casing consistente.
- No MUST crearse carpetas vacías o barrels innecesarios.
- El servicio administrativo MUST utilizar un endpoint real.
- No MUST existir un endpoint inventado.
- La creación de concursos MUST permanecer funcionalmente intacta.
- El request de creación MUST recibir Bearer automáticamente.
- Ninguna capa de creación MUST recibir manualmente el token.
- TS5101 MUST quedar resuelto mediante un cambio mínimo.
- `npm run lint` MUST pasar.
- `npm run typecheck` MUST pasar.
- `npm run test:run` MUST tener cero fallos.
- La cantidad final de tests MUST coincidir con la inicial.
- `npm run build` MUST pasar.
- `npm run dev` MUST iniciar.
- No MUST agregarse ningún test.
- No MUST eliminarse ningún test.
- No MUST introducirse `.skip` o `.only`.
- Los archivos tocados MUST cumplir formato.
- La deuda de formato preexistente MUST documentarse sin reformateo global.
- `/dev/ui` MUST continuar funcionando.
- No MUST agregarse ninguna dependencia.
- No MUST modificarse backend, database, README, manual frontend, documentos académicos u otros changes.
- No MUST realizarse commit o push.

## Out of Scope

- Arquitectura definitiva de sesión.
- Refresh, expiración, claims y roles.
- AuthProvider o stores globales.
- Interceptor global de 401.
- Nuevas historias o tests.
- Nuevos endpoints administrativos.
- Rediseño de pantallas.
- Cambios funcionales en creación de concursos.
- Refactor global de contests o auth.
- Corrección global de formato.
- Backend y base de datos.
