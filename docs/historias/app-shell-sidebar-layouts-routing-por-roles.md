# App shell, Sidebar, layouts y routing por roles

> Cambio transversal asociado: `role-aware-app-shell-sidebar-layouts-routing`. No es una historia de usuario ni sustituye la autorización del backend.

## Alcance implementado

La sesión sigue usando exclusivamente `sessionStorage['token']`. `frontend/src/lib/auth/identity.ts` decodifica únicamente el payload JWT con APIs nativas, deriva identidad mínima y normaliza los claims `role`, `roles` y la URI de roles de .NET. No valida firmas ni persiste identidad o roles.

La política de rutas reside en `frontend/src/lib/auth/session.ts`: un rol administrativo confirmado gana prioridad y va a `/admin/dashboard`; un token sin roles reconocidos llega a `/forbidden`. No se inventó una ruta estudiantil porque el router actual no expone una. `ProtectedRoute` mantiene la comprobación de sesión y `RoleRoute` añade el control visual por rol.

## Matriz de visibilidad

| Módulo               | Ruta                  | Rol                                         | Layout      | Estado                                      |
| -------------------- | --------------------- | ------------------------------------------- | ----------- | ------------------------------------------- |
| Resumen              | `/admin/dashboard`    | AdministradorConcursos o AdministradorRoles | AdminLayout | Implementado                                |
| Concursos            | `/admin/contests`     | AdministradorConcursos                      | AdminLayout | Implementado                                |
| Crear concurso       | `/admin/contests/new` | AdministradorConcursos                      | AdminLayout | Implementado                                |
| Clasificación global | —                     | —                                           | —           | Excluido: no existe ruta                    |
| Área estudiantil     | —                     | Usuario                                     | —           | Pendiente: no existe ruta real en el router |

## Redirección y seguridad

| Roles normalizados                 | Destino                                       |
| ---------------------------------- | --------------------------------------------- |
| Cualquier administrador reconocido | `/admin/dashboard`                            |
| Solo `Usuario`                     | `/forbidden` hasta confirmar ruta estudiantil |
| Desconocido o sin rol              | `/forbidden`                                  |
| Token inválido                     | `/login`                                      |

El flujo es login → guardar token → decodificar payload → normalizar roles → seleccionar ruta → renderizar shell. El logout local elimina `token`, cierra el menú y navega a `/login` con `replace`. Ocultar módulos y los guards son controles de UX; el backend conserva la autoridad de autenticación y autorización.

## Shell y accesibilidad

`AdminLayout` usa `AdminSidebar` declarativo, búsqueda local, estado activo con `aria-current`, drawer móvil con overlay/Escape y el `UserMenu` compartido. El avatar usa el fallback de iniciales de `Avatar`; no se usan URLs externas. Las referencias visuales previstas (sidebar, header administrativo y layout estudiantil) no se enlazan porque no se proporcionaron archivos fuente.

## Pendientes manuales

- Incorporar el layout y navegación estudiantil cuando existan rutas reales.
- Proveer `avatar-placeholder.png` definitivo si se requiere una imagen en vez del fallback.

## Evidencia

### 1. Captura de la SideBar del administrador

![Captura de la SideBar](../capturas/sidebar-admin.png)

---

### 2. Captura del Layout de administración

![Captura del Layout de administración](../capturas/layout-admin.png)

## Fix posterior: concursos, branding y layout de Usuario

La administración separa los contratos `Concursos/mis-creados` (tabla paginada) y `Concursos/mis-resumen` (conteos globales). El catálogo de filtros conserva etiquetas visibles y valores contractuales plurales: Todos → `todos`, Activos → `activos`, Pendientes → `proximos` y Finalizados → `finalizados`. `ContestsSummaryCards` se restauró antes de los filtros y la tabla; Pendientes presenta `proximos`. El botón Actualizar coordina ambos requests sin reiniciar búsqueda, filtro ni página, mientras sus estados de carga y error permanecen independientes.

`AppLogo` centraliza `logo.svg` para la interfaz clara y deja `logo-dark.svg` como variante explícita futura, sin habilitar tema oscuro. El favicon continúa apuntando al asset real. `GlobeIllustration` es una ilustración presentacional reutilizable, con tamaño, clase y semántica decorativa o accesible.

La ruta existente `/student` ahora compone `UserLayout`: marca real, navegación exclusiva de rutas existentes, identidad, avatar/fallback, `UserMenu` y contenido. No se muestra Clasificación global. El logout compartido elimina `sessionStorage['token']`, cierra el menú y navega a `/login` con `replace`.

Archivos principales: `features/contests/{constants,service,hooks,ContestsAdminScreen}`, `components/branding/AppLogo.tsx`, `components/illustrations/GlobeIllustration.tsx` y `layouts/UserLayout/index.tsx`.

Validaciones ejecutadas: tests focalizados de contratos administrativos, pantalla, router y layouts. Las capturas de este fix siguen pendientes; no se agregan enlaces hacia archivos inexistentes.
