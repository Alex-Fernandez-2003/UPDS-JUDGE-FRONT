# Proposal

## Problem Statement

El change `integrate-uj19-admin-contest-editing-freeze-balloon-colors` debe integrar en el flujo administrativo de concursos una capacidad de edición para UJ-19, sin reconstruir el módulo existente ni implementar todavía el ranking público.

La historia relacionada es:

> UJ-19: Como Admin de Concursos, quiero que el ranking deje de actualizarse públicamente cuando falten “X” minutos para el final.

La responsabilidad frontend de este change es permitir que el Administrador de Concursos configure el valor contractual `minutosCongelamiento` mediante la edición de un concurso próximo creado por el propio administrador.

El change también debe integrar la asignación y consulta de colores de globo para los problemas del concurso mediante un catálogo cerrado de trece colores, un mapper tipado y la reutilización de `GlobeIllustration`.

El alcance solicitado incluye:

- dos acciones nuevas en cada registro del listado administrativo;
- una ruta y página de edición;
- precarga del contrato editable;
- actualización mediante un PUT multipart;
- edición de minutos de congelamiento;
- edición de colores;
- validación de unicidad;
- ZIP obligatorio;
- modal de consulta de colores;
- preparación del mapper para un futuro consumo desde ranking.

La solicitud adjunta es la fuente del alcance y de los contratos informados para este briefing. :contentReference[oaicite:0]{index=0}

No fue posible inspeccionar desde esta sesión las rutas locales:

- `C:\dev\UPDS-JUDGE-FRONT`
- `C:\dev\UPDSjudge`

Tampoco fue posible ejecutar Git, lint, typecheck, tests o build. Por tanto, lo siguiente permanece `Por confirmar durante baseline`:

- documento real de UJ-19;
- branch y working tree;
- nombres y rutas reales de páginas, servicios, hooks, DTOs y query keys;
- ruta completa de los endpoints;
- representación contractual de `colorGlobo`;
- serialización de `listaProblemas` en FormData;
- campos disponibles en el listado administrativo;
- manejo actual de fechas UTC;
- API de `GlobeIllustration`;
- semántica contractual de la contraseña en actualización;
- navegación posterior al éxito.

### Problemas funcionales que debe resolver el change

1. El listado administrativo no expone todavía, o no tiene integradas, las acciones de editar y consultar colores.
2. No existe una ruta de edición confirmada y recargable dentro de `AdminLayout`.
3. El formulario de creación puede estar acoplado a su página y no ser reutilizable en modo edición.
4. `minutosCongelamiento` debe cumplir:
   - valor mayor o igual a cero;
   - valor menor que `duracionMinutos`.
5. El PUT informado exige un ZIP aun cuando solo se modifiquen metadatos o colores.
6. Los problemas existentes deben actualizarse como una lista completa sin permitir altas, bajas, cambios de inciso ni cambios en la cantidad de casos.
7. Cada problema debe utilizar uno de trece colores permitidos y no repetirlo.
8. La representación almacenada por backend —nombre, hexadecimal u otro código— no está confirmada.
9. El modal de colores debe usar datos ya disponibles cuando el listado los incluya, pero no puede depender indiscriminadamente del GET de edición porque ese contrato solo permite concursos próximos y del creador.
10. El GET de edición no expone la contraseña, mientras el PUT informado podría interpretar una contraseña vacía como eliminación de privacidad. Ese comportamiento requiere verificación contractual antes de implementar una edición segura de concursos privados.

## Goals

