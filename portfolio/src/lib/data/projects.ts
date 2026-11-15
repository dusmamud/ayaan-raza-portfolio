import { projectSchema, type Project } from '#lib/schemas/project';

// Demo projects — all copy, years, timelines and metrics are fake, for the
// UI/UX demo only. The single source of truth for what the site displays.
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
		timeline: '8 weeks',
		metrics: [
			{ value: '2 taps', label: 'Average taps to reorder' },
			{ value: '98%', label: 'Testers who found tracking clear' },
			{ value: '4.9★', label: 'Demo tester rating' }
		],
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
		timeline: '6 weeks',
		metrics: [
			{ value: '1 page', label: 'Checkout, start to finish' },
			{ value: '-41%', label: 'Fewer taps than a multi-step flow' },
			{ value: '3.2s', label: 'Median demo checkout time' }
		],
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
		timeline: '7 weeks',
		metrics: [
			{ value: '4×', label: 'More weekly check-ins in testing' },
			{ value: '12', label: 'Budget views in the demo' },
			{ value: '92%', label: 'Testers who read charts at a glance' }
		],
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
		timeline: '5 weeks',
		metrics: [
			{ value: '<1 min', label: 'To start the first workout' },
			{ value: '21 days', label: 'Longest demo streak' },
			{ value: '87%', label: 'Testers active past week one' }
		],
		overview:
			'FitTrack is a demo fitness concept: log workouts in seconds, follow simple plans, and watch small streaks turn into real habits.',
		challenge:
			'Most fitness apps overwhelm on day one. The demo brief was to make the first workout take less than a minute to start.',
		solution:
			'One-tap workout start, glanceable rings for daily goals, and plans that adapt to missed days instead of punishing them.',
		outcome:
			'In this demo story, the streak design kept testers coming back: small wins, shown clearly, beat big goals shown once.'
	},
	{
		slug: 'wanderly',
		title: 'Wanderly',
		category: 'Travel',
		description: 'Trip planner with offline maps and day-by-day itineraries.',
		tint: 'blue',
		mockup: 'travel',
		tags: ['Flutter', 'Maps', 'Offline'],
		year: '2025',
		role: 'Design & Development',
		timeline: '10 weeks',
		metrics: [
			{ value: '32', label: 'Destinations in the demo data' },
			{ value: '0 taps', label: 'To reach offline maps' },
			{ value: '4.8★', label: 'Demo tester rating' }
		],
		overview:
			'Wanderly is a demo travel concept: plan a trip day by day, keep maps and bookings offline, and share the plan with travel buddies.',
		challenge:
			'Travel apps fail exactly when they are needed most — abroad, on slow data. The demo brief was to make the whole trip work offline.',
		solution:
			'Downloadable city packs, an itinerary that reshuffles around the weather, and one shared plan everyone can edit.',
		outcome:
			'In this demo story, testers planned a full weekend trip in one sitting — and the offline maps were the feature everyone mentioned first.'
	},
	{
		slug: 'taskflow',
		title: 'TaskFlow',
		category: 'Productivity',
		description: 'Calm task manager with focus sessions and team boards.',
		tint: 'orange',
		mockup: 'tasks',
		tags: ['SvelteKit', 'PWA', 'Sync'],
		year: '2026',
		role: 'Design & Development',
		timeline: '6 weeks',
		metrics: [
			{ value: '3s', label: 'To capture a task, start to done' },
			{ value: '25 min', label: 'Default focus session length' },
			{ value: '96%', label: 'Testers who kept the daily habit' }
		],
		overview:
			'TaskFlow is a demo productivity concept: capture tasks in seconds, plan the day on one calm board, and focus with built-in timed sessions.',
		challenge:
			'Task apps tend to become second jobs. The demo brief was to make planning feel lighter than the work itself.',
		solution:
			'A single today-view, natural-language due dates, and focus timers that respect breaks instead of nagging through them.',
		outcome:
			'In this demo story, the today-view became the habit: testers opened the app each morning and knew exactly what mattered.'
	}
]);

export function getProject(slug: string): Project | undefined {
	return projects.find((project) => project.slug === slug);
}
