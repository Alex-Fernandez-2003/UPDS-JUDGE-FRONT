# 07. Pivot & Plan / Ready to Sprint

## UPDS JUDGE

# 1. Pivot y decisiones consolidadas

## 1.1 Separación de repositorios

- Frontend: <https://github.com/Alex-Fernandez-2003/UPDS-JUDGE-FRONT.git>
- Backend: repositorio independiente, todavía sin URL proporcionada.

Esta separación permite ciclos, despliegues y responsables distintos. El contrato OpenAPI será la frontera formal.

## 1.2 Backend

El backend utilizará ASP.NET Core MVC como estructura base. Al existir un frontend separado, sus controladores se orientan a API REST/JSON; la lógica se distribuye en servicios, EF Core, integraciones, workers y SignalR.

## 1.3 Frontend

El frontend está planificado como una aplicación React con TypeScript y Vite. Esta decisión responde a la experiencia previa de la mayoría de los integrantes del equipo y permite proyectar de manera uniforme las pantallas dinámicas del sistema. La estructura prevista se incorporará dentro de `frontend/`; como esa carpeta no existe en el checkout actual, no hay evidencia local de dependencias, scripts, rutas, SignalR Client, variables de entorno ni CI configurados.

React resulta adecuado para el alcance previsto porque la aplicación requerirá autenticación, navegación protegida, formularios, tablas interactivas, carga de archivos, contadores, actualización de envíos y clasificación. La comunicación en tiempo real mediante SignalR se mantiene como integración pendiente de verificación.

Vite se contempla como herramienta de desarrollo y construcción por su configuración ligera, rapidez durante el desarrollo y buena integración con React y TypeScript.

## 1.4 Evaluación

Judge0 se encapsula detrás del backend. El navegador nunca lo consume directamente.

# 2. Validación Ready to Sprint

| Criterio                   | Estado                  | Evidencia o acción                                     |
| -------------------------- | ----------------------- | ------------------------------------------------------ |
| Problema y valor definidos | Listo                   | Documentos 01 y 02.                                    |
| MVP delimitado             | Listo                   | 15 historias provistas.                                |
| Actores identificados      | Listo                   | Casos de uso y roles.                                  |
| Wireframes iniciales       | Listo con mejoras       | Ocho frames; falta completar responsive y componentes. |
| Backlog priorizado         | Listo                   | Documento 03.                                          |
| Criterios de aceptación    | Listo para refinamiento | Documento 03.                                          |
| DoR y DoD                  | Listo                   | Documento 04.                                          |
| Formato ZIP propuesto       | Pendiente de validación  | Documento 04; validación final pendiente.             |
| UML                        | Listo como propuesta    | Documento 05 y fuentes PUML.                           |
| Modelo de datos            | Listo como propuesta    | Documento 06 y SQL.                                    |
| Contrato API definitivo    | Pendiente               | Crear OpenAPI en backend.                              |
| Judge0 disponible          | Pendiente               | Definir instancia y credenciales.                      |

# 3. Resultado de readiness

**Estado: Ready to Sprint condicionado.**

El equipo puede iniciar el Sprint 0 y las historias de identidad/frontend con mocks. Las historias de evaluación no deben entrar a desarrollo completo hasta cerrar el contrato de Judge0 y el almacenamiento privado.

# 4. Plan de entregas

## Sprint 0 — Fundaciones

- Repositorios y ramas.
- React con Vite y ASP.NET Core MVC.
- PostgreSQL/Identity.
- CORS, variables de entorno y health check.
- OpenAPI inicial y mocks.
- Diseño base y componentes.

## Sprint 1 — Cimientos y Administración

- **Historias:** UJ-5, UJ-6, UJ-8, UJ-9.

- **Meta:** Tener el Login funcionando y que el Administrador pueda crear un concurso subiendo el ZIP y que el sistema cree los problemas automáticamente.

## Sprint 2 — Participación y Juez

- **Historias:** UJ-10, UJ-11, UJ-12, UJ-13, UJ-14, UJ-15.

- **Meta:** Que el alumno pueda entrar al concurso y enviar su código, y que Judge0 le responda si está "Accepted" o "Wrong Answer".

## Sprint 3 — Competitividad y Cierre

- **Historias:** UJ-18, UJ-19, UJ-7, UJ-16, UJ-20.

- **Meta:** Implementar la lógica del ranking, el congelamiento de pantalla y las vistas de historial y roles.

# 5. Matriz de trazabilidad

| Problema/Causa         | Capacidad MVP                | Historias     | Datos                       | Evidencia de aceptación                     |
| ---------------------- | ---------------------------- | ------------- | --------------------------- | ------------------------------------------- |
| Acceso sin control     | Identity y roles             | UJ-05 a UJ-07 | Identity, AuditoriaRoles    | Login, autorización y auditoría.            |
| Configuración manual   | Administración e importación | UJ-08 a UJ-10 | Concursos, Problemas, Casos | Concurso creado y ZIP validado.             |
| Participación dispersa | Portal de concursos          | UJ-11 a UJ-13 | Participaciones             | Usuario accede y consulta problemas.        |
| Evaluación tardía      | Motor asíncrono              | UJ-14 a UJ-16 | Envios, ResultadosCasos     | Veredicto persistido y notificado.          |
| Ranking poco confiable | Cálculo centralizado         | UJ-18 a UJ-20 | Envios y vistas/servicios   | Ranking reproducible e historial filtrable. |

# 6. Riesgos y mitigaciones

| Riesgo                       | Impacto | Mitigación                                                           |
| ---------------------------- | ------- | -------------------------------------------------------------------- |
| Código malicioso             | Crítico | Ejecutar exclusivamente en sandbox de Judge0; límites y aislamiento. |
| Exposición de casos          | Crítico | Almacenamiento privado, DTO mínimos y autorización.                  |
| Saturación del evaluador     | Alto    | Cola, worker, reintentos y métricas.                                 |
| Ranking incorrecto           | Alto    | Pruebas con datasets conocidos y funciones deterministas.            |
| Desacople entre repositorios | Alto    | OpenAPI versionado, entornos de integración y mocks.                 |
| Pérdida de eventos SignalR   | Medio   | Persistencia primero y recuperación HTTP.                            |
| Diseños inconsistentes       | Medio   | Sistema visual y componentes reutilizables.                          |

# 7. Indicadores de seguimiento del desarrollo

- Historias Ready vs. total.
- Tiempo de ciclo por Pull Request.
- Cobertura de pruebas en lógica crítica.
- Errores de integración frontend/backend.
- Tiempo promedio de evaluación en entorno de prueba.
- Incidentes de seguridad detectados.
- Criterios de aceptación pendientes por sprint.

# 8. Conclusión

La documentación permite iniciar las fundaciones sin rehacer el análisis. El mayor foco del refinamiento siguiente debe estar en la frontera con Judge0 y en la especificación del paquete ZIP, porque concentran el riesgo técnico y de seguridad.
