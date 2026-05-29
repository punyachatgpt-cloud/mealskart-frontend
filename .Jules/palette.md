# Palette's UX Journal

## 2025-05-14 - Interactive Control Standardization
**Learning:** Icon-only buttons (like servings +/-) and stateful chips (filters) often lack proper ARIA attributes and tactile feedback, which are essential for accessibility and a "premium" feel.
**Action:** Always pair visual state changes (like `.selected`) with `aria-pressed` or `aria-expanded`, and include `navigator.vibrate(40)` for tactile confirmation on mobile.
