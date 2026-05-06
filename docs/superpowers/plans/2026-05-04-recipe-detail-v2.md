# Recipe Detail V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add real nutrition and a more interactive recipe detail experience while enriching an initial recipe set and gracefully supporting older recipes.

**Architecture:** Backend owns structured recipe data and returns enriched fields from `/recommend` and `/recipe/{id}`. Frontend renders serving scaling, macro nutrition, ingredient checklist, missing ingredients, substitution hints, and simple step timers from the API contract.

**Tech Stack:** FastAPI, CSV recipe source, Python `unittest`, static HTML/CSS/JavaScript frontend.

---

### Task 1: Backend Enrichment Contract

**Files:**
- Modify: `mealskart-backend/fastapi_app.py`
- Modify: `mealskart-backend/tests/test_api_contract.py`

- [ ] Add failing tests that assert recipe detail includes `servings`, `nutrition`, `ingredients_with_quantities`, and `substitutions`.
- [ ] Implement an enrichment map for an initial recipe set with graceful fallback.
- [ ] Include enriched fields in `/recommend` and `/recipe/{id}`.
- [ ] Run `python -m unittest tests.test_api_contract -v`.

### Task 2: Frontend Modal V2

**Files:**
- Modify: `index.html`

- [ ] Add serving controls, nutrition panel, ingredient checklist, missing ingredient section, substitution chips, and timer UI.
- [ ] Use existing ingredient input to calculate missing ingredients when opening recipe details.
- [ ] Scale ingredient quantities and nutrition values by serving multiplier.
- [ ] Run embedded JavaScript syntax verification with Node.

### Task 3: Final Verification

- [ ] Run backend contract tests.
- [ ] Run frontend JavaScript syntax check.
- [ ] Check git status and summarize changed files.
