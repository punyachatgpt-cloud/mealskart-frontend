## 2026-05-28 - [Serving Controls Accessibility & Haptics]
**Learning:** Icon-only numerical adjustment controls (e.g., +/- for servings) require explicit ARIA labels and live regions to ensure state changes are announced. Adding haptic feedback (vibration) provides a tactile "click" feel that enhances the perceived responsiveness of the interface.
**Action:** Always pair adjustment buttons with `aria-label`, `title`, and `aria-live` regions, and implement `navigator.vibrate(40)` for interaction confirmation.
