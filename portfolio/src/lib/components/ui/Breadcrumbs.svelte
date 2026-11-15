<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

	// The last item is the current page and is never linked.
	let { items }: { items: { label: string; href?: string }[] } = $props();
</script>

<nav aria-label="Breadcrumb">
	<ol class="flex flex-wrap items-center gap-1 text-sm">
		{#each items as item, i (item.label)}
			<li class="flex items-center gap-1">
				{#if i > 0}
					<ChevronRight size={14} class="text-body/60" aria-hidden="true" />
				{/if}
				{#if item.href && i < items.length - 1}
					<a
						href={item.href}
						class="inline-block py-1 font-bold text-accent-darker hover:text-accent-dark"
					>
						{item.label}
					</a>
				{:else}
					<span aria-current="page" class="inline-block py-1 font-bold text-ink">
						{item.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
