<script lang="ts">
	import type { PageData } from './$types';
	import { Rss, Search } from '@lucide/svelte';
	import Newsletter from '#lib/components/sections/Newsletter.svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import PostCard from '#lib/components/ui/PostCard.svelte';

	let { data }: { data: PageData } = $props();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${data.site.baseUrl}/blog` }
		]
	});

	let query = $state('');
	let activeTag = $state('All');

	const tags = $derived(['All', ...new Set(data.posts.flatMap((post) => post.tags))]);

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return data.posts.filter((post) => {
			const matchesTag = activeTag === 'All' || post.tags.includes(activeTag);
			const matchesQuery = !q || `${post.title} ${post.excerpt}`.toLowerCase().includes(q);
			return matchesTag && matchesQuery;
		});
	});
</script>

<svelte:head>
	<title>Blog — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="Demo blog posts by Ayaan Raza. Placeholder content for the UI/UX demo."
	/>
	<meta property="og:title" content="Blog — Ayaan Raza" />
	<meta
		property="og:description"
		content="Demo blog posts by Ayaan Raza. Placeholder content for the UI/UX demo."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/blog" />
	<meta property="og:image" content="{data.site.baseUrl}/og/blog.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Blog — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/blog.jpg" />
	<meta name="twitter:title" content="Blog — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Demo blog posts by Ayaan Raza. Placeholder content for the UI/UX demo."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/blog" />
	<JsonLd data={breadcrumbLd} />
	<link
		rel="alternate"
		type="application/rss+xml"
		title="Ayaan Raza — Blog"
		href="{data.site.baseUrl}/rss.xml"
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Blog"
			title="Notes & ideas"
			description="Demo posts for now — short reads on design, mobile and the small details. Real posts arrive in a later phase."
		/>
	</div>

	<div class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
		<div class="relative w-full sm:max-w-xs">
			<Search
				size={18}
				class="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-body/60"
				aria-hidden="true"
			/>
			<label for="blog-search" class="sr-only">Search posts</label>
			<input
				id="blog-search"
				type="search"
				autocomplete="off"
				placeholder="Search posts…"
				bind:value={query}
				class="w-full rounded-xl border border-ink/15 bg-card py-2.5 pr-4 pl-10 text-sm text-ink placeholder:text-body/60 focus:border-accent"
			/>
		</div>
		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
			{#each tags as tag (tag)}
				<button
					type="button"
					aria-pressed={activeTag === tag}
					onclick={() => {
						activeTag = tag;
					}}
					class="rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-colors {activeTag ===
					tag
						? 'bg-accent-dark text-white'
						: 'border border-ink/10 bg-card text-ink hover:border-accent-darker hover:text-accent-darker'}"
				>
					{tag}
				</button>
			{/each}
		</div>
		<a
			href="/rss.xml"
			class="inline-flex items-center gap-1.5 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark sm:ml-auto"
		>
			<Rss size={16} aria-hidden="true" /> RSS feed
		</a>
	</div>

	<p class="mt-6 text-sm text-body" aria-live="polite">
		Showing {filtered.length} of {data.posts.length} posts.
	</p>

	{#if filtered.length > 0}
		<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filtered as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	{:else}
		<p class="mt-6 rounded-2xl bg-blush p-5 leading-relaxed text-body">
			No posts match that search. Try a different word or tag.
		</p>
	{/if}

	<Newsletter />
</div>
