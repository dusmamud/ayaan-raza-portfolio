<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import Highlight from '#lib/components/ui/Highlight.svelte';
</script>

<div class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
	<div
		class="flex flex-col items-start justify-between gap-6 rounded-3xl bg-card p-8 shadow-sm sm:p-10 lg:flex-row lg:items-center"
	>
		<div>
			<h2
				class="font-display text-[clamp(1.5rem,3vw,2rem)] leading-tight font-extrabold tracking-tight text-ink"
			>
				Have an idea? Let's build <Highlight>something</Highlight> great together!
			</h2>
			<p class="mt-2 max-w-xl leading-relaxed text-body">
				Tell me about your project — I reply to every demo message with a plan and a timeline.
			</p>
		</div>
		<div class="flex flex-wrap gap-3">
			<Button href="/contact">
				Start a Project <ArrowRight size={18} aria-hidden="true" />
			</Button>
			<Button href="/#projects" variant="secondary">View my work</Button>
		</div>
	</div>
</div>
