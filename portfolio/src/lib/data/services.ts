import {
	serviceDetailSchema,
	serviceSchema,
	statSchema,
	type Service,
	type ServiceDetail,
	type Stat
} from '#lib/schemas/service';

// Demo service copy adapted from the reference design. The Flutter mention
// is demo service copy only — it does not describe this site's stack.
export const services: Service[] = serviceSchema.array().parse([
	{
		id: 'mobile',
		title: 'Mobile App Development',
		description: 'Cross-platform mobile apps using Flutter for Android and iOS.',
		icon: 'smartphone',
		tint: 'icon-lavender',
		href: '/services/mobile',
		price: 'From $899'
	},
	{
		id: 'design',
		title: 'UI/UX Design',
		description: 'Beautiful, intuitive and user-friendly designs that engage users.',
		icon: 'palette',
		tint: 'icon-pink',
		href: '/services/design',
		price: 'From $499'
	},
	{
		id: 'backend',
		title: 'Backend Integration',
		description: 'REST APIs, Firebase and third-party service integrations.',
		icon: 'cloud',
		tint: 'icon-yellow',
		href: '/services/backend',
		price: 'From $699'
	},
	{
		id: 'testing',
		title: 'Testing & Maintenance',
		description: 'Bug fixing, performance optimization and ongoing maintenance.',
		icon: 'bug',
		tint: 'icon-green',
		href: '/services/testing',
		price: 'From $199/mo'
	}
]);

export function getService(id: string): Service | undefined {
	return services.find((service) => service.id === id);
}

// Demo stats — all values are fake, for the UI/UX demo only.
export const stats: Stat[] = statSchema.array().parse([
	{
		id: 'years',
		icon: 'briefcase',
		tint: 'icon-pink',
		label: 'Years Experience',
		display: '3+',
		countTo: 3,
		suffix: '+'
	},
	{
		id: 'projects',
		icon: 'layers',
		tint: 'icon-yellow',
		label: 'Projects Built',
		display: '30+',
		countTo: 30,
		suffix: '+'
	},
	{
		id: 'clients',
		icon: 'users',
		tint: 'icon-lavender',
		label: 'Happy Clients',
		display: '20+',
		countTo: 20,
		suffix: '+'
	},
	{
		id: 'coffee',
		icon: 'coffee',
		tint: 'icon-green',
		label: 'Cups of Coffee',
		display: '∞',
		countTo: null,
		suffix: ''
	}
]);

// Detail-page copy for each service. Demo content only.
export const serviceDetails: ServiceDetail[] = serviceDetailSchema.array().parse([
	{
		id: 'mobile',
		longDescription:
			'From first sketch to app-store release, I build cross-platform apps that feel native on both Android and iOS — one codebase, two stores, no compromises on polish.',
		includes: [
			'Cross-platform Flutter builds',
			'App-store submission & review support',
			'Push notifications & deep links',
			'Offline-first data & sync',
			'Pixel-perfect UI from Figma',
			'Performance profiling & tuning'
		],
		approach:
			'Design first, then weekly builds you can install on your own phone. Every sprint ends with a demo link, so there are no surprises at launch.',
		relatedSlugs: ['foodly', 'fittrack']
	},
	{
		id: 'design',
		longDescription:
			'Interfaces people understand in seconds. I design with real content and real constraints, so what you approve is what gets built.',
		includes: [
			'User research & journey mapping',
			'Wireframes & interactive prototypes',
			'Design systems & component libraries',
			'Usability testing with real users',
			'Developer-ready handoff files',
			'Accessibility checks (WCAG basics)'
		],
		approach:
			'Research, sketch, test, refine. You review clickable prototypes before any code exists, so feedback is cheap and early.',
		relatedSlugs: ['shopio', 'walletwise']
	},
	{
		id: 'backend',
		longDescription:
			'The invisible half of every app: reliable APIs, secure auth and data that stays in sync. Built to scale from demo day to real users.',
		includes: [
			'REST API design & documentation',
			'Firebase setup: Auth, Firestore, Functions',
			'Secure authentication & roles',
			'Third-party service integrations',
			'Database design & migrations',
			'Error tracking & logging'
		],
		approach:
			'API contract first — frontend and backend grow against the same spec, so integration week is boring in the best way.',
		relatedSlugs: ['walletwise', 'foodly']
	},
	{
		id: 'testing',
		longDescription:
			'Launch day is the starting line. I keep apps fast, stable and up to date long after release, with tests that catch regressions before users do.',
		includes: [
			'Automated test suites (unit + E2E)',
			'Bug fixing with reproduction reports',
			'Performance optimization & audits',
			'Crash monitoring & alerts',
			'Dependency & security updates',
			'Monthly maintenance reports'
		],
		approach:
			'Every fix ships with a test that proves it. You get a short monthly report: what changed, what improved, what is next.',
		relatedSlugs: ['fittrack', 'shopio']
	}
]);

export function getServiceDetail(id: string): ServiceDetail | undefined {
	return serviceDetails.find((detail) => detail.id === id);
}
