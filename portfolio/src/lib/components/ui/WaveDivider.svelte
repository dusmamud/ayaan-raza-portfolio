<script lang="ts">
	// Decorative wave at the top of a section. `fillClass` is the Tailwind
	// fill utility for the PREVIOUS section's background colour; the wave
	// edge reveals the current section's background below it.
	let { fillClass, flip = false }: { fillClass: string; flip?: boolean } = $props();
</script>

<div class="pointer-events-none leading-none" aria-hidden="true">
	<svg
		class="block h-10 w-full sm:h-14 {flip ? 'rotate-180' : ''} {fillClass}"
		viewBox="0 0 1440 60"
		preserveAspectRatio="none"
	>
		<path d="M0,0 L1440,0 L1440,18 C1200,52 960,58 720,34 C480,10 240,6 0,30 Z" />
	</svg>
</div>
