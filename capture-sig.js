const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 620, height: 400 });
  await page.goto(`file:///Volumes/Samsung_T5/webdev/matthewheadley-com/public/email-signature.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Screenshot just the SL signature table
  const el = page.locator('#sl-sig-wrapper');
  await el.screenshot({
    path: '/Volumes/Samsung_T5/webdev/matthewheadley-com/public/images/email/sl-sig-flat.png',
    omitBackground: false,
  });

  console.log('Done');
  await browser.close();
})();
