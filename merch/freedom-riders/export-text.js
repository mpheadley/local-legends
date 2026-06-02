const { chromium } = require('@playwright/test');
const path = require('path');

const OUT = path.join(__dirname);
const HTML = `file://${path.join(__dirname, 'text-export.html')}`;

const elements = [
  'quote',
  'name',
  'name-small',
  'role',
  'location',
  'booking',
  'sl-credit',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(HTML, { waitUntil: 'networkidle' });
  // Wait for Google Font to load
  await page.waitForTimeout(1500);

  for (const id of elements) {
    const el = page.locator(`#${id}`);
    await el.screenshot({
      path: path.join(OUT, `text-${id}.png`),
      omitBackground: true,
    });
    console.log(`Exported: text-${id}.png`);
  }

  await browser.close();
})();
