## 2026-05-18 - [Accessibility & Feedback Synergy]
**Learning:** Purely functional state changes (like disabling a button via JS) must be paired with explicit CSS `:disabled` styles and ARIA attributes (e.g., `aria-live`) to ensure the state change is communicated visually, tactually, and to screen readers simultaneously.
**Action:** Always check if `.disabled = true` in JS has a corresponding CSS rule and ARIA live region for affected content.
