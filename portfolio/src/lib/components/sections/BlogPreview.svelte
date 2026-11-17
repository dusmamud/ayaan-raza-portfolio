<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Post } from '#lib/schemas/post';
	import Button from '#lib/components/ui/Button.svelte';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import PostCard from '#lib/components/ui/PostCard.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';

	let { posts }: { posts: Post[] } = $props();
</script>

<section id="blog-preview" aria-labelledby="blog-preview-heading" tabindex="-1" class="bg-card">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div class="flex flex-wrap items-end justify-between gap-6" use:reveal>
			<SectionHeading
				eyebrow="Blog"
				id="blog-preview-heading"
				description="Short reads on design, mobile and the small details that make products feel great."
			>
				Latest <Highlight>notes</Highlight>
			</SectionHeading>
			<Button href="/blog">
				View all posts <ArrowRight size={18} aria-hidden="true" />
			</Button>
		</div>
		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post, i (post.slug)}
				<div use:reveal={{ delay: i * 75 }}>
					<PostCard {post} />
				</div>
			{/each}
		</div>
	</div>
</section>
