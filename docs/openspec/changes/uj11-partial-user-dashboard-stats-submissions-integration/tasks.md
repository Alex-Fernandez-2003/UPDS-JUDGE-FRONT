# Tasks

## Implementation status

- [x] Tasks 1–33: baseline and backend contract inspected; user dashboard stats and recent-submissions integration, MSW coverage, automated tests, and UJ-11 documentation implemented.
- [x] Tasks 34–35: format, lint, typecheck, full tests, and production build completed.
- [x] Task 36 (source-contract portion): local backend controller and model re-inspected; live authenticated backend validation remains pending.
- [x] Task 37 (startup portion): application started on alternative port 8086; interactive responsive/keyboard validation remains pending.
- [x] Task 38 (repository portion): scope audited with no staged files, admin implementation, backend, or contest-list feature changes.

## Task 1: [Fase 1] Registrar el baseline actualizado

- Objective:
  Confirmar el estado actual del change y proteger modificaciones preexistentes.
- Files or areas likely involved:
  Working tree, OpenSpec, contests user, dashboard y documentación.
- Execution notes:
  No crear un change nuevo ni restaurar trabajo ajeno.
- Verification method:
  Estado inicial y lista de archivos existentes.
- Dependencies:
  None.

## Task 2: [Fase 1] Reinspeccionar EnviosController y DTO

- Objective:
  Confirmar campos actuales, nulabilidad, Archivo y estados de veredicto.
- Files or areas likely involved:
  `Controllers/EnviosController.cs`, DTOs y modelos relacionados.
- Execution notes:
  Registrar nombres exactos. No modificar backend.
- Verification method:
  Tabla de campo, tipo, nulabilidad y semántica.
- Dependencies:
  Task 1.

## Task 3: [Fase 1] Confirmar la columna Archivo

- Objective:
  Decidir si forma parte de la tabla.
- Files or areas likely involved:
  Contrato backend y tipos frontend.
- Execution notes:
  No derivar o inventar nombres.
- Verification method:
  Decisión explícita respaldada por el DTO.
- Dependencies:
  Task 2.

## Task 4: [Fase 1] Confirmar estados pendientes de evaluación

- Objective:
  Determinar si el backend puede devolver un veredicto pendiente.
- Files or areas likely involved:
  Controller, modelo de Envio y lógica del juez.
- Execution notes:
  No añadir `EVALUANDO` sin valor real.
- Verification method:
  Catálogo contractual de estados.
- Dependencies:
  Task 2.

## Task 5: [Fase 1] Inspeccionar la sección de envíos actual

- Objective:
  Confirmar componentes, props, query, tamaño y acciones existentes.
- Files or areas likely involved:
  Contests user y dashboard.
- Execution notes:
  Contrastar con `image(146).png`.
- Verification method:
  Gap analysis de UI y comportamiento.
- Dependencies:
  Task 1.

## Task 6: [Fase 1] Inspeccionar componentes base y TanStack Query

- Objective:
  Confirmar APIs de Button, IconButton, Table y conservación de datos durante refetch.
- Files or areas likely involved:
  `src/components/`, hooks y package.json.
- Execution notes:
  Reutilizar capacidades existentes.
- Verification method:
  Matriz de APIs disponibles.
- Dependencies:
  Task 1.

## Task 7: [Fase 2] Actualizar los tipos de envíos

- Objective:
  Reflejar unidades confirmadas, nulabilidad y campo Archivo real.
- Files or areas likely involved:
  Types de contests user.
- Execution notes:
  No ampliar a null sin evidencia.
- Verification method:
  Typecheck y comparación con DTO backend.
- Dependencies:
  Tasks 2 and 3.

## Task 8: [Fase 2] Mantener parámetros de consulta completos

- Objective:
  Conservar soporte para resultado, concurso, inciso, página y tamaño.
- Files or areas likely involved:
  Tipos, servicio y query keys.
- Execution notes:
  El dashboard usará página 1 y tamaño 5.
- Verification method:
  Tests de parámetros y query keys.
