# Design

## Components Touched

### Artefactos del change

- `proposal.md`
- `spec.md`
- `design.md`
- `tasks.md`

### Informe de auditoría

Ubicación preferida:

- `docs/auditorias/auditoria-documentacion-frontend-estado-actual.md`

La ubicación debe adaptarse si ya existe una convención equivalente.

### Documentos susceptibles de corrección

- `README.md` de la raíz, como documento principal de entrada y de estado actual;
- historias;
- changes activos;
- changes archivados;
- retrospectivas;
- backlog;
- sprints;
- arquitectura;
- guías;
- documentos de estado actual;
- fuentes PlantUML contradictorias.

### Fuentes inspeccionadas en modo lectura

- router;
- layouts;
- navegación;
- features;
- componentes;
- domain;
- lib;
- auth;
- services;
- hooks;
- queries;
- mappers;
- tipos;
- tests;
- mocks;
- configuración.

### Límites y exclusiones

- destinos permitidos: `README.md`, `docs/**/*.md`, `docs/**/*.txt`, `docs/**/*.rst`, `docs/**/*.adoc` y `docs/**/*.puml`;
- `README.md` como única excepción de escritura fuera de `docs/`;
- `frontend/**` como objetivo de escritura;
- `docs/informe-final.tex`;
- `docs/capturas/**`;
- `docs/images/**`.

## Boundaries Respected

- El frontend es fuente de verdad operativa, pero permanece read-only.
- La auditoría modifica documentación, no comportamiento.
- Los contratos consumidos por el frontend se asumen correctos; no se auditan backend ni juez ni se infiere su lógica interna.
- Changes archivados son registros históricos, no documentos de estado actual.
- Retrospectivas son registros temporales y de aprendizaje.
- Historias pueden representar estado actual, parcial o histórico según su contenido.
- Backlog y propuestas futuras no deben mezclarse con capacidades implementadas.
- `.puml` es fuente textual.
- `.png` es salida visual excluida.
- Capturas son evidencias manuales excluidas.
- `informe-final.tex` pertenece a un change posterior separado.
- El informe de auditoría registra hechos, no sustituye todos los documentos existentes.
- La revisión humana es una frontera obligatoria antes de cualquier archivo o archive posterior.

## Contracts Changed

No external contract changes are confirmed from the provided input.

Este change no modifica:

- APIs;
- rutas frontend;
- tipos TypeScript;
- servicios;
- hooks;
- schemas;
- componentes;
- configuración;
- contratos backend.

Solo cambia contratos documentales internos, como:

- estado declarado de una historia;
- ruta textual documentada;
- referencia a archivo;
- enlace Markdown;
- relación entre change e historia;
- nota histórica;
- clasificación de una propuesta;
- fuente PlantUML contradictoria.

## Data Flow

### Flujo de auditoría

- Registrar baseline Git.
- Construir lista permitida y lista excluida.
- Inventariar `docs/`.
- Auditar `README.md` completo contra el frontend actual.
- Clasificar documentos.
- Inventariar frontend en modo lectura.
- Inventariar rutas.
- Inventariar contratos consumidos.
- Inventariar tests y mocks.
- Construir matriz frontend-documentación.
- Clasificar hallazgos.
- Definir correcciones mínimas.
- Aplicar correcciones por grupos.
- Verificar guardia de escritura tras cada grupo.
- Crear informe.
- Ejecutar validaciones permitidas.
- Revisar diff final.
- Dejar revisión manual pendiente.

### Flujo por afirmación documental

- Localizar afirmación.
- Identificar tipo de documento.
- Identificar fuente de verdad aplicable.
- Clasificar el resultado:
  - confirmado;
  - contradicho;
  - histórico;
  - parcialmente confirmado;
  - contrato asumido como correcto para esta auditoría.
