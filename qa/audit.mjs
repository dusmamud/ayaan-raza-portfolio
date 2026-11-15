import { createRequire } from 'node:module';

const require = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require('playwright');

const BASE = 'http://localhost:4173';
const PAGES = [
	'/',
	'/about',
	'/services',
	'/services/mobile',
	'/services/design',
	'/services/backend',
	'/services/testing',
	'/projects',
	'/projects/foodly',
	'/projects/shopio',
	'/projects/walletwise',
	'/projects/fittrack',
	'/blog',
	'/blog/mobile-first-portfolios',
	'/blog/flutter-vs-native-demo',
	'/blog/small-details-big-ux',
	'/contact',
	'/privacy',
	'/resume'
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

// Fetch raw HTML per path once, for id extraction + status checks.
const htmlByPath = new Map();
for (const p of PAGES) {
	const res = await page.request.get(BASE + p);
	htmlByPath.set(p, { status: res.status(), html: await res.text() });
}
const idsOf = (html) => new Set([...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]));
const idsByPath = new Map([...htmlByPath].map(([p, v]) => [p, idsOf(v.html)]));

const problems = [];
const notes = [];

for (const path of PAGES) {
	const errors = [];
	const failed = [];
	page.removeAllListeners('console');
	page.removeAllListeners('pageerror');
	page.removeAllListeners('response');
	page.on('console', (m) => {
		if (m.type() === 'error') errors.push(m.text().slice(0, 200));
	});
	page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));
	page.on('response', (r) => {
		if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
	});
	const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
	await page.waitForTimeout(300);
	const status = resp?.status();
	if (status !== 200) problems.push(`${path}: HTTP ${status}`);

	const data = await page.evaluate(() => {
		const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href'));
		const imgs = [...document.querySelectorAll('img')].map((img) => ({
			src: img.getAttribute('src'),
			alt: img.getAttribute('alt'),
			w: img.getAttribute('width'),
			h: img.getAttribute('height')
		}));
		const inputs = [...document.querySelectorAll('input, textarea, select')].map((el) => ({
			id: el.id,
			name: el.getAttribute('name'),
			labelled:
				!!el.getAttribute('aria-label') ||
				!!el.getAttribute('aria-labelledby') ||
				!!(el.id && document.querySelector(`label[for="${el.id}"]`)) ||
				!!el.closest('label')
		}));
		const idList = [...document.querySelectorAll('[id]')].map((el) => el.id);
		const dupes = [...new Set(idList.filter((id, i) => idList.indexOf(id) !== i))];
		const h1s = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim());
		const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
			s.textContent.trim()
		);
		const smallTargets = [...document.querySelectorAll('a, button, summary, [role="button"]')]
			.filter((el) => {
				const r = el.getBoundingClientRect();
				const cs = getComputedStyle(el);
				return (
					r.width > 0 &&
					r.height > 0 &&
					cs.visibility !== 'hidden' &&
					(r.width < 24 || r.height < 24)
				);
			})
			.map((el) => `${el.tagName.toLowerCase()}.${(el.className.baseVal ?? el.className ?? '').toString().slice(0, 40)} "${(el.textContent || '').trim().slice(0, 30)}"`);
		return {
			lang: document.documentElement.lang,
			title: document.title,
			desc: document.querySelector('meta[name="description"]')?.content ?? null,
			canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
			mains: document.querySelectorAll('main').length,
			h1s,
			links,
			imgs,
			inputs,
			dupes,
			ld,
			smallTargets: [...new Set(smallTargets)],
			overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
		};
	});

	if (data.lang !== 'en') problems.push(`${path}: lang="${data.lang}"`);
	if (data.mains !== 1) problems.push(`${path}: ${data.mains} <main> elements`);
	if (data.h1s.length !== 1) problems.push(`${path}: ${data.h1s.length} h1s: ${JSON.stringify(data.h1s)}`);
	if (!data.title) problems.push(`${path}: missing <title>`);
	if (data.title.length > 70) notes.push(`${path}: title ${data.title.length} chars`);
	if (!data.desc) problems.push(`${path}: missing meta description`);
	else if (data.desc.length < 50 || data.desc.length > 200)
		notes.push(`${path}: description ${data.desc.length} chars`);
	if (!data.canonical) problems.push(`${path}: missing canonical`);
	if (data.overflow > 0) problems.push(`${path}: horizontal overflow ${data.overflow}px at 1440`);
	for (const d of data.dupes) problems.push(`${path}: duplicate id "${d}"`);
	for (const img of data.imgs) {
		if (img.alt === null) problems.push(`${path}: img missing alt: ${img.src}`);
		if (!img.w || !img.h) problems.push(`${path}: img missing dimensions: ${img.src}`);
	}
	for (const inp of data.inputs) {
		if (!inp.labelled) problems.push(`${path}: unlabelled field name="${inp.name}"`);
	}
	for (const ld of data.ld) {
		try {
			JSON.parse(ld);
		} catch {
			problems.push(`${path}: invalid JSON-LD`);
		}
	}
	for (const t of data.smallTargets) notes.push(`${path}: small target ${t}`);
	for (const e of errors) problems.push(`${path}: console/page error: ${e}`);
	for (const f of failed) problems.push(`${path}: failed request: ${f}`);

	// Link validation.
	const seen = new Set();
	for (const href of data.links) {
		if (!href || seen.has(href)) continue;
		seen.add(href);
		if (href === '#') {
			notes.push(`${path}: dead "#" link`);
			continue;
		}
		if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
		if (/^https?:\/\//.test(href)) continue; // external — none expected
		if (href.startsWith('#')) {
			if (!idsByPath.get(path)?.has(href.slice(1)))
				problems.push(`${path}: anchor ${href} has no target on this page`);
			continue;
		}
		const [linkPath, frag] = href.split('#');
		const target = linkPath === '' ? path : linkPath;
		if (!htmlByPath.has(target)) {
			const res = await page.request.get(BASE + target);
			if (res.status() >= 400) problems.push(`${path}: link ${href} -> HTTP ${res.status()}`);
			continue;
		}
		if (frag && !idsByPath.get(target)?.has(frag))
			problems.push(`${path}: link ${href} — no #${frag} on ${target}`);
	}
	console.log(`checked ${path}`);
}

// Mobile overflow pass.
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mctx.newPage();
for (const path of PAGES) {
	await mpage.goto(BASE + path, { waitUntil: 'networkidle' });
	await mpage.waitForTimeout(200);
	const ov = await mpage.evaluate(
		() => document.documentElement.scrollWidth - document.documentElement.clientWidth
	);
	if (ov > 0) problems.push(`${path}: horizontal overflow ${ov}px at 390`);
}
console.log('mobile pass done');

await browser.close();
console.log('\n===== PROBLEMS =====');
console.log(problems.length ? problems.join('\n') : '(none)');
console.log('\n===== NOTES =====');
console.log(notes.length ? notes.join('\n') : '(none)');
console.log(`\nTOTAL: ${problems.length} problems, ${notes.length} notes`);
