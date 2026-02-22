const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to homepage
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'verification/hero.png' });

  // Scroll to retail catalog
  await page.evaluate(() => document.getElementById('retail-section').scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/retail_catalog.png' });

  // Check empty state (click a category that might be empty)
  // We seeded with many categories, but maybe 'Готовые наборы' has few?
  // Let's just scroll to B2B
  await page.evaluate(() => document.getElementById('b2b-section').scrollIntoView());
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/b2b_section.png' });

  // Admin login
  await page.goto('http://localhost:3000/admin/login');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForURL('http://localhost:3000/admin');
  await page.screenshot({ path: 'verification/admin_dashboard.png' });

  await browser.close();
})();
