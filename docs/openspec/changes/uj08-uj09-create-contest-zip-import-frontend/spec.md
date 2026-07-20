# Spec

## Requirements

### Change Identity Requirements

- El change MUST llamarse exactamente `uj08-uj09-create-contest-zip-import-frontend`.
- El change MUST ubicarse en `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/`.
- UJ-08 y UJ-09 MUST implementarse como un único change.
- La creación del concurso, sus problemas y el ZIP MUST enviarse en una única solicitud.
- El change MUST NOT implementar otras historias.

### Contract Verification Requirements

- Pi MUST inspeccionar OpenAPI antes de modificar código productivo.
- OpenAPI MUST ser la fuente principal para método, ruta, DTO, códigos de respuesta y autenticación.
- Pi MUST confirmar el endpoint reportado `POST Concursos/crear`.
- Pi MUST confirmar que el endpoint utiliza `multipart/form-data`.
- Pi MUST confirmar los nombres exactos de los campos multipart.
- Pi MUST confirmar la forma de `listaProblemas`.
- Pi MUST confirmar la respuesta exitosa con `codigo` y `mensaje`.
- Pi MUST confirmar los errores y el esquema Bearer.
- Si el contrato cambió, Pi MUST regenerar los tipos OpenAPI.
- `api.generated.ts` MUST NOT editarse manualmente.
- Si OpenAPI no está disponible, las tareas contractuales MUST detenerse.
- Pi MUST NOT inventar un contrato alternativo.

### Page and Routing Requirements

- `/admin/contests/new` MUST renderizar `CreateContestPage` o su equivalente.
- La ruta MUST utilizar la constante compartida existente.
- La página MUST renderizarse como contenido del `AdminLayout` existente.
- La página MUST NOT crear un segundo layout administrativo.
- La página MUST NOT implementar sidebar.
- La página MUST NOT implementar topbar.
- La página MUST NOT modificar la navegación lateral.
- La página MUST incluir Breadcrumbs con:
  - `Administración`;
  - `Concursos`;
  - `Nuevo concurso`.
- La página MUST mostrar el título `Crear concurso`.
- La página MUST explicar que permite configurar datos, problemas y ZIP.
- Cancelar MUST navegar a `/admin/contests`.
- El change MUST NOT implementar la página destino de listado.
- Las demás rutas MUST continuar funcionando.
- `/dev/ui` MUST continuar funcionando en desarrollo.

### Layout Requirements

- La página MUST utilizar una sola pantalla.
- La página MUST NOT utilizar wizard.
- La página MUST NOT utilizar pasos de navegación.
- En escritorio, la página SHOULD utilizar dos columnas.
- La columna principal MUST contener el formulario.
- La columna secundaria MUST contener el resumen.
- El resumen MAY utilizar posición sticky cuando no afecte accesibilidad.
- En móvil, la página MUST utilizar una sola columna.
- En móvil, el resumen MUST aparecer dentro del flujo antes o cerca de las acciones finales.
- La interfaz MUST utilizar tokens y componentes visuales existentes.
- La interfaz MUST mantener una presentación minimalista y profesional.

### General Information Requirements

- El formulario MUST incluir `nombre`.
- `nombre` MUST ser obligatorio.
- `nombre` MUST aplicarse con `trim`.
- El formulario MUST incluir `descripcion`.
- `descripcion` MUST ser obligatoria.
- `descripcion` MUST aplicarse con `trim`.
- El formulario MUST incluir `codigo`.
- `codigo` MUST ser obligatorio.
- `codigo` MUST aplicarse con `trim`.
- El frontend MUST NOT imponer un patrón restrictivo de código sin contrato.
- La sección MUST NOT incluir portada, institución, tipo, reglamento o espectadores.

### Scheduling Requirements

