# Simmer — Complete Feature Inventory
**Status:** Contract document. Nothing listed here may be removed in the redesign.  
**File scoped to:** `index.html` (single-file app)  
**Line numbers reference:** CSS ends ~line 4990, HTML body ~5000–5543, JS ~5544+

---

## GLOBAL CHROME

### 1. Offline Banner
- **User sees:** "📶 You're offline — showing cached recipes"
- **HTML:** `#offlineBanner` · `.offlineBanner` · line ~5453
- **Behavior:** Fixed top bar, revealed (`.show`) when `navigator.onLine === false`
- **Dependencies:** `window.addEventListener('online'/'offline')`

### 2. Topbar (sticky header)
- **HTML:** `.topbar` · `<header>` · line ~5085
- **Behavior:** Sticky `top:0`; on scroll gains `.scrolled` class → frosted glass shadow
- **Contains:** Brand, Bell button, Theme button, Microcopy, My Week button

### 3. Brand / Tagline
- **User sees:** "🔥 Simmer." + "Stop scrolling. Start cooking."
- **HTML:** `.brand h1` (flame emoji + wordmark), `.brand p` · line ~5095
- **Behavior:** Animated gradient on h1 (7s infinite sweep); flame emoji has `flamePulse` animation

### 4. Microcopy
- **User sees:** Rotating contextual line, e.g. "Dinner ready in 15 mins ⚡"
- **HTML:** `#microcopy` · line ~5005
- **Behavior:** Updated by JS based on time of day / streak state

### 5. Bell Button (Cooking Reminders)
- **User sees:** 🔕 bell icon with active dot indicator
- **HTML:** `#bellBtn` · `.bellBtn` · line ~5001
- **Behavior:** Opens `.notifPanel` drawer from top; has `.active` dot state when reminders enabled
- **Drawer contents:** Master toggle, Dinner reminder (with time picker 5–8 PM), Streak nudge toggle, Weekly report toggle, Grant permission button
- **Dependencies:** `Notification` API, `localStorage` (reminder prefs)

### 6. Theme Toggle Button
- **User sees:** 🌙 / ☀️ icon
- **HTML:** `#themeBtn` · `.themeBtn` · line ~5004
- **Behavior:** Toggles `data-theme="dark"` on `<html>`; persists to `localStorage`

### 7. My Week Button
- **User sees:** "📊 My week" pill button
- **HTML:** `#weeklyReportBtn` · line ~5007
- **Behavior:** Opens `.reportOverlay` / `#reportOverlay` weekly cooking report sheet
- **Hidden on mobile** (line ~2352) — available via "More" sheet → `#moreWeekBtn`

---

## TRENDING & LIVE FEED STRIP

### 8. Trending Bar
- **User sees:** "🔥 Trending" label + horizontally scrolling dish names
- **HTML:** `.trendingBar` · line ~5085
- **Content:** Static list: Butter Chicken, Paneer Tikka, Dal Makhani, Chicken Biryani, Pav Bhaji, Chole Bhature, Masala Dosa, Palak Paneer, Aloo Paratha, Mutton Rogan Josh (duplicated for infinite loop)
- **Behavior:** CSS `tickerScroll` animation 36s linear infinite; pauses on hover; edge fade masks
- **Dependencies:** Pure CSS animation, no JS

### 9. Community / Live Activity Feed
- **User sees:** "👥 Live" pulsing dot + horizontally scrolling "[Name] just cooked [Dish]" pills
- **HTML:** `.communityBar` · `#communityBar` · `#communityFeed` · line ~5113
- **Behavior:** JS injects `communityPill` elements with simulated names/dishes; 44s ticker; pauses on hover; edge fade masks; live green dot animates (`livePulse`)
- **Dependencies:** `renderCommunityFeed()` JS function; simulated data, no API call

---

## LEFT SIDEBAR — FILTER CONTROLS

