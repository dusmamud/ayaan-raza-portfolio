<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowRight, Compass, Gem, HeartHandshake } from '@lucide/svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import Picture from '#lib/components/ui/Picture.svelte';
	import Stat from '#lib/components/ui/Stat.svelte';

	let { data }: { data: PageData } = $props();

	const values = [
		{
			icon: Gem,
			title: 'Craft over speed',
			description:
				'Fast is good, but polished is better. I sweat the details users feel but never notice.'
		},
		{
			icon: HeartHandshake,
			title: 'Honest by default',
			description:
				'Clear timelines, real trade-offs, no jargon. You always know where the project stands.'
		},
		{
			icon: Compass,
			title: 'Simple wins',
			description:
				"Fewer screens, clearer flows. If a feature doesn't serve the user, it doesn't ship."
		}
	];
</script>

<svelte:head>
	<title>About — Ayaan Raza</title>
	<meta
		name="description"
		content="About Ayaan Raza, full-stack developer. Demo portfolio — all content is fictional."
	/>
	<meta property="og:title" content="About — Ayaan Raza" />
	<meta
		property="og:description"
		content="About Ayaan Raza, full-stack developer. Demo portfolio — all content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/about" />
	<link rel="canonical" href="{data.site.baseUrl}/about" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<PageHeader
		eyebrow="About me"
		title="Hi, I'm Ayaan — I build products people love"
		description="A full-stack developer with 3+ years of experience turning ideas into fast, beautiful web and mobile apps."
	/>

	<div class="mt-10 grid items-center gap-10 rounded-3xl bg-blush p-6 sm:p-10 lg:grid-cols-2">
		<Picture
			base="/images/about-illustration"
			alt=""
			width={1920}
			height={1280}
			loading="lazy"
			class="h-auto w-full"
		/>
		<div>
			<p class="leading-relaxed text-body">
				I'm Ayaan, a developer based in India (demo). I started with freelance landing pages and
				grew into full product builds — design, frontend, backend and launch, all under one roof.
			</p>
			<p class="mt-3 leading-relaxed text-body">
				My favourite work sits where design meets code: the moment a prototype becomes something you
				can tap, scroll and use. I care about clean code, honest timelines and interfaces that
				respect the people using them.
			</p>
			<p class="mt-3 leading-relaxed text-body">
				When I'm not shipping, I'm sketching app ideas, reading about design systems, or perfecting
				my coffee routine — the stats below are only slightly exaggerated.
			</p>
		</div>
	</div>

	<div class="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
		{#each data.stats as stat (stat.id)}
			<Stat {stat} />
		{/each}
	</div>

	<h2
		class="mt-16 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink"
	>
		What I believe
	</h2>
	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each values as value (value.title)}
			<article class="rounded-3xl bg-card p-6 shadow-sm">
				<span class="inline-flex rounded-xl bg-lilac p-3 text-ink">
					<value.icon size={24} aria-hidden="true" />
				</span>
				<h3 class="mt-4 font-display text-lg font-bold text-ink">{value.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-body">{value.description}</p>
			</article>
		{/each}
	</div>

	<p class="mt-12 text-center">
		<a
			href="/#experience"
			class="inline-flex items-center gap-1 py-1 font-bold text-accent-darker hover:text-accent-dark"
		>
			See the full career journey <ArrowRight size={18} aria-hidden="true" />
		</a>
	</p>
</div>

<CtaBand />
