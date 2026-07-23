# Tasks

## Task 1: Registrar el baseline de Git

- Objective:
  Identificar cambios preexistentes y proteger trabajo paralelo.
- Files or areas likely involved:
  Working tree completo.
- Execution notes:
  No restaurar, descartar ni incluir cambios ajenos.
- Verification method:
  Estado inicial documentado y lista de archivos preexistentes.
- Dependencies:
  None.

## Task 2: Ejecutar los checks iniciales

- Objective:
  Establecer el estado real antes del change.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  Ejecutar format:check, lint, typecheck, test:run y build sin corregir todavía.
- Verification method:
  Baseline de resultados y fallos preexistentes.
- Dependencies:
  Task 1.

## Task 3: Inventariar componentes públicos

- Objective:
  Enumerar todos los exports visuales bajo `src/components`.
- Files or areas likely involved:
  Common, forms, navigation, tables, tests y barrels.
- Execution notes:
  Separar componentes de tipos, tests, auxiliares y exports.
- Verification method:
  Tabla completa con tipo, className, ref, props nativas y acción.
- Dependencies:
  Task 1.

## Task 4: Inspeccionar la estrategia de clases

- Objective:
  Confirmar `cn`, clsx, tailwind-merge, cva y patrones existentes.
- Files or areas likely involved:
  Utilidades, package.json y componentes.
- Execution notes:
  No agregar dependencias.
- Verification method:
  Estrategia única documentada.
- Dependencies:
  Task 3.

## Task 5: Inspeccionar refs y props nativas

- Objective:
  Localizar forwardRef, refs internas, spreads y atributos omitidos.
- Files or areas likely involved:
  Componentes compartidos.
- Execution notes:
  Registrar el elemento real que debe conservar cada ref.
- Verification method:
  Matriz de refs y tipos nativos.
- Dependencies:
  Task 3.

## Task 6: Inventariar contests y sus consumidores

- Objective:
  Clasificar archivos y construir el grafo de imports.
- Files or areas likely involved:
  `features/contests`, router, layouts, pages, mocks y otras features.
- Execution notes:
  Registrar imports relativos, aliases y lazy imports.
- Verification method:
  Matriz archivo, responsabilidad, consumidores y destino propuesto.
- Dependencies:
  Task 1.

## Task 7: Inspeccionar documentación y referencias

- Objective:
  Confirmar documento fuente, carpeta destino, links y changes relacionados.
- Files or areas likely involved:
  `docs/historias`, `docs/retrospectivas`, OpenSpec e índices documentales.
- Execution notes:
  No afirmar existencia basándose solo en el briefing.
- Verification method:
  Inventario de documentos y referencias.
- Dependencies:
  Task 1.

## Task 8: Coordinar boundaries con UJ-11

- Objective:
  Reducir conflictos con el responsable de la contribución futura.
- Files or areas likely involved:
  Propuesta de rutas admin, user y shared.
- Execution notes:
  Identificar archivos en trabajo paralelo y movimientos que deben diferirse.
- Verification method:
  Plan de movimientos aprobado o bloqueos documentados.
- Dependencies:
  Task 6.

## Task 9: Definir el contrato común de className

- Objective:
  Establecer root, merge, props y compatibilidad.
- Files or areas likely involved:
  Diseño técnico de componentes.
- Execution notes:
  Mantener `className?: string`, bases primero y personalización después.
- Verification method:
  Contrato revisado contra todos los tipos del inventario.
- Dependencies:
  Tasks 3, 4 and 5.

## Task 10: Preparar pruebas matriciales de compatibilidad

- Objective:
  Cubrir el contrato sin duplicar pruebas idénticas.
- Files or areas likely involved:
  Tests de componentes.
- Execution notes:
  Verificar clases parciales, props, eventos y accesibilidad; evitar strings completos.
- Verification method:
  Tests RED para gaps confirmados.
- Dependencies:
  Task 9.

## Task 11: Estandarizar primitivas de common

- Objective:
  Corregir className en acciones, contenedores y feedback simple.
- Files or areas likely involved:
  Button, IconButton, LinkButton, BrandMark, Surface, Card, Divider, Avatar, Badge, StatusDot, Alert, Spinner, ProgressBar, Skeleton y EmptyState, según inventario local.