- Dependencies:
  Task 7.

## Task 9: [Fase 3] Crear el formatter de tiempo

- Objective:
  Mostrar valores en milisegundos sin conversión.
- Files or areas likely involved:
  Mappers o formatters de contests user.
- Execution notes:
  Diferenciar cero, ausencia y no finito.
- Verification method:
  Tests de 48, 2000, 0, null, undefined y NaN.
- Dependencies:
  Task 7.

## Task 10: [Fase 3] Crear el formatter de memoria

- Objective:
  Mostrar valores en megabytes sin conversión ni decimales artificiales.
- Files or areas likely involved:
  Mappers o formatters de contests user.
- Execution notes:
  Diferenciar cero, ausencia y no finito.
- Verification method:
  Tests de 8.1, 12, 0, null, undefined e Infinity.
- Dependencies:
  Task 7.

## Task 11: [Fase 3] Actualizar el mapper de veredictos

- Objective:
  Traducir estados conocidos y asignar tonos.
- Files or areas likely involved:
  Mapper de envíos.
- Execution notes:
  Incluir Evaluando solo si Task 4 lo confirma.
- Verification method:
  Tests de estados conocidos, pendiente y desconocido.
- Dependencies:
  Task 4.

## Task 12: [Fase 3] Actualizar el mapper de filas

- Objective:
  Integrar problema, veredicto, unidades, fecha y Archivo condicional.
- Files or areas likely involved:
  Mapper DTO → ViewModel.
- Execution notes:
  No formatear dentro del JSX.
- Verification method:
  Tests campo por campo.
- Dependencies:
  Tasks 3, 9, 10 and 11.

## Task 13: [Fase 4] Ajustar la consulta del dashboard

- Objective:
  Solicitar cinco envíos recientes de la primera página.
- Files or areas likely involved:
  RecentSubmissionsSection y hook.
- Execution notes:
  Mantener soporte general de parámetros.
- Verification method:
  Test de pagina 1 y tamanoPagina 5.
- Dependencies:
  Task 8.

## Task 14: [Fase 4] Actualizar las columnas de la tabla

- Objective:
  Mostrar únicamente campos respaldados por backend.
- Files or areas likely involved:
  RecentSubmissionsTable.
- Execution notes:
  Incluir Archivo solo cuando Task 3 lo apruebe.
- Verification method:
  Tests de encabezados y filas.
- Dependencies:
  Tasks 3 and 12.

## Task 15: [Fase 4] Aplicar unidades confirmadas

- Objective:
  Renderizar `ms` y `MB` en la tabla.
- Files or areas likely involved:
  RecentSubmissionsTable y ViewModel.
- Execution notes:
  No convertir escalas ni añadir decimales fijos.
- Verification method:
  Tests visuales de unidades y ausencia.
- Dependencies:
  Tasks 9, 10 and 14.

## Task 16: [Fase 4] Actualizar encabezado y descripción

- Objective:
  Alinear la sección con `image(146).png` sin afirmar un único concurso.
- Files or areas likely involved:
  RecentSubmissionsSection.
- Execution notes:
  Usar una descripción general del historial reciente.
- Verification method:
  Test de título y texto.
- Dependencies:
  Task 5.

## Task 17: [Fase 4] Implementar el botón Actualizar

- Objective:
  Refetchear únicamente la query de envíos.
- Files or areas likely involved:
  RecentSubmissionsSection, hook y Button/IconButton.
- Execution notes:
  Usar Lucide y no recargar la página.
- Verification method:
  Test de refetch y ausencia de reload.
- Dependencies:
  Tasks 6 and 13.

## Task 18: [Fase 4] Implementar estado de refreshing

- Objective:
  Comunicar actualización y evitar doble activación.
- Files or areas likely involved:
  RecentSubmissionsSection.
- Execution notes:
  Conservar filas previas cuando sea posible.
- Verification method:
  Tests de loading visual, disabled y datos persistentes.
- Dependencies:
  Task 17.

