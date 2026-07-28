# Proposal

## Problem Statement

El change `implement-uj18-user-contest-ranking-freeze-polling-balloon-table` implementará la contribución frontend de UJ-18 dentro del flujo contextual de un concurso de UPDS JUDGE.

La historia es:

> Como usuario, quiero ver el ranking calculado por problemas resueltos y por la penalización ICPC: minutos hasta la primera aceptación más veinte minutos por cada intento fallido anterior a dicha aceptación.

El backend informado ya calcula:

- posición;
- problemas resueltos;
- penalización;
- estado por problema;
- intentos fallidos;
- congelamiento;
- orden y empates.

El frontend debe presentar esos datos sin recalcularlos ni reordenarlos, integrar una ruta contextual de ranking, consultar el endpoint cada diez segundos, mostrar globos con los colores contractuales de los problemas y mantener una clasificación congelada durante los últimos `minutosCongelamiento` del concurso.

La fuente de alcance de este briefing es el contenido proporcionado por el usuario. :contentReference[oaicite:0]{index=0}

Las referencias `Contest Standings Table.png` y `balloons-reference.jpeg` fueron adjuntadas dentro de un archivo comprimido. En esta sesión no fue posible abrirlas individualmente. Las decisiones visuales de este briefing se basan exclusivamente en la descripción proporcionada por el usuario y deberán confirmarse visualmente durante baseline.

No fue posible acceder desde esta sesión a:

- `C:\dev\UPDS-JUDGE-FRONT`;
- `C:\dev\UPDSjudge`;
- el estado de Git;
- los scripts del frontend;
- el controller real;
- Swagger/OpenAPI;
- `api.generated.ts`;
- la implementación actual de `ContestContextHeader`;
- el mapper de colores;
- `GlobeIllustration`;
- la feature de ranking.

Por tanto, permanecen `Por confirmar durante baseline`:

- ruta completa del endpoint;
- DTOs y casing exactos;
- estructura actual de `features/ranking`;
- ruta contextual definitiva;
- query keys;
- campos superiores de problemas;
- total contractual de inscritos;
- total contractual de envíos;
- fuente de fechas;
- contexto administrativo;
- comportamiento de participantes inscritos sin envíos;
- resultados de audit, lint, typecheck, tests y build.

### Brechas contractuales que deben resolverse

1. El response informado puede no contener una lista superior de problemas. Sin esa lista, una clasificación vacía no permite construir columnas dinámicas.
2. Los participantes parecen derivarse de los envíos. Un inscrito sin envíos podría quedar fuera.
3. `cantidadIntentos` no equivale necesariamente al número total de envíos.
4. El response informado no confirma `totalInscritos`.
5. El response informado no confirma `totalEnvios`.
6. El response informado no confirma fechas o duración para el temporizador.
7. Las cuatro cards deben usar el mismo corte de congelamiento que la tabla, para no revelar actividad posterior.
8. El catálogo de colores y la representación hexadecimal deben confirmarse contra el mapper integrado por UJ-19.
9. La disponibilidad del ranking bajo `Acceso de Usuario` administrativo debe confirmarse contra rutas, autorización y arquitectura existentes.

## Goals

- Crear exactamente los cuatro artefactos OpenSpec bajo `docs/openspec/changes/implement-uj18-user-contest-ranking-freeze-polling-balloon-table/`.
- Inspeccionar completamente la documentación de UJ-18 y UJ-19.
- Revisar las referencias visuales originales durante baseline.
- Registrar el baseline de Git, auditoría y validaciones técnicas.
- Crear o completar `frontend/src/features/ranking/` siguiendo las convenciones reales.
- Agregar una ruta contextual de ranking bajo `UserLayout`.
- Agregar `Ranking` a `ContestContextHeader`.
- Mantener `Problemas`, `Mis envíos` y `Ranking` como navegación basada en rutas.
- Preservar el contexto administrativo existente y evaluarlo sin asumirlo.
- Consumir el endpoint contractual mediante la infraestructura HTTP existente.
- Utilizar una query key estable basada en ranking y código del concurso.
- Configurar polling de `10 000 ms`.
- Evitar intervalos duplicados, N+1 y requests por subcomponente.
- Mantener datos anteriores durante background refetch cuando la infraestructura lo permita.
- Mostrar `FrozenRankingNotice` únicamente cuando `congelado` sea verdadero.
- No reconstruir actividad oculta durante congelamiento.
- Revelar el ranking final después del fin mediante una nueva consulta.
- Implementar un temporizador local que actualice cada segundo sin hacer HTTP cada segundo.
- Mostrar cuatro cards:
  - Inscritos;
  - Problema más resuelto;
  - Total de envíos;
  - Tiempo restante.
