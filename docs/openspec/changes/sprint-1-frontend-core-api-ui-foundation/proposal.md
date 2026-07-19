# Proposal

## Problem Statement

El frontend de UPDS JUDGE ya dispone de un scaffold React, Vite y TypeScript creado durante Sprint 0, pero todavía no cuenta con una fundación compartida para integrar el backend, manejar estado remoto, construir formularios, definir navegación, simular contratos ni desarrollar una interfaz visual consistente.

Sin una base común, los changes posteriores de UJ-5, UJ-6, UJ-8 y UJ-9 podrían introducir:

- URLs y rutas de backend duplicadas.
- Uso directo e inconsistente de `fetch`.
- DTO inventados o divergentes del contrato ASP.NET Core.
- Manejo diferente de errores, timeouts y validaciones.
- Estado remoto administrado con patrones incompatibles.
- Mocks embebidos en componentes.
- Formularios con validaciones y componentes duplicados.
- Colores, espaciados, botones, layouts e iconos inconsistentes.
- Dependencias innecesarias entre las historias del Sprint 1.
- Dificultad para trabajar cuando el backend local no esté disponible.

El change `sprint-1-frontend-core-api-ui-foundation` establecerá una única fundación técnica y visual para Sprint 1 sin implementar las historias funcionales asociadas.

El change se ubicará exclusivamente en:

`docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`

El contrato Swagger/OpenAPI real del backend será la fuente de verdad para rutas, DTO, códigos de respuesta, autenticación y errores. No se inventarán endpoints ni modelos si ese contrato no está disponible.

## Goals

- Mantener toda la fundación de Sprint 1 dentro de un único change.
- Fijar el frontend en `http://localhost:8085` con `strictPort`.
- Configurar el proxy de desarrollo `/api` hacia `http://localhost:5185`.
- Centralizar y validar la configuración consumida por React.
- Configurar el alias `@/` para `frontend/src/`.
- Establecer un cliente HTTP centralizado basado en la API nativa disponible en el navegador.
- Normalizar errores HTTP, de red, timeout, Problem Details y Validation Problem Details.
- Prohibir el uso directo de `fetch` fuera del cliente HTTP autorizado, con excepciones técnicas explícitas.
- Utilizar Swagger/OpenAPI como contrato único del backend.
- Preparar la generación reproducible de tipos TypeScript desde OpenAPI.
- Centralizar la construcción de endpoints sin inventar rutas.
- Establecer la separación componente → hook → servicio → cliente HTTP.
- Configurar TanStack Query como estándar para estado remoto.
- Preparar una abstracción de autenticación desacoplada del mecanismo concreto.
- Configurar MSW para desarrollo y pruebas, desactivado por defecto.
- Establecer React Hook Form y Zod como base para formularios.
- Configurar React Router y las rutas fundacionales.
- Preparar `/dev/ui` como catálogo interno disponible solo en desarrollo.
- Configurar Tailwind CSS con tokens visuales semánticos.
- Definir átomos, moléculas, primitivas de tabla y layouts reutilizables.
- Utilizar Lucide React para iconos funcionales.
- Encapsular el asset de React como marca temporal reemplazable.
- Configurar Vitest y React Testing Library.
- Incorporar Prettier y EditorConfig.
- Documentar el uso de la fundación en `frontend/README.md` o una guía equivalente dentro de `frontend/`.
- Mantener sin cambios el backend, `database/`, el README raíz y la documentación académica existente.
- Dejar tareas contractuales pendientes cuando el backend o Swagger no estén disponibles, sin bloquear el resto de la fundación.

## Non-Goals

