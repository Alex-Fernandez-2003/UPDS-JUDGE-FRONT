# Auditoría de documentación del frontend — UPDS JUDGE

## 1. Objetivo

Reconciliar `README.md` y la documentación textual permitida bajo `docs/` con el estado verificable del frontend actual, sin modificar código, dependencias, evidencias manuales, imágenes ni el informe final.

**Resultado:** el documento principal de entrada, la documentación operativa y las notas históricas seleccionadas fueron corregidos; el change `audit-reconcile-frontend-documentation-current-state` permanece activo y pendiente de aprobación manual.

## 2. Alcance

- `README.md` de la raíz, auditado como documento principal de entrada y de estado actual.
- Código y configuración bajo `frontend/`, inspeccionados en modo de solo lectura.
- Documentos bajo `docs/`, incluidos documentos raíz, historias, changes activos y archivados, retrospectivas y PlantUML.
- Rutas, layouts, guards, navegación, servicios, hooks, query keys, mappers, tipos generados, tests, mocks y fixtures del frontend.
- Enlaces locales, referencias a código, capturas, imágenes y fuentes PlantUML.

## 3. Restricciones

- Escritura exclusiva en `README.md` y archivos textuales permitidos bajo `docs/`; `README.md` fue la única excepción fuera de `docs/`.
- Sin cambios en `frontend/`, dependencias o tipos generados.
- Sin inspección de backend, juez, servicios externos o repositorios adicionales.
- Sin `dotnet`, instalación de dependencias, generación OpenAPI, formatters globales, commit, push o archive.
- Sin creación o modificación de capturas, imágenes o evidencias manuales.

## 4. Metodología

1. Se detectó la raíz real y la rama.
2. Se registró el baseline Git y las guardas de exclusión.
3. Se inventarió `docs/` antes de aplicar correcciones.
4. Se leyó completamente `README.md` y se contrastó con scripts, configuración, router, layouts, features, servicios, tipos, mocks, tests y documentación reconciliada.
5. Se inspeccionaron los 190 archivos de `frontend/src/` mediante lectura directa, inventario estructural y extracción de imports, exports, rutas, llamadas HTTP y escenarios de test.
6. Se contrastaron router, layouts y código de producción antes de usar tests, mocks o documentos como evidencia.
7. Se corrigieron contradicciones objetivas con cambios mínimos.
8. Se ejecutaron validaciones documentales y scripts frontend seguros.
9. Se verificó el diff contra la whitelist `README.md` + documentos textuales permitidos bajo `docs/`.

## 5. Fuentes de verdad revisadas

Prioridad aplicada:

1. `frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig*.json` y configuración pública usada por el frontend.
2. `frontend/src/routes/router.tsx` y `frontend/src/routes/constants.ts`.
3. Layouts, guards, navegación y páginas conectadas.
4. Features y componentes de producción.
5. Servicios, hooks, query keys, mappers y normalizadores.
6. `frontend/src/types/api.generated.ts` como contrato expuesto.
7. Tests actuales, mocks y fixtures.
8. Historias, changes, retrospectivas y planificación, respetando su contexto histórico.

## 6. Inventario funcional del frontend

