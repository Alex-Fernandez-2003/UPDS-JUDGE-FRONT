# Spec

## Requirements

### Functional Requirements: source-consolidation

- El informe MUST utilizar como fuente prioritaria la auditoría documental aprobada.
- El informe MUST utilizar el README reconciliado.
- El informe MUST utilizar las historias reconciliadas.
- El informe MUST utilizar changes archivados y hotfixes documentados.
- El informe MUST utilizar retrospectivas.
- El informe MUST utilizar diagramas aprobados.
- El frontend MAY inspeccionarse en modo lectura para comprobar una afirmación.
- El informe MUST NOT repetir desde cero la auditoría documental.
- El informe MUST NOT solicitar acceso a backend.
- El informe MUST NOT ejecutar comandos backend.
- La descripción de backend y juez MUST basarse en documentación reconciliada, contratos frontend y diagramas.
- El informe MUST distinguir:
  - requerimiento inicial;
  - implementación final;
  - limitación;
  - hotfix;
  - propuesta futura;
  - funcionalidad no implementada.

### Functional Requirements: current-report-inspection

- `docs/informe-final.tex` MUST leerse completamente antes de editar.
- La inspección MUST registrar:
  - clase documental;
  - preámbulo;
  - paquetes;
  - motor probable;
  - portada;
  - autores;
  - docente;
  - universidad;
  - asignatura;
  - ciudad;
  - fecha;
  - estructura;
  - índices;
  - figuras;
  - tablas;
  - bibliografía;
  - anexos;
  - comandos personalizados;
  - placeholders;
  - referencias rotas.
- El contenido válido MUST preservarse.
- Una reorganización profunda MAY realizarse cuando sea necesaria.
- El archivo MUST NOT sustituirse completamente sin un inventario previo.
- Los metadatos existentes MUST conservarse salvo contradicción documentada.

### Functional Requirements: academic-structure

- El informe MUST organizarse en fases académicas.
- La estructura MUST integrar fundamentos, especificación, diseño, Scrum, planificación, implementación, validación y cierre.
- El informe MUST integrar los elementos SRS dentro de esas fases.
- El informe MUST NOT crear un documento SRS separado.
- Una sección MUST NOT crearse cuando no exista material verificable.
- Secciones redundantes SHOULD fusionarse.
- Tablas completas MUST NOT duplicarse en cuerpo y anexos.
- Los anexos SHOULD contener detalle complementario y referencias.

### Functional Requirements: preliminary-matter

- El informe MUST conservar una portada académica válida.
- El informe MUST incluir una revisión histórica.
- La revisión histórica MUST registrar como mínimo:
  - versión inicial;
  - reconciliación documental;
  - incorporación de requerimientos;
  - incorporación de planificación y riesgos;
  - versión final.
- Fechas históricas MUST NOT inventarse.
- La fecha actual MAY utilizarse para la versión final.
- El informe MUST incluir resumen ejecutivo.
- Un abstract MAY mantenerse únicamente cuando la convención actual lo requiera.
- El informe MUST incluir índice general.
- El informe MUST incluir índice de figuras.
- El informe MUST incluir índice de tablas.

### Functional Requirements: original-requirements

- El informe MUST documentar los actores iniciales:
  - Administrador de Roles, como docente o líder de club con las capacidades autorizadas documentadas;
  - Administrador de Concursos, como docente u organizador responsable de la dimensión académica y competitiva;
  - Usuario, como estudiante o participante.
- Las responsabilidades de los actores MUST reflejarse en toma de requerimientos, clases de usuario, casos de uso, seguridad y roles, implementación, trazabilidad y glosario.
- Los actores funcionales MUST NOT confundirse con roles Scrum o responsabilidades RACI.
- El Usuario MUST NOT incluir edición de información personal como capacidad implementada.
- El informe MUST documentar RF-01 a RF-27.
- El informe MUST documentar RNF-01 a RNF-19.
- Los requerimientos MUST conservar su intención original.
- La redacción MAY resumirse cuando la matriz mantenga una referencia inequívoca.
- El informe MUST distinguir requerimientos funcionales y no funcionales.
- El informe MUST registrar el estado final de cada requerimiento.
- El informe MUST incluir observaciones y evidencia documental.

### Functional Requirements: traceability-matrix

