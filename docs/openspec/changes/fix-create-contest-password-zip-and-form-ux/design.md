# Design

## Components Touched

### Formulario de creación

Áreas probables de la feature existente:

- Configuración de `defaultValues`.
- Tipo de valores de creación.
- Schema Zod.
- Mapper de `CreateContestFormValues` a `FormData`.
- Componente de problemas dinámicos.
- Campo o wrapper del ZIP.
- Resumen lateral.
- Página de creación.
- Tests de la feature.

Los archivos exactos deben confirmarse durante inspección.

### Constantes de feature

El límite del ZIP debe residir en una constante específica de concursos o creación de concurso:

- `MAX_CONTEST_ZIP_SIZE_BYTES`, con valor `100 * 1024 * 1024`.
- `MAX_CONTEST_PROBLEMS`, con valor `12`.
- `CONTEST_CODE_CHARACTER_CATEGORIES`, `CONTEST_CODE_PATTERN`, `CONTEST_CODE_ERROR`, `CONTEST_CODE_HINT` y `normalizeContestCode`.

El código de concurso se normaliza con trim y minúsculas. Su formato es un slug de segmentos alfanuméricos separados por un único guion (por ejemplo, `regional-2026`); no admite guiones iniciales, finales ni consecutivos. La ubicación debe seguir la convención real de constantes y evitar una constante global si solo aplica a esta feature.

### Componentes reutilizados

- Button.
- IconButton.
- Input.
- FormField.
- FileDropzone.
- Card.
- Badge.
- Alert.
- Divider.
- Iconos Lucide.

### Posibles componentes específicos

Solo si reducen la complejidad de la página:

- Campo ZIP de concurso.
- Acciones de problemas.
- Resumen de creación.

No deben convertirse en átomos globales sin reutilización demostrada.

### Regresión compartida

Si se modifica un componente global:

- Tests del componente.
- Casos de variantes.
- `/dev/ui`.
- Pantallas consumidoras identificadas durante inspección.

## Boundaries Respected

- La feature de concursos conserva la responsabilidad sobre reglas de creación.
- El componente FileDropzone compartido mantiene comportamiento genérico.
- Un wrapper de concursos puede imponer extensión y tamaño sin contaminar usos globales.
- Zod conserva la validación autoritativa de cliente.
- React Hook Form conserva el estado del formulario.
- El mapper conserva la transformación a multipart.
- El servicio no normaliza valores del formulario.
- El backend conserva validación de seguridad, estructura ZIP y persistencia.
- La corrección no modifica AuthTransport, HttpClient o TanStack Query.
- El resumen consume datos observados, pero no transforma el payload.
- Los incisos se derivan del orden y no se almacenan como estado editable independiente.
- El panel bulk administra únicamente una cantidad temporal.
- El sistema visual existente conserva tokens, variantes e iconografía.
- Otros changes OpenSpec permanecen intactos.

## Contracts Changed

No external contract changes are confirmed from the provided input.

No se cambia el DTO ni el endpoint backend.

Se refuerzan contratos internos existentes.

### Password Form Contract

- El valor de formulario de `contrasena` es siempre `string`.
- El valor predeterminado es `''`.
- Un valor ausente se normaliza a `''`.
- El mapper siempre genera la entrada multipart.
- El servicio no altera el valor.

### ZIP Validation Contract

- Máximo inclusivo: `100 * 1024 * 1024` bytes.
- La extensión debe ser ZIP conforme a la validación existente.
- Un archivo inválido no se almacena como selección válida.
- El schema y el componente comparten la misma constante.
- El submit aplica una comprobación defensiva sobre el archivo actual.

### ZIP UI State Contract

Estados previstos:

- Vacío:
  - mensaje de drag and drop;
  - botón de selección;
  - formato y tamaño.
- Drag activo válido:
  - feedback visual de aceptación.
- Drag activo inválido:
  - feedback visual de rechazo.
- Seleccionado válido:
  - icono;
  - nombre;
  - tamaño;
  - estado;
  - cambiar;
  - eliminar.
- Error:
  - mensaje vinculado;
  - sin selección válida.
- Disabled:
  - sin interacción.
- Loading del formulario:
  - no inicia upload separado;
  - comportamiento según reglas existentes del formulario.

### Bulk Add Contract

Entrada:

- cantidad adicional.

Validación:

- entero;
- mínimo 1;
- máximo `MAX_CONTEST_PROBLEMS - currentCount` (actualmente `12 - currentCount`).

Salida:

- lista de problemas anterior más N problemas vacíos compatibles con el formulario.

La operación debe ser atómica desde la perspectiva de UI: o agrega todos o no agrega ninguno.

### Summary Contract

Allowlist de datos:

- nombre;
- código;
- fecha;
- duración;
- congelamiento;
- modalidad;
- cantidad;
- incisos;
- nombre ZIP.

No se aceptan contraseña, JWT, borrador, lenguajes o visibilidad independiente.

## Data Flow

### Normalización de contraseña