## Task 19: [Fase 4] Decidir la UI de filtros

- Objective:
  Confirmar si existe una interacción mínima dentro del alcance.
- Files or areas likely involved:
  Diseño de la sección.
- Execution notes:
  Decisión predeterminada: omitir botón de filtros.
- Verification method:
  No existe botón sin comportamiento; decisión documentada.
- Dependencies:
  Tasks 5 and 8.

## Task 20: [Fase 5] Implementar metadata de paginación

- Objective:
  Calcular un rango real cuando se muestre.
- Files or areas likely involved:
  Helper y RecentSubmissionsSection.
- Execution notes:
  No hardcodear valores.
- Verification method:
  Tests de primera página, última parcial y cero resultados.
- Dependencies:
  Task 13.

## Task 21: [Fase 5] Mantener paginación interactiva fuera del dashboard

- Objective:
  Evitar ampliar el componente parcial a una pantalla completa.
- Files or areas likely involved:
  RecentSubmissionsSection.
- Execution notes:
  No renderizar controles que no cambien la query.
- Verification method:
  Ausencia de paginación falsa y links ficticios.
- Dependencies:
  Tasks 19 and 20.

## Task 22: [Fase 5] Completar responsive de la nueva referencia

- Objective:
  Adaptar acciones, tabla y metadata a móvil.
- Files or areas likely involved:
  RecentSubmissionsSection y tabla.
- Execution notes:
  Reutilizar componentes y className.
- Verification method:
  Revisión móvil y tests semánticos.
- Dependencies:
  Tasks 14 through 21.

## Task 23: [Fase 6] Actualizar handler MSW de envíos

- Objective:
  Representar tiempo en ms, memoria en MB y posible campo Archivo.
- Files or areas likely involved:
  Handlers y fixtures.
- Execution notes:
  Mantener valores numéricos sin sufijos en JSON.
- Verification method:
  Tests del contrato simulado.
- Dependencies:
  Tasks 2, 3 and 7.

## Task 24: [Fase 6] Actualizar pruebas de formatters

- Objective:
  Cubrir unidades, cero, ausencia y no conversión.
- Files or areas likely involved:
  Tests de mappers o formatters.
- Execution notes:
  Incluir 2000 ms y 1024 MB.
- Verification method:
  Todos los casos exigidos en verde.
- Dependencies:
  Tasks 9 and 10.

## Task 25: [Fase 6] Actualizar pruebas de veredictos

- Objective:
  Cubrir traducciones, tonos y fallback.
- Files or areas likely involved:
  Tests del mapper.
- Execution notes:
  Evaluando solo cuando esté confirmado.
- Verification method:
  Catálogo completo en verde.
- Dependencies:
  Task 11.

## Task 26: [Fase 6] Actualizar pruebas de filas y Archivo

- Objective:
  Verificar columnas, problema compuesto y campo condicional.
- Files or areas likely involved:
  Tests de mapper y tabla.
- Execution notes:
  Probar el resultado correspondiente al contrato real.
- Verification method:
  Tests de presencia o ausencia de Archivo.
- Dependencies:
  Tasks 3, 12 and 14.

## Task 27: [Fase 6] Actualizar pruebas de refresh

- Objective:
  Confirmar refetch aislado y estado de actualización.
- Files or areas likely involved:
  Tests de RecentSubmissionsSection.
- Execution notes:
  Verificar ausencia de reload y doble solicitud.
- Verification method:
  Casos de refresh en verde.
- Dependencies:
  Tasks 17 and 18.

## Task 28: [Fase 6] Actualizar pruebas de metadata

- Objective:
  Verificar rangos y totales reales.
- Files or areas likely involved:
  Tests del helper o sección.
- Execution notes:
  Cubrir última página parcial y cero resultados.
- Verification method:
  Casos de metadata en verde.
- Dependencies:
  Task 20.

## Task 29: [Fase 6] Ejecutar regresión de independencia

- Objective:
  Confirmar que refresh y errores de envíos no afectan estadísticas.
