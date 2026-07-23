# Proposal

## Problem Statement

UPDS JUDGE necesita actualizar el briefing del change existente:

`uj11-partial-user-dashboard-stats-submissions-integration`

Este change no completa la UJ-11.

La historia principal continúa siendo:

> Como usuario, quiero ver una lista de concursos filtrados por "En curso", "Próximo" y "Finalizado".

El alcance de este change sigue limitado a:

- estructura real de `features/contests/user/`;
- estadísticas rápidas;
- integración con `GET /api/ParticipanteConcursos/stats-contest`;
- tabla reutilizable de envíos recientes;
- integración con `GET /api/Envios/mis-envios`;
- integración visual en el dashboard existente;
- reutilización de componentes base;
- tipos, servicios, hooks, query keys, mappers y mocks;
- pruebas automatizadas;
- documentación parcial de UJ-11.

La nueva referencia principal para la tabla de envíos es `image(146).png`. La imagen aporta dirección visual para encabezado, acciones, tabla, badges, unidades y metadata de paginación, pero no reemplaza el contrato backend.

El backend confirmó las unidades:

- `consumoTiempo` se expresa en milisegundos y MUST mostrarse con sufijo `ms`;
- `consumoMemoria` se expresa en megabytes y MUST mostrarse con sufijo `MB`.

Ya no existe una incertidumbre contractual sobre estas unidades.

Los valores deben conservar su escala original:

- `2000` debe mostrarse como `2000 ms`, no como `2 s`;
- `1024` debe mostrarse como `1024 MB`, no como `1 GB`.

El frontend debe distinguir un cero real de un dato ausente:

- `0` → `0 ms` o `0 MB`;
- `null`, `undefined` o valor no finito → `—`.

La tabla debe diseñarse alrededor de los campos reales de `GET /api/Envios/mis-envios`:

- ID;
- concurso;
- lenguaje;
- problema;
- veredicto;
- tiempo;
- memoria;
- fecha.

La referencia visual muestra una columna `Archivo`, pero el contrato anteriormente inspeccionado no incluía un nombre de archivo. Antes de incorporarla debe verificarse el DTO y controller actuales.

Si existe un campo real de archivo, deberá incorporarse usando su nombre contractual. Si no existe, la columna deberá omitirse y registrarse como diferencia pendiente entre referencia visual y backend.

La sección debe incluir un botón `Actualizar` que vuelva a solicitar únicamente los envíos recientes. No debe recargar la página, invalidar toda la caché ni refrescar estadísticas administrativas.

El endpoint soporta filtros y paginación, pero este dashboard continúa siendo una contribución parcial. La decisión recomendada es:

- consultar `pagina=1`;
- consultar `tamanoPagina=5`;
- no implementar paginación interactiva completa;
- no mostrar un botón de filtros sin comportamiento;
- omitir temporalmente la UI de filtros;
- mantener servicio, tipos y query keys preparados para los parámetros backend;
- reservar filtros y paginación completa para la futura pantalla de historial.

Puede mostrarse metadata como `Mostrando 1-5 de 12 envíos` únicamente cuando se calcule con `total`, `pagina`, `tamanoPagina` y `datos.length` reales.

## Goals

- Actualizar los cuatro artefactos del mismo change sin crear otro change.
- Mantener la ruta `docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/`.
- Conservar todo el alcance y arquitectura definidos previamente.
- Incorporar `image(146).png` como referencia visual principal para envíos.
- Registrar las unidades confirmadas de tiempo y memoria.
- Eliminar toda afirmación de que las unidades están pendientes.
- Centralizar formateadores para:
  - tiempo;
  - memoria;
  - fecha;
  - veredictos.
- Mostrar `consumoTiempo` en milisegundos.
- Mostrar `consumoMemoria` en megabytes.
- Conservar los valores numéricos sin conversiones de escala.
- Diferenciar cero real de ausencia de dato.
- Confirmar nuevamente el DTO de envíos antes de tipar nulabilidad o campo de archivo.
- Incorporar `Archivo` únicamente cuando el backend lo entregue realmente.
- Mantener un mapper explícito desde DTO a ViewModel.
- Traducir visualmente los veredictos conocidos al español.
- Mantener un fallback neutral para veredictos desconocidos.
- Incorporar un estado `EVALUANDO` solo si existe un valor backend real que lo represente.
- Agregar un botón `Actualizar` exclusivo de la sección de envíos.
- Conservar las filas actuales durante refetch cuando TanStack Query y el código existente lo permitan.
- Evitar doble activación del refresh.
- Consultar cinco envíos recientes en la primera página.
- Mostrar metadata real de rango cuando el diseño la incluya.
- No implementar paginación interactiva completa.
- No mostrar un botón de filtros sin funcionalidad.
- Mantener los filtros disponibles en los contratos de servicio y hook.
- Actualizar pruebas de unidades, mappers, refresh y metadata.
- Actualizar la documentación de UJ-11 para eliminar la confirmación de unidades de sus pendientes.
- Separar claramente:
  - tabla reciente del dashboard;
  - futura pantalla de historial;
  - futura lista de concursos de UJ-11.