- Crear exactamente los cuatro artefactos del change bajo `docs/openspec/changes/integrate-uj19-admin-contest-editing-freeze-balloon-colors/`.
- Leer completamente el documento real de UJ-19.
- Inspeccionar documentación relacionada con creación, listado, problemas, ranking, colores, rutas y permisos.
- Registrar baseline de Git y validaciones sin modificar dependencias.
- Identificar la implementación real del listado administrativo.
- Agregar una acción de edición con icono de lápiz.
- Agregar una acción de consulta de colores.
- Mantener ambas acciones dentro del patrón visual y accesible actual.
- Crear o conectar una ruta administrativa de edición.
- Mantener `AdminLayout` y `AdminSidebar`.
- Reutilizar guards y el identificador contractual del rol real.
- Soportar acceso directo y refresh.
- Cargar los datos desde el GET editable real.
- Reutilizar el formulario de creación sin duplicarlo.
- Separar comportamiento común de comportamiento exclusivo de create o edit.
- Mantener el texto `Crear Concurso` en create.
- Mostrar exactamente `Actualizar concurso` en edit.
- Mantener el código del concurso como read-only cuando el PUT no permita modificarlo.
- Precargar metadatos, problemas, congelamiento y colores.
- Permitir editar `minutosCongelamiento`.
- Revalidar congelamiento al modificar la duración.
- Exigir ZIP cuando el backend lo exija.
- Explicar en la UI que el ZIP completo es necesario para actualizar.
- Bloquear altas, bajas y cambios de inciso de problemas.
- Mantener la cantidad contractual de casos de prueba.
- Definir una única fuente de verdad tipada para colores.
- Mapear valor API, label visible y hexadecimal.
- Limitar el selector a los trece colores.
- Detectar colores ausentes, inválidos o repetidos.
- Detectar concursos con más de trece problemas.
- Reutilizar `GlobeIllustration`.
- Mostrar un modal read-only con problemas y colores.
- Evitar requests adicionales cuando la consulta de listado ya incluya los datos.
- Resolver explícitamente la falta de datos del modal cuando el listado no los incluya.
- Serializar el PUT conforme al binder real.
- Preservar la conversión local/UTC existente.
- Invalidar queries exactas después de actualizar.
- Evitar `window.location.reload()`.
- Preservar creación, listado, filtros, paginación, permisos y rutas existentes.
- Preparar el mapper para ranking sin modificar su interfaz pública.
- Actualizar la historia UJ-19 y registrar evidencias.

## Non-Goals

