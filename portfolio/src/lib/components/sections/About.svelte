<script lang="ts">
	import { reveal } from '#lib/actions/reveal';
	import { parallax } from '#lib/actions/parallax';
	import type { Stat as StatData } from '#lib/schemas/service';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import Picture from '#lib/components/ui/Picture.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import Stat from '#lib/components/ui/Stat.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';

	let { stats }: { stats: StatData[] } = $props();
</script>

<section id="about" aria-labelledby="about-heading" tabindex="-1" class="bg-blush">
	<WaveDivider fillClass="fill-cream" />
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div class="grid items-center gap-10 lg:grid-cols-2">
			<div use:reveal>
				<div use:parallax>
					<Picture
						base="/images/about-illustration"
						alt=""
						width={1920}
						height={1280}
						widths={[640, 960, 1280, 1920]}
						sizes="(max-width: 1023px) 100vw, 592px"
						loading="lazy"
						class="h-auto w-full dark:rounded-3xl"
					/>
				</div>
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
				<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
					{#each stats as stat (stat.id)}
						<Stat {stat} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
