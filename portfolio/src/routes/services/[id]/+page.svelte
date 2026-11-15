<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowLeft, Check } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';

	let { data }: { data: PageData } = $props();

	const pageUrl = $derived(`${data.site.baseUrl}/services/${data.service.id}`);

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Services', item: `${data.site.baseUrl}/services` },
			{ '@type': 'ListItem', position: 3, name: data.service.title, item: pageUrl }
		]
	});
</script>

<svelte:head>
	<title>{data.service.title} — Ayaan Raza</title>
	<meta name="description" content={data.detail.longDescription} />
	<meta property="og:title" content="{data.service.title} — Ayaan Raza" />
	<meta property="og:description" content={data.detail.longDescription} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content="{data.site.baseUrl}/og/service-{data.service.id}.jpg" />
	<meta name="twitter:title" content="{data.service.title} — Ayaan Raza" />
	<meta name="twitter:description" content={data.detail.longDescription} />
	<link rel="canonical" href={pageUrl} />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Services', href: '/services' },
			{ label: data.service.title }
		]}
	/>
	<a
		href="/services"
		class="mt-4 inline-flex items-center gap-1 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
	>
		<ArrowLeft size={16} aria-hidden="true" /> All services
	</a>
	<div class="mt-6">
		<PageHeader
			eyebrow="Services"
			title={data.service.title}
			description={data.detail.longDescription}
		/>
		<p class="mt-4 text-lg font-bold text-ink">
			{data.service.price} <span class="text-sm font-normal text-body">(demo starting price)</span>
		</p>
	</div>

	<h2
		class="mt-12 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink"
	>
		What's included
	</h2>
	<ul class="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
		{#each data.detail.includes as item (item)}
			<li
				class="flex items-start gap-2.5 rounded-2xl bg-card px-4 py-3 text-sm font-bold text-ink shadow-sm"
			>
				<Check size={18} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
				{item}
			</li>
		{/each}
	</ul>

	<div class="mt-10 max-w-3xl rounded-3xl bg-lilac p-6 sm:p-8">
		<h2 class="font-display text-lg font-bold text-ink">How I approach it</h2>
		<p class="mt-2 leading-relaxed text-body">{data.detail.approach}</p>
	</div>

	{#if data.related.length > 0}
		<h2
			class="mt-16 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink"
		>
			Related projects
		</h2>
		<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each data.related as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}

	<nav aria-label="Other services" class="mt-16">
		<h2 class="font-display text-lg font-bold text-ink">Explore other services</h2>
		<ul class="mt-4 flex flex-wrap gap-2">
			{#each data.others as other (other.id)}
				<li>
					<a
						href={other.href}
						class="inline-block rounded-full border border-ink/10 bg-card px-4 py-2 text-sm font-bold text-ink shadow-sm transition-colors hover:border-accent-darker hover:text-accent-darker"
					>
						{other.title}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<CtaBand />
