# Spec

## Requirements

### Change Scope Requirements

- El change MUST llamarse exactamente `sprint-1-frontend-core-api-ui-foundation`.
- El change MUST residir en `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`.
- La configuración, integración HTTP, mocks, sistema visual, componentes, layouts, rutas y pruebas MUST permanecer dentro de un único change.
- El change MUST NOT implementar UJ-5, UJ-6, UJ-8 o UJ-9.
- El change MUST NOT modificar el backend.
- El change MUST NOT modificar `database/`.
- El change MUST NOT modificar el `README.md` de la raíz.
- El change MUST NOT modificar documentos académicos existentes dentro de `docs/`.
- El change MUST NOT realizar commits ni push.

### Port and Proxy Requirements

- Vite MUST utilizar el puerto `8085` para el servidor de desarrollo.
- Vite MUST utilizar el puerto `8085` para preview.
- `server.strictPort` MUST ser `true`.
- `preview.strictPort` MUST ser `true`.
- Vite MUST fallar si el puerto `8085` está ocupado.
- Vite MUST NOT cambiar silenciosamente a otro puerto.
- El proxy de desarrollo MUST interceptar solicitudes bajo `/api`.
- El target local de ejemplo MUST ser `http://localhost:5185`.
- El target del proxy MUST obtenerse de `API_PROXY_TARGET`.
- `API_PROXY_TARGET` MUST ser consumida únicamente por configuración ejecutada en Node/Vite.
- React MUST NOT exponer `API_PROXY_TARGET`.
- Los componentes, páginas, hooks y servicios MUST NOT contener directamente `http://localhost:5185`.
- En desarrollo, `VITE_API_BASE_URL` MUST utilizar `/api`.

### Environment Requirements

- El frontend MUST incluir `frontend/.env.example`.
- `.env.example` MUST documentar:
  - `VITE_APP_NAME`.
  - `VITE_API_BASE_URL`.
  - `VITE_REQUEST_TIMEOUT_MS`.
  - `VITE_ENABLE_MOCKS`.
  - `API_PROXY_TARGET`.
  - `OPENAPI_SCHEMA_URL`.
- `.env` MUST NOT ser versionado.
- `.env.example` MUST ser versionado.
- Las variables consumidas por React MUST pasar por `src/config/env.ts`.
- Páginas y componentes MUST NOT acceder directamente a `import.meta.env`.
- La configuración MUST validar variables obligatorias.
- La configuración MUST convertir el timeout a número.
- La configuración MUST validar valores booleanos.
- La configuración MUST producir mensajes claros cuando una variable sea inválida.
- `VITE_ENABLE_MOCKS` MUST ser `false` por defecto.
- Variables `VITE_*` MUST NOT contener secretos, contraseñas, tokens privados o claves.
- `OPENAPI_SCHEMA_URL` MUST permanecer sin valor definitivo hasta confirmar la URL real.
- El sistema MUST NOT asumir `/swagger/v1/swagger.json` sin comprobarlo.

### Import Alias Requirements

- `@/` MUST resolver a `frontend/src/`.
- El alias MUST funcionar en Vite.
- El alias MUST funcionar en TypeScript.
- El alias MUST funcionar en Vitest.
- ESLint MUST resolver imports con alias cuando su configuración lo requiera.
- El alias SHOULD utilizarse para imports entre áreas principales.
- Imports relativos cortos dentro del mismo componente MAY mantenerse cuando mejoren legibilidad.

### HTTP Architecture Requirements

- Los componentes MUST NOT utilizar `fetch` directamente.
- Las páginas MUST NOT utilizar `fetch` directamente.
- Los hooks de feature MUST NOT utilizar `fetch` directamente.
- Los servicios de feature MUST delegar solicitudes al cliente HTTP compartido.
- El flujo estándar MUST ser:
  - página o componente;
  - hook de feature;
  - servicio de feature;
  - cliente HTTP;
  - backend.
