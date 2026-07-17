# Design

## Components Touched

### OpenSpec change

- `docs/openspec/changes/sprint-0-initialize/proposal.md`
- `docs/openspec/changes/sprint-0-initialize/spec.md`
- `docs/openspec/changes/sprint-0-initialize/design.md`
- `docs/openspec/changes/sprint-0-initialize/tasks.md`
- Metadatos adicionales solamente si la convención OpenSpec activa los exige.

### Frontend project root

- `frontend/package.json`: scripts, dependencias y metadatos generados por el template.
- `frontend/package-lock.json`: resolución reproducible generada por npm.
- Configuración Vite, TypeScript y ESLint generada por el template.
- `frontend/index.html`: entrada de la aplicación.
- `frontend/public/`: archivos estáticos públicos generados por el template.
- `frontend/src/`: código fuente predeterminado y estructura organizativa.

### Folder Responsibilities

#### `src/assets/`

Recursos visuales importados desde el código fuente. Debe conservar los assets generados por el template. No se agregarán recursos de UPDS JUDGE en este change.

#### `src/components/`

Componentes visuales reutilizables y compartidos que se implementarán en changes posteriores.

- `common/`: componentes genéricos.
- `forms/`: controles y componentes de formularios.
- `navigation/`: header, sidebar, breadcrumbs, tabs y menús.
- `tables/`: tablas, filas, paginación y elementos relacionados.

En este change solo se crean las carpetas.

#### `src/features/`

Organización futura por dominios funcionales:

- `auth/`
- `contests/`
- `problems/`
- `submissions/`
- `ranking/`
- `administration/`

No se implementarán casos de uso, estado, componentes ni servicios.

#### `src/hooks/`

Ubicación futura para hooks reutilizables. No se crearán hooks vacíos.

#### `src/layouts/`

Ubicación futura para layouts generales. No se crearán layouts durante Sprint 0.

#### `src/lib/`

Integraciones y utilidades compartidas futuras:

- `api/`: cliente o adapters de API en changes posteriores.
- `auth/`: utilidades e integración de autenticación futuras.
- `realtime/`: integración de tiempo real futura.

No se implementará ningún cliente real o simulado.

#### `src/pages/`

Ubicación futura para las pantallas principales. No se crearán pantallas.

#### `src/routes/`

Ubicación futura para navegación y protección de rutas. No se instalará ni configurará un router.

#### `src/styles/`

Ubicación futura para estilos compartidos. Los estilos predeterminados permanecerán donde los genere el template.

#### `src/types/`

Ubicación futura para tipos e interfaces TypeScript compartidos. No se crearán tipos ficticios.

## Boundaries Respected

- Todo el proyecto ejecutable del frontend debe permanecer dentro de `frontend/`.
- El frontend no debe depender del backend para mostrar el scaffold.
- La inicialización no debe introducir contratos HTTP, DTOs, autenticación o comunicación en tiempo real.
- La estructura por dominios no debe convertirse en implementación anticipada.
- Los archivos predeterminados de Vite deben permanecer separados de las carpetas futuras.
- La raíz del repositorio es una frontera de inspección, no un destino para dependencias npm.
- Backend y `database/` son fronteras completamente protegidas.
- Los documentos académicos existentes son fronteras protegidas.
- Dentro de `docs/`, únicamente el change OpenSpec puede ser actualizado automáticamente.
- Las capturas son responsabilidad manual del usuario.
- El change no debe acoplar decisiones futuras sobre routing, estado, estilos, consumo de API o deployment.
- La inicialización, organización y validación deben mantenerse como un único change atómico.

## Contracts Changed

No external contract changes are confirmed from the provided input.

No se modifican APIs, rutas HTTP, schemas de base de datos, eventos, autenticación, variables de entorno o contratos con el backend.

Se introducen únicamente contratos internos de proyecto:

### Filesystem Contract

- La raíz ejecutable del frontend será `frontend/`.
- El código fuente estará bajo `frontend/src/`.
- Las responsabilidades futuras se organizarán mediante las carpetas aprobadas.
- Las carpetas vacías se versionarán únicamente mediante `.gitkeep` cuando sea necesario.

### Package Contract

