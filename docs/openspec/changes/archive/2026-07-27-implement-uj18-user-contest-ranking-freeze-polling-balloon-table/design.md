# Design

## Components Touched

### Nuevos componentes dentro de ranking

Los nombres exactos deben seguir las convenciones reales, pero la feature necesitará responsabilidades equivalentes a:

- página de ranking;
- sección de resumen;
- aviso congelado;
- tabla;
- encabezado dinámico de problemas;
- celda de problema;
- paginación;
- leyenda;
- explicación de penalización;
- hook/query;
- servicio;
- tipos/adapters;
- helpers de tiempo;
- tests.

No deben crearse carpetas vacías.

### Componentes compartidos modificables

- `frontend/src/features/contests/components/ContestContextHeader.tsx`
- route builders y router;
- endpoints centralizados;
- handlers MSW;
- OpenAPI generado cuando cambie el contrato.

### Componentes reutilizados

- `frontend/src/components/illustrations/GlobeIllustration.tsx`
- `frontend/src/domain/balloon-colors.ts`
- Table y primitivas reales.
- Cards y feedback reales.
- Footer visual de `RecentSubmissionsTable`.

### Áreas de regresión

- Problems;
- Submissions;
- contests user;
- contests admin;
- UserLayout;
- AdminLayout;
- autenticación;
- edición UJ-19;
- navegación contextual.

## Boundaries Respected

- Backend calcula ranking, penalización, puestos y congelamiento.
- El servicio frontend solo consume datos.
- El adapter transforma nombres y estados para presentación, sin alterar resultados.
- La página compone la feature.
- El Header recibe navegación contextual; no conoce roles.
- La tabla no ejecuta requests.
- Las cards no ejecutan requests.
- El countdown no ejecuta requests.
- El mapper de colores permanece fuera de ranking.
- `GlobeIllustration` no contiene lógica de ranking.
- El contexto administrativo, si existe, utiliza un wrapper separado y el mismo contenido.
- Ranking no importa páginas de Problems o Submissions.
- Problems y Submissions no importan componentes internos de ranking.

## Contracts Changed

No external contract changes are confirmed from the provided input.

### Contrato informado del endpoint

Operación equivalente:

- GET `{codigoConcurso}/ranking`.
- Autorización equivalente a rol Usuario.

Response equivalente:

- codigo;
- nombre;
- congelado;
- participantes.

Participante:

- idUsuario;
- nombreUsuario;
- puesto;
- problemasResueltos;
- tiempoTotal;
- cantidadIntentos;
- detalle.

Detalle:

- inciso;
- colorGlobo;
- estado;
- intentos;
- tiempoMinutos.

La ruta completa, DTOs y nulabilidad permanecen `Por confirmar durante baseline`.

### Extensión contractual potencial

Solo cuando el backend actual no los contenga, deben evaluarse:

- problemas;
- totalInscritos;
- totalEnvios;
- problemaMasResuelto;
- fechaInicio;
- fechaFin;
- minutosCongelamiento;
- horaServidor opcional.

Todos los datos competitivos deben respetar el mismo corte de congelamiento.

### Contrato interno de presentación

Modelo conceptual:

- contest identity;
- frozen status;
- problems;
- summary;
- ordered participants;
- timing;
- access state.

El adapter MUST preservar:

- orden;
- puesto;
- problemasResueltos;
- tiempoTotal;
- intentos;
- estados.

## Estado Actual Comprobado

No fue posible ejecutar la inspección local solicitada.

| Evidencia            | Estado                                                      |
| -------------------- | ----------------------------------------------------------- |
| Branch               | Por confirmar durante baseline                              |
| Working tree         | Por confirmar durante baseline                              |
| Audit                | No ejecutado                                                |
| Lint                 | No ejecutado                                                |
| Typecheck            | No ejecutado                                                |
| Tests                | No ejecutados                                               |
| Build                | No ejecutado                                                |
| Feature ranking      | Por confirmar durante baseline                              |
| ContestContextHeader | Por confirmar durante baseline                              |
| Mapper de colores    | Por confirmar durante baseline                              |
| GlobeIllustration    | Por confirmar durante baseline                              |
| Endpoint y DTO       | Por confirmar durante baseline                              |
| Imágenes originales  | No inspeccionadas directamente; solo descripción disponible |

## Arquitectura Integrada

- UserLayout.
- Contest route wrapper.
- ContestContextHeader.
- RankingPage.
- Ranking query.
- Ranking service.
- HttpClient.
- Endpoint ranking.
- Adapter.
- Summary cards.
- Frozen notice.
- Ranking table.
- Client pagination.
- Informational cards.

