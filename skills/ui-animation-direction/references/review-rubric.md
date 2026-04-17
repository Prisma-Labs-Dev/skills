# Review Rubric

Use this after the animation works.

The goal is to reject technically correct but aesthetically weak motion.

## 1. State Clarity

- Is it obvious what changed?
- Does the motion explain arrival, departure, emphasis, or continuity?
- Would the UI still make sense if viewed quickly?

## 2. Hierarchy

- Does the most important element get the clearest motion?
- Are secondary elements supporting rather than competing?
- Does stagger improve reading order or just add delay?

## 3. Rhythm

- Do related elements share a timing family?
- Are durations and easings coherent across the surface?
- Does the result feel tighter after repeated use?

## 4. Restraint

- Can one effect be removed with the result becoming better?
- Is travel distance smaller than the first instinct suggested?
- Is bounce justified by the product tone?

## 5. Accessibility

- Is reduced motion handled?
- Is motion the only way the user learns about a state change?
- Do focus states remain legible for keyboard users?

## 6. Performance

- Are transforms and opacity doing most of the work?
- Are expensive effects like blur, large shadows, or parallax used carefully?
- Does the motion stay responsive on repeated interaction?

## 7. Stack Fit

- Does the implementation match the existing project approach?
- Are CSS transitions and JS animation code fighting each other?
- Was a heavy library introduced for an effect that did not need it?

## Pass Condition

The animation should survive this question:

"If I removed the motion entirely, would the interface become less clear, less
cohesive, or less polished?"

If the answer is no, the motion is probably not earning its keep.

