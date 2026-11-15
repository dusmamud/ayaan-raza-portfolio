<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Testimonial } from '#lib/schemas/home';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import TestimonialCard from '#lib/components/ui/TestimonialCard.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	let { testimonials }: { testimonials: Testimonial[] } = $props();
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
				<TestimonialCard {testimonial} />
			{/each}
		</div>
		<p class="mt-8 text-center text-sm text-body">
			Demo testimonials — fictional clients for the UI/UX demo.
		</p>
		<p class="mt-4 text-center">
			<a
				href="/testimonials"
				class="inline-flex items-center gap-1 py-1 font-bold text-accent-darker hover:text-accent-dark"
			>
				View all testimonials <ArrowRight size={18} aria-hidden="true" />
			</a>
		</p>
	</div>
</section>