| Módulo                                 | Ruta o exposición                                    | Evidencia principal                                                                                    | Estado comprobado                                      |
| -------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Registro                               | `/register`                                          | `features/auth/Pages/RegisterPage.tsx`, `RegisterForm.tsx`, `Auth/register`                            | IMPLEMENTADO                                           |
| Login y sesión                         | `/login`; `sessionStorage.token`                     | `LoginPage.tsx`, `identity.ts`, `session.ts`, `auth-transport.ts`                                      | IMPLEMENTADO                                           |
| Guards y roles                         | Rutas privadas y administrativas                     | `ProtectedRoute.tsx`, `RoleRoute.tsx`, roles `Usuario`, `AdministradorConcursos`, `AdministradorRoles` | IMPLEMENTADO                                           |
| Layout de usuario                      | Inicio, Concursos, Mis envíos                        | `layouts/UserLayout/index.tsx`                                                                         | IMPLEMENTADO                                           |
| Layout administrativo                  | Sidebar desktop/móvil y menú                         | `layouts/AdminLayout/index.tsx`, `AdminSidebar.tsx`                                                    | IMPLEMENTADO                                           |
| Concursos de usuario                   | `/student/concursos`                                 | `UserDashboardPage`, `UserContestsPage`, `ContestCard`                                                 | IMPLEMENTADO                                           |
| Inscripción                            | Modal público/privado y privado finalizado           | `access-policy.ts`, `JoinContestModal.tsx`, `ParticipanteConcursos/unirse`                             | IMPLEMENTADO                                           |
| Administración de concursos            | `/admin/contests`                                    | `ContestsAdminScreen.tsx`, lista, resumen, filtros y paginación                                        | IMPLEMENTADO                                           |
| Crear concurso                         | `/admin/contests/new`                                | `CreateContestPage.tsx`, mapper multipart, ZIP                                                         | IMPLEMENTADO                                           |
| Editar concurso                        | `/admin/contests/:contestCode/edit`                  | `EditContestPage.tsx`, GET/PUT contractual                                                             | IMPLEMENTADO                                           |
| Problemas y PDF                        | Rutas contextuales de usuario y administración       | `ContestProblemsPage.tsx`, `ProblemsTable.tsx`, `problem-status.ts`                                    | IMPLEMENTADO                                           |
| Envíos contextuales                    | Rutas `.../:contestCode/submissions`                 | `SubmissionsPage.tsx`, `SubmitForm`, `SubmissionsTable`                                                | IMPLEMENTADO CON LIMITACIONES                          |
| Historial global                       | `/student/history`, `/admin/user-access/submissions` | `UserHistoryContent`, filtros y paginación server-side                                                 | IMPLEMENTADO                                           |
| Ranking                                | Rutas contextuales de usuario y administración       | `RankingPage.tsx`, mapper, polling de 10 s, countdown y paginación                                     | IMPLEMENTADO                                           |
| Globos                                 | Ranking, edición y modal administrativo              | `domain/balloon-colors.ts`, `GlobeIllustration.tsx`                                                    | IMPLEMENTADO                                           |
| Roles                                  | `/admin/roles`                                       | `features/administration/`, services, hooks y tabla                                                    | IMPLEMENTADO                                           |
| 404 y redirects                        | `/`, `/student`, `/dashboard`, wildcard              | `router.tsx`                                                                                           | IMPLEMENTADO                                           |
| Push en tiempo real                    | Sin ruta o cliente conectado                         | `frontend/src/lib/realtime/` solo contiene `.gitkeep`                                                  | NO IMPLEMENTADO; el historial se actualiza por HTTP    |
| Perfil editable                        | Sin ruta, página ni servicio                         | Router y features actuales                                                                             | PROPUESTO; NO IMPLEMENTADO                             |
| Nuevas versiones estables de lenguajes | Selector local actual C++ 17, Python 3 y C#          | `SubmitForm.tsx`                                                                                       | PROPUESTO; NO IMPLEMENTADO como ampliación contractual |

## 7. Inventario documental

### Resumen del baseline

| Clasificación                                                     |            Cantidad | Política aplicada                                    |
| ----------------------------------------------------------------- | ------------------: | ---------------------------------------------------- |
| Documento principal de entrada y estado actual (`README.md` raíz) |                   1 | Reconciliado contra el frontend                      |
| Documento de estado actual bajo `docs/`                           |                   1 | Reconciliado                                         |
| Planificación/documento histórico raíz                            |                   8 | Preservado con notas de vigencia cuando correspondía |
| Historia de usuario                                               |                  13 | Revisada individualmente                             |
| Artefacto de change activo                                        |    52 en 13 changes | Revisado; ningún change archivado o cerrado          |
| Artefacto de change archivado                                     |     12 en 3 changes | Preservado como histórico                            |
| Retrospectiva                                                     |                   3 | Preservada con notas posteriores                     |
| Fuente PlantUML                                                   |                   9 | Revisada; una fuente corregida                       |
| Captura/evidencia manual                                          |                  62 | Solo existencia, casing y extensión                  |
| Imagen PNG                                                        |                  12 | Solo existencia, casing y extensión                  |
| Informe final excluido                                            | 2 (`.tex` y `.pdf`) | No reconciliado ni compilado                         |
| Configuración OpenSpec                                            |                   1 | Leída, sin cambios                                   |

El baseline contenía 175 archivos bajo `docs/`. Este informe agrega un archivo textual y deja 176 archivos en el árbol documental.

### Documentos raíz bajo `docs/`

`01-contexto-y-diagnostico.md`, `02-mvp-y-propuesta-valor.md`, `03-product-backlog.md`, `04-dor-y-refinamiento.md`, `05-modelado-uml.md`, `06-arquitectura-datos.md`, `07-plan-ready-to-sprint.md`, `08-sprint-0-fabrica-software.md` y `docs/README.md` fueron revisados. Los documentos 01, 06, 07, 08 y el índice recibieron notas o correcciones objetivas; los demás conservaron su naturaleza histórica o de planificación.

