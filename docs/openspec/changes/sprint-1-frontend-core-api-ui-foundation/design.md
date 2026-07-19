# Design

## Components Touched

### Build and Tooling

- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/vite.config.ts`
- Configuración TypeScript existente.
- Configuración ESLint existente.
- Configuración de Vitest.
- `frontend/.editorconfig`
- `frontend/.prettierrc`
- `frontend/.prettierignore`
- Configuración de Tailwind compatible con la versión seleccionada.

### Environment

- `frontend/.env.example`
- `frontend/src/config/env.ts`
- Tipos de `import.meta.env`, si la configuración actual lo requiere.

### API Foundation

- `frontend/src/lib/api/api-error.ts`
- `frontend/src/lib/api/api-response.ts`
- `frontend/src/lib/api/endpoints.ts`
- `frontend/src/lib/api/http-client.ts`
- `frontend/src/lib/api/problem-details.ts`
- `frontend/src/lib/api/index.ts`
- `frontend/scripts/generate-api-types.mjs`
- `frontend/src/types/api.generated.ts`

Los nombres podrán adaptarse a patrones existentes sin cambiar las responsabilidades.

### Authentication Foundation

- `frontend/src/lib/auth/auth-session.ts`
- `frontend/src/lib/auth/auth-transport.ts`
- `frontend/src/lib/auth/index.ts`

### Remote State

- `frontend/src/lib/query/`
- Configuración de `QueryClient`.
- Provider de TanStack Query.
- Devtools condicionales, si se incluyen.

### Mocks

- `frontend/src/mocks/browser.ts`
- `frontend/src/mocks/handlers/`
- `frontend/src/mocks/fixtures/`
- `frontend/src/mocks/builders/`

### Forms and UI

- `frontend/src/components/common/`
- `frontend/src/components/forms/`
- `frontend/src/components/navigation/`
- `frontend/src/components/tables/`
- `frontend/src/lib/utils/`, para composición de clases cuando sea necesaria.

### Layouts and Routes

- `frontend/src/layouts/AuthLayout/`
- `frontend/src/layouts/AdminLayout/`
- `frontend/src/routes/`
- Página 404.
- `frontend/src/dev/ui/`

### Styling

- `frontend/src/styles/tokens.css`
- `frontend/src/styles/globals.css`
- `frontend/src/styles/typography.css`
- `frontend/src/styles/utilities.css`

Los archivos pueden consolidarse si la estructura existente favorece menos archivos, siempre que se mantengan las responsabilidades.

### Application Entry

- `frontend/src/main.tsx`
- `frontend/src/App.tsx`

La entrada debe componer providers y router sin implementar historias.

### Tests

- Setup de React Testing Library.
- Tests de entorno.
- Tests del cliente HTTP.
- Tests de UI.
- Tests de layouts.
- Tests de router.
- Tests de MSW.

### Documentation

- `frontend/README.md` o guía equivalente dentro de `frontend/`.

## Boundaries Respected

- El backend es una dependencia externa y no se modifica.
- OpenAPI es el límite contractual; el frontend no adivina detalles fuera del esquema.
- `src/config/env.ts` es el límite entre variables crudas y configuración tipada de React.
- `vite.config.ts` es el único consumidor de `API_PROXY_TARGET`.
- El cliente HTTP es el límite para transporte, timeout, parseo y normalización de errores.
- Los servicios de feature son el límite entre dominio frontend y transporte.
- Los hooks de feature son el límite entre servicios y componentes.
- TanStack Query administra estado remoto; el estado visual local permanece en componentes o formularios.
- React Hook Form administra formularios; Zod valida entradas de cliente.
- El backend conserva la validación autoritativa.
- MSW sustituye el transporte, no los servicios ni componentes.
- Los DTO generados permanecen separados de modelos de vista.
- Los mappers se ubican en la feature que necesita la transformación.
- Los átomos no dependen de features ni del backend.
- Las moléculas pueden componer átomos, pero no implementar historias.
- Los layouts no contienen lógica de autenticación definitiva.
- `/dev/ui` es una herramienta de desarrollo, no una pantalla de producto.
- Los tokens semánticos son la fuente de valores visuales compartidos.
- BrandMark encapsula la marca temporal.
- Lucide proporciona iconografía funcional, separada del branding.
- La estructura de Sprint 0 se extiende sin reorganización destructiva.
- No se modifica el README raíz ni documentación académica.

## Contracts Changed

No external contract changes are confirmed from the provided input.

El change no modifica contratos del backend. Introduce contratos internos del frontend.

### Environment Contract

Valores públicos para React:

- `VITE_APP_NAME`
- `VITE_API_BASE_URL`
- `VITE_REQUEST_TIMEOUT_MS`
- `VITE_ENABLE_MOCKS`

Valores exclusivos de tooling:

- `API_PROXY_TARGET`
- `OPENAPI_SCHEMA_URL`

Reglas:

- React recibe únicamente la configuración pública validada.
- Vite y el script OpenAPI pueden consumir variables no expuestas al bundle.
- Ningún valor debe considerarse secreto por estar en un archivo de entorno frontend.

### HTTP Client Contract

Entrada conceptual:

- método HTTP;
- ruta relativa;
- headers opcionales;
- body JSON o `FormData`;
- señal de cancelación;
- timeout opcional;
- configuración de credenciales cuando esté confirmada.

Salida conceptual:

- datos tipados para respuestas con contenido;
- resultado sin contenido para 204;
- error normalizado para fallos.

Error interno mínimo:

- `status`;
- `message`;
- `code` opcional;
- `fieldErrors` opcional;
- `requestId` opcional;
- causa técnica opcional no destinada a la UI.

### Problem Details Contract

El adapter debe tolerar el formato estándar y extensiones del backend.

Mapeo esperado:

- `status` → estado interno.
- `title` o `detail` → mensaje seguro.
- diccionario de validaciones → `fieldErrors`.
- `traceId`, `requestId` o header equivalente → `requestId`.
- extensiones confirmadas → campos internos documentados.

El mapeo definitivo depende de las respuestas reales del backend.

### Endpoint Contract

`endpoints.ts` construye rutas relativas.

- No contiene host.
- No contiene rutas no confirmadas.
- Acepta parámetros cuando corresponda.
- Evita concatenación libre dentro de componentes.

### Generated Types Contract

- `api.generated.ts` proviene de OpenAPI.
- El encabezado indica que es generado.
- No contiene lógica manual.
- Puede versionarse.
- Los adapters, mappers y helpers viven fuera del archivo generado.

### Query Contract

- Una instancia compartida de `QueryClient`.
- Configuración explícita de retry.
- Defaults documentados para stale y garbage collection.
- Query keys definidas por feature en changes posteriores.
- Invalidaciones realizadas por hooks o servicios de feature, no por componentes visuales genéricos.

### Authentication Contract

`auth-session` representa el estado conceptual de sesión.

`auth-transport` adapta el cliente HTTP al mecanismo confirmado.

La interfaz debe permitir:

- cookies mediante credenciales;
- Bearer mediante proveedor encapsulado;
- estado sin autenticar;
- limpieza de material de sesión no sensible.

No se decide persistencia hasta inspeccionar OpenAPI y comportamiento real.

### Mock Contract

- El worker se inicia solo en desarrollo y con flag habilitado.
- Fixtures y builders generan datos seguros.
- Handlers consumen las mismas rutas y tipos que el backend.
- La ausencia de contrato mantiene handlers pendientes.

### Component Contract

Los componentes compartidos deben:

- aceptar props estándar;
- exponer variantes limitadas;
- mantener accesibilidad;
- no conocer endpoints;
- no conocer DTO de historias;
- no realizar fetching;
- no incorporar copy funcional definitivo.

## Data Flow

### Application Bootstrap

- Vite carga configuración de servidor y proxy.
- React carga configuración pública mediante `env.ts`.
- Si desarrollo y mocks habilitados:
  - cargar MSW de forma dinámica;
  - esperar su inicialización;
  - montar React.
- Si mocks deshabilitados:
  - montar React directamente.
- La raíz compone:
  - QueryClientProvider;
  - RouterProvider o router equivalente;
  - providers estrictamente necesarios.

### Development Proxy

- Componente solicita datos mediante hook.
- Hook utiliza un servicio.
- Servicio utiliza `httpClient`.
- `httpClient` construye una URL relativa bajo `/api`.
- El navegador solicita `http://localhost:8085/api/...`.
- Vite reenvía al target `http://localhost:5185`.
- El backend responde.
- El cliente normaliza respuesta o error.
- TanStack Query entrega estado al hook.
- El componente renderiza loading, error, vacío o success.

