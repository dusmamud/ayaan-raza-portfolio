<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import TestimonialCard from '#lib/components/ui/TestimonialCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Testimonials — Ayaan Raza</title>
	<meta
		name="description"
		content="What demo clients say about working with Ayaan Raza. All testimonials are fictional."
	/>
	<meta property="og:title" content="Testimonials — Ayaan Raza" />
	<meta
		property="og:description"
		content="What demo clients say about working with Ayaan Raza. All testimonials are fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/testimonials" />
	<meta property="og:image" content="{data.site.baseUrl}/og/testimonials.jpg" />
	<meta name="twitter:title" content="Testimonials — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="What demo clients say about working with Ayaan Raza. All testimonials are fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/testimonials" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Testimonials"
			title="Clients love the work"
			description="Kind words from the fictional clients behind the demo projects. Real feedback would live here in a production site."
		/>
	</div>
	<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		{#each data.testimonials as testimonial (testimonial.id)}
			<TestimonialCard {testimonial} />
		{/each}
	</div>
	<p class="mt-8 text-center text-sm text-body">
		Demo testimonials — fictional clients for the UI/UX demo.
	</p>
</div>

<CtaBand />
