# Tasks

## Task 1: Inspeccionar el change original y la implementación vigente

- Objective:
  Localizar los archivos reales de la pantalla, schema, mapper, problemas, ZIP, resumen y pruebas.
- Files or areas likely involved:
  Change original como referencia documental, feature de concursos, ruta `/admin/contests/new` y tests.
- Execution notes:
  No modificar ni archivar el change original. Registrar las convenciones reales antes de crear archivos nuevos.
- Verification method:
  Mapa de archivos y responsabilidades actuales.
- Dependencies:
  None.

## Task 2: Reproducir el defecto de contraseña

- Objective:
  Identificar en qué capa `contrasena` deja de ser `''`.
- Files or areas likely involved:
  Default values, tipos, schema, React Hook Form, mapper, servicio y tests.
- Execution notes:
  Inspeccionar sin aplicar workarounds. Verificar el contenido real de FormData.
- Verification method:
  Test RED que demuestre el valor incorrecto y registro de la primera capa donde cambia.
- Dependencies:
  Task 1.

## Task 3: Inspeccionar FileDropzone y componentes interactivos

- Objective:
  Determinar si las mejoras deben ser compartidas o específicas de concursos.
- Files or areas likely involved:
  FileDropzone, Button, IconButton, `/dev/ui` y página.
- Execution notes:
  Revisar props, refs, estados, estilos, accesibilidad y consumidores existentes.
- Verification method:
  Matriz de capacidades y limitaciones con decisión documentada.
- Dependencies:
  Task 1.

## Task 4: Inspeccionar la referencia visual y el resumen actual

- Objective:
  Mapear los elementos permitidos de la referencia al sistema visual existente.
- Files or areas likely involved:
  Resumen de creación, Card, Badge, Alert, Divider y tokens.
- Execution notes:
  Excluir borrador, lenguajes y visibilidad independiente.
- Verification method:
  Esquema de contenido y jerarquía visual limitado a los campos aprobados.
- Dependencies:
  Task 1.

## Task 5: Normalizar el valor predeterminado de contraseña

- Objective:
  Garantizar que el formulario inicie con `contrasena: ''`.
- Files or areas likely involved:
  Configuración de React Hook Form y tipos.
- Execution notes:
  Aplicar GREEN sobre el test que reproduce el defecto inicial.
- Verification method:
  Test que compruebe el valor inicial exacto.
- Dependencies:
  Task 2.

## Task 6: Normalizar la contraseña en el schema

- Objective:
  Asegurar que el resultado validado siempre sea string.
- Files or areas likely involved:
  Schema Zod y tests.
- Execution notes:
  Aceptar vacío y normalizar ausencia tolerada. No usar espacios sustitutos.
- Verification method:
  Tests para vacío, undefined, contenido y espacios según la regla definida.
- Dependencies:
  Task 5.

## Task 7: Corregir el mapper de FormData

- Objective:
  Agregar siempre `contrasena` con un string válido.
- Files or areas likely involved:
  Mapper multipart y tests.
- Execution notes:
  No omitir la clave y no modificar el servicio.
- Verification method:
  Tests de `FormData.has` y `FormData.get`, incluidos vacío y valor real.
- Dependencies:
  Task 6.

## Task 8: Verificar el servicio y documentar incompatibilidad backend

- Objective:
  Confirmar que ninguna capa posterior altera la contraseña.
- Files or areas likely involved:
  Servicio, HttpClient simulado, tests de integración de feature.
- Execution notes:
  Si el backend rechaza `''`, registrar el problema sin workaround.
- Verification method:
  Inspección del FormData recibido por el servicio y prueba contractual cuando el backend esté disponible.
- Dependencies:
  Task 7.

## Task 9: Crear la constante central de tamaño ZIP

- Objective:
  Establecer el límite inclusivo de 100 MB en una única fuente.
- Files or areas likely involved:
  Constantes de la feature o área equivalente.
- Execution notes:
  Usar `100 * 1024 * 1024` y evitar duplicaciones.
- Verification method:
  Test o revisión que confirme el valor exacto y sus consumidores.
- Dependencies:
  Tasks 1 and 3.

## Task 10: Extender la validación Zod del ZIP

- Objective:
  Rechazar archivos superiores al límite antes del submit.
- Files or areas likely involved:
  Schema de creación y tests.
- Execution notes:
  Mantener las validaciones existentes de presencia y extensión.
- Verification method:
  Tests menor, exacto y un byte superior.
