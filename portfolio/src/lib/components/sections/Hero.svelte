<script lang="ts">
	import { ArrowRight, Download } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Site } from '#lib/schemas/site';
	import Button from '#lib/components/ui/Button.svelte';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';

	let { site }: { site: Site } = $props();
</script>

<section id="home" aria-labelledby="hero-heading" tabindex="-1">
	<div
		class="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-16 lg:pb-20"
	>
		<div use:reveal>
			<p class="font-display text-lg font-bold text-ink">Hi, I'm Ayaan 👋</p>
			<h1
				id="hero-heading"
				class="mt-3 font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.08] font-extrabold tracking-tight text-ink"
			>
				I build digital products that <span class="text-accent">people love</span>
			</h1>
			<p class="mt-5 max-w-lg leading-relaxed text-body">
				I'm a passionate full-stack developer who builds fast, scalable and beautiful web & mobile
				applications that solve real-world problems.
			</p>
			<div class="mt-7 flex flex-wrap gap-3">
				<Button href="/#projects">
					View My Work <ArrowRight size={18} aria-hidden="true" />
				</Button>
				<Button href="/resume" variant="secondary" ariaLabel="View CV">
					Download CV <Download size={18} aria-hidden="true" />
				</Button>
			</div>
			<div class="mt-9 flex items-center gap-4">
				<p class="text-sm font-bold text-ink">Let's connect</p>
				<ul class="flex gap-2.5">
					{#each site.socials as social (social.id)}
						<li>
							<a
								href={social.href}
								aria-label={social.label}
								class="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white"
							>
								<SocialIcon id={social.id} />
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div use:reveal={{ delay: 120 }}>
			<img
				src="/images/hero-illustration.png"
				alt=""
				width="1920"
				height="1280"
				fetchpriority="high"
				decoding="async"
				class="h-auto w-full"
			/>
		</div>
	</div>
</section>
