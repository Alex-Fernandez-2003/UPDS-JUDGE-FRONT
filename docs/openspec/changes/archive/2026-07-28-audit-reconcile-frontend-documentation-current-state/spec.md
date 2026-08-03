# Spec

## Requirements

### Functional Requirements: audit-baseline-and-write-guard

- La auditoría MUST registrar el branch actual.
- La auditoría MUST registrar el estado inicial de Git.
- La auditoría MUST registrar archivos modificados preexistentes.
- La auditoría MUST registrar archivos no rastreados preexistentes.
- La auditoría MUST NOT restaurar, limpiar, mover o eliminar cambios preexistentes.
- La inspección del frontend MUST realizarse en modo lectura.
- Toda escritura MUST limitarse a `README.md` o a archivos textuales permitidos bajo `docs/`.
- `README.md` MUST ser la única excepción de escritura fuera de `docs/`.
- Una ruta modificada MUST ser `README.md` o comenzar con `docs/`.
- Las extensiones permitidas MUST limitarse a `.md`, `.txt`, `.rst`, `.adoc` y `.puml`.
- Una ruta modificada MUST NOT ser `docs/informe-final.tex`.
- Una ruta modificada MUST NOT comenzar con `docs/capturas/`.
- Una ruta modificada MUST NOT comenzar con `docs/images/`.
- Después de cada grupo de cambios MUST ejecutarse una verificación equivalente a:
  - `git status --short`;
  - `git diff --name-only`.
- La auditoría MUST detener correcciones nuevas cuando detecte una escritura fuera de la guardia.
- La auditoría MUST conservar cualquier modificación preexistente fuera del alcance.

### Functional Requirements: documentation-inventory

- La auditoría MUST inventariar todo el árbol `docs/`.
- La auditoría MUST leer completamente y reconciliar `README.md` como documento principal de entrada y de estado actual.
- `README.md` MUST contrastarse con `frontend/package.json`, configuración, router, layouts, features, componentes, servicios, tipos, mocks, tests y documentación reconciliada.
- `README.md` MUST documentar únicamente tecnologías, scripts, variables, rutas y capacidades verificables.
- `README.md` MUST separar las funcionalidades actuales de las propuestas futuras del Sprint 3.
- El inventario MUST incluir archivos rastreados y, cuando corresponda, archivos no rastreados preexistentes.
- Cada documento MUST clasificarse como uno de:
  - Documento de estado actual;
  - Documento histórico;
  - Historia de usuario;
  - Change activo;
  - Change archivado;
  - Retrospectiva;
  - Propuesta futura;
  - Backlog;
  - Arquitectura;
  - Diagrama;
  - Guía;
  - Evidencia;
  - Informe excluido.
- El inventario MUST registrar:
  - ruta;
  - tipo;
  - estado;
  - alcance temporal;
  - posibilidad de modificación;
  - referencias principales.
- Los archivos excluidos MUST permanecer en el inventario como excluidos, sin convertirse en objetivos de reconciliación.

### Functional Requirements: frontend-functional-inventory

- La auditoría MUST inspeccionar las áreas frontend reales.
- La auditoría MUST adaptar el inventario a las carpetas existentes.
- La ausencia de una ruta sugerida MUST registrarse sin inventar una equivalente.
- El inventario funcional MUST cubrir, cuando existan:
  - autenticación;
  - login;
  - registro;
  - persistencia de sesión;
  - guards;
  - roles y permisos visibles;
  - UserLayout;
  - AdminLayout;
  - AdminSidebar;
  - Acceso de Usuario;
  - concursos;
  - inscripción;
  - detalle;
  - problemas;
  - envíos;
  - historial global;
  - envíos contextuales;
  - ranking;
  - congelamiento;
  - polling;
  - paginación;
  - colores de globos;
  - edición;
  - navegación contextual;
  - administración de roles;
  - estados y veredictos;
  - errores contractuales;
  - rutas administrativas;
  - tests;
  - mocks.
- Cada capacidad MUST recibir un estado explícito:
  - IMPLEMENTADO;
  - IMPLEMENTADO CON LIMITACIONES;
  - PARCIAL;
  - PROPUESTO;
  - PENDIENTE;
  - FUERA DE ALCANCE;
  - SUSTITUIDO;
  - HISTÓRICO;
  - CONTRATO ASUMIDO COMO CORRECTO PARA ESTA AUDITORÍA.