- `fetch` MUST limitarse al cliente HTTP compartido y a excepciones técnicas documentadas.
- La regla ESLint MUST permitir el uso requerido por MSW y scripts de generación cuando corresponda.
- La regla ESLint MUST detectar usos no autorizados de `fetch`.
- El cliente HTTP MUST soportar GET.
- El cliente HTTP MUST soportar POST.
- El cliente HTTP MUST soportar PUT.
- El cliente HTTP MUST soportar PATCH.
- El cliente HTTP MUST soportar DELETE.
- El cliente HTTP MUST soportar cuerpos JSON.
- El cliente HTTP MUST soportar `FormData`.
- El cliente HTTP MUST soportar respuestas sin contenido.
- El cliente HTTP MUST soportar headers comunes.
- El cliente HTTP MUST soportar cancelación mediante `AbortSignal`.
- El cliente HTTP MUST aplicar timeout mediante `AbortController`.
- El cliente HTTP MUST distinguir timeout de cancelación externa.
- El cliente HTTP MUST permitir credenciales cuando el contrato confirmado lo requiera.
- El cliente HTTP MUST NOT asumir credenciales antes de confirmar autenticación.
- El cliente HTTP SHOULD conservar request ID o correlation ID cuando esté disponible.
- El cliente HTTP MUST utilizar el base URL validado.

### Error Requirements

- El frontend MUST normalizar errores en un contrato interno consistente.
- El contrato interno MUST incluir estado HTTP cuando exista.
- El contrato interno MUST incluir un mensaje seguro para la UI.
- El contrato interno MAY incluir código de error.
- El contrato interno MAY incluir errores por campo.
- El contrato interno MAY incluir request ID.
- El cliente MUST reconocer ASP.NET Core Problem Details.
- El cliente MUST reconocer Validation Problem Details.
- El cliente MUST reconocer errores de red.
- El cliente MUST reconocer timeout.
- El cliente MUST manejar respuestas no JSON sin perder el estado HTTP.
- El cliente MUST manejar respuestas `204 No Content`.
- El formato final MUST adaptarse al contrato real del backend.
- Los mensajes MUST NOT exponer secretos, stack traces o detalles sensibles.

### Endpoint Requirements

- Las rutas del backend MUST centralizarse en `src/lib/api/endpoints.ts` o una estructura equivalente.
- Componentes, páginas y hooks MUST NOT escribir rutas API libremente.
- Las rutas de autenticación MUST obtenerse del OpenAPI real.
- Las rutas de concursos MUST obtenerse del OpenAPI real.
- No se MUST inventar endpoints mientras el contrato no esté disponible.
- Los constructores de endpoints SHOULD aceptar parámetros tipados.
- Los endpoints MUST producir rutas relativas compatibles con `/api`.

### OpenAPI Requirements

- Swagger/OpenAPI MUST ser la fuente de verdad para rutas.
- Swagger/OpenAPI MUST ser la fuente de verdad para DTO.
- Swagger/OpenAPI MUST ser la fuente de verdad para cuerpos de solicitud y respuesta.
- Swagger/OpenAPI MUST ser la fuente de verdad para códigos de estado.
- Swagger/OpenAPI MUST ser la fuente de verdad para el esquema de autenticación.
- Swagger/OpenAPI MUST ser la fuente de verdad para contratos de error.
- Pi MUST detectar la URL real del esquema con el backend ejecutándose en `5185`.
- Pi MUST NOT asumir una ruta de esquema.
- El proyecto MUST incluir un proceso reproducible para generar `src/types/api.generated.ts`.
- `package.json` MUST incluir un script equivalente a `api:types`.
- `api.generated.ts` MUST declarar que es generado.
- `api.generated.ts` MUST NOT editarse manualmente.
- Los tipos generados MAY versionarse.
- Si OpenAPI no está disponible, Pi MUST reportar el bloqueo.
- Si OpenAPI no está disponible, Pi MUST NOT inventar DTO o endpoints.
- La ausencia de OpenAPI MUST NOT bloquear tooling, entorno, cliente genérico, Query, MSW base, sistema visual, rutas, layouts o documentación no contractual.

### DTO and View Model Requirements

- La UI MAY utilizar directamente un DTO cuando su forma sea adecuada y estable.
- La UI MUST utilizar un mapper cuando requiera una representación distinta.
- Los mappers MUST residir dentro de la feature correspondiente.
- Los modelos de vista MUST NOT duplicar DTO idénticos sin justificación.
- El archivo generado MUST NOT contener lógica de presentación.
- Los componentes SHOULD depender de modelos de vista cuando necesiten formato, agregación o nombres distintos.

### TanStack Query Requirements

- TanStack Query MUST ser el estándar para estado remoto.
- La aplicación MUST incluir un `QueryClient`.
- La aplicación MUST incluir `QueryClientProvider`.
- La configuración MUST definir reintentos explícitos.
- La configuración MUST evitar reintentar indiscriminadamente errores no recuperables.
- La configuración MUST definir tiempos de stale y garbage collection razonables.
- La infraestructura MUST permitir invalidación de queries.
- La infraestructura MUST permitir mutaciones.
- Los hooks futuros MUST representar estados loading, error y success.
- `useEffect + useState + fetch` MUST NOT ser el patrón principal de solicitudes remotas.
- React Query Devtools MAY estar disponible únicamente en desarrollo.
- Este change MUST NOT implementar hooks funcionales de login, registro o concursos.

