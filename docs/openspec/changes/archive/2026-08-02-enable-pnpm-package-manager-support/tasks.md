# Tasks

**Fase 0 — Baseline y alcance**

## Task 1: Registrar el baseline de Git

- Objective:
  Identificar branch, archivos modificados, archivos no rastreados y diferencias preexistentes.
- Files or areas likely involved:
  Repositorio completo, en modo lectura.
- Execution notes:
  Ejecutar status, diff name-status, diff stat y diff check. No usar reset ni clean.
- Verification method:
  Baseline fechado con cambios preexistentes clasificados.
- Dependencies:
  None.

## Task 2: Definir la guardia de alcance

- Objective:
  Establecer archivos permitidos y exclusiones.
- Files or areas likely involved:
  Frontend, README, documentación activa y artefactos del change.
- Execution notes:
  Excluir informe final, capturas, imágenes, PlantUML, backend, juez y archive.
- Verification method:
  Lista de inclusión y exclusión aprobada antes de modificar.
- Dependencies:
  Task 1.

## Task 3: Registrar versiones del entorno

- Objective:
  Identificar versiones disponibles de Node, npm y pnpm sin seleccionar todavía una política.
- Files or areas likely involved:
  Entorno local.
- Execution notes:
  No instalar ni actualizar herramientas globales.
- Verification method:
  Tabla herramienta → versión → disponibilidad.
- Dependencies:
  Task 1.

## Task 4: Registrar el estado local de node_modules

- Objective:
  Confirmar si existe y que no esté versionado.
- Files or areas likely involved:
  `frontend/node_modules/` y `.gitignore`.
- Execution notes:
  Tratarlo como artefacto local; no eliminar todavía.
- Verification method:
  Estado de seguimiento e ignore documentado.
- Dependencies:
  Tasks 1 and 2.

**Fase 1 — Inventario de package manager**

## Task 5: Inspeccionar package.json

- Objective:
  Inventariar scripts, dependencias, overrides y metadatos.
- Files or areas likely involved:
  `frontend/package.json`.
- Execution notes:
  Registrar `packageManager`, `engines` y lifecycle scripts cuando existan.
- Verification method:
  Matriz de campos actuales.
- Dependencies:
  Task 1.

## Task 6: Inspeccionar package-lock.json

- Objective:
  Confirmar formato, manifiesto, estado Git y validez aparente.
- Files or areas likely involved:
  `frontend/package-lock.json`.
- Execution notes:
  No editarlo.
- Verification method:
  Versión de lockfile y paquetes raíz documentados.
- Dependencies:
  Task 5.

## Task 7: Inspeccionar artefactos pnpm existentes

- Objective:
  Localizar lockfile, workspace, npmrc y hooks.
- Files or areas likely involved:
  `frontend/pnpm-lock.yaml`, `.npmrc`, `.pnpmfile.cjs`, `pnpm-workspace.yaml`.
- Execution notes:
  No asumir que un archivo existente es correcto.
- Verification method:
  Matriz archivo → propósito → versión compatible → estado.
- Dependencies:
  Tasks 3 and 5.

## Task 8: Inspeccionar lockfiles en otras ubicaciones

- Objective:
  Evitar ambigüedad sobre el punto de ejecución.
- Files or areas likely involved:
  Raíz del repositorio y subdirectorios.
- Execution notes:
  No modificar lockfiles fuera del alcance sin una decisión posterior explícita.
- Verification method:
  Inventario de manifiestos y lockfiles.
- Dependencies:
  Task 1.

## Task 9: Confirmar el punto de ejecución

- Objective:
  Determinar desde qué carpeta deben ejecutarse npm y pnpm.
- Files or areas likely involved:
  Manifiestos, README y posibles workspaces.
- Execution notes:
  No asumir soporte desde la raíz.
- Verification method:
  Carpeta canónica documentada.
- Dependencies:
  Tasks 5 through 8.

**Fase 2 — Análisis de scripts y dependencias**

## Task 10: Inventariar scripts del frontend

- Objective:
  Relacionar cada script con su comando interno y herramienta.
- Files or areas likely involved:
  `frontend/package.json` y `frontend/scripts/`.
- Execution notes:
  Identificar scripts interactivos y no interactivos.
