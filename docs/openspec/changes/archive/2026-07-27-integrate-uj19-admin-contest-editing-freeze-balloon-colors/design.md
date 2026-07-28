# Design

## Components Touched

### Contests

Áreas que deben localizarse durante baseline:

- página del listado administrativo;
- tabla o cards;
- celda o grupo de acciones;
- página de creación;
- formulario;
- secciones de metadatos;
- sección de problemas;
- schemas;
- validadores;
- tipos;
- servicio;
- queries;
- mutations;
- query keys;
- páginas y exports;
- tests.

### Infraestructura

- router;
- route builders;
- guards;
- `AdminLayout`;
- endpoints centralizados;
- HttpClient;
- OpenAPI generado;
- MSW.

### Visualización

- `frontend/src/components/illustrations/GlobeIllustration.tsx`
- Modal/Dialog existente.
- Button/IconButton.
- Inputs.
- Alert/Skeleton/Spinner.
- Componentes base de formulario.

### Inspección sin implementación funcional

- `frontend/src/features/ranking/`
- documentación de UJ-19 y ranking.

## Boundaries Respected

- El listado administra navegación y modal, no serializa el PUT.
- La página de edición obtiene params y orquesta queries.
- El formulario compartido maneja campos y validación.
- El servicio conoce endpoints y FormData.
- El mapper de colores conoce representación de dominio, no páginas.
- `GlobeIllustration` presenta un globo, no conoce problemas o concursos.
- El modal es read-only.
- Ranking no depende de componentes internos de edición.
- La UI no sustituye las validaciones backend.
- AuthTransport mantiene la responsabilidad del Bearer.
- AdminLayout permanece separado de la feature.
- Create y edit comparten estructura sin mezclar mutations.
- La contraseña no forma parte del modelo precargado.

## Contracts Changed

No external contract changes are confirmed from the provided input.

El frontend consumirá contratos existentes informados por el usuario, pendientes de verificación en backend y OpenAPI.

### Contrato de lectura editable informado

Operación equivalente:

- GET `editar/{codigo}`.
- Rol: Administrador de Concursos.
- Respuesta:
  - codigo;
  - nombre;
  - descripcion;
  - fechaInicio;
  - duracionMinutos;
  - esPrivado;
  - urlSetProblemas;
  - minutosCongelamiento;
  - listaProblemas.

Problema:

- inciso;
- titulo;
- tiempo;
- memoria;
- colorGlobo;
- cantidadCasosPrueba.

Restricciones informadas:

- autenticado;
- rol correcto;
- código obligatorio;
- concurso lógico activo;
- creador;
- no iniciado;
- problemas activos ordenados;
- sin contraseña.

Ruta completa, nombres exactos y tipos:

`Por confirmar durante baseline contractual`.

### Contrato de actualización informado

Operación equivalente:

- PUT `{codigo}`.
- multipart/form-data.
- máximo 100 MB.

Campos equivalentes:

- nombre;
- descripcion;
- fechaInicio;
- duracionMinutos;
- contrasena;
- urlSetProblemas;
- minutosCongelamiento;
- archivoZip;
- listaProblemas.

Formato exacto de `listaProblemas`:

`Por confirmar durante baseline contractual`.

### Contrato interno del formulario

Modelo común conceptual:

- mode: create | edit;
- metadata;
- privacy intent;
- freeze minutes;
- problems;
- zip;
- validation state.

Create:

- permite la estructura actual;
- usa su mutation actual;
- conserva capacidades existentes.

Edit:

- código read-only;
- colección de problemas fija;
- cantidad de casos read-only;
- ZIP obligatorio;
- mutation PUT;
- semántica segura de privacidad.

### Contrato interno del color

Cada opción debe distinguir:

- apiValue;
- label;
- hex.

El tipo final debe derivarse de la fuente de verdad confirmada.

### Catálogo informado

| Label informado | Hexadecimal informado |
| --------------- | --------------------- |
| Rojo            | `#E6194B`             |
| Verde           | `#3CB44B`             |
| Azul            | `#4363D8`             |
| Amarillo        | `#FFE119`             |
| Naranja         | `#F58231`             |
| Morado          | `#911EB4`             |
| Magenta         | `#F032E6`             |
| Celeste         | `#42D4F4`             |
| Turquesa        | `#469990`             |
| Rosa            | `#FABED4`             |
| Gris            | `#A9A9A9`             |
| Marron          | `#800000`             |
| Negro           | `#000000`             |

