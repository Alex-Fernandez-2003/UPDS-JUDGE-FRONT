# Spec

## Requirements

### Change Identity Requirements

- El change MUST llamarse `fix-admin-contests-filters-summary-branding-user-layout`.
- El change MUST residir en `docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/`.
- El change MUST tratarse como corrección e integración.
- El change MUST NOT presentarse como una historia nueva.
- Todos los fixes descritos MUST permanecer en un único change.

### Administrative Filter Requirements

- El frontend MUST definir un tipo contractual para los filtros administrativos.
- El tipo MUST aceptar únicamente:
  - `todos`;
  - `activos`;
  - `proximos`;
  - `finalizados`.
- La UI MAY mostrar la etiqueta `Pendientes`.
- La etiqueta `Pendientes` MUST mapearse a `proximos`.
- La etiqueta y el valor contractual MUST almacenarse separadamente.
- El JSX MUST NOT contener traducciones dispersas de etiquetas a valores.
- `Todos` MUST enviar `todos`.
- `Activos` MUST enviar `activos`.
- `Pendientes` MUST enviar `proximos`.
- `Finalizados` MUST enviar `finalizados`.
- El frontend MUST NOT enviar `activo`.
- El frontend MUST NOT enviar `proximo`.
- El frontend MUST NOT enviar `pendiente`.
- El frontend MUST NOT enviar `pendientes`.
- El frontend MUST NOT enviar `finalizado`.
- El request MUST conservar modalidad, búsqueda, página y tamaño de página.

### Endpoint Requirements

- Los endpoints MUST estar centralizados en `src/lib/api/endpoints.ts`.
- El listado administrativo MUST utilizar `Concursos/mis-creados`.
- El resumen administrativo MUST utilizar `Concursos/mis-resumen`.
- Los componentes MUST NOT contener paths.
- Los paths MUST NOT incluir host.
- Los paths MUST NOT duplicar `/api`.
- El frontend MUST NOT utilizar `mis-concursos`.
- El frontend MUST NOT inventar endpoints adicionales.

### Administrative List Requirements

- El listado MUST usar GET.
- El listado MUST enviar `filtro`.
- El listado MUST enviar `modalidad` cuando corresponda.
- El listado MUST enviar `busqueda` cuando corresponda.
- El listado MUST enviar `pagina`.
- El listado MUST enviar `tamanoPagina`.
- La respuesta MUST modelarse separadamente del resumen.
- La respuesta MUST incluir:
  - `total`;
  - `pagina`;
  - `tamanoPagina`;
  - `concursos`.
- Cada item MUST representar:
  - código;
  - nombre;
  - estado temporal;
  - modalidad;
  - fecha de inicio;
  - duración;
  - cantidad de problemas;
  - cantidad de participantes.
- El listado MUST continuar alimentando tabla y paginación.
- La tabla MUST NOT derivar valores desde el resumen.

### Administrative Summary Requirements

- El resumen MUST usar GET.
- El resumen MUST utilizar `Concursos/mis-resumen`.
- El resumen MUST modelarse como:
  - `activos`;
  - `proximos`;
  - `finalizados`.
- El resumen MUST NOT recibir filtros del listado.
- El resumen MUST NOT derivarse del array paginado.
- El resumen MUST NOT derivarse de `total`.
- El resumen MUST NOT derivarse de los resultados visibles.
- El resumen MUST NOT incluirse dentro del tipo de respuesta paginada.
- `Pendientes` MUST mostrar `summary.proximos`.
- Si existe una tarjeta total, MUST calcularse solo desde los tres valores del resumen.
- No MUST agregarse una tarjeta total si no existe actualmente.

### Query Key Requirements

- La query key del listado MUST incluir:
  - filtro;
  - modalidad;
  - búsqueda;
  - página;
  - tamaño de página.
- La query key del resumen MUST ser independiente.
- La query key del resumen MUST NOT incluir filtros.
- La query key del resumen MUST NOT incluir paginación.
- Cambiar un filtro MUST actualizar únicamente el listado.
- Cambiar la página MUST actualizar únicamente el listado.
- Cambiar el tamaño MUST actualizar únicamente el listado.
- Cambiar la búsqueda MUST actualizar únicamente el listado.
- Cambiar modalidad MUST actualizar únicamente el listado.

