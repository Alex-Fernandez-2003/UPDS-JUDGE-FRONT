# Proposal

## Problem Statement

UPDS JUDGE necesita implementar conjuntamente UJ-08 y UJ-09 en el frontend: capturar la configuración de un concurso, registrar sus problemas y adjuntar el paquete ZIP de casos de prueba.

Estas historias no deben separarse porque el backend recibe los datos del concurso, la colección de problemas y el archivo ZIP mediante una única solicitud `multipart/form-data`. Separarlas produciría un flujo frontend incompatible con la operación atómica expuesta por el backend.

La fundación frontend ya dispone de cliente HTTP compartido, `ApiError`, proxy `/api`, tipos OpenAPI, transporte Bearer desacoplado, TanStack Query, MSW, componentes visuales, `AdminLayout`, rutas reservadas y pruebas base. Este change debe extender esas capacidades sin duplicarlas.

La solución consistirá en una sola página en `/admin/contests/new`, renderizada dentro del `AdminLayout` existente. La página permitirá completar todos los datos, administrar una lista dinámica de problemas, adjuntar un ZIP y ejecutar una única acción de negocio: `Crear concurso`.

El endpoint reportado es `POST Concursos/crear`, resuelto mediante `VITE_API_BASE_URL=/api`. El request requiere Bearer mediante `AuthTransport`, pero OpenAPI continúa siendo la fuente contractual principal y debe verificarse antes de implementar.

Este change no implementará listado de concursos, autenticación, persistencia del JWT, guards, sidebar, topbar, borradores, publicación ni descompresión del ZIP en el navegador. :contentReference[oaicite:0]{index=0}

## Goals

- Crear un único change identificado como `uj08-uj09-create-contest-zip-import-frontend`.
- Mantener sus artefactos en `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/`.
- Implementar posteriormente, durante apply, una única página para UJ-08 y UJ-09.
- Reemplazar el placeholder de `/admin/contests/new` por `CreateContestPage`.
- Renderizar exclusivamente el contenido principal que consumirá el `AdminLayout` existente.
- Capturar nombre, descripción, código, fecha de inicio, duración, congelamiento, contraseña opcional y URL del set de problemas.
- Administrar entre 1 y 26 problemas mediante React Hook Form y `useFieldArray`.
- Generar automáticamente incisos consecutivos de `A` a `Z`.
- Adjuntar un único archivo ZIP mediante el `FileDropzone` existente.
- Construir el `FormData` fuera del componente de página.
- Enviar los datos mediante el cliente HTTP compartido.
- Utilizar `AuthTransport` para el Bearer existente.
- Utilizar `useMutation` de TanStack Query.
- Utilizar el código y mensaje devueltos por el backend como respuesta autoritativa.
- Presentar validaciones de campo y errores normalizados mediante componentes existentes.
- Mostrar un resumen lateral sin contraseña, JWT ni contenido del ZIP.
- Mantener una composición responsive de dos columnas en escritorio y una columna en móvil.
- Crear o ajustar un handler MSW solo después de confirmar el contrato.
- Agregar pruebas de schema, problemas dinámicos, FormData, servicio, mutación, página, errores y routing.
- Preservar todas las demás rutas y `/dev/ui`.
- Mantener pendientes las evidencias manuales hasta que sus archivos existan.

## Non-Goals

