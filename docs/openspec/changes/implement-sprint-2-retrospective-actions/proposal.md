# Proposal

## Problem Statement

El change `implement-sprint-2-retrospective-actions` implementará, como una única iniciativa, cuatro acuerdos derivados de la retrospectiva del Sprint 2:

1. Acceso a funcionalidades de concursos del usuario desde el contexto administrativo.
2. Inscripción mediante contraseña para concursos privados finalizados.
3. Remediación controlada de seis vulnerabilidades npm reportadas con severidad alta.
4. Extracción de un encabezado reutilizable para el contexto de un concurso.

Este change no constituye un briefing global del Sprint 3, no implementa Ranking y no reabre el change `integrate-user-contest-flow-uj12-routing-layout-table-style`.

La fuente principal requerida es `docs/retrospectivas/retrospectiva-sprint-2.md`, usando `docs/retrospectivas/retrospectiva-sprint-1.md` únicamente como referencia histórica de formato. El material aportado define el alcance, las restricciones y los criterios de terminado de este change. :contentReference[oaicite:0]{index=0}

Los repositorios indicados se encuentran en rutas locales de Windows:

- Frontend: `C:\dev\UPDS-JUDGE-FRONT`.
- Backend de referencia: `C:\dev\UPDSjudge`.

Esas rutas no están disponibles para inspección directa desde esta sesión. Por ello, nombres de rutas, componentes, roles efectivos, contratos, scripts, versiones instaladas y resultados de auditoría que no estén expresamente confirmados en el material aportado quedan marcados como `Por confirmar durante baseline`.

### Bloque 1: acceso funcional desde administración

Un administrador autorizado debe poder utilizar las pantallas de:

- concursos;
- problemas o incisos;
- mis envíos del concurso;

sin abandonar `AdminLayout` ni perder el sidebar administrativo.

La solución no debe montar `UserLayout` dentro de `AdminLayout`, redirigir al administrador hacia un wrapper de usuario ni duplicar las páginas funcionales.

La mejora requiere separar:

- contenido funcional reutilizable;
- wrappers de página;
- layouts;
- configuración de rutas.

El sidebar administrativo debe incorporar un grupo denominado exactamente `Acceso de Usuario` y una opción inicial `Concursos`.

### Bloque 2: concurso privado finalizado

La regla funcional confirmada establece que un concurso privado finalizado no debe quedar bloqueado definitivamente para un usuario no inscrito.

El flujo esperado es:

- solicitar contraseña;
- validar mediante el endpoint backend real de inscripción;
- inscribir al usuario cuando la contraseña sea correcta;
- actualizar la caché;
- permitir acceso al detalle finalizado.

Debe eliminarse cualquier policy frontend equivalente a:

- privado;
- finalizado;
- no inscrito;
- acceso imposible.

La nueva policy debe producir una acción equivalente a `requiere contraseña e inscripción`.

El frontend no debe simular esta capacidad cuando el backend local no la soporte. Si el controller o DTO real contradice la confirmación funcional, la implementación debe detener ese bloque y registrar una dependencia backend explícita.

### Bloque 3: vulnerabilidades npm

El reporte aportado indica seis vulnerabilidades de severidad alta y señala dos cadenas principales:

- `brace-expansion → minimatch → @redocly/openapi-core → openapi-typescript`;
- `react-router → react-router-dom`.

El reporte también indica propuestas automáticas de npm que implicarían cambios potencialmente incompatibles.

La solución no debe consistir en ejecutar `npm audit fix --force`.

Primero deben determinarse:

- versiones declaradas;
- versiones resueltas;
- dependencias directas y transitivas;
- alcance real de cada advisory;
- APIs del router utilizadas;
- script real de generación OpenAPI;
- alternativas de actualización compatibles.

El objetivo es que `npm audit --audit-level=high` no reporte vulnerabilidades altas corregibles dentro del frontend y que router, generación OpenAPI, tests y build continúen funcionando.

### Bloque 4: encabezado de contexto

`SubmissionsPage` contiene actualmente un bloque superior con información equivalente a:

- nombre;
- código;
- estado;
- duración;
- navegación contextual.

El briefing debe preparar su extracción a un componente reutilizable e independiente de layouts.

El mismo componente debe utilizarse en:

