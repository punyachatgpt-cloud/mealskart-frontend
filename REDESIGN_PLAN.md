# Redesign Plan — Phase 2
**Simmer — "Cook by Craving" visual redesign**

Execution begins only after explicit approval ("start step 1").  
All 90 inventory items (REDESIGN_INVENTORY.md) are preserved at every step.

---

## Step 1 — Design Tokens

### Files touched
- `index.html` — `:root` block (~line 20) and `[data-theme="dark"]` block (~line 3423)
- No HTML structure changes. No JavaScript changes.

### Inventory items affected
- Affects every visible element via CSS variables — all 90 items inherit from tokens
- No item is removed; token changes only refine existing visual properties

### Reference cited
- **Linear Move L-1** — one accent, used exactly twice: primary CTA + selected state
- **NYT Cooking Move NYT-1** — three type sizes, three weights maximum → type scale tokens

### Preservation confirmation
All 90 inventory items exist as DOM elements. Token changes shift colour/size values but do not alter any element's visibility, label, or interaction.

### What you will see when this step is done
A CSS diff showing:
1. **New type scale tokens** added to `:root`:
   ```
   --t-xs:       0.72rem   /* metadata, aisle labels */
   --t-sm:       0.84rem   /* descriptions, sublines, hints */
   --t-base:     0.96rem   /* UI labels, body, buttons */
   --t-lg:       1.2rem    /* card names (sans-hero), section headings */
   --t-xl:       1.58rem   /* hero recipe names */
   --t-display:  2.2rem    /* modal title, Cook Mode step num */
   --fw-reg:     500
   --fw-med:     700
   --fw-bold:    800
   --fw-black:   900
   ```

2. **Accent restriction tokens** added:
   ```
   --cta:        var(--accent)        /* primary button background only */
   --selected:   var(--accent)        /* chip.selected border + text only */
   --positive:   #16a34a             /* success / green states */
   --danger:     #dc2626             /* error / destructive */
   --ink-hi:     var(--ink)          /* primary readable text */
   --ink-lo:     var(--muted)        /* secondary/metadata text */
   --ink-faint:  var(--muted2)       /* tertiary, hints */
   ```

3. **Spacing scale tokens** added:
   ```
   --space-xs: 4px;  --space-sm: 8px;  --space-md: 16px;
   --space-lg: 24px; --space-xl: 40px; --space-2xl: 64px;
   ```

4. **Refined shadow tokens** replacing inline rgba values:
   ```
   --shadow-card:    0 4px 16px -2px rgba(50,20,5,0.10);
   --shadow-card-lg: 0 20px 48px -8px rgba(50,20,5,0.16);
   --shadow-hover:   0 28px 56px -8px rgba(50,20,5,0.20), 0 0 0 1.5px var(--accent);
   --shadow-float:   0 40px 80px -16px rgba(50,20,5,0.28);
   ```

Dark mode counterparts for all new tokens follow immediately after in `[data-theme="dark"]`.

---

## Step 2 — Page Shell (canvas + sidebar + main area)

### Files touched
- `index.html` — CSS for `.shell`, `.grid`, `.left`, `.right`, `.glass`, `.topbar`, `.brand`, `.microcopy`, `.actions`, utility link buttons, `.label`, `.section` (lines 60–160, 270–295, 370–415, 4817–4835)

