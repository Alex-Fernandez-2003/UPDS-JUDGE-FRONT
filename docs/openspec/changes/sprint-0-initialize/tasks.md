# Tasks

## Task 1: [Fase 1] Inspeccionar el repositorio y la convención OpenSpec

**Estado:** Completada.


- Objective:
  Confirmar el estado real del workspace, localizar la convención OpenSpec activa y revisar que el change sea exactamente `sprint-0-initialize`.
- Files or areas likely involved:
  Raíz del repositorio, configuración OpenSpec, `docs/openspec/`, `docs/openspec/changes/sprint-0-initialize/`.
- Execution notes:
  Revisar los artefactos del change sin ejecutar apply. Identificar esquema, metadatos y herramienta de validación disponibles. No modificar archivos académicos.
- Verification method:
  Registrar la estructura OpenSpec detectada, confirmar la ruta exacta del change y comprobar que propuesta, especificación, diseño y tareas forman un único change.
- Dependencies:
  None.

## Task 2: [Fase 1] Registrar el estado inicial con Git

**Estado:** Completada.


- Objective:
  Crear un baseline verificable de los archivos modificados antes de la inicialización.
- Files or areas likely involved:
  Índice y working tree de Git; raíz del repositorio.
- Execution notes:
  Ejecutar `git status` y revisar cambios preexistentes. No descartar, restaurar ni incluir cambios ajenos.
- Verification method:
  Conservar un registro del estado inicial y una lista de cambios preexistentes que deberán excluirse de la auditoría del change.
- Dependencies:
  Task 1.

## Task 3: [Fase 1] Verificar la carpeta frontend

**Estado:** Completada.


- Objective:
  Determinar si `frontend/` puede utilizarse sin eliminar ni sobrescribir contenido.
- Files or areas likely involved:
  `frontend/`, incluyendo archivos ocultos y metadatos.
- Execution notes:
  Si no existe, continuar. Si existe vacía, continuar. Si contiene un proyecto, detenerse. Si contiene cualquier archivo no autorizado, detenerse y reportarlo. Verificar que no sea una ruta externa inesperada.
- Verification method:
  Registrar uno de los estados: inexistente, vacía, proyecto existente o contenido no identificado. Solo los dos primeros permiten continuar.
- Dependencies:
  Task 2.

## Task 4: [Fase 1] Verificar Node.js y npm

**Estado:** Completada.


- Objective:
  Confirmar que el toolchain local puede ejecutar la versión vigente de Vite con npm.
- Files or areas likely involved:
  Entorno local de Node.js y npm; no requiere modificar archivos.
- Execution notes:
  Consultar versiones y compararlas con los requisitos publicados o reportados por la versión de Vite utilizada. No actualizar Node.js o npm automáticamente.
- Verification method:
  Registrar versiones y resultado de compatibilidad. Detener las tareas posteriores si Node.js es incompatible o npm no está disponible.
- Dependencies:
  Task 3.

## Task 5: [Fase 2] Crear el scaffold React con Vite y TypeScript

**Estado:** Completada.


- Objective:
  Crear el proyecto frontend mediante `create-vite` y el template oficial `react-ts`.
- Files or areas likely involved:
  `frontend/` y archivos generados por el template.
- Execution notes:
  Usar `frontend` como destino si la carpeta no existe o `.` desde una carpeta confirmada como vacía. No aceptar sobrescrituras de contenido existente. No utilizar Astro, Next.js o Create React App.
- Verification method:
  Confirmar que `frontend/package.json`, la configuración TypeScript, la configuración Vite, `src/` e `index.html` fueron generados. Confirmar que no se creó un manifiesto npm en la raíz.
- Dependencies:
  Tasks 3 and 4.

## Task 6: [Fase 2] Instalar las dependencias iniciales

**Estado:** Completada.


- Objective:
  Resolver exclusivamente las dependencias incluidas por el template mediante npm.
- Files or areas likely involved:
  `frontend/package.json`, `frontend/package-lock.json`, `frontend/node_modules/`.
- Execution notes:
  Ejecutar `npm install` desde `frontend/`. No instalar paquetes adicionales ni usar otro administrador de paquetes.
