## 2026-05-19 - [Accessible Serving Controls & Logic Consistency]
**Learning:** Pairing dynamic UI updates with `aria-live="polite"` ensures that screen reader users receive immediate feedback on state changes (like serving counts). Additionally, keeping UI constraints (like button disabled states) in sync with functional logic (like max multiplier limits) prevents "dead" interactions that confuse users.
**Action:** Always verify that `aria-live` is present on dynamically updated text nodes and ensure consistency between CSS-driven `:disabled` states and JavaScript-driven logic boundaries.
