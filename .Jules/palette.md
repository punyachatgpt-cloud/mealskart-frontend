## 2026-05-24 - [Synchronized ARIA States for Filter Chips]
**Learning:** In vanilla JavaScript applications, visual state changes (like toggling a `.selected` class) are often "silent" to screen readers. Interactive elements like filter chips (which act as toggle buttons) must have their `aria-pressed` attribute updated in the same function that handles the visual class toggle to ensure accessibility.
**Action:** Always pair `element.classList.toggle('selected', state)` with `element.setAttribute('aria-pressed', state)` in the core UI update functions.
