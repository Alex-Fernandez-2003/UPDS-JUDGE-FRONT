# Proposal

## Problem Statement

UPDS JUDGE ya dispone de autenticación mínima mediante `sessionStorage['token']`, transporte Bearer global y rutas administrativas funcionales, pero todavía no cuenta con un app shell transversal que adapte navegación, layouts y acceso visual según los roles contenidos en el JWT.

El cambio solicitado no corresponde directamente a una historia de usuario. Es una integración transversal necesaria para que el frontend:

- decodifique de forma central el payload del JWT;
- derive una identidad mínima;
- normalice uno o varios roles;
- seleccione el destino posterior al login;
- muestre el shell administrativo o estudiantil correspondiente;
- filtre módulos visibles;
- proteja rutas por sesión y rol;
- ofrezca un menú de usuario y cierre de sesión consistentes.

Actualmente no se ha proporcionado el contenido real del workspace, un JWT emitido por el backend ni el inventario verificable de rutas estudiantiles. Por tanto, los nombres definitivos de claims, archivos, componentes y rutas deben confirmarse durante explore antes de implementar. El briefing no debe afirmar que esa inspección ya fue completada.

Los roles `AdministradorConcursos`, `AdministradorRoles` y `Usuario` son referencias conocidas, pero no deben incorporarse como catálogo definitivo hasta comprobar el token o contrato real. Asimismo, la ruta estudiantil candidata `/contests` debe validarse contra el router existente. :contentReference[oaicite:0]{index=0}

## Goals

- Crear un único change denominado `role-aware-app-shell-sidebar-layouts-routing`.
- Mantener sus artefactos en `docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/`.
- Conservar `sessionStorage['token']` como única persistencia permanente de sesión frontend.
- Crear una utilidad central y tipada para decodificar el payload JWT mediante APIs nativas.
- Normalizar la representación real de roles a `string[]`.
- Exponer una identidad mínima derivada del token sin crear un perfil completo.
- Centralizar el catálogo de roles reconocidos y los helpers de permisos.
- Centralizar la política de prioridad de redirección:
  - rol administrativo reconocido;
  - usuario regular;
  - rol desconocido o token inválido.
- Redirigir después del login usando `replace`.
- Evitar que un usuario autenticado vuelva a visualizar `/login` cuando su token sea utilizable.
- Mantener `ProtectedRoute` como control de sesión.
- Incorporar una protección visual mínima por roles sin duplicar la lógica de sesión.
- Crear una configuración declarativa para la navegación administrativa.
- Filtrar módulos administrativos por rutas existentes y roles confirmados.
- Incorporar búsqueda local de módulos en el Sidebar.
- Mostrar correctamente la opción activa.
- Reutilizar el Sidebar global dentro de todas las páginas administrativas.
- Adaptar el Sidebar existente para escritorio y móvil.
- Actualizar el header administrativo con identidad derivada del JWT.
- Adaptar el layout estudiantil con navegación horizontal basada en rutas reales.
- Excluir `Clasificación global`.
- Crear o reutilizar un menú de usuario común.
- Implementar logout local eliminando `sessionStorage['token']`.
- Utilizar un avatar existente o fallback estable sin imports rotos.
- Mantener accesibilidad mediante teclado, foco visible y atributos semánticos.
- Agregar o actualizar pruebas de JWT, roles, redirects, guards, navegación, layouts y logout.
- Crear `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- Mantener pendientes el PNG definitivo y las evidencias manuales.

## Non-Goals

- No implementar una nueva historia de usuario.
- No reemplazar la sesión actual.
- No almacenar identidad o roles permanentemente en otro storage.
- No crear `AuthProvider` salvo que ya exista y sea imprescindible extenderlo.
- No crear un store global.
- No implementar refresh token.
- No implementar renovación automática.
- No verificar criptográficamente el JWT.
- No consultar un endpoint `/me`.
- No descargar permisos desde backend.
- No implementar ABAC.
- No convertir la identidad mínima en perfil.
- No implementar edición de perfil.
- No implementar cambio o recuperación de contraseña.
- No implementar avatar subido por el usuario.
- No implementar notificaciones reales.
- No agregar contador de notificaciones.
- No crear administración completa de usuarios y roles.
- No crear rutas de módulos inexistentes.
- No mostrar enlaces placeholder.
- No implementar banco de problemas, lenguajes, auditoría o configuración si sus páginas no existen.
- No incluir `Clasificación global`.
- No modificar el contenido funcional de páginas existentes.
- No modificar creación de concursos.
- No rediseñar formularios.
- No modificar backend.
- No modificar `database/`.
- No agregar una dependencia solo para decodificar JWT.
- No agregar otra biblioteca de iconos.
- No utilizar URLs externas para avatares.
- No insertar tokens reales en pruebas, logs o documentación.
- No crear imágenes o capturas ficticias.
- No utilizar OpenSpec CLI.
- No realizar commit ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/proposal.md`
- `docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/spec.md`
- `docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/design.md`
- `docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/tasks.md`

