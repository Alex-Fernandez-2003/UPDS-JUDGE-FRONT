# Design

## Components Touched

### Documentación y baseline

- Retrospectiva Sprint 2.
- Retrospectiva Sprint 1.
- Historias UJ-11 a UJ-15 relacionadas.
- `package.json`.
- `package-lock.json`.
- Scripts npm.
- Script de generación OpenAPI.

### Navegación administrativa

- Configuración real del sidebar.
- AdminLayout.
- UserLayout como referencia de regresión.
- Router y route builders.
- Guards y helpers de permisos.

### Contenido funcional

- Contenido de listado de concursos.
- Contenido de Problems.
- Contenido de Submissions.
- Wrappers user y admin.
- Policy de acceso.
- Modal y mutación de inscripción.

### Header

- Componente compartido dentro del dominio contests.
- Mapper de estado.
- Formatter de duración.
- Descriptores de navegación.
- SubmissionsPage.
- ContestProblemsPage.
- ProblemsTable únicamente para regresión.

## Boundaries Respected

- Layouts controlan shell, no lógica funcional.
- Wrappers resuelven route params, layout context y navegación.
- Contenido funcional no importa AdminLayout ni UserLayout.
- El Header no importa layouts.
- El Header no determina permisos.
- Los route builders no viven dentro del Header.
- Contests puede exponer contratos visuales compartidos a problems y submissions mediante una API acotada.
- Problems conserva métricas y PDF.
- Submissions conserva formulario, tabla y paginación.
- El sidebar controla visibilidad, pero el router controla acceso.
- El backend sigue siendo la autoridad de inscripción.
- Dependencias npm se modifican de manera independiente de reglas funcionales.

## Contracts Changed

### Contratos externos

No se confirma ningún cambio de API externo desde la información disponible.

El baseline debe confirmar:

- endpoint real de inscripción;
- request DTO;
- response DTO;
- estados HTTP;
- errores contractuales;
- soporte real para concursos finalizados.

### Contrato interno de contenido reutilizable

Entrada conceptual:

- route context;
- parámetros del concurso;
- descriptores de navegación;
- callbacks o builders contextuales cuando sean necesarios.

Salida:

- contenido funcional sin layout.

### Contrato interno del Header

Datos:

- name;
- code;
- status;
- start date opcional;
- end date opcional;
- duration opcional;
- navigation items;
- active item.

Cada campo debe adaptarse al DTO real y no debe introducir nombres contractuales ficticios.

Descriptor conceptual de navegación:

- id estable;
- label;
- destination;
- icon opcional;
- disabled opcional.

No debe incluir Ranking hasta que exista una ruta funcional.

### Contrato interno de policy

Entrada:

- estado temporal real;
- modalidad real;
- inscripción real;
- contexto de acceso.

Salida:

- acción;
- acceso permitido;
- motivo;
- navegación posterior esperada.

El caso privado finalizado no inscrito debe producir una acción equivalente a `JOIN_PRIVATE_FINISHED`.

### Contrato de seguridad

Resultado de cada advisory:

- package;
- dependency path;
- affected resolved version;
- chosen target;
- compatibility evidence;
- final status.

## Data Flow

### Acceso administrativo

- AdminLayout renderiza Sidebar.
- Sidebar muestra Acceso de Usuario.
- Concursos abre un wrapper administrativo.
- El wrapper configura el route context administrativo.
- El wrapper renderiza el contenido funcional de concursos.
- El contenido utiliza builders administrativos.
- Problemas y Mis envíos cargan bajo el mismo AdminLayout.
- Refresh reconstruye contexto desde la URL.

### Acceso de usuario

- UserLayout renderiza el wrapper de usuario existente.
- El wrapper configura builders de usuario.
- El mismo contenido funcional se reutiliza.
- No se introduce dependencia hacia AdminLayout.

### Privado finalizado

- La policy detecta privado, finalizado y no inscrito.
- La UI abre el modal privado.
- La contraseña permanece en estado local.
- La mutation usa el servicio existente.
- Backend valida e inscribe.
- El hook actualiza o invalida lista y detalle.
- La UI navega usando el route context actual.

