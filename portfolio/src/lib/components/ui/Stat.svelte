<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { inview } from '#lib/actions/inview';
	import type { Stat, TintName } from '#lib/schemas/service';
	import { cn } from '#lib/utils/cn';
	import Icon from './Icon.svelte';

	let { stat }: { stat: Stat } = $props();

	const tints: Record<TintName, string> = {
		'icon-lavender': 'bg-icon-lavender',
		'icon-pink': 'bg-icon-pink',
		'icon-yellow': 'bg-icon-yellow',
		'icon-green': 'bg-icon-green'
	};

	// The final value renders in HTML (SSR / no-JS / reduced motion).
	// The counter only replaces it after the stat scrolls into view.
	// The tweened store starts at 0; its value is only rendered after the
	// counter starts, so the initial value never reaches the screen.
	const display = tweened(0, { duration: 900, easing: cubicOut });
	let started = $state(false);

	function start() {
		if (started || stat.countTo === null) return;
		started = true;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			display.set(stat.countTo, { duration: 0 });
			return;
		}
		display.set(0, { duration: 0 });
		display.set(stat.countTo);
	}
</script>

<div use:inview={start} class="flex flex-col items-start gap-2">
	<span class={cn('inline-flex rounded-xl p-3 text-ink', tints[stat.tint])}>
		<Icon name={stat.icon} size={22} />
	</span>
	<p class="font-display text-2xl font-extrabold text-ink">
		{#if stat.countTo === null || !started}
			{stat.display}
		{:else}
			{Math.round($display)}{stat.suffix}
		{/if}
	</p>
	<p class="text-sm text-body">{stat.label}</p>
</div>
