<script lang="ts">
	import { ArrowRight, Download } from '@lucide/svelte';
	import { parallax } from '#lib/actions/parallax';
	import type { Site } from '#lib/schemas/site';
	import Button from '#lib/components/ui/Button.svelte';
	import Picture from '#lib/components/ui/Picture.svelte';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';

	let { site }: { site: Site } = $props();

	// Entrance choreography: the text blocks arrive one after another
	// (badge -> greeting -> heading -> paragraph -> buttons -> socials)
	// while the illustration fades in behind them. Pure CSS keyframes
	// with `both` fill, gated to motion-safe, so reduced-motion and
	// no-JS visitors see the final state immediately. The illustration
	// gets three nested layers — entrance, scroll parallax, float loop —
	// so no two transforms ever fight over the same element.
</script>

<section id="home" aria-labelledby="hero-heading" tabindex="-1">
	<div
		class="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-20"
	>
		<div>
			<p
				class="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-card px-3.5 py-1.5 text-sm font-bold text-ink shadow-sm motion-safe:animate-hero-in"
			>
				<span class="relative flex h-2.5 w-2.5">
					<span
						class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping"
					></span>
					<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
				</span>
				Available for new projects
			</p>
			<p
				class="mt-4 font-display text-lg font-bold text-ink motion-safe:animate-hero-in motion-safe:[animation-delay:80ms]"
			>
				Hi, I'm Ayaan 👋
			</p>
			<h1
				id="hero-heading"
				class="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.08] font-extrabold tracking-tight text-ink motion-safe:animate-hero-in motion-safe:[animation-delay:160ms]"
			>
				I build digital products that <span class="text-accent">people love</span>
			</h1>
			<p
				class="mt-5 max-w-lg leading-relaxed text-body motion-safe:animate-hero-in motion-safe:[animation-delay:240ms]"
			>
				I'm a passionate full-stack developer who builds fast, scalable and beautiful web & mobile
				applications that solve real-world problems.
			</p>
			<div
				class="mt-7 flex flex-wrap gap-3 motion-safe:animate-hero-in motion-safe:[animation-delay:320ms]"
			>
				<Button href="/#projects" magnetic>
					View My Work <ArrowRight size={18} aria-hidden="true" />
				</Button>
				<Button href="/resume" variant="secondary" ariaLabel="View CV" magnetic>
					Download CV <Download size={18} aria-hidden="true" />
				</Button>
			</div>
			<div
				class="mt-9 flex items-center gap-4 motion-safe:animate-hero-in motion-safe:[animation-delay:400ms]"
			>
				<p class="text-sm font-bold text-ink">Let's connect</p>
				<ul class="flex gap-2.5">
					{#each site.socials as social (social.id)}
						<li>
							<a
								href={social.href}
								aria-label={social.label}
								class="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-card text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white"
							>
								<SocialIcon id={social.id} />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="motion-safe:animate-hero-img motion-safe:[animation-delay:200ms]">
			<div use:parallax>
				<Picture
					base="/images/hero-illustration"
					alt=""
					width={1920}
					height={1280}
					widths={[640, 960, 1280, 1920]}
					sizes="(max-width: 1023px) 100vw, 592px"
					fetchPriority="high"
					class="h-auto w-full motion-safe:animate-float dark:rounded-3xl"
				/>
			</div>
		</div>
	</div>
</section>
