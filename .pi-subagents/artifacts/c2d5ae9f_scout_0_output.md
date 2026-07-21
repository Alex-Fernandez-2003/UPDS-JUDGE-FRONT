# Code Context

## Files Retrieved

1. `frontend/src/features/contests/CreateContestPage.tsx` (lines 1-248) - feature entry page; owns React Hook Form defaults, submit coordination, ZIP field wiring, resource help, and summary placement.
2. `frontend/src/features/contests/types.ts` (lines 1-23) - `CreateContestFormValues`, problem shape, response shape, and the index-derived `problemLetter` utility.
3. `frontend/src/features/contests/schema.ts` (lines 1-57) - Zod validation for all form fields, ZIP presence/extension, and duration/freezing cross-validation.
4. `frontend/src/features/contests/mapper.ts` (lines 1-25) - sole multipart mapper; appends normalized simple fields, derived problem keys, and ZIP.
5. `frontend/src/features/contests/service.ts` (lines 1-10) and `use-create-contest.ts` (lines 1-6) - `FormData` is posted unchanged via the centralized endpoint and React Query mutation.
6. `frontend/src/features/contests/ContestProblemList.tsx` (lines 1-139) - `useFieldArray` list, single textual add action, remove action, field defaults, and A–Z UI guard.
7. `frontend/src/features/contests/CreateContestSummary.tsx` (lines 1-72) - current safe summary allowlist and modality derivation.
8. `frontend/src/components/forms/index.tsx` (lines 1-260) - shared `Input`, `FormField`, `PasswordInput`, and generic stateful `FileDropzone` contracts.
9. `frontend/src/components/common/index.tsx` (lines 1-211) - shared `Button`, `IconButton`, `Card`, `Badge`, `Alert`, and `Divider`; primary source of current interactive-state behavior.
10. `frontend/src/features/contests/CreateContestPage.test.tsx` (lines 1-52), `schema.test.ts` (lines 1-47), `mapper.test.ts` (lines 1-51), `service.test.ts` (lines 1-37), and `use-create-contest.test.tsx` (lines 1-58) - existing feature regression coverage.
11. `frontend/src/components/components.test.tsx` (lines 1-99) and `frontend/src/dev/ui/DevUi.tsx` (lines 1-108) - shared dropzone regression and `/dev/ui` consumer/catalog.
12. `frontend/src/routes/router.tsx` (lines 1-48), `frontend/src/routes/router.test.tsx` (lines 1-54), `frontend/src/lib/api/endpoints.ts` (lines 1-10), and `frontend/src/mocks/handlers/index.ts` (lines 1-39) - retained route, endpoint, and MSW integration seams.
13. `docs/openspec/changes/fix-create-contest-password-zip-and-form-ux/{proposal,spec,design,tasks}.md` - requested fix artifacts; they prescribe a feature-local ZIP solution unless a shared contract defect is proven.
14. `docs/openspec/changes/uj08-uj09-create-contest-zip-import-frontend/spec.md` - original change contract; reference only, explicitly must not be modified or archived.

## Key Code

### Current password path: already string end-to-end for normal UI input

`CreateContestFormValues.contrasena` is non-optional `string` (`types.ts:8-19`). Page defaults and reset use `contrasena: ''` (`CreateContestPage.tsx:24-36,52-54`). Zod currently accepts a string without transformation (`schema.ts:19`). The mapper always emits the multipart key:

```ts
formData.append('contrasena', values.contrasena.trim())
```

(`mapper.ts:9-15`). Thus normal blank submission produces `''`, not `null`. `service.ts:5-10` passes the resulting `FormData` directly. No implementation evidence locates the alleged null conversion in frontend production code.

**Contract gap / high risk:** the fix requires tolerated `undefined` (and edge case mentions `null`) to normalize to `''`, but the TypeScript form type excludes both and the current Zod schema rejects them. Implement a deliberate normalization at schema/mapper boundary only after selecting the tolerated input contract; do not loosen the form type to nullable. Preserve mapper behavior that always appends the key. Add `FormData.has/get` tests for blank, undefined-normalized, whitespace, and real password. Backend compatibility with exact blank multipart has not been demonstrated: MSW does not inspect `contrasena` (`mocks/handlers/index.ts:23-39`).

### ZIP selector and schema

