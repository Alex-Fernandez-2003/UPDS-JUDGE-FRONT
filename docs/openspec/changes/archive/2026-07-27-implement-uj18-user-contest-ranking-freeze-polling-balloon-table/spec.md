# Spec

## Requirements

### Functional Requirements: user-contest-ranking-routing

- La aplicación MUST registrar una ruta contextual de ranking.
- El path exacto MUST seguir las convenciones reales.
- La ruta MUST utilizar `UserLayout`.
- La ruta MUST conservar la navegación principal.
- La ruta MUST requerir sesión válida.
- La ruta MUST requerir el permiso contractual confirmado.
- La ruta MUST obtener `contestCode` desde params.
- La ruta MUST utilizar un route builder.
- La ruta MUST soportar acceso directo.
- La ruta MUST soportar refresh.
- La ruta MUST NOT depender de `location.state`.
- Un código inválido MUST producir un error controlado.
- Un `400` de concurso próximo MUST mostrarse como estado contractual.
- Un `401` MUST seguir la política global de sesión.
- Un `403` MUST mostrar acceso denegado.
- Un `404` MUST mostrar concurso no encontrado.
- El contexto administrativo MAY añadirse únicamente si el baseline confirma autorización y patrón previo.
- Una ruta administrativa, cuando corresponda, MUST conservar `AdminLayout` y sidebar.
- La implementación MUST NOT duplicar la página para administración.

### Functional Requirements: contest-context-ranking-navigation

- `ContestContextHeader` MUST incluir:
  - Problemas;
  - Mis envíos;
  - Ranking.
- El orden recomendado MUST ser Problemas, Mis envíos, Ranking, salvo que la navegación actual exija otro orden.
- La API de sección activa MUST admitir un valor equivalente a `ranking`.
- La sección activa MUST derivarse de la ruta o de una prop contractual.
- El Header MUST NOT usar estado local para simular tabs.
- El Header MUST NOT hardcodear rutas exclusivas de usuario.
- Los destinos MUST recibirse mediante descriptors o builders.
- Problemas y Mis envíos MUST conservar sus rutas y active state.
- Nombre, código, estado y duración MUST preservarse.
- Teclado, focus-visible y responsive MUST preservarse.

### Functional Requirements: ranking-contract-consumption

- El frontend MUST consumir el endpoint contractual real.
- La ruta completa MUST confirmarse en controller, OpenAPI y tipos generados.
- Los tipos generados SHOULD reutilizarse cuando existan.
- El frontend MUST NOT editar manualmente `api.generated.ts`.
- La query MUST utilizar el transporte autenticado existente.
- La query MUST NOT leer el token manualmente.
- La query key MUST incluir un namespace de ranking y `contestCode`.
- La query key MUST NOT incluir el tiempo actual.
- El response MUST adaptarse sin recalcular el algoritmo.
- El frontend MUST preservar el orden recibido.
- El frontend MUST utilizar `puesto`.
- El frontend MUST utilizar `problemasResueltos`.
- El frontend MUST presentar `tiempoTotal` como penalización.
- El frontend MUST NOT volver a sumar intentos.
- El frontend MUST NOT ordenar por nombre, puesto local o columnas.

### Functional Requirements: icpc-ranking-presentation

- La tabla MUST mostrar:
  - Posición;
  - Participante;
  - Problemas resueltos;
  - Penalización;
  - una columna por problema.
- La posición MUST provenir de `puesto`.
- El participante MUST mostrar `nombreUsuario`.
- `idUsuario` MUST NOT mostrarse como columna.
- Problemas resueltos MUST provenir de backend.
- Penalización MUST mostrar minutos contractuales.
- La unidad MUST ser comprensible.
- Los puestos compartidos MUST conservarse.
- Las columnas MUST ordenarse por inciso.
- Las columnas MUST NOT hardcodearse.
- La tabla MUST admitir scroll horizontal.
- La tabla MUST conservar semántica HTML.

### Functional Requirements: ranking-problem-columns