- Mantener las cards consistentes con el snapshot público congelado.
- Mostrar una tabla dinámica con:
  - Posición;
  - Participante;
  - Problemas resueltos;
  - Penalización;
  - una columna por problema.
- Utilizar `puesto` del backend.
- Utilizar `problemasResueltos` del backend.
- Utilizar `tiempoTotal` del backend como penalización.
- Reutilizar `GlobeIllustration` únicamente en problemas aceptados.
- Reutilizar el mapper de colores integrado por UJ-19.
- Mostrar intentos fallidos de forma semánticamente correcta.
- Implementar paginación frontend fija de cinco participantes.
- Mantener la página válida durante polling.
- Mostrar exactamente dos cards informativas inferiores:
  - Leyenda de celdas;
  - Sistema de penalización.
- Cubrir loading inicial, background refetch, empty y errores contractuales.
- Mantener accesibilidad y responsive.
- Actualizar OpenAPI cuando el contrato cambie.
- Crear la documentación UJ-18.
- Preparar evidencias manuales sin crear imágenes vacías.

## Non-Goals

- No implementar un panel administrativo de ranking por defecto.
- No editar manualmente el ranking.
- No recalcular el algoritmo ICPC en frontend.
- No reordenar participantes.
- No calcular posiciones con `index + 1`.
- No implementar WebSockets.
- No implementar Server-Sent Events.
- No utilizar un intervalo de polling distinto de diez segundos.
- No mostrar `Enviado durante congelamiento`.
- No mostrar `Ver mi posición`.
- No agregar perfiles, avatares remotos, universidades o países.
- No implementar búsqueda, filtros, exportación u orden manual.
- No hacer configurable el tamaño de página.
- No crear la card `Información del problema`.
- No mostrar `Última actualización`.
- No mostrar porcentajes de crecimiento.
- No agregar enlaces a reglas.
- No implementar nuevos colores.
- No duplicar `GlobeIllustration`.
- No duplicar el mapper de colores.
- No modificar el juez.
- No modificar veredictos.
- No cambiar autenticación, JWT, roles o sesión.
- No rediseñar layouts.
- No modificar dependencias npm.
- No implementar código, modificar archivos, hacer commit, push o archive durante este briefing.

## Affected Areas

### OpenSpec

- `docs/openspec/changes/implement-uj18-user-contest-ranking-freeze-polling-balloon-table/proposal.md`
- `docs/openspec/changes/implement-uj18-user-contest-ranking-freeze-polling-balloon-table/spec.md`
- `docs/openspec/changes/implement-uj18-user-contest-ranking-freeze-polling-balloon-table/design.md`
- `docs/openspec/changes/implement-uj18-user-contest-ranking-freeze-polling-balloon-table/tasks.md`

### Ranking

- `frontend/src/features/ranking/`
- página contextual;
- componentes;
- servicio;
- hook;
- query key;
- tipos;
- adapters;
- mappers;
- formatters;
- paginación;
- tests.

### Navegación contextual

- `frontend/src/features/contests/components/ContestContextHeader.tsx`
- route builders;
- router;
- active section;
- posibles wrappers user/admin.

### Reutilización

- `frontend/src/components/illustrations/GlobeIllustration.tsx`
- `frontend/src/domain/balloon-colors.ts`
- componentes base de Table, Card, Alert, Badge, Button, Skeleton y paginación.
- `frontend/src/features/contests/user/RecentSubmissionsTable.tsx`, únicamente como referencia del footer.

### Contratos y mocks

- `frontend/src/lib/api/`
- `frontend/src/types/api.generated.ts`
- `frontend/src/mocks/`
- controller y DTOs del backend.

### Documentación

- documentación UJ-18;
- documentación UJ-19;
- cambios OpenSpec y retrospectivas relacionadas.

## Assumptions

- Existe `ContestContextHeader` con una API de navegación configurable.
- Existe `GlobeIllustration`.
- Existe `frontend/src/domain/balloon-colors.ts`.
- El endpoint devuelve el ranking completo, sin paginación backend.
- El endpoint permite polling sin un límite contractual más restrictivo.
- TanStack Query o una librería equivalente está integrada.
- Existe `UserLayout`.
- Existe una ruta contextual para Problemas y Mis envíos.
- El backend devuelve `congelado`.
- El backend devuelve `puesto`, `problemasResueltos` y `tiempoTotal`.
- El backend devuelve detalle por problema con inciso, color, estado, intentos y tiempo.
- El frontend puede reutilizar los componentes base sin crear una tabla paralela.
- La autorización contractual principal es el rol `Usuario`, pendiente de confirmar en controller.
- No se confirma que el endpoint incluya todos los inscritos.
- No se confirma que el response incluya problemas superiores, fechas o métricas de cards.
- No se confirma la ruta administrativa.