- Debe existir una matriz con columnas equivalentes a:
  - ID;
  - Requerimiento inicial;
  - Tipo;
  - Estado final;
  - Evidencia documental;
  - Historia/change relacionado;
  - Observaciones.
- Los estados permitidos MUST ser:
  - IMPLEMENTADO;
  - IMPLEMENTADO CON LIMITACIONES;
  - IMPLEMENTADO PARCIALMENTE;
  - NO IMPLEMENTADO;
  - FUERA DE ALCANCE;
  - NO VERIFICABLE EN EL FRONTEND.
- La matriz MUST incluir RF-01 a RF-27.
- La matriz MUST incluir RNF-01 a RNF-19.
- El estado MUST sustentarse en documentación reconciliada.
- `NO VERIFICABLE EN EL FRONTEND` MUST utilizarse solo cuando las fuentes aprobadas no permitan una conclusión.
- La matriz MUST no atribuir trabajo a un change incorrecto.
- Hotfixes posteriores MUST registrarse cuando afecten el estado final.

### Functional Requirements: rf-02-treatment

- RF-02 MUST marcarse `NO IMPLEMENTADO`.
- El informe MUST declarar que no existe una pantalla editable de perfil.
- El informe MUST declarar que no existe una página de configuración personal implementada.
- El informe MUST declarar que no existe un flujo entregado de actualización de datos personales.
- El informe MUST registrar la capacidad como trabajo futuro.
- RF-02 MUST NOT aparecer en objetivos alcanzados.
- RF-02 MUST aparecer en requerimientos no implementados.
- La retrospectiva Sprint 3 MUST citarse como origen de la propuesta futura cuando corresponda.

### Functional Requirements: rf-22-treatment

- RF-22 MUST NOT marcarse como completamente implementado sin observación.
- La estrategia preferida SHOULD desglosar RF-22 en subcapacidades.
- Las subcapacidades entregadas MUST marcarse según evidencia.
- La edición de información del perfil MUST marcarse `NO IMPLEMENTADO`.
- Cuando no se desglose, RF-22 MUST marcarse `IMPLEMENTADO PARCIALMENTE`.
- El informe MUST explicar que la desviación corresponde a la edición del perfil.
- RF-22 MUST aparecer entre los requerimientos parciales.

### Functional Requirements: supported-languages-treatment

- El informe MUST distinguir los lenguajes iniciales:
  - C++;
  - C#;
  - Python.
- El informe MUST distinguir las extensiones iniciales:
  - `.cpp`;
  - `.cs`;
  - `.py`.
- El estado final MUST basarse en documentación reconciliada.
- La propuesta de ampliar versiones o cantidad de lenguajes MUST marcarse como no implementada.
- El informe MUST NOT afirmar una ampliación no entregada.
- La propuesta MUST aparecer en trabajo futuro o recomendaciones.

### Functional Requirements: functional-and-use-case-modeling

- El informe MUST describir las capacidades principales del producto.
- El informe MUST incluir actores y clases de usuario.
- Los diagramas aprobados MAY incluirse desde `docs/images/`.
- El informe MUST relacionar requerimientos e historias.
- Los casos de uso principales SHOULD incluir flujos básicos y alternativos cuando estén documentados.
- El informe MUST NOT inventar casos de uso no respaldados.
- Un comportamiento exclusivamente backend MUST describirse desde las fuentes aprobadas, sin una auditoría nueva.

### Functional Requirements: architecture-and-design

- El informe MUST describir la arquitectura general.
- El informe MUST describir la arquitectura frontend.
- El informe MUST describir backend y juez como componentes asumidos correctos.
- El informe MUST describir comunicación entre componentes.
- El informe MUST describir autenticación, autorización y roles.
- Los diagramas existentes MUST considerarse aprobados.
- `docs/puml/` MUST no modificarse.
- Los PNG de diagramas MUST no regenerarse.
- Las explicaciones MUST distinguir arquitectura documentada de detalles no expuestos.

### Functional Requirements: scrum-and-project-management

