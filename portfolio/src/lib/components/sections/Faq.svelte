<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	import type { Faq } from '#lib/schemas/home';
	import FaqItem from '#lib/components/sections/FaqItem.svelte';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';

	let { faqs }: { faqs: Faq[] } = $props();
</script>

<section id="faq" aria-labelledby="faq-heading" tabindex="-1" class="bg-cream">
	<div class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div use:reveal>
			<SectionHeading eyebrow="FAQ" id="faq-heading" align="center">
				Questions, <Highlight>answered</Highlight>
			</SectionHeading>
		</div>
		<div class="mt-10 space-y-3" use:reveal={{ delay: 100 }}>
			{#each faqs as faq (faq.id)}
				<FaqItem {faq} />
			{/each}
		</div>
	</div>
</section>