- Un estado MUST incluir evidencia concreta.

### Functional Requirements: source-of-truth-hierarchy

- La auditoría MUST priorizar código actual sobre documentos de planificación.
- La auditoría MUST utilizar el router como fuente de verdad para rutas frontend.
- La auditoría MUST utilizar layouts y navegación para confirmar exposición visual.
- La auditoría MUST utilizar services, hooks y queries para confirmar consumo HTTP.
- La auditoría MUST utilizar tipos OpenAPI solo para contratos expuestos.
- La auditoría MUST NOT inferir ni auditar lógica interna backend o del juez desde tipos generados; ambos se asumen correctos.
- Tests y mocks MUST utilizarse como evidencia complementaria.
- Un mock MUST NOT prevalecer sobre el servicio de producción.
- Un change archivado MUST preservarse como evidencia histórica.
- Una historia MUST actualizarse cuando su estado actual comprobable contradiga su descripción.
- Backlog y retrospectivas MUST mantener separadas propuestas y entregas.

### Functional Requirements: history-reconciliation

- Cada archivo de `docs/historias/` MUST revisarse.
- La revisión MUST verificar:
  - identificador;
  - título;
  - objetivo;
  - estado documentado;
  - estado comprobable;
  - rutas;
  - componentes;
  - servicios;
  - hooks;
  - tests;
  - evidencias referenciadas;
  - change relacionado;
  - pendientes;
  - hotfixes posteriores.
- Una historia MUST NOT marcarse `IMPLEMENTADO` cuando la capacidad no exista.
- Una historia MAY marcarse `IMPLEMENTADO CON LIMITACIONES` cuando exista funcionalidad parcial operativa.
- Una historia MUST conservar su contexto original.
- Cuando un hotfix posterior cambie el comportamiento, SHOULD agregarse una nota o referencia.
- La auditoría MUST NOT atribuir retrospectivamente el hotfix al change original.
- Archivos o componentes movidos MUST actualizarse mediante su ruta actual.
- Una ruta anterior MAY conservarse dentro de una sección histórica claramente identificada.

### Functional Requirements: openspec-reconciliation

- La auditoría MUST inventariar changes activos.
- La auditoría MUST inventariar changes archivados.
- El estado documental MUST coincidir con la ubicación real del change.
- Una referencia a un change archivado como activo MUST corregirse.
- Una referencia a un change activo como cerrado MUST corregirse cuando no exista evidencia de archivo.
- Changes archivados MUST conservar intención, decisiones e incidencias originales.
- Una diferencia posterior SHOULD registrarse mediante una nota o referencia al change posterior.
- La auditoría MUST NOT reescribir masivamente artefactos archivados para reflejar el presente.
- Artefactos OpenSpec con paths rotos MAY corregirse cuando el cambio sea factual y verificable.

### Functional Requirements: retrospective-and-backlog-reconciliation

- Todas las retrospectivas MUST revisarse.
- Las retrospectivas MUST conservar resultados y validaciones de su momento.
- Acciones futuras MUST mantenerse separadas de funcionalidades implementadas.
- La retrospectiva Sprint 3 MUST conservar:
  - `Versiones estables de lenguajes: PROPUESTO, NO IMPLEMENTADO`;
  - `Actualización de datos personales: PROPUESTO, NO IMPLEMENTADO`.
- Esas propuestas MUST NOT aparecer en el inventario de capacidades implementadas.
- Esas propuestas MAY aparecer en backlog o trabajo futuro.
- Un componente parcial relacionado MUST documentarse como base parcial y no como implementación completa.
- La auditoría MUST NOT crear changes para dichas propuestas.

### Functional Requirements: route-audit

- La auditoría MUST inventariar paths del router real.
- Debe registrar:
  - path;
  - parámetros;
  - route builder;
  - layout;
  - guards;
  - página;
  - navegación que lo expone.