### Summary Refresh Policy Requirements

- El resumen MUST solicitarse al montar la pantalla.
- El resumen MUST solicitarse al recargar la página.
- El resumen MUST poder solicitarse manualmente.
- El resumen MUST NOT solicitarse por cambio de filtro.
- El resumen MUST NOT solicitarse por cambio de búsqueda.
- El resumen MUST NOT solicitarse por cambio de modalidad.
- El resumen MUST NOT solicitarse por cambio de página.
- El resumen MUST NOT solicitarse por cambio de tamaño.
- El resumen SHOULD desactivar refetch por foco.
- El resumen SHOULD desactivar refetch por reconexión.
- El resumen SHOULD utilizar un stale time que evite solicitudes automáticas innecesarias.
- La política MUST mantener el fetch inicial habilitado.

### Manual Refresh Requirements

- El botón existente de actualización MUST refrescar listado y resumen.
- El refresh MUST conservar el estado actual de filtros.
- El refresh MUST conservar la página actual.
- El refresh MUST conservar la búsqueda.
- El refresh MUST conservar la modalidad.
- El refresh MUST evitar activaciones duplicadas mientras esté pendiente.
- El botón MUST comunicar el estado de actualización.
- El botón MUST conservar un nombre accesible.
- El change MUST NOT crear un segundo botón exclusivo para el resumen.

### Independent State Requirements

- Listado y resumen MUST manejar loading de forma independiente.
- Listado y resumen MUST manejar error de forma independiente.
- Listado y resumen MUST manejar success de forma independiente.
- Listado y resumen MUST manejar refreshing de forma independiente.
- Un error del resumen MUST NOT ocultar una tabla válida.
- Un error del listado MUST NOT reemplazar el resumen válido.
- Un error del resumen MUST NOT mostrarse como valores cero válidos.
- Un error del listado MUST NOT modificar los conteos del resumen.
- Cada error MUST mostrarse cerca del área afectada.

### SummaryCards Requirements

- `ContestsSummaryCards` MUST reutilizarse.
- El change MUST NOT recrear sus tarjetas dentro de `ContestsAdminScreen`.
- Las tarjetas MUST aparecer antes de filtros, tabla y paginación.
- Las tarjetas MUST recibir o consumir el resumen separado.
- La tarjeta Activos MUST usar `activos`.
- La tarjeta Pendientes MUST usar `proximos`.
- La tarjeta Finalizados MUST usar `finalizados`.
- Las tarjetas MUST representar loading.
- Las tarjetas MUST representar error.
- Las tarjetas MUST representar refreshing sin borrar datos válidos cuando el patrón actual lo permita.
- Las tarjetas MUST usar encabezados comprensibles.

### Type Requirements

- El frontend MUST definir un tipo de filtro contractual.
- El frontend MUST definir un tipo de item administrativo.
- El frontend MUST definir un tipo de respuesta paginada.
- El frontend MUST definir un tipo de resumen.
- Los tipos MUST permanecer separados.
- El frontend MUST NOT utilizar `any`.
- El frontend MUST NOT utilizar casts inseguros para ocultar diferencias.
- Los tipos generados MAY reutilizarse cuando representen correctamente el contrato.

### Branding Requirements

- La interfaz clara MUST utilizar `src/assets/logo.svg`.
- `src/assets/logo-dark.svg` MUST quedar disponible como variante explícita.
- El change MUST NOT implementar tema oscuro.
- El componente de logo MUST centralizar los imports de ambos SVG.
- El componente MUST aceptar una variante documentada.
- El componente SHOULD aceptar className o tamaño razonable.
- El logo MUST mantener su proporción.
- El logo MUST incluir texto alternativo adecuado.
- El logo MUST NOT deformarse.
- Los layouts MUST reutilizar el componente.
- No MUST duplicarse el import del SVG en cada pantalla.

### Provisional Branding Requirements

