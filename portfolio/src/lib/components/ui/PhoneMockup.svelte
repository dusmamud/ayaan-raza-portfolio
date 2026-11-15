<script lang="ts">
	import type { MockupVariant } from '#lib/schemas/project';
	import { cn } from '#lib/utils/cn';

	// Decorative demo phones. Both phones show the generated app screen
	// for the project — the back phone tilted behind the front one, as
	// in the reference design. All project information lives in the
	// card text beside the tile.
	let { variant, class: className = '' }: { variant: MockupVariant; class?: string } = $props();

	const screens: Record<MockupVariant, { src: string; width: number; height: number }> = {
		food: { src: '/images/screen-foodly.png', width: 1008, height: 2128 },
		shop: { src: '/images/screen-shopio.png', width: 1008, height: 2128 },
		finance: { src: '/images/screen-walletwise.png', width: 1008, height: 2128 },
		fitness: { src: '/images/screen-fittrack.png', width: 970, height: 2048 }
	};
	const screen = $derived(screens[variant]);
</script>

<div class={cn('relative mx-auto w-44 lg:w-40 xl:w-44', className)} aria-hidden="true">
	<!-- Back phone, same screen, tilted -->
	<div
		class="absolute top-6 -right-3 aspect-[9/19] w-28 rotate-[8deg] overflow-hidden rounded-[1.3rem] border-4 border-white/90 bg-white shadow-sm lg:-right-2 lg:w-24 xl:-right-3 xl:w-28"
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

	<!-- Front phone with the generated app screen -->
	<div
		class="relative aspect-[9/19] w-36 overflow-hidden rounded-[1.6rem] border-4 border-ink bg-white shadow-md lg:w-32 xl:w-36"
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
