# Prisma Labs Agent Skills

Curated installable skills for UI animation, motion libraries, and high-bar
interaction quality.

This repository is structured so humans can understand it quickly and agents can
maintain it without reconstructing hidden context.

## Install

The repository root is an install source.

For local use on this machine, the source path is
`/Users/vabole/repos/skills`. Once this repository has a published remote,
replace that local path with `github:Prisma-Labs/agent-skills`.

### Claude Code

Install all skills from this local checkout:

```bash
npx skills add /Users/vabole/repos/skills --agent claude-code --skill '*' -y
```

Install all skills from GitHub:

```bash
npx skills add github:Prisma-Labs/agent-skills --agent claude-code --skill '*' -y
```

Install only Motion:

```bash
npx skills add /Users/vabole/repos/skills --agent claude-code --skill motion -y
```

Install only the generic animation direction skill:

```bash
npx skills add /Users/vabole/repos/skills --agent claude-code --skill ui-animation-direction -y
```

### Codex

Install all skills globally:

```bash
npx skills add /Users/vabole/repos/skills --agent codex --skill '*' -g -y
```

Install all skills globally from GitHub:

```bash
npx skills add github:Prisma-Labs/agent-skills --agent codex --skill '*' -g -y
```

Install only Motion:

```bash
npx skills add /Users/vabole/repos/skills --agent codex --skill motion -g -y
```

Install only the generic animation direction skill:

```bash
npx skills add /Users/vabole/repos/skills --agent codex --skill ui-animation-direction -g -y
```

### Cursor

Install all skills globally:

```bash
npx skills add /Users/vabole/repos/skills --agent cursor --skill '*' -g -y
```

Install all skills globally from GitHub:

```bash
npx skills add github:Prisma-Labs/agent-skills --agent cursor --skill '*' -g -y
```

## What's Included

| Skill | Type | Description |
| --- | --- | --- |
| `react-best-practices` | Vendored fork | React performance and architecture guidance with an explicit `useEffect`-as-last-resort bar |
| `motion` | Library skill | Motion for React with official-doc routing, examples/tutorials links, an opinionated subset, and a polish/review layer |
| `ui-animation-direction` | Guidance skill | Generic high-bar UI animation guidance across CSS, WAAPI, platform primitives, and libraries |

## Recommended Install Sets

### All skills

Use `--skill '*'` when you want the full repo.

### Motion stack

Install both of these together when the project uses Motion and you also want
the generic quality bar:

- `motion`
- `ui-animation-direction`

Example for Claude Code:

```bash
npx skills add /Users/vabole/repos/skills --agent claude-code --skill motion --skill ui-animation-direction -y
```

Example for Codex:

```bash
npx skills add /Users/vabole/repos/skills --agent codex --skill motion --skill ui-animation-direction -g -y
```

## Repository Shape

This repo is intentionally shaped to be obvious:

- `skills/`
  Every installable skill lives here directly.
- `scripts/`
  Maintainer tooling such as generated-doc refreshers.
- `sources/`
  Source manifests and generated caches for refreshable references.
- `docs/maintainers/`
  Provenance and repo-mechanics notes that should not leak into skill prose.
- `catalog/`
  Optional control-plane metadata for collections and install planning.

The shape is influenced by [apple-skills](https://github.com/vabole/apple-skills/tree/main):

- clear root install surface,
- direct `skills/` directory,
- generated reference docs driven by source inputs,
- human-readable README with copy-paste commands.

This repo does not need to copy that repository exactly, but it should keep the
same level of clarity.

## Maintainer Commands

Install repo dependencies:

```bash
pnpm bootstrap
```

List catalog entries:

```bash
pnpm skills-meta list
```

Refresh generated Motion references:

```bash
pnpm motion-docs:check
pnpm motion-docs:refresh
```

Validate the repo:

```bash
pnpm run ci
```
