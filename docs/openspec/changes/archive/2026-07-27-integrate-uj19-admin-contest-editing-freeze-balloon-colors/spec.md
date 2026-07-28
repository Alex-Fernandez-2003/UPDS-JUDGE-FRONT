# Spec

## Requirements

### Capability: admin-contest-edit-action

- El listado administrativo MUST incorporar una acción de edición por concurso cuando corresponda.
- La acción MUST utilizar la librería de iconos existente.
- La acción MUST utilizar un icono equivalente a lápiz.
- La acción MUST tener nombre accesible.
- La acción SHOULD tener tooltip visible o accesible.
- La acción MUST conservar focus-visible.
- La acción MUST navegar mediante router.
- La acción MUST utilizar un route builder real.
- La acción MUST NOT utilizar `window.location`.
- La acción MUST NOT depender de `location.state`.
- La visibilidad MUST respetar el permiso contractual real.
- Ocultar la acción MUST NOT sustituir el guard de ruta.
- La disponibilidad por estado y propietario MUST decidirse con datos reales del listado.
- Si el listado confirma estado próximo y creador, la UI SHOULD ocultar o habilitar solo para editables.
- Si el listado confirma estado pero no propietario, la UI SHOULD deshabilitar con explicación o delegar la autoridad al endpoint según el patrón existente.
- La UI MUST NOT inventar un campo de propietario.
- Un concurso iniciado o finalizado MUST NOT poder actualizarse.
- Backend MUST continuar siendo la fuente de verdad.

### Capability: admin-contest-balloon-summary-action

- El listado MUST incorporar una acción de consulta de colores.
- La acción MUST tener nombre accesible.
- La acción MUST abrir un modal read-only.
- La acción MUST reutilizar los estilos actuales.
- La acción MUST reutilizar `GlobeIllustration`.
- La acción MUST NOT editar datos.
- La acción MUST NOT depender del GET editable para todos los concursos.
- Si el listado incluye problemas y colores, el modal MUST utilizar esos datos.
- Si el listado no incluye los datos, la implementación MUST registrar la brecha contractual.
- La implementación MUST NOT inventar colores.
- La implementación MUST NOT hacer N requests de edición desde el listado.

### Capability: admin-contest-update-routing

- Debe existir una ruta administrativa de edición.
- El path final MUST seguir las convenciones reales.
- La ruta MUST obtener el código desde params.
- La ruta MUST usar `AdminLayout`.
- La ruta MUST conservar `AdminSidebar`.
- La ruta MUST componerse con guards existentes.
- La ruta MUST requerir el permiso contractual real.
- La ruta MUST soportar acceso directo.
- La ruta MUST soportar refresh.
- La ruta MUST NOT depender de datos provenientes de navegación.
- Un código inválido MUST producir error controlado.
- Un concurso inexistente MUST producir 404 o estado equivalente.
- Un usuario no creador MUST recibir error controlado.
- Un concurso iniciado o finalizado MUST recibir error controlado.

### Capability: admin-contest-update-form

- La página de edición MUST reutilizar el formulario de creación o sus secciones.
- La implementación MUST NOT copiar completamente el formulario.
- Create y edit MUST distinguirse mediante un contrato explícito de modo.
- El comportamiento común MUST residir en secciones o un formulario reutilizable.
- El comportamiento exclusivo de edit MUST permanecer fuera de create cuando corresponda.
- Create MUST mantener el texto `Crear Concurso`.
- Edit MUST mostrar exactamente `Actualizar concurso`.
- Edit MUST cargar el GET contractual.
- Edit MUST precargar los datos reales.
- El código MUST ser read-only cuando el PUT no permita modificarlo.
- `idConcurso` MUST NOT exponerse como campo editable.
- La página MUST manejar loading.
- La página MUST manejar error.
- La página MUST manejar 401 conforme a la política global.
- La página MUST manejar 403.
- La página MUST manejar 404.
- La página MUST manejar concurso no editable.
- La página MUST permitir reintento cuando el patrón existente lo soporte.
- La página MUST permitir regresar al listado.
- El submit MUST utilizar la mutation de actualización.
- El submit MUST evitar doble envío.
- El submit MUST quedar bloqueado cuando el formulario sea inválido.
- El submit MUST mostrar pending, success y error.
- La página de edición MUST NOT invocar la creación.

