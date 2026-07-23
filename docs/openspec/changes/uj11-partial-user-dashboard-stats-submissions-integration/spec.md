# Spec

## Requirements

### Change Update Requirements

- Los artefactos MUST actualizar el change existente `uj11-partial-user-dashboard-stats-submissions-integration`.
- Los artefactos MUST permanecer en la ruta existente.
- El change MUST NOT duplicarse.
- El change MUST continuar declarando: `Este change no completa la UJ-11.`

### Visual Reference Requirements

- `image(146).png` MUST utilizarse como referencia visual principal para la tabla de envíos.
- La imagen MUST orientar:
  - encabezado;
  - descripción;
  - acciones;
  - tabla;
  - badges;
  - unidades;
  - metadata.
- La imagen MUST NOT utilizarse para inventar campos.
- La descripción MUST representar historial general del usuario.
- La descripción MUST NOT afirmar que los envíos pertenecen a un único concurso.

### Confirmed Unit Requirements

- `consumoTiempo` MUST interpretarse como milisegundos.
- `consumoMemoria` MUST interpretarse como megabytes.
- Tiempo MUST mostrarse con sufijo `ms`.
- Memoria MUST mostrarse con sufijo `MB`.
- El frontend MUST NOT convertir milisegundos a segundos.
- El frontend MUST NOT convertir megabytes a kilobytes o gigabytes.
- La documentación MUST NOT mantener las unidades como pendientes.
- Los tests MUST representar las unidades confirmadas.

### Time Formatting Requirements

- `48` MUST mostrarse como `48 ms`.
- `0` MUST mostrarse como `0 ms`.
- `32` MUST mostrarse como `32 ms`.
- `2000` MUST mostrarse como `2000 ms`.
- El formatter MUST conservar el valor numérico original.
- `null`, `undefined` o valor no finito MUST mostrarse como `—`.
- Un valor ausente MUST NOT mostrarse como `0 ms`.
- El formatter MUST NOT usar una condición que trate cero como ausencia.

### Memory Formatting Requirements

- `8.1` MUST mostrarse como `8.1 MB`.
- `4.8` MUST mostrarse como `4.8 MB`.
- `12` MUST mostrarse como `12 MB`.
- `24.5` MUST mostrarse como `24.5 MB`.
- `0` MUST mostrarse como `0 MB`.
- El frontend MUST NOT mostrar `12.00 MB` cuando el valor sea `12`.
- `null`, `undefined` o valor no finito MUST mostrarse como `—`.
- Un valor ausente MUST NOT mostrarse como `0 MB`.

### Submission DTO Verification Requirements

- Pi MUST reinspeccionar el controller y DTO actuales de `mis-envios`.
- Pi MUST confirmar la nulabilidad real de consumoTiempo y consumoMemoria.
- Los tipos TypeScript MUST reflejar la nulabilidad real.
- El tipo MUST NOT ampliarse a null sin evidencia.
- El mapper MAY manejar datos ausentes defensivamente sin debilitar el DTO.
- Pi MUST confirmar si existe un campo de archivo.
- Pi MUST confirmar si existe un estado de evaluación pendiente.

### Submission Columns Requirements

- La tabla MUST utilizar como mínimo:
  - ID;
  - Concurso;
  - Lenguaje;
  - Problema;
  - Veredicto;
  - Tiempo;
  - Memoria;
  - Fecha.
- Problema SHOULD combinar inciso y título.
- Lenguaje MUST utilizar el campo `lenguaje`.
- Tiempo MUST utilizar `consumoTiempo`.
- Memoria MUST utilizar `consumoMemoria`.
- Fecha MUST utilizar `fechaEnvio`.
- La tabla MUST NOT inventar valores.

### File Column Requirements

- La columna Archivo MUST depender del contrato real.
- Si el endpoint devuelve un campo de archivo:
  - el DTO TypeScript MUST incorporarlo;
  - el nombre MUST coincidir con el backend;
  - el mapper MUST trasladarlo;
  - la tabla MUST mostrarlo;
  - las pruebas MUST cubrirlo;
  - la documentación MUST registrarlo.
- Si el endpoint no devuelve archivo:
  - la columna MUST omitirse;
  - el frontend MUST NOT inventar nombres;
  - el frontend MUST NOT derivar un archivo desde lenguaje o problema;
  - la documentación MUST registrar la diferencia;
  - el campo MAY quedar pendiente de backend.
- La referencia visual MUST NOT prevalecer sobre el contrato.

### Verdict Mapper Requirements

