# UPDS JUDGE

UPDS JUDGE es un proyecto académico orientado a una plataforma web para organizar concursos de programación competitiva y evaluar soluciones automáticamente. Centraliza concursos, participantes, problemas, envíos, veredictos, ranking e historial; el frontend de este repositorio aporta la base técnica para implementar esas historias de forma incremental.

> **Estado verificable:** la fundación técnica del frontend está completa. No hay flujos funcionales de registro, inicio de sesión, sesión persistente, guards, concursos, importación ZIP, evaluación con Judge0, SignalR, CI ni despliegue. El backend es un repositorio separado y su operación e integración no se verifican desde este checkout.

## Contenido

- [Objetivo y alcance](#objetivo-y-alcance)
- [Estado, sprints y backlog](#estado-sprints-y-backlog)
- [Arquitectura y repositorios](#arquitectura-y-repositorios)
- [Frontend: ejecución y arquitectura](#frontend-ejecución-y-arquitectura)
- [Documentación y evidencias](#documentación-y-evidencias)
- [Forma de trabajo](#forma-de-trabajo)
- [Calidad, seguridad y próximos pasos](#calidad-seguridad-y-próximos-pasos)

## Objetivo y alcance

### Equipo

- Wilson Yucra Rengifo
- Cristhian Joel Amador Gallardo
- Arnold Daniel Torrez Zarate
- Daniel Javier Aramayo Mancilla
- Enny Anaí Lopez Saldaña Beymar
- Beymar Angelo Vasquez Acha
- Alex Saul Fernandez Valdez

### Objetivo

Diseñar e implementar un MVP que permita administrar concursos, recibir soluciones, evaluarlas automáticamente, comunicar veredictos y calcular rankings trazables mediante un frontend independiente y un backend separado.

### Incluye en el MVP propuesto

- Gestión de identidad, acceso y roles.
- Configuración de concursos, problemas y paquetes ZIP.
- Participación, consulta de problemas y envío de soluciones en C++, Python y C#.
- Veredictos, ranking, congelamiento e historial de envíos.

### Fuera de alcance

El MVP no es un LMS completo, un IDE colaborativo en navegador, un detector de plagio ni un sistema general de gestión universitaria. Los casos de prueba no se exponen; las credenciales de Judge0 no llegan al frontend; el upsolving no modifica el ranking oficial.

## Estado, sprints y backlog

### Estado real del repositorio

| Área                           | Estado                        | Evidencia o límite                                                                                                                                        |
| ------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fundación frontend             | Completa                      | Tooling, cliente HTTP, tipos OpenAPI, Query, MSW, componentes, layouts, router y catálogo `/dev/ui`.                                                      |
| Historias de producto Sprint 1 | Pendientes                    | UJ-05, UJ-06, UJ-08 y UJ-09 no están implementadas.                                                                                                       |
| Autenticación y sesión         | Pendiente                     | No hay registro, login, persistencia de sesión ni guards funcionales.                                                                                     |
| Concursos e importación ZIP    | Pendiente                     | Solo hay rutas reservadas y componentes/fundación reutilizable.                                                                                           |
| Evaluación y tiempo real       | Pendiente/no verificable aquí | No hay integración funcional con Judge0 ni SignalR.                                                                                                       |
| Entrega operativa              | Pendiente/no verificable aquí | No hay CI ni despliegue verificables.                                                                                                                     |
| Datos                          | Referencia disponible         | [`database/script-inicial.sql`](database/script-inicial.sql) contiene un esquema de dominio PostgreSQL; no sustituye migraciones de Identity del backend. |

### Sprint 0 y Sprint 1

- **Sprint 0:** la inicialización técnica documentada está completada; las capturas manuales pendientes no bloquean ese cierre técnico.
- **Sprint 1:** la fundación técnica del frontend está completada, pero no equivale a completar las historias de producto. Permanecen pendientes **UJ-05**, **UJ-06**, **UJ-08** y **UJ-09**.
- Los artefactos de cambios técnicos se mantienen manualmente en [`docs/openspec/changes/`](docs/openspec/changes/); son documentación de cambio, no una afirmación de ejecución automatizada.

### Product backlog

La numeración canónica conserva las 15 historias de la fuente; no existe una `UJ-17`.

| ID    | Épica                     | Prioridad | Sprint planificado | Estado actual |
| ----- | ------------------------- | --------- | ------------------ | ------------- |
| UJ-05 | E01 · Identidad y acceso  | Alta      | Sprint 1           | Pendiente     |
| UJ-06 | E01 · Identidad y acceso  | Alta      | Sprint 1           | Pendiente     |
| UJ-07 | E01 · Identidad y acceso  | Alta      | Sprint 3           | Planificada   |
| UJ-08 | E02 · Concursos           | Alta      | Sprint 1           | Pendiente     |
| UJ-09 | E02 · Concursos           | Crítica   | Sprint 1           | Pendiente     |
| UJ-10 | E02 · Concursos           | Alta      | Sprint 2           | Planificada   |
| UJ-11 | E03 · Participación       | Alta      | Sprint 2           | Planificada   |
| UJ-12 | E03 · Participación       | Alta      | Sprint 2           | Planificada   |
| UJ-13 | E03 · Participación       | Alta      | Sprint 2           | Planificada   |
| UJ-14 | E04 · Envío y evaluación  | Crítica   | Sprint 2           | Planificada   |
| UJ-15 | E04 · Envío y evaluación  | Crítica   | Sprint 2           | Planificada   |
| UJ-16 | E04 · Envío y evaluación  | Media     | Sprint 3           | Planificada   |
| UJ-18 | E05 · Ranking e historial | Crítica   | Sprint 3           | Planificada   |
| UJ-19 | E05 · Ranking e historial | Alta      | Sprint 3           | Planificada   |
| UJ-20 | E05 · Ranking e historial | Alta      | Sprint 3           | Planificada   |

Consultá criterios de aceptación, estimaciones y trazabilidad en el [Product Backlog](docs/03-product-backlog.md).

## Arquitectura y repositorios

```text
Navegador
  └─ frontend/ (React + Vite)
       ├─ UI, router, estado remoto y cliente HTTP
       └─ proxy local relativo /api durante desarrollo
            └─ backend separado (API, reglas, autorización y persistencia)
                 ├─ PostgreSQL / Identity
                 ├─ Judge0 para evaluación
                 └─ SignalR para eventos en tiempo real
```

La arquitectura propuesta separa responsabilidades: el frontend presenta la interfaz y consume el contrato; el backend valida reglas y autorización; Judge0 ejecuta código; la base de datos conserva trazabilidad. La disponibilidad de esos servicios fuera del frontend no está demostrada en este repositorio.

| Repositorio                                                                     | Propósito                                        | Estado verificable desde aquí                                 |
| ------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| [UPDS-JUDGE-FRONT](https://github.com/Alex-Fernandez-2003/UPDS-JUDGE-FRONT.git) | Cliente React/Vite y documentación del proyecto. | Fundación frontend presente.                                  |
| [UPDSjudge](https://github.com/wilsonyucra413-sys/UPDSjudge)                    | Backend documentado.                             | URL documentada; no se afirma operación ni integración local. |

### Tecnología

| Área                | Tecnología                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| Frontend            | React 19, Vite 8, TypeScript 6, React Router, TanStack Query y Tailwind CSS 4.                           |
| Calidad frontend    | Vitest, React Testing Library, MSW, Oxlint y Prettier.                                                   |
| Contrato            | Swagger/OpenAPI es la fuente de verdad para DTO y rutas; los tipos se generan, no se editan manualmente. |
| Backend documentado | ASP.NET Core MVC/Web API, Identity, EF Core, PostgreSQL, Judge0 y SignalR.                               |

## Frontend: ejecución y arquitectura

### Puertos y configuración

- Desarrollo y `preview`: `http://localhost:8085` con puerto estricto.
- El cliente usa `/api`; Vite puede redirigirlo en desarrollo a `API_PROXY_TARGET`, cuyo valor local de ejemplo es `http://localhost:5185`.
- Esa configuración no prueba que el backend esté en ejecución.

### Ejecutar localmente

Desde `frontend/`:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Usá únicamente valores públicos en `VITE_*`; no incluyas secretos, tokens ni credenciales. El ejemplo de entorno define `VITE_APP_NAME`, `VITE_API_BASE_URL`, `VITE_REQUEST_TIMEOUT_MS`, `VITE_ENABLE_MOCKS`, `API_PROXY_TARGET` y `OPENAPI_SCHEMA_URL`.

| Comando                                   | Propósito                                                  |
| ----------------------------------------- | ---------------------------------------------------------- |
| `npm run dev`                             | Inicia Vite en el puerto 8085.                             |
| `npm run build`                           | Ejecuta typecheck y genera el build de producción.         |
| `npm run preview`                         | Previsualiza el build en el puerto 8085.                   |
| `npm run lint`                            | Ejecuta comprobaciones de código y la política de `fetch`. |
| `npm run typecheck`                       | Verifica los proyectos TypeScript.                         |
| `npm run format` / `npm run format:check` | Aplica o verifica el formato.                              |
| `npm run test` / `npm run test:run`       | Ejecuta Vitest y React Testing Library.                    |
| `npm run api:types`                       | Genera tipos desde el contrato OpenAPI configurado.        |

### Árbol simplificado

```text
.
├── database/
│   └── script-inicial.sql
├── docs/
│   ├── capturas/
│   ├── images/
│   ├── puml/
│   ├── openspec/changes/
│   └── 01-contexto-y-diagnostico.md … 08-sprint-0-fabrica-software.md
├── frontend/
│   ├── docs/
│   ├── public/
│   ├── scripts/
│   ├── src/
│   │   ├── components/  config/  dev/  features/  layouts/
│   │   ├── lib/  mocks/  routes/  styles/  test/  types/
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

### Criterios de arquitectura frontend

- `src/lib/api/http-client.ts` es la única frontera de transporte; componentes, páginas y hooks no llaman a `fetch` directamente.
- El flujo para una historia aprobada es: **componente → hook de feature → servicio de feature → HttpClient**.
- `src/types/api.generated.ts` deriva del contrato OpenAPI. No se edita a mano ni se inventan endpoints, DTO o estados.
- MSW es opcional y solo para desarrollo; los mocks no reemplazan el contrato ni una funcionalidad de producto.
- `/login`, `/register`, `/admin/contests` y `/admin/contests/new` son rutas reservadas; `/dev/ui` es un catálogo exclusivo de desarrollo, no una pantalla de producto.

## Documentación y evidencias

### Documentación principal

- [Índice de documentación](docs/README.md)
- [Contexto y diagnóstico](docs/01-contexto-y-diagnostico.md)
- [MVP y propuesta de valor](docs/02-mvp-y-propuesta-valor.md)
- [Product Backlog](docs/03-product-backlog.md)
- [Definition of Ready y refinamiento](docs/04-dor-y-refinamiento.md)
- [Modelado UML](docs/05-modelado-uml.md)
- [Arquitectura de datos](docs/06-arquitectura-datos.md)
- [Plan Ready to Sprint](docs/07-plan-ready-to-sprint.md)
- [Sprint 0 y acuerdos de fábrica](docs/08-sprint-0-fabrica-software.md)
- [Guía de arquitectura y desarrollo del frontend](frontend/docs/guia-arquitectura-y-desarrollo.md)
- [Informe final (PDF)](docs/informe-final.pdf) y [fuente LaTeX](docs/informe-final.tex)

### Visuales disponibles

- [Backlog de historias](docs/capturas/backlog-historias-usuario.jpg)
- [Estructura de repositorio](docs/capturas/estructura-repositorio.png)
- [Tablero Jira](docs/capturas/tablero-jira.png)
- [Modelo de contexto](docs/images/modelo-contexto.png) y [fuente PlantUML](docs/puml/modelo-contexto.puml)
- [Arquitectura de componentes](docs/images/arquitectura-componentes.png) y [fuente PlantUML](docs/puml/arquitectura-componentes.puml)
- [Formato ZIP propuesto](docs/images/formato-ZIP.png)

## Forma de trabajo

### Flujo Git documentado

1. Crear cada tarea o historia desde `develop`.
2. Trabajar en una rama específica.
3. Abrir Pull Request hacia `develop` para revisión por otro integrante.
4. Mezclar cuando cumpla el DoD; integrar `develop` a `main` al cierre del sprint si está estable.

Estas son guías documentadas del proyecto, no una política de servidor verificada.

| Tipo de rama permitido | Ejemplo                |
| ---------------------- | ---------------------- |
| `feature/`             | `feature/auth-login`   |
| `fix/`                 | `fix/navigation-guard` |
| `docs/`                | `docs/sprint-0-report` |
| `chore/`               | `chore/tooling`        |

Formato de commit: `tipo: descripción breve`.

| Tipo de commit confirmado | Uso                                         |
| ------------------------- | ------------------------------------------- |
| `feat`                    | Nueva funcionalidad                         |
| `fix`                     | Corrección                                  |
| `docs`                    | Documentación                               |
| `chore`                   | Configuración o mantenimiento               |
| `refactor`                | Mejora interna sin cambio de comportamiento |
| `test`                    | Pruebas                                     |

### Definition of Ready y Definition of Done

Antes de iniciar una historia, aplicá el [DoR documentado](docs/04-dor-y-refinamiento.md): historia con identificador, épica, prioridad, estimación y criterios verificables; permisos, datos, estados de UI, diseño, contrato o mock estable, seguridad, dependencias y estrategia de prueba definidos; sin bloqueos críticos.

Una historia está terminada cuando cumple sus criterios de aceptación, se revisa por Pull Request, tiene pruebas relevantes aprobadas, autorización y estados de error/UI validados, documentación y contrato actualizados, evidencia adjunta y una ejecución local reproducible. Para cambios de frontend, la verificación disponible es:

```bash
cd frontend
npm run format:check
npm run lint
npm run typecheck
npm run test:run
npm run build
```

### Acuerdos y estándares

- El daily documentado es diario durante el sprint, dura 10–15 minutos y usa Discord; las preguntas guía son avances, próximo trabajo y bloqueos.
- Usá `camelCase` para variables y funciones, `PascalCase` para componentes/tipos y `snake_case` para tablas y columnas SQL.
- Preferí imports `@/`, tokens semánticos y componentes compartidos antes que duplicar estilos o controles.
- Escribí pruebas de comportamiento y accesibilidad; evitá snapshots extensos y dependencias del backend.

## Calidad, seguridad y próximos pasos

### Seguridad y pruebas

- No almacenar contraseñas en texto plano.
- Validar roles en backend: ocultar una opción de UI no autoriza una acción.
- Mantener privados los casos de prueba, las salidas esperadas y las credenciales de infraestructura.
- No registrar secretos ni código fuente sensible en logs.
- Mantener las pruebas del frontend aisladas del backend cuando corresponda, con MSW como apoyo de desarrollo.

### Catálogo de componentes

El catálogo de desarrollo `/dev/ui` reúne tokens, acciones, feedback, campos, `Stepper`, `FileDropzone`, `StatCard`, `EmptyState`, `DataTable` y vistas de layouts. Los componentes compartidos cubren controles, formularios, navegación, tablas y layouts; reutilizalos antes de crear variantes nuevas. Consultá la [guía frontend](frontend/docs/guia-arquitectura-y-desarrollo.md) para sus contratos y reglas de accesibilidad.

### Próximos pasos

1. Refinar y aprobar la primera historia pendiente conforme al DoR.
2. Implementar UJ-05, UJ-06, UJ-08 y UJ-09 sin confundir la fundación con flujos de producto.
3. Alinear cada cambio con Swagger/OpenAPI antes de crear servicios o tipos.
4. Definir y validar la integración backend, Judge0, SignalR y la estrategia de entrega antes de afirmar disponibilidad operativa.