- Elegir acción:
  - conservar;
  - actualizar;
  - añadir nota;
  - corregir enlace;
  - aclarar el límite frontend y el contrato asumido;
  - registrar pendiente.
- Registrar la decisión en el informe.

## Jerarquía de Fuentes

La auditoría debe aplicar esta prioridad:

1. Código de producción actual.
2. Router actual.
3. Layouts y navegación actual.
4. Features y componentes consumidos.
5. Services HTTP.
6. Hooks, queries y mutations.
7. Tipos OpenAPI generados.
8. Tests actuales.
9. Mocks y fixtures.
10. Configuración.
11. Changes archivados.
12. Changes activos.
13. Historias.
14. Retrospectivas.
15. Backlog y planificación.

La jerarquía no elimina el contexto temporal. Un change archivado puede ser correcto históricamente aunque ya no represente el presente.

## Clasificación Documental

| Clasificación              | Propósito                                      | Política de actualización         |
| -------------------------- | ---------------------------------------------- | --------------------------------- |
| Documento principal de entrada | Presenta el repositorio y el estado vigente | Reconciliar con el frontend |
| Documento de estado actual | Describe el sistema vigente                    | Reconciliar con el frontend       |
| Documento histórico        | Registra un momento anterior                   | Preservar y añadir notas          |
| Historia de usuario        | Registra objetivo, implementación y pendientes | Actualizar estado y referencias   |
| Change activo              | Plan de trabajo no archivado                   | Corregir referencias factuales    |
| Change archivado           | Evidencia histórica cerrada                    | Evitar reescritura retrospectiva  |
| Retrospectiva              | Aprendizaje temporal                           | Preservar propuestas y resultados |
| Propuesta futura           | Trabajo no implementado                        | Mantener como propuesto           |
| Backlog                    | Priorización futura                            | No convertir en capacidad actual  |
| Arquitectura               | Describe estructura y límites                  | Reconciliar contradicciones       |
| Diagrama                   | Representación textual o visual                | `.puml` modificable; PNG excluido |
| Guía                       | Instrucciones operativas                       | Actualizar paths y comandos       |
| Evidencia                  | Captura o referencia manual                    | No modificar archivos binarios    |
| Informe excluido           | Documento fuera del alcance                    | No revisar ni modificar           |

## Inventario Funcional

Cada capacidad debe registrar:

| Área | Evidencia de código | Ruta | Layout | Servicios | Tests | Estado |
| ---- | ------------------- | ---- | ------ | --------- | ----- | ------ |

Estados permitidos:

- IMPLEMENTADO
- IMPLEMENTADO CON LIMITACIONES
- PARCIAL
- PROPUESTO
- PENDIENTE
- FUERA DE ALCANCE
- SUSTITUIDO
- HISTÓRICO
- CONTRATO ASUMIDO COMO CORRECTO PARA ESTA AUDITORÍA

Un estado debe incluir una explicación breve y fuentes.

## Matriz Frontend-Documentación

Formato obligatorio:

| Área | Documento | Afirmación anterior | Estado comprobado | Acción |
| ---- | --------- | ------------------- | ----------------- | ------ |

La matriz debe incluir como mínimo:

- auth;
- rutas;
- layouts;
- roles;
- concursos;
- inscripción;
- Problems;
- Submissions;
- ranking;
- edición;
- administración de roles;
- documentación de sprints;
- propuestas futuras.

## Estrategia de Reconciliación

### Documentos de estado actual

- Actualizar afirmaciones contradictorias.
- Corregir rutas y archivos.
- Eliminar referencias operativas obsoletas.
- Mantener pendientes reales.

### Historias

- Preservar el objetivo original.
- Actualizar el estado comprobable.
- Registrar hotfixes y changes posteriores.
- Separar implementado de pendiente.
- Corregir archivos, rutas y tests.

### Changes activos

- Corregir paths rotos.
- Corregir referencias a archivos inexistentes.
- No alterar alcance salvo contradicción factual.

