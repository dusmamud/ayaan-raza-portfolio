import {
	experienceSchema,
	faqSchema,
	processStepSchema,
	testimonialSchema,
	type Experience,
	type Faq,
	type ProcessStep,
	type Testimonial
} from '#lib/schemas/home';

// Demo career history — fictional companies and roles for the UI/UX demo.
export const experience: Experience[] = experienceSchema.array().parse([
	{
		id: 'senior',
		role: 'Senior Full-Stack Developer',
		company: 'NovaByte Labs',
		period: '2024 — Present',
		description:
			'Leading end-to-end demo builds, from the first product idea to a polished release, across web and mobile.',
		tags: ['SvelteKit', 'TypeScript', 'Firebase']
	},
	{
		id: 'mid',
		role: 'Full-Stack Developer',
		company: 'PixelForge Studio',
		period: '2023 — 2024',
		description:
			'Shipped client projects with a small team: design handoff, API integration and app-store releases.',
		tags: ['Flutter', 'REST APIs', 'PostgreSQL']
	},
	{
		id: 'junior',
		role: 'Junior Developer',
		company: 'Freelance',
		period: '2022 — 2023',
		description:
			'Started with freelance landing pages and small apps, learning the full cycle from brief to launch.',
		tags: ['JavaScript', 'UI Design', 'Git']
	}
]);

export const processSteps: ProcessStep[] = processStepSchema.array().parse([
	{
		id: 'discover',
		step: 1,
		title: 'Discover',
		description: 'We define goals, users and scope together, so the build solves the right problem.'
	},
	{
		id: 'design',
		step: 2,
		title: 'Design',
		description:
			'Wireframes and UI concepts first — you see and approve the look before a line of code.'
	},
	{
		id: 'develop',
		step: 3,
		title: 'Develop',
		description: 'Clean, tested code in weekly increments, with a demo link after every sprint.'
	},
	{
		id: 'deliver',
		step: 4,
		title: 'Deliver',
		description: 'Launch, app-store submission and a handover pack — plus support after go-live.'
	}
]);

// Demo testimonials — fictional clients for the UI/UX demo.
export const testimonials: Testimonial[] = testimonialSchema.array().parse([
	{
		id: 'priya',
		quote:
			'Ayaan turned a rough idea into an app our users love. The Foodly demo flow felt real from the very first week.',
		name: 'Priya Sharma',
		role: 'Founder, Foodly',
		initials: 'PS',
		tint: 'icon-pink'
	},
	{
		id: 'rahul',
		quote:
			'Clear communication, fast iterations, and a shop experience that just works. Working with Ayaan was easy from day one.',
		name: 'Rahul Verma',
		role: 'Product Lead, Shopio',
		initials: 'RV',
		tint: 'icon-lavender'
	},
	{
		id: 'sneha',
		quote:
			'He cares about the details — the numbers, the empty states, the tiny interactions. WalletWise looks and feels premium.',
		name: 'Sneha Patel',
		role: 'CEO, WalletWise',
		initials: 'SP',
		tint: 'icon-yellow'
	}
]);

export const faqs: Faq[] = faqSchema.array().parse([
	{
		id: 'timeline',
		question: 'How long does a typical project take?',
		answer:
			'Most demo-sized builds take 2–6 weeks from brief to launch, depending on scope. You get a timeline with milestones before work starts.'
	},
	{
		id: 'clients',
		question: 'Do you work with startups or only large companies?',
		answer:
			'Both. Most demo projects are early-stage startups that need a fast, polished first version.'
	},
	{
		id: 'process',
		question: 'What does your design process look like?',
		answer:
			'Research first, then wireframes, then high-fidelity UI. You approve each stage before development begins.'
	},
	{
		id: 'maintenance',
		question: 'Can you maintain the app after launch?',
		answer:
			'Yes — bug fixes, performance tweaks and small feature updates are part of the testing & maintenance service.'
	},
	{
		id: 'start',
		question: 'How do we get started?',
		answer:
			'Send a message through the contact page with your idea. This demo form does not send anything yet — it shows the flow.'
	}
]);
