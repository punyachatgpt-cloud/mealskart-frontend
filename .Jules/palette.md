## 2026-05-31 - [Synchronizing ARIA States in Dynamic UIs]
**Learning:** In highly dynamic applications like MealsKart, where UI state is often managed by toggling classes (e.g., `.selected`), it is critical to explicitly synchronize corresponding ARIA attributes (e.g., `aria-pressed`) within the same update function to ensure accessibility for screen readers.
**Action:** Always pair visual class toggles with ARIA attribute updates in centralized state-to-UI mapping functions like `setSelected`.
