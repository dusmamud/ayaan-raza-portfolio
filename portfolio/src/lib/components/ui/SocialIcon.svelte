<script lang="ts">
	import { Camera, CodeXml, Mail } from '@lucide/svelte';
	import type { SocialId } from '#lib/schemas/site';

	// Brand icons were removed from Lucide 1.x, so the social marks below
	// are minimal hand-drawn SVGs in the same 24x24, 2px-stroke style.
	// GitHub/Instagram use the closest Lucide glyphs; LinkedIn and X are
	// simple geometric marks. Demo links only — see data/site.ts.
	let {
		id,
		size = 18,
		class: className = ''
	}: { id: SocialId; size?: number; class?: string } = $props();
</script>

{#if id === 'github'}
	<CodeXml {size} class={className} aria-hidden="true" />
{:else if id === 'mail'}
	<Mail {size} class={className} aria-hidden="true" />
{:else if id === 'instagram'}
	<Camera {size} class={className} aria-hidden="true" />
{:else if id === 'linkedin'}
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}
		aria-hidden="true"
	>
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v2" />
		<rect width="4" height="12" x="2" y="9" />
		<circle cx="4" cy="4" r="2" />
	</svg>
{:else if id === 'x'}
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class={className}
		aria-hidden="true"
	>
		<path d="M4 4l16 16" />
		<path d="M20 4L4 20" />
	</svg>
{/if}