- El informe MUST describir la metodología Scrum aplicada.
- El informe MUST describir la organización del equipo.
- El informe MUST incluir roles Scrum cuando estén documentados.
- El informe MUST incluir la matriz RACI.
- El informe MUST describir Product Backlog, Product Goal, Sprint Backlogs y Sprint Goals cuando exista evidencia.
- El informe MUST describir Sprint 0, Sprint 1, Sprint 2 y Sprint 3.
- El informe MUST resumir reviews y retrospectivas.
- Las retrospectivas MUST conservar su contexto temporal.
- Propuestas futuras MUST no presentarse como entregables.
- La edición de datos personales MUST aparecer como propuesta no implementada.
- La ampliación de lenguajes MUST aparecer como propuesta no implementada.

### Functional Requirements: schedule-images

- El informe MUST incluir `docs/images/Captura de pantalla 2026-07-28 204707.png`.
- Esa figura MUST ubicarse en planificación temporal.
- Esa figura MUST describirse como Gantt general por Sprint.
- El informe MUST incluir `docs/images/Captura de pantalla 2026-07-28 204726.png`.
- Esa figura MUST describirse como distribución temporal de historias.
- Ambas figuras MUST conservar sus nombres.
- Ambas figuras MUST ser legibles.
- Ambas figuras MUST tener caption.
- Ambas figuras MUST tener label.
- Ambas figuras MUST citarse desde el texto.

### Functional Requirements: raci-image

- El informe MUST incluir `docs/images/RaciMatriz.png`.
- La imagen MUST ubicarse en estructura de roles y equipo.
- La imagen MUST incluir caption y label.
- La imagen MUST ser referenciada desde el texto.
- Las abreviaturas no definidas MUST no reinterpretarse.
- La imagen MUST no transcribirse completamente salvo que exista una tabla textual verificada.

### Functional Requirements: risk-images

- El informe MUST incluir `docs/images/listado de riesgos de .png`.
- El espacio antes de `.png` MUST conservarse.
- La figura MUST ubicarse en registro priorizado de riesgos.
- El informe MUST incluir `docs/images/Tabla de prioridad.png`.
- La figura MUST ubicarse en matriz de probabilidad e impacto.
- Ambas figuras MUST tener caption y label.
- Ambas figuras MUST citarse desde el texto.
- El texto MUST explicar la relación entre riesgo, probabilidad, impacto y prioridad.
- La explicación MUST no inventar valores no legibles o no documentados.

### Functional Requirements: immutable-assets

- Archivos bajo `docs/images/` MUST ser de solo lectura.
- Archivos bajo `docs/capturas/` MUST ser de solo lectura.
- Archivos bajo `docs/puml/` MUST ser de solo lectura.
- El change MUST NOT:
  - modificar;
  - mover;
  - renombrar;
  - eliminar;
  - regenerar;
  - comprimir;
  - reemplazar esos archivos.
- Las imágenes obligatorias MUST incluirse desde sus rutas existentes.
- No MUST crearse una reproducción LaTeX de las cinco tablas en sustitución de las imágenes.

### Functional Requirements: figure-typesetting

- Toda figura MUST tener caption.
- Toda figura MUST tener label único.
- Toda figura MUST citarse en el texto.
- Las rutas MUST ser relativas.
- Los espacios en nombres MUST manejarse con una solución compatible con LaTeX.
- `\detokenize{}` MAY utilizarse cuando sea compatible.
- Las imágenes MUST mantener proporción.
- Las imágenes MUST no cortarse.
- Una imagen ancha MAY utilizar una página horizontal.
- La orientación MUST decidirse después de revisar la compilación.
- Las figuras MUST no aparecer demasiado pequeñas.
- Los pies MUST permanecer asociados a sus figuras.
- Las fuentes de las figuras MUST identificarse cuando corresponda.
- Imágenes del equipo MAY usar `Fuente: elaboración propia`.
- Tablas suministradas MAY usar `Fuente: elaboración del equipo del proyecto`.

### Functional Requirements: implementation-and-validation-content

- El informe MUST describir las tecnologías actuales documentadas.
- El informe MUST describir módulos principales.
- El informe MUST describir autenticación y autorización.
- El informe MUST describir concursos, problemas, envíos, ranking y administración.
- El informe MUST describir integración frontend.
- El informe MUST diferenciar implementación original de hotfixes.
- Las cifras de pruebas MUST incluir contexto.
- Una cantidad histórica de tests MUST no presentarse como constante actual.
- El informe MUST registrar limitaciones.
- El informe MUST incluir trazabilidad final.
- El informe MUST incluir resultados, conclusiones y recomendaciones.