### Capability: contest-freeze-minutes-configuration

- El formulario de edición MUST incluir `minutosCongelamiento`.
- El valor MUST ser numérico.
- Cero MUST ser válido.
- Un valor negativo MUST ser inválido.
- El valor MUST ser menor que `duracionMinutos`.
- Un valor igual a la duración MUST ser inválido.
- Un valor mayor que la duración MUST ser inválido.
- Cambiar la duración MUST revalidar el congelamiento.
- El frontend MUST NOT hardcodear otro máximo.
- El backend MUST continuar validando.
- Si create ya contiene el campo, MUST reutilizarse.
- Si create no lo contiene y su endpoint lo admite, MAY incorporarse al formulario compartido.
- Si create no lo admite, el campo MUST permanecer exclusivo de edit.
- La diferencia MUST documentarse.

### Capability: contest-update-zip-contract

- El formulario de edición MUST exigir `archivoZip` cuando el PUT lo requiera.
- El campo MUST mostrarse como obligatorio.
- La UI MUST explicar que una actualización requiere un ZIP completo.
- El archivo MUST tener extensión `.zip`.
- El archivo MUST respetar el límite contractual de 100 MB.
- El frontend MUST NOT presentar una actualización parcial sin ZIP.
- El ZIP MUST contener todos los problemas existentes según backend.
- El ZIP MUST NOT agregar problemas.
- El ZIP MUST NOT omitir problemas.
- El ZIP MUST NOT cambiar la cantidad de casos.
- Los errores contractuales del ZIP MUST mostrarse de forma segura.
- El contenido del ZIP MUST NOT registrarse en logs.

### Capability: contest-existing-problems-update

- Edit MUST cargar la lista completa de problemas.
- Los problemas MUST ordenarse según el contrato o por inciso cuando esté confirmado.
- Cada problema MUST conservar su inciso estable.
- El inciso SHOULD ser read-only cuando backend lo usa como identificador.
- La página MUST NOT permitir agregar problemas.
- La página MUST NOT permitir eliminar problemas.
- La página MUST NOT permitir duplicar incisos.
- La cantidad de casos MUST permanecer read-only.
- La página MAY permitir modificar:
  - título;
  - tiempo;
  - memoria;
  - color.
- El tiempo MUST ser mayor que cero.
- La memoria MUST ser mayor que cero.
- El título MUST ser obligatorio.
- La lista completa MUST formar parte del PUT.

### Capability: shared-balloon-color-mapper

- Debe existir una única fuente tipada para los colores.
- Debe existir un tipo equivalente a `BalloonColor`.
- El tipo SHOULD derivarse de la fuente de verdad.
- La fuente MUST incluir exactamente los trece colores contractuales cuando backend los confirme.
- El mapper MUST convertir valor backend a label.
- El mapper MUST convertir valor backend a hexadecimal.
- El mapper MUST convertir selección UI a valor backend.
- El mapper MAY convertir hexadecimal a valor backend cuando sea necesario.
- El mapper MUST validar valores.
- El mapper MUST ofrecer opciones de selector sin duplicados.
- El mapper MUST manejar casing o normalización según el contrato.
- El mapper MUST ofrecer un fallback seguro para valores desconocidos.
- El mapper MUST NOT usar `any`.
- El mapper MUST NOT vivir dentro de una página o modal.
- Ranking MUST poder consumirlo posteriormente sin depender de una página de edición.
- Ranking MUST NOT consumirlo en este change salvo necesidad estricta.

### Capability: contest-problem-balloon-color-management

- Cada problema MUST mostrar su inciso.
- Cada problema MUST mostrar su título.
- Cada problema MUST mostrar su color actual.
- Cada problema MUST mostrar un nombre legible.
- Cada problema MUST mostrar un globo mediante `GlobeIllustration`.
- Cada problema MUST ofrecer un selector limitado al catálogo.
- El selector MUST NOT ser un `input type="color"` libre.
- El selector MUST enviar el valor backend correcto.
- Un valor actual desconocido MUST mostrarse de forma segura y bloquear submit hasta corregirse.
- Un valor ausente MUST mostrarse como error.
- La UI MUST conservar los estilos del formulario existente.
- La representación visual MUST ser accesible y no depender solo del color.

