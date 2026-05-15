# PALETTE'S JOURNAL - CRITICAL LEARNINGS ONLY

## 2025-05-14 - Accessible & Tactile Serving Adjustments
**Learning:** Icon-only buttons for numeric adjustments (like + and -) lack semantic meaning for screen readers and visual feedback for boundary states. Pairing ARIA labels with explicit CSS :disabled styles and tactile feedback (vibration) creates a multi-sensory confirmation of state changes.
**Action:** Always include `aria-label`, `title`, and `:disabled` styles for adjustment controls. Use `aria-live="polite"` on the value being changed to ensure the result of the interaction is announced.
