import { createRequire } from 'node:module';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire('/home/hatch/workspace/ayaan-raza/portfolio/package.json');
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:4173';

// Prints /resume to the downloadable PDF. Run against `pnpm run preview`
// after a build; re-run whenever resume content changes.
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`${BASE}/resume`, { waitUntil: 'networkidle' });
await page.pdf({
	path: join(here, '../portfolio/static/ayaan-raza-resume.pdf'),
	format: 'A4',
	printBackground: true,
	margin: { top: '18mm', bottom: '18mm', left: '14mm', right: '14mm' }
});
await browser.close();
console.log('wrote static/ayaan-raza-resume.pdf');
