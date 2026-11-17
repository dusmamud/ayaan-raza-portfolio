// Mobile book-form check: scroll-triggered reveal + overflow at 390px.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4173/book', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
	for (let y = 0; y < document.body.scrollHeight; y += 400) {
		window.scrollTo(0, y);
		await new Promise((r) => setTimeout(r, 120));
	}
});
await page.waitForTimeout(600);
const vis = await page.locator('form').evaluate((el) => getComputedStyle(el).opacity);
const overflow = await page.evaluate(
	() => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
console.log('form opacity after scroll:', vis, '| horizontal overflow px:', overflow);
await page.locator('form').screenshot({ path: 'qa/v15-book-form-390.png' });
await browser.close();
console.log('done');
