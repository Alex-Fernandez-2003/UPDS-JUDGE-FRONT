# Spec

## Requirements

### Change Scope Requirements

- El change MUST llamarse exactamente `fix-create-contest-password-zip-and-form-ux`.
- El change MUST ubicarse en `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/`.
- Los cinco grupos de correcciones MUST permanecer en un único change.
- El change MUST aplicarse sobre la implementación existente de UJ-08 y UJ-09.
- El change MUST NOT modificar ni archivar el change original.
- El change MUST NOT implementar nuevas historias.

### Password Normalization Requirements

- `contrasena` MUST ser un `string` en el tipo del formulario.
- El valor inicial de `contrasena` MUST ser `''`.
- El schema Zod MUST aceptar `''`.
- El schema Zod MUST producir un `string`.
- Si recibe `undefined` desde una fuente tolerada, el proceso de normalización MUST producir `''`.
- Un valor compuesto únicamente por espacios MUST NOT utilizarse como sustituto de una contraseña vacía.
- La normalización SHOULD tratar un valor compuesto únicamente por espacios como vacío, de acuerdo con el comportamiento existente del formulario.
- El mapper MUST agregar siempre la clave `contrasena`.
- Para una contraseña vacía, el mapper MUST agregar `''`.
- El mapper MUST NOT agregar `null`.
- El mapper MUST NOT agregar `undefined`.
- El mapper MUST NOT agregar `'null'`.
- El mapper MUST NOT agregar `'undefined'`.
- El mapper MUST NOT agregar un espacio sustituto.
- Para una contraseña con contenido, el mapper MUST preservar el valor normalizado.
- El servicio MUST enviar el `FormData` recibido sin convertir la contraseña.
- La modalidad MUST continuar derivándose de la contraseña.
- Contraseña vacía MUST representar modalidad pública.
- Contraseña con contenido MUST representar modalidad privada.
- El resumen MUST NOT mostrar la contraseña.
- Si el backend rechaza un `FormData` que contiene exactamente `''`, el frontend MUST reportar la incompatibilidad y MUST NOT aplicar workarounds.

### Contest Code Requirements

- La feature MUST definir centralmente las categorías de caracteres, patrón, mensaje de error, hint y normalizador del código.
- El normalizador MUST recortar espacios extremos y convertir el código a minúsculas.
- El schema MUST validar el código normalizado como segmentos alfanuméricos en minúsculas separados por guiones simples.
- El mapper MUST enviar el código normalizado en `FormData`.
- El campo MUST mostrar el hint centralizado, el placeholder `regional-2026`, `autocapitalize="none"` y `spellcheck="false"`.

### ZIP Size Requirements

- La feature MUST definir una única constante `MAX_CONTEST_ZIP_SIZE_BYTES`.
- El valor MUST ser equivalente a `100 * 1024 * 1024` bytes.
- La UI MUST comunicar `Tamaño máximo: 100 MB`.
- Un archivo menor que 100 MB MUST ser válido si cumple las demás reglas.
- Un archivo de exactamente 100 MB MUST ser válido.
- Un archivo de 100 MB más un byte MUST ser inválido.
- El mensaje de error MUST indicar que el ZIP no puede superar 100 MB.
- La validación MUST ejecutarse antes del envío.
- Un archivo excesivo MUST NOT conservarse como selección válida.
- El schema MUST validar el tamaño.
- El selector o wrapper de ZIP MUST validar el tamaño.
- El submit MUST verificar que el archivo actual continúa siendo válido.
- La validación MUST NOT leer el contenido completo.
- La validación MUST NOT descomprimir el archivo.
- La validación MUST NOT utilizar JSZip.
- La documentación de UI MUST NOT afirmar que el límite frontend sustituye la seguridad backend.

### ZIP Empty State Requirements

