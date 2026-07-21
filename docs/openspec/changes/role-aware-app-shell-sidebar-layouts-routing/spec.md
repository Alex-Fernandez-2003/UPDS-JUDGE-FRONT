# Spec

## Requirements

### Change Scope Requirements

- El change MUST llamarse `role-aware-app-shell-sidebar-layouts-routing`.
- El change MUST residir en `docs/openspec/changes/role-aware-app-shell-sidebar-layouts-routing/`.
- El cambio MUST tratarse como integración transversal y MUST NOT presentarse como historia de usuario.
- Sidebar, layouts, identidad, roles, redirects, guards, logout y documentación MUST permanecer en un único change.
- El change MUST NOT modificar funcionalidades de negocio existentes.

### Session Source Requirements

- `sessionStorage['token']` MUST continuar siendo la fuente de sesión.
- El token MUST continuar almacenándose como string.
- Los roles MUST NOT persistirse permanentemente en otra clave.
- La identidad MUST NOT persistirse permanentemente en otra clave.
- El change MUST NOT reemplazar AuthTransport.
- Logout MUST eliminar `sessionStorage['token']`.
- El frontend MUST NOT registrar el token en consola, errores, documentación o pruebas.

### JWT Decoder Requirements

- El frontend MUST disponer de una utilidad central para decodificar el payload.
- La utilidad MUST validar que el token tenga tres segmentos.
- La utilidad MUST decodificar Base64URL.
- La utilidad MUST manejar padding cuando sea necesario.
- La utilidad MUST parsear JSON de forma controlada.
- La utilidad MUST devolver un resultado tipado.
- Un token inválido MUST producir un resultado seguro.
- La utilidad MUST NOT lanzar excepciones no controladas.
- La utilidad MUST NOT validar criptográficamente la firma.
- La utilidad MUST NOT requerir una dependencia nueva cuando las APIs nativas sean suficientes.
- La lógica de decodificación MUST NOT duplicarse en componentes, guards o login.

### Identity Requirements

- La aplicación MUST derivar una identidad mínima del payload.
- La identidad MUST permitir user ID cuando el claim exista.
- La identidad MUST permitir nombre cuando el claim exista.
- La identidad MUST permitir correo cuando el claim exista.
- La identidad MUST incluir roles normalizados.
- La identidad MUST adaptarse a las claves reales encontradas.
- La identidad MUST NOT considerarse un perfil completo.
- La identidad MUST NOT requerir una llamada `/me`.
- Un nombre ausente MUST producir un fallback visual seguro.

### Role Normalization Requirements

- La aplicación MUST disponer de una única función de normalización.
- La función MUST devolver `string[]`.
- La función MUST soportar únicamente las formas confirmadas en el JWT real.
- Si el claim real es string, MUST normalizarlo a un array de un elemento.
- Si el claim real es array, MUST conservar roles válidos sin duplicados.
- Si .NET utiliza una URI de claim, MUST utilizarse esa clave real.
- Un claim ausente MUST producir un array vacío.
- Un claim inválido MUST producir un resultado seguro.
- La lógica MUST NOT duplicarse en login, Sidebar, layouts, router o guards.

### Role Catalog Requirements

- Los nombres de roles MUST centralizarse.
- Solo MUST incluirse roles confirmados.
- Los valores conocidos `AdministradorConcursos`, `AdministradorRoles` y `Usuario` MUST tratarse como candidatos hasta confirmación.
- La aplicación MUST disponer de helpers equivalentes a:
  - administrador de concursos;
  - administrador de roles;
  - usuario regular;
  - cualquier administrador.
- Los componentes MUST NOT dispersar comparaciones de strings.
- La detección administrativa MUST NOT depender principalmente de prefijos cuando exista un catálogo explícito.

### Initial Route Requirements

- La selección de ruta inicial MUST estar centralizada.
- La prioridad administrativa MUST evaluarse antes que la de estudiante.
- La prioridad MUST ser independiente del orden de los roles.
- Un administrador reconocido MUST navegar a `/admin/dashboard`.
- Un usuario regular sin rol administrativo MUST navegar a la ruta estudiantil real confirmada.
- La ruta estudiantil MUST obtenerse del router existente.
- El frontend MUST NOT asumir `/contests` sin inspección.
- Un token inválido MUST tratarse como sesión no utilizable.
- Un token con roles desconocidos MUST NOT provocar loops.
- Para rol desconocido, la aplicación SHOULD reutilizar una página existente de acceso denegado.
- Si no existe un destino seguro, la aplicación MAY limpiar la sesión y navegar a `/login` mostrando un mensaje comprensible.