### OpenAPI Generation

- Pi inicia o verifica el backend local.
- Pi identifica Swagger UI y el documento OpenAPI real.
- Pi registra `OPENAPI_SCHEMA_URL`.
- El script npm descarga o consume el esquema.
- El generador produce `src/types/api.generated.ts`.
- Pi revisa el diff.
- Los endpoints, servicios y handlers contractuales se implementan únicamente a partir del esquema confirmado.

Si el esquema no está disponible:

- registrar el bloqueo;
- no producir tipos manuales equivalentes;
- continuar con la infraestructura independiente del contrato.

### Error Flow

- El backend responde con error HTTP o falla la red.
- `httpClient` intenta identificar el formato.
- Problem Details se adapta al error interno.
- Validation Problem Details produce `fieldErrors`.
- Timeout y cancelación externa se distinguen.
- El servicio puede agregar contexto sin perder status o request ID.
- TanStack Query expone el error al hook.
- La UI presenta Alert o FormError según el contexto.

### Authentication Flow

- El contrato OpenAPI confirma mecanismo.
- `auth-transport` configura credenciales o token provider.
- Los servicios de autenticación futuros usan `httpClient`.
- La sesión se representa mediante `auth-session`.
- Layouts y componentes no acceden directamente a cookies o storage.

No se implementa el flujo funcional en este change.