- El formulario MUST incluir `fechaInicio`.
- `fechaInicio` MUST ser obligatoria.
- El control SHOULD utilizar una entrada apropiada para fecha y hora local.
- La fecha MUST convertirse al formato esperado por el backend.
- La conversión MUST estar aislada y probada.
- La conversión MUST NOT inventar una zona horaria distinta.
- El formulario MUST incluir `duracionMinutos`.
- `duracionMinutos` MUST ser un entero mayor que cero.
- El formulario MUST incluir `minutosCongelamiento`.
- `minutosCongelamiento` MUST ser un entero mayor o igual a cero.
- `minutosCongelamiento` MUST ser menor o igual a `duracionMinutos`.

### Access Requirements

- El formulario MUST incluir una contraseña opcional.
- La contraseña MUST utilizar el `PasswordInput` compartido.
- Una contraseña vacía MUST representar modalidad pública.
- Una contraseña con valor MUST representar modalidad privada.
- La modalidad MUST mostrarse como información derivada.
- La modalidad MUST NOT enviarse como campo separado.
- El formulario MUST NOT solicitar confirmación de contraseña.
- El resumen MUST NOT mostrar la contraseña.
- El frontend MUST NOT almacenar la contraseña fuera del estado temporal del formulario.

### Problem List Requirements

- El formulario MUST incluir `listaProblemas`.
- La lista MUST administrarse mediante React Hook Form y `useFieldArray`.
- La lista MUST contener al menos un problema.
- La lista MUST contener como máximo 26 problemas.
- Cada problema MUST incluir inciso, título, tiempo y memoria.
- El inciso MUST derivarse automáticamente de la posición.
- El primer inciso MUST ser `A`.
- El segundo inciso MUST ser `B`.
- Los incisos MUST continuar secuencialmente hasta `Z`.
- Los incisos MUST ser únicos.
- Los incisos MUST NOT editarse manualmente.
- Al eliminar un problema, los incisos MUST recalcularse.
- El título MUST ser obligatorio.
- El título MUST aplicarse con `trim`.
- El tiempo MUST ser mayor que cero.
- La etiqueta MUST indicar `Tiempo límite (segundos)`.
- La memoria MUST ser un entero mayor que cero.
- La etiqueta MUST indicar `Memoria límite (MB)`.
- El usuario MUST poder agregar problemas hasta el límite.
- El usuario MUST poder eliminar problemas sin dejar la lista vacía.
- La UI MUST mostrar claramente cada inciso.
- La UI MUST NOT implementar drag and drop para reordenar.
- La UI MUST NOT implementar un editor avanzado.

### Resource and ZIP Requirements

- El formulario MUST incluir `urlSetProblemas`.
- `urlSetProblemas` MUST ser obligatorio.
- `urlSetProblemas` MUST ser una URL válida.
- El formulario MUST incluir `archivoZip`.
- `archivoZip` MUST ser obligatorio.
- El archivo MUST seleccionarse mediante el `FileDropzone` existente.
- El selector MUST aceptar `.zip`.
- El frontend MUST validar la extensión ZIP.
- El frontend MUST NOT inventar un límite máximo de tamaño.
- El frontend MUST NOT descomprimir el archivo.
- El frontend MUST NOT inspeccionar carpetas o pares `.in/.out`.
- El frontend MUST NOT agregar JSZip.
- La UI SHOULD mostrar los incisos esperados para el ZIP.
- La ayuda MUST actualizarse cuando cambie la lista de problemas.

### Summary Requirements

- El resumen MUST mostrar nombre.
- El resumen MUST mostrar código.
- El resumen MUST mostrar fecha de inicio.
- El resumen MUST mostrar duración.
- El resumen MUST mostrar minutos de congelamiento.
- El resumen MUST mostrar modalidad.
- El resumen MUST mostrar cantidad de problemas.
- El resumen MUST mostrar incisos esperados.
- El resumen MUST mostrar el nombre del ZIP seleccionado.
- El resumen MUST NOT mostrar contraseña.
- El resumen MUST NOT mostrar JWT.
- El resumen MUST NOT mostrar contenido del ZIP.
- El resumen SHOULD reutilizar `Card`, `Badge` y `Divider`.

