# UJ-11 — Lista de concursos filtrados

## Estado de esta entrega parcial

Este change **no completa UJ-11** ni implementa la lista de concursos. La entrega incorpora al dashboard del usuario estadísticas rápidas y una tabla de los cinco envíos recientes.

## Contrato confirmado

- `GET /api/ParticipanteConcursos/stats-contest` alimenta estadísticas independientes.
- `GET /api/Envios/mis-envios` recibe `resultado`, `concursoCodigo`, `inciso`, `pagina` y `tamanoPagina`; el dashboard consulta `pagina=1` y `tamanoPagina=5`.
- `consumoTiempo` se presenta en milisegundos (`ms`) sin conversión de escala.
- `consumoMemoria` se presenta en megabytes (`MB`) sin conversión de escala.
- El backend devuelve métricas no anulables (`float` e `int`), aunque la capa visual muestra `—` ante datos inválidos defensivamente.
- El DTO actual no entrega un campo Archivo: la columna visual de referencia se omite y queda pendiente de un contrato backend futuro.
- El backend crea envíos con veredicto `Pendiente`; se visualiza como `EVALUANDO`.

## Dashboard de usuario

La sección de envíos recientes representa el historial general del usuario, no un único concurso. Incluye ID, concurso, lenguaje, problema, veredicto, tiempo, memoria y fecha. `Actualizar` vuelve a consultar solo los envíos recientes, conserva los datos previos durante el refetch cuando TanStack Query puede hacerlo y evita una segunda activación mientras actualiza.

No se muestra un botón de filtros decorativo ni controles de paginación sin comportamiento. La metadata se calcula con `total`, `pagina`, `tamanoPagina` y la cantidad real recibida.

## Trabajo futuro separado

1. **Dashboard actual:** estadísticas y cinco envíos recientes, sin filtros visuales ni navegación de páginas.
2. **Historial completo futuro:** ruta dedicada, filtros funcionales y paginación interactiva reutilizando los parámetros ya soportados.
3. **UJ-11 principal:** lista de concursos con filtros En curso, Próximo y Finalizado; permanece fuera de este change y no consume `GET /api/Concursos` aquí.

## Evidencia sugerida

- Dashboard de usuario con estadísticas y tabla de envíos recientes.
- Valores `2000 ms`, `1024 MB`, `0 ms` y `0 MB`.
- Estado de métricas ausentes como `—`.
- Refresh de envíos sin recarga de página.
- Última página parcial y estado vacío mediante datos de prueba.




# UJ-11-Parte2-Implementación de la vista de concursos de usuario

## Objetivo

Se implementó la vista pública de concursos para los usuarios del sistema, permitiendo consultar concursos disponibles, aplicar filtros, visualizar información relevante del concurso y mejorar la experiencia de usuario mediante una interfaz más intuitiva y consistente.

---

# Cambios realizados

## 1. Consumo del endpoint público de concursos

Se agregó el endpoint público `Concursos` en:

```
frontend/src/lib/api/endpoints.ts
```

para consumir:

```
GET /api/Concursos
```

---

## 2. Extensión de los parámetros de búsqueda

Se extendió la interfaz:

```
frontend/src/features/contests/types.ts
```

agregando el parámetro:

```ts
modalidad
```

permitiendo filtrar concursos por:

- Público
- Privado

---

## 3. Servicio para obtener concursos públicos

Se creó el servicio:

```
frontend/src/features/contests/user/service.ts
```

con la función:

```ts
listPublicConcursos()
```

encargada de consumir el endpoint público de concursos.

---

## 4. Hook para la consulta de concursos

Se agregó el hook:

```
frontend/src/features/contests/hooks.ts
```

```ts
usePublicConcursosList()
```

para encapsular la consulta, manejo de estados y actualización automática mediante React Query.

---

## 5. Reutilización de la barra de filtros

Se modificó el componente:

```
frontend/src/features/contests/admin/components/ContestsFiltersBar.tsx
```

permitiendo reutilizarlo tanto para administración como para la vista pública.

Se añadieron filtros por:

- Estado
- Modalidad
- Código del concurso

---

## 6. Acceso desde el Landing del usuario

Se actualizó:

```
frontend/src/features/auth/pages/UserLandingPage.tsx
```

agregando un acceso directo hacia la lista de concursos disponibles.

---

## 7. Redirección después del login

Se modificó:

```
frontend/src/lib/auth/session.ts
```

para que los estudiantes autenticados ingresen directamente a:

```
/student/concursos
```

---

## 8. Creación de la página de concursos

Se creó:

```
frontend/src/features/contests/user/pages/UserContestsPage.tsx
```

incluyendo:

- Breadcrumbs.
- Barra de filtros.
- Paginación.
- Botón para actualizar la lista.
- Consulta paginada de concursos.

---

## 9. Creación del componente de tarjetas

Se creó el componente:

```
frontend/src/features/contests/user/components/UserContestsGrid.tsx
```

encargado de mostrar cada concurso mediante tarjetas responsivas.

---

## 10. Registro de la ruta protegida

Se registró en:

```
frontend/src/routes/router.tsx
```

la ruta:

```ts
routes.studentListCompetitions
```

para permitir el acceso únicamente a usuarios autenticados.

---

# Mejoras realizadas en las tarjetas de concursos

