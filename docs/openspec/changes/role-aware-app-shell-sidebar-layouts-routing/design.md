# Design

## Components Touched

### Identidad y roles

Áreas probables, sujetas a inspección:

- decoder JWT;
- tipo de identidad mínima;
- normalizador de claims;
- catálogo de roles;
- helpers de permisos;
- selector de ruta inicial;
- helper de logout o sesión existente.

### Router y guards

- Router central.
- ProtectedRoute existente.
- Guard mínimo por roles.
- Login autenticado.
- Ruta de acceso denegado o fallback.
- Rutas administrativas y estudiantiles.

### Admin shell

- AdminLayout.
- Sidebar global.
- Configuración declarativa.
- Header administrativo.
- Drawer móvil.
- UserMenu.
- Avatar o fallback.

### Student shell

- Layout base del estudiante.
- Navegación horizontal.
- Header.
- UserMenu compartido.
- Avatar compartido.

### Documentación

- `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.

### Tests

- Identidad y JWT.
- Roles y ruta inicial.
- Guards.
- Sidebar.
- Layouts.
- Menú y logout.
- Responsive verificable sin assertions CSS frágiles.

## Boundaries Respected

- SessionStorage conserva únicamente el token.
- El decoder solo interpreta el payload; no autentica el token.
- La identidad se deriva y no se persiste.
- El catálogo de roles es la única fuente de nombres reconocidos.
- Los helpers de permisos contienen la semántica de roles.
- El router aplica guards; los layouts no deciden por sí solos si una ruta puede renderizarse.
- La configuración de navegación decide visibilidad de módulos.
- El Sidebar renderiza opciones, pero no contiene reglas dispersas.
- El menú compartido gestiona presentación y logout, no servicios de negocio.
- Los layouts no llaman endpoints de negocio.
- AuthTransport continúa siendo responsable del Bearer.
- El backend continúa siendo responsable de seguridad.
- Los shells no modifican contenido funcional de las páginas.
- Los assets permanecen locales.
- La documentación no contiene tokens ni datos personales reales.

## Contracts Changed

No external contract changes are confirmed from the provided input.

El change introduce o formaliza contratos internos.

### JWT Decoder Contract

Entrada:

- token string o ausencia.

Salida conceptual:

- payload tipado cuando es válido;
- resultado inválido o ausencia controlada.

No devuelve información criptográficamente verificada.

### Auth Identity Contract

Representación mínima adaptable:

- userId opcional;
- name opcional;
- email opcional;
- roles normalizados.

Las propiedades finales deben corresponder a claims reales.

### Role Catalog Contract

- Roles administrativos reconocidos.
- Rol regular reconocido.
- Descripciones legibles.
- Helpers:
  - administración de concursos;
  - administración de roles;
  - cualquier administración;
  - usuario regular.

### Initial Route Contract

Entrada:

- roles normalizados.

Salida:

- ruta administrativa;
- ruta estudiantil;
- acceso denegado o fallback.

La función no navega; solo selecciona el destino.

### Navigation Item Contract

Propiedades probables:

- identificador;
- label;
- ruta;
- icono;
- roles requeridos;
- keywords;
- política de active matching opcional.

La forma exacta debe adaptarse a tipos reales del router e iconos.

### User Menu Contract

Entrada:

- identidad;
- avatar o fallback;
- callback de logout.

Salida:

- trigger accesible;
- panel;
- información opcional;
- acción de logout.

### Role Guard Contract

Entrada:

- roles permitidos;
- contenido protegido.

Comportamiento:

- sin sesión → login mediante ProtectedRoute;
- con sesión y rol → contenido;
- con sesión sin rol → acceso denegado o ruta inicial compatible.

## Data Flow

### Bootstrap y recarga

- La aplicación inicia.
- La sesión existente continúa en `sessionStorage['token']`.
- Los helpers leen el token cuando necesitan identidad.
- El decoder procesa el payload.
- El normalizador obtiene roles.
- Router y layouts consumen identidad derivada.
- AuthTransport continúa leyendo el token para requests.

No se crea una segunda persistencia.

### Login

- Login recibe token real.
- Guarda el token.
- Decoder deriva payload.
- Normalizador obtiene roles.
- Selector de ruta aplica prioridad:
  - cualquier rol administrativo reconocido;
  - usuario regular;
  - fallback.
- Router navega con replace.

### Identity

- Token.
- Payload decodificado.
- Claims reales.
- Identity mapper.
- Roles normalizados.
- Nombre y correo opcionales.
- Fallback visual si no hay nombre.

### Admin Navigation

- Configuración completa de opciones reales.
- Filtro por roles.
- Filtro por texto.
- Detección de active state desde location.
- Render desktop o móvil.

### Student Navigation

- Configuración de rutas estudiantiles reales.
- Filtro por roles.
- Exclusión explícita de módulos no disponibles.
- Detección de active state.
- Render horizontal o patrón móvil existente.

### Guard Composition

Flujo recomendado:

- ProtectedRoute comprueba token.
- Role guard obtiene identidad.
- Si token inválido:
  - limpiar sesión o aplicar fallback aprobado.
- Si rol permitido:
  - renderizar layout y página.
- Si rol no permitido:
  - acceso denegado o ruta compatible.

### Logout

- Trigger abre UserMenu.
- Usuario selecciona logout.
- Se elimina la clave `token`.
- Se cierra el menú.
- Se navega a `/login` con replace.
- AuthTransport omite Bearer en requests posteriores.

### Avatar

- Buscar asset local existente.
- Si existe, utilizar una exportación central.
- Si no existe:
  - usar inicial o icono Lucide;
  - mantener el mismo componente.
- Sustitución futura cambia un único origen.

### Sidebar Mobile

- Trigger abre el estado del drawer.
- Overlay bloquea interacción externa según patrón existente.
- Cambio de ruta cierra el drawer.
- Escape cierra cuando está soportado.
- El foco vuelve al trigger.

## Required Tests Per Layer

### JWT Unit Tests

Agregar o actualizar pruebas para:

- token válido;
- payload válido;
- rol string;
- roles array;
- claim real de .NET;
- token inválido;
- claim ausente;
- deduplicación;
- normalización segura.

### Routing Unit Tests

- administrador de concursos;
- administrador de roles;
- usuario;
- administrador con Usuario;
- rol desconocido;
- token inválido;
- usuario autenticado en login.

### Guard Tests

- sin token;
- token con rol permitido;
- token sin rol;
- rutas administrativas;
- rutas de concursos;
- rutas estudiantiles;
- ausencia de loops.

### Sidebar Tests

- opciones filtradas por rol;
- Concursos y Crear concurso;
- ruta inexistente ausente;
- active state;
- búsqueda;
- sin resultados;
- nombre accesible del trigger móvil.

### Layout Tests

Admin:

- nombre derivado;
- descripción de rol;
- menú;
- logout.

Estudiante:

- navegación real;
- ausencia de Clasificación global;
- nombre;
- descripción;
- menú;
- logout.

### Accessibility Tests

- nombres accesibles;
- `aria-current`;
- navegación por teclado;
- cierre de menú;
- focus management verificable;
- drawer sin assertions frágiles de clases.

### Manual Tests

- login por cada rol real.
- múltiples roles.
- recarga.
- acceso directo a rutas.
- Sidebar desktop.
- drawer móvil.
- búsqueda.
- header admin.
- header estudiante.
- logout.
- teclado.
- contraste.
- fallback de avatar.

## Tradeoffs Accepted

- El frontend interpreta el JWT sin validar su firma.
- La identidad se recalcula desde el token en lugar de mantenerse en un store.
- La navegación oculta módulos, pero no reemplaza seguridad backend.
- El catálogo de roles será explícito y no inferido por prefijos.
- La ruta administrativa tiene prioridad sobre la estudiantil.
- Solo se muestran módulos con rutas reales.
- Se comparte UserMenu, pero Admin y Student conservan composiciones visuales diferentes.
- Se utiliza fallback de avatar hasta recibir el PNG definitivo.
- Se evita una dependencia JWT adicional.
- El change puede requerir una página mínima de acceso denegado si no existe.
- La documentación transversal se crea fuera de los artefactos OpenSpec por requerimiento explícito.

## Implementation Constraints

- Inspeccionar el workspace real antes de elegir nombres o rutas.
- Confirmar claims mediante un token falso equivalente, OpenAPI o código backend accesible.
- No copiar ni documentar un JWT real.
- No validar firma en frontend.
- No guardar roles o identidad en storage.
- No crear un store global.
- No duplicar normalización.
- No usar prefijos como única regla administrativa.
- No mostrar enlaces a páginas inexistentes.
- No inventar rutas estudiantiles.
- No crear un Sidebar por página.
- No crear un UserMenu distinto para cada layout.
- No duplicar logout.
- No importar un PNG inexistente.
- No usar avatar externo.
- No agregar librerías.
- No modificar contenido funcional.
- No modificar backend o database.
- No crear capturas ficticias.
- No utilizar OpenSpec CLI.
- No realizar commit o push.

## Open Design Questions

### Blocking: Claims reales del JWT

- ¿Cuáles son las claves exactas de ID, nombre, correo y roles?
- ¿El rol usa clave corta o URI de .NET?
- ¿El valor es string o array?
- Clasificación: Blocking para identidad y permisos.

### Blocking: Catálogo real de roles

- ¿Los nombres son exactamente `AdministradorConcursos`, `AdministradorRoles` y `Usuario`?
- ¿Existen otros roles administrativos?
- Clasificación: Blocking para navegación y guards.

### Blocking: Ruta estudiantil principal

- ¿Cuál es la ruta real de concursos o landing del estudiante?
- Clasificación: Blocking para redirección post-login.

### Blocking: Rutas estudiantiles existentes

- ¿Existe una ruta real de `Mis envíos`?
- Clasificación: Blocking para navegación estudiantil.

### Blocking: Ruta de usuarios y roles

- ¿Existe una página funcional y qué ruta utiliza?
- Clasificación: Blocking para decidir si aparece en Sidebar.

### Research required: Layouts actuales

- ¿AdminLayout ya contiene Sidebar, topbar y comportamiento móvil?
- ¿Existe layout estudiantil?
- Clasificación: Research required para evitar duplicaciones.

### Research required: Componentes de overlay

- ¿Existen Dropdown, Popover, drawer o Dialog accesibles?
- Clasificación: Research required para UserMenu y móvil.

### Research required: Acceso denegado

- ¿Existe Forbidden o Unauthorized?
- Clasificación: Research required para guard de roles.

### Non-blocking: Avatar

- ¿Existe un avatar genérico local?
- Clasificación: Non-blocking; usar fallback estable si no existe.

### Non-blocking: Pie del Sidebar

- ¿Existe una versión o información real de soporte?
- Clasificación: Non-blocking; omitir si no existe.
