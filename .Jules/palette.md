## 2026-06-02 - [Accessible Filter Toggles]
**Learning:** Filter chips used as state toggles in this application require explicit `aria-pressed` attributes to communicate their selected state to screen readers. Standardizing this in a centralized `setSelected` function ensures consistent accessibility across all filter groups (Time, Mood, Diet, etc.).
**Action:** Always pair visual `.selected` class updates with `aria-pressed` attribute synchronization in the UI state management functions.