- Debe existir una fuente contractual para la lista de problemas.
- La fuente MUST permitir construir columnas cuando no existan participantes.
- Si el response no incluye una lista superior, el diseño MUST proponer la mínima extensión contractual.
- Cada problema MUST tener un inciso estable.
- Cada columna SHOULD tener un color contractual estable.
- Una inconsistencia de color entre detalles MUST no resolverse arbitrariamente.
- Cuando exista una fuente superior de problemas, MUST prevalecer sobre detalles divergentes.
- El frontend MUST registrar datos inconsistentes mediante un fallback seguro, sin exponer información sensible.

### Functional Requirements: ranking-problem-balloon-cells

- Una celda MUST interpretar el estado contractual real mediante un adapter.
- Los estados informados son:
  - Aceptado;
  - No resuelto;
  - No intentado.
- Strings y casing MUST confirmarse contra DTOs.
- Un aceptado MUST mostrar `GlobeIllustration`.
- Un aceptado MUST utilizar el color del problema.
- Un aceptado MUST mostrar el tiempo contractual cuando el diseño lo incluya.
- Un aceptado MUST mostrar la cantidad de fallos anteriores.
- Cero fallos MUST mostrarse como cero real o texto equivalente, no como ausencia.
- Un no resuelto MUST mostrar un estado visual de error o danger.
- Un no resuelto MUST mostrar la cantidad de fallos.
- Un no resuelto MUST NOT mostrar globo.
- Un no intentado MUST mostrar un estado neutral.
- Un no intentado MUST NOT mostrar globo.
- Un no intentado MUST NOT mostrarse como fallo.
- Un color desconocido MUST usar fallback neutral.
- La celda MUST proporcionar texto accesible.
- El color MUST NOT ser el único indicador.

### Functional Requirements: ranking-balloon-color-reuse

- La implementación MUST reutilizar `GlobeIllustration`.
- La implementación MUST reutilizar el mapper compartido de UJ-19.
- La implementación MUST NOT duplicar el catálogo.
- La implementación MUST NOT usar emojis.
- La implementación MUST NOT usar imágenes externas.
- La implementación MUST NOT duplicar el SVG.
- El valor contractual MUST convertirse al hexadecimal real mediante el mapper.
- Deben soportarse múltiples colores simultáneos.
- El tamaño del globo MUST ser apropiado para una celda.
- El componente MUST preservar accesibilidad.
- Ranking MUST NOT importar componentes internos de edición administrativa.

### Functional Requirements: ranking-freeze-notice

- La página MUST mostrar un aviso cuando `congelado` sea verdadero.
- El aviso MUST ocultarse cuando `congelado` sea falso.
- Backend MUST ser la fuente autoritativa del congelamiento.
- El reloj del navegador MUST NOT decidir por sí solo el estado congelado.
- El aviso MUST explicar que la clasificación pública está congelada.
- El aviso MUST explicar que los envíos posteriores al corte no se muestran.
- El aviso MUST explicar que el resultado final se revelará al finalizar.
- El aviso MUST NOT incluir `Ver mi posición`.
- El aviso MUST ser accesible.
- El aviso MUST envolver correctamente en móvil.

### Functional Requirements: ranking-freeze-data-consistency

- La tabla MUST utilizar el snapshot backend.
- Las cards de actividad MUST utilizar el mismo corte.
- El frontend MUST NOT consultar otro endpoint en vivo que revele actividad posterior.
- `Total de envíos` MUST representar envíos incluidos en la vista pública.
- `Problema más resuelto` MUST respetar el corte.
- `Problemas resueltos` y `Penalización` MUST provenir del snapshot.
- Las celdas MUST provenir del snapshot.
- `Inscritos` MAY permanecer sin congelarse cuando solo represente inscripciones.
- Esa decisión MUST documentarse.
- Si el DTO no permite cards consistentes, MUST proponerse una extensión backend mínima.
- El frontend MUST NOT mostrar actividad oculta, celdas pendientes ni contador de envíos congelados.

### Functional Requirements: ranking-ten-second-polling