- Verification method:
  Matriz script → comando → neutralidad.
- Dependencies:
  Task 5.

## Task 11: Buscar acoplamientos a gestores

- Objective:
  Detectar npm, npx, pnpm, dlx y Yarn en scripts activos.
- Files or areas likely involved:
  package.json, scripts, configuración, CI y Docker.
- Execution notes:
  Distinguir documentación de comandos ejecutables.
- Verification method:
  Lista de acoplamientos con acción propuesta.
- Dependencies:
  Tasks 7 and 10.

## Task 12: Inventariar imports externos

- Objective:
  Detectar paquetes usados directamente.
- Files or areas likely involved:
  `frontend/src/`, configuración, tests y scripts.
- Execution notes:
  Considerar imports con subpaths y módulos nativos.
- Verification method:
  Lista normalizada de paquetes externos.
- Dependencies:
  Task 5.

## Task 13: Comparar imports con dependencias declaradas

- Objective:
  Detectar dependencias transitivas implícitas.
- Files or areas likely involved:
  Inventario de imports y `package.json`.
- Execution notes:
  Clasificar runtime y desarrollo.
- Verification method:
  Matriz paquete → uso → declaración → acción.
- Dependencies:
  Task 12.

## Task 14: Inspeccionar configuraciones de tooling

- Objective:
  Confirmar dependencias utilizadas por Vite, TypeScript, lint y Vitest.
- Files or areas likely involved:
  Archivos de configuración reales.
- Execution notes:
  No refactorizar configuración.
- Verification method:
  Cada plugin y preset utilizado está declarado.
- Dependencies:
  Tasks 5 and 13.

## Task 15: Inspeccionar lifecycle y build scripts

- Objective:
  Detectar prepare, install, postinstall y builds de dependencias.
- Files or areas likely involved:
  Manifiesto, lockfiles y warnings disponibles.
- Execution notes:
  No aprobar scripts todavía.
- Verification method:
  Lista de scripts y su necesidad.
- Dependencies:
  Tasks 5 through 7.

**Fase 3 — Diseño de convivencia npm/pnpm**

## Task 16: Seleccionar una versión compatible de pnpm

- Objective:
  Definir una versión reproducible sin usar automáticamente latest.
- Files or areas likely involved:
  Entorno, lockfile y documentación oficial cuando sea necesaria.
- Execution notes:
  Considerar Node, formato de lockfile y CI.
- Verification method:
  Decisión versionada con justificación.
- Dependencies:
  Tasks 3, 7 and 15.

## Task 17: Definir la política de lockfiles

- Objective:
  Establecer convivencia y mantenimiento.
- Files or areas likely involved:
  Manifiesto, lockfiles y documentación.
- Execution notes:
  Aclarar que los grafos pueden diferir sin divergir del manifiesto.
- Verification method:
  Política aprobada antes de regenerar.
- Dependencies:
  Tasks 5 through 8 and 16.

## Task 18: Decidir el uso de workspace

- Objective:
  Determinar si `pnpm-workspace.yaml` es necesario.
- Files or areas likely involved:
  Configuración pnpm y estructura del repositorio.
- Execution notes:
  No crear un monorepo ni carpetas vacías.
- Verification method:
  Decisión conservar, crear, adaptar o no usar.
- Dependencies:
  Tasks 7 through 9 and 15.

## Task 19: Diseñar la validación aislada

- Objective:
  Evitar pruebas sobre `node_modules` mezclado.
- Files or areas likely involved:
  Directorios temporales o CI.
- Execution notes:
  Elegir copias, worktrees o jobs separados.
- Verification method:
  Procedimiento sin `git clean` ni `git reset`.
- Dependencies:
  Tasks 1, 4 and 9.

## Task 20: Definir las guardias de estabilidad

- Objective:
  Comprobar que instalaciones no modifican lockfiles.
- Files or areas likely involved:
  Ambos lockfiles.
- Execution notes:
  Adaptar comparación al baseline preexistente.
- Verification method:
  Comandos de diff definidos.
- Dependencies:
  Tasks 17 and 19.

**Fase 4 — Generación de pnpm-lock.yaml**

## Task 21: Respaldar el estado lógico de los lockfiles

- Objective:
  Registrar checksums o diffs antes de generar.