### Form Schema Requirements

- Zod MUST definir las validaciones de cliente.
- React Hook Form MUST administrar el estado del formulario.
- El schema MUST validar todas las reglas confirmadas.
- El schema MUST aplicar validación cruzada entre duración y congelamiento.
- El schema MUST validar cantidad de problemas.
- El schema MUST validar el archivo ZIP.
- Los mensajes MUST ser comprensibles.
- El backend MUST conservar la validación definitiva.
- El schema MUST NOT duplicar validaciones profundas del ZIP.

### FormData Requirements

- La construcción de `FormData` MUST estar fuera de la página.
- La construcción SHOULD residir en un mapper de la feature.
- El mapper MUST recibir el tipo de estado del formulario.
- El mapper MUST producir el payload contractual.
- El mapper MUST incluir:
  - `nombre`;
  - `descripcion`;
  - `fechaInicio`;
  - `duracionMinutos`;
  - `contrasena`;
  - `urlSetProblemas`;
  - `minutosCongelamiento`;
  - `codigo`;
  - `archivoZip`.
- Una contraseña vacía MUST enviarse como cadena vacía.
- Los números MUST serializarse en un formato compatible con el backend.
- Cada problema MUST utilizar claves indexadas:
  - `listaProblemas[n].inciso`;
  - `listaProblemas[n].titulo`;
  - `listaProblemas[n].tiempo`;
  - `listaProblemas[n].memoria`.
- Los índices MUST ser consecutivos.
- El mapper MUST utilizar los incisos derivados actuales.
- `archivoZip` MUST adjuntarse bajo el nombre contractual confirmado.
- El cliente MUST NOT establecer manualmente `Content-Type: multipart/form-data`.
- El navegador MUST generar el boundary.
- El tipo de formulario MUST permanecer separado del DTO backend.

### API Service Requirements

- El endpoint confirmado MUST agregarse a la fuente central de endpoints.
- La ruta MUST ser relativa.
- El servicio MUST utilizar el cliente HTTP compartido.
- El servicio MUST utilizar el endpoint centralizado.
- El servicio MUST utilizar el mapper de `FormData`.
- El servicio MUST ejecutar POST.
- El servicio MUST NOT utilizar `fetch`.
- El servicio MUST NOT utilizar Axios.
- El servicio MUST NOT contener `http://localhost:5185`.
- El servicio MUST NOT duplicar normalización de errores.
- El servicio MUST devolver la respuesta tipada confirmada.

### Authorization Requirements

- La solicitud MUST utilizar la infraestructura `AuthTransport` existente.
- El Bearer MUST obtenerse mediante la abstracción existente.
- La página MUST NOT conocer el token.
- El token MUST NOT recibirse como prop.
- El token MUST NOT hardcodearse.
- El token MUST NOT leerse desde `localStorage`.
- El token MUST NOT leerse desde `sessionStorage`.
- El change MUST NOT crear un provider de autenticación.
- El change MUST NOT implementar login.
- El change MUST NOT implementar persistencia de sesión.
- El frontend MUST NOT enviar un identificador manual del creador.
- El backend MUST identificar al creador desde el JWT.

### Mutation Requirements

- La creación MUST utilizar `useMutation`.
- La creación MUST NOT utilizar `useQuery`.
- El hook MUST encapsular el servicio.
- El hook SHOULD exponer el resultado estándar de TanStack Query.
- El hook MUST exponer `isPending`.
- El hook MUST exponer el resultado exitoso.
- El hook MUST exponer el error normalizado.
- El hook MUST permitir resetear el estado.
- El hook MUST NOT crear otro `QueryClient`.
- El hook MUST NOT invalidar una query de listado inexistente.
- La integración con el listado MUST permanecer fuera de alcance.

