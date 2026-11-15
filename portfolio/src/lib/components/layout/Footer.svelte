<script lang="ts">
	import { page } from '$app/state';
	import { ArrowUp, Mail, MapPin, Phone } from '@lucide/svelte';
	import { site } from '#lib/data/site';
	import { services } from '#lib/data/services';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	// The wave must match the background of whatever ends the page: blush
	// on the home page (CTA section), cream everywhere else.
	const waveFill = $derived(page.url.pathname === '/' ? 'fill-blush' : 'fill-cream');
	const quickLinks = site.nav.filter((link) => link.href !== '/contact');
</script>

<footer class="bg-footer text-white/75">
	<WaveDivider fillClass={waveFill} />
	<div class="mx-auto max-w-7xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]">
			<div>
				<a href="/#home" class="flex items-center gap-2.5" aria-label="Ayaan Raza — home">
					<span
						class="font-display text-[1.5rem] leading-none font-extrabold tracking-tight text-white"
					>
						AR<span class="text-accent">.</span>
					</span>
					<span class="flex flex-col leading-tight">
						<span class="font-display font-bold text-white">{site.name}</span>
						<span class="text-xs text-white/60">{site.role}</span>
					</span>
				</a>
				<p class="mt-4 max-w-xs text-sm leading-relaxed">
					Building digital products that make people smile — one demo at a time.
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

			<nav aria-label="Footer">
				<h2 class="font-display font-bold text-white">Quick Links</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each quickLinks as link (link.href)}
						<li>
							<a href={link.href} class="transition-colors hover:text-white">{link.label}</a>
						</li>
					{/each}
					<li><a href="/contact" class="transition-colors hover:text-white">Contact</a></li>
				</ul>
			</nav>

			<div>
				<h2 class="font-display font-bold text-white">Services</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each services as service (service.id)}
						<li>
							<a href={service.href} class="transition-colors hover:text-white">{service.title}</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h2 class="font-display font-bold text-white">Tech Stack</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					{#each site.techStack as tech (tech)}
						<li class="flex items-center gap-2">
							<span class="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden="true"></span>
							{tech}
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h2 class="font-display font-bold text-white">Contact</h2>
				<ul class="mt-4 space-y-2.5 text-sm">
					<li class="flex items-center gap-2.5">
						<Mail size={16} aria-hidden="true" />
						<a href="mailto:{site.email}" class="transition-colors hover:text-white">{site.email}</a
						>
					</li>
					<li class="flex items-center gap-2.5">
						<Phone size={16} aria-hidden="true" />
						<span>{site.phone}</span>
					</li>
					<li class="flex items-center gap-2.5">
						<MapPin size={16} aria-hidden="true" />
						<span>{site.location}</span>
					</li>
				</ul>
				<p class="mt-4 text-xs text-white/50">Demo contact details — not real.</p>
			</div>
		</div>

		<div
			class="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© 2026 {site.name} — Demo portfolio. All content is fictional.</p>
			<div class="flex items-center gap-5">
				<a href="/privacy" class="transition-colors hover:text-white">Privacy Policy</a>
				<p class="text-white/50">Built with SvelteKit</p>
				<a
					href="/#home"
					class="inline-flex items-center gap-1 font-bold text-white/80 transition-colors hover:text-white"
				>
					Back to top <ArrowUp size={16} aria-hidden="true" />
				</a>
			</div>
		</div>
	</div>
</footer>
