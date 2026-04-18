# React Best Practices Skill Maintenance

This note is for maintainers.

## Upstream Source

The React best practices fork is based on:

- Repository: `https://github.com/Prisma-Labs-Dev/frontend-skills`
- Commit: `fcb87e33b5c91af2471b56a789f5383b5158078f`
- Source path: `skills/react-best-practices`

## Current Local Shape

The installable skill now lives at:

- `skills/react-best-practices`

The initial local copy was seeded from the project-installed version under:

- `/Users/vabole/repos/app-store-analisis/.agents/skills/react-best-practices`

That preserved the already-installed package shape before local customization.

## Local Additions

- stronger top-level metadata so the skill explicitly warns against unnecessary
  `useEffect` usage
- a first-screen checklist that forces the agent to consider render derivation,
  event handlers, keyed resets, and loader/server-function seams before adding
  an effect
- additional rules for:
  - `useEffect` only for external systems
  - keyed resets over prop-sync effects
- wording updates to existing effect-related rules so the fork's position is
  clear even when an agent opens just one rule file

## Maintainer Rule

Keep provenance and fork rationale here or in other maintainer docs, not in the
agent-facing skill text.