### Action Requirements

- La página MUST incluir `Cancelar`.
- La página MUST incluir `Crear concurso`.
- La página MUST NOT incluir acciones de borrador.
- La página MUST NOT incluir acciones de wizard.
- Durante el envío, `Crear concurso` MUST mostrar loading.
- Durante el envío, `Crear concurso` MUST permanecer deshabilitado.
- El formulario MUST impedir doble envío.
- Cancelar MUST utilizar navegación del router.
- Cancelar SHOULD advertir sobre datos no guardados solo si existe un patrón ya establecido; no debe introducirse un sistema global nuevo.

### Success Requirements

- Una respuesta exitosa MUST mostrar un `Alert` de éxito.
- El éxito MUST mostrar el `mensaje` devuelto por el backend.
- El éxito MUST mostrar el `codigo` devuelto por el backend.
- El código devuelto MUST tratarse como autoritativo.
- El frontend MUST NOT asumir que coincide con el código introducido.
- La página MUST ofrecer una acción hacia `/admin/contests`.
- La página MUST NOT redirigir automáticamente antes de que el usuario lea el resultado.
- La página MUST NOT enviar nuevamente el formulario automáticamente.
- La página MUST NOT mostrar JSON crudo.

### Error Requirements

- Los errores de schema MUST mostrarse cerca del campo.
- Los errores generales MUST mostrarse mediante `Alert`.
- Los errores del backend MUST utilizar `ApiError`.
- La página MUST NOT parsear manualmente `Response`.
- La página MUST NOT usar `alert`.
- La página MUST NOT duplicar normalización del cliente HTTP.
- Los mensajes de ZIP devueltos por backend MUST mostrarse de forma segura.
- Para 401, la página MUST mostrar un mensaje equivalente a `Tu sesión no es válida o ha expirado`.
- El change MUST NOT implementar logout o redirect global para 401.
- La UI MUST NOT mostrar stack traces, headers sensibles o respuestas crudas.

### MSW Requirements

- El handler MUST crearse o ajustarse solo si el contrato está confirmado.
- El handler MUST interceptar `POST /api/Concursos/crear`.
- El handler MUST leer `FormData`.
- El handler MUST comprobar campos principales.
- El handler MUST devolver una respuesta compatible.
- El handler MUST NOT usar JWT real.
- El handler MUST NOT incluir contraseñas reales.
- El handler MUST NOT descomprimir el ZIP.
- El handler MUST NOT replicar lógica productiva.
- El handler MAY representar éxito, error general y sesión inválida.
- Los escenarios MUST mantener estructuras compatibles con el contrato.
- MSW MUST permitir probar la interfaz sin JWT real.

### Accessibility Requirements

- Todos los campos MUST tener label accesible.
- Los errores MUST asociarse mediante `aria-describedby` cuando corresponda.
- Los campos inválidos MUST utilizar `aria-invalid`.
- Las acciones con solo icono MUST tener nombre accesible.
- Agregar y eliminar problemas MUST poder operarse con teclado.
- FileDropzone MUST poder operarse con teclado.
- El loading MUST comunicarse de forma accesible.
- El Alert de éxito o error SHOULD utilizar una región apropiada.
- El orden de foco MUST seguir el orden visual.
- El resumen MUST utilizar estructura semántica legible.

### Protected Scope Requirements

- El change MUST NOT implementar listado de concursos.
- El change MUST NOT implementar sidebar.
- El change MUST NOT implementar topbar.
- El change MUST NOT implementar autenticación.
- El change MUST NOT implementar guards.
- El change MUST NOT implementar persistencia JWT.
- El change MUST NOT implementar estados de concurso.
- El change MUST NOT implementar borradores.
- El change MUST NOT descomprimir ZIP.
- El change MUST NOT modificar backend.
- El change MUST NOT modificar `database/`.
- El change MUST NOT modificar documentos académicos.
- El change MUST NOT modificar README raíz.
- El change MUST NOT modificar el manual frontend.
- El change MUST NOT realizar commit o push.