### Authentication Foundation Requirements

- La fundación MUST incluir una abstracción de sesión.
- La fundación MUST incluir una abstracción de transporte de autenticación.
- La abstracción MUST permitir adaptar cookies HTTP-only o Bearer sin acoplar layouts.
- El mecanismo definitivo MUST permanecer pendiente hasta inspeccionar OpenAPI.
- El frontend MUST NOT almacenar contraseñas.
- El frontend MUST NOT persistir secretos.
- El frontend MUST NOT persistir tokens de larga duración en `localStorage` sin decisión explícita.
- Si el backend usa cookies, el cliente MUST utilizar credenciales de manera consistente.
- Si el backend usa Bearer, la obtención del token MUST quedar encapsulada.
- Este change MUST NOT implementar login o registro funcional.
- Este change MUST NOT declarar una sesión resuelta sin contrato confirmado.

### MSW Requirements

- Mock Service Worker MUST ser la herramienta de mocks.
- MSW MUST activarse únicamente cuando `VITE_ENABLE_MOCKS=true`.
- MSW MUST estar desactivado por defecto.
- MSW MUST cargarse condicionalmente.
- MSW MUST NOT interceptar solicitudes activamente en producción.
- Los componentes MUST utilizar los mismos servicios con backend real o MSW.
- Los datos simulados MUST residir en fixtures o builders.
- Los datos simulados MUST NOT residir dentro de componentes.
- Los fixtures MUST NOT contener credenciales reales.
- Los fixtures MUST NOT contener tokens reales.
- Los handlers MUST respetar tipos contractuales confirmados.
- Si OpenAPI no está disponible, los handlers contractuales MUST permanecer pendientes.
- Los mocks MAY utilizar datos visuales ficticios aprobados dentro de `/dev/ui`.
- Los mocks MUST NOT inventar endpoints.

### Form Requirements

- React Hook Form MUST administrar el estado de formularios funcionales futuros.
- Zod MUST definir validaciones de cliente.
- El backend MUST conservar la validación definitiva.
- Los átomos de formulario MUST aceptar props HTML estándar.
- Los átomos MUST NOT depender obligatoriamente de React Hook Form.
- `FormField` MAY integrar controles con React Hook Form mediante composición.
- Los esquemas específicos de UJ-5, UJ-6, UJ-8 y UJ-9 MUST permanecer fuera de este change.

### Router Requirements

- React Router MUST utilizar una configuración centralizada.
- Las constantes de rutas MUST residir en una fuente compartida.
- La fundación MUST prever:
  - `/login`.
  - `/register`.
  - `/admin/contests`.
  - `/admin/contests/new`.
  - `/dev/ui`.
- Las rutas funcionales de historias MUST NOT implementarse en este change.
- La aplicación MUST incluir una ruta 404.
- `/dev/ui` MUST existir en desarrollo.
- `/dev/ui` MUST NOT registrarse como ruta accesible en producción.
- `/dev/ui` MUST NOT aparecer en navegación de producción.
- Guards definitivos MUST permanecer fuera de alcance.

### Tailwind and Token Requirements

- Tailwind CSS MUST ser la base de estilos utilitarios.
- Los componentes MUST construirse sobre HTML semántico y Tailwind.
- El sistema MUST definir variables CSS semánticas.
- Los tokens MUST cubrir:
  - brand;
  - primary;
  - background;
  - surface;
  - text-primary;
  - text-secondary;
  - border;
  - success;
  - warning;
  - danger;
  - info;
  - disabled;
  - focus.
- Los tokens MUST cubrir espaciado consistente.
- Los tokens MUST cubrir tipografía.
- Los tokens MUST cubrir radios `sm`, `md`, `lg` y `full`.
- Los tokens MUST cubrir sombras `sm` y `md`.
- Los tokens MUST cubrir niveles mínimos de z-index para header, sidebar, dropdown, modal y toast.
- Los componentes MUST NOT duplicar valores hexadecimales arbitrarios.
- Tailwind MUST consumir o convivir con las variables CSS semánticas.
- La dirección visual MUST utilizar azul marino, azul primario, fondos claros, superficies blancas, bordes suaves y sombras discretas.
- La fundación MUST ser responsive.
- Este change MUST NOT implementar las pantallas completas de referencia.

