// v15 QA: motion behaviors + new pages + fidelity fixes. Run against
// `pnpm run preview` on :4173.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Hero entrance: elements carry the entrance animation.
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const heroAnim = await page.locator('#hero-heading').evaluate((el) => getComputedStyle(el).animationName);
console.log('hero heading animation:', heroAnim, '(expect hero-in)');
const imgAnim = await page.locator('#home img').first().evaluate((el) => getComputedStyle(el).animationName);
console.log('hero image float animation:', imgAnim, '(expect float)');

// Marquee: track transform moves over time.
const t1 = await page.locator('.marquee-track').evaluate((el) => getComputedStyle(el).transform);
await page.waitForTimeout(600);
const t2 = await page.locator('.marquee-track').evaluate((el) => getComputedStyle(el).transform);
console.log('marquee moves:', t1 !== t2, `(${t1} -> ${t2})`);

// Scroll progress + header shadow after scrolling.
await page.evaluate(() => window.scrollTo(0, 1200));
await page.waitForTimeout(300);
const progress = await page.locator('.fixed.top-0.z-\\[60\\]').evaluate((el) => el.style.transform);
const headerShadow = await page.locator('header').evaluate((el) => getComputedStyle(el).boxShadow);
console.log('scroll progress transform:', progress, '(expect scaleX > 0)');
console.log('header shadow after scroll:', headerShadow !== 'none' ? 'present' : 'NONE');

// Parallax: hero illustration wrapper shifts with scroll.
const par = await page.locator('#home [class*="animate-hero-img"] > div').evaluate((el) => el.style.transform);
console.log('parallax transform at scroll 1200:', par || '(none)');

// Fidelity: no prices on service cards, no footer wordmark.
const priceCount = await page.locator('#services', { hasText: 'From $' }).count();
console.log('price lines in home services section:', priceCount, '(expect 0)');
const wordmark = await page.locator('footer p[aria-hidden="true"]').count();
console.log('footer wordmark elements:', wordmark, '(expect 0)');
const tagCount = await page.locator('#projects article ul[aria-label="Technologies used"] li').count();
console.log('stack tags on home project cards:', tagCount, '(expect 12 = 4 cards x 3)');

// Screenshots.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.locator('#home').screenshot({ path: 'qa/v15-hero-1440.png' });
await page.locator('footer').screenshot({ path: 'qa/v15-footer-1440.png' });
await page.locator('#services').screenshot({ path: 'qa/v15-services-1440.png' });

// New pages.
for (const slug of ['now', 'pricing', 'book']) {
	await page.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle' });
	await page.evaluate(async () => {
		const step = Math.round(window.innerHeight * 0.6);
		for (let y = 0; y < document.body.scrollHeight; y += step) {
			window.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 120));
		}
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(500);
	await page.screenshot({ path: `qa/v15-${slug}-1440.png`, fullPage: true });
	console.log(`/${slug}:`, await page.title());
}

// Book flow: pick first available day + slot, fill, submit, confirm.
await page.goto(BASE + '/book', { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.querySelectorAll('input[name="day"]').length === 7);
await page.locator('label:has(input[name="day"])').first().click();
await page.locator('label:has(input[name="slot"]:not([disabled]))').first().click();
await page.fill('#book-name', 'Demo User');
await page.fill('#book-email', 'demo@example.com');
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(300);
const confirmText = await page.locator('h2', { hasText: "You're booked" }).count();
console.log('book confirm state:', confirmText === 1 ? 'shown' : 'MISSING');
await page.screenshot({ path: 'qa/v15-book-confirmed-1440.png' });

// Case study prev/next.
await page.goto(BASE + '/projects/shopio', { waitUntil: 'networkidle' });
const prevNext = await page.locator('nav[aria-label="More case studies"] a').count();
console.log('case study prev/next links:', prevNext, '(expect 2)');
await page.locator('nav[aria-label="More case studies"]').screenshot({ path: 'qa/v15-prevnext.png' });

// Contact sending state.
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
await page.fill('#contact-name', 'Demo User');
await page.fill('#contact-email', 'demo@example.com');
await page.fill('#contact-message', 'Hello, demo message here.');
await page.locator('button[type="submit"]').click();
await page.waitForTimeout(150);
const sendingLabel = await page.locator('button[type="submit"]').innerText();
console.log('submit button while sending:', JSON.stringify(sendingLabel), '(expect Sending…)');
await page.waitForTimeout(800);
console.log('contact success:', (await page.locator('text=Thanks, Demo User!').count()) === 1 ? 'shown' : 'MISSING');
await ctx.close();

// Mobile screenshots of new pages.
const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pageM = await ctxM.newPage();
for (const slug of ['pricing', 'book']) {
	await pageM.goto(`${BASE}/${slug}`, { waitUntil: 'networkidle' });
	await pageM.waitForTimeout(400);
	await pageM.screenshot({ path: `qa/v15-${slug}-390.png`, fullPage: true });
}
await pageM.goto(BASE + '/', { waitUntil: 'networkidle' });
await pageM.waitForTimeout(400);
await pageM.locator('footer').screenshot({ path: 'qa/v15-footer-390.png' });
await ctxM.close();
await browser.close();
console.log('v15 QA done');