- Verification method:
  Confirmar código de salida exitoso, existencia de `frontend/package-lock.json`, ausencia de lockfiles alternativos y ausencia de nuevos archivos npm en la raíz.
- Dependencies:
  Task 5.

## Task 7: [Fase 2] Confirmar y preservar el scaffold predeterminado

**Estado:** Completada.


- Objective:
  Verificar que la aplicación conserva la pantalla, estilos, logos y assets generados por el template.
- Files or areas likely involved:
  `frontend/src/App.tsx`, `frontend/src/App.css`, `frontend/src/index.css`, `frontend/src/assets/`, `frontend/public/`.
- Execution notes:
  No limpiar, personalizar ni reemplazar el contenido. No agregar textos o branding de UPDS JUDGE.
- Verification method:
  Comparar los archivos relevantes con el estado recién generado y confirmar que no hubo modificaciones funcionales o visuales.
- Dependencies:
  Task 6.

## Task 8: [Fase 3] Crear la estructura inicial de carpetas

**Estado:** Completada.


- Objective:
  Incorporar las carpetas aprobadas para componentes, features, hooks, layouts, librerías, páginas, rutas, estilos y tipos.
- Files or areas likely involved:
  `frontend/src/components/`, `frontend/src/features/`, `frontend/src/hooks/`, `frontend/src/layouts/`, `frontend/src/lib/`, `frontend/src/pages/`, `frontend/src/routes/`, `frontend/src/styles/`, `frontend/src/types/`.
- Execution notes:
  Crear únicamente las carpetas indicadas en el diseño. No crear componentes, hooks, servicios, clientes, mocks, tipos, rutas, pantallas o archivos `index.ts`.
- Verification method:
  Comparar la estructura resultante con la lista aprobada y confirmar que no contiene lógica ficticia.
- Dependencies:
  Task 7.

## Task 9: [Fase 3] Agregar marcadores mínimos para carpetas vacías

**Estado:** Completada.


- Objective:
  Permitir que Git represente las carpetas hoja vacías sin introducir código placeholder.
- Files or areas likely involved:
  Carpetas vacías creadas en Task 8.
- Execution notes:
  Agregar `.gitkeep` únicamente en carpetas hoja vacías que deban versionarse. No agregarlo en carpetas que ya contienen archivos ni en padres representados por subcarpetas.
- Verification method:
  Enumerar los `.gitkeep` agregados y justificar que cada carpeta seguiría vacía y no versionable sin el marcador.
- Dependencies:
  Task 8.

## Task 10: [Fase 4] Ejecutar lint

**Estado:** Completada.


- Objective:
  Verificar que el scaffold y la estructura añadida cumplen la configuración ESLint generada.
- Files or areas likely involved:
  Proyecto `frontend/` y configuración ESLint.
- Execution notes:
  Ejecutar `npm run lint` desde `frontend/`. No debilitar reglas ni modificar configuración para ocultar errores.
- Verification method:
  Registrar código de salida exitoso y salida relevante del comando. Mantener la tarea pendiente si falla.
- Dependencies:
  Task 9.

## Task 11: [Fase 4] Ejecutar build

**Estado:** Completada.


- Objective:
  Confirmar que TypeScript y Vite pueden producir el build del scaffold.
- Files or areas likely involved:
  Proyecto `frontend/`, configuración TypeScript y Vite, directorio local de salida.
- Execution notes:
  Ejecutar `npm run build`. No versionar los artefactos de build.
- Verification method:
  Registrar código de salida exitoso y confirmar que los archivos generados por el build permanecen ignorados.
- Dependencies:
  Task 10.

## Task 12: [Fase 4] Verificar la ejecución local

**Estado:** Completada.


- Objective:
  Confirmar que la aplicación predeterminada inicia y responde sin backend.
- Files or areas likely involved:
  Servidor de desarrollo de `frontend/` y navegador o cliente local.
- Execution notes:
  Ejecutar `npm run dev`, registrar la URL real, abrirla y verificar la pantalla predeterminada. No realizar personalizaciones para la captura.
- Verification method:
  Confirmar respuesta local, ausencia de error de runtime y visualización del scaffold predeterminado.
- Dependencies:
  Task 11.

## Task 13: [Fase 4] Detener el servidor de desarrollo