### Capability: contest-balloon-color-uniqueness-validation

- Cada problema MUST tener un color.
- Cada color MUST pertenecer al catálogo permitido.
- Dos problemas MUST NOT compartir color.
- La comparación MUST normalizarse.
- Los duplicados MUST bloquear el submit.
- El error MUST identificar los problemas en conflicto.
- El backend MUST continuar validando.
- Un concurso con más de trece problemas MUST considerarse imposible de configurar con unicidad.
- Más de trece problemas MUST bloquear el submit.
- La UI MUST mostrar un error claro.
- La UI MUST NOT inventar colores adicionales.

### Capability: contest-balloon-color-summary-modal

- El modal MUST mostrar el nombre del concurso.
- El modal SHOULD mostrar el código cuando esté disponible.
- El modal MUST mostrar los problemas ordenados por inciso.
- Cada fila o card MUST mostrar inciso.
- Cada fila o card MUST mostrar título.
- Cada fila o card MUST mostrar label del color.
- Cada fila o card MUST mostrar `GlobeIllustration`.
- El modal MUST manejar estado vacío.
- El modal MUST manejar datos incompletos.
- El modal MUST poder cerrarse.
- El modal SHOULD cerrarse con Escape cuando sea seguro.
- El modal MUST gestionar foco.
- El foco MUST regresar al disparador.
- El modal MUST ser responsive.
- El modal MUST soportar scroll interno para listas largas.
- El modal MUST ser read-only.
- El modal MUST NOT disparar requests duplicados cuando ya existen datos en caché.

### Capability: contest-private-update-safety

- El GET de edición MUST NOT exponer una contraseña existente.
- El frontend MUST NOT inventar una contraseña.
- El frontend MUST NOT precargar un placeholder como contraseña real.
- El frontend MUST distinguir:
  - mantener privacidad;
  - cambiar contraseña;
  - convertir a público.
- La intención de privacidad MUST ser explícita.
- La implementación MUST confirmar si el PUT permite conservar la contraseña sin reenviarla.
- Si el PUT interpreta vacío como eliminar privacidad y no ofrece modo de conservación, el frontend MUST registrar una dependencia backend.
- El frontend MUST NOT enviar vacío silenciosamente para un concurso privado.
- La contraseña nueva MUST permanecer efímera.
- La contraseña MUST NOT persistirse en storage, cache, URL o logs.
- Un cambio a público MUST requerir una acción explícita y confirmada.

### Capability: contest-update-formdata-contract

- El PUT MUST usar `multipart/form-data`.
- El endpoint completo MUST confirmarse en backend u OpenAPI.
- Los nombres de campos MUST provenir del DTO real.
- El FormData MUST incluir los escalares contractuales.
- El FormData MUST incluir `minutosCongelamiento`.
- El FormData MUST incluir el ZIP.
- El FormData MUST incluir la lista completa de problemas.
- La serialización de `listaProblemas` MUST seguir el binder real.
- La implementación MUST NOT asumir JSON, índices o valores repetidos sin inspección.
- Los helpers de creación SHOULD reutilizarse cuando sean compatibles.
- La fecha MUST serializarse en el formato contractual.
- La privacidad y contraseña MUST seguir la intención segura definida.

### Capability: contest-update-date-time-safety

- Edit MUST convertir la fecha UTC recibida a la representación local correcta.
- El input local MUST mostrar el instante contractual esperado.
- El submit MUST convertir el valor local una sola vez.
- La implementación MUST reutilizar el patrón de creación cuando sea correcto.
- La implementación MUST NOT aplicar conversiones dobles.
- La fecha MUST ser obligatoria.
- La fecha MUST ser futura.
- La fecha MUST respetar el máximo contractual de meses.
- Los máximos MUST confirmarse en backend.
- Tests MUST cubrir desplazamientos de zona horaria.

### Capability: contest-update-cache-consistency