- Execution notes:
  Cambiar solo componentes que lo necesiten.
- Verification method:
  Pruebas de base, personalización, ARIA y estados.
- Dependencies:
  Task 10.

## Task 12: Estandarizar formularios básicos

- Objective:
  Corregir merge y props nativas de controles simples.
- Files or areas likely involved:
  Label, hints, errors, Input, Textarea, Select, Checkbox y Radio.
- Execution notes:
  Evitar que className externo reemplace clases base.
- Verification method:
  Pruebas de clases, eventos, disabled, ARIA y props nativas.
- Dependencies:
  Tasks 10 and 11.

## Task 13: Estandarizar formularios compuestos

- Objective:
  Definir className raíz o principal de componentes compuestos.
- Files or areas likely involved:
  PasswordInput, SearchInput, FormField, PasswordStrength y FileDropzone.
- Execution notes:
  Documentar slots existentes y no agregar APIs especulativas.
- Verification method:
  Pruebas de root, input, ref interna, drag and drop y errores.
- Dependencies:
  Task 12.

## Task 14: Estandarizar navegación

- Objective:
  Añadir personalización coherente a componentes de navegación.
- Files or areas likely involved:
  Breadcrumbs, Stepper, Pagination, StatCard y componentes locales adicionales.
- Execution notes:
  Preservar aria-current y acciones internas.
- Verification method:
  Pruebas semánticas y de clases.
- Dependencies:
  Tasks 10 and 11.

## Task 15: Estandarizar tablas

- Objective:
  Añadir className a DataTable o primitivas exportadas.
- Files or areas likely involved:
  Componentes de tabla.
- Execution notes:
  Preservar scroll, semántica, loading, error y empty.
- Verification method:
  Pruebas de table, headers, celdas y personalización.
- Dependencies:
  Tasks 10 and 11.

## Task 16: Preservar y probar refs

- Objective:
  Confirmar que los cambios no alteran referencias.
- Files or areas likely involved:
  Componentes con forwardRef o integración de formularios.
- Execution notes:
  No introducir refs sin consumidor real.
- Verification method:
  Tests que comparen el elemento referenciado.
- Dependencies:
  Tasks 11 through 15.

## Task 17: Ejecutar regresión de componentes

- Objective:
  Validar compatibilidad global antes de mover contests.
- Files or areas likely involved:
  Suite de componentes, `/dev/ui`, auth y layouts.
- Execution notes:
  Corregir producción antes de debilitar pruebas.
- Verification method:
  Tests, typecheck y revisión de `/dev/ui`.
- Dependencies:
  Tasks 11 through 16.

## Task 18: Confirmar la clasificación final de contests

- Objective:
  Aprobar cada destino admin, user, shared o sin movimiento.
- Files or areas likely involved:
  Inventario de Task 6.
- Execution notes:
  Exigir doble consumo para shared.
- Verification method:
  Matriz final sin archivos ambiguos forzados.
- Dependencies:
  Tasks 6, 8 and 17.

## Task 19: Crear la estructura mínima de admin

- Objective:
  Crear únicamente carpetas administrativas que recibirán archivos.
- Files or areas likely involved:
  `features/contests/admin/`.
- Execution notes:
  No crear toda la estructura orientativa si no hay archivos.
- Verification method:
  Ninguna carpeta vacía.
- Dependencies:
  Task 18.

## Task 20: Mover páginas y componentes administrativos

- Objective:
  Reubicar pantalla, listado, resumen, creación, problemas y ZIP.
- Files or areas likely involved:
  Componentes y páginas clasificadas como admin.
- Execution notes:
  Preservar nombres y comportamiento.
- Verification method:
  Movimientos detectables y archivos originales ausentes.
- Dependencies:
  Task 19.

## Task 21: Mover lógica administrativa

- Objective:
  Reubicar hooks, servicios, schemas, mappers, tipos y constantes exclusivos.
- Files or areas likely involved:
  Archivos clasificados como admin.
- Execution notes:
  No cambiar contratos ni lógica.
- Verification method:
  Tests unitarios y typecheck.