## README principal

### Estado anterior

El `README.md` raíz seguía describiendo el repositorio como una fundación sin flujos funcionales. Marcaba registro, login, sesión, guards, concursos e importación ZIP como pendientes; trataba el router de producto como reservado; presentaba TypeScript 6 aunque `package.json` declara 5.9; y proponía como próximos pasos historias ya implementadas.

### Hallazgos y correcciones

- Se reclasificó como documento principal de entrada y de estado actual.
- Se reemplazó el estado preimplementación por un resumen respaldado de autenticación, sesión, layouts, concursos, inscripción, problemas, envíos, rankings, edición, globos y roles.
- Se separó la actualización HTTP/polling del push realtime no implementado.
- Se documentaron únicamente tecnologías y scripts presentes en `frontend/package.json` y configuración verificable de Vite/TypeScript.
- Se distinguió la raíz del repositorio de `frontend/` para instalación y ejecución.
- Se documentaron solo nombres públicos de variables confirmados, sin valores reales ni secretos.
- Se actualizaron estructura y rutas principales contra el router actual.
- Se retiraron estados de backlog obsoletos y se conservaron las dos propuestas del Sprint 3 como no implementadas.
- Se añadió el enlace a este informe y se comprobaron todos los destinos locales finales.

### Fuentes revisadas

`frontend/package.json`, `frontend/vite.config.ts`, `frontend/tsconfig*.json`, `frontend/src/config/env.ts`, router, constantes de rutas, layouts, navegación, features, servicios, tipos, mocks, tests y documentación reconciliada.

### Estado final

`README.md` quedó como entrada práctica y mantenible, sin rutas absolutas locales, secretos, comandos inventados, variables inventadas ni afirmaciones internas sobre backend o juez. Es la única excepción de escritura fuera de `docs/`.

## 8. Matriz frontend-documentación

| Área                   | Documento                 | Afirmación anterior                                                               | Estado comprobado                                                                                 | Acción aplicada                                           |
| ---------------------- | ------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| README principal       | `README.md`               | Fundación sin features; historias implementadas marcadas pendientes; TypeScript 6 | Frontend funcional; TypeScript 5.9; scripts, variables y rutas verificables                       | Reescritura proporcionada como documento de estado actual |
| Autenticación          | UJ-05 y UJ-06             | Backend/E2E y capturas pendientes; respuesta de login con campos no consumidos    | Registro y login implementados; contrato actual usa `token` y `expiraEn`; capturas presentes      | Estado y contrato corregidos; backend asumido correcto    |
| Layouts                | Retrospectiva Sprint 2    | Acceso administrativo y contexto reutilizable no implementados                    | `AdminLayout`, `UserLayout` y `ContestContextHeader` conectados                                   | Nota posterior agregada                                   |
| Roles visibles         | UJ-07                     | Feature bajo `features/roles/` y nombres de archivos antiguos                     | Feature actual bajo `features/administration/`                                                    | Rutas y nombres corregidos                                |
| Concursos              | UJ-08 administración      | Links a archivos movidos e inexistentes                                           | Código actual bajo `features/contests/admin/`                                                     | Referencias reemplazadas                                  |
| Creación/ZIP           | UJ-08/UJ-09               | Navegación, listado y transporte autenticado pendientes                           | Sidebar, router, lista y Bearer transport integrados                                              | Pendientes obsoletos reconciliados                        |
| Problemas              | UJ-13                     | `features/problems/` inexistente y endpoint antiguo                               | Feature y rutas de usuario/admin conectadas; mapper `ACCEPTED/UNSOLVED/NOT ATTEMPTED`             | Estado, endpoint y etiquetas corregidos                   |
| Envíos                 | UJ-14/UJ-15               | Actualización “en tiempo real” y paths antiguos                                   | HTTP + nueva consulta; sin cliente SignalR; paths actuales conservan nombres `sumbit*` del código | Limitación y archivos reales documentados                 |
| Historial global       | UJ-20                     | Filtros, backend y capturas pendientes; paths inexistentes                        | Filtros concurso/resultado y paginación implementados; capturas presentes                         | Estado y paths corregidos                                 |
| Ranking                | UJ-18 y hotfix            | Ruta admin, normalización y datos corregidos posteriormente                       | Ambas rutas registradas, mapper estricto, fila actual resaltada                                   | Confirmado y trazado sin reabrir changes                  |
| Rutas administrativas  | Retrospectivas Sprint 2/3 | Acceso de Usuario futuro                                                          | Concursos, Mis Envíos, Problemas, envíos contextuales y Ranking bajo `AdminLayout`                | Nota posterior y matriz actual                            |
| Retrospectiva Sprint 3 | Sprint 3                  | Dos propuestas con estado implícito                                               | No existen perfil editable ni ampliación contractual de lenguajes                                 | Estados explícitos agregados                              |
| Tests                  | UJ-11, UJ-18, UJ-19       | Cifras históricas tratables como presentes                                        | Validación final: 34 archivos y 145 tests aprobados                                               | Cifras históricas contextualizadas                        |
| Diagramas              | `modelo-contexto.puml`    | Conexión SignalR actual                                                           | No existe cliente realtime conectado                                                              | Fuente PlantUML aclarada; PNG no regenerado               |

