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
