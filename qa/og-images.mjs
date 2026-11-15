import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '../portfolio/static/og');
mkdirSync(outDir, { recursive: true });

// One title card per page. Copy mirrors the page titles; keep in sync
// when a page title changes. The home page keeps its screenshot-based
// og.png, so it is not generated here.
const CARDS = [
	{ file: 'about.jpg', eyebrow: 'About', title: 'Hi, I’m Ayaan — I build products people love' },
	{ file: 'services.jpg', eyebrow: 'Services', title: 'What I can do for you' },
	{ file: 'service-mobile.jpg', eyebrow: 'Service', title: 'Mobile App Development' },
	{ file: 'service-design.jpg', eyebrow: 'Service', title: 'UI/UX Design' },
	{ file: 'service-backend.jpg', eyebrow: 'Service', title: 'Backend Integration' },
	{ file: 'service-testing.jpg', eyebrow: 'Service', title: 'Testing & Maintenance' },
	{ file: 'projects.jpg', eyebrow: 'My Work', title: 'All Projects' },
	{ file: 'project-foodly.jpg', eyebrow: 'Case Study · Food & Delivery', title: 'Foodly' },
	{ file: 'project-shopio.jpg', eyebrow: 'Case Study · E-Commerce', title: 'Shopio' },
	{ file: 'project-walletwise.jpg', eyebrow: 'Case Study · Finance', title: 'WalletWise' },
	{ file: 'project-fittrack.jpg', eyebrow: 'Case Study · Health & Fitness', title: 'FitTrack' },
	{ file: 'project-wanderly.jpg', eyebrow: 'Case Study · Travel', title: 'Wanderly' },
	{ file: 'project-taskflow.jpg', eyebrow: 'Case Study · Productivity', title: 'TaskFlow' },
	{ file: 'blog.jpg', eyebrow: 'Blog', title: 'Notes & ideas' },
	{ file: 'post-design-systems-that-scale.jpg', eyebrow: 'Blog', title: 'Design systems that scale past one project' },
	{ file: 'post-forms-that-forgive.jpg', eyebrow: 'Blog', title: 'Forms that forgive mistakes' },
	{ file: 'post-mobile-first-portfolios.jpg', eyebrow: 'Blog', title: 'Designing mobile-first portfolios' },
	{ file: 'post-flutter-vs-native-demo.jpg', eyebrow: 'Blog', title: 'Flutter vs native: a demo take' },
	{ file: 'post-small-details-big-ux.jpg', eyebrow: 'Blog', title: 'Small details, big UX wins' },
	{ file: 'post-performance-budgets-demo.jpg', eyebrow: 'Blog', title: 'Performance budgets for demo sites' },
	{ file: 'contact.jpg', eyebrow: 'Contact', title: 'Let’s talk' },
	{ file: 'privacy.jpg', eyebrow: 'Legal', title: 'Privacy Policy' },
	{ file: 'resume.jpg', eyebrow: 'CV / Resume', title: 'Ayaan Raza — Full-Stack Developer' },
	{ file: 'testimonials.jpg', eyebrow: 'Testimonials', title: 'Clients love the work' },
	{ file: 'terms.jpg', eyebrow: 'Legal', title: 'Terms of use' },
	{ file: 'uses.jpg', eyebrow: 'Uses', title: 'Tools I use' },
	{ file: 'sitemap.jpg', eyebrow: 'Sitemap', title: 'Every page, in one place' },
	{ file: 'accessibility.jpg', eyebrow: 'Accessibility', title: 'Accessibility statement' },
	{ file: 'search.jpg', eyebrow: 'Search', title: 'Search the site' }
];

function htmlFor(card) {
	return `<!doctype html><html><head><meta charset="utf-8"><style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { width: 1200px; height: 630px; background: #fff7f1; color: #1b1740;
			font-family: 'Liberation Sans', Arial, sans-serif; display: flex; flex-direction: column;
			justify-content: space-between; padding: 72px 80px; }
		.mark { font-size: 44px; font-weight: 800; letter-spacing: -1px; }
		.mark span { color: #f43f5e; }
		.eyebrow { font-size: 24px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #be123c; }
		h1 { font-size: 76px; line-height: 1.1; letter-spacing: -2px; margin-top: 20px; max-width: 1000px; }
		.bar { width: 120px; height: 8px; background: #f43f5e; border-radius: 4px; margin-top: 36px; }
		.foot { font-size: 24px; color: #4a4763; }
	</style></head><body>
		<div class="mark">AR<span>.</span></div>
		<div><div class="eyebrow">${card.eyebrow}</div><h1>${card.title}</h1><div class="bar"></div></div>
		<div class="foot">Ayaan Raza · Full-Stack Developer</div>
	</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of CARDS) {
	await page.setContent(htmlFor(card));
	const shot = await page.screenshot({ type: 'jpeg', quality: 85 });
	writeFileSync(join(outDir, card.file), shot);
	console.log(card.file, shot.length);
}
await browser.close();
console.log(`done: ${CARDS.length} cards in ${outDir}`);
