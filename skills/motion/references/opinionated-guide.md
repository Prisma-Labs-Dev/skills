# Opinionated Guide

This is the local guide for the good parts of Motion.

Use it when the agent does not need the whole API surface and the task is a
typical product interaction rather than Motion exploration for its own sake.

## Preferred Subset

Reach for these first:

- `motion.*` components for direct element animation
- `AnimatePresence` for exit states and conditional UI
- `layout` and `layoutId` for spatial continuity
- `whileHover`, `whileTap`, and `whileFocus` for interaction states
- `useScroll` and `useTransform` for restrained scroll-linked motion
- `MotionConfig reducedMotion="user"` for accessibility defaults
- `LazyMotion` when bundle size matters

## Default Bias

- Prefer one clear motion family per surface.
- Prefer layout-aware transitions over generic fade-plus-scale entrances.
- Prefer smaller distances and less bounce than the first draft suggests.
- Prefer a small number of well-placed animated elements over blanket animation.
- Prefer official docs when the question is about exact API behavior.

## Good Parts For Most Product Work

### 1. Motion component

Start with `motion.div`, `motion.button`, and `motion.section` before inventing
abstractions.

### 2. AnimatePresence

Use it for modals, drawers, toasts, menus, and any UI that should exit cleanly.

### 3. Layout animations

Use `layout` and `layoutId` when the user benefits from seeing continuity
between states or routes.

### 4. Gesture states

Use `whileHover`, `whileTap`, and `whileFocus` as a consistent interaction
family.

### 5. Scroll motion

Use scroll-linked motion sparingly and only where it clarifies hierarchy or
progress.

## Avoid By Default

- giant variant systems before the interaction itself is proven useful
- loud springs everywhere
- generic fade-ins on every block
- heavy parallax as default page decoration
- CSS transition classes that fight Motion

## Escalation Rule

- Need exact API/current behavior: load `official-learning-path.md`
- Need the curated local subset: stay here
- Need visual quality and taste: load `polish-and-bar-raising.md`

