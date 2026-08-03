# Spec

## Requirements

### Requisitos funcionales: soporte dual

- El frontend MUST soportar npm.
- El frontend MUST soportar pnpm.
- El soporte pnpm MUST NOT retirar ni degradar npm.
- Los dos gestores MUST utilizar el mismo `frontend/package.json`.
- Los comandos MUST ejecutarse desde la carpeta que contiene el manifiesto real.
- La documentación MUST indicar explícitamente `cd frontend` cuando corresponda.
- La documentación MUST NOT afirmar soporte desde la raíz sin configuración comprobada.
- La implementación MUST NOT añadir `only-allow pnpm`.
- La implementación MUST NOT añadir un `preinstall` que rechace npm.
- La implementación MUST NOT fallar intencionalmente cuando `npm_execpath` corresponda a npm.
- La implementación MUST NOT declarar npm obsoleto.
- pnpm MUST NOT ser necesario para ejecutar el flujo npm.
- npm MUST NOT ser necesario para ejecutar los scripts normales mediante pnpm.

### Requisitos funcionales: inventario inicial

- La implementación MUST inspeccionar `frontend/package.json`.
- La implementación MUST registrar todos los scripts reales.
- La implementación MUST inspeccionar `frontend/package-lock.json`.
- La implementación MUST inspeccionar cualquier `frontend/pnpm-lock.yaml` existente.
- La implementación MUST inspeccionar `.npmrc` cuando exista.
- La implementación MUST inspeccionar `.pnpmfile.cjs` cuando exista.
- La implementación MUST inspeccionar `pnpm-workspace.yaml` cuando exista.
- La implementación MUST inspeccionar scripts auxiliares.
- La implementación MUST inspeccionar Vite, TypeScript, lint y tests.
- La implementación MUST inspeccionar CI, Docker y deployment cuando existan.
- La implementación MUST inventariar referencias activas a npm, npx, pnpm, Yarn y lockfiles.
- La implementación MUST registrar el estado inicial de Git.
- La implementación MUST preservar cambios preexistentes.

### Requisitos funcionales: scripts reales

- Solo los scripts existentes en `frontend/package.json` MUST documentarse como ejecutables.
- El flujo npm MUST utilizar `npm run <script>` para scripts del proyecto.
- El flujo pnpm MUST utilizar `pnpm <script>` o el mecanismo soportado por la versión real.
- Cada script de validación MUST ejecutar la misma herramienta local con ambos gestores.
- Los scripts MUST NOT depender internamente del otro gestor.
- Los scripts compuestos SHOULD invocar binarios locales directamente.
- Los scripts MAY usar scripts Node portables.
- Los scripts MUST evitar comandos exclusivos de Bash cuando deban funcionar también en Windows.
- Un `npx` MUST revisarse para determinar si descarga código o usa un binario local.
- Un `pnpm dlx` MUST no introducirse como sustitución automática de `npx`.
- Scripts que no impidan el soporte dual MUST no refactorizarse sin necesidad.

### Requisitos funcionales: lockfile de npm

- `frontend/package-lock.json` MUST conservarse.
- `package-lock.json` MUST seguir siendo válido para `npm ci`.
- `package-lock.json` MUST no editarse manualmente.
- Una instalación `npm ci` MUST no modificarlo.
- Una segunda instalación limpia MUST mantenerlo estable.
- La documentación MUST describirlo como lockfile soportado, no legado.

### Requisitos funcionales: lockfile de pnpm

- `frontend/pnpm-lock.yaml` MUST existir al completar el change.
- `pnpm-lock.yaml` MUST generarse mediante una versión real de pnpm.
- `pnpm-lock.yaml` MUST no editarse manualmente.
- El procedimiento de generación MUST adaptarse a la versión utilizada.
- Se MAY importar el lockfile npm cuando la versión real soporte ese flujo.
- Se MAY resolver desde `package.json` cuando resulte más seguro.
- El procedimiento MUST concluir con una instalación congelada exitosa.
- Una segunda instalación congelada MUST dejar el lockfile estable.
- `pnpm-lock.yaml` MUST permanecer versionado.
- `.gitignore` MUST no excluir `pnpm-lock.yaml`.

