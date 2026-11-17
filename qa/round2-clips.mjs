// Round-2 clip re-shoot with unique names (the first script collided
// with sub-page filenames). Run against preview on :4173.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
	const step = Math.round(window.innerHeight * 0.6);
	for (let y = 0; y < document.body.scrollHeight; y += step) {
		window.scrollTo(0, y);
		await new Promise((r) => setTimeout(r, 150));
	}
});
await page.waitForTimeout(600);
for (const id of ['about', 'services', 'cta', 'faq', 'testimonials', 'experience', 'process']) {
	const el = page.locator(`#${id}`);
	if (await el.count()) {
		await el.screenshot({ path: `qa/r2-sec-${id}-1440.png` });
	} else {
		console.log('missing section:', id);
	}
}
// Client logos strip: first section after the hero.
await page.locator('#home + *').screenshot({ path: 'qa/r2-sec-afterhero-1440.png' }).catch((e) => console.log('afterhero failed', e.message));
await ctx.close();
await browser.close();
console.log('clips done');
