# Design

## Components Touched

### Administración de concursos

Áreas probables:

- ContestsAdminScreen.
- ContestsSummaryCards.
- ContestsFiltersBar.
- Hooks de listado.
- Hook de resumen.
- Servicio de concursos.
- Query keys.
- Tipos y constantes.
- Endpoints.
- Tests y MSW.

### Branding

- Componente de logo compartido existente o nuevo.
- `logo.svg`.
- `logo-dark.svg`.
- AuthLayout.
- AdminLayout.
- UserLayout.
- Sidebar y headers.
- Forbidden y NotFound cuando utilicen marca.
- `index.html`.

### Assets reutilizables

- `src/assets/components/`.
- Carpeta compartida de ilustraciones.
- Recurso o componente del globo.
- Imports y exports relacionados.

### User Layout

- Router.
- Ruta actual del rol Usuario.
- Layout de usuario o estudiante.
- Navegación horizontal.
- UserMenu.
- Avatar o fallback.
- Logout compartido.

### Documentación

- `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.

## Boundaries Respected

- El backend define filtros, DTOs y autorización.
- El endpoint de listado es propietario de tabla y paginación.
- El endpoint de resumen es propietario de conteos globales.
- Query keys representan operaciones distintas.
- ContestsAdminScreen coordina composición, no construye URLs.
- ContestsSummaryCards solo presenta datos de resumen.
- El servicio traduce parámetros contractuales y usa HttpClient.
- Los componentes visuales no conocen endpoints.
- AppLogo centraliza branding sin administrar temas.
- Assets gráficos permanecen separados de componentes React.
- GlobeIllustration permanece presentacional.
- UserLayout compone identidad y navegación, pero no cambia roles.
- UserMenu conserva la lógica común de logout.
- AuthTransport sigue siendo propietario del Bearer.
- La documentación se amplía sin reemplazar historia previa.

## Contracts Changed

No se modifica ningún contrato externo.

Se actualizan contratos internos para alinearse al backend vigente.

### Filter Contract

Catálogo obligatorio:

| Etiqueta visible | Valor contractual |
| ---------------- | ----------------- |
| Todos            | `todos`           |
| Activos          | `activos`         |
| Pendientes       | `proximos`        |
| Finalizados      | `finalizados`     |

La UI almacena o selecciona una opción tipada; el servicio recibe el valor contractual.

### List Endpoint Contract

- Método: GET.
- Ruta relativa: `Concursos/mis-creados`.
- Auth: Bearer mediante AuthTransport.
- Parámetros:
  - filtro;
  - modalidad;
  - busqueda;
  - pagina;
  - tamanoPagina.
- Respuesta:
  - total;
  - pagina;
  - tamanoPagina;
  - concursos.

### Summary Endpoint Contract

- Método: GET.
- Ruta relativa: `Concursos/mis-resumen`.
- Auth: Bearer mediante AuthTransport.
- Sin parámetros de listado.
- Respuesta:
  - activos;
  - proximos;
  - finalizados.

### AppLogo Contract

Entrada probable:

- variante default o dark;
- className;
- tamaño o props equivalentes;
- alt configurable cuando sea necesario.

Salida:

- `logo.svg` para interfaz clara;
- `logo-dark.svg` como variante futura.

No administra tema.

### GlobeIllustration Contract

Entrada probable:

- className;
- tamaño;
- decorative;
- accessibleLabel cuando no sea decorativo.

No contiene datos o servicios.

## Data Flow

### Filtro administrativo

- ContestsFiltersBar presenta etiquetas.
- La selección retorna una opción tipada.
- ContestsAdminScreen actualiza estado de listado.
- La query key cambia.
- El hook llama al servicio con el valor contractual.
- El servicio construye query params.
- HttpClient solicita `mis-creados`.

### Listado

- Query key:
  - namespace de concursos;
  - operación administrativa;
  - filtro;
  - modalidad;
  - búsqueda;
  - página;
  - tamaño.
- El servicio devuelve la respuesta paginada tipada.
- La pantalla entrega concursos a la tabla.
- Total y página alimentan paginación.
- SummaryCards no consume estos datos.

### Resumen

- Query key estable y separada.
- El hook solicita `mis-resumen` al montar.
- No recibe filtros.
- Configura refetch por foco y reconexión según la política aprobada.
- Devuelve datos y estados independientes.
- ContestsSummaryCards presenta:
  - activos;
  - próximos como Pendientes;
  - finalizados.

### Actualización manual

- El usuario presiona el botón existente.
- La función coordinadora comprueba si ya existe actualización.
- Refresca la query actual de listado.
- Refresca la query de resumen.
- Conserva estado de filtros.
- La UI comunica refreshing.
- Cada bloque mantiene sus datos o errores de forma independiente.

### Error independiente

Resumen falla:

- SummaryCards muestra error local.
- Tabla continúa usando listado válido.

Listado falla:

- Tabla muestra error local.
- SummaryCards conserva datos válidos.

No se transforman fallos en conteos cero.

### Branding

- Los layouts importan AppLogo.
- AppLogo selecciona el SVG según variante.
- La variante por defecto usa `logo.svg`.
- La variante dark queda disponible pero no se activa globalmente.
- Se eliminan imports provisionales únicamente después de verificar consumidores.

### Assets

- Inspeccionar archivo.
- Determinar si es asset o componente.
- Mantener gráficos puros en assets.
- Mover componentes React a components o illustrations.
- Actualizar imports.
- Verificar referencias.
- Eliminar duplicados solo con evidencia de no uso.

### User Layout

- El router resuelve la ruta real del rol Usuario.
- El guard existente permite acceso.
- La ruta usa UserLayout como composición.
- UserLayout muestra AppLogo.
- Configuración existente aporta navegación real.
- Outlet o children renderizan el contenido.
- UserMenu recibe identidad y logout compartido.
- Logout elimina token y navega a login.

### Documentación

- Abrir el documento existente.
- Añadir una sección `Fix posterior`.
- Registrar contratos y decisiones verificadas.
- Registrar rutas de evidencias como texto pendiente.
- Preservar el resto del documento.

## Required Tests Per Layer

### Filter Tests

- Todos → todos.
- Activos → activos.
- Pendientes → proximos.
- Finalizados → finalizados.
- Alias singulares ausentes.
- Modalidad, búsqueda y paginación conservadas.

### Service Tests

- Listado utiliza `mis-creados`.
- Resumen utiliza `mis-resumen`.
- Listado envía parámetros correctos.
- Resumen no envía filtros.
- Respuestas tipadas y separadas.
- Errores propagados mediante ApiError.

### Query Tests

- List key cambia con filtros.
- Summary key permanece estable.
- Cambio de filtro solo solicita listado.
- Resumen realiza fetch inicial.
- Resumen no refetchea por políticas deshabilitadas.
- Refresh manual solicita ambas operaciones.

### SummaryCards Tests

- Render antes de tabla.
- Activos correcto.
- Pendientes desde próximos.
- Finalizados correcto.
- Loading.
- Error.
- Independencia respecto al listado.

### Branding Tests

- Variante default utiliza logo.svg.
- Variante dark utiliza logo-dark.svg.
- Alt correcto.
- Props de tamaño o className.
- Branding provisional ausente.
- Imports válidos.
- Favicon verificado mediante integración o inspección.

### Globe Tests

- Un único componente.
- className.
- tamaño.
- decorativo.
- nombre accesible.
- ausencia de lógica de negocio.

### User Layout Tests

- Rol Usuario resuelve su layout.
- AppLogo visible.
- Contenido de ruta visible.
- Navegación solo de rutas reales.
- Clasificación global ausente.
- UserMenu visible.
- Logout elimina token.
- Logout navega con replace.

### Regression Tests

- AdminLayout.
- Sidebar.
- Guards.
- Creación de concursos.
- Routing.
- MSW.
- `/dev/ui`.
- Build.

## Tradeoffs Accepted

- La etiqueta Pendientes se conserva aunque el contrato utilice próximos.
- Se crean dos queries para respetar contratos y frecuencias distintas.
- El resumen puede permanecer stale hasta actualización manual o remount.
- El refresh manual coordina dos operaciones sin fusionar sus estados.
- AppLogo expone una variante dark sin implementar tema.
- Se reorganizan únicamente componentes React claros dentro de assets.
- El globo puede no tener consumidor inmediato.
- El User Layout envuelve contenido existente sin crear páginas nuevas.
- La documentación se amplía de manera incremental.
- El backend público verificado se toma como contrato, pero los nombres finales del frontend dependen del workspace local.

## Implementation Constraints

- Inspeccionar el workspace antes de elegir nombres finales.
- No modificar backend.
- No derivar resumen del listado.
- No enviar pendientes al backend.
- No acoplar SummaryCards a filtros.
- No crear una query combinada.
- No resetear filtros al refrescar.
- No mostrar ceros falsos en error.
- No duplicar AppLogo.
- No implementar tema.
- No eliminar assets con imports activos.
- No mover gráficos puros sin necesidad.
- No introducir lógica de negocio en el globo.
- No inventar rutas de usuario.
- No crear otro UserMenu.
- No duplicar logout.
- No modificar roles o guards salvo bloqueo directo.
- No crear otro documento en docs/historias.
- No crear capturas ficticias.
- No agregar dependencias.
- No usar OpenSpec CLI.
- No realizar commit o push.

## Open Design Questions

### Blocking: Estructura actual de queries

- ¿El listado y resumen están actualmente en un hook combinado?
- Clasificación: Blocking para aplicar la separación mínima.

### Blocking: Contrato actual de ContestsSummaryCards

- ¿Recibe props o ejecuta su propia consulta?
- Clasificación: Blocking para decidir su integración.

### Blocking: Ruta actual del rol Usuario

- ¿Qué ruta recibe al usuario normal y qué página renderiza?
- Clasificación: Blocking para exponer el User Layout sin inventar routing.

### Research required: Botón Actualizar

- ¿Utiliza refetch, invalidación o una función local?
- Clasificación: Research required para conservar sus estados.

### Research required: Componentes de branding

- ¿Existe ya BrandMark, AppLogo u otro wrapper?
- Clasificación: Research required para evitar duplicación.

### Research required: `src/assets/components/`

- ¿Qué archivos contiene y cuáles son sus consumidores?
- Clasificación: Research required antes de mover o eliminar.

### Research required: UserMenu

- ¿El componente ya es compartido y acepta identidad/logout?
- Clasificación: Research required antes de extender UserLayout.

### Non-blocking: Nombre del componente de globo

- ¿Existe una convención de illustrations?
- Clasificación: Non-blocking; adaptar el nombre a la arquitectura real.

### Non-blocking: Total general

- ¿ContestsSummaryCards ya incluye una tarjeta total?
- Clasificación: Non-blocking; conservarla solo si ya existe.