### 10. Universal Search Bar
- **User sees:** Search icon + placeholder "e.g. Butter Chicken, Pasta, Chinese…"
- **HTML:** `#searchInput` · `.searchInput` · `.searchWrap` · line ~5123
- **Behavior:** 
  - 250ms debounce → `fetchAutocompleteSuggestions()` → populates `#searchDropdown` with live API matches (thumbnails, cuisine tags)
  - 550ms debounce → `commitSearch()` → calls `GET /api/search?q=…` → replaces results panel
  - AbortController cancels in-flight requests on new keystroke
  - `.hasValue` class shows right-edge clear button
  - Shows search history in dropdown (up to 5 items, removable per-item)
  - Shows "Quick filter" chips in dropdown (Veg, Quick, Indian, etc.)
- **API:** `GET /api/search?q=&diet=&limit=6`
- **Clear button:** `#searchClearBtn` — clears input, hides dropdown, clears search mode banner

### 11. Search Dropdown
- **User sees:** Layered sections: "Live matches" (API), "Recent searches" (history), "Quick filters" chips
- **HTML:** `.searchDropdown` · `#searchDropdown` · line ~1999 (CSS), ~5127 (HTML)
- **Behavior:** Visible (`.visible`) when search has text; items clickable to commit search; ESC closes

### 12. Time Filter
- **User sees:** "Time" label + "15 min" / "30 min" chip buttons
- **HTML:** `#timePanel` · chips with `data-group="time"` `data-value="15|30"` · line ~5133
- **State:** `state.time_available` (default 15)
- **Behavior:** Chip selection updates state, triggers `getSuggestions()` on next recommend call

### 13. Mood Filter
- **User sees:** "Mood" label + "quick" / "healthy" / "comfort" chips
- **HTML:** `#moodPanel` · `data-group="mood"` · line ~5141
- **State:** `state.mood` (default "quick")
- **Values:** quick, healthy, comfort

### 14. Craving / Category Filter (Cuisine Strip)
- **User sees:** "Craving" label + horizontally-scrollable chip strip: all / north indian / south indian / continental / chinese / salad / drinks / snacks / sweets / other
- **HTML:** `#categoryPanel` · `.seg.scroll` · `data-group="category"` · line ~5150
- **State:** `state.category` (default "all")
- **Behavior:** Selecting a non-"all" chip also triggers `getSuggestions()`; `syncCuisineStripActive()` keeps this in sync with the results-panel cuisine strip

### 15. Diet Toggle (Veg / Non-Veg)
- **User sees:** "Diet" label + "veg" / "non-veg" chips
- **HTML:** `#dietPanel` · `data-group="diet"` · line ~5166
- **State:** `state.diet` (default "veg")
- **Behavior:** Core filter; passed to every API call as `diet=veg|non-veg`; soft +5 relevance boost in `/search`

### 16. Budget Filter
- **User sees:** "Budget" label + "💚 Economical" / "✨ Any" / "💰 Premium" chips
- **HTML:** `#budgetPanel` · `data-group="budget"` · line ~5174
- **State:** `state.budget` (default "any")
- **Behavior:** Passed to `/recommend` as `budget=` param; server applies filtering

### 17. Ingredients in Your Fridge (Tag Input)
- **User sees:** "Ingredients in your fridge" label + tag-pill input with mic button
- **HTML:** `#ingredientsPanel` · `#tagInputWrap` · `#tagTextInput` · line ~5183
- **Behavior:**
  - Type + Enter/comma → adds pill tag (`addTag()`)
  - Backspace on empty → removes last tag (`removeTag()`)
  - Tags stored in `state.ingredientTags[]`
  - Pantry save/load: `savePantry()` / `loadPantry()` to `localStorage`
  - Recent ingredient chips: `recentIngredients` from `localStorage`, shown as clickable chips
  - Pantry count hint: shows how many saved
  - Ingredient autocomplete dropdown with COMMON_INGREDIENTS list
  - Tags passed to `/recommend` as `ingredients[]=` array
