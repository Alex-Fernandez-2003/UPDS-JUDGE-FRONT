# Design

## Components Touched

### Feature de concursos

Estructura probable, adaptable a las convenciones existentes:

- `features/contests/api/`
  - servicio de creación.
- `features/contests/components/`
  - lista dinámica de problemas;
  - resumen de creación.
- `features/contests/hooks/`
  - mutación de creación.
- `features/contests/mappers/`
  - conversión de formulario a `FormData`.
- `features/contests/pages/`
  - `CreateContestPage`.
- `features/contests/schemas/`
  - schema Zod.
- `features/contests/types/`
  - estado del formulario y tipos de vista.
- Pruebas colocadas según la convención real.

No deben crearse carpetas vacías ni barrels innecesarios.

### API compartida

- Registro del endpoint de creación en `src/lib/api/endpoints.ts`.
- Tipos OpenAPI regenerados cuando sea necesario.
- Cliente HTTP y AuthTransport únicamente como dependencias existentes.

### Routing

- Placeholder o elemento actual asociado a `/admin/contests/new`.
- Constante de ruta existente.
- Integración con la configuración centralizada del router.

### MSW

- Handler de creación de concurso.
- Fixtures mínimos de respuesta.
- Escenarios de éxito, 400 y 401.

### Componentes compartidos

Se prioriza consumir sin modificar:

- Button.
- Input.
- PasswordInput.
- Textarea.
- FormField.
- FileDropzone.
- Card.
- Badge.
- Alert.
- Divider.
- Breadcrumbs.
- Spinner.

Una modificación compartida solo se admite si una limitación real impide cumplir el comportamiento y si no introduce regresiones.

## Boundaries Respected

- La página representa contenido del área principal; no controla el shell administrativo.
- `AdminLayout` sigue siendo propietario de sidebar, topbar y estructura global.
- El router decide la composición de layout y página.
- La feature no implementa autenticación.
- AuthTransport sigue siendo propietario de la obtención y aplicación del Bearer.
- El cliente HTTP sigue siendo propietario del transporte y normalización de errores.
- El servicio de la feature conoce el endpoint y el mapper, pero no renderiza UI.
- El mapper conoce el contrato multipart, pero no ejecuta solicitudes.
- El hook conoce la mutación, pero no construye `FormData`.
- La página coordina el formulario, pero no conoce `fetch`, JWT o headers.
- OpenAPI es propietario de los DTO externos.
- Los tipos del formulario representan la UI y no sustituyen los tipos del backend.
- El backend es propietario de la validación profunda del ZIP, creación transaccional y asociación del usuario.
- La feature no administra el listado ni su caché.
- Los componentes específicos permanecen dentro de `features/contests/`.
- No se introducen nuevos átomos compartidos sin reutilización confirmada.

## Contracts Changed

No se modifica ningún contrato externo del backend.

El frontend empieza a consumir el siguiente contrato reportado, sujeto a verificación OpenAPI:

- Método: `POST`.
- Ruta relativa: `Concursos/crear`.
- Base URL: `/api`.
- Content type: `multipart/form-data`.
- Autorización: Bearer mediante AuthTransport.

### Request Contract

Campos simples esperados:

- `nombre`.
- `descripcion`.
- `fechaInicio`.
- `duracionMinutos`.
- `contrasena`.
- `urlSetProblemas`.
- `minutosCongelamiento`.
- `codigo`.
- `archivoZip`.

Colección esperada:

- `listaProblemas[n].inciso`.
- `listaProblemas[n].titulo`.
- `listaProblemas[n].tiempo`.
- `listaProblemas[n].memoria`.

Los nombres finales deben coincidir con OpenAPI y con el model binding real.

### Response Contract

Respuesta reportada:

- `codigo`: código autoritativo del concurso.
- `mensaje`: descripción segura del éxito.

### Error Contract

Los errores se reciben mediante el cliente HTTP y se exponen como `ApiError`.

La feature consume:

- status.
- message.
- field errors, si existen.
- request ID, si existe.

No procesa directamente `Response`.

### Internal Form Contract

El estado de UI debe representar:

- strings de entradas textuales;
- valor de `datetime-local`;
- valores numéricos compatibles con React Hook Form;
- contraseña temporal;
- array dinámico de problemas;
- objeto `File` para el ZIP.

Este contrato es independiente del DTO generado.

### Route Contract

- Ruta de creación: `/admin/contests/new`.
- Ruta de cancelación o salida: `/admin/contests`.
- La segunda ruta puede existir como placeholder; este change no implementa su contenido.

## Data Flow

### Carga de página

- React Router resuelve `/admin/contests/new`.
- El router utiliza la composición existente con `AdminLayout`.
- `CreateContestPage` renderiza breadcrumbs, encabezado, formulario y resumen.
- React Hook Form inicializa:
  - campos vacíos;
  - congelamiento con un valor válido predeterminado si la convención lo permite;
  - un problema inicial;
  - sin archivo seleccionado.

