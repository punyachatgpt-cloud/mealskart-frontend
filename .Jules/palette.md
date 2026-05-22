## 2025-05-14 - Synchronizing Interaction State and Accessibility

**Learning:** Interactive controls with functional boundaries (like increment/decrement buttons) require a three-pronged synchronization: the JavaScript logic (bounds checking), the visual state (CSS `:disabled` styles), and the accessibility layer (ARIA labels and `aria-live` regions). Inconsistencies between these layers—such as having a logic limit of 4 but a visual limit of 8—create "invisible" bugs that degrade the user experience for everyone, especially those using assistive technologies.

**Action:** Always verify that functional limits in event listeners match the `disabled` state logic in render functions. Pair every state-driven `disabled` change with explicit CSS feedback and ensure dynamic text updates use `aria-live="polite"` to keep screen reader users in the loop.