- **Dependencies:** `state.ingredientTags`, `localStorage`

### 18. Voice Input (Mic Button)
- **User sees:** 🎤 mic icon inside ingredient label
- **HTML:** `#micBtn` · `.micBtn` · line ~5186
- **Behavior:** Activates `webkitSpeechRecognition`; `.listening` class shows pulsing red state; parsed result fed into `addTag()`; `#micHint` shows status text

---

## LEFT SIDEBAR — ACTION BUTTONS

### 19. Decide for Me Button (Primary CTA)
- **User sees:** "🍽️ Decide for me" + subline "picks 1 dish based on your filters"
- **HTML:** `#decideBtn` · `.btn` (primary) · line ~5198
- **Behavior:** Calls `getSuggestions({ mode:"decide" })`; shows single `decideCard`; sets `#decideHint` visible; "Your meal is decided." confirmation copy
- **API:** `POST /api/recommend` with `{ mode:"decide", ... }`
- **Mobile duplicate:** `#decideBtnMobile` (legacy bar, hidden), `#tabDecide` in tab bar triggers same action

### 20. Show Options Button (Secondary CTA)
- **User sees:** "Show options" + subline "shows 3 ideas"
- **HTML:** `#suggestBtn` · `.btn.secondary` · line ~5200
- **Behavior:** Calls `getSuggestions({ mode:"suggest" })`; shows 3 cards in grid with hero layout
- **API:** `POST /api/recommend`
- **Mobile:** `#suggestBtnMobile` (legacy), `#tabHome` in tab bar

### 21. Meal Plan Button
- **User sees:** "🗓️ Meal plan" + subline "plan for the week"
- **HTML:** `#planBtn` · `.btn.secondary` · line ~5201
- **Behavior:** Shows `#planDurationRow` (3/5/7 day selector), then calls plan generation; renders `.planWrap` with day cards
- **API:** `POST /api/recommend` (multiple calls for meal plan)
- **Subcontrols:** Day duration selector (3/5/7 buttons, `#planDurationRow`)
- **Mobile:** `#planBtnMobile`, `#morePlanBtn`

### 22. Collections Button
- **User sees:** "📚 Collections" + count badge
- **HTML:** `#collectionsBtn` · `#collectionsCount` · line ~5210
- **Behavior:** Opens `#collectionsOverlay`; count shows total saved recipes across all collections
- **Dependencies:** `localStorage` (collections data); `updateCollectionsCount()`
- **Mobile:** `#moreCollectionsBtn`

### 23. Goal Button
- **User sees:** "🎯 Goal" + label ("Set" or calorie target)
- **HTML:** `#goalBtn` · `#goalBtnLabel` · line ~5214
- **Behavior:** Opens `#goalSetupOverlay` if no goal; opens `#nutDashOverlay` (Nutrition Dashboard) if goal set; `#goalBar` shows progress bar in results panel
- **Mobile:** `#moreGoalBtn`

### 24. Shopping List Button
- **User sees:** "🛒 Shopping List" + count badge (hidden when 0)
- **HTML:** `#shoppingListBtn` · `.shoppingBadge` · `#shoppingBadge` · line ~5219
- **Behavior:** Opens `#shoppingOverlay`; badge count from `getShoppingList()` length; `updateShoppingBadge()` refreshes count
- **Mobile:** `#tabList` tab (shows badge `#tabListBadge`)

### 25. Cook Log Button
- **User sees:** "📖 Cook Log" + count (hidden when 0)
- **HTML:** `#cookLogBtn` · `#cookLogCount` · line ~5223
- **Behavior:** Opens `#cookLogOverlay`; count = number of cooked entries in `localStorage`
- **Mobile:** `#moreCookLogBtn`

### 26. Cuisine Explorer Button
- **User sees:** "🌍 Cuisine Explorer" + explored-count badge
- **HTML:** `#exploreBtn` · `.exploreLink` · `#exploreBadge` · line ~5227
- **Behavior:** Opens `#cuisineOverlay`; badge shows "X explored"
- **Mobile:** `#moreExploreBtn`

