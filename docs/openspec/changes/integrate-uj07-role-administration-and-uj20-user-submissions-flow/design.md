# Design

## Components Touched

### Fuentes documentales

- `docs/historias/UJ-07proceso-implementacion-admin-roles.md`
- `docs/historias/UJ-20-Como-usuario,-quiero-ver-todos-mis-envíos-con-filtros-por-concurso-y-resultado-obtenido.md`

### Baseline

- Git working tree.
- Scripts de lint, typecheck, test y build.
- Tests y warnings existentes.

### UJ-07

Áreas por localizar:

- página de gestión de roles;
- tabla o lista de usuarios;
- modal o formulario;
- componentes visuales de roles;
- servicio;
- hook o mutation;
- query keys;
- tipos;
- endpoint centralizado;
- sidebar administrativo;
- rutas;
- guards;
- mocks;
- tests.

### UJ-20

Áreas por localizar:

- página global;
- tabla;
- filtros;
- select de concursos;
- select de resultados;
- servicio;
- hook;
- query key;
- tipos;
- endpoint;
- paginación;
- navegación de usuario;
- mocks;
- tests.

### Regresión

- AdminLayout.
- UserLayout.
- Acceso de Usuario.
- concursos.
- Problems.
- envíos por concurso.
- envíos recientes.
- ContestContextHeader.
- OpenAPI generado.

## Boundaries Respected

- UJ-07 pertenece al flujo administrativo.
- UJ-20 pertenece al flujo del usuario.
- UJ-07 y UJ-20 no deben importarse entre sí.
- Auth y guards continúan siendo infraestructura transversal.
- HttpClient continúa como frontera HTTP.
- Los componentes comunes pueden reutilizarse sin mover lógica de negocio.
- La visibilidad del sidebar no reemplaza autorización.
- La tabla global no debe conocer contratos de resumen o concurso.
- Los mappers de veredictos solo se comparten cuando los valores contractuales coinciden.
- Backend permanece como autoridad para roles y envíos.
- La documentación original permanece como fuente histórica.

## Contracts Changed

No external contract changes are confirmed from the provided input.

Antes de implementar deben confirmarse:

### UJ-07

- endpoint de listado de usuarios;
- endpoint o endpoints de roles;
- operación de asignación;
- operación de revocación;
- request DTO;
- response DTO;
- estados HTTP;
- autorización;
- identificadores internos de roles;
- idempotencia;
- self-management;
- último administrador;
- roles inmutables.

### UJ-20

- endpoint global de envíos;
- parámetros de concurso;
- parámetros de resultado;
- parámetros de paginación;
- DTO de fila;
- DTO de respuesta;
- metadata;
- valores de veredicto;
- autenticación.

Hasta completar el baseline contractual, cada uno se marca:

`Por confirmar durante baseline contractual`.

## Estado Actual Comprobado

No fue posible inspeccionar `C:\dev\UPDS-JUDGE-FRONT` ni `C:\dev\UPDSjudge` desde esta sesión.

Por ello:

- no se confirma ninguna ruta de código;
- no se confirma ningún archivo de implementación;
- no se confirma el branch;
- no se confirma el estado de Git;
- no se confirma la cantidad de tests;
- no se confirman los resultados de lint, typecheck, tests o build;
- no se confirman endpoints ni DTOs.

El apply phase debe comenzar por discovery y no por modificación.

## Secciones Documentales Obligatorias

### UJ-07

Sección:

- `## Archivos involucrados`

Debe extraerse cada ruta y clasificarse como:

- creado;
- modificado;
- frontend;
- backend;
- test;
- mock;
- documental.

### UJ-20

Sección:

- `# Archivos principales`

Debe aplicarse la misma clasificación.

No debe considerarse completo el inventario hasta abrir cada archivo encontrado.

## Matriz de Trazabilidad

La tabla final debe completarse durante baseline.

| Historia | Archivo documentado                       |        Existe | Estado actual             | Integración actual        | Acción propuesta              | Justificación                                          |
| -------- | ----------------------------------------- | ------------: | ------------------------- | ------------------------- | ----------------------------- | ------------------------------------------------------ |
| UJ-07    | Por extraer de `## Archivos involucrados` | Por confirmar | Pendiente de verificación | Pendiente de verificación | Inspeccionar antes de decidir | La fuente documental no está disponible en esta sesión |
| UJ-20    | Por extraer de `# Archivos principales`   | Por confirmar | Pendiente de verificación | Pendiente de verificación | Inspeccionar antes de decidir | La fuente documental no está disponible en esta sesión |
| UJ-07    | Archivo de navegación administrativa real | Por confirmar | Pendiente de verificación | Pendiente de verificación | Conectar solo si falta        | Necesario para acceso principal                        |
| UJ-07    | Archivo de router real                    | Por confirmar | Pendiente de verificación | Pendiente de verificación | Registrar ruta y guard        | Necesario para acceso directo                          |
| UJ-07    | Servicio/mutation real                    | Por confirmar | Pendiente de verificación | Pendiente de verificación | Conectar al contrato backend  | Necesario para persistencia                            |
| UJ-20    | Archivo de navegación de usuario real     | Por confirmar | Pendiente de verificación | Pendiente de verificación | Conectar solo si falta        | Necesario para descubribilidad                         |
| UJ-20    | Archivo de router real                    | Por confirmar | Pendiente de verificación | Pendiente de verificación | Registrar ruta user           | Necesario para refresh directo                         |
| UJ-20    | Servicio/query real                       | Por confirmar | Pendiente de verificación | Pendiente de verificación | Conectar filtros y paginación | Necesario para contrato real                           |

