# Spec

## Requirements

### Change Scope Requirements

- El change MUST llamarse `sprint-1-retrospective-shared-components-contests-boundaries`.
- El change MUST residir en `docs/openspec/changes/sprint-1-retrospective-shared-components-contests-boundaries/`.
- El change MUST tratarse como mejora técnica de retrospectiva.
- El change MUST NOT presentarse como historia de usuario.
- El change MUST NOT implementar la contribución parcial de UJ-11.
- El change MUST NOT archivar otros changes.

### Component Inventory Requirements

- Pi MUST inspeccionar todos los exports públicos bajo `frontend/src/components/`.
- El inventario MUST identificar:
  - componente;
  - tipo;
  - soporte actual de `className`;
  - elemento que recibe la clase;
  - soporte de ref;
  - props nativas;
  - acción requerida.
- Tests, tipos, constantes, barrels y auxiliares MUST clasificarse, pero MUST NOT tratarse como componentes visuales.
- Componentes privados no exportados MAY excluirse cuando no requieran personalización externa.
- El inventario final MUST reflejar el workspace local, no únicamente la versión pública.

### Common ClassName Contract Requirements

- Todo componente visual público MUST aceptar `className?: string` cuando exista un elemento visual principal personalizable.
- `className` MUST ser opcional.
- Sin `className`, el componente MUST conservar sus clases predeterminadas.
- Con `className`, el componente MUST conservar sus clases base.
- La personalización externa MUST agregarse después de las clases predeterminadas.
- El componente MUST NOT producir el string `undefined`.
- El componente MUST NOT exigir cambios a consumidores existentes.
- La apariencia predeterminada MUST permanecer sin cambios intencionales.
- El change MUST NOT introducir nuevas variantes visuales no solicitadas.

### Class Merge Requirements

- El frontend MUST reutilizar la utilidad `cn` existente cuando continúe disponible.
- La utilidad MUST seguir combinando `clsx` y `tailwind-merge`.
- El change MUST NOT implementar un parser artesanal de Tailwind.
- El change MUST NOT agregar otra dependencia de merge.
- Cuando dos utilidades Tailwind sean conflictivas, la clase externa SHOULD prevalecer.
- Clases no conflictivas MUST coexistir.
- El orden de argumentos SHOULD ser `cn(defaultClasses, className)` o su equivalente.
- Componentes que ya usan `cn` MUST mantener una estrategia consistente.

### Existing ClassName Requirements

- Un componente que ya acepta `className` MUST aplicar la prop.
- La prop MUST aplicarse al elemento documentado.
- La prop MUST NOT reemplazar accidentalmente todas las clases base.
- Su tipo público MUST permanecer compatible.
- El change MUST NOT renombrar `className`.
- El change MUST NOT introducir una segunda prop equivalente sin necesidad.

### Native Props Requirements

- Un componente que represente un elemento HTML SHOULD extender sus props nativas.
- El componente MUST preservar:
  - `className`;
  - `aria-*`;
  - `data-*`;
  - eventos;
  - disabled;
  - type;
  - name;
  - id;
  - role;
  - atributos compatibles.
- Props internas incompatibles MUST excluirse explícitamente.
- El componente MUST NOT propagar props inválidas al DOM.
- El tipo del elemento raíz MUST NOT cambiar sin necesidad.
- El orden de spread MUST NOT permitir que props internas críticas se sobrescriban accidentalmente.

### Ref Requirements

- Componentes que ya utilizan `forwardRef` MUST conservarlo.
- La ref MUST seguir apuntando al mismo elemento.
- El change MUST NOT convertir todos los componentes a `forwardRef`.
- Una nueva ref MAY incorporarse solo cuando:
  - el elemento principal requiera foco programático;
  - exista integración con formularios;
  - exista un consumidor real;
  - la decisión esté cubierta por pruebas.
- Los tipos de ref MUST ser compatibles con el elemento real.

### Compound Component Requirements

- En un componente compuesto, `className` MUST personalizar por defecto el contenedor raíz.
- Si el elemento principal no es el contenedor, esa decisión MUST documentarse.
- APIs por slots MAY mantenerse cuando ya existan.
- El change MUST NOT agregar objetos `classNames` a todos los componentes.
- Una API por slots nueva MUST requerir un caso real.
- El contrato común mínimo MUST seguir siendo `className?: string`.

