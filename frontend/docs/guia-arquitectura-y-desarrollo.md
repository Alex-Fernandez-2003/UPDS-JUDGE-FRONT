# Guía de arquitectura y desarrollo frontend — UPDS JUDGE

Esta guía explica la fundación de frontend de Sprint 1 para quienes se incorporan al equipo. Es una base reutilizable de React: no implementa flujos funcionales de inicio de sesión, registro, concursos ni importación de archivos ZIP.

## Ruta rápida

1. Desde `frontend/`, instalá dependencias y copiá el entorno de ejemplo.
2. Ejecutá `npm run dev` y abrí <http://localhost:8085>.
3. En desarrollo, recorré `/dev/ui` para reconocer componentes, tokens y layouts.
4. Antes de proponer un cambio, verificá las reglas de contribución y ejecutá las validaciones de esta guía.

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Alcance actual

| Incluye                                           | No incluye                                                    |
| ------------------------------------------------- | ------------------------------------------------------------- |
| Configuración Vite, TypeScript, pruebas y formato | Historias funcionales de autenticación                        |
| Cliente HTTP, errores, tipos OpenAPI y Query      | Persistencia de sesión, cookies o adquisición de credenciales |
| Componentes, layouts, tokens y catálogo técnico   | Pantallas de producto completas                               |
| Rutas reservadas y pantalla 404                   | Carga real de archivos ZIP                                    |

Las rutas, DTO y estados HTTP se obtienen exclusivamente de OpenAPI. No se inventan endpoints, DTO ni estados.

## Árbol del proyecto

```text
frontend/
├── docs/
│   └── guia-arquitectura-y-desarrollo.md
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── scripts/
│   └── generate-api-types.mjs
├── src/
│   ├── config/                 # Entorno público tipado
│   ├── lib/
│   │   ├── api/                # Transporte, errores y endpoints
│   │   ├── auth/               # Sesión y adaptador Bearer neutral
│   │   └── query/              # QueryClient y provider
│   ├── mocks/                  # MSW, fixtures, builders y handlers
│   ├── components/
│   │   ├── common/             # Acciones, superficies y feedback
│   │   ├── forms/              # Controles y FileDropzone
│   │   ├── navigation/         # Navegación, pasos y métricas
│   │   └── tables/             # DataTable
│   ├── layouts/                # AuthLayout y AdminLayout
│   ├── routes/                 # Constantes y router
│   ├── dev/ui/                 # Catálogo solo de desarrollo
│   ├── styles/                 # globals.css y tokens.css activos
│   ├── types/api.generated.ts  # Generado; no editar manualmente
│   ├── features/               # Reservado
│   ├── hooks/                  # Reservado
│   ├── pages/                  # Reservado
│   └── realtime/               # Reservado
├── .env.example
├── package.json
└── vite.config.ts
```

Las carpetas reservadas existen para cambios aprobados posteriores. No se deben llenar con una funcionalidad nueva sin que su alcance esté acordado.

## Stack y responsabilidades

| Herramienta                    | Responsabilidad en esta base                         |
| ------------------------------ | ---------------------------------------------------- |
| React 19                       | Renderizado de la interfaz                           |
| Vite 8                         | Desarrollo, build, preview y proxy local             |
| TypeScript 6                   | Tipado de la aplicación                              |
| React Router                   | Router del navegador y rutas reservadas              |
| TanStack Query                 | Estado remoto y configuración de caché               |
| Tailwind CSS 4                 | Utilidades CSS cargadas desde estilos globales       |
| MSW                            | Simulación opt-in en navegador durante desarrollo    |
| Vitest + React Testing Library | Pruebas de comportamiento de la fundación            |
| Oxlint                         | Reglas de código, incluida la restricción de `fetch` |
| Prettier                       | Formato consistente                                  |
| Lucide React                   | Iconos funcionales                                   |

El alias `@/` apunta a `src/` tanto en Vite como en TypeScript. Usalo para imports entre áreas de primer nivel.