- La query MUST realizar una consulta inicial.
- La query MUST volver a consultar cada `10 000 ms` mientras corresponda.
- TanStack Query `refetchInterval` SHOULD utilizarse cuando esté disponible.
- La implementación MUST NOT utilizar polling por subcomponente.
- La implementación MUST NOT crear intervalos duplicados.
- La implementación MUST NOT hacer reload completo.
- La implementación MUST detener requests al desmontar.
- La implementación MUST mantener datos anteriores durante background refetch cuando sea posible.
- El loading completo MUST utilizarse solo para la primera carga.
- El polling MUST continuar durante congelamiento.
- El polling MUST permitir una consulta posterior al final para revelar el ranking completo.
- El polling SHOULD detenerse cuando el concurso finalizado ya haya devuelto el resultado final.
- Los errores definitivos `401`, `403` o `404` SHOULD detener reintentos automáticos innecesarios.
- Los errores transitorios MAY reintentarse según la política real.
- La recuperación de conexión SHOULD reanudar la query según la configuración existente.

### Functional Requirements: contest-remaining-time-countdown

- Debe existir un countdown independiente del polling.
- El countdown MUST actualizarse localmente cada segundo.
- El countdown MUST NOT ejecutar HTTP cada segundo.
- El cálculo MUST usar fechas contractuales.
- La fuente MAY ser `fechaInicio` y `duracionMinutos`, `fechaFin`, o campos equivalentes confirmados.
- El cálculo MUST usar UTC correctamente.
- El cálculo MUST NOT aplicar una conversión doble.
- El tiempo MUST hacer clamp a cero.
- El tiempo MUST NOT mostrar valores negativos.
- El timer MUST limpiarse al desmontar.
- El timer MUST reiniciarse al cambiar de concurso.
- El formato MUST soportar más de veinticuatro horas.
- El estado final MUST mostrar `Finalizado` o `00:00:00` según la decisión visual.
- El temporizador MUST NOT utilizar `aria-live` cada segundo de forma intrusiva.
- Si el backend no entrega hora de servidor, el posible desfase MUST documentarse.

### Functional Requirements: ranking-summary-cards

- La página MUST mostrar exactamente cuatro cards:
  - Inscritos;
  - Problema más resuelto;
  - Total de envíos;
  - Tiempo restante.
- La página MUST NOT mostrar `Última actualización`.
- La página MUST NOT mostrar porcentaje de crecimiento.
- Inscritos MUST usar el total contractual.
- Inscritos MUST NOT usar `participantes.length` cuando existan inscritos sin envíos.
- Problema más resuelto MUST mostrar inciso y cantidad de aceptaciones.
- Problema más resuelto MAY mostrar color.
- Empates MUST resolverse mediante una regla contractual o determinista documentada.
- Ranking vacío MUST mostrar fallback.
- Total de envíos MUST utilizar un dato contractual.
- Total de envíos MUST NOT derivarse de `cantidadIntentos` sin equivalencia demostrada.
- Tiempo restante MUST utilizar el countdown.
- Las cards MUST conservar consistencia durante congelamiento.

### Functional Requirements: ranking-client-pagination

- La paginación MUST ser frontend cuando el endpoint entregue todos los participantes.
- El tamaño MUST ser cinco.
- La página inicial MUST ser uno.
- La colección visible MAY derivarse mediante `slice`.
- La paginación MUST mostrar anterior y siguiente.
- Los botones de páginas MAY mostrarse cuando coincidan con el patrón existente.
- Los controles MUST tener nombres accesibles.
- Los controles MUST indicar disabled.
- La metadata MUST mostrar el rango real.
- El texto SHOULD ser equivalente a `Mostrando 1–5 de 23 participantes`.
- Ranking vacío MUST mostrar rango cero o no mostrar metadata engañosa.
- La última página parcial MUST mostrar el número real de filas.
- Polling MUST conservar la página cuando siga siendo válida.
- Cuando el número de páginas disminuya, la página MUST ajustarse a la última válida.
- Polling MUST NOT volver siempre a página uno.
- Los puestos MUST no cambiar por paginación.
- El footer SHOULD reutilizar las convenciones visuales de `RecentSubmissionsTable`.