Current schema requires `File`, verifies `.zip` case-insensitively, but has **no size validation** (`schema.ts:38-52`). Page passes only `accept=".zip"` and maps `onChange` directly to RHF (`CreateContestPage.tsx:214-224`). It does not pass `maxSizeBytes` or clear RHF errors on removal.

`FileDropzone` already supports generic extension and optional byte-cap validation (`components/forms/index.tsx:184-260`). It retains an internal file state, supports click through its button, keyboard activation by native button semantics, drag/drop, replacement, and removal. However its contract is insufficient for the specified UX:

- generic messages are English and do not name ZIP/100 MB;
- selected rendering is only filename + `Remove file`, no formatted size, validity state, compressed-file icon, explicit change action, truncation/title, or selected-state drop affordance;
- input native value is never reset, so selecting the same file after removal may not fire `change`;
- rejected candidate leaves an already selected valid internal file intact (ambiguous “invalid must not remain selected” requirement);
- it has no RHF `clearErrors` integration and its local error cannot be associated with the RHF field;
- page removal calls `setValue(...undefined, shouldValidate)` through callback but does not explicitly reset the native input or RHF errors.

**Recommended minimal boundary:** add a contest-local ZIP field/wrapper (new file under `frontend/src/features/contests/`) and keep shared `FileDropzone` untouched unless a separate review proves its generic behavior must change. Define/export one feature constant (likely a new `constants.ts`) named `MAX_CONTEST_ZIP_SIZE_BYTES = 100 * 1024 * 1024`; consume it in wrapper, schema, and defensive submit path. This avoids changing `/dev/ui` and its existing generic 1,000,000-byte example (`DevUi.tsx:61-66`).

### Existing defaults and problem sequence

The page starts with `{ titulo: '', tiempo: 1, memoria: 256 }` and one problem (`CreateContestPage.tsx:24-35`); `ContestProblemList` repeats that same default in local `newProblem` (`lines 16-17`). `useFieldArray.append` is used for individual adds (`lines 23-26,40-46`) and removal derives labels from present index (`lines 55-70`). `problemLetter` derives A–Z solely from index (`types.ts:21-22`), and mapper and summary use the same helper.

**Medium risk:** duplicate defaults could diverge when bulk add is added. Extract a feature-local `newContestProblem()` helper or use a single shared constant factory. RHF `append` supports arrays in the installed API typing at runtime expectation, but it must be confirmed by implementation/typecheck; bulk should validate full integer/range before one `append(new Array(count)... )` mutation.

The current individual control is a text `Button` with `leftIcon={<Plus/>}` and accessible name “Agregar problema” (`ContestProblemList.tsx:34-50`), not the required icon-only `IconButton` named “Agregar un problema”. Add bulk panel state locally in this component; no global component is required.

### Summary and warning placement

`CreateContestSummary` currently uses `Card`, `Badge`, and `Divider` (`lines 1-72`), derives `Público`/`Privado` from trimmed password, and allowlists safe values only. It does not render password/JWT/draft/languages/visibility. Missing requested behavior: dark-blue icon header “Resumen del concurso”, explicit modality row (currently badge only in header), per-row separators/hierarchy, and ZIP absence text `No seleccionado` (current generic `Sin definir`, line 67).

The ZIP folder text presently sits in the Resources card, not an `Alert`, and only says folders A, B etc.; it lacks the 100 MB warning (`CreateContestPage.tsx:200-212`). Keep it feature-local and derive letters from watched `listaProblemas`, as current code does.

### Shared components and interaction-state decision

`Button`/`IconButton` already provide `transition`, `focus-visible` outline, and disabled cursor/opacity via shared `buttonStyles` (`components/common/index.tsx:12-75`). They lack hover and active variant classes; `Button.loading` sets actual `disabled` (`lines 39-62`). `Input` has focus styles but not `focus-visible` specifically (`forms/index.tsx:10-73`). `FileDropzone` button has no focus/hover/disabled cursor classes (`forms/index.tsx:229-245`).

**Medium risk:** modifying shared `buttonStyles` affects all button/icon consumers. The requirement says correct shared components only for a general defect. Shared button hover/active/focus behavior is a real common contract gap, but the requested scope is contest UX. Prefer local classes for contest-specific ZIP/bulk/summary actions. If shared `Button` or `FileDropzone` changes are approved, update `components/components.test.tsx` and check `/dev/ui`; no contest-only test can adequately protect all consumers.

### Tests that need minimal updates/additions