```ts
import { HttpClient } from '@/lib/api'
```

## Entorno y puertos

Creá `frontend/.env.local` a partir de `.env.example`. Los archivos `.env` y `.env.local` están ignorados. Nunca coloques secretos en variables `VITE_*`: se exponen al bundle del navegador.

| Variable                  | Consumidor  | Valor local/de ejemplo  | Regla                          |
| ------------------------- | ----------- | ----------------------- | ------------------------------ |
| `VITE_APP_NAME`           | React       | `UPDS Judge`            | Texto no vacío                 |
| `VITE_API_BASE_URL`       | React       | `/api`                  | Debe comenzar con `/`          |
| `VITE_REQUEST_TIMEOUT_MS` | React       | `10000`                 | Número finito positivo         |
| `VITE_ENABLE_MOCKS`       | React       | `false`                 | Solo `true` o `false`          |
| `API_PROXY_TARGET`        | Vite        | `http://localhost:5185` | Solo configuración de Vite     |
| `OPENAPI_SCHEMA_URL`      | Script Node | Definida en el ejemplo  | Requerida solo por `api:types` |

`parsePublicEnv` centraliza las lecturas públicas de React. `isDevelopment` es la única lectura exportada de `import.meta.env.DEV`.

El servidor de desarrollo y `preview` usan el puerto `8085` con `strictPort: true`. Vite redirige solicitudes que empiezan por `/api` al valor de `API_PROXY_TARGET`; React usa una ruta relativa y no conoce ese destino.

## Arranque de la aplicación

El flujo de boot evita que los mocks se activen después de renderizar:

```text
main.tsx
  ├─ si isDevelopment && env.enableMocks: inicia el worker MSW
  └─ monta App dentro de StrictMode
       └─ QueryProvider
            └─ RouterProvider
```

`App.tsx` compone el provider de TanStack Query y el router. Los componentes de UI no solicitan datos por sí mismos.

## HTTP, errores, autenticación y OpenAPI

### Límite de transporte

Solo `src/lib/api/http-client.ts` llama a `fetch`. La regla de lint bloquea usos directos fuera de esa frontera, salvo el script bajo `scripts/**/*.mjs`. Una futura función debe mantener esta dirección:

```text
componente → hook de feature → servicio de feature → HttpClient
```

`HttpClient` expone `request`, `get`, `post`, `put`, `patch` y `delete`. Acepta objetos JSON o `FormData`, `AbortSignal`, opciones `RequestInit` y `timeoutMs`; devuelve JSON, texto o `undefined` para 204.

```ts
const client = new HttpClient({ baseUrl: env.apiBaseUrl })
const data = await client.get<SomeType>('ruta-confirmada')
```

El ejemplo es estructural: `SomeType` y `ruta-confirmada` deben provenir de un cambio aprobado y del contrato OpenAPI.

### Errores

Los fallos se representan como `ApiError` con `kind` `http`, `network`, `timeout` o `aborted`; puede incluir `status`, `code`, `fieldErrors` y `requestId`. El soporte de Problem Details reconoce `title`, `detail` o `status`; los errores de validación son listas `string[]`.

La interfaz debe decidir cómo mostrar el error, pero no duplicar el parsing de transporte en cada feature.

### Autenticación y estado remoto

`AuthSession.state` puede ser `unknown`, `anonymous` o `authenticated`. La fundación no persiste sesión. El adaptador Bearer opcional recibe una función `() => string | undefined`; el transporte predeterminado no agrega encabezados.

`QueryProvider` usa un `QueryClient` con `staleTime` de 30 segundos y `gcTime` de 5 minutos. Los reintentos son menores que dos, excepto ante respuestas HTTP con estado inferior a 500.

### Tipos OpenAPI

`npm run api:types` ejecuta `scripts/generate-api-types.mjs` y requiere `OPENAPI_SCHEMA_URL`. El resultado es `src/types/api.generated.ts`.

