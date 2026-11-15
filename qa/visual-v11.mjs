import { createRequire } from 'node:module';

const require = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require('playwright');

const BASE = 'http://localhost:4173';
const PAGES = [
	'/',
	'/about',
	'/services',
	'/services/mobile',
	'/projects',
	'/projects/wanderly',
	'/projects/taskflow',
	'/blog',
	'/blog/design-systems-that-scale',
	'/contact',
	'/privacy',
	'/resume',
	'/testimonials',
	'/terms',
	'/uses',
	'/sitemap',
	'/accessibility',
	'/search'
];

const browser = await chromium.launch();

// --- 1. Overflow checks, light mode, two widths ---
for (const width of [1440, 390]) {
	const ctx = await browser.newContext({ viewport: { width, height: 900 } });
	const page = await ctx.newPage();
	for (const p of PAGES) {
		await page.goto(BASE + p, { waitUntil: 'networkidle' });
		const overflow = await page.evaluate(
			() => document.documentElement.scrollWidth - document.documentElement.clientWidth
		);
		if (overflow > 0) console.log(`OVERFLOW ${width}px ${p}: ${overflow}px`);
	}
	await ctx.close();
}
console.log('overflow sweep done');

// --- 2. Screenshots: light + dark ---
const shots = [
	{ path: '/', name: 'v11-home-light', dark: false, width: 1440, full: true },
	{ path: '/', name: 'v11-home-dark', dark: true, width: 1440, full: true },
	{ path: '/', name: 'v11-home-mobile-dark', dark: true, width: 390, full: false },
	{ path: '/projects', name: 'v11-projects-dark', dark: true, width: 1440, full: false },
	{ path: '/projects/wanderly', name: 'v11-case-wanderly', dark: false, width: 1440, full: true },
	{ path: '/blog', name: 'v11-blog', dark: false, width: 1440, full: false },
	{ path: '/testimonials', name: 'v11-testimonials', dark: false, width: 1440, full: false },
	{ path: '/uses', name: 'v11-uses', dark: false, width: 1440, full: false },
	{ path: '/search', name: 'v11-search', dark: false, width: 1440, full: false },
	{ path: '/contact', name: 'v11-contact-dark', dark: true, width: 1440, full: false }
];
for (const shot of shots) {
	const ctx = await browser.newContext({
		viewport: { width: shot.width, height: 900 },
		colorScheme: shot.dark ? 'dark' : 'light'
	});
	const page = await ctx.newPage();
	await page.goto(BASE + shot.path, { waitUntil: 'networkidle' });
	await page.waitForTimeout(400);
	await page.screenshot({
		path: `qa/${shot.name}.png`,
		fullPage: shot.full
	});
	const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
	console.log(shot.name, 'dark class:', isDark, '(expected', shot.dark + ')');
	await ctx.close();
}

// --- 3. Interactions ---
const ctx = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	permissions: ['clipboard-read', 'clipboard-write']
});
const page = await ctx.newPage();

// Theme toggle flips class + persists
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Switch to dark mode' }).click();
console.log(
	'toggle -> dark:',
	await page.evaluate(
		() => document.documentElement.classList.contains('dark') && localStorage.getItem('theme')
	)
);
await page.reload({ waitUntil: 'networkidle' });
console.log(
	'reload keeps dark:',
	await page.evaluate(() => document.documentElement.classList.contains('dark'))
);
await page.getByRole('button', { name: 'Switch to light mode' }).click();
console.log(
	'toggle back -> light:',
	await page.evaluate(
		() => !document.documentElement.classList.contains('dark') && localStorage.getItem('theme')
	)
);

// Project filter
await page.goto(BASE + '/projects', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Travel' }).click();
console.log('filter Travel:', await page.locator('article').count(), 'cards (expect 1)');
await page.getByRole('button', { name: 'All' }).click();
console.log('filter All:', await page.locator('article').count(), 'cards (expect 6)');

// Blog tag filter + search
await page.goto(BASE + '/blog', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Forms', exact: true }).click();
console.log('blog tag Forms:', await page.locator('article').count(), 'cards (expect 1)');
await page.getByRole('button', { name: 'All' }).click();
await page.getByLabel('Search posts').fill('performance');
console.log('blog search performance:', await page.locator('article').count(), 'cards (expect 1)');

// Newsletter demo submit
await page.getByLabel('Email address').fill('reader@example.com');
await page.getByRole('button', { name: 'Subscribe' }).click();
console.log(
	'newsletter success:',
	await page.getByText('passed validation').isVisible()
);

// Global search
await page.goto(BASE + '/search', { waitUntil: 'networkidle' });
await page.getByRole('searchbox', { name: 'Search the site' }).fill('checkout');
console.log('global search checkout:', await page.locator('ul li a').count(), 'results (expect >= 1)');
await page.goto(BASE + '/search?q=flutter', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
console.log('search ?q=flutter input:', await page.getByRole('searchbox', { name: 'Search the site' }).inputValue());

// Share copy button
await page.goto(BASE + '/blog/forms-that-forgive', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Copy link' }).click();
console.log('copy feedback:', await page.getByRole('button', { name: 'Copied!' }).isVisible());
console.log('prev link:', await page.getByRole('link', { name: /Design systems/ }).count());
console.log('next link:', await page.getByRole('link', { name: /Designing mobile-first/ }).count());

// Dark-mode contrast spot checks (computed colors)
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => {
	localStorage.setItem('theme', 'dark');
	document.documentElement.classList.add('dark');
});
await page.waitForTimeout(200);
const colors = await page.evaluate(() => {
	const cs = (sel, prop) => getComputedStyle(document.querySelector(sel))[prop];
	return {
		bodyBg: cs('body', 'backgroundColor'),
		bodyText: cs('body', 'color'),
		h1: cs('h1', 'color'),
		accentLink: cs('a[href="/testimonials"]', 'color')
	};
});
console.log('dark computed:', JSON.stringify(colors));
await ctx.close();
await browser.close();
console.log('visual QA done');