- `schema.test.ts`: add exact 100 MiB and +1 byte tests; password normalization; preserve extension/presence/cross-field coverage.
- `mapper.test.ts`: assert `has('contrasena')`, exact blank, normalized absent source if accepted, whitespace behavior, and real password.
- `CreateContestPage.test.tsx`: currently only initial render and one add/remove cycle. Extend or split feature-component tests for default password, summary placeholders/modality/exclusions, ZIP warning, ZIP select/reject/replace/remove, defensive submit, icon-only add, bulk invalid/valid/cancel/reindex/cap.
- Add local ZIP field tests if a new wrapper is introduced. Use a lightweight mocked `File` object with overridden `size` rather than allocating 100 MiB.
- `components/components.test.tsx` only needs edits if shared forms/common contracts change.
- `service.test.ts`, `use-create-contest.test.tsx`, router, and MSW are regression tests; no code change is currently justified. MSW may gain an assertion that `contrasena === ''` to document the wire contract, but it must not emulate backend ZIP logic.

## Architecture

`CreateContestPage` initializes RHF with `createContestSchema`, watches all values, and passes control/register/errors to `ContestProblemList` and values to `CreateContestSummary`. The page currently owns the `FileDropzone` callback and writes `archivoZip` to RHF. On valid submit, `useCreateContestMutation` invokes `createContest`; the service calls `createContestFormData`; mapper creates multipart data and the centralized `httpClient` sends it to `endpoints.contests.create` (`Concursos/crear`). The route is `routes.newContest` (`/admin/contests/new`) inside existing `AdminLayout`; MSW intercepts `/api/Concursos/crear`.

Original change is documentation-only reference. The new OpenSpec fix artifacts are the authoritative allowed scope and expressly prohibit modifying the original change, backend/database/auth/layout/listing/root README/manual, dependencies, JSZip, a separate ZIP request, and OpenSpec CLI.

## Exact Minimal Allowed Edit Set

1. Modify `frontend/src/features/contests/types.ts` only if introducing shared local ZIP/problem helper types is genuinely needed; keep password as `string`.
2. Add one feature-local constants/helper module for `MAX_CONTEST_ZIP_SIZE_BYTES` and optionally a single problem-default factory.
3. Modify `schema.ts`, `mapper.ts`, `CreateContestPage.tsx`, `ContestProblemList.tsx`, and `CreateContestSummary.tsx` for requested behavior.
4. Add a feature-local contest ZIP component only if needed to implement required selected/empty states without breaking generic `FileDropzone`.
5. Modify/add feature tests (`schema.test.ts`, `mapper.test.ts`, `CreateContestPage.test.tsx`, and test for the new ZIP component). Update MSW test/handler only to attest request contract if desired.
6. Modify `frontend/src/components/forms/index.tsx`, `components/common/index.tsx`, `components/components.test.tsx`, and `dev/ui/DevUi.tsx` only if choosing a verified shared-contract repair; otherwise they are out of the minimal patch.
7. Do not edit router/endpoints/service/mutation unless tests expose an actual transport conversion; current source preserves FormData. Do not edit original OpenSpec change or protected areas.

## Reference Image

Attempted to retrieve `C:\Users\af156\OneDrive\reference.png`; the supplied path returned `ENOENT`. Its visual details therefore could not be inspected. Apply only the visual requirements explicitly captured in the fix spec/design; do not invent image-specific fields (especially draft, languages, or standalone visibility).

## Review Findings

- **High — password integration contract:** production frontend already defaults, trims, and maps blank password to `''`; no frontend null source was found. The claimed backend failure is unverified because MSW does not check this field. Avoid speculative changes that produce nullable values or placeholders.
- **High — ZIP validity state:** the generic dropzone's internal state/input reset behavior cannot meet all required invalid/reselect/remove guarantees when merely wired through `setValue`; a local controlled wrapper is likely required.
- **Medium — shared regression blast radius:** shared Button/FileDropzone edits affect `/dev/ui` and multiple consumers. Feature-local UX is lower risk.
- **Medium — no complete feature behavior tests:** existing page tests do not cover ZIP, password default/wire value, summary contents, max size, or bulk action.
- **Low — duplicate problem default literals:** current page and list own identical defaults; bulk functionality could drift unless centralized.

## Start Here

Open `frontend/src/features/contests/CreateContestPage.tsx` first. It is the composition and RHF ownership point: it determines where a local controlled ZIP field, the defensive submit check, warning placement, summary values, and disabled/loading propagation must connect.