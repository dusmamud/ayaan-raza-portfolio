<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import Button from '#lib/components/ui/Button.svelte';
	import Highlight from '#lib/components/ui/Highlight.svelte';
	import WaveDivider from '#lib/components/ui/WaveDivider.svelte';
</script>

<section id="cta" aria-labelledby="cta-heading" tabindex="-1" class="bg-blush">
	<WaveDivider fillClass="fill-cream" flip />
	<div
		class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16"
	>
		<div use:reveal>
			<h2
				id="cta-heading"
				class="font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-ink"
			>
				Have an idea?<br />
				Let's build <Highlight>something</Highlight> great together!
			</h2>
			<div class="mt-7">
				<Button href="/contact" variant="dark">
					Start a Project <ArrowRight size={18} aria-hidden="true" />
				</Button>
			</div>
		</div>
		<div use:reveal={{ delay: 100 }}>
			<img
				src="/images/cta-illustration.png"
				alt=""
				width="1920"
				height="1280"
				loading="lazy"
				decoding="async"
				class="h-auto w-full"
			/>
		</div>
	</div>
</section>
