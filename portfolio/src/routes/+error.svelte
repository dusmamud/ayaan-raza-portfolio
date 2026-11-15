<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight, Home } from '@lucide/svelte';
	import Button from '#lib/components/ui/Button.svelte';

	const status = $derived(page.status);
	const error = $derived(page.error);
	const is404 = $derived(status === 404);
</script>

<svelte:head>
	<title>{status} — Ayaan Raza</title>
	<meta name="description" content="This page could not be found. Demo portfolio of Ayaan Raza." />
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
	<p
		class="font-display text-[clamp(4rem,12vw,8rem)] leading-none font-extrabold tracking-tight text-accent"
		aria-hidden="true"
	>
		{status}
	</p>
	<h1
		class="mx-auto mt-4 max-w-xl font-display text-[clamp(1.75rem,4vw,2.5rem)] leading-tight font-extrabold tracking-tight text-ink"
	>
		{is404 ? 'This page wandered off' : 'Something went wrong'}
	</h1>
	<p class="mx-auto mt-3 max-w-md leading-relaxed text-body">
		{is404
			? 'The link you followed does not exist — or the demo page moved. Head back and keep exploring.'
			: (error?.message ?? 'An unexpected error happened. Please try again.')}
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<Button href="/">
			<Home size={18} aria-hidden="true" /> Back home
		</Button>
		<Button href="/contact" variant="secondary">
			Contact me <ArrowRight size={18} aria-hidden="true" />
		</Button>
	</div>
	<p class="mt-10 text-sm text-body">
		Looking for something?
		<a href="/projects" class="font-bold text-accent hover:text-accent-dark">Projects</a>
		·
		<a href="/blog" class="font-bold text-accent hover:text-accent-dark">Blog</a>
		·
		<a href="/services" class="font-bold text-accent hover:text-accent-dark">Services</a>
	</p>
</div>
