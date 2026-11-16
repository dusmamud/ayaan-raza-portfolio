// Mouse behavior QA: custom cursor states, magnetic buttons, spotlight
// cards — plus the touch and reduced-motion gates. Run against
// `pnpm run preview` on :4173.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();

// ---------- Desktop: fine pointer ----------
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
console.log('has-custom-cursor class:', await page.evaluate(() => document.documentElement.classList.contains('has-custom-cursor')));
console.log('cursor elements:', await page.locator('.custom-cursor').count(), '(expect 2)');

await page.mouse.move(300, 300);
await page.waitForTimeout(400);
const dotT = await page.locator('.custom-cursor').first().evaluate((el) => el.style.transform);
const ringT = await page.locator('.custom-cursor').nth(1).evaluate((el) => el.style.transform);
console.log('dot transform:', dotT, '| ring transform:', ringT);

// Ring lag: jump the mouse, sample immediately — the ring trails behind.
await page.mouse.move(900, 500);
await page.waitForTimeout(40);
const dotT2 = await page.locator('.custom-cursor').first().evaluate((el) => el.style.transform);
const ringT2 = await page.locator('.custom-cursor').nth(1).evaluate((el) => el.style.transform);
console.log('after jump — dot:', dotT2, '| ring:', ringT2, '| ring trails:', dotT2 !== ringT2);

// Hover a link: the ring grows 36 -> 48px.
const navAbout = page.locator('header nav a[href="/#about"]');
await navAbout.hover();
await page.waitForTimeout(350);
const ringBox = await page.locator('.custom-cursor').nth(1).locator('div').first().boundingBox();
console.log('ring size over link:', ringBox?.width, 'x', ringBox?.height, '(expect 48)');

// Hover a project card: label badge "View" at 76px.
await page.locator('#projects').scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const card = page.locator('#projects article').first();
await card.hover({ position: { x: 150, y: 120 } });
await page.waitForTimeout(400);
const labelText = await page.locator('.custom-cursor span').first().innerText().catch(() => '(none)');
const badgeBox = await page.locator('.custom-cursor').nth(1).locator('div').first().boundingBox();
console.log('cursor label over project card:', labelText, '| badge size:', badgeBox?.width, '(expect 76)');
await page.locator('#projects').screenshot({ path: 'qa/v14-cursor-label.png' });

// Magnetic: hero button drifts toward an off-center cursor, springs back.
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
const cta = page.getByRole('link', { name: /View My Work/ });
const ctaBox = await cta.boundingBox();
await page.mouse.move(ctaBox.x + ctaBox.width - 8, ctaBox.y + ctaBox.height / 2);
await page.waitForTimeout(120);
const pulled = await cta.evaluate((el) => el.style.transform);
console.log('magnetic transform while hovering edge:', pulled || '(none)');
await page.mouse.move(ctaBox.x + ctaBox.width + 120, ctaBox.y);
await page.waitForTimeout(700);
console.log('magnetic transform after leave:', (await cta.evaluate((el) => el.style.transform)) || '(cleared)');
console.log('magnetic inline transition after leave:', (await cta.evaluate((el) => el.style.transition)) || '(cleared)');

// Cursor ring over the CTA, for the screenshot.
await cta.hover();
await page.waitForTimeout(400);
await page.locator('#home').screenshot({ path: 'qa/v14-cursor-link.png' });

// Spotlight: CSS vars track the mouse inside a service card.
await page.locator('#services').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const serviceCard = page.locator('#services article').first();
await serviceCard.hover({ position: { x: 60, y: 40 } });
await page.waitForTimeout(100);
console.log(
	'spotlight vars:',
	await serviceCard.evaluate((el) => `${el.style.getPropertyValue('--mx')}, ${el.style.getPropertyValue('--my')}`)
);

// Text field: custom cursor hides, native cursor returns.
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
await page.locator('#contact-name').hover();
await page.waitForTimeout(300);
const dotOpacity = await page.locator('.custom-cursor').first().locator('div').evaluate((el) => getComputedStyle(el).opacity);
const inputCursor = await page.locator('#contact-name').evaluate((el) => getComputedStyle(el).cursor);
console.log('over text field — dot opacity:', dotOpacity, '(expect 0) | input cursor:', inputCursor, '(expect not none)');
await ctx.close();

// ---------- Touch: coarse pointer ----------
const ctxTouch = await browser.newContext({
	viewport: { width: 390, height: 844 },
	hasTouch: true,
	isMobile: true
});
const pageTouch = await ctxTouch.newPage();
await pageTouch.goto(BASE + '/', { waitUntil: 'networkidle' });
console.log(
	'touch — has-custom-cursor:',
	await pageTouch.evaluate(() => document.documentElement.classList.contains('has-custom-cursor')),
	'| cursor elements:',
	await pageTouch.locator('.custom-cursor').count(),
	'(expect false / 0)'
);
await ctxTouch.close();

// ---------- Reduced motion ----------
const ctxRm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const pageRm = await ctxRm.newPage();
await pageRm.goto(BASE + '/', { waitUntil: 'networkidle' });
console.log(
	'reduced-motion — has-custom-cursor:',
	await pageRm.evaluate(() => document.documentElement.classList.contains('has-custom-cursor')),
	'| cursor elements:',
	await pageRm.locator('.custom-cursor').count(),
	'(expect false / 0)'
);
await ctxRm.close();
await browser.close();
console.log('mouse QA done');
