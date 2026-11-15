import { postSchema, type Post } from '#lib/schemas/post';

// Demo blog posts — placeholder content for Phase 1. Real posts are Phase 3.
export const posts: Post[] = postSchema.array().parse([
	{
		slug: 'mobile-first-portfolios',
		title: 'Designing mobile-first portfolios',
		excerpt: 'Most people will meet your work on a phone. Start small, then earn the big screen.',
		date: '2025-10-12',
		readTime: '4 min read',
		tags: ['Design', 'Mobile'],
		body: [
			'This is demo placeholder content. The real post will argue that a portfolio should be designed thumb-first: one column, one idea per screen, and the best work within two scrolls.',
			'A second paragraph would show the layout decisions behind this very page — the single-column hero, the stacked cards, and the sticky call to action that never blocks content.',
			'Until the real posts land, treat this page as a layout demo: headings, paragraphs, tags and dates, all in the site’s real typography.'
		]
	},
	{
		slug: 'flutter-vs-native-demo',
		title: 'Flutter vs native: a demo take',
		excerpt: 'A short, honest comparison from demo projects — not a holy war.',
		date: '2025-09-28',
		readTime: '5 min read',
		tags: ['Flutter', 'Mobile'],
		body: [
			'This is demo placeholder content. The real post will compare building the same demo app twice — once cross-platform, once native — and report what actually differed.',
			'A second paragraph would cover the trade-offs that mattered most in the demo: startup time, animation smoothness, and how fast a small team could ship changes.',
			'Until the real posts land, treat this page as a layout demo: headings, paragraphs, tags and dates, all in the site’s real typography.'
		]
	},
	{
		slug: 'small-details-big-ux',
		title: 'Small details, big UX wins',
		excerpt: 'Focus rings, empty states and honest loading messages do quiet work.',
		date: '2025-09-03',
		readTime: '3 min read',
		tags: ['UX', 'Accessibility'],
		body: [
			'This is demo placeholder content. The real post will walk through the small details on this site — visible focus states, skip links, and forms that keep your input when validation fails.',
			'A second paragraph would explain why these details are not polish added at the end, but the experience itself for keyboard and screen reader users.',
			'Until the real posts land, treat this page as a layout demo: headings, paragraphs, tags and dates, all in the site’s real typography.'
		]
	}
]);

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}
