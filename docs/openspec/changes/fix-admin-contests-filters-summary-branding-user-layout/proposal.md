# Proposal

## Problem Statement

La administración de concursos, el branding y el layout del usuario autenticado ya existen parcialmente, pero presentan defectos de integración:

- Los filtros administrativos envían valores singulares o no c:contentReference[oaicite:0]{index=0}or backend `proximos`.
- El listado y el resumen administrativo se están tratando como un único contrato o derivando de los mismos datos.
- `ContestsSummaryCards` existe, pero dejó de formar parte de la composición principal.
- Cambios de filtros pu:contentReference[oaicite:1]{index=1} del resumen.
- El botón de actualización no coordina explícitamente listado y resumen.
- Los estados de carga y error de la tabla y del resumen no están suficientemente desacoplados.
- Las representaciones provisionales de marca deben sustituirse por `logo.svg`.
- `logo-dark.svg` debe quedar disponible como variante futura sin implementar tema oscuro.
- `src/assets/components/` puede mezclar assets gráficos, componentes React y archivos provisionales.
- El recurso visual del globo debe convertirse o mantenerse como un componente reutilizable sin lógica de negocio.
- El layout del usuario con rol `Usuario` está parcial o no expone suficientemente marca, navegación, identidad, menú y contenido.
- La documentación transversal existente todavía no registra estas correcciones.

El backend actualizado confirma dos contratos administrativos independientes:

- `GET Concursos/mis-creados`, protegido con `AdministradorConcursos`, para listado, filtros, búsqueda, modalidad y paginación.
- `GET Concursos/mis-resumen`, protegido con `AdministradorConcursos`, para conteos globales de activos, próximos y finalizados.

El listado acepta los valores contractuales `todos`, `activos`, `proximos` y `finalizados`. La respuesta paginada no contiene el resumen. El resumen se devuelve mediante un DTO separado con `activos`, `proximos` y `finalizados`.

Este change es una corrección e integración sobre funcionalidades existentes. No corresponde a una nueva historia de usuario y no debe ampliar el producto.

## Goals

- Crear un único change llamado `fix-admin-contests-filters-summary-branding-user-layout`.
- Mantener sus artefactos en `docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/`.
- Centralizar los valores contractuales del filtro administrativo.
- Separar la etiqueta visual del valor enviado al backend.
- Aplicar el mapeo:
  - `Todos` → `todos`;
  - `Activos` → `activos`;
  - `Pendientes` → `proximos`;
  - `Finalizados` → `finalizados`.
- Evitar el envío de alias singulares o no soportados.
- Mantener modalidad, búsqueda, página y tamaño de página en el request de listado.
- Registrar por separado los endpoints `mis-creados` y `mis-resumen`.
- Crear tipos independientes para listado, item administrativo, resumen y filtro.
- Mantener dos queries independientes en TanStack Query.
- Hacer que únicamente la query de listado dependa de filtros y paginación.
- Solicitar el resumen al montar la pantalla.
- Evitar refetch automático del resumen por cambios de filtros, foco o reconexión.
- Restaurar `ContestsSummaryCards` dentro de `ContestsAdminScreen`.
- Mostrar las tarjetas antes de filtros, tabla y paginación.
- Mostrar `Pendientes` usando `summary.proximos`.
- Coordinar el botón existente de actualización para refrescar listado y resumen.
- Conservar filtros y página durante la actualización manual.
- Separar estados de carga, error, éxito y refreshing del resumen y el listado.
- Crear o adaptar un componente reutilizable de logo.
- Utilizar `logo.svg` para la interfaz clara.
- Exponer una variante basada en `logo-dark.svg` sin crear un sistema de tema.
- Reemplazar representaciones provisionales de la marca.
- Verificar el favicon real sin regenerarlo.
- Clasificar los archivos de `src/assets/components/`.
- Mover únicamente componentes React reutilizables fuera de assets.
- Preparar el globo como componente reutilizable, accesible y sin lógica de negocio.
- Exponer correctamente el layout existente para usuarios con rol `Usuario`.
- Mostrar marca, navegación real, identidad, avatar o fallback, UserMenu y contenido.
- Reutilizar el UserMenu y logout existentes.
- Mantener intacta la prioridad administrativa y la política general de roles.
- Actualizar exclusivamente `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- Agregar o actualizar pruebas para los fixes y regresiones descritas.
- Mantener backend, base de datos y funcionalidades no relacionadas sin cambios.

## Non-Goals

- No implementar nuevas historias de usuario.
- No agregar nuevos filtros.
- No agregar nuevos estados de concurso.
- No modificar los endpoints backend.
- No modificar DTOs backend.
- No modificar `backend/`.
- No modificar `database/`.
- No implementar edición o eliminación de concursos.
- No rediseñar completamente la tabla.
- No rediseñar completamente el Sidebar.
- No modificar creación de concursos.
- No implementar un tema oscuro.
- No implementar toggle, persistencia o detección automática de tema.
- No utilizar todavía `logo-dark.svg` como tema activo.
- No implementar perfil de usuario.
- No implementar avatar subido por el usuario.
- No agregar clasificación global.
- No implementar nuevas páginas de concursos, problemas o envíos.
- No implementar ejercicios resueltos.
- No agregar contadores al componente de globo.
- No crear endpoints para el globo.
- No modificar claims, JWT o roles.
- No modificar la prioridad administrativa.
- No rehacer toda la política de routing.
- No crear otro UserMenu.
- No duplicar logout.
- No crear un documento nuevo en `docs/historias/`.
- No crear capturas vacías.
- No agregar enlaces hacia capturas inexistentes.
- No agregar dependencias.
- No utilizar OpenSpec CLI.
- No realizar commit ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/proposal.md`
- `docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/spec.md`
- `docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/design.md`
- `docs/openspec/changes/fix-admin-contests-filters-summary-branding-user-layout/tasks.md`

