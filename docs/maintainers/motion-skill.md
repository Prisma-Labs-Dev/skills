# Motion Skill Maintenance

This note is for maintainers.

## Upstream Source

The Motion skill started from:

- Repository: `https://github.com/secondsky/claude-skills`
- Commit: `88da5ffe9767d2b75bd5a5545165ca4bcd868168`
- Source path: `plugins/motion`

## Current Local Shape

The installable skill now lives at:

- `skills/motion`

The goal is to make the repo shape obvious at a glance:

- every installable skill is directly under `skills/`
- maintainer machinery stays outside that surface

## Local Additions

- generated official-reference files for Motion docs, tutorials, and examples
- local opinionated guide
- local polish and review layer
- generic companion skill `skills/ui-animation-direction`

## Maintainer Rule

Keep provenance and generation details here or in other maintainer docs, not in
the agent-facing skill text.

