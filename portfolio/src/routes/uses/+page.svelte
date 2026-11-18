<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import type { UseGroup } from '#lib/schemas/home';

	let { data }: { data: PageData } = $props();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Uses', item: `${data.site.baseUrl}/uses` }
		]
	});

	const groups: { id: UseGroup; label: string }[] = [
		{ id: 'development', label: 'Development' },
		{ id: 'design', label: 'Design' },
		{ id: 'productivity', label: 'Productivity' },
		{ id: 'hardware', label: 'Hardware' }
	];
</script>

<svelte:head>
	<title>Uses — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="The tools and setup behind the Ayaan Raza demo portfolio. Demo content — all fictional."
	/>
	<meta property="og:title" content="Uses — Ayaan Raza" />
	<meta
		property="og:description"
		content="The tools and setup behind the Ayaan Raza demo portfolio. Demo content — all fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/uses" />
	<meta property="og:image" content="{data.site.baseUrl}/og/uses.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Uses — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/uses.jpg" />
	<meta name="twitter:title" content="Uses — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="The tools and setup behind the Ayaan Raza demo portfolio. Demo content — all fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/uses" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Uses' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Uses"
			title="Tools I use"
			description="The editor, frameworks, apps and hardware behind the demos on this site."
		/>
	</div>

	{#each groups as group (group.id)}
		<h2
			class="mt-12 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink"
		>
			{group.label}
		</h2>
		<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.uses.filter((item) => item.group === group.id) as item (item.id)}
				<article class="rounded-3xl bg-card p-6 shadow-sm">
					<h3 class="font-display text-lg font-bold text-ink">{item.name}</h3>
					<p class="mt-2 text-sm leading-relaxed text-body">{item.description}</p>
				</article>
			{/each}
		</div>
	{/each}

	<p class="mt-12 text-center text-sm text-body">
		Demo setup — fictional tools list for the UI/UX demo.
	</p>
</div>

<CtaBand />
