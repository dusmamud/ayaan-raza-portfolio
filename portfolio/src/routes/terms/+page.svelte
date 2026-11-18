<script lang="ts">
	import type { PageData } from './$types';
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
			{ '@type': 'ListItem', position: 2, name: 'Terms', item: `${data.site.baseUrl}/terms` }
		]
	});

	const sections = [
		{
			title: 'Demo content',
			body: 'Everything on this site is fictional placeholder content for a UI/UX demo. Ayaan Raza is a demo persona, not a real person. Projects, clients, testimonials, prices and outcomes are invented to show the design.'
		},
		{
			title: 'Use of this site',
			body: 'You are welcome to browse, share links to pages, and take screenshots. Please do not present the demo content as real work, real clients or real prices, and do not use the contact details — the email uses a reserved .demo address and the phone number is fake.'
		},
		{
			title: 'No warranties',
			body: 'This demo is provided as-is, with no warranties of any kind. Nothing here is an offer of services, and no contract is formed by using the site or submitting the demo forms.'
		},
		{
			title: 'Links',
			body: 'Share buttons open the sharing pages of third-party services (X and LinkedIn). This site has no control over those services or their terms. Social icons in the header and footer are placeholders that point nowhere.'
		},
		{
			title: 'Changes',
			body: 'These demo terms may change as the site evolves. The latest version is always the one on this page.'
		}
	];
</script>

<svelte:head>
	<title>Terms — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="Demo terms of use for the Ayaan Raza portfolio. All content is fictional."
	/>
	<meta property="og:title" content="Terms — Ayaan Raza" />
	<meta
		property="og:description"
		content="Demo terms of use for the Ayaan Raza portfolio. All content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/terms" />
	<meta property="og:image" content="{data.site.baseUrl}/og/terms.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Terms — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/terms.jpg" />
	<meta name="twitter:title" content="Terms — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Demo terms of use for the Ayaan Raza portfolio. All content is fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/terms" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Legal"
			title="Terms of use"
			description="The fine print for this demo site — short, honest, and fictional, like everything else here."
		/>
	</div>
	<p class="mt-6 text-sm text-body">Last updated: 15 November 2026.</p>

	<div class="mt-8 space-y-8">
		{#each sections as section (section.title)}
			<section aria-labelledby="terms-{section.title.toLowerCase().replaceAll(' ', '-')}">
				<h2
					id="terms-{section.title.toLowerCase().replaceAll(' ', '-')}"
					class="font-display text-xl font-bold text-ink"
				>
					{section.title}
				</h2>
				<p class="mt-2 leading-relaxed text-body">{section.body}</p>
			</section>
		{/each}
	</div>
</div>

<CtaBand />