- Dependencies:
  Task 9.

## Task 11: Diseñar los estados del selector ZIP

- Objective:
  Definir vacío, drag activo, seleccionado, error y disabled.
- Files or areas likely involved:
  FileDropzone o wrapper específico de concursos.
- Execution notes:
  Preferir una solución local si el contrato global no necesita cambiar.
- Verification method:
  Tests de render y accesibilidad de cada estado.
- Dependencies:
  Tasks 3, 9 and 10.

## Task 12: Implementar selección y reemplazo del ZIP

- Objective:
  Admitir click, botón, teclado, drag and drop y reemplazo.
- Files or areas likely involved:
  Campo ZIP de concursos y React Hook Form.
- Execution notes:
  Un archivo inválido no debe almacenarse. No iniciar requests.
- Verification method:
  Tests de click, botón, drop, archivo inválido y reemplazo válido.
- Dependencies:
  Task 11.

## Task 13: Implementar el estado visual del archivo seleccionado

- Objective:
  Mostrar icono, nombre, tamaño y estado válido.
- Files or areas likely involved:
  Campo ZIP y utilidad de formato de bytes.
- Execution notes:
  Truncar visualmente nombres largos preservando el nombre accesible.
- Verification method:
  Tests de nombre, tamaño, icono y accesibilidad.
- Dependencies:
  Task 12.

## Task 14: Implementar cambio y eliminación del ZIP

- Objective:
  Permitir reemplazar o limpiar completamente el archivo.
- Files or areas likely involved:
  Campo ZIP, input nativo y React Hook Form.
- Execution notes:
  Eliminar debe limpiar valor, input y errores, permitiendo volver a seleccionar el mismo archivo.
- Verification method:
  Tests de reemplazo, eliminación, reselección y limpieza de errores.
- Dependencies:
  Tasks 12 and 13.

## Task 15: Agregar la defensa de ZIP en submit

- Objective:
  Impedir el envío si el archivo actual supera el límite.
- Files or areas likely involved:
  Handler de submit o capa de coordinación del formulario.
- Execution notes:
  No duplicar mensajes ni realizar lectura del contenido.
- Verification method:
  Test que manipule el estado y confirme que la mutación no se ejecuta.
- Dependencies:
  Tasks 10 and 14.

## Task 16: Reemplazar la acción individual de problemas

- Objective:
  Usar IconButton con Plus para agregar un problema.
- Files or areas likely involved:
  Componente de problemas dinámicos.
- Execution notes:
  Incluir nombre accesible, disabled en 12 y actualización del resumen.
- Verification method:
  Tests de icono, aria-label, agregado único, inciso y límite.
- Dependencies:
  Task 3.

## Task 17: Crear el panel inline para agregar varios

- Objective:
  Capturar una cantidad adicional sin modal ni prompt.
- Files or areas likely involved:
  Componente específico de acciones de problemas.
- Execution notes:
  Mostrar problemas actuales, máximo disponible, Input, Agregar y Cancelar.
- Verification method:
  Tests de apertura, cierre, label y acciones.
- Dependencies:
  Task 16.

## Task 18: Validar la cantidad bulk

- Objective:
  Rechazar cero, negativos, decimales y excesos sin mutar la lista.
- Files or areas likely involved:
  Panel bulk y validación local.
- Execution notes:
  Recalcular el máximo disponible usando el conteo actual.
- Verification method:
  Tests de todos los valores inválidos y ausencia de agregados parciales.
- Dependencies:
  Task 17.

## Task 19: Implementar el agregado bulk atómico

- Objective:
  Agregar todos los problemas solicitados en una sola operación compatible con `useFieldArray`.
- Files or areas likely involved:
  Acciones de problemas y tipos predeterminados de cada elemento.
- Execution notes:
  Generar elementos sin incisos editables; cerrar y limpiar después del éxito.
- Verification method:
  Tests de cantidad, secuencia, resumen, limpieza y máximo 12.
- Dependencies:
  Task 18.

## Task 20: Verificar reindexado e incisos compartidos

- Objective:
  Mantener una única derivación de incisos para lista, mapper, resumen y ayuda ZIP.
- Files or areas likely involved:
  Problemas dinámicos, mapper, resumen y advertencia.
- Execution notes:
  Evitar estados duplicados para los incisos.
- Verification method:
  Tests combinados de agregar uno, bulk, eliminar y volver a agregar.
- Dependencies:
  Tasks 16 and 19.