### Branding and Icon Requirements

- La aplicación MUST incluir un componente BrandMark o equivalente.
- BrandMark MUST utilizar el asset de React como fallback predeterminado.
- BrandMark MUST aceptar un asset alternativo.
- BrandMark MUST aceptar texto alternativo.
- BrandMark MUST soportar tamaños definidos.
- Layouts y páginas MUST NOT importar directamente el logo en múltiples ubicaciones.
- El asset de React MUST identificarse como placeholder técnico.
- El asset de React MUST NOT presentarse como logo definitivo.
- Los iconos funcionales MUST utilizar Lucide React.
- El logo de React MUST NOT utilizarse como icono de búsqueda, contraseña, navegación, calendario, carga, eliminación, paginación, notificación o estado.

### Atom Requirements

- La fundación MUST incluir Button.
- La fundación MUST incluir IconButton.
- La fundación MUST incluir LinkButton.
- Los componentes de acción MUST soportar variantes primary, secondary, outline, ghost y danger.
- Los componentes de acción MUST soportar tamaños sm, md y lg.
- Button MUST soportar estado disabled.
- Button MUST soportar estado loading.
- Button MUST soportar icono izquierdo.
- Button MUST soportar icono derecho.
- Button MUST soportar ancho completo.
- Los átomos MUST reenviar props HTML relevantes.
- Los átomos SHOULD reenviar ref cuando corresponda.
- La fundación MUST incluir Label.
- La fundación MUST incluir Input.
- La fundación MUST incluir PasswordInput.
- La fundación MUST incluir Textarea.
- La fundación MUST incluir Select.
- La fundación MUST incluir Checkbox.
- La fundación MUST incluir Radio.
- La fundación MUST incluir FormHint.
- La fundación MUST incluir FormError.
- Los controles MUST soportar foco, error y disabled.
- Los controles MUST soportar `aria-invalid` y `aria-describedby`.
- Los controles MUST utilizar labels visibles.
- La fundación MUST incluir Badge.
- La fundación MUST incluir StatusDot.
- La fundación MUST incluir Alert.
- La fundación MUST incluir Spinner.
- La fundación MUST incluir ProgressBar.
- La fundación MUST incluir Skeleton.
- Los componentes de feedback MUST soportar variantes neutral, info, success, warning y danger cuando correspondan.
- La fundación MUST incluir Card.
- La fundación MUST incluir Surface.
- La fundación MUST incluir Divider.
- La fundación MUST incluir Avatar.
- La fundación MUST incluir BrandMark.

### Molecule Requirements

- La fundación MUST incluir FormField.
- La fundación MUST incluir SearchInput.
- La fundación MUST incluir PasswordStrength.
- La fundación MUST incluir StatCard.
- La fundación MUST incluir Breadcrumbs.
- La fundación MUST incluir Stepper.
- La fundación MUST incluir FileDropzone.
- La fundación MUST incluir Pagination.
- La fundación MUST incluir EmptyState.
- FileDropzone MUST soportar selección por click.
- FileDropzone MUST soportar drag and drop.
- FileDropzone MUST aceptar tipos configurables.
- FileDropzone MUST aceptar un tamaño máximo configurable.
- FileDropzone MUST mostrar el archivo seleccionado.
- FileDropzone MUST permitir retirar la selección.
- FileDropzone MUST soportar disabled.
- FileDropzone MUST comunicar errores.
- FileDropzone MUST funcionar mediante teclado.
- FileDropzone MUST NOT realizar importación real de ZIP.
- `/dev/ui` MAY mostrar FileDropzone con `accept=".zip"`.
- Stepper MUST soportar una secuencia tipada de pasos.
- Stepper MUST identificar el paso activo.
- Stepper MUST permitir representar los seis pasos previstos del concurso sin implementar su flujo.
- StatCard MUST representar etiqueta, valor y estado visual sin requerir datos reales.

### Table Foundation Requirements

- La fundación MUST incluir primitivas de tabla administrativa reutilizables.
- Las primitivas MUST utilizar HTML de tabla semántico cuando corresponda.
- Las columnas MUST poder tiparse.
- La tabla MUST soportar loading.
- La tabla MUST soportar estado vacío.
- La tabla MUST soportar estado de error.
- La tabla MUST soportar acciones de fila.
- La tabla MUST permitir paginación externa.
- La tabla MUST soportar scroll horizontal.
- La tabla MUST incluir accesibilidad básica.
- La tabla MUST NOT implementar la lista funcional de concursos.
- La tabla MUST NOT incorporar ordenamiento, selección o filtros si no son necesarios para la fundación.
- TanStack Table MUST NOT instalarse sin una justificación documentada.

