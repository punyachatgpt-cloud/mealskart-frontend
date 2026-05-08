from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://mealskart-frontend.vercel.app/")
        page.wait_for_timeout(2000)
        page.screenshot(path="live_view.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