### Administración de concursos

Áreas probables:

- `ContestsAdminScreen`.
- `ContestsSummaryCards`.
- `ContestsFiltersBar`.
- Hooks de listado y resumen.
- Servicio de concursos.
- Query keys.
- Tipos de administración.
- Constantes y mapeos de filtros.
- Endpoints centralizados.
- Tests de la feature.
- Handlers MSW.

### Branding

Áreas probables:

- `src/assets/logo.svg`.
- `src/assets/logo-dark.svg`.
- Componente compartido de marca.
- Auth layout.
- Login.
- Register.
- AdminLayout.
- UserLayout.
- Sidebar.
- Headers.
- Forbidden o NotFound cuando muestren marca.
- `index.html`.
- Assets provisionales de React o Vite.

### Assets reutilizables

- `src/assets/components/`.
- Carpeta compartida de componentes o ilustraciones.
- Componente del globo.
- Imports de consumidores.
- Barrels existentes, únicamente cuando ya formen parte de la convención.

### Layout del usuario

- Router.
- Ruta inicial real del rol `Usuario`.
- Guard existente.
- Layout del estudiante o usuario.
- Navegación horizontal existente.
- UserMenu.
- Avatar o fallback.
- Logout.
- Página mínima actualmente renderizada para el usuario.

### Documentación

