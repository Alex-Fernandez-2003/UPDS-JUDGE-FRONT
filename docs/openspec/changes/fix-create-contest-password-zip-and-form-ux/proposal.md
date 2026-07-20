# Proposal

## Problem Statement

La implementación existente de `uj08-uj09-create-contest-zip-import-frontend` presenta defectos y limitaciones de experiencia de usuario en la ruta `/admin/contests/new`:

- Un concurso sin contraseña puede enviar `null` en lugar de una cadena vacía, provocando un rechazo del backend.
- El selector de ZIP no valida el nuevo límite frontend de 100 MB.
- La interacción para seleccionar, reemplazar y eliminar el ZIP necesita estados más claros.
- El resumen lateral requiere mayor jerarquía visual y mejor legibilidad.
- Los estados interactivos de botones y dropzone no comunican consistentemente hover, foco, loading o disabled.
- Agregar problemas de uno en uno mediante una acción textual resulta ineficiente para concursos con muchos problemas.
- No existe una operación compacta para agregar varios problemas respetando el límite de 26.

Este change corrige exclusivamente esos comportamientos sobre la pantalla existente de creación de concursos relacionada con UJ-08 y UJ-09.

No modifica el contrato del backend, no introduce nuevas historias y no altera el change original. La implementación debe extender la arquitectura y los componentes actuales en lugar de reconstruir la pantalla.

## Goals

- Garantizar que `contrasena` sea siempre un `string` en todas las capas del formulario.
- Enviar siempre la clave multipart `contrasena`, usando `''` cuando el campo esté vacío.
- Conservar sin cambios la regla:
  - contraseña vacía → concurso público;
  - contraseña con contenido → concurso privado.
- Centralizar el límite de ZIP en `MAX_CONTEST_ZIP_SIZE_BYTES = 100 * 1024 * 1024`.
- Aceptar archivos de hasta 100 MB inclusive.
- Rechazar archivos superiores a 100 MB antes del envío.
- Mejorar el selector ZIP para selección por click, botón visible, drag and drop, reemplazo y eliminación.
- Mostrar nombre, tamaño y estado del ZIP seleccionado.
- Rediseñar el resumen lateral usando los tokens y componentes existentes.
- Incorporar una advertencia visible sobre el límite y la estructura esperada del ZIP.
- Corregir hover, focus-visible, active, disabled, loading, cursor y transiciones de los elementos interactivos.
- Reemplazar la acción textual para agregar un problema por un `IconButton` con el icono `Plus`.
- Incorporar una operación inline para agregar varios problemas.
- Mantener incisos secuenciales, únicos y limitados de `A` a `Z`.
- Preservar la accesibilidad y el comportamiento responsive.
- Agregar pruebas de regresión para contraseña, ZIP, resumen, interacciones y problemas dinámicos.
- Mantener operativas las rutas existentes, `/dev/ui`, MSW y el flujo actual de creación.

## Non-Goals

