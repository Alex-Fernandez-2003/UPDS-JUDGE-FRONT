# Tasks

## Task 1: Inspeccionar el estado inicial y registrar Git

- Objective:
  Establecer el baseline del workspace y proteger cambios ajenos.
- Files or areas likely involved:
  Working tree completo, frontend y artefactos OpenSpec.
- Execution notes:
  Registrar archivos modificados previamente. No restaurar ni descartar trabajo ajeno.
- Verification method:
  Salida inicial de Git y lista de cambios preexistentes.
- Dependencies:
  None.

## Task 2: Inventariar autenticación, routing y bootstrap

- Objective:
  Localizar login, registro, ProtectedRoute, AuthTransport, configuración del HttpClient y punto de arranque.
- Files or areas likely involved:
  Feature auth, lib/auth, lib/api, router y main/bootstrap.
- Execution notes:
  Documentar interfaces reales antes de modificar código.
- Verification method:
  Mapa del flujo actual desde login hasta HttpClient.
- Dependencies:
  Task 1.

## Task 3: Inventariar dashboard y concursos

- Objective:
  Localizar dashboard, placeholder, AdminContestsPage, creación y archivos sueltos de contests.
- Files or areas likely involved:
  Router, src/pages y features/contests.
- Execution notes:
  Identificar casing, imports, servicios y componentes existentes.
- Verification method:
  Inventario de archivos y dependencias.
- Dependencies:
  Task 1.

## Task 4: Registrar tests iniciales y sus fallos

- Objective:
  Confirmar el conteo real y clasificar los tests que fallan.
- Files or areas likely involved:
  Suite Vitest y handlers MSW.
- Execution notes:
  No usar skip, only o updateSnapshot. Registrar cada fallo antes de cambiar código.
- Verification method:
  Resultado inicial con total, pasados, fallidos y causa preliminar.
- Dependencies:
  Tasks 2 and 3.

## Task 5: Reproducir y analizar TS5101

- Objective:
  Obtener el mensaje completo y la opción exacta que bloquea TypeScript.
- Files or areas likely involved:
  `tsconfig.app.json`, package metadata y configuración TypeScript.
- Execution notes:
  No modificar versiones ni agregar supresiones generales.
- Verification method:
  Mensaje completo documentado y propuesta de cambio mínimo.
- Dependencies:
  Task 1.

## Task 6: Crear o completar el AuthTransport de sessionStorage

- Objective:
  Obtener dinámicamente el token actual en cada request.
- Files or areas likely involved:
  Implementación existente de AuthTransport.
- Execution notes:
  Con token retornar Bearer; sin token retornar ausencia. Manejar entornos sin storage.
- Verification method:
  Tests existentes aplicables y verificación aislada mediante mocks ya presentes.
- Dependencies:
  Task 2.

## Task 7: Configurar el transporte durante bootstrap

- Objective:
  Conectar una única instancia de AuthTransport con el HttpClient antes de montar la aplicación.
- Files or areas likely involved:
  Main, bootstrap o composición raíz.
- Execution notes:
  No configurar dentro de componentes ni crear otro cliente.
- Verification method:
  Inspección del orden de inicialización y ausencia de configuraciones duplicadas.
- Dependencies:
  Task 6.

## Task 8: Alinear el login con la sesión mínima

- Objective:
  Guardar el campo contractual del token y navegar al dashboard canónico.
- Files or areas likely involved:
  Login page, hook, service y navegación.
- Execution notes:
  No decodificar token ni agregar roles. Conservar el formulario.
- Verification method:
  Test existente de login reparado y comprobación de sessionStorage.
- Dependencies:
  Tasks 2, 6 and 7.

## Task 9: Verificar registro público

- Objective:
  Mantener `/register` sin protección ni login automático.
- Files or areas likely involved:
  Registro y router.
- Execution notes:
  Cambiar solo incompatibilidades directamente relacionadas.
- Verification method:
  Tests existentes y render manual de `/register`.
- Dependencies:
  Tasks 2 and 8.

## Task 10: Verificar logout existente

- Objective:
  Confirmar que eliminar el token detiene el Bearer dinámicamente.
- Files or areas likely involved:
  Acción de logout existente y AuthTransport.
- Execution notes:
  Omitir cambios si no existe acción visible. No crear endpoint.
- Verification method:
  Verificación del almacenamiento y request posterior usando infraestructura existente.
- Dependencies:
  Tasks 6 and 7.

## Task 11: Ajustar ProtectedRoute existente

- Objective:
  Proteger rutas según existencia actual del token.
- Files or areas likely involved:
  ProtectedRoute y router.
- Execution notes:
  No crear otro guard, roles, `/me`, loading o validación de expiración.
- Verification method:
  Tests existentes de ruta protegida y redirección.