- Sin archivo seleccionado, toda el área interactiva del dropzone MUST poder abrir el selector.
- El dropzone MUST aceptar drag and drop.
- El dropzone MUST incluir un botón visible para seleccionar un ZIP.
- El botón MUST abrir el selector nativo.
- El área MUST ser operable mediante teclado.
- La UI MUST indicar que el archivo puede arrastrarse o seleccionarse.
- La UI MUST mostrar el formato permitido `.zip`.
- La UI MUST mostrar el tamaño máximo de 100 MB.
- Seleccionar un archivo MUST NOT iniciar una solicitud HTTP.
- El ZIP MUST enviarse únicamente con el formulario completo.

### ZIP Selected State Requirements

- Cuando existe un archivo válido, el estado vacío MUST sustituirse por una tarjeta del archivo.
- La tarjeta MUST mostrar un icono de archivo comprimido de Lucide.
- La tarjeta MUST mostrar el nombre.
- La tarjeta MUST mostrar el tamaño formateado.
- La tarjeta MUST comunicar que el archivo es válido.
- La tarjeta MUST incluir `Cambiar archivo`.
- La tarjeta MUST incluir `Eliminar archivo`.
- `Cambiar archivo` MUST abrir nuevamente el selector nativo.
- Soltar un ZIP válido sobre el estado seleccionado MUST reemplazar el archivo actual.
- Reemplazar el archivo MUST actualizar React Hook Form.
- Reemplazar un archivo inválido por uno válido MUST limpiar el error.
- `Eliminar archivo` MUST limpiar el valor de React Hook Form.
- `Eliminar archivo` MUST limpiar el input nativo.
- `Eliminar archivo` MUST limpiar los errores relacionados.
- Después de eliminar, MUST mostrarse nuevamente el estado vacío.
- El nombre largo SHOULD truncarse visualmente.
- El nombre completo MUST permanecer disponible de forma accesible.
- La UI MUST NOT mostrar el contenido interno del ZIP.

### Summary Requirements

- El resumen MUST incluir un encabezado visualmente diferenciado.
- El encabezado MUST usar el color azul oscuro semántico existente.
- El encabezado MUST incluir un icono Lucide.
- El encabezado MUST mostrar `Resumen del concurso`.
- El contraste MUST cumplir las convenciones accesibles del proyecto.
- El contenido MUST mostrar:
  - nombre;
  - código;
  - fecha de inicio;
  - duración;
  - congelamiento;
  - modalidad;
  - cantidad de problemas;
  - incisos;
  - archivo ZIP.
- Los valores sin contenido MUST mostrar `Sin definir`, salvo el ZIP.
- Un ZIP ausente MUST mostrar `No seleccionado`.
- La modalidad MUST mostrarse mediante un badge existente cuando corresponda.
- El resumen MUST utilizar separadores sutiles.
- Las etiquetas MUST usar estilo secundario.
- Los valores MUST tener mayor contraste.
- El resumen MUST NOT mostrar contraseña.
- El resumen MUST NOT mostrar JWT.
- El resumen MUST NOT mostrar estado de borrador.
- El resumen MUST NOT mostrar lenguajes.
- El resumen MUST NOT mostrar visibilidad como campo independiente.

### ZIP Warning Requirements

- La pantalla MUST mostrar una advertencia informativa sobre el ZIP.
- La advertencia MUST indicar el límite de 100 MB.
- La advertencia MUST recordar las carpetas correspondientes a los incisos.
- La advertencia SHOULD utilizar el `Alert` existente.
- La advertencia MUST utilizar tokens existentes.
- La advertencia MUST actualizar sus incisos cuando cambie la lista de problemas.

### Interactive State Requirements

- Los elementos interactivos de esta pantalla MUST tener hover perceptible.
- Los elementos interactivos MUST tener focus-visible perceptible.
- Los botones MUST tener estado active cuando el componente base lo soporte.
- Los elementos disabled MUST comunicar que no pueden activarse.
- Los elementos loading MUST evitar una apariencia interactiva normal.
- El cursor MUST corresponder al estado interactivo.
- Las transiciones SHOULD ser consistentes con las convenciones existentes.
- Elementos no interactivos MUST NOT recibir estilos hover engañosos.
- Los estados MUST NOT depender exclusivamente del color.
- Si el defecto pertenece a Button, IconButton o FileDropzone compartidos, el contrato compartido MUST corregirse preservando compatibilidad.
- Si el defecto es local, MUST resolverse dentro de la feature.
- El change MUST NOT duplicar un componente compartido solo para agregar hover.