- No implementar una pantalla de listado o administración de concursos.
- No agregar el endpoint GET de concursos.
- No integrar la página con la tabla desarrollada por otro integrante.
- No implementar sidebar.
- No implementar topbar.
- No modificar las opciones de navegación del `AdminLayout`.
- No duplicar ni reemplazar `AdminLayout`.
- No implementar login o registro.
- No implementar persistencia de JWT.
- No leer JWT desde `localStorage` o `sessionStorage`.
- No implementar guards, `RequireAuth`, `RequireRole`, logout o refresh token.
- No crear un provider de autenticación adicional.
- No modificar el backend, CORS o ASP.NET Core.
- No modificar `database/`.
- No implementar borradores.
- No implementar estados de concurso.
- No implementar publicación o programación alternativa.
- No crear botones `Guardar borrador`, `Guardar y continuar`, `Siguiente`, `Anterior` o `Vista previa`.
- No implementar un wizard.
- No implementar selección de lenguajes.
- No implementar institución, portada, reglamento, participantes o espectadores.
- No implementar edición o eliminación de concursos.
- No inspeccionar, descomprimir o validar profundamente el ZIP en el navegador.
- No agregar JSZip.
- No crear casos de prueba en el frontend.
- No inventar límites de tamaño del ZIP.
- No inventar rutas, DTO, campos o códigos de respuesta.
- No editar manualmente `api.generated.ts`.
- No utilizar `fetch` directamente.
- No utilizar Axios.
- No duplicar el cliente HTTP o `QueryClient`.
- No modificar componentes compartidos salvo que una limitación verificable lo requiera.
- No crear nuevos átomos para resolver ajustes locales de margen, color o tipografía.
- No modificar documentos académicos existentes.
- No modificar el `README.md` de la raíz.
- No modificar el manual frontend.
- No generar automáticamente las capturas sugeridas.
- No realizar commits ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/proposal.md`
- `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md`
- `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/design.md`
- `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/tasks.md`

### Feature de concursos

Áreas probables dentro de `frontend/src/features/contests/`:

- API o servicios de creación de concurso.
- Hook de mutación.
- Schema Zod.
- Tipos de estado del formulario.
- Mapper de valores del formulario a `FormData`.
- Componentes específicos para problemas y resumen.
- Página `CreateContestPage`.
- Pruebas de la feature.

Los nombres y ubicación exactos deben adaptarse a las convenciones encontradas en el repositorio.

### Contratos compartidos

- `frontend/src/lib/api/endpoints.ts`.
- Tipos generados desde OpenAPI.
- Cliente HTTP compartido, solo como consumidor.
- `AuthTransport`, solo como consumidor.
- Configuración de MSW y handlers de concursos, cuando el contrato esté confirmado.

### Routing

- Configuración existente para `/admin/contests/new`.
- Constante de ruta existente.
- Placeholder actual de creación de concurso.

### Componentes reutilizados

- `Button`.
- `Input`.
- `PasswordInput`.
- `Textarea`.
- `FormField`.
- `FileDropzone`.
- `Card`.
- `Badge`.
- `Alert`.
- `Divider`.
- `Breadcrumbs`.
- `Spinner`, cuando corresponda.
- `AdminLayout`, sin modificar su estructura.

### Áreas protegidas

- Backend.
- `database/`.
- Documentos académicos existentes.
- `README.md` raíz.
- Manual frontend.
- Sidebar y topbar existentes.
- Infraestructura global de autenticación.
- Infraestructura global de Query y HTTP.

## Assumptions

- El proyecto local contiene la fundación frontend descrita por el usuario.
- Existe un placeholder o registro previo para `/admin/contests/new`.
- `AuthTransport` puede adjuntar el Bearer sin que la página conozca el token.
- El cliente HTTP existente acepta `FormData` o puede hacerlo sin establecer manualmente `Content-Type`.
- El cliente HTTP normaliza los errores mediante `ApiError`.
- OpenAPI puede regenerar o confirmar los tipos del endpoint.
- La forma del DTO proporcionada es contexto contractual sujeto a verificación contra OpenAPI.
- La respuesta exitosa incluye `codigo` y `mensaje`, sujeta a confirmación contractual.
- El backend identifica al creador desde el JWT.
- No se confirma acceso directo a los archivos de referencia visual; el diseño deberá basarse en las instrucciones visuales proporcionadas si no están disponibles durante explore.
- No se confirma si los componentes compartidos cubren todas las props requeridas sin cambios.
- No se confirma el formato temporal exacto requerido por ASP.NET Core hasta inspeccionar OpenAPI y pruebas reales.
- No se confirma si el backend acepta nombres de campos con la capitalización exacta mostrada; el mapper debe seguir el contrato verificado.
- No se confirma que el backend esté disponible durante apply.

## Risks

### Risk 1: Divergencia entre el DTO proporcionado y OpenAPI

- Probability: Medium.
- Impact: High, porque el model binding multipart puede rechazar campos, índices o tipos.
- Mitigation: Inspeccionar OpenAPI, regenerar tipos y realizar una prueba contractual antes de cerrar la implementación.

### Risk 2: Construcción incorrecta de `listaProblemas`

- Probability: Medium.
- Impact: High, porque el backend puede recibir una colección vacía o incompleta.
- Mitigation: Centralizar la construcción de `FormData` y probar cada clave indexada, incluido el reindexado posterior a una eliminación.

### Risk 3: `Content-Type` multipart configurado manualmente

- Probability: Low.
- Impact: High, porque se perdería el boundary generado por el navegador.
- Mitigation: Prohibir el header manual y agregar una prueba del servicio o cliente que inspeccione la solicitud.

### Risk 4: Conversión temporal incorrecta

- Probability: Medium.
- Impact: High, porque el concurso podría almacenarse en una hora distinta.
- Mitigation: Confirmar el formato esperado, encapsular la conversión y probar una fecha conocida sin inventar una zona horaria adicional.

### Risk 5: El JWT no está disponible durante la prueba manual

- Probability: Medium.
- Impact: Medium, porque el backend responderá 401.
- Mitigation: Probar la UI con MSW sin token real y reservar la prueba contractual para un entorno con autenticación ya integrada.

### Risk 6: Duplicación de autenticación en la feature

- Probability: Low.
- Impact: High por exposición o almacenamiento inseguro de credenciales.
- Mitigation: Consumir exclusivamente `AuthTransport`; revisar que no existan accesos a storage, props de token o providers nuevos.

### Risk 7: Validación frontend más restrictiva que el backend

- Probability: Medium.
- Impact: Medium, porque podría bloquear códigos o datos válidos.
- Mitigation: Aplicar solo reglas confirmadas; no definir un patrón de código ni límite ZIP no documentado.

### Risk 8: Incisos inconsistentes tras eliminar problemas

- Probability: Medium.
- Impact: High, porque las carpetas esperadas y `FormData` podrían divergir.
- Mitigation: Derivar los incisos del índice actual y verificar reindexado, resumen y mapper.

### Risk 9: Más de 26 problemas

- Probability: Low.
- Impact: Medium, porque no existen más incisos alfabéticos simples.
- Mitigation: Deshabilitar la acción de agregar en 26 y validar el límite en el schema.

### Risk 10: El ZIP válido visualmente falla en backend

- Probability: Medium.
- Impact: Medium.
- Mitigation: Limitar el frontend a extensión y presencia; presentar el mensaje seguro del backend sobre carpetas o pares `.in/.out`.

### Risk 11: El handler MSW diverge de la API

- Probability: Medium.
- Impact: Medium.
- Mitigation: Crear el handler solo con contrato confirmado, leer `FormData` y evitar simular la validación profunda del ZIP.

### Risk 12: Modificación accidental de `AdminLayout`

- Probability: Low.
- Impact: High por conflicto con trabajo de otro integrante.
- Mitigation: Renderizar solo el contenido de página y auditar el diff para excluir sidebar, topbar y shell.

### Risk 13: Redirección prematura después del éxito

- Probability: Medium.
- Impact: Medium, porque el usuario no podría leer el código autoritativo.
- Mitigation: Permanecer en la página y mostrar un estado de éxito con acción explícita hacia `/admin/contests`.

### Risk 14: Doble envío

- Probability: Medium.
- Impact: High por posible creación duplicada.
- Mitigation: Deshabilitar el submit durante `isPending`, mostrar loading y probar múltiples activaciones.

### Risk 15: Alcance visual excesivo

- Probability: Medium.
- Impact: Medium por retraso y duplicación del sistema visual.
- Mitigation: Reutilizar componentes existentes y crear únicamente componentes específicos de concursos con responsabilidad clara.

## Rollback Strategy

El change no modifica datos persistentes directamente desde el repositorio frontend, pero durante pruebas contra el backend podría crear concursos reales. La ejecución debe usar un entorno de desarrollo y datos desechables.

Rollback del frontend:

- Restaurar el placeholder anterior de `/admin/contests/new`.
- Retirar los archivos creados exclusivamente dentro de la feature de concursos.
- Retirar únicamente el endpoint de creación agregado a `endpoints.ts`.
- Retirar el handler MSW y sus fixtures específicos.
- Restaurar los tipos generados solo si el esquema no cambió para otras features.
- No revertir cambios ajenos en componentes compartidos, routing, HTTP, autenticación o Query.
- No eliminar carpetas de la fundación frontend.
- Ejecutar pruebas de las rutas restantes después del rollback.
- Confirmar que `/dev/ui` y otras rutas continúan funcionando.
- Auditar Git para comprobar que backend, `database/`, documentación académica, README raíz y manual frontend no fueron modificados.

Rollback de datos de prueba:

- No asumir que el frontend dispone de una operación de eliminación.
- Si una prueba crea datos reales, su limpieza dependerá de capacidades administrativas externas no incluidas en este change.
- Utilizar MSW para la mayoría de las verificaciones y minimizar creaciones reales.

## Success Criteria

- Existe un único change llamado `uj08-uj09-create-contest-zip-import-frontend`.
- El change reside exactamente en `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/`.
- UJ-08 y UJ-09 permanecen integradas en una única página y solicitud.
- `/admin/contests/new` renderiza el contenido de creación de concurso.
- La página no implementa sidebar, topbar, listado o autenticación.
- El formulario contiene las cinco secciones aprobadas.
- Se exige al menos un problema y se permiten como máximo 26.
- Los incisos se generan de `A` a `Z` y se actualizan al eliminar elementos.
- La modalidad se deriva únicamente de la contraseña.
- El resumen nunca presenta la contraseña.
- Solo se acepta un archivo con extensión ZIP.
- El navegador no descomprime ni inspecciona el contenido del ZIP.
- El mapper construye los campos multipart contractuales.
- No se establece manualmente el header `Content-Type`.
- La solicitud utiliza `POST Concursos/crear` mediante el cliente HTTP compartido.
- El Bearer se obtiene mediante `AuthTransport`.
- La página no accede a JWT o storage.
- La respuesta exitosa muestra el `mensaje` y `codigo` devueltos.
- Los errores 400 y 401 se muestran de forma segura mediante `ApiError`.
- El submit impide doble envío.
- Cancelar navega a `/admin/contests`.
- La UI funciona en escritorio y móvil.
- MSW permite probar éxito y errores sin JWT real, cuando el contrato esté confirmado.
- Las pruebas requeridas finalizan correctamente.
- Las demás rutas y `/dev/ui` continúan funcionando.
- No se modifican áreas protegidas.
- No se realizan commits ni push.