### 27. Trust Copy
- **User sees:** "⚡ Takes less than 5 seconds"
- **HTML:** `.trust` · line ~5231
- **Behavior:** Static copy; no interaction

---

## RIGHT PANEL — STATUS ROW

### 28. Headline / Subline
- **User sees:** Dynamic headline, e.g. "Your meals, served fresh" / "Tap a card to start cooking step-by-step."
- **HTML:** `#headline` · `#subline` · `.statusRow` · line ~5239
- **Behavior:** Updated by `renderResults()`; changes based on mode (decide, suggest, search, plan)

### 29. Pref Hint
- **User sees:** Personalization note below headline (after 3+ cooks)
- **HTML:** `#prefHint` · `.prefHint` · line ~5241
- **Behavior:** Shown when personalisation profile active; shows top cuisine preference

### 30. Decide Hint
- **User sees:** "⭐ Your meal is decided. No thinking needed. Start cooking."
- **HTML:** `#decideHint` · `.decideHint` · line ~5242
- **Behavior:** Shown only in decide mode; hidden otherwise

### 31. Loading Spinner
- **User sees:** Animated spinner + "Finding the best meal for you..."
- **HTML:** `#loading` · `.spinner` · line ~5245
- **Behavior:** `display:flex` when `isLoadingSuggestions=true`; hidden on response

### 32. Status Text
- **User sees:** Short status messages, result counts
- **HTML:** `#statusText` · line ~5249
- **Behavior:** Updated by `renderResults()`; slides in from right

---

## RIGHT PANEL — CONTEXTUAL BANNERS (above results)

### 33. Streak Banner
- **User sees:** "🔥 X-day cooking streak!" with optional calendar dots
- **HTML:** `#streakBanner` · `.streakBanner` · line ~5253
- **Behavior:** Shown (`.show`) if streak ≥ 2; `calMode` shows 7-day dot calendar; cook nudge variant if haven't cooked today; flame flicker animation
- **Dependencies:** `localStorage` (cook log dates); `renderStreak()`

### 34. Goal / Calorie Progress Bar
- **User sees:** Calorie progress bar with today's count vs. goal
- **HTML:** `#goalBar` · `.goalBar` · line ~5254
- **Behavior:** Shown (`.show`) if goal set; clickable to open Nutrition Dashboard; `updateGoalBar()`
- **Dependencies:** `localStorage` (goal, cook log)

### 35. Cook Again Card
- **User sees:** Thumbnail + last-cooked dish name + arrow, "Cook again?" prompt
- **HTML:** `#cookAgainWrap` · `.cookAgainCard` · line ~5255
- **Behavior:** Shown if `localStorage` has recent cook entry; clicking opens recipe modal for that dish
- **Dependencies:** `LAST_COOKED_KEY`, `renderCookAgainCard()`

### 36. Context Banner
- **User sees:** Contextual insight banner (e.g. time-of-day, weather mood)
- **HTML:** `#contextBannerWrap` · `.contextBanner` · line ~5256
- **Behavior:** Injected by `renderContextBanner()`; shows contextual copy based on hour of day
- **Dependencies:** `new Date().getHours()`

### 37. Taste DNA Inline Card
- **User sees:** "YOUR TASTE DNA" + Top Cuisine / Diet / Avg Cook / Total Meals stat tiles
- **HTML:** `#tasteDNAInline` · `.tasteDNAInline` · line ~5258
- **Behavior:** Shown (`.show`) only after 3+ cooks; populated by `renderTasteDNAInlineCard()` + `getPersonalisationProfile()`
- **Dependencies:** `localStorage` (cook log)

