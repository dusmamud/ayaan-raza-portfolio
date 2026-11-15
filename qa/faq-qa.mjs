// FAQ animation QA: samples the panel height during expand/collapse to
// prove the transition actually animates (not an instant jump), checks
// aria-expanded/inert, and verifies reduced-motion disables the motion.
// Run against `pnpm run preview` on :4173.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();

async function sampleHeights(page, panel, action, samples = 12) {
	const heights = [];
	await action();
	for (let i = 0; i < samples; i++) {
		heights.push(await panel.evaluate((el) => Math.round(el.getBoundingClientRect().height)));
		await page.waitForTimeout(30);
	}
	return heights;
}

function monotonic(values, direction) {
	const steps = values.slice(1).map((v, i) => v - values[i]);
	const good = direction === 'up' ? steps.filter((s) => s >= 0) : steps.filter((s) => s <= 0);
	return { steps: values, increasing: good.length === steps.length, moved: values.at(-1) - values[0] };
}

// Normal motion
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/#faq', { waitUntil: 'networkidle' });
const button = page.locator('#faq-button-timeline');
const panel = page.locator('#faq-panel-timeline');
await button.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
console.log('initial: expanded =', await button.getAttribute('aria-expanded'), '| inert =', await panel.evaluate((el) => el.hasAttribute('inert')));

const expanding = await sampleHeights(page, panel, () => button.click());
console.log('expand heights:', expanding.join(' '));
const expandCheck = monotonic(expanding, 'up');
console.log('expand animates smoothly:', expandCheck.increasing && expandCheck.moved > 0);
console.log('open: expanded =', await button.getAttribute('aria-expanded'), '| inert =', await panel.evaluate((el) => el.hasAttribute('inert')));

const collapsing = await sampleHeights(page, panel, () => button.click());
console.log('collapse heights:', collapsing.join(' '));
const collapseCheck = monotonic(collapsing, 'down');
console.log('collapse animates smoothly:', collapseCheck.increasing && collapseCheck.moved < 0);

// Multi-open: two answers can stay open at once
await page.locator('#faq-button-timeline').click();
await page.locator('#faq-button-clients').click();
await page.waitForTimeout(500);
console.log(
	'multi-open: timeline =',
	await page.locator('#faq-button-timeline').getAttribute('aria-expanded'),
	'| clients =',
	await page.locator('#faq-button-clients').getAttribute('aria-expanded')
);
await page.locator('#faq').screenshot({ path: 'qa/v13-faq-open.png' });
await ctx.close();

// Reduced motion: transition must be off (instant, duration 0s)
const ctxRm = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	reducedMotion: 'reduce'
});
const pageRm = await ctxRm.newPage();
await pageRm.goto(BASE + '/#faq', { waitUntil: 'networkidle' });
const panelRm = pageRm.locator('#faq-panel-timeline');
const duration = await panelRm.evaluate((el) => getComputedStyle(el).transitionDuration);
console.log('reduced-motion transition-duration:', duration, '(expect 0s)');
await pageRm.locator('#faq-button-timeline').click();
await pageRm.waitForTimeout(60);
console.log('reduced-motion height after 60ms:', await panelRm.evaluate((el) => Math.round(el.getBoundingClientRect().height)), '(expect full height, no animation)');
await ctxRm.close();
await browser.close();
console.log('faq animation QA done');