- OpenAPI es la única fuente de verdad contractual.
- No edites `api.generated.ts` a mano.
- No agregues rutas ni tipos por intuición.
- Generá tipos solo cuando el contrato aprobado cambie.

## Mocks MSW

MSW se inicia únicamente cuando `isDevelopment` y `VITE_ENABLE_MOCKS=true`. El worker deja pasar solicitudes no manejadas. Los datos visuales viven en `src/mocks/fixtures/` y se crean también con `buildUiFixture`; no se mezclan dentro de componentes.

Los handlers actuales están en `src/mocks/handlers/`. Usá mocks para estados visuales y pruebas locales, no como sustituto de un contrato ni como implementación de producto.

## Router, rutas y catálogo

| Constante                | Ruta                  | Estado          |
| ------------------------ | --------------------- | --------------- |
| `ROUTES.login`           | `/login`              | Reservada       |
| `ROUTES.register`        | `/register`           | Reservada       |
| `ROUTES.adminContests`   | `/admin/contests`     | Reservada       |
| `ROUTES.adminContestNew` | `/admin/contests/new` | Reservada       |
| `ROUTES.devUi`           | `/dev/ui`             | Solo desarrollo |

Las cuatro rutas de producto muestran placeholders para cambios aprobados posteriores. Las rutas desconocidas muestran 404. `/dev/ui` se carga de forma diferida y solo se registra si `isDevelopment` es verdadero.

El catálogo `/dev/ui` no es una pantalla de producto ni hace HTTP. Muestra tokens, acciones, feedback, campos, un `Stepper` de seis pasos, `FileDropzone` con `.zip` y máximo de `1000000` bytes, `StatCard`, `EmptyState`, `DataTable` y vistas de ambos layouts usando `uiFixture`.

## Sistema visual y estilos

La entrada activa es `src/styles/globals.css`, que carga Tailwind y `tokens.css`. Los tokens semánticos cubren marca, primario, fondos y superficies, texto, bordes, estados, foco, espaciado, radios, sombras y capas.

| Usá                                    | Evitá                                                       |
| -------------------------------------- | ----------------------------------------------------------- |
| Tokens semánticos y clases utilitarias | Colores dispersos y valores visuales sin semántica          |
| `globals.css` y `tokens.css`           | Tratar `src/App.css` o `src/index.css` como estilos activos |
| Componentes compartidos                | Reimplementar controles ya disponibles                      |

`src/App.css` y `src/index.css` son CSS legado del scaffold; `main.tsx` importa `src/styles/globals.css`.

## Catálogo de componentes compartidos

### Common

| Componente                    | API relevante                                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Button`                      | Variantes `primary`, `secondary`, `outline`, `ghost`, `danger`; tamaños `sm`, `md`, `lg`; `fullWidth`, `loading`, `leftIcon`, `rightIcon` y props nativas de botón |
| `IconButton`                  | Requiere `label` y props nativas de botón                                                                                                                          |
| `LinkButton`                  | Props de ancla y variantes de acción                                                                                                                               |
| `BrandMark`                   | `src?`, `alt?`, `size?: sm \| md \| lg`                                                                                                                            |
| `Surface`, `Card`, `Divider`  | Props nativas del elemento correspondiente                                                                                                                         |
| `Avatar`                      | `name`, `src?`, `className?`; genera hasta dos iniciales sin imagen                                                                                                |
| `Badge`, `StatusDot`, `Alert` | `tone`: `neutral`, `info`, `success`, `warning`, `danger`; `Alert` tiene `role="alert"`                                                                            |
| `Spinner`                     | `label?`                                                                                                                                                           |
| `ProgressBar`                 | `value`, `label?`; limita el valor entre 0 y 100                                                                                                                   |
| `Skeleton`                    | `className?`                                                                                                                                                       |
| `EmptyState`                  | `title`, `description?`, `action?`                                                                                                                                 |

`Button` en estado `loading` se deshabilita y reemplaza el icono izquierdo por `LoaderCircle`.

### Forms

| Componente                       | API o comportamiento                                                                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Label`, `FormHint`, `FormError` | Textos semánticos de campo                                                                                                                  |
| `Input`, `Textarea`, `Select`    | Props nativas más `error?: boolean`, que activa `aria-invalid`                                                                              |
| `Checkbox`, `Radio`              | Controles reutilizables                                                                                                                     |
| `PasswordInput`                  | Alterna entre texto y contraseña con control accesible                                                                                      |
| `FormField`                      | `label`, `hint?`, `error?`, `children`; conecta id, descripción y error a un único hijo                                                     |
| `SearchInput`                    | Envuelve una entrada de búsqueda                                                                                                            |
| `PasswordStrength`               | `value`; niveles 0/33/66/100 según longitud 0/1–7/8–11/12+                                                                                  |
| `FileDropzone`                   | `accept?`, `maxSizeBytes?`, `disabled?`, `onChange?`; selecciona o recibe drop, valida extensión y tamaño, permite quitar; no sube archivos |