- No implementar el ranking público.
- No implementar el congelamiento visual del ranking.
- No modificar `features/ranking` salvo inspección o una dependencia técnica estrictamente demostrada.
- No implementar WebSockets o polling.
- No cambiar el juez.
- No agregar colores.
- No permitir más de trece colores.
- No ofrecer un editor hexadecimal libre.
- No permitir agregar problemas en edición.
- No permitir eliminar problemas en edición.
- No permitir cambiar incisos cuando sean identificadores estables.
- No permitir cambiar la cantidad de casos de prueba.
- No editar concursos iniciados.
- No editar concursos finalizados.
- No rediseñar por completo la creación.
- No duplicar el formulario.
- No cambiar completamente `AdminLayout`.
- No migrar el router.
- No modificar autenticación, JWT o roles.
- No cambiar dependencias npm.
- No generar un briefing global del sprint.
- No modificar backend dentro de este change salvo que una incompatibilidad contractual haga imposible el frontend y se apruebe otro alcance.
- No ejecutar OpenSpec CLI.
- No implementar código, modificar archivos, hacer commit, push o archive durante este briefing.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/integrate-uj19-admin-contest-editing-freeze-balloon-colors/proposal.md`
- `docs/openspec/changes/integrate-uj19-admin-contest-editing-freeze-balloon-colors/spec.md`
- `docs/openspec/changes/integrate-uj19-admin-contest-editing-freeze-balloon-colors/design.md`
- `docs/openspec/changes/integrate-uj19-admin-contest-editing-freeze-balloon-colors/tasks.md`

### Contests

Áreas probables, sujetas a inspección:

- listado administrativo;
- tabla o cards administrativas;
- acciones por concurso;
- página de creación;
- formulario;
- secciones de metadatos;
- sección de problemas;
- validadores y schemas;
- tipos;
- servicio;
- hooks;
- mutations;
- query keys;
- páginas y barrels;
- tests.

### Infraestructura transversal

- endpoints centralizados;
- HttpClient y AuthTransport;
- router y route builders;
- guards;
- `AdminLayout`;
- componentes Modal/Dialog;
- Button/IconButton;
- inputs;
- componentes de feedback;
- MSW.

### Archivos y áreas expresamente informados

- `frontend/src/components/illustrations/GlobeIllustration.tsx`
- `frontend/src/features/ranking/`
- `frontend/src/routes/`
- `frontend/src/layouts/`
- `frontend/src/auth/`
- `frontend/src/lib/api/`
- `frontend/src/types/api.generated.ts`
- `frontend/src/mocks/`
- `docs/historias/`

## Assumptions

- Existe una página funcional de creación de concursos.
- Existe un listado administrativo con una zona de acciones extensible.
- Existe una infraestructura de TanStack Query o equivalente.
- Existe HttpClient con autenticación global.
- Existe `AdminLayout`.
- Existe un guard para el rol contractual de administración de concursos.
- El backend dispone de un GET editable y un PUT multipart.
- El GET editable no expone la contraseña.
- El PUT exige un ZIP.
- El backend valida colores y congelamiento.
- Los problemas se identifican por inciso.
- El mapper de colores puede ubicarse fuera de páginas sin romper reglas de arquitectura.
- No se confirma si el endpoint de creación soporta `minutosCongelamiento`.
- No se confirma si la respuesta del listado contiene problemas y colores.
- No se confirma la representación API de colores.
- No se confirma si `GlobeIllustration` admite color dinámico.
- No se confirma si la contraseña vacía significa convertir a público o mantener la contraseña.
- No se confirma el patrón de navegación posterior a create/update.

## Dependencies

- Documento real de UJ-19.
- Código actual de creación y listado.
- Contratos backend y OpenAPI actuales.
- Confirmación de la semántica de contraseña.
- Confirmación de los datos disponibles en el listado.
- Confirmación del binder multipart.
- Confirmación de query keys.
- Confirmación de la política de disponibilidad del botón de edición.
- Infraestructura de pruebas y MSW existente.

## Impact

- El listado administrativo incorporará dos acciones por concurso.
- El router incorporará una ruta protegida.
- El formulario de creación puede requerir una extracción acotada para reutilización.
- La feature contests incorporará lógica de edición, colores y validación.
- Los tipos y servicios incorporarán contratos editables.
- Los mocks y tests cubrirán GET, PUT, modal y errores.
- La documentación UJ-19 registrará la integración.
- Ranking solo debe inspeccionarse para preservar una futura frontera de consumo.

## Risks

### Risk 1: Duplicar el formulario de creación

- Probability: High.
- Impact: High.
- Mitigation: Inventariar el formulario y extraer solo secciones reutilizables.
- Verification: Create y edit comparten componentes o contrato de formulario sin copias completas.

### Risk 2: Romper estilos de creación

- Probability: Medium.
- Impact: High.
- Mitigation: Mantener JSX y clases existentes; limitar cambios a props y composición.
- Verification: Comparación visual y pruebas de creación.

### Risk 3: Permitir editar concursos iniciados

- Probability: Medium.
- Impact: Critical.
- Mitigation: Aplicar policy visual segura y mantener validación backend.
- Verification: GET y PUT rechazan iniciado/finalizado; la UI no permite submit.

### Risk 4: Mostrar el botón sin guard

- Probability: Medium.
- Impact: High.
- Mitigation: Combinar visibilidad con protección de ruta.
- Verification: Usuario no autorizado no ve la acción ni abre la URL.

### Risk 5: Depender de `location.state`

- Probability: Medium.
- Impact: High.
- Mitigation: Resolver código desde params y cargar desde backend.
- Verification: Refresh directo reconstruye la edición.

### Risk 6: Convertir un concurso privado en público accidentalmente

- Probability: High.
- Impact: Critical.
- Mitigation: Confirmar semántica del PUT y diseñar una intención explícita de privacidad.
- Verification: Test contractual de mantener privacidad sin conocer la contraseña.

### Risk 7: Exponer contraseña

- Probability: Low.
- Impact: Critical.
- Mitigation: No precargarla, no persistirla y no incluirla en logs o queries.
- Verification: Inspección de DOM, storage, logs y Network.

### Risk 8: Enviar fecha UTC incorrecta

- Probability: Medium.
- Impact: High.
- Mitigation: Reutilizar conversión de creación y probar round-trip local/UTC.
- Verification: Tests con zonas horarias y validación manual.

### Risk 9: Tratar ZIP como opcional

- Probability: High.
- Impact: High.
- Mitigation: Marcarlo obligatorio en edit y explicar el contrato.
- Verification: Submit bloqueado sin ZIP y test del FormData.

### Risk 10: Permitir colores duplicados

- Probability: Medium.
- Impact: High.
- Mitigation: Validación central normalizada por todos los problemas.
- Verification: Errores identifican los incisos en conflicto.

### Risk 11: Enviar hexadecimal cuando backend espera nombre

- Probability: High.
- Impact: High.
- Mitigation: Confirmar constante y DTO backend antes de implementar mapper.
- Verification: Test de serialización contra contrato.

### Risk 12: Enviar nombre cuando backend espera hexadecimal

- Probability: High.
- Impact: High.
- Mitigation: Mantener un valor API explícito separado de label y hex.
- Verification: Request inspeccionado y prueba del mapper.

### Risk 13: Duplicar la constante de colores

- Probability: Medium.
- Impact: Medium.
- Mitigation: Definir una sola fuente tipada.
- Verification: Búsqueda global sin catálogos paralelos.

### Risk 14: Acoplar ranking a una página de concursos

- Probability: Medium.
- Impact: High.
- Mitigation: Ubicar el dominio de color fuera de componentes de edición.
- Verification: `features/ranking` no importa páginas o modales de contests.

### Risk 15: Hacer un request adicional innecesario para el modal

- Probability: Medium.
- Impact: Medium.
- Mitigation: Usar caché del listado cuando contenga los datos.
- Verification: Network muestra una sola consulta.

### Risk 16: Usar GET editar para activos o finalizados

- Probability: High.
- Impact: High.
- Mitigation: No adoptar ese endpoint como fuente general del modal.
- Verification: Modal de concursos no editables no dispara GET editar.

### Risk 17: Permitir agregar o quitar problemas

- Probability: Medium.
- Impact: Critical.
- Mitigation: Edit mode usa una colección fija.
- Verification: No existen acciones add/remove y el submit conserva todos los incisos.

### Risk 18: Cambiar la cantidad de casos

- Probability: Medium.
- Impact: High.
- Mitigation: Mostrar cantidad como read-only y validar el ZIP.
- Verification: Payload mantiene la cantidad original.

### Risk 19: No invalidar caché

- Probability: Medium.
- Impact: High.
- Mitigation: Invalidar keys exactas de listado y detalle.
- Verification: Listado y modal muestran datos nuevos sin reload.

### Risk 20: Mostrar colores antiguos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Actualizar caché o refetch exacto tras PUT.
- Verification: Abrir modal después del update muestra los colores nuevos.

### Risk 21: Tener más problemas que colores

- Probability: Low a Medium.
- Impact: High.
- Mitigation: Detectar más de trece y bloquear submit.
- Verification: Test con catorce problemas.

### Risk 22: Perder accesibilidad en botones solo con iconos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Nombre accesible, tooltip, focus-visible y target adecuado.
- Verification: Tests de roles/nombres y recorrido por teclado.

## Rollback Strategy

- Retirar la ruta de edición y la acción de lápiz sin eliminar el formulario compartido hasta evaluar su reutilización.
- Retirar el modal y su acción sin modificar el listado base.
- Restaurar create a su composición previa si la extracción compartida introduce una regresión.
- Revertir tipos, servicios y query keys de edición como una unidad.
- Restaurar el catálogo o mapper solo si ningún consumidor permanece.
- No modificar ranking durante rollback.
- Revertir cambios de `GlobeIllustration` únicamente junto con sus consumidores.
- Restaurar documentación solo en las secciones añadidas por este change.
- No revertir cambios preexistentes detectados en baseline.
- Verificar rollback con:
  - login;
  - AdminLayout;
  - listado administrativo;
  - filtros y paginación;
  - creación;
  - rutas administrativas;
  - concursos de usuario;
  - Problems;
  - Submissions;
  - ranking sin cambios;
  - tests;
  - typecheck;
  - build.

## Success Criteria

- Existen dos acciones junto a cada concurso según la disponibilidad contractual.
- La acción de edición usa router y route builder.
- La ruta usa `AdminLayout`.
- La ruta está protegida.
- La ruta soporta refresh.
- El GET editable precarga datos reales.
- Solo un concurso próximo y del creador puede actualizarse.
- Create y edit reutilizan el mismo núcleo de formulario.
- Create mantiene `Crear Concurso`.
- Edit muestra `Actualizar concurso`.
- El código no es editable cuando el PUT no lo permite.
- `minutosCongelamiento` puede modificarse.
- Congelamiento cero es válido.
- Congelamiento negativo, igual o mayor a duración es inválido.
- ZIP es obligatorio.
- No se agregan ni eliminan problemas.
- Los incisos permanecen estables.
- La cantidad de casos permanece.
- Cada problema tiene color válido.
- Solo se usan los trece colores.
- No hay colores repetidos.
- Más de trece problemas bloquea el submit.
- El mapper es tipado y único.
- `GlobeIllustration` se reutiliza.
- El modal es read-only.
- El modal ordena problemas por inciso.
- No existen requests innecesarios cuando el listado ya contiene colores.
- La privacidad no puede cambiar accidentalmente.
- El FormData coincide con el binder.
- La fecha no sufre doble conversión.
- La caché se actualiza.
- Creación y listado no presentan regresiones.
- Ranking no cambia funcionalmente.
- Lint, typecheck, tests y build pasan.
- Dev inicia.
- La documentación queda actualizada.
