<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	import type { Stat as StatData } from '#lib/schemas/service';
	import AboutArt from '#lib/components/ui/AboutArt.svelte';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import Stat from '#lib/components/ui/Stat.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	let { stats }: { stats: StatData[] } = $props();
</script>

<section id="about" aria-labelledby="about-heading" tabindex="-1" class="bg-blush">
	<WaveDivider fillClass="fill-cream" />
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div use:reveal>
				<AboutArt />
			</div>
			<div use:reveal={{ delay: 100 }}>
				<SectionHeading eyebrow="About me" id="about-heading">
					Building apps with <Highlight>purpose</Highlight>
				</SectionHeading>
				<p class="mt-4 leading-relaxed text-body">
					I'm Ayaan, a developer with 3+ years of experience building cross-platform web and mobile
					apps.
				</p>
				<p class="mt-3 leading-relaxed text-body">
					I love turning ideas into real products with clean code, great user experience and modern
					technologies.
				</p>
			</div>
		</div>

		<div class="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4" use:reveal>
			{#each stats as stat (stat.id)}
				<Stat {stat} />
			{/each}
		</div>
	</div>
</section>
