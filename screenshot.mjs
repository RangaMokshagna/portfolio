import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // ─── Dark mode screenshots ───────────────────────────────────────────────
  const darkPage = await browser.newPage();
  await darkPage.goto('http://localhost:3000');
  await darkPage.waitForTimeout(2500); // wait for animations to settle
  // Scroll to bottom (contact section)
  await darkPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await darkPage.waitForTimeout(1500); // Wait for scroll and animations

  await darkPage.setViewportSize({ width: 1440, height: 900 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/contact-dark-1440.png' });

  await darkPage.setViewportSize({ width: 1366, height: 768 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/contact-dark-1366.png' });

  await darkPage.setViewportSize({ width: 768, height: 1024 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/contact-dark-768.png' });

  await darkPage.setViewportSize({ width: 390, height: 844 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/contact-dark-390.png' });

  // ─── Light mode screenshots ──────────────────────────────────────────────
  const lightPage = await browser.newPage();
  await lightPage.goto('http://localhost:3000');
  await lightPage.waitForTimeout(1000);
  await lightPage.click('button[aria-label*="theme"], button[aria-label*="mode"], button[aria-label*="Toggle"]');
  await lightPage.waitForTimeout(1500);
  
  await lightPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await lightPage.waitForTimeout(1500);

  await lightPage.setViewportSize({ width: 1440, height: 900 });
  await lightPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/contact-light-1440.png' });

  await browser.close();
})();
