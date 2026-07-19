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

## Tutorial práctico: cómo agregar un componente

Este recorrido separa tres cosas que suelen confundirse: un componente reutilizable que **ya existe** (`StatCard`), una composición que todavía es solo una idea didáctica (`SectionHeader`) y una feature de producto, que requiere aprobación propia. Empezá siempre por reutilizar antes de extraer una API nueva.

### Caso real: usar `StatCard`

`StatCard` es una exportación real de `@/components/navigation`. Su catálogo de desarrollo también es real: en `/dev/ui` se renderiza con la fixture local `uiFixture.statistic` y `tone="info"`. El catálogo es visual y de desarrollo; no obtiene datos por HTTP ni demuestra una feature de producto.

| Propiedad        | Tipo o valor                           | Qué verificar                                                                                                                             |
| ---------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `label`          | `string`                               | Texto que describe la métrica.                                                                                                            |
| `value`          | `string \| number`                     | Valor mostrado; el componente no documenta formato numérico especial.                                                                     |
| `tone`           | `'neutral' \| 'info' \| 'success'`     | Es opcional y por defecto es `'neutral'`. Actualmente solo `success` cambia el borde a verde; `neutral` e `info` comparten el borde base. |
| Fixture de DevUi | `{ label: 'Open items', value: '12' }` | Es el dato local consumido por el ejemplo actual junto con `tone="info"`.                                                                 |

```tsx
import { StatCard } from '@/components/navigation'

export function Summary() {
  return <StatCard label="Open items" value="12" tone="info" />
}
```

Antes de crear una variante, comprobá el caso real: `StatCard` ya recibe exactamente `label`, `value` y `tone`. La prueba actual de componentes verifica que el `label` se renderiza; no afirma cobertura dedicada para formato numérico ni para el estilo de cada `tone`.

### Decidir quién es dueño del componente

| Situación                                                  | Dueño recomendado           | Señal para actuar                                             |
| ---------------------------------------------------------- | --------------------------- | ------------------------------------------------------------- |
| Una tarjeta o control ya resuelve la necesidad             | Módulo compartido existente | Reutilizalo sin agregar otra abstracción.                     |
| Patrón visual repetido dentro de una sola feature aprobada | La feature                  | Mantenelo cerca de sus datos y reglas.                        |
| Patrón estable usado por varias features                   | Área compartida acordada    | Acordá contrato, accesibilidad y pruebas antes de exportarlo. |
| Pantalla para inspección visual                            | `DevUi` y fixtures locales  | No la conviertas en flujo de producto ni le agregues HTTP.    |

Una extracción vale la pena cuando el título, la descripción y una acción aparecen con la misma semántica en más de un contexto. No alcanza con que dos bloques “se parezcan”: primero definí qué problema común tienen, quién mantendrá la API y qué comportamiento accesible debe conservarse.

### Estructura didáctica no implementada: `SectionHeader`

**Ejemplo didáctico: no representa un archivo implementado actualmente.** `SectionHeader` no existe, no se exporta desde ningún módulo y no debe importarse como si fuera una API disponible. Este ejemplo muestra una posible conversación de diseño; una implementación aprobada podría ubicarse en un área compartida acordada y componer `Button` o `Card` solo si el caso lo justifica.

```tsx
import type { ReactNode } from 'react'

type SectionHeaderProps = {
  title: string
  description?: string
  action?: ReactNode
}

function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <header>
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </header>
  )
}
```

**Ejemplo didáctico: no representa un archivo implementado actualmente.** Un uso futuro, después de aprobar el contrato, podría expresar la acción como contenido en vez de obligar al encabezado a conocer una feature concreta:

```tsx
<SectionHeader
  title="Problems"
  description="Manage the problem bank."
  action={<button type="button">Create problem</button>}
/>
```

Si se aprobara, la prueba debe comprobar el encabezado semántico, título, descripción opcional y presencia/ausencia de la acción; si la acción es un `Button` existente, también su nombre accesible y estado `loading` cuando corresponda. En `DevUi`, agregá una fixture local y una muestra visual solo después de que exista la exportación real; no uses el catálogo para simular reglas de producto.

**Checklist para incorporar un componente**

