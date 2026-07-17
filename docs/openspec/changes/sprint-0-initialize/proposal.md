# Proposal

## Problem Statement

UPDS JUDGE necesita una base técnica de frontend antes de iniciar el desarrollo de historias de usuario. El repositorio frontend contiene material académico y btrable de React dentro de una ubicación aislada.

El change `sprint-0-initialize` resolverá esta necesidad mediante un único trabajo de inicialización que incluya inspección preventiva, creación del scaffold, organización inicial y validaciones técnicas.

El proyecto se ubicará exclusivamente en:

`frontend/`

La inicialización utilizará React, Vite, TypeScript, el template oficial `react-ts` y npm. La pantalla predeterminada generada por React y Vite se conservará temporalmente para que el usuario pueda obtener evidencia visual del proyecto en blanco.

Este change no implementará funcionalidades de UPDS JUDGE y no modificará el backend, la base de datos, los documentos académicos existentes ni el `README.md` de la raíz.

## Goals

- Crear un único change identificado exactamente como `sprint-0-initialize`.
- Mantener los artefactos del change en `docs/openspec/changes/sprint-0-initialize/`.
- Crear el proyecto React dentro de `frontend/`.
- Utilizar Vite, TypeScript, npm y el template oficial `react-ts`.
- Generar `frontend/package.json` y `frontend/package-lock.json` sin crear un nuevo `package.json` en la raíz.
- Instalar únicamente las dependencias incluidas por el template vigente de Vite.
- Conservar sin personalizaciones la pantalla predeterminada del scaffold.
- Preservar los logos, estilos, assets y archivos generados por el template.
- Crear una estructura inicial de carpetas organizada por responsabilidades.
- Versionar carpetas vacías mediante `.gitkeep` solamente cuando sea necesario.
- Verificar instalación, lint, build y ejecución local.
- Confirmar que la aplicación predeterminada responde localmente sin depender del backend.
- Dejar el proyecto preparado para que el usuario tome manualmente las capturas requeridas.
- Auditar con Git que solo se hayan creado o modificado las áreas permitidas.
- Mantener las tareas OpenSpec sincronizadas con lo que realmente se ejecute.

## Non-Goals

- No dividir la inicialización, organización y validación en changes separados.
- No generar un briefing global de UPDS JUDGE.
- No implementar pantallas, flujos ni componentes funcionales del sistema.
- No reemplazar ni limpiar el contenido predeterminado de `App.tsx`.
- No incorporar Tailwind CSS.
- No incorporar React Router ni TanStack Router.
- No incorporar autenticación, registro ni protección de rutas.
- No incorporar Context API, Redux, Zustand ni otro sistema de estado.
- No incorporar TanStack Query, Axios ni otro cliente HTTP.
- No incorporar variables de entorno para APIs.
- No integrar ASP.NET Core, Judge0, SignalR o WebSockets.
- No crear clientes reales en `src/lib/api/`, `src/lib/auth/` o `src/lib/realtime/`.
- No crear lógica ficticia, componentes vacíos, hooks vacíos, mocks o barrel files innecesarios.
- No agregar tests funcionales, tests de componentes o Storybook.
- No agregar Docker, CI/CD o configuración de despliegue.
- No modificar el backend.
- No modificar `database/`.
- No modificar documentos académicos existentes dentro de `docs/`.
- No modificar el informe final.
- No modificar el `README.md` de la raíz.
- No crear ni alterar un `package.json` en la raíz.
- No crear capturas ficticias ni marcar evidencias inexistentes como completadas.
- No realizar commits ni push.
- No utilizar Astro, Next.js o Create React App.

## Affected Areas

### Artefactos OpenSpec

Los únicos artefactos de planificación de este change serán:

- `docs/openspec/changes/sprint-0-initialize/proposal.md`
- `docs/openspec/changes/sprint-0-initialize/spec.md`
- `docs/openspec/changes/sprint-0-initialize/design.md`
- `docs/openspec/changes/sprint-0-initialize/tasks.md`