- `frontend/src/features/submissions/Pages/SubmissionsPage.tsx`;
- `frontend/src/features/problems/pages/ContestProblemsPage.tsx`.

El componente debe mostrar datos reales y permitir navegación contextual hacia:

- Problemas;
- Mis envíos.

No debe mostrar Ranking todavía.

El componente debe funcionar tanto dentro de rutas de usuario como dentro de rutas administrativas, recibiendo enlaces o descriptores de navegación en vez de hardcodear rutas de estudiante.

## Goals

- Crear exactamente los cuatro artefactos del change bajo `docs/openspec/changes/implement-sprint-2-retrospective-actions/`.
- Confirmar la retrospectiva Sprint 2 y conservarla como documento histórico.
- Crear un inventario del sidebar, layouts, rutas y contenidos funcionales existentes.
- Separar contenido de concursos de sus wrappers de página cuando actualmente estén acoplados.
- Reutilizar el mismo contenido bajo `UserLayout` y `AdminLayout`.
- Mantener `AdminLayout` durante concursos, problemas y mis envíos.
- Agregar `Acceso de Usuario` y `Concursos` al sidebar administrativo.
- Respetar roles, guards y permisos reales.
- Actualizar la policy del concurso privado finalizado.
- Reutilizar el modal y la mutación existentes de inscripción cuando sean adecuados.
- Preservar la contraseña únicamente en estado efímero.
- Invalidar exclusivamente las queries afectadas.
- Navegar al detalle después de una inscripción privada finalizada exitosa.
- Reproducir y documentar la auditoría npm inicial.
- Resolver las dependencias vulnerables mediante una actualización compatible o migración controlada.
- Mantener `package.json` y `package-lock.json` coherentes.
- Preservar las APIs de React Router utilizadas por el proyecto.
- Preservar el script real de generación OpenAPI.
- Extraer un Header de contexto independiente del layout.
- Mostrar nombre, código, estado y duración reales.
- Reutilizar el Header en Problems y Submissions.
- Mantener las métricas específicas de Problems.
- Mantener `Ver PDF` dentro de `ProblemsTable`.
- Eliminar navegación contextual duplicada.
- Preparar la API de navegación para una futura opción Ranking sin renderizarla.
- Agregar pruebas unitarias, integración, regresión, seguridad y validación manual.
- Actualizar historias y referencias de implementación sin reescribir retrospectivas históricas.

## Non-Goals

- No implementar Ranking.
- No crear un briefing global del siguiente sprint.
- No reabrir ni modificar el change anterior.
- No archivar changes.
- No reemplazar documentación histórica.
- No duplicar páginas completas para administración.
- No anidar `UserLayout` dentro de `AdminLayout`.
- No crear un segundo sidebar.
- No simular navegación mediante estado local cuando existen rutas.
- No inventar rutas administrativas.
- No inventar permisos o nombres de roles.
- No modificar el sistema de autenticación.
- No reemplazar el router sin necesidad.
- No cambiar el gestor de paquetes.
- No ejecutar `npm audit fix --force` como solución automática.
- No silenciar audit sin corregir la dependencia vulnerable.
- No agregar `overrides` sin demostrar compatibilidad.
- No regenerar masivamente el lockfile sin justificación.
- No crear archivos de lock para otro gestor.
- No hardcodear nombre, estado o duración del concurso.
- No mover las métricas de Problems al Header.
- No mover `Ver PDF` al Header.
- No modificar veredictos, lenguajes, juez o fórmulas de estadísticas.
- No guardar contraseñas en storage, caché, URL o logs.
- No modificar backend desde este change frontend.
- No implementar código, commit o push durante la generación del briefing.

## Affected Areas

### Documentación OpenSpec

- `docs/openspec/changes/implement-sprint-2-retrospective-actions/proposal.md`
- `docs/openspec/changes/implement-sprint-2-retrospective-actions/spec.md`
- `docs/openspec/changes/implement-sprint-2-retrospective-actions/design.md`
- `docs/openspec/changes/implement-sprint-2-retrospective-actions/tasks.md`

### Documentación histórica y funcional

