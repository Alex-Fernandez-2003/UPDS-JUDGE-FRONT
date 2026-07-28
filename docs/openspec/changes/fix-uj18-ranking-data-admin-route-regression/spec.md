# Specification

## Ranking response preservation

A complete contractual ranking response MUST retain problems, participants, participant details and most-solved-problem data after normalization.

## Administrative route

`/admin/user-access/contests/:contestCode/ranking` MUST render the shared ranking under `AdminLayout` without a nested `UserLayout`.
