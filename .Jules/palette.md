# Palette Journal

## 2026-05-21 - [Enhanced Serving Controls]
**Learning:** Pairing ARIA live regions with tactile feedback (haptics) and visual disabled states creates a multi-modal confirmation of state changes that benefits all users, especially on mobile and for those using assistive technologies.
**Action:** Always include `aria-live="polite"` for dynamic counters and use `navigator.vibrate(40)` for micro-interactions like increment/decrement buttons.