### Inventory items affected (by name)
- **Brand / Tagline (#3)** — tagline gets editorial scale (Fraunces, larger)
- **Microcopy (#4)** — visually subordinated to brand
- **Bell Button (#5)** — stays, moved to secondary utility row
- **Theme Toggle (#6)** — stays, moved to secondary utility row
- **My Week Button (#7)** — stays, font weight reduced
- **Time Filter (#12)** — label hierarchy reduced (smaller, lighter label)
- **Mood Filter (#13)** — same
- **Craving Filter (#14)** — same
- **Diet Toggle (#15)** — same
- **Budget Filter (#16)** — same
- **Ingredients (#17)** — same
- **Decide Button (#19)** — bigger, clearer tier-1 treatment
- **Show Options (#20)** — stays, visual tier-2
- **Meal Plan (#21)** — stays, visual tier-2
- **Collections (#22)** — stays, visually receded to Tier 3 links
- **Goal (#23)** — stays, Tier 3
- **Shopping List (#24)** — stays, Tier 3
- **Cook Log (#25)** — stays, Tier 3
- **Cuisine Explorer (#26)** — stays, Tier 3
- **Trust Copy (#27)** — stays

### Reference cited
- **Linear Move L-3** — sidebar as utility tray, not control panel → 3-tier visual weight
- **Kitchen Stories Move KS-2** — editorial copy at brand scale
- **Linear Move L-2** — type restraint applied to sidebar labels

### Preservation confirmation
Zero controls removed. Every button, chip group, and link in the sidebar stays. The only changes are: font sizes, visual weight (weight/colour/spacing), and the topbar layout (tagline row separated from utility icons row).

### Sidebar tier plan (visual only, no DOM changes)
- **Tier 1** — full contrast, current size: Search bar, Diet chips, Decide button  
- **Tier 2** — standard weight, slightly smaller labels: Time / Mood / Craving / Budget / Ingredients  
- **Tier 3** — `var(--ink-faint)` labels, no box borders: Collections / Goal / Shopping / Cook Log / Cuisine Explorer / Trust copy

The tier separation is achieved purely through `font-size`, `font-weight`, `color`, `padding`, and `border` CSS values. No JS, no DOM reorder.

### Topbar layout change
Current: `[Brand col] [Buttons col]` flex row — tagline and microcopy compete at same height.  
New: Brand h1 stays left. Utility icons (bell, theme) move to a `4px`-height micro-row above the tagline. Microcopy moves *below* the tagline at `--t-xs`. The tagline itself is promoted to `--t-lg / Fraunces 700`. This makes "Stop scrolling. Start cooking." the second-largest text element on screen after the h1.

### What you will see when this step is done
- Tagline is clearly the second most prominent text on the page after "Simmer."
- Sidebar reads top-to-bottom: Search → Filters → Decide → Links (three clear zones)
- Utility buttons (bell, theme, My Week) feel like chrome, not features
- No orange accent on sidebar labels (muted colour instead)

---

## Step 3 — Hero Section (results area top)

### Files touched
- `index.html` — CSS for `.statusRow`, `.streakBanner`, `.goalBar`, `.cookAgainWrap`, `.contextBannerWrap`, `.tasteDNAInline`, `.uniSearchBanner`, `.quickStrip` (lines 383–415, 754–800, 2103–2150, 1923–1951, 1953–1984, 4872–4922)
- No JS changes. No DOM removal.

### Inventory items affected (by name)
- **Headline / Subline (#28)** — promoted to Fraunces editorial header
- **Pref Hint (#29)** — visual treatment changed (inline with headline, not below)
- **Decide Hint (#30)** — stays, same treatment
- **Streak Banner (#33)** — collapsed into headline row
- **Goal Bar (#34)** — stays below headline, slim treatment
- **Cook Again Card (#35)** — stays, visual treatment refined
- **Context Banner (#36)** — promoted: becomes the editorial headline text rather than a bordered box
- **Taste DNA Inline (#37)** — moves below first recipe row (not above)
- **Search Mode Banner (#38)** — stays
- **Quick Strip (#39)** — stays

### Reference cited
- **NYT Cooking Move NYT-2** — "What to cook" context framing as editorial sentence, not a card
- **Kitchen Stories Move KS-3** — one dominant element per section, rest as satellites

### Preservation confirmation
All 8 banner/context elements (#33–#39) remain in the DOM and remain functional. Changes are:
1. Streak banner collapses into a single line within the `#headline` row (e.g. "🔥 5-day streak · Your meals, served fresh") rather than a separate full-width card
2. Context banner text becomes a `p.editorial-header` element at `--t-lg / Fraunces` rather than a bordered card
3. Taste DNA inline card is shown *between* recipe row 1 and row 2 (via JS `renderResults()` splice), not above all recipes
4. Quick strip order: cuisine chips appear between the headline and the first recipe (compressed to single row), not as a separate section header

### What you will see when this step is done
- Open the app: the first recipe card is visible without scrolling on any ≥ 768px viewport
- The headline area reads as one editorial sentence (context + streak merged)
- Goal bar is slim (6px track, no surrounding card border)
- Cook again card is the only full-width element above the recipe grid

---

## Step 4 — Recipe Card

### Files touched
- `index.html` — CSS for `.foodCard`, `.foodImg`, `.foodImg::after`, `.imageLabel`, `.imageTitle`, `.imageTime`, `.foodBody`, `.foodName`, `.foodTop`, `.desc`, `.whyBox`, `.smartStrip`, `.smartChip`, `.pill`, `.badge`, `.badgeRow`, `.metaRow`, `.metaItem`, `.miniMacro`, `.remixStrip`, `.remixBtn`, `.cardShopBtn`, `.heartBtn`, `.saveBtn`, `.cardDismissBtn`, `.socialRow`, `.ratingChip`, `.cookedCount`, `.forYouBanner` (lines 589–630, 1015–1300+)
- **Hero card specific** (Ember layer lines ~3934–3948): reconcile pure-black overlay regression from Phase D

### Inventory items affected (by name)
- **Recipe Card standard (#40)** — card body restructured
- **Heart Button (#41)** — stays, visual treatment only
- **Save to Collections (#42)** — stays
- **Dismiss Button (#43)** — stays
- **Remix Strip (#44)** — stays
- **Add to Shopping List (#45)** — stays
- **Rating / Cooked Count (#46)** — stays
- **"Why this?" Box (#79)** — stays
- **Smart Chips (#80)** — pill treatment removed, typographic treatment applied
- **Search Highlight (#81)** — stays
- **Rated Badge (#82)** — stays
- **Personalised Badge (#83)** — stays
- **Remixed Badge (#84)** — stays

### Reference cited
- **Kitchen Stories Move KS-1** — photography as primary element, minimal chrome below fold
- **Kitchen Stories Move KS-3** — 1 dominant (hero) + supporting grid
- **NYT Cooking Move NYT-3** — 3 card sizes from one component
- **NYT Cooking Move NYT-1** — typography over pill containers
- **Linear Move L-1** — accent on interactive only

### Preservation confirmation
Every feature on every card stays. Changes are purely visual:
1. Remove pill border+background from non-interactive labels (`.smartChip`, `.metaItem` without click handlers)
2. Move time badge fully into image overlay (it already has `.imageTime` but `.metaRow` also repeats it — consolidate to image-only)
3. Hero card gradient: replace pure-black Ember layer values with warm `rgba(15,5,0,...)` from Phase D
4. Remix strip: always visible (no hover-reveal), reduced padding
5. Card body: `padding: 14px 16px` (reduced from 18px), narrower gap between elements
6. "Why this?" box becomes a `p.why-text` (no box background, no border, just `--ink-lo` italic text)

### What you will see when this step is done
- A card feels like a magazine clipping: large image → name overlaid at bottom → two lines of metadata → one italic "why" sentence → action row
- No pill soup below the image for non-interactive labels
- Hero card has proper warm-brown gradient overlay (not cold black)
- All card interactive elements (heart, save, dismiss, remix, add-to-list) work identically

---

## Step 5 — Supporting Sections

### Files touched
- `index.html` — CSS for `.trendingBar`, `.communityBar`, `.communityPill`, `.quickStrip`, `.quickChip`, `.tasteDNAInline`, `.goalBar`, `.cookAgainCard`, `.streakBanner`, `.emptyState`, `.staffPickBtn` (lines 754–800, 2103–2160, 2779–2815, 3827–3860, 4872–4926)

### Inventory items affected (by name)
- **Trending Bar (#8)** — stays, visual treatment only
- **Community Live Feed (#9)** — stays, visual treatment only
- **Streak Banner (#33)** — already repositioned in Step 3
- **Goal Bar (#34)** — stays
- **Cook Again Card (#35)** — visual treatment refined
- **Taste DNA Inline (#37)** — stays (repositioned in Step 3)
- **Quick Strip (#39)** — stays
- **Empty State / Staff Pick (#48)** — typography and illustration enlarged

### Reference cited
- **Kitchen Stories Move KS-2** — editorial curation copy
- **NYT Cooking Move NYT-2** — temporal context anchor

### Preservation confirmation
All sections stay in DOM. Changes:
1. Trending bar: `--t-xs` label, remove orange on "🔥 Trending" text (use `--ink-lo`)
2. Community bar: identical treatment, live dot stays green
3. Cook again card: remove box border, use a subtle left-border accent stripe instead (4px wide, `var(--accent)`)
4. Empty state: `--t-xl` Fraunces for "Today's Staff Pick", larger 5rem illustration
5. Quick chips: `border-radius: 12px` (not `999px`) — distinguish from filter chips

### What you will see when this step is done
- Trending + community strips read as atmosphere, not primary navigation
- Cook again card has editorial weight (accent stripe) without being a full card
- Empty state feels intentional and welcoming, not like an error

---

## Step 6 — Polish (motion, hover, micro-details)

### Files touched
- `index.html` — `@keyframes`, `transition:` declarations, hover rules, `::before`/`::after` pseudo-elements for gloss/glow

### Inventory items affected
- All interactive elements (buttons, chips, cards, links) gain or refine hover/active states
- No functionality changes

### Reference cited
- **Kitchen Stories** — restraint: motion only on primary interactions (card hover, button press, chip select)
- **Linear Move L-2** — transitions ≤ 200ms, spring curves only on elements that move > 4px

### Preservation confirmation
No features changed. This step only adjusts `transition-duration`, `easing`, `transform` amounts, and removes redundant `animation:` rules that currently run on every page load regardless of user interaction (e.g. the `chipGlow` infinite animation on every `.chip.selected`, and `fabGlowPulse` on initial load).

### Polish checklist
- [ ] Remove `chipGlow 2.2s infinite` — replace with a one-shot spring on selection
- [ ] Remove `fabGlowPulse` pre-trigger — only animate after 8 seconds of inactivity
- [ ] Unify card hover: `translateY(-6px)`, `box-shadow: var(--shadow-hover)`, `250ms ease-out`
- [ ] Button press: `scale(0.97)` on `:active`, `80ms` duration (currently `scale(0.968)` with `!important`)
- [ ] Chip select: `scale(1.0)` spring (currently `scale(1.02)` which makes unselected chips look shrunken)
- [ ] Topbar scroll elevation: already correct (Step 3 polishes the shadow values)
- [ ] Dark mode transition: already `0.25s ease` on background/border — keep

### What you will see when this step is done
- Page load: no animations running (except brand gradient sweep and flame)
- Interaction: motion happens only when user acts
- Hover/press: consistent feel across all cards, chips, and buttons
- No element vibrating or pulsing at rest unless it's a live data indicator (streak flame, community dot)

---

## Summary table

| Step | Scope | Primary reference | Inventory risk |
|------|-------|-------------------|---------------|
| 1 — Tokens | CSS variables only | Linear L-1, L-2 / NYT NYT-1 | None |
| 2 — Shell | Layout + sidebar hierarchy | Linear L-3 / KS KS-2 | None |
| 3 — Hero section | Banner reorder + editorial type | NYT NYT-2 / KS KS-3 | Low — DOM reorder only |
| 4 — Recipe card | Card body + image | KS KS-1 / NYT NYT-1, NYT-3 | None |
| 5 — Supporting sections | Strips + banners | KS KS-2 / NYT NYT-2 | None |
| 6 — Polish | Motion + micro-details | KS restraint / Linear L-2 | None |

---

## What is explicitly NOT changing

- Zero HTML element IDs removed or renamed
- Zero event handlers modified
- Zero API calls changed
- Zero user-visible labels changed without asking
- Zero features hidden behind additional clicks
- Zero card badge information removed (time, diet, difficulty, calories, rating, cooked count all stay)
- Zero overlay/sheet functionality changed
- Mobile tab bar: all 5 tabs stay
- More sheet: all 8 items stay
- Notification panel: all 4 toggles stay

---

*Phase 3 — Stop. Waiting for approval to start Step 1.*
