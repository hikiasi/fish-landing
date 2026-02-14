from playwright.sync_api import sync_playwright

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Main Page
        page.goto("http://localhost:3000")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/home.png", full_page=True)

        # 2. Admin Login
        page.goto("http://localhost:3000/admin/login")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="verification/admin_login.png")

        # 3. Try to access admin without login (should redirect)
        page.goto("http://localhost:3000/admin")
        page.wait_for_timeout(1000)
        print(f"Admin redirect URL: {page.url}")

        browser.close()

if __name__ == "__main__":
    verify_site()