### Functional Requirements: approved-guide-and-interview

- `guia.md` MUST leerse completamente y tratarse como fuente aprobada de solo lectura.
- `guia.md` MUST NOT modificarse, moverse, renombrarse, convertirse ni copiarse íntegramente.
- La información de `guia.md` MUST contrastarse con README, auditoría, historias, changes, diagramas, `package.json` y frontend actual.
- Una contradicción con documentación final más reciente MUST resolverse mediante la jerarquía de fuentes.
- El informe MUST describir entrevista, análisis de actores, historias, validación documental y prototipos documentados como técnicas; MUST NOT inventar encuestas, talleres o reuniones.
- El informe MUST incluir el audio autorizado mediante un enlace descriptivo y clicable.
- El informe MUST NOT afirmar que el audio fue descargado, analizado o transcrito.
- La entrevista MAY considerarse evidencia de identificación y validación de necesidades; MUST NOT considerarse evidencia de implementación.
- El enlace de entrevista MUST NOT aparecer en `README.md`.

### Functional Requirements: digital-resources-and-links

- El informe MUST incluir una tabla canónica `Recurso | Propósito | Ubicación`.
- La tabla MUST incluir, cuando exista URL autorizada, frontend, backend, entorno Docker o imagen, entrevista, guías de instalación y evidencias relevantes.
- El repositorio frontend MUST usar `https://github.com/Alex-Fernandez-2003/UPDS-JUDGE-FRONT` para lectura humana.
- La URL backend MUST obtenerse exclusivamente desde fuentes autorizadas y MUST NOT inferirse por sustitución de nombres.
- Una referencia Docker MUST distinguir entorno, repositorio, imagen y tag cuando la fuente los distinga.
- URLs, tags, namespaces y comandos MUST NOT inventarse.
- El enlace de audio MUST aparecer como máximo una vez en el cuerpo y una vez en la tabla de recursos.
- Los enlaces MUST usar texto descriptivo, permitir corte de línea y no producir contenido fuera de margen.
- Cada enlace agregado MUST registrarse internamente con nombre, URL, fuente, destino, validez sintáctica y estado de acceso cuando pueda comprobarse.
- Credenciales, tokens, firmas temporales, claves, secretos y rutas locales MUST NOT incluirse.

### Functional Requirements: readme-frontend-deployment

- `README.md` MUST describir el repositorio frontend, requisitos, variables confirmadas, instalación local, desarrollo, build, preview y despliegue.
- Los comandos MUST provenir de `frontend/package.json`, lockfile, Vite, archivos de entorno, scripts o `guia.md`.
- Variables, comandos, puertos, plataformas y archivos de despliegue MUST NOT inventarse.
- El README MUST distinguir variables públicas Vite de variables de tooling.
- El README MUST documentar el directorio de salida real del build.
- El README MUST explicar el fallback SPA hacia `index.html` para rutas no físicas.
- Cuando no exista configuración de hosting específica, el README MUST explicar el requisito genéricamente y MUST NOT crear o afirmar un archivo inexistente.
- El README MUST enlazar backend y entorno Docker como servicios relacionados y remitir a sus guías externas.
- El README MUST permanecer centrado en desplegar el frontend.
- El README MUST NOT incluir el audio de la entrevista ni evidencias académicas internas.

### Functional Requirements: bibliography

- La convención bibliográfica actual MUST inspeccionarse.
- El mecanismo existente MUST preservarse cuando sea válido.
- BibTeX MUST no introducirse si el informe no lo utiliza y no es necesario.
- Las referencias MUST ser pertinentes.
- Versiones y URLs MUST no inventarse.
- Referencias MAY incluir documentación oficial de las tecnologías realmente documentadas.
- El informe MUST no crear una bibliografía extensa sin uso en el texto.
- Toda cita utilizada MUST resolverse.

### Functional Requirements: write-boundary

- La implementación MUST modificar únicamente:
  - `README.md`;
  - `docs/informe-final.tex`;
  - `docs/informe-final.pdf`;
  - artefactos de este change.