Posteriormente se realizaron diversas mejoras funcionales y visuales sobre el componente `ContestCard` para brindar una mejor experiencia al usuario.

---

## 11. Contador regresivo del concurso

Se implementó un contador en tiempo real para concursos activos.

El contador disminuye automáticamente cada segundo utilizando un `useEffect`.

```tsx
const [remaining, setRemaining] = useState(
    contest.segundosRestantes ?? 0
)
```

El tiempo restante se actualiza automáticamente mientras el concurso permanece activo.

---

## 12. Barra de progreso del tiempo

Se incorporó una barra de progreso utilizando el componente:

```tsx
<ProgressBar />
```

La barra representa el porcentaje del tiempo transcurrido.

Su comportamiento es el siguiente:

- Al iniciar el concurso la barra comienza vacía.
- Conforme disminuye el tiempo restante, la barra aumenta.
- Al finalizar el concurso la barra alcanza el 100%.

El porcentaje se calcula mediante:

```tsx
((TiempoTotal - TiempoRestante) / TiempoTotal) * 100
```

La barra únicamente se muestra cuando el concurso está en estado **Activo**.

---

## 13. Flujo de inscripción

Se implementó el proceso de inscripción directamente desde la tarjeta del concurso.

### Concursos públicos

Cuando el usuario no está inscrito y el concurso aún no comienza, se muestra:

```
Inscribirse
```

---

### Concursos privados

Cuando el usuario selecciona **Inscribirse**, la tarjeta reemplaza el botón por un formulario de acceso.

Se agregó un estado local para controlar este comportamiento.

```tsx
showPasswordInput
```

Mostrando:

- Campo de contraseña.
- Botón **Acceder**.

---

## 14. Restricción de inscripción

Se modificó la lógica de inscripción para que únicamente sea posible cuando el concurso está en estado:

```
Próximo
```

No es posible inscribirse cuando:

- Activo
- Finalizado

La condición quedó encapsulada mediante:

```tsx
const puedeInscribirse =
    !contest.yaInscrito &&
    contest.estadoTiempo === 'Proximo'
```

---

## 15. Reubicación del botón de inscripción

Inicialmente el botón aparecía junto a la modalidad del concurso.

Posteriormente se reubicó debajo de la descripción para mejorar la distribución del contenido.

Beneficios obtenidos:

- Mayor legibilidad.
- Mejor alineación.
- Tarjetas visualmente homogéneas.

---

## 16. Uniformidad en las tarjetas

Se modificó la estructura utilizando Flexbox.

```tsx
<Card className="flex h-full flex-col p-6">
```

y

```tsx
<div className="flex h-full flex-col gap-4">
```

permitiendo que todas las tarjetas mantengan la misma altura.

Asimismo, el bloque inferior quedó anclado mediante:

```tsx
mt-auto
```

---

## 17. Altura uniforme del panel informativo

Se asignó una altura mínima al panel que muestra:

- Inicio del concurso.
- Tiempo restante.
- Información de finalización.

Con ello se evita que las tarjetas cambien de tamaño según el contenido mostrado.

---


## 18. Personalización visual del estado

Se reemplazó el uso del componente `Badge` por un diseño personalizado para representar visualmente el estado del concurso.

Se agrego en el token.css 5 variables de colores que son las siguientes:
  --private-card:#ea580c; Globe
  --public-card:#64748b; Lock
  --active-card:#15803d; Verde
  --soon-card: #1d4ed8; Azul
  --finished-card: #475569; Gris

Se definieron los siguientes estilos:

| Estado | Color |
|---------|--------|
| Activo | Verde |
| Próximo | Azul |
| Finalizado | Gris |

Cada estado posee un color distintivo que facilita su identificación.

---

## 19. Identificación de la modalidad

Se incorporaron iconos utilizando **lucide-react**.

### Público

- Icono 🌍 (`Globe`)
- Color gris

### Privado

- Icono 🔒 (`Lock`)
- Color naranja

Esto permite identificar rápidamente la modalidad del concurso sin depender únicamente del texto.

---

## 20. Indicador visual de concurso activo

Como mejora estética se añadió un indicador animado para concursos activos.

El indicador utiliza un pequeño punto con efecto de pulso, proporcionando una sensación visual de que el concurso se encuentra en ejecución.

---

# Pruebas


# Resultado obtenido

Con estas mejoras la vista de concursos ofrece una experiencia más intuitiva y consistente.

Se consiguió:

- Consumo del endpoint público de concursos.
- Consulta paginada de concursos.
- Filtros por estado, modalidad y búsqueda.
- Navegación desde el landing del usuario.
- Redirección automática después del login.
- Tarjetas responsivas para la visualización de concursos.
- Contador regresivo en tiempo real para concursos activos.
- Barra de progreso del tiempo restante.
- Inscripción diferenciada para concursos públicos y privados.
- Acceso mediante contraseña para concursos privados.
- Restricción de inscripción únicamente para concursos próximos.
- Tarjetas con alturas uniformes y distribución consistente.
- Identificación visual mediante colores para el estado del concurso.
- Identificación mediante iconos y colores para la modalidad.
- Indicador animado para concursos activos.
- Interfaz más moderna y alineada con plataformas de programación competitiva como Codeforces, AtCoder y DOMjudge.