- `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.

## Assumptions

- El workspace de Pi contiene las implementaciones descritas, aunque el repositorio frontend público visible puede no reflejar su estado más reciente.
- `ContestsSummaryCards.tsx` y `ContestsAdminScreen.tsx` existen en la feature.
- La aplicación utiliza TanStack Query y AuthTransport.
- Existe un botón de actualización administrativo.
- Existe un UserMenu compartido o equivalente reutilizable.
- Existe una política de roles previa que permite al rol `Usuario` alcanzar una ruta propia.
- `logo.svg` y `logo-dark.svg` existen en el workspace.
- `src/assets/components/` contiene al menos un recurso o componente de globo.
- No se confirma la ruta real del layout del usuario.
- No se confirma la estructura actual de query keys, hooks o servicio.
- No se confirma si `ContestsSummaryCards` consume props o ejecuta una query.
- No se confirma si el componente de logo ya existe.
- No se confirma qué archivos provisionales siguen siendo importados.
- No se confirma si el favicon está en `public/` o dentro de otra ruta.
- No se confirma la API exacta del UserMenu o Avatar existentes.
- No se confirma si la suite actual ya contiene pruebas para estos componentes.

## Risks

### Risk 1: El filtro visible se usa directamente como valor contractual

- Probability: High.
- Impact: High, porque el backend no reconoce `pendientes`, `activo` o `finalizado`.
- Mitigation: Centralizar un catálogo tipado de etiqueta y valor; probar cada mapping.

### Risk 2: El resumen sigue dependiendo de la query paginada

- Probability: Medium.
- Impact: High, porque las tarjetas mostrarían conteos parciales o filtrados.
- Mitigation: Crear servicio, hook y query key independientes para `mis-resumen`.

### Risk 3: Cambios de filtros refetchan el resumen

- Probability: Medium.
- Impact: Medium por solicitudes redundantes.
- Mitigation: Excluir parámetros de listado de la query key del resumen y configurar su política de refetch.

### Risk 4: El botón Actualizar pierde filtros o página

- Probability: Medium.
- Impact: Medium.
- Mitigation: Refrescar las queries actuales sin reiniciar el estado de filtros.

### Risk 5: Un error del resumen oculta la tabla

- Probability: Medium.
- Impact: High para la operabilidad administrativa.
- Mitigation: Mantener límites de render y estados independientes.

### Risk 6: Mostrar cero ante un error se interpreta como dato válido

- Probability: Medium.
- Impact: Medium.
- Mitigation: Diferenciar explícitamente error, loading y valor numérico real.

### Risk 7: Los contratos frontend no coinciden con el DTO backend actualizado

- Probability: Medium.
- Impact: High.
- Mitigation: Alinear tipos con `ConcursoAdminItemDto`, `ConcursosAdminPaginadosDto` y `ResumenConteoDto`; evitar casts inseguros.

### Risk 8: Un AppLogo nuevo duplica un componente existente

- Probability: Medium.
- Impact: Low.
- Mitigation: Inspeccionar primero componentes de marca y adaptar el existente cuando sea viable.

### Risk 9: Eliminar logos provisionales rompe imports

- Probability: Medium.
- Impact: Medium.
- Mitigation: Buscar todos los consumidores y eliminar assets únicamente después de typecheck y build exitosos.

### Risk 10: Reorganizar assets amplía excesivamente el diff

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mover solo componentes React claramente reutilizables; dejar assets gráficos puros en assets.

### Risk 11: El globo incluye accidentalmente lógica de negocio

- Probability: Low.
- Impact: Medium.
- Mitigation: Limitar su contrato a presentación, tamaño, className y semántica.

### Risk 12: El User Layout se conecta a una ruta inventada

- Probability: Medium.
- Impact: High.
- Mitigation: Inspeccionar el router y reutilizar el destino existente del rol `Usuario`.

### Risk 13: Se duplica UserMenu o logout

- Probability: Medium.
- Impact: Medium.
- Mitigation: Extender el componente compartido y centralizar la acción existente.

### Risk 14: La documentación reescribe información histórica válida

- Probability: Low.
- Impact: Medium.
- Mitigation: Añadir una única sección posterior sin sustituir contenido previo.

## Rollback Strategy

- Restaurar los valores de filtro previos solo junto con la query anterior si la integración actualizada presenta una regresión, conservando pruebas que documenten el contrato correcto.
- Retirar temporalmente la query de resumen independiente y ocultar las tarjetas antes que mostrar datos incorrectos.
- Restaurar la composición anterior de `ContestsAdminScreen` si las tarjetas rompen el layout, sin eliminar el componente.
- Restaurar el logo anterior únicamente si el componente compartido produce imports rotos.
- Mantener `logo.svg` y `logo-dark.svg` aunque el componente nuevo deba revertirse.
- Revertir movimientos dentro de `assets/components` restaurando imports antes de eliminar archivos.
- Restaurar el layout previo del usuario si la exposición del shell bloquea rutas, manteniendo la sesión y guards existentes.
- Revertir únicamente la sección documental nueva, sin alterar contenido histórico.
- Verificar después del rollback:
  - administración de concursos;
  - filtros;
  - tabla y paginación;
  - creación de concursos;
  - AdminLayout;
  - UserLayout;
  - login y logout;
  - tests;
  - build.
- No se requiere rollback de backend o datos.

## Success Criteria

- El listado utiliza `Concursos/mis-creados`.
- El resumen utiliza `Concursos/mis-resumen`.
- Los endpoints están centralizados.
- `Todos` envía `todos`.
- `Activos` envía `activos`.
- `Pendientes` envía `proximos`.
- `Finalizados` envía `finalizados`.
- No se envían alias singulares.
- El listado conserva modalidad, búsqueda y paginación.
- El resumen no recibe filtros.
- Las query keys son independientes.
- Cambiar filtros solo vuelve a solicitar el listado.
- El resumen se solicita al montar.
- El resumen no se solicita por foco o reconexión.
- El botón Actualizar refresca listado y resumen.
- El botón no reinicia filtros.
- `ContestsSummaryCards` aparece antes de la tabla.
- Las tarjetas muestran activos, próximos como Pendientes y finalizados.
- Los estados del resumen y listado son independientes.
- `AppLogo` o equivalente utiliza `logo.svg`.
- La variante futura utiliza `logo-dark.svg`.
- No se implementa tema oscuro.
- No quedan logos provisionales visibles.
- El favicon real continúa configurado.
- Los componentes React reutilizables no permanecen dentro de assets.
- El globo queda reutilizable y sin lógica de negocio.
- El rol `Usuario` alcanza su layout existente.
- El User Layout muestra marca, navegación real, identidad, menú y contenido.
- `Clasificación global` no aparece.
- Logout elimina el token y navega a login.
- Se actualiza únicamente el documento transversal existente.
- Las evidencias permanecen pendientes hasta existir.
- Las pruebas y validaciones técnicas pasan.
- No se modifican backend, database o funcionalidades fuera de alcance.
- No se realiza commit ni push.
