import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  await page.waitForTimeout(2000);

  const contactTab = page.locator('button:has-text("Contact")');
  await contactTab.hover();
  await page.waitForTimeout(800);
  
  const nav = page.locator('nav');
  await nav.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/navbar-contact-hover.png' });
  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-1440-new.png' });

  await page.setViewportSize({ width: 1024, height: 768 });
  await page.reload();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-1024-new.png' });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-390-new.png' });

  await browser.close();
})();