La tabla no confirma si backend recibe nombre o hexadecimal.

## Estado Actual Inspeccionado

No fue posible acceder a los repositorios locales ni ejecutar los comandos solicitados.

Estado actual:

| Evidencia                | Estado                         |
| ------------------------ | ------------------------------ |
| Historia UJ-19 real      | Por confirmar durante baseline |
| Branch                   | Por confirmar durante baseline |
| Working tree             | Por confirmar durante baseline |
| Lint                     | No ejecutado                   |
| Typecheck                | No ejecutado                   |
| Tests                    | No ejecutados                  |
| Build                    | No ejecutado                   |
| Ruta GET completa        | Por confirmar durante baseline |
| Ruta PUT completa        | Por confirmar durante baseline |
| DTOs reales              | Por confirmar durante baseline |
| Representación de color  | Por confirmar durante baseline |
| Datos del listado        | Por confirmar durante baseline |
| API de GlobeIllustration | Por confirmar durante baseline |
| Query keys               | Por confirmar durante baseline |

## Data Flow

### Listado y edición

- Listado administrativo obtiene concursos.
- Registro renderiza acciones disponibles.
- Editar usa route builder con código.
- Router resuelve código desde params.
- Guard valida sesión y rol.
- Edit page ejecuta query GET editable.
- Mapper adapta DTO a valores de formulario.
- Formulario compartido renderiza modo edit.
- Usuario modifica datos, congelamiento y colores.
- Usuario adjunta ZIP.
- Validación local comprueba restricciones confirmadas.
- Serializer crea FormData.
- Mutation ejecuta PUT.
- Caché se actualiza o invalida.
- UI aplica la navegación posterior definida por el patrón existente.

### Modal de colores

Caso preferido:

- Listado ya contiene problemas y colores.
- Usuario abre el modal.
- Modal recibe datos cacheados.
- Mapper resuelve label y hexadecimal.
- `GlobeIllustration` renderiza el color.
- No se ejecuta request.

Caso sin datos:

- Listado no contiene problemas/colores.
- No se inventa información.
- No se usa GET editar para activos/finalizados.
- Se registra una brecha contractual.
- La mínima solución debe ser:
  - ampliar DTO de listado; o
  - consumir un endpoint de consulta apto para cualquier estado; o
  - restringir temporalmente la acción a registros con datos suficientes.
- La decisión requiere coordinación contractual.

### Privacidad

Flujo seguro objetivo:

- GET indica `esPrivado`, pero no contraseña.
- El formulario representa una intención:
  - mantener privacidad;
  - cambiar contraseña;
  - convertir a público.
- El serializer incluye solo la instrucción soportada por backend.
- Si backend no permite distinguir mantener de eliminar, edit de privados queda bloqueado o limitado hasta resolver el contrato.
- Nunca se inventa la contraseña anterior.

### Colores

- DTO entrega `colorGlobo`.
- Mapper normaliza el valor.
- Formulario almacena un `apiValue` válido.
- UI muestra label y hex.
- Validación comprueba catálogo y unicidad.
- Serializer envía el `apiValue`.
- Ranking podrá consumir el mismo mapper en otro change.

## Acciones del Listado

### Editar

Debe reutilizar el grupo actual de acciones.

La acción requiere:

- icono lápiz;
- label accesible;
- route builder;
- permiso;
- disponibilidad coherente.

### Ver colores

Debe:

- usar un icono del sistema actual;
- abrir modal;
- no navegar;
- ser read-only;
- usar datos disponibles.

## Decisión sobre disponibilidad de Editar

### Alternativa A: mostrar solo cuando el listado confirma editabilidad

**Ventajas**

- Evita acciones fallidas.
- Comunica claramente la regla.

**Desventajas**

- Requiere estado temporal y propietario en el DTO.

### Alternativa B: mostrar deshabilitado con explicación

**Ventajas**

- Hace visible la capacidad.
- Explica por qué no está disponible.

**Desventajas**

- También requiere datos suficientes.
- Puede aumentar ruido visual.

### Alternativa C: mostrar y delegar el rechazo al GET

**Ventajas**

- Funciona sin datos de propietario.
- Backend decide.

**Desventajas**

- Experiencia reactiva.
- Genera requests conocidos como fallidos.

### Decisión recomendada

