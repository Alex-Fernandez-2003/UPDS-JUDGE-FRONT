# Tasks

## Task 1: Inspeccionar el change y las convenciones OpenSpec

- Objective:
  Confirmar el identificador, la ruta, los cuatro artefactos y la convención OpenSpec activa.
- Files or areas likely involved:
  `docs/openspec/`, configuración OpenSpec y `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`.
- Execution notes:
  No ejecutar apply. Confirmar que no existe otro change que divida esta fundación. Identificar el mecanismo de validación disponible.
- Verification method:
  Checklist de identificador, ruta, artefactos, coherencia y resultado de la validación OpenSpec soportada.
- Dependencies:
  None.

## Task 2: Inspeccionar la fundación creada en Sprint 0

- Objective:
  Identificar la estructura existente y evitar reorganización destructiva.
- Files or areas likely involved:
  `frontend/`, `frontend/src/`, configuraciones y documentación existente.
- Execution notes:
  Registrar carpetas, componentes, estilos y archivos ya existentes. No eliminar carpetas de Sprint 0.
- Verification method:
  Mapa del estado inicial y lista de áreas reutilizables.
- Dependencies:
  Task 1.

## Task 3: Revisar dependencias, scripts y configuraciones existentes

- Objective:
  Determinar qué tooling ya está instalado y qué debe agregarse.
- Files or areas likely involved:
  `frontend/package.json`, lockfile, Vite, TypeScript y ESLint.
- Execution notes:
  No asumir versiones. Detectar scripts existentes y evitar duplicados.
- Verification method:
  Inventario de dependencias, scripts y configuraciones con gaps respecto de la spec.
- Dependencies:
  Task 2.

## Task 4: Inspeccionar backend local, Swagger y autenticación

- Objective:
  Identificar la URL real del esquema OpenAPI y el mecanismo contractual de autenticación.
- Files or areas likely involved:
  Backend local como sistema externo, Swagger UI, documento OpenAPI y respuestas disponibles.
- Execution notes:
  No modificar backend. No asumir `/swagger/v1/swagger.json`. Registrar rutas, DTO, status codes, security schemes y errores solo desde el contrato real.
- Verification method:
  URL OpenAPI confirmada y resumen contractual. Si no está disponible, registrar bloqueo sin inventar información.
- Dependencies:
  Task 1.

## Task 5: Registrar estado inicial con Git

- Objective:
  Establecer un baseline para proteger áreas fuera de alcance.
- Files or areas likely involved:
  Working tree completo.
- Execution notes:
  Registrar cambios preexistentes. No descartar cambios ajenos.
- Verification method:
  Salida de estado inicial y lista de archivos previamente modificados.
- Dependencies:
  Tasks 2 and 3.

## Task 6: Instalar dependencias aprobadas de tooling y runtime

- Objective:
  Incorporar solo las dependencias necesarias para la fundación aprobada.
- Files or areas likely involved:
  `frontend/package.json` y `frontend/package-lock.json`.
- Execution notes:
  Utilizar npm. Incluir Router, Query, formularios, Zod, MSW, Lucide, Tailwind, testing, Prettier y utilidades de clases. No instalar Axios, Redux, Zustand, Storybook o bibliotecas visuales.
- Verification method:
  Revisar el diff de dependencias y confirmar ausencia de paquetes fuera de alcance.
- Dependencies:
  Tasks 3 and 5.

## Task 7: Configurar puertos y proxy de Vite

- Objective:
  Fijar desarrollo y preview en 8085 y configurar `/api` hacia el target de entorno.
- Files or areas likely involved:
  `frontend/vite.config.ts` y entorno de Vite.
- Execution notes:
  Establecer `strictPort` para server y preview. Leer `API_PROXY_TARGET` únicamente en Vite. No hardcodear la URL en React.
- Verification method:
  Iniciar dev y preview en 8085; comprobar fallo ante puerto ocupado y proxy cuando el backend esté disponible.
- Dependencies:
  Task 6.

## Task 8: Configurar el alias de importación

- Objective:
  Resolver `@/` hacia `frontend/src/` en todas las herramientas.
- Files or areas likely involved:
  Vite, TypeScript, Vitest y ESLint.
- Execution notes:
  Extender configuraciones existentes sin reemplazos destructivos.
- Verification method:
  Typecheck, test y build con al menos un import mediante alias.
- Dependencies:
  Task 6.

## Task 9: Configurar Prettier y EditorConfig

