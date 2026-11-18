<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import ReadingProgress from '#lib/components/ui/ReadingProgress.svelte';
	import ShareButtons from '#lib/components/ui/ShareButtons.svelte';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);

	const formattedDate = $derived(
		new Date(`${post.date}T00:00:00`).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);

	const pageUrl = $derived(`${data.site.baseUrl}/blog/${post.slug}`);

	// Structured dates need a timezone: midnight IST on the displayed date (the visible byline shows the date only).
	const publishedTime = $derived(`${post.date}T00:00:00+05:30`);

	const blogPostingLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		datePublished: publishedTime,
		dateModified: publishedTime,
		author: {
			'@type': 'Person',
			'@id': `${data.site.baseUrl}/about#person`,
			name: data.site.name,
			url: data.site.baseUrl
		},
		url: pageUrl
	});

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${data.site.baseUrl}/blog` },
			{ '@type': 'ListItem', position: 3, name: post.title, item: pageUrl }
		]
	});
</script>

<svelte:head>
	<title>{post.title} — Ayaan Raza</title>
	<meta property="og:type" content="article" />
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content="{post.title} — Ayaan Raza" />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content="{data.site.baseUrl}/og/post-{post.slug}.jpg" />
	<meta property="article:published_time" content={publishedTime} />
	<meta property="article:modified_time" content={publishedTime} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{post.title} — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/post-{post.slug}.jpg" />
	<meta property="article:author" content="{data.site.baseUrl}/about" />
	<meta property="article:section" content="Blog" />
	{#each post.tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}
	<meta name="twitter:title" content="{post.title} — Ayaan Raza" />
	<meta name="twitter:description" content={post.excerpt} />
	<link rel="canonical" href={pageUrl} />
	<JsonLd data={blogPostingLd} />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<ReadingProgress />

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs
		items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]}
	/>
	<a
		href="/blog"
		class="mt-4 inline-flex items-center gap-1.5 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
	>
		<ArrowLeft size={16} aria-hidden="true" /> All posts
	</a>

	<article class="mt-8">
		<p class="text-xs font-bold tracking-wide text-body uppercase">
			{formattedDate} · {post.readTime}
		</p>
		<h1
			class="mt-2 font-display text-[clamp(1.9rem,5vw,2.75rem)] leading-tight font-extrabold tracking-tight text-ink"
		>
			{post.title}
		</h1>
		<ul class="mt-5 flex flex-wrap gap-2">
			{#each post.tags as tag (tag)}
				<li class="rounded-full bg-lilac px-3 py-1 text-xs font-bold text-ink">{tag}</li>
			{/each}
		</ul>
		<div class="mt-8 space-y-5">
			{#each post.body as paragraph (paragraph.slice(0, 24))}
				<p class="leading-relaxed text-body">{paragraph}</p>
			{/each}
		</div>
	</article>

	<div class="mt-10 border-t border-ink/10 pt-6">
		<ShareButtons url={pageUrl} title="{post.title} — Ayaan Raza" />
	</div>

	<p class="mt-10 border-t border-ink/10 pt-6 text-sm text-body">
		Demo post — placeholder content for the UI/UX demo.
	</p>

	<nav
		aria-label="More posts"
		class="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:justify-between"
	>
		{#if data.prevPost}
			<a
				href="/blog/{data.prevPost.slug}"
				class="inline-flex items-center gap-1.5 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
			>
				<ArrowLeft size={16} aria-hidden="true" />
				{data.prevPost.title}
			</a>
		{:else}
			<span></span>
		{/if}
		{#if data.nextPost}
			<a
				href="/blog/{data.nextPost.slug}"
				class="inline-flex items-center gap-1.5 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark sm:text-right"
			>
				{data.nextPost.title}
				<ArrowRight size={16} aria-hidden="true" />
			</a>
		{/if}
	</nav>

	<h2 class="mt-10 font-display text-xl font-bold text-ink">More posts</h2>
	<ul class="mt-3 space-y-2">
		{#each data.others as other (other.slug)}
			<li>
				<a
					href="/blog/{other.slug}"
					class="inline-block py-1 font-bold text-accent-darker hover:text-accent-dark"
				>
					{other.title}
				</a>
			</li>
		{/each}
	</ul>
</div>
