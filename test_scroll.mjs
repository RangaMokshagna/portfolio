import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Collect all console logs
  page.on('console', msg => {
    if (msg.text().includes('Gap:')) {
      console.log(msg.text());
    }
  });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2500); // animations

  const tabs = ['about', 'projects', 'skills', 'contact'];

  for (const tab of tabs) {
    console.log(`\n--- Clicking ${tab} ---`);
    await page.click(`button[aria-current="page"] ~ button, button:has-text("${tab.charAt(0).toUpperCase() + tab.slice(1)}")`);
    await page.waitForTimeout(1500); // Wait for scroll and fallback timeout
  }
  
  await browser.close();
})();
