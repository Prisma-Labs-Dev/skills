# Remaining Work

## Done

- bootstrap structure for the repo,
- catalog schema and registry,
- minimal CLI for list/show/install planning/validation,
- first vendored fork for `motion`,
- first repo-owned package for `ui-animation-direction`,
- direct root `skills/` layout for installable packages,
- initial Apple design collection backed by `apple-skills`.

## Remaining

1. Add an import/update command for vendored forks so upstream refreshes are repeatable.
2. Add more catalog entries only when they correspond to real usage or ownership.
3. Decide whether this repo should eventually publish its own installable package surface or remain a local control plane.

## Intended Order

Do the import/update automation first. Everything else depends on keeping
vendored forks maintainable.
