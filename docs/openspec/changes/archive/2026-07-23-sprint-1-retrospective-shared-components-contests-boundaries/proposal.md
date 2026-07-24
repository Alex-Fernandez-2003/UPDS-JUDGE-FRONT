# Proposal

## Problem Statement

Este change es una mejora técnica derivada de la retrospectiva del Sprint 1 y no implementa una historia de usuario.

El Sprint 1 dejó una base funcional que requiere dos mejoras estructurales antes de continuar con nuevas contribuciones:

1. Los componentes visuales compartidos no aplican un contrato uniforme de personalización externa.
2. `features/contests` no expresa con claridad los límites entre administración, usuario y elementos realmente compartidos.

La versión pública inspeccionada organiza los componentes compartidos en `common`, `forms`, `navigation` y `tables`. Ya existe una utilidad central `cn` basada en `clsx` y `tailwind-merge`, y ambas dependencias están instaladas. Varios componentes ya combinan estilos predeterminados con `className`, pero otros no aceptan la prop, la aplican a un slot interno o permiten que las props nativas reemplacen accidentalmente las clases base. :contentReference[oaicite:0]{index=0}

Ejemplos verificados en la versión pública:

- `Button`, `IconButton`, `LinkButton`, `Surface`, `Card`, `Divider`, `Badge`, `Alert`, `Input`, `Textarea` y `Select` ya usan `cn`.
- `StatusDot`, `Spinner`, `ProgressBar`, `EmptyState`, `FormField`, `PasswordStrength`, `FileDropzone`, `Breadcrumbs`, `Stepper`, `Pagination`, `StatCard` y `DataTable` no exponen un `className` raíz uniforme.
- `Checkbox` y `Radio` reciben props nativas, pero su orden actual de propagación permite que un `className` externo sustituya las clases predeterminadas en lugar de combinarlas.
- `PasswordInput` y `SearchInput` aplican `className` al input interno, no al contenedor raíz, por lo que su contrato debe documentarse o ajustarse cuidadosamente. :contentReference[oaicite:1]{index=1}

La versión pública de `features/contests` conserva una estructura parcialmente plana: existen carpetas `components` y `pages`, pero también componentes, servicios, hooks, schemas, mappers, tipos, tests y archivos de creación directamente en la raíz. Los nombres visibles corresponden principalmente a administración y creación de concursos, por lo que el área administrativa puede clasificarse con alta confianza; no se observa todavía código real de usuario que justifique crear carpetas vacías. :contentReference[oaicite:2]{index=2}

La versión pública consultada no contiene `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md` ni la carpeta `docs/retrospectivas/`. También contiene solo una parte de los changes mencionados en el contexto posterior del Sprint 1. Esto indica que el workspace que consumirá Pi puede estar adelantado respecto a `main`; el movimiento documental y la lista final de changes relacionados deben confirmarse localmente antes de ejecutarse. :contentReference[oaicite:3]{index=3}

El change también debe convertir la documentación transversal existente del App Shell en una retrospectiva formal Starfish del Sprint 1, preservando hechos verificables y registrando acciones SMART para el Sprint 2.

La contribución futura `uj11-partial-user-dashboard-stats-recent-submissions` permanece pendiente. Este change prepara componentes base extensibles y límites de `contests`, pero no implementa estadísticas, envíos ni la lista de concursos del usuario.

## Goals

- Crear un único change denominado `sprint-1-retrospective-shared-components-contests-boundaries`.
- Mantener sus artefactos en `docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/`.
- Inventariar todos los componentes visuales públicos de `frontend/src/components/`.
- Distinguir componentes, tests, barrels, tipos, constantes y auxiliares.
- Estandarizar `className?: string` en todos los componentes visuales públicos donde sea técnicamente aplicable.
- Aplicar `className` al elemento raíz visual o al elemento principal documentado.
- Preservar exactamente los estilos predeterminados cuando no se suministre personalización.
- Combinar clases mediante la utilidad `cn` existente.
- Permitir que `tailwind-merge` resuelva conflictos a favor de la personalización externa.
- Preservar props nativas, eventos, atributos ARIA, `data-*`, estados disabled y tipos existentes.
- Preservar referencias existentes.
- Evaluar `forwardRef` solo cuando exista una necesidad real.
- Mantener semántica y accesibilidad de formularios, navegación y tablas.
- Actualizar pruebas de componentes sin depender solo de snapshots o cadenas completas de clases.
- Clasificar cada archivo de `features/contests` como:
  - administrativo;
  - usuario;
  - compartido real;
  - sin movimiento.
