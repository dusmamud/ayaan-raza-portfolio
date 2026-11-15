<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects — Ayaan Raza</title>
	<meta
		name="description"
		content="Demo projects by Ayaan Raza: Foodly, Shopio, WalletWise and FitTrack. All content is fictional."
	/>
	<meta property="og:title" content="Projects — Ayaan Raza" />
	<meta
		property="og:description"
		content="Demo projects by Ayaan Raza: Foodly, Shopio, WalletWise and FitTrack. All content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/projects" />
	<link rel="canonical" href="{data.site.baseUrl}/projects" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<PageHeader
		eyebrow="My Work"
		title="All Projects"
		description="Every project below is a demo concept — the stories, years and outcomes are fictional, the layouts are real."
	/>
	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each data.projects as project (project.slug)}
			<ProjectCard {project} />
		{/each}
	</div>
</div>
