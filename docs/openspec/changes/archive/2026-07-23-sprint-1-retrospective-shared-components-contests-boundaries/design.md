# Design

## Components Touched

### Componentes compartidos

La versión pública inspeccionada agrupa los componentes en:

- common;
- forms;
- navigation;
- tables.

La utilidad `cn` ya combina `clsx` y `tailwind-merge`, por lo que no se necesita una dependencia o estrategia nueva. :contentReference[oaicite:6]{index=6}

### Feature contests

La versión pública contiene carpetas `components` y `pages`, pero conserva en la raíz componentes de creación, pantalla administrativa, hooks, servicio, schema, mapper, tipos, constantes y tests. La mayoría de los nombres observados son inequívocamente administrativos. :contentReference[oaicite:7]{index=7}

### Documentación

- Documento fuente local esperado:
  - `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`
- Destino:
  - `docs/retrospectivas/retrospectiva-sprint-1.md`

La fuente no aparece en `main` público y la carpeta destino tampoco existe allí, por lo que ambos deben verificarse en el workspace antes del movimiento. :contentReference[oaicite:8]{index=8}

## Boundaries Respected

- Los componentes compartidos ofrecen primitivas visuales, no lógica de features.
- `className` extiende presentación sin cambiar comportamiento.
- `cn` continúa siendo la única estrategia de merge.
- Las features no copian componentes compartidos para personalizarlos.
- Admin y user no importan implementaciones internas uno del otro.
- Shared no contiene políticas de autorización.
- El router consume páginas públicas de la feature, no archivos internos arbitrarios.
- La reorganización no cambia contratos HTTP o reglas de concursos.
- La retrospectiva documenta hechos; no sustituye specs o changes.
- UJ-11 se mantiene fuera de ejecución.

## Contracts Changed

No external contract changes are confirmed from the provided input.

Se amplían contratos internos de componentes.

### Common Visual Contract

Entrada nueva o estandarizada:

- `className?: string`

Comportamiento:

- base sin personalización;
- base combinada con personalización;
- clases externas colocadas al final del merge;
- props nativas preservadas.

### Contests Boundary Contract

- `admin/`: políticas y flujos de administración.
- `user/`: flujos reales del usuario cuando existan.
- `shared/`: dominio o visuales consumidos realmente por ambas áreas.
- API pública opcional mediante exports acotados.

### Documentation Contract

- Una única retrospectiva Sprint 1.
- Documento anterior removido.
- Starfish, análisis, acciones SMART, medición, checklist y DoD.

## Data Flow

### className

- Consumidor suministra props.
- Componente separa `className`.
- Componente calcula clases de variante, estado y base.
- `cn` combina:
  - clases base;
  - clases de estado;
  - clases externas.
- `tailwind-merge` resuelve conflictos.
- Props nativas se propagan al elemento correcto.

### Componente compuesto

- `className` personaliza root.
- Props específicas continúan controlando hijos.
- Una API por slots se conserva solo si ya existe o hay necesidad real.

### Reorganización de contests

- Inventario.
- Grafo de imports.
- Clasificación.
- Propuesta de destinos.
- Coordinación con UJ-11.
- Movimientos administrativos.
- Movimientos de usuario únicamente con archivos reales.
- Shared únicamente con doble consumo.
- Actualización de imports.
- Pruebas de regresión.
- Limpieza de rutas antiguas.

### Retrospectiva

- Mover documento.
- Inventariar afirmaciones existentes.
- Contrastar con código, tests, changes y evidencias.
- Preservar hechos.
- Reorganizar en Starfish.
- Añadir análisis.
- Añadir SMART.
- Añadir checklist y DoD.
- Actualizar referencias.

## Required Tests Per Layer

### Shared Components

- Base sin className.
- Base con clase externa.
- Conflicto Tailwind.
- Clases no conflictivas.
- Props nativas.
- Eventos.
- Disabled.
- ARIA.
- data attributes.
- Ref existente.
- Componente compuesto.
- Semántica de tabla.
- Formularios.
- Feedback.
- Navegación.
- Ausencia de `undefined`.

### Integration

- `/dev/ui`.
- AuthLayout.
- AdminLayout.
- UserLayout existente.
- Login y registro.
- Administración de concursos.
- Creación de concursos.

### Contests Structure

- Router.
- Lazy imports.
- Servicios.
- Hooks.
- MSW.
- Tests movidos.
- Aliases.
- Ausencia de imports antiguos.
- Ausencia de ciclos.

### Documentation

- Archivo destino existe.
- Archivo origen no existe.
- Referencias actualizadas.
- Starfish completo.
- SMART presente.
- Checklist presente.
- Evidencias pendientes sin links rotos.
- UJ-11 marcada como futura.

