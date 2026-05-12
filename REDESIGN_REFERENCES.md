# Redesign Reference Study
**Skimmer Visual Redesign — Phase 1a**

These are calibration references. The goal is to reach their bar, not copy their look.
Skimmer's identity — pantry matching, Decide for me, Ask Chef, Taste DNA — must remain prominent.

---

## 1. Kitchen Stories (kitchenstories.com / iOS app)

### 3 moves to steal

**Move KS-1: Photography as the primary UI element.**  
Kitchen Stories lets the food photograph fill the entire card — no competing chrome below the fold. The image does the persuasion work; only the recipe title and one or two meta items appear overlaid directly on the image. Action buttons are ghost/icon only.  
*Why it fits Skimmer:* Skimmer's food cards currently bury the image under a pile of pills and text below it. Moving the title, diet tag, and time badge *into* the image overlay (as Skimmer's `imageTitle`/`imageTime` already attempt) while slimming the card body would give food the stage it deserves without removing any features.

**Move KS-2: Section curation copy that gives editorial voice.**  
Kitchen Stories headlines sections: "Comfort food for a rainy day", "15-minute weeknight wins". These aren't filter labels — they're editorial sentences that make the app feel like a publication.  
*Why it fits Skimmer:* The `#headline` / `#subline` area, the contextBanner, and the "Because you loved X" banner all have the bones for this. The gap is that the copy is generic ("Your meals, served fresh") and the typography has no editorial scale differentiation.

**Move KS-3: One dominant accent card per section, rest as supporting grid.**  
Kitchen Stories uses a 1-up hero card (full-width, tall image) followed by a 2-column supporting grid. Your eye always knows where to start.  
*Why it fits Skimmer:* Simmer already has `.heroCard` but it only activates in `hasHero` mode. The redesign should make hero-first the default layout for the suggest mode, and tighten the supporting cards to feel like satellites, not equals.

### 1 thing NOT to copy
**Kitchen Stories hides personalisation behind a profile tab.** Their homepage feels impersonal — no "because you like X" logic is surfaced. Skimmer's Taste DNA, pref hints, and For You banner are a meaningful competitive edge. Do not deprioritise these features to look editorial.

### 1 thing Skimmer already does that Kitchen Stories does not — protect this
**Pantry-matching with real-time ingredient cross-reference in the modal (missing box + substitution box).** Kitchen Stories has no equivalent. This is Skimmer's most practical feature — the one that makes it genuinely useful on a Tuesday night. The ingredient checklist and missing-ingredient callouts must stay prominent in the recipe modal.

---

## 2. NYT Cooking (cooking.nytimes.com / iOS app)

### 3 moves to steal

**Move NYT-1: Typography does the hierarchy work, not containers.**  
NYT Cooking uses aggressive type-size contrast: recipe names are large serif (≥1.6rem on cards), section headers are small-caps uppercase labels (0.72rem, tracked). Everything else is body text. There are almost no pill containers, box borders, or card backgrounds — the type hierarchy tells you what's important.  
*Why it fits Skimmer:* Simmer currently uses pills for almost every label (time, diet, difficulty, mood, cuisine). This creates visual noise. Replacing most pills with bare typographic labels — and reserving pills for only interactive filters — would clean up the information density immediately. The Fraunces serif is already in the stack and only used for recipe names and brand; it should also lead section headers.