- Las rutas documentadas MUST contrastarse con el inventario.
- Una ruta inexistente MUST corregirse o marcarse histórica.
- Un parámetro antiguo MUST actualizarse cuando el router actual utilice otro.
- Una ruta frontend MUST NOT presentarse como endpoint backend.
- Wildcards y páginas 404 MUST incluirse.
- Rutas administrativas equivalentes al flujo de usuario MUST verificarse sin asumirlas.
- La navegación contextual MUST contrastarse con la ruta activa real.

### Functional Requirements: frontend-contract-audit

- La auditoría MUST inspeccionar services, hooks, queries, mappers, normalizadores, mocks y fixtures.
- Debe registrar endpoints tal como son consumidos por el frontend.
- Debe diferenciar:
  - ruta frontend;
  - endpoint HTTP;
  - tipo generado;
  - mapper de presentación.
- Los documentos MUST utilizar nombres contractuales actuales cuando sean verificables.
- Una afirmación exclusivamente backend MUST quedar fuera de evaluación y el contrato consumido MUST tratarse como correcto para esta auditoría.
- La auditoría MUST NOT completar campos contractuales que el frontend no consume.
- Las explicaciones históricas de lógica backend MAY conservarse sin convertirlas en hallazgos ni pendientes.
- Secretos, tokens y datos sensibles MUST excluirse del informe.

### Functional Requirements: test-and-validation-audit

- La auditoría MUST verificar los scripts reales en `frontend/package.json`.
- Solo MUST exigirse un comando cuando exista el script correspondiente.
- La auditoría MAY ejecutar:
  - `npm audit`;
  - `npm audit --audit-level=high`;
  - lint;
  - typecheck;
  - test;
  - build.
- La auditoría MUST NOT ejecutar:
  - `npm install`;
  - `npm update`;
  - `npm audit fix`;
  - `npm audit fix --force`;
  - `npm run api:types`;
  - formateadores globales.
- Debe inventariar archivos de tests.
- Debe identificar features cubiertas.
- Debe registrar tests omitidos cuando sean observables.
- Las cifras históricas MUST conservar fecha, change o contexto.
- El resultado actual MAY registrarse con fecha y comando.
- Un fallo preexistente MUST NOT atribuirse a las correcciones documentales.

### Functional Requirements: link-and-reference-audit

- La auditoría MUST revisar links Markdown.
- La auditoría MUST revisar anchors.
- La auditoría MUST revisar paths hacia frontend.
- La auditoría MUST revisar referencias a historias.
- La auditoría MUST revisar referencias a changes activos y archivados.
- La auditoría MUST revisar referencias a capturas.
- La auditoría MUST revisar referencias a imágenes.
- La auditoría MUST revisar referencias a `.puml`.
- Una referencia rota en un documento modificable MAY corregirse.
- Una captura inexistente MUST NOT crearse.
- Una imagen inexistente MUST NOT generarse.
- Una referencia inexistente MUST corregirse, eliminarse o marcarse pendiente según su contexto.
- Una ruta local absoluta actual SHOULD convertirse en ruta relativa.
- Una ruta local absoluta dentro de un log histórico MAY conservarse cuando no exponga datos sensibles y esté claramente contextualizada.

### Functional Requirements: excluded-files-protection

- `docs/informe-final.tex` MUST permanecer completamente excluido.
- La auditoría MUST NOT revisar en profundidad su contenido.
- La auditoría MUST NOT compilarlo.
- La auditoría MUST NOT modificarlo.
- La auditoría MUST NOT moverlo.
- La auditoría MUST NOT renombrarlo.
- La auditoría MUST NOT utilizarlo como documento objetivo.
- `docs/capturas/**` MUST permanecer sin modificaciones.
- `docs/images/**` MUST permanecer sin modificaciones.
- La auditoría MUST NOT cambiar metadatos deliberadamente en esos archivos.
- La auditoría MUST NOT agregar archivos a esas carpetas.
- La auditoría MUST NOT eliminar archivos de esas carpetas.

### Functional Requirements: plantuml-audit

- Los archivos `.puml` MAY inspeccionarse.
- Un `.puml` MUST modificarse solo ante una contradicción objetiva.
- La corrección MUST citar una fuente frontend concreta en el informe.
- Un `.puml` MUST NOT modificarse solo por estilo.
- La imagen PNG asociada MUST NOT regenerarse.
- El informe MUST registrar:
  - `Fuente PlantUML actualizada; regeneración de la imagen excluida del alcance`.