### Form Component Requirements

- `Input`, `Textarea` y `Select` MUST preservar sus estilos, estados y atributos.
- `Checkbox` y `Radio` MUST combinar las clases externas con las clases base.
- `PasswordInput` MUST documentar o ajustar si `className` personaliza el input o el wrapper.
- `SearchInput` MUST documentar o ajustar si `className` personaliza el input o el wrapper.
- `FormField` MUST aceptar personalización del contenedor cuando sea aplicable.
- `FileDropzone` MUST permitir personalizar su raíz sin romper selección, drag and drop, errores o input nativo.
- `PasswordStrength` MUST permitir personalizar su raíz cuando sea público.
- Ningún cambio MUST romper React Hook Form, refs, eventos, ARIA o focus-visible.
- El change MUST NOT rediseñar campos o dropzones.

### Feedback and Common Component Requirements

- Componentes de feedback públicos MUST aceptar `className` cuando tengan raíz visual.
- `StatusDot`, `Spinner`, `ProgressBar`, `EmptyState` y equivalentes MUST evaluarse explícitamente.
- La semántica de alert, status, progressbar y loading MUST preservarse.
- `Button`, `IconButton`, `LinkButton`, `Card`, `Badge`, `Alert`, `Avatar` y equivalentes MUST conservar su contrato existente.
- Los estados loading y disabled MUST permanecer funcionales.

### Navigation Component Requirements

- `Breadcrumbs`, `Stepper`, `Pagination`, `StatCard` y equivalentes MUST evaluarse para `className`.
- La clase MUST aplicarse al nav, list o contenedor raíz correspondiente.
- `aria-current`, labels y navegación mediante teclado MUST preservarse.
- Los botones internos MUST conservar su comportamiento.
- El change MUST NOT modificar rutas o textos funcionales.

### Table Component Requirements

- Cada primitiva visual de tabla exportada MUST aceptar su propio `className`.
- Si solo existe un `DataTable`, este MUST aceptar `className` para su raíz.
- Props adicionales por zonas MAY añadirse solo si existe una necesidad real confirmada.
- La semántica de `table`, `thead`, `tbody`, `tr`, `th` y `td` MUST preservarse.
- El comportamiento responsive MUST preservarse.
- Loading, error y empty MUST conservarse.
- La personalización MUST NOT eliminar bordes o estilos base cuando no se solicite.

### Backward Compatibility Requirements

- Consumidores sin `className` MUST continuar compilando.
- Consumidores sin `className` MUST conservar apariencia y comportamiento.
- Consumidores con `className` MUST poder agregar estilos.
- El change MUST NOT requerir una migración masiva de consumidores.
- Consumidores MAY actualizarse únicamente por pruebas, bugs reales o movimientos de contests.
- `/dev/ui` MUST continuar renderizando.

### Shared Component Test Requirements

- Las pruebas MUST cubrir componentes sin `className`.
- Las pruebas MUST cubrir componentes con `className`.
- Las pruebas MUST comprobar clases base y externas sin comparar el string completo.
- Las pruebas MUST cubrir props nativas.
- Las pruebas MUST cubrir eventos.
- Las pruebas MUST cubrir disabled.
- Las pruebas MUST cubrir ARIA.
- Las pruebas MUST cubrir refs donde correspondan.
- Las pruebas MUST cubrir semántica de tabla.
- Las pruebas MUST cubrir componentes compuestos.
- Las pruebas MUST comprobar que no aparezca `undefined`.
- El change MUST NOT depender solamente de snapshots.
- Una matriz de casos MAY utilizarse para evitar pruebas repetitivas.

### Contests Inventory Requirements

- Pi MUST inventariar cada archivo bajo `features/contests`.
- Cada archivo MUST clasificarse como:
  - admin;
  - user;
  - shared;
  - sin movimiento.
- La clasificación MUST considerar consumidores y semántica.
- La clasificación MUST NOT depender únicamente del nombre.
- Imports desde router, tests, mocks y otras features MUST registrarse.

### Admin Boundary Requirements

- Código exclusivo de administración MUST residir bajo `features/contests/admin/`.
- Esto incluye, cuando existan:
  - pantalla administrativa;
  - listado;
  - filtros;
  - resumen;
  - creación;
  - formulario;
  - problemas dinámicos;
  - ZIP;
  - schemas;
  - mappers;
  - servicios de `mis-creados`;
  - servicios de `mis-resumen`;
  - tipos administrativos;
  - tests y mocks administrativos.
