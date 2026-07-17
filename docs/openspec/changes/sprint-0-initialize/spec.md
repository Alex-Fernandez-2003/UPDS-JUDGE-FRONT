# Spec

## Requirements

### Change Identity Requirements

- El change MUST llamarse exactamente `sprint-0-initialize`.
- Los artefactos MUST quedar bajo `docs/openspec/changes/sprint-0-initialize/`.
- La inicialización del proyecto, la organización de carpetas y las validaciones MUST permanecer dentro de un único change.
- El change MUST incluir propuesta, especificación, diseño y tareas.
- El proceso MUST NOT ejecutar apply durante la generación de este briefing.

### Preflight Requirements

- Pi MUST inspeccionar el estado local del repositorio antes de crear el proyecto.
- Pi MUST revisar la convención OpenSpec activa antes de modificar los artefactos.
- Pi MUST ejecutar y registrar `git status` antes de la inicialización.
- Pi MUST inspeccionar `frontend/`, incluyendo archivos ocultos.
- Si `frontend/` no existe, Pi MAY crearla mediante el proceso de scaffolding.
- Si `frontend/` existe y está completamente vacía, Pi MAY utilizarla.
- Si `frontend/` contiene un proyecto, Pi MUST detenerse y reportar el conflicto.
- Si `frontend/` contiene archivos que no forman parte de un proyecto, Pi MUST NOT eliminarlos ni sobrescribirlos y MUST solicitar autorización antes de continuar.
- Pi MUST comprobar las versiones disponibles de Node.js y npm.
- Pi MUST verificar que Node.js sea compatible con la versión de Vite utilizada.
- Si Node.js no es compatible, Pi MUST detenerse y reportar el requisito incumplido.
- Pi MUST NOT actualizar automáticamente Node.js o npm.

### Project Initialization Requirements

- El proyecto MUST crearse dentro de `frontend/`.
- El proyecto MUST utilizar React.
- El proyecto MUST utilizar Vite.
- El proyecto MUST utilizar TypeScript.
- El proyecto MUST utilizar npm como único administrador de paquetes.
- El scaffolding MUST utilizar el template oficial `react-ts`.
- Pi MUST utilizar la versión vigente de `create-vite` disponible durante apply.
- Pi MUST instalar las dependencias iniciales mediante npm.
- Pi MUST NOT instalar dependencias adicionales a las generadas por el template.
- `frontend/package.json` MUST contener los scripts generados necesarios para desarrollo, build y lint.
- `frontend/package-lock.json` MUST ser generado o actualizado por npm dentro de `frontend/`.
- El change MUST NOT crear un nuevo `package.json` en la raíz.
- El change MUST NOT crear un lockfile de npm en la raíz.

### Scaffold Preservation Requirements

- La pantalla predeterminada de React y Vite MUST conservarse.
- `frontend/src/App.tsx` MUST permanecer con el comportamiento predeterminado del template vigente.
- Los estilos predeterminados MUST conservarse.
- Los logos y assets predeterminados MUST conservarse.
- Pi MUST NOT agregar textos, branding, datos o componentes relacionados con UPDS JUDGE.
- Pi MUST NOT reemplazar la pantalla predeterminada por una pantalla vacía.
- Pi MUST NOT limpiar el scaffold durante este change.

### Folder Organization Requirements

- El proyecto MUST contener `src/components/common/`.
- El proyecto MUST contener `src/components/forms/`.
- El proyecto MUST contener `src/components/navigation/`.
- El proyecto MUST contener `src/components/tables/`.
- El proyecto MUST contener `src/features/auth/`.
- El proyecto MUST contener `src/features/contests/`.
- El proyecto MUST contener `src/features/problems/`.
- El proyecto MUST contener `src/features/submissions/`.
- El proyecto MUST contener `src/features/ranking/`.
- El proyecto MUST contener `src/features/administration/`.
- El proyecto MUST contener `src/hooks/`.
- El proyecto MUST contener `src/layouts/`.
- El proyecto MUST contener `src/lib/api/`.
- El proyecto MUST contener `src/lib/auth/`.
- El proyecto MUST contener `src/lib/realtime/`.
- El proyecto MUST contener `src/pages/`.
- El proyecto MUST contener `src/routes/`.
- El proyecto MUST contener `src/styles/`.
- El proyecto MUST contener `src/types/`.
- Las carpetas organizativas MUST permanecer sin lógica funcional.
- Pi MUST NOT crear componentes vacíos para conservar directorios.
- Pi MUST NOT crear hooks vacíos.
- Pi MUST NOT crear servicios, clientes, adapters o integraciones simuladas.
- Pi MUST NOT crear datos mock.
- Pi MUST NOT crear archivos `index.ts` sin una necesidad funcional.
- Una carpeta vacía que deba quedar versionada MAY contener `.gitkeep`.
- `.gitkeep` MUST NOT agregarse a carpetas que ya contienen archivos versionables.
- `.gitkeep` MUST NOT agregarse a un directorio padre cuando sus subdirectorios ya permiten versionarlo.