- Después de un PUT exitoso MUST actualizarse la caché relevante.
- La query del listado administrativo MUST invalidarse o actualizarse.
- La query del detalle editable MUST invalidarse o actualizarse.
- La query de detalle del concurso SHOULD invalidarse cuando exista.
- El dashboard relacionado MAY invalidarse cuando consuma los datos modificados.
- La caché del modal de colores MUST reflejar los nuevos colores.
- La implementación MUST utilizar query keys reales.
- La implementación MUST NOT invalidar toda la caché.
- La implementación MUST NOT ejecutar `window.location.reload()`.

### Capability: integration-preservation

- `AdminLayout` MUST permanecer.
- `AdminSidebar` MUST permanecer.
- Autenticación y permisos MUST permanecer.
- La creación de concursos MUST continuar funcionando.
- El listado, filtros y paginación MUST continuar funcionando.
- Acceso de usuario administrativo MUST no presentar regresiones.
- Concursos del usuario, inscripción, roles, todos los envíos, Problems y Submissions MUST no presentar regresiones.
- `ContestContextHeader` MUST no presentar regresiones.
- Generación OpenAPI MUST conservarse cuando se vea afectada.
- Ranking MUST no cambiar funcionalmente.
- Dependencias npm MUST no modificarse.
- El change SHOULD mantener mínima intervención visual.

## Behavior Scenarios

### Scenario 1: Administrador ve la acción de edición

Given un usuario con el permiso contractual de Administrador de Concursos  
When se renderiza un concurso editable en el listado  
Then MUST mostrarse la acción de edición con nombre accesible

### Scenario 2: Usuario sin permiso

Given un usuario sin el permiso contractual  
When se renderiza el listado o intenta abrir la ruta  
Then MUST no ver la acción y MUST recibir acceso denegado por URL directa

### Scenario 3: Navegación mediante router

Given una acción de edición habilitada  
When el administrador la activa  
Then MUST navegarse a la ruta de edición mediante el route builder

### Scenario 4: Acceso directo

Given una URL válida de edición  
When se abre directamente  
Then MUST renderizarse AdminLayout y cargarse el concurso desde el parámetro

### Scenario 5: Refresh de edición

Given la página de edición cargada  
When se recarga el navegador  
Then MUST reconstruirse el formulario sin `location.state`

### Scenario 6: Concurso inexistente

Given un código inexistente  
When se consulta el GET editable  
Then MUST mostrarse un estado 404 o equivalente

### Scenario 7: Usuario no creador

Given un concurso creado por otro administrador  
When se intenta cargar o actualizar  
Then MUST mostrarse el error contractual y MUST no habilitarse el submit

### Scenario 8: Concurso iniciado

Given un concurso cuya fecha de inicio ya pasó  
When se intenta editar  
Then MUST bloquearse la edición y mostrarse la explicación contractual

### Scenario 9: Concurso finalizado

Given un concurso finalizado  
When se intenta editar  
Then MUST bloquearse la edición

### Scenario 10: Concurso próximo editable

Given un concurso próximo creado por el usuario  
When se carga la página  
Then MUST precargarse el formulario en modo edit

### Scenario 11: Loading inicial

Given el GET editable pendiente  
When se renderiza la página  
Then MUST mostrarse el loading existente o equivalente

### Scenario 12: Precarga completa

Given una respuesta válida  
When se inicializa el formulario  
Then MUST precargarse metadata, congelamiento, problemas y colores

### Scenario 13: Código read-only

Given el formulario edit  
When se renderiza el código  
Then MUST mostrarse como read-only cuando el PUT no permita cambiarlo

### Scenario 14: Contraseña no expuesta

Given un concurso privado  
When se carga la edición  
Then MUST no mostrarse ni inventarse la contraseña actual

### Scenario 15: Mantener privacidad

Given un concurso privado y una actualización sin cambio de contraseña  
When se construye el request  
Then MUST conservarse la privacidad únicamente si el contrato permite hacerlo de forma segura

### Scenario 16: Contrato privado insuficiente

Given que el PUT no puede conservar la contraseña sin reenviarla  
When se diseña el flujo  
Then MUST registrarse una dependencia backend y MUST no enviarse vacío silenciosamente

### Scenario 17: Congelamiento cero

Given `minutosCongelamiento` igual a cero  
When se valida contra una duración positiva  
Then el valor MUST ser válido

### Scenario 18: Congelamiento negativo