- Files or areas likely involved:
  `package-lock.json` y `pnpm-lock.yaml`.
- Execution notes:
  No crear copias dentro del repositorio.
- Verification method:
  Estado inicial recuperable.
- Dependencies:
  Tasks 1, 6 and 7.

## Task 22: Evaluar importación desde package-lock

- Objective:
  Determinar si la versión seleccionada soporta una importación segura.
- Files or areas likely involved:
  Lockfiles y pnpm.
- Execution notes:
  No imponer el comando si la versión no lo soporta.
- Verification method:
  Decisión importar o resolver desde manifiesto.
- Dependencies:
  Tasks 16, 17 and 21.

## Task 23: Generar o reconciliar pnpm-lock.yaml

- Objective:
  Crear un lockfile válido mediante pnpm.
- Files or areas likely involved:
  `frontend/pnpm-lock.yaml`.
- Execution notes:
  Ejecutar en entorno aislado y no editar a mano.
- Verification method:
  Lockfile generado sin cambios no intencionales en `package.json`.
- Dependencies:
  Tasks 18, 19 and 22.

## Task 24: Revisar el diff del lockfile pnpm

- Objective:
  Detectar resoluciones inesperadas, peers y scripts.
- Files or areas likely involved:
  `pnpm-lock.yaml`.
- Execution notes:
  Comparar specifiers con el manifiesto.
- Verification method:
  Revisión documentada de cambios relevantes.
- Dependencies:
  Task 23.

## Task 25: Ejecutar la primera instalación congelada pnpm

- Objective:
  Validar que el lockfile sea reproducible.
- Files or areas likely involved:
  Copia aislada del frontend.
- Execution notes:
  Usar el comando compatible con la versión seleccionada.
- Verification method:
  Instalación exitosa y lockfile estable.
- Dependencies:
  Tasks 23 and 24.

**Fase 5 — Compatibilidad de scripts**

## Task 26: Neutralizar scripts acoplados a npm

- Objective:
  Permitir ejecución pnpm sin requerir npm internamente.
- Files or areas likely involved:
  `frontend/package.json` y scripts auxiliares.
- Execution notes:
  Usar cambios mínimos y portables.
- Verification method:
  Cada script afectado funciona con ambos gestores.
- Dependencies:
  Tasks 10 and 11.

## Task 27: Neutralizar scripts acoplados a pnpm o Yarn

- Objective:
  Mantener npm independiente.
- Files or areas likely involved:
  Manifiesto y scripts.
- Execution notes:
  No modificar comandos de mantenimiento que no formen parte del flujo normal sin necesidad.
- Verification method:
  npm no requiere pnpm o Yarn.
- Dependencies:
  Tasks 10 and 11.

## Task 28: Sustituir shell no portable cuando bloquee soporte

- Objective:
  Mantener compatibilidad Windows/Linux.
- Files or areas likely involved:
  Scripts de package.json.
- Execution notes:
  Preferir Node o herramientas existentes.
- Verification method:
  Revisión de comandos sin dependencias exclusivas de shell.
- Dependencies:
  Tasks 10, 11 and 19.

## Task 29: Verificar scripts reales disponibles

- Objective:
  Confirmar los comandos que se documentarán y validarán.
- Files or areas likely involved:
  `package.json`.
- Execution notes:
  No crear aliases innecesarios.
- Verification method:
  Lista final de scripts.
- Dependencies:
  Tasks 26 through 28.

**Fase 6 — Dependencias y peer dependencies**

## Task 30: Declarar dependencias directas faltantes

- Objective:
  Corregir imports transitivos incompatibles con pnpm.
- Files or areas likely involved:
  `frontend/package.json`.
- Execution notes:
  Añadir solo paquetes realmente importados.
- Verification method:
  Matriz de imports sin dependencias implícitas.
- Dependencies:
  Tasks 13 through 14 and 25.

## Task 31: Actualizar ambos lockfiles por cambios de dependencias

- Objective:
  Reflejar el mismo manifiesto con npm y pnpm.
- Files or areas likely involved:
  Ambos lockfiles.
- Execution notes:
  Generarlos mediante sus gestores en entornos aislados.
- Verification method:
  Ambos aceptan instalación frozen.
