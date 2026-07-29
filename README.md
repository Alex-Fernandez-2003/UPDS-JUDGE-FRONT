# UPDS JUDGE

## Descripción

UPDS JUDGE es una plataforma web académica para concursos de programación competitiva. Este repositorio contiene el frontend React/Vite y la documentación del proyecto: presenta concursos, problemas, envíos, veredictos y rankings, y consume los servicios de UPDS JUDGE mediante contratos HTTP.

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

- Node.js y npm compatibles con las dependencias y el lockfile de `frontend/`.
- Acceso a los servicios de UPDS JUDGE configurado mediante las variables públicas del frontend.

El proyecto no declara una versión mínima de Node.js mediante `engines`; por eso este documento no fija una versión no verificable.

## Configuración

La configuración de ejemplo está en [`frontend/.env.example`](frontend/.env.example). No guardes secretos, tokens ni credenciales en variables `VITE_*`, porque Vite las expone al navegador.

Variables confirmadas en el código:

```env
VITE_APP_NAME=<NOMBRE_VISIBLE>
VITE_API_BASE_URL=<RUTA_RELATIVA_QUE_COMIENZA_CON_SLASH>
VITE_REQUEST_TIMEOUT_MS=<MILISEGUNDOS_POSITIVOS>
VITE_ENABLE_MOCKS=<true_o_false>
API_PROXY_TARGET=<URL_DEL_SERVICIO_PARA_EL_PROXY_DE_DESARROLLO>
```

`VITE_API_BASE_URL` debe ser una ruta relativa que comience con `/`. `API_PROXY_TARGET` configura el proxy de Vite durante desarrollo y no es una variable pública del navegador.

## Instalación

Ejecutá los comandos desde `frontend/`:

```bash
cd frontend
npm install
```

Podés crear tu configuración local a partir de `.env.example` sin versionar valores sensibles.

## Ejecución en desarrollo

Desde `frontend/`:

```bash
npm run dev
```

La configuración actual de Vite usa el puerto estricto `8085` para desarrollo y preview. Las solicitudes a `/api` se redirigen al destino configurado por `API_PROXY_TARGET`.

## Scripts disponibles

Los scripts siguientes existen en [`frontend/package.json`](frontend/package.json):

| Script                 | Propósito                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| `npm run dev`          | Iniciar el servidor de desarrollo Vite.                          |
| `npm run build`        | Ejecutar TypeScript y generar el build de producción.            |
| `npm run preview`      | Previsualizar el build generado.                                 |
| `npm run lint`         | Ejecutar Oxlint.                                                 |
| `npm run typecheck`    | Verificar los proyectos TypeScript sin emitir archivos.          |
| `npm run format`       | Aplicar Prettier al frontend.                                    |
| `npm run format:check` | Comprobar el formato sin aplicar cambios.                        |
| `npm run test`         | Ejecutar Vitest en modo interactivo.                             |
| `npm run test:run`     | Ejecutar una corrida única de Vitest.                            |
| `npm run api:types`    | Regenerar tipos TypeScript desde el esquema OpenAPI configurado. |

La generación de tipos modifica archivos generados y debe ejecutarse solamente cuando se actualice deliberadamente el contrato.

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

El frontend cuenta con una suite automatizada ejecutable mediante `npm run test:run`. Las verificaciones disponibles incluyen lint, typecheck, formato, tests, build y auditoría de dependencias con npm.

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