Given `minutosCongelamiento` negativo  
When se valida  
Then el formulario MUST mostrar error y bloquear submit

### Scenario 19: Congelamiento igual a duración

Given congelamiento igual a `duracionMinutos`  
When se valida  
Then MUST considerarse inválido

### Scenario 20: Congelamiento mayor a duración

Given congelamiento mayor que la duración  
When se valida  
Then MUST bloquearse el submit

### Scenario 21: Duración vuelve inválido el congelamiento

Given un congelamiento previamente válido  
When se reduce la duración hasta hacerlo igual o mayor  
Then MUST revalidarse y mostrar error

### Scenario 22: ZIP ausente

Given el formulario válido sin archivo ZIP  
When se intenta actualizar  
Then MUST bloquearse el submit o mostrarse la validación contractual

### Scenario 23: ZIP inválido

Given un archivo sin extensión `.zip` o mayor a 100 MB  
When se selecciona  
Then MUST mostrarse un error y MUST no enviarse

### Scenario 24: Problemas existentes

Given la respuesta contiene problemas  
When se renderiza edit  
Then MUST mostrarse la colección completa sin acciones de agregar o eliminar

### Scenario 25: Inciso estable

Given un problema existente  
When se renderiza en edición  
Then el inciso SHOULD ser read-only

### Scenario 26: Cantidad de casos estable

Given un problema con cantidad de casos  
When se edita  
Then la cantidad MUST conservarse y MUST no ser modificable

### Scenario 27: Color actual visible

Given un problema con color contractual válido  
When se renderiza  
Then MUST mostrarse el label, el globo y la selección actual

### Scenario 28: Selector limitado

Given el selector de color abierto  
When se muestran opciones  
Then MUST contener únicamente los trece colores permitidos

### Scenario 29: Cambio de color válido

Given dos problemas con colores únicos  
When se cambia uno a otro color libre  
Then el formulario MUST permanecer válido y serializar el valor API correcto

### Scenario 30: Color repetido

Given dos problemas con el mismo color normalizado  
When se valida  
Then MUST identificarse el conflicto y bloquearse el submit

### Scenario 31: Color ausente

Given un problema sin color  
When se valida  
Then MUST mostrarse un error asociado

### Scenario 32: Color no reconocido

Given un valor backend fuera del catálogo  
When se carga la edición  
Then MUST mostrarse fallback seguro y bloquearse el submit hasta corregirlo

### Scenario 33: Más de trece problemas

Given un concurso con catorce problemas  
When se valida la unicidad  
Then MUST mostrarse una incompatibilidad contractual y MUST no enviarse el PUT

### Scenario 34: Mapper backend a nombre

Given un valor API válido  
When se solicita su label  
Then MUST devolverse el nombre visible correspondiente

### Scenario 35: Mapper backend a hexadecimal

Given un valor API válido  
When se solicita su representación visual  
Then MUST devolverse el hexadecimal correspondiente

### Scenario 36: Mapper selección a API

Given una opción seleccionada  
When se construye el FormData  
Then MUST enviarse la representación contractual confirmada

### Scenario 37: Fallback del mapper

Given un valor desconocido  
When se mapea  
Then MUST devolverse un fallback seguro sin tratarlo como válido

### Scenario 38: Submit edit

Given el formulario válido y un ZIP válido  
When se activa `Actualizar concurso`  
Then MUST ejecutarse el PUT multipart y MUST no ejecutarse la creación

### Scenario 39: Doble submit

Given una actualización pending  
When el usuario intenta enviar otra vez  
Then MUST evitarse una segunda solicitud

### Scenario 40: Actualización exitosa

Given el PUT exitoso  
When termina la mutation  
Then MUST mostrarse feedback y actualizarse la caché relevante

### Scenario 41: Actualización fallida

Given el PUT responde con un error contractual  
When termina la mutation  
Then MUST mantenerse el formulario y mostrarse un mensaje seguro

### Scenario 42: Fecha local a UTC

Given una fecha UTC precargada  
When el usuario no la modifica y actualiza  
Then MUST preservarse el instante sin desplazamiento doble

### Scenario 43: Apertura del modal

Given un concurso con colores disponibles  
When se activa la segunda acción  
Then MUST abrirse un modal read-only con los problemas ordenados