- [ ] Confirmé que no existe una primitiva con el contrato necesario.
- [ ] Elegí el dueño según uso compartido, no por conveniencia de importación.
- [ ] Documenté props, valores por defecto y semántica accesible.
- [ ] Agregué prueba de comportamiento y accesibilidad proporcionada al contrato.
- [ ] Si corresponde, agregué fixture y muestra de DevUi sin HTTP ni datos de producto.
- [ ] No presenté una muestra conceptual como exportación disponible.

## Tutorial práctico: cómo consumir un endpoint

Este tutorial explica el camino contractual de `POST /api/Auth/login` **sin implementar login**. La ruta `/login` actual está reservada y muestra un placeholder; no hay servicio, hook, mutación, formulario, página de login, persistencia de sesión ni autenticación funcional en el frontend.

### 1. Partí del contrato generado

`src/types/api.generated.ts` es de solo lectura para el consumo manual: OpenAPI define `POST /api/Auth/login`, con cuerpo JSON y respuesta `200`. Los tipos exactos son:

```ts
type LoginRequest = {
  correo?: string | null
  contrasena?: string | null
}

type LoginResponse = {
  token?: string | null
  expiraEn?: string
}
```

Los campos son opcionales (y los del request además pueden ser `null`); no los conviertas en obligatorios por intuición. El contrato admite `application/json`, `text/json` y `application/*+json`; el cliente usa JSON para un objeto plano. No edites el archivo generado a mano.

### 2. Entendé endpoint, URL relativa y servicio futuro

El endpoint existente es `endpoints.auth.login === 'Auth/login'`, reexportado por `@/lib/api`. `HttpClient` une una base sin barra final con una ruta sin barra inicial. Por eso, con la base pública `/api`, `httpClient.post(..., endpoints.auth.login, ...)` termina en `POST /api/Auth/login`.

La URL relativa importa: el navegador solo conoce `/api`; en desarrollo Vite puede reenviarla al destino configurado mediante `API_PROXY_TARGET`, que no se expone al cliente. Así evitás fijar un host de API en un componente y mantenés el mismo borde de transporte para mocks y proxy.

**Ejemplo didáctico: no representa un archivo implementado actualmente.** Este sería un servicio futuro dentro de una feature aprobada; no copies sus imports como rutas existentes de una feature:

```ts
import { endpoints, httpClient } from '@/lib/api'
import type { components } from '@/types/api.generated'

type LoginRequest = components['schemas']['LoginRequest']
type LoginResponse = components['schemas']['LoginResponse']

export function login(payload: LoginRequest) {
  return httpClient.post<LoginResponse>(endpoints.auth.login, payload)
}
```

El tipo de retorno de `HttpClient.post<T>` es `Promise<T | undefined>`, porque una respuesta 204 puede no tener cuerpo. Para este contrato educativo se espera 200, pero el consumidor futuro debe manejar el resultado según su contrato aprobado.

### 3. Elegí mutación, no query, para una acción POST

Una query representa lectura cacheable; una mutación representa una acción iniciada por la persona usuaria que puede cambiar estado remoto. `QueryProvider` ya envuelve la aplicación y `@tanstack/react-query` está instalado, pero hoy no existe un helper de mutaciones del proyecto. Los defaults actuales se aplican a queries: reintentan mientras `count < 2` salvo HTTP menor a 500, usan `staleTime: 30000` y `gcTime: 300000`.

**Ejemplo didáctico: no representa un archivo implementado actualmente.** Un hook futuro podría coordinar el servicio con `useMutation`; no existe `useLogin` hoy:

```ts
import { useMutation } from '@tanstack/react-query'
import type { components } from '@/types/api.generated'

type LoginRequest = components['schemas']['LoginRequest']

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
  })
}
```

**Ejemplo didáctico: no representa un archivo implementado actualmente.** Una pantalla o componente futuro compondría los controles existentes, recibiría eventos y mostraría sus propios estados; no llamaría a `fetch` directamente:

```tsx
<form onSubmit={handleSubmit}>
  <FormField label="Correo" error={correoError}>
    <Input name="correo" type="email" autoComplete="email" />
  </FormField>
  <FormField label="Contraseña" error={contrasenaError}>
    <PasswordInput name="contrasena" autoComplete="current-password" />
  </FormField>
  {errorMessage ? <Alert tone="danger">{errorMessage}</Alert> : null}
  <Button type="submit" loading={isPending}>
    Ingresar
  </Button>
</form>
```

