<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';

	let { data }: { data: PageData } = $props();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Projects', item: `${data.site.baseUrl}/projects` }
		]
	});

	let activeCategory = $state('All');

	const categories = $derived(['All', ...new Set(data.projects.map((p) => p.category))]);

	const filtered = $derived(
		activeCategory === 'All'
			? data.projects
			: data.projects.filter((project) => project.category === activeCategory)
	);
</script>

<svelte:head>
	<title>Projects — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="Demo projects by Ayaan Raza: Foodly, Shopio, WalletWise, FitTrack, Wanderly and TaskFlow. All content is fictional."
	/>
	<meta property="og:title" content="Projects — Ayaan Raza" />
	<meta
		property="og:description"
		content="Demo projects by Ayaan Raza: Foodly, Shopio, WalletWise, FitTrack, Wanderly and TaskFlow. All content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/projects" />
	<meta property="og:image" content="{data.site.baseUrl}/og/projects.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Projects — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/projects.jpg" />
	<meta name="twitter:title" content="Projects — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Demo projects by Ayaan Raza: Foodly, Shopio, WalletWise, FitTrack, Wanderly and TaskFlow. All content is fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/projects" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="My Work"
			title="All Projects"
			description="Every project below is a demo concept — the stories, years and outcomes are fictional, the layouts are real."
		/>
	</div>

	<div class="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
		{#each categories as category (category)}
			<button
				type="button"
				aria-pressed={activeCategory === category}
				onclick={() => {
					activeCategory = category;
				}}
				class="rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-colors {activeCategory ===
				category
					? 'bg-accent-dark text-white'
					: 'border border-ink/10 bg-card text-ink hover:border-accent-darker hover:text-accent-darker'}"
			>
				{category}
			</button>
		{/each}
	</div>

	<p class="mt-6 text-sm text-body" aria-live="polite">
		Showing {filtered.length} of {data.projects.length} projects.
	</p>

	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each filtered as project (project.slug)}
			<ProjectCard {project} />
		{/each}
	</div>
</div>
