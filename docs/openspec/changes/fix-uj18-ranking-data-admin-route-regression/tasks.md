# Tasks

- [x] Registrar baseline e inspeccionar mapper, service, query, builders y router.
- [x] Reproducir el ranking normal mediante request autenticado real.
- [x] Trazar HTTP 200: 3 participantes, 3 problemas y 0 envíos antes del fix.
- [x] Demostrar que los 11 envíos quedaban fuera del corte por una conversión doble de zona horaria en el seed.
- [x] Corregir el seed temporal y verificar HTTP 200 con 11 envíos y resultados 2/125, 2/160 y 1/70.
- [x] Preservar `problemaMasResuelto`, duración, congelamiento e ID de participante en el normalizador.
- [x] Reproducir el 404 administrativo como wildcard de React Router sin request API.
- [x] Registrar la ruta administrativa bajo `AdminLayout` y reutilizar la misma feature/query.
- [x] Agregar pruebas de payload completo, ranking normal y navegación administrativa con router real.
- [x] Localizar `error={false}` en `FormField` cuando clona controles DOM nativos y evitar su reenvío.
- [x] Agregar prueba focal del warning DOM.
- [x] Verificar regresión de polling, congelamiento, countdown y paginación mediante suite completa.
- [x] Ejecutar audit (0 vulnerabilidades), API types, lint, typecheck, 34 archivos/144 tests, build y arranque Vite en 8106.
- [x] Ejecutar backend build y `dotnet test`; la solución no contiene casos/proyecto de tests backend.
- [x] Confirmación manual del responsable: ranking normal y administrativo funcionan correctamente.
- [ ] Cerrar y archivar el hotfix mediante una instrucción explícita posterior.