`FormField` conecta etiqueta, ayuda/error e identificadores a un único hijo; `Input` acepta props nativas más `error`, `PasswordInput` ofrece su control de visibilidad, `Alert` tiene `role="alert"` y `Button` con `loading` queda deshabilitado. El fragmento no declara imports ni estado porque no es un archivo implementable: su objetivo es mostrar la composición, no inventar una página.

### 4. Conocé lo que hace el transporte real

`HttpClient.post<T>(path, body?, options?)` delega en `request<T>('POST', path, { ...options, body })`. Para objetos planos serializa JSON, envía `accept: application/json` y añade `content-type: application/json`, salvo que el cuerpo sea `FormData` o ya se indique un content type. Con `FormData` no debe fijar ese encabezado: el navegador agrega el límite multipart correcto.

También acepta `AbortSignal` y `timeoutMs` (por defecto, `env.requestTimeoutMs`). Devuelve `undefined` ante 204, JSON cuando puede parsearlo y texto en otro caso. Los fallos se normalizan como `ApiError`: `kind` puede ser `'http'`, `'network'`, `'timeout'` o `'aborted'`; puede incluir `status`, `code`, `fieldErrors` y `requestId`. De Problem Details solo se conservan errores de campo cuyo valor sea `string[]`; la interfaz debe mostrar un error general o asociar errores de campo sin suponer otra forma.

La instancia por defecto usa `neutralAuthTransport`: no agrega header ni persiste nada. Existe `createBearerAuthTransport(() => string | undefined)` para añadir `Bearer <token>`, pero esta fundación no implementa adquisición de credenciales, sesión ni persistencia. Por tanto, este tutorial no promete token real ni autenticación activa.

### 5. Seguí la solicitud en desarrollo y con MSW

La secuencia futura aprobada sería:

```text
LoginRequest generado
  -> servicio futuro con httpClient.post<LoginResponse>(endpoints.auth.login, payload)
  -> useMutation futuro
  -> componente/formulario futuro
  -> POST relativo /api/Auth/login
  -> proxy de Vite hacia API_PROXY_TARGET, o handler MSW cuando los mocks están habilitados
```

MSW solo arranca antes de renderizar React cuando se cumplen **ambas** condiciones: entorno de desarrollo y `VITE_ENABLE_MOCKS=true`. Si no intercepta una solicitud, el worker deja pasar solicitudes no manejadas. El handler actual para `POST /api/Auth/login` siempre responde 200 con exactamente `{ expiraEn: '2030-01-01T00:00:00Z' }`; no inspecciona el payload y no devuelve `token`. Es una comprobación de ruta y forma de respuesta, no un comportamiento de autenticación.

### 6. Probá el flujo solo cuando la feature sea aprobada

No hay pruebas de feature de login hoy. Para una implementación futura, separá las responsabilidades:

1. Para `HttpClient`, seguí los tests que sustituyen `fetch` con `vi.stubGlobal`, y cubrí JSON, encabezados, `FormData`, 204, timeout y cancelación sin hacer red real.
2. Para el handler contractual, usá el servidor MSW existente: `setupServer(...handlers)`, `server.listen({ onUnhandledRequest: 'error' })`, `resetHandlers` después de cada prueba y `close` al finalizar. La prueba actual llama `new HttpClient().post<LoginResponse>(endpoints.auth.login)` y espera exactamente la respuesta sin token indicada arriba.
3. Para el formulario, usá React Testing Library con `render`, `screen` y `userEvent.setup()` para comprobar nombres accesibles, validación, envío, estado pendiente, éxito y cada rama de `ApiError` (HTTP, red, timeout, abortado y errores de campo cuando existan).

**Checklist antes de aprobar un consumo nuevo**

- [ ] El tipo y el path provienen de OpenAPI generado y `endpoints`, sin editar el archivo generado.
- [ ] El servicio usa `httpClient`; no hay `fetch` directo en hook o componente.
- [ ] La acción POST usa mutación; no se modeló como query de lectura.
- [ ] La UI maneja `ApiError`, estado pendiente, abortos y respuesta vacía cuando aplique.
- [ ] Las pruebas cubren transporte, handler y comportamiento accesible del formulario.
- [ ] Los mocks se describen como opt-in de desarrollo, no como autenticación ni persistencia real.
- [ ] No se reemplazó la ruta reservada ni se agregaron cookies, credenciales o sesión sin aprobación.

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