### Header

- Wrapper o query de página obtiene datos del concurso.
- Los datos se normalizan una vez.
- El formatter calcula duración cuando sea posible.
- El wrapper crea los navigation descriptors.
- Header renderiza identidad y navegación.
- Problems conserva métricas debajo.
- Submissions conserva su contenido debajo.

### Seguridad de dependencias

- Capturar baseline.
- Inspeccionar árbol.
- Elegir estrategia compatible.
- Actualizar paquete o padre.
- Actualizar lockfile.
- Ejecutar audit.
- Validar router.
- Ejecutar OpenAPI.
- Ejecutar suite completa.
- Clasificar resultado.

## Required Tests Per Layer

### Unit tests

- Visibilidad del grupo del sidebar.
- Policy de acceso.
- Mapper de estado.
- Formatter de duración.
- Header con datos reales.
- Descriptor activo.
- Invalidación de queries.
- Seguridad de contraseña.

### Integration tests

- Rutas administrativas.
- AdminLayout persistente.
- Contenido de concursos reutilizado.
- Navegación Problems/Submissions.
- Refresh directo.
- Inscripción privada finalizada.
- Header en ambas páginas.
- Métricas y PDF preservados.

### Router regression

- Rutas de usuario.
- Rutas admin.
- Guards.
- Link.
- NavLink.
- useParams.
- builders.
- not found.
- refresh directo.

### OpenAPI regression

Si existe infraestructura:

- script termina correctamente;
- archivo esperado se genera;
- imports continúan resolviendo;
- typecheck pasa;
- diff generado es explicado.

### Dependency validation

- npm install.
- npm audit.
- npm audit con nivel high.
- npm ls de ambas cadenas.
- instalación limpia reproducible.
- ausencia de lockfiles alternativos.

### Manual validation

- Desktop, tablet y móvil.
- Usuario y administrador.
- Concurso público y privado.
- Privado finalizado con contraseña correcta e incorrecta.
- Sidebar persistente.
- Menús y tablas sin overflow.
- Network sin requests duplicados.
- Contraseña ausente de logs y storage.

## Tradeoffs Accepted

- El contenido se separará de los wrappers aunque aumente el número de componentes pequeños.
- Las rutas administrativas pueden requerir wrappers mínimos distintos.
- El Header recibirá descriptores en vez de conocer roles.
- La duración puede mostrar `—` cuando el contrato no permita calcularla.
- Se prioriza actualización compatible de dependencias sobre migraciones mayores.
- Un override será una última opción, no una solución predeterminada.
- La retrospectiva se preservará como fuente histórica y no se reescribirá.
- Ranking se prepara únicamente como capacidad futura de la API.

## Alternativas y Decisiones

### Separación de contenido y layout

**Alternativa A: reutilizar páginas completas de usuario**

- Ventajas:
  - Menor refactor inicial.
- Desventajas:
  - Puede montar UserLayout o acoplar rutas de usuario.
  - Riesgo alto de doble layout.
- Decisión:
  - Rechazada.

**Alternativa B: duplicar páginas administrativas**

- Ventajas:
  - Integración rápida.
- Desventajas:
  - Duplica lógica, tests y mantenimiento.
- Decisión:
  - Rechazada.

**Alternativa C: extraer contenido funcional y crear wrappers**

- Ventajas:
  - Reutilización real.
  - Layout independiente.
  - Soporta futuras rutas.
- Desventajas:
  - Requiere identificar boundaries y props.
- Decisión recomendada:
  - Adoptar.

### Navegación del Header

**Alternativa A: hardcodear rutas de usuario**

- Ventajas:
  - API simple.
- Desventajas:
  - Expulsa al administrador de AdminLayout.
- Decisión:
  - Rechazada.

**Alternativa B: condicionales de rol dentro del Header**

- Ventajas:
  - Centraliza parcialmente.
- Desventajas:
  - Acopla presentación, auth y routing.