### Validation Requirements

- Pi MUST ejecutar `npm install` dentro de `frontend/`.
- Pi MUST ejecutar `npm run lint` dentro de `frontend/`.
- Pi MUST ejecutar `npm run build` dentro de `frontend/`.
- Pi MUST ejecutar `npm run dev` dentro de `frontend/`.
- La instalación MUST finalizar sin sustituir npm por otro administrador de paquetes.
- El lint MUST finalizar con código de salida exitoso.
- El build MUST finalizar con código de salida exitoso.
- El servidor de desarrollo MUST iniciar correctamente.
- Pi MUST comprobar mediante navegador o solicitud local que la aplicación responde.
- La aplicación MUST mostrar la pantalla predeterminada de React y Vite.
- La aplicación MUST funcionar sin una conexión al backend.
- Pi MUST registrar la URL local realmente utilizada.
- Pi MUST detener el servidor de desarrollo después de la comprobación.
- Los directorios generados para dependencias o build MUST permanecer ignorados cuando así lo defina el template.

### Evidence Requirements

- El proyecto MUST quedar en condiciones de mostrar la pantalla predeterminada en un navegador.
- La estructura MUST quedar visible en el explorador del editor.
- La captura `docs/capturas/frontend-react-vite.png` MUST ser tomada manualmente por el usuario.
- La captura `docs/capturas/estructura-frontend-inicial.png` MUST ser tomada manualmente por el usuario.
- Pi MUST NOT fabricar, simular o sustituir las capturas.
- Pi MUST NOT crear archivos vacíos con los nombres de las capturas.
- Una tarea de captura MUST permanecer pendiente mientras el archivo correspondiente no exista.
- La ausencia de las capturas MUST NOT impedir completar las tareas técnicas del scaffold.

### Protected Area Requirements

- Pi MUST NOT modificar el backend.
- Pi MUST NOT modificar `database/`.
- Pi MUST NOT modificar documentos académicos existentes dentro de `docs/`.
- Pi MUST NOT modificar el informe final.
- Pi MUST NOT modificar el `README.md` de la raíz.
- Dentro de `docs/`, Pi MUST limitar sus cambios automáticos a los artefactos del change y a la actualización real de sus tareas.
- Pi MUST NOT modificar archivos existentes fuera de las áreas autorizadas.
- Pi MUST NOT eliminar ni sobrescribir archivos sin autorización.
- Pi MUST NOT realizar commits.
- Pi MUST NOT realizar push.

### Scope Requirements

- El change MUST NOT incorporar Tailwind CSS.
- El change MUST NOT incorporar routers.
- El change MUST NOT incorporar autenticación.
- El change MUST NOT incorporar estado global.
- El change MUST NOT incorporar clientes HTTP.
- El change MUST NOT incorporar variables de entorno de API.
- El change MUST NOT incorporar tiempo real.
- El change MUST NOT incorporar integración con backend o Judge0.
- El change MUST NOT implementar pantallas de negocio.
- El change MUST NOT agregar infraestructura de tests.
- El change MUST NOT agregar Docker, CI/CD o despliegue.
- El change MUST NOT utilizar Astro, Next.js o Create React App.

### OpenSpec Tracking Requirements

- Pi MUST actualizar el estado de cada tarea según su ejecución real.
- Pi MUST NOT marcar como completada una tarea cuya verificación haya fallado.
- Pi MUST mantener pendientes las tareas bloqueadas por conflictos de carpeta, toolchain o archivos protegidos.
- Pi MUST ejecutar la validación OpenSpec soportada por el repositorio cuando exista una herramienta disponible.
- Pi MUST NOT ejecutar el comando o fase de apply como parte de la validación documental.
- Si no existe una herramienta de validación OpenSpec disponible, Pi MUST registrar la limitación y verificar manualmente estructura, coherencia y rutas.