No deben agregarse nombres concretos a esta matriz sin inspección.

## Impacto por Archivo

El apply phase debe producir una tabla con:

| Archivo | Historia | Acción esperada | Motivo | Riesgo | Pruebas |
| ------- | -------- | --------------- | ------ | ------ | ------- |

Debe incluir:

1. Todos los archivos extraídos del documento UJ-07.
2. Todos los archivos extraídos del documento UJ-20.
3. Solo archivos adicionales indispensables para routing, navegación, permisos, mocks, tests y documentación.

Criterios de acción:

- `Reutilizar sin cambios`.
- `Conectar mediante router`.
- `Conectar mediante navegación`.
- `Adaptar contrato`.
- `Corregir import`.
- `Actualizar test`.
- `Actualizar documentación`.
- `No encontrado`.
- `Descartar cambio por innecesario`.

## Data Flow

### UJ-07

- AdminSidebar o navegación real.
- Ruta administrativa.
- Guard de sesión.
- Guard de permiso.
- AdminLayout.
- Página existente de roles.
- Query de usuarios.
- Selección de usuario.
- Mutation de asignación o revocación.
- HttpClient.
- Backend.
- Actualización de caché.
- Feedback visual.

### UJ-20

- Navegación principal del usuario.
- Ruta directa.
- Guard de sesión.
- UserLayout.
- Página global existente.
- Estado de filtros.
- Query key parametrizada.
- Servicio.
- HttpClient.
- Endpoint global.
- Respuesta paginada.
- Tabla y metadata.

## Arquitectura UJ-07

### Routing

La ruta debe:

- ser hija o consumer real de AdminLayout;
- usar el guard existente;
- no depender de la visibilidad del sidebar;
- soportar refresh;
- no usar UserLayout.

### Permisos

Debe existir una única fuente para:

- permiso de ver pantalla;
- permiso de asignar;
- permiso de revocar.

La UI puede ocultar acciones no disponibles, pero backend debe validar.

### Roles

Debe definirse un catálogo o mapper entre:

- etiqueta visible;
- identificador contractual;
- representación en DTO;
- representación en JWT o helper.

No debe dispersarse lógica de strings en JSX.

### Caché

Después de una mutation:

1. Actualizar directamente el usuario afectado cuando el DTO sea estable; o
2. Invalidar la query exacta del listado.

No invalidar toda la aplicación.

## Arquitectura UJ-20

### Historial global

La página global debe mantener ownership separado de:

- recent submissions;
- contest submissions.

### Filtros

Modelo conceptual:

- contest identifier opcional;
- result opcional;
- page;
- page size.

La misma normalización debe utilizarse para:

- query key;
- request;
- metadata.

### Paginación

Debe ser server-side cuando el endpoint sea paginado.

Al cambiar concurso o resultado:

- establecer página inicial;
- conservar el otro filtro;
- ejecutar la query nueva.

### Veredictos

Orden de preferencia:

1. Reutilizar mapper compartido ya existente.
2. Adaptar mediante una capa UJ-20 si el contrato difiere.
3. No modificar el mapper de otras tablas para forzar compatibilidad.

## Tablas de Envíos

| Tabla               | Alcance             | Ruta                           | Endpoint                       | Filtros                           | Paginación |
| ------------------- | ------------------- | ------------------------------ | ------------------------------ | --------------------------------- | ---------- |
| Envíos recientes    | Resumen             | Por confirmar durante baseline | Por confirmar durante baseline | Los actuales                      | La actual  |
| Envíos del concurso | Concurso específico | Por confirmar durante baseline | Por confirmar durante baseline | Problema/resultado cuando aplique | La actual  |
| Todos mis envíos    | Global UJ-20        | Por confirmar durante baseline | Por confirmar durante baseline | Concurso y resultado              | Requerida  |

## Alternativas de Integración UJ-07

### Alternativa A: conectar la página existente

**Ventajas**

- Preserva trabajo del integrante.
- Menor superficie.
- Mantiene estilos y tests.

**Desventajas**

- Puede requerir adaptar imports, route params o permisos.

