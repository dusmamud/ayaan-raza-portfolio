<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	import type { Tech, TechGroup } from '#lib/schemas/tech';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import TechIcon from '#lib/components/ui/TechIcon.svelte';

	let { stack }: { stack: Tech[] } = $props();

	const groups: { id: TechGroup; label: string; grid: string }[] = [
		{ id: 'frontend', label: 'Frontend', grid: 'sm:grid-cols-4' },
		{ id: 'backend', label: 'Backend & Data', grid: 'sm:grid-cols-4' },
		{ id: 'tools', label: 'Mobile, Design & Tools', grid: 'sm:grid-cols-3 lg:grid-cols-5' }
	];
</script>

<section
	id="stack"
	aria-labelledby="stack-heading"
	tabindex="-1"
	class="border-t border-ink/5 bg-cream"
>
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div use:reveal>
			<SectionHeading
				eyebrow="Tech Stack"
				id="stack-heading"
				align="center"
				description="Real tools behind the demos on this page — grouped by what they do."
			>
				Tools I <Highlight>love</Highlight> working with
			</SectionHeading>
		</div>
		{#each groups as group, gi (group.id)}
			{@const items = stack.filter((tech) => tech.group === group.id)}
			<div class="mt-10" use:reveal={{ delay: gi * 100 }}>
				<h3 class="font-display text-base font-bold text-ink">{group.label}</h3>
				<ul class="mt-4 grid grid-cols-2 gap-4 {group.grid}">
					{#each items as tech (tech.id)}
						<li
							class="rounded-2xl bg-card p-5 text-center shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
						>
							<span class="flex justify-center">
								<TechIcon path={tech.path} color={tech.color} size={40} />
							</span>
							<p class="mt-3 font-display text-sm font-bold text-ink">{tech.name}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
		<p class="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-body">
			This site itself runs on SvelteKit (Svelte 5), TypeScript, Tailwind CSS and Vite — the rest is
			the demo stack behind the projects above.
		</p>
	</div>
</section>