### 38. Universal Search Mode Banner
- **User sees:** "🔍 Showing results for: [term]" + "✕ Clear search" button
- **HTML:** `#uniSearchBanner` · `.uniSearchBanner` · line ~5260
- **Behavior:** Shown (`.show`) when in active search mode; cleared by `#uniSearchClearBtn` or backspacing search

### 39. Quick Strip (Cuisine + Popular chips)
- **User sees:** Cuisine filter chips (All / North Indian / Continental / Chinese / South Indian / Snacks) + Popular Tonight dish chips
- **HTML:** `#quickStrip` · `.quickStrip` · line ~5264
- **Behavior:** Rendered by `renderQuickStrip()`; cuisine chips update `state.category` + call `getSuggestions()`; dish chips call `searchRecipes(dishName)`

---

## RIGHT PANEL — RECIPE CARDS

### 40. Recipe Card (Standard)
- **User sees:** Food image, title overlay (name + time badge), diet tag, time pill, difficulty pill, ingredient preview, "Why this?" box, remix strip, "🛒 Add to list" button, ❤️ heart button, 📌 save button, ✕ dismiss button
- **HTML:** `.foodCard` created dynamically by `renderResults()`
- **Behavior on tap:** Opens `#recipeModal`
- **Card variants:**
  - `.heroCard` — spans 2 rows, 380px image
  - `.decideCard` — decide mode styling

### 41. Recipe Card — Heart (Favourite) Button
- **User sees:** ❤️ / 🤍 toggle
- **HTML:** `.heartBtn` · `.heart` inside each card
- **Behavior:** `favoriteRecipe(id)` → toggles `FAVORITES_KEY` in `localStorage`; heartBeat animation on save

### 42. Recipe Card — Save to Collections Button
- **User sees:** 📌 bookmark icon
- **HTML:** `.saveBtn` inside each card
- **Behavior:** Tapping opens `.colPicker` popover with collection list; can add to existing or create new collection

### 43. Recipe Card — Dismiss Button
- **User sees:** ✕ shown on card hover (always visible on mobile)
- **HTML:** `.cardDismissBtn` inside each card
- **Behavior:** Removes that card from results; adds id to `recent_suggestions` exclusion list

### 44. Recipe Card — Remix Strip
- **User sees:** "🥗 Healthier" / "🌶 Spicier" / "⚡ Quicker" pill buttons
- **HTML:** `.remixStrip` · `.remixBtn` inside each card
- **Behavior:** Calls `/api/remix` endpoint; shows loading overlay; replaces card content in-place; undo button available; `.badge.remixed` added

### 45. Recipe Card — Add to Shopping List Button
- **User sees:** "🛒 Add to list" button at card bottom
- **HTML:** `.cardShopBtn` inside each card
- **Behavior:** `addRecipeToShoppingList(card._item)`; button text changes to "✓ N items added"; auto-reverts after 2.2s; updates `#shoppingBadge`

### 46. Recipe Card — Rating / Cooked Count
- **User sees:** Green ★ star rating badge + "Nx cooked" count
- **HTML:** `.ratingChip` · `.cookedCount` inside `.socialRow`
- **Behavior:** Rating from `localStorage`; cooked count from `localStorage`; shown on cards for rated recipes

### 47. For You / Personalised Banner
- **User sees:** Gradient banner above results: "Because you loved [X]…"
- **HTML:** `.forYouBanner` on statusRow
- **Behavior:** `renderForYouBanner()` — shown when personalisation profile has top cuisine

### 48. Empty State / Staff Pick
- **User sees:** 🍳 illustration + "Today's Staff Pick" + [recipe text] + "Cook this tonight" button
- **HTML:** `#emptyState` · `#staffPickText` · `#staffPickBtn` · line ~5266
- **Behavior:** Shown on initial load; `staffPickBtn` triggers `getSuggestions({ mode:"decide" })`
- **Dependencies:** `localStorage` (date-based daily pick)

---

## RECIPE MODAL

### 49. Recipe Modal
- **HTML:** `#recipeModal` · `.modal` · line ~5277
- **Trigger:** Any recipe card click → `openModal(item)`

