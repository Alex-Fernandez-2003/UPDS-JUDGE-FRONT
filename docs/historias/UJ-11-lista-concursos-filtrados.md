# UJ-11 — Lista de concursos filtrados

## Estado de esta entrega parcial

Este change **no completa UJ-11** ni implementa la lista de concursos. La entrega incorpora al dashboard del usuario estadísticas rápidas y una tabla de los cinco envíos recientes.

## Contrato confirmado

- `GET /api/ParticipanteConcursos/stats-contest` alimenta estadísticas independientes.
- `GET /api/Envios/mis-envios` recibe `resultado`, `concursoCodigo`, `inciso`, `pagina` y `tamanoPagina`; el dashboard consulta `pagina=1` y `tamanoPagina=5`.
- `consumoTiempo` se presenta en milisegundos (`ms`) sin conversión de escala.
- `consumoMemoria` se presenta en megabytes (`MB`) sin conversión de escala.
- El backend devuelve métricas no anulables (`float` e `int`), aunque la capa visual muestra `—` ante datos inválidos defensivamente.
- El DTO actual no entrega un campo Archivo: la columna visual de referencia se omite y queda pendiente de un contrato backend futuro.
- El backend crea envíos con veredicto `Pendiente`; se visualiza como `EVALUANDO`.

## Dashboard de usuario

La sección de envíos recientes representa el historial general del usuario, no un único concurso. Incluye ID, concurso, lenguaje, problema, veredicto, tiempo, memoria y fecha. `Actualizar` vuelve a consultar solo los envíos recientes, conserva los datos previos durante el refetch cuando TanStack Query puede hacerlo y evita una segunda activación mientras actualiza.

No se muestra un botón de filtros decorativo ni controles de paginación sin comportamiento. La metadata se calcula con `total`, `pagina`, `tamanoPagina` y la cantidad real recibida.

## Trabajo futuro separado

1. **Dashboard actual:** estadísticas y cinco envíos recientes, sin filtros visuales ni navegación de páginas.
2. **Historial completo futuro:** ruta dedicada, filtros funcionales y paginación interactiva reutilizando los parámetros ya soportados.
3. **UJ-11 principal:** lista de concursos con filtros En curso, Próximo y Finalizado; permanece fuera de este change y no consume `GET /api/Concursos` aquí.

## Evidencia sugerida

- Dashboard de usuario con estadísticas y tabla de envíos recientes.
- Valores `2000 ms`, `1024 MB`, `0 ms` y `0 MB`.
- Estado de métricas ausentes como `—`.
- Refresh de envíos sin recarga de página.
- Última página parcial y estado vacío mediante datos de prueba.