- Las representaciones provisionales de UPDS Judge MUST sustituirse.
- Logos de React o Vite usados como marca MUST eliminarse visualmente.
- Cuadros con una letra usados como marca MUST sustituirse.
- Iconos funcionales de React o Lucide MUST permanecer cuando no representen branding.
- Un asset provisional MUST eliminarse únicamente cuando no tenga imports.
- El cambio MUST verificar AuthLayout, login, register, AdminLayout, UserLayout, Sidebar, headers, Forbidden y NotFound cuando correspondan.

### Favicon Requirements

- `index.html` MUST referenciar el favicon real.
- La referencia anterior de Vite MUST estar ausente.
- El asset referenciado MUST existir.
- El change MUST NOT regenerar o rediseñar el favicon.

### Asset Organization Requirements

- `src/assets/components/` MUST inspeccionarse archivo por archivo.
- Cada archivo MUST clasificarse como:
  - asset gráfico;
  - componente React;
  - provisional;
  - sin uso.
- Assets gráficos puros MAY permanecer en assets.
- Componentes React reutilizables MUST residir en una carpeta de componentes.
- Archivos sin uso MUST eliminarse solo después de confirmar referencias.
- El change MUST NOT mover todos los archivos indiscriminadamente.
- El change MUST NOT convertir todos los SVG en componentes React.

### Globe Component Requirements

- El globo MUST existir como un único recurso o componente reutilizable.
- El componente MUST reutilizar el asset real.
- El componente MUST aceptar `className`.
- El componente MUST permitir controlar tamaño mediante el patrón existente.
- El componente MUST poder marcarse como decorativo.
- Cuando sea decorativo, MUST utilizar semántica equivalente a `aria-hidden`.
- Cuando transmita información, MUST aceptar un nombre accesible.
- El componente MUST NOT contener lógica de concursos.
- El componente MUST NOT contener contadores.
- El componente MUST NOT llamar endpoints.
- El componente MUST NOT mostrarse en una pantalla solo para demostrar su existencia.
- No MUST crearse una segunda versión duplicada.

### User Layout Requirements

- El rol real `Usuario` MUST alcanzar la ruta existente asignada.
- El change MUST inspeccionar la ruta antes de modificar routing.
- El change MUST NOT asumir `/contests` sin confirmación.
- La página del usuario MUST renderizarse dentro del layout existente.
- El layout MUST mostrar la marca real.
- El layout MUST mostrar identidad.
- El layout MUST mostrar avatar o fallback.
- El layout MUST mostrar UserMenu.
- El layout MUST mostrar el contenido de la ruta.
- La experiencia MUST NOT quedar reducida a un botón de logout aislado.
- El change MUST NOT crear una nueva página de negocio.

### User Navigation Requirements

- La navegación MUST incluir únicamente rutas reales.
- La navegación MAY mostrar Concursos cuando exista su ruta.
- La navegación MAY mostrar Mis envíos cuando exista su ruta.
- `Clasificación global` MUST NOT mostrarse.
- No MUST mostrarse ningún enlace que resuelva a NotFound.
- La opción activa MUST derivarse de la ubicación.
- La opción activa SHOULD usar `aria-current="page"`.

### User Menu and Logout Requirements

- El User Layout MUST reutilizar el UserMenu existente.
- El change MUST NOT crear otro menú.
- El menú MUST mostrar nombre derivado del JWT.
- El menú MUST mostrar una descripción legible del rol.
- El menú MUST mostrar avatar o fallback.
- El menú MUST incluir `Cerrar sesión`.
- Logout MUST eliminar `sessionStorage['token']`.
- Logout MUST cerrar el menú.
- Logout MUST navegar a `/login` con replace.
- Logout MUST permitir que AuthTransport deje de enviar Bearer.
- Logout MUST NOT llamar un endpoint backend.
- AdminLayout y UserLayout MUST reutilizar la misma lógica de logout.

### Routing Scope Requirements

- El change MUST conservar la prioridad administrativa existente.
- El change MUST NOT rehacer todos los guards.
- El change MAY ajustar el routing solo para exponer el User Layout existente.
- El change MUST NOT modificar claims o roles.
- El change MUST NOT introducir una nueva política de autorización.

### Documentation Requirements