- No implementar UJ-5.
- No implementar UJ-6.
- No implementar UJ-8.
- No implementar UJ-9.
- No crear una pantalla funcional de login.
- No crear una pantalla funcional de registro.
- No crear una lista funcional de concursos.
- No crear el formulario funcional de creación de concursos.
- No implementar importación real de ZIP.
- No crear problemas automáticamente desde archivos ZIP.
- No conectar pantallas definitivas con endpoints.
- No resolver persistencia de sesión.
- No implementar guards definitivos por autenticación o rol.
- No asumir Bearer token, cookies HTTP-only u otro esquema sin OpenAPI.
- No almacenar tokens de larga duración en `localStorage` sin una decisión posterior.
- No inventar rutas, DTO, códigos de respuesta o esquemas de autenticación.
- No modificar CORS ni otra configuración del backend.
- No modificar ASP.NET Core.
- No modificar `database/`.
- No integrar Judge0.
- No incorporar SignalR o WebSockets.
- No construir un dashboard completo.
- No crear una biblioteca visual independiente.
- No utilizar Storybook.
- No utilizar Redux, Zustand o Axios.
- No utilizar Bootstrap, Material UI, Ant Design o Chakra UI.
- No utilizar Astro, Next.js o Create React App.
- No agregar TanStack Table salvo que una necesidad confirmada posterior lo justifique.
- No agregar ordenamiento, selección o filtros avanzados a las tablas.
- No implementar CI/CD, Docker o despliegue.
- No actualizar el informe final.
- No modificar el `README.md` de la raíz.
- No modificar documentos académicos existentes dentro de `docs/`.
- No crear automáticamente las capturas sugeridas.
- No realizar commits ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/proposal.md`
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/spec.md`
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/design.md`
- `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/tasks.md`

### Tooling del frontend

- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/vite.config.ts`
- Configuración TypeScript existente.
- Configuración ESLint existente.
- Configuración Vitest.
- `frontend/.editorconfig`
- `frontend/.prettierignore`
- `frontend/.prettierrc`
- `frontend/.env.example`
- Archivo local `.env`, sin versionarlo.

### Configuración

- `frontend/src/config/env.ts`
- Tipos de entorno de Vite, si requieren extensión.
- Integración del alias `@/`.
- Configuración de puertos y proxy.

### API y contratos

- `frontend/src/lib/api/`
- `frontend/src/lib/auth/`
- `frontend/src/lib/query/`
- `frontend/src/types/api.generated.ts`
- `frontend/scripts/generate-api-types.mjs`
- Servicios futuros dentro de cada feature, sin implementar las historias.

### Mocks

- `frontend/src/mocks/browser.ts`
- `frontend/src/mocks/handlers/`
- `frontend/src/mocks/fixtures/`
- `frontend/src/mocks/builders/`

### Sistema visual

- `frontend/src/styles/`
- `frontend/src/components/common/`
- `frontend/src/components/forms/`
- `frontend/src/components/navigation/`
- `frontend/src/components/tables/`
- `frontend/src/layouts/AdminLayout/`
- `frontend/src/layouts/AuthLayout/`

### Navegación y catálogo

- `frontend/src/routes/`
- Página 404.
- `frontend/src/dev/ui/`
- Integración de providers en la entrada de la aplicación.

### Pruebas

- Configuración y setup de Vitest.
- Pruebas de entorno.
- Pruebas del cliente HTTP.
- Pruebas de átomos y moléculas.
- Pruebas de layouts.
- Pruebas de rutas.
- Pruebas de activación de mocks.

### Documentación

- `frontend/README.md`, si ya existe y puede ampliarse sin perder contenido relevante.
- Alternativamente, una guía dentro de `frontend/` si el README existente requiere preservación.

### Dependencias nuevas previstas

Dependencias de runtime aprobadas:

- Tailwind CSS.
- React Router.
- TanStack Query.
- React Hook Form.
- Zod.
- Adaptador de Zod para React Hook Form, cuando corresponda.
- Mock Service Worker.
- Lucide React.
- Utilidades de variantes y clases:
  - `class-variance-authority`.
  - `clsx`.
  - `tailwind-merge`.

Dependencias de desarrollo aprobadas:

- Vitest.
- React Testing Library.
- Matchers DOM.
- Utilidad de interacción de usuario para pruebas.
- Entorno DOM para Vitest.
- Prettier.
- Integración de Tailwind, TypeScript, ESLint y Vitest necesaria para el stack existente.
- Generador de tipos OpenAPI seleccionado durante explore.

## Assumptions

