
# UJ-08 — Administración de Concursos

## Estado

- frontend implementation functional complete
- authenticated end-to-end complete
- final visual refinement pending
- manual captures pending/non-blocking

## Change asociado

`administracion-concursos`

## Motivo

Documentar la implementación de la vista de administración de concursos siguiendo la misma estructura utilizada en UJ08-UJ09.

## Historias de usuario

| ID | Historia | Prioridad | Estimación |
|---|---|---|---|
| UJ-08 | Como Administrador de Concursos, quiero visualizar y gestionar los concursos creados para dar seguimiento desde el panel administrativo. | Alta | 5 puntos |

## Alcance implementado

Se implementó la vista de administración de concursos con listado, filtros, búsqueda, resumen y paginación, consumiendo el endpoint correspondiente.

## Criterios cumplidos

- Listado paginado.
- Filtros por estado, visibilidad, fecha y búsqueda.
- Resumen de estadísticas.
- Integración con JWT.
- Consumo del endpoint de concursos creados.

## Diseño de la pantalla

> **Captura 1 – Vista principal**

![Vista principal](image.png)

<br>

> **Captura 2 – Filtros y búsqueda**

![Filtros](image-3.png)
![Filtro de ](image-1.png)
![alt text](image-2.png)
<br>

> **Captura 3 – Tabla y paginación**

![alt text](image-4.png)

## Flujo frontend

UI → Hook → Servicio → HttpClient → API → Renderizado.

## Archivos principales

- [frontend/src/features/contests/types.ts](frontend/src/features/contests/types.ts)
- [frontend/src/features/contests/service.ts](frontend/src/features/contests/service.ts)
- [frontend/src/features/contests/hooks.ts](frontend/src/features/contests/hooks.ts)
- [frontend/src/features/contests/ContestsAdminScreen.tsx](frontend/src/features/contests/ContestsAdminScreen.tsx)
- [frontend/src/features/contests/components/ContestsSummaryCards.tsx](frontend/src/features/contests/components/ContestsSummaryCards.tsx)
- [frontend/src/features/contests/components/ContestsFiltersBar.tsx](frontend/src/features/contests/components/ContestsFiltersBar.tsx)
- [frontend/src/features/contests/components/ContestsTable.tsx](frontend/src/features/contests/components/ContestsTable.tsx)
- [frontend/src/pages/AdminContestsPage.tsx](frontend/src/pages/AdminContestsPage.tsx)
- [frontend/src/routes/router.tsx](frontend/src/routes/router.tsx)


#### Cambios realizados

- Se reemplazó el botón de fecha por un campo de tipo date con estilo visual más claro.
- Se hizo funcional el botón de limpiar filtros.
- Se amplió el estado de filtros para incluir la propiedad fecha.
- Se ajustó la tabla para mejorar visualmente su presentación con bordes, sombras y hover.
- Se renombró la columna "Modalidad" como "Visibilidad" para que coincidiera con la propuesta de diseño.

#### Archivos modificados

- [frontend/src/features/contests/components/ContestsFiltersBar.tsx](frontend/src/features/contests/components/ContestsFiltersBar.tsx)
- [frontend/src/features/contests/ContestsAdminScreen.tsx](frontend/src/features/contests/ContestsAdminScreen.tsx)
- [frontend/src/features/contests/types.ts](frontend/src/features/contests/types.ts)
- [frontend/src/features/contests/service.ts](frontend/src/features/contests/service.ts)
- [frontend/src/components/tables/index.tsx](frontend/src/components/tables/index.tsx)
- [frontend/src/features/contests/components/ContestsTable.tsx](frontend/src/features/contests/components/ContestsTable.tsx)
- [frontend/src/mocks/handlers/index.ts](frontend/src/mocks/handlers/index.ts)



## Pruebas realizadas


- Validación de filtros.
![alt text](image-5.png)


## Evidencia sugerida

```text
docs/capturas/admin-concursos-principal.png
docs/capturas/admin-concursos-filtros.png
docs/capturas/admin-concursos-tabla.png
```

## Confirmaciones de seguridad

- Separación entre UI y lógica.
- Consumo de endpoints aprobados.

## Integraciones pendientes

- Refinamiento visual.


## Fuera de alcance

- Creación y edición de concursos.
- Funcionalidades no respaldadas por el backend.
- No busca por filtro

## Conclusión

El feature de administración de concursos quedó consolidado como una vista funcional

- consumo del endpoint de listado base,
- integración del endpoint de concursos creados por administradores de concursos,
- filtros y paginación,
- mejoras visuales y de experiencia.