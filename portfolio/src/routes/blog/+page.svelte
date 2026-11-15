<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowRight } from '@lucide/svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';

	let { data }: { data: PageData } = $props();

	function formatDate(iso: string): string {
		return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
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
			<article
				class="flex flex-col rounded-3xl bg-card p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
			>
				<p class="text-xs font-bold tracking-wide text-body uppercase">
					{formatDate(post.date)} · {post.readTime}
				</p>
				<h2 class="mt-2 font-display text-xl leading-snug font-bold text-ink">
					<a href="/blog/{post.slug}" class="hover:text-accent-dark">{post.title}</a>
				</h2>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-body">{post.excerpt}</p>
				<ul class="mt-4 flex flex-wrap gap-2">
					{#each post.tags as tag (tag)}
						<li class="rounded-full bg-lilac px-3 py-1 text-xs font-bold text-ink">
							{tag}
						</li>
					{/each}
				</ul>
				<a
					href="/blog/{post.slug}"
					class="mt-5 inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-dark"
				>
					Read post <ArrowRight size={16} aria-hidden="true" />
				</a>
			</article>
		{/each}
	</div>
</div>