### Requisitos funcionales: convivencia de lockfiles

- Ambos lockfiles MUST representar el mismo manifiesto.
- Ambos lockfiles MUST satisfacer las versiones declaradas en `package.json`.
- Los grafos resueltos MAY diferir cuando los gestores tengan semánticas distintas.
- Diferencias relevantes de versiones MUST revisarse.
- Un cambio de dependencia MUST actualizar ambos lockfiles.
- Un cambio en `package.json` MUST no considerarse completo con un solo lockfile actualizado.
- La documentación MUST explicar el procedimiento de sincronización.
- CI SHOULD validar estabilidad de ambos lockfiles cuando exista.
- Sin CI, MUST existir un procedimiento manual reproducible.
- Ningún lockfile MUST modificarse después de una instalación frozen válida.

### Requisitos funcionales: versión de pnpm

- La versión de pnpm MUST determinarse durante baseline.
- La decisión MUST considerar la versión real de Node.
- La decisión MUST considerar el formato de `pnpm-lock.yaml`.
- La decisión MUST considerar scripts de build y configuración.
- La decisión MUST considerar CI y entornos del equipo.
- La implementación MUST NOT seleccionar automáticamente la última versión.
- La versión seleccionada MUST documentarse.
- La versión seleccionada MUST funcionar en Windows y Linux conceptualmente.
- Una versión incompatible con el Node soportado MUST no utilizarse.

### Requisitos funcionales: `packageManager`

- La implementación MUST evaluar el campo `packageManager`.
- El campo MUST NOT agregarse automáticamente.
- La decisión MUST considerar que puede expresar una preferencia por pnpm.
- El campo MAY agregarse únicamente cuando no bloquee npm.
- Cuando se agregue, la documentación MUST reafirmar el soporte dual.
- La versión declarada MUST coincidir con una versión validada.
- El campo MUST no utilizarse como mecanismo de exclusión.

### Requisitos funcionales: `engines`

- La implementación MUST evaluar `engines`.
- Rangos MUST basarse en versiones verificadas.
- Rangos MUST no inventarse.
- Rangos MUST no ser más estrictos que lo necesario.
- `engines.node` MAY añadirse cuando exista una versión mínima comprobada.
- Restricciones de npm o pnpm MAY añadirse solo con beneficio demostrado.
- La ausencia de evidencia MUST resultar en no agregar el rango.

### Requisitos funcionales: Corepack

- Corepack MAY documentarse como alternativa.
- Corepack MUST NOT ser obligatorio sin una necesidad demostrada.
- La documentación MUST distinguir instalación global de pnpm y administración con Corepack.
- La implementación MUST NOT asumir que Corepack está habilitado.
- La implementación MUST NOT modificar globalmente Corepack sin autorización.
- Un comando Corepack MUST documentarse solo después de validarse.

### Requisitos funcionales: workspace

- La implementación MUST evaluar si existe un workspace real.
- `pnpm-workspace.yaml` MUST NOT crearse únicamente para declarar soporte pnpm.
- Una aplicación única SHOULD funcionar sin convertirse en monorepo.
- Un `pnpm-workspace.yaml` existente MUST clasificarse por su propósito.
- El archivo MAY conservarse cuando contenga configuración necesaria y soportada.
- El archivo MAY crearse cuando exista una necesidad real de workspace o configuración pnpm.
- El repositorio MUST NOT convertirse en monorepo dentro de este change.

### Requisitos funcionales: dependencias directas

- Todo paquete importado directamente MUST estar declarado directamente.
- Una dependencia usada en runtime MUST estar en `dependencies`.
- Una dependencia usada únicamente por tooling o tests SHOULD estar en `devDependencies`.
- La implementación MUST detectar imports resueltos accidentalmente desde dependencias transitivas.
- La corrección preferida MUST ser declarar la dependencia directa.
- `shamefully-hoist=true` MUST NOT utilizarse como solución predeterminada.
- Un cambio en dependencias MUST actualizar ambos lockfiles.
- La implementación MUST no añadir paquetes no utilizados.