- Una desincronización no corregida MUST registrarse como hallazgo pendiente.

### Functional Requirements: audit-report

- La auditoría MUST crear un informe textual bajo `docs/auditorias/` o la convención real equivalente.
- El informe MUST incluir:
  1. Objetivo.
  2. Alcance.
  3. Restricciones.
  4. Metodología.
  5. Fuentes de verdad revisadas.
  6. Inventario funcional del frontend.
  7. Inventario documental.
  8. Matriz frontend-documentación.
  9. Historias revisadas.
  10. Changes activos.
  11. Changes archivados.
  12. Retrospectivas.
  13. Diagramas PlantUML.
  14. Rutas y navegación.
  15. Contratos consumidos por el frontend.
  16. Tests y validaciones.
  17. Enlaces y referencias.
  18. Contradicciones encontradas.
  19. Correcciones documentales aplicadas.
  20. Hallazgos no corregidos.
  21. Contratos externos asumidos como correctos.
  22. Documentos y carpetas excluidos.
  23. Recomendaciones.
  24. Estado final.
- La matriz MUST incluir:
  - Área;
  - Documento;
  - Afirmación anterior;
  - Estado comprobado;
  - Acción.
- Cada archivo modificado MUST enumerarse individualmente.
- Cada registro de modificación MUST incluir:
  - ruta;
  - hallazgo;
  - corrección;
  - fuente frontend.
- El informe MUST declarar los comandos realmente ejecutados.
- El informe MUST declarar validaciones no ejecutadas.
- El informe MUST declarar que el change queda activo pendiente de revisión manual.

### Non-Functional Requirements

- La auditoría MUST ser reproducible.
- Cada corrección MUST ser trazable.
- Cada cambio MUST tener evidencia.
- La auditoría MUST minimizar modificaciones.
- La auditoría MUST preservar autoría e historia.
- El informe MUST utilizar lenguaje técnico y neutral.
- El informe MUST evitar culpabilizar personas.
- El informe MUST evitar secretos y datos sensibles.
- Las afirmaciones MUST distinguir hecho frontend, inferencia y contrato externo asumido.
- Los paths MUST utilizar el formato relativo del repositorio cuando corresponda.
- La auditoría SHOULD evitar cambios de estilo no relacionados.
- La auditoría MUST dejar el change activo.
- La aprobación manual MUST permanecer pendiente.

## Behavior Scenarios

### Scenario 1: Escritura limitada a docs y README

Given Pi inspecciona todo el frontend  
When aplica correcciones  
Then solo MUST modificar `README.md` y documentos textuales permitidos dentro de `docs/`

### Scenario 2: Escritura fuera de docs y README

Given una operación propone modificar una ruta fuera de `docs/` que no sea exactamente `README.md`  
When se aplica la guardia de escritura  
Then la operación MUST detenerse y el archivo MUST permanecer intacto

### Scenario 3: Exclusión del informe final

Given `docs/informe-final.tex`  
When se ejecuta la auditoría  
Then MUST no modificarse, compilarse, moverse ni reconciliarse

### Scenario 4: Exclusión de capturas

Given una referencia incorrecta hacia `docs/capturas/`  
When se reconcilia el documento permitido  
Then MAY corregirse el enlace textual  
And MUST no modificarse ni agregarse una captura

### Scenario 5: Exclusión de imágenes

Given archivos bajo `docs/images/`  
When se revisan diagramas  
Then MUST no modificarse ni regenerarse ningún PNG

### Scenario 6: PlantUML contradictorio

Given un `.puml` contradice objetivamente el frontend  
When existe evidencia concreta  
Then la fuente textual MAY actualizarse  
And la imagen PNG MUST no regenerarse

### Scenario 7: PlantUML solo desactualizado visualmente

Given un `.puml` representa correctamente la arquitectura  
When solo existe una preferencia estética  
Then MUST permanecer sin cambios

### Scenario 8: Propuesta de lenguajes del Sprint 3

Given la retrospectiva propone versiones estables de lenguajes  
When se reconcilia la documentación  
Then MUST permanecer marcada como `PROPUESTO, NO IMPLEMENTADO`

### Scenario 9: Propuesta de datos personales del Sprint 3

