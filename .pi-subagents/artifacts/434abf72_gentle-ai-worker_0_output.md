status: completed
summary: Inserted the two requested beginner-friendly frontend tutorials before the PR checklist. They distinguish the real `StatCard` contract from non-implemented didactic examples and document the generated login POST path without implying an active login feature.
files_changed:

- frontend/docs/guia-arquitectura-y-desarrollo.md: Added the component ownership/StatCard/SectionHeader tutorial and the future-only `/api/Auth/login` transport, MSW, mutation, error, testing, and checklist tutorial.
tdd_evidence:
- RED: not active — strict TDD was not activated
- GREEN: not active — validation is reported separately
- TRIANGULATE/REFACTOR: Documentation claims, required headings, method names, props, and non-implemented labels were checked with targeted grep.
validation:
- cd frontend && npx prettier --write docs/guia-arquitectura-y-desarrollo.md && npm run format:check && npm run lint && npm run typecheck && npm run test:run && npm run build: passed; Prettier, oxlint, TypeScript, 29 Vitest tests, and Vite production build passed.
- git diff --check && git diff --name-only && git diff --cached --name-only && grep -nE "^## Tutorial práctico: cómo (agregar un componente|consumir un endpoint)$|^## Checklist para un PR de frontend$|StatCard|HttpClient\\.post|endpoints\\.auth\\.login|Ejemplo didáctico" frontend/docs/guia-arquitectura-y-desarrollo.md: passed; no whitespace errors, only the permitted documentation file is tracked as changed, and no staged files were reported.
risks:
- none
review_focus:
- frontend/docs/guia-arquitectura-y-desarrollo.md: Confirm conceptual SectionHeader and login samples remain visibly non-implemented and do not imply session persistence, authentication, or a real token.
skill_resolution: paths-injected