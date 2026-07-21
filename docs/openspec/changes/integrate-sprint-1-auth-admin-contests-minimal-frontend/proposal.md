# Proposal

## Problem Statement

El alcance funcional de Sprint 1 existe parcialmente en el frontend de UPDS JUDGE, pero las implementaciones de registro, login, dashboard, administración de concursos y creación de concursos todavía no forman un flujo integrado.

La auditoría disponible identifica los siguientes problemas confirmados:

- El login persiste el JWT como valor simple en `sessionStorage['token']`.
- El cliente HTTP ya acepta un `AuthTransport`, pero continúa configurado con `neutralAuthTransport`.
- El token persistido no se conecta con `AuthTransport`, por lo que los requests protegidos no reciben `Authorization: Bearer <token>`.
- La creación de concursos funciona funcional y visualmente, pero su request protegido no utiliza la sesión real.
- `/admin/contests` continúa renderizando un placeholder en lugar de la implementación administrativa existente.
- `AdminContestsPage.tsx` está fuera de la feature de concursos.
- La implementación administrativa contiene imports o contratos incompletos relacionados con operaciones de listado.
- `typecheck` y `build` están bloqueados por un error `TS5101` en `tsconfig.app.json`.
- La suite existente contiene 65 tests: 60 pasan y 5 fallan según la auditoría inicial.

Este change integrará esas piezas con la menor cantidad posible de modificaciones. No convertirá la autenticación actual en una arquitectura definitiva y no ampliará el alcance funcional del Sprint 1.

El flujo objetivo será:

- Registro público.
- Login.
- Persistencia del token en `sessionStorage['token']`.
- Lectura dinámica del token mediante `AuthTransport`.
- Configuración única del cliente HTTP.
- Redirección al dashboard administrativo.
- Protección mínima de rutas administrativas.
- Navegación a creación de concurso.
- Envío multipart protegido mediante Bearer.

## Goals

- Crear un único change llamado `integrate-sprint-1-auth-admin-contests-minimal-frontend`.
- Mantener sus artefactos en `docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/`.
- Conservar el token como string simple en `sessionStorage['token']`.
- Crear o completar un `AuthTransport` que consulte dinámicamente el token en cada request.
- Configurar ese transporte una única vez durante el arranque de la aplicación.
- Evitar copias adicionales del token en memoria o estado global.
- Mantener funcional y pública la ruta `/register`.
- Mantener funcional la ruta `/login`.
- Guardar el token real devuelto por login.
- Redirigir el login exitoso a `/admin/dashboard`.
- Proteger `/admin/dashboard`, `/admin/contests` y `/admin/contests/new` mediante el `ProtectedRoute` existente.
- Redirigir a `/login` cuando no existe token.
- Mantener `/dashboard` únicamente como redirect de compatibilidad hacia `/admin/dashboard`.
- Renderizar el dashboard administrativo existente en `/admin/dashboard`.
- Garantizar que la acción `Crear concurso` navegue mediante React Router a `/admin/contests/new`.
- Reemplazar el placeholder de `/admin/contests` por la implementación administrativa existente.
- Mover `AdminContestsPage.tsx` a la feature de concursos.
- Reorganizar únicamente los archivos de concursos necesarios para eliminar imports inconsistentes y casing duplicado.
- Mantener intacta la funcionalidad validada de creación de concursos.
- Garantizar que `POST /api/Concursos/crear` reciba automáticamente el Bearer.
- Corregir el error `TS5101` mediante el cambio mínimo compatible con la versión instalada de TypeScript.
- Reparar los tests existentes que fallan sin agregar, eliminar, omitir o debilitar tests.
- Alcanzar cero tests fallidos conservando la cantidad inicial real encontrada.
- Conseguir que lint, typecheck, tests y build finalicen correctamente.
- Limitar el formato a los archivos modificados o movidos.
- Preservar backend, base de datos, documentación y otros changes.

## Non-Goals