- Dependencies:
  Tasks 2 and 6.

## Task 12: Configurar las rutas canónicas

- Objective:
  Registrar rutas públicas, administrativas y redirect de compatibilidad.
- Files or areas likely involved:
  Router central.
- Execution notes:
  Mantener `/dev/ui` y `*`. Usar `/admin/dashboard` como destino canónico.
- Verification method:
  Tests existentes de routing y navegación manual.
- Dependencies:
  Tasks 9 and 11.

## Task 13: Conectar el dashboard administrativo

- Objective:
  Renderizar el dashboard existente en `/admin/dashboard`.
- Files or areas likely involved:
  Router, dashboard y AdminLayout.
- Execution notes:
  Evitar duplicar AdminLayout. No agregar contenido nuevo.
- Verification method:
  Render manual y tests existentes.
- Dependencies:
  Tasks 3 and 12.

## Task 14: Corregir la acción Crear concurso

- Objective:
  Navegar desde dashboard a `/admin/contests/new`.
- Files or areas likely involved:
  Dashboard y botón existente.
- Execution notes:
  Usar React Router. Agregar un Button mínimo solo si no existe.
- Verification method:
  Activación de la acción y comprobación de ruta.
- Dependencies:
  Task 13.

## Task 15: Inspeccionar el contrato real de administración

- Objective:
  Determinar el servicio y endpoint válidos para la pantalla existente.
- Files or areas likely involved:
  Endpoints, servicios, hooks, tipos y MSW de concursos.
- Execution notes:
  Comparar `listConcursos`, `listConcursosAdmin` y contratos disponibles. No inventar operaciones.
- Verification method:
  Una única operación seleccionada con justificación contractual.
- Dependencies:
  Tasks 3 and 4.

## Task 16: Mover AdminContestsPage a la feature

- Objective:
  Ubicar la página administrativa dentro de `features/contests/pages/`.
- Files or areas likely involved:
  `src/pages/AdminContestsPage.tsx`, feature contests, router y tests.
- Execution notes:
  Elegir un solo nombre y casing. No eliminar el archivo original hasta actualizar consumidores.
- Verification method:
  Búsqueda sin imports hacia la ubicación antigua y typecheck parcial.
- Dependencies:
  Tasks 3 and 15.

## Task 17: Reemplazar el placeholder de /admin/contests

- Objective:
  Renderizar la página administrativa real.
- Files or areas likely involved:
  Router y AdminContestsPage.
- Execution notes:
  No rediseñar la pantalla ni implementar nuevas funciones.
- Verification method:
  Render de `/admin/contests` con sesión.
- Dependencies:
  Tasks 12 and 16.

## Task 18: Reparar imports y servicio mínimo de administración

- Objective:
  Eliminar imports inexistentes y consolidar la operación real.
- Files or areas likely involved:
  AdminContestsPage, hooks, servicios y tipos de contests.
- Execution notes:
  No usar any ni comentar código. Simplificar únicamente bloques sin respaldo contractual.
- Verification method:
  Typecheck de la feature y render con MSW o datos contractuales existentes.
- Dependencies:
  Tasks 15 and 17.

## Task 19: Organizar mínimamente la feature contests

- Objective:
  Resolver archivos sueltos, casing inconsistente e imports rotos.
- Files or areas likely involved:
  `features/contests/`.
- Execution notes:
  Crear solo carpetas con archivos reales. No crear barrels ni dividir archivos sin beneficio.
- Verification method:
  Árbol final coherente y búsqueda de carpetas duplicadas por casing.
- Dependencies:
  Tasks 16 and 18.

## Task 20: Actualizar imports de creación de concursos

- Objective:
  Mantener operativa `/admin/contests/new` después de la reorganización.
- Files or areas likely involved:
  CreateContestPage, componentes, hooks, schemas, mappers y tests existentes.
- Execution notes:
  No cambiar diseño, validaciones, ZIP, problemas, mapper o respuesta.
- Verification method:
  Typecheck y tests existentes de creación.
- Dependencies:
  Task 19.

## Task 21: Verificar Bearer en creación de concursos

- Objective:
  Confirmar que el request multipart utiliza AuthTransport sin token manual.
- Files or areas likely involved:
  Servicio de creación, HttpClient y AuthTransport.
- Execution notes:
  No modificar el payload ni el contrato de respuesta.
- Verification method:
  Inspección de Network durante validación manual con token de desarrollo.
- Dependencies:
  Tasks 7, 11 and 20.

## Task 22: Aplicar la corrección mínima de TS5101

- Objective:
  Desbloquear typecheck y build sin alterar el toolchain.
- Files or areas likely involved:
  `tsconfig.app.json`.
- Execution notes:
  Modificar únicamente la opción identificada en Task 5 y documentar el cambio.
