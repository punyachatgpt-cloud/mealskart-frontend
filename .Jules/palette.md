# Palette's UX Journal

## 2025-05-14 - [Search Discovery via Keyboard Shortcuts]
**Learning:** Adding a '/' keyboard shortcut for search is a common pattern in modern web apps (like GitHub, Slack) that power users expect. However, it must be carefully implemented to avoid interfering with normal text input and should be visually hinted to improve discoverability for all users.
**Action:** Always pair the shortcut logic with an `aria-keyshortcuts` attribute and a `title` hint on the target element. Ensure the listener checks for `activeElement` to avoid stealing focus while the user is typing elsewhere.
