from playwright.sync_api import sync_playwright

def test_landing(page):
    page.goto("http://localhost:3000")
    page.set_viewport_size({"width": 1440, "height": 3000})
    page.wait_for_timeout(2000)
    page.screenshot(path="verification/hero.png")
    
    # Scroll to retail
    page.click("text=Выбрать рыбу")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/retail.png")
    
    # Scroll to b2b
    page.goto("http://localhost:3000")
    page.click("text=Получить прайс")
    page.wait_for_timeout(1000)
    page.screenshot(path="verification/b2b.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_landing(page)
        finally:
            browser.close()
