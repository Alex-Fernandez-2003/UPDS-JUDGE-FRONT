# Proposal

## Problem Statement

El frontend de UPDS JUDGE utiliza actualmente un manifiesto de dependencias y un flujo de desarrollo que deben auditarse antes de declarar soporte oficial para más de un gestor de paquetes.

El change `enable-pnpm-package-manager-support` incorporará soporte oficial para `pnpm` sin retirar, degradar ni bloquear el soporte existente para `npm`.

El resultado requerido es un modelo de convivencia:

- `npm` continúa siendo una alternativa soportada.
- `pnpm` se incorpora como alternativa soportada.
- Ambos utilizan el mismo `frontend/package.json`.
- `frontend/package-lock.json` se conserva.
- `frontend/pnpm-lock.yaml` existe y permite instalaciones congeladas.
- Los scripts se ejecutan con cualquiera de los gestores.
- Ambos flujos se validan en instalaciones aisladas.
- La documentación explica cómo instalar, desarrollar, validar y mantener ambos lockfiles.

Este change no es una migración exclusiva a pnpm. No debe incorporar un `preinstall`, `only-allow`, validación de `npm_execpath` ni otra política que rechace npm.

Antes de modificar archivos se debe inspeccionar el estado local real. En particular, se debe determinar si ya existen artefactos parciales de pnpm, si están sincronizados con el manifiesto actual y si fueron generados con una versión compatible. Un `pnpm-lock.yaml` existente no constituye por sí solo evidencia suficiente de soporte reproducible.

La fuente principal será `frontend/package.json`. Los nombres reales de scripts, versiones declaradas, dependencias y configuración deberán obtenerse de ese archivo. No se documentarán scripts que no existan.

La convivencia de dos lockfiles introduce una obligación de mantenimiento: todo cambio futuro en dependencias debe actualizar y validar tanto `package-lock.json` como `pnpm-lock.yaml`. Los grafos resueltos no tienen que ser textualmente idénticos, porque npm y pnpm pueden aplicar resoluciones diferentes, pero ambos MUST satisfacer el mismo manifiesto y producir instalaciones congeladas, estables y funcionalmente equivalentes.

## Goals

- Registrar el baseline de Git y preservar cambios preexistentes.
- Inspeccionar `frontend/package.json` y sus scripts reales.
- Inspeccionar `frontend/package-lock.json`.
- Detectar y evaluar cualquier `frontend/pnpm-lock.yaml` existente.
- Detectar y evaluar cualquier `.npmrc`, `.pnpmfile.cjs` o `pnpm-workspace.yaml`.
- Confirmar que `node_modules` no esté versionado.
- Determinar una versión real y compatible de pnpm.
- Mantener el soporte para `npm ci`.
- Generar o reconciliar `pnpm-lock.yaml` mediante pnpm, nunca manualmente.
- Validar `pnpm install --frozen-lockfile` o el comando equivalente de la versión seleccionada.
- Confirmar estabilidad de ambos lockfiles después de instalaciones repetidas.
- Mantener los scripts de `package.json` neutrales respecto del gestor.
- Detectar comandos internos atados a npm, pnpm, Yarn o herramientas de ejecución remota.
- Sustituir únicamente los acoplamientos que impidan el soporte dual.
- Detectar imports directos de dependencias no declaradas directamente.
- Declarar correctamente las dependencias directas necesarias.
- Revisar peer dependencies y dependencias opcionales sin realizar upgrades generales.
- Revisar scripts de instalación y build de dependencias.
- Aplicar una política mínima para scripts de build cuando pnpm lo requiera.
- Evitar configuraciones de hoisting permisivas como solución predeterminada.
- Evaluar `packageManager` sin convertir pnpm en gestor exclusivo.
- Evaluar `engines` únicamente con versiones verificadas.
- Evaluar Corepack como opción, no como requisito universal.
- Evaluar si `pnpm-workspace.yaml` es realmente necesario.
- Mantener el punto de ejecución real dentro de `frontend/`.
- Actualizar README y guías activas con las dos alternativas.
- Revisar CI existente y mantener la validación con npm.
- Añadir validación pnpm en CI solo cuando exista una infraestructura adecuada.
- Preservar Docker y despliegue existentes salvo una necesidad demostrada.
- Validar npm y pnpm en entornos aislados.
- Ejecutar lint, typecheck, tests y build con ambos gestores.
- Comprobar preview con ambos gestores cuando el script exista.
- Ejecutar auditorías sin aplicar correcciones automáticas.
- Documentar diferencias reales entre `npm audit` y `pnpm audit`.
- Documentar el procedimiento futuro para agregar, eliminar o actualizar dependencias.
- Mantener el change activo pendiente de revisión manual.