- No implementar nuevas historias.
- No implementar listado, filtros, edición o eliminación de concursos.
- No implementar sidebar o topbar.
- No implementar login, sesión, guards, roles o persistencia JWT.
- No modificar AuthTransport ni el mecanismo de autenticación salvo una regresión demostrada y directamente relacionada.
- No modificar el backend.
- No modificar el DTO backend.
- No implementar el límite de 100 MB en backend.
- No modificar `database/`.
- No modificar el `README.md` de la raíz.
- No modificar documentos académicos.
- No modificar el manual frontend.
- No modificar ni archivar el change original.
- No implementar borradores, publicación, vista previa o selección de lenguajes.
- No descomprimir el ZIP.
- No leer archivos `.in` o `.out`.
- No agregar JSZip.
- No realizar una carga HTTP separada del ZIP.
- No implementar reordenamiento drag and drop de problemas.
- No instalar dependencias nuevas.
- No agregar otra biblioteca de iconos.
- No rediseñar globalmente el sistema visual.
- No crear nuevos átomos globales sin una limitación real de los existentes.
- No utilizar `window.prompt`.
- No realizar commits ni push.
- No utilizar OpenSpec CLI.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/proposal.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/spec.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/design.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/tasks.md`

### Feature de creación de concursos

Áreas probables dentro de la feature existente:

- Valores predeterminados de `CreateContestPage`.
- Schema Zod de creación de concurso.
- Tipo de valores del formulario.
- Mapper de valores a `FormData`.
- Componente o sección de selección del ZIP.
- Componente de problemas dinámicos.
- Componente del resumen lateral.
- Acciones de agregar y eliminar problemas.
- Pruebas de la feature.

Los nombres y rutas exactos deben confirmarse mediante inspección del repositorio.

### Componentes compartidos

Los siguientes componentes deben inspeccionarse antes de implementar cambios locales:

- `Button`.
- `IconButton`.
- `Input`.
- `FormField`.
- `FileDropzone`.
- `Card`.
- `Badge`.
- `Alert`.
- `Divider`.

Los componentes compartidos solo deben modificarse cuando la carencia afecte su contrato general y no pueda resolverse correctamente dentro de la feature.

### Catálogo y regresión

- `/dev/ui`, únicamente si se modifica un componente compartido.
- Routing de `/admin/contests/new`, solo para verificar que permanece intacto.
- Handler MSW de creación de concursos, si sus validaciones de formulario requieren ajustes de prueba.
- Tests compartidos y de feature.

### Áreas protegidas

- Backend.
- `database/`.
- Auth y sesión.
- Sidebar y topbar.
- Listado de concursos.
- README raíz.
- Manual frontend.
- Documentación académica.
- Otros changes OpenSpec.

## Assumptions

- La implementación de `uj08-uj09-create-contest-zip-import-frontend` ya existe en el repositorio.
- React Hook Form, Zod, FileDropzone, IconButton, Lucide React y Vitest están disponibles.
- El formulario utiliza un mapper para construir `FormData`.
- La lista de problemas utiliza `useFieldArray`.
- La pantalla ya contiene un resumen lateral que puede extenderse.
- El endpoint backend continúa aceptando el campo multipart `contrasena`.
- La referencia visual `image(138).png` puede no estar disponible durante apply; en ese caso se aplicarán únicamente las características visuales descritas.
- No se confirma si el defecto `null` se origina en default values, schema, reset, mapper o integración del control.
- No se confirma si FileDropzone ya soporta tamaño máximo, reemplazo, limpieza del input nativo y estados seleccionados.
- No se confirma si los defectos hover pertenecen a componentes compartidos o a clases locales.
- No se confirma si el backend convierte actualmente una cadena vacía en `null`.

## Risks

### Risk 1: La contraseña vuelve a transformarse en null después del schema

- Probability: Medium.
- Impact: High, porque seguiría impidiendo crear concursos públicos.
- Mitigation: Verificar cada transición desde `defaultValues` hasta `FormData` y agregar pruebas específicas por capa.

### Risk 2: El backend rechaza una cadena vacía correctamente enviada

- Probability: Medium.
- Impact: High para concursos públicos.
- Mitigation: Demostrar mediante prueba que `FormData.get('contrasena') === ''`. Si el backend aún responde 400, reportar incompatibilidad contractual sin agregar espacios, valores ficticios u otros workarounds.

### Risk 3: Cálculo incorrecto del límite de 100 MB

- Probability: Low.
- Impact: Medium.
- Mitigation: Utilizar bytes binarios de forma centralizada y probar exactamente el límite y un byte por encima.

### Risk 4: El archivo inválido permanece en React Hook Form o en el input nativo

- Probability: Medium.
- Impact: High, porque podría enviarse un archivo rechazado visualmente.
- Mitigation: Centralizar la transición del estado ZIP y probar selección inválida, reemplazo y eliminación.

### Risk 5: La eliminación no permite seleccionar nuevamente el mismo archivo

- Probability: Medium.
- Impact: Medium.
- Mitigation: Limpiar tanto el valor de React Hook Form como el input nativo.

### Risk 6: La validación ZIP se ejecuta solo en la UI

- Probability: Medium.
- Impact: Medium, porque una ruta alternativa podría intentar enviar un archivo excesivo.
- Mitigation: Validar en dropzone, schema y guard de submit, sin leer el contenido completo.

### Risk 7: Modificar FileDropzone rompe otras pantallas

- Probability: Medium si se modifica el componente compartido.
- Impact: High.
- Mitigation: Preferir un wrapper específico de concursos; si se modifica el componente compartido, preservar compatibilidad, ampliar pruebas y revisar `/dev/ui`.

### Risk 8: Los estilos hover locales divergen del sistema visual

- Probability: Medium.
- Impact: Medium.
- Mitigation: Inspeccionar primero variantes de Button, IconButton y FileDropzone; reutilizar tokens existentes.

### Risk 9: La operación bulk agrega parcialmente antes de detectar un exceso

- Probability: Medium.
- Impact: Medium.
- Mitigation: Validar la cantidad completa antes de mutar `useFieldArray` y agregar todos los elementos en una sola operación.

### Risk 10: Los incisos divergen después de operaciones combinadas

- Probability: Medium.
- Impact: High para la correspondencia con el ZIP.
- Mitigation: Derivar incisos del índice actual y probar agregar uno, agregar varios, eliminar y volver a agregar.

### Risk 11: El resumen muestra datos sensibles o campos inexistentes

- Probability: Low.
- Impact: High si expone contraseña.
- Mitigation: Usar una allowlist explícita de campos y pruebas negativas para contraseña, JWT, estado, lenguajes y visibilidad.

### Risk 12: El rediseño supera el alcance del fix

- Probability: Medium.
- Impact: Medium.
- Mitigation: Limitar cambios visuales al resumen, advertencia, selector ZIP y estados interactivos descritos.

## Rollback Strategy

El rollback debe restaurar la experiencia anterior sin modificar el contrato backend ni otros cambios.

- Restaurar la normalización anterior únicamente si la corrección de contraseña produce una regresión demostrada; mantener las pruebas que documenten el contrato esperado cuando sean válidas.
- Retirar la validación de 100 MB y el estado mejorado del ZIP si bloquean incorrectamente archivos válidos.
- Restaurar la versión anterior del selector ZIP preservando la selección básica.
- Restaurar el resumen y las acciones de problemas anteriores sin alterar la estructura de la feature.
- Si se modificó un componente compartido, revertir solo la extensión de su contrato y restaurar sus pruebas previas.
- No revertir cambios ajenos dentro de Button, IconButton o FileDropzone.
- No modificar ni archivar el change original durante el rollback.
- Verificar después del rollback:
  - creación con contraseña;
  - selección ZIP;
  - problemas dinámicos;
  - routing;
  - `/dev/ui`;
  - pruebas y build.
- No se requiere rollback de datos porque este change no introduce migraciones ni modifica el backend.

## Success Criteria

- `contrasena` inicia como `''`.
- El schema mantiene `contrasena` como `string`.
- Un valor `undefined` normalizable produce `''`.
- El mapper agrega siempre la clave `contrasena`.
- `FormData.get('contrasena')` devuelve `''` para un concurso público.
- No se producen `null`, `undefined`, `'null'`, `'undefined'` o un espacio sustituto.
- Una contraseña real se conserva.
- La modalidad continúa mostrando Público o Privado correctamente.
- El resumen nunca muestra la contraseña.
- Existe una constante única para 100 MB.
- Un archivo menor o igual a 100 MB es válido.
- Un archivo de más de 100 MB es rechazado.
- Un archivo inválido no queda seleccionado.
- Reemplazarlo por uno válido limpia el error.
- Eliminar el archivo limpia formulario, input y errores.
- El selector ZIP permite click, teclado, botón y drag and drop.
- El estado seleccionado muestra icono, nombre, tamaño, validez, cambio y eliminación.
- No se ejecuta una solicitud independiente al seleccionar el ZIP.
- El resumen presenta únicamente datos reales.
- La advertencia del ZIP muestra el límite y los incisos esperados.
- Los elementos interactivos tienen estados perceptibles y consistentes.
- El botón individual utiliza `IconButton` y `Plus`.
- La acción individual agrega exactamente un problema.
- La acción bulk valida y agrega la cantidad completa en una operación.
- Nunca existen más de 26 problemas.
- Los incisos permanecen secuenciales y únicos.
- La experiencia funciona en escritorio, móvil y teclado.
- Las pruebas requeridas finalizan correctamente.
- `/dev/ui`, routing, MSW y el formulario existente no presentan regresiones.
- No se modifican áreas protegidas.
- No se realizan commits ni push.
