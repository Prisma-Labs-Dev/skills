# Provenance

This directory vendors the upstream `motion` skill package from:

- Repository: `https://github.com/secondsky/claude-skills`
- Commit: `88da5ffe9767d2b75bd5a5545165ca4bcd868168`
- Source path: `plugins/motion`
- Imported on: `2026-04-17`

Local additions in this fork:

- `skills/motion/references/polish-and-bar-raising.md`
- `skills/motion/references/official-learning-path.md`
- `skills/motion/references/tutorials-and-examples.md`
- `skills/motion/references/opinionated-guide.md`
- Updated skill and plugin descriptions to reflect the local polish layer
- Added an explicit local-fork note in `skills/motion/SKILL.md`
- Removed stale version claims from the local skill so the official docs remain
  the freshness source
- Added `scripts/motion-docs.ts` and `sources/motion/resources.json` so the
  official-docs references can be regenerated from Motion's current pages

The intent is to keep the upstream Motion guidance intact while adding a second
review layer for refinement, restraint, and quality bar raising.
