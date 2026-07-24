# Design

## Components Touched

### User contests

Áreas probables:

- RecentSubmissionsSection.
- RecentSubmissionsTable.
- UserContestStatsSection.
- Hooks.
- Servicios.
- Tipos.
- Query keys.
- Mappers.
- Formatters.
- Tests.
- API pública mínima.

### Dashboard

- Página existente del rol Usuario.
- Encabezado de la sección de envíos.
- Acción Actualizar.
- Metadata de paginación.
- Composición independiente de estados.

### Backend a verificar

- DTO o proyección de `mis-envios`.
- Campo de archivo.
- Nulabilidad de métricas.
- Estado pendiente de evaluación.

### Documentación

- Documento de UJ-11.
- Evidencias sugeridas.

## Boundaries Respected

- RecentSubmissionsSection consume hook y mapper.
- RecentSubmissionsTable permanece presentacional.
- Los formatters no conocen React.
- El mapper no ejecuta requests.
- El servicio no formatea UI.
- HttpClient continúa siendo la única frontera HTTP.
- AuthTransport continúa agregando Bearer.
- La referencia visual no modifica el contrato backend.
- La columna Archivo no existe sin evidencia contractual.
- Los filtros y paginación completa permanecen fuera del dashboard parcial.
- La UI de concursos de UJ-11 permanece fuera del change.

## Contracts Changed

No se modifica ningún contrato externo.

Se actualizan contratos internos para reflejar unidades confirmadas.

### UserSubmissionDto

Contrato mínimo confirmado:

- idEnvio.
- concursoCodigo.
- problemaTitulo.
- inciso.
- lenguaje.
- veredicto.
- consumoTiempo.
- consumoMemoria.
- fechaEnvio.

La nulabilidad final debe seguir el DTO backend real.

El campo Archivo solo se agrega si el endpoint lo entrega.

### RecentSubmissionRow

Campos probables:

- id.
- contestCode.
- problemLabel.
- language.
- verdictLabel.
- verdictTone.
- timeLabel.
- memoryLabel.
- submittedAtLabel.
- fileLabel opcional únicamente si el backend lo soporta.

### Formatters

`formatExecutionTime`:

- number finito → `${valor} ms`;
- nullish o no finito → `—`;
- no convierte escala.

`formatMemoryUsage`:

- number finito → `${valor} MB`;
- nullish o no finito → `—`;
- no convierte escala.

`formatSubmissionDate`:

- fecha válida → representación local coherente;
- fecha inválida → `—`.

`mapSubmissionVerdict`:

- texto backend → etiqueta española y tono.

### Refresh Contract

Entrada:

- acción del usuario.

Comportamiento:

- llama `refetch` de envíos o invalida su key exacta;
- conserva parámetros actuales;
- conserva filas previas cuando sea viable;
- expone refreshing;
- evita activación duplicada.

### Pagination Metadata Contract

Entrada:

- total;
- pagina;
- tamanoPagina;
- cantidad recibida.

Salida:

- rango inicial;
- rango final;
- total;
- mensaje accesible.

No controla navegación de página en el alcance recomendado.

## Data Flow

### Estadísticas

- Dashboard.
- UserContestStatsSection.
- Hook.
- Servicio.
- HttpClient.
- `stats-contest`.

Sin cambios respecto al briefing anterior.

### Envíos

- Dashboard.
- RecentSubmissionsSection.
- useUserSubmissions con:
  - pagina 1;
  - tamanoPagina 5.
- Servicio.
- HttpClient.
- `mis-envios`.
- Respuesta paginada.
- Mapper.
- RecentSubmissionsTable.

### Mapping

Por cada DTO:

- idEnvio → id.
- concursoCodigo → contestCode.
- inciso + problemaTitulo → problemLabel.
- lenguaje → language.
- veredicto → verdictLabel + verdictTone.
- consumoTiempo → timeLabel en ms.
- consumoMemoria → memoryLabel en MB.
- fechaEnvio → submittedAtLabel.
- archivo contractual → fileLabel opcional.

### Refresh

- El usuario activa Actualizar.
- La sección comprueba `isFetching`.
- Ejecuta refetch de envíos.
- Mantiene la query de estadísticas intacta.
- Mantiene filas previas si el mecanismo de query lo permite.
- Actualiza metadata con la respuesta nueva.
- Presenta error local si falla.

### Filtros

Decisión recomendada:

- no renderizar botón en este change;
- mantener parámetros soportados en tipos, servicio y hook;
- implementar UI en la pantalla completa de historial.

Alternativa permitida solo con decisión explícita:

