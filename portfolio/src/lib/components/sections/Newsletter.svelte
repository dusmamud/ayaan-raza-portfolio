<script lang="ts">
	import { Check, Mail } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import Button from '#lib/components/ui/Button.svelte';

	// Demo signup: validates in the browser and stores nothing, like the
	// contact form. Real delivery would need a newsletter service.
	let email = $state('');
	let subscribed = $state('');

	function subscribe(event: SubmitEvent) {
		event.preventDefault();
		const value = email.trim();
		if (value) subscribed = value;
	}
</script>

<section aria-labelledby="newsletter-heading" class="mt-12" use:reveal>
	<div class="rounded-3xl bg-blush p-6 sm:p-10">
		<div class="max-w-xl">
			<span class="inline-flex rounded-xl bg-card p-3 text-ink">
				<Mail size={24} aria-hidden="true" />
			</span>
			<h2
				id="newsletter-heading"
				class="mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-ink"
			>
				New posts, straight to your inbox
			</h2>
			<p class="mt-2 leading-relaxed text-body">
				One short email when a new note lands. No spam, no tracking — and this demo form sends
				nothing anywhere.
			</p>
			{#if subscribed}
				<p
					class="mt-6 flex items-start gap-2.5 rounded-2xl bg-card px-4 py-3 text-sm leading-relaxed text-body shadow-sm"
				>
					<Check size={18} class="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
					<span>
						Thanks — <strong class="text-ink">{subscribed}</strong> passed validation. Nothing was stored,
						because this is a demo.
					</span>
				</p>
			{:else}
				<form class="mt-6 flex flex-col gap-3 sm:flex-row" onsubmit={subscribe}>
					<label for="newsletter-email" class="sr-only">Email address</label>
					<input
						id="newsletter-email"
						name="email"
						type="email"
						required
						autocomplete="email"
						placeholder="you@example.com"
						bind:value={email}
						class="w-full flex-1 rounded-xl border border-ink/15 bg-card px-4 py-3 text-ink placeholder:text-body/60 focus:border-accent"
					/>
					<Button type="submit">Subscribe</Button>
				</form>
			{/if}
		</div>
	</div>
</section>