- npm será el administrador de paquetes.
- `frontend/package.json` será el manifiesto del frontend.
- `frontend/package-lock.json` será el único lockfile generado.
- Los scripts disponibles serán los que provea el template vigente, incluyendo los necesarios para `dev`, `build` y `lint`.
- No se ampliará este contrato con dependencias adicionales.

### OpenSpec Contract

- El identificador estable será `sprint-0-initialize`.
- La ruta canónica será `docs/openspec/changes/sprint-0-initialize/`.
- Los estados de tareas reflejarán ejecución real.
- Las tareas de evidencia no podrán completarse por inferencia.

## Data Flow

Flujo de preflight:

- Pi abre el workspace local.
- Pi revisa las convenciones OpenSpec activas.
- Pi revisa los cuatro artefactos del change.
- Pi registra el estado inicial mediante Git.
- Pi inspecciona `frontend/`, incluyendo contenido oculto.
- Pi valida Node.js y npm.
- Si existe un conflicto, Pi detiene el proceso antes del scaffolding.

Flujo de inicialización:

- Si `frontend/` no existe:
  - ejecutar `create-vite` desde la raíz utilizando `frontend` como destino;
  - seleccionar explícitamente el template `react-ts`.
- Si `frontend/` existe y está vacía:
  - ingresar a `frontend/`;
  - ejecutar `create-vite` utilizando `.` como destino;
  - seleccionar explícitamente el template `react-ts`.
- Instalar las dependencias con npm desde `frontend/`.
- Confirmar los archivos generados.
- No editar el scaffold visual.

Comandos previstos para apply, sujetos al preflight:

- Carpeta ausente: `npm create vite@latest frontend -- --template react-ts`
- Carpeta existente y vacía, desde `frontend/`: `npm create vite@latest . -- --template react-ts`
- Instalación: `npm install`
- Lint: `npm run lint`
- Build: `npm run build`
- Desarrollo: `npm run dev`

Flujo de organización:

- Crear las carpetas aprobadas.
- Determinar cuáles permanecen vacías.
- Agregar `.gitkeep` solo en las carpetas hoja vacías que deban versionarse.
- No agregar `.gitkeep` en:
  - `src/assets/` si contiene assets del template;
  - `public/` si contiene archivos del template;
  - `components/`, `features/` o `lib/` cuando sus subcarpetas ya estén versionadas;
  - cualquier carpeta que ya contenga archivos reales.

Flujo de validación:

- Ejecutar lint.
- Ejecutar build.
- Confirmar que `dist/` y `node_modules/` no queden versionados.
- Iniciar el servidor de desarrollo.
- Registrar la URL local utilizada.
- Abrir la aplicación o consultar su respuesta local.
- Confirmar visualmente la pantalla predeterminada.
- Confirmar que no se requiere backend.
- Detener el servidor.

Flujo de cierre:

- Ejecutar `git status`.
- Revisar el diff o listado de archivos creados.
- Comparar con el baseline.
- Confirmar que las áreas protegidas no cambiaron.
- Actualizar estados de tareas según evidencia real.
- Mantener pendientes las capturas inexistentes.
- Ejecutar la validación OpenSpec disponible sin ejecutar apply.
- No realizar commit ni push.

## Required Tests Per Layer

### Preflight Verification

- Verificar existencia y contenido de `frontend/`.
- Verificar archivos ocultos.
- Verificar que `frontend/` no sea una ruta externa inesperada.
- Verificar versiones de Node.js y npm.
- Verificar baseline de Git.
- Verificar convención OpenSpec activa.

### Dependency Verification

- Ejecutar `npm install`.
- Confirmar código de salida exitoso.
- Confirmar creación de `frontend/package-lock.json`.
- Confirmar ausencia de lockfiles de otros administradores.
- Confirmar ausencia de manifiestos npm nuevos en la raíz.

### Static Verification

- Ejecutar `npm run lint`.
- Confirmar código de salida exitoso.
- No ocultar errores mediante cambios en reglas ESLint fuera del scaffold.

### Build Verification

- Ejecutar `npm run build`.
- Confirmar código de salida exitoso.
- Confirmar que los artefactos de build no se incluyan como archivos versionables.

### Runtime Smoke Verification

- Ejecutar `npm run dev`.
- Confirmar que el servidor inicia.
- Confirmar que la URL local responde.
- Confirmar que se muestra la pantalla predeterminada.
- Confirmar ausencia de dependencia del backend.
- Detener el servidor.

### Filesystem Verification

