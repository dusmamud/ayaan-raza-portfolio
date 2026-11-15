<script lang="ts">
	import { Code, PenTool, Rocket, Search } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { ProcessStep } from '#lib/schemas/home';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';

	let { steps }: { steps: ProcessStep[] } = $props();

	const tints = ['bg-icon-lavender', 'bg-icon-pink', 'bg-icon-yellow', 'bg-icon-green'];
</script>

<section id="process" aria-labelledby="process-heading" tabindex="-1" class="bg-lilac">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div use:reveal>
			<SectionHeading
				eyebrow="How I work"
				id="process-heading"
				description="A simple, transparent flow — you always know what happens next and when."
			>
				From idea to <Highlight>launch</Highlight>
			</SectionHeading>
		</div>
		<ol class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" use:reveal={{ delay: 100 }}>
			{#each steps as step, i (step.id)}
				<li
					class="relative overflow-hidden rounded-3xl bg-card p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
				>
					<span
						class="pointer-events-none absolute -top-3 right-3 font-display text-7xl font-extrabold text-ink/5"
						aria-hidden="true"
					>
						{String(step.step).padStart(2, '0')}
					</span>
					<span class="inline-flex rounded-xl p-3 text-ink {tints[i % tints.length]}">
						{#if step.id === 'discover'}
							<Search size={24} aria-hidden="true" />
						{:else if step.id === 'design'}
							<PenTool size={24} aria-hidden="true" />
						{:else if step.id === 'develop'}
							<Code size={24} aria-hidden="true" />
						{:else}
							<Rocket size={24} aria-hidden="true" />
						{/if}
					</span>
					<h3 class="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-body">{step.description}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>