- Dependencies:
  Task 30.

## Task 32: Revisar peer dependencies

- Objective:
  Clasificar warnings reales.
- Files or areas likely involved:
  Salidas de instalación y lockfiles.
- Execution notes:
  No cambiar versiones sin incompatibilidad demostrada.
- Verification method:
  Tabla peer → estado → decisión.
- Dependencies:
  Tasks 25 and 31.

## Task 33: Resolver incompatibilidades estrictamente necesarias

- Objective:
  Corregir solo los peers que impidan instalar, probar o construir.
- Files or areas likely involved:
  Manifiesto y lockfiles.
- Execution notes:
  Evitar upgrades generales.
- Verification method:
  Diff mínimo y checks de ambos gestores.
- Dependencies:
  Task 32.

## Task 34: Configurar scripts de build permitidos

- Objective:
  Autorizar únicamente dependencias necesarias cuando pnpm lo exija.
- Files or areas likely involved:
  Configuración pnpm soportada.
- Execution notes:
  No autorizar globalmente.
- Verification method:
  Lista explícita de paquetes y justificación.
- Dependencies:
  Tasks 15, 16 and 25.

**Fase 7 — Metadatos packageManager/engines/Corepack**

## Task 35: Evaluar packageManager

- Objective:
  Decidir si mejora la reproducibilidad sin sugerir exclusividad.
- Files or areas likely involved:
  `frontend/package.json`.
- Execution notes:
  Decisión predeterminada: omitir cuando no sea necesario.
- Verification method:
  Decisión y efecto sobre npm documentados.
- Dependencies:
  Tasks 16 and 25.

## Task 36: Evaluar engines

- Objective:
  Documentar únicamente versiones verificadas.
- Files or areas likely involved:
  `frontend/package.json`.
- Execution notes:
  No inventar rangos.
- Verification method:
  Rangos justificados o decisión de no agregarlos.
- Dependencies:
  Tasks 3, 16 and 33.

## Task 37: Evaluar Corepack

- Objective:
  Determinar si se documenta como alternativa.
- Files or areas likely involved:
  README y guías.
- Execution notes:
  No cambiar el sistema global.
- Verification method:
  Opción validada o exclusión documentada.
- Dependencies:
  Tasks 3, 16 and 35.

## Task 38: Verificar que npm no quede restringido

- Objective:
  Auditar manifiesto y configuración final.
- Files or areas likely involved:
  package.json, npmrc y configuración pnpm.
- Execution notes:
  Buscar preinstall, only-allow y validaciones de execpath.
- Verification method:
  Cero mecanismos pnpm-only.
- Dependencies:
  Tasks 34 through 37.

**Fase 8 — CI y despliegue**

## Task 39: Inspeccionar workflows existentes

- Objective:
  Confirmar gestores y checks actuales.
- Files or areas likely involved:
  Directorio de workflows real.
- Execution notes:
  Registrar ausencia cuando no exista.
- Verification method:
  Matriz job → gestor → checks.
- Dependencies:
  Task 1.

## Task 40: Mantener la validación npm en CI

- Objective:
  Preservar la ruta existente.
- Files or areas likely involved:
  Workflows existentes.
- Execution notes:
  No sustituir npm por pnpm.
- Verification method:
  Job npm sigue usando lockfile y checks.
- Dependencies:
  Task 39.

## Task 41: Añadir o diseñar validación pnpm mínima

- Objective:
  Proteger el soporte pnpm en CI cuando sea razonable.
- Files or areas likely involved:
  Workflows existentes.
- Execution notes:
  Usar cache separado y no duplicar deployment.
- Verification method:
  Instalación frozen y checks configurados.
- Dependencies:
  Tasks 16, 25, 29 and 39.

## Task 42: Inspeccionar Docker y despliegue

- Objective:
  Confirmar que producción no se rompe.
- Files or areas likely involved:
  Dockerfiles y configuración deployment.
- Execution notes:
  Mantener npm por defecto.
- Verification method:
  Decisión por archivo.
- Dependencies:
  Task 1.

## Task 43: Preservar el build de producción actual

- Objective:
  Evitar migraciones innecesarias.
- Files or areas likely involved:
  Docker y deployment cuando existan.