- El frontend MUST permanecer sin modificaciones.
- `guia.md` MUST permanecer sin modificaciones.
- `README.md` MUST cambiar únicamente para documentar el frontend y sus servicios relacionados.
- Auditorías anteriores MUST permanecer sin modificaciones.
- Historias MUST permanecer sin modificaciones.
- Retrospectivas MUST permanecer sin modificaciones.
- PlantUML MUST permanecer sin modificaciones.
- Imágenes MUST permanecer sin modificaciones.
- Capturas MUST permanecer sin modificaciones.
- Otros changes MUST permanecer sin modificaciones.
- Inconsistencias en otras fuentes MUST resolverse adaptando el informe, no modificando la fuente.

### Functional Requirements: latex-compilation

- La implementación MUST determinar el motor requerido desde el preámbulo.
- El motor MAY ser `pdflatex`, `xelatex`, `lualatex` o `latexmk`.
- El motor MUST no asumirse antes de inspeccionar.
- La compilación MUST utilizar un directorio temporal.
- Archivos auxiliares MUST permanecer fuera de `docs/`.
- Solo `docs/informe-final.pdf` MUST quedar como salida persistente.
- La compilación MUST ejecutarse las veces necesarias para índices y referencias.
- El PDF final MUST corresponder al `.tex` final.
- El número final de páginas MUST registrarse.

### Functional Requirements: latex-warnings

- La validación MUST revisar:
  - undefined references;
  - undefined citations;
  - overfull hbox;
  - underfull hbox relevante;
  - missing file;
  - duplicate label;
  - multiply-defined label;
  - font warnings.
- Una referencia indefinida MUST bloquear la finalización.
- Una cita indefinida MUST bloquear la finalización.
- Una imagen faltante MUST bloquear la finalización.
- Un `overfull` con contenido visible fuera de página MUST bloquear la finalización.
- Warnings no visibles MAY documentarse cuando no puedan eliminarse sin degradar el documento.

### Functional Requirements: visual-validation

- Todas las páginas del PDF MUST renderizarse a imágenes.
- Cada página MUST inspeccionarse visualmente.
- La revisión MUST comprobar:
  - textos cortados;
  - tablas desbordadas;
  - imágenes ilegibles;
  - captions separados;
  - páginas horizontales incorrectas;
  - referencias sin resolver;
  - caracteres rotos;
  - índices desactualizados;
  - páginas vacías innecesarias;
  - encabezados superpuestos;
  - pies superpuestos.
- Las cinco imágenes obligatorias MUST revisarse especialmente.
- Defectos visibles MUST corregirse y recompilarse.
- Código de salida cero de LaTeX MUST no considerarse validación suficiente.

### Functional Requirements: internal-links

- El índice general MUST apuntar a las secciones correctas.
- El índice de figuras MUST incluir las figuras.
- El índice de tablas MUST incluir las tablas.
- Referencias cruzadas MUST resolverse.
- Bookmarks del PDF SHOULD ser coherentes.
- Enlaces internos MUST no apuntar a secciones inexistentes.
- URLs bibliográficas MUST no estar rotas cuando puedan validarse sin ampliar el alcance.
- Los hipervínculos externos nuevos MUST ser sintácticamente válidos.
- Cuando exista red, la validación SHOULD comprobar respuesta sin descargar audio, imágenes Docker o repositorios completos.
- Los bookmarks MUST incorporar coherentemente las secciones nuevas de entrevista, despliegue y recursos.

### Functional Requirements: final-state

- `docs/informe-final.tex` MUST quedar actualizado.
- `docs/informe-final.pdf` MUST quedar generado.
- El change MUST permanecer activo.
- El change MUST no archivarse automáticamente.
- La revisión manual MUST permanecer pendiente.
- La implementación MUST no hacer commit.
- La implementación MUST no hacer push.

### Non-Functional Requirements

- El informe MUST estar escrito en español.
- El tono MUST ser formal y académico.
- El informe MUST evitar lenguaje conversacional.
- El informe MUST evitar referencias a herramientas de generación.
- Las siglas MUST explicarse en su primera aparición.
- La terminología MUST ser consistente.
- Las rutas absolutas locales MUST no aparecer.
- Tokens y credenciales MUST no aparecer.
- Las afirmaciones MUST estar sustentadas.
- Evidencia e interpretación MUST distinguirse.
- La numeración MUST ser consistente.
- Las referencias cruzadas MUST utilizarse.
- Los párrafos SHOULD desarrollar una idea completa.
- El documento SHOULD evitar repeticiones.
- El PDF SHOULD mantener legibilidad en impresión y pantalla.
- El change MUST preservar fuentes existentes.

