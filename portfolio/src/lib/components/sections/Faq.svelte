<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Faq } from '#lib/schemas/home';
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
				<details class="group rounded-2xl bg-card px-6 shadow-sm">
					<summary
						class="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display font-bold text-ink [&::-webkit-details-marker]:hidden"
					>
						{faq.question}
						<Plus
							size={20}
							class="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
							aria-hidden="true"
						/>
					</summary>
					<p class="pb-5 leading-relaxed text-body">{faq.answer}</p>
				</details>
			{/each}
		</div>
	</div>
</section>