### Requisitos funcionales: peer dependencies

- Warnings de peers MUST revisarse con npm y pnpm.
- La implementación MUST registrar peers faltantes o incompatibles.
- Una versión MUST no cambiarse solo para ocultar un warning.
- Cambios de versión MAY realizarse únicamente cuando sean necesarios para el soporte dual.
- El impacto MUST verificarse mediante lint, typecheck, tests y build.
- Dependencias opcionales MUST no convertirse en obligatorias sin necesidad.
- Duplicados relevantes SHOULD documentarse cuando afecten el resultado.

### Requisitos funcionales: lifecycle y build scripts

- La implementación MUST inspeccionar `preinstall`, `install`, `postinstall` y `prepare`.
- La implementación MUST inspeccionar build scripts requeridos por dependencias críticas.
- La implementación MUST registrar scripts bloqueados por pnpm.
- La configuración de aprobación MUST ser mínima.
- Solo paquetes concretos y necesarios MAY autorizarse.
- Una autorización global MUST no utilizarse.
- La seguridad MUST no debilitarse únicamente para eliminar warnings.
- La configuración MUST corresponder a la versión real de pnpm.

### Requisitos funcionales: `node_modules`

- `node_modules` MUST permanecer no versionado.
- `.gitignore` MUST ignorar `node_modules`.
- `node_modules` MUST no aparecer en el diff.
- La documentación MUST no pedir copiar `node_modules` entre máquinas.
- Las validaciones npm y pnpm MUST usar instalaciones aisladas.
- Una instalación mezclada MUST no considerarse evidencia válida.
- `git clean` MUST no utilizarse.
- `git reset` MUST no utilizarse.
- Solo un `node_modules` no rastreado MAY eliminarse mediante una operación explícita y controlada.

### Requisitos funcionales: validación npm

- La validación npm MUST ejecutarse en un entorno limpio.
- `npm ci` SHOULD utilizarse cuando `package-lock.json` sea válido.
- La validación MUST ejecutar todos los scripts reales equivalentes a:
  - lint;
  - typecheck;
  - tests no interactivos;
  - build.
- Preview MUST probarse cuando exista el script.
- El preview MUST iniciarse y detenerse de forma controlada.
- La validación MUST registrar versiones de Node y npm.
- El lockfile MUST permanecer estable.
- La validación MUST no publicar ni desplegar.

### Requisitos funcionales: validación pnpm

- La validación pnpm MUST ejecutarse en un entorno limpio distinto.
- MUST utilizarse `pnpm install --frozen-lockfile` o el comando equivalente validado.
- La validación MUST ejecutar todos los scripts reales equivalentes a:
  - lint;
  - typecheck;
  - tests no interactivos;
  - build.
- Preview MUST probarse cuando exista el script.
- El preview MUST iniciarse y detenerse de forma controlada.
- La validación MUST registrar versiones de Node y pnpm.
- El lockfile MUST permanecer estable.
- La validación MUST no publicar ni desplegar.

### Requisitos funcionales: auditoría de seguridad

- `npm audit` MAY ejecutarse cuando sea compatible.
- `npm audit --audit-level=high` MAY ejecutarse.
- `pnpm audit` MAY ejecutarse.
- La implementación MUST no ejecutar correcciones automáticas.
- Los resultados MUST registrarse por gestor.
- Diferencias entre resultados MUST documentarse honestamente.
- La implementación MUST no afirmar que ambos usan la misma base de datos de vulnerabilidades.
- Fallos de red MUST distinguirse de ausencia de vulnerabilidades.

### Requisitos funcionales: CI