## Behavior Scenarios

### Scenario 1: Render de la página

Given que la aplicación resuelve `/admin/contests/new`  
When el usuario abre la ruta  
Then la página MUST mostrar breadcrumbs, título, formulario y resumen sin implementar sidebar o topbar

### Scenario 2: Campos obligatorios

Given que nombre, descripción, código o fecha están vacíos  
When el usuario envía el formulario  
Then el envío MUST bloquearse y cada campo inválido MUST mostrar un mensaje asociado

### Scenario 3: Duración inválida

Given una duración igual o menor que cero  
When el usuario intenta enviar  
Then el schema MUST rechazar el formulario

### Scenario 4: Congelamiento negativo

Given minutos de congelamiento menores que cero  
When el usuario intenta enviar  
Then el schema MUST mostrar un error de validación

### Scenario 5: Congelamiento mayor que duración

Given una duración de 120 minutos y un congelamiento de 121  
When el usuario intenta enviar  
Then el schema MUST bloquear el envío e indicar la relación inválida

### Scenario 6: URL inválida

Given un valor que no representa una URL válida  
When el campo `urlSetProblemas` se valida  
Then MUST mostrarse un error y no enviarse la solicitud

### Scenario 7: Primer problema

Given que el formulario inicia  
When se crea su estado predeterminado  
Then MUST existir al menos un problema con inciso `A`

### Scenario 8: Agregar un problema

Given una lista que contiene únicamente el inciso `A`  
When el usuario agrega un problema  
Then la lista MUST mostrar los incisos `A` y `B`

### Scenario 9: Eliminar y reindexar

Given problemas con incisos `A`, `B` y `C`  
When el usuario elimina el problema `B`  
Then los problemas restantes MUST identificarse como `A` y `B`

### Scenario 10: Límite de problemas

Given una lista de 26 problemas  
When el usuario intenta agregar otro  
Then la UI MUST impedir la operación y el schema MUST rechazar una lista mayor

### Scenario 11: No eliminar el último problema

Given una lista con un solo problema  
When el usuario intenta eliminarlo  
Then la UI MUST conservar al menos un problema

### Scenario 12: Modalidad pública

Given que la contraseña está vacía  
When se renderiza el resumen  
Then la modalidad MUST mostrarse como `Público`

### Scenario 13: Modalidad privada

Given que la contraseña contiene un valor  
When se renderiza el resumen  
Then la modalidad MUST mostrarse como `Privado`

### Scenario 14: Protección de contraseña

Given que la contraseña contiene un valor  
When se renderiza el resumen  
Then el valor de la contraseña MUST NOT aparecer

### Scenario 15: ZIP ausente

Given que no se seleccionó un archivo  
When el usuario envía el formulario  
Then el schema MUST bloquear el envío e indicar que el ZIP es obligatorio

### Scenario 16: Archivo no ZIP

Given que el usuario selecciona un archivo que no tiene extensión `.zip`  
When FileDropzone y el schema lo validan  
Then el archivo MUST rechazarse con un mensaje comprensible

### Scenario 17: Ayuda del ZIP

Given problemas con incisos `A`, `B` y `C`  
When se renderiza la sección de recursos  
Then la ayuda MUST indicar que el ZIP debe contener las carpetas `A`, `B` y `C`

### Scenario 18: Construcción multipart

Given valores válidos y dos problemas  
When el mapper construye `FormData`  
Then MUST incluir los campos simples, `archivoZip` y claves indexadas para ambos problemas

### Scenario 19: Contraseña vacía en multipart

Given que la contraseña opcional está vacía  
When se construye `FormData`  
Then el campo `contrasena` MUST enviarse como cadena vacía

### Scenario 20: Boundary automático