### Changes archivados

- Preservar su contenido histórico.
- Añadir nota posterior cuando sea necesario.
- Evitar cambiar resultados o validaciones del momento.
- Corregir únicamente referencias rotas que impidan comprensión.

### Retrospectivas

- Mantener resultados y aprendizajes.
- Mantener propuestas futuras como propuestas.
- Evitar convertir acciones sugeridas en entregas.

### Backlog

- Mantener prioridades futuras.
- Marcar elementos implementados solo con evidencia.
- No crear nuevos changes.

### Arquitectura y PlantUML

- Actualizar únicamente contradicciones.
- Registrar la evidencia.
- No regenerar imágenes.

## Alternativas de Reconciliación Histórica

### Alternativa A: reescribir el documento histórico

**Ventajas**

- El documento refleja el estado actual.

**Desventajas**

- Borra contexto.
- Distorsiona decisiones originales.
- Puede atribuir hotfixes al change incorrecto.

### Alternativa B: conservarlo sin correcciones

**Ventajas**

- Mantiene autenticidad histórica.

**Desventajas**

- Puede conservar rutas rotas o estados engañosos.

### Alternativa C: conservar y añadir una nota posterior

**Ventajas**

- Preserva historia.
- Explica el estado actual.
- Mantiene trazabilidad.

**Desventajas**

- Añade longitud.

### Decisión recomendada

Utilizar la Alternativa C para cambios de comportamiento posteriores. Utilizar corrección directa únicamente para errores factuales que no forman parte de la intención histórica.

## Auditoría de Rutas

Debe producirse una matriz:

| Ruta | Parámetros | Builder | Layout | Guard | Página | Navegación |
| ---- | ---------- | ------- | ------ | ----- | ------ | ---------- |

Las afirmaciones documentales se comparan contra esta matriz.

No debe mezclarse con endpoints HTTP.

## Auditoría de Contratos Frontend

Debe producirse una matriz:

| Servicio | Endpoint consumido | Tipo | Hook/query | Consumidor | Evidencia |
| -------- | ------------------ | ---- | ---------- | ---------- | --------- |

Limitaciones:

- No confirmar controllers.
- No confirmar implementación de negocio backend.
- No confirmar base de datos.
- No confirmar lógica del juez.
- No completar campos ausentes.

## Auditoría de Tests

Debe producirse:

| Archivo de test | Feature | Tipo | Estado observable | Documento relacionado |
| --------------- | ------- | ---- | ----------------- | --------------------- |

Los resultados de ejecución deben registrar:

- comando;
- fecha o contexto;
- cantidad de archivos;
- cantidad de tests;
- fallos;
- warnings;
- limitaciones del entorno.

Las cifras antiguas permanecen históricas.

## Auditoría de Enlaces

Cada enlace debe clasificarse:

- válido;
- roto;
- histórico;
- excluido;
- pendiente;
- contrato externo asumido como correcto.

Referencias a capturas o imágenes solo pueden corregirse textualmente.

## Guardia de Escritura

Antes de guardar un archivo:

- Confirmar que es `README.md` o comienza con `docs/`.
- Si está fuera de `docs/`, confirmar que sea exactamente `README.md`.
- Confirmar que su extensión está permitida.
- Confirmar que no es `docs/informe-final.tex`.
- Confirmar que no pertenece a `docs/capturas/`.
- Confirmar que no pertenece a `docs/images/`.
- Confirmar que es textual.
- Confirmar que existe un hallazgo respaldado.
- Confirmar que el archivo no contiene cambios preexistentes conflictivos sin coordinación.

Después de cada grupo:

- revisar `git status --short`;
- revisar `git diff --name-only`;
- revisar el contenido del diff documental.

## Informe de Auditoría

Estructura requerida:

1. Objetivo.
2. Alcance.
3. Restricciones.
4. Metodología.
5. Fuentes de verdad revisadas.
6. Inventario funcional.
7. Inventario documental.
8. Matriz frontend-documentación.
9. Historias revisadas.
10. Changes activos.
11. Changes archivados.
12. Retrospectivas.
13. Diagramas PlantUML.
14. Rutas y navegación.
15. Contratos frontend.
16. Tests y validaciones.
17. Enlaces y referencias.
18. Contradicciones.
19. Correcciones.
20. Hallazgos no corregidos.
21. Contratos externos asumidos.
22. Exclusiones.
23. Recomendaciones.
24. Estado final.

### Registro por archivo

| Ruta | Hallazgo | Corrección | Fuente frontend |
| ---- | -------- | ---------- | --------------- |

No se permiten comodines.

## Required Tests Per Layer

### Guardia de alcance

- Validar que todas las rutas modificadas sean `README.md` o documentos textuales permitidos bajo `docs/`.
- Validar que `README.md` sea la única ruta modificada fuera de `docs/`.
- Validar que no haya cambios bajo `frontend/`.
- Validar que no haya cambios en archivos excluidos.

### Validación documental

- Verificar que los links corregidos resuelvan.
- Verificar que las rutas frontend existan.
- Verificar que los archivos referenciados existan.
- Verificar estados de historias.
- Verificar ubicación de changes activos y archivados.
- Verificar propuestas del Sprint 3.

### Validación PlantUML

- Comparar texto con router y arquitectura.
- Verificar que no cambien PNG.
- Registrar la nota de no regeneración.

### Validaciones del proyecto

Si los scripts existen y el entorno lo permite:

- audit;
- lint;
- typecheck;
- tests;
- build.

Estas validaciones sirven como evidencia del estado, no como autorización para modificar código.

### Validación manual

- Revisión del inventario.
- Revisión de la matriz.
- Revisión de cada archivo modificado.
- Revisión de contratos consumidos y límites de la auditoría frontend.
- Aprobación expresa antes de archivar.

## Tradeoffs Accepted

- El backend y el juez no se auditarán y se asumirán correctos.
- Las conclusiones se limitarán al comportamiento visible y a los contratos consumidos por el frontend.
- No se regenerarán imágenes aun cuando un `.puml` cambie.
- No se crearán evidencias manuales nuevas.
- Los documentos históricos pueden conservar afirmaciones anteriores con notas aclaratorias.
- No todos los documentos necesitarán cambios.
- El informe centralizará hallazgos que no justifiquen modificar el documento de origen.
- El change permanecerá activo después de la reconciliación automática.

## Implementation Constraints

- No modificar código.
- No modificar dependencias.
- No ejecutar generación OpenAPI.
- No ejecutar comandos de instalación.
- No ejecutar formateo global.
- No modificar el informe final.
- No modificar capturas.
- No modificar imágenes.
- No crear evidencias.
- No inventar backend.
- No crear changes funcionales.
- No archivar.
- No hacer commit.
- No hacer push.
- Preservar cambios preexistentes.
- Registrar cada modificación.
- Mantener revisión manual pendiente.

## Open Design Questions

- ¿Existe ya `docs/auditorias/` y qué convención de nombres utiliza?
- ¿Cuál es la ubicación real de changes archivados?
- ¿Existen documentos de estado actual que deban prevalecer sobre historias?
- ¿Qué extensiones textuales adicionales existen bajo `docs/`?
- ¿Hay modificaciones preexistentes en documentos que requieran coordinación?
- ¿La retrospectiva Sprint 3 tiene un nombre o ubicación diferente?
- ¿Existen links absolutos históricos que deban conservarse?
- ¿Qué scripts reales están definidos en `frontend/package.json`?
- ¿El audit puede ejecutarse sin modificar el lockfile?
- ¿Existen `.puml` que combinen frontend actual con componentes backend o juez asumidos correctos?
- ¿Existe un proceso formal de aprobación documental antes de archivar?