- Sprint 0 dejó un proyecto funcional dentro de `frontend/`.
- La estructura real del repositorio y el contenido actual de `package.json` deben inspeccionarse antes de aplicar el change.
- El backend se ejecutará localmente en `http://localhost:5185`.
- Swagger/OpenAPI estará expuesto por el backend, pero su URL exacta no está confirmada.
- Las rutas, DTO y esquema de autenticación no están confirmados.
- El mecanismo actual de Tailwind y de generación OpenAPI debe seleccionarse de acuerdo con las versiones instaladas durante apply.
- `frontend/README.md` puede existir o no; deberá preservarse cualquier contenido relevante.
- La configuración actual de ESLint puede requerir ampliación, pero no reemplazo destructivo.
- No se confirma que el repositorio ya tenga Prettier, EditorConfig, Vitest o React Testing Library.
- No se confirma que el backend esté disponible durante apply.
- La validación OpenSpec mediante herramienta no se ha ejecutado durante la generación de este briefing porque no se deben ejecutar comandos.

## Risks

### Risk 1: Swagger/OpenAPI no está disponible durante apply

- Probability: Medium.
- Impact: High, porque impide confirmar rutas, DTO, códigos de respuesta y autenticación.
- Mitigation: Permitir que la configuración, el cliente HTTP, Query, UI, layouts, pruebas no contractuales y documentación avancen. Mantener pendientes la generación de tipos, endpoints contractuales, handlers y adaptadores de autenticación dependientes del esquema real.

### Risk 2: El esquema de autenticación se asume incorrectamente

- Probability: Medium.
- Impact: High, porque una decisión prematura sobre cookies o Bearer puede comprometer seguridad y retrabajo.
- Mitigation: Mantener `auth-session` y `auth-transport` como abstracciones sin persistencia definitiva. Confirmar Swagger y comportamiento real antes de implementar credenciales o tokens.

### Risk 3: El proxy oculta diferencias respecto de producción

- Probability: Medium.
- Impact: Medium, porque `/api` funciona localmente mediante Vite, pero el despliegue futuro puede usar otra estrategia.
- Mitigation: Limitar este change a desarrollo local, documentar la dependencia del proxy y posponer configuración de despliegue.

### Risk 4: El puerto 8085 ya está ocupado

- Probability: Medium.
- Impact: Medium, porque `strictPort` impedirá iniciar el frontend.
- Mitigation: Fallar de forma explícita y liberar el puerto; no cambiar silenciosamente la configuración a otro puerto.

### Risk 5: Uso directo de `fetch` fuera del cliente compartido

- Probability: Medium.
- Impact: High, porque fragmentaría timeout, errores, headers y autenticación.
- Mitigation: Incorporar una regla ESLint verificable, una allowlist mínima para el cliente, MSW y scripts autorizados, además de documentación.

### Risk 6: Tipos OpenAPI generados incompatibles con el código existente

- Probability: Medium.
- Impact: Medium.
- Mitigation: Tratar `api.generated.ts` como salida inmutable, crear adapters y mappers fuera del archivo generado y revisar el diff en cada regeneración.

### Risk 7: Los mocks divergen del backend

- Probability: Medium.
- Impact: High, porque las pantallas podrían funcionar solo con MSW.
- Mitigation: Crear handlers únicamente con contratos confirmados y tiparlos con el archivo generado. Mantener handlers contractuales pendientes si OpenAPI no está disponible.

### Risk 8: MSW se activa en producción

- Probability: Low.
- Impact: High.
- Mitigation: Activarlo solo mediante `VITE_ENABLE_MOCKS=true`, utilizar carga condicional en desarrollo y agregar pruebas que verifiquen su desactivación predeterminada.

### Risk 9: El sistema visual crece hasta convertirse en una biblioteca completa

- Probability: Medium.
- Impact: Medium, porque aumentaría el alcance y retrasaría las historias.
- Mitigation: Limitar variantes y estados a los enumerados, usar HTML semántico y evitar componentes específicos de historias.

### Risk 10: `/dev/ui` queda accesible en producción

- Probability: Low.
- Impact: Medium.
- Mitigation: Registrar la ruta solo cuando el entorno sea de desarrollo y verificar explícitamente su ausencia en configuración de producción.

### Risk 11: Accesibilidad inconsistente

- Probability: Medium.
- Impact: Medium.
- Mitigation: Definir labels visibles, relaciones `aria-*`, foco, navegación por teclado y pruebas mínimas para controles interactivos.

