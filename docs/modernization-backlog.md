# Modernization Backlog

## Completed in this phase

- CRA removed and Vite adopted.
- React upgraded to v18 with `createRoot`.
- Environment variables migrated from `REACT_APP_*` to `VITE_*`.
- Cloud Build/Deploy updated for Node 22 and `dist/` artifacts.
- `typescript-fsa` dependency removed and replaced with local compatibility module.
- `react-awesome-modal` removed and replaced with an internal modal component.
- Test baseline added with Vitest.

## Remaining high-impact migrations

- Migrate routing from `react-router` v5 patterns (`Switch`, `Redirect`, `useHistory`) to v6+ APIs.
- Replace `react-table@6` with `@tanstack/react-table`.
- Upgrade `@auth0/auth0-react` to current major and update provider usage if required.
- Review and remove remaining legacy `@types/*` packages now covered by library types.
- Add security automation (`npm audit` in CI plus Dependabot/Renovate).
- Add smoke/integration tests for critical flows.
