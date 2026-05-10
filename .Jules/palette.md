# 🎨 Palette's UX Journal

Critical UX/accessibility learnings for Simmer.

## 2025-05-14 - Initializing Journal
**Learning:** Establishing a dedicated space to track UX and accessibility improvements ensures that deliberate design decisions are preserved and consistently applied across the application's evolution.
**Action:** Use this journal to document non-obvious UX wins and accessibility constraints discovered during development.

## 2026-05-10 - Enhancing Serving Controls
**Learning:** Icon-only buttons (like '+' and '-') are common accessibility pitfalls. Adding explicit `aria-label` and `title` attributes significantly improves the experience for screen reader users and provides helpful tooltips for sighted users. Furthermore, using `aria-live="polite"` on dynamic count displays ensures that state changes are communicated immediately without interrupting the user's flow. Tactile feedback (vibration) on mobile devices adds a premium, responsive feel to these micro-interactions.
**Action:** Always provide descriptive ARIA labels for icon-only buttons and consider using ARIA live regions for elements that update dynamically in response to user input.
