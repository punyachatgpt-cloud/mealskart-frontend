## 2025-05-14 - Interactive Icon Button Accessibility
**Learning:** Icon-only buttons (using emojis or symbols like '✕', '-', '+', '❤️', '🔖', '📌', '🔍', '🔔', '🔖', '⏭️', '⏮️') throughout the app require both explicit `aria-label` and `title` attributes for accessibility compliance and hover hints.
**Action:** Always pair `aria-label` with `title` for any interactive element that doesn't have a clear text label.

## 2025-05-14 - Dynamic State Feedback
**Learning:** Dynamic UI updates reflecting state changes (e.g. serving count modifications) must use `aria-live="polite"` and `aria-atomic="true"` to ensure accessibility feedback for screen reader users.
**Action:** Use `aria-live` on elements that are updated dynamically via JavaScript to communicate changes to assistive technologies.