### MSW Flow

- `VITE_ENABLE_MOCKS=true`.
- El bootstrap importa `mocks/browser`.
- MSW registra handlers confirmados.
- La aplicación usa hooks y servicios normales.
- MSW intercepta la solicitud en la capa de red.
- Fixtures o builders producen la respuesta.
- La UI no conoce si la respuesta provino de MSW o backend.

### UI Composition

- Tokens CSS definen semántica visual.
- Tailwind referencia tokens o clases semánticas.
- Átomos encapsulan controles básicos.
- Moléculas componen átomos.
- Layouts componen navegación y superficies.
- `/dev/ui` presenta combinaciones usando fixtures.
- Las historias posteriores consumen la misma fundación.

## Required Tests Per Layer

### Environment Tests

If test infrastructure exists, add/extend tests for:

- variables válidas;
- variable obligatoria ausente;
- timeout numérico;
- booleano inválido;
- mocks desactivados por defecto;
- no exposición de variables exclusivas de Vite.

### HTTP Client Tests

If test infrastructure exists, add/extend tests for:

- solicitud JSON;
- `FormData`;
- GET, POST, PUT, PATCH y DELETE;
- headers;
- respuesta 204;
- error HTTP genérico;
- Problem Details;
- Validation Problem Details;
- error de red;
- timeout;
- cancelación externa;
- request ID;
- respuesta no JSON.

### Query Integration Tests

If test infrastructure exists, add/extend tests for:

- provider disponible;
- configuración de retry;
- estado loading;
- estado error;
- estado success;
- invalidación mediante un ejemplo técnico no ligado a historias.

### Mock Tests

If test infrastructure exists, add/extend tests for:

- MSW desactivado por defecto;
- activación solo en desarrollo;
- fixtures sin credenciales;
- handlers tipados cuando exista contrato;
- ausencia de handlers inventados.

### Component Tests

If test infrastructure exists, add/extend tests for:

- variantes de Button;
- Button disabled;
- Button loading;
- asociación de Input con label, hint y error;
- visibilidad de PasswordInput;
- navegación por teclado de Checkbox;
- variantes de Badge;
- semántica de Alert;
- validación de tipo en FileDropzone;
- validación de tamaño en FileDropzone;
- paso activo de Stepper;
- etiqueta y valor de StatCard;
- fallback de BrandMark;
- asset alternativo de BrandMark;
- nombre accesible de IconButton.

### Layout and Router Tests

If test infrastructure exists, add/extend tests for:

- contenido de AuthLayout;
- sidebar y topbar de AdminLayout;
- 404;
- `/dev/ui` en desarrollo;
- ausencia de `/dev/ui` en producción;
- rutas futuras representadas solo mediante constantes cuando no tienen página funcional.

### Static and Build Tests

- `npm run format:check`.
- `npm run lint`.
- `npm run typecheck`.
- `npm run test:run`.
- `npm run build`.
- Inicio de `npm run dev` en 8085.
- Fallo ante puerto ocupado.
- Comprobación del proxy cuando el backend esté disponible.

### Strict TDD Position

Después de configurar Vitest, los componentes y utilidades con comportamiento verificable SHOULD desarrollarse mediante:

- RED: prueba que falla por el comportamiento requerido.
- GREEN: implementación mínima.
- TRIANGULATE: casos adicionales y edge cases.
- REFACTOR: limpieza con pruebas verdes.

La configuración inicial necesaria para habilitar el runner puede preceder este ciclo.

## Tradeoffs Accepted

