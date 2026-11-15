import { serviceSchema, statSchema, type Service, type Stat } from '#lib/schemas/service';

// Demo service copy adapted from the reference design. The Flutter mention
// is demo service copy only — it does not describe this site's stack.
export const services: Service[] = serviceSchema.array().parse([
	{
		id: 'mobile',
		title: 'Mobile App Development',
		description: 'Cross-platform mobile apps using Flutter for Android and iOS.',
		icon: 'smartphone',
		tint: 'icon-lavender',
		href: '/#services'
	},
	{
		id: 'design',
		title: 'UI/UX Design',
		description: 'Beautiful, intuitive and user-friendly designs that engage users.',
		icon: 'palette',
		tint: 'icon-pink',
		href: '/#services'
	},
	{
		id: 'backend',
		title: 'Backend Integration',
		description: 'REST APIs, Firebase and third-party service integrations.',
		icon: 'cloud',
		tint: 'icon-yellow',
		href: '/#services'
	},
	{
		id: 'testing',
		title: 'Testing & Maintenance',
		description: 'Bug fixing, performance optimization and ongoing maintenance.',
		icon: 'bug',
		tint: 'icon-green',
		href: '/#services'
	}
]);

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
