<script lang="ts">
	import { Code2, GitFork, Star } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Repo } from '#lib/schemas/home';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';

	let { repos }: { repos: Repo[] } = $props();
</script>

<section
	id="open-source"
	aria-labelledby="open-source-heading"
	tabindex="-1"
	class="border-t border-ink/5 bg-card"
>
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div use:reveal>
			<SectionHeading
				eyebrow="Open Source"
				id="open-source-heading"
				align="center"
				description="Small tools and checklists shared for other builders to use."
			>
				Side projects, <Highlight>shared</Highlight> openly
			</SectionHeading>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-3" use:reveal={{ delay: 100 }}>
			{#each repos as repo (repo.id)}
				<article
					class="flex flex-col rounded-3xl bg-cream p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
				>
					<span class="inline-flex self-start rounded-xl bg-lilac p-3 text-ink">
						<Code2 size={24} aria-hidden="true" />
					</span>
					<h3 class="mt-4 font-display text-lg font-bold text-ink">{repo.name}</h3>
					<p class="mt-2 flex-1 text-sm leading-relaxed text-body">{repo.description}</p>
					<p class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body">
						<span class="inline-flex items-center gap-1.5">
							<span class="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true"></span>
							{repo.language}
						</span>
						<span class="inline-flex items-center gap-1">
							<Star size={15} aria-hidden="true" />
							{repo.stars}
						</span>
						<span class="inline-flex items-center gap-1">
							<GitFork size={15} aria-hidden="true" />
							{repo.forks}
						</span>
					</p>
				</article>
			{/each}
		</div>
		<p class="mt-8 text-center text-sm text-body">
			Demo repositories — fictional projects for the UI/UX demo.
		</p>
	</div>
</section>
