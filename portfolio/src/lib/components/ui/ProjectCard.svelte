<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { Project, ProjectTint } from '#lib/schemas/project';
	import { spotlight } from '#lib/actions/spotlight';
	import { cn } from '#lib/utils/cn';
	import PhoneMockup from './PhoneMockup.svelte';

	let { project }: { project: Project } = $props();

	const tiles: Record<ProjectTint, string> = {
		green: 'bg-tile-green',
		pink: 'bg-tile-pink',
		yellow: 'bg-tile-yellow',
		purple: 'bg-tile-purple',
		blue: 'bg-tile-blue',
		orange: 'bg-tile-orange'
	};
</script>

<article
	use:spotlight
	data-cursor-label="View"
	class="spotlight group overflow-hidden rounded-3xl bg-card shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
>
	<div class={cn('overflow-hidden px-6 pt-8', tiles[project.tint])}>
		<div
			class="-mb-5 origin-bottom motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.04]"
		>
			<PhoneMockup variant={project.mockup} />
		</div>
	</div>
	<div class="p-6">
		<p class="text-xs font-bold tracking-wide text-body uppercase">{project.category}</p>
		<h2 class="mt-1 font-display text-xl font-bold text-ink">
			<a href="/projects/{project.slug}" class="hover:text-accent-dark">{project.title}</a>
		</h2>
		<p class="mt-2 text-sm leading-relaxed text-body">{project.description}</p>
		<ul class="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
			{#each project.tags.slice(0, 3) as tag (tag)}
				<li class="rounded-full bg-lilac px-2.5 py-0.5 text-xs font-bold text-ink">{tag}</li>
			{/each}
		</ul>
		<a
			href="/projects/{project.slug}"
			class="group/link mt-4 inline-flex items-center gap-1 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
		>
			View Case Study<span class="sr-only"> for {project.title}</span>
			<ArrowRight
				size={16}
				aria-hidden="true"
				class="motion-safe:transition-transform motion-safe:group-hover/link:translate-x-0.5"
			/>
		</a>
	</div>
</article>
