# Design

## Consolidation Strategy

La consolidación debe seguir un enfoque incremental:

1. Inspeccionar el informe actual.
2. Inventariar contenido válido e incompleto.
3. Inventariar las fuentes reconciliadas.
4. Construir un esquema académico sin contenido duplicado.
5. Construir la matriz de trazabilidad antes de redactar resultados.
6. Incorporar diseño, Scrum, planificación y riesgos.
7. Integrar figuras existentes.
8. Completar resultados, limitaciones y conclusiones.
9. Compilar.
10. Inspeccionar visualmente.
11. Corregir y recompilar.
12. Mantener la revisión manual pendiente.

Cada sección debe redactarse después de identificar sus fuentes. No debe redactarse una narrativa completa basándose únicamente en el índice propuesto.

## Source Hierarchy

### Estado actual

1. Informe de auditoría documental aprobado.
2. `guia.md`, para despliegue, configuración, servicios y enlaces, subordinada a documentación final más reciente cuando exista contradicción.
3. README reconciliado.
4. Historias reconciliadas.
5. Changes archivados y hotfixes.
6. Retrospectivas.
7. Diagramas aprobados.
8. Código frontend actual, solo como comprobación.
9. Contratos frontend existentes.
10. Síntesis de entrevista y enlace de audio autorizados por el responsable.

### Requerimientos iniciales

1. RF-01 a RF-27 y RNF-01 a RNF-19 transcritos en este briefing.
2. Historias iniciales.
3. Product Backlog.

### Estructura académica

1. Índice detallado incorporado en este briefing.
2. Estructura SRS incorporada en este briefing.
3. Convenciones existentes de `docs/informe-final.tex`.

Cuando dos fuentes entren en conflicto:

- el estado actual debe seguir la documentación reconciliada;
- la intención inicial debe conservarse en la sección de requerimientos;
- la desviación debe explicarse en trazabilidad;
- la historia no debe reescribirse desde el informe.

## Final Report Structure

### Material preliminar

- Portada.
- Revisión histórica.
- Resumen ejecutivo.
- Abstract, solo si corresponde.
- Índice general.
- Índice de figuras.
- Índice de tablas.

### Fase I — Fundamentos y alcance

1. Introducción y objetivos.
   - Propósito.
   - Antecedentes.
   - Problema.
   - Alcance.
   - Objetivo general.
   - Objetivos específicos.
   - Product Goal.
   - Organización del documento.
2. Toma de requerimientos.
   - Técnicas.
   - Entrevista y evidencia de audio autorizada.
   - Actores.
   - Stakeholders.
   - Glosario.
   - Supuestos.
   - Dependencias.
   - Restricciones.

### Fase II — Especificación funcional

1. Descripción general.
   - Perspectiva.
   - Características.
   - Clases de usuario.
   - Interfaces externas.
   - Interfaces de usuario.
2. Requerimientos.
   - RF iniciales.
   - RNF iniciales.
   - Estado de cumplimiento.
   - Desviaciones.
   - RF-02.
   - Matriz de trazabilidad.
3. Casos de uso y modelado.
   - Diagrama general.
   - Casos principales.
   - Flujos básicos y alternativos.
   - Relación con historias.

### Fase III — Diseño

1. Arquitectura.
   - Visión general.
   - Frontend.
   - Backend asumido correcto.
   - Motor de evaluación.
   - Comunicación.
   - Seguridad.
2. Modelado.
   - Clases.
   - Objetos, cuando exista.
   - Secuencia o actividad.
   - Modelo de datos.
   - Diccionario o referencia.

### Fase IV — Gestión ágil

1. Scrum.
   - Organización.
   - Roles.
   - RACI.
   - Product Backlog.
   - Product Goal.
   - Sprint Backlogs.
   - Sprint Goals.
2. Ejecución.
   - Sprint 0.
   - Sprint 1.
   - Sprint 2.
   - Sprint 3.
   - Reviews.
   - Retrospectivas.
   - Acciones futuras no implementadas.

### Fase V — Planificación y control

1. Planificación temporal.
    - Gantt general.
    - Gantt de historias.
    - Hitos.
2. Riesgos.
    - Metodología.
    - Registro priorizado.
    - Matriz probabilidad-impacto.
    - Mitigaciones.
    - Riesgos residuales.

### Fase VI — Implementación, validación y cierre

1. Implementación final.
    - Tecnologías.
    - Despliegue y reproducibilidad.
    - Recursos digitales y guías externas.
    - Módulos.
    - Autenticación.
    - Concursos.
    - Problemas.
    - Envíos.
    - Ranking.
    - Administración.
    - Integración frontend.