- Objective:
  Definir formato y convenciones básicas consistentes.
- Files or areas likely involved:
  `.prettierrc`, `.prettierignore`, `.editorconfig`, scripts npm.
- Execution notes:
  Evitar reglas que entren en conflicto con ESLint. Preservar archivos generados cuando deban excluirse.
- Verification method:
  `npm run format:check` exitoso y revisión de archivos ignorados.
- Dependencies:
  Task 6.

## Task 10: Configurar Tailwind CSS

- Objective:
  Habilitar estilos utilitarios compatibles con el stack y la versión instalada.
- Files or areas likely involved:
  Configuración Vite o Tailwind vigente, estilos globales y entrada de la aplicación.
- Execution notes:
  No copiar una configuración legacy sin comprobar compatibilidad. No instalar plugins no requeridos.
- Verification method:
  Build exitoso y clase utilitaria visible en una prueba o catálogo técnico.
- Dependencies:
  Tasks 6 and 7.

## Task 11: Configurar Vitest y React Testing Library

- Objective:
  Crear la infraestructura base de pruebas.
- Files or areas likely involved:
  Configuración Vitest, setup DOM, scripts y utilidades de render.
- Execution notes:
  Mantener pruebas independientes del backend. Incorporar matchers DOM y utilidades de interacción necesarias.
- Verification method:
  Ejecutar una prueba mínima y `npm run test:run`.
- Dependencies:
  Tasks 6 and 8.

## Task 12: Completar scripts npm de la fundación

- Objective:
  Exponer scripts ejecutables para desarrollo, calidad, pruebas y generación de tipos.
- Files or areas likely involved:
  `frontend/package.json`.
- Execution notes:
  Agregar solo scripts con implementación real: dev, build, preview, lint, typecheck, format, format:check, test, test:run y api:types.
- Verification method:
  Inspeccionar scripts y ejecutar todos salvo los bloqueados explícitamente por OpenAPI.
- Dependencies:
  Tasks 7, 8, 9 and 11.

## Task 13: Crear el contrato de entorno tipado

- Objective:
  Centralizar y validar las variables consumidas por React.
- Files or areas likely involved:
  `frontend/.env.example`, `frontend/src/config/env.ts` y tipos de entorno.
- Execution notes:
  Validar app name, API base URL, timeout y mocks. No exponer target del proxy o schema URL al bundle React. No incluir secretos.
- Verification method:
  Pruebas de valores válidos, variable ausente, timeout numérico y mocks desactivados.
- Dependencies:
  Tasks 11 and 12.

## Task 14: Diseñar el modelo interno de errores API

- Objective:
  Definir una representación uniforme para errores HTTP y de transporte.
- Files or areas likely involved:
  `frontend/src/lib/api/api-error.ts`, response helpers y tipos relacionados.
- Execution notes:
  Incluir status, message y campos opcionales para code, fieldErrors y requestId. No acoplar el contrato a una ruta concreta.
- Verification method:
  Tests unitarios de construcción y normalización básica.
- Dependencies:
  Tasks 11 and 13.

## Task 15: Implementar el adapter de Problem Details

- Objective:
  Convertir Problem Details y Validation Problem Details al error interno.
- Files or areas likely involved:
  `frontend/src/lib/api/problem-details.ts` y tests.
- Execution notes:
  Adaptar al contrato real cuando esté disponible. Tolerar extensiones sin exponer datos sensibles.
- Verification method:
  Tests para error estándar, validación por campo y request ID.
- Dependencies:
  Tasks 4 and 14.

## Task 16: Crear el cliente HTTP compartido

- Objective:
  Centralizar métodos, base URL, parseo, timeout, cancelación, headers y errores.
- Files or areas likely involved:
  `frontend/src/lib/api/http-client.ts`, exports y tests.
- Execution notes:
  Soportar JSON, `FormData`, 204, AbortSignal y credenciales configurables. No asumir autenticación.
- Verification method:
  Tests de JSON, FormData, métodos, timeout, cancelación, 204, red y errores HTTP.
- Dependencies:
  Tasks 13, 14 and 15.

## Task 17: Restringir el uso directo de fetch

- Objective:
  Hacer verificable la política de transporte centralizado.
- Files or areas likely involved:
  Configuración ESLint.
- Execution notes:
  Permitir el cliente HTTP, MSW y scripts autorizados. Bloquear componentes, páginas, hooks y servicios.