### Arquitectura conceptual

- `RankingPage`
  - `ContestContextHeader`
  - `FrozenRankingNotice`
  - `RankingSummaryCards`
  - `RankingTable`
    - `RankingProblemCell`
    - `RankingPagination`
  - `RankingCellLegend`
  - `RankingPenaltyExplanation`

La página y los nombres finales deben adaptarse al proyecto.

## Query y Polling

Una única query debe:

- recibir `contestCode`;
- usar una key estable;
- ejecutar la consulta inicial;
- configurar `refetchInterval: 10_000`;
- mantener datos anteriores;
- exponer `isLoading`, `isFetching`, `error` y `data`;
- no contener el reloj actual en la key;
- no utilizar `setInterval` manual.

### Stop condition recomendada

- Próximo:
  - no mantener polling continuo después de recibir el error contractual;
  - permitir reintento manual o una política acotada.
- Activo no congelado:
  - polling cada diez segundos.
- Activo congelado:
  - polling cada diez segundos.
- Finalizado:
  - realizar al menos una consulta que devuelva ranking final;
  - detener polling cuando el contrato confirme finalización y `congelado=false`.
- Error definitivo:
  - detener polling para 401, 403 y 404.
- Error transitorio:
  - seguir la política de retry existente.

## Countdown

El countdown debe usar un helper puro:

- obtener fecha final;
- calcular diferencia;
- hacer clamp;
- formatear duración.

El componente:

- actualiza un estado local cada segundo;
- limpia timer;
- se reinicia con el concurso;
- no decide congelamiento.

### Fuente de tiempo

Preferencia:

1. `fechaFin` y una referencia horaria del servidor.
2. `fechaInicio + duracionMinutos`.
3. Un contrato de dashboard ya usado por el Header.

Si no existe hora del servidor, documentar que el countdown puede reflejar el reloj local mientras el backend sigue siendo autoridad del estado.

## Fuente de las Cuatro Cards

### Alternativa A: derivarlas en frontend desde participantes

**Ventajas**

- No amplía backend.

**Desventajas**

- No permite contar inscritos sin envíos.
- `cantidadIntentos` no equivale a envíos.
- Puede revelar datos incompatibles con congelamiento.

### Alternativa B: consumir endpoints adicionales

**Ventajas**

- Puede reutilizar datos existentes.

**Desventajas**

- Puede mezclar datos en vivo con snapshot.
- Aumenta requests.

### Alternativa C: ampliar el response del ranking

**Ventajas**

- Una sola fuente.
- Congelamiento consistente.
- Evita N+1.

**Desventajas**

- Requiere cambio backend y OpenAPI.

### Decisión recomendada

Adoptar C para cualquier métrica que el response actual no soporte de forma correcta. Inscritos puede provenir de una fuente separada únicamente cuando no revela actividad competitiva y se documenta explícitamente.

## Lista de Problemas

### Alternativa A: derivar de `participantes[0].detalle`

**Ventajas**

- No requiere otro campo.

**Desventajas**

- Falla con ranking vacío.
- Falla con detalle incompleto.
- Puede propagar inconsistencias.

### Alternativa B: reutilizar endpoint de Problems

**Ventajas**

- Puede contener catálogo completo.

**Desventajas**

- Segundo request.
- Debe respetar acceso y congelamiento.
- Puede tener un contrato diferente.

### Alternativa C: agregar `problemas` al ranking

**Ventajas**

- Funciona con cero participantes.
- Fuente estable de inciso y color.
- Sin request adicional.

**Desventajas**

- Extensión backend.

### Decisión recomendada

Adoptar C cuando el response actual no incluya problemas superiores. No usar el primer participante como única fuente.

## Participantes sin Envíos

### Alternativa A: mostrar solo participantes con envíos

**Ventajas**

- Coincide con el algoritmo informado.

**Desventajas**

- Puede contradecir la expectativa de inscritos.
- Distorsiona la card Inscritos.

### Alternativa B: incluir todos los inscritos desde backend

**Ventajas**

- Ranking completo.
- Permite filas con cero resueltos.

**Desventajas**

- Requiere consultar participantes o ajustar el cálculo.

### Decisión recomendada

Confirmar la regla en UJ-18 y backend. Cuando la historia requiera todos los inscritos, backend debe incluirlos con detalles `No intentado`.

## Problema Más Resuelto

Debe preferirse un campo backend cuando la clasificación esté congelada.

Si se deriva de detalles:

- contar estados aceptados del snapshot;
- resolver empate por inciso;
- usar fallback sin aceptaciones;
- no usar datos externos.

