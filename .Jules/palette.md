## 2025-05-15 - [Accessibility & Tactile Feedback Patterns]
**Learning:** Icon-only buttons (like '+' and '-') require both `aria-label` and `title` for full accessibility. Pairing state changes (like `disabled`) with visual cues (grayscale/opacity) and tactile feedback (`navigator.vibrate`) significantly enhances the UX by providing multi-modal confirmation.
**Action:** Always ensure interactive elements that lack text labels have explicit ARIA labels and hover titles. Use haptic feedback for discrete UI adjustments to make the interface feel more physical and responsive.
