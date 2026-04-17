# Animation Skills Maintenance

This note is for maintainers, not for agent-facing skill context.

## Rule

Keep repository mechanics out of skill-facing documents.

Do not make agents read lines about:

- the skill being a fork,
- where it is stored in this repo,
- how generation scripts work,
- why the package was structured this way.

Put that material here or in other maintainer docs instead.

## Current Split

### Motion skill

The Motion package combines:

- plain documentation routing through generated official-reference files,
- local opinionated guidance,
- a local polish/review layer.

The generated official-reference files come from:

- `sources/motion/resources.json`
- `scripts/motion-docs.ts`

Those files are maintainer machinery and should stay out of agent-facing prose
except where the skill directly routes the agent to the generated references.

### Generic animation guidance

`skills/ui-animation-direction` is repo-owned guidance for animation quality
across CSS, WAAPI, platform primitives, and libraries. It is intentionally not
library-specific.

## Apple Skills Reference

`vabole/apple-skills` is a good example of the general approach:

- keep agent-facing skill files focused on guidance,
- keep generated docs driven by source inputs,
- separate reference docs from pattern guides,
- use scripts as maintainer machinery rather than as skill prose.

This repo does not need to copy that project exactly, but it is a strong
reference for the general shape.

## Current Shape

The installable surface should stay obvious:

- `skills/` contains every installable skill directly
- `scripts/` contains maintainer tooling
- `sources/` contains generation inputs and caches
- `docs/maintainers/` contains repo mechanics and provenance

That is closer to the `apple-skills` shape and easier for both humans and
agents to navigate.
