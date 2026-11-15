<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import type { Faq } from '#lib/schemas/home';

	let { faq }: { faq: Faq } = $props();

	// A button-driven accordion (instead of <details>) is what makes the
	// close animation possible: <details> hides its content instantly on
	// close, so no CSS transition can play. The panel animates with the
	// grid-template-rows 0fr -> 1fr technique: no max-height guessing,
	// the motion always matches the real content height. `inert` keeps a
	// collapsed answer out of the tab order and the accessibility tree,
	// like closed <details> did.
	let open = $state(false);
</script>

<div class="rounded-2xl bg-card px-6 shadow-sm">
	<h3>
		<button
			type="button"
			id="faq-button-{faq.id}"
			aria-expanded={open}
			aria-controls="faq-panel-{faq.id}"
			class="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display font-bold text-ink"
			onclick={() => (open = !open)}
		>
			{faq.question}
			<Plus
				size={20}
				class="shrink-0 text-accent motion-safe:transition-transform motion-safe:duration-300 {open
					? 'rotate-45'
					: ''}"
				aria-hidden="true"
			/>
		</button>
	</h3>
	<div
		id="faq-panel-{faq.id}"
		role="region"
		aria-labelledby="faq-button-{faq.id}"
		inert={!open}
		class="grid {open
			? 'grid-rows-[1fr]'
			: 'grid-rows-[0fr]'} motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out"
	>
		<div class="min-h-0 overflow-hidden">
			<p
				class="pb-5 leading-relaxed text-body {open
					? 'opacity-100'
					: 'opacity-0'} motion-safe:transition-opacity motion-safe:duration-300"
			>
				{faq.answer}
			</p>
		</div>
	</div>
</div>
