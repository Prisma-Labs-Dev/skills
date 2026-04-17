# Skills Repo Guide

This repository is a control plane for your skills portfolio.

Start here:

1. Read [README.md](/Users/vabole/repos/skills/README.md).
2. Read [docs/index.md](/Users/vabole/repos/skills/docs/index.md).
3. Read [docs/architecture.md](/Users/vabole/repos/skills/docs/architecture.md).
4. Read [docs/runbook.md](/Users/vabole/repos/skills/docs/runbook.md).
5. Read [docs/decisions/ADR-0001-bootstrap.md](/Users/vabole/repos/skills/docs/decisions/ADR-0001-bootstrap.md).
6. Read [docs/implementation-plan.md](/Users/vabole/repos/skills/docs/implementation-plan.md).
7. Read [docs/remaining-work.md](/Users/vabole/repos/skills/docs/remaining-work.md).
8. Continue from [docs/exec-plans/active/2026-04-17-current-frontier.md](/Users/vabole/repos/skills/docs/exec-plans/active/2026-04-17-current-frontier.md).

Canonical commands:

- `pnpm bootstrap`
- `pnpm skills-meta list`
- `pnpm skills-meta show <id>`
- `pnpm skills-meta install <id> --dry-run`
- `pnpm lint`
- `pnpm test`
- `pnpm check`
- `pnpm smoke`
- `pnpm run ci`

Working rules:

- Keep `catalog/registry.json` as the source of truth for sources, forked skills, and collections.
- Vendor only the specific upstream skill packages you actually want to customize.
- Record upstream provenance in the catalog and in the vendored skill folder.
- Put durable repo knowledge in `docs/`, not in chat.
- Keep exactly one active frontier file under `docs/exec-plans/active/`.
- Finish one meaningful slice fully: code, docs, validation, and frontier updates.
- If the planned implementation is complete, say so explicitly instead of inventing new backlog.

Historical task records belong in `docs/exec-plans/completed/`.