- Verification method:
  Caso de lint que falla fuera de allowlist y caso autorizado que pasa.
- Dependencies:
  Task 16.

## Task 18: Crear la fuente central de endpoints

- Objective:
  Proporcionar una única ubicación para rutas relativas confirmadas.
- Files or areas likely involved:
  `frontend/src/lib/api/endpoints.ts`.
- Execution notes:
  No agregar login, registro o concursos hasta confirmarlos mediante OpenAPI. Permitir que el archivo permanezca parcial.
- Verification method:
  Revisión que demuestre ausencia de hosts y rutas inventadas.
- Dependencies:
  Task 4.

## Task 19: Configurar generación de tipos OpenAPI

- Objective:
  Crear un proceso reproducible para producir `api.generated.ts`.
- Files or areas likely involved:
  `frontend/scripts/generate-api-types.mjs`, `package.json`, `.env.example` y `src/types/api.generated.ts`.
- Execution notes:
  Seleccionar un generador que produzca tipos, no un cliente HTTP paralelo. Marcar el archivo como generado.
- Verification method:
  Ejecutar `npm run api:types` contra el schema confirmado y revisar el diff.
- Dependencies:
  Tasks 4 and 12.

## Task 20: Manejar indisponibilidad de OpenAPI

- Objective:
  Mantener trazabilidad cuando no sea posible generar contratos.
- Files or areas likely involved:
  Tareas OpenSpec y documentación.
- Execution notes:
  No crear DTO manuales equivalentes. Mantener pendientes endpoints, handlers y autenticación dependientes.
- Verification method:
  Bloqueo documentado con causa, intento realizado y tareas afectadas.
- Dependencies:
  Task 19.

## Task 21: Crear abstracciones de autenticación

- Objective:
  Preparar sesión y transporte sin decidir prematuramente cookies o Bearer.
- Files or areas likely involved:
  `frontend/src/lib/auth/`.
- Execution notes:
  No implementar login, registro o persistencia. Adaptar credenciales solo si OpenAPI lo confirma.
- Verification method:
  Revisión de interfaces y tests unitarios que demuestren neutralidad del mecanismo.
- Dependencies:
  Tasks 4 and 16.

## Task 22: Configurar QueryClient y provider

- Objective:
  Establecer TanStack Query como infraestructura de estado remoto.
- Files or areas likely involved:
  `frontend/src/lib/query/`, `main.tsx` o composición de providers.
- Execution notes:
  Definir retry y tiempos de caché. No crear hooks de historias. Devtools solo en desarrollo si se aprueba.
- Verification method:
  Test de provider y verificación de configuración predeterminada.
- Dependencies:
  Tasks 6 and 11.

## Task 23: Crear la infraestructura base de MSW

- Objective:
  Permitir mocks condicionales sin cambiar servicios.
- Files or areas likely involved:
  `frontend/src/mocks/browser.ts`, bootstrap de la aplicación y configuración de entorno.
- Execution notes:
  Cargar dinámicamente solo en desarrollo y cuando `VITE_ENABLE_MOCKS=true`.
- Verification method:
  Tests de activación y desactivación; build de producción sin worker activo.
- Dependencies:
  Tasks 13 and 22.

## Task 24: Crear fixtures y builders seguros

- Objective:
  Centralizar datos simulados reutilizables para pruebas y `/dev/ui`.
- Files or areas likely involved:
  `frontend/src/mocks/fixtures/` y `frontend/src/mocks/builders/`.
- Execution notes:
  Usar únicamente datos ficticios aprobados. No incluir contraseñas, tokens o correos reales.
- Verification method:
  Revisión automatizada o manual de datos y tests de builders.
- Dependencies:
  Task 23.

## Task 25: Crear handlers únicamente para contratos confirmados

- Objective:
  Preparar mocks de autenticación y concursos cuando existan rutas y tipos reales.
- Files or areas likely involved:
  `frontend/src/mocks/handlers/`.
- Execution notes:
  Si OpenAPI no está disponible, dejar esta tarea pendiente. No inventar endpoints.
- Verification method:
  Tests de handlers tipados contra `api.generated.ts`.
- Dependencies:
  Tasks 18, 19 and 24.

## Task 26: Crear tokens visuales semánticos

- Objective:
  Definir colores, espaciado, tipografía, radios, sombras y z-index compartidos.
- Files or areas likely involved:
  `frontend/src/styles/` y configuración Tailwind.
