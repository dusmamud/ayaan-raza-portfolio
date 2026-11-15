// Footer redesign visual QA: desktop light, desktop dark (sub-page),
// mobile light. Run against `pnpm run preview` on :4173.
import { createRequire } from 'node:module';

const require2 = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require2('playwright');

const BASE = 'http://localhost:4173';
const browser = await chromium.launch();

async function footerShot({ width, height, dark, url, file }) {
	const ctx = await browser.newContext({
		viewport: { width, height },
		colorScheme: dark ? 'dark' : 'light'
	});
	const page = await ctx.newPage();
	await page.goto(BASE + url, { waitUntil: 'networkidle' });
	await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(600);
	await page.locator('footer').screenshot({ path: 'qa/' + file });
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth > document.documentElement.clientWidth
	);
	console.log(file, '| overflow:', overflow);
	await ctx.close();
}

await footerShot({ width: 1440, height: 900, dark: false, url: '/', file: 'v12-footer-desktop.png' });
await footerShot({
	width: 1440,
	height: 900,
	dark: true,
	url: '/about',
	file: 'v12-footer-dark-subpage.png'
});
await footerShot({ width: 390, height: 844, dark: false, url: '/', file: 'v12-footer-mobile.png' });
await browser.close();
console.log('footer shots done');
