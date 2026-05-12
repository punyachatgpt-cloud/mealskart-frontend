# Redesign Diagnosis — Phase 1b
**Simmer visual audit against known issues**

Each problem is cited to exact file locations and the reference app whose approach informs the fix.  
No code is changed here. This is diagnosis only.

---

## Problem 1 — Monochrome brown: no hierarchy, accent overused

**What it means:** `var(--accent)` appears in at least 40 distinct CSS rules. The orange/amber signal that should mean "do this" or "your selection" is used for: primary button, chip selected state, heart active, save-btn saved state, ingredient tags, progress bars, search highlight, trending label, streakBanner, cookAgainArrow, section headers inside `#ingredientsPanel`, badge text, `tasteDNAStatVal`, `goalBarNumbers`, `ratedBadge`, community feed label, explore badge, NLP hint chips, quick-pick launch button, section title labels, all anchor text-links, and the Cook Mode timer button border.

**Specific locations in `index.html`:**
- `:root --accent: #B8560C` and all `var(--accent)` uses — diffuse across ~lines 229, 233, 265–267, 293, 629, 634, 726–727, 765–768, 788, 795, 814, 816, 855, 888, 901, 903, 916, 954, 980, 1450, 1472, 1527, 2067, 2131, 2150, 3160, 3267, 3270 (etc.)
- The intent-signal of the accent is completely lost.

**Reference fix — Linear (Move L-1):**  
Restrict `var(--accent)` to exactly two uses: (a) the primary CTA button background/glow; (b) `.chip.selected` border + text. Everything else uses ink/muted values. This makes the accent legible as a signal again.  
*Corollary:* Strip the accent from labels, progress bars, banners, and meta text. Use `var(--muted)` or `var(--ink)` at reduced opacity there instead.

---

## Problem 2 — Sidebar is 11 equally-weighted controls: feels like work

**What it means:** The `.left.glass` panel contains, at the same visual weight:  
1. Universal Search (`#searchInput`)  
2. Time filter chips  
3. Mood filter chips  
4. Craving/Category chip strip  
5. Diet chips  
6. Budget chips  
7. Ingredients tag input + mic  
8. Decide button (primary CTA)  
9. Show options / Meal plan (secondary CTAs)  
10. Collections / Goal / Shopping / Cook Log / Cuisine Explorer (utility links × 5)  
Plus: tagline hint text, plan duration row, trust copy.

All 11 items receive roughly the same vertical space (~40–60px each), the same typographic weight for labels (`font-size: 0.9rem; font-weight: 700`), and the same `var(--border)` container treatment.

**Specific locations:**  
`#timePanel` line ~5133, `#moodPanel` ~5141, `#categoryPanel` ~5150, `#dietPanel` ~5166, `#budgetPanel` ~5174, `#ingredientsPanel` ~5183, `.actions` block ~5197–5232

**Reference fix — Linear (Move L-3):**  
Give controls explicit visual tiers:
- **Tier 1 (always visible, high contrast):** Search + Diet toggle + Decide button
- **Tier 2 (visible, standard weight):** Time / Mood / Craving / Budget / Ingredients
- **Tier 3 (utility, recede):** Collections / Goal / Shopping / Cook Log / Cuisine Explorer — these should look like sidebar links, not action buttons

This does NOT hide or merge any controls. It uses size, weight, spacing, and colour to create a reading order.

---

## Problem 3 — Main canvas has 7 competing sections before a recipe is visible

**What it means:** On initial load, the `.right.glass` panel shows, in order, before any recipe card:
1. `.statusRow` (headline + subline + pref hint + decide hint + spinner + statusText)
2. `#streakBanner` (cooking streak)
3. `#goalBar` (calorie progress)
4. `#cookAgainWrap` (cook again card)
5. `#contextBannerWrap` (contextual banner)
6. `#tasteDNAInline` (Taste DNA stats)
7. `#uniSearchBanner` (search mode indicator)
8. `#quickStrip` (cuisine + popular chips)

Then finally: `#results` with recipe cards.

Even discounting the ones hidden by `.show` gates, 3–4 of these are visible simultaneously on a returning user's first page view. The recipes — the product — are below the fold.