- Workflows existentes MUST inspeccionarse.
- Una CI que usa npm MUST conservar su validación npm.
- La implementación SHOULD evaluar un job o matriz pnpm.
- El job pnpm SHOULD cubrir instalación congelada, lint, typecheck, tests y build.
- Deployment MUST no duplicarse únicamente para probar pnpm.
- Cuando no exista CI, una infraestructura completa MUST no crearse sin justificación.
- La ausencia de CI MUST resultar en un procedimiento manual reproducible.

### Requisitos funcionales: Docker y despliegue

- Dockerfiles y deployment existentes MUST inspeccionarse.
- Un flujo de producción npm MUST conservarse por defecto.
- El soporte dual MUST no requerir migrar producción a pnpm.
- Una modificación MAY realizarse solo con beneficio concreto y validación reproducible.
- El build de producción existente MUST continuar funcionando.
- La documentación MUST no afirmar soporte pnpm en deployment sin validación.

### Requisitos funcionales: documentación

- README MUST documentar npm.
- README MUST documentar pnpm.
- README MUST indicar la carpeta de ejecución.
- README MUST listar únicamente scripts reales.
- README MUST cubrir:
  - requisitos;
  - instalación;
  - desarrollo;
  - lint;
  - typecheck;
  - tests;
  - build;
  - preview cuando exista;
  - lockfiles;
  - cambios de dependencias.
- La documentación MUST advertir que no se deben mezclar gestores sobre el mismo `node_modules`.
- La documentación MUST explicar que ambos lockfiles deben mantenerse.
- La documentación MUST no declarar pnpm obligatorio.
- La documentación MUST no declarar npm obsoleto.
- Una guía adicional SHOULD referenciar la explicación principal en vez de duplicarla.
- Documentación histórica archivada MUST no modificarse.

### Requisitos funcionales: mantenimiento de dependencias

- Debe documentarse un procedimiento para agregar una dependencia.
- Debe documentarse un procedimiento para eliminar una dependencia.
- Debe documentarse un procedimiento para actualizar dependencias.
- El procedimiento MUST actualizar `package.json` y ambos lockfiles.
- El procedimiento MUST evitar instalaciones mezcladas.
- El procedimiento MUST utilizar solo comandos probados.
- El procedimiento MUST incluir validación frozen de ambos gestores.
- El procedimiento MUST incluir revisión del diff.
- El procedimiento MUST no recomendar upgrades generales como parte del mantenimiento normal.

### Requisitos funcionales: límites documentales

- `docs/informe-final.tex` MUST permanecer sin cambios.
- `docs/informe-final.pdf` MUST permanecer sin cambios.
- `docs/capturas/` MUST permanecer sin cambios.
- `docs/images/` MUST permanecer sin cambios.
- `docs/puml/` MUST permanecer sin cambios.
- Changes archivados MUST permanecer sin cambios.
- Judgment Day MUST permanecer fuera de alcance.
- El change MUST permanecer activo pendiente de revisión manual.

### Requisitos no funcionales

- La solución MUST ser reproducible.
- La solución MUST ser mantenible.
- La solución MUST minimizar archivos nuevos.
- La solución MUST ser compatible conceptualmente con Windows PowerShell y Linux shell.
- Los scripts MUST ser portables.
- La solución MUST evitar credenciales.
- `.npmrc` MUST no contener tokens.
- Ningún registry privado MUST añadirse sin una fuente existente y autorizada.
- La documentación MUST ser inequívoca.
- El diff MUST limitarse al soporte dual.
- Los resultados de validación MUST ser trazables.
- Los fallos preexistentes MUST diferenciarse de regresiones del change.

## Behavior Scenarios

### Scenario 1: npm continúa soportado

Given un clon limpio del repositorio  
When se ejecuta `npm ci` desde la carpeta real del frontend  
Then la instalación MUST terminar correctamente  
And lint, typecheck, tests y build MUST poder ejecutarse con npm

### Scenario 2: pnpm soportado

Given un clon limpio del repositorio  
When se ejecuta `pnpm install --frozen-lockfile` con la versión validada  
Then la instalación MUST terminar correctamente  
And lint, typecheck, tests y build MUST poder ejecutarse con pnpm