- `ContestsSummaryCards` MUST permanecer administrativo.
- Los movimientos MUST preservar comportamiento.
- El change MUST NOT introducir cambios funcionales administrativos.

### User Boundary Requirements

- Código real exclusivo del usuario MUST residir bajo `features/contests/user/`.
- El change MUST NOT crear estadísticas, envíos o lista de usuario.
- Si no existe código real de usuario, `user/` MUST NOT crearse vacía.
- Si existe al menos un archivo real de usuario, este MAY establecer la carpeta.
- La retrospectiva MUST documentar `user/` como destino de UJ-11 futura.
- El change MUST NOT crear archivos placeholder.

### Shared Boundary Requirements

- Un archivo MAY residir en `shared` solo si admin y user lo consumen realmente.
- `shared` MUST NOT utilizarse para elementos difíciles de clasificar.
- Formularios administrativos MUST NOT moverse a shared.
- Filtros administrativos MUST NOT moverse a shared.
- Resúmenes administrativos MUST NOT moverse a shared.
- Tipos futuros especulativos MUST NOT moverse a shared.
- Un archivo shared MUST estar libre de políticas de rol específicas.

### Safe Movement Requirements

- Los movimientos SHOULD preservar historial mediante una operación equivalente a `git mv`.
- Imports relativos y aliases MUST actualizarse.
- Lazy imports MUST actualizarse.
- Router MUST actualizarse.
- Tests y mocks MUST actualizarse.
- Barrels MUST actualizarse.
- Documentación MUST actualizarse.
- No MUST quedar:
  - duplicados;
  - reexports obsoletos;
  - rutas antiguas;
  - imports rotos;
  - carpetas vacías;
  - `.gitkeep` innecesarios;
  - ciclos.
- El change MUST ejecutar búsquedas antes y después de los movimientos.

### Feature Public API Requirements

- Pi MUST evaluar una API pública para contests.
- Un barrel MAY conservar imports estables cuando no genere ciclos.
- El barrel MUST NOT reexportar indiscriminadamente toda la feature.
- Imports internos entre admin, user y shared SHOULD respetar los boundaries.
- Dependencias de otras features SHOULD usar exports públicos cuando exista una API estable.
- La API final MUST documentarse en design y retrospectiva.

### Contests Regression Requirements

- Las rutas administrativas MUST continuar funcionando.
- El dashboard administrativo MUST continuar funcionando.
- El listado MUST continuar funcionando.
- Los filtros MUST continuar funcionando.
- El resumen MUST continuar funcionando.
- La creación MUST continuar funcionando.
- El formulario, ZIP y problemas MUST continuar funcionando.
- Servicios, hooks y MSW MUST continuar resolviendo.
- Tests administrativos MUST conservar expectativas funcionales.
- Build MUST resolver todos los aliases.

### Retrospective Movement Requirements

- El archivo `docs/historias/app-shell-sidebar-layouts-routing-por-roles.md` MUST moverse.
- El destino MUST ser `docs/retrospectivas/retrospectiva-sprint-1.md`.
- El archivo de origen MUST dejar de existir.
- El change MUST realizar un movimiento, no una copia.
- `docs/retrospectivas/` MUST crearse cuando no exista.
- El change MUST NOT crear `docs/restrospectivas/`.
- Referencias internas MUST actualizarse.
- Links desde otros documentos MUST actualizarse.
- Información histórica válida MUST preservarse.
- Duplicaciones MAY eliminarse.
- El documento MUST dejar de presentarse como historia de usuario.

### Retrospective Content Requirements

- El título MUST ser `Retrospectiva Sprint 1 — UPDS JUDGE`.
- El documento MUST identificar:
  - proyecto;
  - sprint;
  - técnica Starfish;
  - objetivo;
  - contexto.
- El documento MUST incluir:
  - Keep Doing;
  - Less Of;
  - More Of;
  - Stop Doing;
  - Start Doing.
- Los resultados MUST derivarse de evidencia real.
- Las dificultades MUST derivarse de evidencia real.
- El análisis MUST distinguir:
  - funcionalidad;
  - calidad técnica;
  - experiencia de usuario;
  - mantenibilidad;
  - proceso del equipo.
