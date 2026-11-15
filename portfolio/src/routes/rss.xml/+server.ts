import { site } from '#lib/data/site';
import { posts } from '#lib/data/posts';

export const prerender = true;

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function GET() {
	const items = posts
		.map(
			(post) =>
				`<item><title>${escapeXml(post.title)}</title><link>${site.baseUrl}/blog/${post.slug}</link><guid>${site.baseUrl}/blog/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate></item>`
		)
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(`${site.name} — Blog`)}</title><link>${site.baseUrl}/blog</link><description>Demo blog posts by ${escapeXml(site.name)}. All content is fictional.</description><language>en</language>${items}</channel></rss>`;
	return new Response(xml, { headers: { 'content-type': 'application/rss+xml' } });
}