- Mover código exclusivamente administrativo bajo `features/contests/admin/`.
- Crear `features/contests/user/` solo cuando exista al menos un archivo real de usuario.
- Crear `features/contests/shared/` únicamente para elementos consumidos por ambas áreas.
- Evitar carpetas vacías, duplicados, reexports obsoletos y ciclos.
- Preservar comportamiento de administración, filtros, resumen y creación.
- Definir una API pública acotada para la feature cuando un barrel aporte estabilidad real.
- Mover el documento del App Shell a `docs/retrospectivas/retrospectiva-sprint-1.md`.
- Transformarlo en una retrospectiva Starfish.
- Preservar información histórica válida.
- Registrar acciones SMART y mediciones para el Sprint 2.
- Registrar explícitamente que UJ-11 parcial sigue pendiente.
- Exigir format, lint, typecheck, tests, build, dev y `git diff --check`.
- No realizar implementación de UJ-11 dentro de este change.

## Non-Goals

- No implementar estadísticas rápidas.
- No integrar `stats-contest`.
- No implementar una tabla de envíos recientes.
- No integrar un endpoint general de envíos.
- No implementar `GET /api/Concursos` para UJ-11.
- No implementar filtros En curso, Próximo o Finalizado.
- No crear cards del usuario.
- No crear nuevas rutas.
- No implementar una historia de usuario.
- No cambiar funcionalmente administración de concursos.
- No rediseñar componentes compartidos.
- No crear nuevas variantes visuales no requeridas.
- No sustituir Tailwind.
- No migrar a otra librería UI.
- No agregar una dependencia para combinar clases.
- No convertir automáticamente todos los componentes a `forwardRef`.
- No agregar APIs `classNames` por slots sin una necesidad comprobada.
- No modificar todos los consumidores para demostrar `className`.
- No mover archivos ambiguos a `shared`.
- No crear carpetas vacías o `.gitkeep`.
- No crear un barrel global que reexporte toda la feature.
- No modificar backend.
- No modificar `database/`.
- No crear una retrospectiva de Sprint 2.
- No crear un segundo documento de acciones de mejora.
- No crear capturas ficticias.
- No archivar changes.
- No utilizar OpenSpec CLI.
- No realizar commit ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/proposal.md`
- `docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/spec.md`
- `docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/design.md`
- `docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/tasks.md`

### Componentes compartidos

Áreas verificadas públicamente:

- `frontend/src/components/common/`
- `frontend/src/components/forms/`
- `frontend/src/components/navigation/`
- `frontend/src/components/tables/`
- `frontend/src/components/components.test.tsx`
- `frontend/src/lib/utils/cn.ts`

La versión pública mantiene un único `index.tsx` por categoría y una prueba transversal de fundación. :contentReference[oaicite:4]{index=4}

### Feature de concursos

Áreas probables:

- componentes administrativos;
- páginas administrativas;
- creación de concursos;
- filtros y resumen;
- hooks;
- servicios;
- schemas;
- mappers;
- tipos;
- constantes;
- tests;
- mocks;
- imports del router;
- imports externos.

### Routing y layouts

- Imports de páginas de concursos.
- Lazy imports, si existen.
- Tests del router.
- AdminLayout únicamente para regresión.
- UserLayout únicamente para validar que no se crean dependencias rotas.

### Documentación

Origen esperado en el workspace:

- `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`

Destino:

- `docs/retrospectivas/retrospectiva-sprint-1.md`

Referencias internas:

- índices documentales;
- otros documentos;
- changes relacionados;
- rutas de evidencias.

### Tooling y validación

El `package.json` público confirma scripts para `format:check`, lint, typecheck, tests, build y dev; también confirma que `clsx` y `tailwind-merge` ya forman parte de las dependencias. :contentReference[oaicite:5]{index=5}

## Assumptions

- El workspace local de Pi contiene cambios de Sprint 1 que todavía no aparecen en la rama pública inspeccionada.
- El documento del App Shell existe localmente en la ruta indicada por el usuario.
- Existen más componentes o versiones modificadas respecto al inventario público.
- Existen implementaciones actuales de administración, resumen, filtros, branding y UserLayout que deben preservarse.
- `cn` sigue siendo la utilidad central y conserva su implementación con `clsx` y `tailwind-merge`.
- La contribución parcial UJ-11 aún no fue aplicada.
- No existe código real de usuario dentro de contests que obligue a materializar `user/`; esto debe confirmarse localmente.
- No se confirma si algún consumidor externo importa archivos internos de contests en vez de una API pública.
- No se confirma si existen refs implementadas en componentes añadidos después de la versión pública.
- No se confirma si el equipo ya validó formalmente contenido para la retrospectiva.
- No se confirma cuáles capturas existen.

## Risks

### Risk 1: Regresión visual global por cambios compartidos

- Probability: High.
- Impact: High, porque los componentes se utilizan en múltiples pantallas.
- Mitigation: Inventario previo, cambios por grupo, pruebas de estilo predeterminado y revisión de `/dev/ui`.

### Risk 2: `className` aplicado al elemento equivocado

- Probability: Medium.
- Impact: Medium.
- Mitigation: Documentar el elemento raíz o principal para cada componente compuesto antes de modificarlo.

### Risk 3: Personalización externa reemplaza estilos base

- Probability: Medium.
- Impact: High.
- Mitigation: Usar `cn(defaultClasses, className)` y pruebas que verifiquen base más personalización.

### Risk 4: Merge de Tailwind produce una prioridad no esperada

- Probability: Medium.
- Impact: Medium.
- Mitigation: Reutilizar `tailwind-merge` existente y probar conflictos representativos, sin crear un parser propio.

### Risk 5: Colisión entre props nativas y props personalizadas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Extender tipos nativos, omitir únicamente atributos incompatibles y verificar propagación DOM.

### Risk 6: Ref existente deja de apuntar al elemento correcto

- Probability: Low a Medium.
- Impact: High para formularios y foco.
- Mitigation: Preservar `forwardRef` existente y añadir pruebas de ref donde aplique.

### Risk 7: API de un componente compuesto se vuelve ambigua

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mantener `className` raíz como contrato mínimo y no introducir slots especulativos.

### Risk 8: Movimientos de contests rompen imports

- Probability: High.
- Impact: High.
- Mitigation: Usar movimientos controlados, búsqueda global, actualización de router, mocks, tests y aliases.

### Risk 9: Barrel crea dependencias circulares

- Probability: Medium.
- Impact: High.
- Mitigation: Mantener imports directos cuando un barrel no aporta una frontera estable.

### Risk 10: `shared` se convierte en una carpeta genérica

- Probability: Medium.
- Impact: Medium.
- Mitigation: Exigir consumidores reales en admin y user antes de mover un archivo a shared.

### Risk 11: No existe código de usuario y la estructura queda vacía

- Probability: Medium.
- Impact: Low.
- Mitigation: No crear `user/` hasta que exista un archivo real; documentarla como boundary futuro.

### Risk 12: Conflicto con trabajo futuro de UJ-11

- Probability: High.
- Impact: High.
- Mitigation: Coordinar rutas destino antes de movimientos y completar la reorganización antes de iniciar la contribución parcial.

### Risk 13: La retrospectiva pierde información histórica

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mover primero el documento, conservar contenido verificable y reestructurarlo incrementalmente.

### Risk 14: Referencias al documento antiguo quedan rotas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Buscar la ruta anterior en todo el repositorio y actualizar cada consumidor.

### Risk 15: Se documentan logros no verificables

- Probability: Medium.
- Impact: High para trazabilidad.
- Mitigation: Derivar resultados y dificultades solo del código, tests, changes y evidencias existentes.

## Rollback Strategy

- Restaurar la API anterior de cada componente de forma individual si aparece una regresión.
- Mantener `cn` sin cambios para evitar afectar consumidores.
- Revertir cambios de `className` por categoría en orden inverso:
  - tablas;
  - navegación;
  - formularios;
  - common.
- Restaurar los archivos de contests a sus ubicaciones anteriores actualizando primero router, tests y imports.
- Eliminar las carpetas nuevas solo cuando estén vacías después del rollback.
- Restaurar el documento a `docs/historias/` si la retrospectiva queda incompleta o pierde información.
- Restaurar enlaces internos junto con el documento.
- No revertir cambios ajenos detectados en el baseline.
- Verificar después del rollback:
  - componentes compartidos;
  - `/dev/ui`;
  - router;
  - administración de concursos;
  - filtros;
  - resumen;
  - creación;
  - tests;
  - build.
- No se requiere rollback de datos ni backend.

## Success Criteria

- Existe un inventario completo de componentes visuales públicos.
- Cada componente aplicable acepta `className?: string`.
- Sin `className`, su apariencia predeterminada permanece igual.
- Con `className`, las clases base se preservan.
- Las clases externas conflictivas pueden prevalecer mediante `tailwind-merge`.
- No se generan clases `undefined`.
- Props nativas, eventos, disabled, ARIA y `data-*` continúan funcionando.
- Las refs existentes continúan apuntando al elemento correcto.
- Los componentes de tabla mantienen semántica HTML.
- Los componentes de formulario mantienen integración y accesibilidad.
- Las pruebas no dependen exclusivamente de snapshots o strings completos.
- `features/contests` separa código administrativo de código del usuario cuando este exista.
- `shared` contiene únicamente elementos con consumo real en ambas áreas.
- No quedan imports hacia ubicaciones anteriores.
- No quedan archivos duplicados, carpetas vacías o ciclos.
- Administración, listado, filtros, resumen y creación no presentan regresiones.
- El documento del App Shell se mueve realmente a `docs/retrospectivas/retrospectiva-sprint-1.md`.
- El archivo anterior deja de existir.
- La retrospectiva usa Starfish.
- Contiene análisis por funcionalidad, calidad, UX, mantenibilidad y proceso.
- Contiene acciones SMART y mediciones.
- UJ-11 parcial permanece marcada como futura.
- Las evidencias quedan agregadas o explícitamente pendientes.
- `format:check`, lint, typecheck, tests, build, dev y `git diff --check` finalizan sin fallos atribuibles al change.
- No se implementa ninguna funcionalidad de UJ-11.
- No se realiza commit ni push.