## Dependencies

- Acceso al repositorio frontend.
- Acceso de solo lectura al backend.
- Documentación real de UJ-18 y UJ-19.
- Referencias visuales extraídas del ZIP.
- Contrato OpenAPI vigente.
- Confirmación del response del ranking.
- Confirmación de la fuente de fecha y hora.
- Confirmación del comportamiento de participantes sin envíos.
- Confirmación de métricas compatibles con congelamiento.
- Infraestructura de pruebas, fake timers y MSW.

## Risks

### Risk 1: Recalcular el ranking en frontend

- Probability: Medium.
- Impact: Critical; puede divergir del algoritmo contractual.
- Mitigation: Tratar el response como ordenado y calculado.
- Verification: No existen sorts ni acumulaciones de penalización en el adapter.

### Risk 2: Reordenar puestos compartidos

- Probability: Medium.
- Impact: High.
- Mitigation: Preservar el orden recibido.
- Verification: Caso `1, 2, 2, 4` conserva posiciones.

### Risk 3: Usar `index + 1`

- Probability: Medium.
- Impact: High.
- Mitigation: Renderizar exclusivamente `puesto`.
- Verification: Test con empate.

### Risk 4: Sumar dos veces la penalización

- Probability: Medium.
- Impact: Critical.
- Mitigation: Mostrar `tiempoTotal` sin aplicar veinte minutos adicionales.
- Verification: Test con valor contractual conocido.

### Risk 5: Confundir intentos fallidos con envíos totales

- Probability: High.
- Impact: High.
- Mitigation: No derivar `totalEnvios` desde `cantidadIntentos` sin contrato.
- Verification: Card usa un campo contractual específico.

### Risk 6: Omitir participantes sin envíos

- Probability: High.
- Impact: High.
- Mitigation: Confirmar fuente del backend y ampliar el DTO si UJ-18 exige inscritos.
- Verification: Test con inscrito sin envíos.

### Risk 7: No poder mostrar columnas con ranking vacío

- Probability: High.
- Impact: High.
- Mitigation: Incluir lista superior de problemas o reutilizar un contrato apropiado.
- Verification: Ranking vacío conserva encabezados de problemas.

### Risk 8: Tabla congelada y cards en vivo

- Probability: High.
- Impact: Critical; revela actividad oculta.
- Mitigation: Calcular cards con el mismo corte en backend.
- Verification: Durante congelamiento, tabla y cards permanecen consistentes.

### Risk 9: Revelar actividad posterior al corte

- Probability: Medium.
- Impact: Critical.
- Mitigation: No combinar ranking con endpoints en vivo.
- Verification: Network solo usa contratos compatibles con snapshot.

### Risk 10: Polling duplicado

- Probability: Medium.
- Impact: High.
- Mitigation: Una sola query con `refetchInterval`.
- Verification: Fake timers muestran una petición por intervalo.

### Risk 11: Requests cada segundo

- Probability: Medium.
- Impact: High.
- Mitigation: Countdown local separado del polling.
- Verification: Network no cambia cada segundo.

### Risk 12: Memory leaks

- Probability: Medium.
- Impact: High.
- Mitigation: Usar lifecycle de query y cleanup del countdown.
- Verification: Desmontaje cancela timers.

### Risk 13: Reiniciar paginación en cada polling

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mantener estado local y hacer clamp solo cuando sea inválido.
- Verification: Polling conserva la página dos.

### Risk 14: Usar paginación server-side

- Probability: Low.
- Impact: Medium.
- Mitigation: Confirmar que el endpoint devuelve todo y paginar con slice.
- Verification: No se envían params de página.

### Risk 15: Mostrar más de cinco filas

- Probability: Medium.
- Impact: Medium.
- Mitigation: Page size constante igual a cinco.
- Verification: Casos con seis, diez y once participantes.

### Risk 16: Hardcodear problemas

- Probability: Medium.
- Impact: High.
- Mitigation: Generar columnas desde el contrato.
- Verification: Tests con uno, cuatro y más problemas.