### Functional Requirements: ranking-cell-legend

- Debe existir una card inferior titulada `Leyenda de celdas`.
- La card MUST explicar:
  - aceptado;
  - no resuelto con fallos;
  - no intentado.
- La card MUST usar los mismos indicadores de las celdas.
- La card MUST NOT incluir `Enviado durante congelamiento`.
- La card MUST no depender solo del color.

### Functional Requirements: ranking-penalty-explanation

- Debe existir una card inferior titulada `Sistema de penalización`.
- La card MUST explicar la primera aceptación.
- La card MUST explicar veinte minutos por fallo previo.
- La card MUST aclarar que problemas no resueltos no suman tiempo.
- La card MUST aclarar que los fallos de un problema no resuelto solo afectan cuando se obtiene aceptación, según el contrato.
- La card MUST explicar el orden por resueltos y menor penalización.
- La card MUST NOT incluir enlace a reglas.
- La página MUST tener exactamente dos cards informativas inferiores.
- La página MUST NOT crear `Información del problema`.

### Functional Requirements: ranking-access-control

- Un usuario no autenticado MUST seguir el flujo global hacia login.
- Un usuario autenticado con rol permitido MUST poder abrir un concurso público iniciado.
- Un usuario inscrito MUST poder abrir un concurso privado cuando backend lo autorice.
- Un usuario no inscrito MUST recibir el `403` contractual.
- Un concurso próximo MUST mostrar un estado claro.
- Un concurso inexistente MUST mostrar not found.
- Un concurso finalizado MUST mostrar el ranking final.
- El frontend MUST NOT omitir validaciones backend.

### Functional Requirements: ranking-page-states

- La primera carga MUST mostrar skeleton o loading coherente.
- El Header SHOULD preservarse cuando sus datos ya estén disponibles.
- Background refetch MUST no ocultar la tabla.
- Background refetch MAY mostrar un indicador discreto.
- La página MUST manejar ranking vacío.
- La página MUST manejar concurso sin envíos.
- La página MUST manejar problemas sin datos.
- La página MUST manejar concurso próximo.
- La página MUST manejar acceso denegado.
- La página MUST manejar not found.
- La página MUST manejar error inesperado.
- Un error inesperado SHOULD ofrecer reintento.
- Los mensajes MUST ser seguros.

### Non-Functional Requirements

- La tabla MUST utilizar semántica HTML.
- La tabla MUST tener caption visible u oculto.
- Los headers MUST usar scope.
- Los globos MUST tener nombres accesibles.
- Los controles MUST conservar focus-visible.
- La página MUST ser operable por teclado.
- El aviso congelado MUST utilizar un rol apropiado.
- La página MUST funcionar en escritorio, tablet y móvil.
- La tabla MAY usar scroll horizontal.
- Las columnas MUST mantener legibilidad.
- Las cards SHOULD adaptarse a cuatro, dos y una columna según breakpoints reales.
- La implementación MUST evitar ciclos de imports.
- La implementación MUST preservar funciones anteriores.

## Behavior Scenarios

### Scenario 1: Abrir Ranking desde el Header

Given un usuario autenticado dentro de un concurso  
When activa la opción Ranking  
Then MUST navegar a la ruta contextual del mismo concurso

### Scenario 2: Navegación contextual completa

Given el Header del concurso  
When se renderiza  
Then MUST mostrar Problemas, Mis envíos y Ranking

### Scenario 3: Ranking activo

Given la ruta de ranking activa  
When se renderiza el Header  
Then Ranking MUST marcarse mediante el estado de ruta y `aria-current`

### Scenario 4: Ruta directa

Given una URL válida de ranking  
When se abre directamente  
Then MUST cargarse UserLayout y el concurso correcto

### Scenario 5: Refresh

Given la página de ranking cargada  
When el navegador se recarga  
Then MUST reconstruirse desde `contestCode` sin `location.state`

