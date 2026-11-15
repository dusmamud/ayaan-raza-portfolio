<script lang="ts">
	import { page } from '$app/state';
	import { ArrowUp, Clock, Mail, MapPin, Phone } from '@lucide/svelte';
	import { site } from '#lib/data/site';
	import { services } from '#lib/data/services';
	import Logo from '#lib/components/ui/Logo.svelte';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	// The wave must match the background of whatever ends the page: blush
	// on the home page (CTA section), cream everywhere else.
	const waveFill = $derived(page.url.pathname === '/' ? 'fill-blush' : 'fill-cream');

	// Short, scannable columns: 5-6 links each, grouped by intent. The old
	// single "Quick Links" column held 10 links and dwarfed the rest.
	const exploreLinks = site.nav.filter((link) => link.href !== '/#stack');
	const resourceLinks = [
		{ label: 'Tech Stack', href: '/#stack' },
		{ label: 'Testimonials', href: '/testimonials' },
		{ label: 'Uses', href: '/uses' },
		{ label: 'Resume', href: '/resume' },
		{ label: 'Sitemap', href: '/sitemap' },
		{ label: 'Search', href: '/search' }
	];
	const linkClass =
		'inline-block py-1 transition-colors hover:text-white hover:underline hover:underline-offset-4';
</script>

<footer class="overflow-hidden bg-footer text-white/70">
	<WaveDivider fillClass={waveFill} />
	<div class="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 lg:px-8">
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
			<div class="sm:col-span-2 lg:col-span-2">
				<a href="/#home" class="flex items-center gap-2.5" aria-label="Ayaan Raza — home">
					<Logo light />
					<span class="flex flex-col leading-tight">
						<span class="font-display font-bold text-white">{site.name}</span>
						<span class="text-xs text-white/60">{site.role}</span>
					</span>
				</a>
				<p class="mt-4 max-w-xs text-sm leading-relaxed">
					Building digital products that make people smile — one demo at a time.
				</p>
				<p
					class="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/85"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
					</span>
					Available for new projects
				</p>
				<ul class="mt-5 flex gap-2.5">
					{#each site.socials as social (social.id)}
						<li>
							<a
								href={social.href}
								aria-label={social.label}
								class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:bg-accent hover:text-white"
							>
								<SocialIcon id={social.id} />
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<nav aria-label="Explore">
				<h2 class="font-display font-bold text-white">Explore</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each exploreLinks as link (link.href)}
						<li>
							<a href={link.href} class={linkClass}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Resources">
				<h2 class="font-display font-bold text-white">Resources</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each resourceLinks as link (link.href)}
						<li>
							<a href={link.href} class={linkClass}>{link.label}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<nav aria-label="Services">
				<h2 class="font-display font-bold text-white">Services</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each services as service (service.id)}
						<li>
							<a href={service.href} class={linkClass}>{service.title}</a>
						</li>
					{/each}
				</ul>
			</nav>

			<address class="not-italic">
				<h2 class="font-display font-bold text-white">Contact</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					<li class="flex items-center gap-2.5">
						<Mail size={16} aria-hidden="true" class="shrink-0" />
						<a href="mailto:{site.email}" class={linkClass}>{site.email}</a>
					</li>
					<li class="flex items-center gap-2.5">
						<Phone size={16} aria-hidden="true" class="shrink-0" />
						<span class="inline-block py-1">{site.phone}</span>
					</li>
					<li class="flex items-center gap-2.5">
						<MapPin size={16} aria-hidden="true" class="shrink-0" />
						<span class="inline-block py-1">{site.location}</span>
					</li>
					<li class="flex items-center gap-2.5">
						<Clock size={16} aria-hidden="true" class="shrink-0" />
						<span class="inline-block py-1">Replies within 24 hours</span>
					</li>
				</ul>
				<p class="mt-4 text-xs text-white/50">Demo contact details — not real.</p>
			</address>
		</div>

		<p
			aria-hidden="true"
			class="pointer-events-none mt-12 [mask-image:linear-gradient(to_bottom,black_55%,transparent_95%)] text-center font-display text-[clamp(2.5rem,11.5vw,10rem)] leading-[0.85] font-extrabold tracking-tight whitespace-nowrap text-white/[0.08] uppercase select-none"
		>
			Ayaan Raza<span class="text-accent/25">.</span>
		</p>

		<div
			class="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© 2026 {site.name} — Demo portfolio. All content is fictional.</p>
			<nav aria-label="Legal" class="flex flex-wrap items-center gap-x-5 gap-y-1">
				<a href="/privacy" class={linkClass}>Privacy Policy</a>
				<a href="/terms" class={linkClass}>Terms</a>
				<a href="/accessibility" class={linkClass}>Accessibility</a>
				<a href="/rss.xml" class={linkClass}>RSS</a>
			</nav>
			<div class="flex flex-wrap items-center gap-4">
				<p class="text-white/50">Built with SvelteKit</p>
				<a
					href="/#home"
					class="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 font-bold text-white/85 transition-colors hover:border-accent hover:bg-accent hover:text-white"
				>
					Back to top <ArrowUp size={16} aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</footer>
