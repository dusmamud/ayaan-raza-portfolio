<script lang="ts">
	import type { MockupVariant } from '#lib/schemas/project';
	import { cn } from '#lib/utils/cn';

	// Decorative demo phone skeletons. All content is abstract shapes —
	// the real project information lives in the card text beside the tile.
	let { variant, class: className = '' }: { variant: MockupVariant; class?: string } = $props();
</script>

<div class={cn('relative mx-auto w-44', className)} aria-hidden="true">
	<!-- Back phone, generic skeleton -->
	<div
		class="absolute top-5 -right-4 w-28 rotate-6 rounded-[1.4rem] border-4 border-white/90 bg-white/80 p-2 shadow-sm"
	>
		<div class="mx-auto h-1 w-8 rounded-full bg-ink/20"></div>
		<div class="mt-2 h-10 rounded-lg bg-lilac"></div>
		<div class="mt-2 space-y-1.5">
			<div class="h-1.5 rounded-full bg-ink/10"></div>
			<div class="h-1.5 w-3/4 rounded-full bg-ink/10"></div>
			<div class="h-1.5 w-1/2 rounded-full bg-ink/10"></div>
		</div>
	</div>

	<!-- Front phone -->
	<div class="relative w-36 rounded-[1.6rem] border-4 border-ink bg-white p-2.5 pb-3 shadow-md">
		<div class="mx-auto h-1.5 w-12 rounded-full bg-ink/20"></div>

		{#if variant === 'food'}
			<div class="mt-2.5 flex gap-1.5">
				<div class="h-12 flex-1 rounded-lg bg-tile-green"></div>
				<div class="h-12 flex-1 rounded-lg bg-tile-yellow"></div>
			</div>
			<div class="mt-2.5 space-y-2">
				<div class="flex items-center gap-2">
					<div class="h-7 w-7 shrink-0 rounded-full bg-blush"></div>
					<div class="flex-1 space-y-1">
						<div class="h-1.5 rounded-full bg-ink/15"></div>
						<div class="h-1.5 w-2/3 rounded-full bg-ink/10"></div>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-7 w-7 shrink-0 rounded-full bg-lilac"></div>
					<div class="flex-1 space-y-1">
						<div class="h-1.5 rounded-full bg-ink/15"></div>
						<div class="h-1.5 w-1/2 rounded-full bg-ink/10"></div>
					</div>
				</div>
			</div>
			<div class="mt-2.5 h-6 rounded-full bg-accent/90"></div>
		{:else if variant === 'shop'}
			<div class="mt-2.5 grid grid-cols-2 gap-1.5">
				<div class="h-14 rounded-lg bg-tile-pink"></div>
				<div class="h-14 rounded-lg bg-tile-yellow"></div>
				<div class="h-14 rounded-lg bg-lilac"></div>
				<div class="h-14 rounded-lg bg-tile-green"></div>
			</div>
			<div class="mt-2.5 space-y-1.5">
				<div class="h-1.5 rounded-full bg-ink/15"></div>
				<div class="h-1.5 w-2/3 rounded-full bg-ink/10"></div>
			</div>
			<div class="mt-2.5 h-6 rounded-full bg-ink"></div>
		{:else if variant === 'finance'}
			<div class="mt-2.5 rounded-lg bg-tile-yellow p-2">
				<div class="h-1.5 w-1/3 rounded-full bg-ink/25"></div>
				<div class="mt-1.5 h-3 w-2/3 rounded-full bg-ink/60"></div>
			</div>
			<div class="mt-2.5 flex h-14 items-end gap-1.5">
				<div class="h-1/3 flex-1 rounded-t bg-lilac"></div>
				<div class="h-2/3 flex-1 rounded-t bg-tile-purple"></div>
				<div class="h-1/2 flex-1 rounded-t bg-blush"></div>
				<div class="h-full flex-1 rounded-t bg-accent/80"></div>
			</div>
			<div class="mt-2.5 space-y-1.5">
				<div class="h-1.5 rounded-full bg-ink/15"></div>
				<div class="h-1.5 w-3/4 rounded-full bg-ink/10"></div>
			</div>
		{:else}
			<div class="mt-2.5 flex items-center justify-center">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full border-[6px] border-tile-purple"
				>
					<div class="h-8 w-8 rounded-full bg-lilac"></div>
				</div>
			</div>
			<div class="mt-2.5 space-y-1.5">
				<div class="h-1.5 rounded-full bg-ink/15"></div>
				<div class="h-1.5 w-2/3 rounded-full bg-ink/10"></div>
				<div class="h-1.5 w-1/2 rounded-full bg-ink/10"></div>
			</div>
			<div class="mt-2.5 h-6 rounded-full bg-accent/90"></div>
		{/if}
	</div>
</div>