## 9. Historias revisadas

| Historia/documento                                                                                 | Estado actual                                                         |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `UJ-05-register-crear-cuenta-acceso-plataforma.md`                                                 | IMPLEMENTADO; contrato y evidencias reconciliados                     |
| `UJ-06-login-autenticacion-token-roles.md`                                                         | IMPLEMENTADO; sesión, claims y contrato reconciliados                 |
| `UJ-07proceso-implementacion-admin-roles.md`                                                       | IMPLEMENTADO; paths actuales corregidos                               |
| `UJ08-administracion-concursos-estructurado.md`                                                    | IMPLEMENTADO; feature admin y links corregidos                        |
| `UJ08-UJ09-crear-concurso-importar-zip.md`                                                         | IMPLEMENTADO; integración posterior documentada                       |
| `UJ-11-lista-concursos-filtrados.md`                                                               | IMPLEMENTADO; inscripción, problemas e historial global reconciliados |
| `UJ-12-inscripcion-concurso-privado.md`                                                            | IMPLEMENTADO; conservado                                              |
| `UJ-13-Lista de incisos y acceso al PDF del set de problemas.md`                                   | IMPLEMENTADO; endpoint, estados y feature corregidos                  |
| `UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md`                                        | IMPLEMENTADO CON LIMITACIONES; sin push realtime                      |
| `UJ-18-proceso-implementacion-ranking-concurso.md`                                                 | IMPLEMENTADO; preservado                                              |
| `UJ-18-fix-regresion-datos-ranking-ruta-administrativa.md`                                         | Hotfix activo y aplicado; preservado                                  |
| `UJ-19-proceso-implementacion-edicion-concurso-congelamiento-colores-globos.md`                    | IMPLEMENTADO; preservado                                              |
| `UJ-20-Como-usuario,-quiero-ver-todos-mis-envíos-con-filtros-por-concurso-y-resultado-obtenido.md` | IMPLEMENTADO; filtros, rutas y evidencias reconciliados               |

## 10. Retrospectivas

- **Sprint 1:** conserva que UJ-11 era futura en ese momento; se agregó una nota sobre la implementación posterior.
- **Sprint 2:** conserva cuatro acuerdos originalmente futuros; se agregó una actualización sobre su implementación posterior sin atribuirla retrospectivamente.
- **Sprint 3:** conserva entregables y aprendizajes; las dos acciones futuras recibieron estado explícito.

## 11. Estado de las propuestas del Sprint 3

### Versiones estables de lenguajes

**PROPUESTO — NO IMPLEMENTADO — PENDIENTE DE PRIORIZACIÓN.**

El selector actual ofrece una base local relacionada, pero no demuestra una ampliación contractual ni nuevas versiones estables del juez. La acción propuesta no se considera implementada.

### Actualización de datos personales

**PROPUESTO — NO IMPLEMENTADO — PENDIENTE DE PRIORIZACIÓN.**

La identidad visible y el menú de usuario son una base relacionada, pero no existe ruta, pantalla, formulario ni servicio de perfil editable. La acción propuesta no se considera implementada.

## 12. Rutas y navegación