## Total de Envíos

Debe provenir de un campo contractual calculado con el corte. No sumar `cantidadIntentos` salvo que backend confirme equivalencia completa.

## Clasificación Congelada

`FrozenRankingNotice` depende exclusivamente de `congelado`.

Durante congelamiento:

- polling continúa;
- tabla mantiene snapshot;
- cards competitivas mantienen snapshot;
- no se muestra información de envíos ocultos.

Al terminar:

- siguiente query devuelve ranking completo;
- aviso desaparece;
- polling puede detenerse.

## Tabla Dinámica

Las columnas fijas:

- puesto;
- participante;
- resueltos;
- penalización.

Las columnas variables:

- un problema por inciso.

Cada celda recibe:

- descriptor superior del problema;
- detalle del participante;
- mapper de color.

El componente presentacional no calcula ranking.

## Mapeo de Celdas

### Aceptado

- globo;
- color contractual;
- tiempo;
- fallos previos;
- texto accesible.

### No resuelto

- estado danger;
- número de fallos;
- sin globo.

### No intentado

- estado neutral;
- `—`;
- sin globo.

### Desconocido

- fallback neutral;
- texto seguro;
- sin crash.

## Paginación Frontend

Estado local:

- `currentPage`;
- page size constante igual a cinco.

Datos derivados:

- total pages;
- start;
- end;
- visible rows.

Después de refetch:

- conservar página válida;
- aplicar clamp cuando sea necesario;
- no alterar el orden o puesto.

## Contexto Administrativo

### Alternativa A: añadir Ranking a Acceso de Usuario

**Ventajas**

- Coherencia con Problems y Mis envíos cuando ya están disponibles.

**Desventajas**

- El endpoint puede exigir exclusivamente Usuario.
- Amplía el alcance.

### Alternativa B: limitar a UserLayout

**Ventajas**

- Coincide con la historia y autorización informada.
- Menor intervención.

**Desventajas**

- El administrador no verá ranking desde su contexto.

### Decisión recomendada

Adoptar B por defecto. Adoptar A únicamente si el baseline confirma:

- rutas contextuales admin existentes;
- autorización compatible;
- patrón de contenido reutilizable;
- documentación previa.

## Loading y Background Refetch

- Loading inicial:
  - skeletons para resumen y tabla.
- Background refetch:
  - conservar datos;
  - indicador discreto opcional;
  - sin parpadeo completo.
- Empty:
  - diferenciar sin inscritos, sin envíos y sin problemas cuando el contrato lo permita.
- Error:
  - mapear 400, 401, 403, 404 e inesperado.

## Referencias Visuales

Las imágenes deben usarse únicamente para:

- jerarquía;
- espaciado;
- estructura de tabla;
- globos;
- resumen;
- paginación;
- cards inferiores.

No deben introducir:

- avatares;
- nombres ficticios;
- crecimiento;
- notificaciones;
- reglas;
- `Ver mi posición`;
- actividad congelada;
- información extensa de problema.

## Impacto por Archivo

| Archivo o área                                                       | Clasificación                                | Acción                          | Motivo                | Riesgo | Pruebas             |
| -------------------------------------------------------------------- | -------------------------------------------- | ------------------------------- | --------------------- | ------ | ------------------- |
| `frontend/src/features/ranking/`                                     | Crear o completar                            | Alojar la feature               | Ownership UJ-18       | Alto   | Unit e integración  |
| `frontend/src/features/contests/components/ContestContextHeader.tsx` | Modificar                                    | Añadir Ranking y active section | Navegación contextual | Alto   | Header y routing    |
| `frontend/src/features/problems/`                                    | Reutilizar sin cambios o adaptar descriptors | Preservar Problemas             | Regresión             | Medio  | Active state        |
| `frontend/src/features/submissions/`                                 | Reutilizar sin cambios o adaptar descriptors | Preservar Mis envíos            | Regresión             | Medio  | Active state        |
| `frontend/src/components/illustrations/GlobeIllustration.tsx`        | Reutilizar sin cambios                       | Mostrar aceptados               | Consistencia visual   | Bajo   | Múltiples colores   |
| `frontend/src/domain/balloon-colors.ts`                              | Reutilizar sin cambios                       | Resolver hexadecimal            | Fuente única          | Medio  | Mapper existente    |
| `frontend/src/features/contests/user/RecentSubmissionsTable.tsx`     | Solo inspeccionar                            | Referencia del footer           | Consistencia visual   | Bajo   | Sin regresión       |
| `frontend/src/routes/`                                               | Modificar                                    | Builder y ruta                  | Acceso directo        | Alto   | Router/refresh      |
| `frontend/src/layouts/`                                              | Reutilizar sin cambios                       | Conservar UserLayout            | Regresión             | Medio  | Layout tests        |
| `frontend/src/auth/`                                                 | Solo inspeccionar                            | Confirmar guard                 | Seguridad             | Alto   | Auth tests          |
| `frontend/src/lib/api/`                                              | Modificar                                    | Endpoint y servicio             | Contrato HTTP         | Alto   | Service tests       |
| `frontend/src/types/api.generated.ts`                                | Regenerar, no editar manualmente             | Sincronizar DTO                 | OpenAPI               | Alto   | api:types/typecheck |
| `frontend/src/mocks/`                                                | Modificar                                    | Handlers del ranking            | Tests                 | Medio  | MSW                 |
| `docs/historias/`                                                    | Crear UJ-18                                  | Documentación                   | Trazabilidad          | Bajo   | Revisión documental |