### Single Problem Action Requirements

- La acción textual `+ Agregar problema` MUST reemplazarse.
- La nueva acción MUST utilizar el icono `Plus` de Lucide.
- La nueva acción SHOULD utilizar `IconButton` si su contrato existente es compatible.
- La acción MUST tener un nombre accesible equivalente a `Agregar un problema`.
- La acción MUST agregar exactamente un problema.
- La acción MUST generar el siguiente inciso.
- La acción MUST actualizar el resumen y la advertencia ZIP.
- La acción MUST permanecer disabled cuando ya existen 12 problemas.
- El carácter `+` MUST NOT utilizarse como sustituto del icono funcional.

### Bulk Problem Action Requirements

- La pantalla MUST incluir una acción `Agregar varios`.
- La acción MUST abrir un control inline.
- El control MUST NOT utilizar `window.prompt`.
- El control MUST NOT requerir una biblioteca de modales.
- El panel MUST mostrar un label visible para la cantidad.
- La cantidad MUST representar problemas adicionales.
- La cantidad MUST ser un entero.
- La cantidad MUST ser mayor o igual a 1.
- La cantidad MUST ser menor o igual a los espacios disponibles.
- El total MUST permanecer menor o igual a 12.
- Cero MUST ser inválido.
- Un número negativo MUST ser inválido.
- Un decimal MUST ser inválido.
- Un valor superior al disponible MUST ser inválido.
- Una cantidad inválida MUST NOT agregar parcialmente problemas.
- La UI MUST mostrar el máximo disponible.
- El panel MUST incluir acciones `Agregar` y `Cancelar`.
- Una operación válida SHOULD agregar el array completo mediante una sola operación de `useFieldArray`.
- Después de agregar correctamente, el campo MUST limpiarse.
- Después de agregar correctamente, el panel MUST cerrarse.
- Cancelar MUST cerrar el panel sin modificar la lista.
- Los incisos MUST generarse secuencialmente.
- El resumen y la ayuda ZIP MUST actualizarse después de la operación.

### Problem Sequence Requirements

- La lista MUST contener como máximo 12 problemas.
- Los incisos MUST corresponder a `A` hasta `L`.
- Los incisos MUST ser únicos.
- Los incisos MUST ser derivados y no editables.
- Eliminar un problema MUST recalcular la secuencia.
- Agregar uno MUST continuar la secuencia.
- Agregar varios MUST generar toda la secuencia correspondiente.
- El resumen MUST utilizar la secuencia actual.
- La advertencia ZIP MUST utilizar la secuencia actual.

### Accessibility Requirements

- IconButton MUST tener nombre accesible.
- El dropzone MUST poder operarse mediante teclado.
- Los controles MUST mostrar focus-visible.
- Los errores MUST estar vinculados al campo correspondiente.
- Los errores SHOULD anunciarse mediante una región apropiada.
- El estado selected del ZIP MUST comprenderse sin depender solo del color.
- El botón de eliminación MUST describir claramente qué elimina.
- El panel bulk MUST incluir label visible.
- Los controles disabled MUST utilizar semántica disabled real cuando corresponda.
- El nombre de archivo truncado MUST conservar su valor completo para tecnologías de asistencia.

### Responsive Requirements

- En escritorio, la composición MUST mantener formulario y resumen lateral.
- En móvil, el orden MUST ser:
  - formulario;
  - resumen;
  - advertencia;
  - acciones.
- Los controles de problemas MAY reorganizarse en varias filas.
- Las acciones ZIP MUST evitar overflow horizontal.
- Los nombres de archivo largos MUST truncarse visualmente.
- La página MUST evitar scroll horizontal innecesario.

### Regression Requirements