Given una solicitud con `FormData`  
When el servicio delega al cliente HTTP  
Then el código MUST NOT establecer manualmente `Content-Type`

### Scenario 21: Autorización desacoplada

Given que AuthTransport dispone de una sesión Bearer válida  
When se envía la solicitud  
Then el transporte MUST adjuntar la autorización sin exponer el JWT a la página

### Scenario 22: Envío pendiente

Given que la mutación está en progreso  
When el usuario intenta activar nuevamente `Crear concurso`  
Then el botón MUST permanecer deshabilitado y no MUST iniciarse un segundo request

### Scenario 23: Creación exitosa

Given una respuesta exitosa con `codigo` y `mensaje`  
When la mutación finaliza  
Then la página MUST mostrar ambos valores y una acción hacia `/admin/contests`

### Scenario 24: Código distinto

Given que el usuario introdujo un código y el backend devuelve otro  
When se muestra el éxito  
Then la UI MUST mostrar como autoritativo el código devuelto

### Scenario 25: Error 400

Given que el backend devuelve 400 con un mensaje seguro  
When la mutación falla  
Then la página MUST mostrar el mensaje mediante Alert sin presentar JSON crudo

### Scenario 26: Error de ZIP del backend

Given que el backend informa carpetas faltantes o pares incompletos  
When la mutación falla  
Then la página MUST mostrar ese mensaje seguro sin intentar inspeccionar el ZIP

### Scenario 27: Error 401

Given que el backend devuelve 401  
When la mutación falla  
Then la página MUST informar que la sesión es inválida o expiró sin ejecutar logout o redirect global

### Scenario 28: Cancelación

Given que el usuario selecciona `Cancelar`  
When la acción se ejecuta  
Then el router MUST navegar a `/admin/contests`

### Scenario 29: Vista de escritorio

Given un viewport de escritorio  
When la página se renderiza  
Then formulario y resumen SHOULD aparecer en dos columnas

### Scenario 30: Vista móvil

Given un viewport móvil  
When la página se renderiza  
Then los contenidos MUST organizarse en una sola columna sin scroll horizontal innecesario

### Scenario 31: MSW habilitado

Given que MSW está habilitado y el contrato fue confirmado  
When se envía un formulario válido  
Then el handler MUST leer `FormData` y devolver una respuesta contractual sin requerir JWT real

### Scenario 32: Ruta existente

Given que existen otras rutas en la aplicación  
When se integra `CreateContestPage`  
Then las demás rutas y `/dev/ui` MUST continuar resolviendo correctamente

### Scenario 33: Ausencia de funcionalidades excluidas

Given el diff final del change  
When se revisa su alcance  
Then no MUST existir listado, sidebar, topbar, auth, guard, borrador o descompresión ZIP

## Edge Cases

- OpenAPI no está disponible.
- El endpoint difiere en capitalización o ruta.
- El DTO multipart no aparece correctamente representado en OpenAPI.
- `AuthTransport` no expone una integración compatible con `FormData`.
- El cliente HTTP intenta serializar `FormData` como JSON.
- El cliente HTTP agrega `Content-Type: application/json`.
- La fecha local cae en un cambio de día al serializarse.
- El backend espera fecha sin offset, con offset o UTC.
- El usuario introduce espacios en campos obligatorios.
- La URL contiene espacios iniciales o finales.
- El código contiene caracteres que el frontend no debe prohibir sin contrato.
- El tiempo utiliza decimales.
- La memoria utiliza un número decimal.
- El usuario agrega y elimina problemas repetidamente.
- La lista llega a 26 elementos.
- El índice supera `Z` debido a una manipulación del estado.
- El archivo tiene extensión `.ZIP` en mayúsculas.
- El archivo declara MIME genérico.
- El nombre del archivo contiene múltiples puntos.
- El archivo seleccionado se elimina antes del submit.
- El mismo archivo se selecciona nuevamente.
- El backend rechaza el ZIP por estructura interna.
- El backend devuelve un mensaje vacío.
- El backend devuelve 400 sin body JSON.
- El backend devuelve 401 con o sin body.
- El request falla por red o timeout.
- El usuario cancela mientras la mutación está pendiente.
- La respuesta exitosa no devuelve el mismo código introducido.
- El resumen recibe valores todavía vacíos.
- El nombre del ZIP es muy largo.
- El texto de descripción es extenso.
- El layout se muestra en una pantalla estrecha.
- El placeholder de ruta no está ubicado donde se esperaba.
- El handler MSW existente ya cubre concursos.
- Los tipos generados usan nombres distintos a los tipos de formulario.
- Las rutas de navegación están tipadas o centralizadas de una forma distinta.