### Scenario 3: Lockfile de npm conservado

Given `package-lock.json` forma parte del proyecto  
When se incorpora pnpm  
Then `package-lock.json` MUST conservarse  
And MUST continuar siendo válido para `npm ci`

### Scenario 4: Lockfile de pnpm

Given pnpm está soportado oficialmente  
When se instala el frontend  
Then `pnpm-lock.yaml` MUST existir  
And MUST permitir una instalación congelada y reproducible

### Scenario 5: pnpm-lock existente

Given ya existe un `pnpm-lock.yaml`  
When se inicia el change  
Then MUST validarse contra `package.json` y la versión real de pnpm  
And MUST no asumirse que el soporte ya está completo

### Scenario 6: Scripts neutrales

Given un script definido en `package.json`  
When se invoca mediante npm o pnpm  
Then MUST completar su lógica sin requerir que el otro gestor esté instalado

### Scenario 7: Dependencia transitiva implícita

Given el frontend importa directamente un paquete  
And el paquete solo estaba disponible de forma transitiva  
When pnpm aplica su resolución estricta  
Then el paquete MUST declararse como dependencia directa  
And ambos lockfiles MUST actualizarse

### Scenario 8: No exclusión de npm

Given un desarrollador utiliza npm  
When instala o ejecuta el proyecto  
Then MUST no existir un preinstall ni una política que rechace npm

### Scenario 9: No dependencia de pnpm en scripts npm

Given pnpm no está instalado  
When un desarrollador ejecuta scripts normales con npm  
Then los scripts MUST no fallar por intentar invocar pnpm

### Scenario 10: No dependencia de npm en scripts pnpm

Given npm no está disponible como comando auxiliar  
When un desarrollador ejecuta scripts normales con pnpm  
Then los scripts MUST no depender internamente de `npm run`

### Scenario 11: Lockfiles sincronizados

Given cambia `package.json`  
When se actualizan dependencias  
Then `package-lock.json` y `pnpm-lock.yaml` MUST reflejar el mismo manifiesto  
And ambos MUST pasar una instalación congelada

### Scenario 12: Grafos no idénticos

Given npm y pnpm resuelven una dependencia transitiva de forma diferente  
When ambos lockfiles satisfacen el manifiesto y las validaciones pasan  
Then la diferencia MAY aceptarse  
And MUST documentarse cuando sea relevante

### Scenario 13: node_modules aislado

Given se validan npm y pnpm  
When se ejecutan ambos flujos  
Then MUST utilizarse instalaciones aisladas  
And una prueba sobre `node_modules` mezclado MUST no considerarse válida

### Scenario 14: node_modules ignorado

Given una instalación genera `node_modules`  
When se revisa el diff  
Then `node_modules` MUST no aparecer como archivo versionado

### Scenario 15: Documentación para un desarrollador nuevo

Given un desarrollador nuevo consulta README  
When elige npm o pnpm  
Then MUST encontrar comandos reales para instalación, desarrollo, pruebas y build  
And MUST conocer la carpeta de ejecución

### Scenario 16: Punto de ejecución

Given el manifiesto está dentro de `frontend/`  
When se documentan los comandos  
Then la guía MUST indicar `cd frontend`  
And MUST no afirmar ejecución desde la raíz sin soporte real

### Scenario 17: packageManager no necesario

Given el soporte dual funciona sin `packageManager`  
When se evalúa el campo  
Then el campo SHOULD no añadirse únicamente para anunciar pnpm

### Scenario 18: packageManager agregado

Given existe una razón verificada para declarar `packageManager`  
When se añade una versión de pnpm  
Then npm MUST continuar funcionando  
And la documentación MUST aclarar el soporte dual

### Scenario 19: engines sin evidencia

Given no existen versiones mínimas verificadas  
When se evalúa `engines`  
Then MUST no inventarse un rango

### Scenario 20: Corepack no disponible

Given un desarrollador no tiene Corepack habilitado  
When consulta la instalación pnpm  
Then MUST disponer de una alternativa documentada que no dependa de Corepack

