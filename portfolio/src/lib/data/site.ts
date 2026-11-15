import { siteSchema, type Site } from '#lib/schemas/site';

// Demo content only. The email uses the reserved .demo TLD and the phone
// number is fake, so nothing here reaches a real person. Social links point
// to "#" in Phase 1 — there are no real accounts behind this demo persona.
export const site: Site = siteSchema.parse({
	name: 'Ayaan Raza',
	role: 'Full-Stack Developer',
	tagline: 'I build digital products that people love',
	email: 'hello@ayaanraza.demo',
	phone: '+91 00000 00000',
	location: 'India (Demo)',
	baseUrl: 'https://ayaanraza.demo',
	nav: [
		{ label: 'Home', href: '/#home' },
		{ label: 'About', href: '/#about' },
		{ label: 'Services', href: '/#services' },
		{ label: 'Projects', href: '/#projects' },
		{ label: 'Tech Stack', href: '/#stack' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact', href: '/contact' }
	],
	socials: [
		{ id: 'github', label: 'GitHub (demo)', href: '#' },
		{ id: 'linkedin', label: 'LinkedIn (demo)', href: '#' },
		{ id: 'x', label: 'X (demo)', href: '#' },
		{ id: 'instagram', label: 'Instagram (demo)', href: '#' },
		{ id: 'mail', label: 'Email (demo)', href: '#' }
	],
	techStack: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Tailwind CSS', 'Vite']
});