### Layout Requirements

- La fundación MUST incluir AuthLayout.
- AuthLayout MUST permitir título.
- AuthLayout MUST permitir descripción.
- AuthLayout MUST permitir contenido.
- AuthLayout MUST permitir branding.
- AuthLayout MUST permitir ilustración o fondo opcional.
- AuthLayout MUST mostrar en desktop un panel institucional y un panel de contenido.
- AuthLayout MUST reducir u ocultar el panel decorativo en móvil.
- AuthLayout MUST NOT incluir formularios definitivos.
- La fundación MUST incluir AdminLayout.
- AdminLayout MUST incluir sidebar azul marino.
- AdminLayout MUST incluir topbar blanca.
- AdminLayout MUST incluir área principal gris claro.
- AdminLayout MUST reservar espacio para usuario y notificaciones.
- La navegación prevista MUST incluir Resumen, Concursos, Banco de problemas, Usuarios y roles, Lenguajes, Auditoría y Configuración.
- La navegación MUST NOT incluir Instituciones.
- AdminLayout MUST NOT implementar permisos o datos funcionales.

### Development Catalog Requirements

- `/dev/ui` MUST mostrar tokens principales.
- `/dev/ui` MUST mostrar átomos.
- `/dev/ui` MUST mostrar moléculas.
- `/dev/ui` MUST mostrar estados normal, error, loading y disabled.
- `/dev/ui` MUST mostrar AuthLayout.
- `/dev/ui` MUST mostrar AdminLayout o un resumen del shell.
- `/dev/ui` MUST utilizar fixtures locales.
- `/dev/ui` MUST NOT consumir el backend.
- `/dev/ui` MUST NOT utilizar Storybook.
- `/dev/ui` MUST NOT convertirse en una pantalla de producción.

### Tooling Requirements

- El proyecto MUST mantener npm como administrador de paquetes.
- El proyecto MUST incluir scripts equivalentes a:
  - `dev`;
  - `build`;
  - `preview`;
  - `lint`;
  - `typecheck`;
  - `format`;
  - `format:check`;
  - `test`;
  - `test:run`;
  - `api:types`.
- Cada script MUST tener una implementación real antes de agregarse.
- Prettier MUST formatear archivos soportados.
- `format:check` MUST verificar sin modificar.
- EditorConfig MUST definir convenciones básicas del editor.
- ESLint MUST mantenerse como verificación de calidad.
- Vitest MUST ser el test runner.
- React Testing Library MUST ser el estándar para componentes.
- Las pruebas MUST ejecutarse sin requerir el backend, excepto verificaciones contractuales separadas.

### Documentation Requirements

- La documentación MUST residir dentro de `frontend/`.
- La documentación MUST explicar requisitos de entorno.
- La documentación MUST explicar instalación.
- La documentación MUST explicar el puerto 8085.
- La documentación MUST explicar el target local 5185.
- La documentación MUST explicar variables de entorno.
- La documentación MUST explicar el proxy.
- La documentación MUST explicar activación de mocks.
- La documentación MUST explicar generación de tipos.
- La documentación MUST explicar la estructura.
- La documentación MUST explicar el cliente HTTP.
- La documentación MUST explicar TanStack Query.
- La documentación MUST explicar los componentes compartidos.
- La documentación MUST explicar `/dev/ui`.
- La documentación MUST explicar los scripts.
- La documentación MUST registrar reglas de contribución frontend.
- El README raíz MUST permanecer sin cambios.

## Behavior Scenarios

### Scenario 1: Inicio en el puerto obligatorio

Given que el puerto 8085 está disponible  
When Pi inicia el servidor de desarrollo  
Then Vite MUST responder en `http://localhost:8085`

### Scenario 2: Puerto ocupado

Given que otro proceso utiliza el puerto 8085  
When Pi inicia Vite  
Then el proceso MUST fallar y MUST NOT elegir otro puerto

### Scenario 3: Solicitud mediante proxy

Given que el backend está disponible en el target configurado  
When un servicio solicita una ruta relativa bajo `/api`  
Then Vite MUST reenviar la solicitud al backend configurado sin exponer su URL en el componente

### Scenario 4: Configuración React válida