La estructura deberá adaptarse a la convención OpenSpec activa encontrada en el workspace, sin convertir el trabajo en varios changes ni imponer una estructura legacy incompatible.

### Proyecto frontend

Se creará o utilizará la carpeta:

- `frontend/`

Dentro de ella se esperan los archivos y directorios generados por el template vigente `react-ts`, incluyendo de forma aproximada:

- `frontend/public/`
- `frontend/src/`
- `frontend/src/assets/`
- `frontend/src/App.css`
- `frontend/src/App.tsx`
- `frontend/src/index.css`
- `frontend/src/main.tsx`
- `frontend/src/vite-env.d.ts`
- `frontend/.gitignore`
- `frontend/eslint.config.js`
- `frontend/index.html`
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/tsconfig.app.json`
- `frontend/tsconfig.json`
- `frontend/tsconfig.node.json`
- `frontend/vite.config.ts`

Se permiten diferencias menores si la versión vigente de `create-vite` genera nombres o archivos distintos.

### Estructura organizativa adicional

Se crearán únicamente las siguientes áreas:

- `frontend/src/components/common/`
- `frontend/src/components/forms/`
- `frontend/src/components/navigation/`
- `frontend/src/components/tables/`
- `frontend/src/features/auth/`
- `frontend/src/features/contests/`
- `frontend/src/features/problems/`
- `frontend/src/features/submissions/`
- `frontend/src/features/ranking/`
- `frontend/src/features/administration/`
- `frontend/src/hooks/`
- `frontend/src/layouts/`
- `frontend/src/lib/api/`
- `frontend/src/lib/auth/`
- `frontend/src/lib/realtime/`
- `frontend/src/pages/`
- `frontend/src/routes/`
- `frontend/src/styles/`
- `frontend/src/types/`

### Áreas inspeccionadas pero protegidas

- Raíz del repositorio.
- Backend, si aparece en el workspace.
- `database/`.
- Documentación académica existente.
- `README.md` de la raíz.
- Archivos existentes fuera de la ruta del change y de `frontend/`.

### Evidencias referenciadas pero no creadas por Pi

- `docs/capturas/frontend-react-vite.png`
- `docs/capturas/estructura-frontend-inicial.png`

## Assumptions

- El workspace local que consumirá Pi puede contener archivos o cambios no visibles en el repositorio remoto público.
- La estructura OpenSpec activa, su esquema y su mecanismo de validación deberán confirmarse localmente antes de materializar o validar el change.
- La versión de `create-vite` disponible durante apply puede generar pequeñas diferencias respecto de la estructura objetivo.
- La disponibilidad y compatibilidad de Node.js y npm no están confirmadas hasta ejecutar la inspección local.
- La carpeta `frontend/` puede no existir, existir vacía o contener material previo; su estado deberá determinarse antes de cualquier creación.
- Las rutas de capturas son referencias para una actividad manual posterior y no autorizan a Pi a crear imágenes ni archivos vacíos.
- Esta documentación no declara ejecutada una validación mediante CLI de OpenSpec.

## Risks

### Risk 1: `frontend/` contiene un proyecto o archivos previos

- Probability: Medium.
- Impact: High, porque el scaffold podría sobrescribir o mezclar contenido existente.
- Mitigation: Inspeccionar incluyendo archivos ocultos. Si contiene un proyecto, detenerse y reportar el conflicto. Si contiene cualquier archivo no autorizado, no eliminarlo ni sobrescribirlo.

### Risk 2: Node.js es incompatible con la versión vigente de Vite

- Probability: Medium.
- Impact: High, porque la creación, instalación o ejecución puede fallar.
- Mitigation: Consultar las versiones instaladas y contrastarlas con los requisitos de la versión de Vite que será utilizada. Detenerse si no son compatibles. No actualizar Node.js automáticamente.

### Risk 3: El template vigente difiere de la estructura orientativa

- Probability: Medium.
- Impact: Medium, porque exigir archivos obsoletos podría deformar el scaffold actual.
- Mitigation: Tratar la salida real del template `react-ts` como referencia primaria y agregar únicamente las carpetas organizativas aprobadas.

### Risk 4: Alteración accidental del scaffold predeterminado

- Probability: Medium.
- Impact: Medium, porque impediría obtener la captura requerida del proyecto en blanco.
- Mitigation: No limpiar `App.tsx`, no retirar logos o assets y comparar el contenido final con el scaffold recién generado.

### Risk 5: Creación accidental de archivos en la raíz

- Probability: Low.
- Impact: High, porque violaría la separación obligatoria del frontend.
- Mitigation: Ejecutar las operaciones npm desde `frontend/` después del scaffolding y verificar con Git que no se haya creado un nuevo `package.json` o lockfile en la raíz.

### Risk 6: Modificación de áreas protegidas

- Probability: Low.
- Impact: High, porque podría afectar documentación académica, base de datos o trabajo de otros integrantes.
- Mitigation: Registrar `git status` antes y después, revisar el diff y aplicar una allowlist limitada al change OpenSpec y a `frontend/`.

### Risk 7: Evidencias marcadas como completas sin existir

- Probability: Medium.
- Impact: Medium, porque el cierre del Sprint 0 contendría información falsa.
- Mitigation: Mantener pendientes las tareas de captura hasta verificar físicamente ambos archivos. La ausencia de capturas no invalida el scaffold técnico.

### Risk 8: Servidor de desarrollo dejado en ejecución

- Probability: Low.
- Impact: Low, pero puede mantener puertos ocupados o procesos abiertos.
- Mitigation: Registrar la URL utilizada, completar la comprobación y detener explícitamente el servidor antes del cierre técnico.

### Risk 9: El cambio supera el umbral de 400 LoC por archivos generados

- Probability: High.
- Impact: Low para la complejidad lógica, pero puede dificultar la revisión del diff.
- Mitigation: Diferenciar archivos generados, configuración y lockfile de los cambios manuales. Mantener todo dentro de un único change porque la inicialización es atómica.

## Rollback Strategy

El rollback no debe afectar datos persistentes, backend ni documentación académica.

- Antes de revertir, comparar el estado final con el baseline registrado mediante Git.
- Si `frontend/` no existía antes del change, se podrá retirar únicamente el contenido creado por este change.
- Si `frontend/` existía vacía, se podrá retirar únicamente el contenido generado, preservando la carpeta si formaba parte del estado previo.
- No eliminar archivos que no puedan atribuirse con certeza a este change.
- Revertir solamente los artefactos creados bajo `docs/openspec/changes/sprint-0-initialize/` cuando corresponda.
- No utilizar comandos destructivos amplios sobre el repositorio.
- Verificar después del rollback que no queden modificaciones en backend, `database/`, documentación académica ni raíz.
- El procedimiento exacto dependerá del estado local de Git y deberá elegirse sin descartar cambios ajenos.

## Success Criteria

- Existe un único change llamado exactamente `sprint-0-initialize`.
- El change se encuentra en `docs/openspec/changes/sprint-0-initialize/`.
- El change contiene únicamente `proposal.md`, `spec.md`, `design.md` y `tasks.md`, salvo metadatos exigidos por una convención OpenSpec activa confirmada durante explore.
- Existe `frontend/package.json`.
- El proyecto de `frontend/` corresponde a React, Vite y TypeScript.
- Existe un lockfile generado por npm dentro de `frontend/`.
- No se crea un nuevo `package.json` ni lockfile en la raíz.
- La pantalla predeterminada del template permanece intacta.
- La estructura de carpetas aprobada existe.
- Solo las carpetas vacías que deban versionarse contienen `.gitkeep`.
- `npm run lint` finaliza correctamente.
- `npm run build` finaliza correctamente.
- `npm run dev` permite acceder a la aplicación predeterminada.
- La aplicación funciona sin backend.
- El servidor de desarrollo se detiene después de la verificación.
- Git no muestra cambios fuera de las áreas autorizadas.
- Las capturas permanecen pendientes mientras sus archivos no existan.
- No se realizan commits ni push.
