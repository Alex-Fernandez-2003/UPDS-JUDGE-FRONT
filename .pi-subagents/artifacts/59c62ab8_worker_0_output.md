Implemented the incremental contest-code and interaction rules for the existing create-contest fix.

Changed files:

- `frontend/src/features/contests/constants.ts`
- `frontend/src/features/contests/schema.ts`
- `frontend/src/features/contests/mapper.ts`
- `frontend/src/features/contests/CreateContestPage.tsx`
- `frontend/src/features/contests/ContestProblemList.tsx`
- `frontend/src/features/contests/ContestZipField.tsx`
- `frontend/src/features/contests/CreateContestPage.test.tsx`
- `frontend/src/features/contests/schema.test.ts`
- `frontend/src/features/contests/mapper.test.ts`
- `frontend/src/components/common/index.tsx`
- `frontend/src/components/components.test.tsx`
- `frontend/src/dev/ui/DevUi.tsx`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/design.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/spec.md`
- `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/tasks.md`

Validation:

- `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test:run`, and `npm run build` passed from `frontend/`.
- `npm run dev -- --host 127.0.0.1` started Vite at `http://127.0.0.1:8085/`; an HTTP 200 was confirmed, then the development process was stopped.
- No staged files were present.

Open risks/questions:

- Contest-code syntax is now a normalized lower-case alphanumeric slug with single hyphen separators, as documented. Backend acceptance of this stricter frontend format remains an integration concern.