## Task 21: Rediseñar el resumen lateral

- Objective:
  Aplicar la jerarquía visual solicitada usando componentes y tokens existentes.
- Files or areas likely involved:
  CreateContestSummary o equivalente.
- Execution notes:
  Crear encabezado azul oscuro con icono, filas separadas, labels secundarias y valores contrastados.
- Verification method:
  Tests de campos permitidos, placeholders y exclusión de datos sensibles o inexistentes.
- Dependencies:
  Tasks 4, 13 and 20.

## Task 22: Agregar la advertencia informativa del ZIP

- Objective:
  Mostrar el límite y los incisos esperados.
- Files or areas likely involved:
  Resumen, página o Alert existente.
- Execution notes:
  Utilizar tokens existentes y mantener el contenido reactivo.
- Verification method:
  Tests de límite, texto e incisos actualizados.
- Dependencies:
  Tasks 9, 20 and 21.

## Task 23: Auditar y corregir estados interactivos locales

- Objective:
  Corregir hover, focus-visible, active, disabled, loading, cursor y transición.
- Files or areas likely involved:
  Acciones del formulario, problemas, ZIP y éxito.
- Execution notes:
  No aplicar hover a elementos no interactivos. Resolver localmente cuando sea suficiente.
- Verification method:
  Checklist de cada acción y pruebas de disabled/loading/focus.
- Dependencies:
  Tasks 12, 14, 16, 17 and 21.

## Task 24: Corregir componentes compartidos solo si es necesario

- Objective:
  Resolver defectos generales confirmados en Button, IconButton o FileDropzone.
- Files or areas likely involved:
  Componentes compartidos, sus tests y `/dev/ui`.
- Execution notes:
  Preservar API y variantes. Omitir esta tarea si la corrección es local.
- Verification method:
  Suite compartida, revisión de variantes y `/dev/ui`.
- Dependencies:
  Tasks 3 and 23.

## Task 25: Completar responsive y accesibilidad

- Objective:
  Garantizar la composición móvil, controles operables y errores asociados.
- Files or areas likely involved:
  Página, ZIP, problemas, resumen y panel bulk.
- Execution notes:
  Verificar orden móvil, overflow, foco, labels y nombres accesibles.
- Verification method:
  Tests accesibles y revisión manual en desktop y móvil.
- Dependencies:
  Tasks 14, 19, 21, 22 and 23.

## Task 26: Completar pruebas de contraseña

- Objective:
  Consolidar la regresión desde default values hasta FormData.
- Files or areas likely involved:
  Tests de formulario, schema, mapper, modalidad y resumen.
- Execution notes:
  Aplicar TRIANGULATE con vacío, undefined, valor real y exclusión del resumen.
- Verification method:
  Todos los casos de contraseña requeridos en verde.
- Dependencies:
  Tasks 5 through 8 and 21.

## Task 27: Completar pruebas de ZIP

- Objective:
  Cubrir límites, selección, cambio, eliminación y ausencia de upload independiente.
- Files or areas likely involved:
  Tests del schema, campo ZIP, página y submit.
- Execution notes:
  Incluir exactamente 100 MB y un byte por encima.
- Verification method:
  Todos los casos de ZIP requeridos en verde.
- Dependencies:
  Tasks 9 through 15 and 22.

## Task 28: Completar pruebas de problemas y resumen

- Objective:
  Cubrir agregado individual, bulk, límites, incisos y contenido seguro.
- Files or areas likely involved:
  Tests de componentes de problemas y resumen.
- Execution notes:
  Incluir operaciones combinadas y pruebas negativas de campos no permitidos.
- Verification method:
  Todos los casos de problemas y resumen requeridos en verde.
- Dependencies:
  Tasks 16 through 22.

## Task 29: Ejecutar regresión de pantalla, routing y MSW

- Objective:
  Confirmar que el fix no rompe el flujo original.
- Files or areas likely involved:
  Página, router, MSW y servicio de creación.
- Execution notes:
  No alterar contratos ni handlers salvo lo requerido por pruebas del fix.
- Verification method:
  Submit con MSW, ruta `/admin/contests/new`, otras rutas y `/dev/ui`.
- Dependencies:
  Tasks 24, 25, 26, 27 and 28.

## Task 30: Ejecutar validaciones técnicas

- Objective:
  Verificar formato, lint, tipos, pruebas, build y ejecución local.
- Files or areas likely involved:
  Proyecto frontend completo.
