import { site } from '#lib/data/site';
import { projects } from '#lib/data/projects';
import { posts } from '#lib/data/posts';
import { services } from '#lib/data/services';

export const prerender = true;

// Last significant change to the static pages: this deploy changed every
// page's head tags or structured data. Update on any deploy that changes
// page content, head tags or structured data — never the build date.
// Blog posts keep their publication dates (their content is unchanged).
const SITE_LASTMOD = '2026-11-18';

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function GET() {
	const staticPaths = [
		'',
		'/about',
		'/services',
		'/projects',
		'/blog',
		'/contact',
		'/privacy',
		'/resume',
		'/testimonials',
		'/terms',
		'/uses',
		'/sitemap',
		'/accessibility',
		'/now',
		'/pricing',
		'/book'
	];
	const urls = [
		...staticPaths.map(
			(path) => `<url><loc>${site.baseUrl}${path}</loc><lastmod>${SITE_LASTMOD}</lastmod></url>`
		),
		...services.map(
			(service) =>
				`<url><loc>${site.baseUrl}/services/${service.id}</loc><lastmod>${SITE_LASTMOD}</lastmod></url>`
		),
		...projects.map(
			(project) =>
				`<url><loc>${site.baseUrl}/projects/${project.slug}</loc><lastmod>${SITE_LASTMOD}</lastmod></url>`
		),
		...posts.map(
			(post) =>
				`<url><loc>${site.baseUrl}/blog/${escapeXml(post.slug)}</loc><lastmod>${post.date}</lastmod></url>`
		)
	].join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
}