### Alternativa B: reemplazarla por una nueva página

**Ventajas**

- Contrato uniforme desde cero.

**Desventajas**

- Sobrescribe trabajo.
- Aumenta riesgo y review.
- Viola mínima intervención.

### Decisión recomendada

Conectar y corregir la implementación existente. Sustituir únicamente componentes cuya incompatibilidad esté demostrada.

## Alternativas de Integración UJ-20

### Alternativa A: conectar la página global existente

**Ventajas**

- Conserva filtros, tabla y estilos.
- Menor cambio.

**Desventajas**

- Puede requerir adaptar servicio o query key.

### Alternativa B: reutilizar RecentSubmissionsTable

**Ventajas**

- Menos componentes visibles.

**Desventajas**

- Puede tener límite fijo y contrato resumido.
- No garantiza filtros o paginación global.

### Alternativa C: reutilizar tabla de concurso

**Ventajas**

- Puede compartir semántica visual.

**Desventajas**

- Tiene contexto y endpoint distintos.
- Riesgo de acoplamiento.

### Decisión recomendada

Usar la implementación específica UJ-20. Compartir únicamente primitivas visuales o mapper cuando los contratos coincidan.

## Compatibilidad con Acceso de Usuario

Debe evaluarse durante baseline.

### Incluir UJ-20 en contexto administrativo

Solo es válido cuando:

- existe precedente documental;
- el administrador tiene capacidad de usuario;
- ya existe un patrón de contenido sin UserLayout;
- las rutas administrativas están definidas;
- no duplica la página.

### Mantener fuera de alcance

Es la decisión predeterminada cuando la evidencia anterior no existe.

## Required Tests Per Layer

### UJ-07 unit

- mapper de roles;
- permisos;
- visibilidad;
- estados de asignación;
- estados de revocación.

### UJ-07 integration

- ruta;
- AdminLayout;
- sidebar;
- guard;
- listado;
- mutations;
- errores;
- invalidación;
- refresh.

### UJ-20 unit

- serialización;
- normalización;
- query key;
- mapper de resultado;
- reinicio de página;
- metadata.

### UJ-20 integration

- ruta;
- UserLayout;
- navegación;
- carga;
- filtros;
- combinación;
- paginación;
- refresh;
- empty;
- error.

### Regression

- auth;
- guards;
- admin routes;
- Acceso de Usuario;
- concursos;
- Problems;
- submissions por concurso;
- recent submissions;
- ContestContextHeader;
- veredictos;
- responsive;
- OpenAPI cuando sea afectado.

## Tradeoffs Accepted

- Se mantiene el diseño de cada integrante aunque no sea idéntico a otras pantallas.
- Puede existir más de una tabla cuando sus contratos son distintos.
- No se comparte un mapper si los resultados contractuales difieren.
- No se expone UJ-20 a administración sin evidencia.
- Reglas backend ambiguas quedan como preguntas, no como lógica inventada.
- Se prefieren invalidaciones exactas aunque requieran entender las query keys actuales.

## Implementation Constraints

- Leer documentación antes del código.
- No ejecutar instalación de dependencias durante discovery.
- No inventar archivos.
- No renombrar sin necesidad.
- No reemplazar estilos.
- No usar mocks en producción.
- No actualizar roles solo localmente.
- No filtrar únicamente en memoria.
- No usar `slice` para paginación backend.
- No duplicar tablas o mappers.
- No anidar layouts.
- No modificar backend sin confirmación.
- No usar OpenSpec CLI.
- No hacer commit, push o archive.

## Open Design Questions

### Blocking: archivos documentados

- ¿Qué rutas aparecen exactamente en las dos secciones obligatorias?
- Debe resolverse antes de definir el impacto por archivo.

### Blocking: roles contractuales

- ¿Cuáles son los identificadores backend de Admin Concursos y Admin Roles?
- ¿Cómo aparecen en JWT y DTOs?

### Blocking: permisos UJ-07

- ¿Quién puede listar, asignar y revocar?
- ¿Se permite self-management?
- ¿Existe protección del último administrador?

### Blocking: endpoints UJ-07

- ¿Existen endpoints separados o una única operación?
- ¿Cuáles son payloads, responses y errores?

### Blocking: endpoint UJ-20

- ¿Cuál es la ruta global?
- ¿Qué filtros y metadata soporta?

### Blocking: paginación UJ-20

- ¿Cuáles son los nombres de parámetros y el page size actual?

### Research required: navegación UJ-20

- ¿El enlace pertenece al header, sidebar u otra navegación?

### Research required: tablas

- ¿Qué elementos visuales y mappers ya comparten las tres tablas?

### Research required: Acceso de Usuario

- ¿UJ-20 debe exponerse en contexto administrativo?
- Decisión predeterminada: no.

### Human coordination required

- ¿Existen ramas o cambios activos de los integrantes que puedan entrar en conflicto?