## Non-Goals

- No migrar exclusivamente a pnpm.
- No retirar npm.
- No eliminar `frontend/package-lock.json`.
- No declarar npm obsoleto.
- No añadir un `preinstall` que rechace npm.
- No utilizar `only-allow pnpm`.
- No exigir pnpm como dependencia para usuarios de npm.
- No migrar a Yarn, Bun u otro gestor.
- No convertir el repositorio en monorepo.
- No crear `pnpm-workspace.yaml` sin una necesidad real.
- No ejecutar desde la raíz si el proyecto real debe ejecutarse desde `frontend/`.
- No modificar funcionalidades.
- No modificar rutas ni interfaces visuales.
- No modificar backend.
- No modificar el juez.
- No actualizar React, Vite, TypeScript u otras dependencias sin una incompatibilidad demostrada.
- No realizar upgrades generales.
- No ejecutar `npm update`.
- No ejecutar `pnpm update --latest`.
- No ejecutar `npm audit fix`.
- No ejecutar `pnpm audit --fix`.
- No resolver warnings mediante cambios de versión no justificados.
- No habilitar `shamefully-hoist` como solución predeterminada.
- No aprobar indiscriminadamente scripts de build de dependencias.
- No añadir credenciales o registries privados.
- No versionar `node_modules`.
- No rediseñar completamente la CI.
- No migrar automáticamente Docker o deployment a pnpm.
- No modificar `docs/informe-final.tex`.
- No modificar `docs/informe-final.pdf`.
- No modificar `docs/capturas/`.
- No modificar `docs/images/`.
- No modificar `docs/puml/`.
- No modificar changes archivados.
- No ejecutar Judgment Day.
- No hacer commit.
- No hacer push.
- No archivar automáticamente el change.

## Affected Areas

### Artefactos OpenSpec

- `docs/openspec/changes/enable-pnpm-package-manager-support/proposal.md`
- `docs/openspec/changes/enable-pnpm-package-manager-support/spec.md`
- `docs/openspec/changes/enable-pnpm-package-manager-support/design.md`
- `docs/openspec/changes/enable-pnpm-package-manager-support/tasks.md`

### Manifiesto y lockfiles

- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/pnpm-lock.yaml`

### Configuración opcional, solo cuando esté justificada

- `frontend/.npmrc`
- `frontend/.pnpmfile.cjs`
- `frontend/pnpm-workspace.yaml`
- archivos de configuración de pnpm permitidos por la versión real.

### Documentación activa

- `README.md`
- `frontend/README.md`, cuando exista.
- guías de instalación o desarrollo frontend existentes.
- documentación activa que presente npm como única alternativa.

### Integración y despliegue

- workflows de CI existentes.
- Dockerfiles del frontend existentes.
- configuraciones de deployment existentes.
- scripts auxiliares reales bajo `frontend/scripts/`.

### Áreas de inspección en modo lectura

- `frontend/src/`
- configuración de Vite.
- configuración de TypeScript.
- configuración de ESLint u Oxlint.
- configuración de Vitest.
- `.gitignore`.
- referencias a gestores de paquetes en el repositorio activo.

## Assumptions

- `frontend/package.json` es el manifiesto canónico de la aplicación.
- `frontend/package-lock.json` forma parte del soporte vigente de npm.
- Los comandos se ejecutan desde `frontend/`, salvo que el baseline demuestre una configuración raíz válida.
- Puede existir soporte parcial de pnpm que deba validarse en vez de reconstruirse.
- Puede existir un `pnpm-workspace.yaml` utilizado para configuración de scripts de build aun cuando no exista un monorepo.
- No se conoce todavía la versión local de Node, npm o pnpm.
- No se conoce todavía si existen workflows de CI.
- No se conoce todavía si Docker o deployment utilizan npm.
- No se conoce todavía si hay dependencias transitivas importadas directamente.
- No se conoce todavía si los dos lockfiles están sincronizados.
- No se conoce todavía si algún lifecycle script requiere configuración específica de pnpm.
- No se asume que `packageManager`, `engines`, Corepack o un workspace sean necesarios.

## Risks

### Risk 1: Divergencia entre lockfiles

- Probability: High.
- Impact: High; npm y pnpm podrían instalar conjuntos incompatibles o reflejar manifiestos diferentes.
- Mitigation: Regenerar ambos desde el mismo `package.json`, ejecutar instalaciones congeladas y comprobar estabilidad después de una segunda instalación.

### Risk 2: Dependencias transitivas implícitas

- Probability: High.
- Impact: High; pnpm puede impedir imports que npm resolvía accidentalmente.
- Mitigation: Inventariar imports directos y declarar cada paquete utilizado directamente en la sección adecuada del manifiesto.

### Risk 3: Peer dependencies incompatibles

- Probability: Medium.
- Impact: High; una instalación puede completar con warnings pero fallar en build o tests.
- Mitigation: Revisar warnings reales, comparar requisitos de peers y cambiar versiones solo cuando exista una incompatibilidad demostrada.

### Risk 4: Scripts atados a npm

- Probability: Medium.
- Impact: High; `pnpm <script>` podría requerir npm internamente.
- Mitigation: Inspeccionar scripts compuestos y usar binarios locales o scripts Node portables.

### Risk 5: Scripts atados a pnpm

- Probability: Medium.
- Impact: High; npm podría depender de pnpm después del change.
- Mitigation: Prohibir acoplamientos internos a pnpm salvo un comando de mantenimiento explícitamente documentado y no requerido para ejecutar scripts normales.

### Risk 6: Diferencias en lifecycle scripts

- Probability: Medium.
- Impact: High; prepare, install o postinstall pueden ejecutarse de forma distinta.
- Mitigation: Inventariar lifecycle scripts propios y de dependencias críticas, y validar ambos gestores en entornos limpios.

### Risk 7: Scripts de build bloqueados por pnpm

- Probability: Medium.
- Impact: High; una dependencia necesaria podría no preparar sus artefactos.
- Mitigation: Autorizar únicamente paquetes concretos y justificados mediante la configuración soportada por la versión seleccionada.

### Risk 8: Configuración de hoisting excesiva

- Probability: Medium.
- Impact: High; puede ocultar dependencias mal declaradas y reducir el valor de la validación pnpm.
- Mitigation: Preferir dependencias directas y no usar `shamefully-hoist` salvo incompatibilidad demostrada.

### Risk 9: Mezcla de `node_modules`

- Probability: High.
- Impact: High; una prueba puede dar un falso positivo por residuos del otro gestor.
- Mitigation: Usar copias temporales, worktrees controlados o jobs separados.

### Risk 10: Diferencias entre Windows y Linux

- Probability: Medium.
- Impact: Medium a High; scripts shell pueden fallar en PowerShell.
- Mitigation: Evitar comandos exclusivos de Bash y preferir scripts Node portables o herramientas ya presentes.

### Risk 11: Versión de pnpm incompatible con Node

- Probability: Medium.
- Impact: Critical; la instalación no podría iniciarse en entornos soportados.
- Mitigation: Verificar la versión real de Node y la matriz oficial de compatibilidad antes de seleccionar pnpm.

### Risk 12: `packageManager` sugiere exclusividad

- Probability: Medium.
- Impact: Medium; desarrolladores y herramientas podrían interpretar pnpm como único gestor.
- Mitigation: No agregar el campo por defecto; usarlo solo con una decisión explícita y documentación de soporte dual.

### Risk 13: Rango `engines` incorrecto

- Probability: Medium.
- Impact: High; puede excluir entornos funcionales o aceptar entornos incompatibles.
- Mitigation: Agregar rangos únicamente después de validaciones reales.

### Risk 14: Corepack asumido como universal

- Probability: Medium.
- Impact: Medium; algunos entornos no lo incluyen o no lo tienen habilitado.
- Mitigation: Documentarlo como alternativa opcional y ofrecer instalación global de pnpm como opción equivalente.

### Risk 15: Workspace innecesario

- Probability: Medium.
- Impact: Medium; añade una arquitectura inexistente y confunde el punto de ejecución.
- Mitigation: Crear o conservar `pnpm-workspace.yaml` únicamente cuando tenga una función concreta.

### Risk 16: CI valida un solo gestor

- Probability: High cuando existe CI.
- Impact: High; el segundo flujo podría degradarse sin detección.
- Mitigation: Mantener npm y añadir un job pnpm mínimo cuando el coste y la infraestructura lo permitan.

### Risk 17: Cambios accidentales de dependencias

- Probability: Medium.
- Impact: High; generar el lockfile puede resolver versiones más nuevas admitidas por rangos.
- Mitigation: Comparar los grafos, revisar el diff y evitar modificar rangos de `package.json` sin necesidad.

### Risk 18: Auditorías de seguridad divergentes

- Probability: High.
- Impact: Medium; los resultados pueden interpretarse como contradicción.
- Mitigation: Registrar cada herramienta, versión, fecha y resultado sin afirmar equivalencia de bases de datos.

### Risk 19: Documentación contradictoria

- Probability: High.
- Impact: Medium; el equipo puede mezclar comandos o ejecutar desde la carpeta incorrecta.
- Mitigation: Definir una guía principal y usar referencias cruzadas.

### Risk 20: Preview deja procesos activos

- Probability: Medium.
- Impact: Medium; puede bloquear puertos o validaciones posteriores.
- Mitigation: Ejecutar smoke tests acotados con inicio, comprobación y terminación controlada.

## Rollback Strategy

- Conservar `frontend/package-lock.json` como fuente de rollback para npm.
- Retirar `frontend/pnpm-lock.yaml` únicamente si se revierte completamente el soporte pnpm.
- Retirar configuraciones de pnpm creadas por el change junto con el lockfile.
- Revertir únicamente dependencias directas añadidas para corregir imports transitivos cuando dichas adiciones pertenezcan a este change.
- Restaurar scripts al estado anterior si una neutralización produce regresiones.
- Revertir cambios de CI pnpm sin retirar la validación npm.
- Revertir secciones pnpm de documentación manteniendo intacta la guía npm anterior.
- No eliminar cambios preexistentes.
- Validar el rollback mediante:
  - `npm ci`;
  - lint;
  - typecheck;
  - tests;
  - build;
  - estabilidad de `package-lock.json`.
- Mantener el change activo hasta que el rollback o la implementación sean revisados manualmente.

## Success Criteria

- `npm ci` funciona en una instalación limpia.
- `pnpm install --frozen-lockfile` funciona en una instalación limpia.
- `frontend/package-lock.json` se conserva.
- `frontend/pnpm-lock.yaml` existe.
- Ningún lockfile fue editado manualmente.
- Ambos lockfiles permanecen estables después de una segunda instalación.
- npm ejecuta lint, typecheck, tests y build.
- pnpm ejecuta lint, typecheck, tests y build.
- Preview inicia con ambos gestores cuando el script existe.
- Los scripts normales no requieren que el otro gestor esté instalado.
- No existe una política pnpm-only.
- No se versiona `node_modules`.
- No se utiliza una instalación mezclada como evidencia.
- Las dependencias importadas directamente están declaradas.
- Los warnings de peers fueron revisados.
- No se realizó un upgrade general.
- La decisión sobre `packageManager` quedó documentada.
- La decisión sobre `engines` quedó documentada.
- La decisión sobre Corepack quedó documentada.
- La decisión sobre workspace quedó documentada.
- La CI conserva npm cuando existe.
- README documenta npm y pnpm.
- La política de mantenimiento de lockfiles está documentada.
- El informe final permanece sin cambios.
- Los changes archivados permanecen sin cambios.
- El change permanece activo pendiente de revisión manual.