### Documentación transversal

- `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`

### Autenticación e identidad

Áreas probables:

- utilidades de sesión existentes;
- transporte de autenticación existente;
- nuevo decoder JWT o extensión de una utilidad actual;
- tipos de identidad;
- helpers de roles;
- flujo posterior al login;
- logout existente;
- mocks de login.

### Routing y guards

Áreas probables:

- router central;
- `ProtectedRoute`;
- guard o wrapper mínimo por roles;
- rutas administrativas;
- rutas estudiantiles;
- login autenticado;
- página de acceso denegado, si existe;
- página 404 existente.

### Layout administrativo

Áreas probables:

- `AdminLayout`;
- Sidebar administrativo global;
- header o topbar administrativo;
- configuración declarativa de módulos;
- drawer móvil;
- menú de usuario;
- avatar.

### Layout estudiantil

Áreas probables:

- layout de estudiante existente;
- header o navegación horizontal;
- rutas de concursos y envíos;
- menú de usuario compartido;
- avatar.

### Componentes compartidos

Reutilización prioritaria de componentes reales equivalentes a:

- Button.
- IconButton.
- Input.
- Dropdown o Popover.
- Avatar.
- Divider.
- Badge.
- Card.

### Assets

- Assets de marca existentes.
- Avatar genérico existente, si está disponible.
- Fallback visual interno mientras no exista `avatar-placeholder.png`.

### Tests y mocks

- Tests de auth.
- Tests de routing y guards.
- Tests de layouts.
- Tests del Sidebar.
- Tests del menú de usuario.
- Tokens falsos controlados para escenarios de roles.
- Handlers MSW existentes de login.

## Assumptions

- El workspace local contiene una versión más completa que el repositorio público visible.
- `sessionStorage['token']` y AuthTransport ya funcionan.
- Existe un `ProtectedRoute` de sesión que puede reutilizarse.
- Existe un `AdminLayout`.
- Existe o se puede identificar un layout base para estudiantes.
- Las rutas administrativas descritas continúan operativas.
- No se confirma la ruta principal real del estudiante.
- No se confirma la estructura de claims del JWT.
- No se confirma si el rol llega como string, array o claim URI de .NET.
- No se confirma si un administrador también recibe `Usuario`.
- No se confirma si existen rutas para `Usuarios y roles`, `Mis envíos` o acceso denegado.
- No se confirma si existen Dropdown, Popover, Avatar o drawer reutilizables.
- No se confirma si las imágenes de referencia están disponibles en el workspace.
- No se confirma si ya existe un asset de avatar genérico.
- No se confirma la infraestructura exacta de tests para responsive y eventos de teclado.

## Risks

### Risk 1: Interpretación incorrecta de los claims

- Probability: High hasta inspeccionar un token real.
- Impact: High, porque produciría redirects y permisos visuales incorrectos.
- Mitigation: Confirmar las claves y formas reales antes de implementar la normalización.

### Risk 2: Confundir autorización visual con seguridad

- Probability: Medium.
- Impact: High.
- Mitigation: Documentar que guards y navegación solo mejoran UX; el backend continúa validando cada operación.

### Risk 3: Usuario con múltiples roles redirigido al área incorrecta

- Probability: Medium.
- Impact: Medium.
- Mitigation: Centralizar una política de prioridad independiente del orden de los claims.

### Risk 4: Token inválido provoca errores durante el render

- Probability: Medium.
- Impact: High.
- Mitigation: Decoder tolerante a errores, resultado controlado y fallback de sesión inválida sin excepciones no capturadas.

