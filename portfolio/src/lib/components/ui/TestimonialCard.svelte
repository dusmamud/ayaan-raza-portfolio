<script lang="ts">
	import { Quote, Star } from '@lucide/svelte';
	import type { Testimonial } from '#lib/schemas/home';
	import type { TintName } from '#lib/schemas/service';
	import { spotlight } from '#lib/actions/spotlight';
	import { cn } from '#lib/utils/cn';

	let { testimonial }: { testimonial: Testimonial } = $props();

	const tints: Record<TintName, string> = {
		'icon-lavender': 'bg-icon-lavender',
		'icon-pink': 'bg-icon-pink',
		'icon-yellow': 'bg-icon-yellow',
		'icon-green': 'bg-icon-green'
	};
</script>

<figure
	use:spotlight
	class="spotlight flex h-full flex-col rounded-3xl bg-card p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
>
	<Quote size={28} class="text-accent" aria-hidden="true" />
	<div class="mt-3 flex gap-1 text-accent" role="img" aria-label="5 out of 5 stars">
		{#each [0, 1, 2, 3, 4] as i (i)}
			<Star size={16} fill="currentColor" aria-hidden="true" />
		{/each}
	</div>
	<blockquote class="mt-3 flex-1 leading-relaxed text-body">
		{testimonial.quote}
	</blockquote>
	<figcaption class="mt-5 flex items-center gap-3">
		<span
			class={cn(
				'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-ink',
				tints[testimonial.tint]
			)}
			aria-hidden="true"
		>
			{testimonial.initials}
		</span>
		<span>
			<span class="block font-display text-sm font-bold text-ink">
				{testimonial.name}
			</span>
			<span class="block text-sm text-body">{testimonial.role}</span>
		</span>
	</figcaption>
</figure>