- Execution notes:
  Modificar solo con beneficio y validación concreta.
- Verification method:
  Build existente continúa documentado y funcional.
- Dependencies:
  Tasks 40 through 42.

**Fase 9 — Documentación**

## Task 44: Inventariar referencias activas a npm

- Objective:
  Detectar documentación que presenta una única opción.
- Files or areas likely involved:
  README, frontend docs, CI y Docker.
- Execution notes:
  Excluir documentación histórica archivada.
- Verification method:
  Lista de referencias con acción.
- Dependencies:
  Tasks 9, 11 and 39.

## Task 45: Definir la guía canónica de instalación

- Objective:
  Evitar duplicación entre README y guías.
- Files or areas likely involved:
  Documentación activa.
- Execution notes:
  Elegir una explicación principal y referencias cruzadas.
- Verification method:
  Ownership documental definido.
- Dependencies:
  Task 44.

## Task 46: Documentar el flujo npm

- Objective:
  Mantener comandos reales para instalación y scripts.
- Files or areas likely involved:
  README o guía canónica.
- Execution notes:
  Usar solo scripts confirmados.
- Verification method:
  Comandos contrastados con package.json.
- Dependencies:
  Tasks 9, 29 and 45.

## Task 47: Documentar el flujo pnpm

- Objective:
  Añadir instalación, desarrollo y validaciones equivalentes.
- Files or areas likely involved:
  README o guía canónica.
- Execution notes:
  Incluir versión o mecanismo de obtención validado.
- Verification method:
  Comandos contrastados con el flujo probado.
- Dependencies:
  Tasks 16, 25, 29 and 45.

## Task 48: Documentar la convivencia de lockfiles

- Objective:
  Explicar por qué existen dos lockfiles y cómo mantenerlos.
- Files or areas likely involved:
  Guía canónica.
- Execution notes:
  Aclarar que no deben editarse manualmente.
- Verification method:
  Política completa y sin ambigüedades.
- Dependencies:
  Tasks 17, 20 and 45.

## Task 49: Documentar el mantenimiento de dependencias

- Objective:
  Definir agregar, eliminar y actualizar paquetes.
- Files or areas likely involved:
  Guía canónica.
- Execution notes:
  Incluir únicamente comandos realmente probados.
- Verification method:
  Procedimientos actualizan y validan ambos lockfiles.
- Dependencies:
  Tasks 31, 33, 46 and 47.

## Task 50: Documentar instalaciones aisladas

- Objective:
  Evitar mezclar npm y pnpm sobre el mismo node_modules.
- Files or areas likely involved:
  README o guía.
- Execution notes:
  Explicar limpieza controlada o directorios separados.
- Verification method:
  Advertencia visible y procedimiento seguro.
- Dependencies:
  Tasks 19, 46 and 47.

## Task 51: Revisar consistencia documental

- Objective:
  Eliminar contradicciones entre documentos activos.
- Files or areas likely involved:
  README y guías frontend.
- Execution notes:
  No modificar documentos históricos.
- Verification method:
  npm y pnpm aparecen como opciones equivalentes.
- Dependencies:
  Tasks 44 through 50.

**Fase 10 — Validación limpia con npm**

## Task 52: Preparar el entorno aislado npm

- Objective:
  Validar sin residuos de pnpm.
- Files or areas likely involved:
  Copia temporal del frontend.
- Execution notes:
  Copiar solo archivos necesarios y excluir node_modules.
- Verification method:
  Entorno limpio registrado.
- Dependencies:
  Tasks 19, 31, 38 and 51.

## Task 53: Ejecutar npm ci

- Objective:
  Validar package-lock.
- Files or areas likely involved:
  Entorno npm aislado.
- Execution notes:
  Registrar versión y warnings.
- Verification method:
  Instalación exitosa y lockfile estable.
- Dependencies:
  Task 52.

## Task 54: Ejecutar checks con npm

- Objective:
  Validar scripts reales.
- Files or areas likely involved:
  Entorno npm aislado.
- Execution notes:
  Ejecutar lint, typecheck, tests no interactivos y build.
- Verification method:
  Resultados por comando.
- Dependencies:
  Task 53.

## Task 55: Probar preview con npm

- Objective:
  Confirmar el servidor de preview cuando exista.