- El change MUST modificar únicamente `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- El change MUST NOT crear otro archivo en `docs/historias/`.
- La modificación SHOULD agregarse como sección posterior.
- La sección MUST registrar:
  - filtros plurales;
  - mapping Pendientes a próximos;
  - endpoint de listado;
  - endpoint de resumen;
  - restauración de SummaryCards;
  - política de actualización;
  - botón Actualizar;
  - logos reales;
  - variante dark futura;
  - componente de logo;
  - componente del globo;
  - exposición del User Layout;
  - UserMenu;
  - logout;
  - archivos principales;
  - validaciones;
  - pendientes.
- El change MUST preservar la documentación histórica válida.
- Las rutas de capturas MUST registrarse como pendientes.
- El documento MUST NOT enlazar capturas inexistentes.

### Accessibility Requirements

- El logo MUST tener alt adecuado.
- Las dimensiones del logo MUST ser estables.
- El botón Actualizar MUST tener nombre accesible.
- Los estados loading y error MUST ser comprensibles.
- Las tarjetas MUST tener encabezados legibles.
- UserMenu MUST funcionar mediante teclado.
- Logout MUST tener nombre accesible.
- La navegación activa SHOULD usar `aria-current`.
- El globo decorativo MUST estar oculto para tecnologías de asistencia.
- Focus-visible MUST mantenerse.
- Los elementos interactivos MUST usar cursor coherente.
- La UI MUST NOT depender únicamente del color.

### Responsive Requirements

- Las tarjetas MUST adaptarse a móvil.
- Los filtros MUST evitar overflow.
- La tabla MUST conservar su comportamiento actual.
- El logo MUST mantener proporción en headers.
- AdminLayout MUST continuar funcionando.
- UserLayout MUST funcionar en desktop y móvil.
- UserMenu MUST permanecer accesible.
- Los nombres largos MUST truncarse o envolver sin romper el layout.
- La navegación horizontal MUST adaptarse mediante el patrón existente.
- El Sidebar móvil MUST continuar funcionando.

### Security Requirements

- Los endpoints administrativos MUST continuar usando AuthTransport.
- El token MUST NOT pasarse manualmente a componentes.
- Los mocks MUST NOT contener JWT reales.
- Logout MUST eliminar la sesión local.
- El frontend MUST NOT presentar filtros visuales como seguridad backend.
- El change MUST NOT modificar la autorización backend.

## Behavior Scenarios

### Scenario 1: Filtro Todos

Given la pestaña visual Todos  
When se construye la query del listado  
Then el parámetro `filtro` MUST ser `todos`

### Scenario 2: Filtro Activos

Given la pestaña visual Activos  
When se construye la query  
Then el parámetro `filtro` MUST ser `activos`

### Scenario 3: Filtro Pendientes

Given la pestaña visual Pendientes  
When se construye la query  
Then el parámetro `filtro` MUST ser `proximos`

### Scenario 4: Filtro Finalizados

Given la pestaña visual Finalizados  
When se construye la query  
Then el parámetro `filtro` MUST ser `finalizados`

### Scenario 5: Alias inválido

Given cualquier filtro administrativo  
When se inspecciona el request  
Then MUST no enviarse un valor singular o `pendientes`

### Scenario 6: Parámetros del listado

Given filtro, modalidad, búsqueda y paginación activos  
When se solicita el listado  
Then todos los parámetros aplicables MUST conservarse

### Scenario 7: Endpoint de listado

Given la pantalla administrativa montada  
When la query de listado se ejecuta  
Then MUST utilizar `Concursos/mis-creados`

### Scenario 8: Endpoint de resumen

Given la pantalla administrativa montada  
When la query de resumen se ejecuta  
Then MUST utilizar `Concursos/mis-resumen`

### Scenario 9: Respuesta paginada

Given una respuesta válida de `mis-creados`  
When el frontend la procesa  
Then MUST actualizar tabla, total y paginación sin buscar datos de resumen

### Scenario 10: Resumen inicial

Given que se abre la pantalla administrativa  
When se montan sus queries  
Then el resumen MUST solicitarse una vez inicialmente

### Scenario 11: Cambio de filtro

Given un resumen ya cargado  
When el usuario cambia de Activos a Pendientes  
Then MUST volver a solicitarse únicamente el listado

### Scenario 12: Cambio de búsqueda

Given un resumen ya cargado  
When cambia la búsqueda  
Then el resumen MUST no volver a solicitarse automáticamente

### Scenario 13: Cambio de página

Given una tabla paginada  
When el usuario cambia de página  
Then solo el listado MUST actualizarse

### Scenario 14: Foco de ventana

Given un resumen cargado  
When la ventana recupera foco  
Then el resumen SHOULD no refetchearse automáticamente

### Scenario 15: Actualización manual

Given filtros y página activos  
When el usuario presiona Actualizar  
Then listado y resumen MUST volver a solicitarse conservando el estado actual

### Scenario 16: Doble actualización

Given que la actualización está pendiente  
When el usuario intenta activarla otra vez  
Then MUST evitarse una segunda coordinación simultánea

### Scenario 17: SummaryCards restauradas

Given que ContestsAdminScreen se renderiza  
When el contenido administrativo aparece  
Then ContestsSummaryCards MUST mostrarse antes de la tabla

### Scenario 18: Conteo de Pendientes

Given un resumen con `proximos: 4`  
When se muestran las tarjetas  
Then Pendientes MUST mostrar 4

### Scenario 19: Error solo de resumen

Given un listado exitoso y un resumen fallido  
When la pantalla se renderiza  
Then la tabla MUST permanecer visible y las tarjetas MUST mostrar su error

### Scenario 20: Error solo de listado

Given un resumen exitoso y un listado fallido  
When la pantalla se renderiza  
Then las tarjetas MUST conservar valores válidos y la tabla MUST mostrar su error

### Scenario 21: Logo claro

Given una interfaz clara  
When se renderiza AppLogo  
Then MUST utilizar `logo.svg`

### Scenario 22: Variante dark disponible

Given que un consumidor solicita la variante dark  
When se renderiza AppLogo  
Then MUST utilizar `logo-dark.svg` sin activar un tema global

### Scenario 23: Branding provisional ausente

Given una pantalla con marca UPDS Judge  
When se renderiza después del fix  
Then MUST no mostrar logos de React, Vite o una letra provisional

### Scenario 24: Favicon

Given que se inspecciona `index.html`  
When se resuelve el favicon  
Then MUST apuntar al asset real y no al favicon de Vite

### Scenario 25: Clasificación de assets

Given un archivo dentro de `src/assets/components/`  
When se inspecciona su naturaleza  
Then MUST mantenerse, moverse o eliminarse según su tipo y uso confirmado

### Scenario 26: Globo decorativo

Given que GlobeIllustration se usa como decoración  
When se renderiza  
Then MUST aceptar className y permanecer oculto para tecnologías de asistencia

### Scenario 27: Globo informativo

Given que el globo comunica información en un uso futuro  
When se renderiza  
Then MUST poder recibir un nombre accesible sin incorporar lógica de negocio

### Scenario 28: Usuario alcanza su layout

Given una sesión con rol Usuario  
When el router resuelve su destino actual  
Then MUST mostrarse el User Layout existente y su contenido

### Scenario 29: User Layout completo

Given una página mínima de usuario  
When se renderiza dentro del layout  
Then MUST mostrar marca, navegación disponible, identidad, avatar y UserMenu

### Scenario 30: Navegación real

Given el User Layout  
When se construyen sus opciones  
Then MUST mostrar solo rutas existentes y MUST excluir Clasificación global

### Scenario 31: Menú del usuario

Given el User Layout visible  
When el usuario activa su menú  
Then MUST mostrarse la identidad y la acción Cerrar sesión

### Scenario 32: Logout

Given una sesión activa  
When el usuario selecciona Cerrar sesión  
Then MUST eliminarse el token, cerrarse el menú y navegarse a `/login` con replace

### Scenario 33: Bearer después de logout

Given que logout eliminó el token  
When se emite un request posterior  
Then AuthTransport MUST no agregar Authorization

### Scenario 34: Responsive administrativo

Given un viewport móvil  
When se renderiza la administración de concursos  
Then tarjetas y filtros MUST evitar overflow y la tabla MUST conservar su patrón actual

### Scenario 35: Responsive del usuario

Given un viewport móvil  
When se renderiza el User Layout  
Then logo, navegación y menú MUST permanecer utilizables

### Scenario 36: Documentación existente

Given el documento transversal existente  
When se registra el fix  
Then MUST agregarse una sección sin crear otro archivo ni eliminar información histórica

### Scenario 37: Evidencias pendientes

Given que las capturas no existen  
When se actualiza la documentación  
Then sus rutas MUST registrarse únicamente como pendientes y no como enlaces

## Edge Cases

- El filtro inicial no coincide con el catálogo contractual.
- El estado local contiene un alias antiguo.
- La URL conserva un filtro singular anterior.
- Modalidad vacía.
- Búsqueda con espacios.
- Página menor que uno.
- Tamaño de página fuera del rango backend.
- La query de resumen se monta dos veces bajo StrictMode.
- El botón Actualizar se activa durante el fetch inicial.
- El listado termina antes que el resumen.
- El resumen termina antes que el listado.
- El resumen falla después de haber mostrado datos previos.
- El listado cambia de filtro mientras una solicitud anterior está en curso.
- El backend devuelve una lista vacía.
- El backend devuelve cero en todas las tarjetas.
- El backend devuelve un item con estado `Proximo`.
- El componente SummaryCards todavía espera el contrato combinado anterior.
- La query key anterior incluye objetos no estables.
- `logo.svg` y `logo-dark.svg` exportan dimensiones diferentes.
- El logo se usa como background en alguna pantalla.
- Un archivo provisional sigue importado desde tests.
- `src/assets/components/` contiene `.tsx` y SVG con nombres similares.
- El globo ya tiene dos implementaciones.
- La ruta del rol Usuario no está registrada.
- El User Layout existe pero no está aplicado como ruta padre.
- El UserMenu solo está conectado a AdminLayout.
- No existe navegación de usuario adicional al contenido mínimo.
- El nombre del usuario es largo.
- El favicon real utiliza una ruta relativa incorrecta en build.
- La documentación ya contiene una sección de fixes posteriores.

## Acceptance Criteria

- Cada filtro MUST enviar su valor contractual correcto.
- `pendientes` MUST no aparecer como valor de request.
- El listado MUST consumir `mis-creados`.
- El resumen MUST consumir `mis-resumen`.
- Los tipos de ambas respuestas MUST estar separados.
- La query de listado MUST depender de filtros y paginación.
- La query de resumen MUST no depender de ellos.
- Cambiar filtros MUST no solicitar el resumen.
- El resumen MUST solicitarse al montar.
- Actualizar MUST refrescar ambas queries.
- Actualizar MUST conservar filtros.
- SummaryCards MUST mostrarse antes de la tabla.
- Pendientes MUST mostrar `proximos`.
- Un error del resumen MUST no ocultar la tabla.
- Un error del listado MUST no falsear el resumen.
- AppLogo MUST utilizar `logo.svg` por defecto.
- La variante dark MUST utilizar `logo-dark.svg`.
- No MUST implementarse un tema oscuro.
- No MUST quedar branding React/Vite visible.
- El favicon MUST continuar siendo el real.
- Los componentes React reutilizables MUST no permanecer en assets.
- El globo MUST tener un contrato presentacional reutilizable.
- El rol Usuario MUST alcanzar su layout existente.
- El User Layout MUST mostrar marca, navegación real, identidad, menú y contenido.
- Clasificación global MUST no aparecer.
- Logout MUST eliminar el token y navegar a login.
- AdminLayout, Sidebar, roles y creación de concursos MUST no presentar regresiones.
- El documento transversal existente MUST actualizarse.
- No MUST crearse otro documento en `docs/historias`.
- Las capturas MUST mantenerse pendientes.
- Format, lint, typecheck, tests y build MUST pasar.
- No MUST modificarse backend o database.
- No MUST realizarse commit o push.

## Out of Scope

- Tema oscuro y selector de tema.
- Nuevos filtros o endpoints.
- Edición y eliminación.
- Nuevos módulos de usuario.
- Clasificación global.
- Perfil y avatar subido.
- Lógica de ejercicios resueltos.
- Cambios de JWT o roles.
- Refactor global del app shell.
- Backend y base de datos.