| Ruta                                                   | Builder                          | Página/contenido                 | Layout                 | Guard                         |
| ------------------------------------------------------ | -------------------------------- | -------------------------------- | ---------------------- | ----------------------------- |
| `/login`                                               | `routes.login`                   | `LoginPage`                      | Auth template          | Pública                       |
| `/register`                                            | `routes.register`                | `RegisterPage`                   | Auth template          | Pública                       |
| `/student`                                             | `routes.studentHome`             | Redirect a `/student/concursos`  | —                      | Redirect                      |
| `/student/concursos`                                   | `routes.studentListCompetitions` | `UserDashboardPage`              | `UserLayout`           | Sesión + `Usuario`            |
| `/student/history`                                     | `routes.userHistory`             | `UserHistoryPage`                | `UserLayout`           | Sesión + `Usuario`            |
| `/student/contests/:contestCode/problems`              | `studentContestProblems`         | `ContestProblemsPage`            | `UserLayout`           | Sesión + `Usuario`            |
| `/student/contests/:contestCode/submissions`           | `studentContestSubmissions`      | `SubmissionsPage`                | `UserLayout`           | Sesión + `Usuario`            |
| `/student/contests/:contestCode/ranking`               | `studentContestRanking`          | `RankingPage`                    | `UserLayout`           | Sesión + `Usuario`            |
| `/dashboard`                                           | `legacyDashboard`                | Redirect a `/admin/dashboard`    | —                      | Redirect                      |
| `/admin/dashboard`                                     | `dashboard`                      | `AdminContestsPage`              | `AdminLayout`          | Sesión + rol admin            |
| `/admin/contests`                                      | `contests`                       | `AdminContestsPage`              | `AdminLayout`          | `AdministradorConcursos`      |
| `/admin/contests/new`                                  | `newContest`                     | `CreateContestPage`              | `AdminLayout`          | `AdministradorConcursos`      |
| `/admin/contests/:contestCode/edit`                    | `editContest`                    | `EditContestPage`                | `AdminLayout`          | `AdministradorConcursos`      |
| `/admin/roles`                                         | `adminRoleList`                  | `AdminRolesPage`                 | `AdminLayout`          | `AdministradorRoles`          |
| `/admin/user-access/contests`                          | `adminUserContests`              | `UserContestsPage` reutilizada   | `AdminLayout`          | Rol admin                     |
| `/admin/user-access/submissions`                       | `adminUserSubmissions`           | `UserHistoryContent` reutilizado | `AdminLayout`          | Rol admin                     |
| `/admin/user-access/contests/:contestCode/problems`    | `adminUserContestProblems`       | `ContestProblemsContent`         | `AdminLayout`          | Rol admin                     |
| `/admin/user-access/contests/:contestCode/submissions` | `adminUserContestSubmissions`    | `ContestSubmissionsContent`      | `AdminLayout`          | Rol admin                     |
| `/admin/user-access/contests/:contestCode/ranking`     | `adminUserContestRanking`        | `RankingPage admin`              | `AdminLayout`          | Rol admin                     |
| `/forbidden`                                           | `forbiddenRoute`                 | Acceso denegado                  | —                      | Resultado de role guard       |
| `/dev/ui`                                              | `devUi`                          | Catálogo lazy                    | Sin layout de producto | Solo registrado en desarrollo |
| `*`                                                    | —                                | 404                              | —                      | Wildcard                      |

Los builders codifican `contestCode` con `encodeURIComponent`. El header contextual deriva la sección activa desde `activeSection`; no usa tabs locales.

## 13. Layouts y acceso administrativo

- `UserLayout` muestra **Inicio**, **Concursos** y **Mis envíos**, logo, identidad visible y logout.
- `AdminLayout` mantiene sidebar único en desktop y drawer en móvil, header administrativo e identidad.
- `AdminSidebar` filtra por rol, ofrece búsqueda y separa **Acceso de Usuario** con **Concursos** y **Mis Envíos**.
- Problemas, envíos y ranking administrativos reutilizan contenido sin anidar `UserLayout`.
- Los estados activos del sidebar comparan la ruta exacta; la navegación contextual de concurso usa `ContestContextHeader`.

## 14. Contratos consumidos por el frontend

