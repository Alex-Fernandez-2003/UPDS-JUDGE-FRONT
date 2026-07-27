# UJ-18 — Ranking de concurso

## Historia de usuario

Como usuario, quiero consultar la clasificación calculada por el backend según problemas resueltos y penalización ICPC.

## Objetivo funcional

Presentar el snapshot contractual sin recalcular posiciones, penalización, intentos ni estados.

## Alcance implementado

Ruta contextual, navegación, polling de 10 segundos, aviso de congelamiento, countdown local, cuatro cards, tabla dinámica con globos, paginación de cinco filas y dos cards informativas.

## Flujo final

El usuario abre Ranking dentro de un concurso iniciado. Una sola query entrega tabla, problemas, métricas y tiempo. Durante congelamiento todo el snapshot competitivo usa el corte backend; al finalizar la siguiente consulta revela el resultado final.

## Ruta y navegación

`/student/contests/:contestCode/ranking`, protegida por sesión y rol Usuario bajo `UserLayout`. El header incluye Problemas, Mis envíos y Ranking.

## Contrato backend

`GET /api/Concursos/{codigoConcurso}/ranking` devuelve participantes inscritos activos, problemas superiores, métricas del snapshot, fechas, estado y congelamiento. El endpoint limita envíos a inscritos, excluye upsolving y aplica un único corte durante congelamiento.

## Cálculo de clasificación

El backend ordena por problemas resueltos, penalización e ID para orden determinista y asigna puestos compartidos. El frontend conserva orden y `puesto` recibidos.

## Sistema de penalización

La primera aceptación suma minutos transcurridos más 20 por cada fallo previo. Problemas no resueltos no suman tiempo hasta ser aceptados.

## Clasificación congelada

`congelado` es autoritativo. Tabla, total de envíos y problema más resuelto usan el mismo snapshot; inscritos sigue siendo el total activo, pues no revela actividad competitiva.

## Polling de 10 segundos

TanStack Query usa `refetchInterval: 10_000`, conserva datos durante refetch y se detiene tras recibir el ranking final no congelado.

## Temporizador

Se actualiza localmente cada segundo desde `fechaFin`; no genera solicitudes HTTP y se documenta que depende del reloj local ante ausencia de hora de servidor.

## Cards de resumen

Inscritos, Problema más resuelto, Total de envíos y Tiempo restante provienen del response o del countdown local.

## Tabla de ranking

Muestra posición contractual, participante, resueltos, penalización y columnas de problemas entregadas por backend, con scroll horizontal semántico.

## Estados de problemas

Aceptado muestra globo, tiempo y fallos previos; No resuelto muestra fallos sin globo; No intentado muestra estado neutral.

## Globos y colores

Reutiliza `GlobeIllustration` y `balloon-colors.ts`; un color desconocido es neutral, no rojo por defecto.

## Paginación frontend

Cinco participantes por página, rango visible, anterior/siguiente y clamp cuando polling reduce el total.

## Leyenda de celdas

La primera card inferior explica aceptado, no resuelto y no intentado.

## Accesibilidad y responsive

La tabla incluye caption, headers con scope, labels de celdas, botones etiquetados, focus y scroll horizontal. Cards usan grilla 4/2/1.

## Archivos creados

- `frontend/src/features/ranking/types.ts`
- `frontend/src/features/ranking/service.ts`
- `frontend/src/features/ranking/hooks.ts`
- `frontend/src/features/ranking/utils.ts`
- `frontend/src/features/ranking/RankingPage.tsx`
- `frontend/src/features/ranking/utils.test.ts`

## Archivos modificados

Controller y DTO de ranking backend; endpoints, rutas y navegación contextual frontend.

## Pruebas automatizadas

Tests unitarios cubren formato de countdown y paginación. La suite global registra la evidencia final.

## Validaciones técnicas

Se ejecutaron audit, generación OpenAPI, lint, typecheck, tests, build, dev y diff check.

## Evidencias manuales pendientes

### Evidencia 1 — Navegación de Ranking

- [ ] Ranking visible en ContestContextHeader.
- [ ] Ranking activo.
- Ruta sugerida: `docs/evidencias/UJ-18/01-navegacion-ranking.png`

### Evidencia 2 — Ranking activo

- [ ] Cuatro cards.
- [ ] Tabla.
- [ ] Participantes y penalización.
- Ruta sugerida: `docs/evidencias/UJ-18/02-ranking-activo.png`

### Evidencia 3 — Globos y estados

- [ ] Aceptados con globos de distintos colores.
- [ ] Intentos fallidos visibles.
- [ ] No resueltos en rojo.
- [ ] No intentados neutrales.
- Ruta sugerida: `docs/evidencias/UJ-18/03-globos-y-celdas.png`

### Evidencia 4 — Ranking congelado

- [ ] Aviso visible.
- [ ] Snapshot sin actualizaciones posteriores al corte.
- Ruta sugerida: `docs/evidencias/UJ-18/04-ranking-congelado.png`

### Evidencia 5 — Ranking final

- [ ] Aviso oculto.
- [ ] Resultados completos.
- Ruta sugerida: `docs/evidencias/UJ-18/05-ranking-final.png`

### Evidencia 6 — Temporizador

- [ ] Cuenta regresiva.
- [ ] Estado final.
- Ruta sugerida: `docs/evidencias/UJ-18/06-temporizador.png`

### Evidencia 7 — Paginación

- [ ] Cinco participantes.
- [ ] Página siguiente.
- [ ] Última página parcial.
- Ruta sugerida: `docs/evidencias/UJ-18/07-paginacion.png`

### Evidencia 8 — Responsive

- [ ] Escritorio.
- [ ] Tablet.
- [ ] Móvil.
- [ ] Scroll horizontal.
- Ruta sugerida: `docs/evidencias/UJ-18/08-responsive.png`

## Limitaciones o pendientes reales

No existe infraestructura de tests backend en la solución: `dotnet test` restaura pero no informa casos. El endpoint usa `IActionResult`, por lo que el OpenAPI regenerado registra la operación pero no expone esquemas reutilizables; los tipos de presentación se mantienen locales y reflejan el DTO contractual.

## Estado final

Implementación técnica completada; únicamente evidencias manuales pendientes.