- Execution notes:
  Utilizar variables CSS semánticas. Evitar hexadecimales repetidos en componentes.
- Verification method:
  Revisión de tokens y muestra en `/dev/ui`.
- Dependencies:
  Task 10.

## Task 27: Crear utilidades de variantes y clases

- Objective:
  Unificar composición de clases y variantes.
- Files or areas likely involved:
  `frontend/src/lib/utils/`.
- Execution notes:
  Integrar `class-variance-authority`, `clsx` y `tailwind-merge` sin crear abstracciones adicionales.
- Verification method:
  Tests unitarios de combinación de clases y uso en un átomo.
- Dependencies:
  Tasks 6 and 26.

## Task 28: Crear BrandMark y primitivas de presentación

- Objective:
  Encapsular branding temporal y superficies reutilizables.
- Files or areas likely involved:
  Componentes common para BrandMark, Card, Surface, Divider y Avatar.
- Execution notes:
  React es solo fallback. Permitir asset alternativo y texto accesible.
- Verification method:
  Tests de fallback, asset alternativo, tamaños y alt text.
- Dependencies:
  Tasks 26 and 27.

## Task 29: Crear átomos de acciones

- Objective:
  Crear Button, IconButton y LinkButton con variantes y estados.
- Files or areas likely involved:
  `frontend/src/components/common/`.
- Execution notes:
  Soportar tamaños, iconos, full width, disabled y loading. Utilizar Lucide para iconos funcionales.
- Verification method:
  Tests de variantes, disabled, loading, eventos y accesibilidad.
- Dependencies:
  Tasks 27 and 28.

## Task 30: Crear átomos de formulario

- Objective:
  Crear controles accesibles desacoplados de React Hook Form.
- Files or areas likely involved:
  `frontend/src/components/forms/`.
- Execution notes:
  Implementar Label, Input, PasswordInput, Textarea, Select, Checkbox, Radio, FormHint y FormError.
- Verification method:
  Tests de label, hint, error, teclado, visibilidad y props HTML.
- Dependencies:
  Tasks 27 and 29.

## Task 31: Crear átomos de estado y feedback

- Objective:
  Crear feedback visual consistente.
- Files or areas likely involved:
  Componentes common.
- Execution notes:
  Implementar Badge, StatusDot, Alert, Spinner, ProgressBar y Skeleton con variantes limitadas.
- Verification method:
  Tests de variantes, roles accesibles y estados.
- Dependencies:
  Tasks 26 and 27.

## Task 32: Crear FormField y moléculas de entrada

- Objective:
  Componer formularios reutilizables sin implementar esquemas de historias.
- Files or areas likely involved:
  Componentes forms.
- Execution notes:
  Crear FormField, SearchInput y PasswordStrength. Permitir integración posterior con React Hook Form.
- Verification method:
  Tests de composición, mensajes y accesibilidad.
- Dependencies:
  Tasks 30 and 31.

## Task 33: Crear moléculas de navegación y resumen

- Objective:
  Implementar Breadcrumbs, Stepper, Pagination y StatCard.
- Files or areas likely involved:
  Componentes navigation y common.
- Execution notes:
  Mantenerlos agnósticos de historias. Stepper debe representar seis pasos por configuración.
- Verification method:
  Tests del paso activo, paginación, breadcrumbs y contenido de StatCard.
- Dependencies:
  Tasks 29 and 31.

## Task 34: Crear FileDropzone y EmptyState

- Objective:
  Proporcionar selección local de archivos y estados vacíos reutilizables.
- Files or areas likely involved:
  Componentes forms y common.
- Execution notes:
  Soportar click, drag and drop, accept, tamaño máximo, eliminación, disabled y teclado. No subir archivos.
- Verification method:
  Tests de tipo, tamaño, teclado, selección y eliminación.
- Dependencies:
  Tasks 29, 30 and 31.

## Task 35: Crear primitivas de tabla administrativa

- Objective:
  Preparar tablas tipadas con loading, vacío, error, acciones y paginación externa.
- Files or areas likely involved:
  `frontend/src/components/tables/`.
- Execution notes:
  Utilizar HTML semántico. No instalar TanStack Table salvo bloqueo técnico documentado.
- Verification method:
  Tests de headers, filas, estados, accesibilidad y scroll container.
- Dependencies:
  Tasks 29, 31 and 33.

## Task 36: Crear AuthLayout

- Objective:
  Preparar el shell responsive para login y registro posteriores.