- Dependencies:
  Task 20.

## Task 22: Materializar user solo si corresponde

- Objective:
  Ubicar código real existente del usuario.
- Files or areas likely involved:
  Archivos clasificados como user.
- Execution notes:
  Omitir la carpeta si no existe código real; no agregar placeholders de UJ-11.
- Verification method:
  Cada archivo de user tiene un consumidor real.
- Dependencies:
  Task 18.

## Task 23: Materializar shared real

- Objective:
  Reubicar únicamente elementos usados por admin y user.
- Files or areas likely involved:
  Componentes, tipos o utilidades compartidas confirmadas.
- Execution notes:
  No mover elementos administrativos ni futuros especulativos.
- Verification method:
  Evidencia de consumidores en ambos boundaries.
- Dependencies:
  Tasks 18 and 22.

## Task 24: Actualizar router e imports externos

- Objective:
  Reparar rutas, lazy imports y consumidores de contests.
- Files or areas likely involved:
  Router, layouts, pages y otras features.
- Execution notes:
  Mantener las rutas funcionales existentes.
- Verification method:
  Typecheck y tests del router.
- Dependencies:
  Tasks 20 through 23.

## Task 25: Actualizar tests y mocks movidos

- Objective:
  Alinear imports sin cambiar expectativas funcionales.
- Files or areas likely involved:
  Tests y MSW de contests.
- Execution notes:
  No convertir el movimiento en un rediseño.
- Verification method:
  Suite administrativa en verde.
- Dependencies:
  Tasks 21 and 24.

## Task 26: Definir la API pública de contests

- Objective:
  Decidir exports estables sin introducir ciclos.
- Files or areas likely involved:
  Barrels existentes o imports directos.
- Execution notes:
  No crear un barrel global excesivo.
- Verification method:
  Grafo de dependencias sin ciclos y API documentada.
- Dependencies:
  Tasks 23 through 25.

## Task 27: Limpiar rutas antiguas y carpetas vacías

- Objective:
  Eliminar restos estructurales.
- Files or areas likely involved:
  Feature contests completa.
- Execution notes:
  Buscar duplicados, `.gitkeep`, imports y reexports obsoletos.
- Verification method:
  Búsqueda global sin referencias antiguas.
- Dependencies:
  Task 26.

## Task 28: Ejecutar regresión funcional de contests

- Objective:
  Confirmar que la reorganización no cambia producto.
- Files or areas likely involved:
  Dashboard admin, listado, filtros, resumen, creación, ZIP y problemas.
- Execution notes:
  Verificar rutas y MSW.
- Verification method:
  Tests existentes y checklist manual.
- Dependencies:
  Tasks 25 through 27.

## Task 29: Mover el documento del App Shell

- Objective:
  Trasladar el documento a la carpeta de retrospectivas.
- Files or areas likely involved:
  Ruta fuente confirmada y `docs/retrospectivas/`.
- Execution notes:
  Realizar un movimiento, no una copia. Crear la carpeta correcta si falta.
- Verification method:
  Destino existe y origen no existe.
- Dependencies:
  Task 7.

## Task 30: Actualizar referencias documentales

- Objective:
  Evitar enlaces internos rotos.
- Files or areas likely involved:
  Índices, historias, changes y otros documentos.
- Execution notes:
  Buscar la ruta antigua en todo el repositorio.
- Verification method:
  Cero referencias activas a la ruta anterior.
- Dependencies:
  Task 29.

## Task 31: Transformar el documento en retrospectiva Starfish

- Objective:
  Reestructurar contenido válido bajo las cinco categorías.
- Files or areas likely involved:
  `docs/retrospectivas/retrospectiva-sprint-1.md`.
- Execution notes:
  No inventar resultados; conservar hechos verificables.
- Verification method:
  Título, contexto y cinco categorías presentes.
- Dependencies:
  Tasks 7, 29 and 30.

## Task 32: Redactar el análisis del Sprint 1

- Objective:
  Diferenciar funcionalidad, calidad, UX, mantenibilidad y proceso.
- Files or areas likely involved:
  Retrospectiva.
- Execution notes:
  Usar lenguaje de equipo y evitar una lista de commits.
