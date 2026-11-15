import { projectSchema, type Project } from '#lib/schemas/project';

// Demo projects — all copy, years and outcomes are fake, for the UI/UX
// demo only. The single source of truth for what the site displays.
export const projects: Project[] = projectSchema.array().parse([
	{
		slug: 'foodly',
		title: 'Foodly',
		category: 'Food & Delivery',
		description: 'A food delivery app with real-time tracking and secure payments.',
		tint: 'green',
		mockup: 'food',
		tags: ['Flutter', 'Firebase', 'Maps'],
		year: '2025',
		role: 'Design & Development',
		overview:
			'Foodly is a demo food delivery concept: browse nearby kitchens, build an order in a couple of taps, and watch it arrive in real time.',
		challenge:
			'Delivery apps live or die by trust. The demo brief was to make tracking feel instant and payments feel safe, even on a slow connection.',
		solution:
			'A calm home feed, a live map view with clear rider states, and a checkout flow that shows every charge before the user pays.',
		outcome:
			'In this demo story, the prototype tested well with friends and family: orders felt faster to place, and nobody asked where their food was.'
	},
	{
		slug: 'shopio',
		title: 'Shopio',
		category: 'E-Commerce',
		description: 'A cross-platform shopping app with smooth checkout flow.',
		tint: 'pink',
		mockup: 'shop',
		tags: ['React Native', 'Stripe', 'REST API'],
		year: '2024',
		role: 'Design & Development',
		overview:
			'Shopio is a demo shopping concept: a friendly storefront, honest product pages, and a checkout that never makes the user think twice.',
		challenge:
			'Checkout abandonment is the classic e-commerce leak. The demo brief was to cut every unnecessary step between cart and confirmation.',
		solution:
			'One-page checkout, saved addresses, clear delivery estimates, and a progress indicator that always shows what comes next.',
		outcome:
			'In this demo story, the streamlined checkout became the talking point of the concept: fewer taps, fewer doubts, happier test shoppers.'
	},
	{
		slug: 'walletwise',
		title: 'WalletWise',
		category: 'Finance',
		description: 'Personal finance tracker with insights and budget planning.',
		tint: 'yellow',
		mockup: 'finance',
		tags: ['Flutter', 'Charts', 'SQLite'],
		year: '2025',
		role: 'Design & Development',
		overview:
			'WalletWise is a demo finance concept: see where money goes, set budgets that bend instead of break, and get gentle nudges — not guilt trips.',
		challenge:
			'Finance apps often feel like spreadsheets wearing a costume. The demo brief was to make budgets readable at a glance.',
		solution:
			'Big readable charts, plain-language insights, and budgets grouped by the way people actually spend, not by accounting categories.',
		outcome:
			'In this demo story, testers checked the app weekly instead of monthly — the charts made money feel manageable rather than mysterious.'
	},
	{
		slug: 'fittrack',
		title: 'FitTrack',
		category: 'Health & Fitness',
		description: 'Workout tracker and health companion for everyday goals.',
		tint: 'purple',
		mockup: 'fitness',
		tags: ['Flutter', 'Health API', 'Wearables'],
		year: '2024',
		role: 'Design & Development',
		overview:
			'FitTrack is a demo fitness concept: log workouts in seconds, follow simple plans, and watch small streaks turn into real habits.',
		challenge:
			'Most fitness apps overwhelm on day one. The demo brief was to make the first workout take less than a minute to start.',
		solution:
			'One-tap workout start, glanceable rings for daily goals, and plans that adapt to missed days instead of punishing them.',
		outcome:
			'In this demo story, the streak design kept testers coming back: small wins, shown clearly, beat big goals shown once.'
	}
]);

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