- Files or areas likely involved:
  `frontend/src/layouts/AuthLayout/`.
- Execution notes:
  Aceptar título, descripción, contenido, branding e ilustración opcional. No crear formularios funcionales.
- Verification method:
  Tests de slots y revisión responsive en `/dev/ui`.
- Dependencies:
  Tasks 28, 29 and 30.

## Task 37: Crear AdminLayout

- Objective:
  Preparar el shell administrativo compartido.
- Files or areas likely involved:
  `frontend/src/layouts/AdminLayout/` y navegación.
- Execution notes:
  Incluir sidebar, topbar, contenido, usuario y notificaciones visuales. No incluir Instituciones ni permisos definitivos.
- Verification method:
  Tests de regiones y revisión responsive.
- Dependencies:
  Tasks 28, 29, 31 and 33.

## Task 38: Configurar React Router y constantes de rutas

- Objective:
  Centralizar navegación sin implementar historias.
- Files or areas likely involved:
  `frontend/src/routes/`, `App.tsx` y providers.
- Execution notes:
  Definir constantes previstas, 404 y registro condicional de `/dev/ui`. No crear guards definitivos.
- Verification method:
  Tests de 404, rutas declaradas y ausencia de `/dev/ui` en producción.
- Dependencies:
  Tasks 22, 36 and 37.

## Task 39: Crear el catálogo interno /dev/ui

- Objective:
  Mostrar tokens, componentes, layouts y estados fundacionales.
- Files or areas likely involved:
  `frontend/src/dev/ui/`.
- Execution notes:
  Utilizar fixtures locales. No consumir backend. Mostrar FileDropzone `.zip` solo como ejemplo visual.
- Verification method:
  Revisión de todos los componentes requeridos y test de ruta en desarrollo.
- Dependencies:
  Tasks 24, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37 and 38.

## Task 40: Completar pruebas de entorno y API

- Objective:
  Cubrir configuración, cliente HTTP, errores y Problem Details.
- Files or areas likely involved:
  Tests de `src/config/` y `src/lib/api/`.
- Execution notes:
  Incluir los casos mínimos especificados y evitar dependencias del backend.
- Verification method:
  `npm run test:run` con todos los casos de entorno y HTTP en verde.
- Dependencies:
  Tasks 13 through 17.

## Task 41: Completar pruebas de componentes

- Objective:
  Cubrir los átomos y moléculas requeridos.
- Files or areas likely involved:
  Tests de componentes common, forms, navigation y tables.
- Execution notes:
  Priorizar comportamiento y accesibilidad, no snapshots extensos.
- Verification method:
  Casos 12-25 de la lista mínima en verde, más controles críticos.
- Dependencies:
  Tasks 28 through 35.

## Task 42: Completar pruebas de layouts, rutas y mocks

- Objective:
  Verificar shells, 404, `/dev/ui` y activación de MSW.
- Files or areas likely involved:
  Tests de layouts, router y mocks.
- Execution notes:
  Simular entornos development y production sin backend.
- Verification method:
  Casos 26-33 de la lista mínima en verde.
- Dependencies:
  Tasks 23, 25, 36, 37, 38 and 39.

## Task 43: Documentar la fundación para el equipo

- Objective:
  Explicar instalación, entorno, arquitectura y reglas de contribución.
- Files or areas likely involved:
  `frontend/README.md` o guía equivalente dentro de `frontend/`.
- Execution notes:
  Preservar contenido existente. Documentar puertos, proxy, mocks, OpenAPI, Query, componentes, `/dev/ui`, scripts y prohibiciones.
- Verification method:
  Checklist documental completo y comandos consistentes con `package.json`.
- Dependencies:
  Tasks 12, 13, 16, 19, 22, 23, 38 and 39.

## Task 44: Ejecutar validaciones técnicas

- Objective:
  Verificar formato, lint, tipos, pruebas, build y ejecución local.
- Files or areas likely involved:
  Proyecto completo dentro de `frontend/`.
- Execution notes:
  Ejecutar instalación, format check, lint, typecheck, tests, build y dev. Verificar puerto 8085 y strictPort.
- Verification method:
  Salidas exitosas de todos los comandos y comprobación local del catálogo.
- Dependencies:
  Tasks 40, 41, 42 and 43.

## Task 45: Verificar proxy y contrato cuando el backend esté disponible

- Objective:
  Confirmar que `/api` alcanza el backend real sin URLs hardcodeadas.