### Risk 5: Loop entre login, guard y acceso denegado

- Probability: Medium.
- Impact: High.
- Mitigation: Definir destinos terminales distintos para ausencia de sesión y ausencia de rol.

### Risk 6: Mostrar enlaces hacia páginas inexistentes

- Probability: Medium.
- Impact: Medium.
- Mitigation: Construir la navegación únicamente con rutas confirmadas durante explore.

### Risk 7: Sidebar móvil inaccesible

- Probability: Medium.
- Impact: Medium.
- Mitigation: Reutilizar el patrón responsive actual y verificar foco, Escape, overlay y retorno al trigger.

### Risk 8: Duplicación de lógica entre layouts

- Probability: Medium.
- Impact: Medium.
- Mitigation: Compartir identidad, menú y logout; mantener separada solo la composición visual.

### Risk 9: Cambios globales rompen páginas existentes

- Probability: Medium.
- Impact: High.
- Mitigation: Extender layouts actuales, mantener los outlets y ejecutar regresión sobre todas las rutas conocidas.

### Risk 10: Tests basados excesivamente en clases CSS

- Probability: Medium.
- Impact: Low.
- Mitigation: Probar comportamiento, semántica, rutas, visibilidad y accesibilidad; reservar estilos para revisión visual.

### Risk 11: Avatar definitivo aún no disponible

- Probability: High.
- Impact: Low.
- Mitigation: Usar fallback centralizado y documentar el reemplazo como pendiente manual.

### Risk 12: Alcance excesivo del change transversal

- Probability: High.
- Impact: Medium para revisión.
- Mitigation: Dividir la ejecución en PRs encadenados por identidad, guards, componentes y shells, manteniendo un único change OpenSpec.

## Rollback Strategy

- Mantener las rutas y layouts actuales disponibles hasta verificar cada shell.
- Poder restaurar el redirect post-login anterior sin modificar la persistencia del token.
- Retirar el guard de roles conservando `ProtectedRoute` si aparecen loops o bloqueos.
- Restaurar la navegación administrativa anterior si el Sidebar declarativo rompe rutas existentes.
- Restaurar headers anteriores sin retirar la utilidad central de JWT cuando esta permanezca compatible.
- Retirar el menú compartido y conservar logout existente si aparecen regresiones de accesibilidad.
- Mantener el fallback de avatar si el PNG definitivo no está disponible.
- Revertir únicamente el documento nuevo en `docs/historias` si queda incoherente con la implementación.
- Verificar después del rollback:
  - login;
  - rutas administrativas;
  - rutas estudiantiles;
  - logout;
  - creación de concursos;
  - tests;
  - build.
- No se requiere rollback de base de datos ni backend.

## Success Criteria

- La estructura real del JWT queda documentada sin exponer tokens.
- Existe una única utilidad central de decodificación y normalización.
- La identidad mínima se deriva de `sessionStorage['token']`.
- Los roles no se persisten por separado.
- La prioridad administrativa no depende del orden de los roles.
- Login redirige al área correcta según los roles confirmados.
- Un rol desconocido no provoca loops.
- El Sidebar global muestra solo módulos reales y permitidos.
- La búsqueda filtra localmente los módulos visibles.
- La opción activa se identifica semántica y visualmente.
- El Sidebar funciona en escritorio y móvil.
- El header administrativo muestra identidad real o fallback seguro.
- El layout estudiantil muestra únicamente rutas estudiantiles existentes.
- `Clasificación global` no aparece.
- Admin y estudiante utilizan un patrón compartido de menú y logout.
- Logout elimina el token, cierra el menú y navega a `/login` con replace.
- Las rutas administrativas exigen roles administrativos confirmados.
- Las rutas de concursos exigen el rol real de administración de concursos.
- Las rutas estudiantiles exigen el rol real de usuario cuando corresponda.
- Sin token se navega a login.
- Con token sin rol se muestra acceso denegado o se aplica el fallback aprobado.
- La accesibilidad básica queda verificada.
- Las pruebas de identidad, roles, redirects, layouts, navegación y guards pasan.
- Existe `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- El documento registra claims reales, matrices, seguridad y evidencias pendientes.
- No se crean imágenes ficticias.
- No se modifican backend ni base de datos.
- No se realiza commit ni push.
