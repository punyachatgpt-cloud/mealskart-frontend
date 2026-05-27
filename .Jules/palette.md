# Palette's UX Journal
## 2026-05-27 - [Accessibility & Tactile Feedback]
**Learning:** Selection states (chips) must use 'aria-pressed' and dynamic updates (servings) require 'aria-live' for screen reader parity. Subtle haptics (40ms) significantly improve the 'premium' feel on mobile.
**Action:** Always synchronize 'aria-pressed' in 'setSelected' and add 'aria-live' to any counter or status text.
