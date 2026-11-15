<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<span class="relative inline-block whitespace-nowrap">
	{@render children()}
	<svg
		class="absolute -bottom-1 left-0 h-[0.35em] w-full text-accent"
		viewBox="0 0 100 10"
		preserveAspectRatio="none"
		aria-hidden="true"
	>
		<path
			d="M2 8 Q 50 -2 98 6"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
		/>
	</svg>
</span>
