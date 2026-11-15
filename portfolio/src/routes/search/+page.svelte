<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Search } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';

	let { data }: { data: PageData } = $props();

	// Typing filters live without a reload. The ?q= value is read on
	// mount only: url.searchParams is unavailable during prerendering,
	// and the form's GET submit reloads the page with ?q= in the URL.
	let query = $state('');

	onMount(() => {
		query = new URLSearchParams(window.location.search).get('q') ?? '';
	});

	const results = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return data.entries;
		return data.entries.filter((entry) =>
			`${entry.title} ${entry.description} ${entry.keywords}`.toLowerCase().includes(q)
		);
	});
</script>

<svelte:head>
	<title>Search — Ayaan Raza</title>
	<meta
		name="description"
		content="Search every page, project, post and service on the Ayaan Raza demo portfolio."
	/>
	<meta property="og:title" content="Search — Ayaan Raza" />
	<meta
		property="og:description"
		content="Search every page, project, post and service on the Ayaan Raza demo portfolio."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/search" />
	<meta property="og:image" content="{data.site.baseUrl}/og/search.jpg" />
	<meta name="twitter:title" content="Search — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Search every page, project, post and service on the Ayaan Raza demo portfolio."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/search" />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Search"
			title="Search the site"
			description="Pages, projects, posts and services — all searchable in one place, no backend needed."
		/>
	</div>

	<form role="search" method="GET" action="/search" class="mt-8">
		<label for="site-search" class="sr-only">Search the site</label>
		<div class="relative">
			<Search
				size={20}
				class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-body/60"
				aria-hidden="true"
			/>
			<input
				id="site-search"
				name="q"
				type="search"
				autocomplete="off"
				placeholder="Try “checkout”, “Flutter” or “pricing”…"
				bind:value={query}
				class="w-full rounded-xl border border-ink/15 bg-card py-3 pr-4 pl-12 text-ink placeholder:text-body/60 focus:border-accent"
			/>
		</div>
	</form>

	<p class="mt-6 text-sm text-body" aria-live="polite">
		{#if query.trim()}
			{results.length}
			{results.length === 1 ? 'result' : 'results'} for “{query.trim()}”
		{:else}
			Showing all {results.length} pages, projects, posts and services.
		{/if}
	</p>

	{#if results.length > 0}
		<ul class="mt-4 space-y-3">
			{#each results as entry (entry.href)}
				<li>
					<a
						href={entry.href}
						class="block rounded-2xl bg-card p-5 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
					>
						<span class="text-xs font-bold tracking-wide text-accent-darker uppercase">
							{entry.kind}
						</span>
						<span class="mt-1 block font-display text-lg font-bold text-ink">
							{entry.title}
						</span>
						<span class="mt-1 block text-sm leading-relaxed text-body">
							{entry.description}
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="mt-4 rounded-2xl bg-blush p-5 leading-relaxed text-body">
			Nothing matched “{query.trim()}”. Try a broader word, or browse the
			<a href="/sitemap" class="font-bold text-accent-darker hover:text-accent-dark">sitemap</a>.
		</p>
	{/if}
</div>

<CtaBand />
