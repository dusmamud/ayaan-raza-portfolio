<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { Project, ProjectTint } from '#lib/schemas/project';
	import { cn } from '#lib/utils/cn';
	import PhoneMockup from './PhoneMockup.svelte';

	let { project }: { project: Project } = $props();

	const tiles: Record<ProjectTint, string> = {
		green: 'bg-tile-green',
		pink: 'bg-tile-pink',
		yellow: 'bg-tile-yellow',
		purple: 'bg-tile-purple'
	};
</script>

<article
	class="overflow-hidden rounded-3xl bg-card shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
>
	<div class={cn('overflow-hidden px-6 pt-8', tiles[project.tint])}>
		<div class="-mb-5">
			<PhoneMockup variant={project.mockup} />
		</div>
	</div>
	<div class="p-6">
		<p class="text-xs font-bold tracking-wide text-body uppercase">{project.category}</p>
		<h3 class="mt-1 font-display text-xl font-bold text-ink">
			<a href="/projects/{project.slug}" class="hover:text-accent-dark">{project.title}</a>
		</h3>
		<p class="mt-2 text-sm leading-relaxed text-body">{project.description}</p>
		<a
			href="/projects/{project.slug}"
			class="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent hover:text-accent-dark"
		>
			View Case Study <ArrowRight size={16} aria-hidden="true" />
		</a>
	</div>
</article>
