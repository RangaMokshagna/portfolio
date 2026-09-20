import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // ─── Dark mode screenshots ───────────────────────────────────────────────
  const darkPage = await browser.newPage();
  await darkPage.goto('http://localhost:3000');
  // Force dark mode via class (the app starts in dark by default)
  await darkPage.waitForTimeout(2500); // wait for animations to settle

  await darkPage.setViewportSize({ width: 1440, height: 900 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-dark-1440.png' });

  await darkPage.setViewportSize({ width: 768, height: 1024 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-dark-768.png' });

  await darkPage.setViewportSize({ width: 390, height: 844 });
  await darkPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-dark-390.png' });

  // ─── Light mode screenshots ──────────────────────────────────────────────
  const lightPage = await browser.newPage();
  await lightPage.goto('http://localhost:3000');
  // Toggle light mode by clicking theme button
  await lightPage.waitForTimeout(1000);
  await lightPage.click('button[aria-label*="theme"], button[aria-label*="mode"], button[aria-label*="Toggle"]');
  await lightPage.waitForTimeout(1500);

  await lightPage.setViewportSize({ width: 1440, height: 900 });
  await lightPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-light-1440.png' });

  await lightPage.setViewportSize({ width: 390, height: 844 });
  await lightPage.screenshot({ path: 'C:/Users/jayav/.gemini/antigravity/brain/be7aeff6-58a4-43ef-9525-7a7123a8b30c/.user_uploaded/hero-light-390.png' });

  await browser.close();
})();
