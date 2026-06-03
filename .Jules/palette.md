## 2026-06-03 - Improved accessibility and feedback for serving controls
**Learning:** Dynamic UI updates like serving count changes are missed by screen readers unless explicitly marked with `aria-live`. Tactile feedback via `navigator.vibrate` provides an extra layer of "invisible UX" that makes the app feel more responsive on mobile.
**Action:** Always pair numerical state changes with `aria-live="polite"` and provide subtle haptic feedback for primary interactive increments/decrements.