## Behavior Scenarios

### Scenario 1: RF-02 no implementado

Given RF-02 exige visualizar y editar datos personales
And la funcionalidad no fue implementada
When se genera la matriz de trazabilidad
Then RF-02 MUST marcarse como `NO IMPLEMENTADO`
And MUST explicarse que quedó como trabajo futuro

### Scenario 2: RF-22 parcial

Given RF-22 contiene varias capacidades
And la edición del perfil no fue implementada
When se evalúa RF-22
Then SHOULD desglosarse por capacidades
Or MUST marcarse como `IMPLEMENTADO PARCIALMENTE`
And MUST no presentarse como cumplimiento total

### Scenario 3: Propuesta de lenguajes

Given la retrospectiva del Sprint 3 propone ampliar versiones estables de lenguajes
When se documentan los resultados
Then MUST registrarse como propuesta no implementada

### Scenario 4: Propuesta de datos personales

Given la retrospectiva del Sprint 3 propone actualizar datos personales
When se documentan resultados y trabajo futuro
Then MUST registrarse como propuesta no implementada
And MUST no aparecer en entregables completados

### Scenario 5: Imágenes obligatorias

Given existen cinco tablas en `docs/images/`
When se compila el informe
Then las cinco MUST aparecer con caption, label y referencia textual

### Scenario 6: RACI

Given `docs/images/RaciMatriz.png`
When se documentan roles
Then la imagen MUST incluirse sin modificar
And abreviaturas no definidas MUST no reinterpretarse

### Scenario 7: Gantt general

Given `docs/images/Captura de pantalla 2026-07-28 204707.png`
When se documenta la planificación
Then MUST incluirse como Gantt general por Sprint

### Scenario 8: Gantt de historias

Given `docs/images/Captura de pantalla 2026-07-28 204726.png`
When se documenta la planificación
Then MUST incluirse como distribución temporal de historias de usuario

### Scenario 9: Riesgos

Given el listado de riesgos y la matriz de prioridad
When se documenta la gestión de riesgos
Then ambas imágenes MUST incluirse
And MUST explicarse su relación con probabilidad, impacto y prioridad

### Scenario 10: Nombre de archivo con espacio final

Given `docs/images/listado de riesgos de .png`
When se construye la referencia LaTeX
Then el nombre exacto MUST conservarse
And la compilación MUST resolver correctamente la ruta

### Scenario 11: Imágenes inmutables

Given un archivo dentro de `docs/images/`
When se prepara el informe
Then el archivo MUST solo leerse e incluirse
And MUST no modificarse, moverse, renombrarse ni regenerarse

### Scenario 12: PlantUML aprobado

Given un archivo bajo `docs/puml/`
When se consolida el informe
Then MAY referenciarse su diagrama aprobado
And el archivo MUST permanecer sin modificaciones

### Scenario 13: Informe actual válido

Given una sección válida en `docs/informe-final.tex`
When se reorganiza el documento
Then el contenido SHOULD preservarse o trasladarse
And MUST no descartarse sin justificación

### Scenario 14: Sección sin evidencia

Given una sección propuesta por el índice académico
And no existe material verificable
When se reorganiza el informe
Then la sección MUST no llenarse con afirmaciones inventadas
And MAY fusionarse o explicarse como limitación

### Scenario 15: Revisión histórica sin fecha

Given una revisión anterior sin fecha documentada
When se crea la tabla histórica
Then MUST no inventarse una fecha
And la fila MAY conservar una indicación temporal no específica

### Scenario 16: Requerimientos completos

Given las listas RF-01 a RF-27 y RNF-01 a RNF-19
When se completa la matriz
Then cada identificador MUST aparecer exactamente una vez como requisito principal

### Scenario 17: RF-22 desglosado

Given se adopta el desglose de RF-22
When se documentan las subcapacidades
Then la edición de perfil MUST marcarse no implementada
And las demás capacidades MUST evaluarse individualmente

### Scenario 18: Lenguajes iniciales