## Non-Goals

- No crear un change nuevo.
- No completar UJ-11.
- No implementar la lista de concursos.
- No consumir `GET /api/Concursos`.
- No implementar filtros En curso, Próximo o Finalizado.
- No implementar modalidad o búsqueda de concursos.
- No implementar inscripción o detalle de concurso.
- No crear una pantalla completa de historial de envíos.
- No crear una ruta de historial.
- No implementar paginación interactiva completa.
- No implementar filtros visuales de envíos salvo que se apruebe una interacción mínima funcional dentro del mismo alcance.
- No mostrar un botón de filtros decorativo.
- No mostrar un enlace ficticio de historial completo.
- No inventar el campo Archivo.
- No derivar un nombre de archivo desde lenguaje, problema o inciso.
- No inventar el estado Evaluando.
- No convertir milisegundos a segundos.
- No convertir megabytes a kilobytes o gigabytes.
- No utilizar `toFixed(2)` indiscriminadamente.
- No mostrar ceros como sustituto de datos ausentes.
- No modificar backend.
- No modificar base de datos.
- No rediseñar UserLayout.
- No rediseñar AdminLayout.
- No modificar funcionalmente `features/contests/admin/`.
- No modificar HttpClient o AuthTransport.
- No leer el token manualmente.
- No duplicar componentes base.
- No utilizar OpenSpec CLI.
- No realizar commit ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/proposal.md`
- `docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/spec.md`
- `docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/design.md`
- `docs/openspec/changes/uj11-partial-user-dashboard-stats-submissions-integration/tasks.md`

### Feature contests user

Áreas probables:

- componentes de estadísticas;
- sección contenedora de estadísticas;
- sección contenedora de envíos;
- tabla presentacional;
- hooks;
- servicios;
- tipos;
- query keys;
- mappers;
- formatters;
- API pública mínima;
- tests.

### Dashboard

- Dashboard real del rol `Usuario`.
- Composición de estadísticas y envíos.
- Botón de refresh de envíos.
- Metadata del historial reciente.
- UserLayout existente.

### API

- Endpoints centralizados:
  - `ParticipanteConcursos/stats-contest`;
  - `Envios/mis-envios`.
- HttpClient existente.
- AuthTransport existente.
- ApiError existente.

### Backend a reinspeccionar

- `Controllers/EnviosController.cs`.
- DTO o proyección utilizada por `mis-envios`.
- `Models/Envio.cs`.
- Propiedades relacionadas con archivo.
- Nulabilidad real de:
  - `consumoTiempo`;
  - `consumoMemoria`.
- Posibles estados pendientes de evaluación.

### Componentes base

Reutilización de componentes reales equivalentes a:

- Card.
- Table.
- TableHeader.
- TableBody.
- TableRow.
- TableHead.
- TableCell.
- TableCaption.
- Badge.
- Alert.
- Button.
- IconButton.
- Skeleton.

### Documentación

- Documento existente de UJ-11.
- En su ausencia:
  - `docs/historias/UJ-11-lista-concursos-filtrados.md`.

## Assumptions

- El dashboard real del usuario ya existe.
- `features/contests/user/` puede materializarse sin modificar comportamiento administrativo.
- Los componentes base ya aceptan `className`.
- El endpoint de envíos continúa devolviendo la estructura previamente confirmada.
- Las unidades `ms` y `MB` están confirmadas por backend.
- No se confirma todavía si el endpoint actualizado devuelve un campo de archivo.
- No se confirma todavía si consumoTiempo y consumoMemoria son anulables en el DTO real.
- No se confirma todavía si existe un veredicto backend de evaluación pendiente.
- No se confirma la API exacta de la tabla compartida.
- No se confirma si ya existe un formatter de fecha o número reutilizable.
- No se confirma si el dashboard actual ya tiene una acción general de actualización.
- No se confirma si la metadata de paginación encaja visualmente sin ampliar el layout.
- `image(146).png` es una referencia visual y no un contrato funcional.

## Risks

### Risk 1: Tipar Archivo sin soporte backend

- Probability: Medium.
- Impact: High.
- Mitigation: Reinspeccionar controller y DTO antes de modificar el tipo o las columnas.

### Risk 2: Debilitar los tipos con null sin evidencia

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mantener `number` cuando el DTO sea no anulable y manejar defensivamente datos inválidos dentro del mapper.

### Risk 3: Confundir cero con ausencia

- Probability: High.
- Impact: High para exactitud visual.
- Mitigation: Usar comprobaciones explícitas de nullish y finitud, no condiciones booleanas genéricas.

### Risk 4: Convertir unidades fuera del contrato

- Probability: Medium.
- Impact: Medium.
- Mitigation: Formatear siempre en `ms` y `MB` sin conversiones de escala.

### Risk 5: Agregar decimales artificiales

- Probability: Medium.
- Impact: Low.
- Mitigation: Preservar la representación numérica natural sin `toFixed` fijo.

### Risk 6: Traducir un veredicto no reconocido incorrectamente

- Probability: Medium.
- Impact: Medium.
- Mitigation: Catálogo central explícito y fallback con texto seguro original.

### Risk 7: Mostrar Evaluando sin estado backend real

- Probability: Medium.
- Impact: Medium.
- Mitigation: Incorporarlo únicamente después de verificar un valor contractual.

### Risk 8: Refresh invalida consultas no relacionadas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Usar `refetch` de la query de envíos o invalidación exacta de su key.

### Risk 9: Doble clic genera requests duplicados

- Probability: Medium.
- Impact: Low a Medium.
- Mitigation: Deshabilitar o ignorar la acción mientras `isFetching` esté activo.

### Risk 10: Metadata de paginación incorrecta

- Probability: Medium.
- Impact: Medium.
- Mitigation: Calcular rango desde la respuesta real, incluyendo última página y cero resultados.

### Risk 11: Botón de filtros sin comportamiento

- Probability: Medium si se copia la referencia.
- Impact: Medium.
- Mitigation: Omitir el botón hasta implementar una interacción funcional.

### Risk 12: La tabla se expande hacia una pantalla completa

- Probability: Medium.
- Impact: High para el alcance.
- Mitigation: Mantener página 1, tamaño 5 y sin controles interactivos completos.

### Risk 13: Cambiar la cantidad de seis a cinco rompe pruebas anteriores

- Probability: Medium.
- Impact: Low.
- Mitigation: Actualizar query key, MSW, pruebas y documentación de forma coherente.

### Risk 14: La traducción visual contradice otras pantallas

- Probability: Medium.
- Impact: Low.
- Mitigation: Limitar el mapper a esta feature y reutilizar una política existente si ya está disponible.

## Rollback Strategy

- Restaurar temporalmente el tamaño de página anterior si la composición de cinco filas causa una regresión.
- Retirar el botón de refresh conservando la query de envíos.
- Restaurar el mapper anterior si la traducción de veredictos entra en conflicto con la UI global.
- Retirar metadata de paginación si no puede calcularse de manera fiable.
- Omitir la columna Archivo si su contrato no es inequívoco.
- Mantener los formatters de unidades porque reflejan el contrato confirmado.
- Retirar las secciones del dashboard sin modificar UserLayout.
- Revertir la sección documental actualizada sin afectar documentación histórica.
- Verificar después del rollback:
  - dashboard;
  - estadísticas;
  - envíos;
  - logout;
  - rutas administrativas;
  - creación de concursos;
  - tests;
  - typecheck;
  - build.

## Success Criteria

- El mismo change queda actualizado.
- `image(146).png` se documenta como referencia principal de la tabla.
- Tiempo se muestra en `ms`.
- Memoria se muestra en `MB`.
- `2000` se muestra como `2000 ms`.
- `1024` se muestra como `1024 MB`.
- Un cero real se muestra con unidad.
- Un dato ausente se muestra como `—`.
- No se utilizan conversiones de escala.
- No se agregan decimales artificiales.
- El mapper centraliza tiempo, memoria, fecha y veredictos.
- Los veredictos conocidos muestran etiquetas españolas y tonos definidos.
- Los veredictos desconocidos usan tono neutral.
- Evaluando solo existe cuando el backend lo confirma.
- Las columnas se basan en el contrato real.
- Archivo se muestra solo si existe un campo backend.
- El refresh vuelve a consultar únicamente envíos recientes.
- El refresh no recarga la página.
- El refresh conserva filas cuando sea posible.
- El refresh evita activaciones duplicadas.
- El dashboard solicita página 1 y tamaño 5.
- No se implementa paginación interactiva completa.
- La metadata se muestra solo con datos reales.
- No se muestra un botón de filtros sin comportamiento.
- No se muestra un enlace ficticio.
- La documentación ya no lista las unidades como pendientes.
- La documentación separa historial, dashboard y lista principal de UJ-11.
- Las pruebas requeridas pasan.
- No se modifica backend ni database.
- No se realiza commit ni push.