**Specific locations:**  
Lines ~5237–5272 in the main `<main>` block. The `#results` section starts at ~5265 but is pushed down by everything above.

**Reference fix — NYT Cooking (Move NYT-2):**  
Collapse banners 2–8 into a single "header treatment" zone that reads as one editorial unit rather than 7 competing modules. The streak, cook again, and context copy should be presented as *editorial text within a single row*, not as separate bordered cards stacked vertically. The Taste DNA inline card and quick strip appear *below* the first recipe row, not above it.  
*Hard rule:* First recipe card must be visible without scrolling on any viewport ≥ 768px wide.

---

## Problem 4 — Typography is flat: no editorial voice

**What it means:** The app uses `Fraunces` (serif) only for recipe names and the brand h1. Every other typographic element uses `Manrope` or `Inter` at nearly identical weights (700–800) and sizes (0.88rem–1.18rem). The result is that the UI reads like a form, not a food publication.

**Specific locations — size inventory:**  
- Recipe card title `.foodName`: `1.4rem` Fraunces ✓  
- Section labels `.label`: `0.9rem` Manrope 700 UPPERCASE  
- Status row `.headline`: `1.18rem` Manrope 900  
- Status row `.sub`: `0.92rem` Manrope 700  
- Search placeholder: `0.95rem`  
- `.desc` (card description): `0.92rem` Manrope 700  
- `.whyBox strong`: `0.9rem` Manrope 900  
- Modal title `.modalTitle`: `2rem` Fraunces ✓  
- `.contextBannerTitle`: `0.88rem` Manrope 800  
- `.streakCalHeader`: `0.84rem` Manrope 800

Almost everything between 0.84rem and 1.18rem is the same weight (700–900) in Manrope, creating a flat band with no visual rhythm.

**Reference fix — NYT Cooking (Move NYT-1) + Kitchen Stories (Move KS-2):**  
Establish a strict type scale:
- `--t-xs`: 0.72rem / Manrope 600 — metadata, aisle labels, chip hints
- `--t-sm`: 0.85rem / Manrope 700 — body, descriptions, sublines
- `--t-base`: 1.0rem / Manrope 800 — UI labels, button text
- `--t-lg`: 1.2rem / Fraunces 700 — section headers, modal headlines
- `--t-xl`: 1.6rem / Fraunces 900 — hero card recipe names, page h1
- `--t-display`: 2.4rem / Fraunces 900 — modal title, Cook Mode step number

The key move: Fraunces should headline *every editorial section* (status row headline, "Today's Staff Pick", context banner), not just recipe names. This gives the page its editorial voice.

---

## Problem 5 — Pills used as the default container for everything

**What it means:** `border-radius: 999px` and pill-shaped containers are used for: filter chips, ingredient tags, smart chips on cards, search highlight, result count, quick pick launch button, NLP hint chips, search quick filters, rating chips, cooked count, streak banner items, badge rows, meta items, action chips in recipe modal, micro-macro items, and more.

When everything is a pill, pills stop meaning "interactive" or "category" — they become ambient noise.

**Specific locations:**  
- `.chip`: line ~209, radius `12px` (good) but the Ember layer overrides to `999px` at line ~3903
- `.smartChip`: `border-radius: 999px` line ~1149
- `.pill`: `border-radius: 999px` line ~1209
- `.badge`: `border-radius: 999px` line ~1232  
- `.metaItem`: `border-radius: 999px` line ~1262
- `.ingredientChip`: `border-radius: 999px` line ~1667
- `.imageTime`: `border-radius: 10px` line ~1121 (this one is correctly not a pill)
- `.resultCountPill`: line ~4973

**Reference fix — NYT Cooking (Move NYT-1):**  
Pills should only be used for interactive filter chips and ingredient tags. Everything else (time display, diet label, difficulty, calorie count, section badges, Why box) should be bare typographic elements with no border and no background. Reserve the pill shape for what it communicates: "this is a tag you can select or remove."