### Problemas dinámicos

- `useFieldArray` administra la colección.
- El inciso se deriva del índice:
  - índice 0 → A;
  - índice 1 → B;
  - …
  - índice 25 → Z.
- Al agregar o eliminar:
  - React Hook Form actualiza la colección;
  - la UI recalcula incisos;
  - el resumen recalcula cantidad e incisos;
  - la ayuda del ZIP se actualiza.
- El inciso derivado no necesita ser editable.
- Antes del mapper, cada problema se normaliza con su inciso actual.

### Modalidad

- La página observa el campo contraseña.
- Valor vacío o solo espacios → Público.
- Valor no vacío → Privado.
- El resumen muestra únicamente la modalidad.
- El mapper envía la contraseña original normalizada según el schema.
- No se envía un campo modalidad.

### Validación

- El usuario interactúa con campos.
- React Hook Form gestiona touched, dirty y submit.
- Zod valida reglas simples y cruzadas.
- FormField presenta errores junto al control.
- Los errores de schema impiden la mutación.
- El backend realiza validación autoritativa, especialmente del ZIP.

### Construcción del request

- La página entrega valores válidos al hook.
- El hook invoca el servicio.
- El servicio delega los valores al mapper.
- El mapper:
  - normaliza strings;
  - convierte fecha al formato contractual;
  - serializa números;
  - genera índices consecutivos;
  - agrega el archivo;
  - retorna `FormData`.
- El servicio obtiene la ruta desde `endpoints.ts`.
- El servicio ejecuta POST mediante el cliente HTTP.
- AuthTransport aplica el Bearer.
- El navegador genera el boundary multipart.

### Flujo obligatorio

- `CreateContestPage`
- `useCreateContestMutation`
- `createContestService`
- `createContestFormData`
- `HttpClient`
- `AuthTransport`
- `POST /api/Concursos/crear`

La forma exacta de composición entre HttpClient y AuthTransport debe seguir la arquitectura existente.

### Estado de envío

- Al iniciar la mutación:
  - el submit queda deshabilitado;
  - Button muestra loading;
  - se evita un segundo submit;
  - se puede limpiar un error general anterior.
- Los inputs pueden mantenerse visibles.
- No se borra el formulario antes de conocer el resultado.

### Éxito

- El hook expone la respuesta.
- La página muestra Alert de éxito.
- El Alert presenta `mensaje`.
- La página presenta el `codigo` devuelto.
- Se ofrece una acción explícita hacia `/admin/contests`.
- No hay redirección automática.
- El formulario no vuelve a enviarse automáticamente.

### Error

- ApiError de validación local:
  - se muestra junto al campo cuando el schema lo conoce.
- ApiError 400 general:
  - se muestra en Alert.
- ApiError con mensaje de ZIP:
  - se muestra en Alert sin análisis client-side.
- ApiError 401:
  - se transforma en un texto de sesión inválida o expirada.
- Error de red o timeout:
  - se muestra mediante mensaje normalizado.
- No se muestra JSON crudo.

### MSW

- MSW intercepta la URL relativa final.
- El handler lee `request.formData()`.
- Comprueba presencia de campos fundamentales.
- No inspecciona el contenido ZIP.
- No valida JWT real.
- Devuelve:
  - éxito contractual;
  - 400 con mensaje seguro;
  - 401 con mensaje seguro.
- La UI y el servicio no cambian entre MSW y backend.

## Required Tests Per Layer

### Schema Tests

If test infrastructure exists, add/extend tests for:

- nombre requerido;
- descripción requerida;
- fecha requerida;
- duración positiva;
- duración entera;
- congelamiento no negativo;
- congelamiento entero;
- congelamiento no superior a duración;
- URL válida;
- código requerido;
- al menos un problema;
- máximo 26 problemas;
- título requerido;
- tiempo positivo;
- memoria positiva y entera;
- ZIP requerido;
- extensión ZIP válida;
- trimming de campos.

### Problem List Tests

If test infrastructure exists, add/extend tests for:

- problema inicial A;
- segundo problema B;
- incisos únicos;
- reindexado después de eliminar;
- límite de 26;
- imposibilidad de eliminar el último;
- actualización del resumen;
- actualización de ayuda ZIP.

### Mapper Tests

If test infrastructure exists, add/extend tests for:

- todos los campos simples;
- conversión temporal;
- números serializados;
- contraseña vacía;
- índices consecutivos;
- incisos actuales;
- título, tiempo y memoria;
- archivo bajo `archivoZip`;
- ausencia de header multipart manual.

### Service Tests

If test infrastructure exists, add/extend tests for:

- uso del endpoint centralizado;
- método POST;
- uso del HttpClient;
- payload `FormData`;
- respuesta tipada;
- propagación de ApiError;
- ausencia de host hardcodeado;
- ausencia de `fetch`.

### Mutation Tests

If test infrastructure exists, add/extend tests for:

