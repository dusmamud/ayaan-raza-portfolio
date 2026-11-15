<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		eyebrow,
		id,
		description,
		align = 'left',
		children
	}: {
		eyebrow: string;
		id: string;
		description?: string;
		align?: 'left' | 'center';
		children: Snippet;
	} = $props();
</script>

<div class={align === 'center' ? 'text-center' : undefined}>
	<p class="font-display text-sm font-bold tracking-wide text-accent-darker uppercase">{eyebrow}</p>
	<h2
		{id}
		class="mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-ink"
	>
		{@render children()}
	</h2>
	{#if description}
		<p class="mt-3 max-w-xl leading-relaxed text-body {align === 'center' ? 'mx-auto' : ''}">
			{description}
		</p>
	{/if}
</div>
