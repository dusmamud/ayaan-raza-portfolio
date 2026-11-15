<script lang="ts">
	import type { PageData } from './$types';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';

	let { data }: { data: PageData } = $props();

	const sections = [
		{
			title: 'No data collection',
			body: 'This demo site collects no personal data. There are no accounts, no analytics, no tracking pixels and no advertising. Visiting these pages does not identify you.'
		},
		{
			title: 'Contact form',
			body: 'The contact form is a front-end demo. Submissions are validated in your browser and never sent anywhere — nothing you type leaves your device.'
		},
		{
			title: 'Cookies & tracking',
			body: 'This site sets no cookies and uses no local storage for tracking. Fonts and icons are self-hosted, so no third-party requests are made to load them.'
		},
		{
			title: 'Third-party services',
			body: 'The site is hosted on Cloudflare Pages, which may process standard server logs (such as IP addresses) to operate the service. No other third parties receive data from this site.'
		},
		{
			title: 'Changes to this policy',
			body: 'If this demo ever becomes a real product, this page will be updated to describe exactly what changes. The date below shows the last update.'
		}
	];
</script>

<svelte:head>
	<title>Privacy Policy — Ayaan Raza</title>
	<meta
		name="description"
		content="Privacy policy for the Ayaan Raza demo portfolio. No data collection, no tracking."
	/>
	<meta property="og:title" content="Privacy Policy — Ayaan Raza" />
	<meta
		property="og:description"
		content="Privacy policy for the Ayaan Raza demo portfolio. No data collection, no tracking."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/privacy" />
	<link rel="canonical" href="{data.site.baseUrl}/privacy" />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<PageHeader
		eyebrow="Legal"
		title="Privacy Policy"
		description="Demo policy for a demo site: short, honest, and easy to verify."
	/>
	<p class="mt-6 text-sm text-body">Last updated: 15 November 2026.</p>
	{#each sections as section (section.title)}
		<section class="mt-10" aria-label={section.title}>
			<h2 class="font-display text-xl font-bold text-ink">{section.title}</h2>
			<p class="mt-2 leading-relaxed text-body">{section.body}</p>
		</section>
	{/each}
	<section class="mt-10" aria-label="Contact">
		<h2 class="font-display text-xl font-bold text-ink">Contact</h2>
		<p class="mt-2 leading-relaxed text-body">
			Questions about this policy? Reach out via the
			<a href="/contact" class="font-bold text-accent-darker hover:text-accent-dark">contact page</a
			>. All contact details on this site are demo details.
		</p>
	</section>
</div>

<CtaBand />
