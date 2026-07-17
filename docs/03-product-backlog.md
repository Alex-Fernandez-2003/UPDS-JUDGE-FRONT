# 03. Product Backlog

## UPDS JUDGE

# 1. Fuente y criterio de numeración

El backlog se transcribió de la captura proporcionada. La fuente contiene 15 historias con identificadores `UJ-05` a `UJ-20`, pero no incluye `UJ-17`. Para preservar trazabilidad, no se reasignan identificadores ni se crea una historia artificial.

![Backlog original](capturas/backlog-historias-usuario.jpg)

# 2. Épicas

| Código | Épica                                 | Propósito                                                      |
| ------ | ------------------------------------- | -------------------------------------------------------------- |
| E01    | Gestión de identidad y acceso         | Registro, autenticación y autorización por roles.              |
| E02    | Creación y configuración de concursos | Administración del ciclo de vida del concurso y sus problemas. |
| E03    | Participación en concursos            | Descubrimiento, acceso y consulta de problemas.                |
| E04    | Motor de envío y evaluación           | Recepción de código, evaluación externa y veredictos.          |
| E05    | Ranking e historial                   | Cálculo competitivo, congelamiento y trazabilidad de envíos.   |

# 3. Backlog priorizado

| ID    | Épica | Historia resumida                                                                                                                                                                                  | Prioridad | Puntos |
| ----- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -----: |
| UJ-05 | E01   | Como usuario nuevo, quiero registrarme con nombre, correo y contraseña, para tener acceso a la plataforma.                                                                                         | Alta      |      2 |
| UJ-06 | E01   | Como usuario registrado, quiero iniciar sesión para obtener un token que identifique mis roles.                                                                                                    | Alta      |      3 |
| UJ-07 | E01   | Como Administrador de Roles, quiero asignar o revocar los roles “Admin Concursos” o “Admin Roles” a otros usuarios, para delegar la organización y administración de la plataforma.                | Alta      |      3 |
| UJ-08 | E02   | Como Administrador de Concursos, quiero crear un concurso con nombre, descripción, fecha de inicio, duración, enlace al PDF y minutos de congelamiento, para publicar una competencia configurada. | Alta      |      3 |
| UJ-09 | E02   | Como Administrador de Concursos, quiero subir un archivo ZIP con la estructura de carpetas A, B, C… para que los casos de prueba se carguen automáticamente.                                       | Crítica   |      8 |
| UJ-10 | E02   | Como Administrador de Concursos, quiero configurar título, inciso, límite de tiempo en segundos y memoria; el límite se persiste en milisegundos.                                               | Alta      |      3 |
| UJ-11 | E03   | Como usuario, quiero ver una lista de concursos filtrados por “En curso”, “Próximo” y “Finalizado”.                                                                                                | Alta      |      3 |
| UJ-12 | E03   | Como usuario, quiero ingresar la contraseña de un concurso privado para poder participar oficialmente.                                                                                             | Alta      |      3 |
| UJ-13 | E03   | Como usuario dentro de un concurso, quiero ver la lista de incisos (A, B, C…) y un botón para abrir el PDF del set de problemas alojado en Google Drive.                                           | Alta      |      2 |
| UJ-14 | E04   | Como usuario, quiero seleccionar un lenguaje (C++, Python o C#) y subir mi código para que sea evaluado.                                                                                           | Crítica   |      5 |
| UJ-15 | E04   | Como usuario, quiero recibir el veredicto (Accepted, WA, TLE, MLE o CE) en tiempo real.                                                                                                            | Crítica   |      8 |
| UJ-16 | E04   | Como usuario, quiero enviar soluciones a concursos finalizados para practicar sin afectar el ranking original.                                                                                     | Media     |      2 |
| UJ-18 | E05   | Como usuario, quiero ver el ranking calculado por problemas resueltos y penalización (minutos más 20 minutos por intento fallido).                                                                 | Crítica   |      8 |
| UJ-19 | E05   | Como Administrador de Concursos, quiero que el ranking deje de actualizarse públicamente cuando falten “X” minutos para el final.                                                                  | Alta      |      3 |
| UJ-20 | E05   | Como usuario, quiero ver todos mis envíos con filtros por concurso y resultado obtenido.                                                                                                           | Alta      |      5 |

# 4. Criterios de aceptación

## UJ-05 — Registrar usuario

**Historia:** Como usuario nuevo, quiero registrarme con nombre, correo y contraseña, para tener acceso a la plataforma.

**Criterios de aceptación:**

1. El formulario solicita nombre, correo y contraseña mediante campos etiquetados y validados.
2. El sistema rechaza correos con formato inválido o ya registrados.
3. La contraseña se transmite de forma segura y se almacena únicamente como hash mediante ASP.NET Core Identity.
4. Al completar el registro se crea una cuenta activa con el rol base de participante.
5. Los errores se muestran sin revelar información sensible.

**Prioridad:** Alta  
**Estimación académica normalizada:** 2 puntos

## UJ-06 — Iniciar sesión y obtener token

**Historia:** Como usuario registrado, quiero iniciar sesión para obtener un token que identifique mis roles.

**Criterios de aceptación:**

1. El usuario puede autenticarse con correo y contraseña válidos.
2. El backend emite un token JWT con identidad, expiración y roles autorizados.
3. Las credenciales inválidas producen una respuesta genérica y no indican qué campo falló.
4. El frontend conserva la sesión según la estrategia segura definida y protege las rutas privadas.
5. El cierre de sesión elimina el contexto local y bloquea el acceso a vistas protegidas.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-07 — Asignar o revocar roles

**Historia:** Como Administrador de Roles, quiero asignar o revocar los roles “Admin Concursos” o “Admin Roles” a otros usuarios, para delegar la organización y administración de la plataforma.

**Criterios de aceptación:**

1. Solo un usuario con permiso de administración de roles puede acceder a la función.
2. El administrador puede buscar usuarios y consultar sus roles vigentes.
3. El sistema permite agregar o retirar roles sin duplicar asignaciones.
4. No se permite que el último Administrador de Roles retire su propio acceso crítico sin confirmación y una alternativa válida.
5. Cada cambio registra quién lo realizó, sobre qué usuario y en qué fecha.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-08 — Crear concurso

**Historia:** Como Administrador de Concursos, quiero crear un concurso con nombre, descripción, fecha de inicio, duración, enlace al PDF y minutos de congelamiento, para publicar una competencia configurada.

**Criterios de aceptación:**

1. El formulario exige nombre, fecha de inicio y duración mayor que cero.
2. El número de minutos de congelamiento no puede ser negativo ni superar la duración del concurso.
3. El enlace al PDF debe usar un formato URL válido y puede actualizarse antes de publicar.
4. El concurso se crea inicialmente como borrador o programado según la acción elegida.
5. El usuario creador queda asociado como responsable del concurso.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-09 — Importar paquete ZIP de problemas

**Historia:** Como Administrador de Concursos, quiero subir un archivo ZIP con la estructura de carpetas A, B, C… para que los casos de prueba se carguen automáticamente.

**Criterios de aceptación:**

1. El sistema acepta únicamente archivos ZIP dentro del límite de tamaño configurado.
2. Cada carpeta de primer nivel representa un inciso y debe seguir una etiqueta válida y única.
3. El backend valida que cada problema contenga pares de entrada y salida compatibles con el formato acordado.
4. Los casos de prueba se almacenan en un recurso privado no accesible desde el navegador del participante.
5. Si el paquete presenta errores, la importación no deja datos parciales y devuelve un reporte comprensible.
6. Una importación válida crea o vincula los problemas y registra la cantidad de casos cargados.

**Prioridad:** Crítica  
**Estimación académica normalizada:** 8 puntos

## UJ-10 — Configurar problemas importados

**Historia:** Como Administrador de Concursos, quiero asignar título, inciso (A, B…), límite de tiempo en segundos y memoria en MB a cada problema extraído del ZIP.

**Regla de unidad:** La interfaz administrativa ingresa o muestra el límite de tiempo en segundos. Antes de persistirlo en el dominio o la base de datos, se normaliza a milisegundos: `milisegundos = segundos × 1000`.

**Criterios de aceptación:**

1. Cada problema del concurso posee inciso único, título, límite de tiempo y memoria.
2. El tiempo se ingresa en segundos, debe ser positivo y se convierte a milisegundos antes de persistirse; la memoria debe ser positiva dentro de los límites de plataforma.
3. Los cambios se validan antes de publicar el concurso.
4. El orden de los problemas puede ajustarse sin alterar los casos cargados.
5. Los participantes no pueden consultar problemas deshabilitados.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-11 — Listar concursos por estado

**Historia:** Como usuario, quiero ver una lista de concursos filtrados por “En curso”, “Próximo” y “Finalizado”.

**Criterios de aceptación:**

1. La pantalla muestra concursos visibles para el usuario autenticado.
2. Los filtros En curso, Próximo y Finalizado producen resultados coherentes con fecha, duración y estado.
3. Cada tarjeta o fila muestra nombre, fecha, duración, modalidad y acción disponible.
4. La lista ofrece estados de carga, vacío y error.
5. La información se ordena por relevancia temporal y puede paginarse.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-12 — Ingresar a concurso privado

**Historia:** Como usuario, quiero ingresar la contraseña de un concurso privado para poder participar oficialmente.

**Criterios de aceptación:**

1. El sistema solicita contraseña solo en concursos privados.
2. La contraseña se valida en el backend y no se expone en respuestas ni registros del frontend.
3. Una validación correcta crea una participación única para el usuario y concurso.
4. Los intentos fallidos muestran un mensaje genérico y pueden limitarse para prevenir abuso.
5. No se permite registrarse oficialmente en un concurso cerrado o finalizado.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-13 — Consultar problemas y PDF

**Historia:** Como usuario dentro de un concurso, quiero ver la lista de incisos (A, B, C…) y un botón para abrir el PDF del set de problemas alojado en Google Drive.

**Criterios de aceptación:**

1. La lista muestra únicamente los problemas publicados para el concurso.
2. Cada problema presenta inciso, título, límites y estado personal de resolución.
3. El botón de PDF abre el documento configurado en una nueva pestaña segura.
4. El acceso respeta el horario y las reglas del concurso.
5. Si el PDF no está disponible, la interfaz informa el problema sin bloquear el resto de la pantalla.

**Prioridad:** Alta  
**Estimación académica normalizada:** 2 puntos

## UJ-14 — Enviar solución

**Historia:** Como usuario, quiero seleccionar un lenguaje (C++, Python o C#) y subir mi código para que sea evaluado.

**Criterios de aceptación:**

1. El usuario selecciona problema y un lenguaje habilitado para el concurso.
2. El archivo debe coincidir con la extensión permitida y el tamaño máximo configurado.
3. El backend verifica participación, estado del concurso y límites antes de crear el envío.
4. El envío se registra inicialmente con estado En cola y un identificador trazable.
5. El código y los casos se envían al motor de evaluación sin exponer credenciales de Judge0 al cliente.
6. La interfaz confirma la recepción y evita duplicados por reintentos accidentales.

**Prioridad:** Crítica  
**Estimación académica normalizada:** 5 puntos

## UJ-15 — Recibir veredicto en tiempo real

**Historia:** Como usuario, quiero recibir el veredicto (Accepted, WA, TLE, MLE o CE) en tiempo real.

**Criterios de aceptación:**

1. El envío transita por estados En cola, Compilando, Evaluando y Finalizado o Error interno.
2. El backend consulta o recibe el resultado del evaluador y lo normaliza al catálogo de veredictos.
3. SignalR notifica al usuario propietario sin exigir recargar la página.
4. La interfaz muestra veredicto, tiempo y memoria cuando estén disponibles.
5. Los datos privados de casos de prueba no se incluyen en la notificación pública.
6. Si la conexión en tiempo real falla, el frontend puede recuperar el estado mediante consulta HTTP.

**Prioridad:** Crítica  
**Estimación académica normalizada:** 8 puntos

## UJ-16 — Practicar mediante upsolving

**Historia:** Como usuario, quiero enviar soluciones a concursos finalizados para practicar sin afectar el ranking original.

**Criterios de aceptación:**

1. El sistema permite envíos posteriores solo cuando el concurso tiene upsolving habilitado.
2. Cada envío posterior se marca con EsUpsolving igual a verdadero.
3. Los resultados de upsolving aparecen en el historial personal.
4. Los envíos de práctica no modifican posiciones, penalización ni estadísticas oficiales congeladas.
5. La interfaz diferencia visualmente un envío oficial de uno de práctica.

**Prioridad:** Media  
**Estimación académica normalizada:** 2 puntos

## UJ-18 — Consultar ranking del concurso

**Historia:** Como usuario, quiero ver el ranking calculado por problemas resueltos y penalización (minutos más 20 minutos por intento fallido).

**Criterios de aceptación:**

1. El ranking ordena primero por cantidad de problemas aceptados y luego por menor penalización.
2. La penalización de un problema aceptado suma el minuto de aceptación y 20 minutos por intento fallido previo.
3. Los problemas no aceptados no aportan penalización oficial.
4. Los envíos de upsolving no se consideran en el ranking oficial.
5. Los empates se resuelven con una regla documentada y estable.
6. La fila del usuario autenticado se identifica sin alterar el orden.

**Prioridad:** Crítica  
**Estimación académica normalizada:** 8 puntos

## UJ-19 — Congelar ranking

**Historia:** Como Administrador de Concursos, quiero que el ranking deje de actualizarse públicamente cuando falten “X” minutos para el final.

**Criterios de aceptación:**

1. El valor X se define por concurso y se valida contra la duración total.
2. Al llegar al instante de congelamiento, los nuevos resultados dejan de reflejarse en la vista pública.
3. Los administradores autorizados continúan viendo el ranking real.
4. La vista pública identifica celdas pendientes o congeladas sin revelar el veredicto.
5. Al finalizar o descongelar, el ranking se recalcula y publica de forma consistente.

**Prioridad:** Alta  
**Estimación académica normalizada:** 3 puntos

## UJ-20 — Consultar historial de envíos

**Historia:** Como usuario, quiero ver todos mis envíos con filtros por concurso y resultado obtenido.

**Criterios de aceptación:**

1. El usuario solo puede consultar sus propios envíos, salvo permisos administrativos explícitos.
2. La tabla muestra fecha, concurso, problema, lenguaje, estado, veredicto, tiempo, memoria y tipo oficial/upsolving.
3. Los filtros por concurso y resultado pueden combinarse y restablecerse.
4. Los resultados se paginan y ordenan del más reciente al más antiguo.
5. El detalle no revela casos privados ni datos de otros participantes.

**Prioridad:** Alta  
**Estimación académica normalizada:** 5 puntos

# 5. Historias críticas

| Historia | Motivo de criticidad                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| UJ-09    | Procesa archivos no confiables y crea múltiples entidades en una transacción.      |
| UJ-14    | Es la entrada principal al motor y debe aplicar autorización, formatos y límites.  |
| UJ-15    | Coordina procesos asíncronos y tiempo real sin filtrar información privada.        |
| UJ-18    | Centraliza las reglas de competencia y debe producir resultados deterministas.     |
| UJ-19    | Obliga a mantener dos vistas coherentes: ranking real y ranking público congelado. |

# 6. Revisión INVEST

| Criterio      | Evaluación                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| Independiente | Las historias están agrupadas por valor, aunque autenticación y concurso son dependencias naturales. |
| Negociable    | Describen resultados; los detalles técnicos se mantienen en criterios y arquitectura.                |
| Valorable     | Cada historia entrega una capacidad visible para un actor.                                           |
| Estimable     | La captura incorpora estimaciones; las historias críticas requieren spikes técnicos.                 |
| Small         | La mayoría cabe en un sprint; UJ-09, UJ-15 y UJ-18 deben dividirse en tareas.                        |
| Testable      | Cada historia dispone de criterios observables y reglas de negocio.                                  |

# 7. Orden de ejecución sugerido

1. UJ-05 Registro.
2. UJ-06 Inicio de sesión.
3. UJ-07 Roles.
4. UJ-08 Crear concurso.
5. UJ-10 Configurar problemas.
6. UJ-09 Importar ZIP.
7. UJ-11 Listar concursos.
8. UJ-12 Acceso privado.
9. UJ-13 Problemas y PDF.
10. UJ-14 Enviar solución.
11. UJ-15 Veredicto en tiempo real.
12. UJ-20 Historial.
13. UJ-18 Ranking.
14. UJ-19 Congelamiento.
15. UJ-16 Upsolving.

El orden coloca primero identidad y datos base, luego participación y por último las reglas derivadas de los envíos.

# 8. Descomposición técnica de historias grandes

## UJ-09

- Definir especificación del ZIP.
- Validar contenido sin extraer rutas peligrosas.
- Persistir archivos en almacenamiento privado.
- Ejecutar transacción de problemas y casos.
- Generar reporte de importación.

## UJ-15

- Mapear estados de Judge0.
- Implementar worker de consulta.
- Persistir transiciones.
- Configurar SignalR.
- Implementar recuperación por HTTP.

## UJ-18

- Formalizar reglas de penalización.
- Crear conjunto de datos de prueba.
- Implementar consulta/servicio de ranking.
- Resolver empates.
- Optimizar y paginar.

# 9. Labels

```text
epic: Gestión de Identidad y Seguridad
epic: Creación de Concursos y Procesamiento de ZIP
epic: Participación y Entorno del Competidor
epic: Motor de Envío y Evaluación
epic: Ranking e Historial
```

# 10. Columnas del tablero

```text
BACKLOG → POR HACER → EN CURSO → EN REVISION → LISTO
```

# 11. Trazabilidad resumida

| Épica | Historias           | Pantallas principales                    | Entidades clave                                   |
| ----- | ------------------- | ---------------------------------------- | ------------------------------------------------- |
| E01   | UJ-05, UJ-06, UJ-07 | Login, registro, administración de roles | Identity Users, Roles, UserRoles, AuditoríaRoles  |
| E02   | UJ-08, UJ-09, UJ-10 | Administración de concursos              | Concursos, Problemas, CasosPrueba                 |
| E03   | UJ-11, UJ-12, UJ-13 | Lista de concursos, problemas            | Concursos, ParticipantesConcursos, Problemas      |
| E04   | UJ-14, UJ-15, UJ-16 | Enviar solución, historial               | Envios, Lenguajes, ResultadosCasos                |
| E05   | UJ-18, UJ-19, UJ-20 | Ranking e historial                      | Envios, ParticipantesConcursos, vistas de ranking |