### Risk 17: Usar globo rojo fijo

- Probability: Medium.
- Impact: High.
- Mitigation: Resolver hexadecimal mediante mapper.
- Verification: Varias columnas muestran colores distintos.

### Risk 18: Duplicar mapper de colores

- Probability: Medium.
- Impact: Medium.
- Mitigation: Importar la fuente compartida de UJ-19.
- Verification: Búsqueda global sin catálogo nuevo.

### Risk 19: Usar color como único indicador

- Probability: Medium.
- Impact: High.
- Mitigation: Añadir texto accesible y símbolos semánticos.
- Verification: La celda mantiene significado sin color.

### Risk 20: Romper ContestContextHeader

- Probability: Medium.
- Impact: High.
- Mitigation: Extender su API tipada sin cambiar rutas previas.
- Verification: Problemas y Mis envíos conservan active state.

### Risk 21: Hardcodear rutas de usuario

- Probability: Medium.
- Impact: High.
- Mitigation: Usar descriptors o builders inyectados.
- Verification: El Header no contiene un path de usuario literal.

### Risk 22: Romper AdminLayout

- Probability: Medium.
- Impact: High.
- Mitigation: Evaluar contexto admin y reutilizar contenido sin UserLayout.
- Verification: Rutas administrativas existentes permanecen.

### Risk 23: Mostrar congelamiento después del final

- Probability: Medium.
- Impact: High.
- Mitigation: Backend autoritativo y refetch final.
- Verification: `congelado=false` elimina el aviso.

### Risk 24: Desfase UTC

- Probability: Medium.
- Impact: High.
- Mitigation: Usar fechas con zona y helpers puros.
- Verification: Tests con UTC y zona local.

### Risk 25: Duplicar datos entre hooks

- Probability: Medium.
- Impact: Medium.
- Mitigation: Una query de ranking y contratos de presentación derivados.
- Verification: No existen hooks HTTP por card o tabla.

### Risk 26: Borrar tabla durante background refetch

- Probability: Medium.
- Impact: Medium.
- Mitigation: Mantener datos anteriores durante fetching.
- Verification: El refetch no reemplaza filas por skeleton completo.

### Risk 27: Copiar elementos no solicitados

- Probability: Medium.
- Impact: Medium.
- Mitigation: Usar las imágenes solo como composición.
- Verification: No existen avatares, reglas, `Ver mi posición`, crecimiento ni tercera card.

## Rollback Strategy

- Retirar la ruta y el item `Ranking` conservando `ContestContextHeader`.
- Retirar la feature de ranking sin modificar Problems o Mis envíos.
- Restaurar el tipo anterior de active section si no queda ningún consumidor.
- Revertir cambios OpenAPI junto con cualquier extensión backend asociada.
- Restaurar handlers MSW anteriores.
- No revertir el mapper de colores ni `GlobeIllustration`, porque pertenecen a cambios previos.
- No modificar funcionalidades de UJ-19 durante rollback.
- Validar después del rollback:
  - login;
  - UserLayout;
  - AdminLayout;
  - Problemas;
  - Mis envíos;
  - concursos;
  - edición;
  - rutas directas;
  - lint;
  - typecheck;
  - tests;
  - build.

## Success Criteria

- Existe una feature de ranking.
- Existe una ruta contextual directa.
- `Ranking` aparece en `ContestContextHeader`.
- La sección activa depende de la ruta.
- `UserLayout` permanece.
- El frontend conserva el orden del backend.
- Se utiliza `puesto`.
- Se utiliza `problemasResueltos`.
- Se utiliza `tiempoTotal` como penalización.
- Las columnas son dinámicas.
- Los aceptados muestran `GlobeIllustration`.
- El globo usa el color contractual.
- Los no resueltos muestran fallos y no muestran globo.
- Los no intentados son neutrales.
- El polling ocurre cada diez segundos.
- El countdown actualiza cada segundo sin HTTP.
- El aviso congelado depende de `congelado`.
- El ranking final se revela después del final.
- Las cuatro cards usan datos contractuales consistentes.
- La paginación es frontend y usa cinco filas.
- Polling no reinicia la página.
- Existen exactamente dos cards inferiores.
- No se muestran elementos visuales fuera de alcance.
- Loading, empty y errores funcionan.
- La tabla es accesible y responsive.
- Audit permanece sin regresiones.
- OpenAPI queda sincronizado.
- Lint, typecheck, tests y build pasan.
- Dev inicia.
- La documentación UJ-18 existe.
- Las evidencias manuales quedan pendientes.
