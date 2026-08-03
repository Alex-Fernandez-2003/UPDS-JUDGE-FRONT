# 04. Definition of Ready y refinamiento

## UPDS JUDGE

# 1. Definition of Ready del producto

Una historia puede entrar a un sprint cuando cumple lo siguiente:

- [ ] Está redactada con rol, acción y beneficio.
- [ ] Conserva un identificador único y una épica.
- [ ] Tiene prioridad y estimación ratificadas por el equipo.
- [ ] Incluye criterios de aceptación verificables.
- [ ] Especifica permisos y actores autorizados.
- [ ] Identifica datos de entrada, salida y persistencia.
- [ ] Incluye estados de carga, vacío, error y éxito para frontend.
- [ ] Cuenta con referencia visual o decisión explícita de diseño.
- [ ] Tiene contrato de API acordado o mock estable.
- [ ] Define validaciones de seguridad y límites.
- [ ] Identifica dependencias con backend, Judge0, SignalR o almacenamiento.
- [ ] Puede probarse de forma aislada o con dobles de prueba.
- [ ] No presenta bloqueos críticos conocidos.

# 2. Definition of Ready por repositorio

## 2.1 Frontend

- Endpoint y DTO conocidos.
- Roles y comportamiento de navegación definidos.
- Diseño desktop y reglas responsive acordadas.
- Copys y estados visuales en español.
- Mock disponible cuando el backend todavía no esté integrado.

## 2.2 Backend

- Regla de negocio validada.
- Entidades y migraciones identificadas.
- Código de respuesta HTTP definido.
- Política de autorización establecida.
- Casos de prueba y estrategia de integración disponibles.

# 3. Reglas de negocio transversales

1. Las contraseñas de usuario y de concursos no se almacenan en texto plano.
2. Los roles se validan en backend; ocultar una opción en UI no es autorización.
3. Los casos de prueba y salidas esperadas son privados.
4. El frontend nunca recibe credenciales de Judge0 ni de base de datos.
5. Un participante solo realiza envíos oficiales dentro del periodo permitido.
6. El upsolving se identifica y no modifica el ranking oficial.
7. El ranking prioriza problemas resueltos y luego menor penalización.
8. La penalización suma el minuto de aceptación más 20 minutos por intento fallido previo.
9. El congelamiento afecta únicamente la representación pública.
10. Las transiciones de estado de un envío deben persistirse y ser auditables.

# 4. Formato ZIP propuesto

El formato ZIP está diseñado y documentado, pero permanece pendiente de validación final por el equipo y por el responsable de la integración backend/Judge0. La propuesta usa un archivo `Concurso.zip` con una carpeta de primer nivel por ejercicio, identificada por un inciso como `A/`, `B/` o `C/`. Cada carpeta contiene pares numerados `TestN.in` y `TestN.out` con el mismo número positivo `N`.

## Imagen referencial

![Formato de archivo ZIP](./images/formato-ZIP.png)

---

# 5. Historias críticas refinadas

## 5.1 UJ-09 — Importar paquete ZIP

**Precondiciones:** administrador autenticado; concurso existente; límites de carga configurados.

**Entrada:** `contestId`, archivo ZIP, usuario actor.

**Flujo propuesto:**

1. El frontend envía el archivo mediante `multipart/form-data`.
2. El backend valida rol, concurso, tipo MIME y tamaño.
3. Se extrae en un directorio temporal aislado evitando _zip slip_.
4. Se valida que las carpetas de primer nivel sean incisos permitidos y únicos.
5. Se comprueba la existencia de pares numerados `TestN.in` y `TestN.out` con el mismo identificador.
6. Se almacena el contenido privado.
7. Se crean problemas y casos dentro de una transacción.
8. Se devuelve un resumen de elementos creados.

**Alternativas:** ZIP corrupto, inciso duplicado, par incompleto, archivo excesivo, concurso publicado, error de almacenamiento.

**Criterio de atomicidad:** una importación inválida no deja problemas o casos parciales.

## 5.2 UJ-14 — Enviar solución

**Precondiciones:** sesión válida; participación activa; concurso en curso o upsolving habilitado; lenguaje activo.

**Entrada:** problema, lenguaje, archivo fuente.

**Flujo principal:** validar → persistir En cola → enviar al evaluador → devolver `202 Accepted` → procesar asíncronamente.

**Alternativas:** extensión inválida, tamaño excesivo, problema no publicado, concurso cerrado, usuario no participante, evaluador no disponible.

### 5.3 UJ-15 — Veredicto de la evaluación

Precondición: envío persistido y enviado al motor de evaluación.

