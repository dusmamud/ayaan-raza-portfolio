import { createRequire } from 'node:module';

const require = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();

// 1. Format waterfall check: Chromium supports AVIF, so every artwork
// request must be .avif — no .webp/.jpg/.png for the same images.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const imgReqs = [];
page.on('request', (r) => {
	const u = r.url();
	if (/\.(avif|webp|jpe?g|png)$/.test(u)) imgReqs.push(u.replace(BASE, ''));
});
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(async () => {
	await new Promise((res) => {
		let y = 0;
		const step = () => {
			y += 700;
			window.scrollTo(0, y);
			if (y < document.body.scrollHeight) setTimeout(step, 120);
			else res();
		};
		step();
	});
});
await page.waitForTimeout(800);
await page.goto(BASE + '/about', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
await page.goto(BASE + '/projects/foodly', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

const byExt = {};
for (const u of imgReqs) byExt[u.split('.').pop()] = (byExt[u.split('.').pop()] ?? 0) + 1;
console.log('image requests by extension:', JSON.stringify(byExt));
const nonAvif = imgReqs.filter((u) => !u.endsWith('.avif') && u.startsWith('/images/'));
console.log('non-AVIF /images/ requests:', nonAvif.length ? nonAvif.join(', ') : '(none)');

// 2. Markup check: source order avif -> webp, img fallback .jpg,
// hero img keeps fetchpriority="high", all imgs keep dimensions.
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const markup = await page.evaluate(() =>
	[...document.querySelectorAll('picture')].map((p) => ({
		sources: [...p.querySelectorAll('source')].map((s) => s.getAttribute('type')),
		imgSrc: p.querySelector('img')?.getAttribute('src'),
		imgAlt: p.querySelector('img')?.getAttribute('alt'),
		w: p.querySelector('img')?.getAttribute('width'),
		h: p.querySelector('img')?.getAttribute('height'),
		fp: p.querySelector('img')?.getAttribute('fetchpriority'),
		loading: p.querySelector('img')?.getAttribute('loading')
	}))
);
console.log('picture elements:', markup.length);
for (const m of markup) console.log(JSON.stringify(m));
const badOrder = markup.filter(
	(m) => m.sources.join(',') !== 'image/avif,image/webp' || !m.imgSrc?.endsWith('.jpg')
);
console.log('bad picture markup:', badOrder.length ? JSON.stringify(badOrder) : '(none)');
await ctx.close();

// 3. Screenshots: hero, work phones, CTA (desktop) + home top (mobile).
const shot = async (width, height, path, clip) => {
	const c = await browser.newContext({
		viewport: { width, height },
		reducedMotion: 'reduce'
	});
	const p = await c.newPage();
	await p.goto(BASE + path, { waitUntil: 'networkidle' });
	await p.waitForTimeout(600);
	await p.screenshot({ path: clip.file, clip: clip.box });
	await c.close();
};
await shot(1440, 900, '/', {
	file: '/home/hatch/workspace/ayaan-raza/qa/v10-home-hero-desktop.png',
	box: { x: 0, y: 0, width: 1440, height: 900 }
});
const workCtx = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	reducedMotion: 'reduce'
});
const workPage = await workCtx.newPage();
await workPage.goto(BASE + '/', { waitUntil: 'networkidle' });
await workPage.locator('#projects').scrollIntoViewIfNeeded();
await workPage.waitForTimeout(700);
await workPage.locator('#projects').screenshot({
	path: '/home/hatch/workspace/ayaan-raza/qa/v10-work-desktop.png'
});
await workPage.locator('#cta').scrollIntoViewIfNeeded();
await workPage.waitForTimeout(700);
await workPage.locator('#cta').screenshot({
	path: '/home/hatch/workspace/ayaan-raza/qa/v10-cta-desktop.png'
});
await workCtx.close();
await shot(390, 844, '/', {
	file: '/home/hatch/workspace/ayaan-raza/qa/v10-home-hero-mobile.png',
	box: { x: 0, y: 0, width: 390, height: 844 }
});
console.log('screenshots done');
await browser.close();
