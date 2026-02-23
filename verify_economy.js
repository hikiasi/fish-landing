const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForSelector('#economy-section');
  await page.screenshot({ path: 'economy_section.png', fullPage: false });
  const tableData = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#economy-section table tbody tr'));
    return rows.map(row => {
      const cells = Array.from(row.querySelectorAll('td'));
      return cells.map(cell => cell.innerText.trim());
    });
  });
  console.log(JSON.stringify(tableData, null, 2));
  await browser.close();
})();