## Behavior Scenarios

### Scenario 1: La carpeta frontend no existe

Given que `frontend/` no existe y el resto del preflight no detecta bloqueos  
When Pi inicia el scaffolding aprobado  
Then el proyecto MUST crearse dentro de `frontend/` sin crear archivos npm en la raíz

### Scenario 2: La carpeta frontend existe y está vacía

Given que `frontend/` existe y no contiene archivos visibles ni ocultos  
When Pi confirma que puede utilizarse  
Then el scaffold MUST instalarse dentro de esa carpeta sin eliminar contenido previo

### Scenario 3: La carpeta frontend contiene un proyecto

Given que `frontend/` contiene un `package.json`, código fuente u otros indicadores de un proyecto  
When Pi realiza la inspección inicial  
Then Pi MUST detenerse, mantener las tareas posteriores pendientes y reportar el conflicto

### Scenario 4: La carpeta frontend contiene archivos no identificados

Given que `frontend/` no está vacía pero no se puede confirmar que sea un proyecto  
When Pi detecta contenido previo  
Then Pi MUST NOT eliminarlo ni sobrescribirlo y MUST detenerse hasta recibir autorización

### Scenario 5: Node.js no es compatible

Given que Node.js o npm están instalados  
When Pi compara la versión de Node.js con los requisitos de la versión vigente de Vite  
Then Pi MUST detenerse si existe incompatibilidad y MUST NOT actualizar Node.js automáticamente

### Scenario 6: Inicialización correcta

Given que `frontend/` puede utilizarse y el toolchain es compatible  
When Pi ejecuta `create-vite` con el template `react-ts` e instala con npm  
Then `frontend/package.json`, la configuración TypeScript y los archivos del template MUST existir

### Scenario 7: Conservación del scaffold

Given que el template `react-ts` fue generado correctamente  
When Pi agrega la estructura organizativa  
Then la pantalla, los estilos, logos y assets predeterminados MUST permanecer intactos

### Scenario 8: Creación de carpetas vacías

Given que una carpeta aprobada no contiene archivos  
When debe quedar representada en Git  
Then Pi MAY agregar un único `.gitkeep` y MUST NOT agregar lógica ficticia

### Scenario 9: Carpeta ya versionable

Given que una carpeta contiene un asset, archivo generado o subdirectorio versionable  
When Pi revisa la política de `.gitkeep`  
Then Pi MUST NOT agregar un `.gitkeep` innecesario

### Scenario 10: Validación de lint y build

Given que las dependencias fueron instaladas correctamente  
When Pi ejecuta `npm run lint` y `npm run build`  
Then ambos comandos MUST finalizar correctamente antes de marcar sus tareas como completadas

### Scenario 11: Ejecución local

Given que lint y build finalizaron correctamente  
When Pi ejecuta `npm run dev`  
Then la aplicación MUST responder en la URL local reportada y mostrar la pantalla predeterminada

### Scenario 12: Puerto predeterminado ocupado

Given que el puerto habitual del servidor está ocupado  
When Vite inicia en otro puerto disponible  
Then Pi MUST verificar y reportar la URL realmente asignada sin modificar la configuración permanente

### Scenario 13: Capturas todavía inexistentes

Given que el scaffold técnico funciona pero una o ambas capturas no existen  
When Pi actualiza las tareas OpenSpec  
Then las tareas técnicas MAY marcarse completas, pero las tareas de evidencia MUST permanecer pendientes

### Scenario 14: Modificación accidental de un área protegida

Given que el `git status` final muestra cambios fuera del change y de `frontend/`  
When Pi realiza la auditoría final  
Then el cierre técnico MUST detenerse hasta identificar y revertir únicamente los cambios atribuibles a este change

### Scenario 15: Fallo durante npm install

Given que el scaffolding fue creado  
When `npm install` falla por red, permisos o incompatibilidad  
Then Pi MUST reportar el error, MUST NOT cambiar de administrador de paquetes y MUST mantener pendientes las validaciones posteriores

### Scenario 16: Validación OpenSpec no disponible

