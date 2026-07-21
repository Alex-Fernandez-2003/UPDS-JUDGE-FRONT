# Design

## Components Touched

### AuthTransport y bootstrap

- Implementación existente de `AuthTransport`.
- `configureHttpClientAuthTransport(...)`.
- Punto de arranque de la aplicación.
- Utilidad mínima para acceso seguro a `sessionStorage`, si la arquitectura existente la necesita.

### Login y registro

- Página, hook o servicio de login existente.
- Contrato de respuesta de login.
- Navegación posterior al login.
- Registro únicamente cuando existan incompatibilidades de tipos o routing.
- Handler MSW de login si el campo de token está obsoleto.

### Routing y protección

- Router central.
- `ProtectedRoute` existente.
- Redirect de `/dashboard`.
- Rutas administrativas.
- Ruta comodín y `/dev/ui`, únicamente para regresión.

### Dashboard

- Página administrativa existente.
- Acción `Crear concurso`.
- Composición existente de `AdminLayout`.

### Concursos

- `frontend/src/pages/AdminContestsPage.tsx`.
- `frontend/src/features/contests/`.
- Router de `/admin/contests`.
- Servicios e imports de listado.
- Imports de creación afectados por movimientos.
- Sin cambios funcionales en el formulario de creación.

### TypeScript

- `frontend/tsconfig.app.json`.
- Únicamente la opción directamente responsable de TS5101.

### Tests

- Los tests existentes que fallen.
- Imports de tests afectados por movimientos.
- Expectativas de routing antiguas.
- Handlers MSW existentes.
- Sin archivos o casos nuevos.

## Boundaries Respected

- `sessionStorage` es la única persistencia frontend del token en este change.
- AuthTransport es la única capa que traduce sesión a header.
- HttpClient continúa siendo la única capa que emite `fetch`.
- Login es responsable de guardar el token y navegar.
- ProtectedRoute es responsable únicamente de presencia de sesión.
- El backend continúa siendo responsable de autenticación y autorización real.
- El router define qué páginas son públicas y protegidas.
- El dashboard no implementa el formulario de concurso.
- La feature de concursos contiene sus páginas y lógica.
- La creación de concursos no conoce el token.
- Los servicios no duplican base URLs ni endpoints.
- La reorganización no afecta otras features.
- Los tests existentes son el contrato de regresión; no se amplía cobertura.
- La configuración TypeScript no se utiliza para ocultar errores.
- El formato no se utiliza como excusa para modificar archivos no relacionados.

## Contracts Changed

No external contract changes are confirmed from the provided input.

El backend y sus endpoints permanecen sin cambios.

### Session Contract

Clave:

- `token`.

Valor:

- token JWT como string simple.

Operaciones permitidas:

- lectura dinámica;
- escritura después de login;
- eliminación por logout existente.

No se introduce un objeto de sesión.

### AuthTransport Contract

Entrada:

- consulta del header de autorización antes de cada request.

Salida con sesión:

- `Bearer <token>` o la forma exacta que la interfaz existente espere.

Salida sin sesión:

- ausencia de autorización.

El transporte no valida contenido, expiración, firma o roles.

### Bootstrap Contract

Orden obligatorio:

- importar o construir el transporte.
- configurar el HttpClient compartido.
- montar la aplicación.
- permitir que router y features inicien requests.

La configuración debe ser idempotente o ejecutarse en un único módulo de arranque.

### Login Contract

- Consumir el servicio existente.
- Extraer el campo contractual del token.
- Guardarlo como string.
- Navegar a `/admin/dashboard`.

Una respuesta sin token debe tratarse como error del flujo existente, no como login exitoso.

### Routing Contract

Públicas:

- `/login`;
- `/register`.

Protegidas:

- `/admin/dashboard`;
- `/admin/contests`;
- `/admin/contests/new`.

Compatibilidad:

- `/dashboard` redirige a `/admin/dashboard`.

El guard solo comprueba existencia del token.

### Contests Administration Contract

- `/admin/contests` consume la página real.
- La página reside en `features/contests/pages/`.
- La operación de listado utiliza una única función de servicio respaldada.
- Los datos no disponibles no se inventan.
- La acción de creación navega a `/admin/contests/new`.

### Contest Creation Contract

No cambia:

- método;
- ruta;
- multipart;
- validaciones;
- ZIP;
- problemas;
- respuesta.

Solo cambia el contexto de transporte:

- AuthTransport agrega Bearer al request.

### Test Contract

- El conteo inicial real se conserva.
- Los tests existentes pueden actualizar imports, rutas o fixtures obsoletos.
- No se crean nuevas expectativas.
- Cero tests quedan omitidos o fallidos.

## Data Flow

### Bootstrap

- La aplicación importa el transporte basado en sessionStorage.
- Se ejecuta una única configuración sobre el HttpClient.
- React se monta.
- Router y providers quedan disponibles.
- Cualquier request posterior consulta el token en ese momento.

### Registro

- Usuario abre `/register`.
- ProtectedRoute no interviene.
- El formulario usa el servicio existente.
- Registro exitoso permite navegar a `/login`.
- No se escribe `sessionStorage['token']`.

### Login

- Usuario abre `/login`.
- Envía credenciales.
- El servicio existente recibe la respuesta.
- La capa actual confirma el campo real del token.
- Se guarda el string en sessionStorage.
- React Router navega a `/admin/dashboard`.

### Request protegido

- Dashboard, administración o creación invocan un servicio.
- El servicio usa HttpClient.
- HttpClient consulta AuthTransport.
- AuthTransport lee `sessionStorage['token']`.
- Si existe:
  - retorna Bearer;
  - HttpClient agrega Authorization.
- Si no existe:
  - no agrega Authorization.
- El backend decide autorización.

### Recarga

- El navegador conserva sessionStorage para la pestaña.
- La aplicación repite bootstrap.
- ProtectedRoute consulta existencia del token.
- AuthTransport consulta el mismo token en los requests.
- No se necesita rehidratar un store.

### Logout existente

- La acción existente elimina la clave.
- No es necesario reconfigurar el transporte.
- El siguiente request consulta el almacenamiento vacío.
- La navegación posterior sigue el comportamiento existente.

### Router

- `/register` → registro público.
- `/login` → login público.
- `/dashboard` → redirect.
- `/admin/dashboard` → ProtectedRoute → dashboard.
- `/admin/contests` → ProtectedRoute → AdminContestsPage.
- `/admin/contests/new` → ProtectedRoute → CreateContestPage.
- `/dev/ui` → comportamiento existente.
- `*` → comportamiento existente.

### Dashboard

- Dashboard se renderiza dentro del layout vigente.
- La acción `Crear concurso` usa navegación del router.
- No contiene formulario ni lógica de concursos.

### Administración de concursos

- Router importa AdminContestsPage desde la feature.
- Página compone los componentes administrativos existentes.
- Hook o página invoca un único servicio real de listado.
- HttpClient agrega Bearer dinámicamente.
- La UI renderiza únicamente datos respaldados.
- La acción de creación navega a la ruta existente.

### Movimiento de AdminContestsPage

- Identificar todos los imports.
- Crear o reutilizar `features/contests/pages/`.
- Mover el archivo conservando su nombre elegido.
- Actualizar router, tests y consumidores.
- Verificar que no quedan imports.
- Eliminar el archivo antiguo.
- No crear reexport temporal permanente.

### Organización de contests

- Inventariar archivos reales.
- Agrupar solo cuando una categoría ya tenga archivos.
- Resolver casing inconsistente.
- Actualizar imports mediante alias.
- Evitar cambios internos no necesarios.
- No mover auth ni componentes globales.

### TS5101

- Ejecutar typecheck para obtener mensaje completo.
- Identificar la opción exacta.
- Confirmar la versión instalada de TypeScript desde el lockfile o package metadata.
- Aplicar la modificación mínima.
- Volver a ejecutar typecheck.
- Corregir errores reales revelados, sin supresiones generales.
- Ejecutar build.

### Tests

- Registrar conteo inicial.
- Identificar los fallos.
- Clasificar cada fallo:
  - defecto de producción;
  - import movido;
  - ruta antigua;
  - mock de login obsoleto;
  - colisión de integración.
- Corregir producción primero.
- Modificar tests solo cuando el contrato esperado cambió legítimamente.
- Confirmar mismo conteo y cero fallos.

## Required Tests Per Layer

### Existing Auth Tests

Reparar únicamente los tests existentes relacionados con:

- persistencia del token;
- navegación post-login;
- ProtectedRoute;
- mocks de login;
- logout existente.

No agregar casos nuevos.

### Existing Router Tests

Actualizar únicamente cuando esperen:

- `/dashboard` como ruta canónica;
- imports desde la ubicación antigua;
- placeholder en `/admin/contests`.

No agregar rutas o escenarios nuevos a la suite.

### Existing Contest Tests

Reparar únicamente:

- imports tras movimiento;
- colisiones de tipos;
- servicios duplicados;
- render de administración;
- integración existente de creación.

No modificar assertions funcionales validadas del formulario de creación.

### Existing MSW Tests

Ajustar handlers existentes cuando su contrato de token sea incompatible.

No agregar escenarios.

### Build Verification

- lint;
- typecheck;
- test:run;
- build;
- dev.

### Manual Verification

- registro público;
- login;
- token guardado;
- redirección al dashboard;
- recarga;
- navegación a creación;
- Bearer en Network;
- creación exitosa;
- redirección de rutas protegidas sin token.

### Strict TDD Position

No se agregarán tests nuevos por restricción explícita.

Los tests existentes que fallan actuarán como evidencia RED cuando representen el comportamiento objetivo. El ciclo permitido será:

- RED: registrar el fallo existente.
- GREEN: corregir la implementación mínima.
- REFACTOR: limpiar únicamente lo necesario manteniendo el mismo conteo y todos los tests verdes.

No se realizará TRIANGULATE mediante casos nuevos.

## Tradeoffs Accepted

- Se conserva sessionStorage pese a sus limitaciones porque el objetivo es integración mínima.
- El transporte consulta almacenamiento en cada request para evitar estado global.
- ProtectedRoute confía únicamente en la existencia del token.
- El frontend no detecta expiración.
- El frontend no controla roles.
- El backend continúa siendo la autoridad.
- `/dashboard` se mantiene como redirect temporal.
- La administración puede simplificar secciones no respaldadas.
- La organización de contests se limita a resolver integración y casing.
- La creación de concursos no se refactoriza.
- No se incrementa la cobertura de tests.
- La deuda global de formato puede permanecer documentada.
- TS5101 se corrige sin actualizar toolchain.

## Implementation Constraints

- No crear AuthProvider.
- No introducir stores.
- No duplicar token.
- No pasar token a features.
- No decodificar JWT.
- No validar roles.
- No crear otro guard.
- No crear otro HttpClient.
- No usar Axios.
- No usar fetch fuera del cliente compartido.
- No configurar el transporte dentro de componentes.
- No inventar campos de respuesta de login.
- No inventar endpoints de concursos.
- No modificar creación salvo integración/imports.
- No dejar copias tras mover AdminContestsPage.
- No crear carpetas vacías.
- No agregar barrels.
- No usar `any`.
- No comentar código para compilar.
- No suprimir errores TypeScript generales.
- No agregar, borrar u omitir tests.
- No usar `--fix`, `--updateSnapshot`, `npm update` o `npm audit fix`.
- No agregar dependencias.
- No reformatear archivos no relacionados.
- No modificar áreas protegidas.
- No realizar commit o push.

## Open Design Questions

### Blocking: Interfaz real de AuthTransport

- ¿Qué método y tipo de retorno espera la implementación existente?
- Clasificación: Blocking antes de implementar el transporte.

### Blocking: Campo contractual del token

- ¿El login real devuelve `token`, `accessToken` u otro nombre?
- Clasificación: Blocking antes de modificar persistencia o MSW.

### Blocking: Mensaje completo de TS5101

- ¿Qué opción exacta está provocando el error con la versión instalada?
- Clasificación: Blocking para elegir la corrección segura.

### Blocking: Operación real de listado

- ¿Cuál de las funciones existentes está respaldada por el endpoint disponible?
- Clasificación: Blocking para conectar `/admin/contests`.

### Research required: Composición de AdminLayout

- ¿Se aplica desde el router padre o desde cada página?
- Clasificación: Research required para evitar duplicarlo.

### Research required: Fallos reales de tests

- ¿Los cinco fallos corresponden a rutas, imports, mocks o comportamiento?
- Clasificación: Research required antes de modificar tests.

### Non-blocking: Logout visible

- ¿Existe actualmente una acción de logout?
- Clasificación: Non-blocking.
- Decisión: no crearla si no existe.

### Non-blocking: Nombre final de la página

- ¿Predomina `AdminContestPage` o `AdminContestsPage`?
- Clasificación: Non-blocking.
- Decisión: conservar una sola forma consistente con el proyecto.