### Login Requirements

- Después de login exitoso, el token MUST guardarse primero.
- Después de guardar el token, el frontend MUST derivar identidad y roles.
- La navegación MUST usar `replace`.
- No MUST existir una pantalla intermedia innecesaria.
- Un administrador con rol `Usuario` MUST conservar prioridad administrativa.
- Un usuario autenticado que abra `/login` SHOULD redirigirse a su ruta inicial.
- La redirección MUST evitar ciclos.
- Login MUST NOT decodificar roles con lógica propia diferente del helper central.

### Session Guard Requirements

- `ProtectedRoute` MUST continuar controlando presencia de sesión.
- Sin token, una ruta protegida MUST navegar a `/login`.
- El change MUST NOT duplicar `ProtectedRoute`.
- `ProtectedRoute` MUST NOT validar permisos de negocio.
- El backend MUST continuar siendo autoridad de autenticación.

### Role Guard Requirements

- La aplicación MAY incorporar un guard mínimo por roles.
- El guard MUST consumir roles normalizados.
- El guard MUST aceptar uno o varios roles permitidos.
- Con al menos un rol permitido, MUST renderizar la ruta.
- Sin un rol permitido, MUST evitar renderizar la página y el layout incompatible.
- El guard MUST distinguir ausencia de token de ausencia de rol.
- El guard MUST NOT producir loops.
- El guard MUST NOT reemplazar la autorización backend.
- Las rutas administrativas generales MUST requerir algún rol administrativo confirmado.
- `/admin/contests` y `/admin/contests/new` MUST requerir el rol real de administración de concursos.
- Las rutas estudiantiles MUST requerir el rol real de usuario cuando el contrato lo confirme.
- Un administrador que también tenga el rol de usuario MAY acceder al área estudiantil.

### Navigation Configuration Requirements

- La navegación administrativa MUST definirse declarativamente.
- Cada opción MUST incluir label, path, icono y permisos cuando correspondan.
- Cada opción MAY incluir palabras clave.
- El Sidebar MUST filtrar primero por roles.
- El Sidebar MUST filtrar después por búsqueda.
- Las condiciones de permiso MUST NOT dispersarse dentro del JSX.
- La configuración MUST NOT incluir rutas inexistentes.
- La configuración MUST utilizar constantes de rutas existentes.

### Admin Sidebar Requirements

- El Sidebar MUST ser global para `AdminLayout`.
- El Sidebar MUST reflejarse en todas las páginas administrativas.
- El Sidebar MUST incluir un buscador con label accesible.
- El placeholder SHOULD ser `Buscar módulo...`.
- La búsqueda MUST ser local.
- La búsqueda MUST filtrar por etiqueta.
- La búsqueda MAY filtrar por keywords configuradas.
- La búsqueda MUST NOT realizar requests.
- Sin resultados, MUST mostrarse un mensaje accesible.
- `Resumen` MUST ser visible para administradores reconocidos.
- `Concursos` MUST ser visible para el rol real de administración de concursos.
- `Crear concurso` MUST ser visible para ese mismo rol.
- `Usuarios y roles` MUST mostrarse solo si existe una ruta real y el usuario tiene el rol confirmado.
- Módulos sin rutas reales MUST permanecer ocultos.
- La opción activa MUST derivarse de la ubicación actual.
- La opción activa MUST usar `aria-current="page"` cuando corresponda.
- `/admin/contests/new` MUST activar `Crear concurso`.
- La opción activa MUST diferenciarse del hover.
- Los iconos MUST utilizar Lucide.
- El pie MUST omitir versiones ficticias.

### Sidebar Responsive Requirements

- En escritorio, el Sidebar SHOULD permanecer visible junto al contenido.
- En móvil, el Sidebar MUST abrirse como drawer o patrón responsive existente.
- El drawer MUST disponer de botón con nombre accesible.
- El drawer MUST disponer de overlay cuando el patrón existente lo contemple.
- Escape SHOULD cerrar el drawer.
- Al cerrar, el foco SHOULD regresar al trigger.
- El change MUST NOT crear una segunda navegación administrativa independiente.

### Admin Header Requirements