Para un campo, preferí `FormField` y un control existente; así se mantiene la relación accesible entre etiqueta, ayuda y error.

### Navigation y tablas

| Componente     | API o comportamiento                                                 |
| -------------- | -------------------------------------------------------------------- |
| `Breadcrumbs`  | `items: { label, to? }[]`                                            |
| `Stepper`      | `steps: string[]`, `activeIndex: number`                             |
| `Pagination`   | `page`, `totalPages`, `onPageChange`; limita páginas fuera de rango  |
| `StatCard`     | `label`, `value`, `tone?: neutral \| info \| success`                |
| `DataTable<T>` | `columns`, `rows`, `loading?`, `error?`, `rowActions?`, `emptyText?` |

Las columnas de `DataTable<T>` tienen `key`, `header` y `render?`. La tabla ya representa loading, error, vacío, filas, acciones opcionales y contenedor con overflow horizontal. La paginación es externa: la feature conserva la página y obtiene sus datos.

## Layouts

| Layout        | Contrato                                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthLayout`  | `title`, `description?`, `branding?`, `illustration?`, `children`; en escritorio muestra panel decorativo y en móvil lleva el branding al contenido |
| `AdminLayout` | `user = 'Sample administrator'`, `sidebar?`, `children`; ofrece sidebar, topbar, notificaciones y avatar                                            |

La navegación por defecto de `AdminLayout` contiene Overview, Contests, Problem bank, Users and roles, Languages, Audit y Settings. Es una base visual; no expresa permisos ni navegación final.

## Formularios y features: patrón de incorporación

Cuando se apruebe una feature, separá responsabilidades:

1. El componente presenta datos y eventos.
2. El hook de feature coordina formulario o estado remoto.
3. El servicio traduce operaciones aprobadas hacia `HttpClient`.
4. Los tipos vienen de OpenAPI generado o de tipos de UI locales que no representan contrato.
5. Las fixtures quedan en `mocks/`, no en el componente.

No agregues una feature solo para completar una ruta reservada. Mantené la funcionalidad dentro de su área y reutilizá los componentes y layouts existentes.

## Pruebas

La suite cubre validación de entorno, `HttpClient`, handlers MSW, componentes, layouts y router. Ejemplos de comportamientos cubiertos:

- Valores válidos e inválidos de `parsePublicEnv`.
- Métodos HTTP, `FormData`, 204, timeout, cancelación y errores normalizados.
- Acción en carga, alertas, campos, password visibility, selección y retiro de `FileDropzone`.
- Slots de layouts, 404 y registro de `/dev/ui` según entorno.

Para un nuevo cambio, agregá pruebas de comportamiento y accesibilidad junto al área modificada. Evitá snapshots extensos y dependencias del backend.

```bash
npm run test:run
```

## Scripts disponibles

Ejecutá estos comandos desde `frontend/`.

| Comando                | Propósito                                       |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Inicia Vite en 8085                             |
| `npm run build`        | Ejecuta typecheck y build de producción         |
| `npm run preview`      | Previsualiza el build en 8085                   |
| `npm run lint`         | Ejecuta checks y la política de `fetch` directo |
| `npm run typecheck`    | Verifica proyectos TypeScript                   |
| `npm run format`       | Aplica Prettier                                 |
| `npm run format:check` | Verifica Prettier sin escribir                  |
| `npm run test`         | Inicia Vitest en modo interactivo               |
| `npm run test:run`     | Ejecuta Vitest una vez                          |
| `npm run api:types`    | Genera tipos a partir de `OPENAPI_SCHEMA_URL`   |

## Convenciones y prohibiciones

### Convenciones

- Usá imports `@/` entre áreas de primer nivel.
- Mantené el flujo componente → hook → servicio → `HttpClient`.
- Usá tokens semánticos, componentes compartidos y fixtures separadas.
- Conservá formato: comillas simples, sin punto y coma, coma final; UTF-8, LF e indentación de dos espacios.
- Escribí pruebas centradas en comportamiento y accesibilidad.

### Prohibiciones

- No llames a `fetch` fuera de `src/lib/api/http-client.ts`.
- No edites manualmente `src/types/api.generated.ts`.
- No inventes endpoints, DTO ni estados: OpenAPI es la fuente de verdad.
- No pongas secretos en variables `VITE_*`.
- No implementes login, registro, concursos ni carga funcional de ZIP dentro de esta fundación.
- No conviertas `/dev/ui` en una pantalla de producto.
- No agregues persistencia de sesión, cookies ni credenciales a la abstracción neutral actual.

## Checklist para un PR de frontend

- [ ] El alcance corresponde a una feature aprobada y no llena rutas reservadas por anticipado.
- [ ] Los tipos, rutas y estados provienen de OpenAPI cuando representan contrato.
- [ ] No hay `fetch` directo fuera de `HttpClient`.
- [ ] Los componentes reutilizan tokens y primitivas existentes cuando aplica.
- [ ] Las fixtures y mocks no están embebidos en componentes.
- [ ] Se agregaron pruebas de comportamiento relevantes.
- [ ] Se ejecutaron `format:check`, `lint`, `typecheck`, `test:run` y `build` desde `frontend/`.
- [ ] Si cambiaron contratos aprobados, se evaluó `npm run api:types` y no se editó el archivo generado a mano.

## Resolución de problemas

| Situación                        | Verificación y acción                                                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Vite no inicia                   | Confirmá que el puerto 8085 esté disponible: `strictPort` no selecciona otro puerto.                                    |
| Error de entorno al arrancar     | Revisá `.env.local` contra `.env.example`; los valores públicos se validan al inicio.                                   |
| No aparecen mocks                | Usá desarrollo y `VITE_ENABLE_MOCKS=true`; fuera de esas condiciones no se inician.                                     |
| Import `@/` no resuelve          | Verificá que el import apunte bajo `src/` y que no sea una ruta relativa innecesaria.                                   |
| Error de tipo contractual        | Revisá OpenAPI y regenerá con `npm run api:types` cuando el contrato aprobado y `OPENAPI_SCHEMA_URL` estén disponibles. |
| Se requiere una ruta de producto | Confirmá primero su aprobación; las rutas actuales están reservadas.                                                    |
| El formato falla                 | Ejecutá `npm run format` y revisá que el cambio respete Prettier.                                                       |

## Estado actual

La fundación técnica de Sprint 1 está completa. Las capturas manuales continúan pendientes, no se crearon archivos de evidencia vacíos y no bloquean el cierre técnico. La validación por CLI de OpenSpec no aplica por decisión del proyecto; la consistencia estructural se acepta mediante revisión de los cuatro artefactos del cambio.

## Siguiente lectura

Para una orientación breve de comandos y entorno, consultá el [README del frontend](../README.md). Para incorporar una funcionalidad, empezá por este manual, verificá el alcance aprobado y mantené las fronteras descritas arriba.
