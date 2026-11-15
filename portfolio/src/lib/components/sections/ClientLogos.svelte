<script lang="ts">
	import { reveal } from '#lib/actions/reveal';

	// Fictional client names from the demo testimonials and case studies.
	// Wordmarks are large bold text, so the muted tone still clears the
	// WCAG large-text contrast minimum.
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
		<p class="text-center text-xs font-bold tracking-widest text-body/70 uppercase" use:reveal>
			Trusted by teams at
		</p>
		<ul class="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4" use:reveal>
			{#each clients as client (client)}
				<li class="font-display text-xl font-extrabold tracking-tight text-ink/60">
					{client}
				</li>
			{/each}
		</ul>
		<p class="mt-5 text-center text-sm text-body">
			Demo client names — fictional companies for the UI/UX demo.
		</p>
	</div>
</section>