2. Calidad.
    - Estrategia.
    - Pruebas automatizadas.
    - Validaciones manuales documentadas.
    - Incidencias.
    - Hotfixes.
    - Limitaciones.
    - Trazabilidad final.
3. Resultados.
    - Objetivos alcanzados.
    - Requerimientos cumplidos.
    - Requerimientos parciales.
    - No implementados.
    - Trabajo futuro.
4. Conclusiones y recomendaciones.

### Anexos

- Glosario.
- Referencias a trazabilidad.
- Índice o referencia de historias.
- Diagramas.
- Planificación.
- Riesgos.
- Referencias documentales.

Las tablas completas deben tener una única ubicación canónica.

## Requirements Traceability

### Seed de requerimientos funcionales

- RF-01 Registro e inicio de sesión.
- RF-02 Gestión de perfiles.
- RF-03 Listado de concursos.
- RF-04 Visualización del concurso.
- RF-05 Participación en concursos.
- RF-06 Listado de problemas.
- RF-07 Descarga del conjunto de problemas.
- RF-08 Envío de soluciones.
- RF-09 Selección de lenguaje.
- RF-10 Evaluación automática.
- RF-11 Verificación de casos de prueba.
- RF-12 Resultado del envío.
- RF-13 Historial de envíos.
- RF-14 Ranking del concurso.
- RF-15 Administración de problemas.
- RF-16 Administración de casos de prueba.
- RF-17 Gestión de usuarios.
- RF-18 Upsolving.
- RF-19 Consulta de resultados.
- RF-20 Administración de roles.
- RF-21 Administración de concursos.
- RF-22 Participación del usuario.
- RF-23 Control del estado del concurso.
- RF-24 Acceso a concursos.
- RF-25 Validación de archivos.
- RF-26 Consulta del estado de los envíos.
- RF-27 Gestión de participantes.

### Seed de requerimientos no funcionales

- RNF-01 Rendimiento.
- RNF-02 Escalabilidad.
- RNF-03 Disponibilidad.
- RNF-04 Seguridad.
- RNF-05 Integridad de la evaluación.
- RNF-06 Aislamiento de ejecución.
- RNF-07 Compatibilidad.
- RNF-08 Usabilidad.
- RNF-09 Mantenibilidad.
- RNF-10 Portabilidad.
- RNF-11 Persistencia.
- RNF-12 Disponibilidad del motor.
- RNF-13 Auditoría.
- RNF-14 Extensibilidad.
- RNF-15 Concurrencia.
- RNF-16 Stack backend.
- RNF-17 Stack frontend.
- RNF-18 Base de datos.
- RNF-19 Arquitectura de evaluación.

### Matriz canónica

| ID  | Requerimiento inicial | Tipo | Estado final | Evidencia documental | Historia/change | Observaciones |
| --- | --------------------- | ---- | ------------ | -------------------- | --------------- | ------------- |

La matriz debe estar en el cuerpo, cerca del análisis de cumplimiento, salvo que el tamaño final justifique ubicarla íntegramente en anexos y dejar en el cuerpo un resumen con referencia.

## Treatment of RF-02

RF-02 debe aparecer en:

- matriz: `NO IMPLEMENTADO`;
- desviaciones;
- requerimientos no implementados;
- limitaciones;
- trabajo futuro;
- recomendaciones.

No debe aparecer en:

- objetivos alcanzados;
- entregables;
- módulos implementados;
- validaciones completadas.

Texto conceptual:

- La visualización o edición de información básica de perfil no fue implementada como flujo funcional.
- La actualización de datos personales fue identificada como acción futura durante la retrospectiva del Sprint 3.
- La capacidad no forma parte del producto entregado.

## Treatment of RF-22

Estrategia preferida:

| Subcapacidad               | Estado                       |
| -------------------------- | ---------------------------- |
| Consultar concursos        | Según evidencia reconciliada |
| Visualizar concurso        | Según evidencia reconciliada |
| Descargar PDF              | Según evidencia reconciliada |
| Enviar soluciones          | Según evidencia reconciliada |
| Consultar estado de envíos | Según evidencia reconciliada |
| Consultar ranking          | Según evidencia reconciliada |
| Consultar historial        | Según evidencia reconciliada |
| Editar perfil              | NO IMPLEMENTADO              |

El estado principal será `IMPLEMENTADO PARCIALMENTE`.

Cuando el formato del informe no permita el desglose, debe incluirse una observación equivalente que identifique expresamente la capacidad pendiente.

## Actors

Los actores iniciales y su interpretación autorizada son:

- **Administrador de Roles —docente o líder de club—:** consulta y gestiona cuentas dentro de los permisos documentados; asigna el rol Administrador de Concursos a docentes o líderes; administra roles y contribuye a la integridad global. No se le atribuye acceso funcional irrestricto.
- **Administrador de Concursos —docente u organizador—:** crea y edita concursos; configura privacidad, información y duración; incorpora el PDF; administra problemas y casos ZIP; gestiona participantes y visibilidad de resultados cuando el contrato lo permite; consulta herramientas administrativas.
- **Usuario —estudiante o participante—:** se registra, inicia sesión, consulta y accede a concursos conforme a sus reglas; descarga el PDF; consulta problemas; selecciona lenguajes permitidos; envía soluciones; consulta veredictos, historial y ranking; y realiza upsolving cuando corresponde. La edición de información personal queda excluida.

Sus responsabilidades deben reconciliarse con roles, navegación y módulos documentados, sin cambiar la intención inicial. Los actores funcionales y roles de autorización no deben confundirse con roles Scrum ni con responsabilidades RACI.

## Language Scope

El alcance inicial debe registrar:

- C++ / `.cpp`;
- C# / `.cs`;
- Python / `.py`.

El estado final debe documentarse desde las fuentes reconciliadas.

La propuesta del Sprint 3 debe presentarse así:

- ampliación o estabilización de versiones;
- propuesta futura;
- no implementada;
- pendiente de priorización.

## Figure Integration

| Figura                                      | Sección                | Tratamiento                        |
| ------------------------------------------- | ---------------------- | ---------------------------------- |
| `Captura de pantalla 2026-07-28 204707.png` | Gantt general          | Figura completa y legible          |
| `Captura de pantalla 2026-07-28 204726.png` | Gantt de historias     | Figura completa y legible          |
| `RaciMatriz.png`                            | Matriz RACI            | No reinterpretar abreviaturas      |
| `listado de riesgos de .png`                | Registro de riesgos    | Preservar nombre exacto            |
| `Tabla de prioridad.png`                    | Probabilidad e impacto | Explicación textual complementaria |

Criterios:

- rutas relativas;
- nombres exactos;
- caption;
- label;
- referencia;
- fuente;
- proporción;
- orientación revisada visualmente.

`pdflscape` o un mecanismo equivalente puede utilizarse solo si ya es compatible o puede incorporarse sin romper el documento.

## Compilation and Visual Review

### Descubrimiento del motor

Debe inspeccionarse:

- `fontspec`;
- `inputenc`;
- bibliografía;
- comandos de la plantilla;
- configuración existente.

La decisión entre `pdflatex`, `xelatex`, `lualatex` o `latexmk` debe documentarse.

### Directorio temporal

Los siguientes artefactos deben generarse fuera de `docs/`:

- `.aux`;
- `.log`;
- `.out`;
- `.toc`;
- `.lof`;
- `.lot`;
- `.bbl`;
- `.blg`;
- `.fls`;
- `.fdb_latexmk`.

### Ciclo

- Compilar.
- Revisar log.
- Recompilar para índices.
- Copiar PDF.
- Renderizar páginas.
- Revisar cada página.
- Corregir.
- Repetir.
- Registrar páginas finales.

## Deployment and Link Strategy

- `guia.md` se usa como fuente de solo lectura y no se replica íntegramente.
- `README.md` concentra la guía operativa del frontend: requisitos, variables confirmadas, instalación, desarrollo, build, preview, despliegue y fallback SPA.
- El informe incluye una explicación académica breve del orden Judge0 → backend → frontend y una única tabla de recursos digitales.
- Las guías completas del backend y del entorno Docker se enlazan en su recurso externo; no se copian al README del frontend.
- Los enlaces se presentan mediante textos descriptivos; el audio aparece solo en el informe.
- Cada URL se registra en una matriz interna con fuente, destino, validez sintáctica y comprobación de acceso cuando sea posible.
- No se incorporan secretos ni valores sensibles presentes en ejemplos de despliegue.

## Components Touched

### Modificables

- `README.md`
- `docs/informe-final.tex`
- `docs/informe-final.pdf`
- artefactos de este change.

### Solo lectura

- `guia.md`;
- auditoría documental;
- historias;
- changes;
- retrospectivas;
- diagramas;
- imágenes;
- capturas;
- frontend.

## Boundaries Respected

- El informe consolida fuentes; no modifica las fuentes.
- El código se inspecciona, no se edita.
- El backend se describe, no se audita.
- Los diagramas se incluyen, no se regeneran.
- Las imágenes se incluyen, no se recrean.
- Las propuestas futuras se separan de los resultados.
- El PDF es un artefacto compilado, no una fuente editable.
- El change permanece abierto hasta revisión manual.

## Contracts Changed

No external contract changes are confirmed from the provided input.

El change modifica únicamente el contrato documental representado por el informe final:

- estructura académica;
- clasificación de cumplimiento;
- trazabilidad;
- presentación de resultados;
- incorporación de figuras;
- referencias cruzadas.

No modifica APIs, rutas, DTOs, schemas o comportamiento.

## Data Flow

- Leer informe actual.
- Leer completamente `guia.md` sin modificarla.
- Construir matrices internas de reconciliación y enlaces.
- Inventariar metadatos y estructura.
- Leer auditoría reconciliada.
- Inventariar historias, changes y retrospectivas relevantes.
- Construir matriz RF/RNF.
- Definir estructura académica.
- Reubicar contenido válido.
- Redactar faltantes respaldados.
- Integrar diagramas existentes.
- Integrar cinco imágenes obligatorias.
- Incorporar entrevista, actores, despliegue y recursos digitales.
- Actualizar `README.md` con el flujo verificado del frontend y servicios relacionados.
- Actualizar índices, referencias y bibliografía.
- Compilar en temporal.
- Copiar PDF final.
- Renderizar páginas.
- Inspeccionar visualmente.
- Corregir y recompilar.
- Revisar diff.
- Solicitar aprobación manual.

## Required Tests Per Layer

### Alcance de escritura

- Cero cambios en `frontend/`.
- Cambios en `README.md` limitados a configuración, instalación, ejecución, build, preview, despliegue, fallback SPA, variables confirmadas y servicios relacionados.
- Cero apariciones del enlace de entrevista en `README.md`.
- Cero cambios en `guia.md`.
- Cero cambios en auditorías.
- Cero cambios en historias.
- Cero cambios en retrospectivas.
- Cero cambios en PlantUML.
- Cero cambios en imágenes.
- Cero cambios en capturas.
- Solo `README.md`, `.tex`, `.pdf` y este change modificados.

### Trazabilidad

- RF-01 a RF-27 presentes.
- RNF-01 a RNF-19 presentes.
- RF-02 no implementado.
- RF-22 parcial.
- Propuestas Sprint 3 no implementadas.

### LaTeX

- Motor correcto.
- Compilación exitosa.
- Índices actualizados.
- Sin referencias indefinidas.
- Sin citas indefinidas.
- Sin missing files.
- Sin labels duplicados.
- Sin contenido visible fuera de página.

### Figuras

- Cinco figuras presentes.
- Captions.
- Labels.
- Referencias textuales.
- Legibilidad.
- Orientación correcta.
- Assets originales intactos.

### Revisión visual

- Todas las páginas renderizadas.
- Todas las páginas inspeccionadas.
- Sin cortes.
- Sin superposiciones.
- Sin páginas vacías innecesarias.
- Sin caracteres rotos.
- Número final de páginas registrado.

## Tradeoffs Accepted

- El informe puede reorganizarse profundamente, pero no reemplazarse sin inventario.
- Algunos requerimientos técnicos se sustentan documentalmente, no mediante una auditoría backend nueva.
- Una imagen suministrada puede mantenerse como tabla visual en vez de transcribirse.
- Puede utilizarse landscape para preservar legibilidad.
- Las tablas extensas tendrán una única ubicación canónica.
- Una limitación explícita es preferible a una afirmación no sustentada.
- La revisión manual es obligatoria y mantiene el change activo.

## Implementation Constraints

- No generar código de aplicación.
- No modificar frontend.
- No modificar `guia.md` ni otras fuentes documentales fuera de `README.md` y este change.
- No modificar imágenes.
- No modificar capturas.
- No modificar PlantUML.
- No inventar datos.
- No inventar fechas.
- No inventar abreviaturas RACI.
- No inventar versiones.
- No crear evidencias.
- No dejar auxiliares en docs.
- No archivar.
- No hacer commit.
- No hacer push.

## Open Design Questions

- ¿Qué clase documental y plantilla utiliza actualmente el informe?
- ¿Qué motor LaTeX exige el preámbulo?
- ¿Existe abstract y es obligatorio conservarlo?
- ¿Qué mecanismo bibliográfico utiliza?
- ¿Qué diagramas PNG están actualmente incluidos?
- ¿La matriz de trazabilidad cabe legiblemente en el cuerpo?
- ¿Qué secciones actuales contienen contenido válido reutilizable?
- ¿Qué metadatos de portada están confirmados?
- ¿Las cinco imágenes requieren landscape?
- ¿Las imágenes tienen resolución suficiente para impresión?
- ¿Qué tabla o figura ya existe con contenido equivalente?
- ¿Cuál es el número actual de páginas?
- ¿Existen cambios preexistentes en `informe-final.tex` o `informe-final.pdf`?
- ¿Qué convención usa el proyecto para registrar la aprobación manual?