### 50. Modal — Title + Meta Grid
- **User sees:** Recipe name + 3 meta items (time, difficulty, diet)
- **HTML:** `#modalDishName` · `#modalMeta`

### 51. Modal — Serving Controls
- **User sees:** "Servings" label + – / count / + buttons
- **HTML:** `#servingMinusBtn` · `#servingPlusBtn` · `#servingCount`
- **Behavior:** `servingMultiplier` scales macro values; `1x / 2x / 3x` display

### 52. Modal — Macro Grid
- **User sees:** 4 macro tiles: Calories / Carbs / Protein / Fat
- **HTML:** `#macroGrid` — estimated values, scaled by servingMultiplier

### 53. Modal — Ingredient Checklist
- **User sees:** Checkboxes for each ingredient; missing ingredients highlighted
- **HTML:** `#modalIngredients` · `#missingBox` · `#substitutionBox`
- **Behavior:** Cross-references `state.ingredientTags`; missing box shows what user doesn't have; substitution box shows swap suggestions

### 54. Modal — Step-by-Step Cook Mode (inline)
- **User sees:** "Step N / M" label + progress bar + step text + timer + Previous/Next Step buttons
- **HTML:** `#stepCountLabel` · `#stepProgressBar` · `#stepText` · `#timerRow` · `#prevStepBtn` · `#nextStepBtn`
- **Behavior:** Parses `item.steps`; timer start/stop per step; step navigation

### 55. Modal — Remix Buttons
- **User sees:** "🥗 Healthier" / "🌶 Spicier" / "⚡ Quicker"
- **HTML:** `#modalRemixRow` · `.modalRemixBtn` · line ~5305
- **Behavior:** Same as card remix but applies to the modal's active recipe

### 56. Modal — Action Row
- **User sees:** "🔗 Share" / "🖼️ Card" / "🛒 Grocery list" / "🛒 Add to List"
- **HTML:** `#shareRecipeBtn` · `#shareCardBtn` · `#exportGroceryBtn` · `#addToListBtn` · line ~5298
- **Behavior:**
  - Share → Web Share API or clipboard fallback
  - Card → opens `#shareCardOverlay` (Instagram-style recipe image)
  - Grocery list → adds ingredients to `#shoppingOverlay`
  - Add to List → `addRecipeToShoppingList()`

### 57. Modal — Save Recipe Button
- **User sees:** "📌 Save recipe"
- **HTML:** `#saveRecipeBtn` · line ~5304
- **Behavior:** `saveRecipe(activeRecipe)` → opens collection picker

### 58. Modal — Cook Mode Entry Button
- **User sees:** "🍳 Enter Cook Mode — full screen"
- **HTML:** `#cookModeEntryBtn` · line ~5310
- **Behavior:** Opens `#cookModeOverlay` full-screen cook mode

---

## COOK MODE 2.0 (Full-Screen Overlay)

### 59. Cook Mode Overlay
- **HTML:** `#cookModeOverlay` · `.cookModeOverlay` · line ~5413
- **Features:**
  - Dish name top-left
  - SVG progress ring (step N of M) with ember glow
  - Step text (large, centered)
  - Per-step timer (SVG ring countdown) with Start/Pause button
  - Previous / Next Step nav buttons
  - Voice navigation: "next" / "previous" via SpeechRecognition
  - Voice indicator with pulsing green dot

---

## OVERLAYS & SHEETS

### 60. Rating Overlay
- **HTML:** `#ratingOverlay` · line ~5326
- **Trigger:** After completing last step in recipe modal
- **Features:** 5-star rating, Phase 2 shows tag chips (Tasty, Easy, Made again, etc.) + notes textarea + save button

### 61. Shareable Recipe Card Overlay
- **HTML:** `#shareCardOverlay` · `#shareCardEl` · line ~5343
- **Features:** Square card (400px) with food image, brand watermark, recipe name, meta, category tag; Download + Share (Web Share API) buttons