- El header administrativo MUST formar parte de `AdminLayout`.
- El lado izquierdo MUST incluir la marca y `Panel Administrativo`.
- El lado derecho MUST incluir avatar, nombre, descripción del rol y trigger del menú.
- El nombre MUST derivarse del JWT.
- El nombre MUST NOT hardcodearse.
- La descripción MUST derivarse de roles confirmados.
- La descripción MUST ser legible y MUST NOT mostrar el array técnico completo.
- El header MUST adaptarse a pantallas pequeñas.

### Student Layout Requirements

- Las páginas estudiantiles MUST compartir un layout base.
- El layout MUST incluir marca, navegación horizontal y menú de usuario.
- La navegación MUST mostrar solo rutas reales.
- `Concursos` MUST mostrarse solo si existe una ruta estudiantil equivalente.
- `Mis envíos` MUST mostrarse solo si existe una ruta real.
- `Clasificación global` MUST NOT mostrarse.
- La opción activa MUST usar semántica accesible.
- El lado derecho MUST mostrar avatar, nombre, descripción de estudiante y menú.
- El nombre MUST derivarse del JWT.
- El layout MUST NOT duplicarse por página.

### User Menu Requirements

- Admin y estudiante SHOULD reutilizar el mismo componente funcional de menú.
- El trigger MUST ser accesible mediante teclado.
- El trigger MUST tener un nombre accesible.
- El menú MUST contener `Cerrar sesión`.
- El menú MAY mostrar nombre, correo y rol como información no interactiva.
- El menú MUST NOT mostrar opciones no implementadas.
- Logout MUST eliminar el token.
- Logout MUST cerrar el menú.
- Logout MUST navegar a `/login` con `replace`.
- Logout MUST NOT llamar un endpoint.
- Logout MUST NOT requerir recarga completa.
- El menú SHOULD cerrar al hacer click fuera.
- El menú SHOULD cerrar con Escape.
- El menú MUST cerrar después de seleccionar logout.

### Avatar Requirements

- El avatar MUST utilizar un asset local existente o un fallback interno.
- El frontend MUST NOT importar un archivo inexistente.
- El avatar MUST NOT usar una URL externa.
- El fallback MAY usar inicial, icono genérico o fondo neutro.
- El origen del avatar SHOULD centralizarse.
- La sustitución futura por `avatar-placeholder.png` SHOULD requerir un único cambio.
- La documentación MUST registrar el PNG definitivo como pendiente.
- El avatar decorativo MUST utilizar texto alternativo apropiado o tratamiento decorativo correcto.

### Accessibility Requirements

- La navegación MUST funcionar mediante teclado.
- Los triggers MUST mostrar focus-visible.
- Las opciones activas MUST usar `aria-current` cuando corresponda.
- La búsqueda MUST tener label accesible.
- Los botones de menú y Sidebar móvil MUST tener nombres accesibles.
- Los menús MUST ser operables mediante teclado.
- Los estados activos MUST NOT depender solo del color.
- Los iconos con texto MUST conservar el texto visible.
- Logout MUST estar claramente identificado.
- El contraste MUST utilizar tokens existentes.
- Los elementos interactivos MUST tener hover, active, focus-visible y cursor coherentes.

### Documentation Requirements

- El change MUST crear `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`.
- El documento MUST declarar que es un cambio transversal.
- El documento MUST incluir el change asociado.
- El documento MUST explicar el motivo y alcance.
- El documento MUST mencionar las tres referencias visuales sin enlaces rotos.
- El documento MUST registrar claims reales sin tokens.
- El documento MUST incluir una matriz de visibilidad.
- La matriz MUST incluir módulo, ruta, rol, layout y estado.
- El documento MUST incluir una matriz de redirección.
- El documento MUST describir el flujo login → JWT → roles → ruta → shell.
- El documento MUST usar rutas reales de archivos.
- El documento MUST indicar que el backend es la autoridad.
- El documento MUST registrar logout local.
- Las capturas MUST declararse pendientes mientras no existan.
- El documento MUST registrar el avatar definitivo como pendiente.

### Security Requirements

- El token MUST permanecer fuera del DOM y logs.
- Los mocks MUST utilizar tokens falsos.
- Las pruebas MUST NOT incluir credenciales reales.
- Ocultar un módulo MUST NOT documentarse como control de seguridad definitivo.
- El backend MUST seguir validando autorización.
- El decoder MUST NOT presentarse como verificador de autenticidad.
- Un token malformado MUST fallar de forma segura.

## Behavior Scenarios

### Scenario 1: JWT válido

Given un token con tres segmentos y payload JSON válido  
When la utilidad decodifica el payload  
Then MUST devolver un resultado tipado sin exponer el token