- La ruta `/admin/contests/new` MUST continuar funcionando.
- El envío completo del concurso MUST continuar utilizando el flujo existente.
- El ZIP MUST continuar enviándose únicamente con el formulario.
- MSW MUST continuar permitiendo la prueba de la pantalla.
- `/dev/ui` MUST continuar funcionando.
- Si se modifica un componente compartido, sus variantes existentes MUST continuar funcionando.
- El change MUST NOT modificar backend, auth, layout global o listado.

## Behavior Scenarios

### Scenario 1: Valor inicial de contraseña vacío

Given el formulario de creación recién inicializado  
When se consulta el valor de `contrasena`  
Then el valor MUST ser exactamente `''`

### Scenario 2: Schema con contraseña vacía

Given un formulario válido con `contrasena` igual a `''`  
When Zod valida los valores  
Then el resultado MUST mantener `contrasena` como un string vacío

### Scenario 3: Contraseña undefined normalizada

Given que una fuente tolerada entrega `contrasena` como `undefined`  
When se ejecuta la normalización del formulario  
Then el valor resultante MUST ser `''`

### Scenario 4: FormData para concurso público

Given un formulario válido sin contraseña  
When el mapper construye `FormData`  
Then `FormData.get('contrasena')` MUST ser exactamente `''`

### Scenario 5: Contraseña real conservada

Given una contraseña válida con contenido  
When el mapper construye `FormData`  
Then el valor MUST coincidir con la contraseña normalizada

### Scenario 6: Backend incompatible con cadena vacía

Given que el frontend demuestra que envió exactamente `''`  
When el backend lo convierte a null y devuelve 400  
Then Pi MUST reportar la incompatibilidad y MUST NOT sustituir la contraseña con espacios o valores ficticios

### Scenario 7: Modalidad pública

Given que la contraseña está vacía  
When el resumen se renderiza  
Then la modalidad MUST mostrarse como pública y la contraseña MUST permanecer oculta

### Scenario 8: Modalidad privada

Given que la contraseña contiene texto  
When el resumen se renderiza  
Then la modalidad MUST mostrarse como privada y la contraseña MUST permanecer oculta

### Scenario 9: ZIP menor al límite

Given un archivo ZIP menor a 100 MB  
When el usuario lo selecciona  
Then el archivo MUST aceptarse si cumple las demás reglas

### Scenario 10: ZIP en el límite exacto

Given un archivo ZIP de exactamente `100 * 1024 * 1024` bytes  
When el usuario lo selecciona  
Then el archivo MUST aceptarse

### Scenario 11: ZIP mayor al límite

Given un archivo ZIP de `100 * 1024 * 1024 + 1` bytes  
When el usuario lo selecciona  
Then MUST mostrarse el error de 100 MB y el archivo MUST NOT conservarse como selección válida

### Scenario 12: Reemplazo después de error

Given un archivo rechazado por tamaño  
When el usuario selecciona un ZIP válido  
Then el error MUST limpiarse y el nuevo archivo MUST mostrarse como válido

### Scenario 13: Eliminación del ZIP

Given un ZIP válido seleccionado  
When el usuario activa `Eliminar archivo`  
Then React Hook Form, el input nativo y los errores MUST limpiarse

### Scenario 14: Click sobre el dropzone

Given que no hay archivo seleccionado  
When el usuario activa cualquier zona interactiva del dropzone  
Then MUST abrirse el selector nativo

### Scenario 15: Selección mediante botón

Given que no hay archivo seleccionado  
When el usuario activa `Seleccionar archivo ZIP`  
Then MUST abrirse el selector sin iniciar una solicitud HTTP

### Scenario 16: Drag and drop válido

Given un ZIP válido arrastrado sobre el dropzone  
When el usuario lo suelta  
Then el archivo MUST convertirse en la selección actual

### Scenario 17: Estado seleccionado

Given un ZIP válido seleccionado  
When el campo se renderiza  
Then MUST mostrar icono, nombre, tamaño, estado válido, cambio y eliminación

### Scenario 18: Cambiar archivo