### Scenario 44: Modal sin request duplicado

Given el listado ya incluye problemas y colores  
When se abre el modal  
Then MUST utilizarse la caché existente y MUST no ejecutarse otro request

### Scenario 45: Listado sin colores

Given el listado no incluye problemas o colores  
When se evalúa el modal  
Then MUST no inventarse información ni utilizarse GET editar para todos los estados

### Scenario 46: Modal vacío

Given un concurso sin problemas en los datos disponibles  
When se abre el modal  
Then MUST mostrarse un estado vacío accesible

### Scenario 47: Modal accesible

Given el modal abierto  
When el usuario pulsa Escape o Cerrar  
Then MUST cerrarse y devolver el foco al disparador

### Scenario 48: Modal responsive

Given una lista extensa en móvil  
When se abre el modal  
Then MUST mantenerse usable mediante scroll interno sin overflow global

### Scenario 49: Colores actualizados en modal

Given una actualización exitosa de colores  
When se regresa al listado y se abre el modal  
Then MUST mostrarse la nueva asignación sin reload completo

### Scenario 50: Creación preservada

Given la extracción de un formulario compartido  
When se abre create  
Then MUST conservarse el comportamiento y el texto `Crear Concurso`

### Scenario 51: Ranking preservado

Given el mapper compartido disponible  
When termina el change  
Then la interfaz pública de ranking MUST no haber cambiado

## Edge Cases

- El listado no contiene propiedad de creador.
- El listado no contiene estado temporal suficiente.
- El listado contiene colores pero no títulos.
- El GET editable devuelve problemas desordenados.
- La representación de color usa nombre con acentos o casing diferente.
- El backend acepta hexadecimal en lectura y nombre en escritura.
- El catálogo frontend y backend difieren.
- Existen problemas legacy sin color.
- Existen colores duplicados en datos legacy.
- Existen catorce o más problemas.
- El ZIP contiene incisos con casing diferente.
- El ZIP cambia el número de casos.
- La fecha está cerca de un cambio de día o DST.
- La fecha local es inválida o ambigua.
- El concurso cambia a iniciado mientras el formulario está abierto.
- La mutation termina después de salir de la página.
- La contraseña nueva contiene espacios válidos.
- El PUT requiere contraseña para privados, pero el GET no la devuelve.
- El listado actualiza mientras el modal está abierto.
- El usuario pierde el rol durante la edición.
- `GlobeIllustration` no admite color dinámico.
- `api.generated.ts` está desactualizado respecto al backend.
- La respuesta de error contiene detalles internos que no deben mostrarse.

## Acceptance Criteria

- Las dos acciones MUST integrarse en el listado.
- La ruta de edición MUST usar AdminLayout y guard.
- La edición MUST ser recargable.
- Solo concursos próximos del creador MUST actualizarse.
- El formulario MUST reutilizar la creación.
- El código MUST permanecer inmutable cuando corresponda.
- `Actualizar concurso` MUST ejecutar el PUT real.
- `minutosCongelamiento` MUST cumplir las reglas contractuales.
- ZIP MUST ser obligatorio.
- Problemas MUST conservar cantidad e incisos.
- Los trece colores MUST representarse desde una fuente única.
- Colores inválidos o repetidos MUST bloquear el submit.
- Más de trece problemas MUST bloquear el submit.
- `GlobeIllustration` MUST reutilizarse.
- El modal MUST ser read-only y accesible.
- El modal MUST evitar requests innecesarios.
- La privacidad MUST no cambiar accidentalmente.
- El FormData MUST coincidir con backend.
- La caché MUST reflejar la actualización.
- Create, listado y rutas existentes MUST conservarse.
- Ranking MUST permanecer fuera del alcance funcional.
- Lint, typecheck, tests y build MUST pasar antes de completar el change.

## Out of Scope

- Ranking público.
- Congelamiento visual.
- Polling o WebSockets.
- Cambios del juez.
- Nuevos colores.
- Colores libres.
- Más de trece colores.
- Altas o bajas de problemas.
- Cambios de cantidad de casos.
- Edición de concursos iniciados o finalizados.
- Cambios de autenticación, roles, router o dependencias.
- Rediseño completo de creación.