### Scenario 6: Código inválido

Given un código malformado  
When se ejecuta la query  
Then MUST mostrarse un error controlado

### Scenario 7: Usuario no autenticado

Given una sesión ausente  
When se abre la ruta  
Then MUST aplicarse el guard global de login

### Scenario 8: Concurso privado inscrito

Given un usuario inscrito en un concurso privado iniciado  
When abre Ranking  
Then backend MUST autorizar y la tabla MUST mostrarse

### Scenario 9: Concurso privado no inscrito

Given un usuario no inscrito  
When abre el ranking privado  
Then MUST mostrarse acceso denegado

### Scenario 10: Concurso próximo

Given un concurso que todavía no comenzó  
When se consulta el ranking  
Then MUST mostrarse un estado de concurso próximo, no un error genérico

### Scenario 11: Concurso finalizado

Given un concurso finalizado  
When se consulta  
Then MUST mostrarse el ranking final y ocultarse el aviso congelado

### Scenario 12: Orden del backend

Given participantes recibidos en orden contractual  
When se renderiza la tabla  
Then MUST preservarse el orden sin sort local

### Scenario 13: Desempate por penalización

Given dos participantes con los mismos resueltos y penalizaciones diferentes  
When se renderizan  
Then MUST conservarse el orden backend

### Scenario 14: Puestos compartidos

Given puestos `1, 2, 2, 4`  
When se renderizan  
Then MUST utilizarse `puesto` y MUST no utilizarse el índice

### Scenario 15: Participante

Given una fila contractual  
When se renderiza  
Then MUST mostrarse `nombreUsuario` y MUST no mostrarse `idUsuario`

### Scenario 16: Problemas resueltos

Given un participante con tres problemas resueltos  
When se renderiza  
Then MUST mostrarse el valor backend tres sin contarlo localmente

### Scenario 17: Penalización

Given `tiempoTotal` igual a 342  
When se renderiza  
Then MUST mostrarse como 342 minutos sin sumar intentos

### Scenario 18: Columnas dinámicas

Given problemas A, B, C, D y E  
When se renderiza la tabla  
Then MUST generarse una columna por inciso

### Scenario 19: Ranking vacío con problemas

Given cero participantes y una lista contractual de problemas  
When se renderiza  
Then MUST conservarse la estructura de columnas y mostrarse empty

### Scenario 20: Participante sin envíos

Given un inscrito sin envíos  
When backend lo incluya contractualmente  
Then MUST mostrarse con cero resueltos y estados no intentados

### Scenario 21: Solo fallos

Given un participante sin aceptaciones y tres fallos en A  
When se renderiza  
Then A MUST mostrarse no resuelto con tres fallos y sin globo

### Scenario 22: Aceptado sin fallos

Given estado Aceptado, intentos cero y tiempo 42  
When se renderiza  
Then MUST mostrarse globo, cero fallos y 42 minutos

### Scenario 23: Aceptado con fallos

Given estado Aceptado, intentos dos y tiempo 68  
When se renderiza  
Then MUST mostrarse globo, dos fallos y 68 minutos

### Scenario 24: No intentado

Given estado No intentado  
When se renderiza  
Then MUST mostrarse un estado neutral sin globo

### Scenario 25: Color desconocido

Given un color que el mapper no reconoce  
When se renderiza  
Then MUST utilizarse fallback neutral, texto accesible y MUST no producirse crash

### Scenario 26: Múltiples colores

Given problemas con diferentes colores contractuales  
When se renderizan aceptaciones  
Then cada columna MUST usar su color real

### Scenario 27: Congelamiento cero

Given `minutosCongelamiento` igual a cero  
When el concurso está activo  
Then `congelado` SHOULD permanecer falso y el aviso MUST estar oculto

### Scenario 28: Antes del congelamiento

Given un concurso de 120 minutos con congelamiento de 30 y minuto actual 89  
When backend responde `congelado=false`  
Then el aviso MUST permanecer oculto

### Scenario 29: Inicio del congelamiento