Given un archivo ya seleccionado  
When el usuario activa `Cambiar archivo` y elige otro ZIP válido  
Then el nuevo archivo MUST reemplazar al anterior

### Scenario 19: Resumen sin valores

Given un formulario recién inicializado  
When se renderiza el resumen  
Then los valores vacíos MUST mostrar placeholders seguros y el ZIP MUST mostrar `No seleccionado`

### Scenario 20: Advertencia ZIP

Given problemas con incisos `A`, `B` y `C`  
When se renderiza la advertencia  
Then MUST mostrar el límite de 100 MB y recordar las carpetas `A`, `B` y `C`

### Scenario 21: Hover interactivo

Given un botón habilitado  
When el puntero se posiciona sobre él  
Then MUST existir un cambio visual perceptible y consistente

### Scenario 22: Focus visible

Given navegación mediante teclado  
When un control interactivo recibe foco  
Then MUST mostrar un indicador de focus-visible perceptible

### Scenario 23: Estado disabled

Given que un botón está disabled  
When el usuario posiciona el puntero o intenta activarlo  
Then MUST comunicar indisponibilidad y MUST NOT ejecutar su acción

### Scenario 24: Estado loading

Given que la creación está pendiente  
When se renderiza el botón principal  
Then MUST mostrar loading, permanecer deshabilitado y evitar doble envío

### Scenario 25: Agregar un problema

Given dos problemas actuales  
When el usuario activa el IconButton `Agregar un problema`  
Then MUST agregarse exactamente un tercer problema con inciso `C`

### Scenario 26: Límite individual

Given 12 problemas actuales  
When se renderiza la acción individual  
Then MUST estar disabled

### Scenario 27: Abrir agregar varios

Given menos de 12 problemas  
When el usuario activa `Agregar varios`  
Then MUST mostrarse el panel inline con cantidad, Agregar y Cancelar

### Scenario 28: Bulk válido

Given dos problemas actuales y una cantidad adicional de 7  
When el usuario confirma  
Then MUST existir un total de 9 problemas con incisos `A` hasta `I`

### Scenario 29: Bulk cero

Given el panel bulk abierto  
When el usuario introduce 0  
Then MUST mostrarse un error y la lista MUST permanecer sin cambios

### Scenario 30: Bulk negativo

Given el panel bulk abierto  
When el usuario introduce un valor negativo  
Then MUST mostrarse un error y la lista MUST permanecer sin cambios

### Scenario 31: Bulk decimal

Given el panel bulk abierto  
When el usuario introduce un decimal  
Then MUST mostrarse un error y la lista MUST permanecer sin cambios

### Scenario 32: Bulk superior al disponible

Given 10 problemas actuales  
When el usuario intenta agregar 3  
Then MUST mostrarse que solo puede agregar 2 y MUST NOT agregarse ningún problema

### Scenario 33: Limpieza después de bulk

Given una operación bulk exitosa  
When termina la actualización  
Then el control MUST cerrarse y su cantidad MUST quedar limpia

### Scenario 34: Reindexado después de eliminar

Given problemas `A`, `B`, `C` y `D`  
When el usuario elimina `B`  
Then los problemas restantes MUST mostrarse como `A`, `B` y `C`

### Scenario 35: Responsive móvil

Given un viewport móvil  
When la pantalla se renderiza  
Then formulario, resumen, advertencia y acciones MUST seguir el orden especificado sin overflow

### Scenario 36: Regresión compartida

Given que se modificó Button, IconButton o FileDropzone  
When se ejecutan sus pruebas y se abre `/dev/ui`  
Then sus variantes existentes MUST conservar su comportamiento

## Edge Cases