- `defaultValues` establece `contrasena: ''`.
- PasswordInput registra un valor string.
- Zod normaliza ausencia tolerada a `''`.
- React Hook Form conserva el string validado.
- El mapper recibe `contrasena`.
- El mapper agrega siempre la clave multipart.
- El servicio transmite el `FormData`.
- La prueba inspecciona `FormData.get('contrasena')`.

Si el backend responde 400:

- confirmar el request multipart;
- registrar que el frontend envía `''`;
- no introducir sustitutos;
- reportar que el backend debe aceptar vacío o nullable.

### Normalización de código

- El campo de código desactiva autocapitalización y corrector ortográfico, y muestra el hint y placeholder centralizados.
- Zod aplica `normalizeContestCode` antes de validar `CONTEST_CODE_PATTERN`.
- El mapper vuelve a normalizar antes de agregar `codigo` a `FormData`, de modo que el payload siempre usa el slug en minúsculas.

### Selección ZIP

Estado vacío:

- El usuario hace click, usa teclado, botón o drop.
- El componente recibe el archivo candidato.
- Se valida extensión.
- Se valida `file.size <= MAX_CONTEST_ZIP_SIZE_BYTES`.
- Si es válido:
  - se actualiza React Hook Form;
  - se limpia el error;
  - se muestra estado seleccionado.
- Si es inválido:
  - no se conserva como valor válido;
  - se limpia el input cuando sea necesario;
  - se muestra el error.

Estado seleccionado:

- `Cambiar archivo` activa el input.
- Drop de otro archivo ejecuta el mismo pipeline.
- `Eliminar archivo`:
  - asigna ausencia de archivo al formulario;
  - limpia input;
  - limpia errores;
  - vuelve al estado vacío.

Submit:

- El schema valida el archivo.
- Antes de iniciar la mutación se confirma que el archivo sigue presente y dentro del límite.
- El ZIP se incorpora al `FormData` existente.
- No se emite una solicitud separada.

### Formateo de tamaño

- El tamaño se calcula desde `File.size`.
- La representación visual utiliza una utilidad existente o específica de la feature.
- El valor completo del archivo no se lee.
- El tamaño mostrado no altera el criterio exacto en bytes.

### Agregar un problema

- El IconButton consulta el número actual.
- Si es menor a `MAX_CONTEST_PROBLEMS` (12):
  - agrega un único elemento compatible con el formulario;
  - el índice determina el inciso.
- Si llega a 12:
  - permanece disabled.

### Agregar varios

- El usuario abre el panel.
- Se calcula `availableSlots = MAX_CONTEST_PROBLEMS - currentCount`.
- Se muestra el máximo actual.
- El usuario introduce una cantidad.
- El control valida el entero y el rango.
- Si es inválido:
  - no modifica la lista;
  - presenta error.
- Si es válido:
  - construye N elementos;
  - realiza una única operación de append cuando la API lo permita;
  - limpia cantidad y error;
  - cierra el panel.
- El resumen y la advertencia derivan de la nueva lista.

### Incisos

- El inciso visible se obtiene de la posición actual.
- Después de eliminar o agregar no se conserva un inciso anterior.
- Mapper, resumen y ayuda ZIP utilizan la misma derivación.
- No se introduce un segundo estado para incisos.

### Resumen

- La página observa únicamente los valores necesarios.
- Cada fila utiliza etiqueta secundaria y valor de alto contraste.
- Los valores faltantes utilizan placeholders.
- La modalidad se deriva de contraseña.
- Los problemas se derivan de la longitud.
- Los incisos se derivan de los índices.
- El ZIP muestra nombre o `No seleccionado`.
- La advertencia separada muestra límite e incisos.

### Interacciones

Orden de diagnóstico:

- Revisar variante de Button.
- Revisar variante de IconButton.
- Revisar contrato de FileDropzone.
- Button e IconButton comparten cursor pointer, hover/active solo habilitados y cursor disabled; IconButton usa `type="button"` por defecto para no enviar formularios accidentalmente.
- La eliminación de problemas conserva un tratamiento local de peligro con borde, texto y hover rojo, además de su nombre accesible.
- Corregir globalmente solo si el defecto es general.
- Aplicar estilos locales si el problema pertenece a la composición.
- Verificar hover, focus, active, disabled y loading.
- Ejecutar regresión en `/dev/ui` si hubo cambios compartidos.

## Required Tests Per Layer

### Password Tests

- default value es `''`;
- schema produce string;
- `undefined` se normaliza;
- mapper agrega la clave;
- FormData devuelve `''`;
- no produce valores nulos o textualizados;
- contraseña real se conserva;
- modalidad pública;
- modalidad privada;
- contraseña ausente del resumen.

### ZIP Validation Tests

- menor a 100 MB;
- exactamente 100 MB;
- 100 MB + 1 byte;
- mensaje de error;
- inválido no seleccionado;
- reemplazo válido limpia error;
- eliminación limpia valor, input y error;
- submit defensivo rechaza archivo excesivo.

