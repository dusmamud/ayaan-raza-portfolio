<script lang="ts">
	import type { MockupVariant } from '#lib/schemas/project';
	import { cn } from '#lib/utils/cn';

	// Decorative demo phones. The front phone shows the generated app
	// screen for the project; the back phone is an abstract skeleton for
	// depth. All project information lives in the card text beside the tile.
	let { variant, class: className = '' }: { variant: MockupVariant; class?: string } = $props();

	const screens: Record<MockupVariant, { src: string; width: number; height: number }> = {
		food: { src: '/images/screen-foodly.png', width: 1008, height: 2128 },
		shop: { src: '/images/screen-shopio.png', width: 1008, height: 2128 },
		finance: { src: '/images/screen-walletwise.png', width: 1152, height: 2048 },
		fitness: { src: '/images/screen-fittrack.png', width: 1152, height: 2048 }
	};
	const screen = $derived(screens[variant]);
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

	<!-- Front phone with the generated app screen -->
	<div
		class="relative aspect-[9/19] w-36 overflow-hidden rounded-[1.6rem] border-4 border-ink bg-white shadow-md"
	>
		<img
			src={screen.src}
			alt=""
			width={screen.width}
			height={screen.height}
			loading="lazy"
			decoding="async"
			class="block h-full w-full object-cover object-top"
		/>
	</div>
</div>