- El lenguaje MUST ser colectivo y no culpabilizar personas.
- El documento MUST NOT convertirse en una lista de commits.

### Related Changes Requirements

- La retrospectiva MUST enumerar únicamente changes existentes.
- Pi MUST comprobar cada carpeta antes de incluirla.
- Un change ausente MUST NOT listarse como completado.
- La contribución UJ-11 pendiente MAY mencionarse como trabajo futuro, no como resultado.
- Changes parciales o no verificados MUST describirse con su estado real.

### SMART Actions Requirements

- La retrospectiva MUST incluir una tabla de:
  - mejora;
  - acción SMART;
  - medición.
- Debe incluir la mejora de componentes extensibles.
- Debe incluir la separación admin/user/shared en contests.
- Puede incluir validación reproducible cuando esté respaldada.
- Cada acción MUST indicar un horizonte dentro del inicio o desarrollo del Sprint 2.
- Cada medición MUST ser verificable.
- Las acciones MUST quedar dentro de la retrospectiva.
- El change MUST NOT crear otro documento de mejoras.

### UJ-11 Relationship Requirements

- La retrospectiva MUST indicar que `uj11-partial-user-dashboard-stats-recent-submissions` sigue pendiente.
- El change MUST preparar boundaries, pero MUST NOT implementar sus componentes.
- El change MUST registrar `features/contests/user/` como destino futuro cuando corresponda.
- La retrospectiva MUST incluir coordinación con el responsable principal.
- El checklist MUST mantener UJ-11 parcial sin marcar hasta su implementación real.

### Evidence Requirements

- La retrospectiva MUST incluir una sección de evidencias pendientes.
- Puede registrar:
  - tablero Starfish;
  - componentes con className;
  - estructura de contests;
  - validaciones.
- Las rutas MUST registrarse como texto pendiente.
- El change MUST NOT crear imágenes vacías.
- El documento MUST NOT enlazar capturas inexistentes.
- Solo evidencias existentes MAY marcarse completadas.

### Definition of Done Requirements

- El documento MUST incluir un checklist verificable.
- Los ítems MUST marcarse únicamente con evidencia.
- La definición de terminado MUST incluir:
  - inventario;
  - className;
  - estilos preservados;
  - boundaries;
  - imports;
  - retrospectiva;
  - documento anterior eliminado;
  - acciones SMART;
  - checks técnicos;
  - evidencias completas o pendientes explícitas.

### Validation Requirements

- Pi MUST ejecutar `npm run format:check`.
- Pi MUST ejecutar `npm run lint`.
- Pi MUST ejecutar `npm run typecheck`.
- Pi MUST ejecutar `npm run test:run`.
- Pi MUST ejecutar `npm run build`.
- Pi MUST ejecutar `npm run dev`.
- Pi MUST ejecutar `git diff --check`.
- El change MUST NOT considerarse completado con tests fallidos.
- El change MUST NOT considerarse completado con imports rotos.
- El change MUST NOT considerarse completado con build fallido.
- El change MUST NOT considerarse completado con el documento anterior presente.
- El change MUST NOT realizar commit ni push.

## Behavior Scenarios

### Scenario 1: Componente sin personalización

Given un consumidor que no proporciona `className`  
When renderiza un componente compartido  
Then el componente MUST conservar sus estilos predeterminados

### Scenario 2: Clase externa adicional

Given un Button con estilos base  
When el consumidor proporciona `className="w-full"`  
Then el botón MUST conservar sus estilos base y aplicar el ancho externo

### Scenario 3: Conflicto Tailwind

Given un componente con una utilidad Tailwind predeterminada  
When el consumidor proporciona una utilidad conflictiva  
Then la clase externa SHOULD prevalecer mediante la estrategia de merge existente

### Scenario 4: Clase no conflictiva

Given clases base y una clase externa no conflictiva  
When se combinan  
Then ambas MUST permanecer en el resultado

### Scenario 5: className omitido

Given `className` como undefined  
When se construyen las clases  
Then el DOM MUST no contener la clase textual `undefined`

### Scenario 6: Props nativas

Given un componente basado en button  
When recibe `data-testid`, `aria-label` y un evento  
Then MUST propagar esos atributos y ejecutar el evento

### Scenario 7: Disabled

Given un componente interactivo disabled  
When recibe personalización externa  
Then MUST conservar su estado disabled y sus estilos funcionales

