<script lang="ts">
	import {
		Briefcase,
		Bug,
		Cloud,
		Coffee,
		Layers,
		Palette,
		Smartphone,
		Users
	} from '@lucide/svelte';
	import type { ServiceIconName, StatIconName } from '#lib/schemas/service';

	let {
		name,
		size = 22,
		class: className = ''
	}: { name: ServiceIconName | StatIconName; size?: number; class?: string } = $props();
</script>

{#if name === 'smartphone'}
	<Smartphone {size} class={className} aria-hidden="true" />
{:else if name === 'palette'}
	<Palette {size} class={className} aria-hidden="true" />
{:else if name === 'cloud'}
	<Cloud {size} class={className} aria-hidden="true" />
{:else if name === 'bug'}
	<Bug {size} class={className} aria-hidden="true" />
{:else if name === 'briefcase'}
	<Briefcase {size} class={className} aria-hidden="true" />
{:else if name === 'layers'}
	<Layers {size} class={className} aria-hidden="true" />
{:else if name === 'users'}
	<Users {size} class={className} aria-hidden="true" />
{:else if name === 'coffee'}
	<Coffee {size} class={className} aria-hidden="true" />
{/if}