Estados:
- EN_COLA
- COMPILANDO
- EVALUANDO
- FINALIZADO
- ERROR_INTERNO
- CANCELADO

Normalización: los estados y veredictos devueltos por Judge0 se traducen al catálogo interno antes de almacenarse.

Flujo: el participante envía una solución mediante `POST /api/Envios`. El backend procesa la evaluación con Judge0, registra el resultado y devuelve el estado y el veredicto en la respuesta de la solicitud.

## 5.4 UJ-18 — Ranking

**Datos necesarios:** participantes activos, problemas, envíos oficiales, fecha de inicio y veredictos.

**Algoritmo:**

- Contar un problema cuando existe al menos un `Accepted` oficial.
- Tomar el primer Accepted del participante para ese problema.
- Contar intentos fallidos oficiales anteriores al Accepted.
- Penalización = minutos desde inicio hasta Accepted + 20 × intentos fallidos.
- Ordenar por resueltos descendente y penalización ascendente.
- Aplicar criterio de desempate estable documentado.

## 5.5 UJ-19 — Congelamiento

**Instante de congelamiento:** `fechaInicio + duración - minutosCongelamiento`.

**Vista pública:** oculta el efecto de envíos posteriores al instante, señalando actividad pendiente.

**Vista administrativa:** continúa mostrando los resultados reales.

**Descongelamiento:** recalcula y publica el ranking completo en una operación consistente.

# 6. Contratos API iniciales

| # | Método | Ruta | Descripción |
|---:|:------:|------|-------------|
| 1 | POST | `/api/Auth/login` | Iniciar sesión y obtener un token JWT. |
| 2 | POST | `/api/Auth/register` | Registrar un nuevo usuario. |
| 3 | GET | `/api/Concursos` | Listar concursos con filtros, búsqueda y paginación. |
| 4 | GET | `/api/Concursos/detalle/{codigo}` | Obtener la información detallada de un concurso. |
| 5 | POST | `/api/ParticipanteConcursos/unirse` | Inscribirse a un concurso público o privado. |
| 6 | POST | `/api/Envios` | Enviar una solución para evaluar un problema. |
| 7 | GET | `/api/Envios/mis-envios` | Listar los envíos del usuario con filtros y paginación. |
| 8 | GET | `/api/Envios/concurso/{concursoCodigo}` | Listar los envíos del usuario de un concurso específico. |
| 9 | GET | `/api/ParticipanteConcursos/stats-contest` | Obtener las estadísticas generales del usuario en concursos. |
| 10 | GET | `/api/Concursos/dashboard/{codigo}` | Obtener el dashboard del concurso para el usuario. |
| 11 | GET | `/api/Concursos/{codigoConcurso}/ranking` | Obtener el ranking ICPC del concurso. |
| 12 | POST | `/api/Concursos/crear` | Crear un nuevo concurso con sus problemas y casos de prueba. |
| 13 | PUT | `/api/Concursos/{codigo}` | Actualizar un concurso antes de que inicie. |
| 14 | GET | `/api/Concursos/editar/{codigo}` | Obtener los datos de un concurso para su edición. |
| 15 | GET | `/api/Concursos/mis-creados` | Listar los concursos creados por el administrador. |
| 16 | GET | `/api/Concursos/mis-resumen` | Obtener el resumen de concursos creados por el administrador. |
| 17 | GET | `/api/Concursos/mis-registros` | Obtener los concursos en los que el usuario está inscrito. |
| 18 | GET | `/api/Roles` | Listar todos los roles disponibles. |
| 19 | GET | `/api/Roles/usuarios` | Buscar usuarios con sus roles y paginación. |
| 20 | POST | `/api/Roles/agregar` | Asignar un rol a un usuario. |
| 21 | POST | `/api/Roles/quitar` | Quitar un rol a un usuario. |

# 7. Definition of Done

- [ ] Criterios de aceptación cumplidos.
- [ ] Código revisado y fusionado mediante Pull Request.
- [ ] Pruebas unitarias y de integración relevantes aprobadas.
- [ ] Autorización validada en backend.
- [ ] Errores y estados de UI implementados.
- [ ] No se registran secretos ni código fuente sensible en logs.
- [ ] Documentación y contrato actualizados.
- [ ] Evidencia adjunta al issue.
- [ ] Despliegue o ejecución local reproducible.

# 8. Riesgos de refinamiento pendientes

- Confirmar la variante y despliegue de Judge0.
- Determinar almacenamiento definitivo de código y casos.
- Definir límite de envíos por usuario y ventana temporal.
- Acordar desempate de ranking.
- Definir política de reintentos ante caídas del evaluador.
