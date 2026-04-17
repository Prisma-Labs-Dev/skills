# Opinionated Guide

This is the preferred subset for high-bar UI animation work.

Use it when the agent needs defaults instead of the full universe of possible
motion effects.

## Preferred Moves

### 1. Interaction feedback

Use subtle hover, press, and focus states that feel like one family.

Good defaults:

- short duration,
- small travel,
- no theatrical bounce,
- same easing family across related controls.

### 2. Layout continuity

When elements move, expand, collapse, reorder, or navigate, prefer motion that
preserves orientation.

This usually beats decorative entrances.

### 3. Clear enter and exit states

Use enter motion to stage hierarchy and exit motion to explain removal.

The user should understand what arrived or left without rereading the layout.

### 4. Stagger only when it improves scan order

Stagger is useful when it reinforces reading order or reveals a relationship.

Do not use it as a default ornament.

### 5. Scroll motion with a job

Use scroll-linked or viewport-triggered motion only when it explains depth,
progress, or section hierarchy.

Avoid turning every page into a parallax demo.

## Default Timing Bias

Do not treat these as hard laws, but as useful starting points:

- hover / focus / press: roughly 120-180ms
- small enter / exit: roughly 180-280ms
- larger layout or navigation transitions: roughly 240-420ms

The right move is usually to shorten the first draft, not lengthen it.

## Easing Bias

- enter: ease-out or spring with discipline
- exit: faster and more decisive than enter
- repeated interaction feedback: crisp and predictable

If a spring makes the UI feel toy-like without product intent, remove it.

## Visual Bias

- fewer moving parts
- smaller distances
- tighter rhythm
- stronger relationship between layout and motion

## Strong Smells

- every card fades upward the same way
- hover motion is louder than navigation motion
- one component uses spring bounce while another uses long soft easing
- the UI feels slower after animation was added
- reduced-motion mode is forgotten