Given que las variables requeridas contienen valores válidos  
When la aplicación carga `src/config/env.ts`  
Then la configuración MUST devolver valores tipados y el timeout MUST ser numérico

### Scenario 5: Configuración inválida

Given que falta una variable obligatoria o tiene formato inválido  
When la aplicación valida el entorno  
Then el inicio MUST fallar con un mensaje que identifique la variable problemática

### Scenario 6: Mocks desactivados por defecto

Given que `VITE_ENABLE_MOCKS` no está definido o es `false`  
When la aplicación inicia  
Then MSW MUST NOT interceptar solicitudes

### Scenario 7: Uso no autorizado de fetch

Given que un componente utiliza `fetch` directamente  
When se ejecuta ESLint  
Then la verificación MUST fallar e indicar que debe usarse el cliente HTTP compartido

### Scenario 8: Uso autorizado de fetch

Given que el cliente HTTP compartido utiliza `fetch`  
When se ejecuta ESLint  
Then la regla MUST permitir ese uso autorizado

### Scenario 9: Solicitud JSON

Given un servicio con payload JSON válido  
When delega una solicitud POST al cliente HTTP  
Then el cliente MUST serializar el cuerpo y aplicar las cabeceras correspondientes

### Scenario 10: Envío de FormData

Given una solicitud con `FormData`  
When el cliente HTTP la envía  
Then el cliente MUST preservar la construcción automática del encabezado multipart

### Scenario 11: Respuesta sin contenido

Given que el backend responde con 204  
When el cliente procesa la respuesta  
Then MUST devolver un resultado exitoso sin intentar parsear JSON inexistente

### Scenario 12: Timeout

Given que una solicitud excede `VITE_REQUEST_TIMEOUT_MS`  
When el temporizador del cliente se completa  
Then la solicitud MUST abortarse y producir un error normalizado de timeout

### Scenario 13: Cancelación externa

Given que un consumidor proporciona un `AbortSignal`  
When el consumidor cancela la solicitud  
Then el cliente MUST abortarla sin clasificarla incorrectamente como timeout

### Scenario 14: Problem Details

Given que ASP.NET Core responde con Problem Details  
When el cliente procesa el error  
Then MUST preservar status, título o mensaje seguro, código disponible y request ID disponible

### Scenario 15: Validation Problem Details

Given que ASP.NET Core responde con errores de validación por campo  
When el cliente normaliza la respuesta  
Then `fieldErrors` MUST contener los mensajes agrupados por campo

### Scenario 16: OpenAPI disponible

Given que el backend expone un esquema OpenAPI confirmado  
When se ejecuta `npm run api:types`  
Then `api.generated.ts` MUST regenerarse sin edición manual

### Scenario 17: OpenAPI no disponible

Given que no se puede acceder al esquema OpenAPI real  
When Pi intenta preparar contratos de autenticación o concursos  
Then Pi MUST detener esas tareas, MUST NOT inventar tipos o rutas y MAY continuar con la fundación no contractual

### Scenario 18: Modelo de vista diferente al DTO

Given que una vista necesita nombres o formatos distintos al DTO  
When la feature prepara datos para el componente  
Then MUST utilizar un mapper dentro de la feature

### Scenario 19: Estado remoto

Given un servicio confirmado y un hook futuro  
When la UI solicita datos remotos  
Then el hook MUST utilizar TanStack Query en lugar de `useEffect + useState + fetch`

### Scenario 20: Autenticación no confirmada

Given que OpenAPI no confirma cookies o Bearer  
When se crea la fundación de autenticación  
Then la abstracción MUST permanecer neutral y MUST NOT persistir tokens

### Scenario 21: Mocks activados

Given que la aplicación ejecuta en desarrollo y `VITE_ENABLE_MOCKS=true`  
When inicia el frontend  
Then MSW MUST interceptar únicamente handlers confirmados y registrados

### Scenario 22: Mock contractual pendiente

Given que OpenAPI no está disponible  
When se prepara el handler de autenticación o concursos  
Then el handler MUST permanecer pendiente y MUST NOT inventar una ruta

### Scenario 23: BrandMark predeterminado

Given que BrandMark no recibe un asset alternativo  
When se renderiza  
Then MUST mostrar el asset de React como placeholder técnico

### Scenario 24: BrandMark reemplazado

Given que BrandMark recibe un asset alternativo y texto alternativo  
When se renderiza  
Then MUST mostrar el asset recibido sin requerir cambios en el layout

### Scenario 25: Icono funcional