Given la retrospectiva propone actualización de datos personales  
When se reconcilia la documentación  
Then MUST permanecer marcada como `PROPUESTO, NO IMPLEMENTADO`

### Scenario 10: Componente parcial relacionado

Given existe una base visual o componente parcial relacionado con una propuesta  
When se actualiza el estado documental  
Then MUST describirse como base parcial  
And MUST no declararse la funcionalidad completa

### Scenario 11: Afirmación exclusivamente backend

Given un documento afirma un comportamiento exclusivamente backend o del juez  
When se realiza la auditoría  
Then MUST quedar fuera de evaluación  
And el contrato consumido por el frontend MUST asumirse correcto  
And MUST NOT registrarse como error, pendiente o limitación general

### Scenario 12: Tipo OpenAPI disponible

Given un tipo generado expone un campo contractual  
When se revisa la documentación  
Then MAY confirmarse que el frontend consume ese campo  
And MUST no inferirse la implementación interna del backend

### Scenario 13: Change archivado con diferencia actual

Given un change archivado  
When se encuentra una diferencia con el estado actual  
Then MUST preservarse su intención histórica  
And SHOULD registrarse la corrección posterior mediante nota o referencia

### Scenario 14: Historia con ruta antigua

Given una historia documenta una ruta que ya no existe  
When el router actual contiene una ruta sustituta  
Then la historia MUST registrar la ruta actual  
And MAY conservar la anterior como contexto histórico

### Scenario 15: Archivo frontend movido

Given una historia referencia un componente inexistente  
When se localiza su ubicación actual  
Then la referencia MUST actualizarse a la ruta real

### Scenario 16: Archivo frontend no localizado

Given una historia referencia un archivo inexistente  
When no se encuentra una sustitución verificable  
Then MUST registrarse el hallazgo  
And MUST no inventarse una ruta nueva

### Scenario 17: Evidencia inexistente

Given un documento referencia una captura inexistente  
When el archivo no existe  
Then MUST no crearse una evidencia artificial  
And MUST corregirse o aclararse la referencia documental

### Scenario 18: Cifra histórica de tests

Given un documento afirma `139 tests` dentro de un change histórico  
When la suite actual tiene otra cantidad  
Then la cifra histórica MUST conservar su contexto  
And MUST no presentarse como cantidad permanente

### Scenario 19: Resultado actual de tests

Given se ejecuta la suite durante la auditoría  
When se registra el resultado  
Then MUST incluirse el comando y el contexto temporal de la auditoría

### Scenario 20: Script inexistente

Given el briefing sugiere un comando  
When `package.json` no contiene el script  
Then el comando MUST no ejecutarse  
And el informe MUST registrar su ausencia

### Scenario 21: Ruta frontend documentada como endpoint

Given un documento confunde una ruta de página con un endpoint HTTP  
When se reconcilia  
Then MUST separarse la ruta frontend del contrato HTTP

### Scenario 22: Mock contradice el servicio

Given un mock utiliza un path distinto al servicio de producción  
When se determina el estado contractual consumido  
Then el servicio de producción MUST prevalecer  
And la contradicción MUST registrarse

### Scenario 23: Change activo referenciado como archivado

Given un documento afirma que un change activo fue archivado  
When su carpeta permanece activa  
Then la referencia MUST corregirse

### Scenario 24: Change archivado referenciado como activo

Given un documento referencia como activo un change ubicado en archive  
When se reconcilia  
Then la referencia MUST actualizarse sin reescribir su historia

### Scenario 25: Archivo excluido detectado en diff

Given el diff contiene `docs/informe-final.tex`, `docs/capturas/**` o `docs/images/**`  
When se ejecuta la guardia final  
Then el change MUST considerarse no válido hasta retirar esas modificaciones

### Scenario 26: Código frontend detectado en diff

Given el diff contiene una ruta bajo `frontend/` introducida por la auditoría  
When se valida el alcance  
Then el change MUST considerarse no válido hasta retirar esa modificación

### Scenario 27: Corrección sin evidencia

Given una corrección documental propuesta no tiene fuente frontend ni fuente histórica suficiente  
When se revisa  
Then la corrección MUST no aplicarse  
And el punto MUST registrarse como pendiente documental sin cuestionar backend ni juez

### Scenario 28: Informe de auditoría