**Estado:** Completada.


- Objective:
  Cerrar el proceso utilizado para la comprobación local.
- Files or areas likely involved:
  Proceso local del servidor Vite.
- Execution notes:
  Detener explícitamente el servidor después de completar la verificación.
- Verification method:
  Confirmar que el proceso terminó y que el puerto ya no está ocupado por la ejecución iniciada en Task 12.
- Dependencies:
  Task 12.

## Task 14: [Fase 5] Auditar el estado final con Git

**Estado:** Completada.


- Objective:
  Confirmar que el change solo afectó `frontend/` y sus artefactos OpenSpec.
- Files or areas likely involved:
  Working tree de Git, `frontend/`, `docs/openspec/changes/sprint-0-initialize/`.
- Execution notes:
  Ejecutar `git status` y revisar los archivos creados o modificados. Comparar con el baseline de Task 2. No tocar cambios ajenos.
- Verification method:
  Confirmar que no existen cambios atribuibles al change en backend, `database/`, documentación académica, `README.md` raíz o archivos npm de la raíz.
- Dependencies:
  Task 13.

## Task 15: [Fase 5] Revisar las evidencias manuales

**Estado:** Pendiente. Las capturas manuales no existen en el repositorio.


- Objective:
  Mantener un estado veraz para las capturas requeridas.
- Files or areas likely involved:
  `docs/capturas/frontend-react-vite.png`, `docs/capturas/estructura-frontend-inicial.png`, estados de tareas OpenSpec.
- Execution notes:
  Comprobar únicamente la existencia real de los archivos. No crear imágenes, placeholders o archivos vacíos. La ausencia de capturas no debe deshacer el scaffold.
- Verification method:
  Marcar cada evidencia como completa solo si el archivo correspondiente existe. En caso contrario, mantenerla pendiente e informar que debe ser tomada manualmente.
- Dependencies:
  Tasks 12 and 14.

## Task 16: [Fase 5] Validar el change OpenSpec

**Estado:** Completada.


- Objective:
  Verificar que el change cumple la convención y el esquema OpenSpec disponibles en el repositorio.
- Files or areas likely involved:
  `docs/openspec/changes/sprint-0-initialize/`, configuración y herramientas OpenSpec detectadas.
- Execution notes:
  Utilizar el mecanismo de validación identificado en Task 1. No ejecutar apply. Si no existe una herramienta, realizar validación estructural y declarar explícitamente la limitación.
- Verification method:
  Registrar la salida exitosa de la herramienta OpenSpec o un checklist manual de identificador, ruta, artefactos, requisitos, escenarios, criterios y tareas.
- Dependencies:
  Tasks 1, 14 and 15.

## Task 17: [Fase 5] Actualizar estados y cerrar sin commit

**Estado:** Completada.


- Objective:
  Sincronizar `tasks.md` con lo realmente ejecutado y preparar el handoff a Pi o al usuario.
- Files or areas likely involved:
  `docs/openspec/changes/sprint-0-initialize/tasks.md`.
- Execution notes:
  Marcar únicamente tareas verificadas. Mantener pendientes las capturas inexistentes, las validaciones fallidas y cualquier trabajo bloqueado. No realizar commit ni push.
- Verification method:
  Comparar cada estado con su evidencia, confirmar que no se ejecutó commit o push y emitir un resumen técnico de resultados y bloqueos.
- Dependencies:
  Tasks 14, 15 and 16.

## Review Workload Forecast

- Estimated LoC changed:
  Aproximadamente 150-300 LoC de configuración, código y marcadores generados, más 1,000-3,000 LoC potenciales de `package-lock.json` y otros archivos generados, dependiendo de las versiones vigentes.
- Risk of exceeding 400 LoC review threshold:
  High en conteo bruto por el lockfile y el scaffold; Low en complejidad lógica porque no se implementa lógica de negocio.
- Recommendation:
  Single PR.
- Suggested split if chained:
  No recomendado. La inicialización, la estructura y las validaciones deben permanecer como una unidad atómica dentro del único change `sprint-0-initialize`. Durante la revisión se deben separar conceptualmente archivos generados, lockfile, estructura manual y artefactos OpenSpec.
