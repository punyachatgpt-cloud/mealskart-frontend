import asyncio
from playwright.async_api import async_playwright
import os

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        # Mock recommendations
        await page.route("**/api/recommend", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='''[
                {
                    "id": "1",
                    "name": "Creamy Avocado Pasta",
                    "time_minutes": 15,
                    "calories": 450,
                    "difficulty": "easy",
                    "tags": "quick,healthy,comfort",
                    "category": "continental",
                    "reason": "Perfect for a quick and healthy dinner.",
                    "why": "Avocado provides healthy fats while keeping it creamy without heavy cream.",
                    "ingredients_preview": ["pasta", "avocado", "garlic", "lemon"],
                    "nutrition": {"protein_g": 12, "carbs_g": 55, "fat_g": 22, "fiber_g": 8}
                },
                {
                    "id": "2",
                    "name": "Spicy Chickpea Salad",
                    "time_minutes": 10,
                    "calories": 320,
                    "difficulty": "easy",
                    "tags": "quick,healthy",
                    "category": "salad",
                    "reason": "A zesty and protein-packed salad.",
                    "why": "Chickpeas are a great source of plant-based protein.",
                    "ingredients_preview": ["chickpeas", "cucumber", "tomato", "onion"],
                    "nutrition": {"protein_g": 15, "carbs_g": 40, "fat_g": 10, "fiber_g": 12}
                }
            ]'''
        ))

        # Mock single recipe
        await page.route("**/api/recipe/1", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='''{
                "id": "1",
                "name": "Creamy Avocado Pasta",
                "time_minutes": 15,
                "calories": 450,
                "difficulty": "easy",
                "tags": "quick,healthy,comfort",
                "ingredients_with_quantities": [
                    {"name": "pasta", "quantity": 100, "unit": "g"},
                    {"name": "avocado", "quantity": 1, "unit": ""},
                    {"name": "garlic", "quantity": 2, "unit": "cloves"}
                ],
                "nutrition": {"protein_g": 12, "carbs_g": 55, "fat_g": 22, "fiber_g": 8},
                "steps": [
                    "Boil water in a large pot and cook pasta according to package instructions.",
                    "While pasta is cooking, mash avocado in a bowl with lemon juice and garlic.",
                    "Toss cooked pasta with avocado mixture and serve immediately."
                ],
                "substitutions": {"pasta": ["zucchini noodles", "gluten-free pasta"]}
            }'''
        ))

        # Start server (assuming it's already running or I'm viewing local file)
        # Actually, let's just point to the index.html file directly if possible,
        # or assume server is on 3000.
        # Given the previous trace, it seems I should run a server.

        # For verification, I'll use a simple http server
        import subprocess
        server = subprocess.Popen(["python3", "-m", "http.server", "8080"])
        await asyncio.sleep(2)

        try:
            await page.goto("http://localhost:8080/index.html")

            # 1. Initial State
            await page.screenshot(path="v_initial.png")
            print("Captured v_initial.png")

            # 2. Results State (after clicking suggest)
            await page.click("#suggestBtn")
            await asyncio.sleep(1) # wait for animation
            await page.screenshot(path="v_results.png")
            print("Captured v_results.png")

            # 3. Modal State
            await page.click(".foodCard:first-child")
            await asyncio.sleep(1)
            await page.screenshot(path="v_modal.png")
            print("Captured v_modal.png")

            # 4. Focus Mode
            await page.click("#immersiveToggle")
            await asyncio.sleep(1)
            await page.screenshot(path="v_focus_mode.png")
            print("Captured v_focus_mode.png")

        finally:
            server.terminate()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
