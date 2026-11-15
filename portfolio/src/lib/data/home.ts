import {
	certificationSchema,
	educationSchema,
	experienceSchema,
	faqSchema,
	processStepSchema,
	repoSchema,
	testimonialSchema,
	useItemSchema,
	type Certification,
	type Education,
	type Experience,
	type Faq,
	type ProcessStep,
	type Repo,
	type Testimonial,
	type UseItem
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

// Demo education history — fictional entries for the UI/UX demo.
export const education: Education[] = educationSchema.array().parse([
	{
		id: 'btech',
		degree: 'B.Tech, Computer Science',
		school: 'Demo University',
		period: '2018 — 2022',
		note: 'Graduated with a focus on software engineering and human-computer interaction.'
	},
	{
		id: 'nanodegree',
		degree: 'Full-Stack Development Program',
		school: 'Online (Demo)',
		period: '2022',
		note: 'Intensive program covering modern web stacks, APIs and mobile development.'
	}
]);

// Demo certifications — fictional entries for the UI/UX demo.
export const certifications: Certification[] = certificationSchema.array().parse([
	{
		id: 'flutter',
		title: 'Flutter & Dart — The Complete Guide',
		issuer: 'Online course (Demo)',
		year: '2023',
		note: 'Cross-platform apps, state management and app-store releases.'
	},
	{
		id: 'ux-design',
		title: 'UX Design Professional Certificate',
		issuer: 'Online course (Demo)',
		year: '2023',
		note: 'Research, wireframing, prototyping and usability testing.'
	},
	{
		id: 'cloud',
		title: 'Cloud Practitioner Essentials',
		issuer: 'Online course (Demo)',
		year: '2024',
		note: 'Cloud fundamentals, deployment pipelines and hosting basics.'
	}
]);

// Demo "uses" list — the tools behind this fictional setup.
export const uses: UseItem[] = useItemSchema.array().parse([
	{
		id: 'vscode',
		name: 'VS Code',
		description: 'Daily editor, with the Svelte and Flutter extensions.',
		group: 'development'
	},
	{
		id: 'sveltekit',
		name: 'SvelteKit + Svelte 5',
		description: 'The framework this very site is built with.',
		group: 'development'
	},
	{
		id: 'flutter',
		name: 'Flutter & Dart',
		description: 'Cross-platform mobile apps from one codebase.',
		group: 'development'
	},
	{
		id: 'github',
		name: 'Git & GitHub',
		description: 'Version control, reviews and automated deploys.',
		group: 'development'
	},
	{
		id: 'figma',
		name: 'Figma',
		description: 'Interface design, prototypes and developer handoff.',
		group: 'design'
	},
	{
		id: 'pen-paper',
		name: 'Pen & paper',
		description: 'First sketches always start offline, away from the screen.',
		group: 'design'
	},
	{
		id: 'notion',
		name: 'Notion',
		description: 'Project notes, briefs and the demo content calendar.',
		group: 'productivity'
	},
	{
		id: 'focus-timer',
		name: 'A focus timer',
		description: 'Twenty-five minute sprints, with real breaks between them.',
		group: 'productivity'
	},
	{
		id: 'laptop',
		name: 'Laptop (Demo)',
		description: 'The daily driver for builds, design and video calls.',
		group: 'hardware'
	},
	{
		id: 'phone',
		name: 'Android & iPhone (Demo)',
		description: 'Real devices for testing — emulators never tell the whole story.',
		group: 'hardware'
	}
]);

// Demo open-source projects — fictional repositories for the UI/UX demo.
export const repos: Repo[] = repoSchema.array().parse([
	{
		id: 'svelte-picture',
		name: 'svelte-picture',
		description: 'Tiny <picture> helper for AVIF/WebP fallbacks in Svelte apps.',
		language: 'TypeScript',
		stars: 128,
		forks: 12
	},
	{
		id: 'flutter-empty-states',
		name: 'flutter-empty-states',
		description: 'Friendly empty-state widgets for Flutter apps, with illustrations.',
		language: 'Dart',
		stars: 96,
		forks: 8
	},
	{
		id: 'a11y-checklist',
		name: 'a11y-checklist',
		description: 'A plain-language accessibility checklist for small teams.',
		language: 'Markdown',
		stars: 214,
		forks: 31
	}
]);