### Scenario 2: JWT inválido

Given un token malformado  
When se intenta derivar la identidad  
Then MUST devolverse un resultado seguro y la aplicación MUST NOT lanzar una excepción no controlada

### Scenario 3: Rol como string

Given que el claim real contiene un único rol como string  
When se normalizan los roles  
Then MUST devolverse un array con ese rol

### Scenario 4: Roles como array

Given que el claim real contiene varios roles  
When se normalizan  
Then MUST devolverse un array sin depender del orden original

### Scenario 5: Claim ausente

Given un payload sin claim de roles  
When se deriva la identidad  
Then roles MUST ser un array vacío

### Scenario 6: Administrador de concursos

Given un token con el rol confirmado de administración de concursos  
When el login finaliza  
Then MUST navegar a `/admin/dashboard`

### Scenario 7: Administrador de roles

Given un token con el rol confirmado de administración de roles  
When el login finaliza  
Then MUST navegar a `/admin/dashboard`

### Scenario 8: Usuario regular

Given un token con el rol regular confirmado y sin roles administrativos  
When el login finaliza  
Then MUST navegar a la ruta estudiantil real

### Scenario 9: Administrador y usuario

Given un token con un rol administrativo y el rol regular  
When se calcula la ruta inicial  
Then MUST prevalecer `/admin/dashboard`

### Scenario 10: Rol desconocido

Given un token válido sin roles reconocidos  
When se calcula el destino  
Then MUST evitarse un loop y MUST utilizarse acceso denegado o el fallback documentado

### Scenario 11: Login con sesión utilizable

Given un token válido almacenado  
When el usuario abre `/login`  
Then SHOULD navegar a su ruta inicial sin mostrar nuevamente el formulario

### Scenario 12: Sidebar por rol

Given un administrador de concursos  
When se renderiza el Sidebar  
Then MUST ver Resumen, Concursos y Crear concurso

### Scenario 13: Usuario no administrativo

Given un usuario regular  
When se renderiza su área  
Then MUST no mostrarse el Sidebar administrativo

### Scenario 14: Módulo sin ruta

Given una opción configurada sin página real  
When se construye la navegación de producción  
Then la opción MUST permanecer oculta

### Scenario 15: Búsqueda del Sidebar

Given varias opciones visibles  
When el usuario escribe una etiqueta o keyword  
Then MUST mostrarse únicamente las coincidencias

### Scenario 16: Búsqueda sin resultados

Given un término sin coincidencias  
When se filtra la navegación  
Then MUST mostrarse un mensaje pequeño y accesible

### Scenario 17: Opción activa de creación

Given la ruta `/admin/contests/new`  
When se renderiza el Sidebar  
Then Crear concurso MUST aparecer activa y exponer `aria-current`

### Scenario 18: Header administrativo

Given una identidad con nombre y roles administrativos  
When se renderiza AdminLayout  
Then MUST mostrar nombre y una descripción breve derivada de esos roles

### Scenario 19: Header estudiantil

Given una identidad de usuario regular  
When se renderiza el layout estudiantil  
Then MUST mostrar nombre, descripción de estudiante y navegación real

### Scenario 20: Clasificación global ausente

Given el layout estudiantil  
When se construye la navegación  
Then `Clasificación global` MUST no aparecer

### Scenario 21: Abrir menú

Given el header administrativo o estudiantil  
When el usuario activa el trigger del menú  
Then MUST mostrarse la acción Cerrar sesión

### Scenario 22: Logout

Given una sesión activa  
When el usuario selecciona Cerrar sesión  
Then MUST eliminarse el token, cerrarse el menú y navegarse a `/login` con replace

### Scenario 23: Request después de logout

Given que logout eliminó el token  
When HttpClient emite un request posterior  
Then AuthTransport MUST omitir Bearer

### Scenario 24: Ruta sin sesión

Given una ruta protegida y ausencia de token  
When el usuario intenta acceder  
Then MUST navegar a `/login`

### Scenario 25: Ruta admin sin rol

Given una sesión con rol regular  
When el usuario intenta abrir `/admin/contests`  
Then MUST no renderizarse la página ni el layout administrativo

### Scenario 26: Ruta de concursos permitida

Given una sesión con el rol confirmado de administración de concursos  
When abre `/admin/contests/new`  
Then MUST renderizarse la página dentro del shell administrativo

### Scenario 27: Recarga

Given una sesión almacenada y una ruta compatible con sus roles  
When el navegador recarga  
Then identidad, shell y navegación MUST reconstruirse desde el token

