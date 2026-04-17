# Implementation Plan

## Goal

Turn `/Users/vabole/repos/skills` into a maintainable catalog for external skill
repos, local forked skills, and reusable install collections.

## Current Plan

1. Bootstrap the repository with durable docs, a machine-readable catalog, and a
   minimal CLI.
2. Import one real upstream skill fork to prove the model works.
3. Add import/update automation for vendored forks.
4. Expand the catalog and collections as new skill sources are added.

## Current Slice

Completed in this slice:

- bootstrap docs and contracts,
- local catalog and validation CLI,
- initial external source entries for `apple-skills`,
- vendored `motion` fork with local polish guidance.

Next slice:

- add a repeatable import/update command for vendored forks,
- grow collections based on real project setups instead of speculative bundles.