- Los veredictos MUST mapearse en una función central.
- `Accepted` MUST mostrarse como `ACEPTADO`.
- `Accepted` MUST usar tono success.
- `Wrong Answer` MUST mostrarse como `RESPUESTA INCORRECTA`.
- `Wrong Answer` MUST usar tono danger.
- `Time Limit Exceeded` MUST mostrarse como `TIEMPO LÍMITE EXCEDIDO`.
- `Time Limit Exceeded` MUST usar tono warning.
- `Memory Limit Exceeded` MUST mostrarse como `MEMORIA LÍMITE EXCEDIDA`.
- `Memory Limit Exceeded` MUST usar tono warning.
- `Compilation Error` MUST mostrarse como `ERROR DE COMPILACIÓN`.
- `Compilation Error` MUST usar tono danger.
- `Runtime Error` MUST mostrarse como `ERROR DE EJECUCIÓN`.
- `Runtime Error` MUST usar tono danger.
- Un estado pendiente MUST mapearse a `EVALUANDO` únicamente cuando esté confirmado por backend.
- Un estado pendiente confirmado SHOULD usar tono info.
- Un valor desconocido MUST conservar un texto seguro.
- Un valor desconocido MUST usar tono neutral.
- Las comparaciones MUST NOT dispersarse dentro del JSX.
- La presentación MUST incluir texto y MUST NOT depender únicamente del color.
- La tabla MUST reutilizar Badge.

### Missing Metrics Requirements

- Cuando el backend no produzca métricas, tiempo y memoria MUST mostrar `—`.
- Un envío pendiente confirmado MUST mostrar `—` cuando sus métricas sean ausentes.
- Cero MUST preservarse cuando sea un valor real.
- El mapper MUST diferenciar:
  - cero;
  - null;
  - undefined;
  - valor no finito.

### Formatter Requirements

- Debe existir un formatter central para tiempo.
- Debe existir un formatter central para memoria.
- Debe existir un formatter central o reutilizado para fecha.
- Debe existir un mapper central de veredictos.
- Debe existir un mapper de DTO a fila.
- El formateo MUST NOT duplicarse dentro de cada celda.
- Los nombres finales MUST seguir las convenciones del proyecto.
- Los formatters SHOULD ser funciones puras.

### Refresh Requirements

- La sección de envíos MUST incluir una acción `Actualizar`.
- El botón MUST utilizar un icono Lucide coherente.
- El botón MUST tener nombre accesible.
- La acción MUST volver a consultar únicamente la query de envíos recientes.
- La acción MUST NOT ejecutar `window.location.reload()`.
- La acción MUST NOT reiniciar el dashboard.
- La acción MUST NOT cerrar sesión.
- La acción MUST NOT invalidar todas las queries.
- La acción MUST NOT refrescar estadísticas administrativas.
- La acción SHOULD usar `refetch` o invalidación exacta.
- Mientras actualiza, MUST existir estado visual.
- Mientras actualiza, el botón MUST evitar doble activación.
- Las filas actuales SHOULD conservarse cuando la estrategia de query lo permita.
- Un error de refresh MUST mostrarse dentro de la sección.

### Filter Button Requirements

- El botón de filtros MUST mostrarse solo cuando exista una interacción funcional.
- El change SHOULD omitir el botón para mantener el alcance mínimo.
- Si se implementa, MUST utilizar únicamente:
  - resultado;
  - concursoCodigo;
  - inciso.
- Los filtros de envíos MUST NOT mezclarse con filtros de concursos.
- El frontend MUST NOT mostrar un botón decorativo.
- El frontend MUST NOT mostrar un botón disabled sin explicación funcional.
- La documentación MUST registrar que la UI completa de filtros queda pendiente cuando se omita.

### Dashboard Pagination Requirements

- El dashboard MUST solicitar inicialmente:
  - pagina = 1;
  - tamanoPagina = 5.
- La sección MUST NOT implementar paginación interactiva completa salvo decisión explícita posterior.
- El servicio y el hook MUST conservar soporte para pagina y tamanoPagina.
- La futura pantalla de historial MUST poder reutilizar esos parámetros.
- El dashboard MUST NOT crear una paginación falsa.
- El dashboard MUST NOT hardcodear rangos o totales.
- El dashboard MUST NOT mostrar un enlace de historial sin ruta real.

### Pagination Metadata Requirements

- La metadata MAY mostrarse en el dashboard.
- La metadata MUST calcularse desde:
  - total;
  - pagina;
  - tamanoPagina;
  - datos.length.
- Para resultados no vacíos:
  - inicio SHOULD ser `(pagina - 1) * tamanoPagina + 1`;
  - fin SHOULD limitarse al total y a los datos recibidos.
