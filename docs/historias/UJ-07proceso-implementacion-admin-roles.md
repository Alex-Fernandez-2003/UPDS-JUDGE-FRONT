# UJ-07 - Proceso de implementación: Administrador de roles

## Objetivo

Implementar y conectar el flujo completo para la administración de roles, permitiendo que un usuario con el rol de administrador acceda a la vista desde la navegación/sidebar del panel administrativo, gestione la asignación y remoción de roles mediante correo electrónico y visualice la lista paginada de usuarios con búsqueda en tiempo real.

---

## Pasos realizados

1. **Definir la ruta de acceso y enrutamiento global**
   - Se registró la ruta `/admin/roles` bajo la constante `adminRoleList` en `src/routes/constants.ts`.
   - Se configuró la ruta en `src/routes/router.tsx` envolviendo la página `AdminRolesPage` en `<ProtectedRoute>`, `<RoleRoute>` (restringido al rol `rolesAdmin`) y dentro de `<AdminLayout>`.

2. **Integrar el acceso desde la navegación / sidebar**
   - Se habilitó el enlace hacia la pantalla de administración de roles dentro de la estructura de navegación del panel administrativo.
   - La opción apunta a la constante `routes.adminRoleList` y está configurada para mostrarse únicamente a los usuarios con los permisos correspondientes.

3. **Refactorizar y corregir los componentes UI del módulo**
   - **`AdminRoleBadge.tsx`**: Se centralizaron los tonos de los badges usando la configuración de `format.ts`, manteniendo el botón interactivo con el icono `X` para desasignar el rol.
   - **`AdminRoleAssignCard.tsx`**: Se transformó en un componente controlado, sincronizando sus props (`correo`, `selectedRoleId`, `onCorreoChange`, `onRoleChange`, `onAssign`) directamente con el estado de la vista padre.
   - **`AdminRolesFiltersBar.tsx`**: Se mantuvo la barra con soporte para filtro por término de búsqueda y por selector de rol, incluyendo la acción de limpiar filtros.
   - **`AdminRolesTable.tsx`**: Se corrigió el error de *scope* al mover la constante `columns` dentro del componente, se ajustó el handler `onRemoveRole` para enviar el `idRol` (numérico) en lugar del nombre del rol y se actualizaron los tipos a `UserRoleItem` y `RoleItem`.

4. **Implementar la vista principal (`AdminRolesPage.tsx`)**
   - Se gestionaron los estados para la asignación de roles y la visualización de mensajes de feedback al usuario (`Alert`).
   - Se integró la búsqueda optimizada mediante *debounce* junto a la paginación.
   - Se configuró la invalidación de caché con React Query para refrescar la lista de usuarios automáticamente tras asignar o remover un rol.

5. **Configurar la capa de servicios, hooks y comunicación con la API**
   - **`endpoints.ts`**: Se agregaron las rutas relativas de la API (`Roles`, `Roles/usuarios`, `Roles/agregar`, `Roles/quitar`).
   - **`service.ts` y `mapper.ts`**: Se conectaron las peticiones HTTP (`GET` y `POST`) e implementaron las funciones de mapeo de datos.
   - **`hooks.ts`**: Se crearon las queries (`useRoles`, `useUsersRoles`), las mutaciones (`useAssignRole`, `useRemoveRole`) y el custom hook `useDebouncedValue` para diferir las peticiones durante la escritura del usuario.

---

## Archivos involucrados

- `src/lib/api/endpoints.ts`
- `src/routes/constants.ts`
- `src/routes/router.tsx`
- `src/features/roles/constants.ts`
- `src/features/roles/format.ts`
- `src/features/roles/types.ts`
- `src/features/roles/mapper.ts`
- `src/features/roles/service.ts`
- `src/features/roles/hooks.ts`
- `src/features/roles/components/AdminRoleBadge.tsx`
- `src/features/roles/components/AdminRoleAssignCard.tsx`
- `src/features/roles/components/AdminRolesFiltersBar.tsx`
- `src/features/roles/components/AdminRolesTable.tsx`
- `src/features/roles/pages/AdminRolesPage.tsx`

---

## Resultado

El flujo quedó completamente integrado y funcional:

- El usuario con rol de administrador puede ingresar directamente a la pantalla a través del sidebar administrativo o ingresando a la ruta protegida.
- Es posible listar, buscar (con *debounce*) y filtrar a los usuarios paginados de forma fluida.
- La asignación y eliminación de roles funcionan de manera reactiva, ofreciendo feedback inmediato y actualizando la tabla sin necesidad de recargar manualmente la página..

