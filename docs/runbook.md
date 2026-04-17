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

## Add a new external source

1. Add the source under `sources` in `catalog/registry.json`.
2. Add one or more skills that resolve to that source's GitHub repo.
3. Add or update a collection if you want a reusable bundle.
4. Run `pnpm run ci`.

## Add a new locally forked skill

1. Vendor the upstream skill package under `vendors/<owner>/<skill>`.
2. Add provenance in the vendored directory and the catalog entry.
3. Add your local references, templates, or scripts.
4. Validate with `pnpm run ci`.

## Update a vendored fork

Current state:

- update is still manual,
- provenance must be refreshed alongside the imported files.

Next slice should automate this with a dedicated import/update command.