- Verification method:
  TS5101 ausente y typecheck continúa evaluando errores reales.
- Dependencies:
  Task 5.

## Task 23: Resolver errores TypeScript revelados

- Objective:
  Corregir incompatibilidades reales de imports, rutas y contratos.
- Files or areas likely involved:
  Auth, router, dashboard y contests.
- Execution notes:
  No usar any, suppressions generales o bloques comentados.
- Verification method:
  `npm run typecheck` exitoso.
- Dependencies:
  Tasks 8 through 22.

## Task 24: Reparar primero el código responsable de tests fallidos

- Objective:
  Conseguir que los tests existentes representen la integración correcta.
- Files or areas likely involved:
  Producción relacionada con los fallos registrados.
- Execution notes:
  Usar el resultado de Task 4 como baseline. No crear tests.
- Verification method:
  Reducción de fallos sin cambios injustificados a los tests.
- Dependencies:
  Tasks 8, 12, 18, 20 and 23.

## Task 25: Actualizar únicamente tests obsoletos

- Objective:
  Corregir imports, rutas, mocks o expectativas antiguas confirmadas.
- Files or areas likely involved:
  Los tests existentes identificados.
- Execution notes:
  No borrar casos, reducir assertions, usar skip/only o agregar casos.
- Verification method:
  Diff limitado y justificación por cada test modificado.
- Dependencies:
  Tasks 4 and 24.

## Task 26: Ajustar handlers MSW existentes si corresponde

- Objective:
  Alinear el campo de token y contratos ya simulados.
- Files or areas likely involved:
  Handler de login y handlers existentes de concursos.
- Execution notes:
  No crear escenarios nuevos ni usar tokens reales.
- Verification method:
  Tests existentes de auth y concursos en verde.
- Dependencies:
  Tasks 4, 8 and 25.

## Task 27: Confirmar el conteo final de tests

- Objective:
  Alcanzar cero fallos sin alterar la cantidad de tests.
- Files or areas likely involved:
  Suite completa.
- Execution notes:
  Comparar con el baseline real, no solo con la cifra informada.
- Verification method:
  Total final igual al inicial y 0 fallidos.
- Dependencies:
  Tasks 24, 25 and 26.

## Task 28: Aplicar formato únicamente a archivos tocados

- Objective:
  Mantener el diff acotado.
- Files or areas likely involved:
  Archivos modificados, movidos o con imports cambiados.
- Execution notes:
  No ejecutar corrección global ni reformatear deuda preexistente.
- Verification method:
  Revisión de diff sin cambios cosméticos no relacionados.
- Dependencies:
  Tasks 23 and 27.

## Task 29: Ejecutar format:check y clasificar deuda preexistente

- Objective:
  Verificar formato sin ampliar el alcance.
- Files or areas likely involved:
  Proyecto frontend.
- Execution notes:
  Si falla, distinguir archivos tocados de archivos preexistentes no modificados.
- Verification method:
  Archivos tocados conformes y lista precisa de deuda restante.
- Dependencies:
  Task 28.

## Task 30: Ejecutar lint, typecheck, tests y build

- Objective:
  Verificar estáticamente la integración.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No usar fix automático, actualización de dependencias o snapshots.
- Verification method:
  lint, typecheck, test:run y build exitosos.
- Dependencies:
  Tasks 22, 27 and 29.

## Task 31: Iniciar la aplicación y validar rutas

- Objective:
  Confirmar que dev inicia y que las rutas requeridas renderizan.
- Files or areas likely involved:
  Aplicación en ejecución.
- Execution notes:
  Revisar login, registro, dashboard, administración, creación, `/dev/ui` y 404.
- Verification method:
  Checklist manual de rutas.
- Dependencies:
  Task 30.

## Task 32: Validar el flujo de registro y login

- Objective:
  Confirmar el inicio funcional del flujo Sprint 1.
- Files or areas likely involved:
  Registro, login, sessionStorage y router.
- Execution notes:
  No registrar JWT reales en documentación o capturas.
- Verification method:
  Registro público, login, token almacenado y redirect a dashboard.
- Dependencies:
  Task 31.

## Task 33: Validar recarga y rutas protegidas

- Objective:
  Confirmar persistencia mínima y redirección sin sesión.
- Files or areas likely involved:
  ProtectedRoute, sessionStorage y router.
- Execution notes:
  Probar con y sin token.
- Verification method:
  Recarga exitosa con sesión y redirect de las tres rutas sin sesión.
- Dependencies:
  Task 32.

## Task 34: Validar dashboard y creación autenticada

- Objective:
  Confirmar navegación y Bearer en el request protegido.
- Files or areas likely involved:
  Dashboard, creación, HttpClient y Network.
- Execution notes:
  No aplicar parches temporales sobre window.fetch.