- No implementar refresh token.
- No implementar renovación automática de sesión.
- No decodificar el JWT para controlar navegación.
- No comprobar expiración del JWT en frontend.
- No crear `AuthProvider`.
- No crear contexto global de autenticación.
- No introducir Redux, Zustand u otro store.
- No crear guard por roles.
- No implementar administración de roles.
- No consultar un endpoint `/me`.
- No implementar perfil de usuario.
- No implementar recuperación de contraseña.
- No crear logout backend.
- No implementar interceptores complejos de 401.
- No agregar reintentos automáticos.
- No crear nuevas historias.
- No agregar estadísticas al dashboard.
- No rediseñar login, registro, dashboard, administración o creación de concursos.
- No modificar el formulario, ZIP, mapper multipart o respuesta validada de creación de concursos, salvo imports o integración de transporte.
- No implementar edición, eliminación, ranking o publicación.
- No inventar endpoints administrativos.
- No inventar estados de concursos.
- No ampliar filtros.
- No agregar tests.
- No crear archivos de test.
- No borrar tests.
- No omitir tests mediante `.skip`.
- No aislar tests mediante `.only`.
- No actualizar snapshots automáticamente.
- No modificar TypeScript, Vite o dependencias.
- No ejecutar `npm update` o `npm audit fix`.
- No reformatear masivamente archivos preexistentes.
- No reorganizar completamente la feature de autenticación.
- No refactorizar globalmente componentes compartidos.
- No modificar `backend/`.
- No modificar `database/`.
- No modificar `README.md`.
- No modificar `frontend/README.md`.
- No modificar documentos académicos.
- No modificar otros changes OpenSpec.
- No archivar changes.
- No utilizar OpenSpec CLI.
- No realizar commit ni push.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/proposal.md`
- `docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/spec.md`
- `docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/design.md`
- `docs/openspec/changes/integrate-sprint-1-auth-admin-contests-minimal-frontend/tasks.md`

### Bootstrap y transporte HTTP

- Implementación existente de `AuthTransport`.
- Configuración mediante `configureHttpClientAuthTransport(...)`.
- Punto de arranque de React, probablemente `main.tsx` o un módulo bootstrap equivalente.
- Cliente HTTP compartido, únicamente para verificar su integración existente.

### Autenticación

- Servicio o hook de login existente.
- Página o formulario de login.
- Persistencia actual en `sessionStorage['token']`.
- `ProtectedRoute` existente.
- Acción de logout existente, si está presente.
- Handler MSW de login, solamente si devuelve un contrato obsoleto.

### Routing

- Rutas públicas:
  - `/login`;
  - `/register`.
- Rutas protegidas:
  - `/admin/dashboard`;
  - `/admin/contests`;
  - `/admin/contests/new`.
- Redirect de compatibilidad:
  - `/dashboard` → `/admin/dashboard`.
- Rutas existentes:
  - `/dev/ui`;
  - `*`.

### Dashboard

- Página administrativa existente.
- Integración con `AdminLayout`.
- Acción existente o mínima `Crear concurso`.

### Feature de concursos

- `frontend/src/pages/AdminContestsPage.tsx`.
- Páginas, componentes, hooks, servicios, schemas, mappers, types y constantes existentes dentro de `frontend/src/features/contests/`.
- Imports relacionados con:
  - `listConcursos`;
  - `listConcursosAdmin`;
  - tipos de administración.
- Endpoint y servicio de listado disponibles realmente.
- Integración de `/admin/contests`.
- Imports de creación de concursos afectados por movimientos.

### TypeScript

- `frontend/tsconfig.app.json`.
- Configuraciones relacionadas solamente si el mensaje completo de `TS5101` demuestra que son parte directa del bloqueo.

### Tests y MSW

- Los cinco tests existentes que fallan según la auditoría.
- Tests existentes afectados por:
  - movimiento de archivos;
  - cambio canónico de `/dashboard`;
  - respuesta real del login;
  - colisiones de integración.
- Handlers MSW existentes.
- Sin creación de nuevos casos o archivos de test.

### Formato

- Archivos modificados.
- Archivos movidos.
- Archivos cuyos imports cambien.

## Assumptions

- La implementación descrita está disponible en el workspace que consumirá Pi.
- `AuthTransport` y `configureHttpClientAuthTransport(...)` existen y pueden reutilizarse.
- El login ya recibe un token utilizable del backend o MSW.
- La clave actual de almacenamiento es exactamente `token`.
- `ProtectedRoute` existe y puede reducirse o ajustarse a una comprobación de existencia del token.
- Existe un dashboard administrativo reutilizable.
- Existe una implementación administrativa de concursos distinta del placeholder.
- La creación de concursos ya fue validada contra backend y no requiere cambios funcionales.
- El error completo de `TS5101` no se ha proporcionado y debe inspeccionarse antes de elegir la corrección.
- Los cinco tests fallidos deben identificarse nuevamente durante apply; el conteo real encontrado será la referencia autoritativa.
- No se confirma cuál de `listConcursos` o `listConcursosAdmin` corresponde al contrato backend válido.
- No se confirma si la acción de logout existe actualmente.
- No se confirma si la página se llama `AdminContestPage.tsx` o `AdminContestsPage.tsx`.
- No se confirma la estructura exacta actual de `features/contests/`.
- No se confirma si el dashboard ya está envuelto por `AdminLayout` desde el router o desde la propia página.

## Risks

### Risk 1: El transporte se configura después del primer request protegido

- Probability: Medium.
- Impact: High, porque el request inicial podría ejecutarse sin Bearer.
- Mitigation: Configurar `AuthTransport` antes de montar React o antes de registrar cualquier feature que pueda emitir requests.

### Risk 2: Acceso directo a sessionStorage rompe Vitest

- Probability: Medium.
- Impact: Medium.
- Mitigation: Encapsular la lectura con comprobación segura de disponibilidad del almacenamiento y mantener un comportamiento neutral cuando no exista.

### Risk 3: El login y MSW usan nombres de token diferentes

- Probability: Medium.
- Impact: High, porque los tests o la aplicación no guardarían el valor correcto.
- Mitigation: Elegir exclusivamente el campo confirmado por el código y OpenAPI; ajustar el handler existente si representa un contrato obsoleto.

### Risk 4: Token expirado continúa considerándose sesión válida

- Probability: High a largo plazo.
- Impact: Medium.
- Mitigation: Aceptar este límite explícitamente. El backend seguirá rechazando requests no autorizados. Expiración y refresh quedan fuera de alcance.

### Risk 5: Usuario sin rol administrativo accede visualmente a rutas administrativas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Reconocer que `ProtectedRoute` solo comprueba existencia del token. La autorización real debe mantenerse en backend; roles frontend quedan fuera de alcance.

### Risk 6: Mover AdminContestsPage rompe imports ocultos

- Probability: Medium.
- Impact: Medium.
- Mitigation: Buscar todos los consumidores antes de eliminar el archivo original y ejecutar typecheck, tests y build después del movimiento.

### Risk 7: La pantalla administrativa depende de un endpoint inexistente

- Probability: Medium.
- Impact: High para `/admin/contests`.
- Mitigation: Identificar la operación real disponible y conservar una única función. Simplificar únicamente la parte visual que no pueda sostenerse con el contrato real.

### Risk 8: La reorganización de contests amplía excesivamente el diff

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mover solo archivos necesarios para eliminar conflictos, casing inconsistente e imports inválidos.

### Risk 9: La corrección de TS5101 silencia problemas no relacionados

- Probability: Medium.
- Impact: High.
- Mitigation: Inspeccionar el mensaje completo y cambiar una única opción directamente relacionada; no añadir supresiones generales.

### Risk 10: Los tests se modifican para acomodar código incorrecto

- Probability: Medium.
- Impact: High.
- Mitigation: Corregir producción primero. Modificar tests solo cuando representen rutas, imports o contratos anteriores confirmados.

### Risk 11: El conteo inicial de tests difiere de 65

- Probability: Low.
- Impact: Low.
- Mitigation: Registrar el conteo real antes de cambios y exigir exactamente la misma cantidad al final.

### Risk 12: `format:check` falla por deuda preexistente

- Probability: High según la auditoría.
- Impact: Low para la integración, pero bloquea una validación global.
- Mitigation: Formatear solo archivos tocados y documentar con precisión los archivos preexistentes restantes sin ampliar el diff.

## Rollback Strategy

El rollback debe restaurar el comportamiento previo sin descartar cambios ajenos.

- Restaurar `neutralAuthTransport` únicamente si el transporte dinámico introduce una regresión crítica.
- Restaurar la ruta canónica anterior solo si el router deja de iniciar; mantener documentado que `/admin/dashboard` es el destino requerido.
- Revertir el movimiento de `AdminContestsPage` restaurando imports y ruta antes de eliminar la versión movida.
- Restaurar el placeholder de `/admin/contests` si la pantalla real impide compilar y no puede repararse con el contrato disponible.
- Restaurar exclusivamente el cambio de `tsconfig.app.json` relacionado con `TS5101`.
- Revertir ajustes a tests o MSW junto con el código de producción que justificó esos ajustes.
- No restaurar mediante comandos destructivos globales.
- No eliminar cambios preexistentes de otros integrantes.
- Verificar después del rollback:
  - `/login`;
  - `/register`;
  - routing general;
  - tests;
  - typecheck;
  - build;
  - `/dev/ui`.
- No se requiere rollback de datos persistentes porque este change no modifica backend ni base de datos.

## Success Criteria

- El token continúa almacenándose exactamente en `sessionStorage['token']`.
- El login exitoso guarda el token real y navega a `/admin/dashboard`.
- El registro continúa siendo público y no inicia sesión automáticamente.
- El `AuthTransport` consulta dinámicamente `sessionStorage`.
- Con token, el cliente agrega `Authorization: Bearer <token>`.
- Sin token, el cliente omite `Authorization`.
- El transporte se configura una única vez durante bootstrap.
- Una recarga conserva el acceso mientras el token exista.
- El logout existente, si está disponible, deja de enviar Bearer después de eliminar el token.
- `/admin/dashboard`, `/admin/contests` y `/admin/contests/new` están protegidas mediante el guard existente.
- Sin token, las tres rutas redirigen a `/login`.
- `/dashboard` redirige a `/admin/dashboard`.
- El dashboard utiliza el layout existente y permite navegar a creación de concurso.
- `/admin/contests` renderiza la implementación real en lugar del placeholder.
- `AdminContestsPage` queda dentro de la feature de concursos.
- No queda una copia o wrapper innecesario en `src/pages/`.
- Los imports y servicios de administración quedan alineados con una sola operación real.
- La creación de concursos mantiene su UI, validación, ZIP, mapper y respuesta.
- El request de creación recibe Bearer automáticamente.
- `TS5101` queda resuelto con un cambio mínimo.
- La cantidad total de tests no aumenta ni disminuye.
- Todos los tests existentes pasan.
- No existen `.skip`, `.only` o assertions deshabilitadas nuevas.
- Lint, typecheck y build pasan.
- Dev inicia correctamente.
- Los archivos tocados cumplen formato.
- Cualquier deuda de formato preexistente no tocada queda documentada.
- No se agregan dependencias.
- No se modifican áreas protegidas.
- No se realiza commit ni push.