- Se incorpora una fundación amplia en un único change para evitar divergencias entre integrantes.
- Se acepta un diff superior a 400 LoC porque el alcance incluye tooling, UI y pruebas compartidas.
- Se utiliza la API nativa de transporte en lugar de Axios para reducir dependencias.
- Se adopta TanStack Query solo para estado remoto, no como estado global general.
- Se mantiene neutral el mecanismo de autenticación hasta confirmar OpenAPI.
- Se versionan tipos generados para permitir compilación sin backend.
- Se acepta MSW como dependencia de desarrollo para desacoplar trabajo frontend.
- Se utiliza `/dev/ui` en lugar de Storybook.
- Se utilizan variables CSS semánticas junto con Tailwind para evitar valores visuales dispersos.
- Se adoptan `class-variance-authority`, `clsx` y `tailwind-merge` para variantes y composición consistente.
- No se incorpora TanStack Table; las primitivas iniciales utilizan HTML semántico y composición propia.
- El asset de React se conserva temporalmente como branding técnico reemplazable.
- Los componentes base se limitan a necesidades confirmadas de Sprint 1.
- Las rutas funcionales se reservan, pero no se implementan sus historias.
- El proxy se diseña para desarrollo local; el despliegue se posterga.

## Implementation Constraints

- Inspeccionar `frontend/package.json` antes de agregar dependencias.
- Reutilizar dependencias y configuraciones existentes cuando ya cumplan el contrato.
- No reemplazar destructivamente la configuración de Vite, TypeScript o ESLint.
- No actualizar versiones no relacionadas sin necesidad.
- Utilizar npm.
- No crear un segundo proyecto frontend.
- No crear paquetes en la raíz.
- No hardcodear el backend en componentes.
- No inventar rutas o DTO.
- No generar tipos manualmente cuando OpenAPI no esté disponible.
- No editar `api.generated.ts`.
- No colocar `fetch` fuera del cliente autorizado.
- No aplicar automáticamente credenciales a todas las solicitudes antes de confirmar autenticación.
- No guardar tokens o secretos en `localStorage`.
- No incluir MSW activamente en producción.
- No colocar fixtures en componentes.
- No implementar esquemas de formularios de historias.
- No implementar guards definitivos.
- No incluir `/dev/ui` en navegación de producción.
- No utilizar el logo de React como icono funcional.
- No utilizar valores visuales arbitrarios cuando exista token.
- No crear componentes específicos de login, registro o concursos.
- No agregar una librería visual completa.
- No modificar backend, base de datos, README raíz o documentación académica.
- No crear capturas automáticamente.
- No ejecutar commit o push.
- No marcar tareas bloqueadas como completas.
- No ejecutar apply durante la validación documental del change.

## Open Design Questions

### Blocking: URL real de OpenAPI

- ¿Qué URL exacta expone el documento OpenAPI cuando el backend corre en el puerto 5185?
- Clasificación: Blocking para generación de tipos, endpoints, handlers y autenticación contractual.

### Blocking: Esquema de autenticación

- ¿El backend utiliza cookies HTTP-only, Bearer token u otro mecanismo?
- Clasificación: Blocking para configurar credenciales y persistencia.

### Blocking: Contratos reales

- ¿Cuáles son las rutas, DTO, status codes y Problem Details reales de login, registro y concursos?
- Clasificación: Blocking para servicios y mocks contractuales.

### Research required: Generador OpenAPI

- ¿Qué generador se adapta mejor al esquema real y a la estructura existente sin producir clientes HTTP duplicados?
- Clasificación: Research required durante explore.
- Restricción: debe producir tipos compatibles con el cliente HTTP centralizado.

### Research required: Integración Tailwind vigente

- ¿Qué configuración corresponde a la versión que será instalada en el proyecto actual?
- Clasificación: Research required durante tooling.
- Restricción: no imponer configuración obsoleta.

### Non-blocking: React Query Devtools

- ¿Debe incluirse Devtools en desarrollo?
- Clasificación: Non-blocking.
- Decisión predeterminada: incluir solo si su costo y configuración son mínimos.

### Non-blocking: Ubicación final de documentación

- ¿Se amplía `frontend/README.md` o se crea una guía separada?
- Clasificación: Non-blocking.
- Decisión: preservar contenido existente y elegir la opción menos destructiva.

### Non-blocking: Contenido de tabla base

- ¿Las primitivas de tabla existentes en Sprint 0 requieren extensión o creación?
- Clasificación: Non-blocking.
- Restricción: no instalar TanStack Table sin justificación.