### Risk 12: Cambio destructivo sobre la estructura creada en Sprint 0

- Probability: Low.
- Impact: High.
- Mitigation: Inspeccionar antes de reorganizar, extender carpetas existentes y evitar eliminaciones o movimientos no requeridos.

### Risk 13: Dependencias o scripts configurados sin implementación real

- Probability: Medium.
- Impact: Medium.
- Mitigation: Agregar scripts solo cuando exista su configuración y objetivo ejecutable. Validar cada script durante el cierre.

### Risk 14: El change supera ampliamente 400 LoC

- Probability: High.
- Impact: Medium para la revisión, aunque la mayor parte corresponda a componentes y pruebas fundacionales.
- Mitigation: Mantener un único change por requisito, pero ejecutar y revisar en fases internas. Separar conceptualmente tooling, API, mocks, UI, layouts y pruebas dentro del mismo change.

## Rollback Strategy

El rollback debe revertir únicamente la fundación creada por este change, preservando el scaffold de Sprint 0 y cualquier cambio ajeno.

- Registrar el estado inicial con Git antes de aplicar.
- Identificar dependencias agregadas por el change.
- Restaurar `package.json` y `package-lock.json` al estado previo si se revierte la fundación completa.
- Retirar únicamente configuraciones de Vite, alias, Tailwind, Prettier, EditorConfig, Vitest y ESLint atribuibles al change.
- Retirar las carpetas y archivos nuevos de configuración, API, Query, mocks, UI, layouts, rutas y pruebas cuando no existieran antes.
- No eliminar carpetas de Sprint 0 que hayan sido reutilizadas.
- Restaurar la entrada de la aplicación y el router al comportamiento previo.
- No eliminar `frontend/`.
- No modificar ni revertir archivos del backend, `database/`, documentación académica o README raíz.
- No utilizar comandos destructivos que puedan descartar trabajo ajeno.
- Verificar después del rollback:
  - que el scaffold de Sprint 0 siga compilando;
  - que no queden imports hacia dependencias retiradas;
  - que `package-lock.json` sea coherente;
  - que Git solo muestre cambios intencionales.
- El rollback de tipos generados no requiere migraciones de datos, porque no se modifica persistencia.

## Success Criteria

- Existe un único change llamado `sprint-1-frontend-core-api-ui-foundation`.
- El change está ubicado en `docs/openspec/changes/sprint-1-frontend-core-api-ui-foundation/`.
- La configuración exige el puerto 8085 para desarrollo y preview.
- `strictPort` está activo para desarrollo y preview.
- El proxy `/api` apunta al target configurable cuyo ejemplo local es `http://localhost:5185`.
- Los componentes no contienen la URL del backend.
- La configuración de React se consume mediante `src/config/env.ts`.
- `.env.example` contiene solo valores de ejemplo sin secretos.
- El cliente HTTP es el único punto autorizado para solicitudes de aplicación.
- Existe una política ESLint que detecta usos no autorizados de `fetch`.
- Los errores HTTP, Problem Details, Validation Problem Details, red y timeout se normalizan.
- Los endpoints se construyen desde una fuente central sin rutas inventadas.
- OpenAPI es la fuente de verdad contractual.
- Existe un proceso reproducible para generar `api.generated.ts`.
- El archivo generado no se edita manualmente.
- TanStack Query está configurado mediante provider compartido.
- MSW está desactivado por defecto y condicionado al entorno.
- React Hook Form y Zod quedan preparados para historias posteriores.
- React Router contiene 404 y `/dev/ui` de desarrollo.
- Tailwind consume o convive con tokens CSS semánticos.
- Existen átomos, moléculas, layouts y primitivas de tabla fundacionales.
- BrandMark utiliza el asset de React como fallback reemplazable.
- Los iconos funcionales utilizan Lucide React.
- Vitest y React Testing Library verifican la fundación.
- `frontend/README.md` o la guía equivalente documenta el uso.
- No se implementan UJ-5, UJ-6, UJ-8 o UJ-9.
- No se modifica backend, `database/`, README raíz o documentos académicos.
- No se realizan commits ni push.
