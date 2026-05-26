## 2025-05-26 - [Haptic Feedback & ARIA for Serving Controls]
**Learning:** Icon-only numeric controls (+/-) in this application often lack descriptive ARIA labels and live region announcements, and they don't provide tactile confirmation on touch devices.
**Action:** Always pair serving size adjustments with `aria-live="polite"`, descriptive `aria-label`s, and `navigator.vibrate(40)` to ensure the interaction is accessible and feels physically responsive.