## Acceptance Criteria

- La ruta `/admin/contests/new` MUST mostrar la página de creación.
- La página MUST contener una sola pantalla y MUST NOT contener wizard.
- La página MUST incluir las cinco secciones definidas.
- El formulario MUST bloquear valores obligatorios ausentes.
- La duración MUST ser un entero mayor que cero.
- El congelamiento MUST estar entre cero y la duración.
- La URL MUST validarse.
- La lista MUST iniciar con un problema `A`.
- Agregar un problema MUST generar el siguiente inciso.
- Eliminar un problema MUST recalcular la secuencia.
- La lista MUST impedir más de 26 problemas.
- Cada problema MUST exigir título, tiempo positivo y memoria entera positiva.
- Contraseña vacía MUST mostrar `Público`.
- Contraseña con valor MUST mostrar `Privado`.
- La contraseña MUST no aparecer en el resumen.
- El ZIP MUST ser obligatorio.
- Un archivo no ZIP MUST rechazarse.
- El frontend MUST no descomprimir el ZIP.
- El resumen MUST mostrar todos los datos seguros requeridos.
- El mapper MUST generar todas las claves multipart contractuales.
- El mapper MUST utilizar índices consecutivos.
- El servicio MUST utilizar el endpoint centralizado.
- El servicio MUST utilizar el cliente HTTP existente.
- El servicio MUST no establecer manualmente el boundary.
- La solicitud MUST utilizar AuthTransport.
- La página MUST no acceder al JWT.
- El hook MUST utilizar `useMutation`.
- El submit MUST impedir doble envío.
- El éxito MUST mostrar el mensaje y código devueltos.
- La página MUST no redirigir automáticamente tras el éxito.
- Un error 400 MUST mostrarse mediante Alert.
- Un error 401 MUST mostrar un mensaje comprensible.
- Cancelar MUST navegar a `/admin/contests`.
- La página MUST funcionar en desktop y móvil.
- Los controles MUST ser accesibles mediante teclado.
- La integración MUST no romper otras rutas.
- `/dev/ui` MUST continuar funcionando en desarrollo.
- La página MUST no utilizar `fetch` o Axios.
- El código MUST no contener `http://localhost:5185`.
- El change MUST no implementar sidebar, topbar, listado, auth, guards o borradores.
- Las pruebas de schema, FormData, mutación, página y routing MUST finalizar correctamente.
- Format, lint, typecheck, tests y build MUST finalizar correctamente.
- Backend, `database/`, documentos académicos, README raíz y manual frontend MUST permanecer sin cambios.
- Las capturas MUST mantenerse pendientes hasta existir.
- No MUST realizarse commit o push.

## Out of Scope

- Listado y administración de concursos.
- Sidebar y topbar.
- Login, registro, sesión, guards y roles.
- Borradores, publicación y estados del concurso.
- Selección de lenguajes.
- Integración posterior con la tabla de concursos.
- Edición o eliminación.
- Descompresión o análisis interno del ZIP.
- Creación frontend de casos de prueba.
- Cambios de backend o base de datos.
- Documentación académica, README raíz y manual frontend.
