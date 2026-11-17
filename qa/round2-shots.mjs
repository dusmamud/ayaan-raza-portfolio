// Round-2 fidelity QA: full-page + section screenshots of the current
// build for comparison against the reference design. Run against
// `pnpm run preview` on :4173.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();

async function revealAll(page) {
	await page.evaluate(async () => {
		const step = Math.round(window.innerHeight * 0.7);
		for (let y = 0; y < document.body.scrollHeight; y += step) {
			window.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 120));
		}
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(500);
}

for (const width of [1440, 390]) {
	const ctx = await browser.newContext({ viewport: { width, height: 900 } });
	const page = await ctx.newPage();
	await page.goto(BASE + '/', { waitUntil: 'networkidle' });
	await revealAll(page);
	await page.screenshot({ path: `qa/r2-home-${width}.png`, fullPage: true });
	for (const id of ['home', 'about', 'services', 'projects', 'stack']) {
		const el = page.locator(`#${id}`);
		if (await el.count()) {
			await el.screenshot({ path: `qa/r2-${id}-${width}.png` });
		}
	}
	await page.locator('footer').screenshot({ path: `qa/r2-footer-${width}.png` });
	await ctx.close();
}

// Sub-pages at desktop width.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
for (const [slug, name] of [
	['about', 'about'],
	['services', 'services'],
	['projects/foodly', 'case-foodly'],
	['blog', 'blog'],
	['contact', 'contact']
]) {
	await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle' });
	await revealAll(page);
	await page.screenshot({ path: `qa/r2-${name}-1440.png`, fullPage: true });
}
await ctx.close();
await browser.close();
console.log('round-2 screenshots done');