La tabla final debe enumerar archivos reales de ranking después del baseline.

## Required Tests Per Layer

### Unit

- adapter DTO;
- estados de celda;
- mapper/fallback de color;
- countdown;
- fecha UTC;
- métricas contractuales;
- empate de problema;
- paginación;
- clamp;
- rangos.

### Query

- endpoint;
- key;
- consulta inicial;
- diez segundos;
- veinte segundos;
- desmontaje;
- finalizado;
- error definitivo;
- background refetch.

### Integration

- route;
- Header;
- cards;
- frozen notice;
- tabla;
- globos;
- paginación;
- cards inferiores;
- loading;
- empty;
- errores.

### Contract

- participantes sin envíos;
- problemas superiores;
- total inscritos;
- total envíos;
- snapshot congelado;
- ranking final.

### Regression

- Problems;
- Mis envíos;
- Header;
- UserLayout;
- AdminLayout;
- UJ-19;
- colores;
- concursos;
- OpenAPI;
- audit.

### Manual

- activo;
- congelado;
- finalizado;
- público;
- privado;
- ranking vacío;
- muchos problemas;
- escritorio;
- tablet;
- móvil;
- teclado;
- Network.

## Tradeoffs Accepted

- El polling será HTTP cada diez segundos, no tiempo real push.
- La paginación será local y fija en cinco.
- El countdown dependerá del reloj local cuando no exista hora de servidor.
- El backend puede requerir una extensión para cards y problemas.
- El contexto administrativo queda fuera por defecto.
- Las cards no se renderizarán con datos aproximados que filtren actividad.
- La página mantendrá scroll horizontal cuando haya muchas columnas.

## Implementation Constraints

- Completar baseline antes de implementar.
- No inventar campos.
- No recalcular ranking.
- No ordenar participantes.
- No usar índice como puesto.
- No sumar penalización.
- No derivar envíos de intentos.
- No duplicar polling.
- No ejecutar HTTP por segundo.
- No duplicar colores o globos.
- No hardcodear rutas.
- No mezclar snapshots y datos en vivo.
- No añadir elementos de las referencias fuera del alcance.
- No editar OpenAPI manualmente.
- No cambiar dependencias.
- No usar OpenSpec CLI.
- No hacer commit, push o archive.

## Open Design Questions

### Blocking: response completo

- ¿El DTO incluye problemas superiores?
- ¿Incluye totalInscritos?
- ¿Incluye totalEnvios?
- ¿Incluye problemaMasResuelto?
- ¿Incluye fechas?

### Blocking: participantes sin envíos

- ¿Deben aparecer todos los inscritos?
- ¿El backend actual los omite?

### Blocking: congelamiento consistente

- ¿Las métricas superiores se calculan con el mismo corte?

### Blocking: fuente del countdown

- ¿Qué endpoint entrega fechas?
- ¿Existe hora del servidor?

### Blocking: endpoint y tipos

- ¿Cuál es la ruta completa?
- ¿Cómo se llaman los DTOs?
- ¿Qué nulabilidad tienen?

### Research required: ranking frontend

- ¿La carpeta ya existe?
- ¿Hay implementación parcial?

### Research required: Header

- ¿Cómo se construyen navigation items?
- ¿Qué valores admite active section?

### Research required: colores

- ¿El mapper integrado usa hexadecimal como valor API o visual?

### Research required: context admin

- ¿Ranking debe añadirse bajo Acceso de Usuario?

### Human coordination required: extensión backend

- Cuando falten campos, backend debe acordar la mínima extensión y regenerar OpenAPI.