Given la reconciliación documental fue aplicada  
When se cierra la fase automática  
Then MUST existir el informe con cada archivo modificado registrado

### Scenario 29: Fin de la ejecución

Given las validaciones documentales terminaron  
When se determina el estado del change  
Then MUST permanecer activo  
And la revisión manual del responsable MUST quedar pendiente

## Edge Cases

- El repositorio tiene cambios preexistentes bajo `docs/`.
- El repositorio tiene cambios preexistentes bajo `frontend/`.
- Existe un archivo no rastreado con el mismo nombre del informe.
- `docs/auditorias/` no existe.
- Existe más de un directorio de archivo de changes.
- Un change archivado contiene enlaces relativos válidos solo desde su ubicación anterior.
- Un documento tiene el mismo identificador de historia que otro.
- Una historia fue renombrada con espacios, mayúsculas o acentos.
- Una ruta aparece solo en tests, pero no en el router de producción.
- Una página existe, pero no está conectada al router.
- Un componente existe, pero no se exporta ni consume.
- Un servicio existe, pero no tiene consumidores.
- Un mock representa una funcionalidad no conectada.
- Una feature está implementada pero detrás de permisos no disponibles al usuario normal.
- Un tipo OpenAPI está generado pero no se consume.
- Un `.puml` incluye backend y frontend en el mismo diagrama.
- La imagen PNG no corresponde al `.puml`.
- Una captura existe con nombre distinto al documentado.
- Un anchor Markdown contiene caracteres especiales.
- Un link relativo funciona desde un archivo pero no desde otro.
- Una ruta absoluta local aparece en un bloque histórico.
- El comando de tests cambia entre scripts.
- Audit requiere acceso de red y no puede completarse.
- La suite de tests falla por un error preexistente.
- Build falla por configuración del entorno.
- Un documento histórico contiene una afirmación backend fuera del alcance de evaluación.
- Una propuesta futura tiene componentes base parcialmente creados.

## Acceptance Criteria

- Todo el frontend MUST haber sido inspeccionado en modo lectura.
- Todo `docs/` MUST haber sido inventariado.
- `README.md` MUST haber sido leído completamente y reconciliado contra el frontend actual.
- Solo MUST proponerse y aplicarse escritura en `README.md` y documentos textuales permitidos dentro de `docs/`.
- `README.md` MUST ser la única ruta modificada fuera de `docs/`.
- `docs/informe-final.tex` MUST permanecer sin modificaciones.
- `docs/capturas/` MUST permanecer sin modificaciones.
- `docs/images/` MUST permanecer sin modificaciones.
- No MUST agregarse capturas ni evidencias.
- Los `.puml` MUST modificarse solo ante contradicción demostrada.
- No MUST regenerarse PNG.
- Las rutas documentadas MUST coincidir con el router actual o quedar marcadas como históricas.
- Los archivos frontend referenciados MUST existir o quedar registrados como hallazgo.
- Los estados de historias MUST ser coherentes con la evidencia frontend.
- Los changes activos y archivados MUST estar correctamente referenciados.
- Las cifras históricas de tests MUST conservar contexto.
- Las propuestas del Sprint 3 MUST permanecer no implementadas.
- Los contratos consumidos MUST describirse sin auditar backend ni juez, que se asumen correctos.
- El informe de auditoría MUST existir.
- Cada archivo modificado MUST estar registrado individualmente.
- No MUST modificarse código.
- No MUST modificarse dependencias.
- No MUST ejecutarse generación OpenAPI.
- No MUST archivarse el change.
- La revisión manual MUST quedar pendiente.
- El diff final MUST cumplir la guardia de rutas.
- Los enlaces locales de `README.md` MUST existir y sus scripts, tecnologías, variables y rutas MUST estar respaldados por el frontend.
- El informe MUST declarar las validaciones ejecutadas y no ejecutadas.

## Out of Scope

- Código frontend.
- Backend.
- Base de datos.
- Juez.
- Dependencias.
- Generación OpenAPI.
- Informe final LaTeX.
- Capturas.
- Imágenes PNG.
- Nuevas evidencias.
- Funcionalidades de lenguajes.
- Pantalla de perfil.
- Changes funcionales adicionales.
- Commit, push y archive.
