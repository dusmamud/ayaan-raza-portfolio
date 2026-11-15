<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import type { UseGroup } from '#lib/schemas/home';

	let { data }: { data: PageData } = $props();

	const groups: { id: UseGroup; label: string }[] = [
		{ id: 'development', label: 'Development' },
		{ id: 'design', label: 'Design' },
		{ id: 'productivity', label: 'Productivity' },
		{ id: 'hardware', label: 'Hardware' }
	];
</script>

<svelte:head>
	<title>Uses — Ayaan Raza</title>
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
	<meta name="twitter:title" content="Uses — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="The tools and setup behind the Ayaan Raza demo portfolio. Demo content — all fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/uses" />
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
