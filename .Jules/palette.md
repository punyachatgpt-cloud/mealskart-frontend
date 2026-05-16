## 2025-05-15 - [Accessibility] Serving Size Controls
**Learning:** Icon-only buttons (like '-' and '+') and dynamic text updates (like '1x') lack context for screen readers if not properly annotated.
**Action:** Always pair icon-only buttons with `aria-label` and `title`, and use `aria-live="polite"` on elements that change dynamically based on user interaction to ensure the state change is communicated.
