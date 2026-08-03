# UPDS JUDGE

## Descripción

UPDS JUDGE es una plataforma web académica para concursos de programación competitiva. Este repositorio contiene el frontend React/Vite y la documentación del proyecto: presenta concursos, problemas, envíos, veredictos y rankings, y consume los servicios de UPDS JUDGE mediante contratos HTTP.

Repositorio oficial: [Frontend de UPDS JUDGE](https://github.com/Alex-Fernandez-2003/UPDS-JUDGE-FRONT).

## Estado actual del frontend

El frontend dispone de flujos funcionales de autenticación, sesión, navegación protegida, participación y administración. La interfaz usa roles visibles para separar las experiencias de usuario, administración de concursos y administración de roles.

Este repositorio contiene el frontend. Para esta auditoría, los contratos del backend y el funcionamiento del juez se consideran correctos. Su implementación interna queda fuera del alcance de este repositorio y de la auditoría documental.

## Funcionalidades principales

- Registro, inicio de sesión y sesión persistida en `sessionStorage`.
- Guards de autenticación y acceso por roles.
- `UserLayout`, `AdminLayout`, navegación de usuario y sidebar administrativo.
- Dashboard de usuario con concursos, filtros, estadísticas y envíos recientes.
- Inscripción a concursos públicos y privados, incluida la solicitud de contraseña cuando corresponde.
- Consulta contextual de problemas, PDF del set y estados de resolución.
- Envío de soluciones, consulta de veredictos y actualización posterior del historial.
- **Mis Envíos** global y envíos por concurso, con filtros y paginación.
- Ranking de concurso para usuario y dentro de **Acceso de Usuario** administrativo.
- Ranking con polling, paginación y visualización de congelamiento cuando el contrato lo indica.
- Administración de concursos: listado, filtros, creación mediante ZIP, edición y colores de globos.
- Administración de roles: consulta, búsqueda, asignación y remoción.
- Manejo visual de carga, vacío, error, estados contractuales y veredictos.

El frontend actualiza datos mediante consultas HTTP y polling donde corresponde. No incluye un cliente SignalR o WebSocket conectado.

## Tecnologías

Tecnologías principales declaradas en [`frontend/package.json`](frontend/package.json):

- React 19 y React DOM 19.
- TypeScript 5.9.
- Vite 8 y plugin React.
- React Router 8.
- TanStack Query 5.
- React Hook Form y Zod.
- Tailwind CSS 4.
- Vitest, React Testing Library y MSW.
- Oxlint y Prettier.

## Requisitos

- Node.js compatible con las dependencias de `frontend/`.
- npm, incluido habitualmente con Node.js, o pnpm 11.18.0.
- Acceso a los servicios de UPDS JUDGE configurado mediante las variables públicas del frontend.

El proyecto no declara una versión mínima de Node.js mediante `engines`; por eso este documento no fija una versión no verificable. pnpm puede ejecutarse como instalación directa o mediante Corepack; Corepack es opcional y npm continúa soportado.

## Configuración

La configuración de ejemplo está en [`frontend/.env.example`](frontend/.env.example). No guardes secretos, tokens ni credenciales en variables `VITE_*`, porque Vite las expone al navegador.

Variables confirmadas en el código y el tooling:

```env
VITE_APP_NAME=<NOMBRE_VISIBLE>
VITE_API_BASE_URL=<RUTA_RELATIVA_QUE_COMIENZA_CON_SLASH>
VITE_REQUEST_TIMEOUT_MS=<MILISEGUNDOS_POSITIVOS>
VITE_ENABLE_MOCKS=<true_o_false>
API_PROXY_TARGET=<URL_DEL_BACKEND_PARA_EL_PROXY_DE_DESARROLLO>
OPENAPI_SCHEMA_URL=<URL_DEL_ESQUEMA_OPENAPI>
```

| Variable                  | Uso                                                                             | Requisito o valor predeterminado documentado                       |
| ------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `VITE_APP_NAME`           | Nombre visible de la aplicación.                                                | Obligatoria.                                                       |
| `VITE_API_BASE_URL`       | Prefijo público usado por el cliente HTTP.                                      | Obligatoria; debe ser una ruta relativa que comience con `/`.      |
| `VITE_REQUEST_TIMEOUT_MS` | Timeout del cliente HTTP.                                                       | Obligatoria; número positivo en milisegundos.                       |
| `VITE_ENABLE_MOCKS`       | Habilita los mocks de desarrollo.                                               | Opcional; `false` cuando se omite.                                  |
| `API_PROXY_TARGET`        | Destino del proxy `/api` usado por Vite en desarrollo.                          | Tooling; por defecto `http://localhost:5185`.                       |
| `OPENAPI_SCHEMA_URL`      | Esquema consumido por el script `api:types` mediante npm o pnpm.                | Tooling; obligatorio solo al regenerar tipos, sin valor implícito. |

Las variables `VITE_*` se incorporan al bundle y nunca deben contener secretos. `API_PROXY_TARGET` y `OPENAPI_SCHEMA_URL` son variables de tooling y no se exponen mediante `import.meta.env` en el navegador.

## Gestores de paquetes soportados

El frontend admite npm y pnpm. Ambos consumen el mismo [`frontend/package.json`](frontend/package.json), ejecutan los mismos scripts y conservan su propio lockfile. Todos los comandos siguientes parten de la carpeta ejecutable:

```bash
cd frontend
```

### Opción A — npm

npm utiliza `package-lock.json`. Para una instalación reproducible:

```bash
npm ci
```

### Opción B — pnpm

La versión validada es pnpm 11.18.0 y utiliza `pnpm-lock.yaml`. Si pnpm está instalado directamente:

```bash
pnpm install --frozen-lockfile
```

Corepack es una alternativa opcional que permite invocar la versión validada sin habilitarlo globalmente:

```bash
corepack pnpm@11.18.0 install --frozen-lockfile
```

Podés crear tu configuración local a partir de `.env.example` sin versionar valores sensibles.

### Comandos equivalentes

| Acción | npm | pnpm |
| --- | --- | --- |
| Instalar de forma reproducible | `npm ci` | `pnpm install --frozen-lockfile` |
| Desarrollo | `npm run dev` | `pnpm run dev` |
| Lint | `npm run lint` | `pnpm run lint` |
| Typecheck | `npm run typecheck` | `pnpm run typecheck` |
| Pruebas interactivas | `npm run test` | `pnpm run test` |
| Pruebas no interactivas | `npm run test:run` | `pnpm run test:run` |
| Build | `npm run build` | `pnpm run build` |
| Preview | `npm run preview` | `pnpm run preview` |
| Aplicar formato | `npm run format` | `pnpm run format` |
| Comprobar formato | `npm run format:check` | `pnpm run format:check` |
| Regenerar tipos deliberadamente | `npm run api:types` | `pnpm run api:types` |

La generación de tipos modifica archivos generados y debe ejecutarse solamente cuando se actualice deliberadamente el contrato. No fue ejecutada para incorporar pnpm.

La configuración actual de Vite usa el puerto estricto `8085` para desarrollo y preview. Las solicitudes a `/api` se redirigen al destino configurado por `API_PROXY_TARGET`. El build ejecuta TypeScript y Vite y genera `frontend/dist/`.

### No mezclar instalaciones

No alternes npm y pnpm sobre el mismo `node_modules`. Si cambiás de gestor, eliminá únicamente el `node_modules` local y reinstalá con el gestor elegido; no elimines lockfiles. Para comparar ambos flujos, utilizá copias o directorios de trabajo separados.

### Política de lockfiles

- `package-lock.json` corresponde a npm.
- `pnpm-lock.yaml` corresponde a pnpm.
- Ambos están versionados y deben representar el mismo `package.json`.
- No edites lockfiles manualmente ni elimines uno para favorecer al otro.
- Un cambio de dependencias no está completo hasta actualizar y validar ambos lockfiles.

### Mantenimiento de dependencias

Para agregar, retirar o actualizar intencionalmente una dependencia:

1. Definí el cambio y la versión objetivo en `package.json`; no uses actualizaciones generales.
2. Desde un entorno npm limpio, ejecutá `npm install --package-lock-only --ignore-scripts` para actualizar `package-lock.json`.
3. Ejecutá `pnpm import` con pnpm 11.18.0 para reconciliar `pnpm-lock.yaml` desde el lockfile npm.
4. En instalaciones separadas, ejecutá `npm ci` y `pnpm install --frozen-lockfile`.
5. Ejecutá lint, typecheck, `test:run` y build con ambos gestores y revisá el diff de los tres archivos.

`pnpm-workspace.yaml` no convierte este repositorio en un monorepo: conserva únicamente configuración pnpm necesaria para overrides equivalentes y para permitir el postinstall comprobado de MSW.

## Despliegue del frontend

### Camino verificado

1. Instalá Node.js y elegí npm o pnpm 11.18.0. El proyecto no fija una versión mínima mediante `engines`.
2. Cloná o abrí el [repositorio frontend](https://github.com/Alex-Fernandez-2003/UPDS-JUDGE-FRONT).
3. Ingresá a `frontend/` y ejecutá `npm ci` o `pnpm install --frozen-lockfile`, sin compartir `node_modules` entre gestores.
4. Creá una configuración local o de build a partir de `.env.example`, sin versionar valores sensibles.
5. Configurá las variables públicas y de tooling descritas en la sección anterior.
6. Durante desarrollo, ejecutá `npm run dev` o `pnpm run dev`.
7. Para producción, ejecutá `npm run build` o `pnpm run build`.
8. Verificá `frontend/dist/` con `npm run preview` o `pnpm run preview` antes de publicar.
9. Publicá el contenido de `frontend/dist/` en el hosting estático o plataforma seleccionada por el responsable del despliegue.

El repositorio no contiene `vercel.json`, `netlify.toml`, Dockerfile de frontend ni una configuración Nginx. Por eso no se prescribe una plataforma ni se afirma la existencia de un archivo de despliegue específico.

### Fallback para navegación SPA

React Router resuelve rutas en el cliente. El hosting debe redirigir las rutas no físicas de la aplicación hacia `index.html`; de lo contrario, una recarga o acceso directo puede producir un 404 en rutas como:

```text
/login
/student/...
/admin/...
```

La regla de fallback no debe convertir solicitudes de API en HTML. El prefijo configurado por `VITE_API_BASE_URL` —`/api` en el ejemplo actual— debe dirigirse al backend mediante el proxy o mecanismo equivalente de la plataforma. Como el cliente exige una ruta relativa, el despliegue debe ofrecer ese prefijo bajo el mismo origen o mediante una capa de proxy compatible.

### Verificación posterior

- Abrí la portada y las rutas directas `/login`, `/student/...` y `/admin/...` según los permisos disponibles.
- Recargá una ruta interna y confirmá que el hosting devuelve `index.html`, no un 404.
- Confirmá que las solicitudes bajo el prefijo API llegan al backend y no al fallback SPA.
- Verificá login, carga de concursos y manejo de errores sin exponer tokens o credenciales.
- Revisá en la consola y en la red del navegador que no existan rutas de assets rotas.

## Servicios relacionados

| Servicio | Enlace | Propósito y guía |
| --- | --- | --- |
| Backend de UPDS JUDGE | [Repositorio backend](https://github.com/wilsonyucra413-sys/UPDSjudge) · [Guía de instalación](https://github.com/wilsonyucra413-sys/UPDSjudge#readme) | API y reglas del sistema. La instalación completa se mantiene en ese repositorio. |
| Imagen Docker del backend | [Imagen `wilson53510/updsjudge-backend`](https://hub.docker.com/r/wilson53510/updsjudge-backend) | Artefacto publicado del backend. Consultá las instrucciones y tags en el recurso Docker. |
| Juez y entorno Docker | [Judge0 CE v1.13.1](https://github.com/judge0/judge0/tree/v1.13.1) | Motor de evaluación. Consultá la guía del repositorio versionado para levantar su entorno Docker. |
| Documentación técnica frontend | [Guía de arquitectura y desarrollo](frontend/docs/guia-arquitectura-y-desarrollo.md) | Convenciones, estructura y decisiones de desarrollo del frontend. |
| Auditoría documental del frontend | [Informe aprobado](docs/auditorias/auditoria-documentacion-frontend-estado-actual.md) | Estado reconciliado, evidencias y límites de la revisión del frontend. |
| Informe final | [PDF académico](docs/informe-final.pdf) | Consolidación académica de requerimientos, arquitectura, ejecución, trazabilidad y resultados. |

El backend y el juez tienen ciclos de instalación propios. Este README no replica sus guías ni afirma haber inspeccionado su implementación interna.

## Estructura principal

```text
.
├── docs/                       # Historias, retrospectivas, auditorías y changes OpenSpec
├── frontend/
│   ├── docs/                   # Guía técnica del frontend
│   ├── public/                 # Recursos públicos
│   ├── scripts/                # Generación de tipos de API
│   └── src/
│       ├── components/         # Componentes compartidos y navegación
│       ├── config/             # Configuración pública validada
│       ├── features/           # Módulos funcionales
│       ├── layouts/            # Layouts de usuario y administración
│       ├── lib/                # Cliente HTTP, auth y utilidades
│       ├── mocks/              # Manejadores MSW
│       ├── routes/             # Router, guards y builders
│       ├── test/               # Configuración de pruebas
│       └── types/              # Tipos generados del contrato
└── README.md
```

## Rutas o módulos principales

El router vigente está definido en [`frontend/src/routes/router.tsx`](frontend/src/routes/router.tsx) y sus builders en [`frontend/src/routes/constants.ts`](frontend/src/routes/constants.ts).

| Área                | Rutas o módulos representativos                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Acceso              | `/login`, `/register`                                                                                                             |
| Usuario             | `/student/concursos`, `/student/history`                                                                                          |
| Concurso de usuario | `/student/contests/:contestCode/problems`, `/student/contests/:contestCode/submissions`, `/student/contests/:contestCode/ranking` |
| Administración      | `/admin/dashboard`, `/admin/contests`, `/admin/contests/new`, `/admin/contests/:contestCode/edit`                                 |
| Acceso de Usuario   | `/admin/user-access/contests`, `/admin/user-access/submissions` y vistas contextuales de problemas, envíos y ranking              |
| Roles               | `/admin/roles`                                                                                                                    |
| Desarrollo          | `/dev/ui`, disponible únicamente en modo de desarrollo                                                                            |

Las rutas protegidas aplican `ProtectedRoute` y `RoleRoute` según el contexto. Los endpoints HTTP se centralizan aparte y no deben confundirse con las URLs de navegación.

## Pruebas y calidad

El frontend cuenta con una suite automatizada ejecutable mediante `npm run test:run` o `pnpm run test:run`. Las verificaciones disponibles incluyen lint, typecheck, formato, tests, build y auditoría de dependencias con el gestor elegido.

Los resultados obtenidos durante la auditoría documental —incluidas las limitaciones del entorno local— están registrados con su contexto en el [informe de auditoría del frontend](docs/auditorias/auditoria-documentacion-frontend-estado-actual.md). No se presenta una cifra histórica como cantidad permanente de pruebas.

## Documentación

- [Índice de documentación](docs/README.md)
- [Product Backlog](docs/03-product-backlog.md)
- [Historias de usuario](docs/historias/)
- [Retrospectivas](docs/retrospectivas/)
- [Changes OpenSpec](docs/openspec/changes/)
- [Guía de arquitectura y desarrollo del frontend](frontend/docs/guia-arquitectura-y-desarrollo.md)
- [Auditoría documental del estado actual del frontend](docs/auditorias/auditoria-documentacion-frontend-estado-actual.md)

## Trabajo futuro

Las siguientes acciones están documentadas como propuestas y no forman parte de las funcionalidades implementadas:

- **Versiones estables de lenguajes:** propuesta pendiente de priorización y no implementada.
- **Configuración y actualización de datos personales:** propuesta pendiente de priorización y no implementada. No existe una página de configuración o perfil editable en el frontend actual.

Cualquier trabajo futuro debe validarse contra el router, los módulos existentes y los contratos consumidos antes de documentarlo como disponible.

## Alcance de este repositorio

El alcance ejecutable de este repositorio es el frontend ubicado en `frontend/`, junto con la documentación del proyecto. El frontend consume servicios externos de UPDS JUDGE, pero no contiene ni audita la implementación interna del backend o del juez.