### Scenario 21: Workspace innecesario

Given existe una sola aplicación y no requiere configuración de workspace  
When se incorpora pnpm  
Then MUST no crearse un workspace artificial

### Scenario 22: Workspace con propósito real

Given un `pnpm-workspace.yaml` existente contiene configuración necesaria  
When se valida el soporte pnpm  
Then MAY conservarse  
And su propósito MUST documentarse

### Scenario 23: Peer warning sin impacto demostrado

Given pnpm muestra un warning de peer dependency  
When lint, typecheck, tests y build funcionan  
Then una versión MUST no cambiarse automáticamente  
And el warning MUST evaluarse y documentarse

### Scenario 24: Build script requerido

Given una dependencia necesita ejecutar un build script  
When pnpm lo bloquea  
Then solo ese paquete MAY autorizarse mediante una configuración compatible  
And una autorización global MUST no utilizarse

### Scenario 25: Script exclusivo de Bash

Given un script usa `rm`, `cp`, `mv`, `sed` o `export`  
When debe funcionar en Windows y Linux  
Then SHOULD sustituirse por una alternativa portable mínima

### Scenario 26: CI existente con npm

Given la CI valida npm  
When se añade soporte pnpm  
Then la validación npm MUST conservarse  
And SHOULD añadirse una validación pnpm separada cuando sea razonable

### Scenario 27: Sin CI existente

Given no existe infraestructura CI  
When se implementa el change  
Then MUST no crearse una plataforma completa sin justificación  
And MUST documentarse una validación manual reproducible

### Scenario 28: Docker usa npm

Given un Dockerfile de producción usa npm  
When se incorpora soporte pnpm  
Then el Dockerfile SHOULD permanecer con npm  
And el build existente MUST continuar funcionando

### Scenario 29: Auditorías diferentes

Given `npm audit` y `pnpm audit` producen resultados distintos  
When se documenta seguridad  
Then cada resultado MUST atribuirse a su herramienta  
And MUST no afirmarse que una de las herramientas demuestra por sí sola que la otra es incorrecta

### Scenario 30: Segunda instalación npm

Given una instalación npm limpia ya fue validada  
When se repite `npm ci`  
Then `package-lock.json` MUST permanecer sin cambios

### Scenario 31: Segunda instalación pnpm

Given una instalación pnpm congelada ya fue validada  
When se repite la instalación  
Then `pnpm-lock.yaml` MUST permanecer sin cambios

### Scenario 32: Preview npm

Given existe el script `preview`  
When se ejecuta mediante npm  
Then el servidor MUST iniciar  
And MUST detenerse de forma controlada

### Scenario 33: Preview pnpm

Given existe el script `preview`  
When se ejecuta mediante pnpm  
Then el servidor MUST iniciar  
And MUST detenerse de forma controlada

### Scenario 34: Cambio futuro de dependencia

Given el equipo agrega, elimina o actualiza un paquete  
When finaliza el cambio  
Then ambos lockfiles MUST estar actualizados  
And ambas instalaciones congeladas MUST pasar

### Scenario 35: Informe final preservado

Given el informe final ya fue cerrado  
When se implementa soporte pnpm  
Then `docs/informe-final.tex` y `docs/informe-final.pdf` MUST no modificarse

### Scenario 36: Change archivado preservado

Given existe documentación histórica archivada que usa npm  
When se añade pnpm  
Then el documento histórico MUST permanecer sin cambios  
And la guía activa MUST describir el soporte actual

### Scenario 37: Fallo preexistente

Given una validación npm ya fallaba antes del change  
When se ejecuta el baseline  
Then el fallo MUST registrarse como preexistente  
And MUST no atribuirse automáticamente a pnpm

### Scenario 38: Finalización del change

Given ambos gestores pasan las validaciones acordadas  
When se completa la documentación  
Then el change MUST permanecer activo  
And la revisión manual MUST quedar pendiente

## Edge Cases