- estado pendiente;
- datos de éxito;
- error;
- reset;
- una sola llamada por submit;
- ausencia de invalidación del listado.

### Component and Page Tests

If test infrastructure exists, add/extend tests for:

- breadcrumbs y encabezado;
- secciones requeridas;
- modalidad pública y privada;
- contraseña ausente del resumen;
- nombre ZIP;
- loading;
- doble envío;
- mensaje de éxito;
- código autoritativo;
- error 400;
- error 401;
- cancelación;
- accesibilidad de controles;
- ausencia de sidebar y topbar locales.

### Routing Tests

If test infrastructure exists, add/extend tests for:

- `/admin/contests/new`;
- uso de CreateContestPage;
- rutas restantes;
- `/dev/ui` en desarrollo.

### MSW Tests

If test infrastructure exists, add/extend tests for:

- lectura de FormData;
- respuesta exitosa;
- error general;
- 401;
- ausencia de JWT o datos reales;
- ausencia de descompresión del ZIP.

### Manual Verification

- Abrir `http://localhost:8085/admin/contests/new`.
- Verificar diseño de dos columnas.
- Verificar diseño móvil.
- Completar un concurso con varios problemas.
- Confirmar incisos y ayuda del ZIP.
- Probar validaciones.
- Probar MSW de éxito, 400 y 401.
- Con backend y auth disponibles, ejecutar una creación contractual controlada.
- Confirmar que se muestra el código devuelto.

## Tradeoffs Accepted

- UJ-08 y UJ-09 se implementan juntas porque el backend las expone como una única operación.
- Se utiliza una sola pantalla para reducir complejidad y evitar estado entre pasos.
- No se ofrece borrador porque el backend no expone ese contrato.
- No se ofrece selector de modalidad; se deriva de la contraseña.
- Los incisos se derivan del orden para evitar duplicados y errores manuales.
- El frontend solo valida extensión ZIP y presencia; la estructura interna permanece en backend.
- No se incorpora drag and drop para reordenar problemas.
- No se invalida el listado porque su query pertenece a otro change.
- Se mantiene el éxito en la misma página para que el usuario lea el código devuelto.
- MSW simula transporte, no reglas profundas del backend.
- Se crean componentes específicos de la feature cuando la composición no sea reusable globalmente.
- Se acepta que la integración contractual real dependa de OpenAPI y autenticación disponibles.

## Implementation Constraints

- No comenzar la capa contractual sin inspeccionar OpenAPI.
- No editar tipos generados.
- No duplicar DTO backend en el tipo de formulario.
- No construir `FormData` dentro de la página.
- No usar `fetch` o Axios.
- No hardcodear host o base URL.
- No establecer manualmente multipart `Content-Type`.
- No acceder al token desde la feature.
- No crear otro AuthProvider.
- No crear otro QueryClient.
- No enviar identificador del creador.
- No invalidar queries de listado inexistentes.
- No implementar rutas o páginas fuera del change.
- No modificar AdminLayout, sidebar o topbar.
- No implementar borradores o estados.
- No descomprimir ZIP.
- No agregar límites no confirmados.
- No crear componentes compartidos por conveniencia local.
- No modificar manual frontend.
- No modificar backend, base de datos o documentos académicos.
- No generar capturas.
- No realizar commit o push.

## Open Design Questions

### Blocking: Contrato OpenAPI vigente

- ¿OpenAPI confirma exactamente `POST Concursos/crear`?
- ¿Confirma `multipart/form-data` y los nombres de campos indexados?
- ¿La respuesta exitosa contiene `codigo` y `mensaje`?
- ¿Cómo representa los errores?
- Clasificación: Blocking antes del servicio y mapper definitivos.

### Blocking: Integración con AuthTransport

- ¿Cómo solicita un servicio autenticado que AuthTransport adjunte el Bearer?
- ¿El cliente HTTP ya integra AuthTransport o requiere una opción explícita?
- Clasificación: Blocking antes de la prueba con backend.

### Blocking: Formato de fecha

- ¿ASP.NET Core espera ISO con offset, sin offset o una representación distinta?
- Clasificación: Blocking para cerrar el mapper temporal.

### Research required: Model binding de colección multipart

- ¿El backend confirma la notación `listaProblemas[n].campo` mediante prueba real?
- Clasificación: Research required; debe verificarse sin cambiar backend.

### Non-blocking: Estado inicial de congelamiento

- ¿El formulario inicia en cero o vacío?
- Clasificación: Non-blocking.
- Decisión sugerida: cero, si coincide con las convenciones de formularios existentes.

### Non-blocking: Reinicio después del éxito

- ¿Se ofrece una acción local para crear otro concurso?
- Clasificación: Non-blocking.
- Decisión sugerida: no incluirla en el MVP; mantener solo navegación al listado.

### Non-blocking: Sticky summary

- ¿El sistema visual existente ya utiliza sticky sidebars?
- Clasificación: Non-blocking.
- Decisión: usar sticky solo si no introduce problemas de altura o accesibilidad.