- `docs/retrospectivas/retrospectiva-sprint-2.md` o su nombre real.
- `docs/retrospectivas/retrospectiva-sprint-1.md`.
- `docs/historias/UJ-11-lista-concursos-filtrados.md`.
- `docs/historias/UJ-12-inscripcion-concurso-privado.md`.
- `docs/historias/UJ-13-Lista de incisos y acceso al PDF del set de problemas.md`.
- `docs/historias/UJ-14-UJ15-listar-envios-y-subir-solucion-de-problemas.md`.

### Navegación y layouts

- Sidebar administrativo real.
- Configuración declarativa de sus grupos.
- `AdminLayout`.
- `UserLayout`.
- Router.
- Route builders.
- Guards de sesión y rol.
- Tests del router.

### Features funcionales

- `frontend/src/features/contests/user/`.
- `frontend/src/features/contests/admin/`.
- `frontend/src/features/problems/`.
- `frontend/src/features/submissions/`.
- `SubmissionsPage`.
- `ContestProblemsPage`.
- `ProblemsTable`.
- Policy de acceso.
- Modal y mutación de inscripción.
- Query keys de concursos y detalle.

### Componentes compartidos

- Componentes de navegación.
- Header o componentes de contexto existentes.
- Badge de estado.
- Card.
- Button.
- PasswordInput.
- Modal o Dialog.
- Skeleton.
- Alert.

### Dependencias y generación

- `frontend/package.json`.
- `frontend/package-lock.json`.
- Script real de generación OpenAPI.
- Tipos generados.
- Imports que consumen tipos generados.
- React Router y sus tests.

## Assumptions

- La retrospectiva Sprint 2 existe localmente, aunque su nombre exacto debe confirmarse.
- La retrospectiva Sprint 1 existe y sirve como referencia de estructura.
- El administrador autorizado tiene además capacidad funcional equivalente al usuario, pero el rol o helper concreto debe confirmarse.
- Existe una configuración declarativa del sidebar administrativo.
- Las pantallas funcionales de concursos, problemas y envíos ya existen.
- Existe un modal o flujo previo de inscripción privada.
- Existe una policy de acceso a concursos.
- Existe una mutación de inscripción basada en TanStack Query.
- El backend local fue actualizado para permitir inscripción en privados finalizados, pero esto debe verificarse en controller y DTO.
- `SubmissionsPage.tsx`, `ContestProblemsPage.tsx` y `ProblemsTable.tsx` existen en las rutas proporcionadas; el casing debe confirmarse.
- El endpoint de dashboard o detalle ya proporciona parte de la identidad del concurso.
- No se confirma si la duración llega calculada o debe derivarse.
- No se confirma la ruta administrativa final.
- No se confirma el script npm de generación OpenAPI.
- No se confirman las versiones declaradas o resueltas de las dependencias.
- No se confirma que las seis vulnerabilidades sigan reproduciéndose en el lockfile local actual.

## Risks

### Risk 1: Doble layout o doble sidebar

- Probability: High.
- Impact: High.
- Mitigation: Extraer contenido funcional y mantener wrappers independientes.
- Verification: Inspeccionar el árbol DOM y confirmar una sola instancia de sidebar y layout.

### Risk 2: Ruta administrativa abandona AdminLayout

- Probability: High.
- Impact: High.
- Mitigation: Definir rutas administrativas como hijas reales de AdminLayout.
- Verification: Abrir concursos, problemas y envíos mediante navegación y refresh directo.

### Risk 3: Duplicación de páginas

- Probability: Medium.
- Impact: High.
- Mitigation: Compartir contenido y limitar wrappers a layout, route params y route context.
- Verification: Confirmar una única implementación funcional por pantalla.

### Risk 4: Header acoplado a rutas de usuario

- Probability: High.
- Impact: High.
- Mitigation: Inyectar descriptores o builders de navegación.
- Verification: Renderizar el Header en contextos user y admin.

### Risk 5: Requests duplicados del dashboard

- Probability: Medium.
- Impact: Medium.
- Mitigation: Compartir query existente o elevar la obtención de datos al wrapper.
- Verification: Inspeccionar Network y contar requests al cambiar entre Problemas y Mis envíos.

### Risk 6: Duración calculada con campos incorrectos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Confirmar DTO y usar únicamente fechas contractuales válidas.
- Verification: Tests con minutos, horas, días, ausencia y fechas inválidas.

### Risk 7: Backend no permite inscripción finalizada

