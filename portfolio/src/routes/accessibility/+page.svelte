<script lang="ts">
	import type { PageData } from './$types';
	import { Check } from '@lucide/svelte';
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
			{ '@type': 'ListItem', position: 2, name: 'Accessibility', item: `${data.site.baseUrl}/accessibility` }
		]
	});

	const features = [
		'Skip link on every page, jumping straight to the main content.',
		'Full keyboard support: visible focus rings, focus moved to section targets on hash navigation, and a trapped focus cycle in the mobile menu.',
		'Text contrast meets WCAG 2.2 AA for body and small text, verified in the 2026 audit.',
		'Touch targets of at least 24px, with larger targets on primary actions.',
		'Animations respect prefers-reduced-motion — reveals and hover lifts are disabled.',
		'Semantic landmarks, exactly one h1 per page, labelled form fields, and alt text on meaningful images.',
		'Light and dark themes, both checked for contrast.'
	];
</script>

<svelte:head>
	<title>Accessibility — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="Accessibility statement for the Ayaan Raza demo portfolio: what is supported and what is known to be limited."
	/>
	<meta property="og:title" content="Accessibility — Ayaan Raza" />
	<meta
		property="og:description"
		content="Accessibility statement for the Ayaan Raza demo portfolio: what is supported and what is known to be limited."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/accessibility" />
	<meta property="og:image" content="{data.site.baseUrl}/og/accessibility.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Accessibility — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/accessibility.jpg" />
	<meta name="twitter:title" content="Accessibility — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Accessibility statement for the Ayaan Raza demo portfolio: what is supported and what is known to be limited."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/accessibility" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Accessibility"
			title="Accessibility statement"
			description="This demo site aims to meet WCAG 2.2 AA. Here is what is in place, and what is still limited."
		/>
	</div>
	<p class="mt-6 text-sm text-body">Last updated: 15 November 2026.</p>

	<h2 class="mt-8 font-display text-xl font-bold text-ink">What this site supports</h2>
	<ul class="mt-4 space-y-3">
		{#each features as feature (feature)}
			<li class="flex items-start gap-2.5 leading-relaxed text-body">
				<Check size={18} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
				{feature}
			</li>
		{/each}
	</ul>

	<h2 class="mt-10 font-display text-xl font-bold text-ink">Known limitations</h2>
	<p class="mt-2 leading-relaxed text-body">
		The decorative illustrations are intentionally hidden from assistive technology, and the social
		icons in the header and footer are placeholders that point nowhere — both are demo shortcuts,
		not finished behaviour. The contact and newsletter forms are demos that send nothing; their
		success states say so on the page.
	</p>

	<h2 class="mt-10 font-display text-xl font-bold text-ink">Feedback</h2>
	<p class="mt-2 leading-relaxed text-body">
		Found a barrier on this demo? The contact page explains how to reach the fictional persona — and
		in a production site, accessibility reports would be answered within two working days.
	</p>
</div>

<CtaBand />
