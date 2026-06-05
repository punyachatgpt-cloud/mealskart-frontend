## 2025-05-24 - [Static ARIA State Initialization]
**Learning:** When using JavaScript to manage selection states (like `.selected` classes), relying solely on the script to set accessibility attributes (like `aria-pressed`) on initialization can lead to a brief period where the static HTML is inconsistent for screen readers. Pre-selected elements in static HTML must explicitly include `aria-pressed="true"`.
**Action:** Always pair visual 'selected' classes in static HTML with their corresponding `aria-pressed="true"` attributes to ensure accessibility from the first paint.

## 2025-05-24 - [Haptic Feedback in Headless Environments]
**Learning:** Standard Playwright `.click()` actions might not trigger all JavaScript side effects (like Vibration API) if the browser environment is restricted or if the interaction is not 'trusted'. Mocking `navigator.vibrate` and using `page.dispatch_event` ensures more reliable verification of micro-interactions.
**Action:** Use `page.evaluate` to mock and track calls to hardware APIs like `navigator.vibrate` for automated verification.
