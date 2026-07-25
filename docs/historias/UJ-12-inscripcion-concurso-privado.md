# UJ-12 — Inscripción a concursos públicos y privados

## Estado

**Integración frontend implementada; validación manual con backend pendiente.**

## Flujo

Las cards de `UserContestsPage` derivan su acción con una política central pura:

- próximo público no inscrito: abre confirmación pública;
- próximo privado no inscrito: solicita contraseña;
- próximo inscrito: muestra `Inscrito`;
- concurso activo no inscrito: informa que las inscripciones están cerradas;
- finalizado privado no inscrito: bloquea el acceso de consulta.

La confirmación reutiliza un único modal. La contraseña queda únicamente en estado local del modal, se limpia al cancelar o completar el envío y no se agrega a rutas, storage, logs ni mutation keys.

## Contrato

```http
POST /api/ParticipanteConcursos/unirse
Content-Type: application/json
```

Payload público:

```json
{ "codigo": "contest-code", "contrasena": null }
```

Payload privado:

```json
{ "codigo": "contest-code", "contrasena": "valor-efimero" }
```

Respuesta esperada:

```json
{ "mensaje": "Inscripción registrada.", "codConcurso": "contest-code" }
```

`HttpClient` incorpora autenticación mediante el transporte compartido. El modal no crea headers ni lee la sesión.

## Actualización y errores

La mutación de TanStack Query invalida únicamente el prefijo de la lista pública de concursos, por lo que filtros, búsqueda y página siguen siendo estado local de la pantalla. Durante la petición se deshabilita la confirmación; un error mantiene el modal abierto y se anuncia con `role="alert"`.

## Evidencia

### 1. Captura del modal para ingresar a concurso privado

![Captura del modal para contraseña](../capturas/uj12-modal-password.png)

---

### 2. Captura del modal para ingresar a concurso público

![Captura del modal para inscripción pública](../capturas/uj12-modal-public.png)

---

### 3. Captura de concursos registrados

![Captura de concursos registrados](../capturas/uj12-contests-list.png)

---

## Límite conocido

El backend actual no expone una operación segura para validar la consulta de un concurso **privado finalizado** por una persona no inscrita. El frontend no compara contraseñas ni invoca `unirse` para ese caso; muestra una explicación controlada hasta que exista ese contrato.

## Pruebas

La política cubre los ocho casos de acceso, normalización de valores y los tres modos de detalle. Quedan pendientes pruebas end-to-end con backend real, teclado visual y respuestas de error específicas del backend.