Given Actividad2 define C++, C# y Python
When se documenta el requerimiento inicial
Then esos lenguajes MUST identificarse como alcance inicial
And una ampliación futura MUST no presentarse como entregada

### Scenario 19: Backend asumido correcto

Given el backend no está disponible en esta máquina
When se describe su arquitectura
Then MUST utilizarse documentación reconciliada, contratos frontend y diagramas
And MUST no realizarse una auditoría nueva

### Scenario 20: Tabla duplicada

Given una matriz completa ya aparece en el cuerpo
When se preparan anexos
Then la matriz MUST no duplicarse íntegramente
And el anexo MAY referenciarla o contener detalle complementario

### Scenario 21: Motor LaTeX

Given `docs/informe-final.tex` actualizado
When se prepara la compilación
Then el motor correcto MUST determinarse desde el preámbulo
And MUST no asumirse de antemano

### Scenario 22: Archivos auxiliares

Given la compilación genera archivos auxiliares
When termina el proceso
Then esos archivos MUST permanecer fuera de `docs/`
And solo `docs/informe-final.pdf` MUST conservarse

### Scenario 23: Informe compilable

Given `docs/informe-final.tex` actualizado
When se ejecuta el motor LaTeX correcto
Then MUST generarse `docs/informe-final.pdf`
And MUST no existir referencias indefinidas ni contenido cortado

### Scenario 24: Validación visual

Given el PDF compilado
When se renderizan todas sus páginas
Then cada página MUST inspeccionarse visualmente
And defectos visibles MUST corregirse antes de finalizar

### Scenario 25: Imagen horizontal

Given una imagen ancha resulta ilegible en orientación vertical
When se revisa el PDF
Then MAY utilizarse una página horizontal
And el resto del documento MUST conservar su orientación correcta

### Scenario 26: Overfull visible

Given el log contiene un `overfull hbox`
When el contenido se extiende fuera de la página
Then el defecto MUST corregirse antes de finalizar

### Scenario 27: Warning no visible

Given existe un warning sin impacto visual ni referencias rotas
When se revisa el documento
Then MAY documentarse como residual
And MUST no ocultar un defecto visible

### Scenario 28: Índices desactualizados

Given se agregaron figuras, tablas o secciones
When se compila una sola vez
Then la implementación MUST recompilar hasta actualizar los índices

### Scenario 29: Bibliografía existente

Given el informe utiliza un mecanismo bibliográfico válido
When se actualizan referencias
Then el mecanismo MUST conservarse
And una migración innecesaria MUST no realizarse

### Scenario 30: Cambio fuera de alcance

Given el diff contiene un archivo bajo `frontend/`, `docs/images/`, `docs/capturas/` o `docs/puml/`
When se valida el change
Then el change MUST considerarse inválido hasta retirar esa modificación

### Scenario 31: PDF no corresponde al TEX

Given el `.tex` cambia después de la última compilación
When se valida el resultado
Then el PDF MUST recompilarse antes de considerarse final

### Scenario 32: Fin del change

Given el informe supera la validación técnica y visual
When termina la ejecución automatizada
Then el change MUST permanecer activo
And la aprobación manual MUST quedar pendiente

### Scenario 33: Entrevista autorizada

Given el responsable proporciona una síntesis y un enlace de audio
When se documenta el levantamiento
Then el informe MUST presentar la entrevista como técnica y evidencia
And MUST NOT afirmar que el audio fue descargado, analizado o transcrito
And el enlace MUST NOT aparecer en README

### Scenario 34: Actores funcionales

Given existen Administrador de Roles, Administrador de Concursos y Usuario
When se actualizan actores, casos de uso y seguridad
Then sus responsabilidades MUST conservar los permisos documentados
And MUST no confundirse con roles Scrum o RACI
And el Usuario MUST no recibir edición de perfil implementada

### Scenario 35: README desplegable

Given existen scripts, variables y configuración Vite verificables
When se actualiza README
Then MUST documentar instalación, desarrollo, build, preview, despliegue y fallback SPA
And MUST no inventar una plataforma o archivo de hosting

### Scenario 36: Recursos digitales

Given existen URLs autorizadas para repositorios, Docker, entrevista y guías
When se construye la tabla de recursos
Then cada enlace MUST tener texto descriptivo y origen trazable
And MUST no exponer secretos ni desbordar el margen