### Scenario 28: Avatar sin PNG definitivo

Given que no existe el asset definitivo  
When se renderiza el usuario  
Then MUST mostrarse un fallback estable sin imports rotos

### Scenario 29: Sidebar móvil

Given un viewport móvil  
When el usuario abre el Sidebar  
Then MUST mostrarse como drawer y mantener navegación operable

### Scenario 30: Cierre por Escape

Given un menú o drawer abierto  
When el usuario presiona Escape  
Then SHOULD cerrarse y conservarse un flujo de foco coherente

### Scenario 31: Documento transversal

Given la implementación preparada  
When se revisa `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md`  
Then MUST incluir claims, matrices, seguridad, pendientes y rutas reales

### Scenario 32: Evidencias ausentes

Given que las capturas todavía no existen  
When se actualiza la documentación  
Then MUST permanecer explícitamente marcadas como pendientes

## Edge Cases

- Token vacío.
- Token con dos o cuatro segmentos.
- Base64URL con padding ausente.
- Payload no JSON.
- Payload JSON sin identidad.
- Nombre vacío y correo disponible.
- Nombre y correo ausentes.
- Rol con espacios inesperados.
- Roles duplicados.
- Claim como tipo no soportado.
- Claim URI y claim corto presentes simultáneamente.
- Administrador con rol Usuario.
- Dos roles administrativos.
- Token válido con rol desconocido.
- Ruta estudiantil no confirmada.
- Ruta de usuarios y roles inexistente.
- Sidebar sin opciones después del filtrado por permisos.
- Búsqueda con mayúsculas, acentos o espacios.
- Rutas hijas que deben activar una opción padre.
- Drawer abierto durante cambio de ruta.
- Menú abierto durante logout.
- Click fuera no disponible en el componente existente.
- Tecla Escape gestionada por más de un overlay.
- Nombre extremadamente largo.
- Descripción de varios roles demasiado extensa.
- No existe asset de avatar.
- Existe un avatar con casing diferente.
- AdminLayout ya contiene Sidebar y header parcial.
- El layout estudiantil no existe.
- El router aplica layouts mediante rutas anidadas.
- La página de acceso denegado no existe.
- `/login` recibe un token inválido persistido.
- AuthTransport continúa usando un token que acaba de eliminarse.
- Un mock usa un token sin formato JWT.
- Tests DOM no pueden verificar comportamiento visual del drawer sin fragilidad.

## Acceptance Criteria

- El decoder MUST manejar tokens válidos e inválidos.
- La normalización MUST producir un array consistente.
- Los claims reales MUST quedar documentados.
- Los roles MUST no persistirse por separado.
- La prioridad administrativa MUST ser determinista.
- Login MUST redirigir según roles.
- Un usuario autenticado MUST no quedar atrapado en `/login`.
- El Sidebar MUST utilizar una configuración declarativa.
- El Sidebar MUST filtrar por roles y búsqueda.
- No MUST mostrarse un enlace hacia una ruta inexistente.
- La opción activa MUST identificarse semánticamente.
- El Sidebar móvil MUST ser operable.
- El header administrativo MUST mostrar identidad derivada.
- El header estudiantil MUST mostrar identidad derivada.
- `Clasificación global` MUST estar ausente.
- El menú compartido MUST ofrecer logout.
- Logout MUST eliminar el token y navegar con replace.
- Las rutas administrativas MUST aplicar permisos visuales.
- Las rutas de concursos MUST exigir el rol confirmado.
- Sin token MUST navegarse a login.
- Con token sin rol MUST aplicarse el fallback definido.
- La recarga MUST reconstruir identidad y navegación.
- El avatar MUST disponer de fallback.
- Los controles MUST ser accesibles mediante teclado.
- Los tests de JWT, roles, redirect, Sidebar, layouts, guards y logout MUST pasar.
- El documento transversal MUST existir en la ruta requerida.
- Las capturas MUST permanecer pendientes hasta existir.
- No MUST modificarse el backend o la base de datos.
- No MUST agregarse una dependencia de JWT.
- No MUST realizarse commit o push.

## Out of Scope

- Perfil, preferencias y edición de cuenta.
- Refresh, expiración remota y `/me`.
- Avatar subido por usuario.
- Notificaciones funcionales.
- ABAC y permisos descargados.
- Administración completa de roles.
- Nuevas páginas de negocio.
- Clasificación global.
- Cambios funcionales en concursos.
- Backend y base de datos.