Given el mismo concurso en el minuto 90  
When backend responde `congelado=true`  
Then el aviso MUST mostrarse

### Scenario 30: Durante congelamiento

Given `congelado=true`  
When continúan llegando envíos  
Then la UI MUST mostrar solamente el snapshot backend

### Scenario 31: Cards congeladas

Given la tabla congelada  
When se renderizan las cards  
Then Total de envíos y Problema más resuelto MUST usar el mismo corte

### Scenario 32: Polling durante congelamiento

Given un ranking congelado  
When transcurren diez segundos  
Then MUST ejecutarse otro refetch sin revelar actividad posterior

### Scenario 33: Final del concurso

Given el concurso finaliza  
When la siguiente consulta devuelve `congelado=false` y ranking final  
Then el aviso MUST ocultarse y los resultados finales MUST mostrarse

### Scenario 34: Consulta inicial de polling

Given la página recién montada  
When el reloj está en cero segundos  
Then MUST ejecutarse una consulta inicial

### Scenario 35: Sin refetch prematuro

Given la consulta inicial completada  
When transcurren nueve segundos  
Then MUST no ejecutarse el siguiente refetch

### Scenario 36: Refetch a diez segundos

Given la página montada  
When transcurren diez segundos  
Then MUST ejecutarse un refetch

### Scenario 37: Segundo refetch

Given la página continúa montada  
When transcurren veinte segundos  
Then MUST haberse ejecutado otro refetch sin intervalos duplicados

### Scenario 38: Desmontaje

Given la página se desmonta  
When avanza el fake timer  
Then MUST no ejecutarse otro request

### Scenario 39: Background refetch

Given filas visibles  
When inicia un refetch  
Then MUST conservarse la tabla y MUST no mostrarse loading completo

### Scenario 40: Dos horas restantes

Given dos horas hasta la fecha final  
When se formatea el countdown  
Then MUST mostrarse un valor equivalente a `02:00:00`

### Scenario 41: Menos de una hora

Given 25 minutos restantes  
When se formatea  
Then MUST mostrarse un valor equivalente a `00:25:00`

### Scenario 42: Menos de un minuto

Given 42 segundos restantes  
When se formatea  
Then MUST mostrarse `00:00:42`

### Scenario 43: Countdown en cero

Given el tiempo restante es cero o negativo  
When se formatea  
Then MUST mostrarse cero o Finalizado y MUST no mostrarse un valor negativo

### Scenario 44: Cambio de concurso

Given el componente cambia de `contestCode`  
When se reinicia el countdown  
Then MUST utilizarse la fecha del nuevo concurso

### Scenario 45: Countdown sin HTTP

Given el timer actualiza cada segundo  
When se inspecciona Network  
Then MUST no existir un request por segundo

### Scenario 46: Card Inscritos

Given el contrato contiene total de inscritos  
When se renderiza  
Then MUST mostrarse ese total y MUST no inferirse desde filas si omite inscritos

### Scenario 47: Problema más resuelto

Given A y B tienen el mismo número de aceptaciones  
When backend no resuelve el empate  
Then MUST aplicarse una regla determinista documentada

### Scenario 48: Sin aceptaciones

Given ningún problema fue aceptado  
When se renderiza la card  
Then MUST mostrarse un fallback claro

### Scenario 49: Total de envíos

Given backend entrega total de envíos del snapshot  
When se renderiza  
Then MUST mostrarse ese valor y MUST no sumarse `cantidadIntentos`

### Scenario 50: Cero participantes

Given cero participantes  
When se renderiza la paginación  
Then MUST no mostrar un rango engañoso

### Scenario 51: Un participante

Given un participante  
When se renderiza  
Then MUST mostrarse una página con una fila

### Scenario 52: Cinco participantes

Given cinco participantes  
When se renderiza  
Then MUST mostrarse una sola página con cinco filas

### Scenario 53: Seis participantes

Given seis participantes  
When se renderiza  
Then la primera página MUST mostrar cinco y la segunda una

### Scenario 54: Diez participantes