Given que el workspace no contiene una herramienta OpenSpec ejecutable  
When Pi intenta validar el change  
Then Pi MUST documentar la limitación y realizar una revisión estructural sin afirmar que una validación CLI fue ejecutada

## Edge Cases

- `frontend/` contiene únicamente archivos ocultos.
- `frontend/` es un enlace simbólico o apunta fuera del repositorio.
- Existe un `package.json` previo en la raíz que no pertenece al change.
- `create-vite` solicita confirmación por encontrar una carpeta existente.
- La versión vigente del template ya no genera alguno de los archivos orientativos.
- npm está disponible pero su configuración intenta utilizar un registry inaccesible.
- `npm install` produce warnings sin provocar un código de salida fallido.
- El lockfile cambia por utilizar una versión distinta de npm.
- El template vigente cambia nombres de assets o configuración ESLint.
- El lint falla en el scaffold recién generado.
- El build crea `dist/`, pero este aparece como archivo ignorado.
- `node_modules/` o `dist/` aparecen como archivos versionables por una alteración inesperada de `.gitignore`.
- El servidor utiliza un puerto distinto al esperado.
- El servidor inicia, pero la página no responde localmente.
- La página responde, pero muestra un error de runtime.
- Solo una de las dos capturas existe.
- Una captura existe con nombre o extensión diferente.
- `git status` inicial ya contiene cambios ajenos.
- La convención OpenSpec activa exige metadatos adicionales.
- La herramienta OpenSpec disponible utiliza una estructura distinta para especificaciones.
- La validación OpenSpec falla por estructura, enlaces o requisitos incompletos.
- La carpeta `docs/capturas/` no existe.
- El proceso es interrumpido antes de detener el servidor de desarrollo.

## Acceptance Criteria

- El identificador del change MUST ser exactamente `sprint-0-initialize`.
- La ruta del change MUST ser exactamente `docs/openspec/changes/sprint-0-initialize/`.
- El briefing MUST representar un único change.
- Deben existir los cuatro artefactos OpenSpec requeridos.
- Debe existir `frontend/package.json`.
- `frontend/package.json` MUST identificar un proyecto React construido con Vite.
- TypeScript MUST estar configurado mediante los archivos generados por el template vigente.
- `frontend/package-lock.json` MUST existir.
- No MUST aparecer un nuevo `package.json` o `package-lock.json` en la raíz.
- No MUST existir un lockfile de otro administrador de paquetes.
- Todas las carpetas aprobadas MUST existir.
- Las carpetas vacías que deban versionarse MUST contener `.gitkeep`.
- Ninguna carpeta no vacía MUST contener un `.gitkeep` innecesario agregado por este change.
- No MUST existir lógica ficticia en las nuevas carpetas.
- `App.tsx`, sus estilos y los assets del scaffold MUST conservar la pantalla predeterminada.
- No MUST existir texto o branding de UPDS JUDGE en la pantalla.
- `npm install` MUST finalizar correctamente.
- `npm run lint` MUST finalizar correctamente.
- `npm run build` MUST finalizar correctamente.
- `npm run dev` MUST permitir acceder a la aplicación.
- La aplicación MUST funcionar sin backend.
- El servidor de desarrollo MUST quedar detenido al finalizar la verificación.
- El diff final MUST limitarse a `frontend/` y a los artefactos del change.
- El backend, `database/`, documentos académicos y `README.md` raíz MUST permanecer sin cambios atribuibles al change.
- Las capturas MUST permanecer pendientes hasta que sus archivos existan.
- No MUST existir evidencia ficticia.
- No MUST haberse ejecutado commit o push.
- La validación OpenSpec soportada por el workspace MUST finalizar correctamente antes de declarar el change válido mediante herramienta.
- Si no existe herramienta OpenSpec, el resultado MUST indicar explícitamente que solo se realizó validación estructural.

## Out of Scope

- Arquitectura funcional completa del frontend.
- Pantallas o componentes reales de UPDS JUDGE.
- Navegación y protección de rutas.
- Autenticación y autorización.
- Estado global y fetching de datos.
- Integración con backend, Judge0 o tiempo real.
- Sistema de diseño y librerías CSS.
- Tests automatizados.
- Contenedores, automatización y despliegue.
- Cambios en base de datos, backend o documentación académica.
- Captura automática de evidencias.
- Commits y push.