- Probability: Medium.
- Impact: High.
- Mitigation: Verificar controller y registrar dependencia si contradice la regla funcional.
- Verification: Prueba real con concurso privado finalizado.

### Risk 8: Contraseña persistida o expuesta

- Probability: Low.
- Impact: Critical.
- Mitigation: Estado local efímero, limpieza y exclusión de logs, keys y storage.
- Verification: Revisar storage, Network, logs y caché.

### Risk 9: Actualización incompatible de React Router

- Probability: Medium.
- Impact: High.
- Mitigation: Inventariar APIs utilizadas y aplicar una migración controlada.
- Verification: Tests de rutas, refresh, guards, Link, NavLink y useParams.

### Risk 10: Ruptura de generación OpenAPI

- Probability: Medium.
- Impact: High.
- Mitigation: Ejecutar el script real antes y después de actualizar.
- Verification: Diff esperado de tipos, typecheck y build.

### Risk 11: Override incompatible

- Probability: Medium.
- Impact: High.
- Mitigation: Usar override solo con compatibilidad demostrada.
- Verification: Árbol npm, tests del paquete padre y audit.

### Risk 12: Cambio masivo del lockfile

- Probability: Medium.
- Impact: Medium.
- Mitigation: Usar la misma versión de npm y actualizar dependencias acotadas.
- Verification: Revisar diff de package-lock y árbol resuelto.

### Risk 13: Regresión de rutas directas

- Probability: Medium.
- Impact: High.
- Mitigation: No depender de `location.state`.
- Verification: Recargar cada ruta administrativa y de usuario.

### Risk 14: Ranking visible prematuramente

- Probability: Low.
- Impact: Medium.
- Mitigation: API extensible sin descriptor de Ranking.
- Verification: Búsqueda y pruebas de navegación visible.

### Risk 15: Métricas o PDF eliminados de Problems

- Probability: Medium.
- Impact: High.
- Mitigation: Limitar extracción a identidad y navegación.
- Verification: Pruebas de las cinco métricas y ubicación de `Ver PDF`.

## Rollback Strategy

- Restaurar los wrappers de página anteriores sin eliminar el contenido extraído hasta confirmar estabilidad.
- Retirar las rutas administrativas de acceso de usuario conservando el sidebar original.
- Revertir la policy de privado finalizado únicamente si el backend local no soporta la nueva regla.
- Mantener documentada la dependencia backend en caso de rollback funcional.
- Restaurar las versiones previas de dependencias junto con su lockfile.
- No revertir únicamente `package.json` o únicamente `package-lock.json`.
- Restaurar los bloques de Header anteriores si el componente compartido presenta una regresión.
- Reincorporar temporalmente la navegación local solo si las rutas configurables fallan, evitando duplicarla.
- Validar rollback con:
  - rutas user;
  - rutas admin;
  - sidebar;
  - inscripción;
  - Problems;
  - Submissions;
  - generación OpenAPI;
  - audit;
  - tests;
  - build.

## Success Criteria

- El sidebar muestra `Acceso de Usuario`.
- La sección incluye `Concursos`.
- El administrador autorizado recorre concursos, problemas y mis envíos sin abandonar AdminLayout.
- No se monta UserLayout dentro del contexto administrativo.
- No existe doble sidebar.
- Un usuario normal no accede a rutas administrativas.
- Las rutas admiten refresh directo.
- El contenido funcional no está duplicado.
- El privado finalizado no inscrito solicita contraseña.
- Una contraseña correcta inscribe y permite navegar al detalle.
- Una contraseña incorrecta no concede acceso.
- La contraseña no queda persistida.
- Las queries afectadas se actualizan de forma acotada.
- El Header compartido usa nombre, código, estado y duración reales.
- El Header funciona en rutas de usuario y administración.
- Submissions marca `Mis envíos`.
- Problems marca `Problemas`.
- No queda navegación duplicada.
- Las métricas de Problems permanecen.
- `Ver PDF` permanece en ProblemsTable.
- Ranking no aparece.
- Las dependencias vulnerables quedan corregidas.
- `npm audit --audit-level=high` no reporta vulnerabilidades altas corregibles.
- Router, generación OpenAPI, lint, typecheck, tests y build funcionan.
- `package.json` y `package-lock.json` son coherentes.
- La documentación histórica se conserva.
- La documentación funcional registra la implementación y sus evidencias.