Given diez participantes  
When se renderiza  
Then MUST haber dos páginas completas

### Scenario 55: Once participantes

Given once participantes  
When se renderiza  
Then la tercera página MUST mostrar una fila

### Scenario 56: Página siguiente y anterior

Given varias páginas  
When se activan siguiente y anterior  
Then MUST cambiarse la colección visible y conservarse los puestos backend

### Scenario 57: Polling conserva página

Given el usuario está en la página dos  
When termina un refetch con la misma cantidad de páginas  
Then MUST permanecer en la página dos

### Scenario 58: Clamp después de polling

Given el usuario está en una página que deja de existir  
When termina un refetch con menos participantes  
Then MUST ajustarse a la última página válida

### Scenario 59: Leyenda

Given la página cargada  
When se renderizan las cards inferiores  
Then MUST existir `Leyenda de celdas` con tres estados y sin estado congelado

### Scenario 60: Penalización explicada

Given la página cargada  
When se renderiza la segunda card inferior  
Then MUST explicar la penalización ICPC sin enlace a reglas

### Scenario 61: Solo dos cards inferiores

Given el contenido final  
When se inspecciona la sección inferior  
Then MUST haber exactamente dos cards y MUST no existir `Información del problema`

## Edge Cases

- El endpoint no devuelve problemas superiores.
- El endpoint no devuelve inscritos sin envíos.
- El endpoint no devuelve total de envíos.
- El endpoint no devuelve fechas.
- Un participante no contiene detalle para todos los incisos.
- Dos detalles del mismo inciso contienen colores diferentes.
- Los incisos no son letras.
- Un estado llega con casing diferente.
- El color llega en un formato anterior.
- La penalización es cero.
- Existen empates múltiples.
- El ranking aumenta o disminuye durante polling.
- La página queda fuera de rango.
- El navegador permanece en background.
- La conexión se pierde y vuelve.
- La hora del navegador está desfasada.
- La fecha no contiene zona.
- El concurso cambia de activo a finalizado entre dos requests.
- El response final continúa marcado congelado por error.
- La query se monta dos veces durante desarrollo estricto.
- El backend devuelve una lista muy grande.
- El ranking vacío no tiene problemas.
- El administrador tiene rol Usuario, pero no existe ruta administrativa.

## Acceptance Criteria

- La ruta de ranking MUST ser directa y recargable.
- Ranking MUST aparecer en el Header.
- El active state MUST funcionar.
- El frontend MUST no recalcular ni reordenar.
- Puestos compartidos MUST preservarse.
- Columnas MUST ser dinámicas.
- Aceptados MUST mostrar globos contractuales.
- No resueltos MUST mostrar fallos sin globo.
- No intentados MUST ser neutrales.
- Polling MUST ejecutar cada diez segundos.
- Countdown MUST ejecutar localmente cada segundo.
- No MUST existir HTTP por segundo.
- El aviso MUST seguir `congelado`.
- Cards y tabla MUST usar datos consistentes durante congelamiento.
- Ranking final MUST revelarse.
- Deben existir cuatro cards superiores.
- Paginación MUST ser frontend con page size cinco.
- Polling MUST preservar página válida.
- Deben existir exactamente dos cards inferiores.
- Loading, refetch, empty y errores MUST funcionar.
- Accesibilidad y responsive MUST verificarse.
- OpenAPI MUST quedar sincronizado.
- Audit MUST no presentar regresiones.
- Lint, typecheck, tests y build MUST pasar.
- Documentación UJ-18 MUST existir.
- Evidencias MUST quedar pendientes sin archivos falsos.

## Out of Scope

- Administración de ranking.
- Cálculo frontend.
- WebSockets o SSE.
- Polling distinto de diez segundos.
- Filtros, búsqueda, exportación o perfiles.
- Avatares remotos.
- `Ver mi posición`.
- Estado visual de envíos congelados.
- Tamaño de página configurable.
- Tercera card informativa.
- Nuevos colores.
- Cambios del juez, veredictos, dependencias o layouts.
