# Design

## Components Touched

### Manifiesto y lockfiles

- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/pnpm-lock.yaml`

### Configuración pnpm condicional

- `frontend/.npmrc`, solo si una opción compatible y no sensible resulta necesaria.
- `frontend/.pnpmfile.cjs`, solo si ya existe una necesidad demostrada.
- `frontend/pnpm-workspace.yaml`, solo si existe un propósito real.
- configuración de aprobación de scripts soportada por la versión seleccionada.

### Documentación activa

- `README.md`
- `frontend/README.md`, cuando exista.
- guía de arquitectura o desarrollo frontend existente.
- otras guías activas que describan instalación o validación.

### Integración, solo cuando exista

- workflows de CI.
- Dockerfile frontend.
- configuración de deployment.
- scripts auxiliares.

### Inspección en modo lectura

- imports bajo `frontend/src/`.
- Vite.
- TypeScript.
- lint.
- Vitest.
- `.gitignore`.
- documentación histórica archivada.

## Boundaries Respected

- `package.json` es el manifiesto canónico.
- Cada gestor conserva su propio lockfile.
- npm y pnpm comparten scripts, pero no `node_modules`.
- Los lockfiles se generan con herramientas, no se editan manualmente.
- El change modifica tooling y documentación, no comportamiento.
- Las dependencias solo cambian para corregir una incompatibilidad demostrada.
- CI npm se conserva.
- Docker npm se conserva por defecto.
- Corepack no es una dependencia funcional de la aplicación.
- Un workspace no se utiliza para simular un monorepo.
- Documentación activa se actualiza; documentos históricos no.
- El informe final permanece cerrado.
- Judgment Day permanece como revisión posterior.

## Contracts Changed

No external contract changes are confirmed from the provided input.

El change modifica contratos de desarrollo internos:

- gestores de paquetes soportados;
- lockfiles requeridos;
- procedimiento de instalación;
- comandos de validación;
- procedimiento de mantenimiento de dependencias;
- expectativas de CI.

No modifica:

- APIs;
- rutas;
- DTOs;
- interfaces visuales;
- comportamiento de negocio;
- contratos backend;
- motor de evaluación.

## Data Flow

### Flujo npm

- Desarrollador entra en `frontend/`.
- npm lee `package.json`.
- `npm ci` valida `package-lock.json`.
- npm crea un `node_modules` aislado.
- El desarrollador ejecuta scripts reales.
- La validación comprueba lint, typecheck, tests y build.
- El lockfile permanece estable.

### Flujo pnpm

- Desarrollador entra en `frontend/`.
- pnpm compatible lee `package.json`.
- pnpm valida `pnpm-lock.yaml`.
- pnpm crea una instalación aislada.
- El desarrollador ejecuta los mismos scripts.
- La validación comprueba lint, typecheck, tests y build.
- El lockfile permanece estable.

### Flujo de cambio de dependencia

- Se define el cambio intencional en `package.json`.
- Se actualiza el lockfile npm con una herramienta compatible.
- Se actualiza el lockfile pnpm con una herramienta compatible.
- No se reutiliza un `node_modules` mezclado.
- Se ejecutan instalaciones congeladas separadas.
- Se ejecutan validaciones con ambos gestores.
- Se revisa el diff de manifiesto y lockfiles.
- Solo después se considera completa la modificación.

## Inventario Actual Requerido

El baseline debe producir una tabla:

| Área               | Archivo real                 | Estado           | Acción                                        |
| ------------------ | ---------------------------- | ---------------- | --------------------------------------------- |
| Manifiesto         | `frontend/package.json`      | Por inspeccionar | Inventariar scripts, dependencias y metadatos |
| npm lockfile       | `frontend/package-lock.json` | Por inspeccionar | Conservar y validar                           |
| pnpm lockfile      | Ruta real                    | Por inspeccionar | Crear o reconciliar                           |
| Configuración npm  | Ruta real                    | Por inspeccionar | Mantener mínima                               |
| Configuración pnpm | Ruta real                    | Por inspeccionar | Justificar cada archivo                       |
| Scripts            | Scripts reales               | Por inspeccionar | Neutralizar solo acoplamientos                |
| Documentación      | Archivos reales              | Por inspeccionar | Añadir soporte dual                           |
| CI                 | Workflows reales             | Por inspeccionar | Mantener npm y evaluar pnpm                   |
| Docker/deploy      | Archivos reales              | Por inspeccionar | Preservar por defecto                         |

## Estrategia de Lockfiles

### Principio

- `package-lock.json` y `pnpm-lock.yaml` son artefactos canónicos de gestores diferentes.
- Ambos se versionan.
- Ambos proceden del mismo manifiesto.
- Ninguno prevalece sobre el otro para declarar dependencias.
- `package.json` prevalece como declaración de intención.

### Creación o reconciliación de pnpm-lock

Orden de evaluación:

1. Determinar versión compatible de pnpm.
2. Comprobar si puede leer el lockfile existente.
3. Comparar importers y specifiers con `package.json`.
4. Evaluar importación desde `package-lock.json`.
5. Evaluar resolución directa desde `package.json`.
6. Generar mediante una herramienta real.
7. Ejecutar instalación congelada.
8. Repetir instalación.
9. Confirmar diff estable.

El comando concreto debe decidirse durante apply según la versión real.

### Sincronización futura

La guía debe exigir:

- cambio intencional en `package.json`;
- regeneración de ambos lockfiles;
- validación frozen de ambos;
- ejecución de checks;
- revisión del diff.

No se debe recomendar editar un lockfile para que “coincida” con el otro.

## Estrategia de Versión de pnpm

La selección debe considerar:

- Node actualmente utilizado por el equipo.
- Node mínimo exigido por Vite, TypeScript y tooling.
- versión del formato del lockfile.
- soporte en CI.
- comportamiento de scripts de build.
- disponibilidad en Windows y Linux.

La versión final debe registrarse en la documentación.

No se debe seleccionar `latest` como política permanente.

## Decisión sobre `packageManager`

Decisión predeterminada:

- No añadir `packageManager` solo para anunciar pnpm.

Puede añadirse cuando:

- una versión exacta mejore reproducibilidad;
- npm continúe pasando;
- herramientas no bloqueen npm;
- README declare soporte dual;
- Corepack sea opcional.

Cuando exista un campo previo:

- inspeccionarlo;
- validar su exactitud;
- evitar cambiarlo sin necesidad.

## Decisión sobre `engines`

Decisión predeterminada:

- No añadir rangos no verificados.

Puede añadirse `node` cuando se haya comprobado la intersección de versiones soportadas por el tooling.

Las claves para npm y pnpm solo deben añadirse cuando:

- el equipo las utilice realmente;
- no introduzcan exclusividad;
- estén verificadas.

## Corepack

Se documentarán, cuando se validen, dos alternativas:

- pnpm instalado directamente.
- pnpm administrado mediante Corepack.

Corepack no debe:

- habilitarse globalmente durante apply sin autorización;
- considerarse disponible universalmente;
- ser necesario para npm.

## Compatibilidad de Scripts

Inventario esperado:

| Script              | Comando interno  |        Neutral | Acción              |
| ------------------- | ---------------- | -------------: | ------------------- |
| dev                 | Por inspeccionar | Por determinar | Mantener o corregir |
| lint                | Por inspeccionar | Por determinar | Mantener o corregir |
| typecheck           | Por inspeccionar | Por determinar | Mantener o corregir |
| test no interactivo | Por inspeccionar | Por determinar | Mantener o corregir |
| build               | Por inspeccionar | Por determinar | Mantener o corregir |
| preview             | Por inspeccionar | Por determinar | Mantener o corregir |

Criterios:

- binarios locales sobre descargas temporales;
- scripts Node sobre shell específico;
- sin llamadas internas al otro gestor;
- sin refactor fuera del objetivo.

## Dependencias Implícitas

Procedimiento:

- extraer imports de producción, tests, config y scripts;
- normalizar package name para subpaths;
- comparar con dependencies y devDependencies;
- excluir módulos nativos de Node y imports internos;
- comprobar aliases;
- declarar paquetes faltantes en la sección correcta;
- actualizar ambos lockfiles;
- ejecutar validaciones.

No debe instalarse un paquete solo porque aparezca en un string que no sea import real.

## Peer Dependencies

Clasificación:

- peer satisfecho;
- peer opcional;
- peer faltante;
- peer incompatible;
- warning informativo;
- duplicación relevante.

No todo warning requiere un cambio.

Cuando se cambie una versión:

- el cambio debe ser mínimo;
- debe estar relacionado con pnpm;
- debe probarse con ambos gestores;
- debe documentarse.

## Scripts de Build de Dependencias

La política debe basarse en la versión real de pnpm.

Si una dependencia requiere aprobación:

- identificar el paquete;
- justificar por qué su script es necesario;
- autorizar solo ese paquete;
- verificar el contenido generado;
- comprobar npm y pnpm.

No se debe aprobar cualquier dependencia futura.

## Workspace

Decisión predeterminada:

- una aplicación no requiere convertirse en workspace.

Un archivo existente puede conservarse si:

- configura de forma válida la aprobación de builds;
- contiene una configuración necesaria;
- no cambia el punto de ejecución.

No deben crearse paquetes o carpetas workspace vacías.

## CI

### Con CI existente

Opción recomendada:

- mantener job npm;
- añadir job pnpm o dimensión de matriz;
- usar caches separados;
- ejecutar frozen install;
- ejecutar lint, typecheck, tests y build;
- no duplicar deployment.

### Sin CI

- no crear una plataforma completa;
- documentar el procedimiento manual;
- considerar un workflow mínimo solo con aprobación del responsable.

## Validación Aislada

Opciones aceptables:

1. Dos copias temporales del directorio frontend.
2. Dos worktrees temporales, sin tocar cambios preexistentes.
3. Jobs CI separados.
4. Limpieza explícita de un `node_modules` no rastreado entre flujos.

Preferencia:

- copias o jobs separados, porque reducen falsos positivos.

No se permite:

- `git clean`;
- `git reset`;
- eliminar archivos rastreados;
- compartir `node_modules`.

## Mantenimiento Futuro

La documentación final debe contener procedimientos comprobados para:

### Agregar dependencia

- modificar el manifiesto mediante un gestor o proceso controlado;
- actualizar el lockfile del segundo gestor;
- validar ambos;
- revisar el diff.

### Eliminar dependencia

- retirar la declaración;
- regenerar ambos lockfiles;
- comprobar imports;
- validar ambos.

### Actualizar dependencia

- definir versiones objetivo;
- regenerar ambos lockfiles;
- revisar cambios transitivos;
- validar ambos;
- no utilizar upgrades generales sin revisión.

Los comandos exactos deben documentarse solo después de probarse.

## Rollback Conceptual

- Mantener npm como ruta segura.
- Retirar pnpm lock y configuración específica si el soporte se revierte.
- Revertir documentación pnpm.
- Revertir cambios de dependencia introducidos únicamente para pnpm.
- Conservar CI npm.
- Validar `npm ci` y la suite.

## Required Tests Per Layer

### Manifiesto

- Scripts reales inventariados.
- Sin `preinstall` excluyente.
- Sin referencias internas obligatorias al otro gestor.
- Dependencias directas declaradas.

### Lockfiles

- Ambos presentes.
- Ambos generados por sus herramientas.
- Ambos frozen.
- Ambos estables en una segunda instalación.
- Sin edición manual.

### npm

- Instalación aislada.
- Lint.
- Typecheck.
- Tests.
- Build.
- Preview cuando exista.
- Audit cuando sea posible.

### pnpm

- Instalación aislada.
- Lint.
- Typecheck.
- Tests.
- Build.
- Preview cuando exista.
- Audit cuando sea posible.

### Portabilidad

- Scripts sin dependencias exclusivas de Bash.
- Punto de ejecución documentado.
- Comandos aplicables a PowerShell y Linux.

### Documentación

- Comandos corresponden a scripts existentes.
- npm y pnpm aparecen como alternativas.
- Política de lockfiles presente.
- Procedimiento de mantenimiento presente.
- Sin afirmaciones pnpm-only.

### Guardia de alcance

- `node_modules` ausente del diff.
- Informe final sin cambios.
- Changes archivados sin cambios.
- Sin cambios funcionales.

## Tradeoffs Accepted

- Mantener dos lockfiles incrementa el trabajo de mantenimiento.
- Los grafos transitivos pueden no ser idénticos.
- CI puede duplicar parte de los checks para proteger ambos flujos.
- El deployment puede continuar usando npm.
- Corepack puede quedar como opción secundaria.
- `packageManager` puede omitirse para evitar una señal de exclusividad.
- Un workspace puede conservarse por configuración aun sin múltiples paquetes, si su necesidad está demostrada.
- La validación requiere más tiempo al instalar dos veces.

## Implementation Constraints

- No ejecutar gestores antes de registrar baseline.
- No editar lockfiles manualmente.
- No mezclar `node_modules`.
- No seleccionar pnpm latest automáticamente.
- No inventar engines.
- No bloquear npm.
- No realizar upgrades generales.
- No utilizar hoisting permisivo como primera solución.
- No aprobar scripts globalmente.
- No agregar credenciales.
- No cambiar funcionalidad.
- No modificar backend o juez.
- No modificar el informe final.
- No modificar changes archivados.
- No ejecutar Judgment Day.
- No hacer commit, push o archive.

## Open Design Questions

- ¿Qué scripts existen actualmente en `frontend/package.json`?
- ¿Qué versión de Node utiliza realmente el equipo?
- ¿Qué versiones de npm se validan actualmente?
- ¿Existe ya `pnpm-lock.yaml` y con qué versión fue generado?
- ¿Existe `pnpm-workspace.yaml` y cuál es su propósito?
- ¿Existe una configuración de aprobación de build scripts?
- ¿Existe `packageManager`?
- ¿Existe `engines`?
- ¿Hay imports directos de dependencias transitivas?
- ¿Qué peer warnings aparecen con cada gestor?
- ¿Qué lifecycle scripts se ejecutan?
- ¿Existe CI?
- ¿Existe Docker o deployment frontend?
- ¿La CI puede ejecutar una matriz sin duplicar deployment?
- ¿Qué documentación activa es canónica?
- ¿Existen cambios preexistentes en manifiesto o lockfiles?
- ¿La versión seleccionada de pnpm funciona en Windows y Linux?

## Applied Decisions — 2026-07-30

| Decision | Applied result |
| --- | --- |
| Supported managers | npm and pnpm remain equivalent supported options from `frontend/`. |
| Validated environment | Node 24.16.0, npm 11.13.0, pnpm 11.18.0 through Corepack 0.35.0 on Windows Git Bash. |
| pnpm version | 11.18.0, selected from the safely callable Corepack release and validated with lockfile format 9.0. |
| `packageManager` | Omitted because the dual workflow is reproducible without declaring pnpm as a preferred manager. |
| `engines` | Omitted because one local environment does not justify a project-wide minimum range. |
| Corepack | Optional exact-version invocation; no global enablement or environment mutation. |
| `.npmrc` / `.pnpmfile.cjs` | Not created; no install incompatibility required either file. |
| Workspace | Existing `pnpm-workspace.yaml` retained as pnpm configuration, not as a monorepo declaration. |
| Build scripts | Existing `allowBuilds.msw` policy was validated for the required MSW postinstall; no global approval was added. |
| Overrides | pnpm equivalents for the existing npm `@redocly/openapi-core` overrides were added so both graphs use patched `js-yaml` 4.3.0 and `minimatch` 10.2.5. |
| Hoisting | No hoisting configuration added. |
| CI | No `.github/workflows/` directory exists, so no CI infrastructure was created; the isolated manual procedure is canonical. |
| Docker/deployment | No frontend Dockerfile or deployment configuration exists; nothing was migrated. |

The original pnpm lock importer was stale: it referenced `react-router-dom` 7, TypeScript 6 and omitted `prismjs`, `react-router` 8 and `react-simple-code-editor`. It was regenerated with `pnpm import` 11.18.0 from the valid npm lockfile and then validated with frozen installs.

Static analysis scanned 167 frontend source, test, configuration and script files. All 21 externally imported packages were declared directly. No dependency was added and no package version range was changed. The application scripts `dev`, `lint`, `typecheck`, `test`, `test:run`, `build`, `preview`, `format` and `format:check` are manager-neutral. `api:types` was inspected but not executed, as required; its existing `npx` resolves the directly declared local `openapi-typescript` binary and remains a deliberate contract-maintenance path rather than a runtime validation command.