Concretely: `.metaItem`, `.smartChip`, `.badge` (non-interactive variants), `.pill` → remove border-radius and background; display as plain `font-weight: 700` text with an emoji or symbol prefix.

---

## Problem 6 — Inconsistent food photography mood

**What it means:** Recipe images come from two sources: TheMealDB (professional food photography, high contrast, well-lit) and CSV recipes (no images — `image_url: ""`). When `image_url` is empty, the card shows a blank warm-tinted rectangle (`rgba(200,105,14,0.07)` background) at the correct height. The mix of rich food photos and blank rectangles creates an uneven rhythm in the results grid.

Additionally, the `.foodImg::after` overlay (the gradient from image to card body) currently fades to `rgba(15,5,0,0.78)` — a correct warm brown — but the gradient start is nearly transparent (3%), meaning the transition from photo to card body is abrupt at mobile heights.

**Specific locations:**  
- `image_url: ""` for CSV recipes (50/322 recipes) — `recipes.csv` lines 1–60
- `.foodImg::after` gradient — line ~1083 (now `rgba(15,5,0,0.03)` → `rgba(15,5,0,0.78)`)
- `.foodImg` background color: `rgba(200,105,14,0.07)` — line ~4925
- Hero card overlay (Ember layer) at line ~3935: uses pure `rgba(0,0,0,...)` — this is a regression from Phase D

**Reference fix — Kitchen Stories (Move KS-1):**  
Two fixes:
1. For missing images: generate a warm gradient placeholder (e.g. `linear-gradient(135deg, rgba(200,105,14,0.12), rgba(180,90,14,0.04))`) with a centred dish-name initial in Fraunces — so blank cards still look intentional, not broken.
2. For the hero card overlay specifically: restore the warm `rgba(15,5,0,...)` values that Phase D established — the Ember layer CSS at line 3935 hardcoded pure black `rgba(0,0,0,...)` on `.foodCard.heroCard .foodImg::after` which overwrites Phase D's fix. This should be reconciled.

---

## Problem 7 — Tagline buried instead of being the hero

**What it means:** "Stop scrolling. Start cooking." is the brand's entire value proposition in five words. Currently it lives at:
- `.brand p` — `font-size: 1.1rem; font-weight: 500; color: var(--muted); max-width: 45ch` — line ~94
- It is the same visual weight as `#subline` below the recipe grid

The tagline is in a narrower column (max 45ch) to the left of the utility buttons (bell, theme, My Week), making the visual hierarchy of the topbar:

```
[🔥 Simmer.] [🔕 🌙 Dinner ready in 15 mins ⚡]
[Stop scrolling. Start cooking.]      [📊 My week]
```

The tagline competes with microcopy on the same row and loses.

**Specific locations:**  
- `.brand p`: line ~94–101  
- `.microcopy`: line ~5005 — rendered inline with buttons, same visual row as tagline  
- `.topbar` flex layout: lines ~68–82  

**Reference fix — Kitchen Stories (Move KS-2):**  
The tagline should be the largest text element in the topbar. Two options:
1. Make `.brand p` `1.3rem / Fraunces 700` in the same warm ink colour as the h1 sweep
2. *Or* eliminate it from the topbar entirely and use it as the `#headline` in the results panel — "Stop scrolling. Start cooking." as the first thing users see in the main canvas before they've made any selections

Either way: microcopy and utility buttons (bell, theme) move to a smaller secondary row so they do not visually compete with the brand statement.

---

## Phase 2 Preview — How the diagnosis informs the plan

| Problem | Fix type | Risk |
|---|---|---|
| Accent overuse | CSS variable restriction only | Low — no structural change |
| Sidebar hierarchy | Visual weight only (size/colour/spacing) | Low — no controls removed |
| 7 sections before recipes | Reorder/collapse DOM banners | Medium — DOM order changes |
| Flat typography | New type scale CSS variables | Low — additive tokens |
| Pills everywhere | Strip border-radius from display elements | Low — cosmetic only |
| Photo inconsistency | Placeholder + hero gradient fix | Low |
| Tagline buried | Topbar layout adjustment | Low — no feature change |

All 90 inventory items survive all 7 fixes.

---

*End of diagnosis.*
