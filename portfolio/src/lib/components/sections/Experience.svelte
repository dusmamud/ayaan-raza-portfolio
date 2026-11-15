<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	import type { Experience } from '#lib/schemas/home';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';

	let { experience }: { experience: Experience[] } = $props();
</script>

<section id="experience" aria-labelledby="experience-heading" tabindex="-1" class="bg-card">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div use:reveal>
			<SectionHeading
				eyebrow="Career"
				id="experience-heading"
				description="Three years of shipping products — from the first freelance gigs to leading full builds."
			>
				Where I've <Highlight>been</Highlight>
			</SectionHeading>
		</div>
		<ol class="mt-10 ml-2 max-w-3xl border-l-2 border-accent/20" use:reveal={{ delay: 100 }}>
			{#each experience as job (job.id)}
				<li class="relative pb-10 pl-8 last:pb-0">
					<span
						class="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full bg-accent ring-4 ring-blush"
						aria-hidden="true"
					></span>
					<p class="inline-block rounded-full bg-lilac px-3 py-1 text-xs font-bold text-ink">
						{job.period}
					</p>
					<h3 class="mt-3 font-display text-xl font-bold text-ink">{job.role}</h3>
					<p class="mt-1 text-sm font-bold text-accent-darker">{job.company}</p>
					<p class="mt-2 leading-relaxed text-body">{job.description}</p>
					<ul class="mt-3 flex flex-wrap gap-2">
						{#each job.tags as tag (tag)}
							<li
								class="rounded-full border border-ink/10 bg-cream px-3 py-1 text-xs font-bold text-ink"
							>
								{tag}
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ol>
	</div>
</section>