**Move NYT-2: "What to cook" section framing — date/context + curation copy + 1 anchor recipe.**  
NYT Cooking opens every page with a time-and-context anchor: "For dinner tonight" or "What to cook this weekend" — a sentence that grounds the user temporally. Below that is one anchor recipe (full bleed image + large title), then supporting recipes.  
*Why it fits Skimmer:* The contextBanner (#36 in inventory) already attempts this but is visually weak — a small card that competes with the streak banner, goal bar, and cook again card. Giving the context framing typographic weight (as a h2-level editorial sentence, not a bordered box) would make the session feel curated.

**Move NYT-3: Recipe cards at three sizes, all from one component.**  
NYT uses hero (full-width, ~280px image), medium (half-width, ~180px image), and list (thumbnail left, text right) — all clearly related by using the same type treatment. The sizing creates rhythm on the page.  
*Why it fits Skimmer:* Simmer's cards currently have hero vs. standard but both have the same body component height. A genuine list-size variant (thumb + name + two-line meta, no "Why this?" box) would let the results grid breathe and give users more at a glance on mobile.

### 1 thing NOT to copy
**NYT Cooking's paywall friction and login-first onboarding.** Their first interaction is a subscription prompt. Skimmer's value should be immediately legible — the onboarding is lightweight and the first recipes must be visible without any gate. Do not add any interstitial friction in front of recipe browsing.

### 1 thing Skimmer already does that NYT Cooking does not — protect this
**"Decide for me" as a first-class action.** NYT has no AI decision engine. Simmer's entire left sidebar is a decision-support interface — filters + ingredients + a single decisive action. NYT expects users to browse and choose. Skimmer removes that cognitive load. The Decide button must stay large, prominent, and the highest-hierarchy CTA in the interface.

---

## 3. Linear (linear.app)

### 3 moves to steal

**Move L-1: One accent colour, used exactly twice per screen.**  
Linear uses a single purple accent: on the primary CTA and on the active/selected state of one control. Everything else is monochrome grey. The discipline makes the accent feel meaningful — it always signals "do this" or "this is your state."  
*Why it fits Skimmer:* The current design applies `var(--accent)` to: button gradients, chip selected states, heart button active, badge text, ingredient tags, progress bars, search highlight, section labels, trending label, tooltip text, and more. The accent no longer signals priority — it's ambient. Linear's discipline means: accent = "primary CTA" + "your selected state". Everything else gets ink/muted.

**Move L-2: Three type sizes maximum, three weights maximum.**  
Linear's entire UI uses: 0.72rem labels / 0.88rem body / 1.0rem headline — each in regular, medium, or bold. That's 9 possible combinations and they only use ~5 of them. The restraint makes the UI feel resolved.  
*Why it fits Skimmer:* The current CSS has font sizes ranging from 0.58rem (7-day chart labels) to 2.6rem (Cook Mode step number) — roughly 20 distinct sizes. Collapsing to a proper scale (xs: 0.72rem / sm: 0.82rem / base: 0.92rem / lg: 1.1rem / xl: 1.35rem / display: 1.8rem+) would create rhythm without removing any content.

**Move L-3: Sidebar as a utility tray, not a control panel.**  
Linear's sidebar is primarily navigation — it's a collapsed list of destinations, not a form. When you need to filter, filters appear contextually inline with the content. The sidebar does not demand attention.  
*Why it fits Skimmer:* The left panel currently has 11 controls all visible simultaneously: search, time, mood, craving, diet, budget, ingredients, Decide, Options, Plan, + 6 utility links. This is the "feels like work" problem from the diagnosis. The fix is not to remove controls — it is to give them visual weight hierarchy so the primary actions read first and the utility links recede.

### 1 thing NOT to copy
**Linear's icon-only sidebar navigation.** Linear reduces its sidebar labels to icons on small screens. In Skimmer this would be disastrous — "Decide for me", "Show options", and "Meal plan" are verbs with crucial subtext ("picks 1 dish", "shows 3 ideas"). Icon-only reduces these to indistinguishable dice/list icons. Labels must stay.

### 1 thing Skimmer already does that Linear does not — protect this
**Food photography as the primary content medium.** Linear is pure data/text — there are no images. Skimmer's recipe images (especially TheMealDB photography) are the emotional hook that makes users hungry and curious. The image must lead every card, and the hero card's cinematic 380px image is correct — protect and expand it.

---

*End of reference study.*
