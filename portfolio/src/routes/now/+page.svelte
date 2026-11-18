<script lang="ts">
	import type { PageData } from './$types';
	import { BookOpen, Code2, Headphones, Rocket } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';

	let { data }: { data: PageData } = $props();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Now', item: `${data.site.baseUrl}/now` }
		]
	});

	// Demo "now" content, in the spirit of nownownow.com: what the
	// fictional persona is focused on, learning, reading and open to.
	// Everything here is placeholder copy for the UI/UX demo.
	const blocks = [
		{
			icon: Rocket,
			tint: 'bg-icon-pink',
			title: 'Building',
			items: [
				'Foodly v2 — a demo redesign of the food delivery flow with a calmer checkout.',
				'A small Svelte motion checklist I share with other builders.',
				'This portfolio: new case study pages and the booking demo.'
			]
		},
		{
			icon: Code2,
			tint: 'bg-icon-lavender',
			title: 'Learning',
			items: [
				'Svelte 5 runes in depth — effects, derived state and when not to use them.',
				'Motion design: spring physics, scroll-driven animation, reduced-motion fallbacks.',
				'Design systems: tokens, theming and dark mode done properly.'
			]
		},
		{
			icon: BookOpen,
			tint: 'bg-icon-yellow',
			title: 'Reading',
			items: [
				'"Refactoring UI" — revisiting the spacing and hierarchy chapters.',
				'The Awwwards SOTD archive, one site a morning, notes in the blog drafts.',
				'Release notes for SvelteKit, Tailwind and Playwright.'
			]
		},
		{
			icon: Headphones,
			tint: 'bg-icon-green',
			title: 'Listening',
			items: [
				'Design-engineering podcasts on the walk — mostly about craft, not tools.',
				'Lo-fi playlists while building; silence while writing case studies.'
			]
		}
	];
</script>

<svelte:head>
	<title>Now — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="What Ayaan Raza is focused on right now: building, learning, reading. Demo content — all fictional."
	/>
	<meta property="og:title" content="Now — Ayaan Raza" />
	<meta
		property="og:description"
		content="What Ayaan Raza is focused on right now: building, learning, reading. Demo content — all fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/now" />
	<meta property="og:image" content="{data.site.baseUrl}/og/now.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Now — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/now.jpg" />
	<meta name="twitter:title" content="Now — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="What Ayaan Raza is focused on right now: building, learning, reading. Demo content — all fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/now" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Now' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Now"
			title="What I'm focused on now"
			description="A living snapshot, updated when priorities change. Last updated November 2026 (demo)."
		/>
	</div>

	<div class="mt-12 grid gap-6 sm:grid-cols-2">
		{#each blocks as block, i (block.title)}
			<div use:reveal={{ delay: i * 75 }}>
				<article class="flex h-full flex-col rounded-3xl bg-card p-6 shadow-sm sm:p-7">
					<span class="inline-flex self-start rounded-xl p-3 text-ink {block.tint}">
						<block.icon size={24} aria-hidden="true" />
					</span>
					<h2 class="mt-4 font-display text-xl font-bold text-ink">{block.title}</h2>
					<ul class="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-body">
						{#each block.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				</article>
			</div>
		{/each}
	</div>

	<div class="mt-12 rounded-3xl bg-blush p-6 sm:p-8" use:reveal>
		<h2 class="font-display text-xl font-bold text-ink">Open to</h2>
		<p class="mt-2 max-w-2xl leading-relaxed text-body">
			One new demo project at a time: a landing page, an app redesign, or a small product build. If
			your idea fits, <a href="/book" class="font-bold text-accent-darker hover:text-accent-dark"
				>book a free intro call</a
			>
			or
			<a href="/contact" class="font-bold text-accent-darker hover:text-accent-dark"
				>send a message</a
			> — I reply to every demo inquiry with a plan and a timeline.
		</p>
	</div>

	<p class="mt-12 text-center text-sm text-body">
		Demo "now" page — fictional snapshot for the UI/UX demo.
	</p>
</div>

<CtaBand />