| Área                | Servicio/hook                            | Contrato consumido                                                                           | Mapper/normalizador                               |
| ------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Auth                | `authService`                            | `Auth/login`, `Auth/register`                                                                | Tipos locales alineados con OpenAPI               |
| Roles               | `features/administration/service.ts`     | `Roles`, `Roles/usuarios`, `Roles/agregar`, `Roles/quitar`                                   | `mapRolesResponse`, `mapUsersRolesResponse`       |
| Concursos admin     | `admin/service.ts`, hooks                | `Concursos/mis-creados`, `mis-resumen`, `crear`, `editar/{codigo}`, `PUT Concursos/{codigo}` | FormData y mappers de edición                     |
| Concursos usuario   | `user/service.ts`, hooks                 | `Concursos`, `ParticipanteConcursos/unirse`, `stats-contest`                                 | Filtros y policy de acceso                        |
| Dashboard/problemas | `getContestDashboard`                    | `Concursos/dashboard/{codigo}`                                                               | `problem-status.ts`                               |
| Envíos              | services de submissions e history        | `Envios`, `Envios/mis-envios`                                                                | `mapSubmissionRow`, veredictos y unidades         |
| Ranking             | `getContestRanking`, `useContestRanking` | `Concursos/{codigo}/ranking`                                                                 | `normalizeContestRanking`, `RankingContractError` |

**Contrato asumido como correcto para esta auditoría.** Solo se documenta qué consume el frontend; no se verificó implementación interna.

## 15. Tests y validaciones

### Inventario

- 34 archivos `*.test.*`; no se encontraron `*.spec.*` adicionales.
- Cobertura observable: componentes, layouts, router, auth identity, HTTP, mocks, administración, concursos, inscripción, problemas, historial, ranking, globos y mappers.
- El conteo estático simple detectó 117 declaraciones directas; la validación final de Vitest descubrió y aprobó 145 tests por parametrización y helpers.

### Resultados actuales

| Comando                        | Resultado                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `npm audit`                    | Exit 0; 0 vulnerabilidades                                                    |
| `npm audit --audit-level=high` | Exit 0; 0 vulnerabilidades                                                    |
| `npm run lint`                 | Exit 0; 5 warnings `react/only-export-components`, 0 errores                  |
| `npm run typecheck`            | Exit 0; sin errores                                                           |
| `npm run test:run`             | Exit 0; 34 archivos y 145 tests aprobados                                     |
| `npm run build`                | Exit 0; build generado; advertencia no bloqueante por chunks mayores a 500 kB |
| `npm ls prismjs --depth=0`     | Exit 0; `prismjs@1.30.0` presente                                             |

Una ejecución anterior a la recuperación de sesión había observado `prismjs` ausente y fallos derivados. La validación final reanudada desde `frontend/` comprobó la dependencia presente y todos los comandos anteriores con los resultados de esta tabla. No se ejecutó `npm install` ni se modificaron dependencias.

## 16. Enlaces y referencias

- Baseline documental previo: 111 enlaces Markdown locales, 17 destinos faltantes y 0 anchors inválidos detectados.
- Validación final de `README.md` y los Markdown bajo `docs/`: 91 archivos, 110 enlaces locales, 0 destinos faltantes y 0 anchors inválidos.
- La validación final encontró 64 referencias a capturas, 12 a imágenes y 8 a fuentes PlantUML; todos sus destinos existen.
- Después de las correcciones y de crear este informe, los enlaces operativos resuelven; el link roto a `database/script-inicial.sql` fue convertido en referencia histórica textual.
- Las referencias a rutas frontend antiguas en historias actuales fueron corregidas.
- Las referencias históricas dentro de changes se preservaron cuando explicaban movimientos o decisiones de su momento.
- No se validaron enlaces externos por red.

## 17. Evidencias existentes

- 62 archivos bajo `docs/capturas/` revisados por existencia, casing y extensión.
- 12 archivos bajo `docs/images/` revisados por existencia, casing y extensión.
- Las capturas UJ-05, UJ-06, UJ-07, UJ-08/UJ-09, UJ-11, UJ-12, UJ-13, UJ-18, UJ-19 y UJ-20 referenciadas por las historias existen.
- No se generaron, editaron, movieron ni solicitaron evidencias nuevas.

## 18. Diagramas PlantUML

Se revisaron 9 fuentes:

1. `arquitectura-componentes.puml`
2. `casos-uso-general.puml`
3. `diagrama-clases.puml`
4. `modelo-contexto.puml`
5. `modelo-relacional.puml`
6. `secuencia-envio-solucion.puml`
7. `secuencia-importacion-zip.puml`
8. `tablero-starfish-retrospectiva-sprint-1.puml`
9. `tablero-starfish-retrospectiva-sprint-2.puml`

Solo `docs/puml/modelo-contexto.puml` se modificó: la relación frontend–SignalR ahora se identifica como integración prevista porque el frontend actual no contiene un cliente conectado.

## 19. Contradicciones encontradas

