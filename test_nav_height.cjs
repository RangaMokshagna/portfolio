const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000');
  
  await page.waitForTimeout(2000);
  
  const navH = await page.evaluate(() => {
    return document.documentElement.style.getPropertyValue('--nav-h');
  });
  
  const navWidth = await page.evaluate(() => {
    return document.getElementById('main-nav').getBoundingClientRect().width;
  });
  
  console.log(`Measured --nav-h: ${navH}`);
  console.log(`Measured width: ${navWidth}px`);
  
  await browser.close();
})();
