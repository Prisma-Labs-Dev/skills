# Architecture

## Purpose

`/Users/vabole/repos/skills` is the repo-local system of record for:

- which skill sources you maintain,
- which upstream skills you have forked locally,
- which collections you want to install together.

## Repository Shape

- `catalog/registry.json`
  Source of truth for all catalog entries.
- `schemas/`
  Machine-readable contracts for the catalog and environment config.
- `vendors/`
  Vendored skill forks that remain installable through local paths.
- `packages/`
  Repo-owned skill packages authored directly in this repository.
- `src/`
  Minimal CLI to list, inspect, plan, and validate.
- `docs/`
  Durable guidance and current frontier.

## Design Rules

### External first

If you already own and maintain a repository as a complete skill package, keep
that repository canonical and register it here as an external source.

Example: `vabole/apple-skills`.

### Vendor selectively

If you only want one skill from an upstream repo, vendor just that skill package
here instead of forking the whole upstream repository.

Example: `vendors/secondsky/motion`.

### Preserve provenance

Every vendored skill must record:

- upstream repository,
- pinned commit,
- upstream source path,
- local additions or divergence.

### Author owned guidance locally

When the skill is your own point of view rather than an upstream fork, author it
as a repo-owned package under `packages/`.

Example: `packages/ui-animation-direction`.

### Keep installs uniform

Project setup should not need to care whether a skill is external or vendored.
The catalog resolves both to a concrete `skills add ... --skill ...` command.