- panel pequeño;
- resultado;
- concursoCodigo;
- inciso;
- query real;
- sin filtros de estado de concursos.

### Pagination

Decisión recomendada:

- página 1;
- tamaño 5;
- sin controles completos;
- metadata opcional real.

Futuro:

- pantalla de historial;
- filtros;
- paginación interactiva;
- ruta dedicada.

### File Column

Proceso:

- Reinspeccionar backend.
- Si existe campo:
  - actualizar DTO;
  - actualizar mapper;
  - añadir columna;
  - pruebas;
  - documentación.
- Si no existe:
  - omitir columna;
  - registrar discrepancia;
  - mantener pendiente backend.

## Required Tests Per Layer

### Formatter Tests

Tiempo:

- 48 → 48 ms.
- 2000 → 2000 ms.
- 0 → 0 ms.
- null → —.
- undefined → —.
- NaN → —.

Memoria:

- 8.1 → 8.1 MB.
- 12 → 12 MB.
- 0 → 0 MB.
- null → —.
- undefined → —.
- Infinity → —.

No conversion:

- 2000 no se convierte a 2 s.
- 1024 no se convierte a 1 GB.

### Verdict Tests

- Accepted.
- Wrong Answer.
- Time Limit Exceeded.
- Memory Limit Exceeded.
- Compilation Error.
- Runtime Error.
- Pendiente confirmado.
- Desconocido.

### Mapper Tests

- problema compuesto.
- lenguaje.
- fecha.
- tiempo.
- memoria.
- cero.
- ausencia.
- archivo presente o ausente según contrato.
- veredicto.

### Refresh Tests

- llama refetch.
- no llama reload.
- no invalida estadísticas.
- evita doble activación.
- conserva parámetros.
- conserva datos durante refreshing cuando corresponda.
- error local.

### Pagination Metadata Tests

- primera página completa.
- última página parcial.
- cero resultados.
- total menor al tamaño.
- página intermedia.
- valores no hardcodeados.

### Table Tests

- columnas contractuales.
- Archivo condicional.
- descripción general.
- badges.
- unidades.
- refresh.
- metadata.
- empty.
- error.
- loading.
- className.
- semántica.

### Documentation Tests

- unidades confirmadas.
- pendiente de unidades eliminado.
- tres piezas diferenciadas.
- evidencias actualizadas.
- Archivo documentado según contrato.

## Tradeoffs Accepted

- Cinco filas aproximan la nueva referencia visual.
- No se implementa paginación interactiva.
- La metadata puede mostrarse sin controles.
- El botón de filtros se omite para evitar una acción decorativa.
- El servicio conserva soporte para filtros futuros.
- Los veredictos se traducen solo en la capa visual.
- El valor numérico se muestra sin conversiones.
- No se fuerzan decimales.
- La columna Archivo depende del backend.
- El refresh se limita a envíos recientes.

## Implementation Constraints

- Mantener el mismo change.
- Verificar DTO antes de tipar archivo o null.
- No inventar Archivo.
- No inventar Evaluando.
- No convertir unidades.
- No usar `toFixed` fijo.
- No tratar cero como ausencia.
- No duplicar formatters en JSX.
- No recargar la página.
- No invalidar toda la caché.
- No mostrar filtros sin comportamiento.
- No crear paginación falsa.
- No crear ruta de historial.
- No modificar admin.
- No modificar backend.
- No usar OpenSpec CLI.
- No realizar commit ni push.

## Open Design Questions

### Blocking: Campo Archivo

- ¿El DTO actual de `mis-envios` devuelve un campo de archivo?
- Clasificación: Blocking para definir la columna.

### Blocking: Nulabilidad

- ¿consumoTiempo y consumoMemoria son anulables en el contrato real?
- Clasificación: Blocking para el tipo TypeScript final.

### Blocking: Estado pendiente

- ¿Existe un veredicto real de evaluación pendiente y cuál es su valor?
- Clasificación: Blocking para incorporar `EVALUANDO`.

### Research required: Persistencia durante refetch

- ¿La versión actual de TanStack Query y el hook conservan datos previos automáticamente o requieren una opción explícita?
- Clasificación: Research required.

### Research required: API de Button

- ¿Button o IconButton ya soportan loading?
- Clasificación: Research required para evitar lógica duplicada.

### Non-blocking: Metadata visible

- ¿La metadata encaja en el dashboard móvil?
- Clasificación: Non-blocking; puede omitirse visualmente sin perder el contrato.

### Non-blocking: Botón de filtros

- ¿Existe capacidad real para implementarlo sin ampliar el alcance?
- Clasificación: Non-blocking.
- Decisión predeterminada: omitirlo.