- Verification method:
  Cinco dimensiones presentes y respaldadas.
- Dependencies:
  Task 31.

## Task 33: Registrar actions SMART

- Objective:
  Convertir aprendizajes en compromisos medibles.
- Files or areas likely involved:
  Retrospectiva.
- Execution notes:
  Incluir componentes extensibles, boundaries de contests y validación reproducible cuando corresponda.
- Verification method:
  Tabla con acción, horizonte y medición.
- Dependencies:
  Tasks 17, 28 and 32.

## Task 34: Registrar relación futura con UJ-11

- Objective:
  Documentar que la contribución parcial permanece pendiente.
- Files or areas likely involved:
  Retrospectiva.
- Execution notes:
  Indicar la nueva estructura destino sin afirmar implementación.
- Verification method:
  UJ-11 aparece como acción futura no completada.
- Dependencies:
  Tasks 22, 23 and 33.

## Task 35: Añadir checklist, DoD y evidencias

- Objective:
  Hacer verificable el seguimiento de la retrospectiva.
- Files or areas likely involved:
  Retrospectiva.
- Execution notes:
  Marcar solo lo respaldado y registrar capturas como pendientes sin links.
- Verification method:
  Checklist, definición de terminado y evidencias presentes.
- Dependencies:
  Tasks 31 through 34.

## Task 36: Validar la documentación

- Objective:
  Confirmar unicidad y consistencia.
- Files or areas likely involved:
  `docs/historias`, `docs/retrospectivas` y referencias.
- Execution notes:
  No crear un segundo documento de mejora.
- Verification method:
  Un único archivo de retrospectiva y origen eliminado.
- Dependencies:
  Tasks 29 through 35.

## Task 37: Ejecutar format y lint

- Objective:
  Validar estilo de código y documentación.
- Files or areas likely involved:
  Archivos modificados y movidos.
- Execution notes:
  No ampliar el diff con formato no relacionado.
- Verification method:
  `npm run format:check` y `npm run lint` exitosos.
- Dependencies:
  Tasks 17, 28 and 36.

## Task 38: Ejecutar typecheck y tests

- Objective:
  Detectar contratos, imports y regresiones.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  No usar casts, skip o snapshots para ocultar fallos.
- Verification method:
  `npm run typecheck` y `npm run test:run` exitosos.
- Dependencies:
  Task 37.

## Task 39: Ejecutar build y dev

- Objective:
  Verificar producción y arranque local.
- Files or areas likely involved:
  Frontend completo.
- Execution notes:
  Revisar consola y rutas principales.
- Verification method:
  `npm run build` exitoso y dev inicia.
- Dependencies:
  Task 38.

## Task 40: Ejecutar diff check y auditoría final

- Objective:
  Detectar whitespace, duplicados y scope creep.
- Files or areas likely involved:
  Git diff completo.
- Execution notes:
  Ejecutar `git diff --check`; verificar ausencia de UJ-11, backend y cambios funcionales.
- Verification method:
  Diff check limpio y checklist de exclusiones.
- Dependencies:
  Tasks 36 and 39.

## Task 41: Actualizar tareas y cerrar sin commit

- Objective:
  Reflejar únicamente evidencia real y preparar handoff.
- Files or areas likely involved:
  `tasks.md` y working tree.
- Execution notes:
  No usar OpenSpec CLI, commit o push.
- Verification method:
  Estados respaldados y Git final revisado.
- Dependencies:
  Task 40.

## Review Workload Forecast

- Estimated LoC changed:
  650-1,200 LoC, incluyendo contratos de componentes, pruebas, movimientos estructurales, imports y retrospectiva. Los movimientos pueden inflar el conteo cuando Git no detecte renames.
- Risk of exceeding 400 LoC review threshold:
  High.
- Recommendation:
  Chained PRs.
- Suggested split if chained:
  - PR 1: inventario, contrato `className`, common y pruebas base.
  - PR 2: formularios, navegación, tablas y regresión de `/dev/ui`.
  - PR 3: movimientos administrativos de contests e imports.
  - PR 4: shared/user boundary, API pública y regresión completa.
  - PR 5: movimiento documental, Starfish, SMART y validación final.