### Scenario 8: Ref existente

Given un componente con forwardRef  
When un consumidor asigna una ref  
Then la ref MUST apuntar al mismo elemento que antes del change

### Scenario 9: Ref no necesaria

Given un componente sin necesidad real de ref  
When se revisa su contrato  
Then MUST no convertirse automáticamente a forwardRef

### Scenario 10: Checkbox personalizado

Given un Checkbox con clases base  
When recibe className  
Then MUST combinar la personalización sin perder tamaño ni accent predeterminados

### Scenario 11: FormField personalizado

Given un FormField público  
When recibe className  
Then la clase MUST aplicarse al contenedor sin romper label, hint, error o aria-describedby

### Scenario 12: FileDropzone personalizado

Given un FileDropzone  
When recibe className para su raíz  
Then MUST conservar selección, drag and drop, error e input nativo

### Scenario 13: PasswordInput compuesto

Given un PasswordInput  
When se define su contrato de className  
Then la documentación y pruebas MUST indicar si personaliza root o input principal

### Scenario 14: Feedback personalizado

Given un Alert o EmptyState  
When recibe una clase externa  
Then MUST mantener semántica y estilos base

### Scenario 15: Navegación personalizada

Given Breadcrumbs, Stepper o Pagination  
When reciben className  
Then la clase MUST aplicarse al contenedor principal y la semántica MUST permanecer

### Scenario 16: Tabla personalizada

Given DataTable o una primitiva de tabla  
When recibe className  
Then MUST conservar semántica, responsive, loading, error y empty

### Scenario 17: Consumidor existente

Given una pantalla que usa un componente sin className  
When se actualizan los componentes compartidos  
Then la pantalla MUST continuar renderizando sin cambios obligatorios

### Scenario 18: Archivo administrativo

Given un archivo usado solo por `/admin/contests`  
When se reorganiza la feature  
Then MUST moverse bajo `features/contests/admin/`

### Scenario 19: Archivo de usuario real

Given un archivo usado solo por el área del usuario  
When se reorganiza la feature  
Then MUST ubicarse bajo `features/contests/user/`

### Scenario 20: Sin código de usuario

Given que no existe ningún archivo real de usuario  
When termina la reorganización  
Then `features/contests/user/` MUST no crearse vacía

### Scenario 21: Shared real

Given un componente consumido por admin y user sin políticas de rol  
When se clasifica  
Then MAY ubicarse bajo `features/contests/shared/`

### Scenario 22: Archivo ambiguo

Given un archivo sin clasificación comprobable  
When se diseña el movimiento  
Then MUST permanecer en su ubicación hasta resolver su boundary

### Scenario 23: Resumen administrativo

Given `ContestsSummaryCards`  
When se reorganiza contests  
Then MUST permanecer bajo admin y MUST no trasladarse a shared

### Scenario 24: Imports del router

Given una página administrativa movida  
When el router se compila  
Then MUST importar la nueva ubicación y la ruta MUST seguir funcionando

### Scenario 25: Import antiguo

Given movimientos completados  
When se busca una ruta anterior  
Then MUST no encontrarse ningún import activo hacia ella

### Scenario 26: Barrel circular

Given un reexport que genera un ciclo entre admin y shared  
When se revisa la API pública  
Then el reexport MUST eliminarse o sustituirse por un import directo

### Scenario 27: Regresión de administración

Given la nueva estructura  
When se abren listado, filtros, resumen y creación  
Then MUST conservarse el comportamiento previo

### Scenario 28: Documento movido

Given el documento del App Shell existente  
When se convierte en retrospectiva  
Then MUST existir en `docs/retrospectivas/retrospectiva-sprint-1.md`

### Scenario 29: Documento anterior eliminado

Given el movimiento completado  
When se inspecciona `docs/historias`  
Then el archivo anterior MUST no existir

### Scenario 30: Referencias actualizadas

Given documentos que enlazaban la ruta anterior  
When termina el movimiento  
Then todos MUST apuntar a la nueva retrospectiva

### Scenario 31: Starfish

Given la retrospectiva transformada  
When se revisa su estructura  
Then MUST contener las cinco categorías Starfish

### Scenario 32: Hecho no respaldado

Given una afirmación sin evidencia en código, tests o documentación  
When se redacta la retrospectiva  
Then MUST omitirse o marcarse como pendiente de validación

