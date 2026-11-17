import { posts } from '#lib/data/posts';
import { projects } from '#lib/data/projects';
import { services } from '#lib/data/services';
import { site } from '#lib/data/site';
import type { PageLoad } from './$types';

export type SearchEntry = {
	title: string;
	href: string;
	description: string;
	kind: 'Page' | 'Project' | 'Post' | 'Service';
	keywords: string;
};

const pages: SearchEntry[] = [
	{
		title: 'Home',
		href: '/',
		description: 'Hero, services, selected work, testimonials and FAQ.',
		kind: 'Page',
		keywords: 'home hero about services projects testimonials faq'
	},
	{
		title: 'About',
		href: '/about',
		description: 'Background, values, stats and certifications.',
		kind: 'Page',
		keywords: 'about bio values stats certifications'
	},
	{
		title: 'Services',
		href: '/services',
		description: 'Mobile apps, UI/UX design, backend and maintenance, with starting prices.',
		kind: 'Page',
		keywords: 'services pricing mobile design backend testing'
	},
	{
		title: 'Projects',
		href: '/projects',
		description: 'All six demo case studies.',
		kind: 'Page',
		keywords: 'projects work portfolio case studies'
	},
	{
		title: 'Blog',
		href: '/blog',
		description: 'Demo notes on design, mobile and the web.',
		kind: 'Page',
		keywords: 'blog posts notes articles rss'
	},
	{
		title: 'Testimonials',
		href: '/testimonials',
		description: 'What fictional clients say about the work.',
		kind: 'Page',
		keywords: 'testimonials reviews clients feedback'
	},
	{
		title: 'Uses',
		href: '/uses',
		description: 'The tools and setup behind the demos.',
		kind: 'Page',
		keywords: 'uses tools setup gear editor'
	},
	{
		title: 'Contact',
		href: '/contact',
		description: 'Demo contact form that sends nothing.',
		kind: 'Page',
		keywords: 'contact email message hire'
	},
	{
		title: 'Resume',
		href: '/resume',
		description: 'Printable demo CV with experience and education.',
		kind: 'Page',
		keywords: 'resume cv experience education skills pdf'
	},
	{
		title: 'Privacy Policy',
		href: '/privacy',
		description: 'Demo privacy policy.',
		kind: 'Page',
		keywords: 'privacy policy data'
	},
	{
		title: 'Terms of Use',
		href: '/terms',
		description: 'Demo terms of use.',
		kind: 'Page',
		keywords: 'terms legal'
	},
	{
		title: 'Accessibility',
		href: '/accessibility',
		description: 'Accessibility statement and supported features.',
		kind: 'Page',
		keywords: 'accessibility wcag a11y statement'
	},
	{
		title: 'Sitemap',
		href: '/sitemap',
		description: 'Every page on the site, in one place.',
		kind: 'Page',
		keywords: 'sitemap map pages'
	},
	{
		title: 'Now',
		href: '/now',
		description: 'What Ayaan is focused on right now: building, learning, reading.',
		kind: 'Page',
		keywords: 'now current focus learning reading'
	},
	{
		title: 'Pricing',
		href: '/pricing',
		description: 'Demo pricing: three plans from $499, plus add-ons.',
		kind: 'Page',
		keywords: 'pricing plans cost quote rates packages'
	},
	{
		title: 'Book a call',
		href: '/book',
		description: 'Book a free 30-minute intro call. Demo booking — nothing is sent.',
		kind: 'Page',
		keywords: 'book call meeting schedule appointment intro'
	}
];

export const load: PageLoad = () => ({
	site,
	entries: [
		...pages,
		...projects.map((project): SearchEntry => ({
			title: project.title,
			href: `/projects/${project.slug}`,
			description: project.description,
			kind: 'Project',
			keywords: `${project.category} ${project.tags.join(' ')} case study`
		})),
		...posts.map((post): SearchEntry => ({
			title: post.title,
			href: `/blog/${post.slug}`,
			description: post.excerpt,
			kind: 'Post',
			keywords: post.tags.join(' ')
		})),
		...services.map((service): SearchEntry => ({
			title: service.title,
			href: service.href,
			description: service.description,
			kind: 'Service',
			keywords: `${service.price} service`
		}))
	]
});