### 62. AI Chef Chat
- **HTML:** `#chefChatOverlay` · `#chefChatPanel` · line ~5360
- **FAB trigger:** `#chefFab` floating button ("👨‍🍳 Ask Chef") · line ~5353
- **Features:** Message history, AI/user bubbles, thinking animation, recipe result cards inline, suggestion chips, text input + send button
- **Mobile:** `#tabChat` tab bar button
- **API:** `POST /api/chat`

### 63. Cook Log Sheet
- **HTML:** `#cookLogOverlay` → `#cookLogSheet` · line ~5383
- **Features:** List of cooked recipes with date, stars, tags, notes; empty state; clicking entry reopens recipe modal

### 64. Shopping List Sheet
- **HTML:** `#shoppingOverlay` → `#shoppingSheet` · line ~5388
- **Features:** Items grouped by aisle (Produce, Dairy, Pantry, etc.); checkbox per item; source recipe label; Clear all / Export actions; progress label "N of M checked"

### 65. Collections Sheet
- **HTML:** `#collectionsOverlay` → `#collectionsSheet` · line ~5393
- **Features:** Groups by collection name; recipe mini-cards with thumb + name + meta; remove per item; delete collection; create new collection

### 66. Goal Setup Sheet
- **HTML:** `#goalSetupOverlay` → `#goalSetupSheet` · line ~5397
- **Features:** Calorie goal input; preset buttons (1200 / 1500 / 1800 / 2000 / 2500 kcal); macro inputs (carbs/protein/fat)

### 67. Nutrition Dashboard
- **HTML:** `#nutDashOverlay` → `#nutDashSheet` · line ~5403
- **Features:** SVG calorie ring (today consumed vs. goal); macro bars (carbs, protein, fat, fibre); 7-day bar chart; no-goal CTA

### 68. Cuisine Explorer
- **HTML:** `#cuisineOverlay` → `#cuisineSheet` · line ~5408
- **Features:** Cuisine Challenge progress bar; grid of cuisine cards (flag emoji, name, desc, "Explored" badge); clicking a card filters main results; explored count shown in sidebar badge

### 69. Weekly Report Sheet
- **HTML:** `#reportOverlay` → `#reportSheet` · line ~5446
- **Features:** Stats grid (meals cooked, total time, total calories, streak); Top dish highlight; Share / Export buttons

### 70. Taste DNA Overlay (full)
- **HTML:** `#tasteDNAOverlay` → `#tasteDNACard` · line ~5516
- **Features:** Full Taste DNA stats: top 3 cuisines, diet split bar, top dishes list, share button
- **Trigger:** `#moreTasteBtn` in More sheet

### 71. Quick-fire Overlay
- **HTML:** `#quickfireOverlay` · line ~5497
- **Features:** Full-screen card swipe; recipe shown one at a time; "Save" / "Next" buttons; counter ("3 of 10"); shortlist button
- **Trigger:** `quickPickLaunchBtn` in results header

### 72. Saved Recipe Book Sheet
- **HTML:** `#savedSheetOverlay` → `#savedSheet` · line ~5505
- **Features:** List of pinned recipes with thumb, name, meta; close button; empty state
- **Trigger:** `#moreSavedBtn` in More sheet

### 73. Onboarding Overlay
- **HTML:** `#onboardOverlay` → `#onboardCard` · line ~5458
- **Features:** Multi-step (diet choice, cuisine, time preference); progress dots; Skip / Next buttons; success screen
- **Trigger:** First-time visit (no `localStorage` prefs)

---

## MOBILE-SPECIFIC

### 74. Mobile Tab Bar
- **HTML:** `.tabBar` · `#tabBar` · line ~5472
- **Tabs:** Suggest (✨) / Decide (🎲) / Chef (👨‍🍳) / List (🛒 + badge) / More (☰)
- **Behavior:** Active tab highlighted; List tab shows `#tabListBadge` count