- `README.md` describía una fundación sin flujos funcionales, declaraba pendientes capacidades existentes y consignaba TypeScript 6 en lugar de 5.9.
- Documentos raíz trataban `frontend/` como ausente sin aclarar su contexto histórico.
- Historias UJ-05 y UJ-06 mantenían backend y capturas como pendientes y describían un contrato de login diferente al consumido.
- UJ-07 apuntaba a `features/roles/` en vez de `features/administration/`.
- UJ-08 apuntaba a la estructura anterior de concursos y contenía links Markdown rotos.
- UJ-11 afirmaba que inscripción, problemas e historial global no estaban integrados.
- UJ-13 afirmaba simultáneamente que la feature estaba completa y que `features/problems/` no existía.
- UJ-14/UJ-15 presentaba refetch HTTP como tiempo real y usaba paths inexistentes.
- UJ-20 marcaba filtros, rutas y capturas como pendientes pese a existir.
- La retrospectiva Sprint 2 no tenía nota sobre la implementación posterior de sus cuatro acuerdos.
- Las propuestas Sprint 3 no expresaban los tres estados requeridos.
- `modelo-contexto.puml` mostraba una conexión realtime actual no respaldada por código frontend.

## 20. Correcciones documentales aplicadas

| Ruta                                                                                                              | Clasificación                                  | Hallazgo                                                         | Cambio realizado                                                                                 | Fuente frontend                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `README.md`                                                                                                       | Documento principal de entrada y estado actual | Estado preimplementación, tecnologías y próximos pasos obsoletos | Estado funcional, configuración, scripts, rutas, calidad, enlaces y trabajo futuro reconciliados | `frontend/package.json`, Vite, env, router, layouts, features y tests |
| `docs/01-contexto-y-diagnostico.md`                                                                               | Histórico                                      | Estado preimplementación presentado sin nota vigente             | Nota de vigencia y contexto histórico                                                            | Árbol `frontend/src/`                                                 |
| `docs/06-arquitectura-datos.md`                                                                                   | Arquitectura histórica                         | Link a SQL inexistente                                           | Referencia convertida en texto histórico                                                         | Inventario del repositorio                                            |
| `docs/07-plan-ready-to-sprint.md`                                                                                 | Plan histórico                                 | Frontend descrito como ausente                                   | Nota de vigencia                                                                                 | `frontend/package.json`, router                                       |
| `docs/08-sprint-0-fabrica-software.md`                                                                            | Sprint histórico                               | Frontend y entorno descritos como pendientes                     | Notas históricas y referencias actuales                                                          | `frontend/`, `.env.example`                                           |
| `docs/README.md`                                                                                                  | Estado actual                                  | Índice y clasificación incompletos                               | Retrospectivas, auditoría y carpetas agregadas                                                   | Inventario `docs/`                                                    |
| `docs/historias/UJ-05-register-crear-cuenta-acceso-plataforma.md`                                                 | Historia                                       | Estado y pendientes backend/capturas incorrectos                 | Estado, trazabilidad y contrato reconciliados                                                    | Auth register, capturas existentes                                    |
| `docs/historias/UJ-06-login-autenticacion-token-roles.md`                                                         | Historia                                       | Contrato login y pendientes incorrectos                          | `token`/`expiraEn`, sesión y roles documentados                                                  | Auth login, generated types, identity                                 |
| `docs/historias/UJ-07proceso-implementacion-admin-roles.md`                                                       | Historia                                       | Paths y nombres movidos                                          | Rutas `features/administration/` actuales                                                        | Feature administration                                                |
| `docs/historias/UJ08-administracion-concursos-estructurado.md`                                                    | Historia                                       | 17 links rotos y estado antiguo                                  | Referencias admin actuales y estado                                                              | `features/contests/admin/`                                            |
| `docs/historias/UJ08-UJ09-crear-concurso-importar-zip.md`                                                         | Historia                                       | Paths y pendientes de integración obsoletos                      | Paths admin y estado posterior                                                                   | Router, main, AdminSidebar                                            |
| `docs/historias/UJ-11-lista-concursos-filtrados.md`                                                               | Historia                                       | Acciones y features completas marcadas pendientes                | Inscripción, problemas, historial y evidencias reconciliados                                     | ContestCard, problems, history                                        |
| `docs/historias/UJ-13-Lista de incisos y acceso al PDF del set de problemas.md`                                   | Historia                                       | Endpoint, estados y existencia contradictorios                   | Contrato y feature actuales                                                                      | Problems service/status/router                                        |
| `docs/historias/UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md`                                        | Historia                                       | Realtime y paths incorrectos                                     | Limitación HTTP y paths reales                                                                   | Submissions page/services                                             |
| `docs/historias/UJ-20-Como-usuario,-quiero-ver-todos-mis-envíos-con-filtros-por-concurso-y-resultado-obtenido.md` | Historia                                       | Filtros/rutas/evidencias pendientes                              | Estado y referencias actuales                                                                    | History content/router                                                |
| `docs/openspec/changes/implement-sprint-2-retrospective-actions/proposal.md`                                      | Change activo                                  | Rutas Windows operativas                                         | Ruta relativa y límite backend/juez                                                              | Raíz Git detectada                                                    |
| `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/proposal.md`             | Change activo                                  | Rutas Windows operativas                                         | Nota de baseline actual                                                                          | Raíz Git detectada                                                    |
| `docs/openspec/changes/integrate-uj07-role-administration-and-uj20-user-submissions-flow/design.md`               | Change activo                                  | “No fue posible inspeccionar” sin actualización                  | Nota posterior de disponibilidad frontend                                                        | Inventario actual                                                     |
| `docs/puml/modelo-contexto.puml`                                                                                  | Diagrama                                       | SignalR mostrado como cliente actual                             | Integración marcada prevista                                                                     | `lib/realtime/.gitkeep`                                               |
| `docs/retrospectivas/retrospectiva-sprint-1.md`                                                                   | Retrospectiva                                  | UJ-11 pendiente sin nota posterior                               | Actualización posterior                                                                          | Dashboard usuario                                                     |
| `docs/retrospectivas/retrospectiva-sprint-2.md`                                                                   | Retrospectiva                                  | Cuatro acuerdos futuros sin trazabilidad posterior               | Actualización posterior                                                                          | Sidebar, policy, header, audit                                        |
| `docs/retrospectivas/retrospectiva-sprint-3.md`                                                                   | Retrospectiva                                  | Estados futuros implícitos                                       | Estados explícitos requeridos                                                                    | Ausencia de perfil/ampliación                                         |
| `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/proposal.md`                          | Change activo                                  | Backend tratado como ausencia/limitación                         | Suposición obligatoria corregida                                                                 | Briefing del responsable                                              |
| `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/design.md`                            | Change activo                                  | Clasificación “no verificable” incompatible                      | Contratos externos asumidos                                                                      | Briefing del responsable                                              |
| `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/spec.md`                              | Change activo                                  | Escenarios backend incompatibles                                 | Requirements alineados al alcance                                                                | Briefing del responsable                                              |
| `docs/openspec/changes/audit-reconcile-frontend-documentation-current-state/tasks.md`                             | Change activo                                  | Plan sin progreso demostrable                                    | Fases convertidas en checklist real; solo aprobación pendiente                                   | Evidencia de esta auditoría                                           |
| `docs/auditorias/auditoria-documentacion-frontend-estado-actual.md`                                               | Informe de auditoría                           | No existía informe integral                                      | Informe creado                                                                                   | Todas las fuentes anteriores                                          |

