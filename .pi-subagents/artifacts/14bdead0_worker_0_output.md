# Contest fix implementation

Implemented `fix-create-contest-password-zip-and-form-ux` within the contest feature only.

- Added feature-local constants/default factories and a controlled `ContestZipField`.
- Normalized tolerated missing/null/whitespace passwords to `''`; multipart always appends the normalized string.
- Enforced inclusive 100 MiB ZIP validation in schema, selector, and submit defense.
- Added ZIP selection/replacement/removal/input-reset/drop/keyboard behavior and local interaction styles.
- Replaced single-problem text action with accessible Plus `IconButton`; added atomic validated inline bulk add.
- Redesigned the safe summary and added reactive ZIP warning.
- Updated feature tests and OpenSpec task status. No shared components, API, routing, auth, backend, layout, listing, or original OpenSpec change were modified.