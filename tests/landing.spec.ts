import { test, expect } from '@playwright/test';

test('capture landing sections', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000); // Wait for animations
  
  // Hero
  await page.screenshot({ path: 'verification/hero_new.png' });
  
  // Retail
  await page.locator('#retail-catalog').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/retail_new.png' });
  
  // B2B
  await page.locator('#b2b-hero').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'verification/b2b_new.png' });
});