- Verification method:
  Navegación a creación, header Bearer y respuesta exitosa.
- Dependencies:
  Tasks 21 and 33.

## Task 35: Validar administración de concursos

- Objective:
  Confirmar que `/admin/contests` usa la implementación real.
- Files or areas likely involved:
  AdminContestsPage, servicio de listado y routing.
- Execution notes:
  No exigir funciones fuera del contrato disponible.
- Verification method:
  Render, request autorizado y navegación a creación.
- Dependencies:
  Tasks 18, 30 and 33.

## Task 36: Auditar alcance y archivos protegidos

- Objective:
  Confirmar que el diff corresponde únicamente a integración mínima.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Revisar backend, database, READMEs, documentos, otros changes, dependencias y tests.
- Verification method:
  Checklist de exclusiones y comparación con baseline.
- Dependencies:
  Tasks 30, 34 and 35.

## Task 37: Actualizar estados OpenSpec y cerrar sin commit

- Objective:
  Reflejar únicamente las tareas realmente verificadas.
- Files or areas likely involved:
  `tasks.md` y working tree.
- Execution notes:
  Documentar cualquier deuda de formato o contrato administrativo pendiente. No usar OpenSpec CLI, commit o push.
- Verification method:
  Estados respaldados por evidencia y Git final revisado.
- Dependencies:
  Task 36.

## Review Workload Forecast

- Estimated LoC changed:
  220-420 LoC, incluyendo movimientos, imports, integración de transporte, routing, corrección de configuración y ajustes a tests existentes. El conteo puede aumentar por movimientos que Git no detecte como renames.
- Risk of exceeding 400 LoC review threshold:
  Medium.
- Recommendation:
  Single PR.
- Suggested split if chained:
  No se recomienda dividir el change funcionalmente. Si el diff supera el umbral, utilizar dos PRs encadenados bajo el mismo change:
  - PR 1: AuthTransport, login, ProtectedRoute, routing, dashboard y TS5101.
  - PR 2: movimiento e integración de administración de concursos, reparación de tests y validación final.

## Estado de implementación

- **Completadas (Tasks 1–20 y 22–30):** se registró el baseline de 65 tests (60 verdes, 5 fallidos), se inspeccionó TS5101 (`baseUrl`), se integró el transporte dinámico de `sessionStorage`, las rutas administrativas protegidas y el listado real `GET /api/Concursos`. El dashboard canónico y el redirect de compatibilidad quedaron configurados; `AdminContestsPage` fue trasladada a `features/contests/pages/` y se eliminaron la operación administrativa duplicada y filtros sin respaldo contractual.
- **Task 21:** la cadena de creación sigue usando exclusivamente el cliente HTTP compartido y no recibe token manual. La validación de Network con un token de desarrollo queda pendiente de verificación manual.
- **Task 29:** `npm run format:check` pasó tras aplicar Prettier individualmente solo a los 13 archivos que el chequeo reportó: `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `src/components/common/index.tsx`, `src/features/auth/authService.ts`, `src/features/auth/authTypes.ts`, `src/features/auth/Components/CodeIllustration.tsx`, `src/features/auth/Components/RegisterForm.tsx`, `src/features/auth/Pages/RegisterPage.tsx`, `src/features/auth/templates/AuthTemplate.tsx`, `src/features/contests/components/ContestsSummaryCards.tsx`, `src/features/contests/components/ContestsTable.tsx`, `src/features/contests/format.ts` y `src/lib/api/auth.ts`.
- **Task 30:** `npm run lint`, `npm run typecheck`, `npm run test:run` (65/65) y `npm run build` pasaron.
- **Task 31 pendiente:** `npm run dev -- --host 127.0.0.1` no pudo iniciar porque el puerto configurado 8085 ya estaba en uso. No se detuvo el proceso ajeno que ocupa el puerto.
- **Verificación manual pendiente (Tasks 32–35):** no se realizó una sesión interactiva de navegador ni requests mutantes contra el backend. El flujo queda cubierto por la suite existente, la inspección del transporte compartido y el smoke de Vite, pero requiere una comprobación manual de login, recarga, header Bearer y creación autorizada antes de entrega.
- **Task 36:** se revisó el diff; no se modificaron backend, database, READMEs, dependencias ni otros changes. No se realizó commit ni push.
- **Task 37:** este registro refleja únicamente la evidencia disponible durante apply.
- **Ajuste posterior al login:** `LoginPage` conserva el almacenamiento del token y navega directamente a `/admin/dashboard`; se eliminó la página temporal `features/auth/Pages/DashboardPage.tsx`. La ruta heredada `/dashboard` permanece como redirect de compatibilidad hacia `/admin/dashboard`, que ahora renderiza la pantalla administrativa de concursos protegida.