- Decisión:
  - Rechazada.

**Alternativa C: inyectar descriptores o builders**

- Ventajas:
  - Independiente de layout y rol.
  - Testeable.
  - Extensible.
- Desventajas:
  - Requiere configuración en wrappers.
- Decisión recomendada:
  - Adoptar.

### Obtención de datos del Header

**Alternativa A: query propia en el Header**

- Ventajas:
  - Componente autónomo.
- Desventajas:
  - Riesgo de requests duplicados.
- Decisión:
  - No recomendada.

**Alternativa B: recibir datos ya cargados**

- Ventajas:
  - Evita duplicados.
  - Componente presentacional.
- Desventajas:
  - Requiere que wrappers conozcan el contrato.
- Decisión recomendada:
  - Adoptar.

### Remediación npm

**Alternativa A: audit fix force**

- Ventajas:
  - Automatizada.
- Desventajas:
  - Cambios incompatibles y no controlados.
- Decisión:
  - Rechazada.

**Alternativa B: update compatible o del paquete padre**

- Ventajas:
  - Menor riesgo.
  - Mantiene APIs.
- Desventajas:
  - Puede no resolver todos los advisories.
- Decisión recomendada:
  - Primera opción.

**Alternativa C: migración mayor controlada**

- Ventajas:
  - Puede alcanzar una versión segura soportada.
- Desventajas:
  - Mayor superficie de regresión.
- Decisión:
  - Usar solo cuando B no sea viable.

**Alternativa D: overrides**

- Ventajas:
  - Cambio acotado.
- Desventajas:
  - Puede forzar incompatibilidades transitivas.
- Decisión:
  - Último recurso con evidencia.

## Implementation Constraints

- Inspeccionar rutas locales antes de definir nombres.
- No inventar versiones seguras.
- No afirmar que audit pasa sin ejecutarlo.
- No crear páginas duplicadas.
- No anidar layouts.
- No hardcodear rutas de estudiante en contenido compartido.
- No crear requests en el Header.
- No mover PDF o métricas.
- No mostrar Ranking.
- No persistir contraseñas.
- No invalidar toda la caché.
- No modificar backend.
- No crear lockfiles alternativos.
- No usar OpenSpec CLI.
- No hacer commit ni push.

## Open Design Questions

### Blocking: retrospectiva Sprint 2

- ¿Cuál es el nombre real del archivo?
- ¿Qué acciones están registradas como aprobadas?
- Debe resolverse antes de cerrar proposal y documentación.

### Blocking: roles y permisos

- ¿Qué rol o helper autoriza Acceso de Usuario?
- ¿El administrador posee también `Usuario` o se usa una policy administrativa?
- Debe resolverse antes de crear guards y visibilidad.

### Blocking: rutas actuales

- ¿Cuáles son los builders y namespaces reales?
- Debe resolverse antes de definir rutas administrativas.

### Blocking: contrato backend finalizado

- ¿El endpoint actual permite inscripción después de finalizar?
- ¿Qué response y status devuelve?
- Debe resolverse antes de implementar la nueva policy.

### Blocking: datos del Header

- ¿Qué endpoint y DTO entregan nombre, estado y fechas?
- ¿La duración viene calculada?
- Debe resolverse antes de fijar props y formatter.

### Blocking: dependencias npm

- ¿Qué versiones están declaradas y resueltas?
- ¿El reporte se reproduce con el lockfile actual?
- Debe resolverse antes de elegir versiones objetivo.

### Blocking: OpenAPI

- ¿Cuál es el script real y qué archivos genera?
- Debe resolverse antes de actualizar openapi-typescript.

### Research required: requests duplicados

- ¿Problems y Submissions usan la misma query key?
- Debe verificarse en Network y código.

### Research required: API pública de contests

- ¿Existe `shared/`, un barrel o reglas de dependencias?
- Debe verificarse antes de ubicar el Header.

### Human coordination required: riesgo aceptado

- Si un advisory no tiene remediación compatible, cualquier aceptación temporal requiere aprobación explícita y fecha de seguimiento.
