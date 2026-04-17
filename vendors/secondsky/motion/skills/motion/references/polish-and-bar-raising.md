# Polish And Bar Raising

This fork adds a second pass on top of the upstream Motion guidance.

The first pass answers:

- does the interaction animate correctly,
- is the implementation technically sound,
- does it respect Motion's API and performance constraints.

This file answers a different question:

- does the motion make the product feel more intentional.

## Principle

Motion should reveal structure, hierarchy, and state changes. It should not
look like a generic library demo dropped onto an otherwise plain interface.

If the animation draws attention to itself before it clarifies the interface,
the bar is still too low.

## Review Checklist

### 1. State Clarity

- The user should instantly understand what changed and why.
- Enter, exit, hover, and press states should feel related rather than random.
- Shared element or layout motion should preserve orientation during navigation.

### 2. Rhythm

- Nearby elements should feel like they belong to the same timing family.
- Avoid stacking unrelated durations and easings in the same surface.
- Prefer one clear motion cadence per surface over many tiny custom timings.

### 3. Restraint

- Default to smaller distances, lower scale jumps, and less bounce than the
  first instinct suggests.
- Remove motion that exists only to prove that animation is possible.
- Replace decorative fades with motion that communicates hierarchy or spatial
  change.

### 4. Hierarchy

- The most important element should have the most legible motion, not the most
  motion.
- Secondary elements should support the main interaction with stagger, delay, or
  reduced amplitude rather than competing for attention.
- Modal backdrops, cards, panels, and route transitions should reinforce the
  structure of the screen.

### 5. Physical Credibility

- Springs should feel purposeful. Do not use bouncy defaults unless the product
  tone truly calls for them.
- Expand/collapse motion should respect the real geometry of the surface.
- Direction changes should match the layout and reading flow.

### 6. Accessibility

- Reduced motion must still preserve state clarity.
- Motion should never be the only way a user perceives state change.
- Large parallax and scroll-linked effects need extra scrutiny for comfort.

### 7. Performance

- Prefer transforms and opacity over layout-thrashing properties.
- Keep expensive blur, filter, and large layered parallax effects rare.
- If the motion budget is tight, preserve the one movement that communicates the
  core transition and cut the rest.

## Bar-Raising Moves

Use these when the interface already works and needs refinement:

- Tighten timing so related elements land together.
- Reduce travel distance until the motion feels inevitable.
- Turn generic fade/scale entrances into layout-aware or shared-element motion.
- Use stagger only when it improves scan order or perceived craft.
- Make hover, focus, and pressed states feel like one interaction family.

## Failure Modes

These are common signs that the work needs another pass:

- everything fades in the same way,
- hover animations are louder than navigation transitions,
- springs bounce without product or brand reason,
- route transitions break spatial continuity,
- reduced-motion mode becomes an afterthought,
- animation style changes from one component to the next.

## Suggested Iteration Loop

1. Make the interaction work with the smallest correct Motion implementation.
2. Review hierarchy, timing, and restraint.
3. Remove one effect before adding another.
4. Check reduced-motion behavior.
5. Compare the result against the surrounding UI and normalize the motion family.