- Files or areas likely involved:
  Tests del dashboard.
- Execution notes:
  Mantener queries separadas.
- Verification method:
  Tests cruzados en verde.
- Dependencies:
  Tasks 18 and 27.

## Task 30: [Fase 7] Actualizar la documentación UJ-11

- Objective:
  Registrar unidades confirmadas y decisiones visuales.
- Files or areas likely involved:
  `docs/historias/UJ-11-lista-concursos-filtrados.md` o documento existente.
- Execution notes:
  Eliminar confirmación de unidades de pendientes.
- Verification method:
  `ms` y `MB` documentados como contrato.
- Dependencies:
  Tasks 2, 3, 19 and 21.

## Task 31: [Fase 7] Documentar la columna Archivo

- Objective:
  Registrar el resultado de la reinspección.
- Files or areas likely involved:
  Documento UJ-11.
- Execution notes:
  Indicar campo real o pendiente backend.
- Verification method:
  La documentación coincide con la tabla implementada.
- Dependencies:
  Tasks 3 and 30.

## Task 32: [Fase 7] Separar las tres piezas funcionales

- Objective:
  Diferenciar dashboard, historial completo y lista principal UJ-11.
- Files or areas likely involved:
  Documento UJ-11.
- Execution notes:
  No presentar la tabla reciente como historia completa.
- Verification method:
  Tres alcances claramente diferenciados.
- Dependencies:
  Task 30.

## Task 33: [Fase 7] Actualizar evidencias pendientes

- Objective:
  Registrar las nuevas rutas sugeridas.
- Files or areas likely involved:
  Documento UJ-11.
- Execution notes:
  No crear archivos ni links inexistentes.
- Verification method:
  Cinco rutas aparecen como pendientes.
- Dependencies:
  Tasks 30 through 32.

## Task 34: [Fase 8] Ejecutar format, lint y typecheck

- Objective:
  Verificar estilo y contratos.
- Files or areas likely involved:
  Archivos modificados.
- Execution notes:
  No ampliar el diff con formato no relacionado.
- Verification method:
  Checks exitosos.
- Dependencies:
  Tasks 23 through 33.

## Task 35: [Fase 8] Ejecutar tests y build

- Objective:
  Verificar comportamiento, regresión y producción.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No usar skips, casts inseguros o snapshots vacíos.
- Verification method:
  Test suite y build exitosos.
- Dependencies:
  Task 34.

## Task 36: [Fase 8] Validar con backend real

- Objective:
  Confirmar unidades, veredictos, Archivo y refresh.
- Files or areas likely involved:
  Dashboard, Network y backend.
- Execution notes:
  No registrar JWT reales.
- Verification method:
  Datos reales coinciden con la presentación.
- Dependencies:
  Task 35.

## Task 37: [Fase 8] Validar responsive y teclado

- Objective:
  Revisar tabla, acciones, metadata y estados.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Probar móvil, scroll, foco y Actualizar.
- Verification method:
  Checklist manual.
- Dependencies:
  Task 36.

## Task 38: [Fase 8] Auditar alcance y cerrar sin commit

- Objective:
  Confirmar que el change sigue siendo parcial.
- Files or areas likely involved:
  Git diff y documentación.
- Execution notes:
  Verificar ausencia de historial completo, filtros de concursos, backend y cambios admin. No usar OpenSpec CLI, commit o push.
- Verification method:
  Checklist final y estado de Git.
- Dependencies:
  Tasks 35 through 37.

## Review Workload Forecast

- Estimated LoC changed:
  650-1,100 LoC, incluyendo la integración anterior, formatters, mappers, refresh, metadata, pruebas, MSW y documentación.
- Risk of exceeding 400 LoC review threshold:
  High.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: contratos actualizados, formatters, veredictos y mapper.
  - PR 2: tabla, unidades, Archivo condicional y referencia visual.
  - PR 3: refresh, metadata y decisión de filtros/paginación.
  - PR 4: MSW, pruebas y regresión del dashboard.
  - PR 5: documentación y validación final.
