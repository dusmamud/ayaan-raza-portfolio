<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowLeft } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);

	const formattedDate = $derived(
		new Date(`${post.date}T00:00:00`).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	);
</script>

<svelte:head>
	<title>{post.title} — Ayaan Raza</title>
	<meta name="description" content={post.excerpt} />
	<meta property="og:title" content="{post.title} — Ayaan Raza" />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:url" content="{data.site.baseUrl}/blog/{post.slug}" />
	<link rel="canonical" href="{data.site.baseUrl}/blog/{post.slug}" />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<a
		href="/blog"
		class="inline-flex items-center gap-1.5 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
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

	<p class="mt-10 border-t border-ink/10 pt-6 text-sm text-body">
		Demo post — placeholder content for the UI/UX demo.
	</p>

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
