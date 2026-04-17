# ADR-0001: Bootstrap This Repo As A Skills Control Plane

## Status

Accepted on 2026-04-17.

## Context

This repository starts empty, but the intended use is not "publish one giant
bundle of all skills." The actual need is:

- keep track of skills you already maintain elsewhere,
- selectively fork upstream skills you want to customize,
- make it easy to install the right subset for a given project.

At least one source already exists as a standalone canonical repository:
`vabole/apple-skills`.

At least one desired customization is narrower: fork only the `motion` skill
from `secondsky/claude-skills` and add local polish/bar-raising guidance.

## Decision

Bootstrap this repo as a control plane with:

- a machine-readable catalog,
- a minimal local CLI,
- locally vendored skill forks only when customization is needed,
- collections for repeatable install bundles.

Do not duplicate entire external repositories by default.

## Consequences

### Good

- one system of record for source mapping and install workflows,
- no duplicate source of truth for full repositories like `apple-skills`,
- selective vendoring keeps local customization cheap and explicit,
- project installs can be scripted uniformly.

### Tradeoffs

- vendored forks need explicit provenance and update discipline,
- import/update automation is still a follow-up slice,
- this repo becomes orchestration-oriented rather than a pure publishable skill marketplace.

