# Code Context

## Files Retrieved

1. `http://localhost:5185/swagger/v1/swagger.json` (live fetch, 2026-07-19; `paths./api/Concursos/crear.post`, root `security`, `components.securitySchemes.Bearer`, `components.schemas.CrearProblemaDto`) — fresh authoritative OpenAPI evidence for this revalidation.
2. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/design.md` (lines 91-124) — approved/requested endpoint, multipart field, indexed-problem, and supplemental success contract names used for comparison.
3. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md` (lines 174-201) — approved FormData field names and indexed `listaProblemas` serialization.
4. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md` (lines 257-287) — approved complementary success/error behavior; OpenAPI omissions here are explicitly non-blocking under this revalidation instruction.
5. `C:\Users\af156\OneDrive\Escritorio\UPDS\DESARROLLO DE SIST II\PROYECTO\Crear Concurso - Paso 1.png` (entire image) — readable visual reference, inspected only for restrained layout guidance.

## Key Code

### Fresh live OpenAPI contract — compatible

`POST /api/Concursos/crear` exists and declares only `multipart/form-data`. It has no operation-level security override, so it inherits the root security requirement:

```json
"security": [{ "Bearer": [] }]
```

`components.securitySchemes.Bearer` is `type: http`, `scheme: bearer`, `bearerFormat: JWT`. This is compatible with the approved Bearer/AuthTransport requirement.

The request schema is inline (there is **no separately named** `components.schemas.CrearConcursoDto`), with these compatible fields and types:

| Approved field | Live OpenAPI type | Result |
|---|---|---|
| `nombre` | `string` | compatible |
| `descripcion` | `string` | compatible |
| `fechaInicio` | `string`, `date-time` | compatible |
| `duracionMinutos` | `integer`, `int32` | compatible |
| `contrasena` | `string` | compatible |
| `urlSetProblemas` | `string` | compatible |
| `minutosCongelamiento` | `integer`, `int32` | compatible |
| `codigo` | `string` | compatible |
| `listaProblemas` | `array<CrearProblemaDto>` | compatible |
| `archivoZip` | `string`, `binary` | compatible |

`CrearProblemaDto` exists in `components.schemas` and is compatible with the approved fields/types:

```text
inciso: string
titulo: string | null
tiempo: number (float)
memoria: integer (int32)
```

The live schema encodes `listaProblemas` with `style: form`; the newly approved complementary contract supplies the required indexed keys `listaProblemas[n].inciso`, `.titulo`, `.tiempo`, and `.memoria`. Therefore, the absence of an OpenAPI serialization example is **not a blocker** in this revalidation.

### Incompatibilities only

**None found (no blocker, high, medium, or low field/DTO incompatibility).**

The live operation lists a contentless `200` response and no explicit 400/401 examples. Per the user-approved complementary contract and this task's scope, these are supplemental-authority omissions, not incompatibilities and not blockers. No generated-type update was performed or assessed as required by this read-only task.

### Restrained layout guidance from the reference image

- Retain the existing admin-shell pattern: dark left navigation, a spacious content area, and clear page heading/breadcrumb hierarchy.
- Use a wide primary form card with a narrower right-side summary/help column on desktop; stack responsibly on small screens.
- The reference depicts a six-step wizard and image-upload/general-information controls. Do **not** infer those controls or a wizard requirement for this ZIP-import scope; only borrow the visual hierarchy, card spacing, summary emphasis, and fixed bottom action affordance if it fits established project patterns.

## Architecture

The approved request flow can proceed as: feature form state → feature FormData mapper → `POST /api/Concursos/crear` multipart request → Bearer-authenticated transport. The mapper uses the OpenAPI-compatible simple fields/file and the approved supplemental indexed problem names. The complementary authority also governs successful `codigo`/`mensaje` handling and normalized error UI despite missing live response examples.

## Start Here

Open `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md` at lines 174-201 first: it is the approved supplemental serialization authority that completes the otherwise generic OpenAPI array declaration. Then use the live OpenAPI endpoint above to retain exact field casing and primitive types.

## Review Findings

1. **no blockers:** fresh live OpenAPI confirms the required creation endpoint, POST method, multipart media type, inherited HTTP Bearer JWT security, all approved simple fields, `archivoZip` binary, and `CrearProblemaDto` fields/types.
2. **informational:** `CrearConcursoDto` is represented as an inline request schema rather than a named component; this does not alter field names or types and is not an incompatibility.
3. **informational / accepted supplemental authority:** 200 body, 400/401 examples, and indexed collection serialization are absent from live OpenAPI. They are explicitly non-blocking for this revalidation because the change artifacts plus user approval supply the complementary contract.

## Residual Risks

- Live OpenAPI still does not independently demonstrate actual runtime ASP.NET multipart binding for indexed problem keys; implementation relies on the approved complementary contract.
- Live OpenAPI has no `required` list, so client-side requiredness remains governed by the approved feature specification rather than backend schema metadata.
- The visual reference shows broader contest-creation capabilities than the scoped ZIP-import feature; copying its wizard/upload controls wholesale would expand scope.