## 21. Hallazgos no corregidos

- UJ-15 no tiene cliente de push realtime; implementar SignalR/WebSocket requiere una decisión funcional y un change separado.
- El build aprobado emite una advertencia no bloqueante por chunks mayores a 500 kB; cualquier estrategia de code splitting requiere una decisión técnica fuera de este change documental.

## 22. Suposiciones sobre backend y juez

Para esta auditoría se asumió que el backend y el juez funcionan correctamente.

No se inspeccionaron repositorios, código interno, base de datos, migraciones, compiladores ni ejecución interna del juez.

La auditoría se limitó al contrato y comportamiento consumido por el frontend.

## 23. Documentos y carpetas excluidos

- `docs/informe-final.tex`: excluido; no se evaluó en profundidad, modificó ni compiló.
- `docs/informe-final.pdf`: preservado.
- `docs/capturas/`: 0 archivos modificados y 0 archivos agregados.
- `docs/images/`: 0 archivos modificados y 0 archivos regenerados.
- `frontend/`: inspección read-only; 0 archivos modificados.
- Backend y juez: excluidos y asumidos correctos.

## 24. Recomendaciones

1. Revisar manualmente este informe y el diff documental antes de cerrar el change.

## 25. Estado final

**Auditoría documental del frontend y README completada**

No se hizo commit, push ni archive. La única tarea pendiente es la revisión y aprobación manual del responsable del proyecto.
