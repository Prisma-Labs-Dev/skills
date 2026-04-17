# Implementation Patterns

Use this file when deciding how to implement the animation, not just how it
should feel.

## Choose The Smallest Reliable Surface

### Native CSS

Best for:

- hover, focus, and press states
- small reveal or hide transitions
- simple page or section entrances
- loading indicators and decorative loops that do not need runtime orchestration

Prefer CSS when:

- the state is simple,
- the timing is straightforward,
- the project does not already need a heavier animation layer.

## Web Animations API

Best for:

- imperative sequencing,
- timeline-style control,
- animation tied to runtime conditions where CSS gets awkward.

Use it when:

- the browser surface is web-native,
- the project benefits from imperative control without adding a library.

## Library-Based Animation

Best for:

- layout transitions,
- shared-element motion,
- gestures,
- orchestrated entrance/exit patterns,
- complex interactions where the library is already part of the stack.

Rules:

- prefer the library the repo already uses,
- do not introduce a new animation library for trivial effects,
- do not fight the library with overlapping CSS transitions.

## Common Choices

### Motion

Good for React-heavy animation where layout transitions, presence, gestures, or
scroll-linked motion are important.

If Motion is already in play, pair this skill with the `motion` skill.

### GSAP or timeline-heavy tooling

Good when precise choreography or imperative control is central to the effect.

If the project already uses it, stay within that system.

## By Interaction Type

### Hover / focus / press

Default to native CSS unless the component is already inside a library-driven
motion system.

### Modal / drawer / toast / menu

Use a solution that gives you consistent enter and exit handling. CSS can be
enough for simple surfaces; a library may be better if presence or staging is
already established.

### Layout expansion / reordering / route continuity

Use a layout-aware tool if the project has one. This is where dedicated
animation libraries usually justify themselves.

### Scroll-linked effects

Use sparingly. Prefer simple transforms and opacity over expensive layered
effects.