- Execution notes:
  Ejecutar los scripts existentes sin utilizar OpenSpec CLI.
- Verification method:
  Resultados exitosos de format, lint, typecheck, tests, build y dev.
- Dependencies:
  Task 29.

## Task 31: Verificar manualmente la incompatibilidad potencial del backend

- Objective:
  Confirmar el comportamiento real con `contrasena=''` cuando el backend y auth estén disponibles.
- Files or areas likely involved:
  FormData, servicio existente y backend como dependencia externa.
- Execution notes:
  No implementar workarounds. Reportar el resultado y evidencia del valor enviado.
- Verification method:
  Respuesta del backend y comprobación del multipart enviado.
- Dependencies:
  Tasks 8 and 30.

## Task 32: Auditar alcance y áreas protegidas

- Objective:
  Confirmar que el diff se limita al fix solicitado.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Verificar que no se modificaron backend, base de datos, auth, sidebar, topbar, listado, documentación ni otros changes.
- Verification method:
  Checklist de exclusiones y comparación con el baseline.
- Dependencies:
  Tasks 30 and 31.

## Task 33: Mantener pendientes las evidencias manuales

- Objective:
  Evitar declarar capturas inexistentes.
- Files or areas likely involved:
  Estado de tareas y rutas de capturas utilizadas por el proyecto.
- Execution notes:
  No crear imágenes o placeholders.
- Verification method:
  Comprobar existencia física antes de marcar cualquier evidencia.
- Dependencies:
  Task 32.

## Task 34: Actualizar tareas y cerrar sin commit

- Objective:
  Reflejar únicamente el trabajo verificado y preparar el handoff.
- Files or areas likely involved:
  `tasks.md` y working tree.
- Execution notes:
  Documentar bloqueos, especialmente una posible incompatibilidad backend. No hacer commit ni push.
- Verification method:
  Estados respaldados por evidencia y `git status` final revisado.
- Dependencies:
  Tasks 32 and 33.

## Task 35: Normalizar código y ajustar límite de problemas

- Objective:
  Centralizar el formato de código y reducir el máximo de problemas sin ampliar el change.
- Files or areas likely involved:
  Constantes, schema, mapper, pantalla, lista de problemas, pruebas y componentes comunes solo para el defecto compartido confirmado.
- Execution notes:
  Normalizar códigos como slugs en minúsculas, usar el límite central de 12 en schema y UI, y mantener `type="button"` en controles no submit. Si Button o IconButton requieren reparación global, cubrirla y exponerla en `/dev/ui`.
- Verification method:
  Pruebas de schema, mapper, pantalla y componentes comunes; format, lint, typecheck, test, build y arranque de dev.
- Dependencies:
  Tasks 23, 24, 28 and 30.

## Review Workload Forecast

- Estimated LoC changed:
  450-850 LoC, incluyendo correcciones, componentes específicos y pruebas. Puede aumentar si FileDropzone o Button requieren cambios compartidos.
- Risk of exceeding 400 LoC review threshold:
  High.
- Recommendation:
  Chained PRs manteniendo un único change OpenSpec.
- Suggested split if chained:
  - PR 1: normalización de contraseña y pruebas multipart.
  - PR 2: límite y experiencia ZIP con pruebas.
  - PR 3: acciones individual/bulk e incisos.
  - PR 4: resumen, estados interactivos, responsive y regresión.
  - Si el proceso exige un único PR, organizar los commits lógicos por estas mismas unidades sin hacer push automático.

## Execution Status

- [x] Tasks 1-3 and 5-24: implementation, local UX decisions, and automated coverage completed. Task 2 found that the normal UI already sent `''`; schema/mapper tolerance was strengthened without a workaround.
- [x] Task 4: completed from the explicit specification because the supplied reference image was unavailable.
- [x] Tasks 25-30: automated accessibility, feature/regression, format, lint, typecheck, test, build, and local-route checks completed.
- [ ] Task 31: backend/auth integration is unavailable in this workspace; frontend multipart tests prove the value sent is exactly `''` and no frontend workaround was added.
- [x] Task 32: scope audit completed; production changes are limited to `frontend/src/features/contests/**`.
- [x] Task 33: no screenshots or placeholder evidence were created.
- [x] Task 34: task status and working tree were reviewed; no commit or push was performed.
- [x] Task 35: code normalization, 12-problem cap, bulk messaging, danger deletion treatment, and shared Button/IconButton interaction defaults were added with focused coverage.