Given un botón de búsqueda o visibilidad de contraseña  
When se define su icono  
Then MUST utilizar un icono de Lucide y MUST NOT utilizar el logo de React

### Scenario 26: Button disabled

Given que Button está deshabilitado  
When el usuario intenta activarlo  
Then no MUST ejecutar la acción asociada

### Scenario 27: Button loading

Given que Button está en loading  
When se renderiza  
Then MUST mostrar un indicador y SHOULD impedir activaciones duplicadas

### Scenario 28: Input con error

Given un Input con label, hint y error  
When se renderiza  
Then MUST asociar los textos mediante atributos accesibles y MUST indicar estado inválido

### Scenario 29: PasswordInput

Given un PasswordInput con valor oculto  
When el usuario activa el control de visibilidad  
Then el control MUST alternar entre oculto y visible sin modificar el valor

### Scenario 30: FileDropzone con archivo inválido

Given que FileDropzone acepta `.zip` y un límite configurado  
When el usuario selecciona un archivo de tipo o tamaño no permitido  
Then MUST rechazarlo y mostrar un error accesible sin subirlo

### Scenario 31: Stepper

Given una lista de seis pasos y un índice activo  
When Stepper se renderiza  
Then MUST identificar visual y semánticamente el paso activo

### Scenario 32: AdminLayout

Given contenido administrativo de ejemplo  
When AdminLayout se renderiza  
Then MUST mostrar sidebar, topbar y área principal sin requerir datos del backend

### Scenario 33: AuthLayout responsive

Given que AuthLayout se visualiza en móvil  
When el viewport se reduce  
Then el formulario MUST ocupar el ancho disponible y el panel decorativo MUST reducirse u ocultarse

### Scenario 34: Catálogo en desarrollo

Given una ejecución de desarrollo  
When el usuario navega a `/dev/ui`  
Then MUST ver el catálogo con fixtures locales y sin solicitudes al backend

### Scenario 35: Catálogo en producción

Given una build de producción  
When se intenta navegar a `/dev/ui`  
Then la ruta MUST no estar registrada y la aplicación MUST resolver mediante 404 o comportamiento equivalente

### Scenario 36: Ruta desconocida

Given una URL no registrada  
When React Router la resuelve  
Then MUST mostrar la página 404

### Scenario 37: Historia funcional fuera de alcance

Given que la fundación incluye layouts, rutas y componentes  
When se revisa el change  
Then no MUST existir login, registro, administración de concursos o importación ZIP funcional

### Scenario 38: Documentación

Given que la fundación fue configurada  
When un integrante consulta la documentación de `frontend/`  
Then MUST encontrar instrucciones de instalación, entorno, proxy, mocks, tipos, scripts y reglas de contribución

## Edge Cases

- El puerto 8085 está ocupado.
- `API_PROXY_TARGET` está ausente.
- `API_PROXY_TARGET` utiliza un valor inválido.
- `VITE_API_BASE_URL` no comienza con `/`.
- `VITE_REQUEST_TIMEOUT_MS` no es numérico.
- El timeout es cero o negativo.
- `VITE_ENABLE_MOCKS` contiene un valor no reconocido.
- Una variable `VITE_*` contiene accidentalmente un secreto.
- El backend responde HTML en lugar de JSON.
- El backend responde un body vacío con un status distinto de 204.
- El backend responde Problem Details con extensiones adicionales.
- Validation Problem Details usa claves con distinta capitalización.
- El request ID aparece en body, header o ambos.
- Una solicitud combina timeout y cancelación externa.
- Un endpoint devuelve un archivo o contenido no JSON.
- El proxy no puede conectarse al backend.
- Swagger está disponible bajo una ruta no estándar.
- Swagger UI está disponible, pero el JSON OpenAPI no es accesible.
- OpenAPI contiene múltiples documentos o versiones.
- OpenAPI cambia y deja tipos generados obsoletos.
- La autenticación usa cookies y exige `credentials`.
- La autenticación usa Bearer y no existe todavía un proveedor de token.
- MSW inicia después de que la aplicación ya emitió una solicitud.
- Un fixture contiene datos con apariencia real.
- Un handler no dispone de tipos generados.
- `/dev/ui` se importa estáticamente en la build de producción.
- BrandMark recibe un asset inválido.
- Un icon-only button carece de nombre accesible.
- FileDropzone recibe varios archivos cuando solo admite uno.
- FileDropzone recibe un archivo sin extensión.
- FileDropzone recibe un archivo con extensión correcta y MIME inesperado.
- Stepper recibe un índice fuera de rango.
- Pagination recibe una página actual mayor al total.
- Una tabla no tiene filas.
- Una tabla tiene más columnas que el ancho móvil.
- AuthLayout recibe contenido largo.
- AdminLayout recibe navegación sin íconos.
- La configuración de Tailwind vigente difiere de versiones anteriores.
- El alias funciona en Vite pero no en pruebas o TypeScript.
- Prettier y ESLint producen reglas incompatibles.
- `frontend/README.md` contiene información previa que debe preservarse.
- El repositorio ya incluye alguna dependencia aprobada.
- Una captura sugerida no existe.
- Las pruebas pasan localmente, pero dependen accidentalmente del backend.

