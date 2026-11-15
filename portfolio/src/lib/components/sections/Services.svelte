<script lang="ts">
	import { Sparkles } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import type { Service } from '#lib/schemas/service';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import ServiceCard from '#lib/components/ui/ServiceCard.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	let { services }: { services: Service[] } = $props();
</script>

<section id="services" aria-labelledby="services-heading" tabindex="-1" class="bg-lilac">
	<WaveDivider fillClass="fill-blush" flip />
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
		<div class="grid items-end gap-4 lg:grid-cols-2" use:reveal>
			<SectionHeading eyebrow="What I do" id="services-heading">
				Services I <Highlight>provide</Highlight>
				<Sparkles size={26} class="mb-1 inline text-ink" aria-hidden="true" />
			</SectionHeading>
			<p class="leading-relaxed text-body lg:justify-self-end lg:text-right">
				I help startups and businesses build powerful digital products from concept to launch.
			</p>
		</div>

		<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as service, i (service.id)}
				<div use:reveal={{ delay: i * 75 }}>
					<ServiceCard {service} />
				</div>
			{/each}
		</div>
	</div>
</section>