- Para cero resultados:
  - la metadata MUST no mostrar un rango inválido;
  - MAY mostrar `0 envíos` o equivalente.
- La última página parcial MUST mostrar el rango real.
- La metadata MUST NOT asumir cinco filas si se recibieron menos.
- La metadata MUST actualizarse después de un refresh.

### Interactive Pagination Requirements

- La paginación interactiva completa permanece fuera de alcance recomendado.
- Si se incorpora por necesidad confirmada:
  - MUST usar pagina, tamanoPagina y total;
  - MUST conservar filtros;
  - MUST ofrecer anterior y siguiente;
  - MUST manejar disabled;
  - MUST utilizar nombres accesibles;
  - MUST volver a consultar el endpoint;
  - MUST manejar última página;
  - MUST mantener scroll coherente.
- El briefing MUST priorizar el dashboard acotado sin paginación interactiva.

### Recent Submissions Table Requirements

- `RecentSubmissionsTable` MUST continuar siendo presentacional.
- La tabla MUST recibir filas mediante props.
- La tabla MUST recibir loading.
- La tabla MUST recibir error.
- La tabla MAY recibir callback de refresh.
- La tabla MAY recibir metadata real.
- La tabla MUST aceptar `className` cuando corresponda.
- La tabla MUST NOT conocer la URL.
- La tabla MUST NOT usar HttpClient.
- La tabla MUST NOT usar sessionStorage.
- La tabla MUST NOT crear query params.
- La tabla MUST NOT decodificar JWT.
- La sección contenedora MUST coordinar hook, mapper y refresh.

### Base Component Requirements

- La tabla MUST reutilizar componentes base existentes.
- La implementación MUST priorizar:
  - Card;
  - Table;
  - TableHeader;
  - TableBody;
  - TableRow;
  - TableHead;
  - TableCell;
  - TableCaption;
  - Badge;
  - Alert;
  - Button;
  - IconButton;
  - Skeleton.
- Los componentes de feature MUST utilizar `className` para personalización.
- El change MUST NOT duplicar primitivas compartidas.
- El change MUST NOT crear otra tabla base.

### Independent State Requirements

- Estadísticas y envíos MUST conservar queries independientes.
- El refresh de envíos MUST no controlar estadísticas.
- Un error de estadísticas MUST no ocultar envíos.
- Un error de envíos MUST no ocultar estadísticas.
- Loading de envíos MUST no ocultar estadísticas.
- Un refresh de envíos MUST no reemplazar datos válidos por empty cuando la caché anterior pueda mantenerse.

### Documentation Requirements

- El documento de UJ-11 MUST registrar:
  - `consumoTiempo` en milisegundos;
  - `consumoMemoria` en megabytes.
- Confirmación de unidades MUST eliminarse de pendientes.
- La documentación MUST distinguir:
  - envíos recientes del dashboard;
  - historial completo futuro;
  - lista principal de concursos UJ-11.
- Debe registrar el refresh de envíos.
- Debe registrar la decisión sobre filtros.
- Debe registrar el alcance de paginación.
- Debe registrar la resolución de la columna Archivo.
- Si Archivo no existe, MUST quedar como diferencia o pendiente backend.
- Las evidencias sugeridas MUST actualizarse.
- El documento MUST NOT enlazar capturas inexistentes.

### Test Requirements

- Las pruebas MUST cubrir `48 → 48 ms`.
- Las pruebas MUST cubrir `2000 → 2000 ms`.
- Las pruebas MUST cubrir `8.1 → 8.1 MB`.
- Las pruebas MUST cubrir `12 → 12 MB`.
- Las pruebas MUST cubrir cero real.
- Las pruebas MUST cubrir dato ausente.
- Las pruebas MUST confirmar que `2000 ms` no se convierte a segundos.
- Las pruebas MUST confirmar que `1024 MB` no se convierte a gigabytes.
- Las pruebas MUST cubrir todos los veredictos conocidos.
- Las pruebas MUST cubrir fallback neutral.
- Las pruebas MUST cubrir Evaluando solo cuando esté confirmado.
- Las pruebas MUST cubrir refresh.
- Las pruebas MUST confirmar ausencia de reload.
- Las pruebas MUST confirmar conservación de datos durante refresh cuando aplique.
- Las pruebas MUST cubrir metadata de paginación.
- Las pruebas MUST cubrir última página parcial.
- Las pruebas MUST cubrir cero resultados.
- Las pruebas MUST cubrir columna Archivo según contrato real.

## Behavior Scenarios

### Scenario 1: Tiempo en milisegundos

