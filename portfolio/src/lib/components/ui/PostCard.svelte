<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { Post } from '#lib/schemas/post';
	import { spotlight } from '#lib/actions/spotlight';

	let { post }: { post: Post } = $props();

	function formatDate(iso: string): string {
		return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<article
	use:spotlight
	data-cursor-label="Read"
	class="spotlight flex h-full flex-col rounded-3xl bg-card p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
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
		class="mt-5 inline-flex items-center gap-1 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
	>
		Read post<span class="sr-only">: {post.title}</span> <ArrowRight size={16} aria-hidden="true" />
	</a>
</article>
