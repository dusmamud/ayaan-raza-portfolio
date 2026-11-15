<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import ServiceCard from '#lib/components/ui/ServiceCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Services — Ayaan Raza</title>
	<meta
		name="description"
		content="Services by Ayaan Raza: mobile apps, UI/UX design, backend integration, testing and maintenance. Demo portfolio — all content is fictional."
	/>
	<meta property="og:title" content="Services — Ayaan Raza" />
	<meta
		property="og:description"
		content="Services by Ayaan Raza: mobile apps, UI/UX design, backend integration, testing and maintenance. Demo portfolio — all content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/services" />
	<meta property="og:image" content="{data.site.baseUrl}/og/services.jpg" />
	<meta name="twitter:title" content="Services — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Services by Ayaan Raza: mobile apps, UI/UX design, backend integration, testing and maintenance. Demo portfolio — all content is fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/services" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Services"
			title="What I can do for you"
			description="Four services, one goal: a product that looks great, works fast and is easy to maintain. Open any service to see exactly what's included."
		/>
	</div>
	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each data.services as service (service.id)}
			<ServiceCard {service} />
		{/each}
	</div>
	<p class="mt-12 max-w-2xl leading-relaxed text-body">
		Not sure which service fits? Most projects combine two or more — start with a message and we'll
		shape the scope together.
		<a href="/#process" class="font-bold text-accent-darker hover:text-accent-dark">
			See how I work
		</a>.
	</p>
</div>

<CtaBand />