- Files or areas likely involved:
  Entorno npm aislado.
- Execution notes:
  Iniciar, comprobar y terminar de forma controlada.
- Verification method:
  Smoke test documentado.
- Dependencies:
  Task 54.

## Task 56: Ejecutar auditoría npm sin fixes

- Objective:
  Registrar vulnerabilidades según npm.
- Files or areas likely involved:
  Entorno npm.
- Execution notes:
  No ejecutar audit fix.
- Verification method:
  Resultado y limitaciones documentados.
- Dependencies:
  Task 53.

**Fase 11 — Validación limpia con pnpm**

## Task 57: Preparar el entorno aislado pnpm

- Objective:
  Validar sin residuos de npm.
- Files or areas likely involved:
  Copia temporal separada.
- Execution notes:
  Usar la versión seleccionada.
- Verification method:
  Entorno limpio registrado.
- Dependencies:
  Tasks 19, 25, 34 and 38.

## Task 58: Ejecutar instalación frozen pnpm

- Objective:
  Validar `pnpm-lock.yaml`.
- Files or areas likely involved:
  Entorno pnpm aislado.
- Execution notes:
  Usar el comando confirmado para la versión.
- Verification method:
  Instalación exitosa y lockfile estable.
- Dependencies:
  Task 57.

## Task 59: Ejecutar checks con pnpm

- Objective:
  Validar scripts equivalentes.
- Files or areas likely involved:
  Entorno pnpm aislado.
- Execution notes:
  Ejecutar lint, typecheck, tests no interactivos y build.
- Verification method:
  Resultados por comando.
- Dependencies:
  Task 58.

## Task 60: Probar preview con pnpm

- Objective:
  Confirmar el servidor de preview cuando exista.
- Files or areas likely involved:
  Entorno pnpm aislado.
- Execution notes:
  Iniciar, comprobar y terminar de forma controlada.
- Verification method:
  Smoke test documentado.
- Dependencies:
  Task 59.

## Task 61: Ejecutar auditoría pnpm sin fixes

- Objective:
  Registrar vulnerabilidades según pnpm.
- Files or areas likely involved:
  Entorno pnpm.
- Execution notes:
  No aplicar correcciones.
- Verification method:
  Resultado comparado honestamente con npm.
- Dependencies:
  Task 58.

**Fase 12 — Estabilidad de lockfiles**

## Task 62: Repetir la instalación npm

- Objective:
  Demostrar estabilidad.
- Files or areas likely involved:
  Entorno npm aislado.
- Execution notes:
  Repetir con el mismo lockfile.
- Verification method:
  Cero modificaciones en package-lock.
- Dependencies:
  Tasks 53 through 56.

## Task 63: Repetir la instalación pnpm

- Objective:
  Demostrar estabilidad.
- Files or areas likely involved:
  Entorno pnpm aislado.
- Execution notes:
  Repetir frozen install.
- Verification method:
  Cero modificaciones en pnpm-lock.
- Dependencies:
  Tasks 58 through 61.

## Task 64: Comparar manifiesto y lockfiles

- Objective:
  Confirmar que ambos reflejan las dependencias declaradas.
- Files or areas likely involved:
  package.json y lockfiles.
- Execution notes:
  Revisar dependencias raíz y diferencias transitivas relevantes.
- Verification method:
  Matriz de specifiers consistente.
- Dependencies:
  Tasks 62 and 63.

## Task 65: Verificar estabilidad en el working tree

- Objective:
  Confirmar que las instalaciones no modifican lockfiles finales.
- Files or areas likely involved:
  Diff de ambos lockfiles.
- Execution notes:
  Adaptar la comparación a cambios intencionales del change.
- Verification method:
  Cero cambios posteriores a la versión aprobada.
- Dependencies:
  Task 64.

**Fase 13 — Guardias Git**

## Task 66: Verificar node_modules y artefactos

- Objective:
  Confirmar que no se versionaron instalaciones o caches.
- Files or areas likely involved:
  Diff y archivos no rastreados.
- Execution notes:
  Buscar node_modules, stores y logs.
- Verification method:
  Cero artefactos generados en el diff.
- Dependencies:
  Tasks 62 through 65.

## Task 67: Verificar archivos excluidos