- Adoptar A cuando el listado confirme estado y creador.
- Adoptar B cuando confirme no editabilidad y el patrón actual use acciones deshabilitadas.
- Adoptar C únicamente cuando el listado no contenga datos suficientes y sea consistente con acciones existentes.
- En todos los casos, el GET y PUT continúan autorizando.

## Reutilización del Formulario

### Alternativa A: copiar CreateContestPage

**Ventajas**

- Implementación inicial rápida.

**Desventajas**

- Duplica validación, estilos y fixes.
- Alto riesgo de divergencia.

### Alternativa B: agregar condicionales dispersos a CreateContestPage

**Ventajas**

- Menos archivos nuevos.

**Desventajas**

- Mezcla routing, mutations y lógica de modos.
- Dificulta mantenimiento.

### Alternativa C: extraer núcleo y secciones compartidas

**Ventajas**

- Conserva estilos.
- Mantiene mutations separadas.
- Facilita tests por modo.

**Desventajas**

- Requiere una extracción inicial controlada.

### Decisión recomendada

Adoptar C:

- componente o contrato de formulario común;
- wrappers Create y Edit;
- secciones comunes;
- secciones exclusivas de edit;
- mutations separadas.

## Precarga

Debe existir un mapper DTO → form values que:

- convierta fechas una vez;
- preserve código;
- copie problemas;
- preserve cantidad de casos;
- normalice colores;
- no cree contraseña;
- diferencie errores de datos legacy.

El formulario no debe inicializarse con valores parciales antes de completar la query, salvo que la infraestructura soporte reset explícito de forma segura.

## Minutos de Congelamiento

- Ubicación preferida: sección de configuración temporal.
- Debe incluir explicación breve.
- Debe depender de duración.
- Debe mostrar error específico.
- Create solo debe recibirlo si su endpoint lo soporta.

## Problemas y ZIP

Edit mode:

- lista fija;
- inciso read-only;
- cantidad de casos read-only;
- título, tiempo, memoria y color editables según backend;
- ZIP obligatorio;
- sin add/remove;
- explicación del ZIP completo.

## Ubicación del Mapper

### Alternativa A: `features/contests` interno

**Ventajas**

- Ownership cercano.
- Cambio acotado.

**Desventajas**

- Ranking dependería de contests.

### Alternativa B: área transversal de dominio o constantes

**Ventajas**

- Contests y ranking dependen del dominio.
- Evita dependencia feature-to-feature.

**Desventajas**

- Requiere confirmar convenciones del repositorio.

### Alternativa C: `lib`

**Ventajas**

- Acceso sencillo.

**Desventajas**

- Puede convertir `lib` en contenedor genérico.

### Decisión recomendada

Usar el área transversal existente para contratos de dominio o constantes compartidas. Si no existe, crear la ubicación mínima coherente con las convenciones reales. No ubicarlo en una página, modal ni feature ranking.

## GlobeIllustration

Debe inspeccionarse:

- props;
- soporte de `className`;
- soporte de color;
- tamaño;
- decorative mode;
- aria.

Decisión:

- reutilizar sin cambios cuando admita el color requerido;
- extender de forma backward-compatible únicamente si no puede representar el catálogo;
- no duplicar SVG.

## Fuente de Datos del Modal

### Alternativa A: usar el listado cacheado

**Ventajas**

- Sin requests adicionales.
- Funciona para cualquier estado incluido en el listado.

**Desventajas**

- Requiere que el DTO incluya problemas y colores.

### Alternativa B: usar GET editar

**Ventajas**

- DTO informado contiene colores.

**Desventajas**

- Solo próximo y creador.
- No satisface “junto a cada concurso”.

### Alternativa C: endpoint de consulta general

**Ventajas**

- Contrato adecuado para modal.

**Desventajas**

- Puede no existir y sería backend fuera de alcance.

### Decisión recomendada

Adoptar A cuando sea posible. Rechazar B como solución general. Si A no es posible, registrar la incompatibilidad y coordinar un contrato de consulta; no inventar datos.

## Privacidad y Contraseña

### Alternativa A: enviar vacío

**Ventajas**

- Simple.

**Desventajas**

- Puede convertir a público.
- Riesgo crítico.

### Alternativa B: pedir siempre la contraseña actual

**Ventajas**

- Evita vacío.

**Desventajas**

- El usuario puede no conocerla.
- No permite mantenerla de forma transparente.
- El frontend no puede verificarla.

### Alternativa C: intención explícita respaldada por contrato

**Ventajas**

- Separa mantener, cambiar y hacer público.
- Segura.

**Desventajas**