Given un envío con `consumoTiempo` igual a 48  
When se mapea la fila  
Then el tiempo MUST mostrarse como `48 ms`

### Scenario 2: Tiempo grande sin conversión

Given un envío con `consumoTiempo` igual a 2000  
When se formatea  
Then MUST mostrarse `2000 ms` y MUST no mostrarse `2 s`

### Scenario 3: Memoria decimal

Given un envío con `consumoMemoria` igual a 8.1  
When se mapea la fila  
Then la memoria MUST mostrarse como `8.1 MB`

### Scenario 4: Memoria entera

Given un envío con `consumoMemoria` igual a 12  
When se formatea  
Then MUST mostrarse `12 MB` y MUST no mostrarse `12.00 MB`

### Scenario 5: Tiempo cero real

Given `consumoTiempo` igual a 0  
When se formatea  
Then MUST mostrarse `0 ms`

### Scenario 6: Memoria cero real

Given `consumoMemoria` igual a 0  
When se formatea  
Then MUST mostrarse `0 MB`

### Scenario 7: Tiempo ausente

Given `consumoTiempo` ausente  
When se mapea la fila  
Then MUST mostrarse `—` y MUST no mostrarse `0 ms`

### Scenario 8: Memoria ausente

Given `consumoMemoria` ausente  
When se mapea la fila  
Then MUST mostrarse `—` y MUST no mostrarse `0 MB`

### Scenario 9: Valor no finito

Given una métrica numérica no finita  
When se formatea  
Then MUST mostrarse `—`

### Scenario 10: Sin conversión de memoria

Given `consumoMemoria` igual a 1024  
When se formatea  
Then MUST mostrarse `1024 MB` y MUST no mostrarse `1 GB`

### Scenario 11: Accepted

Given un envío con veredicto `Accepted`  
When se mapea  
Then MUST mostrarse `ACEPTADO` con tono success

### Scenario 12: Wrong Answer

Given un envío con veredicto `Wrong Answer`  
When se mapea  
Then MUST mostrarse `RESPUESTA INCORRECTA` con tono danger

### Scenario 13: TLE

Given un envío con veredicto `Time Limit Exceeded`  
When se mapea  
Then MUST mostrarse `TIEMPO LÍMITE EXCEDIDO` con tono warning

### Scenario 14: MLE

Given un envío con veredicto `Memory Limit Exceeded`  
When se mapea  
Then MUST mostrarse `MEMORIA LÍMITE EXCEDIDA` con tono warning

### Scenario 15: Compilation Error

Given un envío con veredicto `Compilation Error`  
When se mapea  
Then MUST mostrarse `ERROR DE COMPILACIÓN` con tono danger

### Scenario 16: Runtime Error

Given un envío con veredicto `Runtime Error`  
When se mapea  
Then MUST mostrarse `ERROR DE EJECUCIÓN` con tono danger

### Scenario 17: Estado desconocido

Given un veredicto no reconocido  
When se mapea  
Then MUST conservarse un texto seguro y usarse tono neutral

### Scenario 18: Estado Evaluando confirmado

Given que el backend confirma un valor pendiente  
When se mapea ese valor  
Then SHOULD mostrarse `EVALUANDO` con tono info

### Scenario 19: Estado Evaluando no confirmado

Given que el backend no define un valor pendiente  
When se implementa el mapper  
Then MUST no inventarse `EVALUANDO`

### Scenario 20: Métricas pendientes

Given un envío en evaluación con métricas ausentes  
When se renderiza  
Then Tiempo y Memoria MUST mostrar `—`

### Scenario 21: Problema compuesto

Given inciso `A` y título `Problema de ejemplo`  
When se mapea la fila  
Then el problema SHOULD mostrarse como `A · Problema de ejemplo`

### Scenario 22: Refresh de envíos

Given la sección de envíos cargada  
When el usuario presiona Actualizar  
Then MUST volver a consultarse únicamente `mis-envios`

### Scenario 23: Refresh sin reload

Given el usuario activa Actualizar  
When se ejecuta el refresh  
Then MUST no invocarse `window.location.reload()`

### Scenario 24: Refresh con datos previos

Given filas válidas y una actualización pendiente  
When se ejecuta refetch  
Then las filas SHOULD conservarse mientras se muestra el estado de actualización

### Scenario 25: Doble activación

Given un refresh en curso  
When el usuario intenta activarlo otra vez  
Then MUST evitarse una segunda solicitud coordinada

### Scenario 26: Botón de filtros omitido

Given que no se implementa interacción de filtros  
When se renderiza la sección  
Then MUST no mostrarse un botón de filtros decorativo

### Scenario 27: Filtros funcionales