- Objective:
  Preservar informe final y documentación histórica.
- Files or areas likely involved:
  Diff final.
- Execution notes:
  Comparar con baseline.
- Verification method:
  Cero cambios en rutas excluidas.
- Dependencies:
  Tasks 1 and 66.

## Task 68: Ejecutar diff check y revisar alcance

- Objective:
  Detectar errores de whitespace y scope creep.
- Files or areas likely involved:
  Repositorio completo.
- Execution notes:
  Revisar status, name-status, stat y diff check.
- Verification method:
  Diff limitado al change.
- Dependencies:
  Tasks 51, 65, 66 and 67.

## Task 69: Completar el checklist de aceptación

- Objective:
  Relacionar cada criterio con evidencia real.
- Files or areas likely involved:
  Artefactos, logs de validación y diff.
- Execution notes:
  No marcar verificaciones no ejecutadas.
- Verification method:
  Checklist completo y trazable.
- Dependencies:
  Task 68.

**Fase 14 — Revisión manual**

## Task 70: Preparar el resumen de revisión

- Objective:
  Presentar decisiones, versiones, archivos y resultados.
- Files or areas likely involved:
  Change OpenSpec y diff final.
- Execution notes:
  Incluir diferencias de audits y cualquier warning aceptado.
- Verification method:
  Resumen disponible para el responsable.
- Dependencies:
  Task 69.

## Task 71: Solicitar revisión y aprobación manual

- Objective:
  Mantener el change activo hasta decisión expresa.
- Files or areas likely involved:
  Estado del change.
- Execution notes:
  No ejecutar Judgment Day, commit, push o archive.
- Verification method:
  La tarea permanece pendiente hasta aprobación del responsable.
- Dependencies:
  Task 70.

## Review Workload Forecast

- Estimated LoC changed:
  150-450 líneas textuales y de configuración, además de los cambios generados en `pnpm-lock.yaml` y posibles ajustes generados en `package-lock.json`. El tamaño del lockfile no debe considerarse código manual, pero requiere revisión de specifiers y cambios transitivos.
- Risk of exceeding 400 LoC review threshold:
  Medium por archivos manuales; high al incluir lockfiles generados.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: baseline, política de convivencia, versión pnpm y lockfile.
  - PR 2: scripts neutrales, dependencias directas y configuración de builds.
  - PR 3: CI opcional, documentación y procedimientos de mantenimiento.
  - PR 4: validaciones aisladas, estabilidad de lockfiles y revisión final.
  - Todos los PRs deben pertenecer al mismo change.
  - El último PR debe permanecer pendiente de aprobación manual.

## Execution Status — 2026-07-30

- [x] Tasks 1–9: baseline, environment, lockfiles, pnpm configuration and canonical execution directory inventoried.
- [x] Tasks 10–15: scripts, manager couplings, imports, tooling, lifecycle and build scripts inspected.
- [x] Tasks 16–20: pnpm 11.18.0, dual-lock policy, existing workspace purpose, isolated validation and stability guards decided.
- [x] Tasks 21–25: stale pnpm lock inventoried, regenerated with `pnpm import` and validated with a frozen install.
- [x] Tasks 26–29: required application scripts confirmed manager-neutral and portable.
- [x] Tasks 30–34: 167 files and 21 external imports checked; no missing direct dependency or peer blocker found; MSW build permission kept minimal.
- [x] Tasks 35–38: `packageManager`, `engines`, Corepack and npm-preservation decisions recorded; no pnpm-only policy added.
- [x] Tasks 39–43: CI, Docker and deployment inspected; none exists to modify, and the production build remains valid.
- [x] Tasks 44–51: root README and active frontend guides document npm, pnpm, both lockfiles, isolated installs and future maintenance.
- [x] Tasks 52–56: isolated npm install, lint, typecheck, 145 tests, build, preview and audits passed.
- [x] Tasks 57–61: isolated pnpm install, lint, typecheck, 145 tests, build, preview and audit passed.
- [x] Tasks 62–65: second clean installs and manifest/lockfile stability checks passed for both managers.
- [x] Tasks 66–70: final artifact, scope, Git and review-summary guards.
- [x] Revisión y aprobación manual del responsable del proyecto.
