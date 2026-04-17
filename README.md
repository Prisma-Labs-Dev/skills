# Skills Meta Repository

This directory is the control plane for your skills portfolio.

It is intentionally not a clone of every skill repository you own. Instead it
tracks three things in one place:

1. external skill repositories that remain canonical somewhere else,
2. locally vendored forks for upstream skills you want to modify,
3. curated collections that make project setup repeatable.

## Current Model

- `catalog/registry.json`
  Machine-readable registry of sources, skills, and installable collections.
- `vendors/`
  Locally forked skills that you want to own and extend inside this repo.
- `src/cli.ts`
  Small wrapper for listing catalog entries, inspecting one entry, planning
  installs, and validating repo invariants.
- `docs/`
  Durable operating model, decisions, and current frontier.

The first concrete fork is `vendors/secondsky/motion`, imported from
`secondsky/claude-skills` at commit `88da5ffe9767d2b75bd5a5545165ca4bcd868168`
and extended locally with:

- generated official-resource references sourced from `motion.dev`,
- an opinionated local guide for the preferred subset,
- a polish/bar-raising layer for refinement work.

## Why This Shape

`apple-skills` is already its own canonical repository. Duplicating that content
here would create two sources of truth. This repo should instead know how to
point at `vabole/apple-skills` for shared skills and only vendor the individual
upstream skills you actually want to fork.

That keeps the maintenance split clean:

- whole-repo ownership stays in the dedicated repo,
- selective customization lives here,
- project install workflows can target either kind through one catalog.

## Commands

Install dependencies:

```bash
pnpm bootstrap
```

Inspect the catalog:

```bash
pnpm skills-meta list
pnpm skills-meta show motion
```

Plan or run an install:

```bash
pnpm skills-meta install motion --agent codex --dry-run
pnpm skills-meta install apple-design --agent codex
```

Validate the repo:

```bash
pnpm check
pnpm smoke
pnpm run ci
```

Refresh the generated Motion resource references:

```bash
pnpm motion-docs:check
pnpm motion-docs:refresh
```

## Recommended Workflow

### For a repo you already own end-to-end

Keep it external and add catalog entries that point at the GitHub repository.

That is the right model for `vabole/apple-skills`.

### For one upstream skill you want to fork

1. Vendor only the relevant skill package into `vendors/<owner>/<skill>`.
2. Record the upstream repo, commit, and source path in `catalog/registry.json`.
3. Keep the plain official-docs layer generated from source inputs when possible.
4. Keep opinionated guidance separate from the plain docs layer.
5. Add any local references, templates, or scripts inside the vendored fork.
6. Install it through the local path entry from this repo.

That is the right model for the `motion` skill.

## Current Catalog

- `apple-design`
  Collection for Apple design work, backed by `vabole/apple-skills`.
- `motion`
  Vendored fork of `secondsky/claude-skills/plugins/motion`.
- `motion-polish`
  Collection wrapper around the local `motion` fork.

## Next Direction

The next useful slice after this bootstrap is import/update automation for
vendored forks so refreshing an upstream-pinned skill is one command instead of
a manual copy step. Motion now has the first version of a generated
official-resource pipeline; the same pattern can be extended to other forks.