- Puede requerir soporte backend adicional.

### Decisión recomendada

Adoptar C. Si el DTO actual no soporta mantener privacidad sin reenviar la contraseña, registrar bloqueo backend y no implementar una operación insegura.

## Fechas y UTC

- Inspeccionar create.
- Reutilizar helpers existentes.
- DTO UTC → input local.
- Input local → UTC una vez.
- No usar substring o Date conversion sin pruebas.
- Cubrir DST y zona local.

## FormData

El serializer debe ser una frontera única.

Debe confirmar:

- scalar naming;
- bool representation;
- optional values;
- ZIP field;
- problem list binding;
- date format;
- password intent;
- color apiValue.

No debe construirse FormData dentro del JSX.

## Cache e Invalidación

Después del PUT:

- listado administrativo;
- detalle editable;
- detalle general;
- dashboard relacionado cuando corresponda;
- datos usados por modal.

Preferencia:

1. Actualizar caché cuando la respuesta incluya el DTO suficiente.
2. Invalidar keys exactas cuando no lo incluya.

## Navegación Posterior

### Alternativa A: volver al listado

**Ventajas**

- Patrón común de administración.
- Hace visible el registro actualizado.

**Desventajas**

- Pierde contexto del formulario.

### Alternativa B: permanecer en edición

**Ventajas**

- Permite verificar datos guardados.
- Facilita nuevas correcciones.

**Desventajas**

- Requiere reset con respuesta actualizada.

### Alternativa C: feedback y retorno manual

**Ventajas**

- Control del usuario.

**Desventajas**

- Puede divergir del patrón actual.

### Decisión recomendada

Seguir exactamente el patrón actual de creación y administración. Si create navega al listado tras éxito, preferir A. Si las ediciones existentes permanecen, preferir B. La decisión final se toma durante baseline.

## Impacto por Archivo

| Archivo o área                                                | Clasificación inicial                        | Acción                                      | Motivo               | Riesgo | Prueba                                  |
| ------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------- | -------------------- | ------ | --------------------------------------- |
| `frontend/src/features/contests/`                             | Modificar tras inspección                    | Integrar acciones, edición, colores y modal | Núcleo del change    | Alto   | Suites de contests y regresión          |
| Página real de listado admin                                  | Por confirmar                                | Modificar                                   | Añadir dos acciones  | Medio  | Acciones, permisos, navegación          |
| Página real de creación                                       | Reutilizar/modificar mínimamente             | Extraer secciones si es necesario           | Evitar duplicación   | Alto   | Creación completa                       |
| Formulario real de concursos                                  | Modificar                                    | Añadir contrato create/edit                 | Reutilización        | Alto   | Tests por modo                          |
| Servicio real de contests                                     | Modificar                                    | GET editable y PUT                          | Persistencia         | Alto   | Tests HTTP/FormData                     |
| Tipos reales de contests                                      | Modificar                                    | DTOs y modelos de formulario                | Tipado               | Medio  | Typecheck                               |
| Query keys reales                                             | Modificar                                    | Detalle e invalidación                      | Caché                | Alto   | Tests de keys                           |
| `frontend/src/components/illustrations/GlobeIllustration.tsx` | Reutilizar; modificar solo si imprescindible | Soportar representación visual              | Evitar SVG duplicado | Medio  | Tests visuales y backward compatibility |
| `frontend/src/features/ranking/`                              | Solo inspeccionar                            | Confirmar futura frontera                   | Evitar acoplamiento  | Bajo   | Sin diff funcional                      |
| `frontend/src/routes/`                                        | Modificar                                    | Registrar route y builder                   | Navegación           | Alto   | Routing y refresh                       |
| `frontend/src/layouts/`                                       | Reutilizar sin cambios                       | Confirmar AdminLayout                       | Preservación         | Medio  | Layout regression                       |
| `frontend/src/auth/`                                          | Solo inspeccionar                            | Confirmar guard/rol                         | Seguridad            | Alto   | Autorizado/no autorizado                |
| `frontend/src/lib/api/`                                       | Modificar si contiene endpoints              | Centralizar rutas                           | Evitar hardcode      | Medio  | Tests de endpoint                       |
| `frontend/src/types/api.generated.ts`                         | Solo inspeccionar o regenerar                | Confirmar contratos                         | OpenAPI              | Medio  | `api:types`, typecheck                  |
| `frontend/src/mocks/`                                         | Modificar                                    | Handlers GET/PUT/modal                      | Pruebas              | Medio  | MSW tests                               |
| `docs/historias/`                                             | Modificar documento real UJ-19               | Registrar integración                       | Trazabilidad         | Bajo   | Revisión documental                     |