## Tradeoffs Accepted

- Se amplía la API de componentes sin rediseñarlos.
- Se mantiene `className` como contrato mínimo.
- No todos los componentes recibirán APIs por slots.
- No todos los componentes se convertirán a forwardRef.
- Se conservarán archivos grandes `index.tsx` si dividirlos no es necesario para el objetivo.
- La estructura user puede no materializarse todavía.
- Se prioriza claridad de boundaries sobre una jerarquía simétrica de carpetas.
- Se puede mantener un barrel acotado para compatibilidad.
- La retrospectiva puede conservar pendientes de evidencia.
- El change puede requerir varios PRs encadenados por su superficie, aunque siga siendo un único change OpenSpec.

## Implementation Constraints

- No modificar la apariencia predeterminada.
- No introducir nuevas variantes.
- No reemplazar `cn`.
- No agregar dependencias.
- No propagar props inválidas.
- No romper refs.
- No modificar comportamiento de contests.
- No crear user vacío.
- No usar shared como miscelánea.
- No crear barrels circulares.
- No duplicar archivos durante movimientos.
- No perder contenido documental válido.
- No afirmar logros sin evidencia.
- No implementar UJ-11.
- No usar OpenSpec CLI.
- No realizar commit ni push.

## Inventario Inicial de Componentes

El inventario siguiente está basado en la rama pública y debe recalibrarse contra el workspace local.

| Componente       | Tipo                 | className actual | Ref verificada | Props nativas | Acción preliminar                   |
| ---------------- | -------------------- | ---------------: | -------------: | ------------: | ----------------------------------- |
| Button           | Primitiva visual     |               Sí |  No confirmada |            Sí | Verificar merge y compatibilidad    |
| IconButton       | Primitiva visual     |               Sí |  No confirmada |            Sí | Verificar merge y label             |
| LinkButton       | Navegación           |               Sí |  No confirmada |            Sí | Verificar merge                     |
| BrandMark        | Imagen/branding      |               Sí |  No confirmada |     Parciales | Verificar elemento principal        |
| Surface          | Contenedor           |               Sí |  No confirmada |            Sí | Sin cambio salvo pruebas            |
| Card             | Contenedor           |               Sí |  No confirmada |            Sí | Sin cambio salvo pruebas            |
| Divider          | Primitiva visual     |               Sí |  No confirmada |            Sí | Sin cambio salvo pruebas            |
| Avatar           | Compuesto            |               Sí |  No confirmada |  No completas | Evaluar props nativas               |
| Badge            | Feedback             |               Sí |  No confirmada |            Sí | Sin cambio salvo pruebas            |
| StatusDot        | Feedback             |               No |  No confirmada |            No | Añadir className y props aplicables |
| Alert            | Feedback             |               Sí |  No confirmada |            Sí | Sin cambio salvo pruebas            |
| Spinner          | Feedback             |               No |  No confirmada |            No | Añadir className al icono raíz      |
| ProgressBar      | Feedback compuesto   |               No |  No confirmada |            No | Añadir className al contenedor      |
| Skeleton         | Feedback             |               Sí |  No confirmada |     Limitadas | Evaluar props div                   |
| EmptyState       | Feedback compuesto   |               No |  No confirmada |            No | Añadir className al root            |
| Label            | Formulario           |               Sí |  No confirmada |            Sí | Verificar merge                     |
| FormHint         | Formulario           |               Sí |  No confirmada |            Sí | Verificar merge                     |
| FormError        | Formulario           |               Sí |  No confirmada |            Sí | Verificar merge                     |
| Input            | Formulario           |               Sí |  No confirmada |            Sí | Verificar ref y merge               |
| Textarea         | Formulario           |               Sí |  No confirmada |            Sí | Verificar ref y merge               |
| Select           | Formulario           |               Sí |  No confirmada |            Sí | Verificar ref y merge               |
| Checkbox         | Formulario           |   Sustituye base |  No confirmada |            Sí | Corregir combinación                |
| Radio            | Formulario           |   Sustituye base |  No confirmada |            Sí | Corregir combinación                |
| PasswordInput    | Formulario compuesto | En input interno |  No confirmada |         Input | Definir root vs input               |
| FormField        | Formulario compuesto |               No |  No confirmada |            No | Añadir className al root            |
| SearchInput      | Formulario compuesto | En input interno |  No confirmada |         Input | Definir root vs input               |
| PasswordStrength | Feedback/formulario  |               No |  No confirmada |            No | Añadir className al root            |
| FileDropzone     | Formulario compuesto |               No |    Ref interna |            No | Añadir className al root            |
| Breadcrumbs      | Navegación           |               No |  No confirmada |            No | Añadir className al nav             |
| Stepper          | Navegación           |               No |  No confirmada |            No | Añadir className al ol              |
| Pagination       | Navegación           |               No |  No confirmada |            No | Añadir className al nav             |
| StatCard         | Contenedor/feedback  |               No |  No confirmada |            No | Añadir className al root            |
| DataTable        | Tabla compuesta      |               No |  No confirmada |            No | Añadir className al wrapper         |

