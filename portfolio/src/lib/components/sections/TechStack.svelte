<script lang="ts">
	import { reveal } from '#lib/actions/reveal';

	let { stack }: { stack: string[] } = $props();
</script>

<section
	id="stack"
	aria-labelledby="stack-heading"
	tabindex="-1"
	class="border-t border-ink/5 bg-cream"
>
	<div class="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8" use:reveal>
		<h2
			id="stack-heading"
			class="font-display text-sm font-bold tracking-wide text-accent uppercase"
		>
			Tech Stack
		</h2>
		<p class="mx-auto mt-3 max-w-xl leading-relaxed text-body">
			This demo site runs on the stack it shows — no placeholders behind the curtain.
		</p>
		<ul class="mt-6 flex flex-wrap justify-center gap-3">
			{#each stack as tech (tech)}
				<li
					class="rounded-full border border-ink/10 bg-white px-4 py-2 font-display text-sm font-bold text-ink shadow-sm"
				>
					{tech}
				</li>
			{/each}
		</ul>
	</div>
</section>