La tabla final debe reemplazar las áreas genéricas por archivos reales después del baseline.

## Required Tests Per Layer

### Unit tests

Mapper:

- trece valores;
- labels;
- hexadecimal;
- apiValue;
- desconocido;
- casing;
- options únicas.

Colores:

- únicos;
- repetidos;
- ausentes;
- inválidos;
- trece problemas;
- catorce problemas.

Congelamiento:

- cero;
- negativo;
- menor;
- igual;
- mayor;
- cambio de duración.

FormData:

- escalares;
- problemas;
- colores;
- ZIP;
- fecha UTC;
- privacidad.

### Service and query tests

- GET editable.
- PUT multipart.
- params.
- errores.
- query key.
- invalidación.

### Integration tests

Listado:

- dos acciones;
- permisos;
- navegación;
- modal.

Edit:

- loading;
- precarga;
- error;
- código read-only;
- ZIP;
- update;
- cache;
- AdminLayout.

Modal:

- caché;
- orden;
- colores;
- globos;
- accesibilidad;
- empty.

### Regression

- create;
- listado;
- filtros;
- paginación;
- rutas;
- user contests;
- Problems;
- Submissions;
- ranking sin cambios;
- OpenAPI cuando aplique.

### Manual

- escritorio;
- tablet;
- móvil;
- teclado;
- modal;
- permisos;
- concurso próximo;
- iniciado;
- finalizado;
- privado;
- colores;
- ZIP;
- fecha;
- Network.

## Tradeoffs Accepted

- ZIP continuará siendo obligatorio aunque la edición sea pequeña.
- No se permitirá editar la estructura de problemas.
- El catálogo se limitará a trece colores.
- Más de trece problemas quedará bloqueado.
- El modal puede quedar condicionado por una brecha backend si el listado no contiene colores.
- Edit de privados puede quedar bloqueado hasta disponer de semántica segura.
- El mapper se prepara para ranking, pero ranking no cambia.
- La extracción de formulario será mínima, aunque requiera varios componentes pequeños.

## Implementation Constraints

- No modificar antes de completar baseline.
- No inventar rutas o DTOs.
- No duplicar el formulario.
- No hardcodear endpoints.
- No usar `location.state` como fuente.
- No editar iniciados/finalizados.
- No exponer contraseñas.
- No enviar vacío silenciosamente.
- No hacer ZIP opcional.
- No permitir add/remove de problemas.
- No permitir colores libres.
- No duplicar el catálogo.
- No acoplar ranking.
- No invalidar toda la caché.
- No usar reload.
- No cambiar dependencias.
- No usar OpenSpec CLI.
- No hacer commit, push o archive.

## Open Design Questions

### Blocking: documento UJ-19

- ¿Cuál es la ruta real y cuál versión está vigente?

### Blocking: contratos completos

- ¿Cuál es la ruta completa del GET y PUT?
- ¿Cuáles son los nombres exactos de DTOs y campos?

### Blocking: representación de color

- ¿`colorGlobo` usa nombre, hexadecimal u otro valor?
- ¿Lectura y escritura usan la misma representación?

### Blocking: contraseña privada

- ¿Cómo conserva el PUT la contraseña existente?
- ¿Existe una intención explícita de mantener/cambiar/hacer público?

### Blocking: FormData

- ¿`listaProblemas` se envía como JSON, campos indexados o colección repetida?

### Blocking: datos del listado

- ¿Incluye `listaProblemas`, `inciso`, `titulo` y `colorGlobo`?
- ¿Incluye creador y estado suficiente para determinar editabilidad?

### Blocking: create contract

- ¿El endpoint de creación admite `minutosCongelamiento` y colores?

### Research required: GlobeIllustration

- ¿Qué props admite?
- ¿Acepta color dinámico?
- ¿Tiene modo decorativo?

### Research required: query keys

- ¿Qué keys deben invalidarse?

### Research required: UTC

- ¿Qué helpers utiliza create?

### Human coordination required: modal

- Si el listado no incluye colores, ¿se ampliará el DTO o existirá un endpoint de consulta?

### Human coordination required: más de trece problemas

- ¿Backend prohíbe crear concursos de más de trece problemas o requiere ampliar el catálogo en otro change?