El código público sustenta esta clasificación inicial, pero no confirma versiones posteriores ni refs añadidas localmente. :contentReference[oaicite:9]{index=9}

## Estructura Objetivo de Contests

Estructura mínima conceptual:

- `features/contests/admin/`
  - únicamente carpetas con archivos administrativos reales;
- `features/contests/user/`
  - solo cuando exista código real del usuario;
- `features/contests/shared/`
  - solo cuando exista consumo real por ambos contextos;
- export público acotado, si no genera ciclos.

En la versión pública, los archivos raíz relacionados con `ContestsAdminScreen`, creación, ZIP, problemas, schema, mapper, servicio y hooks son candidatos administrativos, sujetos a validación de consumidores. :contentReference[oaicite:10]{index=10}

## Retrospectiva

### Starfish propuesta

- Keep Doing:
  - documentación por change;
  - pruebas de comportamiento;
  - contratos backend como fuente;
  - trabajo incremental;
  - backend como autoridad;
  - validación antes de cierre.

- Less Of:
  - fixes reactivos por contratos no verificados;
  - componentes temporales;
  - movimientos estructurales tardíos;
  - mezcla admin/user;
  - deuda de formato.

- More Of:
  - inspección previa;
  - instalación reproducible;
  - validación visual;
  - componentes extensibles;
  - boundaries por contexto;
  - coordinación antes de mover.

- Stop Doing:
  - páginas de prueba persistentes;
  - rutas inventadas;
  - valores visuales usados como contratos;
  - duplicación de primitivas;
  - cierre con checks fallidos.

- Start Doing:
  - className opcional estandarizado;
  - contests admin/user/shared;
  - checks completos;
  - backlog de mejoras;
  - coordinación previa para UJ-11.

Cada punto debe mantenerse únicamente cuando el workspace o la documentación lo respalde.

## Acciones SMART

| Mejora seleccionada          | Acción SMART para Sprint 2                                                                                                                                                                             | Cómo se medirá                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Componentes base extensibles | Durante el inicio del Sprint 2 se inventariarán y actualizarán los componentes visuales públicos para aceptar `className` opcional, conservar estilos base y permitir personalización sin duplicación. | Inventario completo; componentes aplicables compatibles; pruebas; format, lint, typecheck, tests y build verdes.          |
| Límites claros en contests   | Durante el inicio del Sprint 2 se clasificará y moverá el código de contests a boundaries admin, user y shared, sin cambiar comportamiento.                                                            | Admin bajo su boundary; user solo con código real; shared con doble consumo; cero imports antiguos; rutas y tests verdes. |
| Validación reproducible      | Antes de cerrar cada change del Sprint 2 se ejecutará la secuencia técnica acordada y se documentarán bloqueos reales.                                                                                 | Registro de format, lint, typecheck, tests, build, dev y diff check en la verificación del change.                        |

## Open Design Questions

### Blocking: Estado del workspace

- ¿Qué componentes, layouts y documentos existen localmente pero no en `main`?
- Clasificación: Blocking antes de cerrar el inventario.

### Blocking: Documento fuente

- ¿Existe exactamente `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`?
- Clasificación: Blocking antes del movimiento.

### Blocking: Imports externos de contests

- ¿Qué rutas internas consume router u otras features?
- Clasificación: Blocking antes de mover archivos.

### Blocking: Trabajo paralelo de UJ-11

- ¿Hay una rama o modificaciones activas sobre las ubicaciones actuales?
- Clasificación: Blocking para evitar conflictos.

### Research required: Refs

- ¿Qué componentes locales utilizan forwardRef?
- Clasificación: Research required para compatibilidad.

### Research required: API pública

- ¿Existe ya un barrel de contests en el workspace?
- Clasificación: Research required.

### Non-blocking: user/

- ¿Existe código real del usuario?
- Clasificación: Non-blocking; no crear la carpeta si no existe.

### Human validation required: Starfish

- ¿El equipo valida las conclusiones y acciones?
- Clasificación: Human validation required para marcar la retrospectiva como aprobada.
