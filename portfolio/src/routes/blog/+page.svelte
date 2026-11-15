<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import PostCard from '#lib/components/ui/PostCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog — Ayaan Raza</title>
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
	<link rel="canonical" href="{data.site.baseUrl}/blog" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<PageHeader
		eyebrow="Blog"
		title="Notes & ideas"
		description="Demo posts for now — short reads on design, mobile and the small details. Real posts arrive in a later phase."
	/>
	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.posts as post (post.slug)}
			<PostCard {post} />
		{/each}
	</div>
</div>