- `contrasena` llega como `null` desde un reset antiguo.
- `contrasena` contiene solo espacios.
- El backend rechaza explícitamente una cadena vacía.
- El archivo tiene tamaño cero.
- El archivo mide exactamente 100 MB.
- El archivo supera el límite por un byte.
- El archivo tiene extensión `.ZIP` en mayúsculas.
- El MIME es genérico pero la extensión es válida.
- El usuario arrastra múltiples archivos.
- El input permite seleccionar nuevamente el mismo archivo.
- El usuario reemplaza un archivo válido por uno inválido.
- El usuario elimina el archivo mientras existe un error.
- El nombre de archivo supera el ancho disponible.
- El nombre contiene caracteres Unicode.
- El dropzone recibe foco mientras muestra el estado seleccionado.
- El usuario intenta activar botones con la mutación pendiente.
- El panel bulk queda abierto al alcanzar 12 mediante otra acción.
- La cantidad bulk contiene espacios.
- La cantidad bulk contiene notación científica.
- La cantidad bulk supera el entero seguro, aunque el máximo funcional sea 12.
- El usuario cancela el panel con un error visible.
- El usuario elimina problemas después de abrir el panel bulk.
- La cantidad máxima disponible cambia mientras el panel permanece abierto.
- El resumen recibe fecha inválida o todavía incompleta.
- La lista queda corrupta con más de 12 elementos por datos preexistentes.
- El componente compartido ya aplica hover y la página agrega clases duplicadas.
- `/dev/ui` no incluye todavía un ejemplo del estado modificado.

## Acceptance Criteria

- `contrasena` MUST iniciar como `''`.
- El schema MUST retornar un string para contraseña vacía.
- El mapper MUST agregar siempre `contrasena`.
- `FormData.get('contrasena')` MUST ser `''` cuando no se introduce contraseña.
- No MUST producirse un valor nulo, indefinido, textualizado o sustituido por espacio.
- Una contraseña real MUST conservarse.
- La modalidad MUST continuar derivándose correctamente.
- El resumen MUST no mostrar la contraseña.
- `MAX_CONTEST_ZIP_SIZE_BYTES` y `MAX_CONTEST_PROBLEMS = 12` MUST existir en una única fuente.
- El código MUST normalizarse a un slug en minúsculas y validar su formato centralizado antes del envío.
- Un ZIP menor o igual a 100 MB MUST aceptarse.
- Un ZIP superior por un byte MUST rechazarse.
- Un ZIP inválido MUST no quedar seleccionado.
- Cambiar a un archivo válido MUST limpiar el error.
- Eliminar MUST limpiar formulario, input y error.
- El dropzone MUST admitir click, teclado, botón y drag and drop.
- El estado seleccionado MUST mostrar nombre y tamaño.
- Seleccionar un ZIP MUST no iniciar solicitudes HTTP.
- El resumen MUST mostrar solo los campos reales definidos.
- La advertencia MUST mostrar 100 MB e incisos esperados.
- Botones y dropzone MUST tener hover y focus-visible verificables.
- Disabled y loading MUST impedir activación.
- La acción individual MUST usar un icono Plus con nombre accesible.
- La acción individual MUST agregar un elemento.
- La acción MUST quedar disabled en 12.
- El panel bulk MUST validar enteros entre 1 y el espacio disponible.
- Una cantidad inválida MUST no producir agregados parciales.
- Una cantidad válida MUST agregar todos los problemas solicitados.
- Los incisos MUST permanecer secuenciales y únicos.
- El panel bulk MUST limpiarse después del éxito.
- La pantalla MUST funcionar sin overflow en móvil.
- Las pruebas de contraseña, ZIP, problemas, resumen e interacción MUST pasar.
- Si se modifican componentes compartidos, sus pruebas MUST pasar.
- `/dev/ui`, routing, MSW y el build MUST continuar funcionando.
- No MUST modificarse backend, base de datos, auth, layout global, listado o documentación protegida.
- No MUST realizarse commit o push.

## Out of Scope

- Modificación del backend o su DTO.
- Seguridad backend para límites de archivo.
- Autenticación, sesión, JWT, guards y roles.
- Sidebar, topbar, listado y filtros.
- Borradores, publicación, edición o eliminación.
- Descompresión y análisis interno del ZIP.
- Reordenamiento de problemas.
- Nuevas dependencias.
- Rediseño global.
