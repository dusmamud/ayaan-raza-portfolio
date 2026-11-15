<script lang="ts">
	import { Quote, Star } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Testimonial } from '#lib/schemas/home';
	import type { TintName } from '#lib/schemas/service';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';
	import { cn } from '#lib/utils/cn';

	let { testimonials }: { testimonials: Testimonial[] } = $props();

	const tints: Record<TintName, string> = {
		'icon-lavender': 'bg-icon-lavender',
		'icon-pink': 'bg-icon-pink',
		'icon-yellow': 'bg-icon-yellow',
		'icon-green': 'bg-icon-green'
	};
</script>

<section id="testimonials" aria-labelledby="testimonials-heading" tabindex="-1" class="bg-blush">
	<WaveDivider fillClass="fill-lilac" />
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div use:reveal>
			<SectionHeading eyebrow="Testimonials" id="testimonials-heading" align="center">
				Clients <Highlight>love</Highlight> the work
			</SectionHeading>
		</div>
		<div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" use:reveal={{ delay: 100 }}>
			{#each testimonials as testimonial (testimonial.id)}
				<figure
					class="flex flex-col rounded-3xl bg-card p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
				>
					<Quote size={28} class="text-accent" aria-hidden="true" />
					<div class="mt-3 flex gap-1 text-accent" aria-label="5 out of 5 stars">
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
			{/each}
		</div>
		<p class="mt-8 text-center text-sm text-body">
			Demo testimonials — fictional clients for the UI/UX demo.
		</p>
	</div>
</section>
