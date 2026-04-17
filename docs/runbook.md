# Runbook

## List the catalog

```bash
pnpm skills-meta list
pnpm skills-meta list --json
```

## Inspect one entry

```bash
pnpm skills-meta show motion
pnpm skills-meta show apple-design --json
```

## Plan an install

```bash
pnpm skills-meta install motion --agent codex --dry-run
pnpm skills-meta install apple-design --agent codex --dry-run
```

## Run an install

```bash
pnpm skills-meta install motion --agent codex
pnpm skills-meta install apple-design --agent codex
```

## Refresh generated Motion references

```bash
pnpm motion-docs:check
pnpm motion-docs:refresh
```

Use this for the generated plain-docs layer that feeds the vendored `motion`
skill's official references.

## Add a new external source

1. Add the source under `sources` in `catalog/registry.json`.
2. Add one or more skills that resolve to that source's GitHub repo.
3. Add or update a collection if you want a reusable bundle.
4. Run `pnpm run ci`.

## Add a new locally forked skill

1. Import the upstream skill package into a work area.
2. Reshape the installable result into `skills/<skill-name>`.
3. Record provenance in `docs/maintainers/`.
4. Add your local references, templates, or scripts.
5. Validate with `pnpm run ci`.

## Add a new repo-owned skill

1. Create an installable skill under `skills/<skill-name>`.
2. Add the catalog source and skill entries.
3. Add references only when they materially improve the skill.
4. Validate with `pnpm run ci`.

## Update a vendored fork

Current state:

- update is still manual,
- provenance must be refreshed alongside the imported files.

Next slice should automate this with a dedicated import/update command.
