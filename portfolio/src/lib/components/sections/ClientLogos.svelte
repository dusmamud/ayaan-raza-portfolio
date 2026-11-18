<script lang="ts">
	import { reveal } from '#lib/actions/reveal';

	// Fictional client names from the demo testimonials and case studies.
	// Wordmarks are large bold text, so the muted tone still clears the
	// WCAG large-text contrast minimum. The strip scrolls as an infinite
	// marquee: two identical copies, the second aria-hidden, translating
	// -50% in a loop. It pauses on hover/focus, and under reduced motion
	// the animation is off and the duplicate hides, leaving the original
	// static centered row.
	const clients = [
		'NovaByte Labs',
		'PixelForge Studio',
		'Foodly',
		'Shopio',
		'WalletWise',
		'FitTrack'
	];
</script>

<section aria-label="Clients" class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-2 pb-10 sm:px-6 lg:px-8">
		<p class="text-center text-xs font-bold tracking-widest text-body/80 uppercase" use:reveal>
			Trusted by teams at
		</p>
		<div
			class="mt-5 overflow-hidden motion-safe:[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
			use:reveal
		>
			<div
				class="marquee-track flex focus-within:[animation-play-state:paused] hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:justify-center"
			>
				<ul class="flex items-center gap-x-10 pr-10">
					{#each clients as client (client)}
						<li
							class="font-display text-xl font-extrabold tracking-tight whitespace-nowrap text-ink/60"
						>
							{client}
						</li>
					{/each}
				</ul>
				<ul aria-hidden="true" class="flex items-center gap-x-10 pr-10 motion-reduce:hidden">
					{#each clients as client (client)}
						<li
							class="font-display text-xl font-extrabold tracking-tight whitespace-nowrap text-ink/60"
						>
							{client}
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<p class="mt-5 text-center text-sm text-body">
			Demo client names — fictional companies for the UI/UX demo.
		</p>
	</div>
</section>
