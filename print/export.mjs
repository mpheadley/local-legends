import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

// 5.5in × 96px/in = 528px; 8.5in × 96px/in = 816px
await page.setViewport({ width: 528, height: 816, deviceScaleFactor: 4 });
await page.goto(`file://${DIR}/sl-print-vol1.html`, { waitUntil: 'networkidle0' });
await page.evaluate(() => { document.body.style.background = 'white'; });

// Wait for Google Fonts + QR code images to load
await new Promise(r => setTimeout(r, 3000));

const outPath = path.join(DIR, 'sl-print-vol1.pdf');
await page.pdf({
  path: outPath,
  width:  '5.5in',
  height: '8.5in',
  printBackground: true,
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
});

await browser.close();
console.log(`✓ sl-print-vol1.pdf (${DIR})`);
