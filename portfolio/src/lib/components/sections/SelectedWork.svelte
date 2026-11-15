<script lang="ts">
	import { ArrowRight, Heart } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Project } from '#lib/schemas/project';
	import Button from '#lib/components/ui/Button.svelte';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	let { projects }: { projects: Project[] } = $props();
</script>

<section id="projects" aria-labelledby="projects-heading" tabindex="-1" class="bg-cream">
	<WaveDivider fillClass="fill-lilac" />
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div class="grid items-end gap-4 lg:grid-cols-2" use:reveal>
			<SectionHeading eyebrow="My Work" id="projects-heading">
				Selected <Highlight>Work</Highlight>
			</SectionHeading>
			<p class="leading-relaxed text-body lg:justify-self-end lg:text-right">
				Here are some projects I'm proud of. Each one is built with
				<Heart size={16} class="inline fill-accent text-accent" aria-hidden="true" />
				and lots of coffee.
			</p>
		</div>

		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each projects as project, i (project.slug)}
				<div use:reveal={{ delay: i * 75 }}>
					<ProjectCard {project} />
				</div>
			{/each}
		</div>

		<div class="mt-10 text-center" use:reveal>
			<Button href="/projects">
				See All Projects <ArrowRight size={18} aria-hidden="true" />
			</Button>
		</div>
	</div>
</section>