### Scenario 37: URL obligatoria ausente

Given una URL obligatoria no aparece en fuentes autorizadas
When se cierra la ampliación
Then MUST registrarse como bloqueo documental
And MUST no sustituirse por una URL inferida o inventada

## Edge Cases

- `docs/informe-final.tex` utiliza una clase o plantilla personalizada.
- El informe requiere fuentes disponibles solo con XeLaTeX o LuaLaTeX.
- El informe utiliza `input` o `include` hacia archivos que no pueden modificarse.
- La bibliografía utiliza BibTeX, Biber o una lista manual.
- Una imagen tiene baja resolución original.
- Una imagen ancha continúa ilegible en landscape.
- Una figura flotante se aleja de su texto introductorio.
- Una tabla ocupa varias páginas.
- La revisión histórica no contiene versiones anteriores documentadas.
- Un requerimiento se relaciona con varias historias.
- Una historia cubre parcialmente varios requerimientos.
- Un RF combina responsabilidades frontend, backend y juez.
- Un RNF solo tiene evidencia documental y no una medición objetiva.
- Un hotfix posterior sustituye parte de una implementación original.
- Los diagramas aprobados utilizan terminología anterior.
- El frontend contiene una base parcial de perfil sin edición funcional.
- El catálogo final de lenguajes coincide con el inicial, pero la retrospectiva propone ampliarlo.
- Una cifra de tests pertenece a un sprint anterior.
- Existen referencias absolutas locales en el informe.
- Existen labels duplicados.
- Existen captions sin referencia textual.
- Existen tablas sin entrada en el índice.
- Una página horizontal altera encabezados o bookmarks.
- La compilación requiere múltiples pasadas.
- La validación de URLs no puede realizarse sin acceso de red.
- El PDF contiene una página intencionalmente en blanco por estructura de capítulos.
- El working tree contiene cambios preexistentes fuera del alcance.

## Acceptance Criteria

- El informe actual MUST haberse leído completamente.
- Las fuentes reconciliadas MUST haberse utilizado.
- La estructura académica MUST estar presente.
- El enfoque SRS MUST estar integrado.
- RF-01 a RF-27 MUST estar documentados.
- RNF-01 a RNF-19 MUST estar documentados.
- La matriz de trazabilidad MUST existir.
- RF-02 MUST figurar como no implementado.
- RF-22 MUST no figurar como completamente implementado sin observación.
- La edición de datos personales MUST figurar como trabajo futuro.
- La ampliación de lenguajes MUST figurar como trabajo futuro.
- El Gantt por Sprint MUST estar incluido.
- El Gantt por historias MUST estar incluido.
- La matriz RACI MUST estar incluida.
- El listado de riesgos MUST estar incluido.
- La matriz de prioridad MUST estar incluida.
- Todas las figuras MUST tener caption y label.
- Todas las figuras MUST estar referenciadas en el texto.
- `docs/images/` MUST permanecer sin modificaciones.
- `docs/capturas/` MUST permanecer sin modificaciones.
- `docs/puml/` MUST permanecer sin modificaciones.
- `frontend/` MUST permanecer sin modificaciones.
- Los diagramas aprobados MUST preservarse.
- El índice general MUST generarse.
- El índice de figuras MUST generarse.
- El índice de tablas MUST generarse.
- El informe MUST compilar.
- `docs/informe-final.pdf` MUST generarse.
- No MUST existir referencias indefinidas.
- No MUST existir citas indefinidas.
- No MUST existir imágenes faltantes.
- No MUST existir contenido visible fuera de página.
- Todas las páginas MUST haberse inspeccionado.
- Solo MUST modificarse archivos permitidos.
- El change MUST permanecer activo.
- No MUST realizarse commit.
- No MUST realizarse push.
- La revisión manual MUST quedar pendiente.

## Out of Scope

- Implementación funcional.
- Código frontend.
- Backend.
- Juez.
- Cambios de contratos.
- Nuevos diagramas.
- Regeneración PlantUML.
- Nuevas capturas.
- Edición de imágenes.
- Reconciliación de historias o retrospectivas.
- Modificación de auditorías anteriores.
- Nuevos changes funcionales.
- Commit, push y archive.
