# Modernization Handoff (2026-02-06)

## Goal

Modernize and secure the legacy CRA-based admin app by upgrading core tooling/dependencies, removing deprecated packages, and establishing a stable baseline for further migrations.

## What We Completed

- Migrated from Create React App to Vite.
  - Added `vite.config.mts` and root `index.html`.
  - Removed CRA entrypoint/template (`public/index.html`) and `react-scripts` usage.
  - Updated npm scripts (`dev`, `build`, `preview`, `test` via Vitest).
- Upgraded frontend runtime baseline to React 18 (`react`, `react-dom`) and switched mount to `createRoot`.
- Migrated environment variable usage from `REACT_APP_*` to `VITE_*`.
  - Added typed env declarations (`src/vite-env.d.ts`).
  - Updated config and locale usage to consume `import.meta.env`.
- Replaced unmaintained `typescript-fsa` package with an internal compatibility module.
  - Added `src/lib/typescript-fsa.ts`.
  - Removed external dependency from `package.json`.
- Replaced deprecated `react-awesome-modal` with an internal modal implementation.
  - Removed `src/__typings__/react-awesome-modal.d.ts`.
- Fixed Vite runtime issues caused by CommonJS `require(...)` in browser code.
  - Updated `NewTaxUnitModal.tsx` and `TaxUnitModal.tsx` to ESM imports.
- Updated CI/CD and runtime defaults.
  - Node image moved to Node 22 in cloud build/deploy configs.
  - Build artifact path migrated from `build/` to `dist/`.
  - Updated `.nvmrc` and `.gitignore`.
- Added minimal test baseline on Vitest.
  - Added setup file and first test (`src/util/formatting.test.ts`).
- Security pass:
  - Ran `npm audit fix` and confirmed zero production vulnerabilities (`npm audit --omit=dev`).

## Validation Performed

- `npm run typecheck` passes.
- `npm run build` passes.
- `npm run test` passes.
- `npm audit --omit=dev --audit-level=moderate` reports `0 vulnerabilities`.

## Remaining Work (Next Phase)

- Router migration: `react-router` v5 patterns (`Switch`, `Redirect`, `useHistory`) -> v6+ APIs.
- Data table migration: `react-table@6` -> `@tanstack/react-table`.
- Auth modernization: upgrade `@auth0/auth0-react` to current major and adapt integration.
- Dependency cleanup:
  - remove legacy type packages no longer needed.
  - continue iterative upgrades of remaining libs to current stable versions.
- Quality/security hardening:
  - add smoke/integration tests for critical flows.
  - add automated dependency update/security workflow (Dependabot/Renovate + CI policy checks).

## Related File

- Detailed backlog: `docs/modernization-backlog.md`