### ZIP Interaction Tests

- botón activa input;
- click en área activa input;
- teclado activa input;
- drop válido;
- estado seleccionado;
- tamaño formateado;
- cambio de archivo;
- eliminación;
- ausencia de upload independiente.

### Problem Action Tests

- IconButton agrega uno;
- nombre accesible;
- siguiente inciso;
- disabled en 12;
- abrir y cancelar bulk;
- cantidad válida;
- cero;
- negativo;
- decimal;
- exceso;
- operación sin agregado parcial;
- limpieza después del éxito;
- secuencia de incisos.

### Summary Tests

- encabezado;
- campos permitidos;
- placeholders;
- modalidad;
- cantidad;
- incisos;
- ZIP;
- advertencia;
- exclusión de contraseña, JWT, borrador, lenguajes y visibilidad.

### Interaction and Accessibility Tests

- hover mediante revisión de contrato o clases;
- focus-visible;
- disabled;
- loading;
- nombre accesible de iconos;
- errores asociados;
- estado ZIP comprensible sin color;
- panel bulk con label.

### Regression Tests

- envío del formulario;
- mapper multipart;
- servicio y mutación existentes;
- MSW;
- routing;
- `/dev/ui`;
- componentes compartidos modificados;
- build y typecheck.

### Strict TDD

La infraestructura de tests está confirmada. Las correcciones con comportamiento verificable deben aplicar:

- RED: agregar primero el caso que reproduce el defecto.
- GREEN: realizar la corrección mínima.
- TRIANGULATE: agregar límites y variaciones.
- REFACTOR: eliminar duplicación manteniendo todas las pruebas verdes.

## Tradeoffs Accepted

- Se aplican tres defensas frontend para el tamaño del ZIP aunque el backend siga siendo autoritativo.
- Se utiliza el estándar binario de 100 MB solicitado: `100 * 1024 * 1024`.
- El ZIP no se preprocesa ni se sube por separado.
- La contraseña vacía se representa exclusivamente mediante `''`.
- El frontend no compensa un model binding backend incompatible.
- Se prioriza un wrapper específico para ZIP antes que ampliar FileDropzone globalmente.
- La operación bulk utiliza un panel inline y no un modal.
- El bulk representa cantidad adicional, no total final.
- La acción individual se vuelve icon-only para reducir espacio, con nombre accesible obligatorio.
- El resumen se rediseña solo dentro de esta feature.
- La referencia visual se interpreta mediante tokens existentes, no copiando campos incompatibles.
- Los incisos continúan derivados del índice.
- No se agregan dependencias.

## Implementation Constraints

- Inspeccionar la implementación real antes de modificarla.
- No asumir la causa del `null`.
- No usar espacios como contraseña pública.
- No omitir `contrasena` del multipart.
- No transformar la contraseña en el servicio.
- No duplicar la constante de 100 MB.
- No usar megabytes decimales para la validación.
- No leer el archivo completo.
- No descomprimir ZIP.
- No iniciar una solicitud al seleccionar.
- No permitir que un archivo inválido quede en React Hook Form.
- No agregar problemas antes de validar completamente la cantidad bulk.
- No editar incisos manualmente.
- No modificar componentes compartidos sin pruebas de regresión.
- No introducir colores arbitrarios.
- No mostrar datos sensibles.
- No modificar rutas, auth, layout o backend.
- No utilizar OpenSpec CLI.
- No realizar commit o push.

## Open Design Questions

### Blocking: Origen real del valor null

- ¿El valor se convierte en null en default values, schema, control, reset, mapper o cliente?
- Clasificación: Blocking para aplicar la corrección mínima correcta.

### Blocking: Comportamiento backend ante cadena vacía

- ¿El model binding ASP.NET Core acepta `contrasena=''`?
- Clasificación: Blocking únicamente para declarar integración backend exitosa; no bloquea la corrección frontend.

### Research required: Contrato de FileDropzone

- ¿Ya soporta límite, estado seleccionado, reemplazo, eliminación e input ref?
- Clasificación: Research required antes de decidir entre extensión compartida y wrapper de feature.

### Research required: Contrato de IconButton

- ¿Permite `aria-label`, disabled, tooltip opcional y variantes consistentes?
- Clasificación: Research required antes de crear la acción individual.

### Research required: Operación de useFieldArray

- ¿La versión instalada permite agregar un array mediante una sola llamada de append?
- Clasificación: Research required para evitar actualizaciones innecesarias.

### Non-blocking: Formato de tamaño

- ¿Existe una utilidad compartida de formato de bytes?
- Clasificación: Non-blocking.
- Decisión: reutilizarla si existe; en caso contrario, crear una utilidad local pequeña y probada.

### Non-blocking: Ubicación de la advertencia en móvil

- ¿La composición existente permite colocarla antes o después del resumen sin duplicación?
- Clasificación: Non-blocking.
- Restricción: debe aparecer antes de las acciones finales.