### 75. Mobile "More" Sheet
- **HTML:** `#moreSheetOverlay` → `.moreSheet` · line ~5521
- **Trigger:** "More" tab (☰)
- **Contents:** Cook Log / Collections / Goal / Cuisine Explorer / Meal Plan / My Week / Taste DNA / Saved (with count); Accent colour picker

### 76. Accent Colour Theme Picker
- **User sees:** Row of colour swatches in More sheet
- **HTML:** `#themeSwatches` · `.themeSwatch` · line ~5538
- **Behavior:** Injects new `--accent` and `--accent2` CSS variables; persists to `localStorage`

### 77. Mobile Bar (Legacy, Hidden)
- **HTML:** `#mobileBar` · line ~5465
- **Behavior:** Hidden on mobile by tab bar; kept for desktop wiring; contains Decide / Options / Plan buttons

### 78. Cooking Reminders Notification Panel
- **HTML:** `#notifDrawer` · `#notifPanel` · line ~5017
- **Features:** Master toggle, Dinner reminder + time selector, Streak nudge toggle, Weekly report toggle, Grant permission button, status text

---

## CARD-LEVEL MICRO-FEATURES

### 79. "Why this?" Box
- **User sees:** Italic explanation of why recipe was recommended
- **HTML:** `.whyBox` inside each card
- **Behavior:** Generated from `item.why` field from API response

### 80. Smart Chips on Cards
- **User sees:** Tag pills: quick / healthy / comfort / veg / popular / etc.
- **HTML:** `.smartStrip` · `.smartChip` inside each card

### 81. Search Highlight
- **User sees:** Highlighted matching text in recipe names during search
- **HTML:** `.searchHighlight` spans injected by `highlightMatch()` JS function

### 82. Rated Badge on Cards
- **User sees:** ★ N.N badge (amber) on previously-rated recipes
- **HTML:** `.ratedBadge` inside badge row

### 83. "Personalised for you" Badge
- **User sees:** Purple gradient "Personalised for you" badge on recommended cards
- **HTML:** `.badge.personalised`

### 84. Remixed Badge
- **User sees:** Amber "✨ Remixed" badge after AI remix
- **HTML:** `.badge.remixed`

---

## GLOBAL FEATURES (not tied to one DOM element)

### 85. Track Interaction / User Preference Learning
- **API:** `POST /api/track` — called on "cooked" and "view" actions
- **Behavior:** Increments server-side `user_preferences` counters for tags, diet, category; returned in subsequent `/recommend` calls as boosted scoring

### 86. Personalisation Profile
- **Function:** `getPersonalisationProfile()` in JS
- **Returns:** `top3Cuisines`, `preferredDiet`, `avgCookTime`, `totalCooks`, `topDishes`
- **Used by:** Taste DNA inline/overlay, For You banner, pref hint

### 87. PWA / Service Worker
- **File:** `sw.js` (separate)
- **Behavior:** Cache-first static, network-first API (5-min TTL); TheMealDB images cached; offline fallback
- **HTML:** `<link rel="manifest" href="/manifest.json">` · line ~14

### 88. Floating Particles
- **User sees:** Subtle food emoji particles floating upward
- **HTML:** `.foodParticle` elements injected by JS
- **Behavior:** CSS `floatUp` animation; different speeds/delays; filtered `drop-shadow`

### 89. Toast Notification System
- **User sees:** Top-center pill toast messages (info/success/error/warn)
- **HTML:** `.simmerToast` created dynamically
- **Function:** `showToast(message, type)` in JS

### 90. Scroll Elevation on Topbar
- **User sees:** Topbar gains frosted glass effect on scroll
- **Behavior:** `IntersectionObserver` or scroll listener adds `.scrolled` class to `.topbar`

---

*End of inventory — 90 items catalogued.*  
*This document is the redesign contract. All 90 items must survive Phase D and beyond.*