- Ya existe `pnpm-lock.yaml`, pero está desactualizado.
- Ya existe `pnpm-workspace.yaml` sin paquetes declarados.
- El workspace se utiliza únicamente para configuración de builds.
- Existen lockfiles adicionales en la raíz.
- El `package-lock.json` está ignorado pero rastreado.
- `package.json` contiene overrides incompatibles con pnpm.
- npm y pnpm resuelven versiones transitivas distintas.
- La versión local de pnpm no puede leer el lockfile existente.
- La versión más nueva de pnpm requiere un Node más reciente.
- Un paquete importado tiene subpath exports que difieren bajo pnpm.
- Un plugin de Vite depende accidentalmente de un paquete transitivo.
- Un test importa directamente una dependencia no declarada.
- Un script usa `npx` para descargar una herramienta no declarada.
- Un lifecycle script modifica archivos rastreados.
- Una dependencia nativa funciona en Linux pero no en Windows.
- Un paquete opcional no está disponible para una plataforma.
- Los audits requieren acceso de red.
- Preview usa un puerto ya ocupado.
- La suite de tests es interactiva si se usa el script equivocado.
- La CI no permite una matriz de gestores.
- Docker copia solo `package-lock.json`.
- El working tree contiene cambios preexistentes en lockfiles.
- `node_modules` contiene residuos del otro gestor.
- La documentación raíz y la guía frontend se contradicen.
- Corepack está instalado pero deshabilitado.
- `packageManager` ya existe y declara npm o pnpm.
- `engines` ya existe con rangos no comprobados.

## Acceptance Criteria

- `frontend/package.json` MUST haberse inspeccionado.
- `frontend/package-lock.json` MUST haberse inspeccionado.
- Scripts y configuraciones MUST haberse inventariado.
- Referencias activas a npm MUST haberse inventariado.
- npm MUST continuar soportado.
- `package-lock.json` MUST conservarse.
- `pnpm-lock.yaml` MUST existir.
- `pnpm-lock.yaml` MUST no haberse editado manualmente.
- `npm ci` MUST funcionar en un entorno limpio o cualquier fallo preexistente MUST estar documentado y resuelto antes del cierre.
- Una instalación pnpm congelada MUST funcionar en un entorno limpio.
- Lint MUST funcionar con npm.
- Lint MUST funcionar con pnpm.
- Typecheck MUST funcionar con npm.
- Typecheck MUST funcionar con pnpm.
- Tests MUST funcionar con npm.
- Tests MUST funcionar con pnpm.
- Build MUST funcionar con npm.
- Build MUST funcionar con pnpm.
- Preview MUST funcionar con ambos cuando exista.
- Ambos lockfiles MUST quedar estables.
- `node_modules` MUST no versionarse.
- MUST no existir una restricción pnpm-only.
- npm MUST no eliminarse.
- MUST no realizarse un upgrade general.
- Las dependencias directas MUST estar correctamente declaradas.
- `packageManager` MUST haberse evaluado.
- `engines` MUST haberse evaluado.
- Corepack MUST haberse evaluado.
- CI MUST haberse revisado cuando exista.
- README MUST documentar npm.
- README MUST documentar pnpm.
- La política de lockfiles MUST estar documentada.
- MUST no modificarse funcionalidad.
- MUST no modificarse backend.
- MUST no modificarse juez.
- El informe final MUST permanecer sin cambios.
- Changes archivados MUST permanecer sin cambios.
- El change MUST permanecer activo pendiente de revisión manual.
- MUST no realizarse commit.
- MUST no realizarse push.

## Out of Scope

- Migración exclusiva a pnpm.
- Eliminación de npm.
- Eliminación de `package-lock.json`.
- Yarn, Bun u otros gestores.
- Upgrades generales.
- Refactor funcional.
- Cambios visuales.
- Backend.
- Juez.
- Monorepo.
- Rediseño completo de CI.
- Migración obligatoria de Docker.
- Informe final.
- Changes archivados.
- Judgment Day.
- Commit, push y archive.