- Files or areas likely involved:
  Vite proxy, cliente HTTP y backend local como dependencia externa.
- Execution notes:
  Utilizar únicamente una ruta confirmada por OpenAPI. No convertir esta verificación en implementación de una historia.
- Verification method:
  Solicitud de smoke test con respuesta observable y registro del target utilizado.
- Dependencies:
  Tasks 4, 7, 16, 18 and 44.

## Task 46: Auditar exclusiones y áreas protegidas

- Objective:
  Confirmar que el change no implementó historias ni modificó áreas prohibidas.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Buscar login, registro, concursos o ZIP funcionales; revisar backend, `database/`, README raíz y documentos académicos.
- Verification method:
  Diff limitado a OpenSpec y `frontend/`, con checklist de exclusiones.
- Dependencies:
  Tasks 44 and 45.

## Task 47: Revisar evidencias manuales

- Objective:
  Mantener pendientes las capturas que todavía no existen.
- Files or areas likely involved:
  `docs/capturas/` y estados de tareas OpenSpec.
- Execution notes:
  No crear capturas, placeholders o archivos vacíos. La evidencia es manual.
- Verification method:
  Comprobar existencia física de cada archivo antes de marcarlo disponible.
- Dependencies:
  Tasks 39, 44 and 45.

## Task 48: Validar OpenSpec y actualizar estados reales

- Objective:
  Verificar la coherencia final y reflejar únicamente trabajo ejecutado.
- Files or areas likely involved:
  Los cuatro artefactos del change.
- Execution notes:
  Ejecutar la herramienta OpenSpec disponible sin ejecutar apply adicional. Mantener pendientes tareas bloqueadas por Swagger o evidencias.
- Verification method:
  Validación OpenSpec exitosa o checklist estructural documentado si no existe herramienta.
- Dependencies:
  Tasks 46 and 47.

## Task 49: Cerrar sin commit ni push

- Objective:
  Preparar el handoff final de la implementación futura.
- Files or areas likely involved:
  Working tree y tareas OpenSpec.
- Execution notes:
  Ejecutar `git status`, revisar archivos y reportar bloqueos. No realizar commit ni push.
- Verification method:
  Estado final documentado, tareas coherentes y ausencia de operaciones remotas.
- Dependencies:
  Task 48.

## Review Workload Forecast

- Estimated LoC changed:
  2,500-5,000 LoC, incluyendo componentes, pruebas, configuración, documentación y archivos generados; el lockfile y `api.generated.ts` pueden aumentar significativamente el conteo bruto.
- Risk of exceeding 400 LoC review threshold:
  High. El alcance aprobado combina varias capas fundacionales y superará previsiblemente el umbral.
- Recommendation:
  Single PR or chained PRs: Single change obligatorio, pero preferentemente chained PRs internos si el flujo del repositorio permite mantener un solo change OpenSpec.
- Suggested split if chained:
  - PR 1: tooling, puertos, proxy, entorno, alias y pruebas base.
  - PR 2: cliente HTTP, errores, OpenAPI, autenticación neutral y TanStack Query.
  - PR 3: MSW, fixtures, builders y handlers confirmados.
  - PR 4: tokens, átomos, moléculas y tablas.
  - PR 5: layouts, router, `/dev/ui`, documentación y validación final.
  - Cada PR debe referenciar el mismo change `sprint-1-frontend-core-api-ui-foundation` y no implementar historias.

## Execution status (2026-07-19)

### Technical foundation complete

- Tooling, Vite strict port 8085, Node-only configurable `/api` proxy, `@/` alias, formatting, testing, Tailwind integration, and npm scripts are implemented.
- Public environment validation, the shared HTTP client and error normalization, OpenAPI type generation, neutral auth abstractions, TanStack Query, and the direct-fetch lint restriction are implemented.
- Conditional MSW infrastructure, visual fixtures/builders, semantic tokens, shared primitives, forms, navigation, table primitive, layouts, development-only `/dev/ui`, tests, and frontend documentation are implemented.
- The technical validation suite has passed from `frontend/`: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build`.

### Closure notes

- Task 47 — Manual captures: pending but non-blocking. No capture, placeholder, or empty evidence file was created; this does not prevent technical closure of the foundation.
- Task 48 — OpenSpec CLI validation is not applicable by project decision. Structural consistency is attested from the four change artifacts; no CLI installation or external validation is required for closure.
- UJ-5, UJ-6, UJ-8, and UJ-9 remain unimplemented.
