# UJ-18 — Fix de regresión del ranking

## Síntomas

El ranking normal mostraba participantes sin resultados competitivos, y la navegación administrativa terminaba en la pantalla 404 del frontend. Durante el flujo administrativo React también advertía que `error={false}` llegaba a un elemento DOM.

## Causa del ranking sin datos

El request autenticado real respondió HTTP 200 con tres participantes y tres problemas, pero `totalEnvios = 0`: todos los detalles estaban en `No intentado`. La base contenía once envíos, pero sus timestamps quedaban después del fin del concurso por la conversión doble de zona horaria del seed (`now() AT TIME ZONE 'UTC'` asignado a `timestamptz`). El endpoint los excluía correctamente por su corte temporal.

Además, el normalizador descartaba `problemaMasResuelto`, `duracionMinutos`, `minutosCongelamiento` e `idUsuario`. Esa pérdida no causaba la tabla vacía, pero se corrigió para preservar todo el contrato actual.

## Causa del 404 administrativo

Era un 404 de React Router: el builder y el enlace producían `/admin/user-access/contests/:contestCode/ranking`, pero `router.tsx` no registraba esa ruta. `RankingPage` no se montaba y no había request de ranking.

## Comportamiento anterior

La ruta normal alcanzaba el endpoint, pero el fixture temporal producía un snapshot sin envíos. La ruta administrativa caía en el wildcard 404.

## Corrección aplicada

- El seed usa `date_trunc('second', now()) - interval '3 hours'`, sin reinterpretar UTC como hora local.
- El normalizador preserva todos los campos contractuales usados o transportados.
- El router registra la ruta administrativa bajo `AdminLayout` y reutiliza `RankingPage admin`.
- `FormField` no reenvía su prop privada `error` a controles DOM nativos; utiliza `aria-invalid`.

## Ruta normal

`/student/contests/:contestCode/ranking`, bajo `UserLayout`.

## Ruta administrativa

`/admin/user-access/contests/:contestCode/ranking`, bajo `AdminLayout`, sin `UserLayout` anidado.

## Query y endpoint

Ambos contextos llaman `GET /api/Concursos/{contestCode}/ranking` con la misma query key y el mismo polling de diez segundos.

## Normalización contractual

Los payloads completos preservan problemas, participantes, detalle, métricas y metadatos temporales. Un payload sin `problemas` continúa generando `RankingContractError`; arrays vacíos explícitos siguen siendo válidos.

## Pruebas de regresión

Las pruebas cubren payload backend completo, preservación del mapper, tres filas y columnas dinámicas, cards, penalización, globos, builder codificado, navegación con el router real, `AdminLayout`, active state y ausencia de 404. Una prueba focal confirma que `FormField` no emite `error` al DOM.

## Validaciones técnicas

La llamada autenticada posterior al seed respondió HTTP 200 con 3 participantes, 3 problemas, 11 envíos y resultados 2/125, 2/160 y 1/70. La suite automatizada y las validaciones finales quedan registradas en `tasks.md`.

## Evidencias manuales

El responsable del proyecto confirmó manualmente el funcionamiento del ranking normal y administrativo, incluyendo datos, layout administrativo y navegación contextual.

## Estado final

Hotfix activo, técnicamente validado y confirmado manualmente. Permanece sin archivar hasta recibir una instrucción explícita de cierre.
