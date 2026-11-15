import { site } from '#lib/data/site';
import { projects } from '#lib/data/projects';
import { posts } from '#lib/data/posts';

export const prerender = true;

export function GET() {
	const paths = [
		'',
		'/projects',
		'/blog',
		'/contact',
		...projects.map((project) => `/projects/${project.slug}`),
		...posts.map((post) => `/blog/${post.slug}`)
	];
	const urls = paths.map((path) => `<url><loc>${site.baseUrl}${path}</loc></url>`).join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
	return new Response(xml, { headers: { 'content-type': 'application/xml' } });
}
