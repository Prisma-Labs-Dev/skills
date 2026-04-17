# Current Frontier

## Goal

Bootstrap this repository as the system of record for skill sources, vendored
forks, and reusable install collections.

## Spec Anchor

[docs/implementation-plan.md](/Users/vabole/repos/skills/docs/implementation-plan.md)

## Why Now

There is already one standalone skill repository (`apple-skills`) and at least
one upstream skill (`motion`) that should be forked and extended locally. The
repo needs structure before more skills are added ad hoc.

## Out Of Scope

- Publishing this repo to a marketplace.
- Import automation for every upstream source.
- Bulk migration of all existing skills into this repo.

## Scope

- Bootstrap docs, contracts, and command surface.
- Add a machine-readable catalog.
- Add a minimal CLI for listing, showing, planning installs, and validating.
- Import the first vendored fork for `motion`.

## Acceptance Bar

- A fresh agent can understand the repo from durable files.
- The catalog can describe both external and vendored skills.
- The repo can plan installs for a single skill and a collection.
- One real vendored fork proves the model.
- Validation passes locally.

## Current Status

Bootstrap slice is complete. The repo now has a working catalog, minimal CLI,
initial external source entries, and a vendored `motion` fork with local polish
guidance. The next active slice should focus on import/update automation for
vendored forks.

## Last Completed Slice

Created the repo scaffold, command surface, machine-readable catalog, initial
docs, vendored `motion` fork, and local polish/bar-raising extension.

## Key Context Paths

- [README.md](/Users/vabole/repos/skills/README.md)
- [catalog/registry.json](/Users/vabole/repos/skills/catalog/registry.json)
- [src/cli.ts](/Users/vabole/repos/skills/src/cli.ts)
- [docs/architecture.md](/Users/vabole/repos/skills/docs/architecture.md)
- [docs/implementation-plan.md](/Users/vabole/repos/skills/docs/implementation-plan.md)

## Attempt Log

- 2026-04-17: Confirmed that `skills add` accepts local paths, which makes vendored fork installs viable.
- 2026-04-17: Confirmed the upstream `motion` skill is a self-contained package under `plugins/motion`.
- 2026-04-17: Bootstrapped the catalog and CLI before importing the first vendored fork.

## Validation Log

- 2026-04-17: `pnpm lint`
- 2026-04-17: `pnpm test`
- 2026-04-17: `pnpm smoke`
- 2026-04-17: `pnpm run ci`
- 2026-04-17: `pnpm skills-meta show motion --json`

## Artifacts

- `catalog/registry.json`
- `schemas/catalog.schema.json`
- `src/cli.ts`
- `docs/contracts/commands.yaml`

## Blockers

None currently recorded.

## Next Step

Add a dedicated import/update command that can refresh a vendored fork from a
pinned upstream repo/path while preserving local provenance and local additions.