## Acceptance Criteria

- Vite MUST utilizar `8085` para desarrollo.
- Vite MUST utilizar `8085` para preview.
- `server.strictPort` MUST estar activo.
- `preview.strictPort` MUST estar activo.
- El proxy `/api` MUST utilizar el target configurado para `5185`.
- Componentes, páginas y hooks MUST NOT contener `http://localhost:5185`.
- `.env.example` MUST existir.
- `.env` MUST permanecer ignorado.
- La configuración consumida por React MUST estar tipada y centralizada.
- Una variable obligatoria inválida MUST producir un error verificable.
- El timeout MUST convertirse a número.
- Los mocks MUST estar desactivados por defecto.
- No MUST existir un secreto en `.env.example`.
- El alias `@/` MUST resolver correctamente en build, typecheck y tests.
- El cliente HTTP compartido MUST soportar JSON y `FormData`.
- El cliente HTTP MUST normalizar errores HTTP, red y timeout.
- Problem Details MUST mapearse al error interno.
- Validation Problem Details MUST producir errores por campo.
- Una respuesta 204 MUST procesarse sin error de parsing.
- ESLint MUST fallar ante `fetch` directo en componentes.
- ESLint MUST permitir `fetch` en el cliente autorizado.
- Las rutas API MUST centralizarse.
- No MUST existir un endpoint inventado.
- OpenAPI MUST ser la fuente de verdad contractual.
- `api.generated.ts` MUST declarar que es generado.
- `api.generated.ts` MUST regenerarse mediante script cuando el esquema esté disponible.
- Si OpenAPI no está disponible, las tareas contractuales MUST permanecer pendientes.
- TanStack Query MUST estar registrado mediante provider.
- MSW MUST cargarse solo cuando la configuración lo habilita.
- Fixtures y builders MUST estar separados de los componentes.
- React Hook Form y Zod MUST estar disponibles para formularios posteriores.
- React Router MUST incluir 404.
- `/dev/ui` MUST existir en desarrollo.
- `/dev/ui` MUST no estar accesible como ruta en producción.
- Tailwind MUST estar configurado.
- Los tokens semánticos MUST existir.
- Los componentes MUST evitar colores arbitrarios duplicados.
- BrandMark MUST utilizar React como fallback.
- BrandMark MUST aceptar otro asset.
- Los iconos funcionales MUST utilizar Lucide React.
- Button, Input, PasswordInput, Badge, Alert y BrandMark MUST tener pruebas.
- FileDropzone, Stepper y StatCard MUST tener pruebas.
- AuthLayout y AdminLayout MUST tener pruebas básicas.
- La infraestructura de tabla MUST representar loading, vacío y error.
- `npm run format:check` MUST finalizar correctamente.
- `npm run lint` MUST finalizar correctamente.
- `npm run typecheck` MUST finalizar correctamente.
- `npm run test:run` MUST finalizar correctamente.
- `npm run build` MUST finalizar correctamente.
- `npm run dev` MUST iniciar en 8085.
- La documentación dentro de `frontend/` MUST cubrir el uso por el equipo.
- No MUST existir implementación funcional de UJ-5, UJ-6, UJ-8 o UJ-9.
- Backend, `database/`, README raíz y documentos académicos MUST permanecer sin cambios.
- Las capturas MUST permanecer pendientes mientras sus archivos no existan.
- No MUST haberse realizado commit o push.

## Out of Scope

- Login y registro funcionales.
- Sesión persistente.
- Guards definitivos.
- Consumo funcional de concursos.
- Creación funcional de concursos.
- Importación ZIP real.
- Creación automática de problemas.
- Integraciones con Judge0 o tiempo real.
- Cambios de backend, CORS o base de datos.
- Storybook.
- Biblioteca visual externa.
- Dashboard completo.
- CI/CD, Docker y despliegue.