- Confirmar presencia de todas las carpetas aprobadas.
- Confirmar ausencia de lógica ficticia.
- Confirmar uso mínimo de `.gitkeep`.
- Confirmar que los archivos del scaffold permanecen.

### Protected Scope Verification

- Comparar `git status` inicial y final.
- Revisar que no existan cambios en backend, `database/`, documentación académica o `README.md`.
- Confirmar que no se realizaron commits o push.

### OpenSpec Verification

- Ejecutar la validación soportada por la instalación y esquema OpenSpec del repositorio.
- No asumir un comando concreto antes de inspeccionar la herramienta disponible.
- Si no existe herramienta, revisar manualmente:
  - identificador;
  - ruta;
  - presencia de artefactos;
  - coherencia entre propuesta, especificación, diseño y tareas;
  - requisitos MUST/SHOULD/MAY;
  - escenarios Given/When/Then;
  - criterios verificables;
  - tareas ordenadas.

### Automated Test Position

No se agregará infraestructura de tests, tests funcionales o tests de componentes. El change no introduce lógica de negocio que justifique Strict TDD.

La validación se limita a instalación, lint, build, runtime smoke, estructura, Git y OpenSpec.

## Tradeoffs Accepted

- Se conserva el scaffold predeterminado aunque no represente la identidad visual del producto.
- Se crean carpetas de dominios futuros sin diseñar todavía su arquitectura interna.
- Se utiliza `.gitkeep` para representar carpetas vacías, aceptando archivos de marcador temporales.
- Se acepta que la estructura exacta del template pueda variar entre versiones.
- Se evita fijar versiones manualmente y se utiliza el template vigente.
- Se acepta que el lockfile incremente considerablemente el tamaño del diff.
- Se mantiene un único change y una única unidad de revisión aunque el diff generado supere 400 LoC.
- Se posponen routing, estado, estilos, API, autenticación, tiempo real y testing para changes posteriores.
- Las capturas no forman parte de la automatización y pueden permanecer pendientes después de completar el scaffold técnico.

## Implementation Constraints

- Pi debe inspeccionar antes de crear.
- Pi no debe continuar si `frontend/` contiene un proyecto.
- Pi no debe interpretar “vacía” sin revisar archivos ocultos.
- Pi no debe aceptar una operación de overwrite sin verificar y autorizar explícitamente su alcance.
- Pi no debe actualizar Node.js o npm.
- Pi no debe utilizar otro package manager.
- Pi no debe instalar dependencias adicionales.
- Pi no debe alterar el template para satisfacer preferencias de estilo.
- Pi no debe crear archivos obsoletos solo para igualar una estructura orientativa.
- Pi no debe crear código placeholder.
- Pi no debe agregar configuración de features futuras.
- Pi no debe crear `.env`.
- Pi no debe crear clientes HTTP o realtime.
- Pi no debe crear rutas o páginas.
- Pi no debe modificar áreas protegidas.
- Pi no debe fabricar evidencias.
- Pi no debe ejecutar commit o push.
- Pi debe detener el servidor de desarrollo.
- Pi debe dejar trazabilidad del resultado de cada validación.
- Pi debe mantener pendiente cualquier tarea sin evidencia objetiva.
- Pi debe utilizar el mecanismo de validación OpenSpec detectado localmente y no asumir una variante legacy.

## Open Design Questions

### Blocking: Estado real de `frontend/`

¿La carpeta no existe, está completamente vacía o contiene archivos/proyecto? Debe resolverse durante la primera inspección y antes de scaffolding.

### Blocking: Compatibilidad del toolchain

¿Las versiones locales de Node.js y npm satisfacen los requisitos de la versión de Vite utilizada? Debe resolverse antes de ejecutar `create-vite`.

### Blocking para declarar validación OpenSpec completa: Convención activa

¿Qué estructura, esquema y comando de validación OpenSpec utiliza el workspace local? Debe verificarse antes de afirmar que el change fue validado mediante herramienta.

### Non-blocking: Puerto de desarrollo

¿Qué puerto local asignará Vite durante la verificación? Debe registrarse en tiempo de ejecución y no requiere configuración anticipada.

### Non-blocking: Existencia de `docs/capturas/`

¿La carpeta de capturas ya existe? La respuesta no afecta la creación del scaffold y no autoriza a Pi a crear evidencias.