Given que se aprueba una UI mínima de filtros  
When el usuario aplica un filtro  
Then MUST utilizarse resultado, concursoCodigo o inciso y MUST refetchearse la query correcta

### Scenario 28: Página inicial

Given el dashboard del usuario  
When se monta la sección de envíos  
Then MUST solicitar pagina 1 y tamanoPagina 5

### Scenario 29: Metadata inicial

Given total 12, pagina 1, tamanoPagina 5 y cinco filas  
When se muestra metadata  
Then SHOULD mostrarse `Mostrando 1-5 de 12 envíos`

### Scenario 30: Última página parcial

Given total 12, pagina 3, tamanoPagina 5 y dos filas  
When se calcula el rango  
Then SHOULD mostrarse `Mostrando 11-12 de 12 envíos`

### Scenario 31: Cero resultados

Given total 0 y datos vacíos  
When se muestra la sección  
Then MUST mostrarse el empty state y MUST no mostrarse un rango inválido

### Scenario 32: Sin paginación falsa

Given que el dashboard no implementa controles interactivos  
When se renderiza la sección  
Then MUST no mostrarse una paginación que no cambie la query

### Scenario 33: Archivo presente

Given que el DTO real contiene un campo de archivo  
When se actualizan tipos y mapper  
Then la tabla MUST mostrar la columna Archivo con el valor contractual

### Scenario 34: Archivo ausente

Given que el DTO real no contiene archivo  
When se renderiza la tabla  
Then la columna Archivo MUST omitirse y MUST no inventarse ningún nombre

### Scenario 35: Descripción general

Given que `mis-envios` representa el historial del usuario  
When se renderiza el encabezado  
Then la descripción MUST referirse a envíos recientes generales y MUST no referirse a un único concurso

### Scenario 36: Documentación de unidades

Given el documento UJ-11  
When se actualiza  
Then MUST registrar `ms` y `MB` como unidades confirmadas

### Scenario 37: Pendiente eliminado

Given la lista de pendientes documental  
When se revisa  
Then confirmación de unidades MUST no aparecer

## Edge Cases

- El DTO usa un nombre inesperado para Archivo.
- El campo Archivo existe, pero puede ser null.
- El backend utiliza un estado pendiente con casing diferente.
- Tiempo o memoria llegan como string por un mock defectuoso.
- Tiempo o memoria llegan como `NaN`.
- Tiempo o memoria llegan negativos.
- La fecha es inválida.
- `datos.length` es menor que el tamaño en una página intermedia.
- `pagina` excede el número de páginas.
- `total` no coincide temporalmente con los datos durante una actualización.
- El refetch falla y existen filas previas.
- El usuario presiona Enter repetidamente sobre Actualizar.
- El componente Button ya muestra loading.
- La tabla base no expone primitivas individuales.
- La metadata no cabe en móvil.
- El dashboard ya incluye un botón general de refresh.
- Los filtros están implementados parcialmente en el workspace.
- La columna Archivo aparece en la referencia pero no en el contrato.
- Un veredicto traducido es demasiado largo para el Badge.

## Acceptance Criteria

- Las unidades MUST estar actualizadas en todos los artefactos.
- No MUST quedar ninguna mención a unidades pendientes.
- Tiempo MUST mostrarse en ms.
- Memoria MUST mostrarse en MB.
- Cero MUST diferenciarse de ausencia.
- Valores ausentes MUST mostrarse como `—`.
- No MUST existir conversión a segundos, KB o GB.
- Los formatters MUST estar centralizados.
- Los veredictos MUST mapearse centralmente.
- Archivo MUST depender del DTO real.
- Refresh MUST afectar solo envíos.
- Refresh MUST no recargar la página.
- El botón MUST evitar doble activación.
- La consulta del dashboard MUST utilizar página 1 y tamaño 5.
- La metadata MUST calcularse con datos reales.
- La paginación interactiva completa MUST permanecer fuera del alcance recomendado.
- El botón de filtros MUST omitirse cuando no exista interacción funcional.
- La tabla MUST seguir siendo presentacional.
- Los componentes base MUST reutilizarse.
- Las pruebas actualizadas MUST pasar.
- La documentación MUST separar dashboard, historial completo y UJ-11 principal.
- No MUST crearse otro change.
- No MUST realizarse commit o push.

## Out of Scope

- Lista y filtros de concursos.
- Historial completo.
- Ruta de historial.
- Paginación interactiva completa.
- Filtros visuales completos de envíos.
- Campos no entregados por backend.
- Nuevos estados backend.
- Cambios backend o database.
- Rediseño de layouts.