### Scenario 33: Acción SMART de componentes

Given la mejora de componentes extensibles  
When se documenta  
Then MUST incluir alcance, horizonte y mediciones técnicas verificables

### Scenario 34: Acción SMART de contests

Given la mejora de boundaries  
When se documenta  
Then MUST incluir clasificación, movimientos, regresión y mediciones

### Scenario 35: UJ-11 pendiente

Given la retrospectiva del Sprint 1  
When se documentan próximos pasos  
Then MUST indicar que la contribución parcial de UJ-11 aún no está implementada

### Scenario 36: Evidencia ausente

Given una captura no creada  
When se documenta su ruta  
Then MUST aparecer como pendiente y MUST no incluir un enlace roto

### Scenario 37: Validación completa

Given la implementación terminada  
When se ejecutan los checks requeridos  
Then format, lint, typecheck, tests, build y diff check MUST pasar

## Edge Cases

- Un componente exporta más de un elemento visual.
- `className` ya existe, pero se aplica al slot incorrecto.
- Las props se propagan después de un `className` fijo y lo sustituyen.
- Las props se propagan antes y permiten sobrescribir atributos internos críticos.
- Un consumidor depende accidentalmente de la sustitución completa de clases.
- Un componente usa `className` para un hijo en vez de su raíz.
- Un componente no tiene un único root DOM.
- Un componente retorna condicionalmente `img` o `div`, como Avatar.
- Un componente usa `cva`.
- Un componente tiene estilos inline.
- Un componente contiene un portal.
- Un componente no acepta props nativas por diseño.
- Una ref apunta actualmente a un input interno.
- Una tabla solo exporta DataTable y no primitivas.
- Una prueba espera una cadena completa de clases.
- `/dev/ui` depende de una API anterior.
- Un archivo de contests es usado por admin y tests, pero no por user.
- Un tipo parece compartido, pero representa un endpoint administrativo.
- Un helper tiene dependencias hacia React o routing.
- Un barrel existente reexporta rutas internas.
- Git no conserva una carpeta vacía.
- Existen cambios locales no reflejados en main.
- El documento fuente ya fue renombrado.
- La carpeta `docs/retrospectivas` ya existe localmente.
- Existen referencias al documento antiguo en artefactos OpenSpec.
- Un change relacionado está presente localmente pero no en main.
- La evidencia Starfish todavía no fue validada por el equipo.
- Un check global falla por deuda preexistente no tocada.

## Acceptance Criteria

- El inventario MUST cubrir todos los componentes visuales públicos.
- Cada componente aplicable MUST aceptar className opcional.
- Las clases predeterminadas MUST conservarse.
- Las clases externas MUST aplicarse.
- Los conflictos Tailwind MUST resolverse mediante la utilidad existente.
- Props nativas MUST preservarse.
- Eventos MUST preservarse.
- Disabled MUST preservarse.
- ARIA MUST preservarse.
- Refs existentes MUST preservarse.
- Formularios MUST continuar integrándose.
- Tablas MUST conservar semántica.
- Consumidores existentes MUST continuar compilando.
- `/dev/ui` MUST continuar funcionando.
- Los tests MUST verificar compatibilidad sin snapshots como única evidencia.
- Contests administrativo MUST quedar bajo un boundary claro.
- User MUST materializarse solo con código real.
- Shared MUST contener únicamente elementos compartidos reales.
- No MUST quedar imports antiguos, duplicados o ciclos.
- Administración y creación MUST pasar regresión.
- La retrospectiva MUST existir en la nueva ruta.
- El documento anterior MUST no existir.
- Las referencias MUST estar actualizadas.
- Starfish MUST contener cinco categorías.
- Las acciones SMART MUST ser medibles.
- UJ-11 MUST permanecer pendiente.
- Las evidencias MUST estar presentes o marcadas como pendientes.
- Todos los checks MUST pasar o un bloqueo preexistente no relacionado MUST documentarse sin declarar el change terminado.
- No MUST realizarse commit o push.

## Out of Scope

- Estadísticas del usuario.
- Tabla de envíos.
- Listado y filtros UJ-11.
- Endpoints nuevos.
- Nuevas rutas.
- Rediseño visual.
- Nueva librería UI.
- Backend y base de datos.
- Retrospectiva Sprint 2.
